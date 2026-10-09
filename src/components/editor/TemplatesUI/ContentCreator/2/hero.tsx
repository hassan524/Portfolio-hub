// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Play, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F5F0E8";
  const ink = theme?.ink || "#181713";
  const accent = theme?.accent || "#FF6B35";

  const heroImg = props?.heroImage || "https://images.pexels.com/photos/9422833/pexels-photo-9422833.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-8 sm:pt-36 select-none" style={{ backgroundColor: bg, color: ink }}>
      <div className="relative mx-auto max-w-7xl">
        {/* Main Grid: Left Typography & Narrative + Right Image Showcase */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Headlines & Actions */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          >
            <div className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">
              <Zap size={14} className="text-[#FF6B35]" fill="currentColor" />
              <Editable value={props?.eyebrow || "ATTENTION ARCHITECTURE // VOL. 04"} />
            </div>

            <div className="mt-6">
              <Editable
                as="h1"
                value={props?.headline || "WE TURN 3-SECOND SCROLLS INTO OBSESSIVE AFFINITY."}
                onChange={(v) => onChange?.({ headline: v })}
                className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.07em] sm:text-7xl lg:text-[7.5rem]"
              />
            </div>

            <Editable
              as="p"
              value={props?.subheadline || "The modern internet doesn't need another generic ad. We engineer high-velocity creator content with an unmistakable point of view — stopping scrollers dead in their tracks with cinematic pacing, macro sound design, and relentless storytelling."}
              className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-black/80 sm:text-xl"
            />

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 rounded-2xl border-2 border-black bg-black px-7 py-4 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_#FF6B35] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                <span>Explore Viral Stream</span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-2xl border-2 border-black bg-white px-6 py-4 text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition"
              >
                <span>The Retention Engine</span>
              </a>
            </div>

            {/* Retention Curve Bar */}
            <div className="mt-10 border-t-2 border-black pt-6">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
                <span>ALGORITHMIC HOOK CURVE</span>
                <span className="text-[#FF6B35]">94% 0-10s RETENTION</span>
              </div>
              <div className="mt-2 h-16 w-full">
                <svg viewBox="0 0 400 70" className="w-full h-full overflow-visible">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                    d="M 0,15 Q 80,18 150,24 T 280,36 T 400,42"
                    fill="none"
                    stroke={accent}
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 0,15 Q 50,50 120,60 T 260,65 T 400,68"
                    fill="none"
                    stroke="#181713"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    opacity="0.3"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right Column: CREATOR IMAGE SHOWCASE WITH STICKERS */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 24 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Floating Draggable Sticker Pill 1 */}
            <motion.div
              drag
              dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
              whileHover={{ rotate: 8, scale: 1.08 }}
              className="cursor-grab active:cursor-grabbing absolute -top-5 -left-4 z-20 rounded-2xl border-2 border-black bg-[#FF6B35] px-4 py-2 text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_#000] rotate-[-5deg]"
            >
              <span>★ CREATOR + STRATEGIST</span>
            </motion.div>

            {/* Floating Draggable Sticker Pill 2 */}
            <motion.div
              drag
              dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
              whileHover={{ rotate: -8, scale: 1.08 }}
              className="cursor-grab active:cursor-grabbing absolute -bottom-5 -right-4 z-20 rounded-2xl border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-black shadow-[4px_4px_0px_#000] rotate-[4deg]"
            >
              <div className="flex items-center gap-1.5">
                <Flame size={14} className="text-[#FF6B35]" />
                <span>84M+ ANNUAL REACH</span>
              </div>
            </motion.div>

            {/* The Main Hero Image Frame */}
            <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-black bg-black shadow-[10px_10px_0px_#FF6B35] transition duration-500 hover:shadow-[14px_14px_0px_#181713]">
              <img
                src={heroImg}
                alt={props?.headline || "Creator Portrait"}
                className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              {/* In-Image Tag */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white font-black text-xs uppercase">
                <span className="rounded-full bg-black/70 px-3 py-1 backdrop-blur-md border border-white/20">
                  ISSUE NO. 04 / ACTIVE
                </span>
                <span className="text-[#FF6B35]">
                  NYC • LON • REMOTE
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Angled Marquee Ticker Strip at Bottom of Hero */}
        <div className="mt-16 overflow-hidden bg-black text-white py-3 -mx-4 sm:-mx-8 rotate-[-1deg]">
          <div className="flex whitespace-nowrap gap-8 text-xs font-black uppercase tracking-widest animate-marquee">
            <span>★ 2.8M CROSS-PLATFORM AUDIENCE</span>
            <span>★ 91% AVERAGE HOOK RETENTION</span>
            <span>★ 35+ TIER-1 BRAND SPONSORSHIPS</span>
            <span>★ ZERO FLUFF. ALL VELOCITY</span>
            <span>★ 2.8M CROSS-PLATFORM AUDIENCE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
