import { motion } from "framer-motion";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { StatsProps } from "@/types/builder.schema";

type Props = BlockComponentProps<StatsProps>;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function AIProduct1Stats({ props, theme }: Props) {
  const { ink, bg, accent } = theme;

  return (
    <section
      className="px-6 md:px-16 py-16"
      style={{ background: `linear-gradient(135deg, ${accent}08, ${bg})`, borderTop: `1px solid ${accent}15` }}
    >
      <div className="max-w-6xl mx-auto">
        {props.heading && (
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl font-black tracking-tight" style={{ color: ink }}>{props.heading}</h2>
          </motion.div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {props.items.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl"
              style={{ background: `${ink}04`, border: `1px solid ${ink}08` }}
            >
              <div className="font-display text-4xl md:text-5xl font-black" style={{ color: accent }}>
                {stat.value}{stat.suffix ?? ""}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-wide" style={{ color: `${ink}50` }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
