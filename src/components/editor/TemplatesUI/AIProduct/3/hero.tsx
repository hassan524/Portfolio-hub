// @ts-nocheck
import { useId } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const SKILLS = ["Machine Learning", "Product Design", "LLM Agents", "Computer Vision", "Design Systems", "RAG Pipelines", "Prototyping", "TypeScript"];
const FACTS = [
  { v: "6+", l: "Years building" },
  { v: "40", l: "Products shipped" },
  { v: "12", l: "AI launches" },
];

function OrbitScene({ ink, accent, bg }: { ink: string; accent: string; bg: string }) {
  const id = useId();
  const rings = [
    { r: 110, d: 26, dir: 1, dots: [[0, 1], [180, 0.7]] },
    { r: 170, d: 40, dir: -1, dots: [[60, 1], [250, 0.7]] },
    { r: 228, d: 58, dir: 1, dots: [[130, 1], [320, 0.7]] },
  ];
  return (
    <svg viewBox="-260 -260 520 520" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id={`${id}c`} cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#FF9DB8" /><stop offset="0.55" stopColor={accent} /><stop offset="1" stopColor="#8E1840" />
        </radialGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor={accent} stopOpacity=".55" /><stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={accent} stopOpacity="0" /><stop offset="1" stopColor={accent} stopOpacity=".9" />
        </linearGradient>
      </defs>

      <circle r="150" fill={`url(#${id}g)`} />
      {/* crosshair */}
      <line x1="-250" x2="250" y1="0" y2="0" stroke={ink} strokeOpacity=".08" />
      <line y1="-250" y2="250" x1="0" x2="0" stroke={ink} strokeOpacity=".08" />

      {rings.map((g, i) => (
        <motion.g key={i} animate={{ rotate: 360 * g.dir }} transition={{ repeat: Infinity, duration: g.d, ease: "linear" }}>
          <circle r={g.r} fill="none" stroke={ink} strokeOpacity={0.18 - i * 0.03} strokeDasharray={i === 1 ? "2 7" : "none"} />
          {g.dots.map(([a, o], k) => {
            const x = Math.cos((a * Math.PI) / 180) * g.r, y = Math.sin((a * Math.PI) / 180) * g.r;
            return (
              <g key={k}>
                <circle cx={x} cy={y} r={k ? 4 : 7} fill={k ? ink : accent} opacity={o} />
                {!k && <circle cx={x} cy={y} r="14" fill="none" stroke={accent} strokeOpacity=".4" />}
              </g>
            );
          })}
        </motion.g>
      ))}

      {/* radar sweep */}
      <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 9, ease: "linear" }}>
        <path d="M0,0 L228,0 A228,228 0 0 0 190,-126 Z" fill={`url(#${id}s)`} opacity=".22" />
        <line x1="0" y1="0" x2="228" y2="0" stroke={accent} strokeOpacity=".7" />
      </motion.g>

      {/* core */}
      <motion.circle r="62" fill={`url(#${id}c)`} animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
      <circle r="62" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" />
      <text y="14" textAnchor="middle" fontSize="40" fontWeight="800" fill="#fff" fontFamily="Inter, system-ui, sans-serif">AI</text>
      <ellipse cx="-22" cy="-30" rx="26" ry="11" fill="#fff" opacity=".22" transform="rotate(-25 -22 -30)" />
    </svg>
  );
}

export function AIProduct3Hero({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#140C12";
  const ink = theme?.ink || "#FFFFFF";
  const accent = theme?.accent || "#FF3B76";
  const line = mix(ink, 12);

  const rise = (d = 0) => ({
    initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
  });
  const chip = "absolute px-3.5 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-md border";

  return (
    <section id="home" className="relative w-full overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="absolute -top-24 right-0 w-[760px] h-[760px] rounded-full blur-[170px] pointer-events-none" style={{ background: accent, opacity: 0.2 }} />
      <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full blur-[150px] pointer-events-none" style={{ background: "#7E183E", opacity: 0.35 }} />

      {/* vertical rail text */}
      <div className="hidden xl:block absolute left-5 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] font-mono tracking-[0.35em] uppercase whitespace-nowrap" style={{ color: mix(ink, 40) }}>
        <Editable className="inline">Portfolio — {new Date().getFullYear()}</Editable>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 pt-14 pb-16 lg:pt-20 grid lg:grid-cols-12 gap-10 items-center">
        {/* left: copy, left-aligned */}
        <div className="lg:col-span-7">
          <motion.div {...rise(0)} className="flex items-center gap-4 mb-8">
            <span className="h-px w-12" style={{ background: accent }} />
            <Editable as="span" className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: accent }}>AI engineer & product designer</Editable>
          </motion.div>

          <motion.h1 {...rise(0.08)} className="font-extrabold tracking-tight leading-[0.95] text-[2.75rem] sm:text-7xl xl:text-[5.5rem]" style={{ color: ink }}>
            <Editable className="block">I build AI</Editable>
            <Editable className="block">products that</Editable>
            <span className="block relative w-fit">
              <Editable className="inline" style={{ color: accent }}>feel human.</Editable>
              <svg className="absolute left-0 -bottom-2 w-full h-3" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                <motion.path d="M2 8 Q 75 1 150 6 T 298 5" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8, ease: "easeOut" }} />
              </svg>
            </span>
          </motion.h1>

          <motion.div {...rise(0.18)}>
            <Editable as="p" className="mt-9 max-w-lg text-base sm:text-lg leading-relaxed" style={{ color: mix(ink, 70) }}>
              Designer and engineer turning machine learning into calm, useful interfaces. From first sketch to production model, I own the whole journey.
            </Editable>
          </motion.div>

          <motion.div {...rise(0.26)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button onClick={() => go("projects")} className="group inline-flex items-center gap-3 pl-7 pr-3 py-3 rounded-full text-sm font-bold cursor-pointer transition-transform hover:scale-[1.03] active:scale-95"
              style={{ background: `linear-gradient(135deg, ${accent}, #E0265F)`, color: "#fff", boxShadow: `0 10px 36px ${mix(accent, 45)}` }}>
              <Editable className="inline">See selected work</Editable>
              <span className="h-9 w-9 rounded-full grid place-items-center bg-white/20 transition-transform group-hover:translate-y-0.5"><ArrowDownRight className="h-4 w-4" /></span>
            </button>
            <button onClick={() => go("contact")} className="relative text-sm font-semibold cursor-pointer group" style={{ color: ink }}>
              <Editable className="inline">Say hello</Editable>
              <span className="absolute -bottom-1 left-0 h-px w-full transition-all group-hover:h-0.5" style={{ background: accent }} />
            </button>
          </motion.div>

          {/* inline facts divided by hairlines, no boxes */}
          <motion.div {...rise(0.34)} className="mt-14 flex items-stretch">
            {FACTS.map((f, i) => (
              <div key={f.l} className="pr-8 mr-8" style={{ borderRight: i < FACTS.length - 1 ? `1px solid ${line}` : "none" }}>
                <Editable as="div" className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: ink }}>{f.v}</Editable>
                <Editable as="div" className="mt-1 text-[11px] uppercase tracking-widest" style={{ color: mix(ink, 50) }}>{f.l}</Editable>
              </div>
            ))}
          </motion.div>
        </div>

        {/* right: orbit illustration */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative aspect-square w-full max-w-[520px] mx-auto lg:ml-auto">
          <OrbitScene ink={ink} accent={accent} bg={bg} />

          <motion.span animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className={`${chip} top-[10%] left-[2%]`} style={{ borderColor: mix(accent, 40), backgroundColor: mix(bg, 60), color: ink }}>
            <Editable className="inline">Vision models</Editable>
          </motion.span>
          <motion.span animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className={`${chip} top-[28%] right-[0%]`} style={{ borderColor: mix(accent, 40), backgroundColor: mix(bg, 60), color: ink }}>
            <Editable className="inline">Autonomous agents</Editable>
          </motion.span>
          <motion.span animate={{ y: [0, -7, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className={`${chip} bottom-[14%] left-[6%]`} style={{ borderColor: mix(accent, 40), backgroundColor: mix(bg, 60), color: ink }}>
            <Editable className="inline">RAG systems</Editable>
          </motion.span>
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            className={`${chip} bottom-[6%] right-[8%]`} style={{ backgroundColor: accent, borderColor: accent, color: "#fff" }}>
            <Editable className="inline">Interface design</Editable>
          </motion.span>
        </motion.div>
      </div>

      {/* marquee of skills */}
      <div className="relative border-y overflow-hidden py-5" style={{ borderColor: line }}>
        <motion.div className="flex w-max items-center gap-10 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 34, ease: "linear" }}>
          {[...SKILLS, ...SKILLS].map((s, i) => (
            <span key={i} className="flex items-center gap-10 text-lg sm:text-2xl font-bold tracking-tight uppercase" style={{ color: i % 2 ? mix(ink, 85) : "transparent", WebkitTextStroke: i % 2 ? "0" : `1px ${mix(ink, 55)}` }}>
              <Editable className="inline">{s}</Editable>
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden><path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" fill={accent} /></svg>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}