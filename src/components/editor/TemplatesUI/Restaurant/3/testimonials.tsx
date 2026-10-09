// @ts-nocheck
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FAF5EE";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#14213D";
  const inkSecond = theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#E07A5F";
  const surface = theme?.surface || "#F1E9DE";

  const DEFAULT_ITEMS = [
    {
      quote: "Sitting on the terrace with chilled Vermentino and the wood-grilled octopus makes you forget you are in the city. Truly the soul of the Mediterranean.",
      name: "Claire & Julien Moreau",
      location: "Terrace Dinner Regulars",
    },
    {
      quote: "The whole sea bream with fresh salmoriglio and the warm sourdough with whipped ricotta are worth booking weeks in advance.",
      name: "Anthony Chen",
      location: "San Francisco Food Enthusiast",
    },
    {
      quote: "Sun-drenched, breezy, and effortlessly chic. The best seafood brasserie experience in Northern California.",
      name: "Coastal Living Review",
      location: "Culinary Travel Guide",
    },
  ];

  const items = Array.isArray(props?.items) && props.items.length > 0 ? props.items : DEFAULT_ITEMS;
  const setRev = (i: number, k: string, v: any) =>
    onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="reviews" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            <Editable
              as="span"
              value={props?.eyebrow || "NOTES FROM OUR TERRACE"}
              onChange={(v: string) => onChange?.({ eyebrow: v })}
            />
          </p>

          <Editable
            as="h2"
            value={props?.title || "Warm Words From Our Table Guests"}
            onChange={(v: string) => onChange?.({ title: v })}
            className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-5xl"
            style={{ color: ink }}
          />
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((r: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08, ease: "easeOut" }}
              className="flex flex-col justify-between rounded-3xl border p-8 shadow-sm transition duration-300 hover:shadow-md"
              style={{ backgroundColor: bg, borderColor: surface }}
            >
              <div>
                <div className="flex items-center gap-1" style={{ color: accent }}>
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>

                <Editable
                  as="p"
                  value={r.quote}
                  onChange={(v: string) => setRev(i, "quote", v)}
                  className="mt-5 font-serif text-sm italic leading-relaxed"
                  style={{ color: ink }}
                />
              </div>

              <div className="mt-6 border-t pt-4" style={{ borderColor: surface }}>
                <Editable
                  as="p"
                  value={r.name}
                  onChange={(v: string) => setRev(i, "name", v)}
                  className="font-serif text-sm font-bold"
                  style={{ color: ink }}
                />
                <Editable
                  as="p"
                  value={r.location}
                  onChange={(v: string) => setRev(i, "location", v)}
                  className="text-xs"
                  style={{ color: inkSecond }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Restaurant3Testimonials = Testimonials;
export const TestimonialsDefault = Testimonials;
export default Testimonials;
