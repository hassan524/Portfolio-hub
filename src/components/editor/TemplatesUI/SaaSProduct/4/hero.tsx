// @ts-nocheck
import { motion } from "framer-motion";
import { Star, ShieldCheck, Zap, Trophy, TrendingUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const fade = (d = 0) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d } });
const icons = [ShieldCheck, Zap, Trophy, TrendingUp];

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#F2542D";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const reviews = props?.reviews || ["Shipped our MVP in 6 weeks", "Cut churn by a third", "The best engineers we hired"];
  const stats = props?.stats || [{ value: "98%", title: "Client retention", text: "Teams stay with us across multiple releases." }, { value: "6 wks", title: "Average MVP time", text: "From kickoff to a live, paying-customer product." }, { value: "40+", title: "Products launched", text: "Across fintech, health and developer tools." }, { value: "3.2x", title: "Typical growth", text: "Median usage lift in the first quarter after launch." }];
  const wave = (a: number, b: number, c: number, d: number) => `M0 ${a} C 360 ${b}, 720 ${c}, 1440 ${d}`;
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden px-6 pt-24" style={{ background: bg, color: ink }}>
      <motion.div animate={{ x: [0, 80, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 0.95, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-40 top-1/3 h-[480px] w-[620px] rounded-full blur-[120px]" style={{ background: `color-mix(in srgb, ${accent} 55%, transparent)` }} />
      <motion.div animate={{ x: [0, -90, 50, 0], y: [0, 50, -30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-40 top-1/2 h-[420px] w-[560px] rounded-full blur-[120px]" style={{ background: `color-mix(in srgb, ${accent} 35%, ${ink})`, opacity: 0.35 }} />
      <motion.div animate={{ x: [0, 60, -60, 0], scale: [1, 1.3, 1] }} transition={{ duration: 24, repeat: Infinity }} className="absolute bottom-0 left-1/3 h-[360px] w-[520px] rounded-full blur-[130px]" style={{ background: `color-mix(in srgb, ${accent} 40%, transparent)` }} />
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-80 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        {[0, 1, 2].map((i) => (
          <motion.path key={i} fill="none" stroke={i === 1 ? ink : accent} strokeWidth={1.6 - i * 0.4} opacity={0.75 - i * 0.2}
            animate={{ d: [wave(200 + i * 30, 100 + i * 20, 300 - i * 30, 160 + i * 25), wave(160 + i * 25, 280 - i * 30, 120 + i * 20, 220 + i * 30), wave(200 + i * 30, 100 + i * 20, 300 - i * 30, 160 + i * 25)] }}
            transition={{ duration: 9 + i * 3, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </svg>
      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, color-mix(in srgb, ${bg} 50%, transparent), transparent 40%, color-mix(in srgb, ${bg} 80%, transparent))` }} />

      <div className="relative mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center py-16 text-center">
        <motion.div {...fade()} className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {reviews.map((r: string, i: number) => (
            <div key={i} className="text-xs" style={{ color: inkSecond }}>
              <div className="mb-1 flex justify-center gap-0.5">{[0, 1, 2, 3, 4].map((n) => (<Star key={n} size={12} fill={accent} stroke={accent} />))}</div>
              <span className="opacity-70">{I("reviews", reviews, i)}</span>
            </div>
          ))}
        </motion.div>
        <motion.h1 {...fade(0.2)} className="mt-10 break-words text-5xl font-light leading-[1.05] tracking-tight sm:text-7xl">
          {T("headline", "Build software people")}{" "}
          <span className="font-serif italic" style={{ color: accent }}>{T("headlineAccent", "cannot stop using.")}</span>
        </motion.h1>
        <motion.p {...fade(0.4)} className="mt-6 max-w-xl break-words opacity-70" style={{ color: inkSecond }}>{T("subheadline", "Halo Labs is a product engineering studio. We turn ambitious ideas into polished, scalable SaaS, then help it grow.")}</motion.p>
        <motion.div {...fade(0.6)} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="#contact" className="rounded-full px-8 py-3.5 text-sm font-semibold transition hover:scale-[1.02] active:scale-95" style={{ background: accent, color: ink }}>{T("cta", "Start a project")}</a>
          <a href="#projects" className="rounded-full px-8 py-3.5 text-sm font-semibold backdrop-blur transition hover:scale-[1.02] active:scale-95" style={{ background: surface, color: ink }}>{T("ctaSecondary", "View our work")}</a>
        </motion.div>
        <motion.span {...fade(0.8)} className="mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs" style={{ background: surface, color: inkSecond }}><span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />{T("pill", "Now booking engagements for next quarter")}</motion.span>
      </div>

      <motion.div {...fade(0.9)} className="relative mx-auto mb-10 grid w-full max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s: any, i: number) => { const Icon = icons[i % icons.length]; return (
          <div key={i} className="rounded-2xl p-5 backdrop-blur-md transition hover:scale-[1.02] active:scale-95" style={{ background: surface, border: `1px solid ${surface}` }}>
            <div className="flex items-center justify-between"><Icon size={18} style={{ color: accent }} /><span className="font-serif text-2xl italic">{I("stats", stats, i, "value")}</span></div>
            <h3 className="mt-3 break-words text-sm font-semibold">{I("stats", stats, i, "title")}</h3>
            <p className="mt-1 break-words text-xs opacity-60">{I("stats", stats, i, "text")}</p>
          </div>); })}
      </motion.div>
    </section>
  );
}
