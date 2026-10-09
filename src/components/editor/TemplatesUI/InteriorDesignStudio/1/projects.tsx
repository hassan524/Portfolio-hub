// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const DISPLAY = "'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif";
const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

export const InteriorDesignStudio1Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [active, setActive] = useState(0);

  const bg = theme.bg || "#101012";
  const ink = theme.ink || "#FFFFFF";
  const ink2 = theme["ink-second"] || "#A1A1AA";
  const accent = theme.accent || "#38BDF8";
  const surface = theme.surface || "#1C1C21";
  const rule = "rgba(255,255,255,0.12)";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const defaultProjects = [
    {
      num: "01",
      title: "Kairos Penthouse",
      category: "Residential",
      location: "Kyoto, Japan",
      year: "2025",
      area: "4,600 sq ft",
      desc: "Cedar joinery, honed basalt hearths and recessed skylights framing the mountains.",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85",
    },
    {
      num: "02",
      title: "Villa Nordica",
      category: "Coastal",
      location: "Oslo Fjord, Norway",
      year: "2024",
      area: "6,200 sq ft",
      desc: "Cast concrete with brushed pine, raw linen and floor-to-ceiling glazing.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85",
    },
    {
      num: "03",
      title: "Atelier Solis",
      category: "Workspace",
      location: "Milan, Italy",
      year: "2024",
      area: "3,800 sq ft",
      desc: "Restored palazzo vaults with patinated bronze partitions and vintage seating.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=85",
    },
    {
      num: "04",
      title: "Monolith Residence",
      category: "Desert",
      location: "Scottsdale, Arizona",
      year: "2023",
      area: "5,400 sq ft",
      desc: "Rammed-earth facades around quiet courtyards, reflecting pools and micro-cement.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
    },
  ];

  const projects = p.projects || defaultProjects;
  const current = projects[active];

  return (
    <section
      id="projects"
      className="px-6 md:px-12 lg:px-16 py-28 border-t"
      style={{ backgroundColor: bg, color: ink, borderColor: rule }}
    >
      {/* Header: title left (col 1), description right (col 9) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-16">
        <motion.div {...reveal()} className="md:col-span-8">
          <span className="block text-xs uppercase font-mono tracking-widest mb-4" style={{ color: ink2 }}>
            <Editable value={p.sectionTag || "01 — Selected Work"} onChange={(v) => handleUpdate("sectionTag", v)} />
          </span>
          <h2
            className="uppercase"
            style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(4rem, 13vw, 12rem)", lineHeight: 0.85 }}
          >
            <Editable value={p.sectionTitle || "Spaces"} onChange={(v) => handleUpdate("sectionTitle", v)} />
          </h2>
        </motion.div>
        <motion.p {...reveal(0.15)} className="md:col-span-4 text-sm leading-relaxed" style={{ color: ink2 }}>
          <Editable
            value={p.sectionDesc || "Every commission starts with light, material and structure. Hover a row to see the space."}
            onChange={(v) => handleUpdate("sectionDesc", v)}
          />
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-12 items-start">
        {/* Index: cols 1-7 */}
        <div className="lg:col-span-7 border-b" style={{ borderColor: rule }}>
          {projects.map((proj: any, idx: number) => {
            const on = active === idx;
            return (
              <motion.div
                key={idx}
                {...reveal(idx * 0.08)}
                onMouseEnter={() => setActive(idx)}
                onClick={() => setActive(idx)}
                className="py-7 border-t cursor-pointer grid grid-cols-12 gap-x-4"
                style={{ borderColor: rule }}
              >
                {/* number col */}
                <span className="col-span-2 sm:col-span-1 font-mono text-xs pt-3" style={{ color: on ? accent : ink2 }}>
                  {proj.num}
                </span>

                {/* title + meta col */}
                <div className="col-span-10 sm:col-span-9">
                  <motion.h3
                    animate={{ x: on ? 12 : 0, color: on ? accent : ink }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="uppercase"
                    style={{
                      fontFamily: DISPLAY,
                      fontWeight: 400,
                      fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                      lineHeight: 1,
                    }}
                  >
                    {proj.title}
                  </motion.h3>
                  <div className="mt-3 text-xs uppercase tracking-wider flex flex-wrap gap-x-3" style={{ color: ink2 }}>
                    <span>{proj.category}</span>
                    <span>/</span>
                    <span>{proj.location}</span>
                    <span>/</span>
                    <span>{proj.area}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-4 text-sm max-w-md leading-relaxed"
                      >
                        {proj.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* year col, right aligned */}
                <span className="hidden sm:block col-span-2 text-right font-mono text-xs pt-3" style={{ color: ink2 }}>
                  {proj.year}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Image: cols 9-12 so it lines up with the header description above */}
        <div className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-28 hidden lg:block">
          <div className="aspect-[4/5] w-full overflow-hidden relative" style={{ backgroundColor: surface }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={current?.image}
                alt={current?.title}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(0.15) contrast(1.05)" }}
              />
            </AnimatePresence>
          </div>
          <div className="flex justify-between mt-3 text-[11px] font-mono uppercase tracking-wider" style={{ color: ink2 }}>
            <span>{current?.title}</span>
            <span>{current?.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorDesignStudio1Projects;