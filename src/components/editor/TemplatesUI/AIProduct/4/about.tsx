// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { Network, Database, Lock, FastForward, Cpu, CheckCircle2 } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4About({ props = {}, theme }: Props) {
  const bg = theme?.bg || "#05070E";
  const ink = theme?.ink || "#FFFFFF";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#6366F1";

  return (
    <section id="about" className="py-28 px-4 sm:px-6 relative transition-colors border-t border-white/5" style={{ backgroundColor: bg, color: ink }}>

      {/* Background Architectural Vector Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuitGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="#FFFFFF" opacity="0.3" />
              <path d="M 50 0 L 50 100 M 0 50 L 100 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuitGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: accent }} />
            01 // SYSTEM ARCHITECTURE & CORE STACK
          </div>
          <Editable
            as="h2"
            value="Engineered for Deterministic Accuracy & Sub-Second Latency"
            onChange={() => { }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6"
            style={{ color: ink }}
          />
          <Editable
            as="p"
            value="Production AI engineering requires rigorous system design beyond wrapper scripts. I architect isolated single-tenant vector indices, multi-agent evaluation loops, and high-performance inference servers."
            onChange={() => { }}
            className="text-base leading-relaxed"
            style={{ color: ink, opacity: 0.75 }}
          />
        </div>

        {/* Modular Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Network, title: "Agentic State Machines", desc: "Autonomous multi-step execution graphs engineered with LangGraph for deterministic code execution and dynamic API retries." },
              { icon: Database, title: "Hybrid Vector RAG", desc: "Combining dense vector embeddings with sparse BM25 indexing to eliminate hallucinations across large document archives." },
              { icon: Lock, title: "Isolated Private Models", desc: "Self-hosted fine-tuned open-source LLMs inside VPC boundaries with strict SOC2 data compliance." },
              { icon: FastForward, title: "vLLM High Throughput", desc: "Custom vLLM inference clusters delivering sub-150ms time-to-first-token under thousands of concurrent requests." }
            ].map((card, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-white/20 group"
                style={{ backgroundColor: surface }}
              >
                <card.icon className="h-7 w-7 mb-5 transition-transform group-hover:scale-110 duration-300" style={{ color: accent }} />
                <Editable as="h3" value={card.title} onChange={() => { }} className="text-base font-bold mb-2" style={{ color: ink }} />
                <Editable as="p" value={card.desc} onChange={() => { }} className="text-xs leading-relaxed" style={{ color: ink, opacity: 0.7 }} />
              </div>
            ))}
          </div>

          {/* Architectural Schematic Preview Card */}
          <div className="relative rounded-2xl border border-white/10 p-8 flex flex-col justify-between overflow-hidden" style={{ backgroundColor: "rgba(10, 14, 28, 0.8)" }}>
            <div className="absolute top-0 right-0 w-80 h-80 blur-3xl pointer-events-none opacity-20" style={{ backgroundColor: accent }} />

            <div>
              <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: accent }}>SYSTEM_SCHEMATIC</div>
              <h3 className="text-xl font-bold mb-4" style={{ color: ink }}>Real-Time Inference Pipeline Flow</h3>
              <p className="text-xs leading-relaxed text-white/70 mb-8">
                Every query passes through query expansion, vector similarity scoring, re-ranking models, and deterministic guardrails before hitting model execution.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between">
                <span className="text-white/60">01. Query Guardrail Filter</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between">
                <span className="text-white/60">02. Sparse + Dense Embedding Search</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between">
                <span className="text-white/60">03. Cohere Cross-Encoder Rerank</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-between">
                <span className="text-white/60">04. Quantized Stream Generation</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}