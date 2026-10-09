// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite2Hero: React.FC<HeroProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#F5EEFD";
  const ink = theme.ink || "#2E1065";
  const accent = theme.accent || "#7C3AED";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const galleryItems = [
    {
      title: "Letterpress Cards & Suites",
      desc: "400gsm cotton rag with gold foil deboss",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Haute French Macarons",
      desc: "Micro-batch baked with Provence lavender",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80",
    },
    {
      title: "Porcelain Ring Cradles",
      desc: "Double-fired porcelain with 24k gold rim",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=700&q=80",
    },
  ];

  return (
    <section
      className="relative w-full min-h-[92vh] flex flex-col items-center justify-center overflow-hidden py-16 md:py-24"
      style={{
        backgroundColor: bg,
        color: ink,
      }}
    >
      {/* Rich Purple Ambient Glow Orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #A855F7 0%, #7C3AED 40%, transparent 75%)" }}
      />

      <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 relative z-10 space-y-14 text-center">
        
        {/* Centered Majestic Headline (NO BADGE OVER TEXT!) */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-serif font-bold tracking-tight leading-[1.05] text-purple-950">
            <Editable
              value={p.heroTitlePrefix || "The tactile poetry of bespoke wedding"}
              onChange={(v) => handleUpdate("heroTitlePrefix", v)}
            />{" "}
            <span
              className="italic font-normal block mt-1"
              style={{
                background: "linear-gradient(135deg, #6D28D9, #9333EA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <Editable
                value={p.heroTitleAccent || "cards, papers & haute confections."}
                onChange={(v) => handleUpdate("heroTitleAccent", v)}
              />
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-purple-900/80 max-w-2xl mx-auto leading-relaxed font-light">
            <Editable
              value={
                p.heroDesc ||
                "Handcrafted in our Provence atelier on vintage presses and copper kettles. From letterpress cards with hand-poured wax seals to fresh lavender-honey favor treats."
              }
              onChange={(v) => handleUpdate("heroDesc", v)}
            />
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold text-white shadow-xl transition-all"
              style={{
                backgroundColor: accent,
                boxShadow: "0 10px 25px -4px rgba(124, 58, 237, 0.45)",
              }}
            >
              <span>
                <Editable value={p.heroCta1 || "Explore Curated Portfolio"} onChange={(v) => handleUpdate("heroCta1", v)} />
              </span>
              <FaArrowRight className="text-xs" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold border border-purple-300 text-purple-950 bg-white hover:bg-purple-100 transition-all shadow-sm"
            >
              <FaWhatsapp className="text-emerald-600 text-sm" />
              <span>
                <Editable value={p.heroCta2 || "Direct Studio Inquiry"} onChange={(v) => handleUpdate("heroCta2", v)} />
              </span>
            </motion.a>
          </div>
        </div>

        {/* Wide Horizontal Work Showcase Gallery Strip (Full-Width, NOT A CARD!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="group rounded-3xl overflow-hidden bg-white border border-purple-200/90 shadow-lg text-left"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-purple-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-5 space-y-1">
                <h4 className="text-base font-serif font-bold text-purple-950">
                  {item.title}
                </h4>
                <p className="text-xs text-purple-800/80 font-sans">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WeddingWebsite2Hero;
