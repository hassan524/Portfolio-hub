// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency5Testimonials({ props = {}, theme, onChange }: any) {
  const [activeIdx, setActiveIdx] = useState(0);

  const bg = theme?.bg || "#0B26E8";
  const bgSecond = theme?.["bg-second"] || "#061385";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "rgba(255, 255, 255, 0.75)";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.12)";
  const accent = theme?.accent || "#FFFFFF";

  const reviews = [
    {
      author: "Marcus Vance",
      role: "VP of Product, Kora Global",
      quote:
        "Auryx delivered our complete generative AI frontend in fourteen days. The design aesthetic is leagues ahead of standard SaaS templates; our user activation jumped 320% in week one.",
      metric: "+320% Activation",
    },
    {
      author: "Camille Laurent",
      role: "Founder, Botanica Paris",
      quote:
        "They understand both human taste and conversion math. Our new omnichannel website feels like high art while converting visitors twice as effectively as our previous platform.",
      metric: "2.1× Conversion Lift",
    },
    {
      author: "Elias Sterling",
      role: "Head of Design, Atrosia Labs",
      quote:
        "The fastest and most visually stunning design sprint our venture has ever run. The team worked with unbelievable velocity without cutting a single aesthetic corner.",
      metric: "14-Day Delivery",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden border-t"
      style={{
        backgroundColor: bgSecond,
        borderColor: surface,
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em] font-semibold" style={{ color: inkSecond }}>
            Client Endorsements
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-none font-sans">
            <Editable
              value={props?.testimonialsHeadline || "Proof of Impact"}
              onChange={(v) => onChange?.({ testimonialsHeadline: v })}
            />
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-3xl border backdrop-blur-xl shadow-2xl space-y-8"
              style={{
                backgroundColor: surface,
                borderColor: surface,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white text-blue-900 shadow-sm">
                  {reviews[activeIdx].metric}
                </span>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#FACC15" stroke="#FACC15" />
                  ))}
                </div>
              </div>

              <blockquote className="text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed font-sans" style={{ color: ink }}>
                “{reviews[activeIdx].quote}”
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t gap-4" style={{ borderColor: surface }}>
                <div>
                  <h4 className="text-base font-bold uppercase tracking-wider" style={{ color: ink }}>
                    {reviews[activeIdx].author}
                  </h4>
                  <p className="text-xs font-mono opacity-75" style={{ color: inkSecond }}>
                    {reviews[activeIdx].role}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                    className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                    style={{ backgroundColor: surface, borderColor: surface, color: ink }}
                    aria-label="Previous quote"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setActiveIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
                    className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                    style={{ backgroundColor: surface, borderColor: surface, color: ink }}
                    aria-label="Next quote"
                  >
                    <ChevronRight size={16} />
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

export default DigitalAgency5Testimonials;
