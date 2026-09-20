// @ts-nocheck
import { ArrowDownRight, Sparkles, Cpu, Layers, GitBranch, Binary } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4Hero({ props = {}, theme, onChange }: Props) {
  const bg = theme?.bg || "#060813";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#8B5CF6";

  return (
    <section 
      id="home" 
      className="relative w-full pt-16 pb-32 px-4 sm:px-6 overflow-hidden transition-colors"
      style={{ backgroundColor: bg, color: ink }}
    >
      {/* Dynamic Background Glow Spheres */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[170px] pointer-events-none opacity-25 animate-pulse"
        style={{ backgroundColor: accent }}
      />
      <div 
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ backgroundColor: accent }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
        
        {/* Status Badge */}
        <div 
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono mb-10 border backdrop-blur-md shadow-lg hover:scale-105 transition-transform"
          style={{ 
            backgroundColor: surface, 
            borderColor: surface,
            color: ink 
          }}
        >
          <Sparkles className="h-4 w-4 animate-spin" style={{ color: accent, animationDuration: "8s" }} />
          <span className="tracking-wider uppercase font-semibold">PRODUCTION-GRADE AI ARCHITECTURE</span>
        </div>

        {/* Headline with High-Contrast Fallback */}
        <Editable
          as="h1"
          value={props?.headline || "Architecting Autonomous AI Engines & High-Throughput RAG Systems"}
          onChange={(v) => onChange?.({ headline: v })}
          className="text-4xl sm:text-7xl font-extrabold tracking-tight leading-[1.08] mb-8 max-w-5xl"
          style={{ color: ink }}
        />

        {/* Subheadline */}
        <Editable
          as="p"
          value={props?.subheadline || "Designing multi-agent state machinery, custom vector search infrastructure, and private LLM orchestrations tailored for mission-critical enterprise workloads."}
          onChange={(v) => onChange?.({ subheadline: v })}
          className="text-base sm:text-xl max-w-3xl mb-14 leading-relaxed font-normal"
          style={{ color: ink, opacity: 0.75 }}
        />

        {/* CTA Button */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
          <a
            href="#projects"
            className="px-9 py-4 rounded-xl font-mono text-xs font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center gap-3 group cursor-pointer"
            style={{ 
              backgroundColor: accent,
              color: ink,
              boxShadow: `0 0 35px ${accent}75`
            }}
          >
            <Editable value="VIEW_PRODUCTION_BUILD" onChange={() => {}} className="inline" />
            <ArrowDownRight className="h-4 w-4 group-hover:translate-x-1 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Interactive Futuristic Card/Dashboard */}
        <div 
          className="relative w-full max-w-5xl rounded-3xl border p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500"
          style={{ 
            backgroundColor: `${bg}E6`,
            borderColor: surface,
            boxShadow: `0 20px 50px ${accent}15`
          }}
        >
          <div className="flex items-center justify-between pb-6 mb-6 border-b text-xs font-mono" style={{ borderColor: surface, color: ink }}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-semibold" style={{ color: ink }}>cluster_node_01 // operational</span>
            </div>
            <span className="font-bold" style={{ color: accent }}>LATENCY: 142ms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-left">
            <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: surface, borderColor: surface }}>
              <Cpu className="h-6 w-6 mb-3" style={{ color: accent }} />
              <div className="text-xs font-mono mb-1" style={{ color: ink, opacity: 0.75 }}>MODEL PIPELINE</div>
              <div className="text-sm font-bold" style={{ color: ink }}>Llama-3 70B Quantized</div>
            </div>

            <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: surface, borderColor: surface }}>
              <Layers className="h-6 w-6 mb-3" style={{ color: accent }} />
              <div className="text-xs font-mono mb-1" style={{ color: ink, opacity: 0.75 }}>VECTOR INDEX</div>
              <div className="text-sm font-bold" style={{ color: ink }}>Milvus // 12.4M Vectors</div>
            </div>

            <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: surface, borderColor: surface }}>
              <GitBranch className="h-6 w-6 mb-3" style={{ color: accent }} />
              <div className="text-xs font-mono mb-1" style={{ color: ink, opacity: 0.75 }}>ORCHESTRATION</div>
              <div className="text-sm font-bold" style={{ color: ink }}>LangGraph Multi-Agent</div>
            </div>

            <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: surface, borderColor: surface }}>
              <Binary className="h-6 w-6 mb-3" style={{ color: accent }} />
              <div className="text-xs font-mono mb-1" style={{ color: ink, opacity: 0.75 }}>THROUGHPUT</div>
              <div className="text-sm font-bold" style={{ color: ink }}>4.2K Tokens / Sec</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}