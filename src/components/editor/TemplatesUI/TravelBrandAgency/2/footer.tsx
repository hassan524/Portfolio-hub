// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaCompass } from "react-icons/fa6";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency2Footer: React.FC<FooterProps> = ({
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
    <footer className="w-full bg-[#1C1917] text-stone-400 font-['Poppins',sans-serif] py-16 text-xs">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Top Minimalist Brand Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-800 text-amber-400 flex items-center justify-center text-sm">
              <FaCompass />
            </div>
            <span className="text-xl font-bold font-serif text-white tracking-tight">
              <Editable value={p.brandName || "AURA TRAVEL GROUP"} onChange={(v) => handleUpdate("brandName", v)} />
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-stone-300 font-medium text-xs">
            <a href="#about" className="hover:text-amber-400 transition-colors">Philosophy</a>
            <a href="#projects" className="hover:text-amber-400 transition-colors">Seasonal Estates</a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">VIP Concierge</a>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© {new Date().getFullYear()} Aura Travel Monaco S.A.M. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Monaco</span>
            <span>•</span>
            <span>London</span>
            <span>•</span>
            <span>Zurich</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default TravelBrandAgency2Footer;
