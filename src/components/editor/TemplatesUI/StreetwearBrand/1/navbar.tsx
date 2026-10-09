// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaBarcode, FaBagShopping, FaBars, FaXmark, FaBolt } from "react-icons/fa6";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand1Navbar: React.FC<NavbarProps> = ({
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
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0C]/95 backdrop-blur-md border-b border-rose-950/60 text-[#F8FAFC]">
      

      {/* Main Navbar */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaBarcode className="text-rose-500 text-2xl" />
            <div>
              <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-white block leading-none font-mono">
                <Editable value={p.brandTitle || "KURO // ZERO"} onChange={(v) => handleUpdate("brandTitle", v)} />
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-rose-400 block mt-1 font-mono">
                クロ // GARMENT ARCHIVE
              </span>
            </div>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden lg:flex items-center gap-10 text-xs font-mono font-bold uppercase tracking-[0.2em] text-slate-300">
          <a href="#about" className="hover:text-rose-400 transition-colors">Manifesto</a>
          <a href="#projects" className="hover:text-rose-400 transition-colors">Capsule Drop</a>
          <a href="#testimonials" className="hover:text-rose-400 transition-colors">Community</a>
          <a href="#contact" className="hover:text-rose-400 transition-colors">Atelier Access</a>
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-none font-mono text-xs font-bold uppercase tracking-wider text-white bg-rose-600 hover:bg-rose-500 transition-all border border-rose-500 shadow-[0_0_20px_rgba(225,29,72,0.4)]"
          >
            <FaBagShopping className="text-xs" />
            <span>View Drop 04</span>
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
        <div className="lg:hidden bg-[#0A0A0C] border-b border-rose-950 px-6 py-6 space-y-4 font-mono text-xs uppercase">
          <a href="#about" onClick={() => setMobileOpen(false)} className="block text-white hover:text-rose-400">Manifesto</a>
          <a href="#projects" onClick={() => setMobileOpen(false)} className="block text-white hover:text-rose-400">Capsule Drop</a>
          <a href="#testimonials" onClick={() => setMobileOpen(false)} className="block text-white hover:text-rose-400">Community</a>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block text-white hover:text-rose-400">Atelier Access</a>
        </div>
      )}

    </header>
  );
};

export default StreetwearBrand1Navbar;
