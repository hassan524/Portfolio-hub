// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Menu, X, ArrowRight } from "lucide-react";
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
    { label: "Studio", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Kind words", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const upLink = (i: number) => (v: string) =>
    onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ backgroundColor: `color-mix(in srgb, ${bg} 80%, transparent)`, borderBottom: `1px solid ${surface}` }}>
      <div className="mx-auto grid h-[4.5rem] max-w-7xl grid-cols-2 items-center px-5 sm:px-8 lg:grid-cols-3">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: accent, color: bg }}>
            <Layers className="h-5 w-5" />
          </span>
          <span className="text-lg font-black uppercase tracking-tight" style={{ color: ink }}>{T("brand", "Northstack")}</span>
        </a>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {links.map((l: any, i: number) => (
            <a key={i} href={l.href} className="text-sm font-medium transition-all hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
              <Editable value={l.label} onChange={upLink(i)} />
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-5">
          <span className="hidden items-center gap-2 text-xs xl:flex" style={{ color: inkSecond }}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            {T("status", "Booking for January")}
          </span>
          <a href="#contact" className="hidden items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 sm:inline-flex" style={{ backgroundColor: ink, color: bg }}>
            {T("cta", "Start a project")}
            <ArrowRight className="h-4 w-4" />
          </a>
          <button type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center rounded-lg active:scale-95 lg:hidden" style={{ backgroundColor: surface, color: ink }}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 4.5rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:hidden"
            style={{ backgroundColor: bg }}
          >
            <div className="flex h-full flex-col justify-between px-5 py-8 sm:px-8">
              <div className="space-y-2">
                {links.map((l: any, i: number) => (
                  <a key={i} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-4xl font-black tracking-tight active:scale-95" style={{ color: ink, borderBottom: `1px solid ${surface}` }}>
                    <Editable value={l.label} onChange={upLink(i)} />
                  </a>
                ))}
              </div>
              <a href="#contact" onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-sm font-bold active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                {T("cta", "Start a project")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
