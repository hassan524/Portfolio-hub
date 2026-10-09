// @ts-nocheck
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Sparkles, Video, Volume2, Waves } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#123C35";
  const ink = theme?.ink || "#F1F7E8";
  const accent = theme?.accent || "#D6FF4B";

  const [frequency, setFrequency] = useState(440);
  const [entropy, setEntropy] = useState(0.65);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-8 sm:pt-36 select-none" style={{ backgroundColor: bg, color: ink }}>
      <div className="relative mx-auto max-w-7xl">
        {/* Top Channel Tag */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D6FF4B]">
          <Video size={14} />
          <Editable value={props?.eyebrow || "YOUTUBE CHANNEL & ESSAYS // 850K CREATIVE AUDIENCE"} />
        </div>

        {/* Big, Simple Writing — Straight Aligned */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-6"
        >
          <Editable
            as="h1"
            value={props?.headline || "VIDEOS FOR PEOPLE WHO BUILD, DESIGN, AND CREATE."}
            onChange={(v) => onChange?.({ headline: v })}
            className="text-4xl font-light uppercase leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl max-w-5xl"
          />
        </motion.div>

        {/* Live Audio & Waveform Visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-10 border-t border-b border-[#D6FF4B]/20 py-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#D6FF4B] mb-3">
            <span className="flex items-center gap-2 font-mono">
              <Waves size={14} />
              <span>LIVE AUDIO FREQUENCY MONITOR // {frequency}Hz SINE TONE</span>
            </span>
            <div className="flex items-center gap-4 text-[11px] font-mono text-[#F1F7E8]/70">
              <label className="flex items-center gap-2">
                <span>PITCH:</span>
                <input
                  type="range"
                  min="100"
                  max="880"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="accent-[#D6FF4B] h-1 w-24 cursor-pointer"
                />
              </label>
              <label className="flex items-center gap-2">
                <span>WAVE:</span>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={entropy}
                  onChange={(e) => setEntropy(Number(e.target.value))}
                  className="accent-[#D6FF4B] h-1 w-20 cursor-pointer"
                />
              </label>
            </div>
          </div>

          <div className="h-24 w-full overflow-hidden bg-black/40 rounded-xl p-3 border border-[#D6FF4B]/20">
            <svg viewBox="0 0 1000 100" className="w-full h-full overflow-visible">
              <path
                d={`M 0 50 Q 125 ${50 - (frequency / 14) * entropy}, 250 50 T 500 50 T 750 50 T 1000 50`}
                fill="none"
                stroke="#D6FF4B"
                strokeWidth="2.5"
              />
              <path
                d={`M 0 50 Q 125 ${50 + (frequency / 16) * entropy}, 250 50 T 500 50 T 750 50 T 1000 50`}
                fill="none"
                stroke="rgba(241, 247, 232, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
            </svg>
          </div>
        </motion.div>

        {/* Narrative Split Strip: Straight Clean Alignment */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
        >
          <div>
            <Editable
              as="p"
              value={props?.subheadline || "Independent creator producing weekly video essays, creative hardware teardowns, and masterclasses for 850,000+ designers, developers, and visual artists worldwide."}
              className="text-lg font-light leading-relaxed text-[#F1F7E8]/85 sm:text-xl"
            />

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#D6FF4B] px-7 py-3.5 text-xs font-bold uppercase text-[#123C35] hover:scale-105 transition shadow-[0_0_20px_rgba(214,255,75,0.2)]"
              >
                <span>Watch Latest Videos</span>
                <ArrowUpRight size={15} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-xs font-bold uppercase text-white hover:border-[#D6FF4B] hover:text-[#D6FF4B] transition"
              >
                <span>Channel Media Kit</span>
              </a>
            </div>
          </div>

          <div className="border-l border-[#D6FF4B]/30 pl-6 space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">SUBSCRIBER COMMUNITY:</span>
              <span className="text-[#D6FF4B] font-bold">850,000 CREATORS</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-white/60">TOTAL VIDEO PLAYS:</span>
              <span className="text-white font-bold">18.2M VIEWS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">SPONSORSHIPS:</span>
              <span className="text-[#D6FF4B] font-bold">BOOKING Q3 & Q4</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
