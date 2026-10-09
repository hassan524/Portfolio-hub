// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaArrowRight, FaDiamond } from "react-icons/fa6";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand2Hero: React.FC<HeroProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0A0D14] text-white py-20 border-b border-[#1E293B]">
      
      {/* High-Contrast Architectural Fashion Silhouette Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=80"
          alt="Architectural Haute Streetwear Silhouette"
          className="w-full h-full object-cover opacity-30 filter grayscale contrast-150 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14] via-transparent to-[#0A0D14]" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Monolithic Narrative (NO BADGE OVER HEADLINE) */}
        <div className="max-w-4xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-light uppercase tracking-tight leading-[1.0] font-sans"
          >
            <Editable value={p.hero1 || "ARCHITECTURE FOR"} onChange={(v) => handleUpdate("hero1", v)} />
            <span
              className="block mt-2 font-bold tracking-normal text-white"
            >
              <Editable value={p.hero2 || "THE HUMAN FORM"} onChange={(v) => handleUpdate("hero2", v)} />
              <span className="text-[#CCFF00]">.</span>
            </span>
          </motion.h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl font-light leading-relaxed">
            <Editable
              value={
                p.heroDesc ||
                "A sculptural study in exaggerated proportions, Italian double-faced wool, and bespoke raw denim. Designed between Copenhagen and Milan."
              }
              onChange={(v) => handleUpdate("heroDesc", v)}
            />
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="inline-flex items-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black bg-[#CCFF00] hover:bg-white transition-all shadow-[0_0_25px_rgba(204,255,0,0.35)]"
            >
              <span>Explore Collection XI</span>
              <FaArrowRight className="text-xs" />
            </motion.a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#E2E8F0] border border-[#334155] bg-[#1E293B]/40 hover:bg-[#1E293B] transition-all"
            >
              <span>Private Showroom Fitting</span>
            </a>
          </div>
        </div>

        {/* Architectural Form Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#0E131F]/90 border border-[#1E293B] backdrop-blur-md text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[#64748B] block uppercase tracking-wider text-[10px]">SILHOUETTE RATIO</span>
            <span className="text-white font-bold">Exaggerated Drop / Box Volume</span>
          </div>
          <div className="space-y-1">
            <span className="text-[#64748B] block uppercase tracking-wider text-[10px]">TEXTILE ORIGIN</span>
            <span className="text-[#CCFF00] font-bold">Biella Italian Virgin Wool</span>
          </div>
          <div className="space-y-1">
            <span className="text-[#64748B] block uppercase tracking-wider text-[10px]">PATTERN METHOD</span>
            <span className="text-white font-bold">Zero-Waste Monolith Drape</span>
          </div>
          <div className="space-y-1">
            <span className="text-[#64748B] block uppercase tracking-wider text-[10px]">PRODUCTION CAP</span>
            <span className="text-white font-bold">50 Bespoke Ensembles Only</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand2Hero;
