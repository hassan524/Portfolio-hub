// @ts-nocheck
import { Shapes, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const cols = props?.columns || [
    { title: "Around", links: [{ label: "Hello", href: "#home" }, { label: "Studio", href: "#about" }, { label: "Works", href: "#projects" }] },
    { title: "Friends", links: [{ label: "Love", href: "#testimonials" }, { label: "Say hi", href: "#contact" }] },
  ];
  const setLink = (c, l, v) => onChange?.({ columns: cols.map((col, i) => (i === c ? { ...col, links: col.links.map((x, j) => (j === l ? { ...x, label: v } : x)) } : col)) });

  return (
    <footer className="border-t px-6 pb-8 pt-24" style={{ background: bg, borderColor: surface, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 -rotate-6 place-items-center rounded-2xl" style={{ background: accent, color: bg }}>
                <Shapes size={22} />
              </span>
              <Editable as="span" className="text-4xl font-black uppercase tracking-tight" value={props?.brand || "Blobby"} onChange={(v) => onChange?.({ brand: v })} />
            </div>
            <Editable as="p" className="mt-5 max-w-md text-base font-medium leading-relaxed" style={{ color: inkSecond }} value={props?.summary || "A playful art, 3D worldbuilding and tactile brand studio in Los Angeles making things people want to hug."} onChange={(v) => onChange?.({ summary: v })} />
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wider" style={{ borderColor: surface, background: surface }}>
                <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />
                <Editable as="span" value={props?.status || "Booking Q1 / Q2 projects"} onChange={(v) => onChange?.({ status: v })} />
              </span>
            </div>
          </div>

          {cols.map((c, ci) => (
            <div key={ci} className="md:col-span-3">
              <Editable as="div" className="mb-4 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }} value={c.title} onChange={(v) => onChange?.({ columns: cols.map((x, i) => (i === ci ? { ...x, title: v } : x)) })} />
              {c.links.map((l, li) => (
                <a key={li} href={l.href} className="block py-1 text-lg font-bold uppercase tracking-wider transition hover:translate-x-1" style={{ color: ink }}>
                  <Editable as="span" value={l.label} onChange={(v) => setLink(ci, li, v)} />
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Monumental Giant Wordmark */}
        <Editable
          as="div"
          className="mt-14 select-none break-words text-[clamp(4.5rem,20vw,18rem)] font-black uppercase leading-[0.8] tracking-tighter"
          style={{ color: accent }}
          value={props?.wordmark || "Blobby!"}
          onChange={(v) => onChange?.({ wordmark: v })}
        />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-8 text-xs font-bold uppercase tracking-wider" style={{ borderColor: surface, color: inkSecond }}>
          <Editable as="span" value={props?.copyright || "© 2026 Blobby Studio. Made with love and clay."} onChange={(v) => onChange?.({ copyright: v })} />
          <a href="#home" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-black uppercase tracking-wider transition hover:scale-105 active:scale-95" style={{ background: accent, color: bg }}>
            <Editable as="span" value={props?.top || "Back to top"} onChange={(v) => onChange?.({ top: v })} />
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
