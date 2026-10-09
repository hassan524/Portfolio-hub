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

const DISPLAY = "'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif";
const EASE = [0.16, 1, 0.3, 1];

export const InteriorDesignStudio1Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [idx, setIdx] = useState(0);

  const bg = theme.bg || "#101012";
  const ink = theme.ink || "#FFFFFF";
  const ink2 = theme["ink-second"] || "#A1A1AA";
  const accent = theme.accent || "#38BDF8";
  const rule = "rgba(255,255,255,0.12)";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const quotes = p.quotes || [
    {
      text: "They turned our 1920s penthouse into a calm room of shadow and warm oak. Their command of natural light is unmatched.",
      author: "Marcus & Elena Lindqvist",
      role: "Fjord Villa, Oslo",
      publication: "Architectural Digest, 2025",
    },
    {
      text: "Working with this studio changed how our team meets. The acoustics, the bronze, the stone tables made our headquarters feel permanent.",
      author: "Sofia D’Agostino",
      role: "Solis Headquarters, Milan",
      publication: "Domus, 2024",
    },
    {
      text: "A masterclass in quiet luxury. No garnish. Just proportion, honest material and flow.",
      author: "Kenzo Takahashi",
      role: "Kyoto Pavilion",
      publication: "A+U, 2024",
    },
  ];

  const q = quotes[idx];

  return (
    <section
      id="testimonials"
      className="px-6 md:px-12 lg:px-16 py-28 border-t"
      style={{ backgroundColor: bg, color: ink, borderColor: rule }}
    >
      {/* Header row: label left, selector right */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex items-center justify-between mb-14"
      >
        <span className="text-xs uppercase font-mono tracking-widest" style={{ color: ink2 }}>
          <Editable value={p.sectionTag || "03 — In Their Words"} onChange={(v) => handleUpdate("sectionTag", v)} />
        </span>
        <div className="flex items-center gap-5 font-mono text-xs">
          {quotes.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="cursor-pointer pb-1 border-b-2 transition-colors"
              style={{ color: idx === i ? accent : ink2, borderColor: idx === i ? accent : "transparent" }}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </motion.div>

      <div style={{ minHeight: "22rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <blockquote
              className="uppercase"
              style={{
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
                lineHeight: 1.02,
                maxWidth: "22ch",
              }}
            >
              “{q.text}”
            </blockquote>

            {/* Credit row: 3 columns on the same grid */}
            <div className="mt-12 pt-6 border-t grid grid-cols-1 md:grid-cols-12 gap-3 text-sm" style={{ borderColor: rule }}>
              <span className="md:col-span-4 font-bold uppercase tracking-wider" style={{ color: accent }}>
                {q.author}
              </span>
              <span className="md:col-span-4" style={{ color: ink2 }}>
                {q.role}
              </span>
              <span className="md:col-span-4 md:text-right font-mono text-xs self-center" style={{ color: ink2 }}>
                {q.publication}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteriorDesignStudio1Testimonials;