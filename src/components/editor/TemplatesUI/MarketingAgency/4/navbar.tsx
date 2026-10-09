// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shapes, Menu, X, Smile } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(-1);
  const links = props?.links || [
    { label: "Hello", href: "#home" },
    { label: "Studio", href: "#about" },
    { label: "Works", href: "#projects" },
    { label: "Love", href: "#testimonials" },
    { label: "Say hi", href: "#contact" },
  ];
  const setLabel = (i, v) => onChange?.({ links: links.map((l, j) => (j === i ? { ...l, label: v } : l)) });
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3" style={{ color: ink }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-[2rem] border p-2 pl-3 backdrop-blur-xl" style={{ background: surface, borderColor: surface }}>
        <a href="#home" className="flex items-center gap-2">
          <motion.span whileHover={{ rotate: 20, scale: 1.1 }} className="grid h-11 w-11 -rotate-6 place-items-center rounded-2xl" style={{ background: accent, color: bg }}><Shapes size={20} /></motion.span>
          <Editable as="span" className="text-xl font-black tracking-tight" value={props?.brand || "Blobby"} onChange={(v) => onChange?.({ brand: v })} />
          <span className="ml-1 hidden items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold lg:flex" style={{ background: surface }}>
            <Smile size={13} style={{ color: accent }} />
            <Editable as="span" value={props?.status || "Free for new gigs"} onChange={(v) => onChange?.({ status: v })} />
          </span>
        </a>
        <nav className="hidden items-center md:flex" onMouseLeave={() => setHover(-1)}>
          {links.map((l, i) => (
            <a key={i} href={l.href} onMouseEnter={() => setHover(i)} className="relative rounded-full px-4 py-2.5 text-sm font-bold">
              {hover === i && <motion.span layoutId="bubble" className="absolute inset-0 rounded-full" style={{ background: surface }} />}
              <span className="relative"><Editable as="span" value={l.label} onChange={(v) => setLabel(i, v)} /></span>
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden rounded-full px-6 py-3 text-sm font-black transition hover:scale-[1.02] active:scale-95 md:block" style={{ background: accent, color: bg }}>
          <Editable as="span" value={props?.cta || "Start a project"} onChange={(v) => onChange?.({ cta: v })} />
        </a>
        <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-2xl md:hidden" style={{ background: accent, color: bg }} aria-label="menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.9, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="mx-auto mt-2 grid max-w-6xl grid-cols-2 gap-2 rounded-[2rem] border p-3 md:hidden" style={{ background: bg, borderColor: surface, color: ink }}>
            {links.map((l, i) => (
              <a key={i} href={l.href} onClick={() => setOpen(false)} className={`rounded-3xl p-5 text-xl font-black ${i === 0 ? "col-span-2" : ""}`} style={{ background: i % 3 === 0 ? accent : surface, color: i % 3 === 0 ? bg : ink }}>
                <Editable as="span" value={l.label} onChange={(v) => setLabel(i, v)} />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
