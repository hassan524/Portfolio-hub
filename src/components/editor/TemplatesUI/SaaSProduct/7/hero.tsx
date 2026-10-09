// @ts-nocheck
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const stats = props?.stats || [
    { value: "52", label: "SaaS products launched" },
    { value: "7 weeks", label: "average time to first release" },
    { value: "$310M", label: "raised by teams we built for" },
    { value: "21", label: "specialists in the studio" },
  ];
  const setStat = (i: number, k: string, v: string) => onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [k]: v } : s)) });
  const go = (e: any, href: string) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <section id="home" className="relative overflow-hidden px-6 pb-24 pt-20 lg:pt-28" style={{ backgroundColor: bg }}>
      <div className="pointer-events-none absolute left-1/2 top-40 h-[460px] w-[760px] -translate-x-1/2 rounded-full opacity-[0.13] blur-3xl" style={{ backgroundColor: accent }} />
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mx-auto max-w-4xl text-center">
          <Editable as="h1" value={props?.headline || "The product studio for SaaS teams that want to launch with confidence"} onChange={(v: string) => onChange?.({ headline: v })} className="break-words font-['Newsreader'] text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl" style={{ color: ink }} />
          <Editable as="p" value={props?.subheadline || "Halden Labs designs, builds and launches software products. Our small senior team takes you from validated idea to live product in weeks, not quarters."} onChange={(v: string) => onChange?.({ subheadline: v })} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed" style={{ color: inkSecond }} />
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#contact" onClick={(e) => go(e, "#contact")} className="rounded-xl px-7 py-4 font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
              <Editable as="span" value={props?.primaryCta || "Book an intro call"} onChange={(v: string) => onChange?.({ primaryCta: v })} />
            </a>
            <a href="#projects" onClick={(e) => go(e, "#projects")} className="inline-flex items-center gap-2 rounded-xl border px-7 py-4 font-medium transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: surface, borderColor: surface, color: ink }}>
              <Play size={16} />
              <Editable as="span" value={props?.secondaryCta || "Browse our projects"} onChange={(v: string) => onChange?.({ secondaryCta: v })} />
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }} className="relative mt-16">
          <div className="rounded-3xl border p-2 sm:p-3" style={{ backgroundColor: surface, borderColor: surface }}>
            <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: bgSecond }}>
              <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: surface }}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: inkSecond, opacity: 0.5 }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: inkSecond, opacity: 0.5 }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: inkSecond, opacity: 0.5 }} />
                <Editable as="span" value={props?.browserLabel || "app.yourproduct.com/dashboard"} onChange={(v: string) => onChange?.({ browserLabel: v })} className="ml-3 truncate rounded-md px-3 py-1 text-xs" style={{ backgroundColor: surface, color: inkSecond }} />
              </div>
              <img src={props?.heroImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"} alt="Product dashboard we designed" className="aspect-[16/8] w-full object-cover" />
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border lg:grid-cols-4" style={{ backgroundColor: surface, borderColor: surface }}>
          {stats.map((s: any, i: number) => (
            <div key={i} className="min-w-0 p-6" style={{ backgroundColor: bg }}>
              <Editable as="p" value={s.value} onChange={(v: string) => setStat(i, "value", v)} className="font-['Newsreader'] text-3xl font-medium sm:text-4xl" style={{ color: ink }} />
              <Editable as="p" value={s.label} onChange={(v: string) => setStat(i, "label", v)} className="mt-1 text-sm" style={{ color: inkSecond }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
