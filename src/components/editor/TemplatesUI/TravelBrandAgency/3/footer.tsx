// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaCompass, FaTree, FaShieldCat } from "react-icons/fa6";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency3Footer: React.FC<FooterProps> = ({
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
    <footer className="w-full bg-[#080705] text-[#8C8070] border-t border-[#241F18] py-16 font-mono text-xs">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-[#1F1A14]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaCompass className="text-[#F59E0B] text-lg" />
              <span className="text-white text-base font-bold font-sans tracking-wide">
                <Editable value={p.brandName || "NOMADIC SAFARI CO."} onChange={(v) => handleUpdate("brandName", v)} />
              </span>
            </div>
            <p className="text-[#6E6457] max-w-md font-light text-[11px]">
              Low-impact mobile canvas expeditions & conservation trusts across Serengeti, Okavango Delta, and Namib wilderness corridors.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-[#A89E90]">
            <div className="flex items-center gap-2">
              <FaTree className="text-[#F59E0B]" />
              <span>CARBON NEGATIVE OPERATIONS</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShieldCat className="text-[#F59E0B]" />
              <span>COMMUNITY CONSERVANCY PARTNER</span>
            </div>
          </div>
        </div>

        {/* Links & Legal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-[#6E6457] text-[11px]">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#about" className="hover:text-[#F59E0B] transition-colors">Conservation Ethos</a>
            <a href="#projects" className="hover:text-[#F59E0B] transition-colors">Camps & Corridors</a>
            <a href="#testimonials" className="hover:text-[#F59E0B] transition-colors">Campfire Dispatches</a>
            <a href="#contact" className="hover:text-[#F59E0B] transition-colors">Head Ranger Desk</a>
          </div>

          <p>© {new Date().getFullYear()} Nomadic Safari Conservation Trust. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default TravelBrandAgency3Footer;
