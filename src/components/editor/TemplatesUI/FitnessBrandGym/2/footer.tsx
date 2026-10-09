// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Flame, ArrowUp, MapPin } from "lucide-react";
import { FaInstagram, FaYoutube, FaDiscord } from "react-icons/fa";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym2Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const defaultLinks = [
    { label: "HEADQUARTERS", href: "#hero" },
    { label: "THE MANIFESTO", href: "#about" },
    { label: "LIFTING DIVISIONS", href: "#programs" },
    { label: "HALL OF CHAMPIONS", href: "#testimonials" },
    { label: "CLAIM DAY PASS", href: "#contact" },
  ];

  const links = p.links && p.links.length > 0 ? p.links : defaultLinks;

  return (
    <footer
      className="pt-20 pb-12 px-6 md:px-16 lg:px-24 border-t border-neutral-900 transition-colors duration-300 font-mono"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-[#FF2E2E]" />
                <span className="text-2xl font-black tracking-widest uppercase text-white font-sans">
                  <Editable
                    value={p.brandName || "IRON TEMPLE"}
                    onChange={(val: string) => handleUpdate("brandName", val)}
                  />
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed max-w-sm mb-6">
                <Editable
                  value={
                    p.tagline ||
                    "Calibrated steel plates, competitive powerlifting monolifts, and raw high-intensity brotherhood. Zero excuses allowed."
                  }
                  onChange={(val: string) => handleUpdate("tagline", val)}
                />
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
              <MapPin className="w-4 h-4 text-[#FF2E2E]" />
              <span>1804 Industrial Way, South Docklands, Chicago, IL</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-widest font-black text-[#FF3B30] mb-6">
              // COMPOUND INDEX
            </h4>
            <ul className="space-y-3 text-xs uppercase tracking-wider text-neutral-400">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
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
            <h4 className="text-[11px] uppercase tracking-widest font-black text-[#FF3B30] mb-6">
              // TEMPLE FEED
            </h4>
            <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed mb-6">
              Competition live streams, daily heavy PR broadcasts, and technique analysis.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded border border-neutral-800 flex items-center justify-center text-white hover:border-[#FF2E2E] hover:scale-105 transition-all"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded border border-neutral-800 flex items-center justify-center text-white hover:border-[#FF2E2E] hover:scale-105 transition-all"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded border border-neutral-800 flex items-center justify-center text-white hover:border-[#FF2E2E] hover:scale-105 transition-all"
              >
                <FaDiscord className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-neutral-500 uppercase tracking-widest">
          <p>
            <Editable
              value={p.copyright || `© ${new Date().getFullYear()} IRON TEMPLE ATHLETICS. ALL REPS REGISTERED.`}
              onChange={(val: string) => handleUpdate("copyright", val)}
            />
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white hover:text-[#FF3B30] transition-colors uppercase font-black text-xs cursor-pointer"
          >
            <span>[ RETURN TO ROOF ]</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FitnessBrandGym2Footer;
