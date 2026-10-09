// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUpRight } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio1Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme?.bg || "#FFFFFF";
  const text = theme?.text || theme?.ink || "#0F172A";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#2563EB";
  const serif = props.serifFont || '"Inter", -apple-system, sans-serif';

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const works = [
    {
      num: "01",
      title: "Northwind Heritage Goods",
      client: "Northwind Outdoor Co.",
      category: "Brand Identity & Packaging",
      year: "2026",
      role: "Lead Identity Designer",
      description: "A calm, confident identity system for an outdoor goods label: logotype, custom letterforms, and tactile packaging that reads effortlessly on a store shelf.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80",
      tags: ["Identity", "Typography", "Packaging"],
    },
    {
      num: "02",
      title: "Halcyon Meditation Suite",
      client: "Halcyon Labs",
      category: "Digital Product Architecture",
      year: "2025",
      role: "Principal Product Designer",
      description: "End-to-end interface system for a mindfulness OS. Minimal cognitive load, gentle kinetic animations, and a unified design system shipped without friction.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1200&q=80",
      tags: ["iOS Design", "Design System", "Sound UI"],
    },
    {
      num: "03",
      title: "Atelier Noir Quarterly Review",
      client: "Maison Noir Paris",
      category: "Editorial & Publication",
      year: "2024",
      role: "Art Director",
      description: "A quarterly print gazette and digital monograph with a restrained monochrome palette, generous margins, and a distinct typographic voice.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      tags: ["Editorial", "Print", "Art Direction"],
    },
  ];

  return (
    <section
      id="works-archive"
      className="relative w-full py-28 md:py-36 border-t"
      style={{ background: bg, color: text, borderColor: `${textSecond}25` }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b pb-8" style={{ borderColor: `${textSecond}25` }}>
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium block mb-2" style={{ color: textSecond }}>
              (<Editable value={p.projLabel || "Archive & Selected Work"} onChange={(v) => handleUpdate("projLabel", v)} />)
            </span>
            <h2 className="text-4xl sm:text-6xl font-light italic tracking-tight" style={{ fontFamily: serif }}>
              <Editable value={p.projTitle || "Form that endures."} onChange={(v) => handleUpdate("projTitle", v)} />
            </h2>
          </div>
          <span className="text-xs uppercase tracking-widest" style={{ color: textSecond }}>
            03 Selected Projects
          </span>
        </div>

        {/* Project Editorial List */}
        <div className="space-y-24">
          {works.map((w, index) => (
            <div
              key={w.num}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center group"
            >
              {/* Photo Side (Spans 7 cols) */}
              <div className="lg:col-span-7 relative overflow-hidden rounded-sm aspect-[16/10]" style={{ border: `1px solid ${textSecond}30` }}>
                <img
                  src={w.image}
                  alt={w.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md" style={{ background: `${bg}cc`, color: text }}>
                  {w.client}
                </div>
              </div>

              {/* Details Side (Spans 5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-4 text-xs font-mono" style={{ color: textSecond }}>
                  <span style={{ color: accent }}>{w.num}</span>
                  <span>•</span>
                  <span>{w.category}</span>
                  <span>•</span>
                  <span>{w.year}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-light italic leading-tight" style={{ fontFamily: serif, color: text }}>
                  {w.title}
                </h3>

                <p className="text-sm leading-relaxed font-light" style={{ color: textSecond }}>
                  {w.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {w.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ border: `1px solid ${textSecond}35`, color: textSecond }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: `${textSecond}20` }}>
                  <span className="text-xs uppercase tracking-wider" style={{ color: textSecond }}>Role: {w.role}</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:translate-x-1 transition-transform"
                    style={{ color: accent }}
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="text-xs" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio1Projects;
