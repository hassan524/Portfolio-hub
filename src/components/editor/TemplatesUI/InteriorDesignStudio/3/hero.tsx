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

export const InteriorDesignStudio3Hero: React.FC<HeroProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#080808";
  const ink = theme.ink || "#FFFFFF";
  const accent = theme.accent || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-16 pb-10 select-none overflow-hidden"
      style={{ backgroundColor: bg, color: ink }}
    >
      {/* Top breathing space */}
      <div className="w-full" />

      {/* Massive Towering Display Headline: "ADRIA VALE" (Exact match to Image 3) */}
      <div className="w-full text-center my-auto py-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center font-black uppercase tracking-[-0.04em] leading-[0.8] text-white select-text"
          style={{
            fontSize: "clamp(3.8rem, 16vw, 17.5rem)",
            fontFamily: "'Times New Roman', Times, serif, system-ui",
            fontWeight: 800,
          }}
        >
          <Editable
            value={p.heroName || "ADRIA VALE"}
            onChange={(v) => handleUpdate("heroName", v)}
          />
        </motion.h1>

        {/* Subtitle (Exact Image 3 Text) */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-xs sm:text-sm md:text-base font-normal tracking-wide text-zinc-400 max-w-xl mx-auto leading-relaxed"
        >
          <Editable
            value={
              p.heroSubtitle ||
              "Crafting timeless spatial experiences through design strategy, form and craft"
            }
            onChange={(v) => handleUpdate("heroSubtitle", v)}
          />
        </motion.p>
      </div>

      {/* Bottom Metadata Bar: SCROLL ↓ | SPATIAL ARCHITECTURE | 09 SELECTED WORKS (Exact Image 3 Layout) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full pt-8 border-t border-white/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400"
      >
        <a href="#projects" className="hover:text-white transition-colors flex items-center gap-1">
          <Editable value={p.scrollText || "SCROLL ↓"} onChange={(v) => handleUpdate("scrollText", v)} />
        </a>

        <div className="hidden sm:block text-zinc-500">
          <Editable value={p.centerTag || "SPATIAL ARCHITECTURE"} onChange={(v) => handleUpdate("centerTag", v)} />
        </div>

        <div className="hover:text-white transition-colors">
          <Editable value={p.rightTag || "09 SELECTED WORKS"} onChange={(v) => handleUpdate("rightTag", v)} />
        </div>
      </motion.div>
    </section>
  );
};

export default InteriorDesignStudio3Hero;
