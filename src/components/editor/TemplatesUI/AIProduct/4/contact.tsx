// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { Mail, MapPin, Terminal, ArrowRight, ShieldCheck } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4Contact({ props = {}, theme }: Props) {
  const bg = theme?.bg || "#060813";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#8B5CF6";

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 relative transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: accent }} />
            04 // INITIATE CONSULTATION
          </div>
          
          <Editable
            as="h2"
            value="Need Production-Ready AI Architecture?"
            onChange={() => {}}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6"
            style={{ color: ink }}
          />
          
          <Editable
            as="p"
            value="Whether you need a full RAG overhaul, an agentic state machine build, or an audit of your model inference pipelines, I offer specialized technical consultation and lead architecture roles."
            onChange={() => {}}
            className="text-base leading-relaxed mb-10"
            style={{ color: ink, opacity: 0.75 }}
          />

          <div className="space-y-6 mb-12">
            <div className="p-5 rounded-2xl border flex items-center gap-4 transition-all duration-300" style={{ backgroundColor: surface, borderColor: surface }}>
              <div className="h-12 w-12 rounded-xl border flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20`, borderColor: surface, color: accent }}>
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase" style={{ color: ink, opacity: 0.75 }}>Direct Terminal Email</div>
                <Editable as="div" value="architecture@nexus-ai.io" onChange={() => {}} className="text-sm font-bold font-mono" style={{ color: ink }} />
              </div>
            </div>

            <div className="p-5 rounded-2xl border flex items-center gap-4 transition-all duration-300" style={{ backgroundColor: surface, borderColor: surface }}>
              <div className="h-12 w-12 rounded-xl border flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20`, borderColor: surface, color: accent }}>
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase" style={{ color: ink, opacity: 0.75 }}>Base Operations</div>
                <Editable as="div" value="San Francisco, CA // Available Global Remote" onChange={() => {}} className="text-sm font-bold font-mono" style={{ color: ink }} />
              </div>
            </div>
          </div>

          <a
            href="mailto:architecture@nexus-ai.io"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            style={{ backgroundColor: accent, color: ink, boxShadow: `0 0 30px ${accent}75` }}
          >
            <Editable value="SCHEDULE_TECHNICAL_AUDIT" onChange={() => {}} className="inline" />
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Terminal Card */}
        <div className="relative rounded-3xl border p-8 shadow-2xl backdrop-blur-xl" style={{ backgroundColor: surface, borderColor: surface }}>
          <div className="flex items-center gap-2 pb-6 border-b text-xs font-mono font-bold" style={{ borderColor: surface, color: accent }}>
            <Terminal className="h-4 w-4" />
            <span>deployment_console.sh</span>
          </div>

          <div className="font-mono text-xs space-y-3.5 py-6 leading-relaxed" style={{ color: ink, opacity: 0.75 }}>
            <p style={{ color: accent }}>&gt; initializing system audit...</p>
            <p>&gt; checking vector database indices... [OK]</p>
            <p>&gt; verifying single-tenant privacy bounds... [SECURE]</p>
            <p>&gt; measuring sub-200ms token generation velocity... [READY]</p>
            <p className="text-emerald-400 font-bold">&gt; STATUS: Architecture ready for technical scoping.</p>
          </div>

          <div className="p-5 rounded-2xl border flex items-center gap-3" style={{ backgroundColor: bg, borderColor: surface }}>
            <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-400" />
            <div className="text-xs" style={{ color: ink, opacity: 0.75 }}>
              Strict NDA and single-tenant data isolation protocols applied to all architectural audits.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}