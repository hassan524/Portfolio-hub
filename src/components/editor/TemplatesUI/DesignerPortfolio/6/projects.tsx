// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUpRight, Plus, Minus, ExternalLink } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const DEFAULT_PROJECTS = [
  {
    id: "CH-PRJ-01",
    client: "ZÜRICH LOGISTICS GROUP",
    title: "Autonomous Fleet Orchestration Terminal",
    year: "2026",
    scope: "Design System & Mission-Critical Web Console",
    spec: "Real-time dispatch system managing 4,200 autonomous freight vehicles across Central Europe. Zero UI latency at 60 FPS under peak network traffic.",
    tags: ["High-Density UI", "Data Visualization", "Design Tokens"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "CH-PRJ-02",
    client: "HELVETIA PHARMA LABS",
    title: "Clinical Trial Analysis Environment",
    year: "2025",
    scope: "Multi-Platform Tablet & Desktop Suite",
    spec: "A strict tabular and visual analysis workspace allowing biochemical researchers to model molecular compound reactions with precision.",
    tags: ["Complex State UX", "Design Audit", "Accessibility AAA"],
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "CH-PRJ-03",
    client: "ALPINE RENEWABLE POWER",
    title: "Hydroelectric Turbine Telemetry OS",
    year: "2025",
    scope: "Industrial SCADA & Operator Interface",
    spec: "Complete human-machine interface overhaul for dam operators in the Swiss Alps, reducing emergency response hesitation by 54%.",
    tags: ["Industrial HMI", "Ergonomics", "Figma To Code"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80"
  }
];

export const DesignerPortfolio6Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [expanded, setExpanded] = useState<number | null>(0);

  const items = p.items && p.items.length > 0 ? p.items : DEFAULT_PROJECTS;

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section id="projects" className="py-24 bg-[#0A0A0A] text-[#F5F5F0] border-b border-[#262626] font-mono">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#262626]">
          <div>
            <div className="text-xs text-[#E63946] mb-1">// REGISTER OF COMMISSIONED WORKS</div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              <Editable
                value={p.title || "INDEX OF PRODUCTION PROJECTS"}
                onChange={(val) => handleUpdate("title", val)}
              />
            </h2>
          </div>
          <div className="text-xs text-[#888]">
            CHRONOLOGICAL CATALOG 2024 — 2026
          </div>
        </div>

        {/* Technical Data Rows */}
        <div className="divide-y divide-[#262626] border-y border-[#262626]">
          {items.map((item, idx) => {
            const isOpen = expanded === idx;
            return (
              <div key={idx} className="py-8 space-y-6">
                
                {/* Row Header */}
                <div
                  onClick={() => setExpanded(isOpen ? null : idx)}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-[#E63946] font-bold">{item.id}</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#E63946] transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-xs text-[#888] font-sans mt-0.5">
                        {item.client} · {item.year}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-xs text-[#AAA] hidden lg:inline-block">{item.scope}</span>
                    <button
                      className="w-8 h-8 border border-[#333] group-hover:border-[#E63946] text-white flex items-center justify-center transition-colors text-xs"
                      aria-label="Expand project specs"
                    >
                      {isOpen ? <Minus className="w-4 h-4 text-[#E63946]" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Technical Blueprint */}
                {isOpen && (
                  <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-[#1F1F1F]">
                    <div className="lg:col-span-7 aspect-[16/9] overflow-hidden border border-[#262626]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale contrast-125"
                      />
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                      <div className="space-y-2">
                        <div className="text-[10px] text-[#E63946] font-bold uppercase tracking-wider">
                          SYSTEM SPECIFICATION
                        </div>
                        <p className="text-xs font-sans text-[#AAA] leading-relaxed">
                          {item.spec}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-[10px] text-[#888] font-bold uppercase tracking-wider">
                          CLASSIFICATION TAGS
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 text-[10px] bg-[#141414] border border-[#262626] text-white"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#1F1F1F]">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 text-xs text-[#E63946] hover:text-white transition-colors font-bold uppercase tracking-wider"
                        >
                          <span>REQUEST TECHNICAL DOSSIER</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio6Projects;
