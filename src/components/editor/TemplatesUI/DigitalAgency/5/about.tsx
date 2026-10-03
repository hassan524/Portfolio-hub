// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap, ChevronRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency5About({ props = {}, theme, onChange }: any) {
  const [activeStage, setActiveStage] = useState(0);

  // Dynamic theme colors - NO manual tailwind color classes!
  const bg = theme?.bg || theme?.bgPrimary || "#0B26E8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#061385";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "rgba(255, 255, 255, 0.75)";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.12)";
  const accent = theme?.accent || "#FFFFFF";

  const stages = [
    {
      step: "01",
      name: "Discovery & Intelligence",
      tagline: "Unearthing category anomalies",
      desc: "We analyze market whitespace, consumer psychological friction, and proprietary search intent data before drawing a single vector.",
      deliverable: "Strategic Brand Thesis & Whitepaper",
    },
    {
      step: "02",
      name: "Visual World Building",
      tagline: "Sculpting visceral aesthetic systems",
      desc: "Custom generative art, mathematical typography grids, and bespoke motion choreographies built to stop thumbs and captivate minds.",
      deliverable: "Full Design System & Component Library",
    },
    {
      step: "03",
      name: "High-Speed Interactive Engineering",
      tagline: "Sub-50ms latency meets cinematic WebGL",
      desc: "Pixel-perfect frontend architecture, GPU-accelerated canvas transitions, and headless CMS integrations designed for scale.",
      deliverable: "Production Deployment on Global Edge",
    },
    {
      step: "04",
      name: "Continuous Growth & Conversion",
      tagline: "Quantifying every interaction",
      desc: "Heatmap behavioral diagnostics, continuous narrative tuning, and high-frequency multivariate testing to compound organic conversion.",
      deliverable: "Real-time Attribution Intelligence",
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden border-t"
      style={{
        backgroundColor: bgSecond,
        borderColor: surface,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b pb-12" style={{ borderColor: surface }}>
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em] font-semibold" style={{ color: textSecond }}>
              Agency Methodology //
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight leading-none">
              <Editable
                value={props?.aboutHeadline || "Human Taste. AI Velocity."}
                onChange={(v) => onChange?.({ aboutHeadline: v })}
              />
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-light leading-relaxed" style={{ color: textSecond }}>
              <Editable
                value={
                  props?.aboutIntro ||
                  "We abandon generic agency frameworks for an integrated 4-stage architectural engine that accelerates client market dominance."
                }
                onChange={(v) => onChange?.({ aboutIntro: v })}
              />
            </p>
          </div>
        </div>

        {/* Monumental Interactive Stage Roadmap - NO BOX CARDS! */}
        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isOpen = activeStage === idx;
            return (
              <div
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                className="py-8 border-b cursor-pointer transition-colors group"
                style={{
                  borderColor: surface,
                  backgroundColor: isOpen ? `${surface}40` : "transparent",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Step number and title */}
                  <div className="lg:col-span-4 flex items-center gap-6">
                    <span className="text-3xl sm:text-4xl font-mono font-bold opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: text }}>
                      {stage.step}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight" style={{ color: text }}>
                        {stage.name}
                      </h3>
                      <span className="text-xs font-mono uppercase" style={{ color: textSecond }}>
                        {stage.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Narrative description */}
                  <div className="lg:col-span-5">
                    <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: textSecond }}>
                      {stage.desc}
                    </p>
                  </div>

                  {/* Deliverable badge */}
                  <div className="lg:col-span-3 flex lg:justify-end items-center gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border" style={{ borderColor: surface, color: text }}>
                      {stage.deliverable}
                    </span>
                    <ChevronRight size={18} className={`transition-transform ${isOpen ? "rotate-90" : "group-hover:translate-x-1"}`} style={{ color: accent }} />
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Agency Metrics Strip - Minimalist line dividers, NO BOX CARDS! */}
        <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border-l pl-6 space-y-1" style={{ borderColor: surface }}>
            <span className="text-4xl sm:text-5xl font-black font-sans block" style={{ color: text }}>
              240+
            </span>
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: textSecond }}>
              Shipped Projects
            </span>
          </div>

          <div className="border-l pl-6 space-y-1" style={{ borderColor: surface }}>
            <span className="text-4xl sm:text-5xl font-black font-sans block" style={{ color: text }}>
              4.2×
            </span>
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: textSecond }}>
              Average ROI Lift
            </span>
          </div>

          <div className="border-l pl-6 space-y-1" style={{ borderColor: surface }}>
            <span className="text-4xl sm:text-5xl font-black font-sans block" style={{ color: text }}>
              14 Days
            </span>
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: textSecond }}>
              Sprint Turnaround
            </span>
          </div>

          <div className="border-l pl-6 space-y-1" style={{ borderColor: surface }}>
            <span className="text-4xl sm:text-5xl font-black font-sans block" style={{ color: text }}>
              99.4%
            </span>
            <span className="text-xs font-mono uppercase tracking-wider" style={{ color: textSecond }}>
              Client Satisfaction
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DigitalAgency5About;
