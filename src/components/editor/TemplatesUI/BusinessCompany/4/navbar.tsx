// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Menu, X, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const T = (key: string, d: string) => (
    <Editable value={props?.[key] || d} onChange={(v: string) => onChange?.({ [key]: v })} />
  );
  const [open, setOpen] = useState(false);
  const links = props?.links || [
    { label: "Home", href: "#home" },
    { label: "Why Hartwell", href: "#about" },
    { label: "Hiring Services", href: "#projects" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const upLink = (i: number) => (v: string) =>
    onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg" style={{ backgroundColor: `color-mix(in srgb, ${bgSecond} 92%, transparent)`, borderBottom: `1px solid ${surface}` }}>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: accent, color: bgSecond }}>
            <Briefcase className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold tracking-tight" style={{ color: ink }}>{T("brand", "Hartwell Talent")}</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l: any, i: number) => (
            <a key={i} href={l.href} className="text-sm font-medium transition-all hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
              <Editable value={l.label} onChange={upLink(i)} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 text-xs font-medium xl:flex" style={{ color: inkSecond }}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            {T("status", "42 roles open this week")}
          </span>
          <a href="#contact" className="hidden items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 sm:inline-flex" style={{ backgroundColor: accent, color: bgSecond }}>
            {T("cta", "Hire talent")}
            <ArrowRight className="h-4 w-4" />
          </a>
          <button type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-xl active:scale-95 lg:hidden" style={{ backgroundColor: surface, color: ink }}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden lg:hidden" style={{ borderTop: `1px solid ${surface}` }}>
            <div className="flex flex-col gap-1 px-5 py-4 sm:px-8">
              {links.map((l: any, i: number) => (
                <a key={i} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-base font-medium active:scale-95" style={{ color: ink }}>
                  <Editable value={l.label} onChange={upLink(i)} />
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold active:scale-95" style={{ backgroundColor: accent, color: bgSecond }}>
                {T("cta", "Hire talent")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
