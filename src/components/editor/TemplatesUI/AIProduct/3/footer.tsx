import { Sparkles } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { FooterProps } from "@/types/builder.schema";

export function AIProduct3Footer({ props, theme }: BlockComponentProps<FooterProps>) {
  const darkInk = theme?.ink || "#1A0D14";
  const accent = theme?.accent || "#E11D48";

  return (
    <footer className="py-16 px-4 sm:px-6 text-white border-t border-white/10" style={{ background: darkInk }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50">
        <div className="flex items-center gap-3 group cursor-pointer">
          {props.logo ? (
            <img src={props.logo} alt="Logo" className="h-7 w-7 rounded-lg object-cover" />
          ) : (
            <div className="h-7 w-7 rounded-lg flex items-center justify-center font-bold text-white text-xs transition-transform duration-300 group-hover:scale-110" style={{ background: accent }}>
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
          )}
          <span className="font-bold text-white text-sm">WideApp GO</span>
        </div>
        <p>© {new Date().getFullYear()} WideApp GO Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
}