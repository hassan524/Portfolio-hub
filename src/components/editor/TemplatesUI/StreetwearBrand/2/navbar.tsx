// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaBars, FaXmark, FaDiamond } from "react-icons/fa6";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand2Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0D14]/90 backdrop-blur-xl border-b border-[#1E293B] text-[#F1F5F9]">
      


      {/* Main Navbar */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Monogram Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-[#CCFF00] flex items-center justify-center text-[#CCFF00] font-mono font-bold text-sm tracking-widest">
            M
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-light uppercase tracking-[0.25em] text-white block leading-none font-sans">
              <Editable value={p.brandTitle || "MONOLITH"} onChange={(v) => handleUpdate("brandTitle", v)} />
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#94A3B8] block mt-1 font-mono">
              HAUTE STREETWEAR // XI
            </span>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden lg:flex items-center gap-12 text-xs uppercase tracking-[0.25em] text-[#94A3B8] font-medium">
          <a href="#about" className="hover:text-[#CCFF00] transition-colors">Philosophy</a>
          <a href="#projects" className="hover:text-[#CCFF00] transition-colors">Silhouettes</a>
          <a href="#testimonials" className="hover:text-[#CCFF00] transition-colors">Press</a>
          <a href="#contact" className="hover:text-[#CCFF00] transition-colors">Private Showroom</a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black bg-[#CCFF00] hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
          >
            <span>Book Fitting</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white text-xl"
        >
          {mobileOpen ? <FaXmark /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0A0D14] border-b border-[#1E293B] px-6 py-6 space-y-4 text-xs uppercase tracking-widest text-[#94A3B8]">
          <a href="#about" onClick={() => setMobileOpen(false)} className="block hover:text-[#CCFF00]">Philosophy</a>
          <a href="#projects" onClick={() => setMobileOpen(false)} className="block hover:text-[#CCFF00]">Silhouettes</a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)} className="block hover:text-[#CCFF00]">Press</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block hover:text-[#CCFF00]">Private Showroom</a>
        </div>
      )}

    </header>
  );
};

export default StreetwearBrand2Navbar;
