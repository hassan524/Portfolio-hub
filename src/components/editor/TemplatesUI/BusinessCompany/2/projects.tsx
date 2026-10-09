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

  const T = (key: string, d: string) => (
    <Editable value={props?.[key] || d} onChange={(v: string) => onChange?.({ [key]: v })} />
  );
  const [sel, setSel] = useState<number | null>(null);
  const items = props?.items || [
    { image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80", tag: "Investments", title: "Personal Investment Plan", description: "A diversified portfolio built around your timeline, risk comfort and tax position, rebalanced every quarter.", price: "1.0% of assets / year", details: "Includes goal mapping, portfolio construction, tax-aware rebalancing, quarterly reports and unlimited access to your advisor." },
    { image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80", tag: "Retirement", title: "Retirement Planning", description: "Know exactly when you can stop working and what income to expect.", price: "From $2,400", details: "Includes cash-flow modelling, pension and social security optimisation and a drawdown strategy updated yearly." },
    { image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80", tag: "Tax", title: "Tax and Estate Strategy", description: "Reduce what you owe and make sure assets pass on as intended.", price: "From $3,100", details: "Includes tax projection, trust and will coordination with your attorney and a gifting plan." },
    { image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80", tag: "Business owners", title: "Business Exit Planning", description: "Prepare your company for sale and plan life after the deal.", price: "From $5,500", details: "Includes valuation review, succession options, deal-readiness checklist and post-sale wealth plan." },
    { image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80", tag: "Protection", title: "Risk and Insurance Review", description: "Find the gaps in cover before they become expensive.", price: "$950 flat", details: "Includes review of life, disability and liability cover with independent recommendations and no commissions." },
  ];
  const up = (i: number, f: string) => (v: string) =>
    onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const cur = sel !== null ? items[sel] : null;

  return (
    <section id="projects" className="py-24 sm:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "Services")}</div>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: ink }}>{T("title", "Advice for every stage of wealth")}</h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed" style={{ color: inkSecond }}>{T("subtitle", "Start with one service or work with us across all of them.")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it: any, i: number) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className={`group flex flex-col overflow-hidden rounded-[2rem] transition-all hover:scale-[1.02] ${i === 0 ? "lg:col-span-2 lg:flex-row" : ""}`}
              style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}
            >
              <div className={`overflow-hidden ${i === 0 ? "lg:w-1/2" : ""}`}>
                <img src={it.image} alt={it.title} className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 ? "h-56 lg:h-full" : "h-48"}`} />
              </div>
              <div className={`flex flex-1 flex-col p-7 ${i === 0 ? "lg:p-10" : ""}`}>
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>
                  <Editable value={it.tag} onChange={up(i, "tag")} />
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight" style={{ color: ink }}>
                  <Editable value={it.title} onChange={up(i, "title")} />
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={it.description} onChange={up(i, "description")} />
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-base font-semibold" style={{ color: ink }}>
                    <Editable value={it.price} onChange={up(i, "price")} />
                  </span>
                  <button
                    type="button"
                    aria-label="View details"
                    onClick={() => setSel(i)}
                    className="flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-95"
                    style={{ backgroundColor: accent, color: bg }}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-5 backdrop-blur-sm"
            style={{ backgroundColor: `color-mix(in srgb, ${bg} 70%, transparent)` }}
            onClick={() => setSel(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e: any) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem]"
              style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}
            >
              <img src={cur.image} alt={cur.title} className="h-48 w-full object-cover" />
              <button type="button" aria-label="Close" onClick={() => setSel(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full active:scale-95" style={{ backgroundColor: bg, color: ink }}>
                <X className="h-5 w-5" />
              </button>
              <div className="p-8">
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>
                  <Editable value={cur.tag} onChange={up(sel as number, "tag")} />
                </div>
                <h3 className="mt-3 text-3xl font-semibold" style={{ color: ink }}>
                  <Editable value={cur.title} onChange={up(sel as number, "title")} />
                </h3>
                <p className="mt-4 text-base leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={cur.details} onChange={up(sel as number, "details")} />
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6" style={{ borderTop: `1px solid ${surface}` }}>
                  <span className="text-lg font-semibold" style={{ color: ink }}>
                    <Editable value={cur.price} onChange={up(sel as number, "price")} />
                  </span>
                  <a href="#contact" onClick={() => setSel(null)} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                    {T("dialogCta", "Ask about this")}
                    <ArrowUpRight className="h-4 w-4" />
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
