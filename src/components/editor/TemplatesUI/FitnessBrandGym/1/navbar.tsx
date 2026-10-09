// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym1Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const p = { ...data, ...props };

  const bg = theme.bg || "#0B0C10";
  const text = theme.text || theme.ink || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const defaultLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Exercise", href: "#exercise" },
  ];

  const links = p.links && p.links.length > 0 ? p.links : defaultLinks;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-white/5"
      style={{
        backgroundColor: `${bg}CC`,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-5 flex items-center justify-between">
        {/* Brand Name - Clean, straightforward sans matching Image 1 */}
        <a href="#hero" className="flex items-center">
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
            <Editable
              value={p.brandName || "EmpowerGYM"}
              onChange={(val: string) => handleUpdate("brandName", val)}
            />
          </span>
        </a>

        {/* Center Simple Text Links - matching Image 1: Home, About, Exercise */}
        <nav className="hidden md:flex items-center gap-12">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-sm font-normal text-neutral-300 hover:text-white transition-colors"
            >
              <Editable
                value={link.label}
                onChange={(val: string) => handleUpdate(`links.${idx}.label`, val)}
              />
            </a>
          ))}
        </nav>

        {/* Right CTA Button - Crisp solid white rectangular button matching Image 1 */}
        <div className="hidden md:flex items-center">
          <a
            href={p.ctaLink || "#contact"}
            className="px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all active:scale-95 shadow-sm"
          >
            <Editable
              value={p.ctaText || "Get Started"}
              onChange={(val: string) => handleUpdate("ctaText", val)}
            />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-6 border-b border-white/10 bg-[#0B0C10]">
          <div className="flex flex-col gap-4 text-center">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-neutral-300 py-2 border-b border-white/5"
              >
                <Editable
                  value={link.label}
                  onChange={(val: string) => handleUpdate(`links.${idx}.label`, val)}
                />
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded font-bold text-xs uppercase tracking-wider bg-white text-black mt-2"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default FitnessBrandGym1Navbar;
