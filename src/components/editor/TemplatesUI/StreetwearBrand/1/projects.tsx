// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaBarcode, FaBolt, FaTag } from "react-icons/fa6";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand1Projects: React.FC<ProjectsProps> = ({
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

  const garments = [
    {
      id: "hoodie",
      sku: "KR-480-HOD",
      name: "Tactical Oversized Box Hood 04",
      price: "$280 USD",
      fabric: "480GSM Japanese Wakayama Loopback Fleece",
      colorway: "Carbon Phantom (Acid Enzyme Distressed)",
      edition: "Limited Run of 120 Pieces",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80",
      description:
        "Double-layered hood with reinforced brim stitching. Dropped shoulder box silhouette, raw cut kangaroo pouch with concealed zippered stash compartment.",
      hardware: "Cobalt snaps & waxed drawstring aglets",
      status: "34 Pieces Left",
    },
    {
      id: "cargo",
      sku: "KR-702-CRG",
      name: "Articulated Cyber Cargo Pant",
      price: "$340 USD",
      fabric: "CORDURA® 500D Ripstop with Stretch Gussets",
      colorway: "Obsidian Black & Matte Gunmetal",
      edition: "Limited Run of 100 Pieces",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80",
      description:
        "Eight-pocket modular configuration with magnetic Fidlock closures. Anatomical knee darts for unrestricted bike commuting and urban exploration.",
      hardware: "Fidlock V-Buckles & YKK Excella Zips",
      status: "Low Stock (18 Remaining)",
    },
    {
      id: "jacket",
      sku: "KR-911-TRN",
      name: "Modular Waterproof Shell Trench",
      price: "$520 USD",
      fabric: "3-Layer GORE-TEX Pro Laminate",
      colorway: "Asphalt Concrete",
      edition: "Limited Run of 80 Pieces",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
      description:
        "Fully seam-taped technical trench with detachable tactical hood and sling harness system for hands-free transport indoors.",
      hardware: "Waterproof Aquaguard Zippers",
      status: "Limited Drop (12 Units)",
    },
  ];

  const [activeGarment, setActiveGarment] = useState(garments[0]);

  return (
    <section id="projects" className="relative w-full py-28 bg-[#09090C] text-white border-b border-rose-950/60 font-mono">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rose-950 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-rose-500 font-bold block mb-3">
              <Editable value={p.projSub || "CURRENT CAPSULE RELEASE // DROP 04"} onChange={(v) => handleUpdate("projSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              <Editable value={p.projTitle || "The Garment Roster"} onChange={(v) => handleUpdate("projTitle", v)} />
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-rose-400">
            <FaBarcode className="text-lg" />
            <span>AUTHENTICATED BATCH VERIFICATION</span>
          </div>
        </div>

        {/* Garment Selector Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {garments.map((g) => {
            const isSelected = activeGarment.id === g.id;
            return (
              <button
                key={g.id}
                onClick={() => setActiveGarment(g)}
                className={`text-left p-6 border transition-all duration-300 relative ${
                  isSelected
                    ? "bg-[#140A0D] border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.3)]"
                    : "bg-[#0E0E14] border-rose-950/80 hover:border-rose-900"
                }`}
              >
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-rose-400 font-bold tracking-widest">{g.sku}</span>
                  <span className="text-white font-bold">{g.price}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-sans">{g.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{g.fabric}</p>
                <div className="pt-3 border-t border-rose-950/60 text-xs flex items-center justify-between">
                  <span className="text-slate-500">{g.edition}</span>
                  <span className="text-rose-400 font-bold">{g.status}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Garment Detail Spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGarment.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="border border-rose-900/60 bg-[#101016] grid grid-cols-1 lg:grid-cols-12 shadow-2xl overflow-hidden"
          >
            {/* Visual Photography */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px]">
              <img
                src={activeGarment.image}
                alt={activeGarment.name}
                className="w-full h-full object-cover filter contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101016] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#101016]" />
              <div className="absolute bottom-6 left-6 text-xs bg-black/80 px-4 py-2 border border-rose-500/40 text-rose-300 flex items-center gap-2">
                <FaTag className="text-rose-500" />
                <span>COLORWAY: {activeGarment.colorway}</span>
              </div>
            </div>

            {/* Spec Information */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs text-rose-500 uppercase tracking-widest font-bold block">
                    TECH SPEC SHEET // {activeGarment.sku}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white font-sans uppercase">
                    {activeGarment.name}
                  </h3>
                  <div className="text-xl font-bold text-rose-400 pt-1">
                    {activeGarment.price}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {activeGarment.description}
                </p>

                <div className="p-4 bg-[#161620] border border-rose-950/80 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-rose-400 font-bold">
                    <FaBolt />
                    <span>HARDWARE DETAILS:</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    {activeGarment.hardware}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-rose-950 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 transition-all border border-rose-500 shadow-md"
                >
                  <span>Acquire Garment</span>
                  <FaArrowRight className="text-xs" />
                </a>
                <span className="text-xs text-slate-400">
                  {activeGarment.status}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default StreetwearBrand1Projects;
