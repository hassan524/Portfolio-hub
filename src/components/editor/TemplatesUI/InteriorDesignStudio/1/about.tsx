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

const DISPLAY = "'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif";
const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

export const InteriorDesignStudio1About: React.FC<AboutProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#101012";
  const ink = theme.ink || "#FFFFFF";
  const ink2 = theme["ink-second"] || "#A1A1AA";
  const accent = theme.accent || "#38BDF8";
  const rule = "rgba(255,255,255,0.12)";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const services = p.services || [
    "Residential Architecture",
    "Atmospheric Lighting",
    "Bespoke Millwork",
    "Material Sourcing",
    "Heritage Restoration",
    "Acoustic Curation",
  ];

  const stats = p.stats || [
    { value: "16+", label: "Years of practice" },
    { value: "92", label: "Finished spaces" },
    { value: "08", label: "Design awards" },
  ];

  return (
    <section
      id="about"
      className="px-6 md:px-12 lg:px-16 py-28 border-t"
      style={{ backgroundColor: bg, color: ink, borderColor: rule }}
    >
      <motion.span {...reveal()} className="block text-xs uppercase font-mono tracking-widest mb-8" style={{ color: ink2 }}>
        <Editable value={p.sublabel || "02 — Studio"} onChange={(v) => handleUpdate("sublabel", v)} />
      </motion.span>

      <motion.h2
        {...reveal(0.1)}
        className="uppercase"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: "clamp(2.8rem, 8vw, 8rem)",
          lineHeight: 0.95,
          maxWidth: "18ch",
        }}
      >
        <Editable
          value={p.statement || "We shape proportion, shadow and raw substance into spaces that outlast trends."}
          onChange={(v) => handleUpdate("statement", v)}
        />
      </motion.h2>

      {/* Two columns: start at col 1 and col 7, same as Hero and Contact */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12 mt-20 pt-12 border-t" style={{ borderColor: rule }}>
        <motion.div {...reveal()} className="md:col-span-5 space-y-6 text-sm md:text-base leading-relaxed" style={{ color: ink2 }}>
          <p>
            <Editable
              value={
                p.para1 ||
                "Interiors are not decoration. They are the vessels through which ritual, focus and emotion are shaped. We strip away ornament and let the material do the talking."
              }
              onChange={(v) => handleUpdate("para1", v)}
            />
          </p>
          <p>
            <Editable
              value={
                p.para2 ||
                "From private residences in the Alps to creative workspaces in Tokyo, we work between craft, climate and honesty. Every surface is chosen to age well."
              }
              onChange={(v) => handleUpdate("para2", v)}
            />
          </p>
        </motion.div>

        <motion.div {...reveal(0.15)} className="md:col-span-5 md:col-start-8">
          <h4 className="text-xs uppercase font-mono tracking-widest mb-4" style={{ color: ink2 }}>
            Services
          </h4>
          <ul>
            {services.map((s: string, i: number) => (
              <motion.li
                key={i}
                whileHover={{ x: 8, color: accent }}
                transition={{ duration: 0.2 }}
                className="flex items-baseline justify-between py-3 border-t text-sm uppercase tracking-wider font-semibold"
                style={{ borderColor: rule }}
              >
                <span>{s}</span>
                <span className="font-mono text-xs" style={{ color: ink2 }}>
                  0{i + 1}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Stats: 3 equal columns, left aligned */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-20 pt-12 border-t" style={{ borderColor: rule }}>
        {stats.map((s: any, i: number) => (
          <motion.div key={i} {...reveal(i * 0.12)}>
            <span
              className="block leading-none"
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(4rem, 10vw, 9rem)",
                color: i % 2 === 0 ? accent : ink,
              }}
            >
              {s.value}
            </span>
            <span className="block mt-3 text-xs uppercase tracking-widest" style={{ color: ink2 }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default InteriorDesignStudio1About;