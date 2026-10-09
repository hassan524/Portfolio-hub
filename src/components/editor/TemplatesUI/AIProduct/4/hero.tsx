// @ts-nocheck
import { ArrowDownRight, Terminal, Cpu, ShieldCheck, Activity, Layers, Code2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4Hero({ props = {}, theme, onChange }: Props) {
  const bg = theme?.bg || "#05070E";
  const ink = theme?.ink || "#FFFFFF";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#6366F1";

  return (
    <section
      id="home"
      className="relative w-full pt-12 pb-28 px-4 sm:px-6 overflow-hidden transition-colors"
      style={{ backgroundColor: bg, color: ink }}
    >
      {/* 3D Paint Cascade / Fluid Vector Flow Dripping from Top Navbar */}
      <div className="absolute top-0 left-0 right-0 h-[650px] pointer-events-none overflow-hidden z-0">
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover opacity-60"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="paintFlow1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
              <stop offset="100%" stopColor={bg} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paintFlow2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="70%" stopColor={accent} stopOpacity="0.2" />
              <stop offset="100%" stopColor={bg} stopOpacity="0" />
            </linearGradient>
            <radialGradient id="paintCore" cx="50%" cy="0%" r="60%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Technical Architectural Grid Backdrop */}
          <rect width="100%" height="100%" fill="url(#archGrid)" />

          {/* Dynamic 3D Sculpted Fluid Paint Streams */}
          <path
            d="M -100 0 C 300 0, 450 320, 720 280 C 990 240, 1150 480, 1540 120 L 1540 0 Z"
            fill="url(#paintFlow1)"
          />
          <path
            d="M 1540 0 C 1100 0, 950 420, 680 340 C 410 260, 250 520, -100 200 L -100 0 Z"
            fill="url(#paintFlow2)"
          />
          <circle cx="720" cy="80" r="450" fill="url(#paintCore)" />
        </svg>

        {/* Dynamic Light Beam Overlay */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] blur-[140px] pointer-events-none opacity-30"
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center pt-8">

        {/* Architectural Tech Header Tag (No Cliché Pill Badges) */}
        <div
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-sm text-[11px] font-mono tracking-widest uppercase mb-8 border border-white/10"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(12px)", color: ink }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
          <span>SYS_ARCH // ENTERPRISE AI LABS</span>
          <span className="text-white/30">|</span>
          <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
        </div>

        {/* High-Impact Headline */}
        <Editable
          as="h1"
          value={props?.headline || "Engineering Production-Grade Neural Infrastructure & Autonomous Agents"}
          onChange={(v) => onChange?.({ headline: v })}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.06] mb-8 max-w-5xl"
          style={{ color: ink }}
        />

        {/* Subheadline */}
        <Editable
          as="p"
          value={props?.subheadline || "Architecting deterministic multi-agent state machinery, sub-second vector search pipelines, and private isolated LLM models built specifically for mission-critical enterprise workloads."}
          onChange={(v) => onChange?.({ subheadline: v })}
          className="text-base sm:text-lg max-w-3xl mb-12 leading-relaxed font-normal"
          style={{ color: ink, opacity: 0.75 }}
        />

        {/* Clean Action Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
          <a
            href="#projects"
            className="px-8 py-4 rounded-lg font-mono text-xs font-bold transition-all duration-300 hover:opacity-90 active:scale-95 flex items-center gap-3 group cursor-pointer"
            style={{ backgroundColor: accent, color: "#FFFFFF" }}
          >
            <Editable value="EXPLORE_DEPLOYMENTS" onChange={() => { }} className="inline" />
            <ArrowDownRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-lg font-mono text-xs font-bold transition-all duration-300 hover:bg-white/10 active:scale-95 flex items-center gap-2 border border-white/15 cursor-pointer"
            style={{ backgroundColor: surface, color: ink }}
          >
            <Terminal className="h-4 w-4" style={{ color: accent }} />
            <Editable value="INITIATE_SYSTEM_AUDIT" onChange={() => { }} className="inline" />
          </a>
        </div>

        {/* Interactive Engineering Spec Console */}
        <div
          className="relative w-full max-w-5xl rounded-2xl border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-left overflow-hidden"
          style={{ backgroundColor: "rgba(8, 10, 20, 0.85)" }}
        >
          {/* Top Console Bar */}
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 font-semibold text-white/70">node_01 // cluster_inference_engine</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Activity className="h-3.5 w-3.5" /> 142ms LATENCY
              </span>
              <span className="text-white/40 hidden sm:inline">|</span>
              <span className="text-white/60 hidden sm:inline font-mono">SOC2_TYPE_II</span>
            </div>
          </div>

          {/* Grid Spec Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-3">
                <Cpu className="h-5 w-5" style={{ color: accent }} />
                <span className="text-[10px] font-mono text-emerald-400">99.98% ACCURACY</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-white/50 mb-1">Model Architecture</div>
              <div className="text-sm font-bold text-white">Llama-3 70B Quantized</div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-3">
                <Layers className="h-5 w-5" style={{ color: accent }} />
                <span className="text-[10px] font-mono text-blue-400">HYBRID RAG</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-white/50 mb-1">Vector Index Layer</div>
              <div className="text-sm font-bold text-white">Qdrant // 18.2M Vectors</div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-3">
                <Code2 className="h-5 w-5" style={{ color: accent }} />
                <span className="text-[10px] font-mono text-purple-400">AUTONOMOUS</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-white/50 mb-1">Orchestration</div>
              <div className="text-sm font-bold text-white">LangGraph Multi-Agent</div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-3">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-400">ENCRYPTED</span>
              </div>
              <div className="text-[11px] font-mono uppercase text-white/50 mb-1">Privacy Boundary</div>
              <div className="text-sm font-bold text-white">Single-Tenant VPC</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}