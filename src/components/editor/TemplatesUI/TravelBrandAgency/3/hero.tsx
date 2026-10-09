// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaArrowRight, FaMountain, FaPersonHiking } from "react-icons/fa6";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency3Hero: React.FC<HeroProps> = ({
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
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0A1017] text-white py-20 font-['Poppins',sans-serif]">
      
      {/* Dramatic High Alpine Mountain Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
          alt="Dramatic High Alpine Mountain Peaks"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1017] via-[#0A1017]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1017] via-transparent to-[#0A1017]" />
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Monolithic Mountain Narrative (NO BADGE OVER HEADLINE) */}
        <div className="max-w-4xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold uppercase tracking-tight leading-[1.0] text-white"
          >
            <Editable value={p.hero1 || "UNBOUND WILDERNESS"} onChange={(v) => handleUpdate("hero1", v)} />
            <span className="block mt-2 text-amber-400 font-bold">
              <Editable value={p.hero2 || "ALPINE EXPEDITIONS."} onChange={(v) => handleUpdate("hero2", v)} />
            </span>
          </motion.h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
            <Editable
              value={
                p.heroDesc ||
                "Small-team guided treks through Patagonia's granitic spires, the high passes of the Dolomites, and Iceland's volcanic highlands. Led by certified UIAGM mountain guides."
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
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-[0_0_25px_rgba(251,191,36,0.35)]"
            >
              <span>Explore Alpine Routes</span>
              <FaArrowRight className="text-xs" />
            </motion.a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-white border border-slate-700 bg-slate-800/80 hover:bg-slate-800 transition-all"
            >
              <span>Basecamp Inquiry</span>
            </a>
          </div>
        </div>

        {/* Alpine Telemetry Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-md text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block text-[10px] font-semibold">EXPEDITION CADENCE</span>
            <span className="text-white font-bold flex items-center gap-2">
              <FaPersonHiking className="text-amber-400" />
              Strictly Max 8 Trekkers
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block text-[10px] font-semibold">LEADERSHIP STANDARD</span>
            <span className="text-amber-400 font-bold flex items-center gap-2">
              <FaMountain className="text-amber-400" />
              IFMGA Certified Guides
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block text-[10px] font-semibold">ECO FOOTPRINT</span>
            <span className="text-white font-bold">100% Leave-No-Trace</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 uppercase tracking-wider block text-[10px] font-semibold">SEASON STATUS</span>
            <span className="text-emerald-400 font-bold">2026/27 Permits Open</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency3Hero;
