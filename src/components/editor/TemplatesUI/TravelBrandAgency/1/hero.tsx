// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaArrowDown, FaPlane } from "react-icons/fa6";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency1Hero: React.FC<HeroProps> = ({
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
    <section className="relative w-full min-h-screen flex items-end pb-16 md:pb-24 pt-32 overflow-hidden font-['Poppins',sans-serif] text-white">
      
      {/* Full-Bleed Tropical Aerial Background (Lush Island & Turquoise Waters with Plane Aesthetic) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
          alt="Tropical Island Aerial Turquoise Waters"
          className="w-full h-full object-cover scale-105"
        />
        {/* Soft Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-950/50" />
      </div>

      {/* Hero Content Grid (Matching Dribbble Reference) */}
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Column: Big Clean Poppins Headline */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold tracking-tight text-white leading-[1.08]"
            >
              <Editable value={p.hero1 || "Unforgettable"} onChange={(v) => handleUpdate("hero1", v)} />
              <span className="block">
                <Editable value={p.hero2 || "Travel Moments"} onChange={(v) => handleUpdate("hero2", v)} />
              </span>
              <span className="block text-emerald-300 font-semibold">
                <Editable value={p.hero3 || "by Voyare"} onChange={(v) => handleUpdate("hero3", v)} />
              </span>
            </motion.h1>
          </div>

          {/* Right Column: Narrative & Circular Scroll Indicator */}
          <div className="lg:col-span-5 flex flex-col justify-end space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-lg"
            >
              <Editable
                value={
                  p.heroDesc ||
                  "We take you beyond the ordinary, to places where cultures come alive, landscapes leave you breathless, and every moment becomes a story to tell."
                }
                onChange={(v) => handleUpdate("heroDesc", v)}
              />
            </motion.p>

            {/* Bottom Row with Scroll Down Button */}
            <div className="flex items-center justify-between pt-2">
              <a
                href="#destinations"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 hover:text-white transition-colors"
              >
                <span>Discover 150+ Top Destinations</span>
                <span className="text-xs">→</span>
              </a>

              {/* Circular Scroll Down Button (Matching Reference) */}
              <a
                href="#about"
                aria-label="Scroll down"
                className="w-13 h-13 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <FaArrowDown className="text-base animate-bounce" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TravelBrandAgency1Hero;
