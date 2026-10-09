// @ts-nocheck
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const T = (key: string, d: string) => (
    <Editable value={props?.[key] || d} onChange={(v: string) => onChange?.({ [key]: v })} />
  );
  const up = (key: string, arr: any[], i: number, f: string) => (v: string) =>
    onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const quotes = props?.quotes || [
    { quote: "We filled a senior engineering role in 19 days after searching for four months on our own.", name: "Grace Linton", role: "CTO, Bluepeak Software", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
    { quote: "Hartwell understood our culture better than some of our own managers. Every candidate was a real contender.", name: "Peter Alvarez", role: "HR Director, Norland Foods", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
    { quote: "Honest, quick and kind to candidates. Our offer acceptance rate has never been higher.", name: "Mei Tanaka", role: "COO, Fieldstone Finance", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
  ];
  const news = props?.news || [
    { image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80", title: "Named Recruitment Agency of the Year", date: "September 2026" },
    { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", title: "Salary guide 2026: what tech talent expects", date: "August 2026" },
    { image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", title: "Opening our new Leeds office", date: "June 2026" },
  ];
  const awards = props?.awards || ["Rated 4.8 on 1,100 reviews", "Top 10 UK Agencies 2025", "Great Place to Work 2026"];

  return (
    <section id="testimonials" className="py-24 sm:py-28" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "Testimonials")}</div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: ink }}>{T("title", "Trusted by hiring teams across industries")}</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((q: any, i: number) => (
            <motion.figure key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col rounded-2xl p-8 transition-all hover:scale-[1.02]" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((k) => (<Star key={k} className="h-4 w-4" style={{ color: accent, fill: accent }} />))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed" style={{ color: ink }}><Editable value={q.quote} onChange={up("quotes", quotes, i, "quote")} /></blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <img src={q.image} alt={q.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-bold" style={{ color: ink }}><Editable value={q.name} onChange={up("quotes", quotes, i, "name")} /></div>
                  <div className="text-xs" style={{ color: inkSecond }}><Editable value={q.role} onChange={up("quotes", quotes, i, "role")} /></div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl p-6 md:flex-row md:items-center md:justify-around" style={{ backgroundColor: surface }}>
          {awards.map((a: string, i: number) => (
            <div key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
              <Award className="h-5 w-5" style={{ color: accent }} />
              <Editable value={a} onChange={(v: string) => onChange?.({ awards: awards.map((x: string, j: number) => (j === i ? v : x)) })} />
            </div>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold tracking-tight" style={{ color: ink }}>{T("newsTitle", "Recent news")}</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {news.map((n: any, i: number) => (
              <article key={i} className="group overflow-hidden rounded-2xl transition-all hover:scale-[1.02]" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
                <div className="overflow-hidden"><img src={n.image} alt={n.title} className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="p-6">
                  <div className="text-xs font-semibold" style={{ color: accent }}><Editable value={n.date} onChange={up("news", news, i, "date")} /></div>
                  <h4 className="mt-2 text-lg font-bold leading-snug" style={{ color: ink }}><Editable value={n.title} onChange={up("news", news, i, "title")} /></h4>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
