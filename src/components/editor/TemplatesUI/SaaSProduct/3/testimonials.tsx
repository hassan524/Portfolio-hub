// @ts-nocheck
import { motion } from "framer-motion";
import { Star, Award, ShieldCheck, Clock, Quote } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const img = (id: string, w = 300) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const rise = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } };
const badgeIcons = [Award, ShieldCheck, Clock];

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F6F5EF";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#111111";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(17, 17, 17, 0.06)";
  const accent = theme?.accent || "#4ADE5A";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const stats = props?.stats || [{ value: "4.9/5", label: "Average rating" }, { value: "180+", label: "Projects delivered" }, { value: "92%", label: "Clients who return" }, { value: "14", label: "Design awards" }];
  const quotes = props?.quotes || [
    { quote: "Our trial-to-paid rate jumped 38% after the onboarding redesign. The team felt like part of ours.", name: "Rachel Nguyen", role: "CEO, Stackly", image: img("photo-1494790108377-be9c29b29330") },
    { quote: "Sharp thinking, beautiful screens and honest weekly updates. Best studio we have hired.", name: "Marcus Hale", role: "CPO, Pipeline HQ", image: img("photo-1507003211169-0a1dd7228f2d") },
    { quote: "They rebuilt our brand and website in six weeks. Investors noticed the difference immediately.", name: "Aisha Rahman", role: "Founder, Clearview", image: img("photo-1438761681033-6461ffad8d80") },
  ];
  const badges = props?.badges || ["Top rated studio 2026", "Award-winning UX", "98% on-time delivery"];
  return (
    <section id="testimonials" className="px-6 py-24 md:py-32" style={{ background: bgSecond, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <motion.div {...rise} className="max-w-2xl">
          <span className="rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: surface }}>{T("eyebrow", "Social proof")}</span>
          <h2 className="mt-5 break-words text-4xl font-black tracking-tight md:text-5xl">{T("title", "Loved by fast-growing SaaS teams")}</h2>
        </motion.div>
        <motion.div {...rise} className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s: any, i: number) => (
            <div key={i} className="rounded-3xl p-6" style={i === 0 ? { background: accent, color: ink } : { background: surface }}>
              <div className="text-4xl font-black">{I("stats", stats, i, "value")}</div>
              <div className="mt-1 break-words text-sm">{I("stats", stats, i, "label")}</div>
            </div>
          ))}
        </motion.div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {quotes.map((q: any, i: number) => (
            <motion.div key={i} {...rise} className="flex flex-col rounded-[2rem] p-8 transition hover:scale-[1.02] active:scale-95" style={{ background: surface }}>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">{[0, 1, 2, 3, 4].map((n) => (<Star key={n} size={16} fill={accent} stroke={accent} />))}</div>
                <Quote size={26} style={{ color: accent }} />
              </div>
              <p className="mt-5 flex-1 break-words text-lg leading-relaxed">{I("quotes", quotes, i, "quote")}</p>
              <div className="mt-8 flex items-center gap-3">
                <img src={q.image} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div className="min-w-0"><div className="break-words font-bold">{I("quotes", quotes, i, "name")}</div><div className="break-words text-sm" style={{ color: inkSecond }}>{I("quotes", quotes, i, "role")}</div></div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div {...rise} className="mt-10 flex flex-wrap gap-3">
          {badges.map((b: string, i: number) => { const Icon = badgeIcons[i % badgeIcons.length]; return (
            <span key={i} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: surface }}><Icon size={16} style={{ color: accent }} />{I("badges", badges, i)}</span>); })}
        </motion.div>
      </div>
    </section>
  );
}
