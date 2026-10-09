// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Flame, Menu, X, ShieldAlert } from "lucide-react";

interface NavbarProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym2Navbar: React.FC<NavbarProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const p = { ...data, ...props };

  const bg = theme.bg || "#080808";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#121212";
  const text = theme.text || theme.ink || "#FFFFFF";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#A1A1AA";
  const accent = theme.accent || "#FF2E2E";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const defaultLinks = [
    { label: "HOME", href: "#hero" },
    { label: "MANIFESTO", href: "#about" },
    { label: "DIVISIONS", href: "#programs" },
    { label: "CHAMPIONS", href: "#testimonials" },
    { label: "DAY PASS", href: "#contact" },
  ];

  const links = p.links && p.links.length > 0 ? p.links : defaultLinks;

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300 border-b backdrop-blur-xl"
      style={{
        backgroundColor: `${bg}F2`,
        borderColor: `${accent}30`,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between font-mono">
        {/* Brand Logo with Flame Icon - Iron Temple matching Image 2 */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
            style={{
              backgroundColor: "rgba(255, 46, 46, 0.15)",
              borderColor: accent,
              color: accent,
            }}
          >
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-widest uppercase text-white font-sans">
            <Editable
              value={p.brandName || "IRON TEMPLE"}
              onChange={(val: string) => handleUpdate("brandName", val)}
            />
          </span>
        </a>

        {/* Desktop Links in Uppercase Condensed Style */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-300 hover:text-white transition-colors py-1 relative"
            >
              <Editable
                value={link.label}
                onChange={(val: string) => handleUpdate(`links.${idx}.label`, val)}
              />
            </a>
          ))}
        </nav>

        {/* Action Button - Fiery Glowing Red Button matching Image 2 */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={p.ctaLink || "#contact"}
            className="px-6 py-2.5 rounded font-black text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,46,46,0.6)] hover:scale-[1.02] active:scale-95 cursor-pointer border"
            style={{
              backgroundColor: accent,
              borderColor: accent,
              color: "#FFFFFF",
              boxShadow: "0 0 15px rgba(255, 46, 46, 0.4)",
            }}
          >
            <Editable
              value={p.ctaText || "START FREE TRIAL"}
              onChange={(val: string) => handleUpdate("ctaText", val)}
            />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded border border-white/20 text-white"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b px-6 py-6 space-y-4 font-mono"
          style={{ backgroundColor: bgSecond, borderColor: `${accent}30` }}
        >
          <div className="flex flex-col gap-3">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest font-bold text-neutral-300 py-2 border-b border-white/10"
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
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded font-black text-xs uppercase tracking-widest text-center block text-white"
              style={{ backgroundColor: accent }}
            >
              START FREE TRIAL
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default FitnessBrandGym2Navbar;
