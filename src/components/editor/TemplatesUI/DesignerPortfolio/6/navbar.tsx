// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio6Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [open, setOpen] = useState(false);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const navLinks = [
    { num: "01", label: "METHODOLOGY", href: "#about" },
    { num: "02", label: "INDEX OF WORKS", href: "#projects" },
    { num: "03", label: "AUDIT & REVIEWS", href: "#testimonials" },
    { num: "04", label: "COMMISSION", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A] text-[#F5F5F0] border-b border-[#262626] font-mono transition-all">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* Brand Swiss Mark */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#E63946] text-white font-black text-xs flex items-center justify-center">
            +
          </div>
          <div>
            <span className="font-bold text-sm tracking-widest uppercase text-white">
              <Editable
                value={p.brand || "HASSAN REHAN // CH"}
                onChange={(val) => handleUpdate("brand", val)}
              />
            </span>
            <div className="text-[9px] text-[#888] tracking-widest uppercase">
              <Editable
                value={p.role || "SYSTEMATISCHE GESTALTUNG"}
                onChange={(val) => handleUpdate("role", val)}
              />
            </div>
          </div>
        </div>

        {/* Swiss Coordinates & Grid Tag */}
        <div className="hidden xl:flex items-center gap-4 text-[10px] text-[#888]">
          <span>GRID: 12-COL HELVETIA</span>
          <span className="text-[#333]">/</span>
          <span>LAT 47.3769° N // ZURICH</span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#AAA] hover:text-[#E63946] transition-colors flex items-center gap-1.5"
            >
              <span className="text-[10px] text-[#E63946]">{item.num}</span>
              <span>{item.label}</span>
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 border border-[#E63946] text-[#E63946] hover:bg-[#E63946] hover:text-white transition-all text-xs font-bold"
          >
            START PROJECT
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white border border-[#262626]"
          aria-label="Toggle Navigation"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#262626] px-6 py-6 space-y-4">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-xs text-[#AAA] hover:text-white border-b border-[#1A1A1A]"
            >
              <span className="text-[#E63946] mr-2">{item.num}</span>
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-3 bg-[#E63946] text-white text-xs font-bold tracking-wider"
            >
              COMMISSION INQUIRY
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default DesignerPortfolio6Navbar;
