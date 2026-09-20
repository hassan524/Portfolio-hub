// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { Network, Database, Lock, FastForward } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4About({ props = {}, theme }: Props) {
  const bg = theme?.bg || "#060813";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#8B5CF6";

  return (
    <section id="about" className="py-28 px-4 sm:px-6 relative transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: accent }} />
            01 // SYSTEM ARCHITECTURE
          </div>
          <Editable
            as="h2"
            value="Engineered for Scalability, Security, and Sub-Second Inference"
            onChange={() => {}}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6"
            style={{ color: ink }}
          />
          <Editable
            as="p"
            value="Building production AI systems requires more than simple prompt wrapping. I architect private, deterministic vector index layers, dynamic agent fallback loops, and high-performance inference gateways."
            onChange={() => {}}
            className="text-base leading-relaxed"
            style={{ color: ink, opacity: 0.75 }}
          />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Network, title: "Agentic State Machines", desc: "Autonomous decision trees built with LangGraph to execute code, verify API results, and self-correct on failure.", color: accent },
              { icon: Database, title: "Hybrid Vector RAG", desc: "Combining dense vector embeddings with sparse BM25 keyword search to eliminate hallucination in document retrieval.", color: accent },
              { icon: Lock, title: "Private LLM Isolation", desc: "Self-hosted fine-tuned open-source models inside VPC boundaries with SOC2-compliant data handling.", color: accent },
              { icon: FastForward, title: "Quantized Inference", desc: "Optimized vLLM deployments providing sub-200ms time-to-first-token under heavy concurrent traffic.", color: accent }
            ].map((card, i) => (
              <div 
                key={i} 
                className="p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl group" 
                style={{ 
                  backgroundColor: surface, 
                  borderColor: surface,
                }}
              >
                <card.icon className="h-8 w-8 mb-6 transition-transform group-hover:scale-110 duration-300" style={{ color: card.color }} />
                <Editable as="h3" value={card.title} onChange={() => {}} className="text-lg font-bold mb-3" style={{ color: ink }} />
                <Editable as="p" value={card.desc} onChange={() => {}} className="text-xs leading-relaxed" style={{ color: ink, opacity: 0.75 }} />
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl overflow-hidden border min-h-[400px] group" style={{ borderColor: surface, backgroundColor: surface }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80"
              alt="AI Engine Pipeline Diagram"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-75 transition-opacity duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl border backdrop-blur-xl" style={{ backgroundColor: `${bg}F0`, borderColor: surface }}>
              <div className="font-mono text-xs mb-1 font-bold" style={{ color: accent }}>PROPRIETARY RAG PIPELINE</div>
              <div className="text-sm font-bold" style={{ color: ink }}>Real-Time Contextual Ingestion Loop</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}