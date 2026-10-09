// @ts-nocheck
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F6F5EF";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#111111";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(17, 17, 17, 0.06)";
  const accent = theme?.accent || "#4ADE5A";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const [open, setOpen] = useState(false);
  useEffect(() => { document.documentElement.style.scrollBehavior = "smooth"; }, []);
  const links = props?.links || [{ label: "Home", href: "#home" }, { label: "About", href: "#about" }, { label: "Work", href: "#projects" }, { label: "Reviews", href: "#testimonials" }, { label: "Contact", href: "#contact" }];
  return (
    <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: `color-mix(in srgb, ${bg} 75%, transparent)`, color: ink }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <a href="#home" className="flex items-center gap-2.5 text-xl font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: accent, color: ink }}><Sparkles size={18} /></span>
          {T("brand", "Loopcraft")}
        </a>
        <ul className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {links.map((l: any, i: number) => (<li key={i}><a href={l.href} className="transition hover:opacity-60">{I("links", links, i, "label")}</a></li>))}
        </ul>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold xl:inline-flex" style={{ background: surface, color: inkSecond }}>
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />{T("status", "Booking Q4 projects")}
          </span>
          <a href="#contact" className="hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02] active:scale-95 sm:inline-flex" style={{ background: accent, color: ink }}>{T("cta", "Let's talk")}<ArrowUpRight size={16} /></a>
          <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full transition active:scale-95 lg:hidden" style={{ background: surface }}>{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      {open && (
        <div className="flex flex-col gap-2 px-6 pb-6 lg:hidden">
          {links.map((l: any, i: number) => (<a key={i} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-medium" style={{ background: surface }}>{I("links", links, i, "label")}</a>))}
          <a href="#contact" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-center font-semibold" style={{ background: accent, color: ink }}>{T("cta", "Let's talk")}</a>
        </div>
      )}
    </motion.header>
  );
}
