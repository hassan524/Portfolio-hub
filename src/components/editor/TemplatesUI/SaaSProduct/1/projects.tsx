// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Check } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [active, setActive] = useState<number | null>(null);

  const items = props?.items || [
    {
      title: "Barrier Serum",
      tags: ["Hydration", "Daily"],
      description: "A lightweight ceramide and oat serum that rebuilds the skin barrier overnight.",
      price: "$48 · 30 ml",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=80",
      details: ["Ceramide NP, AP and EOP", "Colloidal oat and panthenol", "Fragrance free, pH 5.5", "Compatible with every Veluna plan"],
    },
    {
      title: "Luminous Day Fluid",
      tags: ["SPF 40", "Glow"],
      description: "A sheer daily fluid with broad spectrum protection and a soft, even finish.",
      price: "$42 · 50 ml",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
      details: ["Mineral and chemical filter blend", "Niacinamide for visible tone", "No white cast on deeper skin", "Reef safe formula"],
    },
    {
      title: "Night Renewal Cream",
      tags: ["Repair", "Evening"],
      description: "A rich but breathable cream with peptides that supports overnight recovery.",
      price: "$56 · 50 ml",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
      details: ["Copper and signal peptides", "Squalane and shea lipids", "Refillable glass jar", "Gentle enough for sensitive skin"],
    },
    {
      title: "Veluna Platform Plan",
      tags: ["Software", "Monthly"],
      description: "The skin intelligence app with scans, tracking and a routine that updates itself.",
      price: "From $9 / month",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80",
      details: ["Unlimited skin scans", "Weather and cycle aware insights", "Monthly clinician review", "Works with any brand you already own"],
    },
  ];
  const gallery = props?.gallery || [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=700&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80",
  ];

  const upd = (i: number, patch: any) =>
    onChange?.({ items: items.map((x: any, idx: number) => (idx === i ? { ...x, ...patch } : x)) });

  const current = active !== null ? items[active] : null;

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.3em] uppercase" style={{ color: accent }}>
            <Editable value={props?.eyebrow || "The collection"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </span>
          <h2 className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            <Editable value={props?.title || "Small range. Serious results."} onChange={(v) => onChange?.({ title: v })} />
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed" style={{ color: inkSecond }}>
            <Editable
              value={props?.text || "Three formulas and one platform. Each piece earns its place on your shelf and in your phone."}
              onChange={(v) => onChange?.({ text: v })}
            />
          </p>
        </div>

        <div className="mt-20 space-y-24 sm:space-y-32">
          {items.map((it: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <button
                onClick={() => setActive(i)}
                aria-label="Open details"
                className="group relative block w-full aspect-[5/4] overflow-hidden rounded-[32px] text-left"
                style={{ background: bgSecond }}
              >
                <img src={it.image} alt={it.title} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(to top, ${accent}66, transparent 60%)` }} />
                <span
                  className="absolute bottom-5 right-5 w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"
                  style={{ background: bg, color: accent }}
                >
                  <ArrowUpRight size={22} />
                </span>
              </button>

              <div>
                <span className="font-[Georgia,'Times_New_Roman',serif] text-6xl opacity-25" style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {it.tags.map((t: string, ti: number) => (
                    <span key={ti} className="rounded-full px-3.5 py-1.5 text-xs tracking-wide" style={{ background: surface }}>
                      <Editable value={t} onChange={(v) => upd(i, { tags: it.tags.map((x: string, xi: number) => (xi === ti ? v : x)) })} />
                    </span>
                  ))}
                </div>
                <h3 className="mt-6 font-[Georgia,'Times_New_Roman',serif] text-4xl sm:text-5xl leading-tight">
                  <Editable value={it.title} onChange={(v) => upd(i, { title: v })} />
                </h3>
                <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={it.description} onChange={(v) => upd(i, { description: v })} />
                </p>
                <div className="mt-8 flex items-center gap-6 flex-wrap">
                  <span className="font-[Georgia,'Times_New_Roman',serif] text-2xl" style={{ color: accent }}>
                    <Editable value={it.price} onChange={(v) => upd(i, { price: v })} />
                  </span>
                  <button
                    onClick={() => setActive(i)}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
                    style={{ background: accent, color: bg }}
                  >
                    <Editable value={props?.detailsLabel || "View details"} onChange={(v) => onChange?.({ detailsLabel: v })} />
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gallery strip */}
      <div className="mt-28 sm:mt-36">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 mb-8 flex items-end justify-between gap-4 flex-wrap">
          <h3 className="font-[Georgia,'Times_New_Roman',serif] text-3xl sm:text-4xl">
            <Editable value={props?.galleryTitle || "Inside the studio"} onChange={(v) => onChange?.({ galleryTitle: v })} />
          </h3>
          <p className="text-sm" style={{ color: inkSecond }}>
            <Editable value={props?.galleryText || "Textures, tools and a few good mornings."} onChange={(v) => onChange?.({ galleryText: v })} />
          </p>
        </div>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto px-5 sm:px-8 pb-4 snap-x" style={{ scrollbarWidth: "none" }}>
          {gallery.map((g: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`shrink-0 snap-start overflow-hidden ${i % 2 ? "rounded-t-[999px] rounded-b-3xl mt-10" : "rounded-3xl"} w-56 sm:w-72 aspect-[3/4]`}
            >
              <img src={g} alt="" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.06]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail dialog */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 backdrop-blur-md"
            style={{ background: `${ink}99` }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] grid md:grid-cols-2"
              style={{ background: bg, color: ink }}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={{ background: bg, color: ink, border: `1px solid ${surface}` }}
              >
                <X size={18} />
              </button>
              <div className="aspect-square md:aspect-auto md:min-h-[460px]">
                <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((t: string, ti: number) => (
                    <span key={ti} className="rounded-full px-3 py-1 text-xs" style={{ background: surface }}>
                      <Editable value={t} />
                    </span>
                  ))}
                </div>
                <h4 className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-3xl sm:text-4xl">
                  <Editable value={current.title} />
                </h4>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={current.description} />
                </p>
                <ul className="mt-6 space-y-3">
                  {current.details.map((d: string, di: number) => (
                    <li key={di} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: accent, color: bg }}>
                        <Check size={12} />
                      </span>
                      <Editable value={d} onChange={(v) => upd(active as number, { details: current.details.map((x: string, xi: number) => (xi === di ? v : x)) })} />
                    </li>
                  ))}
                </ul>
                <div className="mt-8 font-[Georgia,'Times_New_Roman',serif] text-2xl" style={{ color: accent }}>
                  <Editable value={current.price} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
