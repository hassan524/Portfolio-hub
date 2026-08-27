import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { getBlockComponent } from "@/lib/blockRegistry";
import type { SiteData, Theme } from "@/types/builder.schema";

const FALLBACK_THEME: Theme = {
  bg: "#ffffff",
  ink: "#111111",
  accent: "#6366f1",
  fontHeading: "inherit",
  fontBody: "inherit",
  corners: "soft",
  spacing: "cozy",
};

const FRAME_WIDTH = 1440;
const VIEWPORT_PADDING = 32;

interface Props {
  site: SiteData | null;
  open: boolean;
  onClose: () => void;
  onContinue: (site: SiteData) => void;
}

export function TemplateFullPreview({ site, open, onClose, onContinue }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const recalcScale = useCallback(() => {
    const viewportWidth = scrollRef.current?.clientWidth ?? FRAME_WIDTH;
    const available = viewportWidth - VIEWPORT_PADDING * 2;
    const next = Math.min(1, available / FRAME_WIDTH);
    setScale(Number.isFinite(next) && next > 0 ? next : 1);
  }, []);

  useEffect(() => {
    if (!open) return;
    recalcScale();
    scrollRef.current?.scrollTo({ top: 0 });
  }, [open, site, recalcScale]);

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => recalcScale());
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, recalcScale]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !site) return null;

  const theme = site.theme ?? FALLBACK_THEME;
  const sorted = [...(site.blocks ?? [])].sort((a, b) => a.order - b.order);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[94vh] w-[98vw] max-w-[1800px] gap-3 overflow-hidden rounded-3xl border border-border bg-background p-3 shadow-lift"
          >
            {/* Scaled-down scrollable site preview, read-only */}
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-sm">
              <div className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-background px-4">
                <span className="truncate text-xs font-medium text-ink-soft">Preview</span>
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 cursor-pointer place-items-center rounded-md text-ink-soft transition-colors hover:bg-secondary hover:text-ink"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="simple-scrollbar flex-1 min-h-0 overflow-auto p-4 md:p-6"
                style={{ overscrollBehavior: "contain" }}
              >
                <div
                  className="mx-auto min-h-full border border-border bg-background shadow-lift pointer-events-none select-none"
                  style={{ width: FRAME_WIDTH, zoom: scale }}
                >
                  <div style={{ background: theme.bg, color: theme.ink }} className="min-h-full w-full">
                    {sorted.map((block) => {
                      const variant = (block.props as { variant?: string }).variant;
                      const Cmp = getBlockComponent(block.props.kind, variant, site.category, site.id);
                      if (!Cmp) return null;

                      const componentProps =
                        block.props.kind === "navbar" || block.props.kind === "footer"
                          ? { ...block.props, logo: site.logo }
                          : block.props;

                      return (
                        <div key={block.id} data-block-kind={block.props.kind}>
                          <Cmp id={block.id} props={componentProps} theme={theme} onChange={() => undefined} />
                        </div>
                      );
                    })}

                    {!sorted.some((b) => b.props.kind === "footer") && (
                      <div
                        className="px-8 md:px-16 py-6 text-[11px] flex items-center justify-between"
                        style={{ borderTop: `1px solid ${theme.ink}10`, color: `${theme.ink}40` }}
                      >
                        <span>© 2026 {site.name}</span>
                        <span>
                          Built with <span style={{ color: theme.accent }}>Portflu</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Info panel — read-only details + Continue CTA */}
            <div className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-border bg-surface-elevated p-5">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-foreground">{site.name}</h3>
                  {site.category && (
                    <span className="mt-1 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-ink-soft">
                      {site.category}
                    </span>
                  )}
                </div>
              </div>

              {site.tagline && (
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{site.tagline}</p>
              )}

              <div className="mt-6">
                <p className="text-[11px] font-medium uppercase tracking-wide text-ink-soft/70">
                  Theme
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <ThemeSwatch color={theme.bg} label="Background" />
                  <ThemeSwatch color={theme.ink} label="Ink" />
                  <ThemeSwatch color={theme.accent} label="Accent" />
                </div>
              </div>

              <div className="mt-6 space-y-2 text-xs text-ink-soft">
                <div className="flex justify-between border-b border-border pb-2">
                  <span>Sections</span>
                  <span className="font-medium text-ink">{sorted.length}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span>Corners</span>
                  <span className="font-medium capitalize text-ink">{theme.corners}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Spacing</span>
                  <span className="font-medium capitalize text-ink">{theme.spacing}</span>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-2 pt-6">
                <button
                  onClick={() => onContinue(site)}
                  className="flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full border border-border px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-secondary hover:text-ink cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ThemeSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div
      className="h-7 w-7 rounded-full border border-border shadow-sm"
      style={{ background: color }}
      title={label}
    />
  );
}