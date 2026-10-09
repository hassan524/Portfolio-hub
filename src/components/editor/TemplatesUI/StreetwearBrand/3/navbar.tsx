// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaBars, FaXmark, FaBolt, FaRadio } from "react-icons/fa6";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand3Navbar: React.FC<NavbarProps> = ({
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
    <header className="sticky top-0 z-50 w-full bg-[#F4F3EE] border-b-4 border-black text-black">
      


      {/* Main Navbar */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Sticker Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-black text-white px-3.5 py-1.5 font-black text-xl tracking-tighter uppercase border-2 border-black shadow-[3px_3px_0px_#2563EB] rotate-[-2deg]">
            CONCRETE
          </div>
          <div>
            <span className="text-lg sm:text-xl font-black uppercase tracking-tight text-black block leading-none font-sans">
              <Editable value={p.brandTitle || "SKATE CO. NYC"} onChange={(v) => handleUpdate("brandTitle", v)} />
            </span>
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#2563EB] block mt-1">
              BROOKLYN DIY COLLECTIVE
            </span>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden lg:flex items-center gap-10 text-xs font-black uppercase tracking-wider text-black">
          <a href="#about" className="hover:bg-[#FACC15] px-2 py-1 transition-colors">The Zine</a>
          <a href="#projects" className="hover:bg-[#FACC15] px-2 py-1 transition-colors">Decks & Fleeces</a>
          <a href="#testimonials" className="hover:text-[#2563EB] transition-colors">Team Riders</a>
          <a href="#contact" className="hover:bg-[#FACC15] px-2 py-1 transition-colors">Clubhouse Shop</a>
        </nav>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 font-black text-xs uppercase tracking-wider text-white bg-black hover:bg-[#2563EB] transition-colors border-2 border-black shadow-[4px_4px_0px_#FACC15]"
          >
            <FaBolt />
            <span>Drop 09 Catalog</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-black text-2xl font-bold"
        >
          {mobileOpen ? <FaXmark /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#F4F3EE] border-b-4 border-black px-6 py-6 space-y-4 font-black text-sm uppercase">
          <a href="#about" onClick={() => setMobileOpen(false)} className="block hover:bg-[#FACC15] p-2">The Zine</a>
          <a href="#projects" onClick={() => setMobileOpen(false)} className="block hover:bg-[#FACC15] p-2">Decks & Fleeces</a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)} className="block hover:bg-[#FACC15] p-2">Team Riders</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block hover:bg-[#FACC15] p-2">Clubhouse Shop</a>
        </div>
      )}

    </header>
  );
};

export default StreetwearBrand3Navbar;
