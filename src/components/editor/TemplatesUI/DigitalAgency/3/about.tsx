// @ts-nocheck
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3About({ props = {}, theme, onChange }: any) {
  // Dynamic theme colors - strictly avoiding manual tailwind colors
  const bg = theme?.bg || theme?.bgPrimary || "#F9F7F2";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F3EFE6";
  const text = theme?.text || theme?.ink || "#1C1917";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#78716C";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#C2410C";

  const stages = [
    {
      stage: "Discovery Stage",
      steps: [
        { num: "01", title: "Identify Client Goals and Objectives", desc: "Map business milestones, audience psychology, and specific commercial benchmarks." },
        { num: "02", title: "Conduct Qualitative Research", desc: "Analyze competitor positioning, consumer sentiment, and cultural white space." },
        { num: "03", title: "Develop Personas", desc: "Construct nuanced buyer archetypes based on genuine emotional drivers." },
      ],
    },
    {
      stage: "Strategy Stage",
      steps: [
        { num: "01", title: "Define Creative Strategy", desc: "Craft high-conviction creative blueprint outlining artistic tone and media mix." },
        { num: "02", title: "Develop Creative Brief", desc: "Actionable compass for cinematographers, copywriters, and typography designers." },
        { num: "03", title: "Conduct Content Strategy", desc: "Map out editorial narratives and interactive hooks for high-yield resonance." },
      ],
    },
    {
      stage: "Execution Stage",
      steps: [
        { num: "01", title: "Design and Development", desc: "Bespoke digital design, typography layout, and fluid frontend engineering." },
        { num: "02", title: "Cinematography & Content Creation", desc: "High-end botanical photography, macro cinematography, and editorial scripts." },
        { num: "03", title: "Testing and Quality Assurance", desc: "Cross-device typography checks and rigorous speed benchmarking." },
      ],
    },
    {
      stage: "Optimization Stage",
      steps: [
        { num: "01", title: "Performance Analytics", desc: "Real-time engagement velocity, retention cohorts, and conversion tracking." },
        { num: "02", title: "Continuous Narrative Tuning", desc: "Micro-adjustments to typography layouts and CTA flows based on heatmaps." },
        { num: "03", title: "Long-Term Growth Scaling", desc: "Expanding high-performing formats into permanent brand equity assets." },
      ],
    },
  ];

  return (
    <section
      id="about"
      className="py-24 transition-colors"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${accent}20`, color: accent }}>
            <span>✦</span>
            <span>Production Architecture</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif">
            <Editable
              value={props?.aboutTitle || "Our Four-Stage Campaign Blueprint"}
              onChange={(v) => onChange?.({ aboutTitle: v })}
            />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: textSecond }}>
            <Editable
              value={
                props?.aboutDescription ||
                "A disciplined editorial process that bridges visceral aesthetic ambition with meticulous tactical execution."
              }
              onChange={(v) => onChange?.({ aboutDescription: v })}
            />
          </p>
        </div>

        {/* 4 Stages Tree Layout matching Image 4 (NO BOX CARDS!) */}
        <div className="space-y-16">
          {stages.map((stage, idx) => (
            <div
              key={stage.stage}
              className="pb-12 border-b"
              style={{ borderColor: `${textSecond}30` }}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between pb-4 mb-8 border-b" style={{ borderColor: `${textSecond}20` }}>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight" style={{ color: text }}>
                    {stage.stage}
                  </h3>
                  <span className="text-amber-500 text-lg">✦</span>
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: accent }}>
                  Stage 0{idx + 1}
                </span>
              </div>

              {/* 3 Steps in Stage matching Image 4 (Delicate editorial list with line dividers, NO BOX CARDS) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stage.steps.map((step) => (
                  <div key={step.title} className="space-y-2 border-l pl-4" style={{ borderColor: `${textSecond}40` }}>
                    <span className="text-xs font-mono font-bold tracking-widest block" style={{ color: accent }}>
                      {step.num}
                    </span>
                    <h4 className="text-base font-bold font-serif tracking-tight" style={{ color: text }}>
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: textSecond }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default DigitalAgency3About;
