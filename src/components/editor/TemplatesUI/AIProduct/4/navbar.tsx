// @ts-nocheck
import { useState } from "react";
import { Menu, X, Cpu, Terminal, Shield } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4Navbar({ props = {}, theme, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#05070E";
  const ink = theme?.ink || "#FFFFFF";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#6366F1";

  return (
    <header
      className="w-full px-4 sm:px-8 py-4 relative z-30 border-b border-white/10 transition-all duration-300"
      style={{ backgroundColor: "rgba(5, 7, 14, 0.85)", backdropFilter: "blur(16px)" }}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <a href="#home" className="flex items-center gap-3.5 group cursor-pointer">
          {props?.logo ? (
            <img
              src={props.logo}
              alt="Logo"
              className="h-8 w-auto shrink-0 object-contain"
            />
          ) : (
            <div
              className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center border border-white/10 shadow-lg"
              style={{ backgroundColor: accent, color: "#FFFFFF" }}
            >
              <Cpu className="h-5 w-5" />
            </div>
          )}
          <div>
            <Editable
              value={props?.logoText || "O. CHEN // AI ARCHITECTURE"}
              onChange={(v) => onChange?.({ logoText: v })}
              className="font-mono text-xs font-bold tracking-widest uppercase"
              style={{ color: ink }}
            />
            <div className="text-[10px] font-mono flex items-center gap-1.5 text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              SYSTEM_OPERATIONAL
            </div>
          </div>
        </a>

        {/* Section Anchors Only (No External Routing Links) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-medium tracking-wider text-white/70">
          <a href="#about" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span style={{ color: accent }}>01.</span>
            <Editable value="SYSTEMS" onChange={() => { }} className="inline" />
          </a>
          <a href="#projects" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span style={{ color: accent }}>02.</span>
            <Editable value="DEPLOYMENTS" onChange={() => { }} className="inline" />
          </a>
          <a href="#testimonials" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span style={{ color: accent }}>03.</span>
            <Editable value="BENCHMARKS" onChange={() => { }} className="inline" />
          </a>
          <a href="#contact" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span style={{ color: accent }}>04.</span>
            <Editable value="CONTACT" onChange={() => { }} className="inline" />
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 border border-white/15 hover:bg-white/10 active:scale-95 cursor-pointer"
            style={{ backgroundColor: surface, color: ink }}
          >
            <Terminal className="h-3.5 w-3.5" style={{ color: accent }} />
            <Editable value="REQUEST_AUDIT" onChange={() => { }} className="inline" />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/80 hover:text-white cursor-pointer">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col p-8 transition-all animate-in fade-in duration-200"
          style={{ backgroundColor: "#05070E", color: ink }}
        >
          <div className="flex justify-between items-center mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">Terminal Navigation</span>
            <button onClick={() => setOpen(false)} className="p-2 cursor-pointer"><X className="h-6 w-6" /></button>
          </div>
          <div className="flex flex-col gap-6 font-mono text-base font-bold">
            <a href="#about" onClick={() => setOpen(false)} className="hover:text-white/80">01. SYSTEMS</a>
            <a href="#projects" onClick={() => setOpen(false)} className="hover:text-white/80">02. DEPLOYMENTS</a>
            <a href="#testimonials" onClick={() => setOpen(false)} className="hover:text-white/80">03. BENCHMARKS</a>
            <a href="#contact" onClick={() => setOpen(false)} className="hover:text-white/80">04. CONTACT</a>
          </div>
        </div>
      )}
    </header>
  );
}