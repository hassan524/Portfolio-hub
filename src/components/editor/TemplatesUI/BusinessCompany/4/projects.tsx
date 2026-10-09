// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Users, Clock, Crown, Building2, GraduationCap, Map } from "lucide-react";
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
  const icons = [Users, Clock, Crown, Building2, GraduationCap, Map];
  const items = props?.items || [
    { image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80", tag: "Full time", title: "Permanent Placement", description: "Shortlists of vetted professionals for roles you intend to keep for years.", price: "15% of first-year salary", details: "Includes role briefing, active search, three-stage assessment, offer negotiation support and a 12-month replacement guarantee." },
    { image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80", tag: "Flexible", title: "Contract Staffing", description: "Skilled contractors available within days for projects and peak periods.", price: "From 18% margin", details: "Includes payroll, compliance, timesheets and swap-out of contractors at no extra cost." },
    { image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80", tag: "Leadership", title: "Executive Search", description: "Confidential searches for director and C-suite appointments.", price: "From $18,000 retainer", details: "Includes market mapping, confidential approach, board-level interviews and 6-month onboarding support." },
    { image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80", tag: "Volume", title: "Recruitment Outsourcing", description: "We run your hiring end to end as an extension of your HR team.", price: "Custom monthly fee", details: "Includes dedicated recruiters, employer branding, applicant tracking and monthly reporting." },
    { image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=900&q=80", tag: "Early careers", title: "Graduate Programs", description: "Campus sourcing and assessment days for your next intake.", price: "From $6,500", details: "Includes university outreach, assessment centre design and cohort onboarding materials." },
    { image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80", tag: "Insight", title: "Talent Mapping", description: "A clear picture of who is available, where and at what salary.", price: "From $2,800", details: "Includes competitor landscape, salary benchmarks and a ranked list of target candidates." },
  ];
  const up = (i: number, f: string) => (v: string) =>
    onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const cur = sel !== null ? items[sel] : null;

  return (
    <section id="projects" className="py-24 sm:py-28" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "Hiring services")}</div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: ink }}>{T("title", "Choose the way you want to hire")}</h2>
          <p className="mt-4 text-base" style={{ color: inkSecond }}>{T("subtitle", "Transparent fees, clear timelines and no hidden extras.")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it: any, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.article key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="group flex flex-col overflow-hidden rounded-2xl transition-all hover:scale-[1.02]" style={{ backgroundColor: bg, border: `1px solid ${surface}` }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={it.image} alt={it.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute -bottom-0 left-6 flex h-12 w-12 translate-y-1/2 items-center justify-center rounded-xl" style={{ backgroundColor: accent, color: bgSecond }}><Icon className="h-6 w-6" /></span>
                </div>
                <div className="flex flex-1 flex-col p-7 pt-10">
                  <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}><Editable value={it.tag} onChange={up(i, "tag")} /></div>
                  <h3 className="mt-2 text-xl font-bold" style={{ color: ink }}><Editable value={it.title} onChange={up(i, "title")} /></h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={it.description} onChange={up(i, "description")} /></p>
                  <div className="mt-6 flex items-center justify-between pt-5" style={{ borderTop: `1px solid ${surface}` }}>
                    <span className="text-sm font-bold" style={{ color: ink }}><Editable value={it.price} onChange={up(i, "price")} /></span>
                    <button type="button" aria-label="View details" onClick={() => setSel(i)} className="flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: surface, color: ink }}>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-5 backdrop-blur-sm" style={{ backgroundColor: `color-mix(in srgb, ${ink} 60%, transparent)` }} onClick={() => setSel(null)}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }} onClick={(e: any) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl" style={{ backgroundColor: bgSecond }}>
              <img src={cur.image} alt={cur.title} className="h-48 w-full object-cover" />
              <button type="button" aria-label="Close" onClick={() => setSel(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl active:scale-95" style={{ backgroundColor: bgSecond, color: ink }}><X className="h-5 w-5" /></button>
              <div className="p-8">
                <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}><Editable value={cur.tag} onChange={up(sel as number, "tag")} /></div>
                <h3 className="mt-2 text-3xl font-bold" style={{ color: ink }}><Editable value={cur.title} onChange={up(sel as number, "title")} /></h3>
                <p className="mt-4 text-base leading-relaxed" style={{ color: inkSecond }}><Editable value={cur.details} onChange={up(sel as number, "details")} /></p>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6" style={{ borderTop: `1px solid ${surface}` }}>
                  <span className="text-base font-bold" style={{ color: ink }}><Editable value={cur.price} onChange={up(sel as number, "price")} /></span>
                  <a href="#contact" onClick={() => setSel(null)} className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bgSecond }}>
                    {T("dialogCta", "Talk to a recruiter")}
                    <ArrowRight className="h-4 w-4" />
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
