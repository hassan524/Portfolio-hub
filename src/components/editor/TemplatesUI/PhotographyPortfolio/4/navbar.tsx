// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Camera, Disc, Menu, X, Radio } from "lucide-react";

interface NavbarProps {
  theme?: Record<string, string>;
  data?: {
    brandName?: string;
    brandSub?: string;
    ctaText?: string;
    ctaLink?: string;
    viewfinderStatus?: string;
    links?: Array<{ label: string; href: string }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio4Navbar: React.FC<NavbarProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const bg = theme.bg || "#0A0B0E";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#13151A";
  const text = theme.text || theme.ink || "#F3F4F6";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#9CA3AF";
  const accent = theme.accent || "#E53E3E";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const defaultLinks = [
    { label: "Sequences", href: "#archives" },
    { label: "Productions", href: "#services" },
    { label: "Manifesto", href: "#about" },
    { label: "Collaborators", href: "#testimonials" },
    { label: "Terminal", href: "#contact" },
  ];

  const links = data.links && data.links.length > 0 ? data.links : defaultLinks;

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300 border-b backdrop-blur-xl"
      style={{
        backgroundColor: `${bg}F2`,
        borderColor: `${accent}30`,
        color: text,
      }}
    >
      {/* Viewfinder Telemetry Bar */}
      <div
        className="py-1 px-6 md:px-12 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest border-b"
        style={{
          backgroundColor: bgSecond,
          borderColor: `${accent}20`,
          color: textSecond,
        }}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium" style={{ color: accent }}>
            <span className="w-2 h-2 rounded-full animate-ping inline-block" style={{ backgroundColor: accent }} />
            <span>● REC</span>
          </span>
          <span className="hidden sm:inline">24.00 FPS • SHUTTER 1/48</span>
          <span className="hidden md:inline">ISO 800 • KODAK 5219</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-semibold" style={{ color: text }}>
            <Editable
              value={data.viewfinderStatus || "EXP: 36/36 • RAW 14-BIT"}
              onChange={(val: string) => onUpdate?.("viewfinderStatus", val)}
            />
          </span>
          <span className="hidden sm:inline" style={{ color: accent }}>[ VIEWPORT ENGAGED ]</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Brand with HUD Focus Reticle */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded flex items-center justify-center border font-mono font-bold text-sm tracking-wider transition-all group-hover:scale-105"
            style={{
              backgroundColor: bgSecond,
              borderColor: accent,
              color: accent,
            }}
          >
            [N]
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-xl font-mono font-bold tracking-widest uppercase" style={{ color: text }}>
                <Editable
                  value={data.brandName || "NOCTURNE"}
                  onChange={(val: string) => onUpdate?.("brandName", val)}
                />
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold" style={{ backgroundColor: `${accent}25`, color: accent }}>
                35MM
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-[0.2em] block uppercase" style={{ color: textSecond }}>
              <Editable
                value={data.brandSub || "CINEMATIC DARKROOM & STILLS"}
                onChange={(val: string) => onUpdate?.("brandSub", val)}
              />
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs font-mono uppercase tracking-[0.2em] transition-all hover:text-white relative py-1"
              style={{ color: textSecond }}
            >
              <span className="opacity-40 mr-1">0{idx + 1}.</span>
              <Editable
                value={link.label}
                onChange={(val: string) => onUpdate?.(`links.${idx}.label`, val)}
              />
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={data.ctaLink || "#contact"}
            className="px-5 py-2.5 rounded font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 border flex items-center gap-2 hover:shadow-[0_0_20px_rgba(229,62,62,0.4)] active:scale-95 cursor-pointer"
            style={{
              backgroundColor: accent,
              borderColor: accent,
              color: onAccent,
            }}
          >
            <Radio className="w-3.5 h-3.5" />
            <Editable
              value={data.ctaText || "[ INITIATE PROJECT ]"}
              onChange={(val: string) => onUpdate?.("ctaText", val)}
            />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded border transition-colors"
          style={{ borderColor: `${accent}40`, color: text }}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-b px-6 py-6 space-y-4"
          style={{ backgroundColor: bg, borderColor: `${accent}30` }}
        >
          <div className="flex flex-col gap-3 font-mono">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest py-2 border-b flex items-center justify-between"
                style={{ borderColor: `${accent}15`, color: text }}
              >
                <span>
                  <Editable
                    value={link.label}
                    onChange={(val: string) => onUpdate?.(`links.${idx}.label`, val)}
                  />
                </span>
                <span className="text-[10px]" style={{ color: accent }}>0{idx + 1} //</span>
              </a>
            ))}
          </div>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded font-mono text-xs uppercase tracking-widest font-semibold text-center block"
              style={{ backgroundColor: accent, color: onAccent }}
            >
              [ INITIATE PROJECT ]
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default PhotographyPortfolio4Navbar;
