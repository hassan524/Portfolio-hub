// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaBars, FaXmark, FaMountain, FaCompass } from "react-icons/fa6";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency3Navbar: React.FC<NavbarProps> = ({
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
    <header className="sticky top-0 z-50 w-full bg-[#0B131E]/95 backdrop-blur-md border-b border-slate-800 text-white font-['Poppins',sans-serif]">
      {/* PURE NAVBAR — NO TEXT OR TICKER BEFORE NAVBAR */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-lg font-bold shadow-md">
            <FaMountain />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white block leading-none">
              <Editable value={p.brandTitle || "SUMMIT EXPEDITIONS"} onChange={(v) => handleUpdate("brandTitle", v)} />
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-amber-400 block mt-1 font-semibold">
              ALPINE & WILDERNESS ADVENTURES
            </span>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden lg:flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
          <a href="#about" className="hover:text-amber-400 transition-colors">Expedition Ethos</a>
          <a href="#projects" className="hover:text-amber-400 transition-colors">Alpine Routes</a>
          <a href="#testimonials" className="hover:text-amber-400 transition-colors">Summit Logs</a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">Basecamp Desk</a>
        </nav>

        {/* Right Action */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            <span>Plan Expedition</span>
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
        <div className="lg:hidden bg-[#0B131E] border-b border-slate-800 px-6 py-6 space-y-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-300">
          <a href="#about" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-amber-400">Expedition Ethos</a>
          <a href="#projects" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-amber-400">Alpine Routes</a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-amber-400">Summit Logs</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-amber-400">Basecamp Desk</a>
        </div>
      )}

    </header>
  );
};

export default TravelBrandAgency3Navbar;
