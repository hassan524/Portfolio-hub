// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
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
  const [idx, setIdx] = useState(0);
  const quotes = props?.quotes || [
    { quote: "Elena rebuilt our entire plan after we sold the business. For the first time in years I understand where every dollar sits and why.", name: "Michael Hartman", role: "Founder, Hartman Freight", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" },
    { quote: "No jargon, no pressure and no hidden fees. They found over $40,000 in tax savings in the first year.", name: "Dana Whitfield", role: "Surgeon", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
    { quote: "We retired two years earlier than we thought possible, and the plan has held up through two market drops.", name: "Arthur and Ines Boyle", role: "Retired educators", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80" },
  ];
  const stats = props?.stats || [
    { value: "4.9", label: "Average client rating" },
    { value: "312", label: "Five-star reviews" },
    { value: "15", label: "Years of top ranking" },
  ];
  const recognition = props?.recognition || ["Top 50 Independent Advisors", "Fiduciary Firm of the Year 2025", "Client Choice Award 2024"];
  const q = quotes[idx % quotes.length];
  const upQ = (f: string) => (v: string) =>
    onChange?.({ quotes: quotes.map((x: any, j: number) => (j === idx % quotes.length ? { ...x, [f]: v } : x)) });
  const upS = (i: number, f: string) => (v: string) =>
    onChange?.({ stats: stats.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });

  return (
    <section id="testimonials" className="py-24 sm:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "Client stories")}</div>
        <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: ink }}>{T("title", "What our clients say after years with us")}</h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="relative rounded-[2rem] p-8 sm:p-12 lg:col-span-2" style={{ backgroundColor: bg, border: `1px solid ${surface}` }}>
            <Quote className="h-10 w-10" style={{ color: accent }} />
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <div className="mt-6 flex gap-1">
                  {[0, 1, 2, 3, 4].map((k) => (
                    <Star key={k} className="h-5 w-5" style={{ color: accent, fill: accent }} />
                  ))}
                </div>
                <blockquote className="mt-6 text-2xl font-medium leading-snug sm:text-3xl" style={{ color: ink }}>
                  <Editable value={q.quote} onChange={upQ("quote")} />
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <img src={q.image} alt={q.name} className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <div className="text-base font-semibold" style={{ color: ink }}><Editable value={q.name} onChange={upQ("name")} /></div>
                    <div className="text-sm" style={{ color: inkSecond }}><Editable value={q.role} onChange={upQ("role")} /></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 flex gap-3">
              <button type="button" aria-label="Previous" onClick={() => setIdx((idx - 1 + quotes.length) % quotes.length)} className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: surface, color: ink }}>
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button type="button" aria-label="Next" onClick={() => setIdx((idx + 1) % quotes.length)} className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {stats.map((s: any, i: number) => (
              <div key={i} className="rounded-[2rem] p-7" style={{ backgroundColor: i === 0 ? accent : bg, color: i === 0 ? bg : ink, border: `1px solid ${surface}` }}>
                <div className="text-4xl font-semibold"><Editable value={s.value} onChange={upS(i, "value")} /></div>
                <div className="mt-1 text-sm" style={{ opacity: 0.75 }}><Editable value={s.label} onChange={upS(i, "label")} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10" style={{ color: inkSecond }}>
          {recognition.map((r: string, i: number) => (
            <span key={i} className="text-sm font-medium">
              <Editable value={r} onChange={(v: string) => onChange?.({ recognition: recognition.map((x: string, j: number) => (j === i ? v : x)) })} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
