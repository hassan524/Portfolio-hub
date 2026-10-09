// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowRight, Play, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const avatars = props?.avatars || [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80",
  ];
  const stats = props?.stats || [
    { value: "24K", label: "Happy clients" },
    { value: "480+", label: "Launches shipped" },
    { value: "12x", label: "Average growth" },
  ];
  const setStat = (i, k, v) => onChange?.({ stats: stats.map((s, j) => (j === i ? { ...s, [k]: v } : s)) });
  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-between overflow-hidden pb-8 pt-28" style={{ background: `linear-gradient(180deg, ${bg}, ${bgSecond})`, color: ink }}>
      <div className="absolute inset-0">
        <img src={props?.heroImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&q=80"} alt="" className="h-full w-full object-cover object-top opacity-70 lg:object-center" />
        <div className="absolute inset-0 mix-blend-multiply" style={{ background: `linear-gradient(180deg, transparent 20%, ${accent})` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${bg} 0%, transparent 25%, transparent 60%, ${bg} 100%)` }} />
        <div className="absolute -left-40 top-1/3 h-[32rem] w-[32rem] rounded-full opacity-40 blur-[120px]" style={{ background: accent }} />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-12">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="lg:col-span-4">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-md" style={{ background: surface, borderColor: surface }}>
            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
            <Editable as="span" value={props?.pill || "Digital growth studio"} onChange={(v) => onChange?.({ pill: v })} />
          </span>
          <Editable as="p" className="max-w-xs text-base leading-relaxed" style={{ color: inkSecond }} value={props?.subheadline || "Data-driven strategies and creative execution built to grow brands and deliver measurable results."} onChange={(v) => onChange?.({ subheadline: v })} />
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((a, i) => <img key={i} src={a} alt="" className="h-11 w-11 rounded-full border-2 object-cover" style={{ borderColor: bg }} />)}
            </div>
            <div>
              <Editable as="div" className="text-3xl font-black leading-none" value={stats[0].value} onChange={(v) => setStat(0, "value", v)} />
              <Editable as="div" className="text-xs" style={{ color: inkSecond }} value={stats[0].label} onChange={(v) => setStat(0, "label", v)} />
            </div>
          </div>
        </motion.div>
        <motion.a href="#contact" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="group block self-start rounded-3xl border p-3 backdrop-blur-xl transition hover:scale-[1.02] active:scale-95 lg:col-span-3 lg:col-start-10" style={{ background: surface, borderColor: surface }}>
          <img src={props?.cardImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"} alt="" className="h-40 w-full rounded-2xl object-cover" />
          <div className="flex items-center justify-between px-2 pb-1 pt-4">
            <Editable as="span" className="font-extrabold uppercase tracking-tight" value={props?.cardTitle || "Free consultation"} onChange={(v) => onChange?.({ cardTitle: v })} />
            <span className="grid h-9 w-9 place-items-center rounded-full transition group-hover:rotate-45" style={{ background: accent, color: bg }}><ArrowUpRight size={16} /></span>
          </div>
        </motion.a>
      </div>
      <div className="relative z-10 px-2 text-center">
        <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
          <Editable as="h1" className="break-words text-[clamp(3rem,13.5vw,13rem)] font-black uppercase leading-[0.82] tracking-tighter" value={props?.headline || "Digital Power"} onChange={(v) => onChange?.({ headline: v })} />
        </motion.div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#projects" className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-bold transition hover:scale-[1.02] active:scale-95" style={{ background: accent, color: bg }}>
            <Editable as="span" value={props?.cta || "View our work"} onChange={(v) => onChange?.({ cta: v })} /> <ArrowRight size={18} />
          </a>
          <a href="#about" className="inline-flex items-center gap-2 rounded-full border px-6 py-4 font-semibold backdrop-blur-md transition hover:scale-[1.02] active:scale-95" style={{ background: surface, borderColor: surface }}>
            <Play size={16} /> <Editable as="span" value={props?.secondary || "Our story"} onChange={(v) => onChange?.({ secondary: v })} />
          </a>
          {stats.slice(1).map((s, i) => (
            <div key={i} className="hidden rounded-full border px-5 py-3 text-left sm:block" style={{ background: surface, borderColor: surface }}>
              <Editable as="span" className="mr-2 font-black" style={{ color: accent }} value={s.value} onChange={(v) => setStat(i + 1, "value", v)} />
              <Editable as="span" className="text-xs" style={{ color: inkSecond }} value={s.label} onChange={(v) => setStat(i + 1, "label", v)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
