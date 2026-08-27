import { motion } from "framer-motion";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { StatsProps } from "@/types/builder.schema";

type Props = BlockComponentProps<StatsProps>;

export function AIProduct3Stats({ props, theme }: Props) {
  const { ink, bg, accent } = theme;

  return (
    <section
      className="px-6 md:px-12 py-16 border-b border-dashed"
      style={{ background: bg, borderColor: `${ink}15` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {props.items.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 border font-mono text-center"
              style={{ borderColor: `${ink}12`, background: `${ink}02` }}
            >
              <span className="text-[9px] uppercase tracking-wider block mb-2" style={{ color: `${ink}40` }}>
                // PARAM_NODE_0{i + 1}
              </span>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: accent }}>
                {stat.value}{stat.suffix ?? ""}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-widest font-bold" style={{ color: `${ink}60` }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
