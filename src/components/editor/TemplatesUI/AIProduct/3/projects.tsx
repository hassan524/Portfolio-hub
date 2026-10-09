// @ts-nocheck
import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const WORK = [
  { n: "01", t: "Sentinel Vision", tags: "Computer vision · Edge", y: "2025", d: "Real-time defect detection for manufacturing lines, running on-device with a review interface operators trust.", m: [["98.7%", "Precision"], ["40ms", "Latency"], ["-62%", "Waste"]], art: "rings" },
  { n: "02", t: "Atlas Agents", tags: "LLM agents · Workflow", y: "2025", d: "A multi-agent workspace that plans, delegates and verifies work, with a human approval step at every risky action.", m: [["3.4x", "Throughput"], ["12", "Tools wired"], ["0", "Unreviewed deploys"]], art: "graph" },
  { n: "03", t: "Lumen Search", tags: "RAG · Knowledge", y: "2024", d: "Grounded answers over a company's private documents, with citations that point to the exact sentence.", m: [["2.4M", "Docs indexed"], ["91%", "Answer accuracy"], ["<1s", "Response"]], art: "waves" },
  { n: "04", t: "Prism Design Kit", tags: "Design system · UI", y: "2024", d: "A component library and motion language for AI interfaces: streaming text, confidence states, and graceful failure.", m: [["60+", "Components"], ["5", "Products using it"], ["AA", "Accessible"]], art: "grid" },
];

function Art({ kind, accent, ink }: { kind: string; accent: string; ink: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 320 220" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={accent} stopOpacity=".9" /><stop offset="1" stopColor="#8E1840" stopOpacity=".9" /></linearGradient>
      </defs>
      <rect width="320" height="220" rx="18" fill={`url(#${id})`} opacity=".16" />
      {kind === "rings" && [20, 45, 70, 95].map((r, i) => <motion.circle key={r} cx="160" cy="110" r={r} fill="none" stroke={i % 2 ? ink : accent} strokeOpacity=".7" strokeDasharray={i === 2 ? "3 6" : "none"} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.08 }} style={{ transformOrigin: "160px 110px" }} />)}
      {kind === "graph" && (
        <g>
          {[[60, 150, 130, 70], [130, 70, 200, 130], [200, 130, 270, 60], [130, 70, 160, 170], [160, 170, 200, 130]].map(([a, b, c, d], i) => <motion.line key={i} x1={a} y1={b} x2={c} y2={d} stroke={accent} strokeOpacity=".7" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.1 }} />)}
          {[[60, 150], [130, 70], [200, 130], [270, 60], [160, 170]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 1 ? 10 : 6} fill={i === 1 ? accent : ink} />)}
        </g>
      )}
      {kind === "waves" && [0, 1, 2, 3].map((i) => <motion.path key={i} d={`M0,${70 + i * 28} C60,${40 + i * 28} 100,${110 + i * 28} 160,${70 + i * 28} S260,${40 + i * 28} 320,${80 + i * 28}`} fill="none" stroke={i % 2 ? ink : accent} strokeOpacity=".75" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.1 }} />)}
      {kind === "grid" && Array.from({ length: 24 }).map((_, i) => <motion.rect key={i} x={30 + (i % 6) * 46} y={30 + Math.floor(i / 6) * 42} width="32" height="28" rx="7" fill={[2, 9, 14, 21].includes(i) ? accent : "none"} stroke={ink} strokeOpacity=".45" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }} />)}
    </svg>
  );
}

export function AIProduct3Projects({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#140C12";
  const ink = theme?.ink || "#FFFFFF";
  const accent = theme?.accent || "#FF3B76";
  const line = mix(ink, 14);
  const [open, setOpen] = useState(0);

  return (
    <section id="projects" className="relative w-full overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full blur-[170px] pointer-events-none" style={{ background: accent, opacity: 0.14 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-28 sm:py-36">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10" style={{ background: accent }} />
              <Editable as="span" className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: accent }}>(02) Selected work</Editable>
            </div>
            <Editable as="h2" className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.02]" style={{ color: ink }}>Things I've made,<br />and why they matter.</Editable>
          </div>
          <Editable as="p" className="text-sm max-w-xs leading-relaxed" style={{ color: mix(ink, 60) }}>Tap a project to open its story. Each one started with a messy problem and a small team.</Editable>
        </div>

        {/* index list: ruled rows, one open at a time */}
        <div style={{ borderTop: `1px solid ${line}` }}>
          {WORK.map((w, i) => {
            const active = open === i;
            return (
              <div key={w.n} style={{ borderBottom: `1px solid ${line}` }}>
                <button onClick={() => setOpen(active ? -1 : i)} className="group w-full grid grid-cols-12 gap-4 items-center py-7 sm:py-9 text-left cursor-pointer" aria-expanded={active}>
                  <span className="col-span-2 sm:col-span-1 font-mono text-sm" style={{ color: active ? accent : mix(ink, 45) }}>{w.n}</span>
                  <span className="col-span-8 sm:col-span-6 text-2xl sm:text-5xl font-extrabold tracking-tight transition-all duration-300 group-hover:translate-x-2"
                    style={{ color: active ? ink : "transparent", WebkitTextStroke: active ? "0" : `1px ${mix(ink, 70)}` }}>
                    <Editable className="inline">{w.t}</Editable>
                  </span>
                  <Editable as="span" className="hidden sm:block col-span-3 text-xs font-mono uppercase tracking-wider" style={{ color: mix(ink, 55) }}>{w.tags}</Editable>
                  <span className="col-span-2 sm:col-span-2 flex items-center justify-end gap-4">
                    <Editable as="span" className="hidden sm:inline text-xs font-mono" style={{ color: mix(ink, 45) }}>{w.y}</Editable>
                    <span className="h-10 w-10 rounded-full grid place-items-center border transition-all duration-300" style={{ borderColor: active ? accent : line, backgroundColor: active ? accent : "transparent", transform: active ? "rotate(45deg)" : "none" }}>
                      <Plus className="h-4 w-4" />
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="grid lg:grid-cols-12 gap-10 pb-12 sm:pl-[8.33%]">
                        <div className="lg:col-span-6">
                          <Editable as="p" className="text-base sm:text-lg leading-relaxed max-w-md" style={{ color: mix(ink, 78) }}>{w.d}</Editable>
                          <div className="mt-10 flex items-stretch">
                            {w.m.map(([v, l], k) => (
                              <div key={l} className="pr-6 mr-6" style={{ borderRight: k < w.m.length - 1 ? `1px solid ${line}` : "none" }}>
                                <Editable as="div" className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: accent }}>{v}</Editable>
                                <Editable as="div" className="mt-1 text-[10px] uppercase tracking-widest" style={{ color: mix(ink, 50) }}>{l}</Editable>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="lg:col-span-6 aspect-[16/11] max-w-lg lg:ml-auto w-full">
                          <Art kind={w.art} accent={accent} ink={ink} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}