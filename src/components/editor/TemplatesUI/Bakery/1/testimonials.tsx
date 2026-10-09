// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

export function Bakery1Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#faf9f6";
  const ink = theme?.ink || "#1a1a1a";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const testimonialsList = [
    {
      quote: "The sourdough here is simply unrivaled. Perfect blistered crust and a delicate, open crumb that keeps our entire neighborhood lined up before dawn every Saturday.",
      author: "Mara Vale",
      role: "Creative Director & Daily Regular",
      badge: "Regular since 2018",
      stars: 5,
    },
    {
      quote: "As a professional pastry chef, I deeply admire their commitment to 36-hour long fermentation and stone-milled organic grain. Real, honest baking.",
      author: "Jules Hart",
      role: "Culinary Writer & Critic",
      badge: "Food & Wine Feature",
      stars: 5,
    },
    {
      quote: "Their almond croissants and morning brioche buns are the absolute highlight of my weekend. Warm, flaky, perfectly caramelized, and served with true kindness.",
      author: "Noa Reed",
      role: "Travel & Lifestyle Journalist",
      badge: "Weekend Patron",
      stars: 5,
    },
  ];

  return (
    <section
      id="team"
      className="scroll-mt-20 py-24 md:py-36 transition-colors relative"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <span id="testimonials" className="absolute -top-20" />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill={accent}>
              <circle cx="12" cy="12" r="6" />
            </svg>
            <Editable
              as="p"
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accent }}
              value="06 — Community & Praise"
            />
          </div>
          <Editable
            as="h2"
            className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1]"
            style={{ fontFamily: fontHeading }}
            value={props.testimonialsTitle || "Loved by neighbors, food lovers & chefs."}
            onChange={(testimonialsTitle: string) => onChange?.({ testimonialsTitle })}
          />
          <p className="mt-4 text-base opacity-75 max-w-lg font-light leading-relaxed">
            Every loaf is baked for the people who gather around our tables. Here is what our community has to say.
          </p>
        </div>

        {/* 3-Column Soft Floating Cards (Zero border clutter) */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonialsList.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col justify-between p-8 sm:p-10 rounded-3xl transition-transform hover:-translate-y-1 shadow-sm hover:shadow-md"
              style={{ backgroundColor: theme?.["bg-second"] || "#ffffff" }}
            >
              <div>
                {/* Top: Star rating & Quote icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1" style={{ color: accent }}>
                    {[...Array(t.stars)].map((_, sIdx) => (
                      <FaStar key={sIdx} className="w-3.5 h-3.5" />
                    ))}
                  </div>
                  <FaQuoteLeft className="w-5 h-5 opacity-20" style={{ color: accent }} />
                </div>

                <Editable
                  as="p"
                  className="text-base sm:text-lg font-light leading-relaxed italic opacity-90"
                  style={{ fontFamily: fontHeading }}
                  value={`“${t.quote}”`}
                />
              </div>

              {/* Bottom: Author info */}
              <div className="mt-8 pt-6 flex items-center justify-between border-t border-black/5">
                <div>
                  <Editable as="h3" className="text-base font-medium" value={t.author} />
                  <Editable as="p" className="text-xs opacity-60 font-light mt-0.5" value={t.role} />
                </div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${accent}15`, color: accent }}
                >
                  {t.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Trust Counters */}
        <div className="mt-20 pt-10 border-t border-black/5 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-3xl font-light block mb-1" style={{ fontFamily: fontHeading, color: accent }}>
              4.9 ★
            </span>
            <span className="text-xs uppercase tracking-wider opacity-60 font-medium">
              Over 650+ Local Reviews
            </span>
          </div>
          <div>
            <span className="text-3xl font-light block mb-1" style={{ fontFamily: fontHeading, color: accent }}>
              1,200+
            </span>
            <span className="text-xs uppercase tracking-wider opacity-60 font-medium">
              Loaves Hand-Baked Weekly
            </span>
          </div>
          <div>
            <span className="text-3xl font-light block mb-1" style={{ fontFamily: fontHeading, color: accent }}>
              100%
            </span>
            <span className="text-xs uppercase tracking-wider opacity-60 font-medium">
              Stone-Milled Organic Flour
            </span>
          </div>
          <div>
            <span className="text-3xl font-light block mb-1" style={{ fontFamily: fontHeading, color: accent }}>
              36 hrs
            </span>
            <span className="text-xs uppercase tracking-wider opacity-60 font-medium">
              Slow Wild Fermentation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Testimonials = Bakery1Testimonials;
export default Bakery1Testimonials;