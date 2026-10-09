// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles } from "lucide-react";
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
    { title: "Product Strategy & Architecture", desc: "Market research, positioning and a technical roadmap your team can actually execute.", price: "From $6,000", tags: ["Research", "Roadmap"], img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=900&q=80" },
    { title: "Brand & Experience Systems", desc: "Identity, motion systems and web experiences with an unmistakable point of view.", price: "From $14,000", tags: ["Brand", "Web"], img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80" },
    { title: "AI Integration & Automation", desc: "Custom assistants and workflow automation that give your core team hours back every week.", price: "From $9,500", tags: ["AI", "Ops"], img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80" },
    { title: "Dedicated Growth Partnership", desc: "A monthly embedded team covering paid acquisition, lifecycle, SEO and attribution.", price: "$4,800 / month", tags: ["Growth", "Data"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80" },
  ];
  const items = (props?.items && props.items.length > 0) ? props.items : defaultItems;
  const set = (i, k, v) => onChange?.({ items: items.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  const setTag = (i, ti, v) => set(i, "tags", items[i].tags.map((t, z) => (z === ti ? v : t)));

  return (
    <section id="projects" className="relative overflow-hidden px-6 py-32" style={{ background: `linear-gradient(180deg, ${bg}, ${bgSecond}, ${bg})`, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-20 flex flex-wrap items-end justify-between gap-8 border-b pb-12" style={{ borderColor: surface }}>
          <div>
            <span className="text-xs uppercase tracking-[0.35em]" style={{ color: accent }}>
              <Editable as="span" value={props?.eyebrow || "Selected Offerings / 02"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <Editable
              as="h2"
              className="mt-4 text-[clamp(3rem,8vw,8rem)] font-extralight italic leading-[0.88] tracking-tight"
              value={props?.title || "Services & Architecture"}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>
          <Editable
            as="p"
            className="max-w-sm text-base font-light leading-relaxed"
            style={{ color: inkSecond }}
            value={props?.subtitle || "Transparent starting commitments. Every engagement is custom-tailored to your scale and velocity."}
            onChange={(v) => onChange?.({ subtitle: v })}
          />
        </div>

        {/* Full-Bleed Interactive Project Index (NO 2-column small cards!) */}
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
              className="group relative cursor-pointer py-10 transition duration-300 md:py-14"
            >
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div className="flex items-baseline gap-6 md:w-3/5">
                  <span className="font-mono text-sm font-light tracking-widest opacity-40 transition duration-300 group-hover:opacity-100" style={{ color: accent }}>
                    0{i + 1}
                  </span>
                  <div>
                    <Editable
                      as="h3"
                      className="text-[clamp(1.8rem,4.5vw,4rem)] font-extralight italic leading-[1.05] tracking-tight transition duration-300 group-hover:translate-x-2"
                      value={x.title}
                      onChange={(v) => set(i, "title", v)}
                    />
                    <Editable
                      as="p"
                      className="mt-3 max-w-xl text-sm font-light leading-relaxed"
                      style={{ color: inkSecond }}
                      value={x.desc}
                      onChange={(v) => set(i, "desc", v)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 md:justify-end md:w-2/5">
                  <div className="flex flex-wrap gap-2">
                    {x.tags.map((t, ti) => (
                      <span key={ti} className="rounded-full border px-3.5 py-1 text-xs font-light" style={{ borderColor: surface, color: inkSecond }}>
                        <Editable as="span" value={t} onChange={(v) => setTag(i, ti, v)} />
                      </span>
                    ))}
                  </div>

                  <Editable
                    as="span"
                    className="font-mono text-sm font-light tracking-wider"
                    style={{ color: accent }}
                    value={x.price}
                    onChange={(v) => set(i, "price", v)}
                  />

                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border transition duration-500 group-hover:rotate-45 group-hover:scale-110" style={{ borderColor: surface, background: surface, color: accent }}>
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </div>

              {/* Floating Media Preview on Hover (Editorial style) */}
              <AnimatePresence>
                {hoveredIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute right-32 top-1/2 z-20 hidden -translate-y-1/2 lg:block"
                  >
                    <div className="h-44 w-72 overflow-hidden rounded-2xl shadow-2xl border" style={{ borderColor: surface }}>
                      <img src={x.img} alt="" className="h-full w-full object-cover" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Dossier Modal */}
      <AnimatePresence>
        {sel !== null && items[sel] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            className="fixed inset-0 z-[70] grid place-items-center p-4 backdrop-blur-md"
            style={{ background: `color-mix(in srgb, ${bg} 85%, transparent)` }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl border md:grid-cols-2"
              style={{ background: bg, borderColor: surface, color: ink }}
            >
              <img src={items[sel].img} alt="" className="h-64 w-full object-cover md:h-full" />
              <button
                onClick={() => setSel(null)}
                className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md"
                style={{ borderColor: surface, background: surface }}
              >
                <X size={18} />
              </button>
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: accent }}>Engagement Overview</span>
                  <Editable as="h3" className="mt-3 text-3xl font-light italic md:text-4xl" value={items[sel].title} onChange={(v) => set(sel, "title", v)} />
                  <Editable as="p" className="mt-4 font-light leading-relaxed" style={{ color: inkSecond }} value={items[sel].desc} onChange={(v) => set(sel, "desc", v)} />
                  <div className="mt-6 flex flex-wrap gap-2">
                    {items[sel].tags.map((t, ti) => (
                      <span key={ti} className="rounded-full border px-3 py-1 text-xs font-light" style={{ borderColor: surface }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t flex items-center justify-between" style={{ borderColor: surface }}>
                  <Editable as="div" className="font-mono text-2xl font-light" style={{ color: accent }} value={items[sel].price} onChange={(v) => set(sel, "price", v)} />
                  <a
                    href="#contact"
                    onClick={() => setSel(null)}
                    className="rounded-full px-6 py-3 text-sm font-medium transition hover:scale-105 active:scale-95"
                    style={{ background: accent, color: bg }}
                  >
                    <Editable as="span" value={props?.dialogCta || "Book Consultation"} onChange={(v) => onChange?.({ dialogCta: v })} />
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
