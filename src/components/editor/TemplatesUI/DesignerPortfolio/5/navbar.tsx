// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, Menu, X, Coffee, Heart } from "lucide-react";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio5Navbar: React.FC<NavbarProps> = ({
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
    { label: "My Craft", href: "#about" },
    { label: "Featured Work", href: "#projects" },
    { label: "Kind Words", href: "#testimonials" },
    { label: "Say Hello", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#1C1210]/90 border-b border-[#FF7A45]/20 text-[#FFF1E6] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Warm Personal Brand Signature */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF7A45] to-[#FFA07A] flex items-center justify-center text-[#1C1210] font-bold text-sm shadow-[0_4px_16px_rgba(255,122,69,0.3)]">
            ☀️
          </div>
          <div>
            <span className="font-semibold text-base text-[#FFF1E6] tracking-tight">
              <Editable
                value={p.brand || "Hassan Rehan"}
                onChange={(val) => handleUpdate("brand", val)}
              />
            </span>
            <div className="text-[11px] text-[#FFA07A] font-medium">
              <Editable
                value={p.role || "Product Designer & Builder"}
                onChange={(val) => handleUpdate("role", val)}
              />
            </div>
          </div>
        </div>

        {/* Floating Sunset Pills */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-[#2A1E1C]/80 border border-[#FF7A45]/20 shadow-inner">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-[#FFF1E6]/80 hover:text-[#FFF1E6] hover:bg-[#FF7A45]/20 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Coffee Chat CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-[#FF7A45] text-[#1C1210] font-semibold text-xs hover:bg-[#FFA07A] hover:shadow-[0_0_20px_rgba(255,122,69,0.4)] transition-all flex items-center gap-1.5"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Grab a Coffee</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl text-[#FFF1E6] hover:bg-[#2A1E1C]"
          aria-label="Toggle Navigation"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-[#1C1210] border-b border-[#FF7A45]/20 px-6 py-6 space-y-3">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-[#FFF1E6]/90 hover:text-[#FF7A45] border-b border-[#2A1E1C]"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[#FF7A45] text-[#1C1210] font-semibold text-xs block"
            >
              Grab a Coffee & Chat
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default DesignerPortfolio5Navbar;
