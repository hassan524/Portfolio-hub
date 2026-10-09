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

  const [sel, setSel] = useState<number | null>(null);
  const DEFAULT_ITEMS = [
    { title: "Ledgerly", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", tags: ["Embedded Teams", "Fintech Platform", "Invoicing", "Automation"], text: "We built Ledgerly's invoicing platform from scratch, so small finance teams can send, track and reconcile invoices from one clean dashboard.", price: "Typical engagement: $64,000", details: "Ledgerly replaced a patchwork of spreadsheets with a single workspace for invoicing, approvals and bank reconciliation. We handled product design, the web app, the bank-feed integrations and the launch.", results: ["Month-end close cut from 6 days to 2", "38,000 invoices processed in the first quarter", "Launched in 14 weeks"] },
    { title: "Chorusline", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80", tags: ["Full-Stack Development", "SaaS Platform", "Music Industry", "Collaboration"], text: "A shared workspace where artists and labels review demos, leave timestamped notes and approve releases together, with secure links for outside guests.", price: "Typical engagement: $52,000", details: "Chorusline gives music teams a calm place to review work. We designed the review flow, built the audio player with timestamped comments and set up secure sharing with expiring links.", results: ["Review rounds reduced by 45%", "1,200 active teams after six months", "99.98% uptime since launch"] },
    { title: "Parcelwise", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80", tags: ["Mobile App Development", "React Native", "Logistics"], text: "A driver and dispatcher app that keeps small courier fleets on schedule, with live route updates and proof of delivery.", price: "Typical engagement: $48,000", details: "Parcelwise is a cross-platform app for couriers and dispatchers. We built offline-first route handling, proof of delivery capture and a live dispatcher map.", results: ["Late deliveries down 31%", "Rated 4.8 on both app stores", "Shipped on iOS and Android together"] },
    { title: "Atlas Notes", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80", tags: ["Frontend Development", "API Integration", "AI", "Legal Tech"], text: "An AI research assistant that turns long documents into searchable, cited summaries for legal teams.", price: "Typical engagement: $71,000", details: "Atlas Notes ingests contracts and case files, then answers questions with citations back to the source page. We built the interface, the retrieval pipeline and the audit trail.", results: ["Research time cut by 60%", "Every answer linked to its source", "SOC 2 ready architecture"] },
  ];
  const items = Array.isArray(props?.items) && props.items.length > 0 ? props.items : DEFAULT_ITEMS;
  const setItem = (i: number, k: string, v: any) => onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });
  const go = (e: any, href: string) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };
  const cur = sel !== null ? items[sel] : null;

  return (
    <section id="projects" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="min-w-0">
            <Editable as="p" value={props?.eyebrow || "SELECTED WORK"} onChange={(v: string) => onChange?.({ eyebrow: v })} className="text-xs font-semibold tracking-[0.25em]" style={{ color: inkSecond }} />
            <Editable as="h2" value={props?.title || "The Work Behind The Products We Ship"} onChange={(v: string) => onChange?.({ title: v })} className="mt-4 max-w-md font-['Poppins'] text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl" style={{ color: ink }} />
          </div>
          <p className="max-w-[17rem] text-sm leading-relaxed lg:text-right" style={{ color: inkSecond }}>
            <Editable as="span" value={props?.noteLead || "Trusted by"} onChange={(v: string) => onChange?.({ noteLead: v })} />{" "}
            <Editable as="span" value={props?.noteBold || "100+ funded"} onChange={(v: string) => onChange?.({ noteBold: v })} className="font-semibold" style={{ color: ink }} />{" "}
            <Editable as="span" value={props?.noteTail || "companies on their flagship products."} onChange={(v: string) => onChange?.({ noteTail: v })} />
          </p>
        </div>

        <div className="mt-20">
          {items.map((it: any, i: number) => {
            const flip = i % 2 === 1;
            const x1 = flip ? 66 : 34;
            const x2 = flip ? 3 : 97;
            return (
              <div key={i}>
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                  <div className={"min-w-0 " + (flip ? "md:order-2" : "")}>
                    <button onClick={() => setSel(i)} className="group block w-full overflow-hidden rounded-3xl border transition duration-300 hover:scale-[1.02] active:scale-95" style={{ backgroundColor: bgSecond, borderColor: surface }}>
                      <img src={it.image} alt={it.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
                    </button>
                  </div>
                  <div className={"min-w-0 " + (flip ? "md:order-1" : "")}>
                    <div className="flex items-center gap-5">
                      <span className="font-['Poppins'] text-base font-semibold" style={{ color: inkSecond }}>{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-10 w-px" style={{ backgroundColor: inkSecond, opacity: 0.6 }} />
                      <Editable as="h3" value={it.title} onChange={(v: string) => setItem(i, "title", v)} className="font-['Poppins'] text-3xl font-bold tracking-tight sm:text-5xl" style={{ color: ink }} />
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {it.tags.map((t: string, k: number) => (
                        <Editable key={k} as="span" value={t} onChange={(v: string) => setItem(i, "tags", it.tags.map((x: string, m: number) => (m === k ? v : x)))} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: inkSecond, color: inkSecond }} />
                      ))}
                    </div>
                    <Editable as="p" value={it.text} onChange={(v: string) => setItem(i, "text", v)} className="mt-6 text-lg leading-relaxed" style={{ color: inkSecond }} />
                    <Editable as="p" value={it.price} onChange={(v: string) => setItem(i, "price", v)} className="mt-3 text-sm font-medium" style={{ color: ink }} />
                    <button onClick={() => setSel(i)} className="mt-7 inline-flex items-center gap-4 font-semibold transition hover:scale-[1.02] active:scale-95" style={{ color: inkSecond }}>
                      <Editable as="span" value={props?.caseLabel || "View Case Study"} onChange={(v: string) => onChange?.({ caseLabel: v })} />
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border" style={{ borderColor: inkSecond }}><ArrowUpRight size={16} /></span>
                    </button>
                  </div>
                </div>

                {i < items.length - 1 && (
                  <div className="relative my-4 hidden h-28 md:block">
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
                      <path d={`M ${x1} 0 C ${x1} 45, ${x2} 35, ${x2} 100`} stroke={inkSecond} strokeWidth="1.3" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" opacity="0.7" />
                    </svg>
                    <span className="absolute top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ left: x1 + "%", backgroundColor: inkSecond, borderColor: surface }} />
                    <span className="absolute bottom-0 h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 rounded-full border-2" style={{ left: x2 + "%", backgroundColor: inkSecond, borderColor: surface }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center">
          <a href="#contact" onClick={(e) => go(e, "#contact")} className="inline-flex rounded-full px-8 py-4 font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: ink }}>
            <Editable as="span" value={props?.ctaLabel || "Discuss your project"} onChange={(v: string) => onChange?.({ ctaLabel: v })} />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={() => setSel(null)}>
            <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: bg, opacity: 0.85 }} />
            <motion.div initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.97 }} onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border" style={{ backgroundColor: bgSecond, borderColor: inkSecond }}>
              <img src={cur.image} alt={cur.title} className="aspect-[16/8] w-full object-cover" />
              <button onClick={() => setSel(null)} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95" style={{ backgroundColor: bg, color: ink }}><X size={18} /></button>
              <div className="p-8">
                <Editable as="h3" value={cur.title} onChange={(v: string) => setItem(sel as number, "title", v)} className="font-['Poppins'] text-3xl font-semibold" style={{ color: ink }} />
                <Editable as="p" value={cur.details} onChange={(v: string) => setItem(sel as number, "details", v)} className="mt-4 leading-relaxed" style={{ color: inkSecond }} />
                <div className="mt-6 space-y-3">
                  {cur.results.map((r: string, k: number) => (
                    <div key={k} className="flex items-start gap-3 rounded-xl border p-4" style={{ backgroundColor: surface, borderColor: surface }}>
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                      <Editable as="p" value={r} onChange={(v: string) => setItem(sel as number, "results", cur.results.map((x: string, m: number) => (m === k ? v : x)))} style={{ color: ink }} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export const SaaSProduct5Projects = Projects;
export const ProjectsGrid = Projects;
export default Projects;
