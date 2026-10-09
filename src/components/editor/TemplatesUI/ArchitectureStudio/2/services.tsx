// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, CheckSquare, Clock, Cpu, GitBranch, Layers, ShieldCheck } from "lucide-react";

const mix = (c: string = "#1A1816", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio2Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || theme?.bg || "#EBE5DC";
  const ink = theme?.ink || "#1A1816";
  const inkSecond = theme?.["ink-second"] || "#5C5650";
  const accent = theme?.accent || "#C85A32";
  const fontHeading = theme?.fontHeading || "DM Sans";
  const fontBody = theme?.fontBody || "DM Sans";

  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    {
      step: "01",
      code: "PHASE: FEASIBILITY",
      title: "Algorithmic Feasibility & Massing",
      duration: "Weeks 1 — 8",
      summary:
        "Computational site analysis, microclimate wind mapping, solar angle envelope optimization, and preliminary structural core layouts.",
      milestones: [
        "Digital terrain & solar radiation modeling",
        "Zoning yield & volumetric massing alternatives",
        "Carbon budget & material lifecycle targets",
        "Preliminary municipal pre-application filing",
      ],
      icon: Cpu,
    },
    {
      step: "02",
      code: "PHASE: ENGINEERING",
      title: "Parametric Engineering & Permitting",
      duration: "Weeks 9 — 24",
      summary:
        "Transforming volumetric concepts into coordinated BIM Level 3 digital twins with integrated MEP, structural calculations, and permit drawings.",
      milestones: [
        "Full structural finite-element simulations",
        "Acoustic & thermal envelope detailing",
        "BIM 4D schedule integration",
        "Comprehensive municipal building consent",
      ],
      icon: Layers,
    },
    {
      step: "03",
      code: "PHASE: FABRICATION",
      title: "Off-Site Sourcing & Prefabrication",
      duration: "Weeks 25 — 40",
      summary:
        "Collaborating directly with quarries, timber mills, and extrusion fabricators to prototype facade cassettes and custom joinery modules.",
      milestones: [
        "1:1 physical facade mockups & wind tests",
        "Quarry block inspection & stone lot reserving",
        "CNC mass-timber joint fabrication audit",
        "Dry-assembly testing before transport",
      ],
      icon: GitBranch,
    },
    {
      step: "04",
      code: "PHASE: SITE AUDIT",
      title: "On-Site Construction Direction",
      duration: "Weeks 41 — Commissioning",
      summary:
        "Our partners stay embedded on site through crane assembly, envelope weatherproofing, architectural finishes, and final handover.",
      milestones: [
        "Continuous structural tolerance auditing",
        "Subcontractor site coordination & RFI management",
        "Thermal camera envelope commissioning",
        "As-built digital twin delivery to patron",
      ],
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="services"
      className="w-full px-6 md:px-12 py-24 md:py-32 transition-colors border-b"
      style={{
        backgroundColor: bg,
        borderColor: mix(ink, 16),
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b" style={{ borderColor: mix(ink, 14) }}>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold block mb-3" style={{ color: accent }}>
              <Editable value="03 // DELIVERY METHODOLOGY" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-none"
              style={{ color: ink }}
              value="Four phases of absolute precision."
            />
          </div>

          <div className="font-mono text-xs opacity-70">
            <span>METHOD: BIM-INTEGRATED TECTONICS</span>
          </div>
        </div>

        {/* 4 Phased Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((p, idx) => {
            const Icon = p.icon;
            const isSelected = activePhase === idx;
            return (
              <div
                key={p.step}
                onClick={() => setActivePhase(idx)}
                className="p-6 md:p-8 border flex flex-col justify-between transition-all cursor-pointer group"
                style={{
                  backgroundColor: isSelected ? mix(bg, 90) : mix(bg, 50),
                  borderColor: isSelected ? accent : mix(ink, 16),
                  boxShadow: isSelected ? `0 0 0 1px ${accent}` : "none",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b font-mono text-xs" style={{ borderColor: mix(ink, 12) }}>
                    <span className="font-bold text-lg" style={{ color: accent }}>
                      {p.step}
                    </span>
                    <Icon size={18} style={{ color: isSelected ? accent : mix(ink, 40) }} />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest block mb-2 opacity-60" style={{ color: inkSecond }}>
                    {p.code}
                  </span>

                  <Editable
                    as="h3"
                    className="text-xl font-bold uppercase tracking-tight mb-3"
                    style={{ color: ink }}
                    value={p.title}
                  />

                  <p className="text-xs leading-relaxed mb-6 font-sans opacity-80" style={{ color: mix(ink, 80) }}>
                    {p.summary}
                  </p>
                </div>

                <div className="pt-4 border-t font-mono text-[11px]" style={{ borderColor: mix(ink, 12) }}>
                  <div className="flex items-center gap-1.5 opacity-70 mb-3" style={{ color: inkSecond }}>
                    <Clock size={12} style={{ color: accent }} />
                    <span>{p.duration}</span>
                  </div>

                  <div className="space-y-1.5">
                    {p.milestones.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-1.5 text-[10px] opacity-80 truncate">
                        <CheckSquare size={11} className="shrink-0 mt-0.5" style={{ color: accent }} />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Scope Inquire Banner */}
        <div
          className="mt-14 p-6 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs"
          style={{ borderColor: mix(ink, 16), backgroundColor: mix(bg, 70) }}
        >
          <span>NEED CUSTOM CONTRACT ADMINISTRATION OR BIM MODEL AUDIT?</span>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-wider transition-opacity hover:opacity-75"
            style={{ color: accent }}
          >
            <span>DOWNLOAD METHODOLOGY PDF</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export const Services = ArchitectureStudio2Services;
export default ArchitectureStudio2Services;
