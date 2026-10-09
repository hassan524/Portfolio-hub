// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUp, Heart } from "lucide-react";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio5Footer: React.FC<FooterProps> = ({
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
    <footer className="py-12 bg-[#1C1210] text-[#FFF1E6] border-t border-[#FF7A45]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl">☀️</span>
            <div>
              <div className="font-bold text-sm text-[#FFF1E6]">
                <Editable
                  value={p.brand || "Hassan Rehan"}
                  onChange={(val) => handleUpdate("brand", val)}
                />
              </div>
              <div className="text-xs text-[#FFA07A]">
                Crafting digital experiences with care & warmth
              </div>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2A1E1C] border border-[#FF7A45]/30 text-xs text-[#FFA07A] hover:text-[#FFF1E6] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 border-t border-[#FF7A45]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FEE4D7]/60">
          <div>
            © {new Date().getFullYear()} Hassan Rehan. Designed with warmth & curiosity.
          </div>
          <div className="flex items-center gap-1">
            <span>Built with React & love for good design</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default DesignerPortfolio5Footer;
