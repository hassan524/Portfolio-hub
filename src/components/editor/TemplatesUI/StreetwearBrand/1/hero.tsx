// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaArrowRight, FaBarcode, FaBolt } from "react-icons/fa6";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand1Hero: React.FC<HeroProps> = ({
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
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#09090B] text-white py-20 border-b border-rose-950/60">
      
      {/* Background Graphic Lookbook Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=80"
          alt="Underground Streetwear Lookbook"
          className="w-full h-full object-cover opacity-25 scale-105 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-transparent to-[#09090B]" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Monolithic Kinetic Headline (NO BADGE OVER HEADLINE) */}
        <div className="max-w-4xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black uppercase tracking-tight leading-[0.95] font-mono"
          >
            <Editable value={p.hero1 || "HEAVY GAUGE"} onChange={(v) => handleUpdate("hero1", v)} />
            <span
              className="block mt-2 text-rose-500 font-sans tracking-tighter"
            >
              <Editable value={p.hero2 || "SYSTEM ZERO // DROP 04"} onChange={(v) => handleUpdate("hero2", v)} />
            </span>
          </motion.h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-mono leading-relaxed">
            <Editable
              value={
                p.heroDesc ||
                "Industrial heavyweight textiles engineered in Shibuya. 480GSM custom loomed loopback fleece, distress-washed carbon black, with Japanese excella hardware. Built for perpetual wear."
              }
              onChange={(v) => handleUpdate("heroDesc", v)}
            />
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-none font-mono text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 transition-all border border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.4)]"
            >
              <span>Explore Drop 04 Pieces</span>
              <FaArrowRight className="text-xs" />
            </motion.a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-none font-mono text-xs font-bold uppercase tracking-wider text-rose-400 border border-rose-900 bg-rose-950/30 hover:bg-rose-950/60 transition-all"
            >
              <span>Request Atelier Private Fitting</span>
            </a>
          </div>
        </div>

        {/* Technical Specification Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#111116] border border-rose-950/80 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 block uppercase tracking-wider text-[10px]">BASE TEXTILE</span>
            <span className="text-white font-bold">480GSM Heavy Loopback</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 block uppercase tracking-wider text-[10px]">HARDWARE GRADE</span>
            <span className="text-rose-400 font-bold">Matte Gunmetal YKK Excella</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 block uppercase tracking-wider text-[10px]">PIGMENT TREATMENT</span>
            <span className="text-white font-bold">Cold Enzyme Carbon Wash</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 block uppercase tracking-wider text-[10px]">BATCH ALLOCATION</span>
            <span className="text-emerald-400 font-bold">150 Units / Serial Stamped</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand1Hero;
