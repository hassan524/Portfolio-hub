// @ts-nocheck
import { motion } from "framer-motion";
import type { BlockComponentProps } from "@/components/blocks/types";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function AIProduct1Stats({ props = { items: [] }, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#0B0F19";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";

  return (
    <section
      className="px-6 md:px-16 py-16 transition-colors"
      style={{ backgroundColor: bg, borderTop: `1px solid ${surface}` }}
    >
      <div className="max-w-6xl mx-auto">
        {props?.heading && (
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight" style={{ color: ink }}>{props.heading}</h2>
          </motion.div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {(props?.items || []).map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl"
              style={{ backgroundColor: surface, border: `1px solid ${surface}` }}
            >
              <div className="font-display text-4xl md:text-5xl font-black" style={{ color: accent }}>
                {stat.value}{stat.suffix ?? ""}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wide" style={{ color: ink, opacity: 0.75 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
