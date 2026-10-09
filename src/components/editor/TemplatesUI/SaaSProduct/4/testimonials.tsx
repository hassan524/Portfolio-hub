// @ts-nocheck
import { motion } from "framer-motion";
import { Star, Award, ShieldCheck, Clock } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const img = (id: string, w = 300) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const rise = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 } };
const badgeIcons = [Award, ShieldCheck, Clock];

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#F2542D";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const stats = props?.stats || [{ value: "4.9", label: "Average review score" }, { value: "40+", label: "Products launched" }, { value: "98%", label: "Client retention" }, { value: "12", label: "Industry awards" }];
  const quotes = props?.quotes || [
    { quote: "Halo Labs rebuilt our platform without a single minute of downtime. Our engineers finally enjoy working in the codebase, and customers noticed the speed within a week.", name: "Priya Nair", role: "CTO, Ledgerly", image: img("photo-1573496359142-b8d87734a5a2") },
    { quote: "From napkin sketch to paying customers in six weeks.", name: "Tom Becker", role: "Founder, Routeway", image: img("photo-1507003211169-0a1dd7228f2d") },
    { quote: "The design system alone saved us months of rework.", name: "Elena Rossi", role: "VP Product, Careline", image: img("photo-1438761681033-6461ffad8d80") },
  ];
  const badges = props?.badges || ["Top engineering studio 2026", "SOC 2 aligned process", "Weekly delivery guarantee"];
  const stars = (
    <div className="flex gap-1">{[0, 1, 2, 3, 4].map((n) => (<Star key={n} size={14} fill={accent} stroke={accent} />))}</div>
  );
  return (
    <section id="testimonials" className="px-6 py-28 md:py-36" style={{ background: bgSecond, color: ink }}>
      <div className="mx-auto max-w-6xl">
        <motion.h2 {...rise} className="mx-auto max-w-2xl break-words text-center text-4xl font-light tracking-tight md:text-5xl">{T("title", "Trusted by founders who")} <span className="font-serif italic" style={{ color: accent }}>{T("titleAccent", "ship")}</span></motion.h2>
        <motion.div {...rise} className="mt-14 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s: any, i: number) => (
            <div key={i} className="px-6 py-6 text-center" style={{ borderLeft: i === 0 ? "none" : `1px solid ${surface}` }}>
              <div className="font-serif text-5xl italic">{I("stats", stats, i, "value")}</div>
              <div className="mt-1 break-words text-xs uppercase tracking-widest opacity-60">{I("stats", stats, i, "label")}</div>
            </div>
          ))}
        </motion.div>
        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          <motion.div {...rise} className="relative overflow-hidden rounded-[2rem] p-8 md:p-12 lg:col-span-3" style={{ background: surface }}>
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl" style={{ background: `color-mix(in srgb, ${accent} 35%, transparent)` }} />
            <div className="relative">
              {stars}
              <p className="mt-6 break-words font-serif text-2xl italic leading-relaxed md:text-3xl">{I("quotes", quotes, 0, "quote")}</p>
              <div className="mt-8 flex items-center gap-4"><img src={quotes[0].image} alt="" className="h-14 w-14 rounded-full object-cover" /><div className="min-w-0"><div className="break-words font-medium">{I("quotes", quotes, 0, "name")}</div><div className="break-words text-sm opacity-60">{I("quotes", quotes, 0, "role")}</div></div></div>
            </div>
          </motion.div>
          <div className="grid gap-5 lg:col-span-2">
            {quotes.slice(1).map((q: any, k: number) => { const i = k + 1; return (
              <motion.div key={i} {...rise} className="rounded-[2rem] p-7 transition hover:scale-[1.02] active:scale-95" style={{ background: surface }}>
                {stars}
                <p className="mt-4 break-words">{I("quotes", quotes, i, "quote")}</p>
                <div className="mt-5 flex items-center gap-3"><img src={q.image} alt="" className="h-10 w-10 rounded-full object-cover" /><div className="min-w-0"><div className="break-words text-sm font-medium">{I("quotes", quotes, i, "name")}</div><div className="break-words text-xs opacity-60">{I("quotes", quotes, i, "role")}</div></div></div>
              </motion.div>); })}
          </div>
        </div>
        <motion.div {...rise} className="mt-12 flex flex-wrap justify-center gap-3">
          {badges.map((b: string, i: number) => { const Icon = badgeIcons[i % badgeIcons.length]; return (
            <span key={i} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm" style={{ background: surface }}><Icon size={15} style={{ color: accent }} />{I("badges", badges, i)}</span>); })}
        </motion.div>
      </div>
    </section>
  );
}
