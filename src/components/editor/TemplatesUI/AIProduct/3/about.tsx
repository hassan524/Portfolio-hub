// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const DISCIPLINES = [
  { n: "01", t: "Applied machine learning", d: "Training, fine-tuning and evaluating models that hold up outside the notebook." },
  { n: "02", t: "Interface & interaction design", d: "Calm, legible interfaces that make probabilistic systems feel trustworthy." },
  { n: "03", t: "Agentic workflows", d: "Multi-step agents with guardrails, memory and a human always in the loop." },
  { n: "04", t: "Full-stack delivery", d: "Typed APIs, data pipelines and production deploys, shipped by one person." },
];
const TIMELINE = [
  { y: "2023 — now", r: "Lead AI Product Engineer", o: "Sceneland Labs" },
  { y: "2020 — 2023", r: "Senior Product Designer", o: "Nornole" },
  { y: "2018 — 2020", r: "Machine Learning Engineer", o: "Walker Tech" },
];

export function AIProduct3About({ theme }: BlockComponentProps<any>) {
  const bg2 = theme?.["bg-second"] || "#FFF5F8";
  const ink2 = theme?.["ink-second"] || "#1E0C17";
  const accent = theme?.accent || "#FF3B76";
  const line = mix(ink2, 14);
  const fade = (d = 0) => ({
    initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" }, transition: { duration: 0.6, delay: d },
  });

  return (
    <section id="about" className="relative w-full overflow-hidden transition-colors" style={{ backgroundColor: bg2, color: ink2 }}>
      {/* oversized ghost numeral */}
      <div className="absolute -top-10 right-4 sm:right-12 text-[16rem] sm:text-[24rem] font-black leading-none select-none pointer-events-none" style={{ color: mix(accent, 7) }} aria-hidden>01</div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-28 sm:py-36">
        <div className="grid lg:grid-cols-12 gap-14">
          {/* sticky label column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <motion.div {...fade()} className="flex items-center gap-3 mb-6">
                <span className="h-px w-10" style={{ background: accent }} />
                <Editable as="span" className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: accent }}>(01) About</Editable>
              </motion.div>
              <motion.div {...fade(0.08)}>
                <Editable as="p" className="text-sm leading-relaxed max-w-xs" style={{ color: mix(ink2, 65) }}>
                  Based remotely, working with teams and founders who care about the details behind intelligent products.
                </Editable>
              </motion.div>
              <motion.svg {...fade(0.16)} viewBox="0 0 160 160" className="mt-10 w-40 h-40" aria-hidden>
                <circle cx="80" cy="80" r="70" fill="none" stroke={accent} strokeOpacity=".35" strokeDasharray="3 6" />
                <circle cx="80" cy="80" r="46" fill="none" stroke={ink2} strokeOpacity=".15" />
                <circle cx="80" cy="80" r="20" fill={accent} />
                <circle cx="132" cy="48" r="5" fill={ink2} />
                <circle cx="34" cy="112" r="4" fill={accent} />
              </motion.svg>
            </div>
          </div>

          {/* content column */}
          <div className="lg:col-span-8">
            <motion.h2 {...fade()} className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.15]" style={{ color: ink2 }}>
              <Editable className="inline">I sit between </Editable>
              <Editable className="inline" style={{ color: accent }}>research</Editable>
              <Editable className="inline"> and </Editable>
              <Editable className="inline" style={{ color: accent }}>craft</Editable>
              <Editable className="inline">, shaping machine intelligence into products people actually want to use, trust and come back to.</Editable>
            </motion.h2>

            {/* disciplines as ruled rows */}
            <div className="mt-20">
              {DISCIPLINES.map((d, i) => (
                <motion.div key={d.n} {...fade(i * 0.05)} className="group grid grid-cols-12 gap-4 items-baseline py-7 transition-colors" style={{ borderTop: `1px solid ${line}`, borderBottom: i === DISCIPLINES.length - 1 ? `1px solid ${line}` : "none" }}>
                  <span className="col-span-2 sm:col-span-1 font-mono text-sm transition-colors" style={{ color: accent }}>{d.n}</span>
                  <Editable as="h3" className="col-span-10 sm:col-span-5 text-xl sm:text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1.5" style={{ color: ink2 }}>{d.t}</Editable>
                  <Editable as="p" className="col-span-12 sm:col-span-6 text-sm leading-relaxed sm:pl-4" style={{ color: mix(ink2, 65) }}>{d.d}</Editable>
                </motion.div>
              ))}
            </div>

            {/* timeline: a single line with nodes */}
            <div className="mt-24">
              <Editable as="div" className="text-xs font-mono tracking-[0.25em] uppercase mb-8" style={{ color: mix(ink2, 50) }}>Experience</Editable>
              <div className="relative">
                <div className="absolute left-0 right-0 top-[7px] h-px" style={{ background: line }} />
                <div className="grid sm:grid-cols-3 gap-10">
                  {TIMELINE.map((t, i) => (
                    <motion.div key={t.y} {...fade(i * 0.08)} className="relative pt-9">
                      <span className="absolute top-0 left-0 h-[15px] w-[15px] rounded-full border-2" style={{ backgroundColor: i === 0 ? accent : bg2, borderColor: accent }} />
                      <Editable as="div" className="text-xs font-mono mb-2" style={{ color: accent }}>{t.y}</Editable>
                      <Editable as="div" className="font-bold text-base leading-snug" style={{ color: ink2 }}>{t.r}</Editable>
                      <Editable as="div" className="text-sm mt-1" style={{ color: mix(ink2, 60) }}>{t.o}</Editable>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}