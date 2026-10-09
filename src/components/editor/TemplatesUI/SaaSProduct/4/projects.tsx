// @ts-nocheck
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const img = (id: string, w = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#F2542D";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const [sel, setSel] = useState<number | null>(null);
  const items = props?.items || [
    { title: "MVP Engineering", text: "Your idea, live and charging customers in weeks.", detail: "A senior squad builds, deploys and iterates on your MVP with analytics, billing and onboarding in place from the first release.", tagA: "Build", tagB: "Launch", price: "From $18,000", image: img("photo-1555066931-4365d14bab8c") },
    { title: "Design Systems", text: "One consistent, scalable component library.", detail: "Tokens, components and documentation in Figma and code, so every new feature ships faster and looks consistent.", tagA: "Design", tagB: "Code", price: "From $9,500", image: img("photo-1561070791-2526d30994b5") },
    { title: "AI Features", text: "Practical AI built into your existing product.", detail: "Search, summaries, copilots and automations integrated safely into your product, with evaluation and cost controls.", tagA: "AI", tagB: "API", price: "From $12,000", image: img("photo-1531297484001-80022131f5a1") },
    { title: "Platform Rebuild", text: "Replace a legacy stack without downtime.", detail: "Incremental migration to a modern architecture with feature parity, tests and a zero-downtime cutover plan.", tagA: "Migrate", tagB: "Cloud", price: "From $26,000", image: img("photo-1498050108023-c5249f4df085") },
    { title: "Analytics Dashboards", text: "Clear metrics your whole team trusts.", detail: "Event tracking plans, data pipelines and live dashboards that connect product usage to revenue.", tagA: "Data", tagB: "BI", price: "From $7,800", image: img("photo-1551288049-bebda4e38f71") },
    { title: "Fractional CTO", text: "Senior technical leadership on a flexible basis.", detail: "Weekly strategy, hiring support, architecture reviews and vendor decisions without a full-time executive hire.", tagA: "Advisory", tagB: "Monthly", price: "$6,500 / month", image: img("photo-1552664730-d307ca884978") },
  ];
  const cur = sel !== null ? items[sel] : null;
  return (
    <section id="projects" className="px-6 py-28 md:py-36" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="min-w-0 max-w-xl break-words text-4xl font-light tracking-tight md:text-5xl">{T("title", "Engagements built for")} <span className="font-serif italic" style={{ color: accent }}>{T("titleAccent", "growth")}</span></h2>
          <p className="max-w-xs break-words text-sm opacity-60" style={{ color: inkSecond }}>{T("intro", "Fixed scopes or ongoing partnerships. Open any card for details.")}</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((p: any, i: number) => (
            <motion.div key={i} role="button" tabIndex={0} onClick={() => setSel(i)} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: (i % 2) * 0.12 }} className="group relative h-[26rem] cursor-pointer overflow-hidden rounded-[2rem] transition hover:scale-[1.02] active:scale-95" style={{ background: surface }}>
              <img src={p.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg} 8%, color-mix(in srgb, ${bg} 40%, transparent) 55%, transparent)` }} />
              <div className="absolute left-5 top-5 flex gap-2">{["tagA", "tagB"].map((k) => (<span key={k} className="rounded-full px-3 py-1 text-xs backdrop-blur-md" style={{ background: surface, color: ink }}>{I("items", items, i, k)}</span>))}</div>
              <div className="absolute inset-x-6 bottom-6">
                <h3 className="break-words text-2xl font-light">{I("items", items, i, "title")}</h3>
                <p className="mt-1 break-words text-sm opacity-70">{I("items", items, i, "text")}</p>
                <div className="mt-4 flex items-center justify-between"><span className="font-serif text-lg italic" style={{ color: accent }}>{I("items", items, i, "price")}</span><span className="grid h-11 w-11 place-items-center rounded-full transition group-hover:rotate-45" style={{ background: accent, color: ink }}><ArrowUpRight size={18} /></span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {cur && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md" style={{ background: `color-mix(in srgb, ${bg} 75%, transparent)` }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(e: any) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem]" style={{ background: bgSecond, color: ink, border: `1px solid ${surface}` }}>
              <button aria-label="Close" onClick={() => setSel(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full transition active:scale-95" style={{ background: bg, color: ink }}><X size={18} /></button>
              <img src={cur.image} alt="" className="h-64 w-full object-cover" />
              <div className="p-8">
                <div className="flex gap-2">{["tagA", "tagB"].map((k) => (<span key={k} className="rounded-full px-3 py-1 text-xs" style={{ background: surface }}>{I("items", items, sel, k)}</span>))}</div>
                <h3 className="mt-4 break-words text-3xl font-light">{I("items", items, sel, "title")}</h3>
                <p className="mt-3 break-words opacity-70">{I("items", items, sel, "detail")}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="font-serif text-2xl italic" style={{ color: accent }}>{I("items", items, sel, "price")}</span>
                  <a href="#contact" onClick={() => setSel(null)} className="rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.02] active:scale-95" style={{ background: accent, color: ink }}>{T("dialogCta", "Discuss this engagement")}</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
