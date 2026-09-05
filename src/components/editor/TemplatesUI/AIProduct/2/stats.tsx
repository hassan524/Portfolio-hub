// @ts-nocheck
import { motion } from "framer-motion";
import type { BlockComponentProps } from "@/components/blocks/types";
type Props = BlockComponentProps<any>;

export function AIProduct2Stats({ props, theme }: Props) {
  const { ink, bg, accent } = theme;

  return (
    <section
      className="px-8 md:px-14 py-0"
      style={{ background: bg, borderTop: `2px solid ${ink}` }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 border-l border-r" style={{ borderColor: ink }}>
        {props.items.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="py-12 px-6 text-center border-r last:border-r-0 md:border-r"
            style={{ borderColor: ink }}
          >
            <div className="font-display text-5xl font-black uppercase tracking-tight" style={{ color: accent }}>
              {stat.value}{stat.suffix ?? ""}
            </div>
            <div className="mt-2 text-xs font-black uppercase tracking-widest" style={{ color: `${ink}40` }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
