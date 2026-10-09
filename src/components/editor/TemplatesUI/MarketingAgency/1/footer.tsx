// @ts-nocheck
import { Zap, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const cols = props?.columns || [
    { title: "Explore", links: [{ label: "Home", href: "#home" }, { label: "About", href: "#about" }, { label: "Work", href: "#projects" }] },
    { title: "Company", links: [{ label: "Praise", href: "#testimonials" }, { label: "Contact", href: "#contact" }, { label: "Studio hours", href: "#contact" }] },
  ];
  const setLink = (c, l, v) => onChange?.({ columns: cols.map((col, i) => (i === c ? { ...col, links: col.links.map((x, j) => (j === l ? { ...x, label: v } : x)) } : col)) });
  return (
    <footer className="relative overflow-hidden px-6 pb-8 pt-20" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: accent, color: bg }}><Zap size={18} /></span>
              <Editable as="span" className="text-2xl font-black" value={props?.brand || "Voltage"} onChange={(v) => onChange?.({ brand: v })} />
            </div>
            <Editable as="p" className="mt-4 max-w-md" style={{ color: inkSecond }} value={props?.summary || "An independent digital growth studio in San Francisco helping ambitious brands get found, remembered and chosen."} onChange={(v) => onChange?.({ summary: v })} />
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm" style={{ background: surface, borderColor: surface }}>
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />
              <Editable as="span" value={props?.status || "All systems go. Booking Q1 projects"} onChange={(v) => onChange?.({ status: v })} />
            </span>
          </div>
          {cols.map((c, ci) => (
            <div key={ci} className="md:col-span-3">
              <Editable as="div" className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: accent }} value={c.title} onChange={(v) => onChange?.({ columns: cols.map((x, i) => (i === ci ? { ...x, title: v } : x)) })} />
              {c.links.map((l, li) => (
                <a key={li} href={l.href} className="block py-1.5 transition hover:translate-x-1" style={{ color: inkSecond }}>
                  <Editable as="span" value={l.label} onChange={(v) => setLink(ci, li, v)} />
                </a>
              ))}
            </div>
          ))}
        </div>
        <Editable as="div" className="mt-16 select-none break-words text-[clamp(4rem,19vw,17rem)] font-black uppercase leading-[0.8] tracking-tighter opacity-10" value={props?.wordmark || "Voltage"} onChange={(v) => onChange?.({ wordmark: v })} />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm" style={{ borderColor: surface, color: inkSecond }}>
          <Editable as="span" value={props?.copyright || "© 2026 Voltage Digital Studio. All rights reserved."} onChange={(v) => onChange?.({ copyright: v })} />
          <a href="#home" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-bold transition hover:scale-[1.02] active:scale-95" style={{ background: accent, color: bg }}>
            <Editable as="span" value={props?.top || "Back to top"} onChange={(v) => onChange?.({ top: v })} /> <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
