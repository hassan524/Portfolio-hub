// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Crown, Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#1A0103";
  const bgSecond = theme?.["bg-second"] || "#420205";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#F8D4D4";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#E50914";
  const yellow = "#FFBF00";
  const [open, setOpen] = useState(0);

  const defaultItems = [
    { title: "Brand Warfare & Positioning", desc: "Ruthless market positioning, bold naming and identity architecture that crushes bland competitors.", price: "From $8,000", tags: ["Strategy", "Positioning"], img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80" },
    { title: "Viral Content & Social Studio", desc: "An all-out content engine: viral creative direction, high-fashion shoots and cultural hijacking.", price: "$4,500 / mo", tags: ["Content", "Viral"], img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80" },
    { title: "Ruthless Paid Acquisition", desc: "Search, social and programmatic media managed against cold enterprise revenue, not vanity impressions.", price: "15% ad spend", tags: ["Paid Media", "CRO"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80" },
    { title: "Conversion Web Architecture", desc: "High-converting editorial digital flagships built to turn casual visitors into loyal high-ticket clients.", price: "From $12,500", tags: ["Flagship Web", "CRO"], img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80" },
    { title: "90-Day Market Domination Launch", desc: "Integrated blitzkrieg launches combining elite PR, celebrity influencers, performance ads and direct response.", price: "From $22,000", tags: ["Full Launch", "PR"], img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80" },
  ];
  const items = (props?.items && props.items.length > 0) ? props.items : defaultItems;
  const set = (i, k, v) => onChange?.({ items: items.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  const setTag = (i, ti, v) => set(i, "tags", items[i].tags.map((t, z) => (z === ti ? v : t)));

  return (
    <section id="projects" className="relative px-4 py-32 md:px-8" style={{ background: `radial-gradient(100% 70% at 50% 0%, ${bgSecond}, ${bg})`, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Asymmetric Section Header */}
        <div className="grid gap-8 border-b-2 pb-12 md:grid-cols-12 md:items-end" style={{ borderColor: accent }}>
          <div className="md:col-span-8">
            <div className="flex items-center gap-2 font-serif text-xs font-bold uppercase tracking-[0.3em]" style={{ color: yellow }}>
              <Crown size={15} />
              <Editable as="span" value={props?.eyebrow || "Discipline Archive / 02"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </div>
            <Editable
              as="h2"
              className="mt-4 font-serif text-[clamp(3.5rem,10vw,9.5rem)] font-black uppercase italic leading-[0.82] tracking-tight"
              value={props?.title || "Weapons & Work"}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          <div className="space-y-2 md:col-span-4 md:text-right">
            <div className="font-serif text-xs font-bold uppercase tracking-widest" style={{ color: yellow }}>
              40.7128° N, 74.0060° W
            </div>
            <Editable
              as="p"
              className="text-xs font-black uppercase tracking-wider text-white/80"
              value={props?.subtitle || "Choose your weapon. Every scope is built to deliver commercial market victory."}
              onChange={(v) => onChange?.({ subtitle: v })}
            />
          </div>
        </div>

        {/* Asymmetric Split Layout: Left Sticky Control Desk, Right Massive Project Slabs */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Sticky Brutalist Panel */}
          <div className="lg:sticky lg:top-28 lg:col-span-4 border-2 p-6 md:p-8" style={{ borderColor: accent, background: "rgba(30, 2, 4, 0.7)" }}>
            <span className="font-serif text-xs font-black uppercase tracking-widest text-white/60">Registry Index</span>
            <div className="mt-4 space-y-4">
              {items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setOpen(idx)}
                  className="flex w-full items-baseline justify-between border-b pb-3 text-left transition hover:pl-2"
                  style={{ borderColor: "rgba(255,255,255,0.1)", opacity: open === idx ? 1 : 0.4 }}
                >
                  <span className="font-serif text-sm font-black" style={{ color: yellow }}>0{idx + 1}</span>
                  <span className="font-serif text-base font-black uppercase text-white truncate px-3">{item.title}</span>
                  <ArrowUpRight size={14} className={open === idx ? "opacity-100" : "opacity-0"} style={{ color: yellow }} />
                </button>
              ))}
            </div>

            <div className="mt-8 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/70">
                Data-Driven Guarantee:
              </div>
              <div className="mt-1 text-xs font-serif font-black uppercase text-white">
                Zero vanity metrics. Weekly attribution signed off by leadership.
              </div>
            </div>
          </div>

          {/* Right Column: Monumental Expandable Slabs (NOT centered generic cards!) */}
          <div className="space-y-6 lg:col-span-8">
            {items.map((x, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-2 transition"
                style={{
                  borderColor: open === i ? yellow : accent,
                  background: open === i ? "rgba(70, 4, 8, 0.6)" : "rgba(20, 1, 3, 0.8)",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left md:p-8"
                >
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="font-serif text-2xl font-black md:text-3xl" style={{ color: yellow }}>0{i + 1}</span>
                    <Editable as="span" className="font-serif text-2xl font-black uppercase tracking-tight text-white md:text-4xl" value={x.title} onChange={(v) => set(i, "title", v)} />
                  </div>
                  <div className="flex items-center gap-4">
                    <Editable as="span" className="hidden font-serif text-sm font-bold uppercase tracking-widest md:inline" style={{ color: yellow }} value={x.price} onChange={(v) => set(i, "price", v)} />
                    <span className="grid h-10 w-10 shrink-0 place-items-center text-white" style={{ background: open === i ? yellow : accent, color: open === i ? "#000" : "#fff" }}>
                      {open === i ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t-2" style={{ borderColor: accent }}>
                      <div className="grid gap-8 p-6 md:grid-cols-12 md:p-8">
                        <div className="relative aspect-[4/3] w-full overflow-hidden border-2 md:col-span-6" style={{ borderColor: yellow }}>
                          <img src={x.img} alt="" className="h-full w-full object-cover grayscale contrast-125 transition duration-700 hover:grayscale-0 hover:scale-105" />
                        </div>
                        <div className="flex flex-col justify-between md:col-span-6">
                          <div>
                            <span className="font-serif text-xs font-black uppercase tracking-widest" style={{ color: yellow }}>Engagement Spec</span>
                            <Editable as="p" className="mt-2 text-base font-medium leading-relaxed text-white/90" value={x.desc} onChange={(v) => set(i, "desc", v)} />
                            <div className="mt-6 flex flex-wrap gap-2">
                              {x.tags.map((t, ti) => (
                                <span key={ti} className="border px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-white" style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                                  <Editable as="span" value={t} onChange={(v) => setTag(i, ti, v)} />
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mt-8 flex items-center justify-between border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                            <Editable as="div" className="font-serif text-xl font-black uppercase md:text-2xl" style={{ color: yellow }} value={x.price} onChange={(v) => set(i, "price", v)} />
                            <a
                              href="#contact"
                              className="inline-flex items-center gap-2 px-6 py-2.5 font-serif text-xs font-black uppercase tracking-widest text-white shadow-xl transition hover:scale-105 active:scale-95"
                              style={{ background: accent }}
                            >
                              <Editable as="span" value={props?.itemCta || "Enquire Now"} onChange={(v) => onChange?.({ itemCta: v })} />
                              <ArrowUpRight size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
