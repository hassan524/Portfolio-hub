// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaDiamond } from "react-icons/fa6";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand2Footer: React.FC<FooterProps> = ({
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
    <footer className="w-full bg-[#05070B] text-[#64748B] py-16 text-xs border-t border-[#151C2A]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Top Colophon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-[#151C2A]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaDiamond className="text-[#CCFF00] text-sm" />
              <span className="text-white text-base font-light tracking-[0.25em] uppercase">
                <Editable value={p.brandName || "ATELIER MONOLITH // XI"} onChange={(v) => handleUpdate("brandName", v)} />
              </span>
            </div>
            <p className="text-[#64748B] max-w-md font-light text-[11px]">
              Sculptural haute streetwear engineered from Italian virgin wool and Japanese raw denim. Ateliers in Milan and Copenhagen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-[#94A3B8] uppercase tracking-wider font-mono">
            <span>Milan</span>
            <span className="text-[#CCFF00]">•</span>
            <span>Copenhagen</span>
            <span className="text-[#CCFF00]">•</span>
            <span>Paris</span>
            <span className="text-[#CCFF00]">•</span>
            <span>Tokyo</span>
          </div>
        </div>

        {/* Links & Legal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-[11px]">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#about" className="hover:text-[#CCFF00] transition-colors">Philosophy</a>
            <a href="#projects" className="hover:text-[#CCFF00] transition-colors">Silhouettes</a>
            <a href="#testimonials" className="hover:text-[#CCFF00] transition-colors">Press Archive</a>
            <a href="#contact" className="hover:text-[#CCFF00] transition-colors">Private Showroom</a>
          </div>

          <p>© {new Date().getFullYear()} Monolith Atelier S.r.l. All architectural silhouette patents reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default StreetwearBrand2Footer;
