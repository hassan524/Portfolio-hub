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

  const [selected, setSelected] = useState<number | null>(null);

  const items = props?.items || [
    { image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80", tag: "Strategy / Net zero", title: "Sustainability Strategy", description: "A multi-year roadmap with targets, owners and budgets tied to your business plan.", price: "From $4,800", details: "Includes a stakeholder workshop series, baseline assessment, prioritized initiative list and a board-ready roadmap document with quarterly milestones." },
    { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80", tag: "Data / Reporting", title: "Carbon Accounting", description: "Scope 1, 2 and 3 inventories built on your real invoices and operations data.", price: "From $2,400", details: "Includes data collection templates, emissions calculation, a reduction opportunity ranking and an annual refresh option." },
    { image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80", tag: "Operations / Vendors", title: "Supply Chain Audit", description: "Map suppliers, find hidden risk and replace costly or high-impact inputs.", price: "From $6,200", details: "Includes supplier mapping, on-site or remote reviews, a risk scorecard and a sourcing improvement plan for your top vendors." },
    { image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80", tag: "Compliance / ESG", title: "ESG Reporting", description: "Clear annual reports aligned with the frameworks investors and regulators expect.", price: "From $3,600", details: "Includes framework gap analysis, metric selection, drafting support and a design-ready final report your team can publish." },
    { image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80", tag: "Facilities / Energy", title: "Green Operations Retrofit", description: "Lighting, heating and equipment upgrades chosen for the fastest payback.", price: "From $9,500", details: "Includes an energy audit, vendor shortlist, project management through installation and a before-and-after savings report." },
    { image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80", tag: "People / Training", title: "Leadership Workshops", description: "Half-day sessions that give managers practical tools to cut waste in their teams.", price: "From $1,800", details: "Includes pre-session survey, facilitated workshop for up to 25 people, take-home toolkit and a 60-day follow-up call." },
  ];

  const upd = (i: number, field: string, v: string) =>
    onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [field]: v } : x)) });

  const current = selected !== null ? items[selected] : null;

  return (
    <section id="projects" className="py-24 sm:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>
            <Editable value={props?.eyebrow || "What we do"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
          </div>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl" style={{ color: ink }}>
            <Editable value={props?.title || "Services built around measurable results"} onChange={(v: string) => onChange?.({ title: v })} />
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: inkSecond }}>
            <Editable
              value={props?.subtitle || "Choose a single engagement or combine them into a full program. Every project begins with a free scoping call."}
              onChange={(v: string) => onChange?.({ subtitle: v })}
            />
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it: any, i: number) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-[2rem] transition-all hover:scale-[1.02]"
              style={{ backgroundColor: bg, border: `1px solid ${surface}` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img src={it.image} alt={it.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
                  <Editable value={it.tag} onChange={(v: string) => upd(i, "tag", v)} />
                </div>
                <h3 className="mt-3 text-2xl font-bold tracking-tight" style={{ color: ink }}>
                  <Editable value={it.title} onChange={(v: string) => upd(i, "title", v)} />
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={it.description} onChange={(v: string) => upd(i, "description", v)} />
                </p>
                <div className="mt-6 flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${surface}` }}>
                  <div className="text-base font-extrabold" style={{ color: ink }}>
                    <Editable value={it.price} onChange={(v: string) => upd(i, "price", v)} />
                  </div>
                  <button
                    type="button"
                    aria-label="View details"
                    onClick={() => setSelected(i)}
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
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-5 backdrop-blur-sm"
            style={{ backgroundColor: `color-mix(in srgb, ${ink} 55%, transparent)` }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e: any) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem]"
              style={{ backgroundColor: bg, color: ink }}
            >
              <img src={current.image} alt={current.title} className="h-56 w-full object-cover sm:h-64" />
              <button
                type="button"
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95"
                style={{ backgroundColor: bg, color: ink }}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="p-7 sm:p-9">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
                  <Editable value={current.tag} onChange={(v: string) => upd(selected as number, "tag", v)} />
                </div>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight" style={{ color: ink }}>
                  <Editable value={current.title} onChange={(v: string) => upd(selected as number, "title", v)} />
                </h3>
                <p className="mt-4 text-base leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={current.details} onChange={(v: string) => upd(selected as number, "details", v)} />
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6" style={{ borderTop: `1px solid ${surface}` }}>
                  <div className="text-xl font-extrabold" style={{ color: ink }}>
                    <Editable value={current.price} onChange={(v: string) => upd(selected as number, "price", v)} />
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
                    style={{ backgroundColor: accent, color: bg }}
                  >
                    <Editable value={props?.dialogCta || "Talk to us about this"} onChange={(v: string) => onChange?.({ dialogCta: v })} />
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
