// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&q=80`;

export function PhotographyPortfolio1Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FCFBF8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F5F3ED";
  const ink = theme?.text || theme?.ink || "#1A1918";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6E6B65";
  const accent = theme?.accent || "#8E2823";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const reviews = props.reviews || [
    {
      quote: "Claire's intuition for natural lighting and fabric weight is unmatched in modern European photography. Our September cover went viral globally within two hours of print release.",
      author: "Sylvie Moreau",
      role: "Creative Director, Vogue Paris",
      avatar: U("photo-1534528741775-53994a69daeb"),
      rating: 5,
    },
    {
      quote: "Directing 40 models across a rain-soaked Milan palazzo would break any ordinary photographer. Claire orchestrated the chaos into an immortal, breathtaking campaign.",
      author: "Matteo Bellini",
      role: "Global Head of Brand, Dior Haute Joaillerie",
      avatar: U("photo-1507003211169-0a1dd7228f2d"),
      rating: 5,
    },
    {
      quote: "Working with Claire is witnessing a master painter at work. The analog medium-format plates she delivered for our autumn lookbook will define our brand legacy for decades.",
      author: "Helena Rostova",
      role: "Editor-in-Chief, Harper's Bazaar UK",
      avatar: U("photo-1580489944761-15a19d654956"),
      rating: 5,
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  return (
    <section id="testimonials" className="py-20 sm:py-32" style={{ background: bg, color: ink }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <div className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
            <span>✦</span>
            <Editable value={props.testimonialsEyebrow || "Critical Acclaim"} onChange={(v) => onChange?.({ testimonialsEyebrow: v })} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal">
            <Editable value={props.testimonialsTitle || "Endorsements from the Haute Sphere"} onChange={(v) => onChange?.({ testimonialsTitle: v })} />
          </h2>
        </div>

        {/* Featured Testimonial Card */}
        <div
          className="relative rounded-3xl p-8 sm:p-14 border shadow-xl flex flex-col justify-between min-h-[320px] transition-colors"
          style={{ background: bgSecond, borderColor: `${ink}15` }}
        >
          <Quote className="absolute top-8 right-8 w-12 h-12 opacity-10 pointer-events-none" style={{ color: accent }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Stars */}
              <div className="flex gap-1" style={{ color: accent }}>
                {[...Array(reviews[current].rating)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" stroke="none" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-light leading-snug">
                “{reviews[current].quote}”
              </blockquote>

              {/* Author & Publication */}
              <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: `${ink}12` }}>
                <img
                  src={reviews[current].avatar}
                  alt={reviews[current].author}
                  className="w-12 h-12 rounded-full object-cover shadow-sm"
                />
                <div>
                  <div className="text-sm font-semibold tracking-wide font-sans">
                    {reviews[current].author}
                  </div>
                  <div className="text-xs font-serif italic opacity-75" style={{ color: inkSecond }}>
                    {reviews[current].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t" style={{ borderColor: `${ink}10` }}>
            <div className="flex gap-2">
              {reviews.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className="h-1.5 rounded-full transition-all cursor-pointer"
                  style={{
                    width: current === idx ? 28 : 8,
                    background: current === idx ? accent : `${ink}30`,
                  }}
                  aria-label={`Jump to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ borderColor: `${ink}25`, background: bg }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next review"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-white"
                style={{ borderColor: accent, background: accent }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotographyPortfolio1Testimonials;
