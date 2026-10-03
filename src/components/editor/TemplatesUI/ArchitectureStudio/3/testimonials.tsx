// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";

export function ArchitectureStudio3Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";

  const stats = [
    { value: "18", label: "Years of practice" },
    { value: "120+", label: "Projects delivered" },
    { value: "14", label: "Design awards" },
    { value: "9", label: "Countries" },
  ];

  return (
    <section
      id="testimonials"
      className="px-6 md:px-14 lg:px-20 py-24 md:py-32 transition-colors w-full"
      style={{ backgroundColor: bgSecond, color: ink }}
    >
      <div className="max-w-6xl mx-auto">
        <span
          className="text-[10px] font-bold uppercase tracking-widest block mb-4"
          style={{ color: accent }}
        >
          <Editable value="THE STUDIO IN NUMBERS" />
        </span>

        <div
          className="mt-10 grid grid-cols-2 gap-px md:grid-cols-4 border"
          style={{ backgroundColor: surface, borderColor: `${ink}1A` }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-2 p-8 transition-colors"
              style={{ backgroundColor: bg }}
            >
              <Editable
                as="strong"
                value={s.value}
                className="text-4xl sm:text-5xl font-bold font-sans"
                style={{ color: ink }}
              />
              <Editable
                value={s.label}
                className="text-xs uppercase tracking-widest font-semibold opacity-60"
                style={{ color: inkSecond }}
              />
            </motion.div>
          ))}
        </div>

        <Editable
          as="blockquote"
          className="mt-16 block max-w-3xl text-xl sm:text-2xl md:text-3xl font-sans font-medium leading-snug opacity-90"
          style={{ color: ink }}
          value={
            props?.quote ||
            "“A remarkably clear vision, from the first conversation to the final detail.” — Daniel Foster"
          }
          onChange={(v) => onChange?.({ quote: v })}
        />
      </div>
    </section>
  );
}

export const Testimonials = ArchitectureStudio3Testimonials;
export default ArchitectureStudio3Testimonials;
