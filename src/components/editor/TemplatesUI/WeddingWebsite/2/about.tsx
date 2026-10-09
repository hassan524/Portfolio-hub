// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaLeaf, FaFeatherPointed, FaGem } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite2About: React.FC<AboutProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#FAF7FD";
  const ink = theme.ink || "#201235";
  const accent = theme.accent || "#8B5CF6";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const atelierPillars = [
    {
      num: "01",
      title: "400gsm Handmade Cotton Rag",
      provenance: "Amalfi & Fabriano, Italy",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
      desc: "Our cards are crafted from 100% recycled cotton remnants from the garment industry. No trees are felled. The deckled edges are created naturally with water deckle frames, producing a soft, feathery rim.",
    },
    {
      num: "02",
      title: "Vintage Letterpress & Gold Foil",
      provenance: "Cast-Iron Heidelbergs (1954)",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
      desc: "We print using hand-mixed vegetable-based oil inks and heavy brass plates that physically sculpt your wedding date and names into the paper. The deboss has a deep, luxurious dimensional depth.",
    },
    {
      num: "03",
      title: "Haute Confections & Favor Treats",
      provenance: "Provence Almonds & Real Lavender",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
      desc: "For couples wanting exquisite culinary favors, we bake French macarons and organic lavender shortbread in micro-batches 48 hours prior to your wedding, packaged in gold-embossed sleeves.",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-36 overflow-hidden bg-white border-t border-b border-purple-100"
      style={{ color: ink }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-20 relative z-10">
        
        {/* Editorial Top Headline Spread */}
        <div className="max-w-4xl space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-purple-700 font-bold block">
            The Atelier Manifesto
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-purple-950 leading-tight">
            <Editable
              value={p.aboutH2 || "In an era of disposable digital messages, we craft tangible heirlooms that guests preserve for decades."}
              onChange={(v) => handleUpdate("aboutH2", v)}
            />
          </h2>
          <p className="text-base sm:text-lg text-purple-900/80 leading-relaxed font-light">
            <Editable
              value={
                p.aboutLead ||
                "Maison Violette was born in a sunlit Provence workshop with a single 1950s cast-iron press and a copper confectionery kettle. We believe that receiving a wedding card in the mail or unboxing an artisan guest favor should be a sensorial ritual: the crisp texture of cotton deckle, the scent of lavender sealing wax, and the weight of genuine craftsmanship."
              }
              onChange={(v) => handleUpdate("aboutLead", v)}
            />
          </p>
        </div>

        {/* 3-Column Architectural Provenance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {atelierPillars.map((pillar) => (
            <div
              key={pillar.num}
              className="group rounded-3xl bg-purple-50/40 border border-purple-100 p-6 space-y-5 transition-all hover:bg-white hover:shadow-xl hover:border-purple-200"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-purple-100">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-mono font-bold uppercase tracking-wider text-purple-900 px-3 py-1 rounded-full shadow-xs">
                  {pillar.num}
                </span>
              </div>

              {/* Text Specs */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-purple-600 block">
                  {pillar.provenance}
                </span>
                <h3 className="text-xl font-serif font-bold text-purple-950">
                  {pillar.title}
                </h3>
                <p className="text-xs text-purple-900/75 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Quote & Founder Colophon */}
        <div className="p-8 sm:p-12 rounded-3xl bg-purple-50/70 border border-purple-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-2 text-center md:text-left">
            <h4 className="text-lg font-serif font-bold text-purple-950">
              Direct Collaboration With the Artisan
            </h4>
            <p className="text-xs text-purple-900/80 leading-relaxed font-sans">
              Every commission begins with a personal conversation directly with our maker. We send photo swatches, test ink runs, and progress videos so you are part of the making journey.
            </p>
          </div>

          <a
            href="#contact"
            className="shrink-0 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-700 text-white hover:bg-purple-800 transition-colors shadow-sm"
          >
            Request Paper Swatches Directly
          </a>
        </div>

      </div>
    </section>
  );
};

export default WeddingWebsite2About;
