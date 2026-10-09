// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUp, MapPin, Globe } from "lucide-react";
import { FaInstagram, FaTwitter, FaSpotify } from "react-icons/fa";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym3Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const defaultLinks = [
    { label: "Home", href: "#hero" },
    { label: "Movement Philosophy", href: "#about" },
    { label: "Disciplines", href: "#disciplines" },
    { label: "Member Voices", href: "#community" },
    { label: "Studio Orientation", href: "#join" },
  ];

  const links = p.links && p.links.length > 0 ? p.links : defaultLinks;

  return (
    <footer
      className="pt-20 pb-12 px-6 md:px-16 lg:px-24 border-t border-black/5 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      {/* Huge Subtle Watermark in Background matching Image 3 VYRA branding */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-black text-[18vw] leading-none text-black/[0.03] select-none pointer-events-none tracking-widest whitespace-nowrap">
        V Y R A
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-black/10">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-3xl font-black uppercase tracking-tight text-neutral-900 block mb-2">
                <Editable
                  value={p.brandName || "VYRA"}
                  onChange={(val: string) => handleUpdate("brandName", val)}
                />
              </span>
              <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-sm mb-6">
                <Editable
                  value={
                    p.tagline ||
                    "An athletic and mindful movement sanctuary integrating strength conditioning, cold plunge recovery, and community energy."
                  }
                  onChange={(val: string) => handleUpdate("tagline", val)}
                />
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
              <Globe className="w-4 h-4 text-[#FF4D24]" />
              <span>Studios in London • Zurich • Melbourne</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-900 mb-6">
              Studio Index
            </h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-neutral-900 transition-colors"
                  >
                    <Editable
                      value={link.label}
                      onChange={(val: string) =>
                        handleUpdate(`links.${idx}.label`, val)
                      }
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-900 mb-6">
              Movement Dispatch
            </h4>
            <p className="text-xs text-neutral-600 font-light leading-relaxed mb-6">
              Weekly class playlists, run club schedule announcements, and recovery insights.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-neutral-800 hover:text-[#FF4D24] hover:scale-105 transition-all shadow-sm"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-neutral-800 hover:text-[#FF4D24] hover:scale-105 transition-all shadow-sm"
              >
                <FaSpotify className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-neutral-800 hover:text-[#FF4D24] hover:scale-105 transition-all shadow-sm"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            <Editable
              value={p.copyright || `© ${new Date().getFullYear()} VYRA Athletic Club. All rights reserved.`}
              onChange={(val: string) => handleUpdate("copyright", val)}
            />
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-800 hover:text-[#FF4D24] transition-colors uppercase font-bold text-xs cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FitnessBrandGym3Footer;
