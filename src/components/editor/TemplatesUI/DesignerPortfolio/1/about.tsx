// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaArrowRight, FaAward } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio1About: React.FC<AboutProps> = ({
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

  const recognition = [
    { year: "2025", title: "Awwwards Site of the Year Nominee", project: "Atelier Noir" },
    { year: "2024", title: "Webby Award Best Visual Design", project: "Halcyon App" },
    { year: "2023", title: "Tokyo TDC Annual Book Selection", project: "Northwind Identity" },
    { year: "2022", title: "D&AD Graphite Pencil Typography", project: "Mono Monograph" },
  ];

  return (
    <section
      id="about-section"
      className="relative w-full py-28 md:py-36 border-t"
      style={{ background: bg, color: text, borderColor: `${textSecond}25` }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-20">
        
        {/* Editorial 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <span
              className="text-[11px] tracking-[0.25em] uppercase font-medium block"
              style={{ color: textSecond }}
            >
              (<Editable value={p.aboutLabel || "About the practice"} onChange={(v) => handleUpdate("aboutLabel", v)} />)
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-light italic leading-[1.04] tracking-tight"
              style={{ fontFamily: serif }}
            >
              <Editable value={p.aboutH2 || "Ten years of listening before drawing a single line."} onChange={(v) => handleUpdate("aboutH2", v)} />
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-8 text-base sm:text-lg font-light leading-relaxed" style={{ color: textSecond }}>
            <p>
              <Editable
                value={
                  p.aboutP1 ||
                  "I work directly with founders, editors, and creative directors who believe clarity is the highest form of respect for their audience. Based in Lisbon and collaborating with studios worldwide."
                }
                onChange={(v) => handleUpdate("aboutP1", v)}
              />
            </p>
            <p>
              <Editable
                value={
                  p.aboutP2 ||
                  "Every engagement is deliberately kept small: one designer, direct access, and an obsession with typographic proportion, paper weight, and digital fluidity."
                }
                onChange={(v) => handleUpdate("aboutP2", v)}
              />
            </p>

            <div className="pt-6 border-t grid grid-cols-2 sm:grid-cols-3 gap-6" style={{ borderColor: `${textSecond}25` }}>
              <div>
                <span className="text-3xl font-light italic block" style={{ fontFamily: serif, color: accent }}>08+</span>
                <span className="text-[11px] uppercase tracking-wider block mt-1" style={{ color: textSecond }}>Years Active</span>
              </div>
              <div>
                <span className="text-3xl font-light italic block" style={{ fontFamily: serif, color: accent }}>120+</span>
                <span className="text-[11px] uppercase tracking-wider block mt-1" style={{ color: textSecond }}>Projects Shipped</span>
              </div>
              <div>
                <span className="text-3xl font-light italic block" style={{ fontFamily: serif, color: accent }}>14</span>
                <span className="text-[11px] uppercase tracking-wider block mt-1" style={{ color: textSecond }}>Industry Awards</span>
              </div>
            </div>
          </div>

        </div>

        {/* Selected Industry Recognition */}
        <div className="pt-10 border-t space-y-8" style={{ borderColor: `${textSecond}25` }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-[0.25em] font-medium" style={{ color: textSecond }}>
              (Selected Recognition)
            </span>
            <span className="text-xs" style={{ color: textSecond }}>2022 — 2025</span>
          </div>

          <div className="divide-y" style={{ borderColor: `${textSecond}20` }}>
            {recognition.map((item, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-xs" style={{ color: accent }}>{item.year}</span>
                  <h4 className="text-lg font-light italic group-hover:text-white transition-colors" style={{ fontFamily: serif, color: text }}>
                    {item.title}
                  </h4>
                </div>
                <span className="text-xs uppercase tracking-wider" style={{ color: textSecond }}>
                  {item.project}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio1About;