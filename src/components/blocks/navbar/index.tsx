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

// ---------- NAVBAR 1: MINIMAL ----------
export function Navbar1({ props, theme, onChange }: Props) {
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
        className="font-display text-lg font-semibold tracking-tight"
        style={{ color: ink }}
      />
      <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: `${ink}80` }}>
        {props.links.map((l, i) => (
          <UnderlineLink key={i} label={l.label} ink={ink} />
        ))}
      </div>
      {props.ctaLabel && (
        <span className="hidden md:inline-flex text-sm font-medium px-4 py-1.5 rounded-full border cursor-pointer transition-colors duration-200 hover:opacity-80" style={{ borderColor: `${ink}30`, color: ink }}>
          {props.ctaLabel}
        </span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full" style={{ color: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={theme.accent} />
    </nav>
  );
}

// ---------- NAVBAR 2: CENTERED LOGO ----------
export function Navbar2({ props, theme, onChange }: Props) {
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
      <div className="hidden md:flex gap-6 text-sm justify-start" style={{ color: `${ink}80` }}>
        {left.map((l, i) => (
          <UnderlineLink key={i} label={l.label} ink={ink} />
        ))}
      </div>
      <motion.div whileHover={{ scale: 1.04 }} className="text-center font-display text-xl font-bold cursor-pointer" style={{ color: ink }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold" style={{ color: ink }} />
      </motion.div>
      <div className="flex gap-6 text-sm justify-end items-center" style={{ color: `${ink}80` }}>
        <div className="hidden md:flex gap-6 items-center">
          {right.map((l, i) => (
            <UnderlineLink key={i} label={l.label} ink={ink} />
          ))}
          {props.ctaLabel && (
            <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="rounded-full px-4 py-1.5 text-sm font-medium cursor-pointer" style={{ background: accent, color: bg }}>
              {props.ctaLabel}
            </motion.span>
          )}
        </div>
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 3: SPLIT ----------
export function Navbar3({ props, theme, onChange }: Props) {
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
          className="font-display text-lg font-semibold"
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

// ---------- NAVBAR 4: DARK INVERTED ----------
export function Navbar4({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`px-8 md:px-16 py-6 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: ink, boxShadow: scrolled && props.sticky ? "0 10px 30px -16px rgba(0,0,0,0.4)" : "none" }}
    >
      <div className="flex items-center justify-between">
        <Editable
          value={props.logoText}
          onChange={(v) => onChange({ logoText: v })}
          className="font-display text-2xl font-bold"
          style={{ color: bg }}
        />
        <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wide" style={{ color: `${bg}90` }}>
          {props.links.map((l, i) => (
            <motion.span key={i} whileHover={{ color: accent }} className="border-b border-transparent hover:border-current pb-1 cursor-pointer transition-colors duration-200">
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

// ---------- NAVBAR 5: DROPDOWN SIDEBAR ----------
export function Navbar5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative px-8 md:px-16 py-5 flex items-center justify-between ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `1px solid ${ink}12` }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-semibold" style={{ color: ink }} />
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
            className="absolute right-6 top-16 z-30 w-56 rounded-2xl p-4 flex flex-col gap-1 shadow-xl"
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

// ---------- NAVBAR 6: FROSTED GLASS ----------
export function Navbar6({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-4 transition-all duration-300 backdrop-blur-md ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{
        background: `${bg}bb`,
        borderBottom: `1px solid ${ink}18`,
        boxShadow: scrolled && props.sticky ? `0 8px 32px -12px ${ink}20` : "none",
      }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-semibold" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-7 text-sm" style={{ color: `${ink}70` }}>
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: ink, y: -1 }} className="cursor-pointer transition-colors duration-200">
            {l.label}
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="hidden md:inline-flex rounded-full px-5 py-2 text-sm font-medium cursor-pointer backdrop-blur-sm"
          style={{ background: `${accent}22`, color: accent, border: `1px solid ${accent}44` }}
        >
          {props.ctaLabel}
        </motion.span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full" style={{ color: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 7: PILL NAV ----------
export function Navbar7({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-4 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `1px solid ${ink}10`, boxShadow: scrolled && props.sticky ? `0 4px 20px -8px ${ink}30` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-2">
        {props.links.map((l, i) => (
          <motion.span
            key={i}
            whileHover={{ background: ink, color: bg }}
            className="px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200 border"
            style={{ color: `${ink}80`, borderColor: `${ink}20`, background: "transparent" }}
          >
            {l.label}
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="hidden md:inline-flex rounded-full px-5 py-2 text-sm font-semibold cursor-pointer"
          style={{ background: accent, color: bg }}
        >
          {props.ctaLabel}
        </motion.span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full" style={{ color: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 8: UNDERLINE SLIDE ----------
export function Navbar8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-5 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, boxShadow: scrolled && props.sticky ? `0 6px 20px -10px ${ink}25` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold tracking-tight" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: `${ink}60` }}>
        {props.links.map((l, i) => (
          <motion.span
            key={i}
            className="relative cursor-pointer py-1 group"
            whileHover={{ color: ink }}
            style={{ color: `${ink}60` }}
          >
            {l.label}
            <motion.span
              className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full"
              style={{ background: accent }}
              transition={{ duration: 0.25 }}
            />
          </motion.span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {props.ctaLabel && (
          <span className="hidden md:inline-flex text-sm font-semibold px-5 py-2 rounded cursor-pointer transition-opacity hover:opacity-75" style={{ background: accent, color: bg }}>
            {props.ctaLabel}
          </span>
        )}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 9: BOLD LEFT BLOCK ----------
export function Navbar9({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-stretch transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, boxShadow: scrolled && props.sticky ? `0 4px 16px -8px ${ink}30` : "none" }}
    >
      <div className="w-2 flex-shrink-0" style={{ background: accent }} />
      <div className="flex items-center justify-between flex-1 px-8 md:px-14 py-5">
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-black uppercase tracking-widest" style={{ color: ink }} />
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider" style={{ color: `${ink}60` }}>
          {props.links.map((l, i) => (
            <motion.span key={i} whileHover={{ color: accent }} className="cursor-pointer transition-colors duration-200">
              {l.label}
            </motion.span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {props.ctaLabel && (
            <span className="hidden md:inline-flex text-xs font-bold uppercase tracking-widest px-5 py-2.5 cursor-pointer" style={{ background: accent, color: bg }}>
              {props.ctaLabel}
            </span>
          )}
          <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 10: GRADIENT BAR ----------
export function Navbar10({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-5 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{
        background: `linear-gradient(135deg, ${accent}, ${ink})`,
        boxShadow: scrolled && props.sticky ? `0 8px 24px -12px ${ink}60` : "none",
      }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold" style={{ color: bg }} />
      <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: `${bg}cc` }}>
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: bg, y: -1 }} className="cursor-pointer transition-colors duration-200">
            {l.label}
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="hidden md:inline-flex rounded-full px-5 py-2 text-sm font-semibold cursor-pointer"
          style={{ background: bg, color: accent }}
        >
          {props.ctaLabel}
        </motion.span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full" style={{ color: bg }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={bg} bg={ink} accent={bg} />
    </nav>
  );
}

// ---------- NAVBAR 11: BORDERED BOX ----------
export function Navbar11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-4 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `2px solid ${ink}15`, boxShadow: scrolled && props.sticky ? `0 4px 16px -8px ${ink}25` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold" style={{ color: ink }} />
      <div className="hidden md:flex items-center border rounded-lg overflow-hidden" style={{ borderColor: `${ink}20` }}>
        {props.links.map((l, i) => (
          <motion.span
            key={i}
            whileHover={{ background: `${ink}08` }}
            className="px-5 py-2 text-sm cursor-pointer border-r last:border-r-0 transition-colors duration-200"
            style={{ color: `${ink}70`, borderColor: `${ink}20` }}
          >
            {l.label}
          </motion.span>
        ))}
        {props.ctaLabel && (
          <motion.span
            whileHover={{ opacity: 0.9 }}
            className="px-5 py-2 text-sm font-semibold cursor-pointer"
            style={{ background: accent, color: bg }}
          >
            {props.ctaLabel}
          </motion.span>
        )}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 12: MAGAZINE ----------
export function Navbar12({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-6 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `1px solid ${ink}12`, boxShadow: scrolled && props.sticky ? `0 4px 20px -10px ${ink}30` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-4xl font-black tracking-tighter leading-none" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: `${ink}55` }}>
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: ink }} className="cursor-pointer transition-colors duration-200">
            {l.label}
          </motion.span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {props.ctaLabel && (
          <span className="hidden md:inline-flex text-xs uppercase tracking-widest font-bold px-5 py-2.5 cursor-pointer border-2" style={{ borderColor: accent, color: accent }}>
            {props.ctaLabel}
          </span>
        )}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 13: MONOSPACE TERMINAL ----------
export function Navbar13({ props, theme, onChange }: Props) {
  const { ink, bg } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const green = "#22c55e";
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-4 font-mono transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: "#0d1117", borderBottom: `1px solid #30363d`, boxShadow: scrolled && props.sticky ? "0 4px 20px -8px rgba(0,0,0,0.5)" : "none" }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: green }}>▶</span>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-mono text-sm font-bold" style={{ color: "#e6edf3" }} />
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: "#8b949e" }}>
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: green }} className="cursor-pointer transition-colors duration-200">
            <span style={{ color: green }}>~/</span>{l.label}
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <span className="hidden md:inline-flex font-mono text-xs px-4 py-2 cursor-pointer rounded border" style={{ borderColor: green, color: green }}>
          [{props.ctaLabel}]
        </span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: green }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink="#e6edf3" bg="#0d1117" accent={green} />
    </nav>
  );
}

// ---------- NAVBAR 14: LUXURY ----------
export function Navbar14({ props, theme, onChange }: Props) {
  const { ink, bg } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const gold = "#b8860b";
  return (
    <nav
      className={`flex flex-col transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `1px solid ${gold}40`, boxShadow: scrolled && props.sticky ? `0 4px 24px -10px ${gold}30` : "none" }}
    >
      <div className="flex items-center justify-center py-5 border-b" style={{ borderColor: `${gold}20` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-serif text-3xl font-normal tracking-[0.15em]" style={{ color: ink }} />
      </div>
      <div className="hidden md:flex items-center justify-center gap-12 py-3">
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: gold }} className="text-xs tracking-[0.25em] uppercase font-light cursor-pointer transition-colors duration-300" style={{ color: `${ink}60` }}>
            {l.label}
          </motion.span>
        ))}
        {props.ctaLabel && (
          <motion.span whileHover={{ scale: 1.05 }} className="text-xs tracking-[0.2em] uppercase px-6 py-2 font-light cursor-pointer" style={{ background: gold, color: bg }}>
            {props.ctaLabel}
          </motion.span>
        )}
      </div>
      <div className="md:hidden flex items-center justify-end px-6 py-2">
        <button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={gold} />
    </nav>
  );
}

// ---------- NAVBAR 15: ROUNDED CARD ----------
export function Navbar15({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <div className={`px-6 pt-4 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: "transparent" }}>
      <nav
        className="flex items-center justify-between px-6 py-4 rounded-2xl transition-shadow duration-300"
        style={{
          background: bg,
          border: `1px solid ${ink}12`,
          boxShadow: scrolled && props.sticky ? `0 8px 32px -12px ${ink}30` : `0 2px 16px -6px ${ink}15`,
        }}
      >
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold" style={{ color: ink }} />
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: `${ink}65` }}>
          {props.links.map((l, i) => (
            <motion.span key={i} whileHover={{ color: ink, y: -1 }} className="cursor-pointer transition-colors duration-200">
              {l.label}
            </motion.span>
          ))}
        </div>
        {props.ctaLabel && (
          <motion.span whileHover={{ scale: 1.05 }} className="hidden md:inline-flex rounded-xl px-5 py-2 text-sm font-semibold cursor-pointer" style={{ background: accent, color: bg }}>
            {props.ctaLabel}
          </motion.span>
        )}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-xl" style={{ color: ink, background: `${ink}06` }}>
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </div>
  );
}

// ---------- NAVBAR 16: TWO-ROW ----------
export function Navbar16({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex flex-col transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `1px solid ${ink}15`, boxShadow: scrolled && props.sticky ? `0 4px 20px -8px ${ink}30` : "none" }}
    >
      <div className="flex items-center justify-between px-8 md:px-16 py-3 border-b" style={{ borderColor: `${ink}10` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold" style={{ color: ink }} />
        <div className="hidden md:flex items-center gap-3">
          {["●", "●", "●"].map((d, i) => (
            <span key={i} className="text-xs cursor-pointer" style={{ color: `${ink}30` }}>{d}</span>
          ))}
          {props.ctaLabel && (
            <span className="ml-2 text-xs font-semibold px-3 py-1 rounded-full cursor-pointer" style={{ background: accent, color: bg }}>
              {props.ctaLabel}
            </span>
          )}
        </div>
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <div className="hidden md:flex items-center justify-center gap-10 px-8 md:px-16 py-2">
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: accent }} className="text-sm font-medium cursor-pointer transition-colors duration-200" style={{ color: `${ink}65` }}>
            {l.label}
          </motion.span>
        ))}
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 17: SIDEBAR NAVIGATION ----------
export function Navbar17({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile top bar */}
      <nav className={`flex items-center justify-between px-6 py-4 md:hidden ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `1px solid ${ink}12` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold" style={{ color: ink }} />
        <button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      {/* Desktop left sidebar */}
      <aside className={`hidden md:flex flex-col w-56 min-h-screen px-6 py-8 border-r ${props.sticky ? "fixed top-0 left-0 z-20 h-screen" : ""}`} style={{ background: bg, borderColor: `${ink}12` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold mb-8" style={{ color: ink }} />
        <div className="flex flex-col gap-1">
          {props.links.map((l, i) => (
            <motion.span key={i} whileHover={{ x: 4, color: accent }} className="text-sm px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200" style={{ color: `${ink}70` }}>
              {l.label}
            </motion.span>
          ))}
        </div>
        {props.ctaLabel && (
          <motion.span whileHover={{ scale: 1.02 }} className="mt-auto rounded-lg px-4 py-2.5 text-sm font-semibold text-center cursor-pointer" style={{ background: accent, color: bg }}>
            {props.ctaLabel}
          </motion.span>
        )}
      </aside>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </>
  );
}

// ---------- NAVBAR 18: TAB STYLE ----------
export function Navbar18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <nav
      className={`flex items-end justify-between px-8 md:px-16 pt-4 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `2px solid ${ink}15`, boxShadow: scrolled && props.sticky ? `0 4px 16px -8px ${ink}25` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold pb-4 pr-8" style={{ color: ink }} />
      <div className="hidden md:flex items-end gap-0">
        {props.links.map((l, i) => (
          <motion.span
            key={i}
            onClick={() => setActive(i)}
            className="relative px-5 py-3 text-sm cursor-pointer border-t border-l border-r rounded-t-lg transition-colors duration-200"
            style={{
              color: active === i ? ink : `${ink}55`,
              background: active === i ? bg : `${ink}05`,
              borderColor: active === i ? `${ink}20` : "transparent",
              marginBottom: active === i ? "-2px" : "0",
            }}
          >
            {l.label}
          </motion.span>
        ))}
      </div>
      <div className="flex items-center gap-3 pb-3">
        {props.ctaLabel && (
          <span className="hidden md:inline-flex text-sm font-semibold px-4 py-1.5 rounded-full cursor-pointer" style={{ background: accent, color: bg }}>
            {props.ctaLabel}
          </span>
        )}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center mb-1" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 19: DOT ACCENT ----------
export function Navbar19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-5 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `1px solid ${ink}10`, boxShadow: scrolled && props.sticky ? `0 4px 16px -8px ${ink}25` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-8 text-sm">
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover="hovered" className="flex items-center gap-2 cursor-pointer group" style={{ color: `${ink}65` }}>
            <motion.span
              variants={{ hovered: { background: accent, scale: 1.3 } }}
              className="inline-block w-1.5 h-1.5 rounded-full transition-colors duration-200"
              style={{ background: `${ink}30` }}
            />
            <motion.span variants={{ hovered: { color: ink } }} className="transition-colors duration-200">
              {l.label}
            </motion.span>
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <span className="hidden md:inline-flex text-sm font-medium px-5 py-2 rounded-full cursor-pointer" style={{ background: `${accent}18`, color: accent }}>
          {props.ctaLabel}
        </span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 20: NEON DARK ----------
export function Navbar20({ props, theme, onChange }: Props) {
  const { bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const neonColor = accent;
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-5 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{
        background: "#0a0a0f",
        borderBottom: `1px solid ${neonColor}30`,
        boxShadow: scrolled && props.sticky ? `0 4px 24px -8px ${neonColor}30` : "none",
      }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold" style={{ color: "#ffffff", textShadow: `0 0 20px ${neonColor}80` }} />
      <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#ffffff80" }}>
        {props.links.map((l, i) => (
          <motion.span
            key={i}
            whileHover={{ color: neonColor, textShadow: `0 0 12px ${neonColor}` }}
            className="cursor-pointer transition-all duration-200"
          >
            {l.label}
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <motion.span
          whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${neonColor}60` }}
          className="hidden md:inline-flex text-sm font-semibold px-5 py-2 rounded-full cursor-pointer border"
          style={{ borderColor: neonColor, color: neonColor, boxShadow: `0 0 10px ${neonColor}30` }}
        >
          {props.ctaLabel}
        </motion.span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: neonColor }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink="#ffffff" bg="#0a0a0f" accent={neonColor} />
    </nav>
  );
}

// ---------- NAVBAR 21: CORPORATE ----------
export function Navbar21({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-20 py-4 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `2px solid ${ink}15`, boxShadow: scrolled && props.sticky ? `0 4px 16px -8px ${ink}20` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-sans text-base font-bold uppercase tracking-widest" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-8 text-sm tracking-wide font-medium" style={{ color: `${ink}65` }}>
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: ink }} className="cursor-pointer transition-colors duration-200 py-1 border-b-2 border-transparent hover:border-current">
            {l.label}
          </motion.span>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {props.ctaLabel && (
          <span className="hidden md:inline-flex text-xs font-bold uppercase tracking-widest px-5 py-2.5 cursor-pointer" style={{ background: accent, color: bg }}>
            {props.ctaLabel}
          </span>
        )}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 22: BREADCRUMB STYLE ----------
export function Navbar22({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-4 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `1px solid ${ink}12`, boxShadow: scrolled && props.sticky ? `0 4px 16px -8px ${ink}25` : "none" }}
    >
      <div className="hidden md:flex items-center gap-0 text-sm">
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-sm font-bold" style={{ color: ink }} />
        {props.links.map((l, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-3 text-xs" style={{ color: `${ink}30` }}>/</span>
            <motion.span whileHover={{ color: accent }} className="cursor-pointer transition-colors duration-200" style={{ color: `${ink}65` }}>
              {l.label}
            </motion.span>
          </span>
        ))}
      </div>
      <div className="md:hidden">
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-sm font-bold" style={{ color: ink }} />
      </div>
      <div className="flex items-center gap-3">
        {props.ctaLabel && (
          <span className="hidden md:inline-flex text-sm font-medium px-4 py-1.5 rounded cursor-pointer" style={{ background: accent, color: bg }}>
            {props.ctaLabel}
          </span>
        )}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 23: VERTICAL SIDE ----------
export function Navbar23({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile top bar */}
      <nav className={`flex md:hidden items-center justify-between px-6 py-4 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `1px solid ${ink}12` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold" style={{ color: ink }} />
        <button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center" style={{ color: ink }}>
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      {/* Desktop left vertical strip */}
      <aside className={`hidden md:flex flex-col items-center w-14 border-r py-8 gap-8 ${props.sticky ? "fixed top-0 left-0 z-20 h-screen" : ""}`} style={{ background: bg, borderColor: `${ink}12` }}>
        <div className="text-xs font-bold uppercase tracking-widest" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", color: ink }}>
          <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="text-xs font-bold uppercase tracking-widest" style={{ color: ink, writingMode: "vertical-lr" }} />
        </div>
        <div className="flex flex-col items-center gap-6 flex-1">
          {props.links.map((l, i) => (
            <motion.span
              key={i}
              whileHover={{ color: accent, scale: 1.1 }}
              className="text-xs uppercase tracking-widest cursor-pointer transition-colors duration-200"
              style={{ writingMode: "vertical-lr", transform: "rotate(180deg)", color: `${ink}50` }}
            >
              {l.label}
            </motion.span>
          ))}
        </div>
        {props.ctaLabel && (
          <span className="text-xs font-bold uppercase px-2 py-4 text-center rounded cursor-pointer" style={{ background: accent, color: bg, writingMode: "vertical-lr", transform: "rotate(180deg)" }}>
            {props.ctaLabel}
          </span>
        )}
      </aside>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </>
  );
}

// ---------- NAVBAR 24: BADGE COUNTS ----------
export function Navbar24({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const badges = [3, 12, 0, 5, 1];
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-4 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `1px solid ${ink}12`, boxShadow: scrolled && props.sticky ? `0 4px 16px -8px ${ink}25` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-6 text-sm">
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ y: -1 }} className="relative flex items-center gap-1.5 cursor-pointer" style={{ color: `${ink}65` }}>
            {l.label}
            {badges[i % badges.length] > 0 && (
              <span className="inline-flex items-center justify-center w-4 h-4 text-xs font-bold rounded-full leading-none" style={{ background: accent, color: bg }}>
                {badges[i % badges.length]}
              </span>
            )}
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <span className="hidden md:inline-flex text-sm font-semibold px-5 py-2 rounded-full cursor-pointer" style={{ background: accent, color: bg }}>
          {props.ctaLabel}
        </span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 25: ICON + TEXT ----------
export function Navbar25({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-4 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `1px solid ${ink}12`, boxShadow: scrolled && props.sticky ? `0 4px 16px -8px ${ink}25` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-6 text-sm">
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: accent, y: -1 }} className="flex flex-col items-center gap-1 cursor-pointer transition-colors duration-200" style={{ color: `${ink}65` }}>
            <span className="w-5 h-5 rounded-full border flex items-center justify-center" style={{ borderColor: `${ink}30` }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: `${ink}50` }} />
            </span>
            <span className="text-xs">{l.label}</span>
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <span className="hidden md:inline-flex text-sm font-semibold px-5 py-2 rounded-lg cursor-pointer" style={{ background: accent, color: bg }}>
          {props.ctaLabel}
        </span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 26: GLASSMORPHISM ----------
export function Navbar26({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <div className={`px-6 pt-4 ${props.sticky ? "sticky top-0 z-20" : ""}`}>
      <nav
        className="flex items-center justify-between px-6 py-4 rounded-2xl backdrop-blur-xl transition-all duration-300"
        style={{
          background: `${bg}80`,
          border: `1px solid ${ink}18`,
          boxShadow: scrolled ? `0 8px 32px -8px ${ink}20, inset 0 1px 0 ${bg}60` : `0 2px 12px -4px ${ink}10, inset 0 1px 0 ${bg}40`,
        }}
      >
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-semibold" style={{ color: ink }} />
        <div className="hidden md:flex items-center gap-7 text-sm" style={{ color: `${ink}65` }}>
          {props.links.map((l, i) => (
            <motion.span key={i} whileHover={{ color: ink }} className="cursor-pointer transition-colors duration-200">
              {l.label}
            </motion.span>
          ))}
        </div>
        {props.ctaLabel && (
          <motion.span
            whileHover={{ scale: 1.04 }}
            className="hidden md:inline-flex rounded-xl px-5 py-2 text-sm font-semibold cursor-pointer backdrop-blur-md"
            style={{ background: `${accent}30`, color: accent, border: `1px solid ${accent}50` }}
          >
            {props.ctaLabel}
          </motion.span>
        )}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-xl" style={{ color: ink, background: `${ink}08` }}>
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </div>
  );
}

// ---------- NAVBAR 27: SERIF EDITORIAL ----------
export function Navbar27({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-5 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, borderBottom: `1px solid ${ink}15`, boxShadow: scrolled && props.sticky ? `0 4px 20px -10px ${ink}25` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-serif text-2xl font-normal italic" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: `${ink}55` }}>
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: ink, letterSpacing: "0.22em" }} className="cursor-pointer transition-all duration-300">
            {l.label}
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <span className="hidden md:inline-flex font-serif italic text-sm px-5 py-2 rounded-full cursor-pointer border" style={{ borderColor: accent, color: accent }}>
          {props.ctaLabel}
        </span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center" style={{ color: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 28: BRUTALIST ----------
export function Navbar28({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`flex items-center justify-between px-8 md:px-16 py-4 transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: bg, border: `2px solid ${ink}`, boxShadow: scrolled && props.sticky ? `4px 4px 0 ${ink}` : "none" }}
    >
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-sans text-lg font-black uppercase tracking-tight" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-0 text-sm font-bold uppercase">
        {props.links.map((l, i) => (
          <motion.span
            key={i}
            whileHover={{ background: ink, color: bg }}
            className="px-4 py-3 cursor-pointer transition-colors duration-150 border-l"
            style={{ color: ink, borderColor: `${ink}40` }}
          >
            {l.label}
          </motion.span>
        ))}
        {props.ctaLabel && (
          <motion.span
            whileHover={{ background: accent, color: bg }}
            className="px-5 py-3 cursor-pointer transition-colors duration-150 font-black border-l-2"
            style={{ color: accent, borderColor: accent, background: `${accent}15` }}
          >
            {props.ctaLabel}
          </motion.span>
        )}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center border-2" style={{ color: ink, borderColor: ink }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 29: SPORTS / ATHLETIC ----------
export function Navbar29({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav
      className={`relative flex items-center justify-between px-8 md:px-16 py-5 overflow-hidden transition-shadow duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`}
      style={{ background: ink, boxShadow: scrolled && props.sticky ? `0 6px 24px -8px ${ink}60` : "none" }}
    >
      {/* Angled accent background stripe */}
      <div className="absolute inset-y-0 left-0 w-1/3 opacity-20" style={{ background: accent, clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)" }} />
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="relative font-sans text-xl font-black uppercase tracking-tight" style={{ color: bg }} />
      <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider relative">
        {props.links.map((l, i) => (
          <motion.span key={i} whileHover={{ color: accent, y: -2 }} className="cursor-pointer transition-colors duration-150" style={{ color: `${bg}80` }}>
            {l.label}
          </motion.span>
        ))}
      </div>
      {props.ctaLabel && (
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="hidden md:inline-flex relative text-xs font-black uppercase tracking-widest px-6 py-3 cursor-pointer"
          style={{ background: accent, color: bg, clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)" }}
        >
          {props.ctaLabel}
        </motion.span>
      )}
      <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center relative" style={{ color: bg }}>
        <Menu className="h-5 w-5" />
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={bg} bg={ink} accent={accent} />
    </nav>
  );
}

// ---------- NAVBAR 30: NATURE / SOFT ----------
export function Navbar30({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const softGreen = "#6b8f6a";
  const warmBg = "#faf8f5";
  return (
    <div className={`px-6 py-3 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: warmBg }}>
      <nav
        className="flex items-center justify-between px-6 py-3 rounded-full transition-shadow duration-300"
        style={{
          background: bg,
          border: `1px solid ${softGreen}25`,
          boxShadow: scrolled && props.sticky ? `0 4px 20px -6px ${softGreen}30` : `0 2px 12px -4px ${softGreen}15`,
        }}
      >
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-semibold" style={{ color: ink }} />
        <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: `${ink}65` }}>
          {props.links.map((l, i) => (
            <motion.span
              key={i}
              whileHover={{ color: softGreen, y: -1 }}
              className="cursor-pointer transition-colors duration-200"
            >
              {l.label}
            </motion.span>
          ))}
        </div>
        {props.ctaLabel && (
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="hidden md:inline-flex text-sm font-medium px-5 py-2 rounded-full cursor-pointer"
            style={{ background: `${softGreen}18`, color: softGreen, border: `1px solid ${softGreen}30` }}
          >
            {props.ctaLabel}
          </motion.span>
        )}
        <button onClick={() => setOpen(true)} className="md:hidden grid h-9 w-9 place-items-center rounded-full" style={{ color: ink, background: `${softGreen}10` }}>
          <Menu className="h-5 w-5" />
        </button>
      </nav>
      <MobileDrawer open={open} onClose={() => setOpen(false)} links={props.links} ctaLabel={props.ctaLabel} ink={ink} bg={bg} accent={accent} />
    </div>
  );
}
