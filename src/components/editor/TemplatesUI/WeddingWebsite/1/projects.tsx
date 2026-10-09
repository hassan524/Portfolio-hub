// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaHeart, FaCheck, FaClock, FaArrowRight } from "react-icons/fa6";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite1Projects: React.FC<ProjectsProps> = ({
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

  const products = [
    {
      id: "prod-1",
      number: "01",
      category: "Cards & Stationery",
      title: p.p1Title || "Hand-Torn Cotton Rag Wedding Card Suite",
      subtitle: p.p1Sub || "Deckle-edge 100% cotton paper with hand-poured botanical wax seals",
      price: p.p1Price || "From $3.50 / set",
      leadTime: "5-7 Days",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      specs: [
        "300gsm recycled cotton rag with soft deckle edges",
        "Custom calligraphy wording & guest addressing",
        "Matching euro-flap cotton envelopes & wax seals",
      ],
    },
    {
      id: "prod-2",
      number: "02",
      category: "Keepsake Heirlooms",
      title: p.p2Title || "Bride & Groom Mohair Keepsake Bears (Pair)",
      subtitle: p.p2Sub || "Hand-jointed German mohair with embroidered initials & bridal veil",
      price: p.p2Price || "$185 / pair",
      leadTime: "10-12 Days",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      specs: [
        "German Schulte mohair & Belgian linen paws",
        "Hand-embroidered wedding date on foot pads",
        "Bride tulle veil with pearls & groom silk bowtie",
      ],
    },
    {
      id: "prod-3",
      number: "03",
      category: "Sweet Favors & Treats",
      title: p.p3Title || "Artisan Macaron Favor Gift Boxes",
      subtitle: p.p3Sub || "Small-batch French macarons in personalized boxes tied with silk ribbon",
      price: p.p3Price || "From $4.20 / box",
      leadTime: "Baked fresh for event",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      specs: [
        "Lavender Honey, Rose Raspberry, Salted Caramel flavors",
        "Clear gift box with personalized couple thank-you tag",
        "Insulated venue delivery for maximum crisp freshness",
      ],
    },
    {
      id: "prod-4",
      number: "04",
      category: "Ceremony Keepsakes",
      title: p.p4Title || "Ceramic Ring Cradle & Deckle Vow Books",
      subtitle: p.p4Sub || "Hand-pinched porcelain dish with 24k gold rim & 2 silk-bound vow booklets",
      price: p.p4Price || "$75 set",
      leadTime: "7-10 Days",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      specs: [
        "High-fire porcelain with 24-karat liquid bright gold luster",
        "Set of 2 His & Her deckle edge cotton vow booklets",
        "Delivered in velvet-lined keepsake gift box",
      ],
    },
  ];

  return (
    <section
      id="projects"
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{
        backgroundColor: bg,
        color: ink,
      }}
    >
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 space-y-16 relative z-10">
        
        {/* Simple & Clear Section Header */}
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-pink-950">
            <Editable
              value={p.prodHeaderTitle || "Work Samples & Custom Pieces"}
              onChange={(v) => handleUpdate("prodHeaderTitle", v)}
            />
          </h2>
          <p className="text-sm sm:text-base text-pink-900/80 leading-relaxed font-light">
            <Editable
              value={
                p.prodHeaderDesc ||
                "Browse our small-batch handcrafted pieces below. Every item is customizable with your wedding colors, names, and sentimental dates."
              }
              onChange={(v) => handleUpdate("prodHeaderDesc", v)}
            />
          </p>
        </div>

        {/* Clean, Simple & Visual Product Rows (Not Overwhelming, Easy to Understand) */}
        <div className="space-y-12">
          {products.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-pink-200 shadow-md p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 justify-between"
            >
              {/* Product Photo Frame */}
              <div className="w-full lg:w-72 h-52 shrink-0 rounded-2xl overflow-hidden bg-pink-50 relative border border-pink-100 shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-[10px] font-bold uppercase tracking-wider text-pink-800 px-3 py-1 rounded-full shadow-xs">
                  {item.category}
                </span>
              </div>

              {/* Product Details (Clear, Concise, No Confusion) */}
              <div className="flex-1 space-y-3 text-left w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-pink-950">
                    {item.title}
                  </h3>
                  <span className="text-lg font-bold font-serif text-pink-600">
                    {item.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-pink-800/80">
                  {item.subtitle}
                </p>

                {/* 3 Quick Bullet Specs */}
                <div className="space-y-1.5 pt-1 text-xs text-pink-900/80">
                  {item.specs.map((sp, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2">
                      <FaCheck className="text-pink-500 text-[10px] shrink-0" />
                      <span>{sp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Column */}
              <div className="shrink-0 flex flex-col items-center lg:items-end gap-2 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-pink-100">
                <span className="text-xs text-pink-700 font-medium">
                  ⏱ Lead Time: <strong>{item.leadTime}</strong>
                </span>
                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white shadow-sm transition-all hover:scale-105"
                  style={{ backgroundColor: accent }}
                >
                  <span>Inquire This Piece</span>
                  <FaArrowRight className="text-xs" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WeddingWebsite1Projects;
