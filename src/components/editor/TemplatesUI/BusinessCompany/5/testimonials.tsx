// @ts-nocheck
import { motion } from "framer-motion";
import { Award } from "lucide-react";
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
  const feature = props?.feature || {
    quote: "When our largest customer threatened to walk, Eleanor and her team rebuilt the contract and saved the relationship in a week. I would not make a major decision without them.",
    name: "Robert Hallam",
    role: "Chairman, Hallam Manufacturing",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
  };
  const upF = (f: string) => (v: string) => onChange?.({ feature: { ...feature, [f]: v } });
  const quotes = props?.quotes || [
    { quote: "Clear, calm and commercial. They tell you what matters and what does not.", name: "Alice Verhoeven", role: "Founder, Verhoeven Labs", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80" },
    { quote: "Our acquisition closed two weeks early and under budget.", name: "Tomás Ibarra", role: "CEO, Ibarra Logistics", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
  ];
  const stats = props?.stats || [
    { value: "97%", label: "Clients who instruct us again" },
    { value: "22 yrs", label: "Average client relationship" },
    { value: "4.9", label: "Independent review score" },
  ];
  const awards = props?.awards || ["Corporate Law Firm of the Year, Midwest 2025", "Ranked Tier 1 for M&A", "Best Client Service 2024"];

  return (
    <section id="testimonials" className="py-24 sm:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>{T("eyebrow", "Client voices")}</div>
        <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl" style={{ color: ink }}>{T("title", "What clients say after the matter is closed")}</h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <motion.figure initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 sm:p-12 lg:col-span-7" style={{ backgroundColor: accent, color: bg }}>
            <div className="font-serif text-8xl leading-none" style={{ opacity: 0.4 }}>&ldquo;</div>
            <blockquote className="-mt-6 font-serif text-2xl leading-snug sm:text-3xl"><Editable value={feature.quote} onChange={upF("quote")} /></blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <img src={feature.image} alt={feature.name} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <div className="text-base font-semibold"><Editable value={feature.name} onChange={upF("name")} /></div>
                <div className="text-sm" style={{ opacity: 0.8 }}><Editable value={feature.role} onChange={upF("role")} /></div>
              </div>
            </figcaption>
          </motion.figure>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {quotes.map((q: any, i: number) => (
              <figure key={i} className="flex-1 p-8 transition-all hover:scale-[1.02]" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
                <blockquote className="font-serif text-xl leading-snug" style={{ color: ink }}><Editable value={q.quote} onChange={up("quotes", quotes, i, "quote")} /></blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <img src={q.image} alt={q.name} className="h-11 w-11 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: ink }}><Editable value={q.name} onChange={up("quotes", quotes, i, "name")} /></div>
                    <div className="text-xs" style={{ color: inkSecond }}><Editable value={q.role} onChange={up("quotes", quotes, i, "role")} /></div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-3" style={{ borderTop: `1px solid ${ink}` }}>
          {stats.map((s: any, i: number) => (
            <div key={i} className="py-8 md:px-8" style={{ borderLeft: i === 0 ? "none" : `1px solid ${surface}` }}>
              <div className="font-serif text-5xl" style={{ color: ink }}><Editable value={s.value} onChange={up("stats", stats, i, "value")} /></div>
              <div className="mt-2 text-sm" style={{ color: inkSecond }}><Editable value={s.label} onChange={up("stats", stats, i, "label")} /></div>
            </div>
          ))}
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {awards.map((a: string, i: number) => (
            <li key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
              <Award className="h-5 w-5 shrink-0" style={{ color: accent }} />
              <Editable value={a} onChange={(v: string) => onChange?.({ awards: awards.map((x: string, j: number) => (j === i ? v : x)) })} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
