// @ts-nocheck
import { Scale, ArrowUp } from "lucide-react";
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
  const columns = props?.columns || [
    { title: "The firm", links: [{ label: "Home", href: "#home" }, { label: "About us", href: "#about" }] },
    { title: "Work", links: [{ label: "Practice areas", href: "#projects" }, { label: "Client voices", href: "#testimonials" }] },
    { title: "Reach us", links: [{ label: "Contact", href: "#contact" }, { label: "Office hours", href: "#contact" }] },
  ];
  const upT = (ci: number) => (v: string) =>
    onChange?.({ columns: columns.map((c: any, i: number) => (i === ci ? { ...c, title: v } : c)) });
  const upL = (ci: number, li: number) => (v: string) =>
    onChange?.({ columns: columns.map((c: any, i: number) => (i === ci ? { ...c, links: c.links.map((l: any, j: number) => (j === li ? { ...l, label: v } : l)) } : c)) });

  return (
    <footer style={{ backgroundColor: bg, borderTop: `3px double ${ink}` }}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Scale className="h-7 w-7" style={{ color: accent }} />
              <span className="font-serif text-3xl" style={{ color: ink }}>{T("brand", "Marlowe & Finch")}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: inkSecond }}>{T("summary", "Independent corporate law firm advising founders, boards and family businesses since 1994.")}</p>
            <div className="mt-5 flex items-center gap-2 text-xs" style={{ color: inkSecond }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              {T("status", "Offices open Monday to Friday")}
            </div>
          </div>
          {columns.map((c: any, ci: number) => (
            <div key={ci} className="lg:col-span-2">
              <h4 className="font-serif text-lg italic" style={{ color: ink }}><Editable value={c.title} onChange={upT(ci)} /></h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l: any, li: number) => (
                  <li key={li}><a href={l.href} className="inline-block text-sm transition-all hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}><Editable value={l.label} onChange={upL(ci, li)} /></a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex items-center justify-between gap-4 pt-6" style={{ borderTop: `1px solid ${surface}` }}>
          <p className="text-xs" style={{ color: inkSecond }}>{T("copyright", "© 2026 Marlowe & Finch LLP. Attorney advertising.")}</p>
          <a href="#home" aria-label="Back to top" className="flex h-11 w-11 items-center justify-center transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}><ArrowUp className="h-5 w-5" /></a>
        </div>
      </div>
    </footer>
  );
}
