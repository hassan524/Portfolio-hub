// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Box, Compass, Layers, Scale, ShieldCheck } from "lucide-react";

const mix = (c: string = "#1A1816", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio2About({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.["bg-second"] || "#EBE5DC";
  const ink = theme?.ink || "#1A1816";
  const inkSecond = theme?.["ink-second"] || "#5C5650";
  const accent = theme?.accent || "#C85A32";
  const fontHeading = theme?.fontHeading || "DM Sans";
  const fontBody = theme?.fontBody || "DM Sans";

  const pillars = [
    {
      code: "TEC-01",
      title: "Structural Legibility",
      desc: "We believe a building is most poetic when its structural skeleton is visible and honest. Load paths, cast joints, and cantilevers are articulated as primary architectural expressions.",
      icon: Layers,
    },
    {
      code: "TEC-02",
      title: "Climatic Geometry",
      desc: "Our facades are shaped by computational solar analysis and airflow simulations. Deep reveals, kinetic louvers, and massive thermal stone shields reduce active cooling loads by up to 60%.",
      icon: Compass,
    },
    {
      code: "TEC-03",
      title: "Monolithic Permanence",
      desc: "We eschew fast-cycle cladding materials in favor of quarried travertine, architectural terracotta, and structural cross-laminated timber designed for a 120-year operational life.",
      icon: Scale,
    },
  ];

  return (
    <section
      id="about"
      className="w-full px-6 md:px-12 py-24 md:py-32 transition-colors border-b"
      style={{
        backgroundColor: bgSecond,
        borderColor: mix(ink, 16),
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end pb-14 border-b" style={{ borderColor: mix(ink, 14) }}>
          <div className="lg:col-span-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold block mb-3" style={{ color: accent }}>
              <Editable value="01 // TECTONICS & PHILOSOPHY" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-[0.98]"
              style={{ color: ink }}
              value={props?.title || "A new perspective on the places we share."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <Editable
              as="p"
              className="text-base md:text-lg leading-relaxed font-normal"
              style={{ color: mix(ink, 80) }}
              value={
                props?.description ||
                "Cúbiq operates at the intersection of rigorous European engineering and sculptural spatial art. Founded in Milan, our studio creates civic buildings, residential towers, and public spaces that celebrate the weight of stone and the precision of the line."
              }
              onChange={(v) => onChange?.({ description: v })}
            />

            <div className="flex items-center gap-6">
              <a
                href="#services"
                className="inline-flex items-center gap-2 pb-1 border-b font-mono text-xs uppercase tracking-widest font-bold transition-opacity hover:opacity-70"
                style={{ borderColor: accent, color: accent }}
              >
                <Editable value="DISCOVER OUR METHODOLOGY" />
                <ArrowUpRight size={14} />
              </a>
              <span className="text-xs font-mono opacity-60" style={{ color: inkSecond }}>
                MILANO // ZÜRICH
              </span>
            </div>
          </div>
        </div>

        {/* 3 Modernist Structural Pillar Cards */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.code}
                className="p-8 border flex flex-col justify-between transition-all hover:-translate-y-1 shadow-xs"
                style={{
                  backgroundColor: mix(bgSecond, 65),
                  borderColor: mix(ink, 16),
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b font-mono text-xs" style={{ borderColor: mix(ink, 12) }}>
                    <span className="font-bold" style={{ color: accent }}>
                      {item.code}
                    </span>
                    <Icon size={16} style={{ color: mix(ink, 50) }} />
                  </div>
                  <Editable
                    as="h3"
                    className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4"
                    style={{ color: ink }}
                    value={item.title}
                  />
                  <Editable
                    as="p"
                    className="text-sm leading-relaxed"
                    style={{ color: mix(ink, 75) }}
                    value={item.desc}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Stats Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t font-mono text-xs"
          style={{ borderColor: mix(ink, 14) }}
        >
          {[
            { val: "18 YRS", label: "PRACTICE CONTINUITY", note: "EST. 2008" },
            { val: "52 WORKS", label: "BUILT PORTFOLIO", note: "CIVIC & HIGH-RISE" },
            { val: "€420M", label: "CONSTRUCTED VALUE", note: "ON BUDGET DELIVERY" },
            { val: "14 CITIES", label: "EUROPEAN PRESENCE", note: "GLOBAL COMMISSIONS" },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tight" style={{ color: ink }}>
                {stat.val}
              </span>
              <span className="font-semibold uppercase tracking-wider text-[11px]" style={{ color: accent }}>
                {stat.label}
              </span>
              <span className="text-[10px] opacity-60" style={{ color: inkSecond }}>
                {stat.note}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const About = ArchitectureStudio2About;
export default ArchitectureStudio2About;
