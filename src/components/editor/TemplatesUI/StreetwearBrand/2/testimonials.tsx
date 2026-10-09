// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaQuoteLeft, FaDiamond } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand2Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const pressReviews = [
    {
      id: "press-1",
      publication: "VOGUE ITALIA // EDITORIAL CRITIQUE",
      issue: "FALL COUTURE REVIEW",
      author: "Camille Dupont",
      quote:
        "Monolith redefines the language of oversized garments. Where others merely increase pattern dimensions, they sculpt tension and gravity with the precision of brutalist architects. A triumph of silent luxury.",
    },
    {
      id: "press-2",
      publication: "DAZED MAGAZINE // RUNWAY DISPATCH",
      issue: "PARIS MENSWEAR CAPSULE",
      author: "Julian Vance",
      quote:
        "The double-faced greatcoat is an undeniable masterwork. Moving through Paris winter drizzle, the virgin wool sheds water like armor while maintaining a sculptural silhouette that commands absolute attention.",
    },
  ];

  return (
    <section id="testimonials" className="relative w-full py-28 bg-[#0B0F18] text-white border-b border-[#1E293B]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1E293B] pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#CCFF00] font-bold block mb-3">
              <Editable value={p.testSub || "CRITICAL ACCLAIM // PRESS ARCHIVE"} onChange={(v) => handleUpdate("testSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-white font-sans">
              <Editable value={p.testTitle || "Editorial Commentary"} onChange={(v) => handleUpdate("testTitle", v)} />
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
            <FaDiamond className="text-[#CCFF00] text-[10px]" />
            <span>FASHION WEEK OFFICIAL SELECTION</span>
          </div>
        </div>

        {/* Press Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pressReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 md:p-12 bg-[#0F1422] border border-[#1E293B] space-y-6 hover:border-[#CCFF00]/60 transition-all duration-300"
            >
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-4 font-mono text-xs">
                <span className="text-[#CCFF00] font-bold tracking-wider">{rev.publication}</span>
                <span className="text-[#64748B]">{rev.issue}</span>
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-2xl text-[#CCFF00]/20 mb-3" />
                <p className="text-base sm:text-lg text-[#E2E8F0] font-light leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between font-mono text-xs">
                <span className="text-white font-semibold">{rev.author}</span>
                <span className="text-[#64748B]">VERIFIED EDITORIAL</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand2Testimonials;
