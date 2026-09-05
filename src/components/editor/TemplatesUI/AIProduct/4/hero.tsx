// @ts-nocheck
import { ArrowDownRight, Sparkles, Cpu, Layers, GitBranch, Binary } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
type Props = BlockComponentProps<any>;

export function AIProduct4Hero({ props, theme, onChange }: Props) {
  const bg = theme?.bg || "#060813";
  const ink = theme?.ink || "#F1F5F9";
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
        style={{ backgroundColor: "#38BDF8" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center">
        
        {/* Status Badge */}
        <div 
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono mb-10 border backdrop-blur-md shadow-lg hover:scale-105 transition-transform"
          style={{ 
            backgroundColor: `${accent}12`, 
            borderColor: `${accent}40`,
            color: ink 
          }}
        >
          <Sparkles className="h-4 w-4 animate-spin" style={{ color: accent, animationDuration: "8s" }} />
          <span className="tracking-wider uppercase font-semibold">PRODUCTION-GRADE AI ARCHITECTURE</span>
        </div>

        {/* Headline with High-Contrast Fallback */}
        <Editable
          as="h1"
          value={props.headline || "Architecting Autonomous AI Engines & High-Throughput RAG Systems"}
          onChange={(v) => onChange({ headline: v })}
          className="text-4xl sm:text-7xl font-extrabold tracking-tight leading-[1.08] mb-8 max-w-5xl"
          style={{ color: ink }}
        />

        {/* Subheadline */}
        <Editable
          as="p"
          value={props.subheadline || "Designing multi-agent state machinery, custom vector search infrastructure, and private LLM orchestrations tailored for mission-critical enterprise workloads."}
          onChange={(v) => onChange({ subheadline: v })}
          className="text-base sm:text-xl max-w-3xl mb-14 leading-relaxed font-normal opacity-75"
        />

        {/* CTA Button */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
          <a
            href="#projects"
            className="px-9 py-4 rounded-xl font-mono text-xs font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 flex items-center gap-3 group"
            style={{ 
              backgroundColor: accent,
              boxShadow: `0 0 35px ${accent}75`
            }}
          >
            <Editable value="VIEW_PRODUCTION_BUILD" onChange={() => {}} className="inline" />
            <ArrowDownRight className="h-4 w-4 text-white group-hover:translate-x-1 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Interactive Futuristic Card/Dashboard */}
        <div 
          className="relative w-full max-w-5xl rounded-3xl border p-8 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:border-violet-500/50"
          style={{ 
            backgroundColor: `${bg}CC`,
            borderColor: `${accent}35`,
            boxShadow: `0 20px 50px ${accent}15`
          }}
        >
          <div className="flex items-center justify-between pb-6 mb-6 border-b text-xs font-mono opacity-70" style={{ borderColor: `${accent}25` }}>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 font-semibold">cluster_node_01 // operational</span>
            </div>
            <span className="text-emerald-400 font-bold">LATENCY: 142ms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-left">
            <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: `${accent}10`, borderColor: `${accent}25` }}>
              <Cpu className="h-6 w-6 mb-3" style={{ color: accent }} />
              <div className="text-xs font-mono opacity-60 mb-1">MODEL PIPELINE</div>
              <div className="text-sm font-bold">Llama-3 70B Quantized</div>
            </div>

            <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: `${accent}10`, borderColor: `${accent}25` }}>
              <Layers className="h-6 w-6 mb-3 text-cyan-400" />
              <div className="text-xs font-mono opacity-60 mb-1">VECTOR INDEX</div>
              <div className="text-sm font-bold">Milvus // 12.4M Vectors</div>
            </div>

            <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: `${accent}10`, borderColor: `${accent}25` }}>
              <GitBranch className="h-6 w-6 mb-3 text-emerald-400" />
              <div className="text-xs font-mono opacity-60 mb-1">ORCHESTRATION</div>
              <div className="text-sm font-bold">LangGraph Multi-Agent</div>
            </div>

            <div className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: `${accent}10`, borderColor: `${accent}25` }}>
              <Binary className="h-6 w-6 mb-3 text-amber-400" />
              <div className="text-xs font-mono opacity-60 mb-1">THROUGHPUT</div>
              <div className="text-sm font-bold">4.2K Tokens / Sec</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}