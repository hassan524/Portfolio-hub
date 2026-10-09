// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [tab, setTab] = useState(0);
  const items = props?.items || [
    { title: "Product strategy", short: "Decide what to build first", text: "We interview your customers, map the market and agree on a roadmap and a launch scope your team can defend.", points: ["Customer interviews and research", "Positioning and pricing model", "Prioritised roadmap", "Launch plan and success metrics"], price: "From $9,000, two weeks" },
    { title: "Design and prototyping", short: "See it before it is built", text: "Interface design, interactive prototypes and a design system you can keep using after we leave.", points: ["User flows and wireframes", "Interactive Figma prototype", "Component library", "Usability testing with real users"], price: "From $16,000, four weeks" },
    { title: "Engineering", short: "Production-ready software", text: "Web apps and APIs built in TypeScript with tests, monitoring and deployment pipelines from the first week.", points: ["React and Node architecture", "Billing, auth and permissions", "Cloud infrastructure on AWS", "Documentation and handover"], price: "From $42,000, eight weeks" },
    { title: "Growth and support", short: "Keep improving after launch", text: "Analytics, onboarding experiments and a monthly engineering retainer for teams that keep shipping.", points: ["Analytics and funnel setup", "Onboarding experiments", "Monthly releases", "Priority bug fixes"], price: "From $5,500 per month" },
  ];
  const setItem = (i: number, patch: any) => onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });
  const cur = items[tab];

  return (
    <section id="services" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Editable as="h2" value={props?.title || "What we do for product teams"} onChange={(v: string) => onChange?.({ title: v })} className="font-['Newsreader'] text-4xl font-medium leading-tight tracking-tight sm:text-5xl" style={{ color: ink }} />
          <Editable as="p" value={props?.subtitle || "Pick one service or combine all four. Each has a clear scope, a fixed timeline and a published starting price."} onChange={(v: string) => onChange?.({ subtitle: v })} className="mt-5 text-lg" style={{ color: inkSecond }} />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {items.map((it: any, i: number) => (
              <button key={i} onClick={() => setTab(i)} className="relative min-w-[220px] shrink-0 rounded-2xl border p-5 text-left transition hover:scale-[1.02] active:scale-95 lg:min-w-0" style={{ backgroundColor: tab === i ? surface : "transparent", borderColor: tab === i ? accent : surface }}>
                <Editable as="p" value={it.title} onChange={(v: string) => setItem(i, { title: v })} className="font-['Newsreader'] text-xl font-medium" style={{ color: ink }} />
                <Editable as="p" value={it.short} onChange={(v: string) => setItem(i, { short: v })} className="mt-1 text-sm" style={{ color: inkSecond }} />
              </button>
            ))}
          </div>

          <div className="relative min-w-0 overflow-hidden rounded-3xl border p-3" style={{ backgroundColor: surface, borderColor: surface }}>
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }} className="h-full rounded-2xl p-7 sm:p-10" style={{ backgroundColor: bg }}>
                <Editable as="h3" value={cur.title} onChange={(v: string) => setItem(tab, { title: v })} className="font-['Newsreader'] text-3xl font-medium" style={{ color: ink }} />
                <Editable as="p" value={cur.text} onChange={(v: string) => setItem(tab, { text: v })} className="mt-4 max-w-xl text-lg leading-relaxed" style={{ color: inkSecond }} />
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {cur.points.map((p: string, k: number) => (
                    <li key={k} className="flex items-start gap-3 rounded-xl p-3" style={{ backgroundColor: surface }}>
                      <Check size={18} className="mt-0.5 shrink-0" style={{ color: accent }} />
                      <Editable as="span" value={p} onChange={(v: string) => setItem(tab, { points: cur.points.map((x: string, m: number) => (m === k ? v : x)) })} style={{ color: ink }} />
                    </li>
                  ))}
                </ul>
                <Editable as="p" value={cur.price} onChange={(v: string) => setItem(tab, { price: v })} className="mt-8 inline-block rounded-xl px-4 py-2.5 font-semibold" style={{ backgroundColor: accent, color: bg }} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
