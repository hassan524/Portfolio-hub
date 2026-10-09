// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Menu, X } from "lucide-react";
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
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Pricing", href: "#services" },
    { label: "Kind words", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const setLink = (i: number, v: string) => onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });
  const go = (e: any, href: string) => { e.preventDefault(); setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 -z-10 opacity-85 backdrop-blur-xl" style={{ backgroundColor: bg }} />
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-6">
        <a href="#home" onClick={(e) => go(e, "#home")} className="flex min-w-0 items-center gap-3 transition hover:scale-[1.02] active:scale-95">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: ink, color: bg }}><Layers size={18} /></span>
          <Editable as="span" value={props?.brand || "Maren Okafor"} onChange={(v: string) => onChange?.({ brand: v })} className="truncate font-['Bricolage_Grotesque'] text-lg font-semibold tracking-tight" style={{ color: ink }} />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l: any, i: number) => (
            <a key={i} href={l.href} onClick={(e) => go(e, l.href)} className="rounded-full px-4 py-2 text-[15px] font-medium transition hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
              <Editable as="span" value={l.label} onChange={(v: string) => setLink(i, v)} />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="flex items-center gap-2 text-sm" style={{ color: inkSecond }}>
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: accent }} /><span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: accent }} /></span>
            <Editable as="span" value={props?.status || "Booking from January"} onChange={(v: string) => onChange?.({ status: v })} />
          </span>
          <a href="#contact" onClick={(e) => go(e, "#contact")} className="rounded-full px-5 py-2.5 text-[15px] font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
            <Editable as="span" value={props?.cta || "Work with me"} onChange={(v: string) => onChange?.({ cta: v })} />
          </a>
        </div>

        <button aria-label="Menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95 lg:hidden" style={{ backgroundColor: surface, color: ink }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="absolute left-0 right-0 top-[72px] border-t px-6 pb-8 pt-4 lg:hidden" style={{ backgroundColor: bg, borderColor: surface }}>
            {links.map((l: any, i: number) => (
              <a key={i} href={l.href} onClick={(e) => go(e, l.href)} className="block border-b py-4 font-['Bricolage_Grotesque'] text-2xl font-semibold" style={{ color: ink, borderColor: surface }}>
                <Editable as="span" value={l.label} onChange={(v: string) => setLink(i, v)} />
              </a>
            ))}
            <a href="#contact" onClick={(e) => go(e, "#contact")} className="mt-6 block rounded-full px-6 py-4 text-center font-semibold" style={{ backgroundColor: accent, color: bg }}>
              <Editable as="span" value={props?.cta || "Work with me"} onChange={(v: string) => onChange?.({ cta: v })} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
