// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaBolt, FaTag, FaStar } from "react-icons/fa6";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand3Projects: React.FC<ProjectsProps> = ({
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

  const drops = [
    {
      id: "deck",
      category: "HARDGOODS // PRO DECK",
      title: 'Concrete "BQE Underpass" 8.25" Deck',
      price: "$75 USD",
      specs: 'Width: 8.25" • Length: 31.875" • Wheelbase: 14.25"',
      wood: "7-Ply Canadian Hard Rock Maple with Black Full Dip",
      image: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=1200&q=80",
      description:
        "High-kick nose and tail shape with medium-deep concave engineered for ledge locking and flatground flicks. Hand-screenprinted art by BK graffiti artist ZEUS.",
      edition: "Batch of 150 Decks Pressed",
      stock: "28 Remaining in Stock",
    },
    {
      id: "hoodie",
      category: "HEAVY APPAREL // 14OZ",
      title: 'NYC "Subway Token" 14oz Heavyweight Hoodie',
      price: "$130 USD",
      specs: "450GSM Reverse-Weave Heavy Cotton Fleece",
      wood: "Pre-shrunk, side-rib gussets, screenprinted front & back",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
      description:
        "Thickest hoodie in New York. Cross-grain cut resists vertical shrinking. Massive double-lined hood that holds shape even in high wind on Manhattan Bridge crossings.",
      edition: "Batch of 200 Hoodies Printed",
      stock: "Low Stock (14 Units)",
    },
    {
      id: "pants",
      category: "WORKWEAR // DOUBLE KNEE",
      title: 'Concrete "Tompkins" Duck Canvas Carpenter Pant',
      price: "$145 USD",
      specs: "12oz 100% Cotton Ring-Spun Duck Canvas",
      wood: "Reinforced double knees with dirt release openings",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80",
      description:
        "Built to withstand abrasive grip tape wear and concrete falls. Triple-stitched main seams, hammer loop, and utility tool pockets.",
      edition: "Batch of 120 Pairs Sewn",
      stock: "Only 9 Left",
    },
  ];

  const [activeDrop, setActiveDrop] = useState(drops[0]);

  return (
    <section id="projects" className="relative w-full py-28 bg-[#F4F3EE] text-black border-b-4 border-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-black pb-8">
          <div>
            <span className="inline-block bg-[#2563EB] text-white font-black text-xs px-3 py-1 uppercase tracking-widest border-2 border-black rotate-[1deg] mb-3">
              <Editable value={p.projSub || "CURRENT HARDWARE RELEASE // DROP 09"} onChange={(v) => handleUpdate("projSub", v)} />
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-sans">
              <Editable value={p.projTitle || "Decks, Fleece & Workwear"} onChange={(v) => handleUpdate("projTitle", v)} />
            </h2>
          </div>
          <div className="bg-[#FACC15] px-4 py-2 border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000]">
            SHIPPED DIRECT FROM BROOKLYN WAREHOUSE
          </div>
        </div>

        {/* Tab Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {drops.map((item) => {
            const isSelected = activeDrop.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDrop(item)}
                className={`text-left p-6 border-4 border-black transition-all duration-200 ${
                  isSelected
                    ? "bg-[#FACC15] shadow-[6px_6px_0px_#000] -translate-y-1"
                    : "bg-white shadow-[3px_3px_0px_#000] hover:bg-[#FAF9F5]"
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs font-black uppercase">
                  <span className="text-[#2563EB]">{item.category}</span>
                  <span className="bg-black text-white px-2 py-0.5">{item.price}</span>
                </div>
                <h3 className="text-lg font-black uppercase mb-2 font-sans">{item.title}</h3>
                <p className="text-xs text-[#404040] font-bold mb-4">{item.specs}</p>
                <div className="pt-3 border-t-2 border-black text-xs font-black flex items-center justify-between">
                  <span>{item.edition}</span>
                  <span className="text-[#DC2626]">{item.stock}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Drop Spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDrop.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="border-4 border-black bg-white shadow-[10px_10px_0px_#000] grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
          >
            {/* Image */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-black">
              <img
                src={activeDrop.image}
                alt={activeDrop.title}
                className="w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute top-6 left-6 bg-[#FACC15] text-black font-black text-xs px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#000] uppercase">
                {activeDrop.category}
              </div>
            </div>

            {/* Information */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8 bg-[#F4F3EE]">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#2563EB] block mb-1">
                    ITEM PROFILE // {activeDrop.id.toUpperCase()}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                    {activeDrop.title}
                  </h3>
                  <div className="text-2xl font-black text-[#2563EB] pt-2">
                    {activeDrop.price}
                  </div>
                </div>

                <p className="text-sm text-[#333333] leading-relaxed font-bold">
                  {activeDrop.description}
                </p>

                <div className="p-4 bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-2 text-xs font-bold">
                  <div className="flex items-center gap-2 text-black font-black">
                    <FaBolt className="text-[#2563EB]" />
                    <span>TECHNICAL CONSTRUCTION:</span>
                  </div>
                  <p className="text-[#555555]">
                    {activeDrop.wood}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t-2 border-black flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 font-black text-xs uppercase tracking-wider text-white bg-black hover:bg-[#2563EB] transition-colors border-2 border-black shadow-[4px_4px_0px_#FACC15]"
                >
                  <span>Grab Gear At Clubhouse</span>
                  <FaArrowRight className="text-xs" />
                </a>
                <span className="text-xs font-black text-[#DC2626]">
                  {activeDrop.stock}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default StreetwearBrand3Projects;
