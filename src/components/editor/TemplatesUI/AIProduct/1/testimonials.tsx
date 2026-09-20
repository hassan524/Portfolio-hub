// @ts-nocheck
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

export function AIProduct1Testimonials({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#0B0F19";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";

  const testimonials = [
    {
      quote: "We migrated our entire vector search pipeline to this stack in an afternoon. Latency dropped from 240ms to 14ms instantly.",
      name: "Dr. Aris Thorne",
      role: "VP of AI Engineering, Lumina",
      verified: "Verified Enterprise User",
    },
    {
      quote: "The deterministic RAG guardrails solved our hallucination issues completely. Our enterprise clients trust the outputs without hesitation.",
      name: "Samantha Reed",
      role: "CTO & Co-founder, Vaultscale",
      verified: "Verified SaaS Founder",
    },
    {
      quote: "Zero-retention architecture was our absolute baseline requirement. This is the only platform that passed our rigorous security audit on day one.",
      name: "Julian Vance",
      role: "Head of Security, Apex FinTech",
      verified: "Verified Security Lead",
    },
  ];

  return (
    <section className="relative px-6 md:px-16 py-32 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-10" style={{ background: accent }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-md" style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}30` }}>
            <Editable className="inline">Wall of Love</Editable>
          </div>
          <Editable
            as="h2"
            className="text-4xl md:text-5xl font-black tracking-tight leading-[1.12]"
            style={{ color: ink }}
          >Trusted by world-class technical founders</Editable>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, boxShadow: `0 30px 60px ${accent}15` }}
              className="p-8 rounded-3xl flex flex-col justify-between gap-8 backdrop-blur-2xl relative overflow-hidden group transition-all duration-500"
              style={{ backgroundColor: surface, border: `1px solid ${surface}` }}
            >
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-25 transition-opacity">
                <Quote className="h-10 w-10" style={{ color: accent }} />
              </div>

              <div>
                <div className="flex gap-1.5 mb-6">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" style={{ color: accent }} />
                  ))}
                </div>
                <Editable
                  as="p"
                  className="text-base leading-relaxed italic relative z-10 font-normal"
                  style={{ color: ink, opacity: 0.75 }}
                >{item.quote}</Editable>
              </div>

              <div className="pt-6 border-t flex items-center gap-4" style={{ borderColor: surface }}>
                <div className="h-12 w-12 rounded-2xl grid place-items-center font-bold text-sm shrink-0 shadow-inner" style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
                  <Editable className="inline">{item.name.split(" ").map(n => n[0]).join("")}</Editable>
                </div>
                <div>
                  <Editable className="font-bold text-sm block" style={{ color: ink }}>{item.name}</Editable>
                  <Editable className="text-xs font-medium block mt-0.5" style={{ color: ink, opacity: 0.75 }}>{item.role}</Editable>
                  <div className="flex items-center gap-1 mt-1 text-[10px] font-mono" style={{ color: accent }}>
                    <CheckCircle2 className="h-3 w-3" />
                    <Editable className="inline">{item.verified}</Editable>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}