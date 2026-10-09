// @ts-nocheck
import { Hexagon, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#F2542D";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const explore = props?.explore || [{ label: "About", href: "#about" }, { label: "Projects", href: "#projects" }, { label: "Testimonials", href: "#testimonials" }];
  const reach = props?.reach || [{ label: "Contact", href: "#contact" }, { label: "Back to top", href: "#top" }];
  return (
    <footer className="overflow-hidden px-6 pt-20" style={{ background: bgSecond, color: ink }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em]"><Hexagon size={18} style={{ color: accent }} />{T("brand", "Halo Labs")}</div>
            <p className="mt-4 max-w-xs break-words text-sm opacity-60">{T("summary", "A product engineering studio building and scaling SaaS for ambitious teams.")}</p>
          </div>
          <div><div className="text-xs uppercase tracking-widest opacity-50">{T("exploreTitle", "Explore")}</div><ul className="mt-4 space-y-3 text-sm">{explore.map((l: any, i: number) => (<li key={i}><a href={l.href} className="transition hover:opacity-60">{I("explore", explore, i, "label")}</a></li>))}</ul></div>
          <div><div className="text-xs uppercase tracking-widest opacity-50">{T("reachTitle", "Reach us")}</div><ul className="mt-4 space-y-3 text-sm">{reach.map((l: any, i: number) => (<li key={i}><a href={l.href} className="transition hover:opacity-60">{I("reach", reach, i, "label")}</a></li>))}</ul></div>
        </div>
        <div className="mt-16 select-none break-words text-center font-serif text-6xl italic leading-none opacity-10 md:text-[10rem]">{T("wordmark", "Halo Labs")}</div>
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 text-xs" style={{ borderTop: `1px solid ${surface}` }}>
          <span className="inline-flex items-center gap-2 opacity-70"><span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />{T("status", "Booking engagements for next quarter")}</span>
          <span className="break-words opacity-60">{T("copyright", "© 2026 Halo Labs. All rights reserved.")}</span>
          <a href="#top" aria-label="Back to top" className="grid h-10 w-10 place-items-center rounded-full transition hover:scale-[1.02] active:scale-95" style={{ background: accent, color: ink }}><ArrowUp size={16} /></a>
        </div>
      </div>
    </footer>
  );
}
