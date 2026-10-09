// @ts-nocheck
import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

interface NavbarProps {
  props?: Record<string, any>;
  theme?: Record<string, string>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export function DesignerPortfolio1Navbar({ props = {}, theme = {}, data = {}, onChange, onUpdate }: NavbarProps) {
  const p = { ...data, ...props };
  const [open, setOpen] = useState(false);

  const bg = theme?.bg || "#FFFFFF";
  const text = theme?.text || theme?.ink || "#0F172A";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#2563EB";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const links = [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Name */}
        <a href="#home" className="flex items-center gap-2 group">
          <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
            <Editable
              value={p.brandName || p.brand || "Alex Morgan"}
              onChange={(v) => handleUpdate("brandName", v)}
            />
          </span>
        </a>

        {/* Clean, Minimal Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-blue-600 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          aria-label="Toggle Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-lg">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-base font-medium text-slate-800 hover:text-blue-600 border-b border-slate-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block w-full text-center py-3 rounded-full bg-slate-900 text-white text-xs font-semibold"
            >
              Let's talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default DesignerPortfolio1Navbar;