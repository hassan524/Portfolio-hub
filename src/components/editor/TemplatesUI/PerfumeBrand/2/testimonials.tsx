// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Moon, Quote, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand2Testimonials({ props = {}, theme, onChange }: any) {
  const [activeIdx, setActiveIdx] = useState(0);

  const bg = theme?.bg || "#0A090D";
  const bgSecond = theme?.["bg-second"] || "#14121B";
  const ink = theme?.ink || "#F5F2EB";
  const inkSecond = theme?.["ink-second"] || "#9E96A6";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#D4AF37";

  const reviews = [
    {
      author: "Lord Cassian Thorne",
      role: "Private Collector, Geneva",
      quote:
        "Élixir Noir & Tonka is dark sorcery in crystal. The 12-year wild oud creates an almost physical gravity around you that remains potent until dawn.",
      scent: "Élixir Noir & Tonka 100ml",
      longevity: "24h+ On Skin",
      rating: 5,
    },
    {
      author: "Dominique Moreau",
      role: "Senior Critic, Parfums de Prestige",
      quote:
        "Atelier Obsidian refuses every modern commercial cliché. There are no safe clean musk topnotes here; only the smoldering depth of charred casks and wild animalic amber.",
      scent: "Cuir de Minuit 50ml",
      longevity: "20 Hours",
      rating: 5,
    },
    {
      author: "Saskia Von Berg",
      role: "Haute Horlogerie & Fragrance Patron, Vienna",
      quote:
        "I wore Ambre Cendré to the opera in Milan and spent the intermission defending its origin against curious strangers. It is completely unforgettable.",
      scent: "Ambre Cendré 100ml",
      longevity: "26 Hours",
      rating: 5,
    },
  ];

  return (
    <section
      id="critics"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden border-t"
      style={{
        backgroundColor: bgSecond,
        borderColor: "rgba(212, 175, 55, 0.15)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
            The Private Register
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase leading-[0.95]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            <Editable
              value={props?.testimonialsHeadline || "Echoes from the Shadows"}
              onChange={(v) => onChange?.({ testimonialsHeadline: v })}
            />
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-14 rounded-3xl border backdrop-blur-xl shadow-2xl space-y-8"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(212, 175, 55, 0.3)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(reviews[activeIdx].rating)].map((_, i) => (
                  <Star key={i} size={15} fill="#D4AF37" stroke="#D4AF37" />
                ))}
              </div>
              <span className="text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.1)",
                  borderColor: "rgba(212, 175, 55, 0.25)",
                  color: accent,
                }}
              >
                Longevity: {reviews[activeIdx].longevity}
              </span>
            </div>

            <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic leading-relaxed" style={{ color: ink }}>
              “{reviews[activeIdx].quote}”
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t gap-4" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
              <div>
                <h4 className="text-base font-serif font-bold" style={{ color: accent }}>
                  {reviews[activeIdx].author}
                </h4>
                <p className="text-xs font-mono tracking-tight" style={{ color: inkSecond }}>
                  {reviews[activeIdx].role} • Flacon: {reviews[activeIdx].scent}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                  className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: "rgba(10, 9, 13, 0.8)", borderColor: "rgba(212, 175, 55, 0.3)", color: accent }}
                  aria-label="Previous review"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
                  className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ backgroundColor: "rgba(10, 9, 13, 0.8)", borderColor: "rgba(212, 175, 55, 0.3)", color: accent }}
                  aria-label="Next review"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand2Testimonials;
