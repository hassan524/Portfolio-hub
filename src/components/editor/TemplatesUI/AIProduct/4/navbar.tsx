// @ts-nocheck
import { useState } from "react";
import { Menu, X, Cpu, Terminal } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
type Props = BlockComponentProps<any>;

export function AIProduct4Navbar({ props, theme, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#060813";
  const ink = theme?.ink || "#F1F5F9";
  const accent = theme?.accent || "#8B5CF6";

  return (
    <header 
      className="w-full px-4 sm:px-8 py-5 sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
      style={{ 
        backgroundColor: `${bg}DD`, 
        borderColor: `${accent}25`,
        color: ink 
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-4 group cursor-pointer">
          {props.logo ? (
            <img src={props.logo} alt="Logo" className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-lg" />
          ) : <div 
            className="relative h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
            style={{ 
              backgroundColor: accent, 
              boxShadow: `0 0 25px ${accent}80` 
            }}
          >
            <Cpu className="h-5 w-5 text-white animate-pulse" />
          </div>}
          <div>
            <Editable
              value={props.logoText || "O. CHEN // AI ARCHITECTURE"}
              onChange={(v) => onChange({ logoText: v })}
              className="font-mono text-xs font-bold tracking-widest uppercase"
            />
            <div className="text-[10px] font-mono flex items-center gap-1.5 opacity-60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              SYSTEM_READY
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-medium tracking-wider opacity-85">
          <a href="#about" className="hover:opacity-100 transition-opacity flex items-center gap-1.5 group">
            <span style={{ color: accent }} className="group-hover:translate-x-0.5 transition-transform">01.</span>
            <Editable value="CORE_STACK" onChange={() => {}} className="inline" />
          </a>
          <a href="#projects" className="hover:opacity-100 transition-opacity flex items-center gap-1.5 group">
            <span style={{ color: accent }} className="group-hover:translate-x-0.5 transition-transform">02.</span>
            <Editable value="DEPLOYMENTS" onChange={() => {}} className="inline" />
          </a>
          <a href="#testimonials" className="hover:opacity-100 transition-opacity flex items-center gap-1.5 group">
            <span style={{ color: accent }} className="group-hover:translate-x-0.5 transition-transform">03.</span>
            <Editable value="VALIDATION" onChange={() => {}} className="inline" />
          </a>
          <a href="#contact" className="hover:opacity-100 transition-opacity flex items-center gap-1.5 group">
            <span style={{ color: accent }} className="group-hover:translate-x-0.5 transition-transform">04.</span>
            <Editable value="INITIATE_CONTACT" onChange={() => {}} className="inline" />
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 border hover:scale-105 active:scale-95"
            style={{ 
              borderColor: `${accent}40`, 
              backgroundColor: `${accent}15`,
              color: ink,
              boxShadow: `0 0 15px ${accent}20`
            }}
          >
            <Terminal className="h-3.5 w-3.5" style={{ color: accent }} />
            <Editable value="REQUEST_AUDIT" onChange={() => {}} className="inline" />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 opacity-80 hover:opacity-100">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div 
          className="fixed inset-0 z-50 flex flex-col p-8 transition-all animate-in fade-in duration-200"
          style={{ backgroundColor: bg, color: ink }}
        >
          <div className="flex justify-between items-center mb-10">
            <span className="font-mono text-xs uppercase tracking-widest opacity-60">Terminal Menu</span>
            <button onClick={() => setOpen(false)} className="p-2"><X className="h-6 w-6" /></button>
          </div>
          <div className="flex flex-col gap-8 font-mono text-lg font-bold">
            <a href="#about" onClick={() => setOpen(false)}>01. CORE_STACK</a>
            <a href="#projects" onClick={() => setOpen(false)}>02. DEPLOYMENTS</a>
            <a href="#testimonials" onClick={() => setOpen(false)}>03. VALIDATION</a>
            <a href="#contact" onClick={() => setOpen(false)}>04. INITIATE_CONTACT</a>
          </div>
        </div>
      )}
    </header>
  );
}