// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaHeart, FaScissors, FaFeatherPointed, FaLeaf, FaHandsHoldingCircle } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite1About: React.FC<AboutProps> = ({
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

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 overflow-hidden border-t border-b"
      style={{
        backgroundColor: "#FFF9FA",
        borderColor: "rgba(244, 114, 182, 0.2)",
        color: ink,
      }}
    >
      {/* Decorative stitching path across the top */}
      <div className="absolute top-0 inset-x-0 h-4 flex items-center justify-around opacity-30 select-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <span key={i} className="text-pink-400 text-xs">─ ✂ ─</span>
        ))}
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-24">
        
        {/* Header Section */}
        <div className="max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-600 bg-pink-100/70 px-3.5 py-1.5 rounded-full"
          >
            <span>The Independent Maker</span>
            <span>✿</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight text-pink-950"
          >
            <Editable
              value={p.aboutTitle || "Crafting tangible heirlooms for the day you say 'I do' and all the anniversaries to come."}
              onChange={(v) => handleUpdate("aboutTitle", v)}
            />
          </motion.h2>

          <p className="text-base sm:text-lg text-pink-900/80 leading-relaxed font-light">
            <Editable
              value={
                p.aboutLead ||
                "I started Petite Heirloom from a small wooden work desk after seeing how fast wedding memories pass. While flowers wilt and cakes are eaten, a hand-stitched bridal teddy bear or an embroidered vow ribbon remains on your nightstand forever."
              }
              onChange={(v) => handleUpdate("aboutLead", v)}
            />
          </p>
        </div>

        {/* Artisanal Narrative Section (Asymmetrical Flow, Not Generic Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-pink-200/60 pt-16">
          
          {/* Left Narrative Pillar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative pl-6 border-l-2 border-pink-300">
              <span className="text-xs uppercase font-bold tracking-widest text-pink-500">Chapter 01</span>
              <h3 className="text-2xl font-serif font-bold text-pink-950 mt-1">
                <Editable value={p.chap1Title || "Every stitch is placed by one set of hands"} onChange={(v) => handleUpdate("chap1Title", v)} />
              </h3>
              <p className="text-sm text-pink-900/75 mt-3 leading-relaxed">
                <Editable
                  value={
                    p.chap1Text ||
                    "Unlike mass-produced wedding party gifts shipped from foreign warehouses, every single piece in this shop is cut, sewn, stuffed, and monogrammed right here in my sun-filled home workshop. When you reach out to me, you are speaking directly with the person who will hold the scissors and thread."
                  }
                  onChange={(v) => handleUpdate("chap1Text", v)}
                />
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-pink-300">
              <span className="text-xs uppercase font-bold tracking-widest text-pink-500">Chapter 02</span>
              <h3 className="text-2xl font-serif font-bold text-pink-950 mt-1">
                <Editable value={p.chap2Title || "Textiles chosen to endure for 50+ years"} onChange={(v) => handleUpdate("chap2Title", v)} />
              </h3>
              <p className="text-sm text-pink-900/75 mt-3 leading-relaxed">
                <Editable
                  value={
                    p.chap2Text ||
                    "We utilize archival German Schulte mohair, organic unbleached Belgian linen, and pure plant-dyed mulberry silk ribbons. The glass eyes on our bears are hand-blown in the UK with cotter pin jointed limbs, making them fully posable like classic antique Edwardian bears."
                  }
                  onChange={(v) => handleUpdate("chap2Text", v)}
                />
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-pink-300">
              <span className="text-xs uppercase font-bold tracking-widest text-pink-500">Chapter 03</span>
              <h3 className="text-2xl font-serif font-bold text-pink-950 mt-1">
                <Editable value={p.chap3Title || "Personalized to your unique wedding colors"} onChange={(v) => handleUpdate("chap3Title", v)} />
              </h3>
              <p className="text-sm text-pink-900/75 mt-3 leading-relaxed">
                <Editable
                  value={
                    p.chap3Text ||
                    "Send me photos of your wedding dress fabric, the groom's suit swatch, or your bridesmaid bouquet palette. I match embroidery threads, veil lace, and neck bows directly to your celebration."
                  }
                  onChange={(v) => handleUpdate("chap3Text", v)}
                />
              </p>
            </div>
          </div>

          {/* Right Flow: Interactive Step-by-Step Artisanal Ribbon */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-pink-200/80 shadow-md space-y-8">
            <div className="flex items-center justify-between pb-6 border-b border-pink-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600">The Workshop Process</span>
                <h4 className="text-xl font-serif font-bold text-pink-950 mt-0.5">How your keepsake comes to life</h4>
              </div>
              <span className="text-2xl text-pink-300">♡</span>
            </div>

            {/* Detailed Process Steps */}
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  icon: "💌",
                  title: p.step1Title || "Direct Maker Consultation",
                  desc: p.step1Desc || "You send me your wedding date, couple initials, preferred color palette, and any special sentimental touches (e.g. piece of mother's vintage veil).",
                },
                {
                  step: "02",
                  icon: "✂",
                  title: p.step2Title || "Pattern Drafting & Hand Cutting",
                  desc: p.step2Desc || "Each mohair and linen segment is cut with dressmaker shears according to our bespoke proportions, calibrated to sit softly in your hands.",
                },
                {
                  step: "03",
                  icon: "🪡",
                  title: p.step3Title || "Intricate Monogramming & Jointing",
                  desc: p.step3Desc || "Paws, ribbon sashes, or ring pillows are hand-embroidered with DMC metallic gold or soft blush threads. The bear is jointed with traditional wooden discs.",
                },
                {
                  step: "04",
                  icon: "📦",
                  title: p.step4Title || "Video Reveal & Archival Box Packaging",
                  desc: p.step4Desc || "Before dispatch, I send you a high-definition video of your completed heirloom. Once you fall in love, it is nestled in acid-free tissue inside a gold-foiled keepsake box.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-pink-50/60 transition-colors border border-transparent hover:border-pink-100"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center font-serif font-bold text-pink-700 shrink-0 text-sm">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{item.icon}</span>
                      <h5 className="font-bold text-sm sm:text-base text-pink-950">{item.title}</h5>
                    </div>
                    <p className="text-xs sm:text-sm text-pink-900/70 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Maker Note Callout */}
            <div className="p-5 rounded-2xl bg-pink-50 border border-pink-200/80 flex items-center gap-4">
              <span className="text-3xl">☕</span>
              <div className="text-xs text-pink-900/80 space-y-0.5">
                <p className="font-bold text-pink-950">
                  <Editable value={p.makerNoteTitle || "Average production timeline: 10 to 14 business days"} onChange={(v) => handleUpdate("makerNoteTitle", v)} />
                </p>
                <p>
                  <Editable
                    value={p.makerNoteDesc || "Rush bridal orders are accepted depending on our monthly studio capacity. Please DM early for spring and autumn wedding dates."}
                    onChange={(v) => handleUpdate("makerNoteDesc", v)}
                  />
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WeddingWebsite1About;
