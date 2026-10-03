// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import heroImage from "./public/cubiq-tower.jpg";
import secondaryImage from "./public/residence.jpg";

export function ArchitectureStudio2Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";
  const [active, setActive] = useState<number | null>(null);

  const projects = [
    {
      title: "The Terracotta House",
      category: "01 / RESIDENTIAL",
      description: "A sculptural terracotta tower where strong geometry meets the warmth of home.",
      discipline: "Residential · Architecture",
      image: heroImage,
    },
    {
      title: "Horizon Residence",
      category: "02 / PRIVATE HOME",
      description: "A retreat that opens out to its surroundings through light, texture and generous space.",
      discipline: "Private home · Interiors",
      image: secondaryImage,
    },
  ];

  const project = active === null ? null : projects[active];

  return (
    <section
      id="projects"
      className="px-6 md:px-14 lg:px-20 py-24 md:py-32 transition-colors w-full"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest block mb-4"
            style={{ color: accent }}
          >
            <Editable value="THE WORK / 2026" />
          </span>
          <Editable
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-medium leading-none tracking-tight font-serif italic"
            style={{ color: ink, fontFamily: fontHeading }}
            value={props?.title || "Places to feel."}
            onChange={(v) => onChange?.({ title: v })}
          />
        </div>
        <Editable
          as="p"
          className="text-xs md:text-sm max-w-xs leading-relaxed opacity-70"
          style={{ color: inkSecond }}
          value="Expressive places shaped around everyday life."
        />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-6 items-start">
        {projects.map((item, index) => (
          <article key={item.title} className="group cursor-pointer">
            <div onClick={() => setActive(index)} className="block w-full text-left">
              <div className="relative overflow-hidden mb-4 bg-black/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    index === 0 ? "h-[380px] md:h-[500px]" : "h-[320px] md:h-[440px]"
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-white/90 text-black shadow-lg">
                    <Editable value="VIEW PROJECT" />
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>

              <div
                className="flex items-center justify-between py-4 border-b transition-colors"
                style={{ borderColor: `${ink}1A` }}
              >
                <div>
                  <span
                    className="text-[10px] uppercase font-bold tracking-wider opacity-60 block mb-1"
                    style={{ color: accent }}
                  >
                    <Editable value={item.category} />
                  </span>
                  <Editable
                    as="strong"
                    className="text-xl md:text-2xl font-medium font-serif italic"
                    style={{ color: ink, fontFamily: fontHeading }}
                    value={item.title}
                  />
                </div>
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-70 shrink-0"
                  style={{ color: ink }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pt-12 pb-5 text-xs font-bold uppercase tracking-wider"
        style={{ borderColor: `${ink}1A`, color: ink }}
      >
        <span className="flex items-center gap-6">
          <Editable value="03 / COMING INTO FOCUS" />
          <Editable value="Form & Function" />
        </span>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-60"
          style={{ color: accent }}
        >
          <Editable value="START A PROJECT" />
          <ArrowUpRight size={16} />
        </a>
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => { if (!open) setActive(null); }}>
        {project && (
          <DialogContent
            className="max-w-2xl p-0 overflow-hidden border"
            style={{ backgroundColor: bg, borderColor: `${ink}26`, color: ink, fontFamily: fontBody }}
            aria-describedby="project-description"
          >
            <img className="w-full h-72 object-cover" src={project.image} alt={project.title} />
            <div className="p-8">
              <span
                className="text-[10px] font-bold uppercase tracking-wider block mb-2"
                style={{ color: accent }}
              >
                <Editable value={project.category} />
              </span>
              <DialogTitle className="text-3xl font-medium mb-3 font-serif italic" style={{ color: ink, fontFamily: fontHeading }}>
                <Editable value={project.title} />
              </DialogTitle>
              <DialogDescription id="project-description" className="text-sm leading-relaxed mb-6 opacity-80" style={{ color: inkSecond }}>
                <Editable value={project.description} />
              </DialogDescription>
              <div
                className="flex items-center justify-between border-t pt-4 text-xs font-semibold uppercase tracking-wider"
                style={{ borderColor: `${ink}1A` }}
              >
                <Editable value={project.discipline} style={{ color: inkSecond }} />
                <a
                  href="#contact"
                  onClick={() => setActive(null)}
                  className="inline-flex items-center gap-1.5 rounded-none h-9 px-4 text-[10px] font-bold tracking-wider uppercase shadow-none cursor-pointer bg-[var(--accent)] text-white"
                  style={{ backgroundColor: accent, color: "#ffffff", "--accent": accent }}
                >
                  <Editable value="DISCUSS A PROJECT" />
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

export const Projects = ArchitectureStudio2Projects;
export default ArchitectureStudio2Projects;
