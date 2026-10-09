// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const SERIF = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";
const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

export const InteriorDesignStudio2About: React.FC<AboutProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#F2EEE6";
  const ink = theme.ink || "#17201B";
  const ink2 = theme["ink-second"] || "#5C655F";
  const accent = theme.accent || "#2F5D46";
  const rule = "rgba(23,32,27,0.15)";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const principles = p.principles || [
    { t: "Light first", d: "We orient every room around how daylight moves across it before choosing a single material." },
    { t: "Honest materials", d: "Oak, lime plaster, stone and linen, left to age and patinate rather than be hidden." },
    { t: "Built to stay", d: "Furniture and joinery designed for decades, not seasons, made by workshops we know by name." },
  ];

  const stats = p.stats || [
    { v: "14", l: "Years" },
    { v: "120+", l: "Homes" },
    { v: "6", l: "Countries" },
  ];

  return (
    <section
      id="about"
      className="px-6 md:px-12 lg:px-16 py-28"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-14">
        {/* Sticky photo, cols 1-5 */}
        <div className="md:col-span-5">
          <div className="md:sticky md:top-28">
            <motion.div {...reveal()} className="aspect-[3/4] overflow-hidden">
              <motion.img
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE }}
                src={
                  p.image ||
                  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1400&q=85"
                }
                alt="Studio interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <p className="mt-3 text-xs" style={{ color: ink2 }}>
              <Editable value={p.caption || "Fig. 01 — Lisbon apartment, lime plaster and oak"} onChange={(v) => handleUpdate("caption", v)} />
            </p>
          </div>
        </div>

        {/* Text, cols 7-12 */}
        <div className="md:col-span-6 md:col-start-7">
          <motion.span {...reveal()} className="block text-xs uppercase tracking-[0.2em] mb-6" style={{ color: accent }}>
            <Editable value={p.tag || "About the studio"} onChange={(v) => handleUpdate("tag", v)} />
          </motion.span>

          <motion.h2
            {...reveal(0.1)}
            style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)", lineHeight: 1 }}
          >
            <Editable
              value={p.statement || "Rooms that feel quiet, warm and quietly yours."}
              onChange={(v) => handleUpdate("statement", v)}
            />
          </motion.h2>

          <motion.p {...reveal(0.15)} className="mt-8 text-base leading-relaxed max-w-lg" style={{ color: ink2 }}>
            <Editable
              value={
                p.para ||
                "Alder was founded to design homes that slow people down. We work closely with a small number of clients each year, from first sketch to the last cushion, so every detail has an owner."
              }
              onChange={(v) => handleUpdate("para", v)}
            />
          </motion.p>

          {/* Principles: ruled list */}
          <div className="mt-14 border-b" style={{ borderColor: rule }}>
            {principles.map((pr: any, i: number) => (
              <motion.div
                key={i}
                {...reveal(i * 0.08)}
                className="grid grid-cols-12 gap-4 py-6 border-t"
                style={{ borderColor: rule }}
              >
                <span className="col-span-2 text-xs pt-2" style={{ color: ink2 }}>0{i + 1}</span>
                <div className="col-span-10">
                  <h3 style={{ fontFamily: SERIF, fontSize: "2rem", lineHeight: 1.1 }}>{pr.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: ink2 }}>{pr.d}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-14">
            {stats.map((s: any, i: number) => (
              <motion.div key={i} {...reveal(i * 0.1)}>
                <span className="block leading-none" style={{ fontFamily: SERIF, fontSize: "clamp(3rem, 6vw, 5rem)", color: accent }}>
                  {s.v}
                </span>
                <span className="block mt-2 text-xs uppercase tracking-widest" style={{ color: ink2 }}>{s.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const InteriorDesignStudio3About = InteriorDesignStudio2About;
export default InteriorDesignStudio2About;