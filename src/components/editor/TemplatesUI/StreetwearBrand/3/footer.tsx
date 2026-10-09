// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaBolt, FaHeart } from "react-icons/fa6";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand3Footer: React.FC<FooterProps> = ({
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
    <footer className="w-full bg-black text-[#A3A3A3] py-16 font-sans text-xs border-t-4 border-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Top Colophon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-[#262626]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-[#FACC15] text-black px-2 py-0.5 font-black text-sm uppercase">
                CONCRETE
              </div>
              <span className="text-white text-base font-black uppercase tracking-tight">
                <Editable value={p.brandName || "CONCRETE SKATE CO. NYC"} onChange={(v) => handleUpdate("brandName", v)} />
              </span>
            </div>
            <p className="text-[#737373] max-w-md font-bold text-xs">
              100% skater owned and operated in Brooklyn, New York. Hand-pulled screenprints, cold-pressed decks, and community ramp building.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white font-black uppercase">
            <span className="flex items-center gap-1.5 text-[#FACC15]">
              <FaBolt />
              MADE TO SHRED
            </span>
            <span>WILLIAMSBURG NY 11249</span>
            <span>EST. 2018</span>
          </div>
        </div>

        {/* Links & Legal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-bold">
          <div className="flex flex-wrap items-center gap-6 text-white uppercase">
            <a href="#about" className="hover:text-[#FACC15] transition-colors">The Zine</a>
            <a href="#projects" className="hover:text-[#FACC15] transition-colors">Decks & Apparel</a>
            <a href="#testimonials" className="hover:text-[#FACC15] transition-colors">Team Riders</a>
            <a href="#contact" className="hover:text-[#FACC15] transition-colors">Clubhouse</a>
          </div>

          <p className="text-[#525252]">© {new Date().getFullYear()} Concrete Skateboarding Co. DIY or die.</p>
        </div>

      </div>
    </footer>
  );
};

export default StreetwearBrand3Footer;
