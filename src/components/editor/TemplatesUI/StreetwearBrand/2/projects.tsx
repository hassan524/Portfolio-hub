// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaDiamond, FaRulerCombined } from "react-icons/fa6";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand2Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const silhouettes = [
    {
      id: "overcoat",
      code: "SILHOUETTE 01 // OVERCOAT",
      name: "Monolithic Double-Faced Wool Greatcoat",
      price: "$1,450 USD",
      composition: "90% Biella Virgin Wool • 10% Cashmere (650GSM)",
      proportions: "Floor-length floor-sweep drape with exaggerated peak lapels.",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80",
      description:
        "Hand-stitched double-faced wool construction requiring 32 hours of bench tailoring per piece. Unlined interior with bound silk organza seams and horn button closure.",
      edition: "Numbered 01 to 25 Worldwide",
    },
    {
      id: "trouser",
      code: "SILHOUETTE 02 // TROUSER",
      name: "Architectural Deep-Pleat Volume Trouser",
      price: "$680 USD",
      composition: "100% Kuroki Okayama Raw 16oz Selvedge Denim",
      proportions: "High-waist double inverted pleats with stacked hem break.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
      description:
        "Engineered with architectural inward pleats that hold dramatic sculptural geometry even when seated. Raw unwashed indigo that molds to the wearer's anatomy.",
      edition: "Numbered 01 to 40 Worldwide",
    },
    {
      id: "bomber",
      code: "SILHOUETTE 03 // OUTERWEAR",
      name: "Deconstructed Cocoon Flight Blouson",
      price: "$890 USD",
      composition: "Heavy Recycled High-Twist Flight Twill & Bemberg Lining",
      proportions: "Dramatic cocoon back volume with shortened front torso.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      description:
        "Sculpted balloon sleeves with internal tension webbing. Reversible design revealing contrast titanium hardware and magnetic drop utility pouches.",
      edition: "Numbered 01 to 30 Worldwide",
    },
  ];

  const [activeItem, setActiveItem] = useState(silhouettes[0]);

  return (
    <section id="projects" className="relative w-full py-28 bg-[#090D14] text-white border-b border-[#1E293B]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1E293B] pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#CCFF00] font-bold block mb-3">
              <Editable value={p.projSub || "COLLECTION XI LOOKBOOK // RUNWAY ARCHIVE"} onChange={(v) => handleUpdate("projSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-white font-sans">
              <Editable value={p.projTitle || "Sculptural Silhouettes"} onChange={(v) => handleUpdate("projTitle", v)} />
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
            <FaDiamond className="text-[#CCFF00] text-[10px]" />
            <span>INDIVIDUALLY NUMBERED ATELIER COMMISSIONS</span>
          </div>
        </div>

        {/* Silhouette Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {silhouettes.map((item) => {
            const isSelected = activeItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`text-left p-6 border transition-all duration-300 ${
                  isSelected
                    ? "bg-[#111724] border-[#CCFF00] shadow-[0_0_25px_rgba(204,255,0,0.25)]"
                    : "bg-[#0C101A] border-[#1E293B] hover:border-[#334155]"
                }`}
              >
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="text-[#CCFF00] font-bold tracking-widest">{item.code}</span>
                  <span className="text-white font-bold">{item.price}</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2 font-sans">{item.name}</h3>
                <p className="text-xs text-[#94A3B8] mb-4 font-light">{item.composition}</p>
                <div className="pt-3 border-t border-[#1E293B] text-xs font-mono text-[#CCFF00]/80">
                  {item.edition}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Silhouette Spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="border border-[#1E293B] bg-[#0E131E] grid grid-cols-1 lg:grid-cols-12 shadow-2xl overflow-hidden"
          >
            {/* Visual Photography */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px]">
              <img
                src={activeItem.image}
                alt={activeItem.name}
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E131E] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0E131E]" />
              <div className="absolute bottom-6 left-6 text-xs bg-black/80 backdrop-blur-md px-4 py-2 border border-[#CCFF00]/40 text-white font-mono flex items-center gap-2">
                <FaRulerCombined className="text-[#CCFF00]" />
                <span>FORM: {activeItem.proportions}</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest font-bold block">
                    {activeItem.code}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-light text-white font-sans uppercase">
                    {activeItem.name}
                  </h3>
                  <div className="text-xl font-bold text-white pt-1 font-mono">
                    {activeItem.price}
                  </div>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
                  {activeItem.description}
                </p>

                <div className="p-4 bg-[#141A29] border border-[#1E293B] space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#CCFF00] font-bold">
                    <FaDiamond className="text-[10px]" />
                    <span>TEXTILE CONSTITUENTS:</span>
                  </div>
                  <p className="text-white text-[11px] leading-relaxed">
                    {activeItem.composition}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-[#1E293B] flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-black bg-[#CCFF00] hover:bg-white transition-all shadow-md"
                >
                  <span>Request Commission</span>
                  <FaArrowRight className="text-xs" />
                </a>
                <span className="text-xs font-mono text-[#94A3B8]">
                  {activeItem.edition}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default StreetwearBrand2Projects;
