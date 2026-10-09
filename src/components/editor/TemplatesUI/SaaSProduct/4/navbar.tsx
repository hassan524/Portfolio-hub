// @ts-nocheck
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hexagon, Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#F2542D";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const [open, setOpen] = useState(false);
  useEffect(() => { document.documentElement.style.scrollBehavior = "smooth"; }, []);
  const links = props?.links || [{ label: "About", href: "#about" }, { label: "Projects", href: "#projects" }, { label: "Testimonials", href: "#testimonials" }, { label: "Contact", href: "#contact" }];
  return (
    <header className="sticky top-0 z-50 px-4 pt-4" style={{ color: ink }}>
      <motion.nav initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full px-4 py-2.5 backdrop-blur-xl" style={{ background: `color-mix(in srgb, ${bg} 55%, transparent)`, border: `1px solid ${surface}` }}>
        <a href="#top" className="flex items-center gap-2 pl-1 text-sm font-semibold uppercase tracking-[0.25em]">
          <Hexagon size={18} style={{ color: accent }} />{T("brand", "Halo Labs")}
        </a>
        <ul className="hidden items-center gap-8 text-sm md:flex" style={{ color: inkSecond }}>
          {links.map((l: any, i: number) => (<li key={i}><a href={l.href} className="transition hover:opacity-60">{I("links", links, i, "label")}</a></li>))}
        </ul>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs lg:inline-flex" style={{ background: surface, color: inkSecond }}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />{T("status", "2 slots open")}
          </span>
          <a href="#contact" className="hidden rounded-full px-5 py-2 text-sm font-semibold transition hover:scale-[1.02] active:scale-95 sm:block" style={{ background: accent, color: ink }}>{T("cta", "Let's talk")}</a>
          <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-full transition active:scale-95 md:hidden" style={{ background: surface }}>{open ? <X size={16} /> : <Menu size={16} />}</button>
        </div>
      </motion.nav>
      {open && (
        <div className="mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-3xl p-3 backdrop-blur-xl md:hidden" style={{ background: `color-mix(in srgb, ${bg} 85%, transparent)`, border: `1px solid ${surface}` }}>
          {links.map((l: any, i: number) => (<a key={i} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3" style={{ background: surface }}>{I("links", links, i, "label")}</a>))}
          <a href="#contact" onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-center font-semibold" style={{ background: accent, color: ink }}>{T("cta", "Let's talk")}</a>
        </div>
      )}
    </header>
  );
}
