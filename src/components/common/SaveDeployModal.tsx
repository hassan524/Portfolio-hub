import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DeployPlatform } from "./Deploymodal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import deployapi from "@/api/deploy";

export type { DeployPlatform };
export type SaveMode = "draft" | "deploy";

export interface SaveDeployModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmSave: (mode: SaveMode, websiteName: string, liveUrl: string, description: string) => void;
  websiteName?: string;
  onWebsiteNameChange: (websiteName: string) => void;
  liveUrl?: string;
  onLiveUrlChange: (liveUrl: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
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
    tagline: "Keep it private and publish it whenever you're ready from your dashboard.",
  },
  {
    id: "deploy",
    name: "Save & deploy",
    tagline: "Publish it live on Vercel or Netlify right away and share it with the world.",
  },
];

const MIN_CHARS = 50;
const CHECK_DEBOUNCE_MS = 500;

type Step = "choice" | "info";
const STEP_ORDER: Step[] = ["choice", "info"];

// Counts trimmed characters — used to gate the "Continue" button on step 2.
function charCount(text: string) {
  return text.trim().length;
}

// Turns whatever the user types into a URL-safe slug, since this name
// becomes part of the live deploy link (e.g. your-name.vercel.app).
export function slugifyName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Small numbered progress indicator shown at the top of the dialog —
// replaces the old icon, and actually communicates where the user is.
function StepIndicator({ step }: { step: Step }) {
  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <div className="flex items-center gap-1.5">
      {STEP_ORDER.map((s, i) => (
        <div
          key={s}
          className={cn(
            "h-1 rounded-full transition-all duration-300",
            i === stepIndex ? "w-6 bg-white" : "w-1.5 bg-neutral-700",
          )}
        />
      ))}
    </div>
  );
}

export function SaveDeployModal({
  open,
  onOpenChange,
  onConfirmSave,
  websiteName = "",
  onWebsiteNameChange,
  liveUrl = "",
  onLiveUrlChange,
  description = "",
  onDescriptionChange,
  saving = false,
}: SaveDeployModalProps) {
  const [step, setStepRaw] = useState<Step>("choice");
  const [direction, setDirection] = useState(1);
  const [saveMode, setSaveMode] = useState<SaveMode>("deploy");

  // "idle" | "checking" | "available" | "taken" | "error"
  const [availability, setAvailability] = useState("idle");
  const [checkedUrl, setCheckedUrl] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // holds the pending debounce timer — typed as "timer or undefined" so
  // clearTimeout() accepts it (this is what was throwing the ts error)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // counts each check so a slow, old response can't overwrite a newer one
  const seqRef = useRef(0);

  const chars = charCount(description);
  const hasTypedName = websiteName.trim().length > 0;
  const hasTypedLiveUrl = liveUrl.trim().length > 0;
  const slug = slugifyName(liveUrl);

  const canContinueFromInfo =
    hasTypedName &&
    chars >= MIN_CHARS &&
    (saveMode === "draft" || (hasTypedLiveUrl && availability !== "taken"));

  // Moves between steps and tracks direction so the slide animation knows
  // whether to enter from the left (forward) or right (back).
  const goTo = (next: Step) => {
    setDirection(STEP_ORDER.indexOf(next) > STEP_ORDER.indexOf(step) ? 1 : -1);
    setStepRaw(next);
  };

  // Resets the whole form back to a blank state every time the dialog opens,
  // so leftover values from a previous save don't linger.
  useEffect(() => {
    if (open) {
      setDirection(1);
      setStepRaw("choice");
      setSaveMode("deploy");
      setAvailability("idle");
      setCheckedUrl("");
      setSuggestions([]);
    }
  }, [open]);

  // Live availability check — debounced on liveUrl.
  // 1. user types liveUrl -> slug changes -> this effect re-runs
  // 2. cancel whatever timer was waiting, start a fresh 500ms one
  // 3. if they keep typing, step 2 keeps cancelling/restarting it
  // 4. once they pause for 500ms, it fires and calls the backend,
  //    which asks Vercel if that project name is taken
  useEffect(() => {
    clearTimeout(debounceRef.current);

    if (saveMode !== "deploy" || !hasTypedLiveUrl) {
      setAvailability("idle");
      return;
    }

    setAvailability("checking");
    const mySeq = ++seqRef.current;

    debounceRef.current = setTimeout(() => {
      deployapi
        .checkNameAvailability("vercel", slug)
        .then((res) => {
          if (seqRef.current !== mySeq) return; // a newer check already started, ignore this stale one
          setAvailability(res.data.available ? "available" : "taken");
          setCheckedUrl(res.data.url);
          setSuggestions(res.data.suggestions || []);
        })
        .catch(() => {
          if (seqRef.current === mySeq) setAvailability("error");
        });
    }, CHECK_DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [slug, saveMode, hasTypedLiveUrl]);

  // Closes the dialog — blocked while a save is actually in progress.
  const close = useCallback(() => {
    if (saving) return;
    onOpenChange(false);
  }, [onOpenChange, saving]);

  // Fires the parent's save handler with whatever the user filled in.
  const handleContinueFromInfo = () => {
    onConfirmSave(saveMode, websiteName.trim(), liveUrl.trim(), description.trim());
  };

  return (
    <Dialog open={open} onOpenChange={saving ? undefined : onOpenChange}>
      <DialogContent className="w-96 max-w-[92vw] gap-0 overflow-hidden border-neutral-800 bg-neutral-950 p-0">
        {/* ---------------- Header ---------------- */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-white">
              {step === "choice" ? "Save your portfolio" : "A few details"}
            </h2>
            <p className="mt-0.5 text-[11px] text-neutral-500">
              {step === "choice"
                ? "Choose how you'd like to save your work."
                : "This helps people find and understand your portfolio."}
            </p>
          </div>

          {!saving && (
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* ---------------- Step content ---------------- */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            {step === "choice" && (
              <motion.div
                key="choice"
                custom={direction}
                initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="p-5"
              >
                <div className="space-y-2">
                  {SAVE_MODES.map((mode) => {
                    const active = saveMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setSaveMode(mode.id)}
                        className={cn(
                          "flex w-full cursor-pointer items-start gap-3 rounded-lg border p-3 text-left transition-colors",
                          active
                            ? "border-neutral-600 bg-neutral-900"
                            : "border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/50",
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium text-white">{mode.name}</span>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-500">
                            {mode.tagline}
                          </p>
                        </div>

                        <div
                          className={cn(
                            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                            active
                              ? "border-white bg-white text-black"
                              : "border-neutral-700 text-transparent",
                          )}
                        >
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === "info" && (
              <motion.div
                key="info"
                custom={direction}
                initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="p-5"
              >
                {/* Website name */}
                <div className="space-y-1.5">
                  <label htmlFor="website-name" className="text-[11px] font-medium text-neutral-400">
                    Portfolio name
                  </label>
                  <input
                    id="website-name"
                    value={websiteName}
                    onChange={(e) => onWebsiteNameChange(e.target.value)}
                    placeholder="Add your portfolio name"
                    disabled={saving}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-neutral-600 disabled:opacity-50"
                  />
                </div>

                {/* Live URL */}
                <div className="mt-3.5 space-y-1.5">
                  <label htmlFor="live-url" className="text-[11px] font-medium text-neutral-400">
                    Live URL
                  </label>
                  <input
                    id="live-url"
                    value={liveUrl}
                    onChange={(e) => onLiveUrlChange(e.target.value)}
                    placeholder="e.g. my-awesome-portfolio"
                    disabled={saving}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-neutral-600 disabled:opacity-50"
                  />

                  {saveMode === "deploy" && hasTypedLiveUrl && (
                    <div className="flex items-start gap-1.5 text-[10px] leading-relaxed">
                      {availability === "checking" && (
                        <>
                          <Loader2 className="h-3 w-3 mt-0.5 shrink-0 animate-spin text-neutral-400" />
                          <span className="text-neutral-500">
                            Checking <span className="font-mono text-neutral-300">{slug}.vercel.app</span>…
                          </span>
                        </>
                      )}
                      {availability === "available" && (
                        <>
                          <Check className="h-3 w-3 mt-0.5 shrink-0 text-emerald-400" />
                          <span className="text-neutral-500">
                            <span className="font-mono text-primary">{checkedUrl}</span> is available
                          </span>
                        </>
                      )}
                      {availability === "taken" && (
                        <div className="w-full">
                          <div className="flex items-start gap-1.5">
                            <AlertCircle className="h-3 w-3 mt-0.5 shrink-0 text-red-400" />
                            <span className="text-neutral-500">
                              <span className="font-mono text-red-300">{checkedUrl}</span> is already taken
                            </span>
                          </div>
                          {suggestions.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1.5 pl-4.5">
                              {suggestions.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => onLiveUrlChange(s)}
                                  className="rounded-full border border-neutral-700 px-2 py-0.5 text-[10px] font-mono text-neutral-300 hover:border-neutral-500 hover:text-white"
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {availability === "error" && (
                        <span className="text-neutral-500">Couldn't check right now — you can still continue.</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="portfolio-description" className="text-[11px] font-medium text-neutral-400">
                      Description
                    </label>
                    <span
                      className={cn(
                        "text-[10px] tabular-nums",
                        chars >= MIN_CHARS ? "text-neutral-400" : "text-neutral-600",
                      )}
                    >
                      {chars}/{MIN_CHARS}
                    </span>
                  </div>
                  <textarea
                    id="portfolio-description"
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                    rows={4}
                    placeholder="What's this portfolio for, who's it for, what should people notice first?"
                    disabled={saving}
                    className="w-full resize-none rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs leading-relaxed text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-neutral-600 disabled:opacity-50"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---------------- Footer ---------------- */}
        <div className="flex items-center justify-between border-t border-neutral-800 px-5 py-3.5">
          <StepIndicator step={step} />

          <div className="flex items-center gap-2">
            {step === "info" && (
              <button
                type="button"
                onClick={() => goTo("choice")}
                disabled={saving}
                className="flex h-8 cursor-pointer items-center gap-1 rounded-md px-2.5 text-xs font-medium text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            )}

            {step === "choice" ? (
              <button
                type="button"
                onClick={() => goTo("info")}
                className="flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-white px-3.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
              >
                Continue
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={!canContinueFromInfo || saving}
                onClick={handleContinueFromInfo}
                className="flex h-8 min-w-24 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-white px-3.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
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
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}