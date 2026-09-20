// @ts-nocheck
import { motion } from "framer-motion";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct2Stats({ props = { items: [] }, theme }: Props) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <section
      className="px-8 md:px-14 py-0 transition-colors"
      style={{ backgroundColor: bg, borderTop: `1px solid ${surface}` }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 border-l border-r" style={{ borderColor: surface }}>
        {(props?.items || []).map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="py-12 px-6 text-center border-r last:border-r-0 md:border-r"
            style={{ borderColor: surface }}
          >
            <div className="font-display text-5xl font-black uppercase tracking-tight" style={{ color: accent }}>
              {stat.value}{stat.suffix ?? ""}
            </div>
            <div className="mt-2 text-xs font-black uppercase tracking-widest" style={{ color: ink, opacity: 0.75 }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
