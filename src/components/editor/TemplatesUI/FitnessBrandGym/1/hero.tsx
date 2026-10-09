// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym1Hero: React.FC<HeroProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#0B0C10";
  const text = theme.text || theme.ink || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-between px-6 md:px-16 lg:px-24 pt-16 pb-12 overflow-hidden"
      style={{ backgroundColor: bg, color: text }}
    >
      {/* Background with Subtle Cinematic Athletic Runner - Clean & Simple */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={
            p.bgImageUrl ||
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=85"
          }
          alt="Runner in gym"
          className="w-full h-full object-cover object-right md:object-center filter grayscale contrast-[1.15] brightness-[0.45]"
        />
        {/* Soft Vignette Overlay ensuring text readability on the left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(11,12,16,0.92) 0%, rgba(11,12,16,0.7) 50%, rgba(11,12,16,0.3) 100%), linear-gradient(to top, rgba(11,12,16,0.95) 0%, transparent 30%)",
          }}
        />
      </div>

      {/* Main Content Area - Strictly Left-Aligned, NO text on right side */}
      <div className="relative z-10 max-w-3xl pt-8 md:pt-16">
        {/* Top Description Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed max-w-lg mb-8 tracking-wide"
        >
          <Editable
            value={
              p.subtitle ||
              "Train In A High-Energy Gym With Expert Coaches, Modern Equipment, And Flexible Plans Designed For Your Fitness Goals."
            }
            onChange={(val: string) => handleUpdate("subtitle", val)}
          />
        </motion.p>

        {/* Large Headline - Classic bold typography directly from Image 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-10"
        >
          <Editable
            value={p.title || "Build Your Body. Boost Your Confidence."}
            onChange={(val: string) => handleUpdate("title", val)}
          />
        </motion.h1>

        {/* Action Button - Crisp solid white button matching Image 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="inline-block"
        >
          <a
            href={p.ctaLink || "#contact"}
            className="px-8 py-3.5 rounded font-bold text-sm tracking-wider uppercase text-black bg-white hover:bg-neutral-200 transition-all duration-200 active:scale-95 shadow-md inline-block cursor-pointer"
          >
            <Editable
              value={p.ctaText || "Try For Free"}
              onChange={(val: string) => handleUpdate("ctaText", val)}
            />
          </a>
        </motion.div>
      </div>

      {/* Bottom Floating Feature Statements - PLAIN TEXT ONLY, NO CARDS, NO RIGHT SIDE BOXES */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-16 border-t border-white/10 mt-16"
      >
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-wider text-white uppercase">
            <Editable
              value={p.feature1Title || "AFFORDABLE TRAINING & EATING PLANS"}
              onChange={(val: string) => handleUpdate("feature1Title", val)}
            />
          </h3>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-wider text-white uppercase text-left sm:text-right">
            <Editable
              value={p.feature2Title || "14 DAY FREE RETURN ON PURCHASE"}
              onChange={(val: string) => handleUpdate("feature2Title", val)}
            />
          </h3>
        </div>
      </motion.div>
    </section>
  );
};

export default FitnessBrandGym1Hero;
