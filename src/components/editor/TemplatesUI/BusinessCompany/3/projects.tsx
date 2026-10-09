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
    { image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80", tag: "Fintech / Web app", title: "Ledgerly Dashboard", description: "A reporting platform that cut month-end close from nine days to three.", price: "From $48k", details: "Product strategy, design system and a React and Node platform serving 14,000 finance users. Delivered in 16 weeks." },
    { image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80", tag: "Health / Mobile", title: "Pulse Care App", description: "Appointment and records app used by 90 clinics.", price: "From $62k", details: "Native iOS and Android apps with secure messaging, offline records and an admin portal. Delivered in 20 weeks." },
    { image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=80", tag: "Brand / Marketing site", title: "Orchard Foods Website", description: "A fast, editable marketing site with a custom component library.", price: "From $18k", details: "Brand direction, content design and a static-first site that scores 98 on performance. Delivered in 8 weeks." },
    { image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=80", tag: "Design / System", title: "Atlas Design System", description: "One shared language for six product teams.", price: "From $34k", details: "Tokens, 120 documented components and governance guidelines adopted across six teams. Delivered in 12 weeks." },
    { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80", tag: "Logistics / Platform", title: "Routewise Control Tower", description: "Live fleet visibility for a 400-vehicle operator.", price: "From $75k", details: "Realtime mapping, alerts and analytics with an API for partners. Delivered in 24 weeks." },
    { image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80", tag: "SaaS / Rebuild", title: "Tallyboard Rebuild", description: "A legacy product modernised without pausing releases.", price: "From $55k", details: "Incremental migration to a typed codebase with automated tests and zero downtime. Delivered in 18 weeks." },
  ];
  const up = (i: number, f: string) => (v: string) =>
    onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const cur = sel !== null ? items[sel] : null;

  return (
    <section id="projects" className="py-24 sm:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <div className="text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "Selected work")}</div>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-[1.02] tracking-tighter sm:text-6xl" style={{ color: ink }}>{T("title", "Projects we are proud to put our name on")}</h2>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {items.map((it: any, i: number) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`group transition-all hover:scale-[1.02] ${i % 2 === 1 ? "md:mt-16" : ""}`}
            >
              <div className="overflow-hidden rounded-3xl" style={{ backgroundColor: surface }}>
                <img src={it.image} alt={it.title} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}><Editable value={it.tag} onChange={up(i, "tag")} /></div>
                  <h3 className="mt-2 text-3xl font-black tracking-tight" style={{ color: ink }}><Editable value={it.title} onChange={up(i, "title")} /></h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={it.description} onChange={up(i, "description")} /></p>
                  <div className="mt-4 text-sm font-bold" style={{ color: ink }}><Editable value={it.price} onChange={up(i, "price")} /></div>
                </div>
                <button type="button" aria-label="View project" onClick={() => setSel(i)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                  <ArrowUpRight className="h-5 w-5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-5 backdrop-blur-md" style={{ backgroundColor: `color-mix(in srgb, ${bg} 75%, transparent)` }} onClick={() => setSel(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} onClick={(e: any) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
              <img src={cur.image} alt={cur.title} className="h-60 w-full object-cover" />
              <button type="button" aria-label="Close" onClick={() => setSel(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full active:scale-95" style={{ backgroundColor: bg, color: ink }}>
                <X className="h-5 w-5" />
              </button>
              <div className="p-8">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}><Editable value={cur.tag} onChange={up(sel as number, "tag")} /></div>
                <h3 className="mt-3 text-4xl font-black tracking-tight" style={{ color: ink }}><Editable value={cur.title} onChange={up(sel as number, "title")} /></h3>
                <p className="mt-4 text-base leading-relaxed" style={{ color: inkSecond }}><Editable value={cur.details} onChange={up(sel as number, "details")} /></p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6" style={{ borderTop: `1px solid ${surface}` }}>
                  <span className="text-lg font-black" style={{ color: ink }}><Editable value={cur.price} onChange={up(sel as number, "price")} /></span>
                  <a href="#contact" onClick={() => setSel(null)} className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                    {T("dialogCta", "Discuss a similar project")}
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
