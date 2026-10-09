// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const [sel, setSel] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const defaultItems = [
    { title: "Search and SEO Engine", desc: "Technical audits, content clusters and link building that compound every month.", price: "From $2,400 / mo", tags: ["SEO", "Content"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80" },
    { title: "Performance Media", desc: "Paid search, social and video managed against revenue with weekly optimisation.", price: "From $3,000 / mo", tags: ["Ads", "Social"], img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80" },
    { title: "Brand Identity Sprint", desc: "Strategy, logo, voice and guidelines delivered in four focused weeks.", price: "$9,500 fixed", tags: ["Branding", "Design"], img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=900&q=80" },
    { title: "Website and Funnel Build", desc: "Fast, conversion-led sites and landing pages with analytics baked in.", price: "From $12,000", tags: ["Web", "CRO"], img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80" },
    { title: "Video and Content Studio", desc: "Short-form video, shoots and editing for always-on social presence.", price: "From $4,200 / mo", tags: ["Video", "Social"], img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80" },
  ];
  const items = (props?.items && props.items.length > 0) ? props.items : defaultItems;
  const set = (i, k, v) => onChange?.({ items: items.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  const setTag = (i, ti, v) => set(i, "tags", items[i].tags.map((t, z) => (z === ti ? v : t)));

  return (
    <section id="projects" className="relative px-6 py-32" style={{ background: `linear-gradient(180deg, ${bg}, ${bgSecond})`, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 border-b pb-10" style={{ borderColor: surface }}>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              <Editable as="span" value={props?.eyebrow || "02 / Offerings"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <Editable
              as="h2"
              className="mt-3 text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-[0.85] tracking-tighter"
              value={props?.title || "What we build"}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>
          <Editable
            as="p"
            className="max-w-sm text-base font-medium leading-relaxed"
            style={{ color: inkSecond }}
            value={props?.subtitle || "Pick a single service or stack them together. Every client engagement begins with a free performance audit."}
            onChange={(v) => onChange?.({ subtitle: v })}
          />
        </div>

        {/* Full Bleed Interactive Index Rows */}
        <div className="divide-y border-y" style={{ borderColor: surface }}>
          {items.map((x, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setSel(i)}
              className="group relative flex cursor-pointer flex-col justify-between gap-6 py-10 transition duration-300 md:flex-row md:items-center"
              style={{ borderColor: surface }}
            >
              <div className="flex items-baseline gap-6 md:w-3/5">
                <span className="font-mono text-sm font-black tracking-widest" style={{ color: accent }}>
                  0{i + 1}
                </span>
                <Editable
                  as="h3"
                  className="flex-1 text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight transition duration-300 group-hover:translate-x-3"
                  value={x.title}
                  onChange={(v) => set(i, "title", v)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 md:justify-end md:w-2/5">
                <div className="flex flex-wrap gap-2">
                  {x.tags.map((t, ti) => (
                    <span key={ti} className="rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: surface, borderColor: surface }}>
                      <Editable as="span" value={t} onChange={(v) => setTag(i, ti, v)} />
                    </span>
                  ))}
                </div>

                <Editable
                  as="span"
                  className="font-mono text-sm font-black uppercase tracking-wider"
                  style={{ color: accent }}
                  value={x.price}
                  onChange={(v) => set(i, "price", v)}
                />

                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full transition duration-300 group-hover:rotate-45 group-hover:scale-110" style={{ background: accent, color: bg }}>
                  <ArrowUpRight size={20} />
                </span>
              </div>

              {/* Floating Image Preview on Hover */}
              <AnimatePresence>
                {hoveredIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="pointer-events-none absolute right-32 top-1/2 z-20 hidden -translate-y-1/2 lg:block"
                  >
                    <div className="h-44 w-72 overflow-hidden rounded-2xl shadow-2xl border-2" style={{ borderColor: accent }}>
                      <img src={x.img} alt="" className="h-full w-full object-cover" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popout Modal */}
      <AnimatePresence>
        {sel !== null && items[sel] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            className="fixed inset-0 z-[70] grid place-items-center p-4 backdrop-blur-sm"
            style={{ background: `color-mix(in srgb, ${bg} 85%, transparent)` }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border"
              style={{ background: bg, borderColor: surface, color: ink }}
            >
              <img src={items[sel].img} alt="" className="h-64 w-full object-cover" />
              <button
                onClick={() => setSel(null)}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full backdrop-blur-md"
                style={{ background: surface }}
              >
                <X size={18} />
              </button>
              <div className="p-8 md:p-10">
                <Editable as="h3" className="text-3xl font-black uppercase tracking-tight" value={items[sel].title} onChange={(v) => set(sel, "title", v)} />
                <Editable as="p" className="mt-3 text-base leading-relaxed font-medium" style={{ color: inkSecond }} value={items[sel].desc} onChange={(v) => set(sel, "desc", v)} />
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: surface }}>
                  <Editable as="span" className="font-mono text-2xl font-black" style={{ color: accent }} value={items[sel].price} onChange={(v) => set(sel, "price", v)} />
                  <a
                    href="#contact"
                    onClick={() => setSel(null)}
                    className="rounded-full px-8 py-4 font-black uppercase tracking-wider transition hover:scale-105 active:scale-95"
                    style={{ background: accent, color: bg }}
                  >
                    <Editable as="span" value={props?.dialogCta || "Talk to us"} onChange={(v) => onChange?.({ dialogCta: v })} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
