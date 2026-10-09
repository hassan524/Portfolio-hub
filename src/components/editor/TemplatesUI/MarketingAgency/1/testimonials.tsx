// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Plus, Minus, Award, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const [open, setOpen] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);

  const stats = (props?.stats && props.stats.length > 0) ? props.stats : [
    { value: "312%", label: "Avg. revenue lift" },
    { value: "96%", label: "Client retention" },
    { value: "4.9", label: "Average rating" },
    { value: "18", label: "Industry awards" },
  ];
  const quotes = (props?.quotes && props.quotes.length > 0) ? props.quotes : [
    { text: "Voltage rebuilt our funnel in six weeks and our monthly revenue tripled. No jargon, just results.", name: "Elena Park", role: "CEO, Northfield Co.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
    { text: "The most honest agency we have worked with. Weekly reports I actually read and act on.", name: "Marcus Bell", role: "CMO, Heliograph", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    { text: "Their creative team gave our brand a confidence it never had. Sales conversations got easier overnight.", name: "Sofia Alvarez", role: "Founder, Casa Lume", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  ];
  const awards = (props?.awards && props.awards.length > 0) ? props.awards : ["Agency of the Year 2025", "Google Premier Partner", "Webby Honoree", "Clutch Top 10"];
  const faqs = (props?.faqs && props.faqs.length > 0) ? props.faqs : [
    { q: "How fast can we start?", a: "Most projects kick off within ten days of signing, after a free strategy audit." },
    { q: "Do you work with small businesses?", a: "Yes. Roughly half of our clients are founders with teams under twenty people." },
    { q: "Are there long contracts?", a: "No. Retainers run month to month after an initial three month commitment." },
  ];
  const up = (key, arr, i, k, v) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="testimonials" className="relative overflow-hidden px-6 py-32" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b pb-10" style={{ borderColor: surface }}>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              <Editable as="span" value={props?.eyebrow || "03 / Proof of Work"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <Editable
              as="h2"
              className="mt-3 text-[clamp(2.8rem,7vw,7rem)] font-black uppercase leading-[0.88] tracking-tighter"
              value={props?.title || "Results speak louder."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {awards.map((a, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider" style={{ background: surface, borderColor: surface }}>
                <Award size={14} style={{ color: accent }} />
                <Editable as="span" value={a} onChange={(v) => onChange?.({ awards: awards.map((x, j) => (j === i ? v : x)) })} />
              </span>
            ))}
          </div>
        </div>

        {/* Monumental Edge-to-Edge Metrics Band (No small cards!) */}
        <div className="grid grid-cols-2 divide-y divide-x border-b lg:grid-cols-4 lg:divide-y-0" style={{ borderColor: surface }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 lg:p-10"
              style={{ borderColor: surface }}
            >
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: accent }}>Metric 0{i + 1}</span>
              <Editable
                as="div"
                className="mt-3 text-[clamp(3rem,6vw,6.5rem)] font-black leading-none tracking-tight"
                style={{ color: ink }}
                value={s.value}
                onChange={(v) => up("stats", stats, i, "value", v)}
              />
              <Editable
                as="div"
                className="mt-3 text-sm font-semibold uppercase tracking-wider"
                style={{ color: inkSecond }}
                value={s.label}
                onChange={(v) => up("stats", stats, i, "label", v)}
              />
            </motion.div>
          ))}
        </div>

        {/* Monumental Editorial Quote Spotlight */}
        <div className="py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <Quote size={56} style={{ color: accent }} className="opacity-40" />
              <div className="mt-6 flex gap-1">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={18} fill={accent} style={{ color: accent }} />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuote}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <Editable
                    as="p"
                    className="mt-6 text-[clamp(1.8rem,4vw,3.6rem)] font-black uppercase leading-[1.05] tracking-tight"
                    value={quotes[activeQuote].text}
                    onChange={(v) => up("quotes", quotes, activeQuote, "text", v)}
                  />
                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={quotes[activeQuote].img}
                      alt=""
                      className="h-16 w-16 rounded-full border-2 object-cover"
                      style={{ borderColor: accent }}
                    />
                    <div>
                      <Editable
                        as="div"
                        className="text-xl font-black uppercase"
                        value={quotes[activeQuote].name}
                        onChange={(v) => up("quotes", quotes, activeQuote, "name", v)}
                      />
                      <Editable
                        as="div"
                        className="text-sm font-medium"
                        style={{ color: inkSecond }}
                        value={quotes[activeQuote].role}
                        onChange={(v) => up("quotes", quotes, activeQuote, "role", v)}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quote Selector Roster */}
            <div className="space-y-3 lg:col-span-4">
              <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                Client Voices
              </p>
              {quotes.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuote(i)}
                  className="flex w-full items-center gap-4 border-b py-4 text-left transition duration-300 hover:pl-2"
                  style={{ borderColor: surface, opacity: activeQuote === i ? 1 : 0.4 }}
                >
                  <span className="font-mono text-sm font-bold" style={{ color: accent }}>0{i + 1}</span>
                  <div className="flex-1">
                    <div className="font-bold uppercase tracking-tight">{q.name}</div>
                    <div className="text-xs" style={{ color: inkSecond }}>{q.role}</div>
                  </div>
                  <ArrowUpRight size={16} className={activeQuote === i ? "opacity-100" : "opacity-0"} style={{ color: accent }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Architectural FAQ Accordion (No boxes!) */}
        <div className="border-t pt-16" style={{ borderColor: surface }}>
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="text-3xl font-black uppercase tracking-tight">Frequently Asked Questions</h3>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: inkSecond }}>Everything you need to know</span>
          </div>
          <div className="divide-y" style={{ borderColor: surface }}>
            {faqs.map((f, i) => (
              <div key={i} className="py-6" style={{ borderColor: surface }}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-sm font-bold" style={{ color: accent }}>0{i + 1}</span>
                    <Editable as="span" className="text-xl font-bold uppercase tracking-tight md:text-2xl" value={f.q} onChange={(v) => up("faqs", faqs, i, "q", v)} />
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition duration-300" style={{ borderColor: surface, background: surface, color: accent }}>
                    {open === i ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <Editable as="p" className="mt-4 max-w-3xl pl-9 text-base leading-relaxed md:text-lg" style={{ color: inkSecond }} value={f.a} onChange={(v) => up("faqs", faqs, i, "a", v)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
