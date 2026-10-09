// @ts-nocheck
import { Sparkles, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F6F5EF";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#111111";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(17, 17, 17, 0.06)";
  const accent = theme?.accent || "#4ADE5A";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const explore = props?.explore || [{ label: "Home", href: "#home" }, { label: "About", href: "#about" }, { label: "Projects", href: "#projects" }];
  const connect = props?.connect || [{ label: "Reviews", href: "#testimonials" }, { label: "Contact", href: "#contact" }];
  return (
    <footer className="px-6 pb-10 pt-20" style={{ background: bgSecond, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="min-w-0 max-w-sm">
            <div className="flex items-center gap-2.5 text-xl font-black"><span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: accent, color: ink }}><Sparkles size={18} /></span>{T("brand", "Loopcraft")}</div>
            <p className="mt-4 break-words text-sm" style={{ color: inkSecond }}>{T("summary", "A product design and growth studio helping SaaS founders launch, rebrand and scale.")}</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold" style={{ background: surface }}><span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />{T("status", "Accepting new projects")}</span>
          </div>
          <div>
            <div className="font-bold">{T("exploreTitle", "Explore")}</div>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: inkSecond }}>{explore.map((l: any, i: number) => (<li key={i}><a href={l.href} className="transition hover:opacity-60">{I("explore", explore, i, "label")}</a></li>))}</ul>
          </div>
          <div>
            <div className="font-bold">{T("connectTitle", "Connect")}</div>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: inkSecond }}>{connect.map((l: any, i: number) => (<li key={i}><a href={l.href} className="transition hover:opacity-60">{I("connect", connect, i, "label")}</a></li>))}</ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 pt-6 text-sm" style={{ borderTop: `1px solid ${surface}`, color: inkSecond }}>
          <span className="break-words">{T("copyright", "© 2026 Loopcraft Studio. All rights reserved.")}</span>
          <a href="#home" aria-label="Back to top" className="grid h-11 w-11 place-items-center rounded-full transition hover:scale-[1.02] active:scale-95" style={{ background: accent, color: ink }}><ArrowUp size={18} /></a>
        </div>
      </div>
    </footer>
  );
}
