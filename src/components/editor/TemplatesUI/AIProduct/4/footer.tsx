// @ts-nocheck
import { Cpu, ArrowUp, Activity } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

export function AIProduct4Footer({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#05070E";
  const ink = theme?.ink || "#FFFFFF";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#6366F1";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative pt-16 pb-12 px-4 sm:px-8 border-t border-white/10 overflow-hidden transition-colors"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12 pb-12 border-b border-white/10">

          <div className="lg:col-span-2 pr-4">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center border border-white/10"
                style={{ backgroundColor: accent, color: "#FFFFFF" }}
              >
                <Cpu className="h-4 w-4" />
              </div>
              <Editable value={props?.heading || "O. CHEN // AI ARCHITECTURE"} onChange={() => { }} className="font-mono text-xs font-bold tracking-widest uppercase" style={{ color: ink }} />
            </div>

            <p className="text-xs leading-relaxed max-w-sm mb-6 text-white/60">
              Production-grade AI infrastructure, vector search engines, and multi-agent systems built for enterprise scale, security, and low latency.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono bg-white/[0.02]">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-white/70">SYSTEMS_ONLINE // 99.99% UPTIME</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>Capabilities</div>
            <ul className="space-y-2.5 text-xs font-mono text-white/60">
              <li><a href="#about" className="hover:text-white transition-colors">Vector RAG Engines</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Agentic State Machines</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Private LLM Fine-Tuning</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">High-Throughput vLLM</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>Navigation</div>
            <ul className="space-y-2.5 text-xs font-mono text-white/60">
              <li><a href="#home" className="hover:text-white transition-colors">00. Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">01. Architecture</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">02. Deployments</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">04. Contact Audit</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color: accent }}>Repositories</div>
            <ul className="space-y-2.5 text-xs font-mono text-white/60">
              <li><a href="#home" className="hover:text-white transition-colors">GitHub // Open Source</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">HuggingFace Models</a></li>
              <li><a href="#home" className="hover:text-white transition-colors">Architecture Papers</a></li>
            </ul>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} O. CHEN AI ARCHITECTURE LABS. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors p-2 rounded-lg border border-white/10 cursor-pointer bg-white/[0.02]"
          >
            <span>TOP_OF_STACK</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}