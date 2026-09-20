// @ts-nocheck
import { useState } from "react";
import { Menu, X, ChevronDown, Sparkles, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct3Navbar({ props = {}, theme, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#140C12";
  const bgSecond = theme?.["bg-second"] || "#FFF5F8";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "#1E0C17";
  const surface = theme?.surface || "#231420";
  const accent = theme?.accent || "#FF3B76";

  return (
    <header className="w-full px-4 sm:px-8 py-5 sticky top-0 z-50 transition-all">
      <div 
        className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-7 py-3.5 rounded-2xl border backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.45)] transition-all duration-300"
        style={{ 
          borderColor: `${accent}28`, 
          backgroundColor: `${surface}D9` 
        }}
      >

        {/* Brand Logo */}
        <div className="flex items-center gap-3.5 group cursor-pointer">
          {props?.logo ? (
            <img src={props.logo} alt="Logo" className="h-9 w-9 shrink-0 rounded-xl object-cover shadow-lg" />
          ) : (
            <div 
              className="h-9 w-9 shrink-0 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
              style={{ 
                background: `linear-gradient(135deg, ${accent}, #E0265F)`,
                color: ink,
                boxShadow: `0 0 20px ${accent}60`
              }}
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
          )}
          <Editable
            value={props?.logoText || "WideApp AI"}
            onChange={(v) => onChange?.({ logoText: v })}
            className="font-extrabold text-base tracking-tight"
            style={{ color: ink }}
          />
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide" style={{ color: ink }}>
          <a href="#models" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1.5 group">
            <Editable className="inline">AI Models</Editable> 
            <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a href="#solutions" className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1.5 group">
            <Editable className="inline">Solutions</Editable> 
            <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a href="#portfolio" className="opacity-80 hover:opacity-100 transition-opacity">
            <Editable className="inline">Portfolio</Editable>
          </a>
          <a href="#research" className="opacity-80 hover:opacity-100 transition-opacity">
            <Editable className="inline">Research</Editable>
          </a>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 hover:scale-105"
            style={{ 
              borderColor: `${accent}30`, 
              backgroundColor: `${bg}90`, 
              color: ink 
            }}
          >
            Schedule Demo
          </a>
          <a
            href="#portfolio"
            className="px-5 py-2 rounded-xl text-xs font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
            style={{ 
              background: `linear-gradient(135deg, ${accent}, #E0265F)`, 
              color: ink,
              boxShadow: `0 0 20px ${accent}45`
            }}
          >
            <span>Explore AI</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden p-2 rounded-lg opacity-80 hover:opacity-100 cursor-pointer" 
          style={{ color: ink }}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div 
          className="fixed inset-0 z-50 flex flex-col p-6 backdrop-blur-2xl animate-fadeIn" 
          style={{ backgroundColor: `${bg}F2`, color: ink }}
        >
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-xs uppercase tracking-widest" style={{ color: ink, opacity: 0.75 }}>Navigation</span>
            <button onClick={() => setOpen(false)} className="p-2 cursor-pointer" style={{ color: ink }}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col gap-6 text-xl font-bold">
            <a href="#models" onClick={() => setOpen(false)} className="transition-colors hover:opacity-100" style={{ color: ink }}>AI Models</a>
            <a href="#solutions" onClick={() => setOpen(false)} className="transition-colors hover:opacity-100" style={{ color: ink }}>Solutions</a>
            <a href="#portfolio" onClick={() => setOpen(false)} className="transition-colors hover:opacity-100" style={{ color: ink }}>Portfolio</a>
            <a href="#research" onClick={() => setOpen(false)} className="transition-colors hover:opacity-100" style={{ color: ink }}>Research</a>
          </div>
        </div>
      )}
    </header>
  );
}