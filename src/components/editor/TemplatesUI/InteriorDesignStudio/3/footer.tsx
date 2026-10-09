// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const InteriorDesignStudio3Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#080808";
  const ink = theme.ink || "#FFFFFF";
  const accent = theme.accent || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <footer
      className="relative px-6 md:px-12 lg:px-16 py-16 border-t border-white/10"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-10 border-b border-white/10">
        <div>
          <span
            className="text-2xl sm:text-3xl font-normal uppercase tracking-tight text-white block"
            style={{ fontFamily: "'Times New Roman', Times, serif, system-ui" }}
          >
            <Editable value={p.fTitle || "ADRIA VALE ARCHITECTURE"} onChange={(v) => handleUpdate("fTitle", v)} />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 mt-2 block">
            <Editable value={p.fSub || "SPATIAL STRATEGY • BESPOKE RESIDENCES • SWISS RIGOR"} onChange={(v) => handleUpdate("fSub", v)} />
          </span>
        </div>

        <div className="flex items-center gap-8 font-mono text-xs text-zinc-400">
          <a href="#hero" className="hover:text-white transition-colors">[INDEX]</a>
          <a href="#projects" className="hover:text-white transition-colors">[ARCHIVE]</a>
          <a href="#about" className="hover:text-white transition-colors">[STUDIO]</a>
          <a href="#contact" className="hover:text-white transition-colors">[COMMISSION]</a>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
        <p>© {new Date().getFullYear()} ADRIA VALE ATELIER GMBH. ALL SPATIAL WORKS ARCHIVED.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaPinterestP />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default InteriorDesignStudio3Footer;
