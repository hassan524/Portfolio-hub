// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, Box, Cpu, Eye, Compass, Wand2, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1About({ props = {}, theme, onChange }: any) {
  const [activeTab, setActiveTab] = useState(0);

  // Dynamic theme colors - NO manual tailwind color classes!
  const bg = theme?.bg || theme?.bgPrimary || "#F7F8F9";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#FFFFFF";
  const text = theme?.text || theme?.ink || "#111827";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#6B7280";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#87D53C";

  const pillars = [
    {
      num: "01",
      title: "Playful Tactile Dimensionality",
      tag: "Clay Physics",
      desc: "We abandon flat corporate monotony for tactile, 3D clay-rendered visual systems that ignite curiosity and convert users.",
      metric: "Sub-surface Light Physics",
    },
    {
      num: "02",
      title: "Hand-Sculpted Brand Worlds",
      tag: "Custom Meshes",
      desc: "Every character, mascot, and UI token is sculpted with bespoke geometry and warm organic materiality.",
      metric: "Zero Stock Assets",
    },
    {
      num: "03",
      title: "Fluid WebGL Performance",
      tag: "60-120 FPS",
      desc: "Optimized WebGL and smooth micro-interactions that render in milliseconds without battery or GPU drain.",
      metric: "<150ms Interaction Latency",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 transition-colors relative"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b" style={{ borderColor: `${textSecond}25` }}>
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${accent}25`, color: text }}>
              <Sparkles size={14} />
              <span>Studio Philosophy</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <Editable
                value={props?.aboutTitle || "Crafting tactile 3D experiences that elevate modern products."}
                onChange={(v) => onChange?.({ aboutTitle: v })}
              />
            </h2>
          </div>

          <p className="text-base sm:text-lg max-w-md leading-relaxed" style={{ color: textSecond }}>
            <Editable
              value={props?.aboutDescription || "We are a boutique studio of 3D modelers and brand architects who believe digital interfaces should feel as tangible and delightful as physical toys."}
              onChange={(v) => onChange?.({ aboutDescription: v })}
            />
          </p>
        </div>

        {/* Tactile Full-Bleed Feature Strips - NO BOX CARDS */}
        <div className="space-y-4">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="py-8 border-b transition-colors cursor-pointer group"
              style={{ borderColor: `${textSecond}20` }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-4 flex items-center gap-6">
                  <span className="text-3xl sm:text-4xl font-black font-mono" style={{ color: accent }}>
                    {pillar.num}
                  </span>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: textSecond }}>
                      {pillar.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: text }}>
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-sm leading-relaxed" style={{ color: textSecond }}>
                    {pillar.desc}
                  </p>
                </div>

                <div className="lg:col-span-3 flex lg:justify-end items-center gap-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full border" style={{ borderColor: `${textSecond}30`, color: text }}>
                    {pillar.metric}
                  </span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: accent }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default DigitalAgency1About;
