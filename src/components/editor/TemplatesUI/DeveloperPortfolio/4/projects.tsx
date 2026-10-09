// @ts-nocheck
// Projects section — 35mm film tape strip form: each project appears as a film strip frame
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const DISPLAY = "'Bebas Neue','Oswald','Impact',sans-serif";
const SERIF = "'Cormorant Garamond','Playfair Display',Georgia,serif";

const FRAME_IMAGES = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&q=80",
];

// Sprocket holes strip on side of film frame
function SprocketColumn({ color = "#1a1a1c", count = 7 }: any) {
  return (
    <div className="flex flex-col items-center justify-around py-2" style={{ width: 28, backgroundColor: color, gap: 4, minHeight: "100%" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-sm" style={{ width: 14, height: 10, backgroundColor: "#0a0a0b", border: "1px solid rgba(255,255,255,0.08)" }} />
      ))}
    </div>
  );
}

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#07080A";
  const bgSecond = theme?.["bg-second"] || "#040506";
  const ink = theme?.ink || "#E8E4DC";
  const inkSecond = theme?.["ink-second"] || "#7A756C";
  const surface = theme?.surface || "rgba(255,255,255,0.07)";
  const accent = theme?.accent || "#E8412F";

  const [active, setActive] = useState<number | null>(null);

  const defaultProjects = [
    {
      title: "ATLAS",
      genre: "AI · COGNITIVE SYSTEMS",
      year: "2025",
      tagline: "A research copilot that indexes millions of documents and streams synthesis with citations.",
      role: "Lead Architect",
      outcomes: ["62% less research time", "Sub-second streaming", "400-prompt eval suite"],
      tags: ["Next.js", "Python", "pgvector"],
      image: FRAME_IMAGES[0],
    },
    {
      title: "PULSE",
      genre: "REALTIME · TELEMETRY",
      year: "2024",
      tagline: "Mission ops dashboard with 3D globe coordinate tracking and sub-millisecond WebSocket feeds.",
      role: "Frontend Director",
      outcomes: ["Locked 60fps render", "Custom widget grid", "9 ops teams deployed"],
      tags: ["React", "Three.js", "WebSockets"],
      image: FRAME_IMAGES[1],
    },
    {
      title: "FORGE",
      genre: "DEV TOOLS · OPEN SOURCE",
      year: "2024",
      tagline: "CLI toolkit that scaffolds, deploys and monitors cloud stacks in under 60 seconds flat.",
      role: "Creator & Maintainer",
      outcomes: ["14k monthly developers", "65 contributors", "Zero-config deploy"],
      tags: ["Node.js", "TypeScript", "Docker"],
      image: FRAME_IMAGES[2],
    },
    {
      title: "NIMBUS",
      genre: "FINTECH · BANKING",
      year: "2023",
      tagline: "Immutable event-sourced banking core with cryptographic audit trails and fraud detection.",
      role: "Backend Lead",
      outcomes: ["99.99% uptime SLA", "Event audit log", "1.8M daily transactions"],
      tags: ["Go", "PostgreSQL", "Kafka"],
      image: FRAME_IMAGES[3],
    },
  ];

  const rawList = Array.isArray(props?.items) && props.items.length > 0
    ? props.items
    : Array.isArray(props?.projects) && props.projects.length > 0
      ? props.projects
      : defaultProjects;

  const projects = rawList.map((p: any, idx: number) => ({
    title: p.title || `FEATURE ${idx + 1}`,
    genre: p.genre || p.category || "DRAMA",
    year: p.year || "2024",
    tagline: p.tagline || p.description || "A signature production built with precision and craft.",
    role: p.role || "Lead Engineer",
    outcomes: Array.isArray(p.outcomes) && p.outcomes.length > 0 ? p.outcomes : ["Production grade", "High scale"],
    tags: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : ["React", "TypeScript"],
    image: p.image || FRAME_IMAGES[idx % FRAME_IMAGES.length],
  }));

  const setP = (i: number, field: string, v: any) =>
    onChange?.({
      items: projects.map((p: any, k: number) => (k === i ? { ...p, [field]: v } : p)),
      projects: projects.map((p: any, k: number) => (k === i ? { ...p, [field]: v } : p)),
    });

  return (
    <section id="projects" className="relative w-full overflow-hidden" style={{ backgroundColor: bg, color: ink }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap');`}</style>

      {/* Top tape strip marquee — full width film strip */}
      <div className="relative w-full overflow-hidden" style={{ backgroundColor: "#0e0e10", height: 72 }}>
        {/* Top sprocket row */}
        <div className="absolute inset-x-0 top-[6px] h-[9px]" style={{ backgroundImage: "repeating-linear-gradient(90deg, #0a0a0b 0 10px, transparent 10px 22px)", backgroundSize: "22px 100%" }} />
        {/* Bottom sprocket row */}
        <div className="absolute inset-x-0 bottom-[6px] h-[9px]" style={{ backgroundImage: "repeating-linear-gradient(90deg, #0a0a0b 0 10px, transparent 10px 22px)", backgroundSize: "22px 100%" }} />
        {/* Scrolling text on tape */}
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div
            className="flex items-center gap-20 whitespace-nowrap text-[11px] font-mono uppercase tracking-[0.35em]"
            style={{ animation: "film-scroll-tape 22s linear infinite", color: "#3a3830" }}
          >
            {Array.from({ length: 6 }).map((_, ri) =>
              projects.map((p: any, pi: number) => (
                <span key={`${ri}-${pi}`} className="flex items-center gap-6">
                  <span style={{ color: accent }}>◆</span>
                  <span>{p.title}</span>
                  <span>{p.year}</span>
                </span>
              ))
            )}
          </div>
        </div>
      </div>
      <style>{`@keyframes film-scroll-tape { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>

      <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-12 md:py-32">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b pb-8 md:flex-row md:items-end" style={{ borderColor: surface }}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em]" style={{ color: accent }}>
              <Editable value={props?.eyebrow || "ACT II · NOW SHOWING"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </p>
            <h2 className="mt-2 text-5xl tracking-wider md:text-7xl" style={{ fontFamily: DISPLAY }}>
              <Editable value={props?.title || "FEATURE PRODUCTIONS"} onChange={(v) => onChange?.({ title: v })} />
            </h2>
          </div>
          <span className="font-mono text-xs tracking-widest" style={{ color: inkSecond }}>
            {projects.length} REELS IN CAN
          </span>
        </div>

        {/* Film Tape Project Strips */}
        <div className="mt-16 space-y-6">
          {projects.map((p: any, i: number) => {
            const isOpen = active === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ delay: i * 0.08 }}
              >
                {/* Film tape frame — the entire project card IS the film strip */}
                <div
                  className="overflow-hidden"
                  style={{ backgroundColor: "#0a0b0d", border: `1px solid ${isOpen ? accent : surface}`, transition: "border-color 0.3s" }}
                >
                  {/* Top perforations row */}
                  <div className="flex" style={{ backgroundColor: "#0a0a0b", height: 18 }}>
                    {Array.from({ length: 40 }).map((_, h) => (
                      <div key={h} className="mx-[2px] my-[4px] flex-shrink-0 rounded-sm" style={{ width: 16, height: 10, backgroundColor: "#06060A", border: "1px solid rgba(255,255,255,0.06)" }} />
                    ))}
                  </div>

                  {/* Main frame content */}
                  <div className="flex">
                    {/* Left sprocket column */}
                    <SprocketColumn color="#090a0c" count={isOpen ? 14 : 7} />

                    {/* Frame Content */}
                    <div className="flex-1">
                      {/* Slate clickable header */}
                      <button
                        onClick={() => setActive(isOpen ? null : i)}
                        className="flex w-full items-center justify-between px-6 py-5 text-left transition-all"
                        style={{ borderBottom: isOpen ? `1px solid ${surface}` : "none" }}
                      >
                        <div className="flex items-baseline gap-5 md:gap-10">
                          <span className="font-mono text-xs tracking-widest opacity-50">ROLL 0{i + 1}</span>
                          <span className="text-4xl tracking-wider md:text-6xl" style={{ fontFamily: DISPLAY, color: isOpen ? accent : ink }}>
                            <Editable value={p.title} onChange={(v) => setP(i, "title", v)} />
                          </span>
                        </div>
                        <div className="hidden items-center gap-6 md:flex">
                          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: inkSecond }}>
                            <Editable value={p.genre} onChange={(v) => setP(i, "genre", v)} />
                          </span>
                          <span className="font-mono text-sm" style={{ color: accent }}>
                            <Editable value={p.year} onChange={(v) => setP(i, "year", v)} />
                          </span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-transform" style={{ borderColor: isOpen ? accent : surface, color: isOpen ? accent : inkSecond, transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
                        </div>
                      </button>

                      {/* Expanded frame content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-0 lg:grid-cols-2">
                              {/* Left: Anamorphic 2.39:1 image inside the tape */}
                              <div className="relative overflow-hidden" style={{ aspectRatio: "2.39/1" }}>
                                <img src={p.image} alt={p.title} className="h-full w-full object-cover" style={{ filter: "contrast(1.1) brightness(0.85) saturate(0.85)" }} />
                                {/* Film frame overlay — crosshair + metadata */}
                                <div className="pointer-events-none absolute inset-0 border border-white/10">
                                  <div className="absolute top-2 left-3 font-mono text-[9px] tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
                                    FRAME {String(i + 1).padStart(2,"0")} · RAW 35MM
                                  </div>
                                  <div className="absolute top-2 right-3 font-mono text-[9px]" style={{ color: accent }}>
                                    {p.year}
                                  </div>
                                  {/* Corner brackets */}
                                  <div className="absolute top-2 left-2 h-5 w-5 border-t border-l" style={{ borderColor: accent }} />
                                  <div className="absolute top-2 right-2 h-5 w-5 border-t border-r" style={{ borderColor: accent }} />
                                  <div className="absolute bottom-2 left-2 h-5 w-5 border-b border-l" style={{ borderColor: accent }} />
                                  <div className="absolute bottom-2 right-2 h-5 w-5 border-b border-r" style={{ borderColor: accent }} />
                                </div>
                              </div>

                              {/* Right: Project details in tape frame */}
                              <div className="flex flex-col gap-4 p-6" style={{ borderLeft: `1px solid ${surface}` }}>
                                <p className="text-lg italic leading-snug md:text-xl" style={{ fontFamily: SERIF, color: ink }}>
                                  "<Editable value={p.tagline} onChange={(v) => setP(i, "tagline", v)} />"
                                </p>
                                <div className="border-t pt-3" style={{ borderColor: surface }}>
                                  <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: accent }}>
                                    DIRECTOR ROLE: <span style={{ color: ink }}>{p.role}</span>
                                  </p>
                                </div>
                                <ul className="space-y-2">
                                  {p.outcomes.map((o: string, oi: number) => (
                                    <li key={oi} className="flex items-center gap-3 text-base" style={{ fontFamily: SERIF }}>
                                      <span className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                                      <Editable value={o} onChange={(v) => setP(i, "outcomes", p.outcomes.map((t: string, k: number) => (k === oi ? v : t)))} />
                                    </li>
                                  ))}
                                </ul>
                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {p.tags.map((t: string, ti: number) => (
                                    <span key={ti} className="border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider" style={{ borderColor: surface, color: inkSecond }}>{t}</span>
                                  ))}
                                </div>
                                <a href="#contact" className="mt-auto inline-flex items-center gap-2 self-start text-base tracking-widest uppercase" style={{ fontFamily: DISPLAY, color: accent }}>
                                  <Editable value={props?.cta || "VIEW CODE"} onChange={(v) => onChange?.({ cta: v })} />
                                  <ArrowUpRight className="h-4 w-4" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Right sprocket column */}
                    <SprocketColumn color="#090a0c" count={isOpen ? 14 : 7} />
                  </div>

                  {/* Bottom perforations row */}
                  <div className="flex" style={{ backgroundColor: "#0a0a0b", height: 18 }}>
                    {Array.from({ length: 40 }).map((_, h) => (
                      <div key={h} className="mx-[2px] my-[4px] flex-shrink-0 rounded-sm" style={{ width: 16, height: 10, backgroundColor: "#06060A", border: "1px solid rgba(255,255,255,0.06)" }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const DeveloperPortfolio4Projects = Projects;
export default Projects;
