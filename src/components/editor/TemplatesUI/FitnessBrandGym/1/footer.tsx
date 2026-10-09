// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym1Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#0B0C10";
  const text = theme.text || theme.ink || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="pt-24 pb-12 px-6 md:px-16 lg:px-24 border-t border-white/10 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Monolithic Giant Typography Statement spanning full width */}
        <div className="mb-16 select-none">
          <span className="block text-[13vw] font-black uppercase tracking-tighter leading-none text-white/90 text-center sm:text-left">
            <Editable
              value={p.footerLogo || "EMPOWER"}
              onChange={(val: string) => handleUpdate("footerLogo", val)}
            />
          </span>
        </div>

        {/* Minimal Bottom Bar - Single Horizontal Stream (NO COLUMNS!) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-xs text-neutral-400 font-medium uppercase tracking-widest">
          <div>
            <Editable
              value={p.copyright || `© ${new Date().getFullYear()} EMPOWERGYM NYC. ALL RIGHTS RESERVED.`}
              onChange={(val: string) => handleUpdate("copyright", val)}
            />
          </div>

          <div className="flex items-center gap-8">
            <span className="hidden sm:inline text-neutral-300">
              MEATPACKING DISTRICT • NEW YORK
            </span>
            <span className="text-white">
              OPEN DAILY 05:00 - 23:00
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white hover:text-neutral-300 transition-colors font-bold cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FitnessBrandGym1Footer;
