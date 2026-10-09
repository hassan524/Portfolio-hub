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

export const DesignerPortfolio2Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#07070D";
  const text = theme.text || theme.ink || "#EEF0FF";
  const muted = theme["text-second"] || "#8B8FA8";
  const accent = theme.accent || "#7C9DFF";
  const accent2 = theme["accent-second"] || "#C084FC";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <footer
      className="w-full py-16 font-['Poppins',sans-serif] border-t"
      style={{ background: bg, borderColor: `${text}15`, color: muted }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b" style={{ borderColor: `${text}10` }}>
          <div className="flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold"
              style={{ background: `linear-gradient(135deg, ${accent}, ${accent2})`, color: bg }}
            >
              NR
            </span>
            <div>
              <span className="text-base font-bold tracking-tight block text-white">
                <Editable value={p.brandName || "Nova Reyes"} onChange={(v) => handleUpdate("brandName", v)} />
              </span>
              <span className="text-[11px] block" style={{ color: muted }}>
                Senior Staff Product & Systems Designer
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-xs font-medium" style={{ color: text }}>
            <a href="#home" className="hover:text-cyan-300 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-300 transition-colors">About</a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors">Projects</a>
            <a href="#testimonials" className="hover:text-cyan-300 transition-colors">Testimonials</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">Contact</a>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs text-[11px]">
          <p>© {new Date().getFullYear()} Nova Reyes. Designed & built with craft. All rights reserved.</p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 transition-transform hover:-translate-y-1 text-white font-semibold"
          >
            <span>Back to top</span>
            <FaArrowUp className="text-xs" style={{ color: accent }} />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default DesignerPortfolio2Footer;
