// @ts-nocheck
import React, { useRef } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const SERIF = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";
const EASE = [0.16, 1, 0.3, 1];

const Panel = ({ proj, idx }: { proj: any; idx: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative h-[85vh] w-full overflow-hidden text-white">
      {/* Parallax photo fills the whole panel */}
      <motion.img
        src={proj.image}
        alt={proj.title}
        style={{ y, height: "125%", top: "-12%" }}
        className="absolute left-0 w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%)" }} />

      {/* Caption on the shared 12-col grid */}
      <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 lg:px-16 pb-10 grid grid-cols-12 gap-6 items-end">
        <span className="col-span-12 md:col-span-1 text-xs tracking-widest">{proj.num}</span>
        <motion.h3
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="col-span-12 md:col-span-7"
          style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 0.9 }}
        >
          {proj.title}
        </motion.h3>
        <div className="col-span-12 md:col-span-4 text-sm md:text-right space-y-1">
          <p>{proj.location} · {proj.year}</p>
          <p className="text-white/75">{proj.desc}</p>
        </div>
      </div>
    </div>
  );
};

export const InteriorDesignStudio2Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#F2EEE6";
  const ink = theme.ink || "#17201B";
  const ink2 = theme["ink-second"] || "#5C655F";
  const accent = theme.accent || "#2F5D46";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const projects = p.projects || [
    {
      num: "01",
      title: "Casa Marés",
      location: "Lisbon",
      year: "2025",
      desc: "Lime plaster, oak and a courtyard that follows the sun.",
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=85",
    },
    {
      num: "02",
      title: "Hus Nord",
      location: "Copenhagen",
      year: "2024",
      desc: "A family home in pale ash, linen and soft north light.",
      image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=2400&q=85",
    },
    {
      num: "03",
      title: "The Orchard Rooms",
      location: "Somerset",
      year: "2024",
      desc: "Eight hospitality suites inside a restored stone barn.",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=2400&q=85",
    },
  ];

  return (
    <section id="projects" style={{ backgroundColor: bg, color: ink }}>
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-16 pt-8 pb-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="md:col-span-8"
        >
          <span className="block text-xs uppercase tracking-[0.2em] mb-5" style={{ color: accent }}>
            <Editable value={p.tag || "Selected work"} onChange={(v) => handleUpdate("tag", v)} />
          </span>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(3.5rem, 10vw, 10rem)", lineHeight: 0.88 }}>
            <Editable value={p.title || "Recent homes"} onChange={(v) => handleUpdate("title", v)} />
          </h2>
        </motion.div>
        <p className="md:col-span-4 text-sm leading-relaxed" style={{ color: ink2 }}>
          <Editable
            value={p.desc || "Three recent commissions, photographed as they are lived in."}
            onChange={(v) => handleUpdate("desc", v)}
          />
        </p>
      </div>

      {/* Full-bleed panels */}
      <div className="flex flex-col gap-2">
        {projects.map((proj: any, i: number) => (
          <Panel key={i} proj={proj} idx={i} />
        ))}
      </div>
    </section>
  );
};

export const InteriorDesignStudio3Projects = InteriorDesignStudio2Projects;
export default InteriorDesignStudio2Projects;