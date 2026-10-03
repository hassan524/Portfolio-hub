// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowRight, ArrowLeft } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Testimonials({ props = {}, theme, onChange }: any) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Dynamic theme colors
  const bg = theme?.bg || theme?.bgPrimary || "#0C0C0E";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#16161A";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#9CA3AF";
  const surface = theme?.surface || "#1F1F24";
  const accent = theme?.accent || "#CCFF00";

  const quotes = [
    {
      statement: "David didn't just advise us; he took an operational scalpel to our unit economics. In 14 months, our enterprise ARR grew by 340% without hiring a bloated sales army.",
      author: "Marcus Sterling",
      role: "CEO & Co-Founder, CloudStack AI",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      outcome: "+340% Enterprise Revenue",
    },
    {
      statement: "His guidance during our Series-B narrative was instrumental. We closed an oversubscribed $42M round in under 6 weeks because the growth model was mathematically ironclad.",
      author: "Elena Rostova",
      role: "Founder, Vektor Health",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      outcome: "$42M Round Closed",
    },
    {
      statement: "16 years of pattern recognition makes an enormous difference. David diagnosed our churn bottleneck in our very first 45-minute working session.",
      author: "Julian Vance",
      role: "Managing Director, Apex Ventures",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      outcome: "Board Governance Member",
    },
  ];

  const current = quotes[activeIdx];

  return (
    <section
      id="testimonials"
      className="py-24 transition-colors relative"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - NO BOX CARDS */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${accent}20`, color: accent }}>
            <span>Boardroom Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Founder & Partner Perspectives
          </h2>
        </div>

        {/* Large Statement Canvas - NO BOX CARDS */}
        <div className="p-8 sm:p-14 rounded-3xl relative" style={{ backgroundColor: surface, border: `1px solid ${textSecond}25` }}>
          <Quote size={40} className="mb-6 opacity-30" style={{ color: accent }} />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.author}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <p className="text-xl sm:text-3xl font-medium leading-relaxed tracking-tight" style={{ color: text }}>
                "{current.statement}"
              </p>

              <div className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-6" style={{ borderColor: `${textSecond}20` }}>
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    className="w-14 h-14 rounded-full object-cover ring-2"
                    style={{ ringColor: accent }}
                  />
                  <div>
                    <div className="text-base font-bold" style={{ color: text }}>{current.author}</div>
                    <div className="text-xs" style={{ color: textSecond }}>{current.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full" style={{ backgroundColor: `${accent}25`, color: accent }}>
                    {current.outcome}
                  </span>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveIdx((i) => (i > 0 ? i - 1 : quotes.length - 1))}
                      className="w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-colors"
                      style={{ borderColor: `${textSecond}30`, color: text }}
                      aria-label="Previous quote"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveIdx((i) => (i < quotes.length - 1 ? i + 1 : 0))}
                      className="w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-colors"
                      style={{ borderColor: `${textSecond}30`, color: text }}
                      aria-label="Next quote"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

export default DigitalAgency2Testimonials;
