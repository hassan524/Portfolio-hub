// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, Menu, X } from "lucide-react";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym3Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const p = { ...data, ...props };

  const bg = theme.bg || "#FAF8F5";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#F1ECE4";
  const text = theme.text || theme.ink || "#1A1A1A";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#666057";
  const accent = theme.accent || "#FF4D24";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const defaultLinks = [
    { label: "Home", href: "#hero" },
    { label: "Philosophy", href: "#about" },
    { label: "Disciplines", href: "#disciplines" },
    { label: "Community", href: "#community" },
    { label: "Studio Tour", href: "#join" },
  ];

  const links = p.links && p.links.length > 0 ? p.links : defaultLinks;

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300 border-b backdrop-blur-md"
      style={{
        backgroundColor: `${bg}E6`,
        borderColor: "rgba(26, 26, 26, 0.08)",
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Brand Name - VYRA matching Image 3 */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-2xl md:text-3xl font-black tracking-tight uppercase" style={{ color: text }}>
            <Editable
              value={p.brandName || "VYRA"}
              onChange={(val: string) => handleUpdate("brandName", val)}
            />
          </span>
        </a>

        {/* Desktop Links in Clean Modern Grotesque */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs uppercase tracking-widest font-semibold transition-colors duration-200 hover:opacity-60 py-1"
              style={{ color: textSecond }}
            >
              <Editable
                value={link.label}
                onChange={(val: string) => handleUpdate(`links.${idx}.label`, val)}
              />
            </a>
          ))}
        </nav>

        {/* Action Button - Terracotta rounded button matching Image 3 */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={p.ctaLink || "#join"}
            className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer shadow-sm text-white"
            style={{ backgroundColor: accent }}
          >
            <Editable
              value={p.ctaText || "Join Club"}
              onChange={(val: string) => handleUpdate("ctaText", val)}
            />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded text-neutral-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-6 py-6 border-b space-y-4"
          style={{ backgroundColor: bgSecond, borderColor: "rgba(26, 26, 26, 0.1)" }}
        >
          <div className="flex flex-col gap-3">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider py-2 border-b border-black/5"
                style={{ color: text }}
              >
                <Editable
                  value={link.label}
                  onChange={(val: string) => handleUpdate(`links.${idx}.label`, val)}
                />
              </a>
            ))}
          </div>
          <div className="pt-2">
            <a
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider text-center block text-white"
              style={{ backgroundColor: accent }}
            >
              Join Club
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default FitnessBrandGym3Navbar;
