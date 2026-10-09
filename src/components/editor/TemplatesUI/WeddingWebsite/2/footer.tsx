// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa6";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const WeddingWebsite2Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#FAF7FD";
  const ink = theme.ink || "#201235";
  const accent = theme.accent || "#8B5CF6";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <footer
      className="relative w-full pt-16 pb-12 border-t bg-white overflow-hidden"
      style={{
        borderColor: "rgba(139, 92, 246, 0.2)",
        color: ink,
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">

        {/* Top Identity Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-purple-100">

          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center shadow-xs">
              <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
                <circle cx="20" cy="20" r="18" fill="#EDE9FE" />
                <circle cx="20" cy="20" r="15" fill="#FAF5FF" stroke="#C4B5FD" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="12" y1="28" x2="28" y2="12" stroke="#6D28D9" strokeWidth="1.8" strokeLinecap="round" />
                <ellipse cx="26" cy="14" rx="1.5" ry="0.8" transform="rotate(-45 26 14)" fill="#FAF5FF" stroke="#6D28D9" strokeWidth="0.8" />
                <path d="M26 14 C32 8, 36 20, 28 26 C20 32, 10 24, 18 18" stroke="#8B5CF6" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <circle cx="21" cy="21" r="2.2" fill="#8B5CF6" />
                <circle cx="19" cy="19" r="1.6" fill="#C4B5FD" />
                <circle cx="23" cy="23" r="1.6" fill="#C4B5FD" />
              </svg>
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-purple-950 flex items-center gap-1.5">
                <Editable value={p.footerName || "Maison Violette Atelier"} onChange={(v) => handleUpdate("footerName", v)} />
                <span className="text-purple-500 text-xs">✦</span>
              </h3>
              <p className="text-xs text-purple-800/80">
                <Editable value={p.footerSub || "Bespoke Wedding Cards, Stationery & Haute Confections"} onChange={(v) => handleUpdate("footerSub", v)} />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-emerald-700 hover:text-emerald-950 hover:bg-emerald-50 transition-colors shadow-xs text-sm"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>

        </div>

        {/* Navigation & Small Print */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-purple-900/70">
          <div className="flex flex-wrap items-center gap-6 font-medium">
            <a href="#about" className="hover:text-purple-950 transition-colors">The Atelier</a>
            <a href="#projects" className="hover:text-purple-950 transition-colors">Handcrafted Pieces</a>
            <a href="#testimonials" className="hover:text-purple-950 transition-colors">Bride Acclaim</a>
            <a href="#contact" className="hover:text-purple-950 transition-colors">Direct Commission</a>
          </div>

          <p className="text-center sm:text-right">
            Handcrafted in Provence, France • Worldwide Express Delivery • © {new Date().getFullYear()} Maison Violette
          </p>
        </div>

      </div>
    </footer>
  );
};

export default WeddingWebsite2Footer;
