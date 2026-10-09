// @ts-nocheck
import { Landmark, ArrowUp } from "lucide-react";
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
    { title: "Explore", links: [{ label: "Home", href: "#home" }, { label: "Services", href: "#projects" }, { label: "About", href: "#about" }] },
    { title: "Connect", links: [{ label: "Client stories", href: "#testimonials" }, { label: "Contact", href: "#contact" }] },
  ];
  const upT = (ci: number) => (v: string) =>
    onChange?.({ columns: columns.map((c: any, i: number) => (i === ci ? { ...c, title: v } : c)) });
  const upL = (ci: number, li: number) => (v: string) =>
    onChange?.({ columns: columns.map((c: any, i: number) => (i === ci ? { ...c, links: c.links.map((l: any, j: number) => (j === li ? { ...l, label: v } : l)) } : c)) });

  return (
    <footer style={{ backgroundColor: bgSecond, borderTop: `1px solid ${surface}` }}>
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Landmark className="h-6 w-6" style={{ color: accent }} />
              <span className="text-xl font-semibold" style={{ color: ink }}>{T("brand", "Calder Wealth")}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: inkSecond }}>
              {T("summary", "Independent, fee-only financial planning for families and business owners.")}
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs" style={{ color: inkSecond }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              {T("status", "Offices open today")}
            </div>
          </div>
          {columns.map((c: any, ci: number) => (
            <div key={ci}>
              <h4 className="text-sm font-semibold uppercase tracking-wider" style={{ color: ink }}><Editable value={c.title} onChange={upT(ci)} /></h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l: any, li: number) => (
                  <li key={li}>
                    <a href={l.href} className="inline-block text-sm transition-all hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
                      <Editable value={l.label} onChange={upL(ci, li)} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex items-center justify-between gap-4 py-8" style={{ borderTop: `1px solid ${surface}` }}>
          <p className="text-xs" style={{ color: inkSecond }}>{T("copyright", "© 2026 Calder Wealth Partners. All rights reserved.")}</p>
          <a href="#home" aria-label="Back to top" className="flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
            <ArrowUp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
