// @ts-nocheck
import { Hexagon, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const links = props?.links || [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#projects" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const setLabel = (i, v) => onChange?.({ links: links.map((l, j) => (j === i ? { ...l, label: v } : l)) });

  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-28 text-center" style={{ background: bg, color: ink }}>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-80 w-3/4 rounded-full opacity-15 blur-[140px]" style={{ background: accent }} />
      <div className="relative mx-auto max-w-7xl">
        <Hexagon size={36} className="mx-auto" style={{ color: accent }} fill={accent} />

        <Editable
          as="div"
          className="mt-6 select-none break-words text-[clamp(4.5rem,18vw,16rem)] font-extralight italic leading-[0.8] tracking-tighter"
          value={props?.brand || "Lumora"}
          onChange={(v) => onChange?.({ brand: v })}
        />

        <Editable
          as="p"
          className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed"
          style={{ color: inkSecond }}
          value={props?.summary || "A digital innovation lab in London crafting products, brands and growth for curious companies."}
          onChange={(v) => onChange?.({ summary: v })}
        />

        <nav className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3">
          {links.map((l, i) => (
            <a key={i} href={l.href} className="text-sm font-light tracking-wide transition hover:text-white" style={{ color: inkSecond }}>
              <Editable as="span" value={l.label} onChange={(v) => setLabel(i, v)} />
            </a>
          ))}
        </nav>

        <div className="mt-10">
          <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-light" style={{ borderColor: surface, color: inkSecond }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />
            <Editable as="span" value={props?.status || "Currently accepting Q1 / Q2 engagements"} onChange={(v) => onChange?.({ status: v })} />
          </span>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs font-light sm:flex-row" style={{ borderColor: surface, color: inkSecond }}>
          <Editable as="span" value={props?.copyright || "© 2026 Lumora Labs Ltd. All rights reserved."} onChange={(v) => onChange?.({ copyright: v })} />
          <a href="#home" className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 transition hover:scale-105 active:scale-95" style={{ background: surface, borderColor: surface, color: ink }}>
            <Editable as="span" value={props?.top || "Back to top"} onChange={(v) => onChange?.({ top: v })} />
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
