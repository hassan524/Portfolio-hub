// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Plus, Minus, Award } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = props?.stats || [
    { value: "240+", label: "Clients served" },
    { value: "96%", label: "Renew with us" },
    { value: "4.9/5", label: "Average rating" },
    { value: "14", label: "Industry awards" },
  ];
  const quotes = props?.quotes || [
    { quote: "Verdant cut our packaging waste by a third in six months and the finance team finally trusts our sustainability numbers.", name: "Helena Brandt", role: "COO, Northfield Foods", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
    { quote: "Clear, direct and practical. Their supplier audit found savings we had missed for years.", name: "Tom Whitaker", role: "Procurement Director, Alder Logistics", rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
    { quote: "Our first ESG report went from an annual dread to a two-week process. The team made it simple.", name: "Sofia Marchetti", role: "CFO, Linden Retail Group", rating: 5, image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" },
  ];
  const awards = props?.awards || ["Top Consultancy 2025, Green Business Review", "Excellence in ESG Advisory 2024", "Best Small Firm for Client Results 2023"];
  const faqs = props?.faqs || [
    { q: "How long does a typical engagement take?", a: "Most projects run between four and twelve weeks, depending on size. You get a fixed timeline during the scoping call." },
    { q: "Do you work with small companies?", a: "Yes. Around half of our clients have fewer than 100 employees, and our packages are sized accordingly." },
    { q: "What do we need to prepare?", a: "Recent utility bills, supplier lists and any existing reports. We send a short checklist before we start." },
  ];

  const upd = (key: string, arr: any[], i: number, field: string, v: string) =>
    onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? { ...x, [field]: v } : x)) });

  return (
    <section id="testimonials" className="py-24 sm:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>
            <Editable value={props?.eyebrow || "Client results"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
          </div>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl" style={{ color: ink }}>
            <Editable value={props?.title || "Trusted by teams that need real outcomes"} onChange={(v: string) => onChange?.({ title: v })} />
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s: any, i: number) => (
            <div key={i} className="rounded-[2rem] p-7 text-center" style={{ backgroundColor: i === 0 ? accent : surface, color: i === 0 ? bg : ink }}>
              <div className="text-4xl font-extrabold tracking-tight">
                <Editable value={s.value} onChange={(v: string) => upd("stats", stats, i, "value", v)} />
              </div>
              <div className="mt-2 text-sm font-medium" style={{ opacity: 0.8 }}>
                <Editable value={s.label} onChange={(v: string) => upd("stats", stats, i, "label", v)} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {quotes.map((q: any, i: number) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col rounded-[2rem] p-8 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}
            >
              <Quote className="h-8 w-8" style={{ color: accent }} />
              <div className="mt-5 flex gap-1">
                {Array.from({ length: q.rating || 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4" style={{ color: accent, fill: accent }} />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed" style={{ color: ink }}>
                <Editable value={q.quote} onChange={(v: string) => upd("quotes", quotes, i, "quote", v)} />
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 pt-6" style={{ borderTop: `1px solid ${surface}` }}>
                <img src={q.image} alt={q.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-bold" style={{ color: ink }}>
                    <Editable value={q.name} onChange={(v: string) => upd("quotes", quotes, i, "name", v)} />
                  </div>
                  <div className="text-xs" style={{ color: inkSecond }}>
                    <Editable value={q.role} onChange={(v: string) => upd("quotes", quotes, i, "role", v)} />
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-[2rem] p-6 md:flex-row md:items-center md:justify-between md:gap-8 md:p-8" style={{ backgroundColor: surface }}>
          {awards.map((a: string, i: number) => (
            <div key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
              <Award className="h-5 w-5 shrink-0" style={{ color: accent }} />
              <Editable value={a} onChange={(v: string) => onChange?.({ awards: awards.map((x: string, j: number) => (j === i ? v : x)) })} />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <h3 className="text-center text-3xl font-extrabold tracking-tight" style={{ color: ink }}>
            <Editable value={props?.faqTitle || "Common questions"} onChange={(v: string) => onChange?.({ faqTitle: v })} />
          </h3>
          <div className="mt-8 space-y-3">
            {faqs.map((f: any, i: number) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="overflow-hidden rounded-3xl" style={{ backgroundColor: surface }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    style={{ color: ink }}
                  >
                    <span className="text-base font-bold">
                      <Editable value={f.q} onChange={(v: string) => upd("faqs", faqs, i, "q", v)} />
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: accent, color: bg }}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: inkSecond }}>
                          <Editable value={f.a} onChange={(v: string) => upd("faqs", faqs, i, "a", v)} />
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
