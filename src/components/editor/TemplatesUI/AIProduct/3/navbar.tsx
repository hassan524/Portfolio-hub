import { useState } from "react";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { NavbarProps } from "@/types/builder.schema";

type Props = BlockComponentProps<NavbarProps>;

export function AIProduct3Navbar({ props, theme, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const darkInk = theme?.ink || "#1A0D14";
  const accent = theme?.accent || "#E11D48";

  return (
    <header className="w-full px-4 sm:px-6 py-4 sticky top-0 z-50 transition-all" style={{ background: darkInk }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-xl transition-all duration-300 hover:border-white/20">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-4 group cursor-pointer">
          {props.logo ? (
            <img src={props.logo} alt="Logo" className="h-8 w-8 shrink-0 rounded-xl object-cover shadow-lg" />
          ) : (
            <div className="h-8 w-8 shrink-0 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ background: accent }}>
              <Sparkles className="h-4 w-4 text-white animate-pulse" />
            </div>
          )}
          <Editable
            value={props.logoText || "WideApp AI"}
            onChange={(v) => onChange({ logoText: v })}
            className="font-extrabold text-white text-base tracking-tight"
          />
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-white/70">
          <a href="#models" className="hover:text-white transition-colors flex items-center gap-1 group">
            <Editable value="AI Models" onChange={() => {}} className="inline" /> <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a href="#solutions" className="hover:text-white transition-colors flex items-center gap-1 group">
            <Editable value="Solutions" onChange={() => {}} className="inline" /> <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a href="#portfolio" className="hover:text-white transition-colors">
            <Editable value="Portfolio" onChange={() => {}} className="inline" />
          </a>
          <a href="#research" className="hover:text-white transition-colors">
            <Editable value="Research" onChange={() => {}} className="inline" />
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white border border-white/15 hover:bg-white/5 transition-all duration-300 hover:scale-105"
          >
            Schedule Demo
          </a>
          <a
            href="#portfolio"
            className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: accent }}
          >
            Explore AI
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white focus:outline-none">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col p-6 text-white animate-fadeIn" style={{ background: darkInk }}>
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-xs uppercase tracking-widest text-white/50">Navigation</span>
            <button onClick={() => setOpen(false)} className="p-2"><X className="h-6 w-6" /></button>
          </div>
          <div className="flex flex-col gap-6 text-xl font-bold">
            <a href="#models" onClick={() => setOpen(false)} className="hover:text-rose-400 transition-colors">AI Models</a>
            <a href="#solutions" onClick={() => setOpen(false)} className="hover:text-rose-400 transition-colors">Solutions</a>
            <a href="#portfolio" onClick={() => setOpen(false)} className="hover:text-rose-400 transition-colors">Portfolio</a>
            <a href="#research" onClick={() => setOpen(false)} className="hover:text-rose-400 transition-colors">Research</a>
          </div>
        </div>
      )}
    </header>
  );
}