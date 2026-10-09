// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheck } from "react-icons/fa6";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite2Projects: React.FC<ProjectsProps> = ({
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

  const sheets = [
    {
      index: "N° 01",
      category: "Invitation Suites & Cards",
      title: p.s1Title || "The Versailles Letterpress & Gold Foil Wedding Suite",
      tagline: p.s1Tag || "Deckle-edge Italian cotton paper with deep deboss & botanical wax seals",
      price: "From $4.80 / suite",
      leadTime: "2 to 3 weeks",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      specs: [
        "400gsm Heavy Italian cotton rag with feathery deckle edges",
        "Deep blind deboss and 24k metallic hot foil typography",
        "Custom euro-flap envelopes with botanical floral linings",
      ],
    },
    {
      index: "N° 02",
      category: "Culinary Favors & Confections",
      title: p.s2Title || "Provence Lavender French Macaron Favor Boxes",
      tagline: p.s2Tag || "Micro-batch macarons in gold-embossed presentation boxes with violet silk",
      price: "From $5.50 / gift box",
      leadTime: "Baked 48h before event",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      specs: [
        "Lavender Honey, Rose Raspberry, and Vanilla ganache fillings",
        "Rigid white lacquer boxes tied with botanical-dyed silk ribbon",
        "Temperature-controlled express courier dispatch direct to venue",
      ],
    },
    {
      index: "N° 03",
      category: "Vow Scrolls & Ribbons",
      title: p.s3Title || "Hand-Calligraphed Silk Vow Scrolls & Streamers",
      tagline: p.s3Tag || "Flowing raw silk streamers lettered with your sacred vows in walnut ink",
      price: "From $90 / set of 2",
      leadTime: "7 to 10 days",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      specs: [
        "Grade 6A pure Mulberry Silk with hand-torn feather edges",
        "French archival sepia ink or genuine gold calligraphy",
        "Delivered in matching linen heirloom keepsake storage pouch",
      ],
    },
    {
      index: "N° 04",
      category: "Ceremony Keepsakes",
      title: p.s4Title || "Hand-Sculpted Porcelain Ring Cradle with 24k Gold Rim",
      tagline: p.s4Tag || "Translucent fine porcelain dish stamped with initials and liquid gold luster",
      price: "$52 each",
      leadTime: "8 to 12 days",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      specs: [
        "High-fire fine porcelain with organic hand-pinched well",
        "24-Karat bright liquid gold overglaze fired at 780°C",
        "Includes velvet-lined lilac presentation gift box",
      ],
    },
  ];

  return (
    <section
      id="projects"
      className="relative w-full py-20 md:py-28 overflow-hidden bg-white"
      style={{ color: ink }}
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-purple-200">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-purple-700 font-bold block">
              Curated Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-purple-950">
              <Editable
                value={p.projH2 || "Stationery Suites, Favors & Keepsakes"}
                onChange={(v) => handleUpdate("projH2", v)}
              />
            </h2>
            <p className="text-sm text-purple-900/80 leading-relaxed font-light">
              <Editable
                value={
                  p.projDesc ||
                  "Every piece is individually handcrafted in Provence. We customize paper stocks, calligraphy scripts, and confectionery flavors for your day."
                }
                onChange={(v) => handleUpdate("projDesc", v)}
              />
            </p>
          </div>

          <div className="shrink-0 text-left md:text-right space-y-0.5">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-purple-900">
              Haute Atelier Service
            </p>
            <p className="text-xs text-purple-700">
              Direct consultation on WhatsApp & studio desk
            </p>
          </div>
        </div>

        {/* Clean, Simple & Visual Alternating Rows (Less text, no confusion!) */}
        <div className="space-y-14">
          {sheets.map((sheet, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={sheet.index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FAF6FD] rounded-3xl p-6 sm:p-10 border border-purple-200 shadow-sm"
              >
                {/* Photo Column */}
                <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-white bg-purple-100">
                    <img
                      src={sheet.image}
                      alt={sheet.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 text-[10px] font-mono font-bold uppercase tracking-wider text-purple-900 px-3 py-1 rounded-full shadow-xs">
                      {sheet.category}
                    </div>
                  </div>
                </div>

                {/* Information Column (Simple & Clear) */}
                <div className={`lg:col-span-7 space-y-4 ${isReversed ? "lg:order-1" : "lg:order-2"} text-left`}>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-widest text-purple-600">
                        {sheet.index}
                      </span>
                      <span className="text-base font-serif font-bold text-purple-950">
                        {sheet.price}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-purple-950">
                      {sheet.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-800/80 font-sans italic">
                      {sheet.tagline}
                    </p>
                  </div>

                  {/* 3 Clear Bullet Specs */}
                  <div className="space-y-1.5 pt-1 text-xs text-purple-950/80">
                    {sheet.specs.map((sp, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <FaCheck className="text-purple-600 text-[10px] shrink-0" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all shadow-sm hover:scale-105"
                      style={{ backgroundColor: accent }}
                    >
                      <span>Commission Piece</span>
                      <FaArrowRight className="text-xs" />
                    </a>

                    <span className="text-xs text-purple-700/80 font-mono">
                      ⏱ Lead Time: {sheet.leadTime}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WeddingWebsite2Projects;
