// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaHeart } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite2Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#FAF7FD";
  const ink = theme.ink || "#201235";
  const accent = theme.accent || "#8B5CF6";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const clientAcclaim = [
    {
      quote:
        p.q1Text ||
        "The silk bouquet ribbons trailing from my peonies blew everyone away. Our wedding photographer said she had never captured ribbons with such delicate botanical French knotting. It is now framed in our bedroom.",
      couple: p.q1Couple || "Eléonore & Matthieu",
      venue: p.q1Venue || "Château de Tourreau, Provence",
      detail: "Custom 2.5m Silk Vow Ribbons",
      handle: "@eleonore.in.paris",
    },
    {
      quote:
        p.q2Text ||
        "Opening the lavender-sealed box on my wedding morning brought tears to my eyes. The scent of genuine Sault lavender calmed my wedding jitters instantly, and the 24k gold monogram on the cushion caught the sunlight during our ceremony.",
      couple: p.q2Couple || "Chloe & Liam",
      venue: p.q2Venue || "Amalfi Coast Villa, Italy",
      detail: "Belgian Linen Lavender Ring Cushion",
      handle: "@chloeliam_travels",
    },
    {
      quote:
        p.q3Text ||
        "I sent our floral palette directly to the atelier, and within two weeks they sent back hand-poured wax seals with actual dried lavender that matched our invitations flawlessly. Flawless artisan experience.",
      couple: p.q3Couple || "Isabella & Noah",
      venue: p.q3Venue || "Sonoma Valley Vineyard, CA",
      detail: "Pressed Lavender Botanical Wax Seals",
      handle: "@isabellanoah_26",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 md:py-36 overflow-hidden bg-white border-t"
      style={{
        borderColor: "rgba(139, 92, 246, 0.15)",
        color: ink,
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200"
          >
            <span>Couture Client Acclaim</span>
            <span>✦</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-purple-950 tracking-tight leading-tight">
            <Editable
              value={p.testTitle || "Words From Our Brides & Luxury Wedding Planners"}
              onChange={(v) => handleUpdate("testTitle", v)}
            />
          </h2>

          <p className="text-sm sm:text-base text-purple-900/80 leading-relaxed font-light">
            <Editable
              value={
                p.testSub ||
                "Reflections from weddings celebrated across European châteaux, coastal estates, and intimate elopements."
              }
              onChange={(v) => handleUpdate("testSub", v)}
            />
          </p>
        </div>

        {/* Featured Editorial Spotlight Banner */}
        <div className="p-8 sm:p-12 rounded-[36px] bg-purple-50/60 border border-purple-200/80 relative overflow-hidden">
          <FaQuoteLeft className="text-purple-200 text-6xl absolute top-6 right-8 pointer-events-none opacity-60" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-1 text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <blockquote className="text-lg sm:text-2xl font-serif italic text-purple-950 leading-relaxed">
              "In a wedding market crowded with factory reproductions, Atelier Lavande offers rare authentic soul. Genevieve's hand-embroidered ribbons and botanical wax seals are the pieces our photographers rush to capture first."
            </blockquote>
            <div className="pt-2">
              <h4 className="text-sm font-bold text-purple-950">Camille Delacroix</h4>
              <p className="text-xs text-purple-700 font-medium">Head Planner, Provence Luxury Weddings & Events</p>
            </div>
          </div>
        </div>

        {/* 3 Detailed Wedding Client Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientAcclaim.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-3xl bg-white border border-purple-200/80 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-full">
                    {item.detail}
                  </span>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-purple-950/85 leading-relaxed italic font-serif">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-purple-100 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-purple-950">{item.couple}</h5>
                  <p className="text-[11px] text-purple-700/80">{item.venue}</p>
                </div>
                <span className="text-xs text-purple-400 font-mono">{item.handle}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Badges */}
        <div className="py-8 border-t border-purple-100 flex flex-wrap items-center justify-center gap-10 sm:gap-16 text-purple-900/60 font-serif text-sm tracking-widest uppercase">
          <span>Style Me Pretty</span>
          <span>•</span>
          <span>Vogue Weddings</span>
          <span>•</span>
          <span>Magnolia Rouge</span>
          <span>•</span>
          <span>Brides Magazine</span>
        </div>

      </div>
    </section>
  );
};

export default WeddingWebsite2Testimonials;
