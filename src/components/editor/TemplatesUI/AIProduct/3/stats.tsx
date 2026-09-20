// @ts-nocheck
import { motion } from "framer-motion";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct3Stats({ props = { items: [] }, theme }: Props) {
  const bg = theme?.bg || "#140C12";
  const bgSecond = theme?.["bg-second"] || "#FFF5F8";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "#1E0C17";
  const surface = theme?.surface || "#231420";
  const accent = theme?.accent || "#FF3B76";

  return (
    <section
      className="px-6 md:px-12 py-16 border-b transition-colors relative overflow-hidden"
      style={{ 
        backgroundColor: bg, 
        borderColor: `${accent}20` 
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {(props?.items || []).map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 border font-mono text-center rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              style={{ 
                borderColor: `${accent}25`, 
                backgroundColor: surface,
                boxShadow: "0 8px 25px rgba(0,0,0,0.3)"
              }}
            >
              <span className="text-[9px] uppercase tracking-wider block mb-2 font-mono" style={{ color: accent, opacity: 0.85 }}>
                // PARAM_NODE_0{i + 1}
              </span>
              <div 
                className="text-3xl md:text-4xl font-extrabold tracking-tight" 
                style={{ 
                  color: accent,
                  textShadow: `0 0 20px ${accent}40`
                }}
              >
                {stat.value}{stat.suffix ?? ""}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-widest font-bold" style={{ color: ink, opacity: 0.8 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
