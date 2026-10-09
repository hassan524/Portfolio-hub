// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaHeart, FaStar, FaQuoteLeft } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite1Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#FFF5F7";
  const ink = theme.ink || "#361D24";
  const accent = theme.accent || "#F472B6";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const reviews = [
    {
      bride: p.rev1Bride || "Sophie & Julian",
      location: p.rev1Loc || "Cotswolds Wedding • May 2026",
      handle: "@sophielovesweddings",
      item: "Bespoke Mohair Bride & Groom Bears",
      text:
        p.rev1Text ||
        "When our parcel arrived from Petite Heirloom, I literally broke down in tears. The quality of the mohair is incredible, and having our vow date embroidered into the bear's paws made it our most beloved wedding keepsake. Our photographer took so many morning-of portraits with them!",
      rating: 5,
    },
    {
      bride: p.rev2Bride || "Camilla & Arthur",
      location: p.rev2Loc || "Lake Como Elopement • July 2026",
      handle: "@camilla_in_italy",
      item: "Wildflower Wax Seals & Raw Silk Ribbons",
      text:
        p.rev2Text ||
        "Every single wedding guest commented on the wax seal place settings. They untied the ribbons and kept them as bookmarks to remember our day. The flexible wax didn't chip at all even after traveling in our suitcases all the way to Italy. Clara is a true artist!",
      rating: 5,
    },
    {
      bride: p.rev3Bride || "Hannah & Marcus",
      location: p.rev3Loc || "Big Sur Coast Ceremony • Sept 2026",
      handle: "@hannah_coastlines",
      item: "24k Gold Luster Porcelain Ring Cradle",
      text:
        p.rev3Text ||
        "Our ceremony photos holding our wedding bands in this organic dish look straight out of Vogue Weddings. It now sits on our bedside table every night. The direct maker communication was so personal—Clara even sent progress photos while sculpting!",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 md:py-36 overflow-hidden border-t"
      style={{
        backgroundColor: "#FFF7F9",
        borderColor: "rgba(244, 114, 182, 0.2)",
        color: ink,
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-600 bg-white border border-pink-200 px-4 py-1.5 rounded-full shadow-xs"
          >
            <span>Real Bride Love Letters</span>
            <span>♡</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-pink-950 tracking-tight leading-tight">
            <Editable
              value={p.testTitle || "Cherished Moments From Couples Around The World"}
              onChange={(v) => handleUpdate("testTitle", v)}
            />
          </h2>

          <p className="text-sm sm:text-base text-pink-900/75 leading-relaxed font-light">
            <Editable
              value={
                p.testSub ||
                "Read unboxing notes, handwritten cards, and heartfelt reflections from couples who entrusted their wedding keepsakes to our hands."
              }
              onChange={(v) => handleUpdate("testSub", v)}
            />
          </p>
        </div>

        {/* Conversational Staggered Flow (Not Generic Equal Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`rounded-3xl p-8 border flex flex-col justify-between relative shadow-sm ${
                idx === 1
                  ? "bg-white border-pink-300 md:-translate-y-4 shadow-md ring-2 ring-pink-100"
                  : "bg-white/80 border-pink-200/80"
              }`}
            >
              {/* Top Verified Review Badge */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-200/60">
                    Verified Bride
                  </span>
                </div>

                <div className="text-xs font-semibold text-pink-700 uppercase tracking-wider">
                  {rev.item}
                </div>

                <p className="text-xs sm:text-sm text-pink-950/85 leading-relaxed italic font-serif">
                  "{rev.text}"
                </p>
              </div>

              {/* Bottom Bride Credential */}
              <div className="pt-6 mt-6 border-t border-pink-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-pink-950">{rev.bride}</h4>
                  <p className="text-[11px] text-pink-700/70">{rev.location}</p>
                </div>
                <span className="text-xs text-pink-400 font-mono">{rev.handle}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Proof Bar */}
        <div className="p-8 rounded-3xl bg-pink-100/60 border border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="text-3xl">🌸</span>
            <div>
              <h4 className="text-sm font-bold text-pink-950">Featured in 500+ Weddings Worldwide</h4>
              <p className="text-xs text-pink-800/80">Cherished by couples across celebrations, elopements, and intimate gatherings</p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-pink-800 text-xs font-bold border border-pink-200 shadow-xs hover:bg-pink-50 transition-colors"
          >
            <span>Read More Stories</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default WeddingWebsite1Testimonials;
