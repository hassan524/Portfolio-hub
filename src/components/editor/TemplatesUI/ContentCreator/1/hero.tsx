// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clapperboard, Disc, Eye, Film, Play, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A0A5B5";
  const accent = theme?.accent || "#7DD3FC";

  const [clapped, setClapped] = useState(false);

  const headlineText = props?.headline || "FILMS & VIDEO ESSAYS THAT KEEP AUDIENCES WATCHING.";
  const headlineWords = headlineText.split(" ");

  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-4 pb-32 pt-24 sm:px-8 sm:pt-32" style={{ backgroundColor: bg, color: ink }}>
      {/* Ambient Light Leak Animation */}
      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.1, 1],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#7DD3FC]/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Interactive Film Clapper Slate Banner */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          onClick={() => setClapped(!clapped)}
          className="group cursor-pointer mx-auto mb-10 flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-white/80 backdrop-blur-md hover:border-[#7DD3FC] hover:bg-white/10 transition"
        >
          <motion.div
            animate={{ rotate: clapped ? [0, -25, 0] : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="flex items-center text-[#7DD3FC]"
          >
            <Clapperboard size={15} />
          </motion.div>
          <span>CINEMATIC FILMMAKER & VIDEO ESSAYIST</span>
          <span className="rounded bg-[#7DD3FC]/20 px-2 py-0.5 text-[10px] text-[#7DD3FC] font-bold">1.4M SUBSCRIBERS</span>
        </motion.div>

        {/* Staggered Word Reveal for Headline — Big Simple Writing */}
        <div className="mx-auto max-w-5xl text-center">
          <Editable
            as="h1"
            value={headlineText}
            onChange={(v) => onChange?.({ headline: v })}
            className="text-4xl font-light uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed sm:text-xl text-white/80"
          >
            <Editable
              as="span"
              value={props?.subheadline || "Independent filmmaker and video director crafting high-retention documentaries, commercial brand films, and long-form YouTube essays for over 1.4 million subscribers worldwide."}
              onChange={(v) => onChange?.({ subheadline: v })}
            />
          </motion.p>
        </div>

        {/* Master Reel Cinema Screen with Floating Optical Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-black shadow-2xl"
        >
          <div className="relative aspect-[21/9] w-full overflow-hidden">
            <img
              src={props?.heroImage || "https://images.pexels.com/photos/38911599/pexels-photo-38911599.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"}
              alt="Director Master Shot"
              className="h-full w-full object-cover opacity-85 transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

            {/* In-Frame Master Slate Marker */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 font-mono text-xs text-white">
              <div>
                <span className="block text-[10px] uppercase text-[#7DD3FC]">Master Production Reel</span>
                <span className="text-sm font-semibold tracking-wide">"The Architecture of Sound" // 4K 120p ProRes RAW</span>
              </div>
              <a
                href="#projects"
                className="flex items-center gap-2 rounded-full bg-[#7DD3FC] px-5 py-2.5 font-mono text-xs font-bold uppercase text-[#0A0A0C] hover:scale-105 transition shadow-lg"
              >
                <Play size={12} fill="#0A0A0C" />
                <span>Play 24fps Sequence</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
