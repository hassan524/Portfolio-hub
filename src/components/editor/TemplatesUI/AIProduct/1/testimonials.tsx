import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { TestimonialsProps } from "@/types/builder.schema";

type Props = BlockComponentProps<TestimonialsProps>;
const noop = () => {};

export function AIProduct1Testimonials({ theme }: Props) {
  const { ink, bg, accent } = theme;

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
    <section className="relative px-6 md:px-16 py-32 overflow-hidden" style={{ background: bg }}>
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-10" style={{ background: accent }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-md" style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}30` }}>
            <Editable value="Wall of Love" onChange={noop} className="inline" />
          </div>
          <Editable
            as="h2"
            value="Trusted by world-class technical founders"
            onChange={noop}
            className="text-4xl md:text-5xl font-black tracking-tight leading-[1.12]"
            style={{ color: ink }}
          />
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
              style={{ background: `${ink}03`, border: `1px solid ${ink}10` }}
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
                  value={item.quote}
                  onChange={noop}
                  className="text-base leading-relaxed italic relative z-10 font-normal"
                  style={{ color: `${ink}80` }}
                />
              </div>

              <div className="pt-6 border-t flex items-center gap-4" style={{ borderColor: `${ink}10` }}>
                <div className="h-12 w-12 rounded-2xl grid place-items-center font-bold text-sm shrink-0 shadow-inner" style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}>
                  {item.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <Editable value={item.name} onChange={noop} className="font-bold text-sm block" style={{ color: ink }} />
                  <Editable value={item.role} onChange={noop} className="text-xs font-medium block mt-0.5" style={{ color: `${ink}55` }} />
                  <div className="flex items-center gap-1 mt-1 text-[10px] font-mono" style={{ color: accent }}>
                    <CheckCircle2 className="h-3 w-3" />
                    {item.verified}
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