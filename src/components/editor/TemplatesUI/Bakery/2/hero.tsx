// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import hero from "./public/bread-hero.jpg";

export function Bakery2Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#ffffff";
  const ink = theme?.ink || "#242023";
  const accent = theme?.accent || "#b23b68";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  // Floating sourdough fermentation bubbles drifting gracefully
  const bubbles = [
    { size: 45, x: "10%", delay: 0, duration: 6 },
    { size: 75, x: "24%", delay: 1.2, duration: 8.5 },
    { size: 35, x: "40%", delay: 2.5, duration: 5.5 },
    { size: 90, x: "62%", delay: 0.6, duration: 9 },
    { size: 50, x: "78%", delay: 1.8, duration: 7 },
    { size: 80, x: "90%", delay: 3.2, duration: 10 },
  ];

  return (
    <section
      id="home"
      className="relative isolate min-h-[92vh] md:min-h-[96vh] w-full flex items-center justify-center py-24 md:py-36 overflow-hidden"
      style={{
        backgroundColor: bg,
        color: ink,
        fontFamily: fontBody,
      }}
    >
      {/* Background Image: Clearly visible with low/medium opacity (NOT removed or washed away) */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none flex items-center justify-center">
        <img
          src={hero}
          alt="Artisanal sourdough bread texture"
          className="h-full w-full object-cover object-center opacity-50 filter saturate-110"
        />
        {/* Gentle soft translucent veil for text legibility without erasing the photo */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.45)",
          }}
        />
      </div>

      {/* Floating Animated Sourdough Fermentation SVG Bubbles */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {bubbles.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.x,
              bottom: "-30px",
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.8), ${accent}30)`,
              border: `1.5px solid ${accent}45`,
              boxShadow: `inset -2px -2px 8px ${accent}25, 0 8px 24px rgba(0,0,0,0.06)`,
              backdropFilter: "blur(3px)",
            }}
            animate={{
              y: [0, -320, -700],
              x: [0, i % 2 === 0 ? 25 : -25, 0],
              scale: [0.85, 1.15, 0.9],
              opacity: [0, 0.75, 0],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Big Big Centered Line-by-Line Typography */}
      <div className="mx-auto max-w-5xl px-6 md:px-12 text-center relative z-10">
        {/* Animated Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8 shadow-xs border bg-white/80 backdrop-blur-md"
          style={{
            borderColor: `${accent}30`,
            color: accent,
          }}
        >
          <Sparkles size={14} />
          <span className="text-xs uppercase tracking-[0.24em] font-bold">
            Wild Fermentation & Artisanal Hearth
          </span>
        </motion.div>

        {/* Big Big Text Line-by-Line */}
        <div className="space-y-1 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight uppercase leading-[0.92]"
              style={{ fontFamily: fontHeading, color: ink }}
            >
              Crafted Slowly.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight uppercase leading-[0.92] italic"
              style={{ fontFamily: fontHeading, color: accent }}
            >
              Baked Boldly.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight uppercase leading-[0.92]"
              style={{ fontFamily: fontHeading, color: ink }}
            >
              Served Daily.
            </h1>
          </motion.div>
        </div>

        {/* Centered Poetic Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-base sm:text-lg md:text-xl font-light leading-relaxed opacity-90 max-w-2xl mx-auto mb-12 text-black/85"
        >
          <Editable
            value={
              props?.intro ||
              "We honor the ancient dialogue between water, stone-milled heritage grains, wild levain, and wood smoke. No shortcuts. Just living bread baked at sunrise."
            }
            onChange={(intro) => onChange?.({ intro })}
          />
        </motion.p>

        {/* Centered Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.18em] font-semibold text-white rounded-full shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
            style={{ backgroundColor: accent }}
          >
            <span>Explore Hearth Menu</span>
            <ArrowUpRight size={15} />
          </a>

          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 text-xs uppercase tracking-[0.18em] font-semibold rounded-full bg-white/90 backdrop-blur-md border border-black/15 hover:bg-white transition-all cursor-pointer shadow-xs"
            style={{ color: ink }}
          >
            <span>Our Sourdough Philosophy</span>
            <ArrowDown size={14} />
          </a>
        </motion.div>

        {/* Bottom Specimen Telemetry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-16 inline-flex items-center gap-6 text-[11px] uppercase tracking-widest font-mono opacity-60 bg-white/70 backdrop-blur-md px-6 py-2 rounded-full"
        >
          <span>BATCH #042</span>
          <span>•</span>
          <span>STONE-MILLED RYE & SPELT</span>
          <span>•</span>
          <span>36-HOUR ALPINE STARTER</span>
        </motion.div>
      </div>
    </section>
  );
}

export const Hero = Bakery2Hero;
export default Bakery2Hero;
