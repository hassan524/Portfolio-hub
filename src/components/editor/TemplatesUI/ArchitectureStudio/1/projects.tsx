// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowRight, ArrowUpRight, Maximize2, MapPin, Calendar, Ruler } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import heroImage from "./public/sagent-hero.png";
import secondaryImage from "./public/residence.jpg";

const mix = (c: string = "#111417", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio1Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#E8EEEB";
  const ink = theme?.ink || "#111417";
  const inkSecond = theme?.["ink-second"] || "#566166";
  const accent = theme?.accent || "#D92335";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";

  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const projects = [
    {
      title: "Calder Complex",
      category: "Cultural",
      year: "2025",
      location: "London, United Kingdom",
      area: "3,400 m²",
      materials: "Cast Stone, European White Oak, Bronze",
      description:
        "A contemporary cultural landmark imagined as an open living room for the neighbourhood. Defined by rhythmic colonnades, natural lightwells, and acoustic timber vaults.",
      discipline: "Architecture · Placemaking · Interiors",
      image: heroImage,
    },
    {
      title: "The Garden Residence",
      category: "Residential",
      year: "2024",
      location: "Cotswolds, United Kingdom",
      area: "620 m²",
      materials: "Dry-stone Masonry, Lime Plaster, Zinc Roofing",
      description:
        "A quiet family dwelling gently embedded into the rolling topography. Glazed corridors frame historic hedgerows and dissolve boundaries between interior living and garden sanctuary.",
      discipline: "Residential Architecture · Landscape",
      image: secondaryImage,
    },
    {
      title: "Pavilion of Solitude",
      category: "Cultural",
      year: "2025",
      location: "Kyoto, Japan",
      area: "280 m²",
      materials: "Charred Cedar (Yakisugi), Washi Screen, Basalt",
      description:
        "A contemplative tea pavilion and reading room surrounded by moss gardens and weeping cherry trees. Precision mortise-and-tenon carpentry meets minimalist thermal insulation.",
      discipline: "Architecture · Bespoke Joinery",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Alpine Sanctuary Lodge",
      category: "Hospitality",
      year: "2023",
      location: "Engadin Valley, Switzerland",
      area: "1,850 m²",
      materials: "Local Granite, Larch Siding, Triple-glazed Glass",
      description:
        "A modern mountain retreat designed to endure severe alpine winters. Passive solar orientation and thick stone walls trap daytime heat while framing panorama views of the peaks.",
      discipline: "Hospitality · Sustainable Engineering",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const project = active === null ? null : filteredProjects[active];

  return (
    <section
      id="projects"
      className="w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 transition-colors border-b"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody, borderColor: mix(ink, 12) }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and Category Filters */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b" style={{ borderColor: mix(ink, 14) }}>
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold block mb-3" style={{ color: accent }}>
              <Editable value="02 / SELECTED COMMISSIONS" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-none"
              style={{ fontFamily: fontHeading, color: ink }}
              value={props?.title || "Works of enduring presence."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Residential", "Cultural", "Hospitality"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setActive(null);
                }}
                className="px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer border"
                style={{
                  backgroundColor: filter === cat ? ink : "transparent",
                  color: filter === cat ? bg : ink,
                  borderColor: filter === cat ? ink : mix(ink, 22),
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Architectural Grid with Asymmetric Polish */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {filteredProjects.map((item, index) => (
            <article
              key={item.title}
              className="group cursor-pointer flex flex-col justify-between border pb-6 transition-all hover:shadow-lg"
              style={{ borderColor: mix(ink, 15), backgroundColor: mix(bg, 50) }}
              onClick={() => setActive(index)}
            >
              <div className="relative overflow-hidden aspect-[16/10] bg-black/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs"
                  style={{ backgroundColor: "rgba(17, 20, 23, 0.45)" }}
                >
                  <span
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-semibold text-white shadow-md"
                    style={{ backgroundColor: accent }}
                  >
                    <Maximize2 size={13} />
                    View Architectural Brief
                  </span>
                </div>

                <div
                  className="absolute top-4 left-4 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold backdrop-blur-md text-white"
                  style={{ backgroundColor: "rgba(17,20,23,0.75)" }}
                >
                  {item.category} · {item.year}
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <Editable
                      as="h3"
                      className="text-2xl md:text-3xl font-medium tracking-tight"
                      style={{ fontFamily: fontHeading, color: ink }}
                      value={item.title}
                    />
                    <ArrowUpRight
                      size={20}
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0"
                      style={{ color: accent }}
                    />
                  </div>
                  <p className="text-xs uppercase tracking-wider mb-4 opacity-70" style={{ color: inkSecond }}>
                    {item.location} · {item.area}
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: mix(ink, 75) }}>
                    {item.description}
                  </p>
                </div>

                <div
                  className="pt-4 border-t flex items-center justify-between text-xs"
                  style={{ borderColor: mix(ink, 12), color: mix(inkSecond, 85) }}
                >
                  <span className="font-mono">{item.materials}</span>
                  <span className="font-semibold uppercase tracking-wider" style={{ color: accent }}>
                    Explore Details →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Dialogue link */}
        <div
          className="mt-16 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs uppercase tracking-wider border-t"
          style={{ borderColor: mix(ink, 14), color: mix(ink, 75) }}
        >
          <span>Monograph Archive contains 38 documented projects</span>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: ink, textDecorationColor: accent }}
          >
            <Editable value="Inquire about commissioning a work" />
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Project Detail Modal */}
        <Dialog open={active !== null} onOpenChange={(open) => { if (!open) setActive(null); }}>
          {project && (
            <DialogContent
              className="max-w-3xl p-0 overflow-hidden rounded-none border shadow-2xl"
              style={{ backgroundColor: bg, borderColor: mix(ink, 20), color: ink, fontFamily: fontBody }}
              aria-describedby="project-description"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/10">
                <img className="w-full h-full object-cover" src={project.image} alt={project.title} />
                <div
                  className="absolute bottom-3 left-4 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-white backdrop-blur-md"
                  style={{ backgroundColor: "rgba(17,20,23,0.7)" }}
                >
                  {project.category} · {project.year}
                </div>
              </div>

              <div className="p-8 md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <DialogTitle className="text-3xl md:text-4xl font-medium tracking-tight" style={{ color: ink, fontFamily: fontHeading }}>
                    <Editable value={project.title} />
                  </DialogTitle>
                  <span className="text-xs font-mono uppercase px-2.5 py-1 border" style={{ borderColor: mix(ink, 20), color: accent }}>
                    Built Commission
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 my-4 border-y text-xs uppercase tracking-wider" style={{ borderColor: mix(ink, 14) }}>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} style={{ color: accent }} />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} style={{ color: accent }} />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler size={14} style={{ color: accent }} />
                    <span>{project.area}</span>
                  </div>
                </div>

                <DialogDescription id="project-description" className="text-base leading-relaxed mb-6 font-normal" style={{ color: mix(ink, 80) }}>
                  <Editable value={project.description} />
                </DialogDescription>

                <div className="mb-6 p-4 border text-xs" style={{ borderColor: mix(ink, 15), backgroundColor: mix(bg, 35) }}>
                  <span className="font-semibold uppercase tracking-wider block mb-1" style={{ color: ink }}>
                    Material Palette & Structural Fabric
                  </span>
                  <span style={{ color: mix(inkSecond, 85) }}>{project.materials}</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t text-xs uppercase tracking-wider" style={{ borderColor: mix(ink, 14) }}>
                  <span className="font-mono opacity-70">{project.discipline}</span>
                  <a
                    href="#contact"
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: accent }}
                  >
                    <span>Discuss Similar Project</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}

export const Projects = ArchitectureStudio1Projects;
export default ArchitectureStudio1Projects;