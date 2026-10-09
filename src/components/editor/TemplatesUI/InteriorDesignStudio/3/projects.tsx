// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const InteriorDesignStudio3Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [activeDiscipline, setActiveDiscipline] = useState(0);

  const bg = theme.bg || "#080808";
  const ink = theme.ink || "#FFFFFF";
  const accent = theme.accent || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const disciplines = [
    { name: "RESIDENTIAL ATELIERS", count: "14 PROJECTS", year: "2024—2026" },
    { name: "SPATIAL IDENTITY", count: "09 ENVIRONMENTS", year: "2023—2025" },
    { name: "FURNITURE DIRECTION", count: "28 PIECES", year: "2022—2025" },
    { name: "MATERIAL SYSTEMS", count: "06 ARCHIVES", year: "2021—2025" },
    { name: "CREATIVE DIRECTION", count: "12 MONOGRAPHS", year: "2020—2025" },
    { name: "LIGHTING STRATEGY", count: "18 INSTALLATIONS", year: "2023—2026" },
  ];

  return (
    <section
      id="projects"
      className="relative px-6 md:px-12 lg:px-16 py-24 border-t border-white/10"
      style={{ backgroundColor: bg, color: ink }}
    >
      {/* Exact Image 3 Section Header: Feature // PORTFOLIO */}
      <div className="mb-12">
        <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block mb-2">
          <Editable value={p.featTag || "Feature //"} onChange={(v) => handleUpdate("featTag", v)} />
        </span>
        <h2
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-none"
          style={{ fontFamily: "'Times New Roman', Times, serif, system-ui" }}
        >
          <Editable value={p.featTitle || "PORTFOLIO"} onChange={(v) => handleUpdate("featTitle", v)} />
        </h2>
      </div>

      {/* Main Full-Bleed Showcase Image (Exact Image 3 Layout) */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-zinc-900 overflow-hidden border border-white/10 mb-20">
        <img
          src={
            p.showcaseImage ||
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=90"
          }
          alt="Featured Monolith Architecture"
          className="w-full h-full object-cover filter contrast-[1.1] grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block">
              OBSIDIAN PAVILION // ENGADIN, SWITZERLAND
            </span>
            <span className="text-lg sm:text-2xl font-bold uppercase text-white tracking-wide">
              Private Mountain Residence
            </span>
          </div>
          <span className="font-mono text-xs text-zinc-400 hidden sm:inline">COMPLETED 2025</span>
        </div>
      </div>

      {/* Vertical Disciplines List (Exact match to Image 3 right-column typography stack) */}
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-500">
            PRACTICE ARCHIVE & DISCIPLINES
          </span>
        </div>

        <div className="divide-y divide-white/10">
          {disciplines.map((d, idx) => {
            const isSelected = activeDiscipline === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveDiscipline(idx)}
                className="py-7 group cursor-pointer flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-all duration-300"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs text-zinc-600 font-bold group-hover:text-white transition-colors">
                    0{idx + 1}
                  </span>
                  <h3
                    className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight transition-all duration-300"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif, system-ui",
                      color: isSelected ? "#FFFFFF" : "#71717A",
                      transform: isSelected ? "translateX(10px)" : "none",
                    }}
                  >
                    {d.name}
                  </h3>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>{d.count}</span>
                  <span>•</span>
                  <span>{d.year}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InteriorDesignStudio3Projects;
