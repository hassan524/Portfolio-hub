// @ts-nocheck
import { Code2, Smartphone, PenTool, Check } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const ICONS: any = { code: Code2, mobile: Smartphone, design: PenTool };

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const DEFAULT_ITEMS = [
    { icon: "code", num: "01", title: "Web Development", text: "Scalable web apps, customer portals, SaaS products and marketing sites built for speed and long-term growth.", tags: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"] },
    { icon: "mobile", num: "02", title: "Mobile Development", text: "Native iOS, Android and cross-platform apps, from first prototype to a polished App Store release.", tags: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"] },
    { icon: "design", num: "03", title: "Strategy & Design", text: "User research, wireframes, prototypes and design systems that turn a rough idea into a clear product.", tags: ["Figma", "UX Research", "Prototyping", "Design Systems"] },
  ];
  const DEFAULT_MODELS = [
    { name: "Product Sprint", note: "Six weeks, fixed scope, one launch-ready release", price: "From $18,000" },
    { name: "Dedicated Team", note: "Designer, two engineers and a lead on your roadmap", price: "From $32,000 / month" },
    { name: "Ongoing Support", note: "Maintenance, monitoring and monthly improvements", price: "From $4,500 / month" },
  ];
  const items = Array.isArray(props?.items) && props.items.length > 0 ? props.items : DEFAULT_ITEMS;
  const models = Array.isArray(props?.models) && props.models.length > 0 ? props.models : DEFAULT_MODELS;
  const setItem = (i: number, k: string, v: any) => onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });
  const setModel = (i: number, k: string, v: string) => onChange?.({ models: models.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="services" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Editable as="p" value={props?.eyebrow || "WHAT WE DO"} onChange={(v: string) => onChange?.({ eyebrow: v })} className="text-xs font-semibold tracking-[0.25em]" style={{ color: inkSecond }} />
          <Editable as="h2" value={props?.title || "Three disciplines. One delivery team."} onChange={(v: string) => onChange?.({ title: v })} className="mt-4 font-['Poppins'] text-3xl font-bold tracking-tight sm:text-5xl" style={{ color: ink }} />
          <Editable as="p" value={props?.subtitle || "A senior in-house team that covers the whole product lifecycle. No handoffs, no middlemen, no surprises."} onChange={(v: string) => onChange?.({ subtitle: v })} className="mt-5 text-lg leading-relaxed" style={{ color: inkSecond }} />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((it: any, i: number) => {
            const Icon = ICONS[it.icon] || Code2;
            return (
              <div key={i} className="relative flex min-w-0 flex-col rounded-3xl border p-8 transition duration-300 hover:-translate-y-1" style={{ backgroundColor: surface, borderColor: surface }}>
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ backgroundColor: bg, borderColor: surface, color: ink }}><Icon size={24} /></span>
                  <Editable as="span" value={it.num} onChange={(v: string) => setItem(i, "num", v)} className="font-['Poppins'] text-5xl font-bold opacity-20" style={{ color: inkSecond }} />
                </div>
                <Editable as="h3" value={it.title} onChange={(v: string) => setItem(i, "title", v)} className="mt-8 font-['Poppins'] text-2xl font-semibold" style={{ color: ink }} />
                <Editable as="p" value={it.text} onChange={(v: string) => setItem(i, "text", v)} className="mt-3 leading-relaxed" style={{ color: inkSecond }} />
                <div className="mt-6 flex flex-wrap gap-2">
                  {it.tags.map((t: string, k: number) => (
                    <Editable key={k} as="span" value={t} onChange={(v: string) => setItem(i, "tags", it.tags.map((x: string, m: number) => (m === k ? v : x)))} className="rounded-full border px-3.5 py-1.5 text-sm" style={{ borderColor: inkSecond, color: inkSecond }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div className="min-w-0">
            <Editable as="h3" value={props?.modelsTitle || "Simple ways to work together"} onChange={(v: string) => onChange?.({ modelsTitle: v })} className="font-['Poppins'] text-3xl font-semibold tracking-tight" style={{ color: ink }} />
            <Editable as="p" value={props?.modelsText || "Pick the engagement that fits your stage. Every project starts with a free scoping call and a written estimate."} onChange={(v: string) => onChange?.({ modelsText: v })} className="mt-4 leading-relaxed" style={{ color: inkSecond }} />
          </div>
          <div className="overflow-hidden rounded-3xl border" style={{ backgroundColor: bgSecond, borderColor: surface }}>
            {models.map((m: any, i: number) => (
              <div key={i} className="flex flex-col gap-3 border-b p-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: surface }}>
                <div className="flex min-w-0 items-start gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: accent, color: ink }}><Check size={14} /></span>
                  <div className="min-w-0">
                    <Editable as="p" value={m.name} onChange={(v: string) => setModel(i, "name", v)} className="font-semibold" style={{ color: ink }} />
                    <Editable as="p" value={m.note} onChange={(v: string) => setModel(i, "note", v)} className="mt-1 text-sm" style={{ color: inkSecond }} />
                  </div>
                </div>
                <Editable as="p" value={m.price} onChange={(v: string) => setModel(i, "price", v)} className="shrink-0 font-['Poppins'] font-semibold" style={{ color: ink }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const SaaSProduct5Services = Services;
export default Services;
