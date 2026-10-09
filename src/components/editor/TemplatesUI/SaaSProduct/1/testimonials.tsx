// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Plus, Minus, Award, ShieldCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [index, setIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const quotes = props?.quotes || [
    {
      text: "I stopped buying products I did not need. Veluna told me what my skin was actually missing and the change in two months was obvious.",
      name: "Hana Sato",
      role: "Product designer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    },
    {
      text: "As a dermatologist I am wary of apps. This one respects the science, flags what needs a clinician and never oversells.",
      name: "Dr. Priya Raman",
      role: "Consultant dermatologist",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80",
    },
    {
      text: "The seasonal adjustments are the clever part. My routine changed before my skin had a chance to complain.",
      name: "Jonas Eriksen",
      role: "Photographer",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
  ];
  const stats = props?.stats || [
    { value: "4.9", label: "Average app rating" },
    { value: "31", label: "Countries served" },
    { value: "180k", label: "Scans completed" },
    { value: "0", label: "Sponsored reviews" },
  ];
  const badges = props?.badges || ["Best Skincare App 2025", "Clinically tested", "B Corp pending", "Dermatology partner network"];
  const faqs = props?.faqs || [
    { q: "Do I need to replace my current products?", a: "No. The platform works with what you own and only suggests additions when there is a real gap." },
    { q: "Is the scan medical advice?", a: "It is guidance, not diagnosis. Anything unusual is flagged for a clinician to review." },
    { q: "How long until I see a difference?", a: "Most members notice calmer, more even skin within six to eight weeks of consistent use." },
    { q: "Is the formula range suitable for sensitive skin?", a: "Yes. Everything is fragrance free and tested on reactive skin before launch." },
  ];

  const q = quotes[index];
  const updQuote = (patch: any) =>
    onChange?.({ quotes: quotes.map((x: any, i: number) => (i === index ? { ...x, ...patch } : x)) });
  const updFaq = (i: number, patch: any) =>
    onChange?.({ faqs: faqs.map((x: any, idx: number) => (idx === i ? { ...x, ...patch } : x)) });
  const updStat = (i: number, patch: any) =>
    onChange?.({ stats: stats.map((x: any, idx: number) => (idx === i ? { ...x, ...patch } : x)) });

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden" style={{ background: bgSecond, color: ink }}>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: accent }} />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: accent }}>
            <Editable value={props?.eyebrow || "Social proof"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </span>
          <h2 className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            <Editable value={props?.title || "Loved by skin, trusted by clinicians."} onChange={(v) => onChange?.({ title: v })} />
          </h2>
        </div>

        {/* Featured quote */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <Quote size={40} style={{ color: accent }} className="mx-auto" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="mt-6 font-[Georgia,'Times_New_Roman',serif] text-2xl sm:text-3xl lg:text-4xl leading-snug">
                <Editable value={q.text} onChange={(v) => updQuote({ text: v })} />
              </p>
              <div className="mt-8 flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill={i < (q.rating || 5) ? accent : "none"} style={{ color: accent }} />
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-4">
                <img src={q.avatar} alt={q.name} className="w-14 h-14 rounded-full object-cover" />
                <div className="text-left">
                  <div className="font-medium">
                    <Editable value={q.name} onChange={(v) => updQuote({ name: v })} />
                  </div>
                  <div className="text-sm" style={{ color: inkSecond }}>
                    <Editable value={q.role} onChange={(v) => updQuote({ role: v })} />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex justify-center gap-2">
            {quotes.map((_: any, i: number) => (
              <button
                key={i}
                aria-label={`Quote ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-2 rounded-full transition-all duration-300 active:scale-95"
                style={{ width: i === index ? 40 : 10, background: i === index ? accent : surface }}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="py-8 px-4 text-center"
              style={{ borderTop: `1px solid ${surface}` }}
            >
              <div className="font-[Georgia,'Times_New_Roman',serif] text-5xl sm:text-6xl" style={{ color: accent }}>
                <Editable value={s.value} onChange={(v) => updStat(i, { value: v })} />
              </div>
              <div className="mt-2 text-xs sm:text-sm" style={{ color: inkSecond }}>
                <Editable value={s.label} onChange={(v) => updStat(i, { label: v })} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {badges.map((b: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm" style={{ background: surface }}>
              {i % 2 ? <ShieldCheck size={15} style={{ color: accent }} /> : <Award size={15} style={{ color: accent }} />}
              <Editable value={b} onChange={(v) => onChange?.({ badges: badges.map((x: string, idx: number) => (idx === i ? v : x)) })} />
            </span>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-28 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h3 className="font-[Georgia,'Times_New_Roman',serif] text-3xl sm:text-4xl leading-tight">
              <Editable value={props?.faqTitle || "Questions, answered plainly."} onChange={(v) => onChange?.({ faqTitle: v })} />
            </h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: inkSecond }}>
              <Editable value={props?.faqText || "Still unsure about something? Our team replies within a working day."} onChange={(v) => onChange?.({ faqText: v })} />
            </p>
          </div>
          <div className="lg:col-span-8">
            {faqs.map((f: any, i: number) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ borderTop: `1px solid ${surface}`, borderBottom: i === faqs.length - 1 ? `1px solid ${surface}` : undefined }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-[Georgia,'Times_New_Roman',serif] text-xl sm:text-2xl">
                      <Editable value={f.q} onChange={(v) => updFaq(i, { q: v })} />
                    </span>
                    <span className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center" style={{ background: isOpen ? accent : surface, color: isOpen ? bg : ink }}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-14 text-sm sm:text-base leading-relaxed" style={{ color: inkSecond }}>
                          <Editable value={f.a} onChange={(v) => updFaq(i, { a: v })} />
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
