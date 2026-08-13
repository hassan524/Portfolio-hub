import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Rocket, ArrowLeft, ArrowRight, X, Check, FileEdit, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeployPlatform } from "./Deploymodal";

export type { DeployPlatform };
export type SaveMode = "draft" | "deploy";

export interface SaveDeployModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmSave: (mode: SaveMode, name: string, description: string) => void;
  onProceedToDeploy?: (name: string, description: string) => void;
  siteName?: string;
  deployedPlatform?: DeployPlatform;
  setDeployedPlatform?: (platform: DeployPlatform) => void;
  saving?: boolean;
}

type SaveModeOption = {
  id: SaveMode;
  name: string;
  tagline: string;
};

const SAVE_MODES: SaveModeOption[] = [
  {
    id: "draft",
    name: "Save as draft",
    tagline: "Keep it private, publish whenever you're ready",
  },
  {
    id: "deploy",
    name: "Save & deploy",
    tagline: "Publish it live on Vercel or Netlify",
  },
];

const MIN_CHARS = 50;

type Step = "choice" | "info";
const STEP_ORDER: Step[] = ["choice", "info"];

function charCount(text: string) {
  return text.trim().length;
}

export function SaveDeployModal({
  open,
  onOpenChange,
  onConfirmSave,
  onProceedToDeploy,
  siteName = "My Portfolio",
  saving = false,
}: SaveDeployModalProps) {
  const [step, setStepRaw] = useState<Step>("choice");
  const [direction, setDirection] = useState(1);
  const [saveMode, setSaveMode] = useState<SaveMode>("deploy");
  const [name, setName] = useState(siteName);
  const [description, setDescription] = useState("");

  const chars = charCount(description);
  const canContinueFromInfo = name.trim().length > 0 && chars >= MIN_CHARS;

  const goTo = (next: Step) => {
    setDirection(STEP_ORDER.indexOf(next) > STEP_ORDER.indexOf(step) ? 1 : -1);
    setStepRaw(next);
  };

  useEffect(() => {
    if (open) {
      setDirection(1);
      setStepRaw("choice");
      setSaveMode("deploy");
      setName(siteName);
      setDescription("");
    }
  }, [open, siteName]);

  const close = useCallback(() => {
    if (saving) return;
    onOpenChange(false);
  }, [onOpenChange, saving]);

  const handleContinueFromInfo = () => {
    onConfirmSave(saveMode, name, description);
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
            key="save-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            key="save-modal"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-61 flex items-center justify-center pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto relative w-95 rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden"
            >
              {!saving && (
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
                  {step === "choice" && (
                    <motion.div
                      key="choice"
                      custom={direction}
                      initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="p-5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                          <Rocket className="h-4 w-4" />
                        </div>
                        <h2 className="text-sm font-bold text-white">How do you want to save?</h2>
                      </div>

                      <div className="mt-4 space-y-2">
                        {SAVE_MODES.map((m) => {
                          const active = saveMode === m.id;
                          return (
                            <div
                              key={m.id}
                              role="radio"
                              aria-checked={active}
                              onClick={() => setSaveMode(m.id)}
                              className={cn(
                                "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                                active
                                  ? "border-white bg-neutral-900"
                                  : "border-neutral-800 hover:border-neutral-600",
                              )}
                            >
                              <div
                                className={cn(
                                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                                  active ? "bg-white text-black" : "bg-neutral-900 text-neutral-400",
                                )}
                              >
                                {m.id === "draft" ? (
                                  <FileEdit className="h-4 w-4" />
                                ) : (
                                  <Globe className="h-4 w-4" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-semibold text-white">{m.name}</span>
                                <p className="text-[10px] text-neutral-500 mt-0.5">{m.tagline}</p>
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

                      <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-3">
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
                          onClick={() => goTo("info")}
                          className="flex h-9 min-w-24 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200"
                        >
                          Continue
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === "info" && (
                    <motion.div
                      key="info"
                      custom={direction}
                      initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="p-5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                          <Rocket className="h-4 w-4" />
                        </div>
                        <h2 className="text-sm font-bold text-white">About your portfolio</h2>
                      </div>

                      <div className="mt-4 space-y-1.5">
                        <label className="text-[11px] font-medium text-neutral-400">
                          Portfolio name
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Hassan's Portfolio"
                          disabled={saving}
                          className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder:text-neutral-600 outline-none focus:border-neutral-600 disabled:opacity-50"
                        />
                      </div>

                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-medium text-neutral-400">
                            Describe your portfolio
                          </label>
                          <span
                            className={cn(
                              "text-[10px]",
                              chars >= MIN_CHARS ? "text-neutral-400" : "text-neutral-600",
                            )}
                          >
                            {chars}/{MIN_CHARS} chars
                          </span>
                        </div>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          rows={4}
                          placeholder="What is this portfolio for, who's it for, what should people notice first?"
                          disabled={saving}
                          className="w-full resize-none rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs leading-relaxed text-white placeholder:text-neutral-600 outline-none focus:border-neutral-600 disabled:opacity-50"
                        />
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-3">
                        <button
                          type="button"
                          onClick={() => goTo("choice")}
                          disabled={saving}
                          className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2 text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          Back
                        </button>
                        <button
                          type="button"
                          disabled={!canContinueFromInfo || saving}
                          onClick={handleContinueFromInfo}
                          className="flex h-9 min-w-24 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white px-4 text-xs font-semibold text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white"
                        >
                          {saving ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Saving…
                            </>
                          ) : (
                            <>
                              Continue
                              <ArrowRight className="h-3.5 w-3.5" />
                            </>
                          )}
                        </button>
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