// @ts-nocheck
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export function DigitalAgency2Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0B0B0D";
  const bgSecond = theme?.["bg-second"] || "#131316";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#A1A1AA";
  const accent = theme?.accent || "#F5559E";
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [hov, setHov] = useState(0);

  const projects = props.projects || [
    {
      title: "Shopiko Commerce Platform", client: "Shopiko", category: "Commerce", year: "2026", image: U("photo-1460925895917-afdab827c52f"), summary: "A multi-category storefront with catalogue and order workflows.",
      meta: { Role: "Product, design and engineering", Timeline: "14 weeks", Platform: "Web" },
      overview: "Shopiko needed a storefront their team could run without developers, with fast product discovery for shoppers.",
      challenge: "Products were managed in spreadsheets, orders were handled by hand, and the old site was slow on mobile.",
      solution: "We designed a category-first storefront and an admin area for catalogue, inventory and orders, built on one shared codebase.",
      results: [{ n: "3.1x", l: "Faster page loads" }, { n: "-62%", l: "Manual order work" }, { n: "+38%", l: "Mobile conversion" }],
      stack: ["React", "TypeScript", "Node.js", "PostgreSQL"]
    },
    {
      title: "CloudStack Customer Portal", client: "CloudStack AI", category: "Portal", year: "2025", image: U("photo-1551288049-bebda4e38f71"), summary: "A self-serve portal for billing, usage and support.",
      meta: { Role: "Design and engineering", Timeline: "10 weeks", Platform: "Web" },
      overview: "A single place for enterprise customers to manage plans, usage and tickets.",
      challenge: "Support teams answered the same billing questions every day across email and chat.",
      solution: "We built a role-based portal with usage dashboards, invoices and a ticket flow tied to the CRM.",
      results: [{ n: "-45%", l: "Support tickets" }, { n: "4.2 mo", l: "CAC payback" }, { n: "92%", l: "Portal adoption" }],
      stack: ["Next.js", "GraphQL", "Stripe", "AWS"]
    },
    {
      title: "Novus Logistics Dashboard", client: "Novus Logistics", category: "Operations", year: "2025", image: U("photo-1586528116311-ad8dd3c8310d"), summary: "Dispatch and supplier tools for cross-border freight.",
      meta: { Role: "Modernization", Timeline: "16 weeks", Platform: "Web and mobile" },
      overview: "We modernized an aging dispatch tool into a live operations dashboard.",
      challenge: "Dispatchers juggled five systems and lost hours to data entry and re-checking.",
      solution: "We unified routes, suppliers and statuses into one dashboard with automated supplier APIs.",
      results: [{ n: "5.8x", l: "Freight volume" }, { n: "+440 bps", l: "EBITDA margin" }, { n: "0", l: "Added headcount" }],
      stack: ["React", "Python", "Redis", "Docker"]
    },
  ];
  const cur = open !== null ? projects[open] : null;
  const line = `${textSecond}30`;
  const num = (i: number) => String(i + 1).padStart(2, "0");
  const show = (i: number | null) => { setOpen(i); setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); };
  const fade = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 }, transition: { duration: 0.4 } };
  const label = "text-[11px] font-bold uppercase tracking-[0.2em]";

  return (
    <section ref={ref} id="projects" className="scroll-mt-20 py-20 sm:py-28 overflow-hidden" style={{ background: bgSecond, color: text }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!cur ? (
            <motion.div key="list" {...fade}>
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
                <div className="lg:col-span-7">
                  <span className={label} style={{ color: accent }}>{props.projectsEyebrow || "Selected work"}</span>
                  <h2 className="font-extrabold tracking-tighter leading-[1.05] text-[clamp(2rem,4.5vw,3.25rem)] mt-3"><Editable value={props.projectsTitle || "Products we have designed, built and run."} onChange={(v) => onChange?.({ projectsTitle: v })} /></h2>
                </div>
                <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}><Editable value={props.projectsDescription || "Select a project to read the full case study."} onChange={(v) => onChange?.({ projectsDescription: v })} /></p>
              </div>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <ul className="lg:col-span-7" style={{ borderBottom: `1px solid ${line}` }}>
                  {projects.map((p: any, i: number) => (
                    <li key={p.title} style={{ borderTop: `1px solid ${line}` }}>
                      <button type="button" onClick={() => show(i)} onMouseEnter={() => setHov(i)} onFocus={() => setHov(i)} className="group w-full text-left py-6 sm:py-8 flex items-center gap-4 sm:gap-6 cursor-pointer transition-opacity" style={{ opacity: hov === i ? 1 : 0.55 }}>
                        <span className="text-[11px] font-bold" style={{ color: accent }}>{num(i)}</span>
                        <img src={p.image} alt="" loading="lazy" className="lg:hidden w-16 h-16 rounded-lg object-cover shrink-0" />
                        <span className="flex-1 min-w-0">
                          <span className="block text-xl sm:text-3xl font-extrabold tracking-tight leading-tight">{p.title}</span>
                          <span className="block text-xs sm:text-sm mt-1" style={{ color: textSecond }}>{p.category} · {p.client} · {p.year}</span>
                        </span>
                        <ArrowUpRight size={22} className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: hov === i ? accent : textSecond }} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="hidden lg:block lg:col-span-5 sticky top-28">
                  <AnimatePresence mode="wait">
                    <motion.button key={hov} type="button" onClick={() => show(hov)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="block w-full text-left cursor-pointer">
                      <span className="block aspect-[4/3] rounded-2xl overflow-hidden" style={{ border: `1px solid ${line}` }}><img src={projects[hov].image} alt={projects[hov].title} className="w-full h-full object-cover" /></span>
                      <span className="block text-sm leading-relaxed mt-4" style={{ color: textSecond }}>{projects[hov].summary}</span>
                      <span className="inline-block mt-3 text-sm font-bold underline underline-offset-4" style={{ color: accent }}>View case study</span>
                    </motion.button>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key={`d-${open}`} {...fade} className="space-y-12">
              <button type="button" onClick={() => show(null)} className="inline-flex items-center gap-2 text-sm font-bold cursor-pointer" style={{ color: textSecond }}><ArrowLeft size={16} /> All projects</button>
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end">
                <div className="lg:col-span-7">
                  <span className={label} style={{ color: accent }}>{cur.category} · {cur.client}</span>
                  <h2 className="font-extrabold tracking-tighter leading-[1.05] text-[clamp(2rem,4.5vw,3.25rem)] mt-3">{cur.title}</h2>
                </div>
                <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}>{cur.overview}</p>
              </div>
              <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-6">
                {[["Year", cur.year], ...Object.entries(cur.meta || {})].map(([k, v]: any) => (
                  <div key={k} className="pl-5" style={{ borderLeft: `1px solid ${line}` }}><dt className="text-[11px] uppercase tracking-wider" style={{ color: textSecond }}>{k}</dt><dd className="font-bold text-sm mt-1">{v}</dd></div>
                ))}
              </dl>
              <div className="rounded-2xl overflow-hidden aspect-[16/8]" style={{ border: `1px solid ${line}` }}><img src={cur.image} alt={cur.title} className="w-full h-full object-cover" /></div>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {[["The challenge", cur.challenge], ["Our solution", cur.solution]].map(([h, b]: any) => (
                  <div key={h} className="pt-5" style={{ borderTop: `1px solid ${line}` }}><h3 className="text-lg font-bold mb-2">{h}</h3><p className="leading-relaxed text-sm sm:text-base" style={{ color: textSecond }}>{b}</p></div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8">
                {cur.results.map((r: any) => (<div key={r.l} className="pl-5" style={{ borderLeft: `1px solid ${line}` }}><div className="text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: accent }}>{r.n}</div><div className="text-sm font-semibold mt-1" style={{ color: textSecond }}>{r.l}</div></div>))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6" style={{ borderTop: `1px solid ${line}` }}>
                <p className="text-sm font-semibold" style={{ color: textSecond }}>{cur.stack.join(" · ")}</p>
                <div className="flex gap-2">
                  <button type="button" aria-label="Previous project" onClick={() => show((open + projects.length - 1) % projects.length)} className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer" style={{ border: `1px solid ${textSecond}50` }}><ArrowLeft size={18} /></button>
                  <button type="button" aria-label="Next project" onClick={() => show((open + 1) % projects.length)} className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer" style={{ background: accent, color: bg }}><ArrowRight size={18} /></button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
export default DigitalAgency2Projects;