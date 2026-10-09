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

const SERIF = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";
const EASE = [0.16, 1, 0.3, 1];

export const InteriorDesignStudio2Hero: React.FC<HeroProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const accent = theme.accent || "#2F5D46";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col text-white"
      style={{ backgroundColor: "#0c120f" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');`}</style>

      {/* Full-bleed background photo with slow zoom */}
      <motion.img
        src={
          p.heroImage ||
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=85"
        }
        alt="Interior"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Readability overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,12,10,0.55) 0%, rgba(8,12,10,0.15) 40%, rgba(8,12,10,0.7) 100%)" }} />
      <div className="absolute inset-0 mix-blend-multiply opacity-40" style={{ backgroundColor: accent }} />

      {/* Content grid */}
      <div className="relative z-10 flex-1 px-6 md:px-12 lg:px-16 pt-32 pb-10 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10 content-between">
        {/* Title block: right half, like the reference */}
        <div className="md:col-span-7 md:col-start-6">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(5rem, 15vw, 15rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
            }}
          >
            <Editable value={p.title1 || "Alder"} onChange={(v) => handleUpdate("title1", v)} />
            <br />
            <span style={{ fontStyle: "italic" }}>
              <Editable value={p.title2 || "Studio ’26"} onChange={(v) => handleUpdate("title2", v)} />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              className="px-7 py-3.5 rounded-full bg-white text-[#17201B] text-[13px] font-medium"
            >
              <Editable value={p.btn1 || "View selected work"} onChange={(v) => handleUpdate("btn1", v)} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              className="px-7 py-3.5 rounded-full text-[13px] font-medium border border-white/60 backdrop-blur-sm"
            >
              <Editable value={p.btn2 || "Start a project ↗"} onChange={(v) => handleUpdate("btn2", v)} />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom row: blurb left (col 1), meta right (col 9) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-end pt-6 border-t border-white/25"
        >
          <p className="md:col-span-4 text-sm leading-relaxed text-white/85">
            <Editable
              value={
                p.blurb ||
                "Alder is an interior architecture studio designing calm, tactile homes and hospitality spaces across Europe."
              }
              onChange={(v) => handleUpdate("blurb", v)}
            />
          </p>

          <div className="md:col-span-4 md:col-start-9 grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="block uppercase tracking-widest text-white/60 mb-1">Studios</span>
              <Editable value={p.studios || "Copenhagen · Lisbon · London"} onChange={(v) => handleUpdate("studios", v)} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="block uppercase tracking-widest text-white/60 mb-1">Status</span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <Editable value={p.status || "Booking 2027"} onChange={(v) => handleUpdate("status", v)} />
                </span>
              </div>
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-lg">
                ↓
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const InteriorDesignStudio3Hero = InteriorDesignStudio2Hero;
export default InteriorDesignStudio2Hero;