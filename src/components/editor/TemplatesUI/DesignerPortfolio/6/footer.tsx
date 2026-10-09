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

export const DesignerPortfolio6Footer: React.FC<FooterProps> = ({
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-[#0A0A0A] text-[#F5F5F0] border-t border-[#262626] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#1F1F1F]">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-[#E63946] text-white flex items-center justify-center font-bold text-[10px]">
              +
            </div>
            <div>
              <div className="font-bold text-white tracking-widest uppercase">
                <Editable
                  value={p.brand || "HASSAN REHAN // ZÜRICH"}
                  onChange={(val) => handleUpdate("brand", val)}
                />
              </div>
              <div className="text-[10px] text-[#666]">
                INTERNATIONAL SYSTEMATIC DESIGN PRACTICE
              </div>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[#AAA] hover:text-[#E63946] transition-colors uppercase tracking-wider"
          >
            <span>TOP OF DOCUMENT</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666]">
          <div>
            © {new Date().getFullYear()} Hassan Rehan. ALL RIGHTS RESERVED. SWITZERLAND.
          </div>
          <div className="flex items-center gap-4">
            <span>GRID: 12-COL HELVETICA</span>
            <span>·</span>
            <span>STANDARD: ISO 9241</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default DesignerPortfolio6Footer;
