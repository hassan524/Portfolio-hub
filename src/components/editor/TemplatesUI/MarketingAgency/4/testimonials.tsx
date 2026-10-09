// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Medal, Plus, Minus, ArrowUpRight, Smile } from "lucide-react";
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

  const quotes = (props?.quotes && props.quotes.length > 0) ? props.quotes : [
    { text: "Our mascot went viral in a week. Blobby understood our brand personality better than we did ourselves.", name: "Pia Moretti", role: "Head of Marketing, Snackwell", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
    { text: "The most joyful, imaginative project we have ever run, and the commercial results were dead serious.", name: "Ben Ocampo", role: "Founder, Pixel Pup", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    { text: "Their 3D website made top investors smile in the first ten seconds. We closed our Series A that month.", name: "Lila Novak", role: "CEO, Orbitly", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
  ];
  const stats = (props?.stats && props.stats.length > 0) ? props.stats : [
    { value: "5.0", label: "Client satisfaction rating" },
    { value: "2M+", label: "Organic viral impressions" },
    { value: "14", label: "Global design trophies" },
  ];
  const awards = (props?.awards && props.awards.length > 0) ? props.awards : ["Awwwards Site of the Day", "Dribbble Trending #1", "Behance Curated Pick", "Motion Annual Winner"];
  const faqs = (props?.faqs && props.faqs.length > 0) ? props.faqs : [
    { q: "How long does a project take?", a: "Custom characters take 3 weeks, full living identities take 5 to 6 weeks, and interactive WebGL worlds take 8 to 10 weeks." },
    { q: "Do you take on boutique commissions?", a: "Yes! Single bespoke 3D hero assets and holo visual assets start at $1,800." },
    { q: "Are full 3D source files included?", a: "Every project is delivered with organized Blender/Cinema4D source files, GLTF exports, and complete usage documentation." },
  ];
  const up = (key, arr, i, k, v) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="testimonials" className="relative overflow-hidden px-6 py-32" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b pb-12" style={{ borderColor: surface }}>
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>
              <Smile size={14} />
              <Editable as="span" value={props?.eyebrow || "Wall of Praise / 03"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <Editable
              as="h2"
              className="mt-4 text-[clamp(3.5rem,9.5vw,9rem)] font-black uppercase leading-[0.85] tracking-tighter"
              value={props?.title || "People say nice things"}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {awards.map((a, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold" style={{ background: surface, borderColor: surface }}>
                <Medal size={14} style={{ color: accent }} />
                <Editable as="span" value={a} onChange={(v) => onChange?.({ awards: awards.map((x, j) => (j === i ? v : x)) })} />
              </span>
            ))}
          </div>
        </div>

        {/* Monumental Quote Showcase */}
        <div className="py-20 border-b" style={{ borderColor: surface }}>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={20} fill={accent} style={{ color: accent }} />
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
                    className="mt-6 text-[clamp(2rem,4.5vw,4.2rem)] font-black uppercase leading-[1.05] tracking-tight"
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
                      <Editable as="div" className="text-2xl font-black uppercase" value={quotes[activeQuote].name} onChange={(v) => up("quotes", quotes, activeQuote, "name", v)} />
                      <Editable as="div" className="text-sm font-bold uppercase tracking-wider" style={{ color: accent }} value={quotes[activeQuote].role} onChange={(v) => up("quotes", quotes, activeQuote, "role", v)} />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quote Selector Roster */}
            <div className="space-y-3 lg:col-span-4 border-l pl-8" style={{ borderColor: surface }}>
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>Client Voices</span>
              {quotes.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuote(i)}
                  className="flex w-full items-center gap-4 border-b py-4 text-left transition hover:pl-2"
                  style={{ borderColor: surface, opacity: activeQuote === i ? 1 : 0.4 }}
                >
                  <span className="font-mono text-sm font-black" style={{ color: accent }}>0{i + 1}</span>
                  <div className="flex-1">
                    <div className="font-black uppercase tracking-tight">{item.name}</div>
                    <div className="text-xs" style={{ color: inkSecond }}>{item.role}</div>
                  </div>
                  <ArrowUpRight size={18} className={activeQuote === i ? "opacity-100" : "opacity-0"} style={{ color: accent }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Full-Bleed Architectural Stat Band */}
        <div className="grid divide-y border-b md:grid-cols-3 md:divide-x md:divide-y-0" style={{ borderColor: surface }}>
          {stats.map((s, i) => (
            <div key={i} className="py-10 md:px-10" style={{ borderColor: surface }}>
              <span className="font-mono text-xs font-black tracking-widest opacity-40">0{i + 1}</span>
              <Editable as="div" className="mt-2 text-[clamp(3.5rem,7vw,7rem)] font-black uppercase leading-none" style={{ color: accent }} value={s.value} onChange={(v) => up("stats", stats, i, "value", v)} />
              <Editable as="div" className="mt-2 text-xs font-bold uppercase tracking-widest" style={{ color: inkSecond }} value={s.label} onChange={(v) => up("stats", stats, i, "label", v)} />
            </div>
          ))}
        </div>

        {/* Tactile FAQ Accordion */}
        <div className="mt-20">
          <div className="mb-8 flex items-baseline justify-between">
            <h3 className="text-3xl font-black uppercase tracking-tight">Questions We Get Asked</h3>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>Friendly Answers</span>
          </div>
          <div className="divide-y border-y" style={{ borderColor: surface }}>
            {faqs.map((f, i) => (
              <div key={i} className="py-6" style={{ borderColor: surface }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-6 text-left">
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs font-black" style={{ color: accent }}>0{i + 1}</span>
                    <Editable as="span" className="text-xl font-black uppercase tracking-tight md:text-2xl" value={f.q} onChange={(v) => up("faqs", faqs, i, "q", v)} />
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl transition" style={{ background: accent, color: bg }}>
                    {open === i ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <Editable as="p" className="mt-4 max-w-3xl pl-8 text-base font-medium leading-relaxed md:text-lg" style={{ color: inkSecond }} value={f.a} onChange={(v) => up("faqs", faqs, i, "a", v)} />
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
