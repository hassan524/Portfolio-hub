// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trophy, Plus, Minus, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#1A0103";
  const bgSecond = theme?.["bg-second"] || "#420205";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#F8D4D4";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#E50914";
  const yellow = "#FFBF00";
  const [open, setOpen] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);

  const defaultQuotes = [
    { text: "They doubled our online sales in a single quarter. The strategy was simple, and that was the absolute genius.", name: "Hugo Laurent", role: "Owner, Maison Vert", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
    { text: "Sharp creative, ruthless about commercial results. Our most rewarding agency relationship in ten years.", name: "Amara Sy", role: "CMO, Kingfisher Bank", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&q=80" },
    { text: "From brand refresh to launch day they never missed a beat. Our flagship product sold out in 48 hours.", name: "Jonas Weber", role: "Founder, Alder Outdoors", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  ];
  const quotes = (props?.quotes && props.quotes.length > 0) ? props.quotes : defaultQuotes;

  const defaultStats = [
    { value: "$140M", label: "Client revenue generated" },
    { value: "92%", label: "Clients retain 3+ years" },
    { value: "27", label: "Premier industry trophies" },
  ];
  const stats = (props?.stats && props.stats.length > 0) ? props.stats : defaultStats;

  const defaultAwards = ["Effie Gold 2025", "Cannes Lions Shortlist", "Best Independent Agency", "Ad Age A-List"];
  const awards = (props?.awards && props.awards.length > 0) ? props.awards : defaultAwards;

  const defaultFaqs = [
    { q: "What size brands does the agency serve?", a: "From ambitious high-growth challengers to global enterprises. Minimum monthly retainer is $3,500." },
    { q: "How quickly do we see verified results?", a: "Performance media shows signals in 14 days. Brand authority and search compounding accelerate across 90 days." },
    { q: "Who actually executes our campaigns?", a: "A dedicated client lead, a lead strategist and an executive creative. Never a rotating pool of interns." },
  ];
  const faqs = (props?.faqs && props.faqs.length > 0) ? props.faqs : defaultFaqs;

  const up = (key, arr, i, k, v) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="testimonials" className="relative overflow-hidden px-4 py-32 md:px-8" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 pb-8" style={{ borderColor: accent }}>
          <div>
            <span className="font-serif text-xs font-bold uppercase tracking-[0.3em]" style={{ color: yellow }}>
              Proof & Record / 03
            </span>
            <Editable
              as="h2"
              className="mt-3 font-serif text-[clamp(3.5rem,9vw,9rem)] font-black uppercase italic leading-[0.82] tracking-tight"
              value={props?.title || "Hail the results"}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {awards.map((a, i) => (
              <span key={i} className="inline-flex items-center gap-2 border-2 px-4 py-2 text-xs font-black uppercase tracking-wider" style={{ borderColor: yellow, color: yellow }}>
                <Trophy size={14} />
                <Editable as="span" value={a} onChange={(v) => onChange?.({ awards: awards.map((x, j) => (j === i ? v : x)) })} />
              </span>
            ))}
          </div>
        </div>

        {/* Monumental Architectural Metrics Block */}
        <div className="border-2" style={{ borderColor: accent, background: accent, color: "#fff" }}>
          <div className="grid divide-y-2 md:grid-cols-3 md:divide-x-2 md:divide-y-0" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
            {stats.map((s, i) => (
              <div key={i} className="p-8 md:p-12">
                <span className="font-serif text-xs font-black uppercase tracking-widest text-white/80">Commandment 0{i + 1}</span>
                <Editable as="div" className="mt-2 font-serif text-[clamp(3.5rem,7vw,7rem)] font-black uppercase leading-none text-white" value={s.value} onChange={(v) => up("stats", stats, i, "value", v)} />
                <Editable as="div" className="mt-3 text-xs font-black uppercase tracking-[0.25em]" style={{ color: yellow }} value={s.label} onChange={(v) => up("stats", stats, i, "label", v)} />
              </div>
            ))}
          </div>
        </div>

        {/* Monumental Pull-Quote Wall */}
        <div className="py-20 border-b-2" style={{ borderColor: accent }}>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={20} fill={yellow} style={{ color: yellow }} />
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
                    className="mt-6 font-serif text-[clamp(2rem,4.5vw,4.2rem)] font-black uppercase leading-[1.05] tracking-tight text-white"
                    value={quotes[activeQuote].text}
                    onChange={(v) => up("quotes", quotes, activeQuote, "text", v)}
                  />
                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={quotes[activeQuote].img}
                      alt=""
                      className="h-16 w-16 border-2 object-cover grayscale contrast-125"
                      style={{ borderColor: yellow }}
                    />
                    <div>
                      <Editable as="div" className="font-serif text-2xl font-black uppercase text-white" value={quotes[activeQuote].name} onChange={(v) => up("quotes", quotes, activeQuote, "name", v)} />
                      <Editable as="div" className="text-xs font-black uppercase tracking-widest" style={{ color: yellow }} value={quotes[activeQuote].role} onChange={(v) => up("quotes", quotes, activeQuote, "role", v)} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Testimonial Directory Index */}
            <div className="space-y-3 lg:col-span-4 border-l-2 pl-8" style={{ borderColor: accent }}>
              <span className="font-serif text-xs font-black uppercase tracking-widest" style={{ color: yellow }}>Witness Testimony</span>
              {quotes.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuote(i)}
                  className="flex w-full items-center gap-4 border-b-2 py-4 text-left transition hover:pl-2"
                  style={{ borderColor: "rgba(255,255,255,0.1)", opacity: activeQuote === i ? 1 : 0.4 }}
                >
                  <span className="font-serif font-black" style={{ color: yellow }}>0{i + 1}</span>
                  <div className="flex-1">
                    <div className="font-serif text-lg font-black uppercase text-white">{item.name}</div>
                    <div className="text-xs uppercase tracking-wider text-white/60">{item.role}</div>
                  </div>
                  <ArrowUpRight size={18} className={activeQuote === i ? "opacity-100" : "opacity-0"} style={{ color: yellow }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Monumental FAQ Accordion */}
        <div className="mt-20">
          <Editable as="h3" className="mb-8 font-serif text-4xl font-black uppercase tracking-tight text-white md:text-5xl" value={props?.faqTitle || "Frequently Addressed"} onChange={(v) => onChange?.({ faqTitle: v })} />
          <div className="divide-y-2 border-y-2" style={{ borderColor: accent }}>
            {faqs.map((f, i) => (
              <div key={i} className="py-6">
                <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 text-left">
                  <span className="flex items-center gap-4">
                    <span className="font-serif text-sm font-black" style={{ color: yellow }}>0{i + 1}</span>
                    <Editable as="span" className="font-serif text-2xl font-black uppercase text-white md:text-3xl" value={f.q} onChange={(v) => up("faqs", faqs, i, "q", v)} />
                  </span>
                  <span style={{ color: yellow }}>{open === i ? <Minus size={24} /> : <Plus size={24} />}</span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <Editable as="p" className="mt-4 max-w-3xl pl-8 text-lg font-medium leading-relaxed text-white/80" value={f.a} onChange={(v) => up("faqs", faqs, i, "a", v)} />
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
