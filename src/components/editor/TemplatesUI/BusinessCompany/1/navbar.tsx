// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, ArrowUpRight } from "lucide-react";
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
    { label: "Services", href: "#projects" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  const updateLink = (i: number, v: string) =>
    onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-xl"
      style={{
        backgroundColor: `color-mix(in srgb, ${bg} 82%, transparent)`,
        borderBottom: `1px solid ${surface}`,
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{ backgroundColor: accent, color: bg }}
          >
            <Leaf className="h-5 w-5" />
          </span>
          <span className="text-xl font-extrabold tracking-tight" style={{ color: ink }}>
            <Editable
              value={props?.brand || "Verdant & Co."}
              onChange={(v: string) => onChange?.({ brand: v })}
            />
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l: any, i: number) => (
            <a
              key={i}
              href={l.href}
              className="text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
              style={{ color: inkSecond }}
            >
              <Editable value={l.label} onChange={(v: string) => updateLink(i, v)} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 xl:flex">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-xs font-semibold" style={{ color: inkSecond }}>
              <Editable
                value={props?.status || "Accepting new clients"}
                onChange={(v: string) => onChange?.({ status: v })}
              />
            </span>
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 sm:inline-flex"
            style={{ backgroundColor: accent, color: bg }}
          >
            <Editable
              value={props?.cta || "Book a consultation"}
              onChange={(v: string) => onChange?.({ cta: v })}
            />
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-95 lg:hidden"
            style={{ backgroundColor: surface, color: ink }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden lg:hidden"
            style={{ borderTop: `1px solid ${surface}` }}
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 sm:px-8">
              {links.map((l: any, i: number) => (
                <a
                  key={i}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-semibold transition-all active:scale-95"
                  style={{ color: ink }}
                >
                  <Editable value={l.label} onChange={(v: string) => updateLink(i, v)} />
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-all active:scale-95"
                style={{ backgroundColor: accent, color: bg }}
              >
                <Editable
                  value={props?.cta || "Book a consultation"}
                  onChange={(v: string) => onChange?.({ cta: v })}
                />
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
