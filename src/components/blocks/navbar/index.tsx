import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { NavbarProps } from "@/types/builder.schema";

type Props = BlockComponentProps<NavbarProps>;

/** Tracks scroll position so sticky navs can pick up a subtle shadow/border once the page moves. */
function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function UnderlineLink({ label, ink }: { label: string; ink: string }) {
  return (
    <motion.span whileHover={{ y: -1 }} className="relative inline-flex flex-col items-center group cursor-pointer">
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ background: ink }} />
    </motion.span>
  );
}

function MobileDrawer({ open, onClose, links, ctaLabel, ink, bg, accent }: {
  open: boolean; onClose: () => void; links: NavbarProps["links"]; ctaLabel?: string; ink: string; bg: string; accent: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-30 md:hidden"
            style={{ background: "rgba(0,0,0,0.35)" }}
          />
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-40 w-72 max-w-[85vw] p-8 flex flex-col md:hidden"
            style={{ background: bg, borderLeft: `1px solid ${ink}12` }}
          >
            <button onClick={onClose} className="self-end grid h-9 w-9 place-items-center rounded-full" style={{ background: `${ink}08`, color: ink }}>
              <X className="h-4 w-4" />
            </button>
            <div className="mt-8 flex flex-col gap-5 text-lg">
              {links.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  style={{ color: ink }}
                >
                  {l.label}
                </motion.span>
              ))}
            </div>
            {ctaLabel && (
              <motion.span
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="mt-8 rounded-full px-5 py-2.5 text-sm font-medium text-center"
                style={{ background: accent, color: bg }}
              >
                {ctaLabel}
              </motion.span>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------- MINIMAL: logo left, links right, thin border ----------
export function NavMinimal({ props, theme, onChange }: Props) {
  const { ink, bg } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-5 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ borderBottom: `1px solid ${ink}12`, background: bg, boxShadow: scrolled && props.sticky ? `0 8px 24px -18px ${ink}40` : "none" }}
    >
      <Editable
        value={props.logoText}
        onChange={(v) => onChange({ logoText: v })}
        className="font-display text-lg"
        style={{ color: ink }}
      />
      <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: `${ink}80` }}>
        {props.links.map((l, i) => (
          <UnderlineLink key={i} label={l.label} ink={ink} />
        ))}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full" style={{ color: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ink={ink} bg={bg} accent={theme.accent} />
    </nav>
  );
}

// ---------- CENTERED LOGO: links split around a centered logo ----------
export function NavCenteredLogo({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const mid = Math.ceil(props.links.length / 2);
  const left = props.links.slice(0, mid);
  const right = props.links.slice(mid);
  return (
    <nav
      className={`grid grid-cols-3 items-center px-8 md:px-16 py-6 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ borderBottom: `1px solid ${ink}12`, background: bg, boxShadow: scrolled && props.sticky ? `0 8px 24px -18px ${ink}40` : "none" }}
    >
      <div className="flex gap-6 text-sm justify-start" style={{ color: `${ink}80` }}>
        {left.map((l, i) => (
          <span key={i} className="hidden md:inline"><UnderlineLink label={l.label} ink={ink} /></span>
        ))}
      </div>
      <motion.div whileHover={{ scale: 1.04 }} className="text-center font-display text-xl cursor-pointer" style={{ color: ink }}>
        {props.logoText}
      </motion.div>
      <div className="flex gap-6 text-sm justify-end items-center" style={{ color: `${ink}80` }}>
        {right.map((l, i) => (
          <span key={i} className="hidden md:inline"><UnderlineLink label={l.label} ink={ink} /></span>
        ))}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full justify-self-end" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- SPLIT: logo + links left-aligned, solid CTA button right ----------
export function NavSplit({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-5 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, boxShadow: scrolled && props.sticky ? `0 8px 24px -18px ${ink}30` : "none" }}
    >
      <div className="flex items-center gap-10">
        <Editable
          value={props.logoText}
          onChange={(v) => onChange({ logoText: v })}
          className="font-display text-lg"
          style={{ color: ink }}
        />
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: `${ink}70` }}>
          {props.links.map((l, i) => (
            <UnderlineLink key={i} label={l.label} ink={ink} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {props.ctaLabel && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="hidden md:inline-flex rounded-full px-5 py-2 text-sm font-medium cursor-pointer"
            style={{ background: accent, color: bg }}
          >
            {props.ctaLabel}
          </motion.div>
        )}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- MEGA: bold full-width bar, underline hover links, pill CTA ----------
export function NavMega({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`px-8 md:px-16 py-6 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: ink, boxShadow: scrolled && props.sticky ? "0 10px 30px -16px rgba(0,0,0,0.4)" : "none" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-2xl" style={{ color: bg }}>
          {props.logoText}
        </span>
        <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wide" style={{ color: `${bg}90` }}>
          {props.links.map((l, i) => (
            <motion.span key={i} whileHover={{ color: accent }} className="border-b border-transparent hover:border-current pb-1 cursor-pointer">
              {l.label}
            </motion.span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {props.ctaLabel && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:inline-flex rounded-full px-5 py-2 text-sm font-medium cursor-pointer"
              style={{ background: accent, color: ink }}
            >
              {props.ctaLabel}
            </motion.span>
          )}
          <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full" style={{ color: bg }}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={bg} bg={ink} accent={accent} />
    </nav>
  );
}

// ---------- SIDEBAR: collapsible drawer trigger, vertical stacked links ----------
export function NavSidebar({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className="relative px-8 md:px-16 py-5 flex items-center justify-between" style={{ background: bg, borderBottom: `1px solid ${ink}12` }}>
      <span className="font-display text-lg" style={{ color: ink }}>
        {props.logoText}
      </span>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.9 }}
        className="grid h-9 w-9 place-items-center rounded-full"
        style={{ background: `${ink}08`, color: ink }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={open ? "x" : "menu"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute right-6 top-16 z-30 w-56 rounded-2xl p-4 flex flex-col gap-1 shadow-lift"
            style={{ background: bg, border: `1px solid ${ink}12` }}
          >
            {props.links.map((l, i) => (
              <motion.span
                key={i}
                whileHover={{ x: 4, backgroundColor: `${ink}06` }}
                className="rounded-lg px-3 py-2 text-sm cursor-pointer"
                style={{ color: `${ink}80` }}
              >
                {l.label}
              </motion.span>
            ))}
            {props.ctaLabel && (
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 rounded-lg px-3 py-2 text-sm text-center font-medium cursor-pointer"
                style={{ background: accent, color: bg }}
              >
                {props.ctaLabel}
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}