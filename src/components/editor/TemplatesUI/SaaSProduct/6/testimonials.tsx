// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [idx, setIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const quotes = props?.quotes || [
    { text: "Maren rebuilt our onboarding in three weeks. Trial conversions nearly doubled and our support inbox went quiet. She explains every decision in plain language.", name: "Grace Whitfield", role: "Founder, Orbit Desk", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
    { text: "I have worked with agencies of thirty people who delivered less. Maren shipped our first paid version in nine weeks and trained my team to run it.", name: "Samuel Adeyemi", role: "CEO, Tidewell", rating: 5, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    { text: "Calm, direct and extremely good at the details. The Friday updates alone were worth the price.", name: "Leah Fontaine", role: "Product lead, Quillbase", rating: 5, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
  ];
  const stats = props?.stats || [
    { value: "4.9 / 5", label: "average client rating" },
    { value: "92%", label: "of clients hire me again" },
    { value: "3", label: "design awards in 2025" },
  ];
  const faqs = props?.faqs || [
    { q: "How soon can we start?", a: "I take on a small number of projects each quarter. Most clients start within three to five weeks of our first call." },
    { q: "Do I own the code and designs?", a: "Yes. You receive the repository, design files and documentation at the end of every project." },
    { q: "Can you work with our existing team?", a: "Often, yes. About half of my work is alongside in-house engineers and designers." },
  ];
  const setQ = (i: number, patch: any) => onChange?.({ quotes: quotes.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });
  const setS = (i: number, patch: any) => onChange?.({ stats: stats.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });
  const setF = (i: number, patch: any) => onChange?.({ faqs: faqs.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });
  const q = quotes[idx];

  return (
    <section id="testimonials" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl">
        <Editable as="h2" value={props?.title || "What clients say after launch"} onChange={(v: string) => onChange?.({ title: v })} className="max-w-3xl font-['Bricolage_Grotesque'] text-4xl font-bold leading-tight tracking-tight sm:text-6xl" style={{ color: ink }} />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="relative flex min-w-0 flex-col justify-between overflow-hidden rounded-[2rem] p-8 sm:p-12" style={{ backgroundColor: bgSecond }}>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
                <div className="flex gap-1" style={{ color: accent }}>{Array.from({ length: q.rating }).map((_, k) => (<Star key={k} size={18} fill="currentColor" />))}</div>
                <Editable as="blockquote" value={q.text} onChange={(v: string) => setQ(idx, { text: v })} className="mt-6 font-['Bricolage_Grotesque'] text-2xl font-medium leading-snug sm:text-3xl" style={{ color: ink }} />
                <div className="mt-8 flex items-center gap-4">
                  <img src={q.avatar} alt={q.name} className="h-14 w-14 rounded-full object-cover" />
                  <div className="min-w-0">
                    <Editable as="p" value={q.name} onChange={(v: string) => setQ(idx, { name: v })} className="font-semibold" style={{ color: ink }} />
                    <Editable as="p" value={q.role} onChange={(v: string) => setQ(idx, { role: v })} className="text-sm" style={{ color: inkSecond }} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex items-center gap-3">
              <button aria-label="Previous" onClick={() => setIdx((idx - 1 + quotes.length) % quotes.length)} className="flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: surface, color: ink }}><ChevronLeft size={20} /></button>
              <button aria-label="Next" onClick={() => setIdx((idx + 1) % quotes.length)} className="flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}><ChevronRight size={20} /></button>
              <span className="ml-2 text-sm" style={{ color: inkSecond }}>{idx + 1} of {quotes.length}</span>
            </div>
          </div>

          <div className="grid min-w-0 gap-4">
            {stats.map((s: any, i: number) => (
              <div key={i} className="rounded-3xl p-6" style={{ backgroundColor: surface }}>
                <Editable as="p" value={s.value} onChange={(v: string) => setS(i, { value: v })} className="font-['Bricolage_Grotesque'] text-4xl font-bold" style={{ color: ink }} />
                <Editable as="p" value={s.label} onChange={(v: string) => setS(i, { label: v })} className="mt-1" style={{ color: inkSecond }} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Editable as="h3" value={props?.faqTitle || "Questions people ask before we start"} onChange={(v: string) => onChange?.({ faqTitle: v })} className="font-['Bricolage_Grotesque'] text-3xl font-semibold tracking-tight" style={{ color: ink }} />
          <div>
            {faqs.map((f: any, i: number) => (
              <div key={i} className="border-t" style={{ borderColor: surface }}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                  <Editable as="span" value={f.q} onChange={(v: string) => setF(i, { q: v })} className="text-lg font-medium" style={{ color: ink }} />
                  <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: surface, color: ink }}><Plus size={18} /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <Editable as="p" value={f.a} onChange={(v: string) => setF(i, { a: v })} className="max-w-xl pb-6 leading-relaxed" style={{ color: inkSecond }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div className="border-t" style={{ borderColor: surface }} />
          </div>
        </div>
      </div>
    </section>
  );
}
