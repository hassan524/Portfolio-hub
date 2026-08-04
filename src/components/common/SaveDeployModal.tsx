import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, Globe, Rocket, ArrowLeft, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";


export interface SaveDeployModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmSave: (deploymentTarget?: string) => void;
  siteName?: string;
  deployedPlatform?: "vercel" | "netlify";
  setDeployedPlatform?: (platform: "vercel" | "netlify") => void;
}

type DeployTarget = {
  id: string;
  name: string;
  tagline: string;
  icon: string;
};

const TARGETS: DeployTarget[] = [
  { id: "vercel", name: "Vercel", tagline: "Fast, global, zero-config", icon: "▲" },
  { id: "netlify", name: "Netlify", tagline: "Simple deploys, custom domains", icon: "◆" },
];


function useTypewriter(text: string, speed = 28, active = false) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      idx.current = 0;
      return;
    }

    const interval = setInterval(() => {
      if (idx.current < text.length) {
        setDisplayed(text.slice(0, idx.current + 1));
        idx.current++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, active]);

  return displayed;
}


const DEPLOY_EXPLANATION =
  "Vercel and Netlify are free hosting platforms. They take your site and put it live on the internet in seconds — no server setup needed. Just pick one and hit deploy.";


export function SaveDeployModal({ open, onOpenChange, onConfirmSave, siteName = "My Portfolio", deployedPlatform, setDeployedPlatform }: SaveDeployModalProps) {

  const [step, setStep] = useState<"confirm" | "saving" | "deploy">("confirm");
  const [isDeploying, setIsDeploying] = useState(false);
  const [selected, setSelected] = useState<"vercel" | "netlify">(deployedPlatform ?? "vercel");

  const typedText = useTypewriter(DEPLOY_EXPLANATION, 22, step === "deploy");

  useEffect(() => {
    if (open) {
      setStep("confirm");
      setIsDeploying(false);
      setSelected(deployedPlatform ?? "vercel");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  const handleConfirm = () => {
    setStep("saving");
    setTimeout(() => setStep("deploy"), 1200);
  };

  // Selecting a card now updates both local state (for the UI highlight)
  // and the parent's deployedPlatform state immediately, instead of only
  // being reflected after the deploy button is pressed.
  const handleSelect = (id: "vercel" | "netlify") => {
    setSelected(id);
    setDeployedPlatform?.(id);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    const t = TARGETS.find((x) => x.id === selected);
    setTimeout(() => {
      setIsDeploying(false);
      onConfirmSave(selected);
      close();
      toast.success(`Deploying to ${t?.name ?? "platform"}!`);
    }, 1000);
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
          {/* Backdrop */}
          <motion.div
            key="save-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal wrapper */}
          <motion.div
            key="save-modal"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[61] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              layout
              transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "pointer-events-auto relative rounded-2xl border border-border bg-background shadow-2xl overflow-hidden",
                step === "deploy" ? "w-[380px]" : "w-[420px]",
              )}
            >
              {/* Close */}
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 z-10 grid h-6 w-6 cursor-pointer place-items-center rounded-md text-ink-soft/50 transition-colors hover:bg-secondary hover:text-ink"
              >
                <X className="h-3.5 w-3.5" />
              </button>

              <AnimatePresence mode="wait">
                {/* ── Step 1: Confirm ────────────────────────────────── */}
                {step === "confirm" && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="p-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Save className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-ink">Save changes?</h2>
                        <p className="mt-0.5 text-[11px] text-ink-soft">
                          This updates <span className="font-semibold text-ink">"{siteName}"</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={close}
                        className="h-9 cursor-pointer rounded-lg border border-border px-4 text-xs font-medium text-ink-soft transition-colors hover:bg-secondary hover:text-ink"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirm}
                        className="h-9 cursor-pointer rounded-lg bg-foreground px-5 text-xs font-semibold text-background transition-opacity hover:opacity-90"
                      >
                        Okay
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 1.5: Saving spinner ───────────────────────── */}
                {step === "saving" && (
                  <motion.div
                    key="saving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center gap-3 py-14 px-6"
                  >
                    <Loader2 className="h-7 w-7 animate-spin text-accent" />
                    <p className="text-sm font-medium text-ink">Saving…</p>
                  </motion.div>
                )}

                {/* ── Step 2: Deploy ─────────────────────────────────── */}
                {step === "deploy" && (
                  <motion.div
                    key="deploy"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="p-5"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
                        <Rocket className="h-4 w-4" />
                      </div>
                      <h2 className="text-sm font-bold text-ink">Deploy your site</h2>
                    </div>

                    {/* Typewriter explanation */}
                    <div className="mt-3 min-h-[52px] rounded-lg bg-secondary/50 px-3 py-2.5">
                      <p className="text-[11px] leading-[1.6] text-ink-soft">
                        {typedText}
                        <span className="inline-block w-[2px] h-3 ml-0.5 bg-accent animate-pulse align-middle" />
                      </p>
                    </div>

                    {/* Target cards */}
                    <div className="mt-4 space-y-2">
                      {TARGETS.map((t) => {
                        const active = selected === t.id;
                        return (
                          <div
                            key={t.id}
                            onClick={() => handleSelect(t.id as "vercel" | "netlify")}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all",
                              active
                                ? "border-foreground bg-foreground/[0.04] shadow-sm ring-1 ring-foreground/10"
                                : "border-border hover:border-ink-soft/30 hover:bg-secondary/40",
                            )}
                          >
                            <div
                              className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors",
                                active
                                  ? "bg-foreground text-background"
                                  : "bg-secondary text-ink-soft",
                              )}
                            >
                              {t.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-semibold text-ink">{t.name}</span>
                              <p className="text-[10px] text-ink-soft mt-0.5">{t.tagline}</p>
                            </div>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                                active
                                  ? "border-foreground bg-foreground text-background"
                                  : "border-border",
                              )}
                            >
                              {active && <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                      <button
                        type="button"
                        onClick={() => setStep("confirm")}
                        disabled={isDeploying}
                        className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 text-xs font-medium text-ink-soft hover:bg-secondary hover:text-ink"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleDeploy}
                        disabled={isDeploying}
                        className="flex h-9 min-w-[120px] cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 text-xs font-semibold text-background shadow-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                      >
                        {isDeploying ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            Deploying…
                          </>
                        ) : (
                          <>
                            <Globe className="h-3.5 w-3.5" />
                            Deploy Now
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}