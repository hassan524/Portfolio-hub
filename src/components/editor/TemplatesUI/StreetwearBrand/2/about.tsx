// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaShapes, FaLayerGroup, FaGem } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand2About: React.FC<AboutProps> = ({
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

  const principles = [
    {
      index: "XI — I",
      title: "Kinetic Brutalism in Motion",
      desc: "Each piece is constructed around the kinetic movement of the human gait. Overlong sleeve stacks and dropped shoulders create dynamic sculptural presence in still frames and rapid transit.",
      icon: <FaShapes className="text-[#CCFF00] text-lg" />,
    },
    {
      index: "XI — II",
      title: "Biella Mills Virgin Wool & Kuroki Denim",
      desc: "Raw materials sourced exclusively from heritage Italian wool mills and artisanal Okayama denim weavers. We preserve natural raw selvedge textures without synthetic softening agents.",
      icon: <FaLayerGroup className="text-[#CCFF00] text-lg" />,
    },
    {
      index: "XI — III",
      title: "Permanent Architectural Archive",
      desc: "Our garments do not depreciate across calendar quarters. Every silhouette enters our permanent museum archive, reissued solely in single bespoke editions.",
      icon: <FaGem className="text-[#CCFF00] text-lg" />,
    },
  ];

  return (
    <section id="about" className="relative w-full py-28 bg-[#0B0F18] text-white border-b border-[#1E293B]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Headline */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#CCFF00] font-bold block">
            <Editable value={p.aboutSub || "THE ARCHITECTURAL MANIFESTO // 2026"} onChange={(v) => handleUpdate("aboutSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-white font-sans">
            <Editable
              value={p.aboutTitle || "Transcending Streetwear Through Architectural Precision"}
              onChange={(v) => handleUpdate("aboutTitle", v)}
            />
          </h2>
          <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
            We bridge the chasm between raw underground street sensibility and haute couture architectural form. No logos. No loud graphics. Only uncompromising volume, weight, and silhouette.
          </p>
        </div>

        {/* Principles Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {principles.map((item) => (
            <div
              key={item.index}
              className="p-8 bg-[#0F1422] border border-[#1E293B] space-y-6 hover:border-[#CCFF00]/60 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <span className="font-mono text-xs text-[#CCFF00] font-bold tracking-widest">{item.index}</span>
                <div className="w-10 h-10 bg-[#161D2E] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-medium text-white group-hover:text-[#CCFF00] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand2About;
