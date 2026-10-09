// @ts-nocheck
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

/* props.category = ai | saas | agency | developer ; props.content overrides any key */
const PRESETS: Record<string, any> = {
  ai: {
    eyebrow: "Wall of Love", title: "Trusted by world-class technical founders",
    items: [
      { quote: "We migrated our entire vector search pipeline to this stack in an afternoon. Latency dropped from 240ms to 14ms instantly.", name: "Dr. Aris Thorne", role: "VP of AI Engineering, Lumina", verified: "Verified Enterprise User" },
      { quote: "The deterministic RAG guardrails solved our hallucination issues completely. Our enterprise clients trust the outputs without hesitation.", name: "Samantha Reed", role: "CTO & Co-founder, Vaultscale", verified: "Verified SaaS Founder" },
      { quote: "Zero-retention architecture was our absolute baseline requirement. The only platform that passed our security audit on day one.", name: "Julian Vance", role: "Head of Security, Apex FinTech", verified: "Verified Security Lead" },
      { quote: "Our support team went from drowning in tickets to reviewing only the edge cases. The triage swarm paid for itself in a week.", name: "Priya Nair", role: "Director of Support, Northwind", verified: "Verified Operations Lead" },
    ],
  },
  saas: {
    eyebrow: "Customer stories", title: "Teams do their best work here",
    items: [
      { quote: "We retired four tools in a month. Our sprint planning went from two hours to twenty minutes.", name: "Elena Marsh", role: "COO, Northwind", verified: "Verified Customer" },
      { quote: "The automations alone saved us a full headcount of busywork. Setup was genuinely painless.", name: "Tomás Ibarra", role: "Head of Ops, Lumen", verified: "Verified Customer" },
      { quote: "Our clients love the portals. Approvals that took days now happen before lunch.", name: "Hannah Cole", role: "Founder, Fieldstone Studio", verified: "Verified Agency Owner" },
      { quote: "Finally a tool our engineers don't complain about. Adoption was instant.", name: "Marcus Webb", role: "VP Engineering, Orbit", verified: "Verified Customer" },
    ],
  },
  agency: {
    eyebrow: "Kind words", title: "Partners who keep coming back",
    items: [
      { quote: "They understood our brand better than we did. The rebrand lifted conversion immediately.", name: "Camille Dufort", role: "Founder, Aurora Skincare", verified: "Verified Client" },
      { quote: "Fast, thoughtful, and genuinely senior. Our launch site exceeded every metric we set.", name: "Ravi Menon", role: "CEO, Kestrel", verified: "Verified Client" },
      { quote: "Weekly demos meant no surprises. The smoothest agency engagement I've had.", name: "Sofia Alvarez", role: "CMO, Maison Verde", verified: "Verified Client" },
      { quote: "The design system they built keeps paying off. Our in-house team ships twice as fast.", name: "Daniel Okafor", role: "Head of Brand, Pinecrest", verified: "Verified Client" },
    ],
  },
  developer: {
    eyebrow: "References", title: "What collaborators say",
    items: [
      { quote: "Dropped into our messy codebase, found the root cause in a day, and left it better than he found it.", name: "Alex Rivera", role: "CTO, Startup Co", verified: "Verified Client" },
      { quote: "Communicates clearly, estimates honestly, and ships. Exactly what a small team needs.", name: "Sara Khan", role: "Product Lead, Agency X", verified: "Verified Client" },
      { quote: "The app was faster and more polished than we asked for. We'd hire again without hesitation.", name: "Michael Chen", role: "Founder, Studio Y", verified: "Verified Client" },
      { quote: "Great instincts on architecture. Saved us months of rework down the line.", name: "Nina Petrova", role: "Engineering Manager", verified: "Verified Colleague" },
    ],
  },
};

export function AIProduct1Testimonials({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#0B0F19";
  const ink = theme?.ink || "#ffffff";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";
  const line = mix(ink, 12), muted = mix(ink, 72);
  const soft = (p: number) => mix(accent, p);

  const c = { ...(PRESETS[props?.category] || PRESETS.ai), ...(props?.content || {}) };

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]);
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const on = () => { setSelected(emblaApi.selectedScrollSnap()); setCount(emblaApi.scrollSnapList().length); };
    on();
    emblaApi.on("select", on);
    emblaApi.on("reInit", on);
    return () => { emblaApi.off("select", on); emblaApi.off("reInit", on); };
  }, [emblaApi]);

  const btn = "h-10 w-10 rounded-full grid place-items-center border cursor-pointer transition-transform hover:scale-105 active:scale-95";

  return (
    <section className="relative px-6 md:px-16 py-28 md:py-32 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: accent, opacity: 0.12 }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest mb-5 backdrop-blur-md" style={{ background: soft(12), color: accent, border: `1px solid ${soft(30)}` }}>
              <Editable className="inline">{c.eyebrow}</Editable>
            </div>
            <Editable as="h2" className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]" style={{ color: ink }}>{c.title}</Editable>
          </div>
          <div className="flex gap-2">
            <button aria-label="Previous" onClick={() => emblaApi?.scrollPrev()} className={btn} style={{ background: surface, borderColor: line, color: ink }}><ChevronLeft className="h-4 w-4" /></button>
            <button aria-label="Next" onClick={() => emblaApi?.scrollNext()} className={btn} style={{ background: surface, borderColor: line, color: ink }}><ChevronRight className="h-4 w-4" /></button>
          </div>
        </motion.div>

        <div ref={emblaRef} className="overflow-hidden -mx-3">
          <div className="flex">
            {c.items.map((item: any, i: number) => (
              <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] min-w-0 px-3 py-2">
                <motion.div whileHover={{ y: -6 }}
                  className="h-full p-8 rounded-3xl flex flex-col justify-between gap-8 backdrop-blur-2xl relative overflow-hidden group border transition-shadow duration-500 hover:shadow-2xl"
                  style={{ backgroundColor: surface, borderColor: line }}>
                  <svg className="absolute top-5 right-5 h-14 w-14 opacity-15 group-hover:opacity-30 transition-opacity" viewBox="0 0 24 24" fill={accent} aria-hidden>
                    <path d="M9.4 5C6 6.6 3.5 9.6 3.5 14c0 2.8 1.7 4.7 4 4.7 2 0 3.5-1.5 3.5-3.4 0-1.9-1.4-3.2-3.2-3.2-.3 0-.6 0-.8.1.3-2 1.7-3.8 3.7-4.8L9.4 5Zm9 0c-3.4 1.6-5.9 4.6-5.9 9 0 2.8 1.7 4.7 4 4.7 2 0 3.5-1.5 3.5-3.4 0-1.9-1.4-3.2-3.2-3.2-.3 0-.6 0-.8.1.3-2 1.7-3.8 3.7-4.8L18.4 5Z" />
                  </svg>

                  <div className="relative">
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, s) => (<Star key={s} className="h-4 w-4 fill-current" style={{ color: accent }} />))}
                    </div>
                    <Editable as="p" className="text-base leading-relaxed relative z-10" style={{ color: ink, opacity: 0.85 }}>{item.quote}</Editable>
                  </div>

                  <div className="pt-6 border-t flex items-center gap-4" style={{ borderColor: line }}>
                    <div className="h-12 w-12 rounded-2xl grid place-items-center font-bold text-sm shrink-0" style={{ background: soft(16), color: accent, border: `1px solid ${soft(35)}` }}>
                      <Editable className="inline">{item.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}</Editable>
                    </div>
                    <div className="min-w-0">
                      <Editable className="font-bold text-sm block" style={{ color: ink }}>{item.name}</Editable>
                      <Editable className="text-xs font-medium block mt-0.5" style={{ color: muted }}>{item.role}</Editable>
                      <div className="flex items-center gap-1 mt-1 text-[10px] font-mono" style={{ color: accent }}>
                        <CheckCircle2 className="h-3 w-3" />
                        <Editable className="inline">{item.verified}</Editable>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => emblaApi?.scrollTo(i)} className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{ width: selected === i ? 20 : 6, background: selected === i ? accent : mix(ink, 24) }} />
          ))}
        </div>
      </div>
    </section>
  );
}