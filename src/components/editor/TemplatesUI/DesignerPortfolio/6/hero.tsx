// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUpRight, Grid, Eye, Check } from "lucide-react";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio6Hero: React.FC<HeroProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [showGrid, setShowGrid] = useState(false);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const modules = [
    { num: "01", title: "SYSTEM ARCHITECTURE", desc: "Rigid mathematical design tokens and variable component graphs." },
    { num: "02", title: "SWISS TYPOGRAPHY", desc: "Optically calibrated rhythm and baseline micro-alignments." },
    { num: "03", title: "INDUSTRIAL LOGIC", desc: "No extraneous styling. Pure functional clarity engineered for high-scale enterprise." },
  ];

  return (
    <section className="relative bg-[#0A0A0A] text-[#F5F5F0] py-20 sm:py-32 border-b border-[#262626] font-mono overflow-hidden">
      
      {/* Optional Interactive Swiss 12-Column Grid Overlay */}
      {showGrid && (
        <div className="absolute inset-0 pointer-events-none z-20 max-w-7xl mx-auto px-6 grid grid-cols-12 gap-4 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full border-x border-[#E63946]/20 bg-[#E63946]/5 flex flex-col justify-between p-1">
              <span className="text-[8px] text-[#E63946]">COL {i + 1}</span>
              <span className="text-[8px] text-[#E63946] self-end">COL {i + 1}</span>
            </div>
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Top Control Bar with Grid Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626] text-xs text-[#888]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#E63946] inline-block" />
            <span className="text-white font-bold">MANUAL OF GRAPHIC AND SOFTWARE DESIGN</span>
          </div>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-3 py-1 text-[11px] border transition-all flex items-center gap-1.5 ${
              showGrid
                ? "bg-[#E63946] text-white border-[#E63946]"
                : "border-[#333] text-[#AAA] hover:text-white hover:border-[#666]"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{showGrid ? "HIDE 12-COL GRID" : "SHOW 12-COL BASELINE GRID"}</span>
          </button>
        </div>

        {/* Stark Giant Swiss Headline */}
        <div className="space-y-6">
          <div className="text-xs uppercase tracking-widest text-[#E63946]">
            // SWISS INTERNATIONAL TYPOGRAPHIC ORDER
          </div>
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.95] uppercase">
            <Editable
              value={p.title || "FORM. FUNCTION. CLARITY."}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h1>
          <p className="text-base sm:text-xl text-[#AAA] max-w-3xl leading-relaxed font-sans pt-2">
            <Editable
              value={p.subtitle || "Eliminating decorative noise in digital software. Constructing modular systems rooted in the rationalist lineage of modern Swiss typography and computer science."}
              onChange={(val) => handleUpdate("subtitle", val)}
            />
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#E63946] hover:text-white transition-all flex items-center gap-2"
          >
            <span>INSPECT REGISTERED WORKS</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#about"
            className="px-8 py-4 border border-[#333] text-[#AAA] hover:text-white hover:border-white transition-all text-xs uppercase tracking-widest"
          >
            SPECIFICATION NOTES
          </a>
        </div>

        {/* 3 Numbered Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#262626]">
          {modules.map((m, idx) => (
            <div key={idx} className="space-y-3 p-6 border border-[#1A1A1A] hover:border-[#333] transition-colors">
              <div className="text-xs text-[#E63946] font-bold">[{m.num}]</div>
              <h3 className="text-base font-bold text-white tracking-wider">{m.title}</h3>
              <p className="text-xs text-[#888] font-sans leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio6Hero;
