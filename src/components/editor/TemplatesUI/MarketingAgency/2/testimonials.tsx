// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronDown, BadgeCheck, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);

  const quotes = props?.quotes || [
    { text: "Lumora did not just redesign our product, they reframed how we think about our customers. Activation is up 64 percent.", name: "Hana Ito", role: "VP Product, Orbital", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80" },
    { text: "Rare to find a team that is this strategic and this good with craft. Every deliverable felt considered.", name: "Rafael Costa", role: "Founder, Meridian", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" },
    { text: "Their AI automation work saved our support team around 30 hours a week. Genuinely transformative.", name: "Grace Liu", role: "COO, Fernhill", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&q=80" },
  ];
  const stats = props?.stats || [
    { value: "98%", label: "Client retention rate" },
    { value: "140+", label: "Projects delivered" },
    { value: "4.9/5", label: "Average client rating" },
  ];
  const badges = props?.badges || ["Awwwards Honorable Mention", "Clutch Verified Studio", "Top Design Lab 2025"];
  const faqs = props?.faqs || [
    { q: "How long does a typical project take?", a: "Strategy sprints run two to three weeks. Full brand and web builds take eight to twelve weeks." },
    { q: "Can you work alongside our in-house team?", a: "Absolutely. We routinely embed alongside product, design and marketing leads." },
    { q: "What does transparent pricing include?", a: "Every scope covers discovery, design, development, revisions and an exhaustive handover." },
  ];
  const up = (key, arr, i, k, v) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  const q = quotes[active];

  return (
    <section id="testimonials" className="relative overflow-hidden px-6 py-32" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b pb-12" style={{ borderColor: surface }}>
          <div>
            <span className="text-xs uppercase tracking-[0.35em]" style={{ color: accent }}>
              <Editable as="span" value={props?.eyebrow || "Endorsements / 03"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <Editable
              as="h2"
              className="mt-4 text-[clamp(2.8rem,7vw,7rem)] font-extralight italic leading-[0.88] tracking-tight"
              value={props?.title || "Loved by bold teams."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-light" style={{ borderColor: surface, color: inkSecond }}>
                <BadgeCheck size={14} style={{ color: accent }} />
                <Editable as="span" value={b} onChange={(v) => onChange?.({ badges: badges.map((x, j) => (j === i ? v : x)) })} />
              </span>
            ))}
          </div>
        </div>

        {/* Monumental Editorial Quote Spotlight (NO boxy cards!) */}
        <div className="py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <Quote size={56} style={{ color: accent }} className="opacity-40" />
              <div className="mt-6 flex gap-1">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={16} fill={accent} style={{ color: accent }} />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <Editable
                    as="p"
                    className="mt-6 text-[clamp(1.8rem,4vw,3.6rem)] font-extralight italic leading-[1.1] tracking-tight"
                    value={q.text}
                    onChange={(v) => up("quotes", quotes, active, "text", v)}
                  />
                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={q.img}
                      alt=""
                      className="h-14 w-14 rounded-full border object-cover"
                      style={{ borderColor: accent }}
                    />
                    <div>
                      <Editable as="div" className="text-xl font-medium" value={q.name} onChange={(v) => up("quotes", quotes, active, "name", v)} />
                      <Editable as="div" className="text-sm font-light" style={{ color: inkSecond }} value={q.role} onChange={(v) => up("quotes", quotes, active, "role", v)} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Client Roster Nav */}
            <div className="space-y-4 lg:col-span-4 border-l pl-8" style={{ borderColor: surface }}>
              <span className="text-xs uppercase tracking-widest font-mono" style={{ color: accent }}>Partners</span>
              {quotes.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex w-full items-center gap-4 text-left transition duration-300 hover:pl-2"
                  style={{ opacity: active === i ? 1 : 0.4 }}
                >
                  <span className="font-mono text-xs" style={{ color: accent }}>0{i + 1}</span>
                  <div className="flex-1">
                    <div className="text-base font-light italic">{item.name}</div>
                    <div className="text-xs font-light" style={{ color: inkSecond }}>{item.role}</div>
                  </div>
                  <ArrowUpRight size={16} className={active === i ? "opacity-100" : "opacity-0"} style={{ color: accent }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Full-Bleed Architectural Metrics Band (Divided by lines, NOT floating cards!) */}
        <div className="grid divide-y border-y md:grid-cols-3 md:divide-x md:divide-y-0" style={{ borderColor: surface }}>
          {stats.map((s, i) => (
            <div key={i} className="py-10 md:px-10" style={{ borderColor: surface }}>
              <span className="font-mono text-xs font-light tracking-widest opacity-40">0{i + 1}</span>
              <Editable
                as="div"
                className="mt-3 text-[clamp(3.5rem,7vw,6.5rem)] font-extralight italic leading-none"
                style={{ color: ink }}
                value={s.value}
                onChange={(v) => up("stats", stats, i, "value", v)}
              />
              <Editable
                as="div"
                className="mt-3 text-xs uppercase tracking-widest font-light"
                style={{ color: inkSecond }}
                value={s.label}
                onChange={(v) => up("stats", stats, i, "label", v)}
              />
            </div>
          ))}
        </div>

        {/* Architectural FAQ Accordion */}
        <div className="mt-20">
          <div className="mb-8 flex items-baseline justify-between">
            <h3 className="text-2xl font-light italic">Frequently Addressed Inquiries</h3>
            <span className="text-xs uppercase tracking-widest font-mono" style={{ color: accent }}>Common Briefs</span>
          </div>
          <div className="divide-y border-y" style={{ borderColor: surface }}>
            {faqs.map((f, i) => (
              <div key={i} className="py-6" style={{ borderColor: surface }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 text-left">
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs opacity-50">0{i + 1}</span>
                    <Editable as="span" className="text-xl font-light italic md:text-2xl" value={f.q} onChange={(v) => up("faqs", faqs, i, "q", v)} />
                  </span>
                  <ChevronDown size={20} className={`shrink-0 transition duration-300 ${open === i ? "rotate-180" : ""}`} style={{ color: accent }} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <Editable as="p" className="mt-4 max-w-3xl pl-8 text-base font-light leading-relaxed" style={{ color: inkSecond }} value={f.a} onChange={(v) => up("faqs", faqs, i, "a", v)} />
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
