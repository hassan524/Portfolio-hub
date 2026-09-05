// @ts-nocheck
import { motion } from "framer-motion";
import type { BlockComponentProps } from "@/components/blocks/types";
type Props = BlockComponentProps<any>;

export function AIProduct4Stats({ props, theme }: Props) {
  const { ink, bg, accent } = theme;

  return (
    <section
      className="px-8 md:px-16 py-20"
      style={{ background: bg, borderTop: `1px solid ${ink}0c`, borderBottom: `1px solid ${ink}0c` }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {props.items.map((stat, i) => (
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
              <div className="mt-3 text-[10px] uppercase tracking-widest font-bold" style={{ color: `${ink}40` }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
