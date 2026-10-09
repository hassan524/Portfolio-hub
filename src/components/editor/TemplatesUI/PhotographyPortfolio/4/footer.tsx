// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Terminal, ArrowUp, Disc, Radio } from "lucide-react";
import { FaInstagram, FaTwitter } from "react-icons/fa";

interface FooterProps {
  theme?: Record<string, string>;
  data?: {
    brandName?: string;
    brandSub?: string;
    description?: string;
    copyright?: string;
    coordinates?: string;
    links?: Array<{ label: string; href: string }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio4Footer: React.FC<FooterProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#0A0B0E";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#13151A";
  const text = theme.text || theme.ink || "#F3F4F6";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#9CA3AF";
  const accent = theme.accent || "#E53E3E";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const defaultLinks = [
    { label: "Sequences & Archives", href: "#archives" },
    { label: "Commission Tiers", href: "#services" },
    { label: "Darkroom Manifesto", href: "#about" },
    { label: "Client Records", href: "#testimonials" },
    { label: "Secure Uplink", href: "#contact" },
  ];

  const links = data.links && data.links.length > 0 ? data.links : defaultLinks;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="pt-20 pb-12 px-6 md:px-12 lg:px-20 border-t font-mono transition-colors duration-300"
      style={{
        backgroundColor: bg,
        borderColor: `${accent}30`,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b" style={{ borderColor: `${accent}20` }}>
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded flex items-center justify-center font-bold text-xs border" style={{ backgroundColor: bgSecond, borderColor: accent, color: accent }}>
                  [N]
                </span>
                <span className="text-xl font-bold uppercase tracking-widest" style={{ color: text }}>
                  <Editable
                    value={data.brandName || "NOCTURNE"}
                    onChange={(val: string) => onUpdate?.("brandName", val)}
                  />
                </span>
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase block mb-4" style={{ color: accent }}>
                <Editable
                  value={data.brandSub || "ANALOG DARKROOM & UNIT STILLS"}
                  onChange={(val: string) => onUpdate?.("brandSub", val)}
                />
              </span>
              <p className="text-xs font-sans font-light leading-relaxed max-w-sm" style={{ color: textSecond }}>
                <Editable
                  value={
                    data.description ||
                    "Preserving the cinematic weight of physical emulsions, subterranean light, and raw music culture across Tokyo, Berlin, and New York."
                  }
                  onChange={(val: string) => onUpdate?.("description", val)}
                />
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[10px]" style={{ color: textSecond }}>
              <Radio className="w-3.5 h-3.5" style={{ color: accent }} />
              <Editable
                value={data.coordinates || "REEL TC: 00:48:12:16 • BERLIN / TOKYO / NYC"}
                onChange={(val: string) => onUpdate?.("coordinates", val)}
              />
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-widest font-bold mb-6" style={{ color: accent }}>
              // ARCHIVE INDEX
            </h4>
            <ul className="space-y-3">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-wider transition-opacity hover:opacity-60"
                    style={{ color: text }}
                  >
                    <span className="opacity-30 mr-1.5">0{idx + 1}</span>
                    <Editable
                      value={link.label}
                      onChange={(val: string) => onUpdate?.(`links.${idx}.label`, val)}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Signal Dispatch Links */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-widest font-bold mb-6" style={{ color: accent }}>
              // FEED FREQUENCY
            </h4>
            <p className="text-xs font-sans font-light leading-relaxed mb-6" style={{ color: textSecond }}>
              Uncut darkroom contact sheets, 35mm film scans, and production stills transmitted weekly.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded border transition-all hover:scale-105"
                style={{ borderColor: `${accent}40`, backgroundColor: bgSecond, color: text }}
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded border transition-all hover:scale-105"
                style={{ borderColor: `${accent}40`, backgroundColor: bgSecond, color: text }}
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="px-4 py-2.5 rounded border text-xs uppercase tracking-wider flex items-center gap-2"
                style={{ borderColor: `${accent}40`, backgroundColor: bgSecond, color: accent }}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>SSH Uplink</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]" style={{ color: textSecond }}>
          <p>
            <Editable
              value={data.copyright || `© ${new Date().getFullYear()} NOCTURNE LABS. ALL REELS RESERVED. KODAK & LEICA ARE RESPECTIVE TRADEMARKS.`}
              onChange={(val: string) => onUpdate?.("copyright", val)}
            />
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:opacity-75 transition-opacity cursor-pointer uppercase font-bold"
            style={{ color: accent }}
          >
            <span>[^ RETURN TO APERTURE]</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default PhotographyPortfolio4Footer;
