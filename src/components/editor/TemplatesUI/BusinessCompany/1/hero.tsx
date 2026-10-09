// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, TrendingDown } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const stats = props?.stats || [
    { value: "240+", label: "Companies advised" },
    { value: "38%", label: "Average cost reduction" },
    { value: "12 yrs", label: "In practice" },
  ];

  const updateStat = (i: number, key: string, v: string) =>
    onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [key]: v } : s)) });

  const fade = {
    hidden: { opacity: 0, y: 28 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
  };

  return (
    <section id="home" className="relative overflow-hidden" style={{ backgroundColor: bg }}>
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ backgroundColor: accent, opacity: 0.14 }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-12 lg:pb-28 lg:pt-20">
        <div className="lg:col-span-6">
          <motion.div custom={0} variants={fade} initial="hidden" animate="show" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            <span className="text-sm font-semibold" style={{ color: inkSecond }}>
              <Editable
                value={props?.status || "Sustainability consulting for growing companies"}
                onChange={(v: string) => onChange?.({ status: v })}
              />
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ color: ink }}
          >
            <Editable
              value={props?.headline || "Run a business that is"}
              onChange={(v: string) => onChange?.({ headline: v })}
            />{" "}
            <span style={{ color: accent }}>
              <Editable
                value={props?.headlineAccent || "greener and stronger"}
                onChange={(v: string) => onChange?.({ headlineAccent: v })}
              />
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: inkSecond }}
          >
            <Editable
              value={
                props?.subheadline ||
                "We help operations, finance and leadership teams cut waste, measure what matters and turn sustainability into a measurable advantage."
              }
              onChange={(v: string) => onChange?.({ subheadline: v })}
            />
          </motion.p>

          <motion.div custom={3} variants={fade} initial="hidden" animate="show" className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: accent, color: bg }}
            >
              <Editable
                value={props?.primaryCta || "Book a consultation"}
                onChange={(v: string) => onChange?.({ primaryCta: v })}
              />
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: surface, color: ink }}
            >
              <PlayCircle className="h-4 w-4" />
              <Editable
                value={props?.secondaryCta || "Explore our services"}
                onChange={(v: string) => onChange?.({ secondaryCta: v })}
              />
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-12 grid max-w-xl grid-cols-3 gap-4 pt-8"
            style={{ borderTop: `1px solid ${surface}` }}
          >
            {stats.map((s: any, i: number) => (
              <div key={i}>
                <div className="text-3xl font-extrabold tracking-tight" style={{ color: ink }}>
                  <Editable value={s.value} onChange={(v: string) => updateStat(i, "value", v)} />
                </div>
                <div className="mt-1 text-xs font-medium leading-snug" style={{ color: inkSecond }}>
                  <Editable value={s.label} onChange={(v: string) => updateStat(i, "label", v)} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-6">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="row-span-2 overflow-hidden rounded-[2rem]"
              style={{ backgroundColor: surface }}
            >
              <img
                src={props?.heroImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"}
                alt="Consulting team at work"
                className="h-full min-h-[22rem] w-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col justify-between rounded-[2rem] p-6"
              style={{ backgroundColor: accent, color: bg }}
            >
              <svg viewBox="0 0 120 120" fill="none" className="h-24 w-24" aria-hidden="true">
                <path d="M60 104V50" strokeWidth="4" strokeLinecap="round" style={{ stroke: bg }} />
                <path d="M60 64C60 42 42 30 22 32c-2 22 10 38 38 32Z" style={{ fill: bg }} />
                <path d="M60 54C60 32 78 20 98 22c2 22-10 38-38 32Z" style={{ fill: bg, opacity: 0.7 }} />
              </svg>
              <div>
                <div className="text-2xl font-extrabold leading-tight">
                  <Editable
                    value={props?.tileTitle || "Net zero roadmaps that hold up"}
                    onChange={(v: string) => onChange?.({ tileTitle: v })}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="rounded-[2rem] p-6"
              style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: surface, color: accent }}
              >
                <TrendingDown className="h-5 w-5" />
              </span>
              <div className="mt-4 text-4xl font-extrabold tracking-tight" style={{ color: ink }}>
                <Editable
                  value={props?.tileStat || "-42%"}
                  onChange={(v: string) => onChange?.({ tileStat: v })}
                />
              </div>
              <div className="mt-1 text-sm font-medium" style={{ color: inkSecond }}>
                <Editable
                  value={props?.tileStatLabel || "Energy spend after our retrofit program"}
                  onChange={(v: string) => onChange?.({ tileStatLabel: v })}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
