// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaBars, FaXmark, FaPhone, FaCompass } from "react-icons/fa6";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency2Navbar: React.FC<NavbarProps> = ({
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 font-['Poppins',sans-serif]">
      {/* PURE NAVBAR — NO TEXT OR TICKER BEFORE NAVBAR */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-lg shadow-sm">
            <FaCompass />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 block leading-none font-serif">
              <Editable value={p.brandTitle || "AURA TRAVEL"} onChange={(v) => handleUpdate("brandTitle", v)} />
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-stone-500 block mt-1 font-sans font-semibold">
              LUXURY RETREATS
            </span>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden lg:flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.18em] text-stone-700">
          <a href="#about" className="hover:text-amber-700 transition-colors">Philosophy</a>
          <a href="#projects" className="hover:text-amber-700 transition-colors">Curated Villas</a>
          <a href="#testimonials" className="hover:text-amber-700 transition-colors">Press & Reviews</a>
          <a href="#contact" className="hover:text-amber-700 transition-colors">Private Concierge</a>
        </nav>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-stone-900 border border-stone-300 hover:bg-stone-900 hover:text-white transition-all duration-300"
          >
            <FaPhone className="text-[10px]" />
            <span>VIP Concierge</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-stone-900 text-xl"
        >
          {mobileOpen ? <FaXmark /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 text-center font-semibold text-xs uppercase tracking-wider text-stone-800">
          <a href="#about" onClick={() => setMobileOpen(false)} className="block py-2">Philosophy</a>
          <a href="#projects" onClick={() => setMobileOpen(false)} className="block py-2">Curated Villas</a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)} className="block py-2">Press & Reviews</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block py-2">Private Concierge</a>
        </div>
      )}

    </header>
  );
};

export default TravelBrandAgency2Navbar;
