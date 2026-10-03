// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Sparkles, Orbit, Compass } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency5Hero({ props = {}, theme, onChange }: any) {
  const [isPlaying, setIsPlaying] = useState(false);

  const bg = theme?.bg || "#0B26E8";
  const bgSecond = theme?.["bg-second"] || "#061385";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "rgba(255, 255, 255, 0.75)";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.12)";
  const accent = theme?.accent || "#FFFFFF";

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] w-full overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-10 transition-colors select-none"
      style={{
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 60% 45%, rgba(255, 255, 255, 0.35) 0%, transparent 45%), radial-gradient(circle at 20% 80%, ${bgSecond} 0%, transparent 60%)`,
        color: ink,
      }}
    >
      {/* Background High-Impact Silhouette & Flare matching Image 1 */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Luminous Backlight Flare */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.75, 0.95, 0.75],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full blur-[90px]"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        />

        {/* Central Silhouette Head Contour */}
        <div className="relative w-[360px] sm:w-[520px] md:w-[620px] aspect-square flex items-center justify-center opacity-70">
          <svg viewBox="0 0 500 500" className="w-full h-full fill-current" style={{ color: bgSecond }}>
            <path d="M220,90 C290,90 350,140 360,210 C365,245 375,260 395,275 C405,282 390,300 375,305 C360,310 350,335 345,355 C335,395 305,430 250,445 C190,460 140,430 115,380 C80,310 95,200 150,130 C170,105 195,90 220,90 Z" />
          </svg>

          {/* Radial Orbital Geometric Lines */}
          <div className="absolute inset-0 border border-white/20 rounded-full animate-spin" style={{ animationDuration: "35s" }} />
          <div className="absolute inset-16 border border-dashed border-white/25 rounded-full" />
          <div className="absolute inset-32 border border-white/20 rounded-full" />
        </div>
      </div>

      {/* Top Monumental Heading: CREATIVE matching Image 1 */}
      <div className="relative z-10 w-full text-center pt-2">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] font-extrabold uppercase tracking-[-0.05em] leading-none select-none font-sans"
          style={{
            color: ink,
            textShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Editable
            value={props?.headlineTop || "CREATIVE"}
            onChange={(v) => onChange?.({ headlineTop: v })}
          />
        </motion.h1>
      </div>

      {/* Central Interactive Play Ring matching Image 1 */}
      <div className="relative z-20 flex items-center justify-center my-auto py-6">
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/60 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-2xl transition-all"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            color: ink,
          }}
          aria-label="Play Reel"
        >
          <div className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center shadow-md">
            <Play size={18} fill="currentColor" className="ml-0.5" />
          </div>
          {/* Orbital ripple ring */}
          <span className="absolute -inset-2 rounded-full border border-white/40 animate-ping opacity-30 pointer-events-none" />
        </motion.button>
      </div>

      {/* Lower Hero Section: Left Recent Case Card + Center AGENCY + Right Human Taste */}
      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end pb-4">
        {/* Left Floating Card: RECENT CASE matching Image 1 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-4 space-y-4"
        >
          <div
            className="p-4 sm:p-5 rounded-2xl border backdrop-blur-xl space-y-4 max-w-sm shadow-2xl"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(255, 255, 255, 0.25)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-bold" style={{ color: inkSecond }}>
                RECENT CASE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Glowing Orb Case Study Preview matching Image 1 */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/40 border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=85"
                alt="Futures Creative AI Case"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Book A Meeting Circular CTA button matching Image 1 */}
            <div className="flex items-center justify-between pt-1">
              <motion.a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-wider font-semibold border backdrop-blur-md cursor-pointer transition-all shadow-md"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  borderColor: "rgba(255, 255, 255, 0.4)",
                  color: ink,
                }}
              >
                <span className="w-4 h-4 rounded-full bg-white text-blue-900 flex items-center justify-center text-[10px]">
                  ↗
                </span>
                <span>Book A Meeting</span>
              </motion.a>
            </div>
          </div>

          <p className="text-xs font-light leading-relaxed max-w-xs" style={{ color: inkSecond }}>
            <Editable
              value={
                props?.leftCaseDesc ||
                "Futures Creative AI Agency — Elevating Brands Through Smart Solutions."
              }
              onChange={(v) => onChange?.({ leftCaseDesc: v })}
            />
          </p>
        </motion.div>

        {/* Center Monumental Word: AGENCY matching Image 1 */}
        <div className="md:col-span-4 text-center order-first md:order-none">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-[-0.04em] leading-none select-none font-sans"
            style={{ color: ink }}
          >
            <Editable
              value={props?.headlineBottom || "AGENCY"}
              onChange={(v) => onChange?.({ headlineBottom: v })}
            />
          </motion.h2>
        </div>

        {/* Right Editorial block: Human Taste / AI Speed matching Image 1 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-4 text-left md:text-right space-y-2 flex flex-col md:items-end"
        >
          <div className="space-y-0.5">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase" style={{ color: ink }}>
              <Editable
                value={props?.rightTitle1 || "Human Taste"}
                onChange={(v) => onChange?.({ rightTitle1: v })}
              />
            </h3>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase opacity-90" style={{ color: inkSecond }}>
              <Editable
                value={props?.rightTitle2 || "AI Speed"}
                onChange={(v) => onChange?.({ rightTitle2: v })}
              />
            </h3>
          </div>

          <p className="text-xs font-light leading-relaxed max-w-xs" style={{ color: inkSecond }}>
            <Editable
              value={
                props?.rightDesc ||
                "We Are OneScale Creative Agency Using AI For Speed And Human Curation For Taste. We Design Conversion-Focused Websites."
              }
              onChange={(v) => onChange?.({ rightDesc: v })}
            />
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default DigitalAgency5Hero;
