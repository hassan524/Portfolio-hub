// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaWhatsapp, FaHeart } from "react-icons/fa6";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite1Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#FFF5F7";
  const ink = theme.ink || "#361D24";
  const accent = theme.accent || "#F472B6";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <footer
      className="relative w-full pt-16 pb-12 border-t overflow-hidden"
      style={{
        backgroundColor: "#FFEBEF",
        borderColor: "rgba(244, 114, 182, 0.25)",
        color: ink,
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Top Atelier Identity Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-pink-200/70">
          
          <div className="flex items-center gap-4 text-center md:text-left">
            {/* Adorable Teddy Bear SVG icon */}
            <div className="w-12 h-12 rounded-2xl bg-white border border-pink-300 flex items-center justify-center shadow-xs">
              <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8">
                <circle cx="9" cy="9" r="4.5" fill="#D98A72" />
                <circle cx="27" cy="9" r="4.5" fill="#D98A72" />
                <ellipse cx="18" cy="18" rx="10.5" ry="9.5" fill="#E8A590" />
                <ellipse cx="18" cy="20.5" rx="4.5" ry="3.5" fill="#FFF0F3" />
                <circle cx="14" cy="16" r="1.3" fill="#361D24" />
                <circle cx="22" cy="16" r="1.3" fill="#361D24" />
                <ellipse cx="18" cy="19.5" rx="1.6" ry="1.2" fill="#361D24" />
                <circle cx="11.5" cy="19" r="1.8" fill="#F472B6" opacity="0.6" />
                <circle cx="24.5" cy="19" r="1.8" fill="#F472B6" opacity="0.6" />
                <path d="M15 27.5c-2-1.5-2.5-3.5 0-3.5 1.5 0 2.5 1.5 3 2 0.5-0.5 1.5-2 3-2 2.5 0 2 2 0 3.5-1.5 1-2.5 0.5-3-0.5-0.5 1-1.5 1.5-3 0.5z" fill="#E11D48" />
              </svg>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-pink-950 flex items-center gap-1.5">
                <Editable value={p.brandTitle || "Petite Heirloom Studio"} onChange={(v) => handleUpdate("brandTitle", v)} />
                <span className="text-pink-500 text-xs">♡</span>
              </h3>
              <p className="text-xs text-pink-800/80">
                <Editable value={p.brandSub || "Slow-crafted bridal treasures, teddy bears & botanicals"} onChange={(v) => handleUpdate("brandSub", v)} />
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-pink-300 flex items-center justify-center text-emerald-700 hover:text-emerald-950 hover:bg-emerald-50 transition-colors shadow-xs text-sm"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>

        </div>

        {/* Navigation & Small Print */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-pink-900/70">
          <div className="flex flex-wrap items-center gap-6 font-medium">
            <a href="#about" className="hover:text-pink-950 transition-colors">Our Craft</a>
            <a href="#projects" className="hover:text-pink-950 transition-colors">Bespoke Collection</a>
            <a href="#testimonials" className="hover:text-pink-950 transition-colors">Bride Stories</a>
            <a href="#contact" className="hover:text-pink-950 transition-colors">Direct Inquiries</a>
          </div>

          <p className="text-center sm:text-right">
            Handmade with love in Charleston, SC • Worldwide Tracked Shipping • © {new Date().getFullYear()} Petite Heirloom
          </p>
        </div>

      </div>
    </footer>
  );
};

export default WeddingWebsite1Footer;
