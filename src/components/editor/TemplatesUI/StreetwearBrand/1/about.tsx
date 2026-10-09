// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaSliders, FaScissors, FaFireBurner } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand1About: React.FC<AboutProps> = ({
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

  const schematics = [
    {
      code: "SPEC // 01",
      title: "Loomed Loopback Fleece (480GSM)",
      desc: "Woven on low-tension vintage looms in Wakayama. Heavy drape, natural stiffness, and exceptional thermal resistance that develops character with every wash cycle.",
      icon: <FaSliders className="text-rose-500 text-lg" />,
    },
    {
      code: "SPEC // 02",
      title: "Enzyme & Mineral Pigment Dyes",
      desc: "Submerged in organic mineral washes before undergoing double enzyme distressing. Every individual piece carries unique ghost seam fading and distressing.",
      icon: <FaFireBurner className="text-rose-500 text-lg" />,
    },
    {
      code: "SPEC // 03",
      title: "Articulated Ergonomic Cuts",
      desc: "Constructed with curved drop-shoulder sleeves, reinforced gusset panels, and double-needle flatlock stitching for unrestricted street movement.",
      icon: <FaScissors className="text-rose-500 text-lg" />,
    },
  ];

  return (
    <section id="about" className="relative w-full py-28 bg-[#0B0B0E] text-white border-b border-rose-950/60 font-mono">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-rose-500 font-bold block">
            <Editable value={p.aboutSub || "GARMENT ARCHITECTURE // SHIBUYA LAB"} onChange={(v) => handleUpdate("aboutSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
            <Editable
              value={p.aboutTitle || "Engineered for Perpetual Wear, Not Fast Cycles"}
              onChange={(v) => handleUpdate("aboutTitle", v)}
            />
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed font-light font-mono">
            We reject ephemeral fashion trends. Each capsule release is a rigorous study in raw heavyweight silhouettes, tactical utility pockets, and artisanal Japanese fabric engineering.
          </p>
        </div>

        {/* Schematics Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {schematics.map((item) => (
            <div
              key={item.code}
              className="p-8 bg-[#111117] border border-rose-950/80 space-y-6 hover:border-rose-500 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between pb-4 border-b border-rose-950/60">
                <span className="text-xs text-rose-400 font-bold tracking-widest">{item.code}</span>
                <div className="w-10 h-10 bg-rose-950/40 border border-rose-900/60 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white font-sans group-hover:text-rose-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand1About;
