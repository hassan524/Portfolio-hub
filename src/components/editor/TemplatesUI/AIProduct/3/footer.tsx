// @ts-nocheck
import { Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

export function AIProduct3Footer({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#140C12";
  const bgSecond = theme?.["bg-second"] || "#FFF5F8";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "#1E0C17";
  const surface = theme?.surface || "#231420";
  const accent = theme?.accent || "#FF3B76";

  return (
    <footer 
      className="py-16 px-4 sm:px-6 border-t transition-colors" 
      style={{ 
        backgroundColor: bg, 
        color: ink, 
        borderColor: `${accent}20` 
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs" style={{ color: ink, opacity: 0.75 }}>
        <div className="flex items-center gap-3 group cursor-pointer">
          {props?.logo ? (
            <img src={props.logo} alt="Logo" className="h-8 w-8 rounded-xl object-cover shadow-sm" />
          ) : (
            <div 
              className="h-8 w-8 rounded-xl flex items-center justify-center font-bold text-xs transition-transform duration-300 group-hover:scale-110 shadow-sm" 
              style={{ 
                background: `linear-gradient(135deg, ${accent}, #E0265F)`, 
                color: ink 
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
            </div>
          )}
          <Editable className="font-bold text-sm tracking-tight" style={{ color: ink }}>{props?.heading || "WideApp GO"}</Editable>
        </div>
        <Editable as="p" style={{ color: ink, opacity: 0.75 }}>© {new Date().getFullYear()} WideApp GO Inc. All rights reserved.</Editable>
        <div className="flex gap-6">
          <a href="#" className="hover:opacity-100 transition-opacity" style={{ color: ink, opacity: 0.75 }}><Editable>Privacy Policy</Editable></a>
          <a href="#" className="hover:opacity-100 transition-opacity" style={{ color: ink, opacity: 0.75 }}><Editable>Terms of Service</Editable></a>
          <a href="#" className="hover:opacity-100 transition-opacity" style={{ color: ink, opacity: 0.75 }}><Editable>Security</Editable></a>
        </div>
      </div>
    </footer>
  );
}