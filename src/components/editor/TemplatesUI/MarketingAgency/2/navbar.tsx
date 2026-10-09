// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hexagon, Plus, X } from "lucide-react";
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
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#projects" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const setLabel = (i, v) => onChange?.({ links: links.map((l, j) => (j === i ? { ...l, label: v } : l)) });
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl" style={{ background: surface, borderColor: surface, color: ink }}>
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-6 py-4 md:grid-cols-[1fr_auto_1fr]">
          <a href="#home" className="flex items-center gap-2">
            <Hexagon size={22} style={{ color: accent }} fill={accent} />
            <Editable as="span" className="text-lg font-semibold italic tracking-tight" value={props?.brand || "Lumora"} onChange={(v) => onChange?.({ brand: v })} />
            <span className="ml-2 hidden items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] lg:flex" style={{ borderColor: surface, color: inkSecond }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              <Editable as="span" value={props?.status || "Open for projects"} onChange={(v) => onChange?.({ status: v })} />
            </span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" onMouseLeave={() => setHover(-1)}>
            {links.map((l, i) => (
              <a key={i} href={l.href} onMouseEnter={() => setHover(i)} className="relative py-1 text-sm font-light" style={{ color: hover === i ? ink : inkSecond }}>
                <Editable as="span" value={l.label} onChange={(v) => setLabel(i, v)} />
                {hover === i && <motion.span layoutId="navline" className="absolute inset-x-0 -bottom-1 h-px" style={{ background: accent }} />}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-3">
            <a href="#contact" className="hidden items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition hover:scale-[1.02] active:scale-95 md:inline-flex" style={{ background: accent, borderColor: accent, color: bg }}>
              <Editable as="span" value={props?.cta || "Let's Connect"} onChange={(v) => onChange?.({ cta: v })} /> <Plus size={14} />
            </a>
            <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border md:hidden" style={{ background: surface, borderColor: surface }} aria-label="menu"><Plus size={18} /></button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "circle(0% at 90% 5%)" }} animate={{ clipPath: "circle(150% at 90% 5%)" }} exit={{ clipPath: "circle(0% at 90% 5%)" }} transition={{ duration: 0.6 }} className="fixed inset-0 z-[60] flex flex-col justify-center px-8 md:hidden" style={{ background: bg, color: ink }}>
            <button onClick={() => setOpen(false)} className="absolute right-6 top-5 grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: surface, background: surface }}><X size={18} /></button>
            {links.map((l, i) => (
              <a key={i} href={l.href} onClick={() => setOpen(false)} className="border-b py-4 text-5xl font-extralight italic" style={{ borderColor: surface }}>
                <Editable as="span" value={l.label} onChange={(v) => setLabel(i, v)} />
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-8 rounded-full py-4 text-center font-medium" style={{ background: accent, color: bg }}>
              <Editable as="span" value={props?.cta || "Let's Connect"} onChange={(v) => onChange?.({ cta: v })} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
