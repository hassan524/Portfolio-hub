// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaArrowRight, FaBolt, FaSkull } from "react-icons/fa6";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand3Hero: React.FC<HeroProps> = ({
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
    <section className="relative w-full min-h-[90vh] bg-[#F4F3EE] text-black py-16 md:py-24 overflow-hidden border-b-4 border-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Heavy Brutalist Narrative (NO BADGE OVER HEADLINE) */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-black uppercase tracking-tighter leading-[0.9] font-sans">
              <Editable value={p.hero1 || "CONCRETE DRIFT"} onChange={(v) => handleUpdate("hero1", v)} />
              <span className="block mt-2 text-[#2563EB] bg-[#FACC15] inline-block px-3 py-1 border-4 border-black shadow-[6px_6px_0px_#000] rotate-[-1deg]">
                <Editable value={p.hero2 || "NEW YORK CITY."} onChange={(v) => handleUpdate("hero2", v)} />
              </span>
            </h1>

            <p className="text-base sm:text-xl text-[#262626] max-w-xl font-bold leading-relaxed">
              <Editable
                value={
                  p.heroDesc ||
                  "Hand-pulled screenprints on 14oz heavyweight reverse-weave cotton, 7-ply cold-pressed Canadian maple decks, and heavy double-knee canvas built to take curb slams."
                }
                onChange={(v) => handleUpdate("heroDesc", v)}
              />
            </p>
          </motion.div>

          {/* Action Row with Brutalist Hard Shadows */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ x: 2, y: 2 }}
              href="#projects"
              className="inline-flex items-center gap-3 px-8 py-4 font-black text-xs uppercase tracking-wider text-white bg-black hover:bg-[#2563EB] transition-colors border-3 border-black shadow-[6px_6px_0px_#FACC15]"
            >
              <span>Shop Hardware & Decks</span>
              <FaArrowRight className="text-xs" />
            </motion.a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 font-black text-xs uppercase tracking-wider text-black bg-white hover:bg-[#FACC15] transition-colors border-3 border-black shadow-[6px_6px_0px_#000]"
            >
              <span>Visit Williamsburg Shop</span>
            </a>
          </div>

          {/* Skate Metrics Banner */}
          <div className="pt-6 border-t-2 border-black grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-black uppercase">
            <div className="bg-white p-3 border-2 border-black shadow-[3px_3px_0px_#000]">
              <span className="text-[#2563EB] block text-[10px]">DECK CONSTRUCTION</span>
              <span>7-Ply Canadian Hard Rock Maple</span>
            </div>
            <div className="bg-white p-3 border-2 border-black shadow-[3px_3px_0px_#000]">
              <span className="text-[#2563EB] block text-[10px]">PRINT PROCESS</span>
              <span>Hand-Pulled Plastisol BK</span>
            </div>
            <div className="bg-white p-3 border-2 border-black shadow-[3px_3px_0px_#000]">
              <span className="text-[#2563EB] block text-[10px]">LOCAL COMMUNITY</span>
              <span>DIY Ramp Fund Contributor</span>
            </div>
          </div>
        </div>

        {/* Right Raw Skate Collage */}
        <div className="lg:col-span-5 relative">
          <div className="relative border-4 border-black bg-black shadow-[10px_10px_0px_#000] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&w=1200&q=80"
              alt="NYC Skateboarding Action"
              className="w-full aspect-[4/5] object-cover filter contrast-125"
            />
            {/* Sticker Badge on Photo */}
            <div className="absolute top-4 right-4 bg-[#FACC15] text-black font-black text-xs px-3 py-1.5 border-2 border-black shadow-[3px_3px_0px_#000] rotate-6 uppercase">
              100% RAW STREET TESTED
            </div>
            {/* Bottom Tag */}
            <div className="absolute bottom-4 left-4 bg-white text-black font-black text-xs px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#2563EB] uppercase">
              FLUSHING MEADOWS CORONA PARK // SPOT 08
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand3Hero;
