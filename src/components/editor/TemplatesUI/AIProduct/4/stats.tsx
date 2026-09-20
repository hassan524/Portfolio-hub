// @ts-nocheck
import { motion } from "framer-motion";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4Stats({ props = { items: [] }, theme }: Props) {
  const bg = theme?.bg || "#060813";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#8B5CF6";

  return (
    <section
      className="px-8 md:px-16 py-20 transition-colors"
      style={{ backgroundColor: bg, borderTop: `1px solid ${surface}`, borderBottom: `1px solid ${surface}` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {(props?.items || []).map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center md:text-left"
            >
              <div className="font-serif italic text-4xl md:text-5xl font-light" style={{ color: accent }}>
                {stat.value}{stat.suffix ?? ""}
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-widest font-bold" style={{ color: ink, opacity: 0.75 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
