// @ts-nocheck
import { Leaf, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const line = `color-mix(in srgb, ${bg} 22%, transparent)`;
  const muted = `color-mix(in srgb, ${bg} 70%, transparent)`;

  const columns = props?.columns || [
    {
      title: "Navigate",
      links: [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#projects" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Client reviews", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ];

  const updTitle = (ci: number, v: string) =>
    onChange?.({ columns: columns.map((c: any, i: number) => (i === ci ? { ...c, title: v } : c)) });
  const updLink = (ci: number, li: number, v: string) =>
    onChange?.({
      columns: columns.map((c: any, i: number) =>
        i === ci ? { ...c, links: c.links.map((l: any, j: number) => (j === li ? { ...l, label: v } : l)) } : c
      ),
    });

  return (
    <footer style={{ backgroundColor: ink, color: bg }}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: accent, color: bg }}>
                <Leaf className="h-5 w-5" />
              </span>
              <span className="text-xl font-extrabold tracking-tight">
                <Editable value={props?.brand || "Verdant & Co."} onChange={(v: string) => onChange?.({ brand: v })} />
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: muted }}>
              <Editable
                value={props?.summary || "Sustainability consulting that helps companies lower costs, cut emissions and report with confidence."}
                onChange={(v: string) => onChange?.({ summary: v })}
              />
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              <span className="text-xs font-semibold" style={{ color: muted }}>
                <Editable value={props?.status || "Accepting new clients"} onChange={(v: string) => onChange?.({ status: v })} />
              </span>
            </div>
          </div>

          {columns.map((c: any, ci: number) => (
            <div key={ci} className="lg:col-span-2">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                <Editable value={c.title} onChange={(v: string) => updTitle(ci, v)} />
              </h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l: any, li: number) => (
                  <li key={li}>
                    <a href={l.href} className="inline-block text-sm transition-all hover:scale-[1.02] active:scale-95" style={{ color: muted }}>
                      <Editable value={l.label} onChange={(v: string) => updLink(ci, li, v)} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider">
              <Editable value={props?.visitTitle || "Visit us"} onChange={(v: string) => onChange?.({ visitTitle: v })} />
            </h4>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: muted }}>
              <Editable
                value={props?.visitText || "214 Market Street, Suite 8, San Francisco, CA 94105"}
                onChange={(v: string) => onChange?.({ visitText: v })}
              />
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-5 pt-8 sm:flex-row sm:items-center" style={{ borderTop: `1px solid ${line}` }}>
          <p className="text-xs" style={{ color: muted }}>
            <Editable
              value={props?.copyright || "© 2026 Verdant & Co. All rights reserved."}
              onChange={(v: string) => onChange?.({ copyright: v })}
            />
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold transition-all hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: accent, color: bg }}
          >
            <ArrowUp className="h-4 w-4" />
            <Editable value={props?.topLabel || "Back to top"} onChange={(v: string) => onChange?.({ topLabel: v })} />
          </a>
        </div>
      </div>
    </footer>
  );
}
