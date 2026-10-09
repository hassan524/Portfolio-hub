// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const InteriorDesignStudio3Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [open, setOpen] = useState(false);

  const bg = theme.bg || "#080808";
  const ink = theme.ink || "#FFFFFF";
  const accent = theme.accent || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <header
      className="w-full sticky top-0 z-50 border-b border-white/10 backdrop-blur-md transition-colors"
      style={{ backgroundColor: `${bg}F2`, color: ink }}
    >
      {/* Exact Image 3 Top Navigation Bar: HOME WORKS ABOUT ● SERVICES BLOG CONTACT */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        {/* Left Side Links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
          <a href="#hero" className="hover:text-white transition-colors">
            <Editable value={p.l1 || "HOME"} onChange={(v) => handleUpdate("l1", v)} />
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            <Editable value={p.l2 || "WORKS"} onChange={(v) => handleUpdate("l2", v)} />
          </a>
          <a href="#about" className="hover:text-white transition-colors">
            <Editable value={p.l3 || "ABOUT"} onChange={(v) => handleUpdate("l3", v)} />
          </a>
        </div>

        {/* Center Minimalist Icon / Dot (Exact Image 3 Centerpiece) */}
        <div className="flex items-center justify-center">
          <a href="#hero" className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center hover:border-white transition-colors group">
            <div className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
          </a>
        </div>

        {/* Right Side Links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
          <a href="#about" className="hover:text-white transition-colors">
            <Editable value={p.r1 || "SERVICES"} onChange={(v) => handleUpdate("r1", v)} />
          </a>
          <a href="#testimonials" className="hover:text-white transition-colors">
            <Editable value={p.r2 || "PRESS"} onChange={(v) => handleUpdate("r2", v)} />
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            <Editable value={p.r3 || "CONTACT"} onChange={(v) => handleUpdate("r3", v)} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xs font-mono uppercase tracking-widest text-white"
        >
          {open ? "[CLOSE]" : "[INDEX]"}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden px-6 py-8 border-t border-white/10 space-y-4" style={{ backgroundColor: bg }}>
          <a href="#hero" onClick={() => setOpen(false)} className="block text-xl font-bold uppercase tracking-wider text-white">Home</a>
          <a href="#projects" onClick={() => setOpen(false)} className="block text-xl font-bold uppercase tracking-wider text-white">Works</a>
          <a href="#about" onClick={() => setOpen(false)} className="block text-xl font-bold uppercase tracking-wider text-white">About & Services</a>
          <a href="#testimonials" onClick={() => setOpen(false)} className="block text-xl font-bold uppercase tracking-wider text-white">Press</a>
          <a href="#contact" onClick={() => setOpen(false)} className="block text-xl font-bold uppercase tracking-wider text-white">Contact</a>
        </div>
      )}
    </header>
  );
};

export default InteriorDesignStudio3Navbar;
