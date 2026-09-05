// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { Quote, Sparkles } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

export function AIProduct4Testimonials({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#060813";
  const ink = theme?.ink || "#F1F5F9";
  const accent = theme?.accent || "#8B5CF6";

  return (
    <section id="testimonials" className="py-28 px-4 sm:px-6 transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block animate-pulse" style={{ backgroundColor: accent }} />
            03 // EXECUTIVE VALIDATION
          </div>
          <Editable
            as="h2"
            value="Endorsed by Engineering Leaders"
            onChange={() => {}}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
            style={{ color: ink }}
          />
        </div>

        <div 
          className="relative rounded-3xl border p-8 sm:p-14 overflow-hidden backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-violet-500/40" 
          style={{ backgroundColor: `${accent}08`, borderColor: `${accent}30` }}
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20" style={{ backgroundColor: accent }} />

          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border h-80" style={{ borderColor: `${accent}35` }}>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80"
                alt="Alexander Wolfe"
                className="w-full h-full object-cover object-top opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl backdrop-blur-md border flex items-center gap-2 text-[10px] font-mono" style={{ backgroundColor: `${bg}EE`, borderColor: `${accent}30`, color: accent }}>
                <Sparkles className="h-3.5 w-3.5" />
                <span>CTO // FinTech Enterprise</span>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-center">
              <Quote className="h-10 w-10 mb-6 opacity-40" style={{ color: accent }} />
              <Editable
                as="p"
                value="The architectural depth delivered was extraordinary. Instead of wrapping basic API endpoints, we received a fully customized RAG pipeline with determinism controls that cut operational latency by 65% while maintaining zero data leakage."
                onChange={() => {}}
                className="text-lg sm:text-2xl font-medium leading-relaxed mb-8"
              />
              <div>
                <Editable as="div" value="Alexander Wolfe" onChange={() => {}} className="text-xl font-bold mb-1" />
                <Editable as="div" value="Chief Technology Officer, Global Finance Systems" onChange={() => {}} className="text-xs font-mono font-semibold" style={{ color: accent }} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}