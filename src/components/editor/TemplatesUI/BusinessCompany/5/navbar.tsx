// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Menu, X } from "lucide-react";
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
    { label: "The Firm", href: "#about" },
    { label: "Practice Areas", href: "#projects" },
    { label: "Client Voices", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const upLink = (i: number) => (v: string) =>
    onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });
  const Link = ({ l, i }: any) => (
    <a href={l.href} className="text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
      <Editable value={l.label} onChange={upLink(i)} />
    </a>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md" style={{ backgroundColor: `color-mix(in srgb, ${bg} 88%, transparent)`, borderBottom: `1px solid ${ink}` }}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:grid lg:grid-cols-3">
        <nav className="hidden items-center gap-8 lg:flex">
          {links.slice(0, 2).map((l: any, i: number) => (<Link key={i} l={l} i={i} />))}
        </nav>

        <a href="#home" className="flex items-center gap-3 lg:justify-center">
          <Scale className="h-6 w-6" style={{ color: accent }} />
          <span className="font-serif text-2xl font-semibold tracking-tight" style={{ color: ink }}>{T("brand", "Marlowe & Finch")}</span>
        </a>

        <div className="flex items-center justify-end gap-8">
          <nav className="hidden items-center gap-8 lg:flex">
            {links.slice(2).map((l: any, i: number) => (<Link key={i} l={l} i={i + 2} />))}
          </nav>
          <span className="hidden items-center gap-2 text-xs xl:flex" style={{ color: inkSecond }}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            {T("status", "Partners available")}
          </span>
          <button type="button" aria-label="Toggle menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 items-center justify-center active:scale-95 lg:hidden" style={{ color: ink }}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden lg:hidden" style={{ borderTop: `1px solid ${surface}`, backgroundColor: bg }}>
            <div className="px-5 py-4 sm:px-8">
              {links.map((l: any, i: number) => (
                <a key={i} href={l.href} onClick={() => setOpen(false)} className="block py-3 font-serif text-2xl active:scale-95" style={{ color: ink, borderBottom: `1px solid ${surface}` }}>
                  <Editable value={l.label} onChange={upLink(i)} />
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-5 block px-6 py-3.5 text-center text-sm font-semibold active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                {T("cta", "Request a consultation")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
