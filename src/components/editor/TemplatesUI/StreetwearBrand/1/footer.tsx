// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaBarcode, FaBolt } from "react-icons/fa6";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand1Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <footer className="w-full bg-[#060608] text-slate-500 py-16 font-mono text-xs border-t border-rose-950/80">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Top Colophon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-rose-950/60">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <FaBarcode className="text-rose-500 text-2xl" />
              <span className="text-white text-base font-bold font-mono tracking-tight">
                <Editable value={p.brandName || "KURO // ZERO ARCHIVE"} onChange={(v) => handleUpdate("brandName", v)} />
              </span>
            </div>
            <p className="text-slate-400 max-w-md font-light text-[11px]">
              Heavyweight technical apparel constructed in Tokyo & Wakayama. All drops are produced once and archived permanently.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-rose-400">
              <FaBolt className="text-xs" />
              WAKAYAMA LOOMED
            </span>
            <span>JAPANESE EXCELLA HARDWARE</span>
            <span>SHIBUYA 150-0041</span>
          </div>
        </div>

        {/* Links & Legal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-[11px]">
          <div className="flex flex-wrap items-center gap-6">
            <a href="#about" className="hover:text-rose-400 transition-colors">Manifesto</a>
            <a href="#projects" className="hover:text-rose-400 transition-colors">Capsule Drop</a>
            <a href="#testimonials" className="hover:text-rose-400 transition-colors">Collector Reports</a>
            <a href="#contact" className="hover:text-rose-400 transition-colors">Atelier Access</a>
          </div>

          <p>© {new Date().getFullYear()} Kuro // System Zero Co. All architectural garment rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default StreetwearBrand1Footer;
