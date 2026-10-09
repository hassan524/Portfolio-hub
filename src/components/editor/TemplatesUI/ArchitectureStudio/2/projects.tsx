// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, ArrowRight, Eye, Layers, MapPin, Ruler } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import heroImage from "./public/cubiq-tower.jpg";
import secondaryImage from "./public/residence.jpg";

const mix = (c: string = "#1A1816", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio2Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F4F0EA";
  const ink = theme?.ink || "#1A1816";
  const inkSecond = theme?.["ink-second"] || "#5C5650";
  const accent = theme?.accent || "#C85A32";
  const fontHeading = theme?.fontHeading || "DM Sans";
  const fontBody = theme?.fontBody || "DM Sans";

  const [active, setActive] = useState<number | null>(null);

  const projects = [
    {
      num: "01",
      title: "The Terracotta Tower",
      typology: "Residential High-Rise",
      location: "Milan, Italy",
      year: "2025",
      area: "14,200 m²",
      height: "72.4 m",
      structural: "Board-Formed Concrete & Extruded Terracotta",
      description:
        "A sculptural terracotta tower where strong rectilinear geometry meets warm Mediterranean materiality. The facade responds parametrically to solar orientation with deep vertical ceramic fins.",
      image: heroImage,
    },
    {
      num: "02",
      title: "Horizon Residence",
      typology: "Private Waterfront Villa",
      location: "Lake Como, Italy",
      year: "2024",
      area: "880 m²",
      height: "9.2 m",
      structural: "Quarried Travertine & Cantilevered Post-Tensioned Slabs",
      description:
        "Cascading terraces framed in honed travertine that step down the Alpine slope toward the water. Minimalist floor-to-ceiling glazing dissolves the threshold between interior living and lake panorama.",
      image: secondaryImage,
    },
    {
      num: "03",
      title: "Basalt Cultural Forum",
      typology: "Civic Museum & Hall",
      location: "Zurich, Switzerland",
      year: "2025",
      area: "6,400 m²",
      height: "18.5 m",
      structural: "Precast Basalt Concrete & Skylight Geometries",
      description:
        "A monumental cultural pavilion housing contemporary art installations. Natural light enters through deep pyramidal roof monitors, bathing the cavernous concrete exhibition halls in soft northern daylight.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      num: "04",
      title: "The Timber Monolith",
      typology: "Commercial Headquarters",
      location: "Oslo, Norway",
      year: "2024",
      area: "9,800 m²",
      height: "36.0 m",
      structural: "Cross-Laminated Timber (CLT) & Glulam Columns",
      description:
        "One of Scandinavia's most ambitious low-embodied carbon timber structures. The exposed spruce interior creates an acoustic and biophilic workplace that requires zero synthetic finishes.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const project = active === null ? null : projects[active];

  return (
    <section
      id="projects"
      className="w-full px-6 md:px-12 py-24 md:py-32 transition-colors border-b"
      style={{
        backgroundColor: bg,
        borderColor: mix(ink, 16),
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b" style={{ borderColor: mix(ink, 14) }}>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold block mb-3" style={{ color: accent }}>
              <Editable value="02 // WORK ARCHIVE & CATALOG" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-none"
              style={{ color: ink }}
              value={props?.title || "Places shaped by structural purpose."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          <div className="font-mono text-xs opacity-75 text-right">
            <span>DOCUMENTS: 04 SELECTED</span>
            <br />
            <span className="text-[10px] opacity-60">UPDATED Q1 2026</span>
          </div>
        </div>

        {/* Modernist Structural Catalog Matrix Rows */}
        <div className="space-y-6">
          {projects.map((item, index) => (
            <article
              key={item.title}
              onClick={() => setActive(index)}
              className="border p-6 md:p-8 transition-all hover:shadow-lg cursor-pointer group"
              style={{
                backgroundColor: mix(bg, 60),
                borderColor: mix(ink, 16),
              }}
            >
              <div className="grid lg:grid-cols-12 gap-6 items-center">
                {/* Number & Typology */}
                <div className="lg:col-span-2 font-mono">
                  <span className="text-3xl font-bold block mb-1 group-hover:translate-x-1 transition-transform" style={{ color: accent }}>
                    {item.num}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold opacity-70" style={{ color: inkSecond }}>
                    {item.typology}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="lg:col-span-5">
                  <Editable
                    as="h3"
                    className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-2 group-hover:text-accent transition-colors"
                    style={{ color: ink }}
                    value={item.title}
                  />
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: mix(ink, 75) }}>
                    {item.description}
                  </p>
                </div>

                {/* Technical Specs */}
                <div className="lg:col-span-3 font-mono text-xs space-y-1.5 opacity-80" style={{ color: inkSecond }}>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} style={{ color: accent }} />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler size={13} style={{ color: accent }} />
                    <span>Area: {item.area} · H: {item.height}</span>
                  </div>
                  <div className="text-[11px] truncate opacity-70">
                    {item.structural}
                  </div>
                </div>

                {/* Action / View */}
                <div className="lg:col-span-2 flex justify-start lg:justify-end">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold border transition-colors group-hover:bg-black group-hover:text-white group-hover:border-black"
                    style={{ borderColor: mix(ink, 22), color: ink }}
                  >
                    <span>ANALYZE</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal Sheet for Technical Breakdown */}
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
                  className="absolute bottom-3 left-4 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white backdrop-blur-md"
                  style={{ backgroundColor: "rgba(26,24,22,0.85)" }}
                >
                  CATALOG // {project.num} · {project.year}
                </div>
              </div>

              <div className="p-8 md:p-10 font-mono">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <DialogTitle className="text-3xl font-bold uppercase tracking-tight" style={{ color: ink }}>
                    <Editable value={project.title} />
                  </DialogTitle>
                  <span className="text-xs px-2.5 py-1 border font-bold" style={{ borderColor: accent, color: accent }}>
                    {project.typology}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 my-4 border-y text-xs uppercase" style={{ borderColor: mix(ink, 14) }}>
                  <div>
                    <span className="opacity-60 block text-[10px]">LOCATION</span>
                    <span className="font-bold">{project.location}</span>
                  </div>
                  <div>
                    <span className="opacity-60 block text-[10px]">GROSS AREA</span>
                    <span className="font-bold">{project.area}</span>
                  </div>
                  <div>
                    <span className="opacity-60 block text-[10px]">ELEVATION HEIGHT</span>
                    <span className="font-bold">{project.height}</span>
                  </div>
                  <div>
                    <span className="opacity-60 block text-[10px]">COMPLETION</span>
                    <span className="font-bold">{project.year}</span>
                  </div>
                </div>

                <DialogDescription id="project-description" className="text-sm font-sans leading-relaxed mb-6" style={{ color: mix(ink, 80) }}>
                  <Editable value={project.description} />
                </DialogDescription>

                <div className="p-4 border text-xs mb-6" style={{ borderColor: mix(ink, 16), backgroundColor: mix(bg, 40) }}>
                  <span className="font-bold block mb-1" style={{ color: accent }}>
                    STRUCTURAL & MATERIAL SYSTEM
                  </span>
                  <span className="font-mono text-xs" style={{ color: mix(inkSecond, 90) }}>
                    {project.structural}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t text-xs" style={{ borderColor: mix(ink, 14) }}>
                  <span className="opacity-60">BIM ARCHIVE DATA READY</span>
                  <a
                    href="#contact"
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 font-bold text-white transition-opacity hover:opacity-90 uppercase tracking-wider"
                    style={{ backgroundColor: accent }}
                  >
                    <span>INQUIRE COMMISSION</span>
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

export const Projects = ArchitectureStudio2Projects;
export default ArchitectureStudio2Projects;
