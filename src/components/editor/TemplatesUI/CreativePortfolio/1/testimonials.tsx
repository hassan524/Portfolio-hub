// @ts-nocheck
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio1Testimonials({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.["bg-second"] || "#111218";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A7A9B3";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.09)";
  const accent = theme?.accent || "#3B82F6";

  const awards = props?.awards || ["Awwwards Site of the Day", "FWA of the Month", "Behance Curated", "CSS Design Awards"];

  return (
    <section
      id="testimonials"
      className="border-b px-5 py-24 sm:px-8 lg:px-14 transition-colors"
      style={{
        backgroundColor: bgSecond,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-1.5 mb-8" style={{ color: accent }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={18} fill="currentColor" />
          ))}
        </div>

        {/* Big Editorial Quote Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="block font-serif text-7xl sm:text-9xl leading-none select-none"
            style={{ color: accent }}
          >
            “
          </span>
          <blockquote className="mt-2 text-[clamp(2rem,5vw,4.5rem)] font-bold tracking-tight leading-[1.05]">
            <Editable
              value={props?.quote || "Good work doesn’t just look right. It changes what feels possible."}
              onChange={(v) => onChange?.({ quote: v })}
            />
          </blockquote>
          <p
            className="mt-8 font-mono text-xs uppercase tracking-[0.2em]"
            style={{ color: inkSecond }}
          >
            <Editable
              value={props?.credit || "— Abiola Studio, Creative Direction"}
              onChange={(v) => onChange?.({ credit: v })}
            />
          </p>
        </motion.div>

        {/* Awards list bar */}
        <div
          className="mt-20 pt-8 border-t flex flex-wrap items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-wider"
          style={{ borderColor: surface, color: inkSecond }}
        >
          {awards.map((award: string, i: number) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              {award}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
