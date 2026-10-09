// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Menu, X, ArrowUpRight } from "lucide-react";
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
    { label: "Services", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Clients", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const upLink = (i: number) => (v: string) =>
    onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <div className="relative mx-auto max-w-6xl">
        <div
          className="flex h-16 items-center justify-between rounded-full pl-6 pr-3 backdrop-blur-xl"
          style={{ backgroundColor: `color-mix(in srgb, ${bgSecond} 75%, transparent)`, border: `1px solid ${surface}` }}
        >
          <a href="#home" className="flex items-center gap-3">
            <Landmark className="h-6 w-6" style={{ color: accent }} />
            <span className="text-lg font-semibold tracking-tight" style={{ color: ink }}>
              {T("brand", "Calder Wealth")}
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l: any, i: number) => (
              <a key={i} href={l.href} className="text-sm transition-all hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
                <Editable value={l.label} onChange={upLink(i)} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-xs xl:flex" style={{ color: inkSecond }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              {T("status", "Onboarding Q4 clients")}
            </span>
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 sm:inline-flex"
              style={{ backgroundColor: accent, color: bg }}
            >
              {T("cta", "Book a review")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95 lg:hidden"
              style={{ backgroundColor: surface, color: ink }}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute left-0 right-0 top-[4.5rem] rounded-3xl p-3 lg:hidden"
              style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}
            >
              {links.map((l: any, i: number) => (
                <a key={i} href={l.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-base active:scale-95" style={{ color: ink }}>
                  <Editable value={l.label} onChange={upLink(i)} />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold active:scale-95"
                style={{ backgroundColor: accent, color: bg }}
              >
                {T("cta", "Book a review")}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
