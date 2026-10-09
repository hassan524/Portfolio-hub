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
    { image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80", tag: "Transactions", title: "Mergers and Acquisitions", description: "Buy-side and sell-side advice from first approach to closing.", price: "Fixed fees from $25,000", details: "Includes deal structuring, due diligence, negotiation and completion. Typical mid-market transactions close in 10 to 16 weeks." },
    { image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=900&q=80", tag: "Disputes", title: "Commercial Litigation", description: "Practical strategy for contract, shareholder and partnership disputes.", price: "From $450 per hour", details: "Includes case assessment, pre-action negotiation, mediation and trial advocacy, with budget updates each month." },
    { image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80", tag: "Governance", title: "Corporate Governance", description: "Board advice, shareholder agreements and compliance programs.", price: "Retainers from $2,000 / month", details: "Includes minute books, board support, shareholder agreements and annual governance health checks." },
    { image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=80", tag: "People", title: "Employment Law", description: "Contracts, restructures and executive exits handled with care.", price: "From $380 per hour", details: "Includes employment contracts, policy reviews, redundancy programs and tribunal representation." },
    { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80", tag: "Property", title: "Commercial Real Estate", description: "Leases, acquisitions and development agreements.", price: "Fixed fees from $4,500", details: "Includes lease negotiation, title review, financing documents and completion." },
    { image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80", tag: "Families in business", title: "Succession and Family Business", description: "Structures that let companies pass between generations smoothly.", price: "From $6,000", details: "Includes ownership planning, family charters, trust coordination and mediation between stakeholders." },
  ];
  const up = (i: number, f: string) => (v: string) =>
    onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const cur = sel !== null ? items[sel] : null;

  return (
    <section id="projects" className="py-24 sm:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>{T("eyebrow", "Practice areas")}</div>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl" style={{ color: ink }}>{T("title", "Where we can help your business")}</h2>
          </div>
          <p className="text-base leading-relaxed lg:col-span-5" style={{ color: inkSecond }}>{T("subtitle", "Fees are shown as a guide. Every engagement begins with a written scope and estimate.")}</p>
        </div>

        <div className="mt-14 grid gap-px md:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: ink, border: `1px solid ${ink}` }}>
          {items.map((it: any, i: number) => (
            <motion.article key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="group flex flex-col p-6 transition-all hover:scale-[1.02]" style={{ backgroundColor: bg }}>
              <div className="overflow-hidden">
                <img src={it.image} alt={it.title} className="h-48 w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              </div>
              <div className="mt-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>
                <span><Editable value={it.tag} onChange={up(i, "tag")} /></span>
                <span style={{ color: inkSecond }}>{`0${i + 1}`}</span>
              </div>
              <h3 className="mt-3 font-serif text-2xl" style={{ color: ink }}><Editable value={it.title} onChange={up(i, "title")} /></h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={it.description} onChange={up(i, "description")} /></p>
              <div className="mt-6 flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${surface}` }}>
                <span className="text-sm font-semibold" style={{ color: ink }}><Editable value={it.price} onChange={up(i, "price")} /></span>
                <button type="button" aria-label="View details" onClick={() => setSel(i)} className="flex h-10 w-10 items-center justify-center transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-5 backdrop-blur-sm" style={{ backgroundColor: `color-mix(in srgb, ${ink} 60%, transparent)` }} onClick={() => setSel(null)}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} onClick={(e: any) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto" style={{ backgroundColor: bg }}>
              <img src={cur.image} alt={cur.title} className="h-48 w-full object-cover grayscale" />
              <button type="button" aria-label="Close" onClick={() => setSel(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center active:scale-95" style={{ backgroundColor: bg, color: ink }}><X className="h-5 w-5" /></button>
              <div className="p-8">
                <div className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={cur.tag} onChange={up(sel as number, "tag")} /></div>
                <h3 className="mt-3 font-serif text-4xl" style={{ color: ink }}><Editable value={cur.title} onChange={up(sel as number, "title")} /></h3>
                <p className="mt-4 text-base leading-relaxed" style={{ color: inkSecond }}><Editable value={cur.details} onChange={up(sel as number, "details")} /></p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6" style={{ borderTop: `1px solid ${ink}` }}>
                  <span className="text-base font-semibold" style={{ color: ink }}><Editable value={cur.price} onChange={up(sel as number, "price")} /></span>
                  <a href="#contact" onClick={() => setSel(null)} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: ink, color: bg }}>
                    {T("dialogCta", "Discuss this matter")}
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
