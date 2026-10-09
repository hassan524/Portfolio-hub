// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const InteriorDesignStudio3Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [selected, setSelected] = useState(0);

  const bg = theme.bg || "#080808";
  const ink = theme.ink || "#FFFFFF";
  const accent = theme.accent || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const press = [
    {
      quote: "Adria Vale has emerged as one of the most uncompromising voices in contemporary European spatial architecture. Her Engadin mountain residence stands as a radical triumph of dark stone and silence.",
      source: "ARCHITECTURAL DIGEST",
      issue: "Issue 348 // European Masters",
      year: "2025",
    },
    {
      quote: "A rare architectural practice where restraint is wielded not as an absence of ideas, but as a deliberate shield against the noise of modern life.",
      source: "DOMUS INTERNATIONAL",
      issue: "Monograph Focus // Vol. 1092",
      year: "2024",
    },
    {
      quote: "Every joint, reveal, and recessed light source is resolved with the precision of a Swiss horological instrument. Immensely powerful living spaces.",
      source: "WALLPAPER* DESIGN AWARDS",
      issue: "Best Private Residence Global",
      year: "2024",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative px-6 md:px-12 lg:px-16 py-28 border-t border-white/10"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500">
            CRITICAL APPRAISAL // MONOGRAPHS
          </span>
          <div className="flex items-center gap-4 font-mono text-xs">
            {press.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`transition-colors cursor-pointer ${
                  selected === i ? "text-white font-bold underline underline-offset-4" : "text-zinc-600 hover:text-zinc-400"
                }`}
              >
                [0{i + 1}]
              </button>
            ))}
          </div>
        </div>

        {/* Large Monographic Quote (NO CARDS) */}
        <div className="min-h-[240px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-10"
            >
              <blockquote
                className="text-2xl sm:text-4xl md:text-5xl font-normal leading-[1.15] text-white"
                style={{ fontFamily: "'Times New Roman', Times, serif, system-ui" }}
              >
                “{press[selected].quote}”
              </blockquote>

              <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-400">
                <span className="text-white font-bold tracking-wider">{press[selected].source}</span>
                <span>/</span>
                <span>{press[selected].issue}</span>
                <span>/</span>
                <span className="text-zinc-500">{press[selected].year}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InteriorDesignStudio3Testimonials;
