// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const cols = props?.columns || [
    { title: "Explore", links: [{ label: "Work", href: "#projects" }, { label: "About", href: "#about" }, { label: "Pricing", href: "#services" }] },
    { title: "Say hello", links: [{ label: "Kind words", href: "#testimonials" }, { label: "Contact", href: "#contact" }, { label: "Home", href: "#home" }] },
  ];
  const setLink = (c: number, l: number, v: string) =>
    onChange?.({ columns: cols.map((col: any, i: number) => (i === c ? { ...col, links: col.links.map((x: any, j: number) => (j === l ? { ...x, label: v } : x)) } : col)) });
  const go = (e: any, href: string) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <footer className="overflow-hidden px-6 pt-20" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_auto]">
          <div className="min-w-0">
            <Editable as="p" value={props?.summary || "Independent product engineer and designer helping SaaS founders build things customers pay for."} onChange={(v: string) => onChange?.({ summary: v })} className="max-w-sm text-lg leading-relaxed" style={{ color: ink }} />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm" style={{ backgroundColor: surface, color: inkSecond }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              <Editable as="span" value={props?.status || "Two project slots open for January"} onChange={(v: string) => onChange?.({ status: v })} />
            </div>
          </div>
          {cols.map((c: any, i: number) => (
            <div key={i}>
              <Editable as="p" value={c.title} onChange={(v: string) => onChange?.({ columns: cols.map((x: any, j: number) => (j === i ? { ...x, title: v } : x)) })} className="font-semibold" style={{ color: ink }} />
              <ul className="mt-4 space-y-3">
                {c.links.map((l: any, k: number) => (
                  <li key={k}>
                    <a href={l.href} onClick={(e) => go(e, l.href)} className="inline-block transition hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
                      <Editable as="span" value={l.label} onChange={(v: string) => setLink(i, k, v)} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <a href="#home" onClick={(e) => go(e, "#home")} aria-label="Back to top" className="flex h-14 w-14 items-center justify-center self-start rounded-full transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}><ArrowUp size={22} /></a>
        </div>

        <Editable as="p" value={props?.wordmark || "Maren Okafor"} onChange={(v: string) => onChange?.({ wordmark: v })} className="mt-16 select-none truncate font-['Bricolage_Grotesque'] text-[17vw] font-bold leading-[0.85] tracking-tighter lg:text-[11rem]" style={{ color: surface }} />
        <div className="flex flex-col justify-between gap-2 border-t py-6 text-sm sm:flex-row" style={{ borderColor: surface, color: inkSecond }}>
          <Editable as="p" value={props?.copyright || "© 2026 Maren Okafor. All rights reserved."} onChange={(v: string) => onChange?.({ copyright: v })} />
          <Editable as="p" value={props?.note || "Designed and built in London."} onChange={(v: string) => onChange?.({ note: v })} />
        </div>
      </div>
    </footer>
  );
}
