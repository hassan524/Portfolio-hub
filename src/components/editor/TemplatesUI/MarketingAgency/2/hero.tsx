// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, MoveRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const stats = props?.stats || [
    { value: "140+", label: "Brands launched" },
    { value: "9 yrs", label: "In the lab" },
    { value: "3.2x", label: "Avg. ROI achieved" },
  ];
  const setStat = (i, k, v) => onChange?.({ stats: stats.map((s, j) => (j === i ? { ...s, [k]: v } : s)) });

  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-12 pt-36" style={{ background: `radial-gradient(120% 80% at 50% 0%, ${bgSecond}, ${bg})`, color: ink }}>
      {/* Ambient Lighting & Orbiting Geometry */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[160px]" style={{ background: accent }} />
      <div className="pointer-events-none absolute -right-20 top-20 hidden h-[44rem] w-[44rem] lg:block">
        {[1, 0.78, 0.56].map((s, i) => (
          <motion.div
            key={i}
            animate={{ rotate: i % 2 ? -360 : 360 }}
            transition={{ duration: 45 + i * 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 m-auto rounded-full border border-dashed"
            style={{ width: `${s * 100}%`, height: `${s * 100}%`, borderColor: surface }}
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full" style={{ background: accent }} />
          </motion.div>
        ))}
        <img
          src={props?.heroImage || "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=900&q=80"}
          alt=""
          className="absolute inset-0 m-auto h-[46%] w-[46%] rounded-full object-cover opacity-85 shadow-2xl"
        />
      </div>

      {/* Main Hero Typography Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.2em]" style={{ background: surface, borderColor: surface }}>
              <Sparkles size={13} style={{ color: accent }} />
              <Editable as="span" value={props?.pill || "A digital innovation lab"} onChange={(v) => onChange?.({ pill: v })} />
            </span>
          </motion.div>

          {/* MONUMENTAL DISPLAY TEXT */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }} className="mt-8">
            <Editable
              as="h1"
              className="break-words text-[clamp(3.8rem,12.5vw,12rem)] font-extralight italic leading-[0.84] tracking-tighter"
              value={props?.headline || "Lumora Labs"}
              onChange={(v) => onChange?.({ headline: v })}
            />
            <Editable
              as="div"
              className="mt-3 break-words text-[clamp(2rem,6vw,5.5rem)] font-light uppercase tracking-tight"
              style={{ color: inkSecond }}
              value={props?.tagline || "Fueling Digital Growth"}
              onChange={(v) => onChange?.({ tagline: v })}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
            <Editable
              as="p"
              className="mt-8 max-w-xl text-lg font-light leading-relaxed md:text-xl"
              style={{ color: inkSecond }}
              value={props?.subheadline || "We help ambitious brands move from idea to impact with strategy, design and engineering under one roof."}
              onChange={(v) => onChange?.({ subheadline: v })}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-wide transition hover:scale-105 active:scale-95"
              style={{ background: accent, color: bg }}
            >
              <Editable as="span" value={props?.cta || "Explore services"} onChange={(v) => onChange?.({ cta: v })} />
              <ArrowUpRight size={18} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-light backdrop-blur-md transition hover:scale-105 active:scale-95"
              style={{ background: surface, borderColor: surface }}
            >
              <Editable as="span" value={props?.secondary || "Meet the lab"} onChange={(v) => onChange?.({ secondary: v })} />
              <MoveRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Full-Bleed Architectural Baseline (NO small floating card boxes!) */}
      <div className="relative z-10 mx-auto mt-20 w-full max-w-7xl border-t pt-8" style={{ borderColor: surface }}>
        <div className="grid gap-8 divide-y lg:grid-cols-12 lg:divide-x lg:divide-y-0" style={{ borderColor: surface }}>
          <div className="lg:col-span-5 lg:pr-8">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              <Editable as="span" className="text-xs uppercase tracking-[0.25em]" style={{ color: accent }} value={props?.capTitle || "Studio Capabilities"} onChange={(v) => onChange?.({ capTitle: v })} />
            </div>
            <Editable as="p" className="mt-2 text-base font-light leading-relaxed" style={{ color: inkSecond }} value={props?.capText || "Strategy, product, brand, growth and data seamlessly integrated in London."} onChange={(v) => onChange?.({ capText: v })} />
          </div>
          {stats.map((s, i) => (
            <div key={i} className="pt-4 lg:col-span-2 lg:pl-8 lg:pt-0" style={{ borderColor: surface }}>
              <span className="font-mono text-xs font-light tracking-widest opacity-50">0{i + 1}</span>
              <Editable as="div" className="mt-1 text-4xl font-extralight italic md:text-5xl" value={s.value} onChange={(v) => setStat(i, "value", v)} />
              <Editable as="div" className="mt-1 text-xs font-light uppercase tracking-wider" style={{ color: inkSecond }} value={s.label} onChange={(v) => setStat(i, "label", v)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
