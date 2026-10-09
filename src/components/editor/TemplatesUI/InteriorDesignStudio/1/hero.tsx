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

const DISPLAY = "'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif";
const EASE = [0.16, 1, 0.3, 1];

export const InteriorDesignStudio1Hero: React.FC<HeroProps> = ({
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

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-72px)] flex flex-col px-6 md:px-12 lg:px-16 pt-8 pb-10"
      style={{ backgroundColor: bg, color: ink }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');`}</style>

      {/* Top line: left + right edge aligned with everything below */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex items-center justify-between text-[11px] uppercase tracking-widest"
        style={{ color: ink2 }}
      >
        <Editable value={p.heroTag || "THE COOL STUDIO™"} onChange={(v) => handleUpdate("heroTag", v)} />
        <Editable value={p.heroMeta || "Est. 2009 — London / Kyoto / Zurich"} onChange={(v) => handleUpdate("heroMeta", v)} />
      </motion.div>

      {/* Giant wordmark: left aligned to the same edge, fills the width */}
      <div className="flex-1 flex items-center overflow-hidden">
        <motion.h1
          initial={{ y: "40%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
          className="w-full uppercase text-left"
          style={{
            fontFamily: DISPLAY,
            color: accent,
            fontSize: "clamp(5rem, 25.5vw, 34rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.01em",
            fontWeight: 400,
            marginLeft: "-0.03em",
          }}
        >
          <Editable value={p.headline || "INSPIRED"} onChange={(v) => handleUpdate("headline", v)} />
        </motion.h1>
      </div>

      {/* Bottom: same 12-col grid. Left starts col 1, right starts col 7. */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t items-end"
        style={{ borderColor: rule }}
      >
        <h2
          className="md:col-span-6 uppercase whitespace-pre-line"
          style={{
            fontFamily: DISPLAY,
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            lineHeight: 0.95,
            fontWeight: 400,
          }}
        >
          <Editable value={p.taglineLeft || "CODE CRAFTED\nDREAMS DELIVERED"} onChange={(v) => handleUpdate("taglineLeft", v)} />
        </h2>

        <div className="md:col-span-6 lg:col-span-4 lg:col-start-9 flex flex-col gap-4">
          <div className="text-xs font-bold uppercase tracking-widest">
            <Editable value={p.subSlogan || "GET INSPIRED — FEEL ALIVE"} onChange={(v) => handleUpdate("subSlogan", v)} />
          </div>
          <p className="text-sm leading-relaxed" style={{ color: ink2 }}>
            <Editable
              value={
                p.manifesto ||
                "A solid strategy is the backbone of successful spaces. We collaborate with clients to craft, refine and build architectural solutions with a clear vision and a quiet respect for material."
              }
              onChange={(v) => handleUpdate("manifesto", v)}
            />
          </p>
          <div className="flex items-center gap-8 pt-2 text-xs font-bold uppercase tracking-widest">
            <motion.a href="#projects" whileHover={{ x: 4 }} className="underline underline-offset-8" style={{ color: accent }}>
              View Work ↓
            </motion.a>
            <motion.a href="#contact" whileHover={{ x: 4 }} style={{ color: ink }}>
              Start a Project →
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default InteriorDesignStudio1Hero;