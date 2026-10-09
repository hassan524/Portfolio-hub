// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaBars, FaXmark, FaPlane, FaCompass } from "react-icons/fa6";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency1Navbar: React.FC<NavbarProps> = ({
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
    <header className="absolute top-0 left-0 right-0 z-50 w-full font-['Poppins',sans-serif]">
      {/* Floating Modern Frosted Glass Bar (Directly over Hero, NO top strip) */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-6">
        <div className="h-16 md:h-18 px-6 md:px-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
          
          {/* Logo on Left */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white text-base shadow-sm">
              <FaPlane className="text-white transform -rotate-45" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white block leading-none">
              <Editable value={p.brandTitle || "Voyare"} onChange={(v) => handleUpdate("brandTitle", v)} />
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#destinations" className="hover:text-white transition-colors">Destinations</a>
            <a href="#packages" className="hover:text-white transition-colors">Travel Packages</a>
            <a href="#offers" className="hover:text-white transition-colors">Offers</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Right Action Pill */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full font-semibold text-sm text-slate-900 bg-white hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white text-xl"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaXmark /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mx-6 mt-3 p-6 rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-white/20 text-white space-y-4 text-center font-medium shadow-2xl">
          <a href="#about" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-emerald-400">About Us</a>
          <a href="#destinations" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-emerald-400">Destinations</a>
          <a href="#packages" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-emerald-400">Travel Packages</a>
          <a href="#offers" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-emerald-400">Offers</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-emerald-400">Contact</a>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="inline-block w-full py-3 rounded-full font-semibold text-sm text-slate-900 bg-white shadow-md"
            >
              Book Now
            </a>
          </div>
        </div>
      )}

    </header>
  );
};

export default TravelBrandAgency1Navbar;
