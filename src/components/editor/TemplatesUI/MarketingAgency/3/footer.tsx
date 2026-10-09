// @ts-nocheck
import { Crown, ArrowUp, Crosshair } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#1A0103";
  const bgSecond = theme?.["bg-second"] || "#420205";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#F8D4D4";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#E50914";
  const yellow = "#FFBF00";

  const defaultCols = [
    { title: "Disciplines", links: [{ label: "Brand Warfare", href: "#projects" }, { label: "Viral Studio", href: "#projects" }, { label: "Performance Media", href: "#projects" }] },
    { title: "Agency Court", links: [{ label: "Command Staff", href: "#about" }, { label: "Witness Proof", href: "#testimonials" }, { label: "Commission Us", href: "#contact" }] },
  ];
  const cols = (props?.columns && props.columns.length > 0) ? props.columns : defaultCols;
  const setLink = (c, l, v) => onChange?.({ columns: cols.map((col, i) => (i === c ? { ...col, links: col.links.map((x, j) => (j === l ? { ...x, label: v } : x)) } : col)) });

  return (
    <footer className="border-t-2 px-4 pb-8 pt-24 md:px-8" style={{ background: "#0B0001", borderColor: accent, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Top Header of Footer: Asymmetric Left Brand & Right Nav */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Brand, Mission & Technical Crosshairs */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded shadow-lg" style={{ background: accent, color: "#fff" }}>
                <Crown size={24} />
              </span>
              <Editable as="span" className="font-serif text-3xl font-black uppercase tracking-tight text-white md:text-4xl" value={props?.brand || "Market Agency"} onChange={(v) => onChange?.({ brand: v })} />
            </div>

            <Editable
              as="p"
              className="mt-6 max-w-md text-base font-medium leading-relaxed text-white/80"
              value={props?.summary || "An independent advertising and performance studio converting brand attention into dominant commercial market share since 2014."}
              onChange={(v) => onChange?.({ summary: v })}
            />

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono font-bold uppercase tracking-wider text-white/60">
              <span className="flex items-center gap-1.5 border px-3 py-1.5" style={{ borderColor: accent, color: yellow }}>
                <span>40.7128° N, 74.0060° W</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span>NYC · LON · MANCHESTER</span>
              </span>
            </div>
          </div>

          {/* Right Columns: Structured Navigation */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-6">
            {cols.map((c, ci) => (
              <div key={ci}>
                <Editable as="div" className="mb-4 font-serif text-xs font-black uppercase tracking-[0.3em]" style={{ color: yellow }} value={c.title} onChange={(v) => onChange?.({ columns: cols.map((x, i) => (i === ci ? { ...x, title: v } : x)) })} />
                <div className="space-y-2.5">
                  {c.links.map((l, li) => (
                    <a key={li} href={l.href} className="block font-serif text-base font-bold uppercase tracking-wider text-white/70 transition hover:text-white hover:translate-x-1">
                      <Editable as="span" value={l.label} onChange={(v) => setLink(ci, li, v)} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monumental Giant Wordmark - Left-Aligned / Asymmetric */}
        <div className="mt-20 border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <Editable
            as="div"
            className="select-none break-words font-serif text-[clamp(4.5rem,18vw,16rem)] font-black uppercase leading-[0.78] tracking-tighter text-white/10"
            style={{
              textShadow: "0 0 40px rgba(229, 9, 20, 0.15)",
            }}
            value={props?.wordmark || "Market Agency"}
            onChange={(v) => onChange?.({ wordmark: v })}
          />
        </div>

        {/* Bottom Hairline Footer Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-2 pt-6 text-xs font-mono font-bold uppercase tracking-wider text-white/40" style={{ borderColor: accent }}>
          <Editable as="span" value={props?.copyright || "ALEXANDER PARK COPYRIGHT © 2026. ALL RIGHTS RESERVED."} onChange={(v) => onChange?.({ copyright: v })} />
          <a
            href="#home"
            className="inline-flex items-center gap-2 border-2 px-6 py-2.5 font-serif font-black uppercase tracking-wider text-black shadow-xl transition hover:scale-105 active:scale-95"
            style={{ borderColor: yellow, background: yellow }}
          >
            <Editable as="span" value={props?.top || "Top of Reign"} onChange={(v) => onChange?.({ top: v })} />
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
