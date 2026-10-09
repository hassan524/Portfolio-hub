// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Award, MessageSquare, Shield, Star } from "lucide-react";

const mix = (c: string = "#1A1816", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio2Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F4F0EA";
  const ink = theme?.ink || "#1A1816";
  const inkSecond = theme?.["ink-second"] || "#5C5650";
  const accent = theme?.accent || "#C85A32";
  const fontHeading = theme?.fontHeading || "DM Sans";
  const fontBody = theme?.fontBody || "DM Sans";

  const reviews = [
    {
      ref: "EVAL // 01",
      source: "Triennale di Milano Review",
      quote:
        "Cúbiq demonstrates an uncompromising command of structural weight and Mediterranean light. Their terracotta towers establish a profound dialogue with Milanese modernism.",
      author: "Prof. Giancarlo Rossi",
      role: "Curator of Contemporary Architecture",
      score: "EXCELLENCE IN TECTONICS",
    },
    {
      ref: "EVAL // 02",
      source: "Patron Monograph",
      quote:
        "Every cantilever, flush floor threshold, and acoustic ceiling joint was calculated with surgical precision. Living inside Horizon Residence is a continuous experience of calm.",
      author: "Dr. Alistair & Clara Ward",
      role: "Private Patrons, Lake Como Villa",
      score: "PATRON COMMISSION 2024",
    },
    {
      ref: "EVAL // 03",
      source: "Nordic Structural Council",
      quote:
        "Their Oslo timber headquarters redefines what mass timber engineering can achieve at high density. Zero unnecessary cladding, maximum spatial clarity.",
      author: "Ingrid Lindqvist",
      role: "Director of Structural Innovation",
      score: "SUSTAINABILITY GOLD 2025",
    },
  ];

  return (
    <section
      id="testimonials"
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
              <Editable value="04 // INDEPENDENT EVALUATIONS" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-none"
              style={{ color: ink }}
              value={props?.title || "Critical appraisal & patron verdicts."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          <div className="font-mono text-xs opacity-70">
            <span>PEER-REVIEWED MONOGRAPHS</span>
          </div>
        </div>

        {/* 3-Column Review Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.ref}
              className="p-8 border flex flex-col justify-between transition-all hover:-translate-y-1 shadow-xs"
              style={{
                backgroundColor: mix(bg, 50),
                borderColor: mix(ink, 16),
              }}
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-6 border-b font-mono text-xs" style={{ borderColor: mix(ink, 12) }}>
                  <span className="font-bold" style={{ color: accent }}>
                    {rev.ref}
                  </span>
                  <span className="text-[10px] opacity-60 uppercase">{rev.source}</span>
                </div>

                <Editable
                  as="blockquote"
                  className="text-base sm:text-lg leading-relaxed font-sans mb-8 opacity-90"
                  style={{ color: ink }}
                  value={`“${rev.quote}”`}
                />
              </div>

              <div className="pt-4 border-t font-mono text-xs" style={{ borderColor: mix(ink, 12) }}>
                <span className="font-bold block" style={{ color: ink }}>
                  {rev.author}
                </span>
                <span className="text-[11px] opacity-60 block mb-3" style={{ color: inkSecond }}>
                  {rev.role}
                </span>
                <span className="text-[10px] px-2 py-0.5 border font-semibold inline-block" style={{ borderColor: accent, color: accent }}>
                  {rev.score}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Quote Monolith */}
        <div
          className="mt-14 p-8 border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono"
          style={{ borderColor: mix(ink, 16), backgroundColor: mix(bg, 75) }}
        >
          <div className="flex items-center gap-4">
            <Award size={24} style={{ color: accent }} />
            <div>
              <span className="text-sm font-bold block" style={{ color: ink }}>
                MIES CROWN HALL AMERICAS PRIZE NOMINATION (2025)
              </span>
              <span className="text-xs opacity-60" style={{ color: inkSecond }}>
                In recognition of exceptional architectural restraint in multi-family housing.
              </span>
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
            HONORS MONOGRAPH READY →
          </span>
        </div>
      </div>
    </section>
  );
}

export const Testimonials = ArchitectureStudio2Testimonials;
export default ArchitectureStudio2Testimonials;
