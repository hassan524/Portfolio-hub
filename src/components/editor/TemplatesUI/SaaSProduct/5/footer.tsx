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

  const DEFAULT_COLS = [
    { title: "Studio", links: [{ label: "Home", href: "#home" }, { label: "About", href: "#about" }, { label: "Services", href: "#services" }] },
    { title: "Work", links: [{ label: "Projects", href: "#projects" }, { label: "Clients", href: "#testimonials" }, { label: "Contact", href: "#contact" }] },
  ];
  const cols = Array.isArray(props?.columns) && props.columns.length > 0 ? props.columns : DEFAULT_COLS;
  const setLink = (c: number, l: number, v: string) =>
    onChange?.({ columns: cols.map((col: any, i: number) => (i === c ? { ...col, links: col.links.map((x: any, j: number) => (j === l ? { ...x, label: v } : x)) } : col)) });
  const go = (e: any, href: string) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <footer className="border-t px-6 pb-8 pt-16" style={{ backgroundColor: bgSecond, borderColor: surface }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: accent, color: ink }}><Zap size={18} /></span>
              <Editable as="span" value={props?.brand || "Forgeline"} onChange={(v: string) => onChange?.({ brand: v })} className="font-['Poppins'] text-xl font-semibold" style={{ color: ink }} />
            </div>
            <Editable as="p" value={props?.summary || "A product studio designing and building web, mobile and AI software for ambitious teams."} onChange={(v: string) => onChange?.({ summary: v })} className="mt-4 max-w-sm leading-relaxed" style={{ color: inkSecond }} />
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm" style={{ backgroundColor: surface, borderColor: surface, color: inkSecond }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              <Editable as="span" value={props?.status || "Taking on new projects for Q1"} onChange={(v: string) => onChange?.({ status: v })} />
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
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center" style={{ borderColor: surface }}>
          <Editable as="p" value={props?.copyright || "© 2026 Forgeline Studio. All rights reserved."} onChange={(v: string) => onChange?.({ copyright: v })} className="text-sm" style={{ color: inkSecond }} />
          <a href="#home" onClick={(e) => go(e, "#home")} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: surface, borderColor: surface, color: ink }}>
            <Editable as="span" value={props?.top || "Back to top"} onChange={(v: string) => onChange?.({ top: v })} />
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export const SaaSProduct5Footer = Footer;
export const FooterDefault = Footer;
export default Footer;
