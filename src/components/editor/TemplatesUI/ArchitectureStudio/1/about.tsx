// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowRight, Award, Compass, Layers, ShieldCheck } from "lucide-react";

const mix = (c: string = "#111417", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio1About({ props = {}, theme, onChange }: any) {
  const bg2 = theme?.["bg-second"] || theme?.bg || "#DFE6E2";
  const ink = theme?.ink || "#111417";
  const inkSecond = theme?.["ink-second"] || "#566166";
  const accent = theme?.accent || "#D92335";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";

  const pillars = [
    {
      num: "01",
      title: "Contextual Topography",
      description:
        "Every project begins with listening: the sun angles, ground contours, native flora, and historic fabric of the landscape. We never impose a form that fights its setting.",
      icon: Compass,
    },
    {
      num: "02",
      title: "Honest Materiality",
      description:
        "We specify tactile materials that age with dignity: hand-cast concrete, lime wash, weathered zinc, and regional timbers that develop a natural patina over decades.",
      icon: Layers,
    },
    {
      num: "03",
      title: "Atmospheric Restraint",
      description:
        "We strip away decorative excess to celebrate proportion, silence, and the choreography of natural daylight as it travels through each room throughout the day.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="about"
      className="w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 transition-colors border-b"
      style={{ backgroundColor: bg2, color: ink, fontFamily: fontBody, borderColor: mix(ink, 12) }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-14 pb-16 border-b" style={{ borderColor: mix(ink, 14) }}>
          <div className="md:col-span-5">
            <span
              className="text-[11px] uppercase tracking-[0.2em] font-semibold block mb-4"
              style={{ color: accent }}
            >
              <Editable value="01 / STUDIO PHILOSOPHY" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight"
              style={{ fontFamily: fontHeading, color: ink }}
              value={props?.title || "A new perspective on the places we share."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          <div className="md:col-span-7 flex flex-col justify-between gap-6 text-base md:text-lg leading-relaxed" style={{ color: mix(ink, 80) }}>
            <Editable
              as="p"
              value={
                props?.body ||
                "Sagent is an architecture and spatial design atelier founded on the conviction that buildings should be quiet custodians of life. From private coastal residences to civic institutions, we design buildings that feel both timeless and profoundly responsive to our climate."
              }
              onChange={(v) => onChange?.({ body: v })}
            />
            <Editable
              as="p"
              className="text-sm md:text-base font-normal leading-relaxed opacity-90"
              value="Our multi-disciplinary team brings together architects, interior scholars, landscape strategists, and structural craftspeople. Each commission is shepherded by our founding partners from initial site sketch to final stone laying."
            />
            <div className="pt-2 flex items-center gap-6">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-semibold underline underline-offset-8 transition-opacity hover:opacity-70"
                style={{ color: ink, textDecorationColor: accent }}
              >
                <Editable value="Discover Our Disciplines" />
                <ArrowRight size={14} />
              </a>
              <span className="text-xs uppercase tracking-wider opacity-60" style={{ color: inkSecond }}>
                Monograph 2026
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Principles Grid */}
        <div className="pt-16 pb-14">
          <div className="flex items-center justify-between gap-4 mb-10">
            <span className="text-xs uppercase tracking-[0.18em] font-semibold" style={{ color: mix(ink, 75) }}>
              Fundamental Tenets
            </span>
            <span className="text-xs font-mono opacity-50">01 — 03</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.num}
                  className="p-8 border flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-sm"
                  style={{
                    backgroundColor: mix(bg2, 60),
                    borderColor: mix(ink, 15),
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-sm font-mono font-medium" style={{ color: accent }}>
                        {p.num}
                      </span>
                      <Icon size={18} style={{ color: mix(ink, 50) }} />
                    </div>
                    <Editable
                      as="h3"
                      className="text-2xl font-medium tracking-tight mb-4"
                      style={{ fontFamily: fontHeading, color: ink }}
                      value={p.title}
                    />
                    <Editable
                      as="p"
                      className="text-sm leading-relaxed"
                      style={{ color: mix(ink, 75) }}
                      value={p.description}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accreditations & Honours Bar */}
        <div
          className="pt-10 border-t flex flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-wider"
          style={{ borderColor: mix(ink, 14), color: mix(inkSecond, 85) }}
        >
          <div className="flex items-center gap-2">
            <Award size={16} style={{ color: accent }} />
            <Editable value="RIBA Chartered Practice · AIA International Affiliate" />
          </div>
          <div className="flex items-center gap-6">
            <span>Mies van der Rohe Award Nominee</span>
            <span>Civic Trust Special Commendation</span>
            <span>B-Corp Architectural Practice</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export const About = ArchitectureStudio1About;
export default ArchitectureStudio1About;