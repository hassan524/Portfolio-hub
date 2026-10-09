// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowRight, MoveDown } from "lucide-react";
import heroImage from "./public/sagent-hero.png";

export function ArchitectureStudio1Hero({ props = {}, theme, onChange }: any) {
  const accent = theme?.accent || "#D92335";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";

  return (
    <section
      id="top"
      className="relative w-full overflow-hidden py-24 sm:py-32 md:py-40 lg:py-48 flex flex-col justify-between items-center text-center"
      style={{
        fontFamily: fontBody,
        color: "#ffffff",
      }}
    >
      {/* Full-bleed Background Image with subtle entrance animation */}
      <motion.img
        src={heroImage}
        alt="Sagent Architecture"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        priority="true"
      />

      {/* Cinematic Dark Overlay for pristine text contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Centered Hero Content with Framer Motion */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center">
        {/* Animated Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] font-medium text-white/85"
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <Editable value="ATELIER OF ARCHITECTURE & SPATIAL RESEARCH" />
        </motion.div>

        {/* Animated Headline */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Editable
            as="h1"
            className="font-medium leading-[1.02] tracking-tight text-[clamp(2.75rem,7vw,6rem)] text-white"
            style={{ fontFamily: fontHeading }}
            value={props?.title || "Places with a point of view."}
            onChange={(v) => onChange?.({ title: v })}
          />
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/90 font-light"
        >
          <Editable
            as="p"
            value={
              props?.subtitle ||
              "We’re an architecture and interiors studio designing homes and buildings that feel at ease in their surroundings."
            }
            onChange={(v) => onChange?.({ subtitle: v })}
          />
        </motion.div>

        {/* Animated CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-5"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 h-12 px-8 text-xs uppercase tracking-[0.16em] font-semibold text-white transition-transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
            style={{ backgroundColor: accent }}
          >
            <Editable value="View our work" />
            <ArrowRight size={15} />
          </a>

          <a
            href="#about"
            className="inline-flex items-center gap-2 h-12 px-7 text-xs uppercase tracking-[0.16em] font-medium text-white border border-white/40 hover:border-white transition-colors backdrop-blur-xs"
          >
            <Editable value="About the studio" />
          </a>
        </motion.div>
      </div>

      {/* Floating Bottom Bar with Specs & Scroll Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 mt-16 flex items-center justify-between text-xs tracking-wider uppercase text-white/70 font-mono">
        <span className="hidden sm:inline">LONDON · ZÜRICH · KYOTO</span>
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <MoveDown size={14} className="animate-bounce" />
          <span className="text-[11px]">SCROLL TO EXPLORE</span>
        </div>
        <span className="hidden sm:inline">FOLIO 2026</span>
      </div>
    </section>
  );
}

export const Hero = ArchitectureStudio1Hero;
export default ArchitectureStudio1Hero;