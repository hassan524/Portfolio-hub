// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { Mail, MapPin, Terminal, ArrowRight, ShieldCheck } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct4Contact({ props = {}, theme }: Props) {
  const bg = theme?.bg || "#05070E";
  const ink = theme?.ink || "#FFFFFF";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#6366F1";

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 relative transition-colors border-t border-white/5" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <div className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: accent }} />
            04 // INITIATE SYSTEM AUDIT
          </div>

          <Editable
            as="h2"
            value="Ready to Build Scalable AI Architecture?"
            onChange={() => { }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6"
            style={{ color: ink }}
          />

          <Editable
            as="p"
            value="Whether you require a RAG optimization overhaul, an autonomous agent pipeline, or a comprehensive security audit of your model inference infrastructure, I am available for direct consultation."
            onChange={() => { }}
            className="text-base leading-relaxed mb-10 text-white/70"
          />

          <div className="space-y-4 mb-10">
            <div className="p-4 rounded-xl border border-white/10 flex items-center gap-4" style={{ backgroundColor: surface }}>
              <div className="h-10 w-10 rounded-lg border border-white/10 flex items-center justify-center shrink-0" style={{ color: accent }}>
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-white/50">Direct Terminal Email</div>
                <Editable as="div" value="architecture@nexus-ai.io" onChange={() => { }} className="text-sm font-bold font-mono" style={{ color: ink }} />
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/10 flex items-center gap-4" style={{ backgroundColor: surface }}>
              <div className="h-10 w-10 rounded-lg border border-white/10 flex items-center justify-center shrink-0" style={{ color: accent }}>
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-white/50">Location</div>
                <Editable as="div" value="San Francisco, CA // Global Remote" onChange={() => { }} className="text-sm font-bold font-mono" style={{ color: ink }} />
              </div>
            </div>
          </div>

          <a
            href="mailto:architecture@nexus-ai.io"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-mono text-xs font-bold transition-all duration-200 hover:opacity-90 active:scale-95 cursor-pointer"
            style={{ backgroundColor: accent, color: "#FFFFFF" }}
          >
            <Editable value="SCHEDULE_TECHNICAL_AUDIT" onChange={() => { }} className="inline" />
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Terminal Card */}
        <div className="relative rounded-2xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl" style={{ backgroundColor: "rgba(10, 14, 28, 0.9)" }}>
          <div className="flex items-center gap-2 pb-5 border-b border-white/10 text-xs font-mono font-bold" style={{ color: accent }}>
            <Terminal className="h-4 w-4" />
            <span>deployment_console.sh</span>
          </div>

          <div className="font-mono text-xs space-y-3 py-6 leading-relaxed text-white/70">
            <p style={{ color: accent }}>&gt; initializing system audit...</p>
            <p>&gt; checking vector database indices... [OK]</p>
            <p>&gt; verifying single-tenant privacy boundaries... [SECURE]</p>
            <p>&gt; measuring sub-150ms token generation velocity... [READY]</p>
            <p className="text-emerald-400 font-bold">&gt; STATUS: System ready for technical scoping.</p>
          </div>

          <div className="p-4 rounded-xl border border-white/10 flex items-center gap-3 bg-black/40">
            <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
            <div className="text-xs text-white/70">
              Strict NDA and single-tenant privacy protocols applied to all audits.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}