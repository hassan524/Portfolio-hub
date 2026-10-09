// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, ArrowRight, Eye, Layers, MapPin, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import heroImage from "./public/ambitious-building.jpg";
import residenceImage from "./public/residence.jpg";

export function ArchitectureStudio3Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const ink = theme?.ink || "#FFFFFF";
  const fontBody = theme?.fontBody || "DM Sans";
  const [active, setActive] = useState<number | null>(null);

  const projects = [
    {
      num: "01",
      title: "The Arc Cultural Center",
      category: "CIVIC & CULTURAL",
      year: "2025",
      location: "Oslo, Norway",
      area: "12,400 m²",
      materials: "Pre-patinated Zinc & Curved Triple-Glazed Facade",
      description:
        "A fluid architectural form bringing a new civic horizon to the waterfront. Rhythmic curved structural ribs frame cavernous performance auditoriums and public harborside plazas.",
      image: heroImage,
    },
    {
      num: "02",
      title: "Woodland Monolith",
      category: "RESIDENTIAL SANCTUARY",
      year: "2024",
      location: "Helsinki, Finland",
      area: "740 m²",
      materials: "Black Charred Pine & Board-Formed Concrete",
      description:
        "A private forest dwelling where the bedrock sets the floorplate rhythm. Minimalist cantilevered terraces extend into pine tree canopies with zero disruption to the forest floor.",
      image: residenceImage,
    },
    {
      num: "03",
      title: "Glass Spire Atrium",
      category: "PUBLIC FORUM",
      year: "2025",
      location: "Copenhagen, Denmark",
      area: "8,900 m²",
      materials: "Structural Steel Truss & Low-Iron Photovoltaic Glass",
      description:
        "A sculptural public atrium connecting research faculties and urban transit. The diagrid glass envelope harvests ambient daylight while supplying thermal warmth during Nordic winters.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      num: "04",
      title: "Basalt Coast Observatory",
      category: "SCIENTIFIC & CIVIC",
      year: "2024",
      location: "Reykjavik, Iceland",
      area: "3,100 m²",
      materials: "Extruded Basalt Fiber & Weathered Cast Iron",
      description:
        "A low-slung oceanic research laboratory embedded directly into black volcanic lava fields. Geothermal subterranean boreholes supply 100% of operational energy.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const project = active === null ? null : projects[active];

  return (
    <section
      id="projects"
      className="w-full px-6 md:px-12 lg:px-16 py-24 md:py-36 transition-colors border-b"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/12">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/70 block mb-3">
              <Editable value="02 // BUILT PORTFOLIO" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight leading-none text-white"
              value={props?.title || "Built beyond the expected."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          <div className="font-mono text-xs text-white/60 text-right">
            <span>DOCUMENTS: 04 COMMISSIONS</span>
            <br />
            <span>HELSINKI // OSLO // COPENHAGEN</span>
          </div>
        </div>

        {/* 2x2 Dark Monolithic Card Grid with Rich Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              onClick={() => setActive(idx)}
              className="border border-white/12 bg-[#0D0D10] group cursor-pointer overflow-hidden flex flex-col justify-between transition-all hover:border-white/40 shadow-xl"
            >
              {/* Image Frame with Desaturated Dark Aesthetic */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-widest font-bold bg-white text-black shadow-lg">
                    <Maximize2 size={13} />
                    View Architectural Sheet
                  </span>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1 font-mono text-[10px] uppercase tracking-widest font-bold bg-black/80 text-white backdrop-blur-md border border-white/15">
                  {item.num} // {item.category}
                </div>
              </div>

              {/* Card Meta Body */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-white/80 transition-colors">
                      {item.title}
                    </h3>
                    <ArrowUpRight size={20} className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <p className="text-xs font-mono uppercase tracking-wider text-white/60 mb-4">
                    {item.location} · {item.area} · COMPLETED {item.year}
                  </p>
                  <p className="text-sm leading-relaxed text-white/75 font-light mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white/60">
                  <span className="truncate pr-4">{item.materials}</span>
                  <span className="shrink-0 text-white font-bold group-hover:underline">EXPAND →</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Modal Dialog for Project Breakdown */}
        <Dialog open={active !== null} onOpenChange={(open) => { if (!open) setActive(null); }}>
          {project && (
            <DialogContent
              className="max-w-3xl p-0 overflow-hidden rounded-none border border-white/20 shadow-2xl bg-[#09090B] text-white"
              aria-describedby="project-description"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                <img className="w-full h-full object-cover grayscale contrast-125" src={project.image} alt={project.title} />
                <div className="absolute bottom-3 left-4 px-3 py-1 font-mono text-xs uppercase tracking-wider bg-black/80 text-white backdrop-blur-md border border-white/20">
                  {project.num} // {project.category}
                </div>
              </div>

              <div className="p-8 md:p-10 font-mono">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <DialogTitle className="text-3xl font-bold uppercase tracking-tight text-white">
                    <Editable value={project.title} />
                  </DialogTitle>
                  <span className="text-xs px-2.5 py-1 border border-white/30 text-white">
                    {project.year}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 my-4 border-y border-white/12 text-xs uppercase">
                  <div>
                    <span className="text-white/50 block text-[10px]">LOCATION</span>
                    <span className="text-white font-bold">{project.location}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px]">AREA</span>
                    <span className="text-white font-bold">{project.area}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px]">TYPOLOGY</span>
                    <span className="text-white font-bold">{project.category}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block text-[10px]">STATUS</span>
                    <span className="text-white font-bold">OCCUPIED</span>
                  </div>
                </div>

                <DialogDescription id="project-description" className="text-sm font-sans leading-relaxed text-white/80 mb-6">
                  <Editable value={project.description} />
                </DialogDescription>

                <div className="p-4 border border-white/10 bg-white/5 text-xs mb-6">
                  <span className="font-bold block mb-1 text-white">
                    PRIMARY MATERIALITY & STRUCTURAL SYSTEM
                  </span>
                  <span className="text-white/70">{project.materials}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
                  <span className="text-white/50">OPEN MONOGRAPH FILE</span>
                  <a
                    href="#contact"
                    onClick={() => setActive(null)}
                    className="inline-flex items-center gap-2 px-6 py-3 font-bold bg-white text-black uppercase tracking-wider hover:bg-white/90"
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

export const Projects = ArchitectureStudio3Projects;
export default ArchitectureStudio3Projects;
