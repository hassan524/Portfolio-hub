// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio4Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#050505";
  const bgSecond = theme?.["bg-second"] || "#111111";
  const ink = theme?.ink || "#F5F1EA";
  const inkSecond = theme?.["ink-second"] || "#9C978F";
  const surface = theme?.surface || "rgba(245, 241, 234, 0.16)";
  const accent = theme?.accent || "#FF5C35";

  const items = props?.projects || [
    {
      num: "01",
      category: "Film",
      title: "Afterdark",
      duration: "01:12",
      image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1200&q=85",
      desc: "A title sequence and identity film for the hour after the city exhales.",
    },
    {
      num: "02",
      category: "Campaign",
      title: "Blackbird",
      duration: "00:46",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
      desc: "A campaign cut from shadow, signal, and high-frequency friction.",
    },
    {
      num: "03",
      category: "Identity",
      title: "Nocturne",
      duration: "00:30",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
      desc: "A responsive kinetic identity that adapts to ambient darkness.",
    },
  ];

  return (
    <section
      id="projects"
      className="relative px-5 py-24 sm:px-8 lg:px-14 border-t font-mono"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b pb-8 gap-6" style={{ borderColor: surface }}>
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: accent }}>
              <Editable
                value={props?.eyebrow || "02 / Selected scenes"}
                onChange={(v) => onChange?.({ eyebrow: v })}
              />
            </span>
            <h2 className="mt-4 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.08em] leading-[0.88] uppercase">
              <Editable
                value={props?.title || "Stories for the dark."}
                onChange={(v) => onChange?.({ title: v })}
              />
            </h2>
          </div>
          <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: inkSecond }}>
            <Editable
              value={props?.status || "Archive / 2024—2026"}
              onChange={(v) => onChange?.({ status: v })}
            />
          </span>
        </div>

        {/* Scene List Grid */}
        <div className="mt-16 space-y-16">
          {items.map((item: any, i: number) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b pb-14"
              style={{ borderColor: surface }}
            >
              {/* Image Preview Container */}
              <div className="lg:col-span-6 relative aspect-[16/9] rounded-lg overflow-hidden border shadow-xl" style={{ borderColor: surface, backgroundColor: bgSecond }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Duration Badge */}
                <div
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.65)",
                    color: accent,
                    border: `1px solid ${surface}`,
                  }}
                >
                  <Play size={10} fill="currentColor" />
                  <span>
                    <Editable
                      value={item.duration}
                      onChange={(v) =>
                        onChange?.({
                          projects: items.map((x: any, n: number) => (n === i ? { ...x, duration: v } : x)),
                        })
                      }
                    />
                  </span>
                </div>
              </div>

              {/* Text & Meta Information */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full py-2">
                <div>
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest font-semibold" style={{ color: accent }}>
                    <span>{item.num}</span>
                    <span>/</span>
                    <Editable
                      value={item.category}
                      onChange={(v) =>
                        onChange?.({
                          projects: items.map((x: any, n: number) => (n === i ? { ...x, category: v } : x)),
                        })
                      }
                    />
                  </div>

                  <h3 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.06em] uppercase transition-colors group-hover:text-[#FF5C35]">
                    <Editable
                      value={item.title}
                      onChange={(v) =>
                        onChange?.({
                          projects: items.map((x: any, n: number) => (n === i ? { ...x, title: v } : x)),
                        })
                      }
                    />
                  </h3>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed font-sans max-w-md" style={{ color: inkSecond }}>
                    <Editable
                      value={item.desc}
                      onChange={(v) =>
                        onChange?.({
                          projects: items.map((x: any, n: number) => (n === i ? { ...x, desc: v } : x)),
                        })
                      }
                    />
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-transform group-hover:translate-x-1"
                    style={{ color: accent }}
                  >
                    <span>View project breakdown</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
