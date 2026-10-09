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

export const InteriorDesignStudio3About: React.FC<AboutProps> = ({
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
      id="about"
      className="relative px-6 md:px-12 lg:px-16 py-28 border-t border-white/10"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Portrait (As seen in Image 3 bottom) */}
        <div className="lg:col-span-4">
          <div className="relative aspect-[3/4] w-full bg-zinc-900 border border-white/20 overflow-hidden">
            <img
              src={
                p.profileImg ||
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85"
              }
              alt="Adria Vale"
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
          </div>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            FIG. 01 — ADRIA VALE // ZURICH ATELIER
          </div>
        </div>

        {/* Right Column: HELLO THERE / I'M ADRIA VALE Narrative (Exact Image 3 Layout) */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 block mb-2">
              <Editable value={p.introTag || "HELLO THERE"} onChange={(v) => handleUpdate("introTag", v)} />
            </span>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]"
              style={{ fontFamily: "'Times New Roman', Times, serif, system-ui" }}
            >
              <Editable value={p.introName || "I'M ADRIA VALE"} onChange={(v) => handleUpdate("introName", v)} />
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-zinc-400 font-normal">
            <p>
              <Editable
                value={
                  p.bio1 ||
                  "I am an architectural director and spatial curator creating contemplative environments for private collectors, cultural institutions, and quiet residential estates. Over the past twelve years, my practice has maintained a single conviction: simplicity is not the absence of clutter, but the mastery of proportion."
                }
                onChange={(v) => handleUpdate("bio1", v)}
              />
            </p>
            <p>
              <Editable
                value={
                  p.bio2 ||
                  "Educated at ETH Zurich and shaped by apprenticeships in Kyoto, my studio merges Alpine structural precision with Japanese spatial fluidity. We specify monolithic raw stones, lime washes, cast iron fixtures, and bespoke timber that will outlive the trends of the digital era."
                }
                onChange={(v) => handleUpdate("bio2", v)}
              />
            </p>
          </div>

          {/* Direct Atelier Milestones (Plain text list, NO CARDS) */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <span className="text-zinc-500 block">LOCATION</span>
              <span className="text-white font-bold">ZURICH, CH</span>
            </div>
            <div>
              <span className="text-zinc-500 block">EDUCATION</span>
              <span className="text-white font-bold">ETH ZURICH // ARCH</span>
            </div>
            <div>
              <span className="text-zinc-500 block">MONOGRAPHS</span>
              <span className="text-white font-bold">HATJE CANTZ (2024)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorDesignStudio3About;
