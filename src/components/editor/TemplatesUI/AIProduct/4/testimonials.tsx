// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { Quote, CheckCircle } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4Testimonials({ props = {}, theme }: Props) {
  const bg = theme?.bg || "#05070E";
  const ink = theme?.ink || "#FFFFFF";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#6366F1";

  return (
    <section id="testimonials" className="py-28 px-4 sm:px-6 transition-colors border-t border-white/5" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto">

        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: accent }} />
            03 // TECHNICAL BENCHMARKS & VALIDATION
          </div>
          <Editable
            as="h2"
            value={props?.heading || "Endorsed by Engineering Leadership"}
            onChange={() => { }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
            style={{ color: ink }}
          />
        </div>

        <div
          className="relative rounded-2xl border border-white/10 p-8 sm:p-12 overflow-hidden backdrop-blur-2xl shadow-2xl"
          style={{ backgroundColor: surface }}
        >
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">

            <div className="lg:col-span-8">
              <Quote className="h-8 w-8 mb-6 opacity-30" style={{ color: accent }} />
              <Editable
                as="p"
                value="The architectural depth provided was exceptional. Rather than delivering boilerplate model scripts, we received a hardened RAG pipeline with determinism guardrails that cut query latency by 65% while guaranteeing single-tenant isolation."
                onChange={() => { }}
                className="text-lg sm:text-2xl font-medium leading-relaxed mb-8"
                style={{ color: ink }}
              />
              <div>
                <Editable as="div" value="Alexander Wolfe" onChange={() => { }} className="text-lg font-bold mb-0.5" style={{ color: ink }} />
                <Editable as="div" value="VP of Engineering // Global Financial Systems" onChange={() => { }} className="text-xs font-mono font-semibold" style={{ color: accent }} />
              </div>
            </div>

            {/* Performance Impact Metrics Box */}
            <div className="lg:col-span-4 p-6 rounded-xl border border-white/10 bg-black/40 space-y-4 font-mono text-xs">
              <div className="text-white/50 text-[10px] uppercase tracking-widest mb-2 font-bold">DEPLOYMENT IMPACT</div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-white/70">Latency Cut</span>
                <span className="text-emerald-400 font-bold">-65%</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-white/70">Hallucination Rate</span>
                <span className="text-emerald-400 font-bold">&lt; 0.1%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/70">Compliance Audit</span>
                <span className="text-emerald-400 font-bold">PASSED</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}