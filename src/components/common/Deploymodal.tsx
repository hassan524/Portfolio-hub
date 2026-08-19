import { useState, useEffect, useCallback, useRef } from "react";
import {
  Loader2, Globe, Rocket, ArrowLeft, X, Check, ShieldCheck,
  ExternalLink, Copy, AlertTriangle, CheckCircle2, LayoutDashboard, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import deployapi from "@/api/deploy";
import {
  DEPLOY_OAUTH_MESSAGE,
  type DeployOAuthCompleteMessage,
} from "@/components/individual/deploy/OAuthCompletePage";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export type DeployPlatform = "vercel" | "netlify";

export interface DeployModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name?: string;
  description?: string;
  files?: Record<string, string> | null;
}

type DeployStatus = { vercel: boolean; netlify: boolean };
type DeployStage = "idle" | "uploading" | "building" | "live" | "error";

const TARGETS: {
  id: DeployPlatform;
  name: string;
  tagline: string;
  icon: string;
  about: string;
}[] = [
    {
      id: "vercel",
      name: "Vercel",
      tagline: "Fast, global, zero-config",
      icon: "▲",
      about:
        "Vercel is a free hosting service — the same company behind Next.js. It gives your portfolio a real, public web address that anyone can visit.",
    },
    {
      id: "netlify",
      name: "Netlify",
      tagline: "Simple deploys, custom domains",
      icon: "◆",
      about:
        "Netlify is another free hosting service, similar to Vercel. It also gives your portfolio a public web address, and makes it easy to add your own custom domain later.",
    },
  ];

function getAuthToken(): string | null {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.endsWith("-auth-token")) {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          const parsed = JSON.parse(item);
          if (parsed.access_token) return parsed.access_token;
        } catch {
          /* ignore */
        }
      }
    }
  }
  return localStorage.getItem("access_token");
}

function backendBase() {
  return import.meta.env.DEV
    ? "http://localhost:5000/api"
    : import.meta.env.VITE_BACKEND_URL;
}

export function DeployModal({ open, onOpenChange, name, description, files }: DeployModalProps) {
  const navigate = useNavigate();

  const [selectedPlatform, setSelectedPlatform] = useState<DeployPlatform>("vercel");
  const [status, setStatus] = useState<DeployStatus | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [authorizing, setAuthorizing] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const [stage, setStage] = useState<DeployStage>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [redirectSeconds, setRedirectSeconds] = useState<number | null>(null);

  const eventSourceRef = useRef<EventSource | null>(null);
  const redirectTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isAuthorized = status?.[selectedPlatform] ?? false;
  const activeTarget = TARGETS.find((t) => t.id === selectedPlatform)!;
  const deploying = stage === "uploading" || stage === "building";

  const pushLog = (line: string) => setLogs((prev) => [...prev, line]);

  const loadStatus = useCallback(async () => {
    setCheckingStatus(true);
    try {
      const { data } = await deployapi.checkStatus();
      setStatus(data);
    } catch (err) {
      console.error("Failed to check deploy status:", err);
      toast.error("Couldn't check authorization status");
      setStatus({ vercel: false, netlify: false });
    } finally {
      setCheckingStatus(false);
    }
  }, []);

  const handleOAuthComplete = useCallback(
    (payload: DeployOAuthCompleteMessage) => {
      if (payload.type !== DEPLOY_OAUTH_MESSAGE) return;
      setAuthorizing(false);
      setSelectedPlatform(payload.platform);

      if (payload.status === "success") {
        setStatus((current) => ({
          vercel: current?.vercel ?? false,
          netlify: current?.netlify ?? false,
          [payload.platform]: true,
        }));
        toast.success(`${payload.platform === "vercel" ? "Vercel" : "Netlify"} connected.`);
        void loadStatus();
      } else {
        toast.error(payload.message || "Authorization failed");
      }
    },
    [loadStatus],
  );

  useEffect(() => {
    if (!open) return;
    setAuthorizing(false);
    setStage("idle");
    setLogs([]);
    setLiveUrl(null);
    setErrorMessage(null);
    setRedirectSeconds(null);
    void loadStatus();
  }, [loadStatus, open]);

  useEffect(() => {
    function onMessage(event: MessageEvent<DeployOAuthCompleteMessage>) {
      if (event.origin !== window.location.origin) return;
      handleOAuthComplete(event.data);
    }
    function onStorage(event: StorageEvent) {
      if (event.key !== "deploy_oauth_complete" || !event.newValue) return;
      try {
        handleOAuthComplete(JSON.parse(event.newValue));
        window.localStorage.removeItem("deploy_oauth_complete");
      } catch {
        toast.error("Couldn't read authorization result");
      }
    }
    window.addEventListener("message", onMessage);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("storage", onStorage);
    };
  }, [handleOAuthComplete]);

  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
      if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
    };
  }, []);

  const close = useCallback(() => {
    if (deploying) return;
    onOpenChange(false);
  }, [onOpenChange, deploying]);

  const handleAuthorize = async () => {
    setAuthorizing(true);
    const tab = window.open("about:blank", "portfolio-hub-deploy-oauth");
    try {
      const { data } =
        selectedPlatform === "vercel"
          ? await deployapi.authorizeVercel()
          : await deployapi.authorizeNetlify();

      if (tab) {
        tab.location.href = data.authUrl;
        tab.focus();
      } else {
        window.location.href = data.authUrl;
      }
    } catch (err) {
      console.error("Authorization failed:", err);
      toast.error("Authorization failed");
      setAuthorizing(false);
      tab?.close();
    }
  };

  const startStatusStream = (platform: DeployPlatform, ids: { deploymentId?: string; siteId?: string; deployId?: string }, finalUrl: string) => {
    const token = getAuthToken();
    const streamUrl =
      platform === "vercel"
        ? `${backendBase()}/deploy/vercel/deploy/${ids.deploymentId}/stream?token=${token}`
        : `${backendBase()}/deploy/netlify/deploy/${ids.siteId}/${ids.deployId}/stream?token=${token}`;

    const source = new EventSource(streamUrl);
    eventSourceRef.current = source;

    source.onmessage = (event) => {
      const { line } = JSON.parse(event.data);
      pushLog(line);

      const isBuilding = /BUILDING|INITIALIZING|processing|uploading/i.test(line);
      const isReady = /READY|ready/i.test(line);
      const isFailed = /ERROR|error|CANCELED/i.test(line);

      if (isBuilding) setStage("building");

      if (isReady) {
        setStage("live");
        setLiveUrl(finalUrl);
        source.close();
        toast.success(`Live on ${platform === "vercel" ? "Vercel" : "Netlify"}!`);
        startRedirectCountdown();
      } else if (isFailed) {
        setStage("error");
        setErrorMessage(line.replace(/^Error:\s*/, ""));
        source.close();
      }
    };

    source.onerror = () => {
      source.close();
      if (stage !== "live") {
        setStage("error");
        setErrorMessage("Lost connection while checking deployment status.");
      }
    };
  };

  const startRedirectCountdown = () => {
    setRedirectSeconds(8);
    redirectTimerRef.current = setInterval(() => {
      setRedirectSeconds((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
          navigate("/dashboard");
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelRedirect = () => {
    if (redirectTimerRef.current) clearInterval(redirectTimerRef.current);
    setRedirectSeconds(null);
  };

  const handleDeploy = async () => {
    setStage("uploading");
    setLogs([]);
    setErrorMessage(null);
    pushLog(`Uploading your portfolio to ${activeTarget.name}…`);

    try {
      if (!files) throw new Error("No portfolio files found to deploy");

      const { data } =
        selectedPlatform === "vercel"
          ? await deployapi.deployVercel(files, name)
          : await deployapi.deployNetlify(files, name);

      pushLog("Upload complete. Waiting for it to go live…");
      setStage("building");

      startStatusStream(
        selectedPlatform,
        selectedPlatform === "vercel"
          ? { deploymentId: data.deploymentId }
          : { siteId: data.siteId, deployId: data.deployId },
        data.url,
      );
    } catch (err: any) {
      const message = err?.response?.data?.error || err.message || "Something went wrong";
      setStage("error");
      setErrorMessage(message);
      pushLog(`Error: ${message}`);
    }
  };

  const copyUrl = () => {
    if (!liveUrl) return;
    navigator.clipboard.writeText(liveUrl);
    toast.success("Link copied");
  };

  const stageChecklist = [
    { key: "uploading", label: "Uploading your files" },
    { key: "building", label: "Publishing your site" },
    { key: "live", label: "Site is live" },
  ] as const;

  const stageOrder: DeployStage[] = ["idle", "uploading", "building", "live"];
  const currentIndex = stageOrder.indexOf(stage === "error" ? "building" : stage);

  return (
    <Dialog open={open} onOpenChange={deploying ? undefined : onOpenChange}>
      <DialogContent className="w-125 max-w-[92vw] p-6">
        {!deploying && (
          <button
            type="button"
            onClick={close}
            className="absolute right-3 top-3 z-10 grid h-6 w-6 place-items-center rounded-md text-neutral-500 hover:bg-neutral-800 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black">
            <Globe className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Deploy your portfolio</h2>
            <p className="text-[11px] text-neutral-500">
              {stage === "idle" && "Choose a hosting platform"}
              {stage === "uploading" && "Uploading…"}
              {stage === "building" && "Publishing…"}
              {stage === "live" && "Your portfolio is live"}
              {stage === "error" && "Something went wrong"}
            </p>
          </div>
        </div>

        {/* ── STAGE: idle — pick platform, connect, deploy ───────────────── */}
        {stage === "idle" && (
          <>
            {checkingStatus ? (
              <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-xl border border-neutral-800 py-10">
                <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
                <p className="text-xs text-neutral-500">Checking authorization…</p>
              </div>
            ) : (
              <div className="mt-5 space-y-2">
                {TARGETS.map((t) => {
                  const active = selectedPlatform === t.id;
                  const connected = status?.[t.id] ?? false;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedPlatform(t.id)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                        active ? "border-white bg-neutral-900" : "border-neutral-800 hover:border-neutral-600",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold",
                          active ? "bg-white text-black" : "bg-neutral-900 text-neutral-400",
                        )}
                      >
                        {t.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-white">{t.name}</span>
                          {connected && (
                            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400">
                              Connected
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-0.5">{t.tagline}</p>
                      </div>
                      <div
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border",
                          active ? "border-white bg-white text-black" : "border-neutral-700",
                        )}
                      >
                        {active && <Check className="h-3 w-3 stroke-3" />}
                      </div>
                    </div>
                  );
                })}

                {/* Plain-English explainer */}
                <button
                  type="button"
                  onClick={() => setShowAbout((v) => !v)}
                  className="flex w-full items-center gap-1.5 pt-1 text-[10.5px] text-neutral-500 hover:text-neutral-300"
                >
                  <Info className="h-3 w-3" />
                  What is {activeTarget.name}? What does "Authorize" do?
                </button>
                {showAbout && (
                  <div className="rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 text-[11px] leading-relaxed text-neutral-400">
                    <p>{activeTarget.about}</p>
                    <p className="mt-2">
                      Clicking <span className="text-neutral-300 font-medium">Authorize</span> opens a
                      small window where you log into {activeTarget.name} (or create a free account if
                      you don't have one yet). We never see or store your password — you're only
                      granting permission to publish your portfolio files. You can remove this
                      permission anytime from your {activeTarget.name} account settings.
                    </p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ── STAGE: uploading / building — live checklist + console ─────── */}
        {(stage === "uploading" || stage === "building") && (
          <div className="mt-5 space-y-4">
            <div className="space-y-2">
              {stageChecklist.map((step, i) => {
                const done = i < currentIndex;
                const active = i === currentIndex;
                return (
                  <div key={step.key} className="flex items-center gap-2 text-xs">
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : active ? (
                      <Loader2 className="h-4 w-4 animate-spin text-neutral-300 shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-neutral-700 shrink-0" />
                    )}
                    <span className={cn(done || active ? "text-white" : "text-neutral-600")}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl border border-neutral-800 bg-black p-3 font-mono text-[11px] text-neutral-300 max-h-40 overflow-y-auto">
              {logs.map((line, i) => (
                <div key={i} className="py-0.5">
                  <span className="text-neutral-600">›</span> {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STAGE: error ─────────────────────────────────────────────── */}
        {stage === "error" && (
          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-2 rounded-xl border border-red-900/50 bg-red-950/30 p-3">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-red-300">Deployment failed</p>
                <p className="text-[11px] text-red-400/80 mt-0.5">{errorMessage}</p>
              </div>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-black p-3 font-mono text-[11px] text-neutral-300 max-h-32 overflow-y-auto">
              {logs.map((line, i) => (
                <div key={i} className="py-0.5">
                  <span className="text-neutral-600">›</span> {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STAGE: live — success screen ─────────────────────────────── */}
        {stage === "live" && (
          <div className="mt-5 space-y-4">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-emerald-900/40 bg-emerald-950/20 py-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              <p className="text-sm font-semibold text-white">Your portfolio is live!</p>
              <p className="text-[11px] text-neutral-400 px-6">
                Anyone with this link can now view your portfolio.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2">
              <span className="flex-1 truncate text-xs text-neutral-300">{liveUrl}</span>
              <button onClick={copyUrl} className="text-neutral-500 hover:text-white">
                <Copy className="h-3.5 w-3.5" />
              </button>
              <a href={liveUrl ?? "#"} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {redirectSeconds !== null && (
              <div className="flex items-center justify-between rounded-lg bg-neutral-900 px-3 py-2 text-[11px] text-neutral-500">
                <span>Taking you to your dashboard in {redirectSeconds}s…</span>
                <button onClick={cancelRedirect} className="text-neutral-400 underline hover:text-white">
                  Stay here
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-800 pt-4">
          {stage !== "live" ? (
            <button
              type="button"
              onClick={close}
              disabled={deploying}
              className="flex h-8 items-center gap-1 rounded-md px-2 text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-40"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Cancel
            </button>
          ) : (
            <span />
          )}

          {stage === "idle" && !isAuthorized && (
            <button
              type="button"
              onClick={handleAuthorize}
              disabled={authorizing || checkingStatus}
              className="flex h-9 min-w-32 items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200 disabled:opacity-60"
            >
              {authorizing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Authorizing…
                </>
              ) : (
                <>
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Authorize {activeTarget.name}
                </>
              )}
            </button>
          )}

          {stage === "idle" && isAuthorized && (
            <button
              type="button"
              onClick={handleDeploy}
              className="flex h-9 min-w-24 items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200"
            >
              <Rocket className="h-3.5 w-3.5" />
              Deploy
            </button>
          )}

          {stage === "error" && (
            <button
              type="button"
              onClick={() => setStage("idle")}
              className="flex h-9 min-w-24 items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200"
            >
              Try again
            </button>
          )}

          {stage === "live" && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={close}
                className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-neutral-700 px-4 text-xs font-semibold text-white hover:bg-neutral-800"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}