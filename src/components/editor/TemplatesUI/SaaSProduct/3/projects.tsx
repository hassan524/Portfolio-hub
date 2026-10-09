// @ts-nocheck
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F6F5EF";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#111111";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(17, 17, 17, 0.06)";
  const accent = theme?.accent || "#4ADE5A";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const [sel, setSel] = useState<number | null>(null);
  const items = props?.items || [
    { title: "Product Design Sprint", text: "Five days from rough idea to a clickable, tested prototype.", detail: "A focused sprint with your team: user interviews, flows, high-fidelity screens and a tested prototype you can show investors.", tagA: "UX", tagB: "UI", price: "From $2,400", image: img("photo-1561070791-2526d30994b5") },
    { title: "SaaS Brand Identity", text: "Logo, color, type and voice built for software companies.", detail: "A complete identity system with logo suite, color and type scales, voice guide and ready-to-use social and pitch templates.", tagA: "Brand", tagB: "Logo", price: "From $3,200", image: img("photo-1558655146-9f40138edfeb") },
    { title: "Marketing Website", text: "A fast, conversion-focused site that explains your product.", detail: "Strategy, copy direction, design and build of a 6 to 8 section marketing site with animations and SEO foundations.", tagA: "Web", tagB: "Copy", price: "From $4,500", image: img("photo-1498050108023-c5249f4df085") },
    { title: "Onboarding Redesign", text: "Lift activation with a guided first-run experience.", detail: "We audit your funnel, redesign the first-run flow and ship experiments that improve trial-to-paid conversion.", tagA: "Flows", tagB: "Research", price: "From $2,900", image: img("photo-1512941937669-90a1b58e7e9c") },
    { title: "Dashboard & Analytics UI", text: "Clear, scannable data screens for busy teams.", detail: "Information architecture, chart systems and responsive dashboard layouts, delivered with a reusable component library.", tagA: "Data", tagB: "UI", price: "From $5,800", image: img("photo-1551288049-bebda4e38f71") },
    { title: "Growth Retainer", text: "A dedicated design and growth team, every month.", detail: "Ongoing design, experiments and reporting with weekly demos, a shared roadmap and priority turnaround.", tagA: "Strategy", tagB: "Monthly", price: "$3,900 / month", image: img("photo-1552664730-d307ca884978") },
  ];
  const cur = sel !== null ? items[sel] : null;
  return (
    <section id="projects" className="px-6 py-24 md:py-32" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="min-w-0 max-w-2xl">
            <span className="rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: surface }}>{T("eyebrow", "Services & work")}</span>
            <h2 className="mt-5 break-words text-4xl font-black tracking-tight md:text-5xl">{T("title", "Everything your product needs to grow")}</h2>
          </div>
          <p className="max-w-sm break-words" style={{ color: inkSecond }}>{T("intro", "Pick a package or mix them. Every project includes weekly demos and a handover you can run with.")}</p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p: any, i: number) => (
            <motion.div key={i} role="button" tabIndex={0} onClick={() => setSel(i)} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 3) * 0.1 }} className="group cursor-pointer overflow-hidden rounded-[2rem] p-3 transition hover:scale-[1.02] active:scale-95" style={{ background: surface }}>
              <div className="relative h-56 overflow-hidden rounded-3xl">
                <img src={p.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute left-3 top-3 flex gap-2">
                  {["tagA", "tagB"].map((k) => (<span key={k} className="rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md" style={{ background: bg, color: ink }}>{I("items", items, i, k)}</span>))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="break-words text-xl font-bold">{I("items", items, i, "title")}</h3>
                <p className="mt-2 break-words text-sm" style={{ color: inkSecond }}>{I("items", items, i, "text")}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-bold">{I("items", items, i, "price")}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full transition group-hover:rotate-45" style={{ background: accent, color: ink }}><ArrowUpRight size={18} /></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {cur && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md" style={{ background: `color-mix(in srgb, ${bg} 70%, transparent)` }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={(e: any) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem]" style={{ background: bgSecond, color: ink, border: `1px solid ${surface}` }}>
              <button aria-label="Close" onClick={() => setSel(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full transition active:scale-95" style={{ background: bg, color: ink }}><X size={18} /></button>
              <img src={cur.image} alt="" className="h-64 w-full object-cover" />
              <div className="p-8">
                <div className="flex gap-2">{["tagA", "tagB"].map((k) => (<span key={k} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: surface }}>{I("items", items, sel, k)}</span>))}</div>
                <h3 className="mt-4 break-words text-3xl font-black">{I("items", items, sel, "title")}</h3>
                <p className="mt-3 break-words" style={{ color: inkSecond }}>{I("items", items, sel, "detail")}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-2xl font-black">{I("items", items, sel, "price")}</span>
                  <a href="#contact" onClick={() => setSel(null)} className="rounded-full px-6 py-3 font-semibold transition hover:scale-[1.02] active:scale-95" style={{ background: accent, color: ink }}>{T("dialogCta", "Start this project")}</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
