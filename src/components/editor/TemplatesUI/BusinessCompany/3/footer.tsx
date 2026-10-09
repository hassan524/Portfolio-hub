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

  const T = (key: string, d: string) => (
    <Editable value={props?.[key] || d} onChange={(v: string) => onChange?.({ [key]: v })} />
  );
  const links = props?.links || [
    { label: "Home", href: "#home" },
    { label: "Studio", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Kind words", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];
  const upL = (i: number) => (v: string) =>
    onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });

  return (
    <footer className="overflow-hidden" style={{ backgroundColor: bgSecond, borderTop: `1px solid ${surface}` }}>
      <div className="mx-auto max-w-7xl px-5 pt-14 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: inkSecond }}>
            {T("summary", "Northstack is an independent product studio designing and building software for ambitious companies.")}
          </p>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l: any, i: number) => (
              <a key={i} href={l.href} className="text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ color: ink }}>
                <Editable value={l.label} onChange={upL(i)} />
              </a>
            ))}
          </nav>
          <div className="flex items-start gap-2 text-xs" style={{ color: inkSecond }}>
            <span className="mt-1 h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            {T("status", "Studio open, replies in 24 hours")}
          </div>
        </div>

        <div className="mt-12 select-none text-[22vw] font-black uppercase leading-[0.8] tracking-tighter sm:text-[16vw]" style={{ color: surface }}>
          {T("wordmark", "Northstack")}
        </div>

        <div className="flex items-center justify-between py-6" style={{ borderTop: `1px solid ${surface}` }}>
          <p className="text-xs" style={{ color: inkSecond }}>{T("copyright", "© 2026 Northstack Studio. All rights reserved.")}</p>
          <a href="#home" aria-label="Back to top" className="flex h-11 w-11 items-center justify-center rounded-lg transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
            <ArrowUp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
