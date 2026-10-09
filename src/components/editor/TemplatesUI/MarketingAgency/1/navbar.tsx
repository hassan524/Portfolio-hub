// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const [open, setOpen] = useState(false);
  const links = props?.links || [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Praise", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const setLabel = (i, v) => onChange?.({ links: links.map((l, j) => (j === i ? { ...l, label: v } : l)) });
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-xl" style={{ background: surface, borderColor: surface, color: ink }}>
          <a href="#home" className="flex items-center gap-2 pl-1">
            <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: accent, color: bg }}><Zap size={18} /></span>
            <Editable as="span" className="text-lg font-black tracking-tight" value={props?.brand || "Voltage"} onChange={(v) => onChange?.({ brand: v })} />
          </a>
          <span className="hidden items-center gap-2 rounded-full border px-3 py-1 text-xs lg:flex" style={{ borderColor: surface, color: inkSecond }}>
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />
            <Editable as="span" value={props?.status || "Taking projects for Q1"} onChange={(v) => onChange?.({ status: v })} />
          </span>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l, i) => (
              <a key={i} href={l.href} className="rounded-full px-4 py-2 text-sm transition hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
                <Editable as="span" value={l.label} onChange={(v) => setLabel(i, v)} />
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden items-center gap-1 rounded-full px-5 py-2.5 text-sm font-bold transition hover:scale-[1.02] active:scale-95 md:inline-flex" style={{ background: accent, color: bg }}>
            <Editable as="span" value={props?.cta || "Free consultation"} onChange={(v) => onChange?.({ cta: v })} /> <ArrowUpRight size={16} />
          </a>
          <button onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full transition active:scale-95 md:hidden" style={{ background: surface }} aria-label="menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2 rounded-3xl border p-3 backdrop-blur-xl md:hidden" style={{ background: bg, borderColor: surface, color: ink }}>
              {links.map((l, i) => (
                <a key={i} href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-bold" style={{ color: ink }}>
                  <Editable as="span" value={l.label} onChange={(v) => setLabel(i, v)} /> <ArrowUpRight size={18} style={{ color: accent }} />
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-2xl py-3 text-center font-bold" style={{ background: accent, color: bg }}>
                <Editable as="span" value={props?.cta || "Free consultation"} onChange={(v) => onChange?.({ cta: v })} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
