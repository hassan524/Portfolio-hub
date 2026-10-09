// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUp, Palette, Sparkles, Heart } from "lucide-react";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio4Footer: React.FC<FooterProps> = ({
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
    <footer className="py-16 bg-white text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Footer Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-base text-slate-900">
                <Editable
                  value={p.brand || "Hassan Rehan"}
                  onChange={(val) => handleUpdate("brand", val)}
                />
              </div>
              <div className="text-xs text-slate-500">
                Senior Product & Brand Designer · San Francisco & Tokyo
              </div>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-slate-50 transition-all shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Hassan Rehan. Crafted with precision, Figma variables & React.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Designed for human joy & commercial momentum</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default DesignerPortfolio4Footer;
