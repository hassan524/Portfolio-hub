// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency2Testimonials: React.FC<TestimonialsProps> = ({
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

  return (
    <section id="testimonials" className="relative w-full py-24 md:py-32 bg-white text-stone-900 font-['Poppins',sans-serif] border-b border-stone-200">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 space-y-16 text-center">
        
        {/* Editorial Pull Quote Display */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-1 text-amber-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 leading-snug max-w-4xl mx-auto">
            "Aura Travel is the quiet gold standard of bespoke European travel. Their ability to open private estate gates that aren't listed anywhere on the open market is simply unmatched."
          </blockquote>

          <div className="pt-4 flex flex-col items-center justify-center space-y-1">
            <span className="text-base font-bold text-stone-900">Julian Vance-Moreau</span>
            <span className="text-xs text-amber-700 font-semibold uppercase tracking-wider">
              Private Charter Guest • Capri & Positano Residence
            </span>
          </div>
        </div>

        {/* Press Badges Bar */}
        <div className="pt-10 border-t border-stone-200/80 flex flex-wrap items-center justify-around gap-8 text-xs font-semibold text-stone-400 uppercase tracking-widest">
          <span>CONDÉ NAST TRAVELER — GOLD LIST</span>
          <span>•</span>
          <span>ROBB REPORT LUXURY CURATOR 2025</span>
          <span>•</span>
          <span>TRAVEL + LEISURE WORLD’S BEST</span>
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency2Testimonials;
