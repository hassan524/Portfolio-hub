// @ts-nocheck
import { Briefcase, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const T = (key: string, d: string) => (
    <Editable value={props?.[key] || d} onChange={(v: string) => onChange?.({ [key]: v })} />
  );
  const muted = `color-mix(in srgb, ${bg} 68%, transparent)`;
  const line = `color-mix(in srgb, ${bg} 18%, transparent)`;
  const columns = props?.columns || [
    { title: "Hartwell", links: [{ label: "Home", href: "#home" }, { label: "Why Hartwell", href: "#about" }] },
    { title: "For employers", links: [{ label: "Hiring services", href: "#projects" }, { label: "Reviews", href: "#testimonials" }] },
    { title: "Get in touch", links: [{ label: "Contact", href: "#contact" }, { label: "Office hours", href: "#contact" }] },
  ];
  const upT = (ci: number) => (v: string) =>
    onChange?.({ columns: columns.map((c: any, i: number) => (i === ci ? { ...c, title: v } : c)) });
  const upL = (ci: number, li: number) => (v: string) =>
    onChange?.({ columns: columns.map((c: any, i: number) => (i === ci ? { ...c, links: c.links.map((l: any, j: number) => (j === li ? { ...l, label: v } : l)) } : c)) });

  return (
    <footer style={{ backgroundColor: ink, color: bg }}>
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: accent, color: bgSecond }}><Briefcase className="h-5 w-5" /></span>
              <span className="text-xl font-bold">{T("brand", "Hartwell Talent")}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: muted }}>{T("summary", "Recruitment for technology, finance, operations and sales teams across the UK and Europe.")}</p>
            <div className="mt-5 flex items-center gap-2 text-xs" style={{ color: muted }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              {T("status", "Recruiters online now")}
            </div>
          </div>
          {columns.map((c: any, ci: number) => (
            <div key={ci}>
              <h4 className="text-sm font-bold"><Editable value={c.title} onChange={upT(ci)} /></h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l: any, li: number) => (
                  <li key={li}>
                    <a href={l.href} className="inline-block text-sm transition-all hover:scale-[1.02] active:scale-95" style={{ color: muted }}><Editable value={l.label} onChange={upL(ci, li)} /></a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex items-center justify-between gap-4 py-8" style={{ borderTop: `1px solid ${line}` }}>
          <p className="text-xs" style={{ color: muted }}>{T("copyright", "© 2026 Hartwell Talent Ltd. All rights reserved.")}</p>
          <a href="#home" aria-label="Back to top" className="flex h-11 w-11 items-center justify-center rounded-xl transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bgSecond }}><ArrowUp className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
}
