// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Compass, ArrowUp, ShieldCheck } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

interface FooterProps {
  theme?: Record<string, string>;
  data?: {
    brandName?: string;
    brandSub?: string;
    description?: string;
    copyright?: string;
    locationNote?: string;
    links?: Array<{ label: string; href: string }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio2Footer: React.FC<FooterProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#F4F6F0";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#E8ECE2";
  const text = theme.text || theme.ink || "#222D22";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#556455";
  const accent = theme.accent || "#3E5338";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const defaultLinks = [
    { label: "Selected Works", href: "#works" },
    { label: "Architectural Archives", href: "#works" },
    { label: "Commissions & Editions", href: "#services" },
    { label: "Studio Philosophy", href: "#about" },
    { label: "Hahnemühle Provenance", href: "#about" },
    { label: "Acquisition Contact", href: "#contact" },
  ];

  const links = data.links && data.links.length > 0 ? data.links : defaultLinks;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="pt-20 pb-12 px-6 md:px-12 lg:px-20 border-t transition-colors duration-300"
      style={{
        backgroundColor: bgSecond,
        borderColor: `${accent}25`,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b" style={{ borderColor: `${accent}20` }}>
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-light"
                  style={{ backgroundColor: accent, color: onAccent }}
                >
                  S
                </div>
                <div>
                  <h3 className="text-xl font-serif tracking-widest uppercase font-medium" style={{ color: text }}>
                    <Editable
                      value={data.brandName || "SOLIS"}
                      onChange={(val: string) => onUpdate?.("brandName", val)}
                    />
                  </h3>
                  <span className="text-[10px] tracking-[0.25em] uppercase font-light block" style={{ color: textSecond }}>
                    <Editable
                      value={data.brandSub || "ATELIER FOR NATURE & FORM"}
                      onChange={(val: string) => onUpdate?.("brandSub", val)}
                    />
                  </span>
                </div>
              </div>
              <p className="text-sm font-light leading-relaxed max-w-sm" style={{ color: textSecond }}>
                <Editable
                  value={
                    data.description ||
                    "Exploring tectonic permanence and organic silence through large-format silver gelatin craft and architectural surveys worldwide."
                  }
                  onChange={(val: string) => onUpdate?.("description", val)}
                />
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs" style={{ color: textSecond }}>
              <ShieldCheck className="w-4 h-4" style={{ color: accent }} />
              <span>Certified Hahnemühle FineArt Print Studio Lab</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium mb-6" style={{ color: accent }}>
              Navigation & Index
            </h4>
            <ul className="space-y-3">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm font-light transition-colors duration-200 hover:opacity-70"
                    style={{ color: text }}
                  >
                    <Editable
                      value={link.label}
                      onChange={(val: string) => onUpdate?.(`links.${idx}.label`, val)}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collector Gazette Signup & Coordinates */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium mb-6" style={{ color: accent }}>
              Collector Gazette
            </h4>
            <p className="text-xs font-light leading-relaxed mb-4" style={{ color: textSecond }}>
              Receive quarterly private preview catalogs for newly released limited editions and biennial monographs.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="collector@domain.com"
                className="w-full px-4 py-2.5 rounded-lg border bg-transparent text-xs focus:outline-none"
                style={{
                  borderColor: `${accent}35`,
                  color: text,
                }}
              />
              <button
                type="button"
                className="px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium cursor-pointer shrink-0 transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: accent,
                  color: onAccent,
                }}
              >
                Join
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full border transition-all hover:scale-105"
                style={{ borderColor: `${accent}30`, color: text }}
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full border transition-all hover:scale-105"
                style={{ borderColor: `${accent}30`, color: text }}
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full border transition-all hover:scale-105"
                style={{ borderColor: `${accent}30`, color: text }}
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light" style={{ color: textSecond }}>
          <p>
            <Editable
              value={data.copyright || `© ${new Date().getFullYear()} Solis Atelier. All rights reserved. Archival preservation rights reserved.`}
              onChange={(val: string) => onUpdate?.("copyright", val)}
            />
          </p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" style={{ color: accent }} />
              <Editable
                value={data.locationNote || "64°08'47\"N 21°55'48\"W — Reykjavík"}
                onChange={(val: string) => onUpdate?.("locationNote", val)}
              />
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer font-medium"
              style={{ color: text }}
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PhotographyPortfolio2Footer;
