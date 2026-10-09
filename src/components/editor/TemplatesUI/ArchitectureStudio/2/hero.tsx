// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, ArrowRight, Box, Compass, Layers, Shield } from "lucide-react";
import heroImage from "./public/cubiq-tower.jpg";

const mix = (c: string = "#1A1816", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio2Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F4F0EA";
  const bgSecond = theme?.["bg-second"] || "#EBE5DC";
  const ink = theme?.ink || "#1A1816";
  const inkSecond = theme?.["ink-second"] || "#5C5650";
  const accent = theme?.accent || "#C85A32";
  const fontHeading = theme?.fontHeading || "DM Sans";
  const fontBody = theme?.fontBody || "DM Sans";

  return (
    <section
      id="top"
      className="relative w-full px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28 transition-colors border-b overflow-hidden"
      style={{
        backgroundColor: bg,
        borderColor: mix(ink, 16),
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-[1400px] mx-auto">

        {/* 2-Column Modernist Grid Layout (NO BACKGROUND IMAGE) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Typographic Manifesto with Animations */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Editable
                as="h1"
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold tracking-tight leading-[0.95] uppercase mb-6"
                style={{ color: ink }}
                value={props?.headline || "Design with an aesthetic sense."}
                onChange={(v) => onChange?.({ headline: v })}
              />

              <Editable
                as="p"
                className="text-base md:text-lg leading-relaxed mb-10 max-w-xl font-normal"
                style={{ color: mix(ink, 80) }}
                value={
                  props?.subheadline ||
                  "Cúbiq is a modernist practice driven by structural honesty and geometric proportion. We develop monolithic structures that celebrate raw materials, climatic intelligence, and long-term permanence."
                }
                onChange={(v) => onChange?.({ subheadline: v })}
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-mono uppercase tracking-widest font-bold text-white transition-transform hover:-translate-y-0.5 cursor-pointer shadow-md"
                  style={{ backgroundColor: accent }}
                >
                  <Editable value="VIEW WORK CATALOG" />
                  <ArrowUpRight size={15} />
                </a>

                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-mono uppercase tracking-widest font-semibold border transition-colors hover:bg-black/5"
                  style={{ borderColor: mix(ink, 25), color: ink }}
                >
                  <Editable value="TECTONIC PRINCIPLES" />
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Structural Parameters Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t font-mono text-xs"
              style={{ borderColor: mix(ink, 14) }}
            >
              <div>
                <span className="text-[10px] block opacity-60 mb-1" style={{ color: inkSecond }}>
                  01 / SCALE
                </span>
                <span className="font-bold text-sm block" style={{ color: ink }}>
                  84,000 m²
                </span>
                <span className="text-[10px] opacity-70">Constructed Volume</span>
              </div>
              <div>
                <span className="text-[10px] block opacity-60 mb-1" style={{ color: inkSecond }}>
                  02 / TECTONICS
                </span>
                <span className="font-bold text-sm block" style={{ color: accent }}>
                  Timber & Basalt
                </span>
                <span className="text-[10px] opacity-70">Primary Systems</span>
              </div>
              <div>
                <span className="text-[10px] block opacity-60 mb-1" style={{ color: inkSecond }}>
                  03 / PRECISION
                </span>
                <span className="font-bold text-sm block" style={{ color: ink }}>
                  BIM Level 3
                </span>
                <span className="text-[10px] opacity-70">Computational Delivery</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contained Architectural Showcase Card (NOT a background image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div
              className="border p-5 shadow-lg transition-transform hover:-translate-y-1"
              style={{ borderColor: mix(ink, 18), backgroundColor: mix(bgSecond, 60) }}
            >
              {/* Card Technical Header */}
              <div
                className="flex items-center justify-between pb-3 mb-3 border-b text-[10px] font-mono uppercase tracking-wider"
                style={{ borderColor: mix(ink, 14), color: inkSecond }}
              >
                <span>SPECIMEN // 01</span>
                <span className="font-semibold" style={{ color: accent }}>
                  ELEVATION ANALYSIS
                </span>
              </div>

              {/* Bounded Contained Image Component */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border bg-black/5" style={{ borderColor: mix(ink, 16) }}>
                <img
                  src={heroImage}
                  alt="Sculptural terracotta tower"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-white backdrop-blur-md"
                  style={{ backgroundColor: "rgba(26, 24, 22, 0.85)" }}
                >
                  TERRACOTTA MONOLITH · MILAN
                </div>
              </div>

              {/* Card Technical Footer */}
              <div className="pt-4 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="opacity-60 text-[11px]" style={{ color: inkSecond }}>
                    STRUCTURAL SYSTEM:
                  </span>
                  <span className="font-semibold" style={{ color: ink }}>
                    Oxidized Ceramic & Cast Concrete
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-60 text-[11px]" style={{ color: inkSecond }}>
                    GROSS INTERNAL AREA:
                  </span>
                  <span className="font-semibold" style={{ color: ink }}>
                    14,200 m²
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t text-[10px]" style={{ borderColor: mix(ink, 12) }}>
                  <span className="font-semibold" style={{ color: accent }}>
                    RIBA INTERNATIONAL ACCREDITED
                  </span>
                  <span className="opacity-70">STATUS: COMPLETED</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const Hero = ArchitectureStudio2Hero;
export default ArchitectureStudio2Hero;
