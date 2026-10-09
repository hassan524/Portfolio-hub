// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const QUOTES = [
  {
    quote: "The crumb structure is breathtaking—delicate, custardy, and alive with wild lactic acidity. This is what true bread was meant to taste like.",
    author: "Camille Laurent",
    role: "Executive Chef, L'Étoile (Two Michelin Stars)",
    city: "London",
  },
  {
    quote: "Their Kouign-Amann ruined all other pastries for me. Layers of caramelized Brittany sugar and cultured butter that shatter delicately with every single bite.",
    author: "Sebastian Vance",
    role: "Culinary Columnist & Author",
    city: "Paris / London",
  },
  {
    quote: "We serve Levain's seeded rye at our private supper club every weekend. Our guests routinely ask to purchase whole loaves to carry home.",
    author: "Elena Rostova",
    role: "Founder, Wild Table Gastronomy",
    city: "Edinburgh",
  },
];

const PRESS_LOGOS = [
  { outlet: "THE NEW YORKER", note: "“The benchmark of modern artisanal sourdough.”" },
  { outlet: "MICHELIN GUIDE", note: "“Uncompromising devotion to slow wild fermentation.”" },
  { outlet: "VOGUE LIVING", note: "“London’s most poetic dawn morning ritual.”" },
  { outlet: "FINANCIAL TIMES", note: "“Where ancient craft meets contemporary precision.”" },
];

export function Bakery2Testimonials({ props = {}, theme, onChange }: any) {
  const [current, setCurrent] = useState(0);
  const bg = theme?.bg || "#ffffff";
  const ink = theme?.ink || "#242023";
  const accent = theme?.accent || "#b23b68";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const nextQuote = () => setCurrent((prev) => (prev + 1) % QUOTES.length);
  const prevQuote = () => setCurrent((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);

  return (
    <section
      id="testimonials"
      className="scroll-mt-20 py-28 md:py-40 transition-colors relative overflow-hidden"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <span id="reviews" className="absolute -top-20" />
      <div className="mx-auto max-w-5xl px-6 md:px-12 text-center">
        {/* Subtle Section Badge */}
        <span
          className="text-xs uppercase tracking-[0.24em] font-bold block mb-8"
          style={{ color: accent }}
        >
          05 // THE CRITIC'S TABLE
        </span>

        {/* Big Decorative Accent Quote Mark */}
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-8" style={{ backgroundColor: `${accent}12` }}>
          <Quote size={28} style={{ color: accent }} />
        </div>

        {/* Monumental Single Featured Quote Display (No 3-card grid!) */}
        <div className="min-h-[220px] flex items-center justify-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <blockquote
                className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.2] italic max-w-4xl mx-auto"
                style={{ fontFamily: fontHeading }}
              >
                “{QUOTES[current].quote}”
              </blockquote>

              <div className="pt-4">
                <p className="text-lg font-medium" style={{ fontFamily: fontHeading }}>
                  {QUOTES[current].author}
                </p>
                <p className="text-xs uppercase tracking-widest font-mono opacity-50 mt-1">
                  {QUOTES[current].role} • {QUOTES[current].city}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Quote Switcher Controls */}
        <div className="flex items-center justify-center gap-6 mb-24">
          <button
            type="button"
            data-preview-chrome
            data-blend-ignore
            onClick={prevQuote}
            className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Previous Quote"
          >
            <ArrowLeft size={16} />
          </button>

          <span className="text-xs font-mono font-bold opacity-60">
            0{current + 1} / 0{QUOTES.length}
          </span>

          <button
            type="button"
            data-preview-chrome
            data-blend-ignore
            onClick={nextQuote}
            className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Next Quote"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Culinary Press Ticker Strip */}
        <div className="border-t border-black/10 pt-14">
          <span className="text-[10px] uppercase tracking-[0.28em] font-mono opacity-40 block mb-10">
            PRAISE FROM INDEPENDENT GASTRONOMY PRESS
          </span>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {PRESS_LOGOS.map((p) => (
              <div key={p.outlet} className="space-y-2">
                <span className="text-xs font-bold font-mono tracking-wider block opacity-90" style={{ color: accent }}>
                  {p.outlet}
                </span>
                <p className="text-xs font-light opacity-70 leading-relaxed italic">
                  {p.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const Testimonials = Bakery2Testimonials;
export default Bakery2Testimonials;
