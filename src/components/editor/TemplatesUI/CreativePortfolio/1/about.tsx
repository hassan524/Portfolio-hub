// @ts-nocheck
import { motion } from "framer-motion";
import { CircleDot, Layers3, WandSparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio1About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A7A9B3";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.09)";
  const accent = theme?.accent || "#3B82F6";

  const features = props?.features || [
    { title: "Find the signal", text: "I turn messy ambition into a clear creative direction.", icon: CircleDot },
    { title: "Build the world", text: "Identity, motion, and digital touchpoints that belong together.", icon: Layers3 },
    { title: "Leave a mark", text: "Useful ideas, made distinctive enough to stay in the room.", icon: WandSparkles }
  ];

  return (
    <section
      id="about"
      className="border-b px-5 py-20 sm:px-8 lg:px-14 transition-colors"
      style={{
        backgroundColor: bgSecond,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header Label */}
        <div
          className="flex items-center justify-between pb-6 border-b font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em]"
          style={{ borderColor: surface, color: inkSecond }}
        >
          <span>02 — The Approach</span>
          <span>Small studio, big thinking</span>
        </div>

        {/* Manifesto Content */}
        <div className="mt-16 max-w-4xl">
          <p
            className="font-mono text-xs uppercase tracking-[0.18em] mb-4"
            style={{ color: accent }}
          >
            <Editable
              value={props?.eyebrow || "Less noise. More meaning."}
              onChange={(v) => onChange?.({ eyebrow: v })}
            />
          </p>
          <h2 className="text-[clamp(2.8rem,7vw,6.5rem)] font-bold tracking-[-0.08em] leading-[0.9]">
            <Editable
              value={props?.headline || "I make work that feels like someone cared."}
              onChange={(v) => onChange?.({ headline: v })}
            />
          </h2>

          <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-8 border-t" style={{ borderColor: surface }}>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={
                  props?.story ||
                  "Every project starts with a good question. From there, I find the shape, voice, and little unexpected details that make a brand feel human — not assembled."
                }
                onChange={(v) => onChange?.({ story: v })}
              />
            </p>
            <div
              className="font-serif italic text-4xl sm:text-5xl -rotate-6 select-none font-bold"
              style={{ color: accent }}
            >
              A—
            </div>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature: any, index: number) => {
            const Icon = feature.icon || CircleDot;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="p-7 rounded-2xl border transition-all"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl grid place-items-center mb-6"
                  style={{ backgroundColor: `${accent}22`, color: accent }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">
                  <Editable
                    value={feature.title}
                    onChange={(v) =>
                      onChange?.({
                        features: features.map((item: any, i: number) =>
                          i === index ? { ...item, title: v } : item
                        ),
                      })
                    }
                  />
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: inkSecond }}>
                  <Editable
                    value={feature.text}
                    onChange={(v) =>
                      onChange?.({
                        features: features.map((item: any, i: number) =>
                          i === index ? { ...item, text: v } : item
                        ),
                      })
                    }
                  />
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
