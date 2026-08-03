import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { NavbarProps } from "@/types/builder.schema";

type Props = BlockComponentProps<NavbarProps>;

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

function updateLink(links: NavbarProps["links"], onChange: Props["onChange"], i: number, label: string) {
  const next = [...links];
  next[i] = { ...next[i], label };
  onChange({ links: next });
}

/* ─── RIGHT SLIDE DRAWER ─── */
function RightDrawer({ open, onClose, props, theme, onChange }: { open: boolean; onClose: () => void; props: NavbarProps; theme: any; onChange: Props["onChange"] }) {
  const { ink, bg, accent } = theme;
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 md:hidden" style={{ background: "rgba(0,0,0,0.4)" }} />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] flex flex-col p-8 md:hidden" style={{ background: bg }}>
            <button onClick={onClose} className="self-end h-9 w-9 rounded-full grid place-items-center" style={{ background: `${ink}0d`, color: ink }}><X className="h-4 w-4" /></button>
            <nav className="mt-8 flex flex-col gap-1">
              {props.links.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }} whileHover={{ x: 6 }} className="flex items-center gap-3 py-3 px-3 rounded-xl text-base font-medium cursor-pointer" style={{ color: ink }}>
                  <span className="h-1 w-1 rounded-full shrink-0" style={{ background: accent }} />
                  <Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" />
                </motion.div>
              ))}
            </nav>
            {props.ctaLabel && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-auto rounded-2xl px-5 py-3 text-sm font-semibold text-center cursor-pointer" style={{ background: accent, color: bg }}>
                <Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" />
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── LEFT SLIDE DRAWER ─── */
function LeftDrawer({ open, onClose, props, theme, onChange }: { open: boolean; onClose: () => void; props: NavbarProps; theme: any; onChange: Props["onChange"] }) {
  const { ink, bg, accent } = theme;
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-40 md:hidden" style={{ background: "rgba(0,0,0,0.4)" }} />
          <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] flex flex-col p-8 md:hidden" style={{ background: bg }}>
            <button onClick={onClose} className="self-start h-9 w-9 rounded-full grid place-items-center" style={{ background: `${ink}0d`, color: ink }}><X className="h-4 w-4" /></button>
            <nav className="mt-8 flex flex-col gap-1">
              {props.links.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }} className="py-3 px-3 text-base font-medium cursor-pointer" style={{ color: ink }}>
                  <Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" />
                </motion.div>
              ))}
            </nav>
            {props.ctaLabel && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-auto rounded-2xl px-5 py-3 text-sm font-semibold text-center" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── TOP SLIDE DOWN MENU ─── */
function TopMenu({ open, props, theme, onChange }: { open: boolean; props: NavbarProps; theme: any; onChange: Props["onChange"] }) {
  const { ink, bg, accent } = theme;
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="absolute left-0 right-0 top-full z-50 md:hidden px-6 pb-6 pt-4 shadow-xl" style={{ background: bg, borderBottom: `1px solid ${ink}12` }}>
          <nav className="flex flex-col gap-1">
            {props.links.map((l, i) => (
              <div key={i} className="py-3 border-b text-base font-medium cursor-pointer" style={{ color: ink, borderColor: `${ink}08` }}>
                <Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" />
              </div>
            ))}
          </nav>
          {props.ctaLabel && <div className="mt-4 rounded-xl px-4 py-3 text-sm font-semibold text-center" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></div>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── FULLSCREEN OVERLAY ─── */
function FullscreenMenu({ open, onClose, props, theme, onChange }: { open: boolean; onClose: () => void; props: NavbarProps; theme: any; onChange: Props["onChange"] }) {
  const { ink, bg, accent } = theme;
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-50 flex flex-col px-10 py-10 md:hidden" style={{ background: bg }}>
          <button onClick={onClose} className="self-end h-10 w-10 rounded-full grid place-items-center" style={{ background: `${ink}0d`, color: ink }}><X className="h-5 w-5" /></button>
          <nav className="flex-1 flex flex-col justify-center gap-2">
            {props.links.map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i + 0.1, ease: [0.22, 1, 0.36, 1] }} className="text-4xl font-display font-bold tracking-tight py-2 cursor-pointer" style={{ color: ink }}>
                <Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" />
              </motion.div>
            ))}
          </nav>
          {props.ctaLabel && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl px-6 py-3 text-base font-semibold text-center" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 1 — Classic minimal, clean, right drawer
════════════════════════════════════════════════════ */
export function Navbar1({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-300 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, boxShadow: scrolled && props.sticky ? `0 2px 20px ${ink}12` : "none", borderBottom: `1px solid ${ink}10` }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold tracking-tight cursor-pointer" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-8">
        {props.links.map((l, i) => (
          <motion.div key={i} whileHover={{ y: -1 }} className="relative group text-sm font-medium cursor-pointer" style={{ color: `${ink}80` }}>
            <Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" />
            <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ background: accent }} />
          </motion.div>
        ))}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden h-9 w-9 rounded-full grid place-items-center" style={{ background: `${ink}0d`, color: ink }}><Menu className="h-4 w-4" /></button>
      <RightDrawer open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 2 — Centered logo, links both sides, right drawer
════════════════════════════════════════════════════ */
export function Navbar2({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const half = Math.ceil(props.links.length / 2);
  const left = props.links.slice(0, half);
  const right = props.links.slice(half);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-5 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `1px solid ${scrolled ? ink + "18" : "transparent"}`, transition: "border-color 0.3s" }}>
      <div className="hidden md:flex items-center gap-8">
        {left.map((l, i) => <motion.div key={i} whileHover={{ color: accent }} className="text-sm font-medium cursor-pointer transition-colors" style={{ color: `${ink}70` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
      </div>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold mx-auto md:mx-0 cursor-pointer" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-8">
        {right.map((l, i) => <motion.div key={i} whileHover={{ color: accent }} className="text-sm font-medium cursor-pointer transition-colors" style={{ color: `${ink}70` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, half + i, v)} className="inline" /></motion.div>)}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-4 py-1.5 rounded-full border text-sm font-medium cursor-pointer" style={{ borderColor: ink, color: ink }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden h-9 w-9 rounded-full grid place-items-center" style={{ background: `${ink}0d`, color: ink }}><Menu className="h-4 w-4" /></button>
      <RightDrawer open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 3 — Bold accent pill logo, top dropdown mobile
════════════════════════════════════════════════════ */
export function Navbar3({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-6 md:px-14 py-4 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `1px solid ${ink}10` }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold px-4 py-1.5 rounded-full cursor-pointer" style={{ background: `${accent}18`, color: accent }} />
      <div className="hidden md:flex items-center gap-6">
        {props.links.map((l, i) => <motion.div key={i} whileHover={{ backgroundColor: `${ink}06` }} className="text-sm px-3 py-1.5 rounded-lg font-medium cursor-pointer" style={{ color: ink }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-5 py-2 rounded-full text-sm font-bold cursor-pointer" style={{ background: ink, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(o => !o)} className="md:hidden h-9 w-9 rounded-full grid place-items-center" style={{ background: `${ink}0d`, color: ink }}>
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      <TopMenu open={open} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 4 — Transparent sticky with blur, right drawer
════════════════════════════════════════════════════ */
export function Navbar4({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled(20);
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-500 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: scrolled ? `${bg}ee` : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: `1px solid ${scrolled ? ink + "12" : "transparent"}` }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold cursor-pointer" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-8">
        {props.links.map((l, i) => <motion.div key={i} whileHover={{ y: -2 }} className="text-sm font-medium cursor-pointer" style={{ color: `${ink}75` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer border" style={{ borderColor: accent, color: accent }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden h-9 w-9 rounded-full grid place-items-center" style={{ background: `${ink}0d`, color: ink }}><Menu className="h-4 w-4" /></button>
      <RightDrawer open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 5 — Thick bottom border, fullscreen overlay
════════════════════════════════════════════════════ */
export function Navbar5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-6 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `3px solid ${ink}` }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-2xl font-black tracking-tight cursor-pointer uppercase" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-10">
        {props.links.map((l, i) => <motion.div key={i} whileHover={{ backgroundColor: ink, color: bg }} className="text-sm font-semibold px-3 py-1 cursor-pointer transition-colors" style={{ color: ink }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-6 py-2 text-sm font-black uppercase cursor-pointer" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden" style={{ color: ink }}><Menu className="h-6 w-6" /></button>
      <FullscreenMenu open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 6 — Dark inverted, logo right, left drawer
════════════════════════════════════════════════════ */
export function Navbar6({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-5 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: ink }}>
      <button onClick={() => setOpen(true)} className="md:hidden h-9 w-9 rounded-full grid place-items-center" style={{ background: `${bg}15`, color: bg }}><Menu className="h-4 w-4" /></button>
      <div className="hidden md:flex items-center gap-8">
        {props.links.map((l, i) => <motion.div key={i} whileHover={{ color: accent }} className="text-sm font-medium cursor-pointer transition-colors" style={{ color: `${bg}70` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
      </div>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold cursor-pointer" style={{ color: bg }} />
      {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold cursor-pointer" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      <LeftDrawer open={open} onClose={() => setOpen(false)} props={props} theme={{ ...theme, bg: ink, ink: bg }} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 7 — Pill capsule nav, top dropdown mobile
════════════════════════════════════════════════════ */
export function Navbar7({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative flex justify-center px-8 pt-4 pb-2 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: `${bg}cc`, backdropFilter: "blur(12px)" }}>
      <nav className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm" style={{ background: bg, border: `1px solid ${ink}12` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-base font-bold mr-2 cursor-pointer" style={{ color: ink }} />
        <div className="hidden md:flex items-center gap-1">
          {props.links.map((l, i) => <motion.div key={i} whileHover={{ backgroundColor: `${ink}08` }} className="text-sm px-3 py-1.5 rounded-full font-medium cursor-pointer" style={{ color: `${ink}80` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
        </div>
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.05 }} className="hidden md:block px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer ml-1" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
        <button onClick={() => setOpen(o => !o)} className="md:hidden h-8 w-8 rounded-full grid place-items-center" style={{ color: ink }}>
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>
      <TopMenu open={open} props={props} theme={theme} onChange={onChange} />
    </div>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 8 — Big serif wordmark, fullscreen overlay
════════════════════════════════════════════════════ */
export function Navbar8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-6 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-3xl md:text-4xl font-black tracking-tight cursor-pointer italic" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-10">
        {props.links.map((l, i) => (
          <motion.div key={i} whileHover={{ y: -2 }} className="relative group text-sm cursor-pointer font-medium" style={{ color: `${ink}70` }}>
            <Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" />
            <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300" style={{ background: accent }} />
          </motion.div>
        ))}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.03 }} className="px-6 py-2.5 rounded-full text-sm font-semibold cursor-pointer" style={{ background: ink, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <motion.button onClick={() => setOpen(true)} whileTap={{ scale: 0.9 }} className="md:hidden flex flex-col gap-1.5 cursor-pointer" style={{ color: ink }}>
        <span className="block h-0.5 w-6" style={{ background: ink }} />
        <span className="block h-0.5 w-4" style={{ background: ink }} />
        <span className="block h-0.5 w-6" style={{ background: ink }} />
      </motion.button>
      <FullscreenMenu open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 9 — Mono/terminal style, top dropdown
════════════════════════════════════════════════════ */
export function Navbar9({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center gap-4 px-8 md:px-16 py-4 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `1px solid ${ink}20`, fontFamily: "monospace" }}>
      <span style={{ color: accent }}>›</span>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="text-sm font-bold cursor-pointer" style={{ color: ink }} />
      <span className="hidden md:block text-xs" style={{ color: `${ink}40` }}>~</span>
      <div className="hidden md:flex items-center gap-6 ml-2">
        {props.links.map((l, i) => <motion.div key={i} whileHover={{ color: accent }} className="text-xs cursor-pointer transition-colors" style={{ color: `${ink}70` }}><span style={{ color: `${ink}40` }}>./</span><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
      </div>
      <div className="ml-auto flex items-center gap-3">
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="hidden md:block text-xs px-4 py-1.5 rounded cursor-pointer font-bold" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
        <button onClick={() => setOpen(o => !o)} className="md:hidden" style={{ color: ink }}>
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      <TopMenu open={open} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 10 — Split line design, top dropdown
════════════════════════════════════════════════════ */
export function Navbar10({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg }}>
      <div className="flex items-center justify-between px-8 md:px-16 py-3" style={{ borderBottom: `1px solid ${ink}12` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-black cursor-pointer" style={{ color: ink }} />
        <div className="hidden md:flex items-center gap-8">
          {props.links.map((l, i) => <motion.div key={i} whileHover={{ backgroundColor: `${accent}15` }} className="text-sm font-medium px-3 py-1 rounded cursor-pointer" style={{ color: `${ink}80` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
          {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
        </div>
        <button onClick={() => setOpen(o => !o)} className="md:hidden h-9 w-9 grid place-items-center" style={{ color: ink }}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <TopMenu open={open} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 11 — Accent background bar, right drawer
════════════════════════════════════════════════════ */
export function Navbar11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-5 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: accent }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold cursor-pointer" style={{ color: bg }} />
      <div className="hidden md:flex items-center gap-8">
        {props.links.map((l, i) => <motion.div key={i} whileHover={{ opacity: 1 }} className="text-sm font-medium cursor-pointer" style={{ color: `${bg}90` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer" style={{ background: bg, color: accent }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden h-9 w-9 rounded-full grid place-items-center" style={{ background: `${bg}20`, color: bg }}><Menu className="h-4 w-4" /></button>
      <RightDrawer open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 12 — Dotted/editorial with number count, left drawer
════════════════════════════════════════════════════ */
export function Navbar12({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-5 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `1px solid ${ink}10` }}>
      <button onClick={() => setOpen(true)} className="md:hidden flex flex-col gap-1 cursor-pointer">
        <span className="block h-px w-6" style={{ background: ink }} />
        <span className="block h-px w-4" style={{ background: ink }} />
      </button>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono" style={{ color: accent }}>01</span>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold cursor-pointer" style={{ color: ink }} />
      </div>
      <div className="hidden md:flex items-center gap-8">
        {props.links.map((l, i) => (
          <motion.div key={i} whileHover={{ y: -2 }} className="flex items-center gap-1.5 text-sm cursor-pointer" style={{ color: `${ink}70` }}>
            <span className="text-[9px] font-mono" style={{ color: accent }}>0{i + 2}</span>
            <Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" />
          </motion.div>
        ))}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer border" style={{ borderColor: ink, color: ink }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <LeftDrawer open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 13 — Soft rounded card style, top dropdown
════════════════════════════════════════════════════ */
export function Navbar13({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <div className={`relative px-6 pt-4 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg }}>
      <nav className="flex items-center justify-between px-6 py-3 rounded-2xl" style={{ background: `${ink}06`, border: `1px solid ${ink}0d` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-base font-bold cursor-pointer" style={{ color: ink }} />
        <div className="hidden md:flex items-center gap-2">
          {props.links.map((l, i) => <motion.div key={i} whileHover={{ backgroundColor: bg }} className="text-sm px-4 py-2 rounded-xl font-medium cursor-pointer transition-colors" style={{ color: `${ink}80` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
          {props.ctaLabel && <motion.div whileHover={{ scale: 1.05 }} className="px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
        </div>
        <button onClick={() => setOpen(o => !o)} className="md:hidden h-8 w-8 rounded-xl grid place-items-center" style={{ color: ink, background: bg }}>
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>
      <TopMenu open={open} props={props} theme={theme} onChange={onChange} />
    </div>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 14 — Underline tabs style, right drawer
════════════════════════════════════════════════════ */
export function Navbar14({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-end justify-between px-8 md:px-16 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `2px solid ${ink}10` }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold pb-4 cursor-pointer" style={{ color: ink }} />
      <div className="hidden md:flex items-end gap-0">
        {props.links.map((l, i) => (
          <motion.div key={i} whileHover={{ borderBottomColor: accent }} className="text-sm font-medium px-5 pb-4 cursor-pointer border-b-2 transition-colors" style={{ color: `${ink}75`, borderColor: "transparent" }}>
            <Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" />
          </motion.div>
        ))}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="mb-3 ml-4 px-5 py-2 rounded-full text-sm font-semibold cursor-pointer" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden pb-4" style={{ color: ink }}><Menu className="h-5 w-5" /></button>
      <RightDrawer open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 15 — Two-tone split bar, fullscreen overlay
════════════════════════════════════════════════════ */
export function Navbar15({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ height: 60 }}>
      <div className="flex items-center px-8 md:px-12 shrink-0" style={{ background: ink, minWidth: 200 }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-base font-bold cursor-pointer" style={{ color: bg }} />
      </div>
      <div className="flex-1 flex items-center justify-end px-8 md:px-12 gap-8" style={{ background: bg, borderBottom: `1px solid ${ink}10` }}>
        <div className="hidden md:flex items-center gap-8">
          {props.links.map((l, i) => <motion.div key={i} whileHover={{ color: accent }} className="text-sm font-medium cursor-pointer transition-colors" style={{ color: `${ink}70` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
          {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer" style={{ background: ink, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
        </div>
        <button onClick={() => setOpen(true)} className="md:hidden" style={{ color: ink }}><Menu className="h-5 w-5" /></button>
      </div>
      <FullscreenMenu open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 16 — Sticky floating bottom-of-screen (mobile: right drawer)
════════════════════════════════════════════════════ */
export function Navbar16({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:flex items-center justify-between px-16 py-5" style={{ background: bg, borderBottom: `1px solid ${ink}10` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold cursor-pointer" style={{ color: ink }} />
        <div className="flex items-center gap-8">
          {props.links.map((l, i) => <motion.div key={i} whileHover={{ y: -1, color: accent }} className="text-sm font-medium cursor-pointer transition-colors" style={{ color: `${ink}70` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
          {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
        </div>
      </nav>
      {/* Mobile top bar */}
      <nav className="relative md:hidden flex items-center justify-between px-6 py-4" style={{ background: bg, borderBottom: `1px solid ${ink}10` }}>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold cursor-pointer" style={{ color: ink }} />
        <button onClick={() => setOpen(true)} className="h-9 w-9 rounded-full grid place-items-center" style={{ background: `${ink}0d`, color: ink }}><Menu className="h-4 w-4" /></button>
        <RightDrawer open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
      </nav>
    </>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 17 — Diagonal accent badge, top dropdown
════════════════════════════════════════════════════ */
export function Navbar17({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-4 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg }}>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center rotate-3" style={{ background: accent }}>
          <span className="font-display text-sm font-black" style={{ color: bg }}>{props.logoText?.[0] ?? "A"}</span>
        </div>
        <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-lg font-bold cursor-pointer" style={{ color: ink }} />
      </div>
      <div className="hidden md:flex items-center gap-8">
        {props.links.map((l, i) => <motion.div key={i} whileHover={{ color: accent }} className="text-sm font-medium cursor-pointer transition-colors" style={{ color: `${ink}70` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(o => !o)} className="md:hidden h-9 w-9 rounded-xl grid place-items-center" style={{ background: `${ink}0d`, color: ink }}>
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      <TopMenu open={open} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 18 — Dot separator links, fullscreen overlay
════════════════════════════════════════════════════ */
export function Navbar18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-5 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `1px solid ${ink}08` }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-bold cursor-pointer" style={{ color: ink }} />
      <div className="hidden md:flex items-center">
        {props.links.map((l, i) => (
          <div key={i} className="flex items-center">
            {i > 0 && <span className="mx-4 h-1 w-1 rounded-full" style={{ background: `${ink}30` }} />}
            <motion.div whileHover={{ color: accent }} className="text-sm font-medium cursor-pointer transition-colors" style={{ color: `${ink}75` }}>
              <Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" />
            </motion.div>
          </div>
        ))}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="ml-8 px-5 py-2 rounded-full text-sm font-semibold cursor-pointer border" style={{ borderColor: `${ink}30`, color: ink }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden flex flex-col gap-1.5" style={{ color: ink }}>
        <span className="h-0.5 w-6 block" style={{ background: ink }} />
        <span className="h-0.5 w-6 block" style={{ background: ink }} />
      </button>
      <FullscreenMenu open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 19 — Minimal icons row, right drawer
════════════════════════════════════════════════════ */
export function Navbar19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-8 md:px-16 py-4 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: ink }}>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="font-display text-xl font-black cursor-pointer" style={{ color: "transparent", WebkitTextStroke: `1px ${bg}` }} />
      <div className="hidden md:flex items-center gap-8">
        {props.links.map((l, i) => <motion.div key={i} whileHover={{ color: accent }} className="text-sm font-medium cursor-pointer transition-colors" style={{ color: `${bg}70` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-5 py-2 rounded-full text-sm font-semibold cursor-pointer" style={{ background: bg, color: ink }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <button onClick={() => setOpen(true)} className="md:hidden h-9 w-9 rounded-full grid place-items-center" style={{ background: `${bg}15`, color: bg }}><Menu className="h-4 w-4" /></button>
      <RightDrawer open={open} onClose={() => setOpen(false)} props={props} theme={{ ...theme, bg: ink, ink: bg }} onChange={onChange} />
    </nav>
  );
}

/* ════════════════════════════════════════════════════
   NAVBAR 20 — Ultra compact strip, left drawer
════════════════════════════════════════════════════ */
export function Navbar20({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);
  return (
    <nav className={`relative flex items-center justify-between px-6 md:px-14 py-3 ${props.sticky ? "sticky top-0 z-20" : ""}`} style={{ background: bg, borderBottom: `1px solid ${ink}10` }}>
      <button onClick={() => setOpen(true)} className="md:hidden" style={{ color: ink }}><Menu className="h-4 w-4" /></button>
      <Editable value={props.logoText} onChange={(v) => onChange({ logoText: v })} className="text-sm font-bold cursor-pointer tracking-wide uppercase" style={{ color: ink }} />
      <div className="hidden md:flex items-center gap-6">
        {props.links.map((l, i) => <motion.div key={i} whileHover={{ color: accent }} className="text-xs font-medium uppercase tracking-wider cursor-pointer transition-colors" style={{ color: `${ink}60` }}><Editable value={l.label} onChange={(v) => updateLink(props.links, onChange, i, v)} className="inline" /></motion.div>)}
        {props.ctaLabel && <motion.div whileHover={{ scale: 1.04 }} className="px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider cursor-pointer" style={{ background: accent, color: bg }}><Editable value={props.ctaLabel} onChange={(v) => onChange({ ctaLabel: v })} className="inline" /></motion.div>}
      </div>
      <LeftDrawer open={open} onClose={() => setOpen(false)} props={props} theme={theme} onChange={onChange} />
    </nav>
  );
}
