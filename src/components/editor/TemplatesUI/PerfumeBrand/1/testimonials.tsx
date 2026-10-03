// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Sparkles, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand1Testimonials({ props = {}, theme, onChange }: any) {
  const [activeIdx, setActiveIdx] = useState(0);

  const bg = theme?.bg || "#EED8C9";
  const bgSecond = theme?.["bg-second"] || "#E5C8B4";
  const ink = theme?.ink || "#2D1D18";
  const inkSecond = theme?.["ink-second"] || "#7A5E54";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.55)";
  const accent = theme?.accent || "#9E4A28";

  const reviews = [
    {
      author: "Hélène de Saint-Germain",
      role: "Fragrance Columnist, Vogue Paris",
      quote:
        "L'Ombre Solaire is that vanishingly rare creation: an eau de parfum that manages to feel simultaneously sun-drenched and intensely meditative. It clings to silk like an antique love letter.",
      scent: "L'Ombre Solaire 50ml",
      longevity: "16+ Hours",
      rating: 5,
    },
    {
      author: "Julian Mercer",
      role: "Curator, London Olfactory Society",
      quote:
        "Maison Lumière has restored dignity to slow perfumery. The French oak maceration gives these botanical extraits a resonance that synthetic aromachemicals simply cannot mimic.",
      scent: "Rose Blanche & Sel 100ml",
      longevity: "18 Hours",
      rating: 5,
    },
    {
      author: "Aria Montgomery",
      role: "Verified Private Collector, New York",
      quote:
        "I was stopped four separate times in Manhattan asking what scent I was wearing. It transforms with your body warmth throughout the day without ever turning cloying.",
      scent: "Ambre Botanique 30ml",
      longevity: "20 Hours",
      rating: 5,
    },
  ];

  const pressLogos = [
    { name: "VOGUE", label: "“The benchmark of French botanical extrait.”" },
    { name: "HARPER'S BAZAAR", label: "“Best Niche Fragrance of the Year.”" },
    { name: "WALLPAPER*", label: "“Flacon design bordering on fine sculpture.”" },
    { name: "ELLE", label: "“A second skin that lingers like memory.”" },
  ];

  return (
    <section
      id="critics"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden"
      style={{
        backgroundColor: bgSecond,
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, transparent 70%)`,
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
            Olfactive Critical Acclaim
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase leading-[0.95]"
            style={{ fontFamily: "Cinzel, Cormorant Garamond, serif" }}
          >
            <Editable
              value={props?.testimonialsHeadline || "Lauded by Connoisseurs"}
              onChange={(v) => onChange?.({ testimonialsHeadline: v })}
            />
          </h2>
          <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
            Read what master noses, editorial critics, and private patrons say about the Maison Lumière sillage.
          </p>
        </div>

        {/* Press Quotes Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b" style={{ borderColor: "rgba(158, 74, 40, 0.15)" }}>
          {pressLogos.map((logo, i) => (
            <div key={i} className="text-center space-y-2 p-4 rounded-2xl backdrop-blur-sm"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            >
              <span className="text-base sm:text-lg font-serif font-bold tracking-[0.2em]" style={{ color: ink }}>
                {logo.name}
              </span>
              <p className="text-[11px] font-serif italic" style={{ color: inkSecond }}>
                {logo.label}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Testimonial Carousel Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-8 sm:p-14 rounded-3xl border backdrop-blur-xl shadow-xl space-y-8"
              style={{
                backgroundColor: surface,
                borderColor: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(reviews[activeIdx].rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#E8A838" stroke="#E8A838" />
                  ))}
                  <span className="ml-2 text-xs font-mono font-semibold" style={{ color: accent }}>
                    Verified Patron
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md"
                    style={{ backgroundColor: "rgba(158, 74, 40, 0.1)", color: accent }}
                  >
                    Longevity: {reviews[activeIdx].longevity}
                  </span>
                </div>
              </div>

              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic leading-relaxed" style={{ color: ink }}>
                “{reviews[activeIdx].quote}”
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t gap-4" style={{ borderColor: "rgba(158, 74, 40, 0.12)" }}>
                <div>
                  <h4 className="text-base font-serif font-bold" style={{ color: ink }}>
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
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", borderColor: "rgba(158, 74, 40, 0.2)", color: ink }}
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setActiveIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
                    className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", borderColor: "rgba(158, 74, 40, 0.2)", color: ink }}
                    aria-label="Next review"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand1Testimonials;
