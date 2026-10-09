// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio3Testimonials({ props = {}, theme, onChange }: any) {
  const ink = theme?.ink || "#FFF8FF";
  const accent = theme?.accent || "#C98CFF";
  const surface = theme?.surface || "rgba(255, 248, 255, 0.16)";

  return (
    <section
      id="testimonials"
      className="border-b px-5 py-24 sm:px-8 lg:px-12 transition-colors font-sans"
      style={{
        background: "linear-gradient(135deg, #C98CFF 0%, #6C3EBD 58%, #261044 100%)",
        color: "#160B2B",
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-5xl">
        <span className="font-mono text-xs uppercase tracking-[0.2em] block mb-6 text-black/70">
          05 / In good company
        </span>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(2.2rem,6vw,5rem)] font-bold tracking-tight leading-[1.05]"
        >
          <Editable
            value={
              props?.quote ||
              "“Hasan makes interfaces feel like places you want to spend time in.”"
            }
            onChange={(v) => onChange?.({ quote: v })}
          />
        </motion.blockquote>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-black/80 font-bold">
          <Editable
            value={props?.author || "Amina Bello / Moonwave"}
            onChange={(v) => onChange?.({ author: v })}
          />
        </p>
      </div>
    </section>
  );
}
