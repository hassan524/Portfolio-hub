import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "../types";
import type { ProjectsProps } from "@/types/builder.schema";

type Props = BlockComponentProps<ProjectsProps>;

/**
 * Extra per-item fields, all optional. They work immediately because
 * they're purely additive to whatever `ProjectsProps["items"][number]`
 * already looks like — nothing else needs to change for these templates
 * to compile and render. If you want your builder's own field-editor
 * panel (outside this file) to expose them as inputs too, mirror these
 * onto the real items type in builder.schema.ts; until then they simply
 * won't show a UI for editing them anywhere except inline, here.
 *
 * They're deliberately generic — this isn't only for dev portfolios.
 * `category`/`period` reads just as well as "Wedding · June 2024" or
 * "Panel upgrade · 2023" as it does "Web app · 2024". `tags` is a single
 * free-text line for whatever "skills/services" means in that field:
 * "React · Node · Supabase", "Bridal hair · Makeup", "Wiring · Rewiring".
 */
type Item = ProjectsProps["items"][number] & {
  category?: string;
  period?: string;
  tags?: string;
  link?: string;
  linkLabel?: string;
  badgeLabel?: string;
  skillsLabel?: string;
  intro?: string;
};

/* ──────────────────────────────────────────────────────────
   Shared plumbing
───────────────────────────────────────────────────────── */

/** Stops editable-text clicks from bubbling into parent card/dialog handlers. */
function EStop({ children }: { children: React.ReactNode }) {
  return (
    <span
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      className="inline"
    >
      {children}
    </span>
  );
}

function updateItem(items: Item[], onChange: Props["onChange"], i: number, patch: Partial<Item>) {
  const next = [...items];
  next[i] = { ...next[i], ...patch };
  onChange({ items: next });
}

/** Small "category · period" line — only renders if either is set. */
function MetaLine({
  item,
  items,
  onChange,
  i,
  ink,
  accent,
  className = "mb-2",
}: {
  item: Item;
  items: Item[];
  onChange: Props["onChange"];
  i: number;
  ink: string;
  accent: string;
  className?: string;
}) {
  if (!item.category && !item.period) return null;
  return (
    <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${className}`} style={{ color: accent }}>
      {item.category && (
        <EStop>
          <Editable
            value={item.category}
            onChange={(v) => updateItem(items, onChange, i, { category: v })}
            className="inline"
          />
        </EStop>
      )}
      {item.category && item.period && <span style={{ color: `${ink}30` }}>·</span>}
      {item.period && (
        <EStop>
          <Editable
            value={item.period}
            onChange={(v) => updateItem(items, onChange, i, { period: v })}
            className="inline"
            style={{ color: `${ink}55` }}
          />
        </EStop>
      )}
    </div>
  );
}

/** Free-text "skills / services" line — only renders once the user has typed something. */
function TagsLine({
  item,
  items,
  onChange,
  i,
  accent,
  className = "mt-3",
}: {
  item: Item;
  items: Item[];
  onChange: Props["onChange"];
  i: number;
  accent: string;
  className?: string;
}) {
  if (!item.tags) return null;
  return (
    <EStop>
      <Editable
        as="p"
        value={item.tags}
        onChange={(v) => updateItem(items, onChange, i, { tags: v })}
        className={`text-[11px] font-semibold uppercase tracking-wide ${className}`}
        style={{ color: accent }}
      />
    </EStop>
  );
}

/** A real outbound link (not a dialog trigger) — used by the sections that
 *  link straight out to a live site / case study instead of popping a modal. */
function VisitLink({
  item,
  accent,
  label = "Visit",
  className,
  style,
  dialogMarker = false,
}: {
  item: Item | null;
  accent: string;
  label?: string;
  className: string;
  style?: React.CSSProperties;
  dialogMarker?: boolean;
}) {
  return (
    <a
      href={item?.link || "#"}
      target={item?.link ? "_blank" : undefined}
      rel={item?.link ? "noopener noreferrer" : undefined}
      onClick={(e) => e.stopPropagation()}
      title={item?.link ? undefined : "Add a link to this item to make this go somewhere"}
      className={className}
      style={style ?? { color: accent }}
      {...(dialogMarker ? { "data-dialog-visit": true } : {})}
    >
      <span {...(dialogMarker ? { "data-dialog-visit-label": true } : {})}>
        {item?.linkLabel || label}
      </span>{" "}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

const fadeUp: Variants = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
};

const fadeUpViewport = { once: true, margin: "-80px" } as const;
const fadeUpTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

const stagger: Variants = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const child: Variants = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
};
const childTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

/* ──────────────────────────────────────────────────────────
   Dialog system — five distinct "quick view" experiences.
   Only used by sections where a rich in-page preview makes
   sense; the list/row-style sections below link straight out
   instead (see VisitLink) so not everything behaves the same way.
───────────────────────────────────────────────────────── */

type DialogProps = { item: Item | null; ink: string; bg: string; accent: string; onClose: () => void };

function useEscToClose(item: Item | null, onClose: () => void) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);
}

function CloseButton({ ink, onClose }: { ink: string; onClose: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08, rotate: 90 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClose}
      data-dialog-close
      className="shrink-0 h-11 w-11 rounded-full grid place-items-center cursor-pointer"
      style={{ background: `${ink}0c`, color: `${ink}90`, border: "none" }}
      aria-label="Close"
    >
      <X className="h-5 w-5" />
    </motion.button>
  );
}

function DialogVisitRow({ item, accent }: { item: Item; accent: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.5 }}>
      <VisitLink
        item={item}
        accent={accent}
        label="View project"
        className="mt-2 inline-flex items-center gap-2 text-base font-semibold cursor-pointer hover:gap-3 transition-[gap]"
      />
    </motion.div>
  );
}

/* 1 — Editorial */
function DialogEditorial({ item, ink, bg, accent, onClose }: DialogProps) {
  useEscToClose(item, onClose);
  const open = !!item;
  return (
    <div data-project-dialog="editorial" className={open ? "is-open" : ""}>
      <motion.div
        data-dialog-backdrop
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        className="fixed inset-0 z-[60]"
        style={{ background: "rgba(10,10,10,0.6)", backdropFilter: "blur(10px)", pointerEvents: open ? "auto" : "none" }}
      />
      <motion.div
        data-dialog-panel
        initial={false}
        animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 40 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div
          className="pointer-events-auto w-full max-w-3xl rounded-[2rem] overflow-hidden max-h-[88vh] overflow-y-auto"
          style={{ background: bg, boxShadow: `0 60px 140px -30px ${ink}45` }}
        >
          <div
            className="aspect-[16/8] w-full flex items-center justify-center relative overflow-hidden"
            style={{ background: item?.featured ? `${accent}20` : `${ink}08` }}
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1], rotate: [0, 6, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 opacity-25"
              style={{ background: `radial-gradient(circle at 65% 35%, ${accent}, transparent 65%)` }}
            />
            <div data-dialog-letter className="relative font-display text-[10rem] md:text-[13rem] font-black opacity-[0.08] leading-none" style={{ color: ink }}>
              {item?.title?.[0]}
            </div>
            <div
              data-dialog-badge
              className="absolute top-6 left-6 text-xs px-4 py-2 rounded-full font-semibold tracking-wide"
              style={{ background: accent, color: bg, display: item?.featured ? "" : "none" }}
            >
              {item?.badgeLabel || "Featured"}
            </div>
          </div>
          <div className="p-10 md:p-14">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div
                  data-dialog-meta
                  className="mb-3 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: accent, display: (item?.category || item?.period) ? "" : "none" }}
                >
                  {[item?.category, item?.period].filter(Boolean).join(" · ")}
                </div>
                <motion.h3
                  data-dialog-title
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="font-display text-3xl md:text-5xl font-black leading-tight"
                  style={{ color: ink }}
                >
                  {item?.title}
                </motion.h3>
              </div>
              <CloseButton ink={ink} onClose={onClose} />
            </div>
            <motion.p
              data-dialog-desc
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="mt-6 text-lg leading-relaxed max-w-xl"
              style={{ color: `${ink}72`, display: item?.desc ? "" : "none" }}
            >
              {item?.desc}
            </motion.p>
            <motion.p
              data-dialog-tags
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.32 }}
              className="mt-4 text-xs font-semibold uppercase tracking-wide"
              style={{ color: `${ink}45`, display: item?.tags ? "" : "none" }}
            >
              {item?.tags}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36, duration: 0.5 }}>
              <VisitLink item={item} accent={accent} label="View project" dialogMarker className="mt-2 inline-flex items-center gap-2 text-base font-semibold cursor-pointer hover:gap-3 transition-[gap]" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* 2 — Dark */
function DialogDark({ item, ink, bg, accent, onClose }: DialogProps) {
  useEscToClose(item, onClose);
  const open = !!item;
  return (
    <div data-project-dialog="dark" className={open ? "is-open" : ""}>
      <motion.div
        data-dialog-backdrop
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60]"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", pointerEvents: open ? "auto" : "none" }}
      />
      <motion.div
        data-dialog-panel
        initial={false}
        animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 60 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div className="pointer-events-auto relative w-full max-w-3xl rounded-[2rem] overflow-hidden max-h-[88vh] overflow-y-auto" style={{ background: ink, boxShadow: `0 60px 160px -20px ${accent}40` }}>
          <motion.div
            animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-[100px] pointer-events-none"
            style={{ background: accent }}
          />
          <div className="relative p-10 md:p-14">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div data-dialog-badge className="text-[11px] font-mono uppercase tracking-[0.3em] mb-2" style={{ color: `${bg}55`, display: item?.featured ? "" : "none" }}>
                  {item?.badgeLabel || "Featured project"}
                </div>
                <div data-dialog-meta className="text-[11px] font-mono uppercase tracking-[0.3em] mb-4" style={{ color: `${bg}35`, display: (item?.category || item?.period) ? "" : "none" }}>
                  {[item?.category, item?.period].filter(Boolean).join(" · ")}
                </div>
                <h3 data-dialog-title className="font-display text-3xl md:text-5xl font-black leading-tight" style={{ color: bg }}>
                  {item?.title}
                </h3>
              </div>
              <CloseButton ink={bg} onClose={onClose} />
            </div>
            <motion.p
              data-dialog-desc
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-6 text-lg leading-relaxed max-w-xl"
              style={{ color: `${bg}70`, display: item?.desc ? "" : "none" }}
            >
              {item?.desc}
            </motion.p>
            <p data-dialog-tags className="mt-4 text-xs font-semibold uppercase tracking-wide" style={{ color: `${bg}45`, display: item?.tags ? "" : "none" }}>
              {item?.tags}
            </p>
            <div className="mt-10">
              <VisitLink item={item} accent={accent} label="View project" dialogMarker className="inline-flex items-center gap-2.5 text-base font-semibold cursor-pointer hover:gap-3.5 transition-[gap]" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* 3 — Terminal */
function DialogTerminal({ item, ink, bg, accent, onClose }: DialogProps) {
  useEscToClose(item, onClose);
  const open = !!item;
  return (
    <div data-project-dialog="terminal" className={open ? "is-open" : ""}>
      <motion.div
        data-dialog-backdrop
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60]"
        style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", pointerEvents: open ? "auto" : "none" }}
      />
      <motion.div
        data-dialog-panel
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div className="pointer-events-auto w-full max-w-2xl rounded-2xl overflow-hidden font-mono max-h-[85vh] overflow-y-auto" style={{ background: bg, border: `1px solid ${ink}20`, boxShadow: `0 50px 120px -30px ${ink}35` }}>
          <div className="flex items-center gap-2 px-6 py-4" style={{ borderBottom: `1px solid ${ink}12`, background: `${ink}04` }}>
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff6058" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#27ca40" }} />
            <span data-dialog-filename className="ml-3 text-xs truncate" style={{ color: `${ink}40` }}>
              cat ./{item?.title?.toLowerCase().replace(/\s+/g, "-")}.md
            </span>
            <button onClick={onClose} data-dialog-close className="ml-auto shrink-0 cursor-pointer" style={{ color: `${ink}50`, background: "none", border: "none" }} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-8 md:p-10 space-y-5 text-base leading-relaxed">
            <div style={{ color: accent }}>
              <span style={{ color: `${ink}35` }}># </span>
              <span data-dialog-title>{item?.title}</span>
              <span data-dialog-meta className="ml-3 text-xs" style={{ color: `${ink}45`, display: (item?.category || item?.period) ? "" : "none" }}>
                {[item?.category, item?.period].filter(Boolean).join(" · ")}
              </span>
            </div>
            <p data-dialog-desc style={{ color: `${ink}75`, display: item?.desc ? "" : "none" }}>{item?.desc}</p>
            <p data-dialog-tags className="text-xs" style={{ color: `${ink}45`, display: item?.tags ? "" : "none" }}>
              {item?.tags}
            </p>
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <span style={{ color: accent }}>$</span>
              <VisitLink item={item} accent={accent} label="open --project" dialogMarker className="inline-flex items-center gap-1.5" />
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ color: accent }}>▌</motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* 4 — Brutalist */
function DialogBrutalist({ item, ink, bg, accent, onClose }: DialogProps) {
  useEscToClose(item, onClose);
  const open = !!item;
  return (
    <div data-project-dialog="brutalist" className={open ? "is-open" : ""}>
      <motion.div
        data-dialog-backdrop
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60]"
        style={{ background: `${ink}cc`, pointerEvents: open ? "auto" : "none" }}
      />
      <motion.div
        data-dialog-panel
        initial={false}
        animate={open ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 30 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div className="pointer-events-auto w-full max-w-2xl max-h-[85vh] overflow-y-auto" style={{ background: bg, border: `3px solid ${ink}`, boxShadow: `12px 12px 0 ${accent}` }}>
          <div className="flex items-start justify-between gap-6 p-8 md:p-10" style={{ borderBottom: `3px solid ${ink}` }}>
            <div>
              <div data-dialog-badge className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 inline-block mb-4" style={{ background: accent, color: bg, display: item?.featured ? "" : "none" }}>
                {item?.badgeLabel || "Featured"}
              </div>
              <div data-dialog-meta className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: `${ink}60`, display: (item?.category || item?.period) ? "" : "none" }}>
                {[item?.category, item?.period].filter(Boolean).join(" / ")}
              </div>
              <h3 data-dialog-title className="font-display text-3xl md:text-5xl font-black uppercase leading-[0.95]" style={{ color: ink }}>
                {item?.title}
              </h3>
            </div>
            <button onClick={onClose} data-dialog-close className="shrink-0 h-11 w-11 grid place-items-center cursor-pointer" style={{ background: ink, color: bg, border: "none" }} aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p data-dialog-desc className="px-8 md:px-10 pt-8 text-lg font-bold leading-relaxed" style={{ color: accent, display: item?.desc ? "" : "none" }}>
            {item?.desc}
          </p>
          <div className="p-8 md:p-10 pt-6">
            <VisitLink item={item} accent={ink} label="OPEN PROJECT" dialogMarker className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest cursor-pointer" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* 5 — Polaroid */
function DialogPolaroid({ item, ink, bg, accent, onClose }: DialogProps) {
  useEscToClose(item, onClose);
  const open = !!item;
  return (
    <div data-project-dialog="polaroid" className={open ? "is-open" : ""}>
      <motion.div
        data-dialog-backdrop
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60]"
        style={{ background: "rgba(20,16,12,0.55)", backdropFilter: "blur(6px)", pointerEvents: open ? "auto" : "none" }}
      />
      <motion.div
        data-dialog-panel
        initial={false}
        animate={open ? { opacity: 1, scale: 1, rotate: 0, y: 0 } : { opacity: 0, scale: 0.8, rotate: -6, y: 40 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div className="pointer-events-auto w-full max-w-lg p-5 pb-8" style={{ background: bg, boxShadow: `10px 16px 50px ${ink}35`, border: `1px solid ${ink}10` }}>
          <div className="aspect-square w-full relative overflow-hidden flex items-center justify-center" style={{ background: item?.featured ? `${accent}25` : `${ink}08` }}>
            <div data-dialog-letter className="font-display text-8xl font-black" style={{ color: ink, opacity: 0.18 }}>
              {item?.title?.[0]}
            </div>
            <button onClick={onClose} data-dialog-close className="absolute top-3 right-3 h-9 w-9 rounded-full grid place-items-center cursor-pointer" style={{ background: `${bg}d0`, color: ink, border: "none" }} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="pt-6 px-2">
            <div data-dialog-meta className="text-[11px] font-semibold uppercase tracking-wide text-center mb-1.5" style={{ color: accent, display: (item?.category || item?.period) ? "" : "none" }}>
              {[item?.category, item?.period].filter(Boolean).join(" · ")}
            </div>
            <h3 data-dialog-title className="font-display text-2xl font-bold text-center" style={{ color: ink }}>
              {item?.title}
            </h3>
            <p data-dialog-desc className="mt-2 text-sm text-center leading-relaxed" style={{ color: `${ink}65`, display: item?.desc ? "" : "none" }}>
              {item?.desc}
            </p>
            <div className="mt-4 flex justify-center">
              <VisitLink item={item} accent={accent} label="View project" dialogMarker className="inline-flex items-center gap-1.5 text-sm font-semibold" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Shared section heading
───────────────────────────────────────────────────────── */
function SectionHeading({
  props,
  ink,
  accent,
  onChange,
  dark = false,
  align = "left",
}: {
  props: ProjectsProps;
  ink: string;
  accent: string;
  onChange: Props["onChange"];
  dark?: boolean;
  align?: "left" | "center";
}) {
  const textColor = dark ? "#fff" : ink;
  return (
    <div className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : ""}`}>
      <div
        className={`inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase font-semibold ${align === "center" ? "justify-center" : ""}`}
        style={{ color: accent }}
      >
        {align !== "center" && <span className="h-px w-6" style={{ background: accent }} />}
        <EStop>
          <Editable
            value={props.eyebrow || "Selected Work"}
            onChange={(v) => onChange({ eyebrow: v })}
            className="inline"
          />
        </EStop>
        {align === "center" && <span className="h-px w-6" style={{ background: accent }} />}
      </div>
      {props.heading && (
        <EStop>
          <Editable
            as="h2"
            value={props.heading}
            onChange={(v) => onChange({ heading: v })}
            className="mt-4 font-display text-5xl md:text-7xl font-black tracking-tight leading-[0.95]"
            style={{ color: textColor }}
          />
        </EStop>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 1 — Lush card grid → DialogEditorial (quick view)
══════════════════════════════════════════════════════ */
export function Projects1({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-32 md:py-40" style={{ background: bg }}>
      <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={stagger}>
        <motion.div variants={child} transition={childTransition}>
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {items.map((it, i) => (
            <motion.div
              key={i}
              variants={child}
              transition={childTransition}
              className="group rounded-3xl overflow-hidden"
              style={{ border: `1px solid ${ink}10`, background: bg, boxShadow: `0 8px 40px -10px ${ink}14` }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelected(it)}
                data-project-trigger
                data-title={it.title}
                data-desc={it.desc || ""}
                data-category={it.category || ""}
                data-period={it.period || ""}
                data-tags={it.tags || ""}
                data-link={it.link || ""}
                data-link-label={it.linkLabel || "View project"}
                data-badge-label={it.badgeLabel || "Featured"}
                data-featured={it.featured ? "true" : "false"}
                className="aspect-[4/3] relative overflow-hidden flex items-center justify-center cursor-pointer"
                style={{ background: it.featured ? `${accent}18` : `${ink}07` }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${accent}22, transparent)` }}
                />
                <div
                  className="font-display text-8xl font-black opacity-[0.08] group-hover:opacity-[0.14] transition-opacity"
                  style={{ color: ink }}
                >
                  {it.title?.[0]}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="h-14 w-14 rounded-full grid place-items-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: accent, color: bg }}
                  >
                    <ArrowUpRight className="h-6 w-6" />
                  </div>
                </div>
                {it.featured && (
                  <div
                    className="absolute top-5 left-5 text-xs px-3.5 py-1.5 rounded-full font-semibold"
                    style={{ background: accent, color: bg }}
                  >
                    {it.badgeLabel || "Featured"}
                  </div>
                )}
              </motion.div>
              <div className="p-8 md:p-10">
                <MetaLine item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} />
                <EStop>
                  <Editable
                    as="div"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="font-display text-2xl font-bold leading-tight truncate"
                    style={{ color: ink }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                      className="mt-2.5 text-base leading-relaxed line-clamp-3"
                      style={{ color: `${ink}65` }}
                    />
                  </EStop>
                )}
                <TagsLine item={it} items={items} onChange={onChange} i={i} accent={accent} />
                <button
                  onClick={() => setSelected(it)}
                  data-project-trigger
                  data-title={it.title}
                  data-desc={it.desc || ""}
                  data-category={it.category || ""}
                  data-period={it.period || ""}
                  data-tags={it.tags || ""}
                  data-link={it.link || ""}
                  data-link-label={it.linkLabel || "View project"}
                  data-badge-label={it.badgeLabel || "Featured"}
                  data-featured={it.featured ? "true" : "false"}
                  className="mt-5 flex items-center gap-2 text-sm font-semibold cursor-pointer"
                  style={{ color: accent, background: "none", border: "none", padding: 0 }}
                >
                  Quick view <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <DialogEditorial item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 2 — Elegant numbered rows → links straight out
   (no modal here — the row itself is a clickable link)
══════════════════════════════════════════════════════ */
export function Projects2({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  return (
    <section className="px-5 sm:px-8 md:px-20 py-32 md:py-40" style={{ background: bg }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
        </motion.div>
        <div>
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="group flex items-center gap-6 md:gap-12 py-8 md:py-10"
              style={{ borderTop: `1px solid ${ink}10` }}
            >
              <span
                className="font-display text-4xl md:text-5xl font-black shrink-0 tabular-nums"
                style={{ color: `${ink}20` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <MetaLine item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mb-1.5" />
                <EStop>
                  <Editable
                    as="div"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="font-display text-2xl md:text-3xl font-bold truncate"
                    style={{ color: ink }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                      className="mt-1.5 text-base leading-relaxed line-clamp-3"
                      style={{ color: `${ink}60` }}
                    />
                  </EStop>
                )}
                <TagsLine item={it} items={items} onChange={onChange} i={i} accent={accent} className="mt-2" />
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="shrink-0">
                <VisitLink
                  item={it}
                  accent={accent}
                  label=""
                  className="h-12 w-12 rounded-full grid place-items-center opacity-40 group-hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ background: `${accent}15`, color: accent }}
                />
              </motion.div>
            </motion.div>
          ))}
          <div className="h-px" style={{ background: `${ink}10` }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 3 — Dark gradient showcase → DialogDark
══════════════════════════════════════════════════════ */
export function Projects3({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section
      className="relative px-5 sm:px-8 md:px-20 py-32 md:py-40 overflow-hidden"
      style={{ background: `linear-gradient(155deg, ${ink}, ${accent}35)` }}
    >
      <motion.div
        animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 h-[28rem] w-[28rem] rounded-full blur-[100px] pointer-events-none"
        style={{ background: accent }}
      />
      <div className="relative z-10">
        <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} dark />
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: `${bg}0f`, backdropFilter: "blur(8px)", border: `1px solid ${bg}18` }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelected(it)}
                data-project-trigger
                data-title={it.title}
                data-desc={it.desc || ""}
                data-category={it.category || ""}
                data-period={it.period || ""}
                data-tags={it.tags || ""}
                data-link={it.link || ""}
                data-link-label={it.linkLabel || "View project"}
                data-badge-label={it.badgeLabel || "Featured"}
                data-featured={it.featured ? "true" : "false"}
                className="aspect-video flex items-center justify-center cursor-pointer"
                style={{ background: it.featured ? `${accent}28` : `${bg}08` }}
              >
                <div className="font-display text-7xl font-black opacity-15" style={{ color: bg }}>
                  {it.title?.[0]}
                </div>
              </motion.div>
              <div className="p-8 sm:p-9">
                <MetaLine item={it} items={items} onChange={onChange} i={i} ink={bg} accent={accent} />
                <EStop>
                  <Editable
                    as="div"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="font-display text-xl font-bold truncate"
                    style={{ color: bg }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                      className="mt-2 text-base leading-relaxed line-clamp-3"
                      style={{ color: `${bg}70` }}
                    />
                  </EStop>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <DialogDark item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 4 — Terminal / code listing → DialogTerminal
══════════════════════════════════════════════════════ */
export function Projects4({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-28 md:py-32" style={{ background: bg }}>
      <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition} className="max-w-4xl mx-auto">
        <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${ink}18`, background: `${ink}04` }}
        >
          <div
            className="flex items-center gap-2 px-6 py-4"
            style={{ borderBottom: `1px solid ${ink}12` }}
          >
            <span className="h-3 w-3 rounded-full" style={{ background: "#ff6058" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="h-3 w-3 rounded-full" style={{ background: "#27ca40" }} />
            <span className="ml-3 text-xs font-mono" style={{ color: `${ink}40` }}>
              ls ./projects
            </span>
          </div>
          <div className="p-7 md:p-10 font-mono space-y-5">
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-start gap-4"
              >
                <button
                  onClick={() => setSelected(it)}
                  data-project-trigger
                  data-title={it.title}
                  data-desc={it.desc || ""}
                  data-category={it.category || ""}
                  data-period={it.period || ""}
                  data-tags={it.tags || ""}
                  data-link={it.link || ""}
                  data-link-label={it.linkLabel || "View project"}
                  data-badge-label={it.badgeLabel || "Featured"}
                  data-featured={it.featured ? "true" : "false"}
                  className="text-base shrink-0 mt-0.5 cursor-pointer font-mono"
                  style={{ color: accent, background: "none", border: "none", padding: 0 }}
                >
                  $
                </button>
                <div className="flex-1 min-w-0">
                  <EStop>
                    <Editable
                      as="span"
                      value={it.title}
                      onChange={(v) => updateItem(items, onChange, i, { title: v })}
                      className="text-base font-semibold"
                      style={{ color: ink }}
                    />
                  </EStop>
                  {it.desc && (
                    <>
                      <span className="text-sm mx-2" style={{ color: `${ink}35` }}>—</span>
                      <EStop>
                        <Editable
                          as="span"
                          value={it.desc}
                          onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                          className="text-sm truncate inline-block max-w-[24rem] align-bottom"
                          style={{ color: `${ink}55` }}
                        />
                      </EStop>
                    </>
                  )}
                </div>
                {it.featured && (
                  <span
                    className="shrink-0 text-[10px] px-2 py-0.5 rounded font-bold"
                    style={{ background: `${accent}20`, color: accent }}
                  >
                    {it.badgeLabel || "featured"}
                  </span>
                )}
                <button
                  onClick={() => setSelected(it)}
                  data-project-trigger
                  data-title={it.title}
                  data-desc={it.desc || ""}
                  data-category={it.category || ""}
                  data-period={it.period || ""}
                  data-tags={it.tags || ""}
                  data-link={it.link || ""}
                  data-link-label={it.linkLabel || "View project"}
                  data-badge-label={it.badgeLabel || "Featured"}
                  data-featured={it.featured ? "true" : "false"}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ color: accent, background: "none", border: "none" }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
            <div className="flex items-center gap-1 pt-2">
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-sm font-mono"
                style={{ color: accent }}
              >
                ▌
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
      <DialogTerminal item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 5 — Marquee + full card grid → DialogEditorial
══════════════════════════════════════════════════════ */
export function Projects5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const track = [...items, ...items, ...items];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="py-32 md:py-40 overflow-hidden" style={{ background: bg }}>
      <div className="px-5 sm:px-8 md:px-20 mb-12">
        <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
      </div>
      <div
        className="overflow-hidden"
        style={{ borderTop: `1px solid ${ink}08`, borderBottom: `1px solid ${ink}08` }}
      >
        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap py-6"
        >
          {track.map((it, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-8 font-display text-3xl md:text-4xl font-black shrink-0"
              style={{ color: i % 3 === 0 ? ink : i % 3 === 1 ? `${ink}40` : accent }}
            >
              {it.title}
              <span className="h-2 w-2 rounded-full shrink-0" style={{ background: accent }} />
            </span>
          ))}
        </motion.div>
      </div>
      <div className="px-5 sm:px-8 md:px-20 mt-14 grid md:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="rounded-2xl p-8 flex items-center gap-6"
            style={{ background: `${ink}05`, border: `1px solid ${ink}08` }}
          >
            <div
              className="h-16 w-16 rounded-2xl shrink-0 flex items-center justify-center font-display text-3xl font-black"
              style={{ background: it.featured ? accent : `${accent}15`, color: it.featured ? bg : accent }}
            >
              {it.title?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <EStop>
                <Editable
                  as="div"
                  value={it.title}
                  onChange={(v) => updateItem(items, onChange, i, { title: v })}
                  className="font-display text-xl font-bold truncate"
                  style={{ color: ink }}
                />
              </EStop>
              {it.desc && (
                <EStop>
                  <Editable
                    as="p"
                    value={it.desc}
                    onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                    className="mt-1 text-sm line-clamp-3"
                    style={{ color: `${ink}60` }}
                  />
                </EStop>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.15, rotate: 8 }}
              onClick={() => setSelected(it)}
              data-project-trigger
              data-title={it.title}
              data-desc={it.desc || ""}
              data-category={it.category || ""}
              data-period={it.period || ""}
              data-tags={it.tags || ""}
              data-link={it.link || ""}
              data-link-label={it.linkLabel || "View project"}
              data-badge-label={it.badgeLabel || "Featured"}
              data-featured={it.featured ? "true" : "false"}
              className="shrink-0 cursor-pointer"
              style={{ color: accent, background: "none", border: "none" }}
            >
              <ArrowUpRight className="h-6 w-6 opacity-40 hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>
        ))}
      </div>
      <DialogEditorial item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 6 — Clean numbered list → links straight out
══════════════════════════════════════════════════════ */
export function Projects6({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  return (
    <section
      className="px-5 sm:px-8 md:px-20 py-28 md:py-32"
      style={{ background: bg, borderTop: `1px solid ${ink}10` }}
    >
      <div className="max-w-3xl">
        <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
          <div className="space-y-0">
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-start gap-6 py-7"
                style={{ borderBottom: `1px solid ${ink}08` }}
              >
                <span
                  className="font-display text-3xl font-black shrink-0 tabular-nums"
                  style={{ color: accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <EStop>
                      <Editable
                        as="span"
                        value={it.title}
                        onChange={(v) => updateItem(items, onChange, i, { title: v })}
                        className="font-display text-2xl font-bold"
                        style={{ color: ink }}
                      />
                    </EStop>
                    {it.desc && (
                      <>
                        <span className="text-sm" style={{ color: `${ink}30` }}>·</span>
                        <EStop>
                          <Editable
                            as="span"
                            value={it.desc}
                            onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                            className="text-base truncate inline-block max-w-[22rem] align-bottom"
                            style={{ color: `${ink}55` }}
                          />
                        </EStop>
                      </>
                    )}
                  </div>
                  <TagsLine item={it} items={items} onChange={onChange} i={i} accent={accent} className="mt-1.5" />
                </div>
                <VisitLink
                  item={it}
                  accent={accent}
                  label=""
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 7 — Big editorial zigzag → DialogEditorial
══════════════════════════════════════════════════════ */
export function Projects7({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="py-32 md:py-40" style={{ background: bg }}>
      <div className="px-5 sm:px-8 md:px-20">
        <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
        </motion.div>
      </div>
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className={`px-8 md:px-20 py-14 grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          style={{ borderTop: `1px solid ${ink}08` }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            onClick={() => setSelected(it)}
            data-project-trigger
            data-title={it.title}
            data-desc={it.desc || ""}
            data-category={it.category || ""}
            data-period={it.period || ""}
            data-tags={it.tags || ""}
            data-link={it.link || ""}
            data-link-label={it.linkLabel || "View project"}
            data-badge-label={it.badgeLabel || "Featured"}
            data-featured={it.featured ? "true" : "false"}
            className="aspect-[4/3] rounded-3xl overflow-hidden flex items-center justify-center relative cursor-pointer group"
            style={{ background: it.featured ? `${accent}20` : `${ink}07` }}
          >
            <div
              className="font-display text-9xl font-black opacity-[0.08]"
              style={{ color: ink }}
            >
              {it.title?.[0]}
            </div>
            {it.featured && (
              <div
                className="absolute top-5 left-5 text-xs px-3.5 py-1.5 rounded-full font-semibold"
                style={{ background: accent, color: bg }}
              >
                {it.badgeLabel || "Featured"}
              </div>
            )}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `${accent}10` }}
            >
              <div className="h-16 w-16 rounded-full grid place-items-center" style={{ background: accent, color: bg }}>
                <ArrowUpRight className="h-7 w-7" />
              </div>
            </div>
          </motion.div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: accent }}>
              {it.category || `Project ${String(i + 1).padStart(2, "0")}`}
              {it.period && <span style={{ color: `${ink}35` }}> · {it.period}</span>}
            </div>
            <EStop>
              <Editable
                as="h3"
                value={it.title}
                onChange={(v) => updateItem(items, onChange, i, { title: v })}
                className="font-display text-4xl md:text-5xl font-black leading-tight"
                style={{ color: ink }}
              />
            </EStop>
            {it.desc && (
              <EStop>
                <Editable
                  as="p"
                  value={it.desc}
                  onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                  className="mt-5 text-lg leading-relaxed line-clamp-4"
                  style={{ color: `${ink}65` }}
                />
              </EStop>
            )}
            <TagsLine item={it} items={items} onChange={onChange} i={i} accent={accent} className="mt-4" />
            <button
              onClick={() => setSelected(it)}
              data-project-trigger
              data-title={it.title}
              data-desc={it.desc || ""}
              data-category={it.category || ""}
              data-period={it.period || ""}
              data-tags={it.tags || ""}
              data-link={it.link || ""}
              data-link-label={it.linkLabel || "View project"}
              data-badge-label={it.badgeLabel || "Featured"}
              data-featured={it.featured ? "true" : "false"}
              className="mt-7 inline-flex items-center gap-2 text-base font-semibold cursor-pointer"
              style={{ color: accent, background: "none", border: "none", padding: 0 }}
            >
              View project <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      ))}
      <DialogEditorial item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 8 — Embla carousel → DialogEditorial
══════════════════════════════════════════════════════ */
export function Projects8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selected, setSelected] = useState<Item | null>(null);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="px-5 sm:px-8 md:px-20 py-32 md:py-40" style={{ background: `${accent}10` }}>
      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={fadeUpViewport}
        variants={fadeUp}
        transition={fadeUpTransition}
        className="max-w-6xl mx-auto rounded-3xl p-10 md:p-16"
        style={{ background: bg, boxShadow: `0 50px 120px -30px ${ink}20` }}
      >
        <div className="flex items-end justify-between mb-0">
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
          <div className="flex gap-2 mb-16">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="h-12 w-12 rounded-full grid place-items-center border disabled:opacity-30 transition-opacity cursor-pointer"
              style={{ borderColor: `${ink}20`, color: ink, background: "none" }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="h-12 w-12 rounded-full grid place-items-center disabled:opacity-30 transition-opacity cursor-pointer"
              style={{ background: accent, color: bg, border: "none" }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((it, i) => (
              <div
                key={i}
                className="shrink-0 basis-[85%] md:basis-[42%] rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${ink}10` }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelected(it)}
                  data-project-trigger
                  data-title={it.title}
                  data-desc={it.desc || ""}
                  data-category={it.category || ""}
                  data-period={it.period || ""}
                  data-tags={it.tags || ""}
                  data-link={it.link || ""}
                  data-link-label={it.linkLabel || "View project"}
                  data-badge-label={it.badgeLabel || "Featured"}
                  data-featured={it.featured ? "true" : "false"}
                  className="aspect-[4/3] flex items-center justify-center cursor-pointer"
                  style={{ background: it.featured ? `${accent}18` : `${ink}07` }}
                >
                  <div className="font-display text-7xl font-black opacity-[0.09]" style={{ color: ink }}>
                    {it.title?.[0]}
                  </div>
                </motion.div>
                <div className="p-6">
                  <EStop>
                    <Editable
                      as="div"
                      value={it.title}
                      onChange={(v) => updateItem(items, onChange, i, { title: v })}
                      className="font-display text-xl font-bold truncate"
                      style={{ color: ink }}
                    />
                  </EStop>
                  {it.desc && (
                    <EStop>
                      <Editable
                        as="p"
                        value={it.desc}
                        onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                        className="mt-2 text-base leading-relaxed line-clamp-3"
                        style={{ color: `${ink}60` }}
                      />
                    </EStop>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <DialogEditorial item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 9 — Bento asymmetric grid → DialogEditorial
══════════════════════════════════════════════════════ */
export function Projects9({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-32 md:py-40 overflow-hidden" style={{ background: bg }}>
      <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
        <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
        <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[220px] gap-5">
          {items.map((it, i) => {
            const big = i === 0;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl overflow-hidden flex flex-col justify-end ${big ? "col-span-2 row-span-2" : ""
                  }`}
                style={{ background: it.featured ? `${accent}20` : `${ink}07`, border: `1px solid ${ink}08` }}
              >
                <motion.div
                  whileHover={{ opacity: 1 }}
                  onClick={() => setSelected(it)}
                  data-project-trigger
                  data-title={it.title}
                  data-desc={it.desc || ""}
                  data-category={it.category || ""}
                  data-period={it.period || ""}
                  data-tags={it.tags || ""}
                  data-link={it.link || ""}
                  data-link-label={it.linkLabel || "View project"}
                  data-badge-label={it.badgeLabel || "Featured"}
                  data-featured={it.featured ? "true" : "false"}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity z-10"
                  style={{ background: `${accent}15` }}
                >
                  <div
                    className="h-11 w-11 rounded-full grid place-items-center"
                    style={{ background: accent, color: bg }}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </motion.div>
                <div
                  className="absolute inset-0 font-display font-black flex items-center justify-center opacity-[0.07] pointer-events-none"
                  style={{ fontSize: big ? "140px" : "90px", color: ink }}
                >
                  {it.title?.[0]}
                </div>
                {it.featured && (
                  <div
                    className="absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full font-semibold z-20"
                    style={{ background: accent, color: bg }}
                  >
                    ★
                  </div>
                )}
                <div className="relative z-20 p-5" onClick={(e) => e.stopPropagation()}>
                  <EStop>
                    <Editable
                      as="div"
                      value={it.title}
                      onChange={(v) => updateItem(items, onChange, i, { title: v })}
                      className={`font-display font-bold truncate ${big ? "text-3xl" : "text-base"}`}
                      style={{ color: ink }}
                    />
                  </EStop>
                  {it.desc && (
                    <EStop>
                      <Editable
                        as="p"
                        value={it.desc}
                        onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                        className={`mt-1.5 leading-relaxed ${big ? "text-base line-clamp-3" : "text-xs line-clamp-3"}`}
                        style={{ color: `${ink}65` }}
                      />
                    </EStop>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <DialogEditorial item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 10 — Minimal table → links straight out
══════════════════════════════════════════════════════ */
export function Projects10({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  return (
    <section className="px-5 sm:px-8 md:px-20 py-28 md:py-32" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
        </motion.div>
        <div>
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center gap-6 py-6 rounded-xl px-4"
              style={{ borderTop: `1px solid ${ink}08` }}
            >
              <span className="text-xs font-mono shrink-0 w-9" style={{ color: `${ink}35` }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <EStop>
                <Editable
                  as="div"
                  value={it.title}
                  onChange={(v) => updateItem(items, onChange, i, { title: v })}
                  className="font-display text-xl md:text-2xl font-bold flex-1 truncate"
                  style={{ color: ink }}
                />
              </EStop>
              {it.desc && (
                <EStop>
                  <Editable
                    as="p"
                    value={it.desc}
                    onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                    className="text-base hidden md:block flex-1 truncate"
                    style={{ color: `${ink}55` }}
                  />
                </EStop>
              )}
              <VisitLink
                item={it}
                accent={accent}
                label=""
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              />
            </motion.div>
          ))}
          <div className="h-px" style={{ background: `${ink}08` }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 11 — Polaroid tilt cards → DialogPolaroid
══════════════════════════════════════════════════════ */
export function Projects11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const rotations = [-4, 3, -2, 4, -3, 2];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-32 md:py-40" style={{ background: `${ink}04` }}>
      <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
        <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
      </motion.div>
      <div className="flex flex-wrap gap-10 justify-center">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24, rotate: rotations[i % rotations.length] * 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
            viewport={{ once: true }}
            whileHover={{ rotate: 0, scale: 1.07, zIndex: 10 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl p-3.5 w-60"
            style={{
              background: bg,
              boxShadow: `4px 8px 30px ${ink}20`,
              border: `1px solid ${ink}10`,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(it)}
              data-project-trigger
              data-title={it.title}
              data-desc={it.desc || ""}
              data-category={it.category || ""}
              data-period={it.period || ""}
              data-tags={it.tags || ""}
              data-link={it.link || ""}
              data-link-label={it.linkLabel || "View project"}
              data-badge-label={it.badgeLabel || "Featured"}
              data-featured={it.featured ? "true" : "false"}
              className="aspect-square rounded-xl flex items-center justify-center cursor-pointer group relative overflow-hidden"
              style={{ background: it.featured ? `${accent}25` : `${ink}08` }}
            >
              <div className="font-display text-6xl font-black opacity-20" style={{ color: ink }}>
                {it.title?.[0]}
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `${accent}20` }}
              >
                <ArrowUpRight className="h-6 w-6" style={{ color: accent }} />
              </div>
            </motion.div>
            <div className="mt-3.5 px-1" onClick={(e) => e.stopPropagation()}>
              <EStop>
                <Editable
                  as="div"
                  value={it.title}
                  onChange={(v) => updateItem(items, onChange, i, { title: v })}
                  className="text-base font-bold text-center truncate"
                  style={{ color: ink }}
                />
              </EStop>
              {it.desc && (
                <EStop>
                  <Editable
                    as="p"
                    value={it.desc}
                    onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                    className="mt-1 text-xs text-center line-clamp-3"
                    style={{ color: `${ink}55` }}
                  />
                </EStop>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <DialogPolaroid item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 12 — Mono/typewriter listing → links straight out
══════════════════════════════════════════════════════ */
export function Projects12({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  return (
    <section className="px-5 sm:px-8 md:px-20 py-28 md:py-32" style={{ background: bg }}>
      <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition} className="max-w-3xl">
        <div className="font-mono text-sm mb-3" style={{ color: `${ink}45` }}>
          <span style={{ color: accent }}>{">"}</span>{" "}
          <EStop>
            <Editable
              value={props.eyebrow || "projects"}
              onChange={(v) => onChange({ eyebrow: v })}
              className="inline"
            />
          </EStop>
        </div>
        {props.heading && (
          <EStop>
            <Editable
              as="div"
              value={props.heading}
              onChange={(v) => onChange({ heading: v })}
              className="font-mono text-4xl md:text-5xl font-bold mb-10"
              style={{ color: ink }}
            />
          </EStop>
        )}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: `1px solid ${ink}15`, background: `${ink}04` }}
        >
          <div className="p-7 md:p-10 font-mono space-y-6">
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group flex items-start gap-3"
              >
                <span className="text-base shrink-0 mt-0.5" style={{ color: accent }}>$</span>
                <div className="flex-1 min-w-0">
                  <EStop>
                    <Editable
                      as="span"
                      value={it.title}
                      onChange={(v) => updateItem(items, onChange, i, { title: v })}
                      className="text-base font-bold"
                      style={{ color: ink }}
                    />
                  </EStop>
                  {it.desc && (
                    <div className="mt-1 text-sm truncate" style={{ color: `${ink}55` }}>
                      <span style={{ color: `${ink}35` }}>#</span>{" "}
                      <EStop>
                        <Editable
                          as="span"
                          value={it.desc}
                          onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                          className="inline"
                        />
                      </EStop>
                    </div>
                  )}
                </div>
                {it.featured && (
                  <span className="shrink-0 text-[10px] font-bold" style={{ color: accent }}>
                    ★ {it.badgeLabel || "featured"}
                  </span>
                )}
                <VisitLink
                  item={it}
                  accent={accent}
                  label=""
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 13 — Brutalist bold grid → DialogBrutalist
══════════════════════════════════════════════════════ */
export function Projects13({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-28 md:py-32" style={{ background: bg }}>
      <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
        <div className="h-3.5 w-full mb-7" style={{ background: ink }} />
        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <div
              className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 inline-block"
              style={{ background: accent, color: bg }}
            >
              <EStop>
                <Editable
                  value={props.eyebrow || "Work"}
                  onChange={(v) => onChange({ eyebrow: v })}
                  className="inline"
                />
              </EStop>
            </div>
            {props.heading && (
              <EStop>
                <Editable
                  as="h2"
                  value={props.heading}
                  onChange={(v) => onChange({ heading: v })}
                  className="mt-3 font-display text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]"
                  style={{ color: ink }}
                />
              </EStop>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-0">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ backgroundColor: `${accent}08` }}
              className="p-9 md:p-10"
              style={{
                border: `2px solid ${ink}`,
                marginLeft: i % 2 === 1 ? "-2px" : 0,
                marginTop: i >= 2 ? "-2px" : 0,
              }}
            >
              <div className="text-5xl font-display font-black mb-5" style={{ color: `${ink}12` }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <EStop>
                <Editable
                  as="div"
                  value={it.title}
                  onChange={(v) => updateItem(items, onChange, i, { title: v })}
                  className="font-display text-2xl md:text-3xl font-black uppercase truncate"
                  style={{ color: ink }}
                />
              </EStop>
              {it.desc && (
                <EStop>
                  <Editable
                    as="p"
                    value={it.desc}
                    onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                    className="mt-3 text-base font-bold line-clamp-3"
                    style={{ color: accent }}
                  />
                </EStop>
              )}
              <button
                onClick={() => setSelected(it)}
                data-project-trigger
                data-title={it.title}
                data-desc={it.desc || ""}
                data-category={it.category || ""}
                data-period={it.period || ""}
                data-tags={it.tags || ""}
                data-link={it.link || ""}
                data-link-label={it.linkLabel || "View project"}
                data-badge-label={it.badgeLabel || "Featured"}
                data-featured={it.featured ? "true" : "false"}
                className="mt-5 flex items-center gap-1.5 text-xs font-black uppercase tracking-widest cursor-pointer"
                style={{ color: ink, background: "none", border: "none", padding: 0 }}
              >
                Open <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </div>
        <div className="h-3.5 w-full" style={{ background: ink }} />
      </motion.div>
      <DialogBrutalist item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 14 — Featured hero + grid → DialogEditorial
══════════════════════════════════════════════════════ */
export function Projects14({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [first, ...rest] = items;
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="relative px-5 sm:px-8 md:px-20 py-32 md:py-40 overflow-hidden" style={{ background: bg }}>
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 h-[26rem] w-[26rem] rounded-full blur-[90px] pointer-events-none"
        style={{ background: accent }}
      />
      <div className="relative">
        <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
        </motion.div>
        {first && (
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={fadeUpViewport}
            variants={fadeUp}
            transition={fadeUpTransition}
            className="rounded-3xl overflow-hidden mb-7"
            style={{ border: `1px solid ${ink}10`, boxShadow: `0 24px 70px -20px ${ink}18` }}
          >
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelected(first)}
              className="aspect-[21/8] flex items-center justify-center relative overflow-hidden cursor-pointer group"
              style={{ background: first.featured ? `${accent}20` : `${ink}07` }}
            >
              <div
                className="font-display text-[18vw] font-black opacity-[0.06] group-hover:opacity-[0.1] transition-opacity"
                style={{ color: ink }}
              >
                {first.title?.[0]}
              </div>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                style={{ background: `${accent}10` }}
              >
                <div className="h-16 w-16 rounded-full grid place-items-center" style={{ background: accent, color: bg }}>
                  <ArrowUpRight className="h-7 w-7" />
                </div>
              </div>
            </motion.div>
            <div className="p-9 flex items-center justify-between gap-6">
              <div className="min-w-0">
                <EStop>
                  <Editable
                    as="h3"
                    value={first.title}
                    onChange={(v) => updateItem(items, onChange, 0, { title: v })}
                    className="font-display text-3xl md:text-4xl font-black truncate"
                    style={{ color: ink }}
                  />
                </EStop>
                {first.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={first.desc}
                      onChange={(v) => updateItem(items, onChange, 0, { desc: v })}
                      className="mt-2.5 text-lg leading-relaxed line-clamp-3"
                      style={{ color: `${ink}65` }}
                    />
                  </EStop>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelected(first)}
                style={{ color: accent, background: "none", border: "none" }}
                className="shrink-0 cursor-pointer"
              >
                <ArrowUpRight className="h-7 w-7" />
              </motion.button>
            </div>
          </motion.div>
        )}
        <div className="grid md:grid-cols-3 gap-5">
          {rest.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${ink}10` }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelected(it)}
                data-project-trigger
                data-title={it.title}
                data-desc={it.desc || ""}
                data-category={it.category || ""}
                data-period={it.period || ""}
                data-tags={it.tags || ""}
                data-link={it.link || ""}
                data-link-label={it.linkLabel || "View project"}
                data-badge-label={it.badgeLabel || "Featured"}
                data-featured={it.featured ? "true" : "false"}
                className="aspect-video flex items-center justify-center cursor-pointer group relative overflow-hidden"
                style={{ background: `${ink}07` }}
              >
                <div className="font-display text-6xl font-black opacity-10" style={{ color: ink }}>
                  {it.title?.[0]}
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `${accent}10` }}
                >
                  <ArrowUpRight className="h-5 w-5" style={{ color: accent }} />
                </div>
              </motion.div>
              <div className="p-6">
                <EStop>
                  <Editable
                    as="div"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i + 1, { title: v })}
                    className="font-display text-lg font-bold truncate"
                    style={{ color: ink }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i + 1, { desc: v })}
                      className="mt-1 text-sm line-clamp-3"
                      style={{ color: `${ink}60` }}
                    />
                  </EStop>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <DialogEditorial item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 15 — Bordered frame, horizontal scroll → DialogEditorial
══════════════════════════════════════════════════════ */
export function Projects15({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="p-6 md:p-12" style={{ background: bg }}>
      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={fadeUpViewport}
        variants={fadeUp}
        transition={fadeUpTransition}
        className="relative rounded-3xl px-8 md:px-16 py-16"
        style={{ border: `1px solid ${ink}15` }}
      >
        <div className="flex items-start justify-between gap-4 mb-0">
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
          <span
            className="shrink-0 text-xs px-3.5 py-2 rounded-full font-semibold"
            style={{ background: `${accent}15`, color: accent }}
          >
            {items.length} projects
          </span>
        </div>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2">
          {items.map((it, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-72 md:w-80 rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${ink}10` }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelected(it)}
                data-project-trigger
                data-title={it.title}
                data-desc={it.desc || ""}
                data-category={it.category || ""}
                data-period={it.period || ""}
                data-tags={it.tags || ""}
                data-link={it.link || ""}
                data-link-label={it.linkLabel || "View project"}
                data-badge-label={it.badgeLabel || "Featured"}
                data-featured={it.featured ? "true" : "false"}
                className="aspect-[4/3] flex items-center justify-center cursor-pointer group relative overflow-hidden"
                style={{ background: i === 0 ? `${accent}20` : `${ink}07` }}
              >
                <div className="font-display text-7xl font-black opacity-10" style={{ color: ink }}>
                  {it.title?.[0]}
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `${accent}15` }}
                >
                  <ArrowUpRight className="h-6 w-6" style={{ color: accent }} />
                </div>
              </motion.div>
              <div className="p-6">
                <EStop>
                  <Editable
                    as="div"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="font-display text-lg font-bold truncate"
                    style={{ color: ink }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                      className="mt-2 text-base leading-relaxed line-clamp-3"
                      style={{ color: `${ink}60` }}
                    />
                  </EStop>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <DialogEditorial item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 16 — Accordion expand panels → links straight out
   (inline expand for the description; the arrow is a real link)
══════════════════════════════════════════════════════ */
export function Projects16({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-32 md:py-40" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
        </motion.div>
        <div className="space-y-0">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{ borderTop: `1px solid ${ink}10` }}
            >
              <div className="flex items-center py-7 gap-4">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex-1 min-w-0 flex items-center gap-6 text-left cursor-pointer"
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  <span className="font-display text-2xl font-black shrink-0" style={{ color: `${accent}70` }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <EStop>
                    <Editable
                      as="span"
                      value={it.title}
                      onChange={(v) => updateItem(items, onChange, i, { title: v })}
                      className="font-display text-2xl md:text-3xl font-bold truncate"
                      style={{ color: ink }}
                    />
                  </EStop>
                </button>
                <VisitLink
                  item={it}
                  accent={ink}
                  label=""
                  className="shrink-0 h-9 w-9 rounded-full grid place-items-center cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                  style={{ background: `${ink}08`, color: ink }}
                />
                <motion.button
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="shrink-0 h-9 w-9 rounded-full grid place-items-center cursor-pointer"
                  style={{ background: open === i ? accent : `${ink}08`, color: open === i ? bg : ink, border: "none" }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </motion.button>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-9 pl-14">
                      {(it.category || it.period) && (
                        <div className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: accent }}>
                          {[it.category, it.period].filter(Boolean).join(" · ")}
                        </div>
                      )}
                      {it.desc ? (
                        <EStop>
                          <Editable
                            as="p"
                            value={it.desc}
                            onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                            className="text-lg leading-relaxed"
                            style={{ color: `${ink}65` }}
                          />
                        </EStop>
                      ) : (
                        <p className="text-base" style={{ color: `${ink}40` }}>
                          No description yet.
                        </p>
                      )}
                      <TagsLine item={it} items={items} onChange={onChange} i={i} accent={accent} className="mt-3" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div className="h-px" style={{ background: `${ink}10` }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 17 — Sidebar + autoplay carousel → DialogDark
══════════════════════════════════════════════════════ */
export function Projects17({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3200, stopOnInteraction: false })]
  );
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section
      className="flex flex-col md:flex-row"
      style={{ background: bg, borderTop: `1px solid ${ink}10` }}
    >
      <div
        className="md:w-[260px] shrink-0 flex flex-col items-start justify-between p-10 md:py-20"
        style={{ background: `${ink}05`, borderRight: `1px solid ${ink}08` }}
      >
        <div>
          <div
            className="text-[10px] uppercase tracking-widest font-semibold mb-4"
            style={{ color: accent }}
          >
            <EStop>
              <Editable
                value={props.eyebrow || "Work"}
                onChange={(v) => onChange({ eyebrow: v })}
                className="inline"
              />
            </EStop>
          </div>
          {props.heading && (
            <EStop>
              <Editable
                as="div"
                value={props.heading}
                onChange={(v) => onChange({ heading: v })}
                className="font-display text-3xl md:text-4xl font-black leading-tight"
                style={{ color: ink }}
              />
            </EStop>
          )}
        </div>
        <div className="mt-8 text-xs" style={{ color: `${ink}40` }}>
          {items.length} projects
        </div>
      </div>
      <div className="flex-1 py-16 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 px-10">
          {items.map((it, i) => (
            <div
              key={i}
              className="shrink-0 basis-[85%] md:basis-[42%] rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${ink}10` }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelected(it)}
                data-project-trigger
                data-title={it.title}
                data-desc={it.desc || ""}
                data-category={it.category || ""}
                data-period={it.period || ""}
                data-tags={it.tags || ""}
                data-link={it.link || ""}
                data-link-label={it.linkLabel || "View project"}
                data-badge-label={it.badgeLabel || "Featured"}
                data-featured={it.featured ? "true" : "false"}
                className="aspect-[4/3] flex items-center justify-center cursor-pointer group relative overflow-hidden"
                style={{ background: i % 2 === 0 ? `${accent}18` : `${ink}07` }}
              >
                <div className="font-display text-7xl font-black opacity-[0.08]" style={{ color: ink }}>
                  {it.title?.[0]}
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `${accent}10` }}
                >
                  <ArrowUpRight className="h-6 w-6" style={{ color: accent }} />
                </div>
              </motion.div>
              <div className="p-6">
                <EStop>
                  <Editable
                    as="div"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="font-display text-lg font-bold truncate"
                    style={{ color: ink }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                      className="mt-1.5 text-sm line-clamp-3"
                      style={{ color: `${ink}60` }}
                    />
                  </EStop>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <DialogDark item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 18 — Dotted grid background → DialogEditorial
══════════════════════════════════════════════════════ */
export function Projects18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section
      className="relative px-5 sm:px-8 md:px-20 py-32 md:py-40"
      style={{
        backgroundImage: `radial-gradient(${ink}20 1.5px, transparent 1.5px)`,
        backgroundSize: "22px 22px",
      }}
    >
      <div className="relative rounded-3xl p-9 md:p-16" style={{ background: bg }}>
        <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${ink}10` }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setSelected(it)}
                  data-project-trigger
                  data-title={it.title}
                  data-desc={it.desc || ""}
                  data-category={it.category || ""}
                  data-period={it.period || ""}
                  data-tags={it.tags || ""}
                  data-link={it.link || ""}
                  data-link-label={it.linkLabel || "View project"}
                  data-badge-label={it.badgeLabel || "Featured"}
                  data-featured={it.featured ? "true" : "false"}
                  className="aspect-video flex items-center justify-center cursor-pointer group relative overflow-hidden"
                  style={{ background: i === 0 ? `${accent}18` : `${ink}07` }}
                >
                  <div className="font-display text-6xl font-black opacity-10" style={{ color: ink }}>
                    {it.title?.[0]}
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `${accent}10` }}
                  >
                    <ArrowUpRight className="h-5 w-5" style={{ color: accent }} />
                  </div>
                </motion.div>
                <div className="p-6">
                  <EStop>
                    <Editable
                      as="div"
                      value={it.title}
                      onChange={(v) => updateItem(items, onChange, i, { title: v })}
                      className="font-display text-lg font-bold truncate"
                      style={{ color: ink }}
                    />
                  </EStop>
                  {it.desc && (
                    <EStop>
                      <Editable
                        as="p"
                        value={it.desc}
                        onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                        className="mt-1.5 text-base leading-relaxed line-clamp-3"
                        style={{ color: `${ink}60` }}
                      />
                    </EStop>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <DialogEditorial item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 19 — Dark canvas, outline stroke → DialogDark
══════════════════════════════════════════════════════ */
export function Projects19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-32 md:py-40" style={{ background: ink }}>
      <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
        <div className="mb-12">
          <div
            className="text-xs tracking-[0.3em] uppercase font-semibold"
            style={{ color: `${bg}50` }}
          >
            <EStop>
              <Editable
                value={props.eyebrow || "Selected Work"}
                onChange={(v) => onChange({ eyebrow: v })}
                className="inline"
              />
            </EStop>
          </div>
          {props.heading && (
            <EStop>
              <Editable
                as="h2"
                value={props.heading}
                onChange={(v) => onChange({ heading: v })}
                className="mt-4 font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.9]"
                style={{ color: "transparent", WebkitTextStroke: `1.5px ${bg}80` }}
              />
            </EStop>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl aspect-square flex flex-col items-start justify-end overflow-hidden relative"
              style={{
                background:
                  i % 4 === 0
                    ? accent
                    : i % 4 === 1
                      ? `${bg}15`
                      : i % 4 === 2
                        ? `${bg}08`
                        : `${accent}25`,
              }}
            >
              <motion.div
                whileHover={{ opacity: 1 }}
                onClick={() => setSelected(it)}
                data-project-trigger
                data-title={it.title}
                data-desc={it.desc || ""}
                data-category={it.category || ""}
                data-period={it.period || ""}
                data-tags={it.tags || ""}
                data-link={it.link || ""}
                data-link-label={it.linkLabel || "View project"}
                data-badge-label={it.badgeLabel || "Featured"}
                data-featured={it.featured ? "true" : "false"}
                className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity z-10"
                style={{ background: `${bg}10` }}
              >
                <div
                  className="h-11 w-11 rounded-full grid place-items-center"
                  style={{ background: i % 4 === 0 ? bg : accent, color: i % 4 === 0 ? ink : bg }}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </motion.div>
              <div
                className="absolute inset-0 font-display font-black flex items-center justify-center opacity-[0.07] pointer-events-none"
                style={{ fontSize: "90px", color: bg }}
              >
                {it.title?.[0]}
              </div>
              <div className="relative z-20 p-5 w-full" onClick={(e) => e.stopPropagation()}>
                <EStop>
                  <Editable
                    as="span"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="text-base font-bold block truncate"
                    style={{ color: i % 4 === 0 ? bg : `${bg}90` }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                      className="text-xs mt-1 opacity-70 line-clamp-1"
                      style={{ color: i % 4 === 0 ? bg : `${bg}80` }}
                    />
                  </EStop>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <DialogDark item={selected} ink={bg} bg={ink} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 20 — Pill strip → links straight out
══════════════════════════════════════════════════════ */
export function Projects20({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  return (
    <section
      className="px-5 sm:px-8 md:px-20 py-20"
      style={{ background: bg, borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-10">
        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: accent }}>
          <EStop>
            <Editable
              value={props.eyebrow || "Projects"}
              onChange={(v) => onChange({ eyebrow: v })}
              className="inline"
            />
          </EStop>
        </span>
        {props.heading && (
          <>
            <span className="h-1 w-1 rounded-full" style={{ background: `${ink}30` }} />
            <EStop>
              <Editable
                as="span"
                value={props.heading}
                onChange={(v) => onChange({ heading: v })}
                className="font-display text-xl font-bold"
                style={{ color: ink }}
              />
            </EStop>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-5 group"
          >
            <VisitLink
              item={it}
              accent={it.featured ? accent : ink}
              label=""
              className="shrink-0 mt-1 h-8 w-8 rounded-full grid place-items-center cursor-pointer opacity-40 hover:opacity-100 transition-opacity"
              style={{ background: it.featured ? `${accent}20` : `${ink}08`, color: it.featured ? accent : ink }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <EStop>
                  <Editable
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="font-display text-xl font-bold inline"
                    style={{ color: it.featured ? accent : ink }}
                  />
                </EStop>
                {it.featured && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${accent}15`, color: accent }}
                  >
                    {it.badgeLabel || "Featured"}
                  </span>
                )}
              </div>
              {it.desc && (
                <EStop>
                  <Editable
                    as="p"
                    value={it.desc}
                    onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                    className="mt-1 text-base line-clamp-1"
                    style={{ color: `${ink}60` }}
                  />
                </EStop>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 21 — NEW: Scroll story. Sticky index rail on the
   left, each project is a full, tall block on the right. This
   one is deliberately vertical — on desktop the section runs
   for several screens instead of one flat row of cards.
   → DialogEditorial for the full read.
══════════════════════════════════════════════════════ */
export function Projects21({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-32 md:py-40" style={{ background: bg }}>
      <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
        <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
      </motion.div>
      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        <div className="hidden md:block sticky top-24 self-start h-fit">
          <div className="flex flex-col gap-4">
            {items.map((it, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left flex items-center gap-3 cursor-pointer"
                style={{ background: "none", border: "none", padding: 0 }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0 transition-all"
                  style={{ background: active === i ? accent : `${ink}20`, transform: active === i ? "scale(1.6)" : "scale(1)" }}
                />
                <span
                  className="text-sm font-semibold truncate transition-opacity"
                  style={{ color: active === i ? ink : `${ink}40` }}
                >
                  {it.title}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-16 md:gap-24">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
              onViewportEnter={() => setActive(i)}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="min-h-[70vh] md:min-h-[85vh] flex flex-col justify-center"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-2xl font-black" style={{ color: `${accent}60` }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {(it.category || it.period) && (
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>
                    {[it.category, it.period].filter(Boolean).join(" · ")}
                  </span>
                )}
              </div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelected(it)}
                data-project-trigger
                data-title={it.title}
                data-desc={it.desc || ""}
                data-category={it.category || ""}
                data-period={it.period || ""}
                data-tags={it.tags || ""}
                data-link={it.link || ""}
                data-link-label={it.linkLabel || "View project"}
                data-badge-label={it.badgeLabel || "Featured"}
                data-featured={it.featured ? "true" : "false"}
                className="aspect-[16/9] rounded-[2rem] overflow-hidden flex items-center justify-center relative cursor-pointer group mb-8"
                style={{ background: it.featured ? `${accent}18` : `${ink}06` }}
              >
                <div className="font-display text-[14vw] md:text-[9vw] font-black opacity-[0.06]" style={{ color: ink }}>
                  {it.title?.[0]}
                </div>
                {it.featured && (
                  <div
                    className="absolute top-6 left-6 text-xs px-3.5 py-1.5 rounded-full font-semibold"
                    style={{ background: accent, color: bg }}
                  >
                    {it.badgeLabel || "Featured"}
                  </div>
                )}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `${accent}10` }}
                >
                  <div className="h-16 w-16 rounded-full grid place-items-center" style={{ background: accent, color: bg }}>
                    <ArrowUpRight className="h-7 w-7" />
                  </div>
                </div>
              </motion.div>
              <EStop>
                <Editable
                  as="h3"
                  value={it.title}
                  onChange={(v) => updateItem(items, onChange, i, { title: v })}
                  className="font-display text-4xl md:text-6xl font-black leading-[0.95] max-w-3xl"
                  style={{ color: ink }}
                />
              </EStop>
              {it.desc && (
                <EStop>
                  <Editable
                    as="p"
                    value={it.desc}
                    onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                    className="mt-6 text-xl leading-relaxed max-w-2xl line-clamp-4"
                    style={{ color: `${ink}65` }}
                  />
                </EStop>
              )}
              <TagsLine item={it} items={items} onChange={onChange} i={i} accent={accent} className="mt-4" />
              <button
                onClick={() => setSelected(it)}
                data-project-trigger
                data-title={it.title}
                data-desc={it.desc || ""}
                data-category={it.category || ""}
                data-period={it.period || ""}
                data-tags={it.tags || ""}
                data-link={it.link || ""}
                data-link-label={it.linkLabel || "View project"}
                data-badge-label={it.badgeLabel || "Featured"}
                data-featured={it.featured ? "true" : "false"}
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold cursor-pointer w-fit"
                style={{ color: accent, background: "none", border: "none", padding: 0 }}
              >
                Read the full story <ArrowUpRight className="h-5 w-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <DialogEditorial item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 22 — NEW: Full-bleed snap sections. Each project
   takes up almost the entire viewport height and the whole
   section scroll-snaps between them — very unique on desktop,
   nothing like a card grid. Primary action links straight out.
══════════════════════════════════════════════════════ */
export function Projects22({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = (props.items ?? []) as Item[];
  return (
    <section style={{ background: bg }}>
      <div className="px-5 sm:px-5 sm:px-8 md:px-20 pt-32 pb-10">
        <motion.div initial="initial" whileInView="whileInView" viewport={fadeUpViewport} variants={fadeUp} transition={fadeUpTransition}>
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} align="center" />
        </motion.div>
      </div>
      <div className="snap-y snap-mandatory">
        {items.map((it, i) => {
          const dark = i % 2 === 1;
          const panelInk = dark ? bg : ink;
          const panelBg = dark ? ink : bg;
          return (
            <div
              key={i}
              className="snap-start min-h-[92vh] md:min-h-screen flex items-center relative overflow-hidden"
              style={{ background: panelBg, borderTop: `1px solid ${ink}10` }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.15 }}
                whileInView={{ opacity: dark ? 0.25 : 0.15, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="absolute -right-[10%] top-1/2 -translate-y-1/2 font-display font-black leading-none pointer-events-none select-none"
                style={{ fontSize: "42vw", color: accent }}
              >
                {it.title?.[0]}
              </motion.div>
              <div className="relative px-5 sm:px-8 md:px-20 w-full grid md:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-display text-xl font-black" style={{ color: accent }}>
                      {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                    </span>
                    {(it.category || it.period) && (
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: `${panelInk}50` }}>
                        {[it.category, it.period].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </div>
                  <EStop>
                    <Editable
                      as="h3"
                      value={it.title}
                      onChange={(v) => updateItem(items, onChange, i, { title: v })}
                      className="font-display text-5xl md:text-7xl font-black leading-[0.95]"
                      style={{ color: panelInk }}
                    />
                  </EStop>
                  {it.desc && (
                    <EStop>
                      <Editable
                        as="p"
                        value={it.desc}
                        onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                        className="mt-6 text-lg leading-relaxed max-w-lg line-clamp-4"
                        style={{ color: `${panelInk}70` }}
                      />
                    </EStop>
                  )}
                  <TagsLine item={it} items={items} onChange={onChange} i={i} accent={accent} className="mt-4" />
                  <div className="mt-9">
                    <VisitLink
                      item={it}
                      accent={accent}
                      label="Visit project"
                      className="inline-flex items-center gap-2.5 text-lg font-semibold cursor-pointer hover:gap-3.5 transition-[gap]"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="hidden md:flex aspect-[4/3] rounded-[2rem] items-center justify-center overflow-hidden"
                  style={{ background: dark ? `${bg}10` : `${ink}06` }}
                >
                  {it.featured && (
                    <div
                      className="absolute top-8 left-8 text-xs px-3.5 py-1.5 rounded-full font-semibold"
                      style={{ background: accent, color: bg }}
                    >
                      {it.badgeLabel || "Featured"}
                    </div>
                  )}
                  <div
                    className="font-display font-black opacity-[0.08]"
                    style={{ fontSize: "10rem", color: panelInk }}
                  >
                    {it.title?.[0]}
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
/* ══════════════════════════════════════════════════════
   BIG-FORMAT SHARED PIECES
   Used only by the large templates below (23 → 30).
   Nothing above this line is affected.
══════════════════════════════════════════════════════ */

/** Extra optional per-item copy used by the big templates. Purely additive. */
type BigItem = Item & {
  role?: string;
  client?: string;
  outcome?: string;
  stat1?: string;
  stat1Label?: string;
  stat2?: string;
  stat2Label?: string;
  stat3?: string;
  stat3Label?: string;
  intro?: string;
  skillsLabel?: string;
};

function bigItems(props: ProjectsProps) {
  return (props.items ?? []) as BigItem[];
}

/** Every chip is individually editable and writes back into the single `tags` string. */
function SkillChips({
  item,
  items,
  onChange,
  i,
  ink,
  accent,
  label = "Skills & services",
  className = "",
}: {
  item: BigItem;
  items: BigItem[];
  onChange: Props["onChange"];
  i: number;
  ink: string;
  accent: string;
  label?: string;
  className?: string;
}) {
  const raw = item.tags || "Strategy · Design · Build · Launch";
  const parts = raw
    .split(/[·,|]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const setPart = (idx: number, v: string) => {
    const next = [...parts];
    next[idx] = v;
    updateItem(items, onChange, i, { tags: next.filter(Boolean).join(" · ") });
  };

  return (
    <div className={className}>
      <EStop>
        <Editable
          as="div"
          value={item.skillsLabel || label}
          onChange={(v) => updateItem(items, onChange, i, { skillsLabel: v })}
          className="text-[10px] font-semibold uppercase tracking-[0.28em] mb-3"
          style={{ color: `${ink}45` }}
        />
      </EStop>
      <div className="flex flex-wrap gap-2">
        {parts.map((p, idx) => (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            whileHover={{ y: -2 }}
            className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold"
            style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}28` }}
          >
            <EStop>
              <Editable value={p} onChange={(v) => setPart(idx, v)} className="inline" />
            </EStop>
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/** Three editable metric cells — gives the big layouts real substance. */
function StatsRow({
  item,
  items,
  onChange,
  i,
  ink,
  accent,
  className = "",
}: {
  item: BigItem;
  items: BigItem[];
  onChange: Props["onChange"];
  i: number;
  ink: string;
  accent: string;
  className?: string;
}) {
  const cells: { v: string; l: string; patch: (v: string) => Partial<BigItem>; lp: (v: string) => Partial<BigItem> }[] = [
    {
      v: item.stat1 || "12",
      l: item.stat1Label || "Weeks",
      patch: (v) => ({ stat1: v }),
      lp: (v) => ({ stat1Label: v }),
    },
    {
      v: item.stat2 || "3x",
      l: item.stat2Label || "Growth",
      patch: (v) => ({ stat2: v }),
      lp: (v) => ({ stat2Label: v }),
    },
    {
      v: item.stat3 || "100%",
      l: item.stat3Label || "Delivered",
      patch: (v) => ({ stat3: v }),
      lp: (v) => ({ stat3Label: v }),
    },
  ];
  return (
    <div className={`grid grid-cols-3 gap-3 sm:gap-6 ${className}`}>
      {cells.map((c, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: idx * 0.08 }}
          className="min-w-0 rounded-2xl px-3 py-4 sm:px-5 sm:py-5"
          style={{ background: `${ink}06`, border: `1px solid ${ink}0f` }}
        >
          <EStop>
            <Editable
              as="div"
              value={c.v}
              onChange={(v) => updateItem(items, onChange, i, c.patch(v))}
              className="font-display text-2xl sm:text-4xl font-black leading-none truncate"
              style={{ color: accent }}
            />
          </EStop>
          <EStop>
            <Editable
              as="div"
              value={c.l}
              onChange={(v) => updateItem(items, onChange, i, c.lp(v))}
              className="mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] truncate"
              style={{ color: `${ink}55` }}
            />
          </EStop>
        </motion.div>
      ))}
    </div>
  );
}

/** Role / client / outcome detail block — always renders, always editable. */
function DetailGrid({
  item,
  items,
  onChange,
  i,
  ink,
  accent,
  className = "",
}: {
  item: BigItem;
  items: BigItem[];
  onChange: Props["onChange"];
  i: number;
  ink: string;
  accent: string;
  className?: string;
}) {
  const rows: { k: string; v: string; patch: (v: string) => Partial<BigItem> }[] = [
    { k: "Role", v: item.role || "Lead", patch: (v) => ({ role: v }) },
    { k: "Client", v: item.client || "Independent", patch: (v) => ({ client: v }) },
    { k: "Outcome", v: item.outcome || "Shipped and live", patch: (v) => ({ outcome: v }) },
  ];
  return (
    <dl className={`grid gap-x-8 gap-y-4 sm:grid-cols-3 ${className}`}>
      {rows.map((r, idx) => (
        <div key={idx} className="min-w-0">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: `${ink}40` }}>
            {r.k}
          </dt>
          <dd className="mt-1.5 min-w-0">
            <EStop>
              <Editable
                as="div"
                value={r.v}
                onChange={(v) => updateItem(items, onChange, i, r.patch(v))}
                className="text-sm sm:text-base font-semibold leading-snug"
                style={{ color: idx === 0 ? accent : `${ink}80` }}
              />
            </EStop>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Long-form editable narrative paragraph (separate from the short `desc`). */
function Narrative({
  item,
  items,
  onChange,
  i,
  ink,
  className = "",
  size = "text-base sm:text-lg",
}: {
  item: BigItem;
  items: BigItem[];
  onChange: Props["onChange"];
  i: number;
  ink: string;
  className?: string;
  size?: string;
}) {
  return (
    <EStop>
      <Editable
        as="p"
        value={
          item.intro ||
          "Write the story here — the brief, the constraints, what you actually did, and how it turned out. This paragraph is fully editable."
        }
        onChange={(v) => updateItem(items, onChange, i, { intro: v })}
        className={`${size} leading-relaxed ${className}`}
        style={{ color: `${ink}70` }}
      />
    </EStop>
  );
}

/** Big decorative letter-plate used as the visual for the large layouts. */
function Plate({
  item,
  ink,
  bg,
  accent,
  className = "",
  radius = "2rem",
}: {
  item: BigItem;
  ink: string;
  bg: string;
  accent: string;
  className?: string;
  radius?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{
        borderRadius: radius,
        background: item.featured ? `${accent}16` : `${ink}07`,
        border: `1px solid ${ink}10`,
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.18, 1], rotate: [0, 8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle at 70% 30%, ${accent}30, transparent 62%)` }}
      />
      <span
        className="relative font-display font-black leading-none select-none text-[7rem] sm:text-[11rem] lg:text-[14rem]"
        style={{ color: ink, opacity: 0.09 }}
      >
        {item.title?.[0]}
      </span>
      {item.featured && (
        <span
          className="absolute top-5 left-5 rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{ background: accent, color: bg }}
        >
          {item.badgeLabel || "Featured"}
        </span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 23 — Full-bleed magazine spreads (alternating),
   huge type, narrative, stats + skills. Not dev-specific.
══════════════════════════════════════════════════════ */
export function Projects23({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = bigItems(props);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-24 md:py-40" style={{ background: bg }}>
      <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
      <div className="space-y-20 md:space-y-36">
        {items.map((it, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`grid items-center gap-10 lg:gap-20 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
          >
            <Plate item={it} ink={ink} bg={bg} accent={accent} className="aspect-[4/3] w-full" />
            <div className="min-w-0">
              <MetaLine item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mb-3" />
              <EStop>
                <Editable
                  as="h3"
                  value={it.title}
                  onChange={(v) => updateItem(items, onChange, i, { title: v })}
                  className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight"
                  style={{ color: ink }}
                />
              </EStop>
              {it.desc && (
                <EStop>
                  <Editable
                    as="p"
                    value={it.desc}
                    onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                    className="mt-5 text-lg sm:text-xl leading-relaxed"
                    style={{ color: `${ink}80` }}
                  />
                </EStop>
              )}
              <Narrative item={it} items={items} onChange={onChange} i={i} ink={ink} className="mt-4" />
              <DetailGrid item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />
              <StatsRow item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />
              <SkillChips item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />
              <div className="mt-9">
                <VisitLink
                  item={it}
                  accent={accent}
                  label="See the full story"
                  className="inline-flex items-center gap-2.5 text-base sm:text-lg font-semibold cursor-pointer hover:gap-4 transition-[gap]"
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 24 — Full-width sliding showcase (embla + autoplay).
   Slides in from the side, one big panel at a time.
══════════════════════════════════════════════════════ */
export function Projects24({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = bigItems(props);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ]);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!embla) return;
    const onSel = () => setActive(embla.selectedScrollSnap());
    embla.on("select", onSel);
    onSel();
    return () => {
      embla.off("select", onSel);
    };
  }, [embla]);
  const scroll = useCallback((dir: -1 | 1) => {
    if (!embla) return;
    dir === 1 ? embla.scrollNext() : embla.scrollPrev();
  }, [embla]);

  return (
    <section className="py-24 md:py-36 overflow-hidden" style={{ background: bg }}>
      <div className="px-5 sm:px-8 md:px-20">
        <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
      </div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5 sm:gap-8 px-5 sm:px-8 md:px-20">
          {items.map((it, i) => (
            <div key={i} className="min-w-0 shrink-0 basis-[92%] md:basis-[78%] lg:basis-[64%]">
              <motion.div
                animate={{ scale: active === i ? 1 : 0.94, opacity: active === i ? 1 : 0.55 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[2rem] overflow-hidden p-6 sm:p-10 lg:p-14 h-full"
                style={{ background: `${ink}05`, border: `1px solid ${ink}12`, boxShadow: `0 40px 100px -50px ${ink}55` }}
              >
                <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14 items-center">
                  <div className="min-w-0">
                    <MetaLine item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mb-3" />
                    <EStop>
                      <Editable
                        as="h3"
                        value={it.title}
                        onChange={(v) => updateItem(items, onChange, i, { title: v })}
                        className="font-display text-4xl sm:text-6xl font-black leading-[0.95]"
                        style={{ color: ink }}
                      />
                    </EStop>
                    <Narrative item={it} items={items} onChange={onChange} i={i} ink={ink} className="mt-5" size="text-base sm:text-lg" />
                    <SkillChips item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-7" />
                    <StatsRow item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-7" />
                    <div className="mt-8">
                      <VisitLink
                        item={it}
                        accent={accent}
                        label="Open project"
                        className="inline-flex items-center gap-2.5 text-base font-semibold cursor-pointer hover:gap-4 transition-[gap]"
                      />
                    </div>
                  </div>
                  <Plate item={it} ink={ink} bg={bg} accent={accent} className="aspect-square w-full" />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center gap-4 px-5">
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="h-12 w-12 rounded-full grid place-items-center cursor-pointer"
          style={{ background: `${accent}14`, color: accent, border: "none" }}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{ width: active === i ? 32 : 10, background: active === i ? accent : `${ink}25` }}
            />
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          aria-label="Next"
          className="h-12 w-12 rounded-full grid place-items-center cursor-pointer"
          style={{ background: `${accent}14`, color: accent, border: "none" }}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 25 — Oversized bento grid, first tile is a hero tile.
══════════════════════════════════════════════════════ */
export function Projects25({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = bigItems(props);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-24 md:py-36" style={{ background: bg }}>
      <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} align="center" />
      <motion.div
        initial="initial"
        whileInView="whileInView"
        viewport={fadeUpViewport}
        variants={stagger}
        className="grid gap-5 sm:gap-7 md:grid-cols-6"
      >
        {items.map((it, i) => {
          const hero = i === 0;
          const wide = i % 5 === 3;
          return (
            <motion.div
              key={i}
              variants={child}
              transition={childTransition}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-[2rem] p-7 sm:p-10 ${hero ? "md:col-span-6 lg:col-span-4 lg:row-span-2" : wide ? "md:col-span-4" : "md:col-span-3 lg:col-span-2"
                }`}
              style={{ background: `${ink}05`, border: `1px solid ${ink}10` }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(140deg, ${accent}18, transparent 60%)` }}
              />
              <div className="relative min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <MetaLine item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mb-2" />
                  <span className="font-display text-sm font-black shrink-0" style={{ color: `${ink}25` }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <EStop>
                  <Editable
                    as="h3"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className={`font-display font-black leading-[1] ${hero ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"}`}
                    style={{ color: ink }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                      className={`mt-4 leading-relaxed ${hero ? "text-lg" : "text-base"}`}
                      style={{ color: `${ink}75` }}
                    />
                  </EStop>
                )}
                {hero && <Narrative item={it} items={items} onChange={onChange} i={i} ink={ink} className="mt-3" />}
                {hero && <DetailGrid item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />}
                <SkillChips item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-7" />
                {hero && <StatsRow item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />}
                <div className="mt-7">
                  <VisitLink
                    item={it}
                    accent={accent}
                    label="Explore"
                    className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer hover:gap-3.5 transition-[gap]"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 26 — Sticky index on the left, tall panels on the right.
══════════════════════════════════════════════════════ */
export function Projects26({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = bigItems(props);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-24 md:py-36" style={{ background: bg }}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
          <ol className="space-y-3">
            {items.map((it, i) => (
              <li key={i} className="flex items-baseline gap-3 min-w-0">
                <span className="font-display text-xs font-black shrink-0" style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <EStop>
                  <Editable
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="text-sm font-semibold truncate"
                    style={{ color: `${ink}70` }}
                  />
                </EStop>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-8 md:space-y-14 min-w-0">
          {items.map((it, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[2rem] overflow-hidden"
              style={{ background: `${ink}04`, border: `1px solid ${ink}12` }}
            >
              <Plate item={it} ink={ink} bg={bg} accent={accent} className="aspect-[16/9] w-full" radius="0" />
              <div className="p-7 sm:p-10 lg:p-14 min-w-0">
                <MetaLine item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mb-3" />
                <EStop>
                  <Editable
                    as="h3"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="font-display text-3xl sm:text-5xl font-black leading-[0.98]"
                    style={{ color: ink }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                      className="mt-4 text-lg leading-relaxed"
                      style={{ color: `${ink}80` }}
                    />
                  </EStop>
                )}
                <Narrative item={it} items={items} onChange={onChange} i={i} ink={ink} className="mt-4" />
                <StatsRow item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />
                <SkillChips item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />
                <DetailGrid item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />
                <div className="mt-9">
                  <VisitLink
                    item={it}
                    accent={accent}
                    label="View case study"
                    className="inline-flex items-center gap-2.5 text-base font-semibold cursor-pointer hover:gap-4 transition-[gap]"
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 27 — Tilted 3D cards on a warm canvas, hover lifts flat.
══════════════════════════════════════════════════════ */
export function Projects27({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = bigItems(props);
  return (
    <section
      className="px-5 sm:px-8 md:px-20 py-24 md:py-36"
      style={{ background: `linear-gradient(180deg, ${bg}, ${accent}0d)` }}
    >
      <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} align="center" />
      <div className="grid gap-8 sm:gap-10 md:grid-cols-2 xl:grid-cols-3" style={{ perspective: "1600px" }}>
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotateY: 0, rotateX: 0, y: -10, scale: 1.01 }}
            style={{
              transformStyle: "preserve-3d",
              rotateY: i % 2 ? -4 : 4,
              background: bg,
              border: `1px solid ${ink}10`,
              boxShadow: `0 40px 80px -50px ${ink}70`,
            }}
            className="rounded-[2rem] overflow-hidden flex flex-col"
          >
            <Plate item={it} ink={ink} bg={bg} accent={accent} className="aspect-[5/4] w-full" radius="0" />
            <div className="p-7 sm:p-9 flex-1 flex flex-col min-w-0">
              <MetaLine item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mb-2" />
              <EStop>
                <Editable
                  as="h3"
                  value={it.title}
                  onChange={(v) => updateItem(items, onChange, i, { title: v })}
                  className="font-display text-2xl sm:text-3xl font-black leading-tight"
                  style={{ color: ink }}
                />
              </EStop>
              {it.desc && (
                <EStop>
                  <Editable
                    as="p"
                    value={it.desc}
                    onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                    className="mt-3 text-base leading-relaxed"
                    style={{ color: `${ink}78` }}
                  />
                </EStop>
              )}
              <Narrative item={it} items={items} onChange={onChange} i={i} ink={ink} className="mt-3" size="text-sm sm:text-base" />
              <SkillChips item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-6" />
              <StatsRow item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-6" />
              <div className="mt-auto pt-7">
                <VisitLink
                  item={it}
                  accent={accent}
                  label="Take a look"
                  className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer hover:gap-3.5 transition-[gap]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 28 — Vertical timeline, alternating big panels.
══════════════════════════════════════════════════════ */
export function Projects28({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = bigItems(props);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-24 md:py-36" style={{ background: bg }}>
      <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
      <div className="relative">
        <div
          className="absolute left-[13px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2"
          style={{ background: `${ink}14` }}
        />
        <div className="space-y-14 md:space-y-24">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="absolute left-0 md:left-1/2 top-8 h-7 w-7 rounded-full md:-translate-x-1/2 grid place-items-center"
                style={{ background: accent, color: bg }}
              >
                <span className="text-[10px] font-black">{i + 1}</span>
              </motion.span>
              <div className={i % 2 ? "md:col-start-2" : "md:col-start-1 md:text-right"}>
                <div
                  className="rounded-[1.75rem] p-7 sm:p-10 min-w-0"
                  style={{ background: `${ink}05`, border: `1px solid ${ink}10` }}
                >
                  <MetaLine
                    item={it}
                    items={items}
                    onChange={onChange}
                    i={i}
                    ink={ink}
                    accent={accent}
                    className={`mb-3 ${i % 2 ? "" : "md:justify-end"}`}
                  />
                  <EStop>
                    <Editable
                      as="h3"
                      value={it.title}
                      onChange={(v) => updateItem(items, onChange, i, { title: v })}
                      className="font-display text-3xl sm:text-5xl font-black leading-[0.98]"
                      style={{ color: ink }}
                    />
                  </EStop>
                  {it.desc && (
                    <EStop>
                      <Editable
                        as="p"
                        value={it.desc}
                        onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                        className="mt-4 text-base sm:text-lg leading-relaxed"
                        style={{ color: `${ink}78` }}
                      />
                    </EStop>
                  )}
                  <Narrative item={it} items={items} onChange={onChange} i={i} ink={ink} className="mt-3" />
                  <div className={`mt-7 flex ${i % 2 ? "" : "md:justify-end"}`}>
                    <div className="w-full">
                      <SkillChips item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} />
                    </div>
                  </div>
                  <StatsRow item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-7 text-left" />
                  <div className={`mt-8 flex ${i % 2 ? "" : "md:justify-end"}`}>
                    <VisitLink
                      item={it}
                      accent={accent}
                      label="Read more"
                      className="inline-flex items-center gap-2 text-base font-semibold cursor-pointer hover:gap-3.5 transition-[gap]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 29 — Cinematic dark stack with parallax glow → DialogPolaroid
══════════════════════════════════════════════════════ */
export function Projects29({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = bigItems(props);
  const [selected, setSelected] = useState<Item | null>(null);
  return (
    <section className="relative px-5 sm:px-8 md:px-20 py-24 md:py-40 overflow-hidden" style={{ background: ink }}>
      <motion.div
        animate={{ opacity: [0.18, 0.32, 0.18], x: [0, 60, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/3 h-[34rem] w-[34rem] rounded-full blur-[130px] pointer-events-none"
        style={{ background: accent }}
      />
      <div className="relative z-10">
        <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} dark align="center" />
        <div className="space-y-8 md:space-y-12 max-w-6xl mx-auto">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(it)}
              data-project-trigger
              data-title={it.title}
              data-desc={it.desc || ""}
              data-category={it.category || ""}
              data-period={it.period || ""}
              data-tags={it.tags || ""}
              data-link={it.link || ""}
              data-link-label={it.linkLabel || "View project"}
              data-badge-label={it.badgeLabel || "Featured"}
              data-featured={it.featured ? "true" : "false"}
              className="group grid gap-8 lg:grid-cols-[1fr_1.2fr] rounded-[2.25rem] overflow-hidden cursor-pointer p-6 sm:p-10 lg:p-14"
              style={{ background: `${bg}0c`, border: `1px solid ${bg}18`, backdropFilter: "blur(10px)" }}
            >
              <div
                className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden grid place-items-center"
                style={{ background: `${bg}0a`, border: `1px solid ${bg}14` }}
              >
                <span className="font-display text-[7rem] sm:text-[10rem] font-black leading-none" style={{ color: bg, opacity: 0.14 }}>
                  {it.title?.[0]}
                </span>
                <motion.span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at 50% 60%, ${accent}35, transparent 65%)` }}
                />
              </div>
              <div className="min-w-0">
                <MetaLine item={it} items={items} onChange={onChange} i={i} ink={bg} accent={accent} className="mb-3" />
                <EStop>
                  <Editable
                    as="h3"
                    value={it.title}
                    onChange={(v) => updateItem(items, onChange, i, { title: v })}
                    className="font-display text-4xl sm:text-6xl font-black leading-[0.95]"
                    style={{ color: bg }}
                  />
                </EStop>
                {it.desc && (
                  <EStop>
                    <Editable
                      as="p"
                      value={it.desc}
                      onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                      className="mt-4 text-base sm:text-lg leading-relaxed"
                      style={{ color: `${bg}85` }}
                    />
                  </EStop>
                )}
                <Narrative item={it} items={items} onChange={onChange} i={i} ink={bg} className="mt-3" />
                <SkillChips item={it} items={items} onChange={onChange} i={i} ink={bg} accent={accent} className="mt-7" />
                <StatsRow item={it} items={items} onChange={onChange} i={i} ink={bg} accent={accent} className="mt-7" />
                <DetailGrid item={it} items={items} onChange={onChange} i={i} ink={bg} accent={accent} className="mt-8" />
                <div className="mt-8 flex items-center gap-3 text-sm font-semibold" style={{ color: accent }}>
                  <ExternalLink className="h-4 w-4" /> Quick view
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <DialogPolaroid item={selected} ink={ink} bg={bg} accent={accent} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   PROJECTS 30 — Expanding panels: click a row, it unfolds into a
   full editorial panel with skills, stats and details.
══════════════════════════════════════════════════════ */
export function Projects30({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = bigItems(props);
  const [open, setOpen] = useState(0);
  return (
    <section className="px-5 sm:px-8 md:px-20 py-24 md:py-36" style={{ background: bg }}>
      <SectionHeading props={props} ink={ink} accent={accent} onChange={onChange} />
      <div className="space-y-4">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-[1.75rem] overflow-hidden"
              style={{
                background: isOpen ? `${accent}08` : `${ink}04`,
                border: `1px solid ${isOpen ? `${accent}30` : `${ink}10`}`,
              }}
            >
              <div
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-6 sm:p-9 cursor-pointer"
              >
                <div className="min-w-0">
                  <MetaLine item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mb-2" />
                  <EStop>
                    <Editable
                      as="h3"
                      value={it.title}
                      onChange={(v) => updateItem(items, onChange, i, { title: v })}
                      className="font-display text-2xl sm:text-4xl lg:text-5xl font-black leading-tight truncate"
                      style={{ color: ink }}
                    />
                  </EStop>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-12 w-12 shrink-0 rounded-full grid place-items-center"
                  style={{ background: `${accent}16`, color: accent }}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </motion.span>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] px-6 pb-8 sm:px-9 sm:pb-12">
                      <div className="min-w-0">
                        {it.desc && (
                          <EStop>
                            <Editable
                              as="p"
                              value={it.desc}
                              onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                              className="text-lg leading-relaxed"
                              style={{ color: `${ink}80` }}
                            />
                          </EStop>
                        )}
                        <Narrative item={it} items={items} onChange={onChange} i={i} ink={ink} className="mt-4" />
                        <DetailGrid item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />
                        <SkillChips item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />
                        <StatsRow item={it} items={items} onChange={onChange} i={i} ink={ink} accent={accent} className="mt-8" />
                        <div className="mt-8">
                          <VisitLink
                            item={it}
                            accent={accent}
                            label="Open"
                            className="inline-flex items-center gap-2.5 text-base font-semibold cursor-pointer hover:gap-4 transition-[gap]"
                          />
                        </div>
                      </div>
                      <Plate item={it} ink={ink} bg={bg} accent={accent} className="aspect-[4/3] w-full" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
