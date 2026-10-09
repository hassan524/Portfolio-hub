// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio3Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#160B2B";
  const ink = theme?.ink || "#FFF8FF";
  const inkSecond = theme?.["ink-second"] || "#CDB9E8";
  const surface = theme?.surface || "rgba(255, 248, 255, 0.16)";
  const accent = theme?.accent || "#C98CFF";

  const signals = props?.projects || [
    {
      num: "01",
      tag: "Product UI / Moonwave",
      title: "Sound you can see.",
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=1200&q=85"
    },
    {
      num: "02",
      tag: "Spatial brand / NOVA",
      title: "Find your way through.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85"
    },
    {
      num: "03",
      tag: "Motion system / Arc",
      title: "Every state has a feeling.",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=85"
    },
    {
      num: "04",
      tag: "Portfolio / Hasan",
      title: "Interfaces with atmosphere.",
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85"
    }
  ];

  return (
    <section
      id="projects"
      className="border-b px-5 py-24 sm:px-8 lg:px-12 transition-colors font-sans"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
            03 / Selected Signals
          </span>
          <h2 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight">
            A living library of worlds.
          </h2>
        </div>

        {/* Signal Articles with Real Images */}
        <div className="space-y-6">
          {signals.map((sig: any, i: number) => (
            <motion.article
              key={i}
              whileHover={{ x: 10 }}
              className="p-6 sm:p-8 rounded-3xl border transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              style={{
                backgroundColor: surface,
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <div className="md:col-span-1 font-mono text-xl font-bold" style={{ color: accent }}>
                {sig.num}
              </div>

              <div className="md:col-span-3">
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={sig.image}
                    alt={sig.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              <div className="md:col-span-7">
                <small className="font-mono text-[10px] uppercase tracking-widest block mb-2" style={{ color: inkSecond }}>
                  {sig.tag}
                </small>
                <h3 className="text-2xl sm:text-4xl font-bold tracking-tight">
                  <Editable
                    value={sig.title}
                    onChange={(v) =>
                      onChange?.({
                        projects: signals.map((s: any, idx: number) =>
                          idx === i ? { ...s, title: v } : s
                        ),
                      })
                    }
                  />
                </h3>
              </div>

              <div className="md:col-span-1 flex justify-end">
                <span
                  className="w-10 h-10 rounded-full grid place-items-center"
                  style={{ backgroundColor: `${accent}33`, color: accent }}
                >
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
