// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const up = (d = 0) => ({ initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d } });

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F6F5EF";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#111111";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(17, 17, 17, 0.06)";
  const accent = theme?.accent || "#4ADE5A";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const stats = props?.stats || [{ value: "12K", label: "Customers reached" }, { value: "240+", label: "Products shipped" }, { value: "4.9", label: "Average rating" }];
  return (
    <section id="home" className="relative isolate overflow-hidden px-6 pb-24 pt-14 md:pt-24" style={{ background: bg, color: ink }}>
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full blur-3xl" style={{ background: `color-mix(in srgb, ${accent} 30%, transparent)` }} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="min-w-0">
          <motion.span {...up()} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ background: surface, color: inkSecond }}>
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />{T("status", "Now onboarding new clients")}
          </motion.span>
          <motion.h1 {...up(0.1)} className="mt-6 break-words text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            {T("headline", "Product design that turns trials into")}{" "}
            <span className="relative inline-block" style={{ color: ink }}>
              {T("headlineAccent", "loyal customers")}
              <span className="absolute -bottom-1 left-0 h-2.5 w-full rounded-full" style={{ background: accent, opacity: 0.7, zIndex: -1 }} />
            </span>
          </motion.h1>
          <motion.p {...up(0.2)} className="mt-6 max-w-md break-words text-lg" style={{ color: inkSecond }}>
            {T("subheadline", "We design, build and grow software brands that people remember, trust and keep paying for.")}
          </motion.p>
          <motion.div {...up(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition hover:scale-[1.02] active:scale-95" style={{ background: accent, color: ink }}>{T("cta", "See our work")}<ArrowUpRight size={18} /></a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition hover:scale-[1.02] active:scale-95" style={{ background: surface, color: ink }}><Plus size={18} />{T("ctaSecondary", "Start a project")}</a>
            <svg width="90" height="40" viewBox="0 0 90 40" className="hidden sm:block"><motion.path d="M2 30 C 20 0, 30 40, 48 18 S 80 6, 88 22" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, delay: 0.8 }} /></svg>
          </motion.div>
          <motion.div {...up(0.4)} className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {stats.map((s: any, i: number) => (
              <div key={i} className="rounded-2xl p-4" style={{ background: surface }}>
                <div className="text-3xl font-black">{I("stats", stats, i, "value")}</div>
                <div className="mt-1 break-words text-xs" style={{ color: inkSecond }}>{I("stats", stats, i, "label")}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="relative mx-auto h-[480px] w-full max-w-lg sm:h-[540px]">
          <div className="absolute -right-6 top-16 h-72 w-72 rounded-full blur-3xl" style={{ background: `color-mix(in srgb, ${accent} 40%, transparent)` }} />
          <motion.div {...up(0.2)} className="absolute left-0 top-16 h-[78%] w-[48%] overflow-hidden rounded-[2rem]" style={{ background: surface }}>
            <img src={props?.heroImage || img("photo-1507003211169-0a1dd7228f2d")} alt="" className="h-full w-full object-cover" />
            <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold" style={{ background: bg, color: ink }}>{T("chipA", "Brand Strategy")}</span>
          </motion.div>
          <motion.div {...up(0.35)} className="absolute right-0 top-0 h-[78%] w-[48%] overflow-hidden rounded-[2rem]" style={{ background: surface }}>
            <img src={props?.heroImage2 || img("photo-1494790108377-be9c29b29330")} alt="" className="h-full w-full object-cover" />
            <span className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold" style={{ background: bg, color: ink }}>{T("chipB", "Product Design")}</span>
          </motion.div>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute bottom-2 right-6 grid h-24 w-24 place-items-center rounded-full text-center text-[10px] font-bold uppercase" style={{ background: accent, color: ink }}>{T("badge", "Scroll down")}</motion.div>
        </div>
      </div>
    </section>
  );
}
