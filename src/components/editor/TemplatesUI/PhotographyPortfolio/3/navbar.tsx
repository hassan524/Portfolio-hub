// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, Menu, X, Heart } from "lucide-react";

interface NavbarProps {
  theme?: Record<string, string>;
  data?: {
    brandName?: string;
    brandSub?: string;
    ctaText?: string;
    ctaLink?: string;
    links?: Array<{ label: string; href: string }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio3Navbar: React.FC<NavbarProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bg = theme.bg || "#FAF7F2";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#F4EFE6";
  const text = theme.text || theme.ink || "#251E19";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#6F665E";
  const accent = theme.accent || "#C5A059";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const defaultLinks = [
    { label: "Love Stories", href: "#stories" },
    { label: "Destinations", href: "#destinations" },
    { label: "Collections", href: "#services" },
    { label: "Philosophy", href: "#about" },
    { label: "Praise", href: "#testimonials" },
    { label: "Inquire", href: "#contact" },
  ];

  const links = data.links && data.links.length > 0 ? data.links : defaultLinks;
  const leftLinks = links.slice(0, 3);
  const rightLinks = links.slice(3);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b"
      style={{
        backgroundColor: `${bg}F0`,
        borderColor: `${accent}25`,
        color: text,
      }}
    >
      {/* Top Banner Ribbon */}
      <div
        className="py-1.5 px-4 text-center text-[11px] uppercase tracking-[0.25em] font-medium transition-colors"
        style={{ backgroundColor: bgSecond, color: accent }}
      >
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" />
          <span>Now Reserving Select 2026 & 2027 European & Global Destination Celebrations</span>
          <Sparkles className="w-3 h-3" />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Desktop Left Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-start">
          {leftLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-light transition-all hover:opacity-60 relative py-1"
              style={{ color: text }}
            >
              <Editable
                value={link.label}
                onChange={(val) => onUpdate?.(`links.${idx}.label`, val)}
              />
            </a>
          ))}
        </nav>

        {/* Center Brand Monogram */}
        <a href="#" className="flex flex-col items-center justify-center group px-4">
          <div className="flex items-center gap-2">
            <span
              className="text-2xl md:text-3xl font-serif font-light tracking-[0.2em] uppercase transition-all duration-300"
              style={{ color: text }}
            >
              <Editable
                value={data.brandName || "AURELIA"}
                onChange={(val) => onUpdate?.("brandName", val)}
              />
            </span>
          </div>
          <span
            className="text-[9px] uppercase tracking-[0.35em] font-light mt-0.5"
            style={{ color: accent }}
          >
            <Editable
              value={data.brandSub || "LUXURY WEDDING & DESTINATION ATELIER"}
              onChange={(val) => onUpdate?.("brandSub", val)}
            />
          </span>
        </a>

        {/* Desktop Right Nav Links & Gold Button */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
          {rightLinks.map((link, idx) => (
            <a
              key={idx + 3}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-light transition-all hover:opacity-60 relative py-1"
              style={{ color: text }}
            >
              <Editable
                value={link.label}
                onChange={(val) => onUpdate?.(`links.${idx + 3}.label`, val)}
              />
            </a>
          ))}

          <a
            href={data.ctaLink || "#contact"}
            className="px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 border shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
            style={{
              backgroundColor: accent,
              color: onAccent,
              borderColor: accent,
            }}
          >
            <Heart className="w-3 h-3 fill-current" />
            <Editable
              value={data.ctaText || "Reserve Date"}
              onChange={(val) => onUpdate?.("ctaText", val)}
            />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full border transition-all"
          style={{ borderColor: `${accent}30`, color: text }}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b px-6 py-8 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300"
          style={{ backgroundColor: bg, borderColor: `${accent}25` }}
        >
          <div className="flex flex-col gap-4 text-center">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.2em] font-light py-2 border-b"
                style={{ borderColor: `${accent}15`, color: text }}
              >
                <Editable
                  value={link.label}
                  onChange={(val) => onUpdate?.(`links.${idx}.label`, val)}
                />
              </a>
            ))}
          </div>
          <div className="pt-4 flex justify-center">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-center shadow-md flex items-center justify-center gap-2"
              style={{ backgroundColor: accent, color: onAccent }}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Reserve Your Wedding Date</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default PhotographyPortfolio3Navbar;
