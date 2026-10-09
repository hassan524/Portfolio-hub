// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Check, Compass, Ruler, Scale } from "lucide-react";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio6About: React.FC<AboutProps> = ({
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

  const metrics = [
    { label: "BASELINE GRID", val: "8px Standard", sub: "Strict mathematical vertical rhythm" },
    { label: "COLOR PALETTE", val: "Max 3 Tones", sub: "Zero non-essential decorative gradients" },
    { label: "CONTRAST RATIO", val: "21:1 Contrast", sub: "Absolute readability under all conditions" },
    { label: "SYSTEM SCALE", val: "100+ Squads", sub: "Modular components deployed at global scale" },
  ];

  const canons = [
    {
      rule: "01. STRUCTURE PRECEDES SURFACE",
      body: "An interface is an architectural blueprint before it is a visual canvas. Hierarchy must be communicated through spatial proportion and typographical weight alone."
    },
    {
      rule: "02. ARBITRARY CHOICES ARE REJECTED",
      body: "Every margin, padding unit, and line height is a function of an underlying geometric ratio. Intuition is validated by mathematical consistency."
    },
    {
      rule: "03. TIMELESS OVER TRENDY",
      body: "Software systems designed for resilience should look as authoritative in thirty years as they do today, untainted by transient visual gimmicks."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0A0A0A] text-[#F5F5F0] border-b border-[#262626] font-mono">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#262626]">
          <div>
            <div className="text-xs text-[#E63946] mb-1">// METHODOLOGY & SYSTEM STANDARDS</div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              <Editable
                value={p.title || "RATIONAL DESIGN CRITERIA"}
                onChange={(val) => handleUpdate("title", val)}
              />
            </h2>
          </div>
          <div className="text-xs text-[#888]">
            SWISS STANDARDS ISO 9241-210
          </div>
        </div>

        {/* 4 Quantitative Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-6 border border-[#1A1A1A] space-y-2 bg-[#0F0F0F]">
              <div className="text-[10px] text-[#E63946] font-bold">{m.label}</div>
              <div className="text-2xl font-bold text-white">{m.val}</div>
              <p className="text-xs text-[#888] font-sans">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* 3 Canons Grid */}
        <div className="space-y-6 pt-4">
          <div className="text-xs text-[#E63946] uppercase tracking-wider">
            CANONS OF PRACTICE
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {canons.map((c, idx) => (
              <div key={idx} className="p-8 border border-[#262626] space-y-4 bg-[#0A0A0A]">
                <div className="text-sm font-bold text-white tracking-wider">{c.rule}</div>
                <p className="text-xs font-sans text-[#AAA] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio6About;
