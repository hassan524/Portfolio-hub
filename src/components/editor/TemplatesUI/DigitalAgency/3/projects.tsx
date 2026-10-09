// @ts-nocheck
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export function DigitalAgency3Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || theme?.surface || "#F5F4F2";
  const ink = theme?.text || theme?.ink || "#0F0F10";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6B6B70";
  const accent = theme?.accent || "#2F5BFF";
  const onAccent = theme?.["on-accent"] || bg; // text colour on accent buttons
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [cat, setCat] = useState("All");

  const projects = props.projects || [
    {
      id: "fight", title: "Fight Club Social App", client: "Arena Labs", category: "Mobile", image: U("photo-1512941937669-90a1b58e7e9c"), summary: "A fan app with live events, profiles and ticketing.",
      meta: { Timeline: "12 weeks", Platform: "iOS and Android", Team: "5 people" },
      challenge: "Fans used four different apps for schedules, results and tickets, and engagement dropped between events.",
      solution: "We designed one app with live event pages, fighter profiles and in-app ticketing, built on a single codebase.",
      results: [{ n: "1.2M", l: "Downloads in year one" }, { n: "4.8", l: "Store rating" }, { n: "+54%", l: "Ticket sales" }], stack: ["React Native", "Node.js", "PostgreSQL", "AWS"]
    },
    {
      id: "ops", title: "Operations Dashboard", client: "Novus Logistics", category: "Web", image: U("photo-1555774698-0b77e0d5fac6"), summary: "A live dispatch and supplier platform.",
      meta: { Timeline: "16 weeks", Platform: "Web", Team: "6 people" },
      challenge: "Dispatchers juggled five systems and lost hours to data entry.",
      solution: "We unified routes, suppliers and statuses into one dashboard with automated supplier APIs.",
      results: [{ n: "5.8x", l: "Freight volume" }, { n: "-62%", l: "Manual work" }, { n: "0", l: "Added headcount" }], stack: ["React", "Python", "Redis", "Docker"]
    },
    {
      id: "assist", title: "AI Support Assistant", client: "CloudStack", category: "AI", image: U("photo-1551288049-bebda4e38f71"), summary: "An assistant that answers billing and usage questions.",
      meta: { Timeline: "8 weeks", Platform: "Web", Team: "4 people" },
      challenge: "Support answered the same questions every day across email and chat.",
      solution: "We trained an assistant on the help centre and connected it to billing, with human hand-off for edge cases.",
      results: [{ n: "-45%", l: "Support tickets" }, { n: "24/7", l: "Coverage" }, { n: "92%", l: "Answer accuracy" }], stack: ["Next.js", "LLM APIs", "GraphQL", "Stripe"]
    },
    {
      id: "shop", title: "Marketplace Platform", client: "Shopiko", category: "Web", image: U("photo-1460925895917-afdab827c52f"), summary: "Multi-vendor commerce with catalogue and orders.",
      meta: { Timeline: "14 weeks", Platform: "Web", Team: "5 people" },
      challenge: "Products lived in spreadsheets and the old site was slow on mobile.",
      solution: "A category-first storefront with an admin area for catalogue, inventory and orders.",
      results: [{ n: "3.1x", l: "Faster pages" }, { n: "+38%", l: "Mobile conversion" }, { n: "-62%", l: "Manual orders" }], stack: ["React", "TypeScript", "Node.js", "PostgreSQL"]
    },
  ];
  const cats = ["All", ...Array.from(new Set(projects.map((p: any) => p.category)))];
  const list = useMemo(() => projects.filter((p: any) => cat === "All" || p.category === cat), [cat, projects]);
  const cur = projects.find((p: any) => p.id === open);
  const show = (id: string | null) => { setOpen(id); setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); };
  const fade = { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -14 }, transition: { duration: 0.35 } };
  const h2 = "font-medium tracking-tight leading-[1.1] text-[clamp(1.8rem,4vw,3rem)]";

  return (
    <section ref={ref} id="projects" className="scroll-mt-16 py-16 sm:py-24" style={{ background: bgSecond, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {!cur ? (
            <motion.div key="grid" {...fade}>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-8">
                <h2 className={`lg:col-span-8 ${h2}`}><Editable value={props.projectsTitle || "Cases we are proud of"} onChange={(v) => onChange?.({ projectsTitle: v })} /></h2>
                <p className="lg:col-span-4 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={props.projectsDescription || "Select a case to see the challenge, the solution and the results."} onChange={(v) => onChange?.({ projectsDescription: v })} /></p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {cats.map((c: string) => <button key={c} type="button" onClick={() => setCat(c)} className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer" style={{ background: cat === c ? ink : bg, color: cat === c ? bg : inkSecond }}>{c}</button>)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {list.map((p: any, i: number) => (
                  <button key={p.id} type="button" onClick={() => show(p.id)} className={`group relative text-left rounded-2xl overflow-hidden cursor-pointer min-h-[18rem] ${i === 0 ? "md:col-span-2 md:min-h-[26rem]" : ""}`}>
                    <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ink}d9 0%, transparent 60%)` }} />
                    <span className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-4" style={{ color: bg }}>
                      <span><span className="block text-xs font-semibold opacity-80">{p.category} · {p.client}</span><span className="block text-xl sm:text-2xl font-medium leading-snug mt-1">{p.title}</span></span>
                      <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: bg, color: ink }}><ArrowUpRight size={18} /></span>
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key={cur.id} {...fade} className="space-y-8">
              <button type="button" onClick={() => show(null)} className="inline-flex items-center gap-2 text-sm font-semibold cursor-pointer" style={{ color: inkSecond }}><ArrowLeft size={16} /> All cases</button>
              <div className="grid lg:grid-cols-12 gap-4 lg:gap-12 items-end">
                <div className="lg:col-span-8"><span className="text-sm font-semibold" style={{ color: accent }}>{cur.category} · {cur.client}</span><h2 className={`${h2} mt-2`}>{cur.title}</h2></div>
                <p className="lg:col-span-4 text-sm leading-relaxed" style={{ color: inkSecond }}>{cur.summary}</p>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[16/8]"><img src={cur.image} alt={cur.title} className="w-full h-full object-cover" /></div>
              <dl className="grid grid-cols-3 gap-4">
                {Object.entries(cur.meta || {}).map(([k, v]: any) => <div key={k} className="rounded-2xl p-4 sm:p-5" style={{ background: bg }}><dt className="text-xs" style={{ color: inkSecond }}>{k}</dt><dd className="text-sm sm:text-base font-medium mt-1">{v}</dd></div>)}
              </dl>
              <div className="grid md:grid-cols-2 gap-4">
                {[["The challenge", cur.challenge], ["Our solution", cur.solution]].map(([h, b]: any) => <div key={h} className="rounded-2xl p-6 sm:p-8" style={{ background: bg }}><h3 className="text-lg font-medium mb-2">{h}</h3><p className="text-sm leading-relaxed" style={{ color: inkSecond }}>{b}</p></div>)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {cur.results.map((r: any) => <div key={r.l} className="rounded-2xl p-6" style={{ background: accent, color: onAccent }}><div className="text-4xl sm:text-5xl font-light tracking-tight">{r.n}</div><div className="text-sm mt-1 opacity-90">{r.l}</div></div>)}
              </div>
              <div className="flex flex-wrap gap-2">{cur.stack.map((s: string) => <span key={s} className="px-4 py-1.5 rounded-full text-sm font-medium" style={{ background: bg, color: inkSecond }}>{s}</span>)}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
export default DigitalAgency3Projects;