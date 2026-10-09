// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hexagon, Menu, X } from "lucide-react";
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
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Studio", href: "#about" },
    { label: "Reviews", href: "#testimonials" },
  ];
  const setLink = (i: number, v: string) => onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });
  const go = (e: any, href: string) => { e.preventDefault(); setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute inset-0 -z-10 rounded-2xl border opacity-80 backdrop-blur-xl" style={{ backgroundColor: bgSecond, borderColor: surface }} />
        <nav className="flex h-16 items-center justify-between gap-4 px-4 sm:px-5">
          <a href="#home" onClick={(e) => go(e, "#home")} className="flex min-w-0 items-center gap-2.5 transition hover:scale-[1.02] active:scale-95">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: accent, color: bg }}><Hexagon size={18} /></span>
            <Editable as="span" value={props?.brand || "Halden Labs"} onChange={(v: string) => onChange?.({ brand: v })} className="truncate font-['Newsreader'] text-xl font-semibold" style={{ color: ink }} />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l: any, i: number) => (
              <a key={i} href={l.href} onClick={(e) => go(e, l.href)} className="rounded-lg px-4 py-2 text-[15px] transition hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
                <Editable as="span" value={l.label} onChange={(v: string) => setLink(i, v)} />
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <span className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs" style={{ backgroundColor: surface, color: inkSecond }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
              <Editable as="span" value={props?.status || "Open for Q1 projects"} onChange={(v: string) => onChange?.({ status: v })} />
            </span>
            <a href="#contact" onClick={(e) => go(e, "#contact")} className="rounded-xl px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: ink, color: bg }}>
              <Editable as="span" value={props?.cta || "Book an intro"} onChange={(v: string) => onChange?.({ cta: v })} />
            </a>
          </div>

          <button aria-label="Menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-xl transition active:scale-95 md:hidden" style={{ backgroundColor: surface, color: ink }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-2 rounded-2xl border p-3 md:hidden" style={{ backgroundColor: bgSecond, borderColor: surface }}>
              {links.map((l: any, i: number) => (
                <a key={i} href={l.href} onClick={(e) => go(e, l.href)} className="block rounded-xl px-4 py-3.5 text-lg" style={{ color: ink }}>
                  <Editable as="span" value={l.label} onChange={(v: string) => setLink(i, v)} />
                </a>
              ))}
              <a href="#contact" onClick={(e) => go(e, "#contact")} className="mt-2 block rounded-xl px-4 py-3.5 text-center font-semibold" style={{ backgroundColor: accent, color: bg }}>
                <Editable as="span" value={props?.cta || "Book an intro"} onChange={(v: string) => onChange?.({ cta: v })} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
