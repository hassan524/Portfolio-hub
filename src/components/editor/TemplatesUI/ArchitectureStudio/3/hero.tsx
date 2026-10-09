// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, ArrowRight, CornerDownRight, MoveDown } from "lucide-react";
import heroImage from "./public/ambitious-building.jpg";

export function ArchitectureStudio3Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const ink = theme?.ink || "#FFFFFF";
  const fontBody = theme?.fontBody || "DM Sans";

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden py-24 sm:py-32 md:py-40 lg:py-48 flex flex-col justify-between transition-colors border-b"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: ink,
        fontFamily: fontBody,
      }}
    >
      {/* Background Image: Kept per user request, rendered in dramatic high-contrast dark monochrome */}
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.55 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src={heroImage}
          alt="Curved modern glass architectural facade"
          className="w-full h-full object-cover grayscale contrast-125 brightness-75"
        />
        {/* Multi-angle Dark Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, rgba(9,9,11,0.2) 0%, rgba(9,9,11,0.85) 75%, rgba(9,9,11,0.98) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(9,9,11,0.7) 0%, rgba(9,9,11,0.3) 50%, rgba(9,9,11,0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Main Content with Staggered Framer Motion Animations */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          {/* Animated Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-3 mb-6 font-mono text-xs uppercase tracking-[0.24em] text-white/80"
          >
            <span className="w-2 h-2 bg-white animate-pulse" />
            <Editable value="MONUMENTAL & EXPERIMENTAL ARCHITECTURE" />
          </motion.div>

          {/* Animated Grand Display Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Editable
              as="h1"
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold uppercase tracking-tight leading-[0.9] mb-8 font-sans text-white"
              value={props?.headline || "Ambitious by design."}
              onChange={(v) => onChange?.({ headline: v })}
            />
          </motion.div>

          {/* Animated Subheadline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-base md:text-xl leading-relaxed text-white/85 font-light mb-12"
          >
            <Editable
              as="p"
              value={
                props?.subheadline ||
                "Architecture that moves beyond the expected. Thoughtful civic landmarks, sculptural towers, and zero-carbon structures for the ways we live tomorrow."
              }
              onChange={(v) => onChange?.({ subheadline: v })}
            />
          </motion.div>

          {/* Animated Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 h-13 px-8 text-xs font-mono uppercase tracking-[0.2em] font-bold bg-white text-black hover:bg-white/90 hover:scale-[1.02] transition-all cursor-pointer shadow-lg"
            >
              <Editable value="VIEW PROJECTS" />
              <ArrowUpRight size={16} />
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 h-13 px-7 text-xs font-mono uppercase tracking-[0.2em] font-medium text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all backdrop-blur-xs"
            >
              <Editable value="THE STUDIO" />
              <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Bar with Animated Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs uppercase tracking-wider text-white/70"
      >
        <div className="flex items-center gap-6">
          <span className="text-white font-bold">2026 FOLIO</span>
          <span className="hidden md:inline">HELSINKI · COPENHAGEN · BERLIN</span>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">100%</span>
            <span className="text-[10px] opacity-75">MASS TIMBER & LOW CARBON</span>
          </div>
          <div className="flex items-center gap-2">
            <MoveDown size={14} className="animate-bounce text-white" />
            <span className="text-[10px]">SCROLL ARCHIVE</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export const Hero = ArchitectureStudio3Hero;
export default ArchitectureStudio3Hero;
