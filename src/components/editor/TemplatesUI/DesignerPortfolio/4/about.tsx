// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { PenTool, Layers, Sparkles, Sliders, Check, Palette, Award } from "lucide-react";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio4About: React.FC<AboutProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  // Interactive component customization playground
  const [activeRadius, setActiveRadius] = useState(16);
  const [activeColor, setActiveColor] = useState("#6366F1");
  const [activeTab, setActiveTab] = useState(0);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      title: "Systematic Design Tokens",
      desc: "Architecting Figma variable graphs and multi-brand token structures that automatically compile to production CSS, Tailwind, and React themes."
    },
    {
      icon: <Sliders className="w-5 h-5 text-purple-600" />,
      title: "Tactile Kinetic Physics",
      desc: "Crafting fluid gesture interactions, micro-animations, and spring transitions that impart a tangible physical weight to software."
    },
    {
      icon: <PenTool className="w-5 h-5 text-pink-600" />,
      title: "End-to-End Prototyping",
      desc: "Bridging the chasm between static mockups and live engineering by designing directly in the browser with interactive React prototypes."
    }
  ];

  const palette = [
    { name: "Electric Indigo", hex: "#6366F1" },
    { name: "Neon Violet", hex: "#8B5CF6" },
    { name: "Vibrant Rose", hex: "#EC4899" },
    { name: "Fresh Emerald", hex: "#10B981" },
    { name: "Sunset Amber", hex: "#F59E0B" }
  ];

  const awards = [
    { title: "Awwwards Site of the Day", count: "× 4", year: "2025/2026" },
    { title: "FWA of the Day", count: "× 3", year: "2025" },
    { title: "Apple Design Award Nominee", count: "Finalist", year: "2024" },
    { title: "Product Hunt #1 Product of the Week", count: "× 5", year: "2024/2025" }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Design Methodology & Systems</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            <Editable
              value={p.title || "Where mathematical precision meets visceral visual joy."}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            <Editable
              value={p.subtitle || "Modern product design is more than layout—it's a choreography of typography, spatial rhythm, token systems, and delightful sensory feedback."}
              onChange={(val) => handleUpdate("subtitle", val)}
            />
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ================= INTERACTIVE DESIGN PLAYGROUND BENTO ================= */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-50 via-indigo-50/20 to-purple-50/30 border border-slate-200 p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-bold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5">
                <Palette className="w-4 h-4" />
                <span>Interactive Design Sandbox</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Test Component Tokens & Border Radii Live
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              REAL-TIME SVG & TOKEN ENGINE
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-6">
              {/* Color Token Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700">Theme Color Token:</label>
                <div className="flex items-center gap-2">
                  {palette.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveColor(c.hex)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        activeColor === c.hex ? "scale-110 border-slate-900 shadow-md" : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      aria-label={`Select ${c.name}`}
                    >
                      {activeColor === c.hex && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Radius Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Corner Radius Token:</span>
                  <span className="font-mono text-indigo-600">{activeRadius}px</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="36"
                  value={activeRadius}
                  onChange={(e) => setActiveRadius(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-900">Token Output:</div>
                <div className="font-mono text-[11px] text-indigo-600">
                  --radius: {activeRadius}px; --color-primary: {activeColor};
                </div>
              </div>
            </div>

            {/* Right Interactive Preview */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 sm:p-12 bg-white rounded-2xl border border-slate-200 shadow-md">
              <div
                className="w-full max-w-sm p-6 text-white space-y-4 shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: activeColor,
                  borderRadius: `${activeRadius}px`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold opacity-90">Interactive Card</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-lg font-bold">Dynamic Component Preview</div>
                <p className="text-xs opacity-85 leading-relaxed">
                  Notice how border radii and color tokens maintain perfect spatial optical balance across all screens.
                </p>
                <div className="pt-2">
                  <button
                    className="w-full py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:opacity-95 transition-opacity"
                    style={{ borderRadius: `${Math.max(activeRadius - 4, 4)}px` }}
                  >
                    Action Button
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Design Awards & Accolades */}
        <div className="pt-12 border-t border-slate-200">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-8">
            Industry Laurels & Recognition
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {awards.map((aw, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                <div className="text-xl sm:text-2xl font-black text-indigo-600">{aw.count}</div>
                <div className="text-xs font-bold text-slate-900">{aw.title}</div>
                <div className="text-[11px] text-slate-400 font-mono">{aw.year}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio4About;
