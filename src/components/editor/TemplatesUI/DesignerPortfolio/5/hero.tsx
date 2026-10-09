// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, ArrowRight, Heart, Smile, Compass, CheckCircle2 } from "lucide-react";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio5Hero: React.FC<HeroProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [activeStep, setActiveStep] = useState(0);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const processSteps = [
    { title: "Listen & Empathize", tag: "Day 1-3", icon: "🌱", desc: "Understanding the deep human anxiety behind complex workflows." },
    { title: "Tactile Prototyping", tag: "Day 4-10", icon: "🎨", desc: "Interactive Figma & code prototypes you can touch on day 5." },
    { title: "Production Craft", tag: "Launch", icon: "🚀", desc: "Bulletproof design tokens paired directly with production React code." }
  ];

  return (
    <section className="relative bg-[#1C1210] text-[#FFF1E6] py-20 sm:py-28 overflow-hidden border-b border-[#FF7A45]/20">
      
      {/* Background Sunset Warmth Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#FF7A45]/20 via-[#FFA07A]/15 to-[#FF4500]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-10">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A1E1C] border border-[#FF7A45]/30 text-xs font-medium text-[#FFA07A] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF7A45] animate-ping" />
          <span>Available for product design & advisory</span>
          <span>·</span>
          <span>Q4 2026</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-bold text-[#FFF1E6] tracking-tight leading-[1.12]">
            <Editable
              value={p.title || "Designing software that feels like warm sunlight."}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h1>
          <p className="text-lg sm:text-xl text-[#FEE4D7]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            <Editable
              value={p.subtitle || "I help early-stage teams and growing SaaS companies turn complex, intimidating software into warm, intuitive everyday products."}
              onChange={(val) => handleUpdate("subtitle", val)}
            />
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-full bg-[#FF7A45] text-[#1C1210] font-bold text-sm hover:bg-[#FFA07A] hover:shadow-[0_0_25px_rgba(255,122,69,0.5)] transition-all flex items-center gap-2"
          >
            <span>Explore Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#about"
            className="px-7 py-3.5 rounded-full bg-[#2A1E1C] text-[#FFF1E6] font-medium text-sm border border-[#FF7A45]/30 hover:bg-[#FF7A45]/20 transition-all"
          >
            How I Build Products
          </a>
        </div>

        {/* Interactive Craft Process Strip */}
        <div className="pt-12 max-w-3xl mx-auto">
          <div className="p-6 rounded-3xl bg-[#2A1E1C]/80 border border-[#FF7A45]/30 shadow-xl space-y-6 text-left">
            <div className="flex items-center justify-between text-xs text-[#FFA07A]">
              <span className="font-semibold uppercase tracking-wider">The Neo-Craft Workflow</span>
              <span>Interactive Preview</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    activeStep === idx
                      ? "bg-[#1C1210] border-[#FF7A45] shadow-md"
                      : "bg-[#1C1210]/40 border-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-xl">{step.icon}</span>
                    <span className="text-[10px] text-[#FFA07A] bg-[#FF7A45]/15 px-2 py-0.5 rounded-full">
                      {step.tag}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-[#FFF1E6]">{step.title}</div>
                  <p className="text-xs text-[#FEE4D7]/70 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio5Hero;
