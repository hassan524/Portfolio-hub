// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [active, setActive] = useState(0);
  const items = props?.items || [
    { year: "2026", title: "Tidewell", tags: ["Product design", "Next.js", "Stripe Billing"], text: "Subscription analytics for independent coaches. I designed the dashboard and built the first version in nine weeks.", price: "Fixed project, $38,000", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" },
    { year: "2025", title: "Quillbase", tags: ["Design system", "React", "Collaboration"], text: "A shared writing workspace for newsrooms, with live editing, version history and an editor approval flow.", price: "Retainer, $9,500 per month", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" },
    { year: "2024", title: "Fieldnote", tags: ["Mobile", "React Native", "Offline sync"], text: "A field inspection app for surveyors that works without signal and syncs reports when the team is back online.", price: "Fixed project, $46,000", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80" },
    { year: "2023", title: "Orbit Desk", tags: ["UX audit", "Onboarding", "Growth"], text: "Redesigned onboarding for a helpdesk tool. Trial-to-paid conversion rose from 9% to 17% in one quarter.", price: "Audit and redesign, $14,000", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80" },
  ];
  const setItem = (i: number, k: string, v: any) => onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="projects" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <Editable as="h2" value={props?.title || "Selected work for founders and small product teams"} onChange={(v: string) => onChange?.({ title: v })} className="font-['Bricolage_Grotesque'] text-4xl font-bold leading-tight tracking-tight sm:text-6xl" style={{ color: ink }} />
          <Editable as="p" value={props?.subtitle || "Hover a project to preview it. Each one began as a short conversation and a rough idea."} onChange={(v: string) => onChange?.({ subtitle: v })} className="mt-5 text-lg" style={{ color: inkSecond }} />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0">
            {items.map((it: any, i: number) => (
              <div key={i} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className="group cursor-pointer border-t py-8 transition duration-300" style={{ borderColor: inkSecond, opacity: active === i ? 1 : 0.55 }}>
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <Editable as="p" value={it.year} onChange={(v: string) => setItem(i, "year", v)} className="text-sm" style={{ color: inkSecond }} />
                    <Editable as="h3" value={it.title} onChange={(v: string) => setItem(i, "title", v)} className="mt-1 font-['Bricolage_Grotesque'] text-3xl font-semibold tracking-tight sm:text-5xl" style={{ color: ink }} />
                  </div>
                  <span className="mt-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition duration-300 group-hover:scale-110" style={{ backgroundColor: active === i ? accent : surface, color: active === i ? bg : ink }}><ArrowUpRight size={18} /></span>
                </div>
                <img src={it.image} alt={it.title} className="mt-6 aspect-[16/9] w-full rounded-2xl object-cover lg:hidden" />
                <Editable as="p" value={it.text} onChange={(v: string) => setItem(i, "text", v)} className="mt-5 max-w-xl leading-relaxed" style={{ color: inkSecond }} />
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {it.tags.map((t: string, k: number) => (
                    <Editable key={k} as="span" value={t} onChange={(v: string) => setItem(i, "tags", it.tags.map((x: string, m: number) => (m === k ? v : x)))} className="rounded-full px-3.5 py-1.5 text-sm" style={{ backgroundColor: surface, color: ink }} />
                  ))}
                </div>
                <Editable as="p" value={it.price} onChange={(v: string) => setItem(i, "price", v)} className="mt-4 text-sm font-medium" style={{ color: ink }} />
              </div>
            ))}
            <div className="border-t" style={{ borderColor: inkSecond }} />
          </div>

          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="rounded-[2rem] p-3" style={{ backgroundColor: surface }}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <AnimatePresence mode="wait">
                    <motion.img key={active} src={items[active]?.image} alt={items[active]?.title} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0 h-full w-full object-cover" />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
