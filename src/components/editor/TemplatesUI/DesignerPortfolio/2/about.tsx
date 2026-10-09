// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaCompass, FaFigma, FaLaptopCode, FaCube, FaBolt, FaArrowRight, FaAward } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio2About: React.FC<AboutProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#07070D";
  const text = theme.text || theme.ink || "#EEF0FF";
  const muted = theme["text-second"] || "#8B8FA8";
  const surface = theme.surface || "#151524";
  const accent = theme.accent || "#7C9DFF";
  const accent2 = theme["accent-second"] || "#C084FC";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const capabilities = [
    {
      icon: <FaFigma className="text-xl" style={{ color: accent }} />,
      title: "Product & UI/UX Architecture",
      desc: "End-to-end user journeys, scalable Figma component systems, and design tokens that bridge cleanly into production code.",
    },
    {
      icon: <FaCube className="text-xl" style={{ color: accent2 }} />,
      title: "Interactive 3D & Motion",
      desc: "Crafting dimensional web moments using Spline, Three.js shaders, and high-fidelity Framer Motion micro-interactions.",
    },
    {
      icon: <FaLaptopCode className="text-xl" style={{ color: accent }} />,
      title: "Design Systems & Tokens",
      desc: "Multi-platform atomic systems engineered for speed, cross-functional accessibility, and dark/light token parity.",
    },
    {
      icon: <FaBolt className="text-xl" style={{ color: accent2 }} />,
      title: "Creative Direction & Brand",
      desc: "Distinct visual identities, kinetic brand systems, and editorial guidelines that command market presence.",
    },
  ];

  const milestones = [
    { year: "2024 — Present", role: "Design Director & Advisor", org: "Autonomous Studio" },
    { year: "2021 — 2024", role: "Staff Product Designer", org: "Vesper Systems" },
    { year: "2018 — 2021", role: "Senior Interaction Designer", org: "Studio Hyperdrive" },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-28 md:py-36 overflow-hidden font-['Poppins',sans-serif]"
      style={{ background: bg, color: text }}
    >
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: accent }}
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: accent2 }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em] block"
              style={{ color: accent }}
            >
              <Editable value={p.aboutSub || "THE PHILOSOPHY & CRAFT"} onChange={(v) => handleUpdate("aboutSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08]">
              <Editable
                value={p.aboutTitle || "Obsessed with the space where mathematical utility meets visceral beauty."}
                onChange={(v) => handleUpdate("aboutTitle", v)}
              />
            </h2>
          </div>
          <div className="lg:col-span-4 text-sm leading-relaxed font-light" style={{ color: muted }}>
            <p>
              I believe modern digital products shouldn't just solve problems—they should evoke genuine emotion, feel effortless under the fingers, and leave an indelible impression.
            </p>
          </div>
        </div>

        {/* Bento Grid: Capabilities & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Experience & Milestones (Spans 5 cols) */}
          <div
            className="lg:col-span-5 p-8 rounded-3xl backdrop-blur-xl border flex flex-col justify-between space-y-8"
            style={{
              background: `${surface}90`,
              borderColor: `${text}15`,
              boxShadow: `0 20px 40px -20px ${accent}20`,
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>
                <FaAward />
                <span>Experience Timeline</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">Tenure & Trajectory</h3>
              <p className="text-xs leading-relaxed" style={{ color: muted }}>
                Nine years partnering directly with early-stage founders and visionary enterprise leaders.
              </p>
            </div>

            <div className="space-y-5 pt-4 border-t" style={{ borderColor: `${text}15` }}>
              {milestones.map((m, idx) => (
                <div key={idx} className="flex items-baseline justify-between text-xs pb-3 border-b last:border-0" style={{ borderColor: `${text}10` }}>
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: text }}>{m.role}</h4>
                    <span style={{ color: muted }}>{m.org}</span>
                  </div>
                  <span className="font-mono text-[11px]" style={{ color: accent2 }}>{m.year}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl flex items-center justify-between" style={{ background: `${text}08` }}>
              <span className="text-xs font-medium" style={{ color: muted }}>Global recognition:</span>
              <span className="text-xs font-semibold" style={{ color: text }}>4x Awwwards • 2x Webby</span>
            </div>
          </div>

          {/* Card 2: 4 Core Capabilities (Spans 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-7 rounded-3xl backdrop-blur-xl border space-y-4 hover:-translate-y-1 transition-all duration-300 group"
                style={{
                  background: `${surface}80`,
                  borderColor: `${text}12`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${text}0a`, border: `1px solid ${text}15` }}
                >
                  {cap.icon}
                </div>
                <h4 className="text-lg font-semibold tracking-tight group-hover:text-white transition-colors">
                  {cap.title}
                </h4>
                <p className="text-xs leading-relaxed font-light" style={{ color: muted }}>
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio2About;
