// @ts-nocheck
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, ArrowRight, Check } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import heroImage from "./public/sagent-hero.png";
import secondaryImage from "./public/residence.jpg";

const mix = (c: string = "#111417", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const SERVICES = [
  {
    n: "01",
    title: "Architecture & Masterplanning",
    subtitle: "Civic structures, private dwellings, and urban landscapes",
    text: "From strategic feasibility and zoning navigation to final construction supervision. We treat structural engineering and poetic space as inseparable facets of the same discipline.",
    deliverables: [
      "Site analysis & solar orientation studies",
      "Bespoke schematic design & 3D visualization",
      "Full planning & municipal building permits",
      "Contract administration & on-site supervision",
    ],
    image: heroImage,
  },
  {
    n: "02",
    title: "Interior Architecture & Joinery",
    subtitle: "Atmospheric textures, custom millwork, and lighting choreography",
    text: "We curate the interior experience down to the millimeter: custom stone kitchens, concealed acoustic panels, sculptural fireplaces, and artisanal brass hardware built to endure generations.",
    deliverables: [
      "Custom casework & millwork engineering",
      "Natural material sourcing & stone selection",
      "Architectural lighting design & integration",
      "Sanitaryware & bespoke fixture procurement",
    ],
    image: secondaryImage,
  },
  {
    n: "03",
    title: "Adaptive Reuse & Heritage Conservation",
    subtitle: "Breathing contemporary vitality into historic building fabrics",
    text: "Working respectfully alongside listed monuments, industrial warehouses, and centuries-old masonry. We blend archival restoration techniques with modern thermal insulation.",
    deliverables: [
      "Historical building fabric forensics",
      "Conservation officer liaison & listed consent",
      "Structural underpinning & masonry repair",
      "Contemporary spatial insertions",
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    n: "04",
    title: "Environmental & Passive House Design",
    subtitle: "Carbon-neutral performance, natural ventilation, and low embodied energy",
    text: "Architecture that actively contributes to its ecosystem. Utilizing local mass timber, geothermal heating, rainwater harvesting, and breathable hygroscopic envelopes.",
    deliverables: [
      "Passive house energy modelling & envelope design",
      "Embodied carbon lifecycle assessment",
      "Geothermal & solar thermal integration",
      "Natural cross-ventilation choreography",
    ],
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
  },
];

export function ArchitectureStudio1Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || theme?.bg || "#DFE6E2";
  const ink = theme?.ink || "#111417";
  const inkSecond = theme?.["ink-second"] || "#566166";
  const accent = theme?.accent || "#D92335";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      className="w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 transition-colors border-b"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody, borderColor: mix(ink, 12) }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 grid lg:grid-cols-12 gap-8 items-end pb-8 border-b" style={{ borderColor: mix(ink, 14) }}>
          <div className="lg:col-span-7">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold block mb-3" style={{ color: accent }}>
              <Editable value="03 / STUDIO DISCIPLINES" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.04]"
              style={{ fontFamily: fontHeading, color: ink }}
              value={props?.title || "How we shape each commission."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>
          <div className="lg:col-span-5">
            <Editable
              as="p"
              className="text-base leading-relaxed"
              style={{ color: mix(ink, 80) }}
              value="A rigorous, comprehensive architectural methodology. We unite conceptual audacity with forensic technical execution from the first sketch to final occupancy."
            />
          </div>
        </div>

        {/* Interactive Disciplines & Image Split */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Disciplines Accordion */}
          <div className="lg:col-span-7 border-t" style={{ borderColor: mix(ink, 16) }}>
            {SERVICES.map((s, i) => {
              const open = active === i;
              return (
                <div key={s.n} className="border-b transition-colors" style={{ borderColor: mix(ink, 16) }}>
                  <button
                    onClick={() => setActive(i)}
                    className="w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left cursor-pointer group"
                    aria-expanded={open}
                  >
                    <div className="flex items-baseline gap-4 md:gap-8 flex-1">
                      <span className="text-xs font-mono font-medium" style={{ color: open ? accent : mix(ink, 50) }}>
                        {s.n}
                      </span>
                      <div>
                        <Editable
                          as="h3"
                          className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight transition-opacity"
                          style={{
                            fontFamily: fontHeading,
                            color: ink,
                            opacity: open ? 1 : 0.65,
                          }}
                          value={s.title}
                        />
                        <p className="text-xs uppercase tracking-wider mt-1 opacity-60" style={{ color: inkSecond }}>
                          {s.subtitle}
                        </p>
                      </div>
                    </div>

                    <div
                      className="w-9 h-9 border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                      style={{
                        borderColor: open ? accent : mix(ink, 20),
                        backgroundColor: open ? mix(accent, 10) : "transparent",
                      }}
                    >
                      {open ? <Minus size={16} style={{ color: accent }} /> : <Plus size={16} style={{ color: mix(ink, 60) }} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 md:pl-16 pb-8 pr-2">
                          <p className="text-sm md:text-base leading-relaxed mb-6 font-normal" style={{ color: mix(ink, 80) }}>
                            {s.text}
                          </p>

                          <div className="mb-4">
                            <span className="text-xs uppercase tracking-wider font-semibold block mb-3" style={{ color: ink }}>
                              Key Scope & Deliverables
                            </span>
                            <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                              {s.deliverables.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2.5" style={{ color: mix(ink, 85) }}>
                                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Synced Discipline Showcase Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="border p-4 shadow-md" style={{ borderColor: mix(ink, 15), backgroundColor: mix(bg, 70) }}>
              <div className="relative aspect-[4/3] sm:aspect-[4/3] overflow-hidden border" style={{ borderColor: mix(ink, 15) }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={SERVICES[active].image}
                    alt={SERVICES[active].title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div
                  className="absolute bottom-3 left-3 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-white backdrop-blur-md"
                  style={{ backgroundColor: "rgba(17,20,23,0.75)" }}
                >
                  {SERVICES[active].n} / DISCIPLINE ARCHIVE
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs" style={{ color: mix(ink, 80) }}>
                <span className="font-semibold uppercase tracking-wider">{SERVICES[active].title}</span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-4"
                  style={{ color: accent }}
                >
                  <span>Request Scope</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Services = ArchitectureStudio1Services;
export default ArchitectureStudio1Services;