// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaArrowUp } from "react-icons/fa6";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio1Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme?.bg || "#FFFFFF";
  const text = theme?.text || theme?.ink || "#0F172A";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#2563EB";
  const serif = props.serifFont || '"Inter", -apple-system, sans-serif';

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <footer
      className="w-full py-16 border-t"
      style={{ background: bg, color: textSecond, borderColor: `${textSecond}25` }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        
        {/* Top Colophon Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b" style={{ borderColor: `${textSecond}20` }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-light italic text-white" style={{ fontFamily: serif }}>
                <Editable value={p.brandName || "Alex Morgan"} onChange={(v) => handleUpdate("brandName", v)} />
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
            </div>
            <p className="text-xs max-w-sm font-light">
              Independent designer working across brand identity, digital products, and editorial publications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium" style={{ color: text }}>
            <a href="#home" className="hover:text-amber-500 transition-colors">Intro</a>
            <a href="#about-section" className="hover:text-amber-500 transition-colors">Practice</a>
            <a href="#works-archive" className="hover:text-amber-500 transition-colors">Archive</a>
            <a href="#testimonials-archive" className="hover:text-amber-500 transition-colors">Observations</a>
            <a href="#contact-section" className="hover:text-amber-500 transition-colors">Contact</a>
          </div>
        </div>

        {/* Bottom Colophon Legal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-[11px]">
          <p>© {new Date().getFullYear()} Alex Morgan. All typographic and visual rights reserved.</p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5"
            style={{ color: text }}
          >
            <span>Begin again</span>
            <FaArrowUp className="text-xs" style={{ color: accent }} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default DesignerPortfolio1Footer;
