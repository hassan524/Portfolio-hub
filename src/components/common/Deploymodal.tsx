import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Globe,
  Rocket,
  ArrowLeft,
  ArrowRight,
  X,
  Check,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export type DeployPlatform = "vercel" | "netlify";

export interface DeployModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDeploy: (platform: DeployPlatform, name?: string, description?: string) => void;
  name?: string;
  description?: string;
  deployedPlatform?: DeployPlatform;
  setDeployedPlatform?: (platform: DeployPlatform) => void;
}

type DeployTarget = {
  id: DeployPlatform;
  name: string;
  tagline: string;
  icon: string;
  about: string;
};

const TARGETS: DeployTarget[] = [
  {
    id: "vercel",
    name: "Vercel",
    tagline: "Fast, global, zero-config",
    icon: "▲",
    about:
      "Vercel hosts your site on a fast global network so it loads quickly for anyone who visits it. We'll ask you to authorize your account so we can publish your portfolio there on your behalf.",
  },
  {
    id: "netlify",
    name: "Netlify",
    tagline: "Simple deploys, custom domains",
    icon: "◆",
    about:
      "Netlify builds and publishes your site automatically, and makes it easy to attach a custom domain later. We'll ask you to authorize your account so we can publish your portfolio there on your behalf.",
  },
];

type Step = "platform" | "authorize" | "deploy";
const STEP_ORDER: Step[] = ["platform", "authorize", "deploy"];

export function DeployModal({
  open,
  onOpenChange,
  onConfirmDeploy,
  name,
  description,
  deployedPlatform,
  setDeployedPlatform,
}: DeployModalProps) {
  const [step, setStepRaw] = useState<Step>("platform");
  const [direction, setDirection] = useState(1);
  const [selected, setSelected] = useState<DeployPlatform>(deployedPlatform ?? "vercel");
  const [authorized, setAuthorized] = useState<Record<DeployPlatform, boolean>>({
    vercel: false,
    netlify: false,
  });
  const [authorizing, setAuthorizing] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);

  const authTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const consoleTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  const goTo = (next: Step) => {
    setDirection(STEP_ORDER.indexOf(next) > STEP_ORDER.indexOf(step) ? 1 : -1);
    setStepRaw(next);
  };

  useEffect(() => {
    if (open) {
      setDirection(1);
      setStepRaw("platform");
      setSelected(deployedPlatform ?? "vercel");
      setAuthorizing(false);
      setDeploying(false);
      setDeployed(false);
      setConsoleLines([]);
    }
    return () => {
      clearTimeout(authTimer.current);
      clearInterval(consoleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, deployedPlatform]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLines]);

  const close = useCallback(() => {
    if (deploying) return;
    onOpenChange(false);
  }, [onOpenChange, deploying]);

  const activeTarget = TARGETS.find((t) => t.id === selected)!;
  const isAuthorizedForSelected = authorized[selected];

  const handleSelectPlatform = (id: DeployPlatform) => {
    setSelected(id);
    setDeployedPlatform?.(id);
  };

  const handleContinueFromPlatform = () => {
    goTo("authorize");
  };

  const handleAuthorize = () => {
    setAuthorizing(true);
    authTimer.current = setTimeout(() => {
      setAuthorized((prev) => ({ ...prev, [selected]: true }));
      setAuthorizing(false);
      goTo("deploy");
      toast.success(`Authorized with ${activeTarget.name}`);
    }, 1100);
  };

  const handleDeploy = () => {
    // NOTE: this simulates a deploy so the console has something to show.
    // Swap this for the real deploy call and stream real log lines into
    // setConsoleLines as they arrive.
    setDeploying(true);
    setDeployed(false);
    setConsoleLines([`Deploying to ${activeTarget.name}…`]);

    const steps = [
      "Uploading project files…",
      "Installing dependencies…",
      "Building project…",
      "Optimizing assets…",
      "Publishing to global network…",
    ];

    let i = 0;
    consoleTimer.current = setInterval(() => {
      if (i < steps.length) {
        setConsoleLines((prev) => [...prev, steps[i]]);
        i += 1;
      } else {
        clearInterval(consoleTimer.current);
        setConsoleLines((prev) => [...prev, "Deployment complete ✔"]);
        setDeploying(false);
        setDeployed(true);
        onConfirmDeploy(selected, name, description);
        toast.success(`Live on ${activeTarget.name}!`);
      }
    }, 650);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="deploy-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-70 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            key="deploy-modal"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-71 flex items-center justify-center pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto relative w-125 max-w-[92vw] rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden"
            >
              {!deploying && (
                <button
                  type="button"
                  onClick={close}
                  className="absolute right-3 top-3 z-10 grid h-6 w-6 cursor-pointer place-items-center rounded-md text-neutral-500 hover:bg-neutral-800 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  {step === "platform" && (
                    <motion.div
                      key="platform"
                      custom={direction}
                      initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="p-6"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                          <Globe className="h-4 w-4" />
                        </div>
                        <div>
                          <h2 className="text-sm font-bold text-white">Where should we deploy?</h2>
                          <p className="text-[11px] text-neutral-500">Choose a hosting platform</p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-2">
                        {TARGETS.map((t) => {
                          const active = selected === t.id;
                          return (
                            <div
                              key={t.id}
                              onClick={() => handleSelectPlatform(t.id)}
                              className={cn(
                                "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                                active
                                  ? "border-white bg-neutral-900"
                                  : "border-neutral-800 hover:border-neutral-600",
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                                  active ? "bg-white text-black" : "bg-neutral-900 text-neutral-400",
                                )}
                              >
                                {t.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-semibold text-white">{t.name}</span>
                                <p className="text-[10px] text-neutral-500 mt-0.5">{t.tagline}</p>
                                {authorized[t.id] && (
                                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-emerald-400">
                                    <Check className="h-2.5 w-2.5" />
                                    Authorized
                                  </span>
                                )}
                              </div>
                              <div
                                className={cn(
                                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                                  active ? "border-white bg-white text-black" : "border-neutral-700",
                                )}
                              >
                                {active && <Check className="h-3 w-3 stroke-3" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-neutral-800 pt-3">
                        <button
                          type="button"
                          onClick={close}
                          className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleContinueFromPlatform}
                          className="flex h-9 min-w-24 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200"
                        >
                          Continue
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === "authorize" && (
                    <motion.div
                      key="authorize"
                      custom={direction}
                      initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="p-6"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <h2 className="text-sm font-bold text-white">
                          {isAuthorizedForSelected ? "Ready to deploy" : `Authorize ${activeTarget.name}`}
                        </h2>
                      </div>

                      <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-xs font-bold text-white">
                            {activeTarget.icon}
                          </div>
                          <span className="text-xs font-semibold text-white">{activeTarget.name}</span>
                        </div>
                        <p className="mt-2 text-[11px] leading-relaxed text-neutral-400">
                          {activeTarget.about}
                        </p>
                      </div>

                      {!isAuthorizedForSelected && (
                        <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
                          Don't have a {activeTarget.name} account? No problem — you'll get the
                          option to create one for free when you authorize, then we'll bring you
                          right back here.
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-neutral-800 pt-3">
                        <button
                          type="button"
                          onClick={() => goTo("platform")}
                          className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          Back
                        </button>
                        {isAuthorizedForSelected ? (
                          <button
                            type="button"
                            onClick={() => goTo("deploy")}
                            className="flex h-9 min-w-24 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200"
                          >
                            Continue
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleAuthorize}
                            disabled={authorizing}
                            className="flex h-9 min-w-30 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {authorizing ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Authorizing…
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Authorize with {activeTarget.name}
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {step === "deploy" && (
                    <motion.div
                      key="deploy"
                      custom={direction}
                      initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="p-6"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                          <Rocket className="h-4 w-4" />
                        </div>
                        <div>
                          <h2 className="text-sm font-bold text-white">
                            Deploy to {activeTarget.name}
                          </h2>
                          <p className="text-[11px] text-neutral-500">
                            {deployed
                              ? "Your site is live"
                              : deploying
                                ? "Deployment in progress…"
                                : "Ready when you are"}
                          </p>
                        </div>
                      </div>

                      {consoleLines.length > 0 && (
                        <div className="mt-4 max-h-48 overflow-y-auto rounded-lg border border-neutral-800 bg-black px-3 py-3 font-mono">
                          <div className="mb-2 flex items-center gap-1.5 text-neutral-600">
                            <Terminal className="h-3 w-3" />
                            <span className="text-[10px] uppercase tracking-wide">Console</span>
                          </div>
                          <div className="space-y-1">
                            {consoleLines.map((line, idx) => (
                              <p key={idx} className="text-[11px] leading-relaxed text-neutral-300">
                                <span className="text-neutral-600">$ </span>
                                {line}
                              </p>
                            ))}
                          </div>
                          <div ref={consoleEndRef} />
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-neutral-800 pt-3">
                        <button
                          type="button"
                          onClick={() => goTo("authorize")}
                          disabled={deploying}
                          className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          Back
                        </button>
                        {deployed ? (
                          <button
                            type="button"
                            onClick={close}
                            className="flex h-9 min-w-24 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Done
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleDeploy}
                            disabled={deploying}
                            className="flex h-9 min-w-24 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deploying ? (
                              <>
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                Deploying…
                              </>
                            ) : (
                              <>
                                <Rocket className="h-3.5 w-3.5" />
                                Deploy
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}