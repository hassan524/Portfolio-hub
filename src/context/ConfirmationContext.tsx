import { createContext, useContext, useState, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Trash2,
  Save,
  ShieldCheck,
  AlertTriangle,
  Info,
  Unplug,
  HelpCircle,
  X,
  Loader2,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────── */

export type ConfirmationType =
  | "delete"
  | "save"
  | "allow"
  | "warning"
  | "disconnect"
  | "info"
  | "default";

export interface ConfirmOptions {
  type?: ConfirmationType;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

/* ─── Color / Icon map per type ─────────────────────────────────────── */

const TYPE_CONFIG: Record<
  ConfirmationType,
  {
    icon: typeof Trash2;
    accent: string;       // ring + icon bg
    accentText: string;   // icon color
    btnClass: string;     // confirm button
    defaultTitle: string;
    defaultDesc: string;
    defaultConfirm: string;
  }
> = {
  delete: {
    icon: Trash2,
    accent: "bg-red-500/10 ring-red-500/20",
    accentText: "text-red-500",
    btnClass: "bg-red-500 hover:bg-red-600 text-white",
    defaultTitle: "Delete item?",
    defaultDesc: "This action cannot be undone. Are you sure you want to continue?",
    defaultConfirm: "Delete",
  },
  save: {
    icon: Save,
    accent: "bg-emerald-500/10 ring-emerald-500/20",
    accentText: "text-emerald-500",
    btnClass: "bg-emerald-500 hover:bg-emerald-600 text-white",
    defaultTitle: "Save changes?",
    defaultDesc: "Your changes will be saved.",
    defaultConfirm: "Save",
  },
  allow: {
    icon: ShieldCheck,
    accent: "bg-blue-500/10 ring-blue-500/20",
    accentText: "text-blue-500",
    btnClass: "bg-blue-500 hover:bg-blue-600 text-white",
    defaultTitle: "Allow this action?",
    defaultDesc: "Confirm before continuing.",
    defaultConfirm: "Allow",
  },
  warning: {
    icon: AlertTriangle,
    accent: "bg-amber-500/10 ring-amber-500/20",
    accentText: "text-amber-500",
    btnClass: "bg-amber-500 hover:bg-amber-600 text-white",
    defaultTitle: "Are you sure?",
    defaultDesc: "Review this action before continuing.",
    defaultConfirm: "Continue",
  },
  disconnect: {
    icon: Unplug,
    accent: "bg-orange-500/10 ring-orange-500/20",
    accentText: "text-orange-500",
    btnClass: "bg-orange-500 hover:bg-orange-600 text-white",
    defaultTitle: "Disconnect?",
    defaultDesc: "This will remove the current connection.",
    defaultConfirm: "Disconnect",
  },
  info: {
    icon: Info,
    accent: "bg-sky-500/10 ring-sky-500/20",
    accentText: "text-sky-500",
    btnClass: "bg-sky-500 hover:bg-sky-600 text-white",
    defaultTitle: "Information",
    defaultDesc: "Please review the following.",
    defaultConfirm: "Got it",
  },
  default: {
    icon: HelpCircle,
    accent: "bg-violet-500/10 ring-violet-500/20",
    accentText: "text-violet-500",
    btnClass: "bg-foreground hover:opacity-90 text-background",
    defaultTitle: "Confirm action",
    defaultDesc: "Are you sure you want to continue?",
    defaultConfirm: "Confirm",
  },
};

/* ─── Context ───────────────────────────────────────────────────────── */

type ConfirmFn = (options?: ConfirmOptions) => Promise<boolean>;

const ConfirmationContext = createContext<ConfirmFn | null>(null);

export function useConfirm(): ConfirmFn {
  const fn = useContext(ConfirmationContext);
  if (!fn) throw new Error("useConfirm must be used within <ConfirmationProvider>");
  return fn;
}

/* ─── Provider + Single Modal ───────────────────────────────────────── */

interface InternalState {
  open: boolean;
  options: ConfirmOptions;
}

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InternalState>({
    open: false,
    options: {},
  });

  const resolveRef = useRef<((v: boolean) => void) | null>(null);

  const confirm = useCallback<ConfirmFn>((options = {}) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setState({ open: true, options });
    });
  }, []);

  const handleClose = useCallback((result: boolean) => {
    setState((prev) => ({ ...prev, open: false }));
    // Resolve after exit animation
    setTimeout(() => {
      resolveRef.current?.(result);
      resolveRef.current = null;
    }, 200);
  }, []);

  const { open, options } = state;
  const type = options.type ?? "default";
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  const title = options.title ?? config.defaultTitle;
  const description = options.description ?? config.defaultDesc;
  const confirmLabel = options.confirmLabel ?? config.defaultConfirm;
  const cancelLabel = options.cancelLabel ?? "Cancel";

  return (
    <ConfirmationContext.Provider value={confirm}>
      {children}

      <AnimatePresence>
        {open && (
          <>
            {/* ── Backdrop ────────────────────────────────────── */}
            <motion.div
              key="confirm-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
              onClick={() => handleClose(false)}
            />

            {/* ── Modal ────────────────────────────────────────── */}
            <motion.div
              key="confirm-modal"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none px-4"
            >
              <div
                className="pointer-events-auto relative w-full max-w-[380px] rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close X */}
                <button
                  type="button"
                  onClick={() => handleClose(false)}
                  className="absolute right-3 top-3 z-10 grid h-6 w-6 cursor-pointer place-items-center rounded-md text-ink-soft/50 transition-colors hover:bg-secondary hover:text-ink"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                <div className="p-6">
                  {/* ── Icon + Title ─────────────────────────── */}
                  <div className="flex items-start gap-3.5">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1",
                        config.accent,
                      )}
                    >
                      <Icon className={cn("h-5 w-5", config.accentText)} />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h2 className="text-[15px] font-bold text-ink leading-tight">
                        {title}
                      </h2>
                      {description && (
                        <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                          {description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ── Actions ──────────────────────────────── */}
                  <div className="mt-6 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleClose(false)}
                      className="h-9 cursor-pointer rounded-lg border border-border px-4 text-xs font-medium text-ink-soft transition-colors hover:bg-secondary hover:text-ink"
                    >
                      {cancelLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClose(true)}
                      className={cn(
                        "h-9 cursor-pointer rounded-lg px-5 text-xs font-semibold transition-all shadow-sm",
                        config.btnClass,
                      )}
                    >
                      {confirmLabel}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ConfirmationContext.Provider>
  );
}
