// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4Projects({ props = {}, theme }: Props) {
  const bg = theme?.bg || "#05070E";
  const ink = theme?.ink || "#FFFFFF";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#6366F1";

  const projects = [
    {
      title: "Autonomous SDR Sales Agent",
      tag: "Agentic Systems",
      desc: "Full-stack AI agent capable of qualifying leads, retrieving CRM context, drafting personalized outreach, and scheduling calendar bookings.",
      stack: ["LangChain", "OpenAI API", "Hubspot API", "Pinecone"]
    },
    {
      title: "Industrial Computer Vision Anomaly Detector",
      tag: "Computer Vision",
      desc: "Edge-deployed convolutional pipeline analyzing real-time factory video feeds to flag manufacturing defects with sub-10ms response.",
      stack: ["PyTorch", "YOLOv8", "TensorRT", "OpenCV"]
    },
    {
      title: "Enterprise Financial Document RAG Core",
      tag: "Vector Search",
      desc: "Hybrid BM25 and dense vector indexing system handling over 500k SEC filings for sub-second compliance audit queries.",
      stack: ["Qdrant", "LlamaIndex", "Mistral 7B", "FastAPI"]
    },
    {
      title: "Clinical EHR Extraction Engine",
      tag: "Healthcare AI",
      desc: "Privacy-isolated fine-tuned model parsing unstructured clinical notes into structured, HIPAA-compliant JSON format.",
      stack: ["Llama-3 Fine-Tune", "vLLM", "Docker", "AWS Nitro"]
    },
    {
      title: "High-Frequency Fraud Detection Pipeline",
      tag: "Time-Series ML",
      desc: "Streaming ML model parsing 12,000 transactions/sec to isolate suspicious behavior with minimal false-positive rates.",
      stack: ["XGBoost", "Apache Kafka", "Redis Vector", "Python"]
    },
    {
      title: "Automated PR Code Review Bot",
      tag: "Developer Tools",
      desc: "Autonomous GitHub action checking code diffs against AST security compliance standards and recommending refactors.",
      stack: ["Tree-Sitter", "Claude 3.5 Sonnet", "GitHub API"]
    }
  ];

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 transition-colors border-t border-white/5" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto">

        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: accent }} />
            02 // SELECTED DEPLOYMENTS & CASE STUDIES
          </div>
          <Editable
            as="h2"
            value="Production Systems Built for Scalability"
            onChange={() => { }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6"
            style={{ color: ink }}
          />
          <Editable
            as="p"
            value="A curated collection of scalable AI builds engineered for enterprise reliability, high throughput, and strict operational security."
            onChange={() => { }}
            className="text-base leading-relaxed"
            style={{ color: ink, opacity: 0.75 }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 p-7 flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:-translate-y-1 group"
              style={{ backgroundColor: surface }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded border border-white/10 text-white/70 bg-black/40">
                    {p.tag}
                  </span>
                  <Code2 className="h-4 w-4 text-white/30 group-hover:text-white/80 transition-colors" />
                </div>

                <Editable as="h3" value={p.title} onChange={() => { }} className="text-lg font-bold mb-3" style={{ color: ink }} />
                <Editable as="p" value={p.desc} onChange={() => { }} className="text-xs leading-relaxed mb-6 text-white/70" />
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {p.stack.map((s, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 bg-black/30 text-white/60"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: accent }}
                >
                  <span>REQUEST_TECHNICAL_SPEC</span>
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}