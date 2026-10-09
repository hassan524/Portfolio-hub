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

const SERIF = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";
const EASE = [0.16, 1, 0.3, 1];

export const InteriorDesignStudio2Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [idx, setIdx] = useState(0);

  const bg2 = theme["bg-second"] || "#E7E1D5";
  const ink = theme.ink || "#17201B";
  const ink2 = theme["ink-second"] || "#5C655F";
  const accent = theme.accent || "#2F5D46";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const quotes = p.quotes || [
    {
      text: "Alder understood how we wanted to live before we did. The house feels like a long exhale.",
      name: "Astrid & Jonas Holm",
      meta: "Hus Nord, Copenhagen",
    },
    {
      text: "Every material was chosen with care and explained with patience. Guests ask to stay longer.",
      name: "Matteo Ricci",
      meta: "The Orchard Rooms, Somerset",
    },
    {
      text: "Quiet, precise and warm. The best decision we made on the whole renovation.",
      name: "Camille Beaumont",
      meta: "Casa Marés, Lisbon",
    },
  ];

  const q = quotes[idx];

  return (
    <section
      id="testimonials"
      className="px-6 md:px-12 lg:px-16 py-32"
      style={{ backgroundColor: bg2, color: ink }}
    >
      {/* Centered layout, a deliberate contrast to the left-aligned sections */}
      <div className="max-w-4xl mx-auto text-center">
        <span className="block text-xs uppercase tracking-[0.2em] mb-10" style={{ color: accent }}>
          <Editable value={p.tag || "Kind words"} onChange={(v) => handleUpdate("tag", v)} />
        </span>

        <div style={{ minHeight: "20rem" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <blockquote
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(2rem, 4.8vw, 4.2rem)",
                  lineHeight: 1.08,
                }}
              >
                “{q.text}”
              </blockquote>
              <p className="mt-10 text-sm font-medium tracking-wide">{q.name}</p>
              <p className="mt-1 text-xs" style={{ color: ink2 }}>{q.meta}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          {quotes.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Quote ${i + 1}`}
              className="h-[3px] cursor-pointer transition-all duration-300"
              style={{ width: idx === i ? 48 : 20, backgroundColor: idx === i ? accent : "rgba(23,32,27,0.25)" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export const InteriorDesignStudio3Testimonials = InteriorDesignStudio2Testimonials;
export default InteriorDesignStudio2Testimonials;