// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Menu, X, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#1A0103";
  const bgSecond = theme?.["bg-second"] || "#420205";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#F8D4D4";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#E50914";
  const [open, setOpen] = useState(false);
  const links = (props?.links && props.links.length > 0) ? props.links : [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#projects" },
    { label: "Case Study", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const setLabel = (i, v) => onChange?.({ links: links.map((l, j) => (j === i ? { ...l, label: v } : l)) });

  return (
    <header className="fixed inset-x-0 top-0 z-50" style={{ color: ink }}>
      <div className="flex items-center justify-between border-b px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.25em] md:px-8" style={{ background: "#0E0102", borderColor: "rgba(255,255,255,0.12)" }}>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />
          <Editable as="span" value={props?.status || "SPRING REIGN / BOOKING CAMPAIGNS"} onChange={(v) => onChange?.({ status: v })} />
        </div>
        <span className="hidden font-mono tracking-widest text-white/50 md:inline">NYC · LON · MANCHESTER</span>
      </div>

      <div className="border-b backdrop-blur-xl" style={{ background: "rgba(22, 1, 3, 0.85)", borderColor: "rgba(255,255,255,0.12)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded shadow-lg" style={{ background: accent, color: "#fff" }}>
              <Crown size={18} />
            </span>
            <Editable as="span" className="font-serif text-xl font-black uppercase tracking-tight text-white md:text-2xl" value={props?.brand || "Market Agency"} onChange={(v) => onChange?.({ brand: v })} />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l, i) => (
              <a key={i} href={l.href} className="group flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.2em] transition hover:text-red-500">
                <Editable as="span" value={l.label} onChange={(v) => setLabel(i, v)} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden items-center gap-2 rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-lg transition hover:scale-105 active:scale-95 md:inline-flex" style={{ background: accent }}>
              <Editable as="span" value={props?.cta || "Commission Us"} onChange={(v) => onChange?.({ cta: v })} />
              <ArrowRight size={14} />
            </a>
            <button onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded border md:hidden" style={{ borderColor: "rgba(255,255,255,0.2)" }} aria-label="menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t md:hidden" style={{ borderColor: "rgba(255,255,255,0.15)", background: "#1A0103" }}>
              {links.map((l, i) => (
                <a key={i} href={l.href} onClick={() => setOpen(false)} className="flex items-baseline gap-3 border-b px-5 py-3.5 font-serif text-2xl font-black uppercase" style={{ borderColor: surface }}>
                  <span className="text-xs" style={{ color: accent }}>0{i + 1}</span>
                  <Editable as="span" value={l.label} onChange={(v) => setLabel(i, v)} />
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="block py-4 text-center text-xs font-black uppercase tracking-widest text-white" style={{ background: accent }}>
                <Editable as="span" value={props?.cta || "Commission Us"} onChange={(v) => onChange?.({ cta: v })} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
