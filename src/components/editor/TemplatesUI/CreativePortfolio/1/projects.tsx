// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio1Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A7A9B3";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.09)";
  const accent = theme?.accent || "#3B82F6";

  const items = props?.projects || [
    {
      number: "01",
      type: "Brand system / 2026",
      title: "Mahlis",
      description: "A warm, considered identity for a contemporary food studio with roots in Lagos and a point of view that travels.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
      label: "MAHLIS"
    },
    {
      number: "02",
      type: "Digital experience / 2026",
      title: "Little View",
      description: "Turning a complex education platform into an approachable, kinetic world for curious young minds.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
      label: "LITTLE VIEW"
    },
    {
      number: "03",
      type: "Art direction / 2025",
      title: "Olistic View",
      description: "A personal visual language for a creative practice built around clarity, confidence, and memorable detail.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
      label: "OLISTIC VIEW"
    }
  ];

  return (
    <section
      id="projects"
      className="border-b px-5 py-24 sm:px-8 lg:px-14 transition-colors"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Top Label */}
        <div
          className="flex items-center justify-between pb-6 border-b font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em]"
          style={{ borderColor: surface, color: inkSecond }}
        >
          <span>03 — Selected Work</span>
          <span>Identity / Digital / Direction</span>
        </div>

        {/* Section Intro */}
        <div className="mt-16 mb-20 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
          <div>
            <h2 className="text-[clamp(2.6rem,7vw,6rem)] font-bold tracking-[-0.08em] leading-[0.9]">
              Things I’ve<br />
              <span className="font-serif italic font-medium" style={{ color: accent }}>
                made
              </span>{" "}
              recently.
            </h2>
          </div>
          <p
            className="max-w-xs font-mono text-xs uppercase tracking-wider leading-relaxed"
            style={{ color: inkSecond }}
          >
            Somewhere between strategy and instinct, there is always a better answer.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-24 sm:space-y-32">
          {items.map((project: any, index: number) => {
            const isReversed = index % 2 === 1;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center`}
              >
                {/* Visual Image Card */}
                <div
                  className={`lg:col-span-7 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div
                    className="group relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl border"
                    style={{
                      backgroundColor: surface,
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                    <span
                      className="absolute top-5 left-5 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur-md"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "#ffffff" }}
                    >
                      {project.label}
                    </span>
                    <span
                      className="absolute bottom-5 right-5 font-mono text-[10px] uppercase tracking-wider text-white/80"
                    >
                      {project.number} / Case Study
                    </span>
                  </div>
                </div>

                {/* Project Details Copy */}
                <div
                  className={`lg:col-span-5 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div
                    className="flex items-center justify-between pb-4 border-b font-mono text-[11px] uppercase tracking-wider"
                    style={{ borderColor: surface, color: inkSecond }}
                  >
                    <span style={{ color: accent }}>{project.number}</span>
                    <span>{project.type}</span>
                  </div>

                  <h3 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                    <Editable
                      value={project.title}
                      onChange={(v) =>
                        onChange?.({
                          projects: items.map((p: any, i: number) =>
                            i === index ? { ...p, title: v } : p
                          ),
                        })
                      }
                    />
                  </h3>

                  <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: inkSecond }}>
                    <Editable
                      value={project.description}
                      onChange={(v) =>
                        onChange?.({
                          projects: items.map((p: any, i: number) =>
                            i === index ? { ...p, description: v } : p
                          ),
                        })
                      }
                    />
                  </p>

                  <a
                    href="#contact"
                    className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-semibold transition hover:opacity-75"
                    style={{ color: accent }}
                  >
                    View Project <ArrowUpRight size={16} />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
