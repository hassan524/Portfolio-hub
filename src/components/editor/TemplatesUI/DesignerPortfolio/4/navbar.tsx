// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { MousePointer2, Sparkles, Menu, X, ArrowUpRight, Palette } from "lucide-react";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio4Navbar: React.FC<NavbarProps> = ({
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
    { label: "Selected Works", href: "#projects" },
    { label: "Design Process", href: "#about" },
    { label: "Kind Words", href: "#testimonials" },
    { label: "Get in Touch", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & Multiplayer Cursor Tag */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-indigo-600 font-bold text-sm">
              <Palette className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900 tracking-tight">
                <Editable
                  value={p.brand || "Hassan Rehan"}
                  onChange={(val) => handleUpdate("brand", val)}
                />
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              <Editable
                value={p.role || "Senior Product & Brand Designer"}
                onChange={(val) => handleUpdate("role", val)}
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-indigo-600 transition-colors relative py-1 group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-indigo-600 transition-all shadow-md shadow-slate-900/10 hover:shadow-indigo-500/25 flex items-center gap-1.5 hover:-translate-y-0.5"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl text-slate-700 border border-slate-200 hover:bg-slate-50"
          aria-label="Toggle Navigation"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 border-b border-slate-100"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="w-full text-center py-3 rounded-full bg-slate-900 text-white text-xs font-semibold block"
            >
              Start a Project
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default DesignerPortfolio4Navbar;
