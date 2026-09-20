// @ts-nocheck
import { Cpu, ArrowUp, Activity, Terminal } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

export function AIProduct4Footer({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#060813";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#8B5CF6";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer 
      className="relative pt-20 pb-12 px-4 sm:px-8 border-t overflow-hidden transition-colors"
      style={{ backgroundColor: bg, color: ink, borderColor: surface }}
    >
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] rounded-full blur-[150px] pointer-events-none opacity-20"
        style={{ backgroundColor: accent }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 pb-16 border-b" style={{ borderColor: surface }}>
          
          <div className="lg:col-span-2 pr-6">
            <div className="flex items-center gap-3 mb-6">
              {props?.logo ? (
                <img src={props.logo} alt="Logo" className="h-9 w-9 rounded-xl object-cover shadow-lg" />
              ) : <div 
                className="h-9 w-9 rounded-xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: accent, color: ink, boxShadow: `0 0 20px ${accent}60` }}
              >
                <Cpu className="h-5 w-5" />
              </div>}
              <Editable value={props?.heading || "O. CHEN // AI ARCHITECTURE"} onChange={() => {}} className="font-mono text-sm font-bold tracking-widest uppercase" style={{ color: ink }} />
            </div>
            
            <p className="text-xs leading-relaxed max-w-sm mb-8" style={{ color: ink, opacity: 0.75 }}>
              {props?.message ?? "Production-grade AI systems, vector search pipelines, and agentic state machines built for enterprise speed, security, and scale."}
            </p>

            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-[11px] font-mono" style={{ backgroundColor: surface, borderColor: surface }}>
              <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
              <span style={{ color: ink }}>SYSTEMS_OPERATIONAL // 99.99% UPTIME</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-6" style={{ color: accent }}>Capabilities</div>
            <ul className="space-y-3.5 text-xs font-mono" style={{ color: ink, opacity: 0.75 }}>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">Vector RAG Engines</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">Agentic State Machines</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">Private LLM Fine-Tuning</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">vLLM Inference Speed</a></li>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">SOC2 Security Boundaries</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-6" style={{ color: accent }}>Navigation</div>
            <ul className="space-y-3.5 text-xs font-mono" style={{ color: ink, opacity: 0.75 }}>
              <li><a href="#about" className="hover:opacity-100 transition-opacity">01. Core Architecture</a></li>
              <li><a href="#projects" className="hover:opacity-100 transition-opacity">02. Selected Builds</a></li>
              <li><a href="#testimonials" className="hover:opacity-100 transition-opacity">03. Client Validation</a></li>
              <li><a href="#contact" className="hover:opacity-100 transition-opacity">04. Direct Scoping</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-6" style={{ color: accent }}>Repositories</div>
            <ul className="space-y-3.5 text-xs font-mono" style={{ color: ink, opacity: 0.75 }}>
              <li><a href="#" className="hover:opacity-100 transition-opacity">GitHub // Open-Source</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">HuggingFace Models</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Architecture Whitepapers</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">System Benchmarks</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs" style={{ color: ink, opacity: 0.75 }}>
          <div>
            © {new Date().getFullYear()} {props?.heading || "O. CHEN AI ARCHITECTURE LABS"}. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:opacity-100 transition-opacity p-2.5 rounded-xl border cursor-pointer"
            style={{ backgroundColor: surface, borderColor: surface, color: ink }}
          >
            <Terminal className="h-3.5 w-3.5" style={{ color: accent }} />
            <span>TOP_OF_STACK</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}