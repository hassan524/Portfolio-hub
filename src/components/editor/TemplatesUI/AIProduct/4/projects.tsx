import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

export function AIProduct4Projects({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#060813";
  const ink = theme?.ink || "#F1F5F9";
  const accent = theme?.accent || "#8B5CF6";

  const projects = [
    {
      title: "Autonomous Sales SDR Agent",
      tag: "Agentic Multi-Step",
      desc: "Full-stack AI agent capable of qualifying leads, retrieving CRM context, drafting hyper-personalized emails, and scheduling calls.",
      stack: ["LangChain", "OpenAI API", "Hubspot API", "Pinecone"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Industrial Vision Anomaly Engine",
      tag: "Computer Vision",
      desc: "Edge-deployed CNN pipeline analyzing real-time factory video streams to identify manufacturing flaws with sub-10ms response.",
      stack: ["PyTorch", "YOLOv8", "TensorRT", "OpenCV"],
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Enterprise Document RAG Core",
      tag: "NLP & Vector DB",
      desc: "Hybrid BM25 + dense vector indexing system handling over 500k SEC filings for instant risk evaluation queries.",
      stack: ["Qdrant", "Llama-Index", "Mistral-7B", "FastAPI"],
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Clinical EHR Extraction Suite",
      tag: "Healthcare AI",
      desc: "Privacy-isolated fine-tuned model parsing unstructured doctor notes into structured, HIPAA-compliant JSON format.",
      stack: ["Llama-3 Fine-Tune", "vLLM", "Docker", "AWS Nitro"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "High-Frequency Fraud Detector",
      tag: "Time-Series ML",
      desc: "Streaming ML model parsing 12,000 transactions/sec to isolate suspicious behavior with zero false-positive spikes.",
      stack: ["XGBoost", "Apache Kafka", "Redis Vector", "Python"],
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80"
    },
    {
      title: "Automated PR Code Reviewer",
      tag: "Dev Tooling",
      desc: "Autonomous GitHub action bot checking code diffs against AST security compliance and suggesting optimized refactors.",
      stack: ["Tree-Sitter", "Claude 3.5 Sonnet", "GitHub API"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section id="projects" className="py-28 px-4 sm:px-6 transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: accent }} />
            02 // SELECTED DEPLOYMENTS
          </div>
          <Editable
            as="h2"
            value="Production Builds & AI Architecture Case Studies"
            onChange={() => {}}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6"
            style={{ color: ink }}
          />
          <Editable
            as="p"
            value="A curated collection of scalable AI implementations designed for real-world reliability, enterprise compliance, and low-latency throughput."
            onChange={() => {}}
            className="text-base opacity-75 leading-relaxed"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className="rounded-3xl border overflow-hidden flex flex-col group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
              style={{ 
                backgroundColor: `${accent}0A`, 
                borderColor: `${accent}25`,
                boxShadow: `0 10px 30px ${bg}AA`
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-65 group-hover:opacity-95 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-transparent" />
                <span 
                  className="absolute top-4 left-4 font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg"
                  style={{ backgroundColor: `${bg}EE`, borderColor: `${accent}40`, color: accent }}
                >
                  {p.tag}
                </span>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <Editable as="h3" value={p.title} onChange={() => {}} className="text-xl font-bold mb-3" />
                <Editable as="p" value={p.desc} onChange={() => {}} className="text-xs opacity-65 leading-relaxed mb-6 flex-grow" />

                <div className="flex flex-wrap gap-2 mb-8">
                  {p.stack.map((s, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg border"
                      style={{ backgroundColor: `${accent}12`, borderColor: `${accent}25`, color: ink }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-5 border-t flex items-center justify-between text-xs font-mono font-bold" style={{ borderColor: `${accent}20`, color: accent }}>
                  <span>SYSTEM_SPEC_DOCS</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}