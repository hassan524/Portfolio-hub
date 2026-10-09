// @ts-nocheck
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio4Testimonials({ props = {}, theme, onChange }: any) {
  const accent = theme?.accent || "#FF5C35";
  const lightBg = "#F5F1EA";
  const darkInk = "#050505";

  return (
    <section
      id="testimonials"
      className="relative px-5 py-28 sm:px-8 lg:px-14 font-mono overflow-hidden"
      style={{
        backgroundColor: lightBg,
        color: darkInk,
      }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold"
          style={{ color: accent }}
        >
          <Quote size={16} fill="currentColor" />
          <Editable
            value={props?.eyebrow || "03 / The feeling"}
            onChange={(v) => onChange?.({ eyebrow: v })}
          />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 text-3xl sm:text-5xl lg:text-7xl font-bold tracking-[-0.08em] leading-[0.92] uppercase"
        >
          “
          <Editable
            value={
              props?.quote ||
              "Nox gave our launch a pulse. It felt less like a campaign and more like a world opening."
            }
            onChange={(v) => onChange?.({ quote: v })}
          />
          ”
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-black/20 pt-6 gap-4"
        >
          <strong className="text-xs uppercase tracking-[0.18em] font-bold">
            <Editable
              value={props?.author || "Amara Nwosu / Founder, Afterdark"}
              onChange={(v) => onChange?.({ author: v })}
            />
          </strong>

          <span className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 font-mono">
            <Editable
              value={props?.role || "Global Premiere / 2025"}
              onChange={(v) => onChange?.({ role: v })}
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
