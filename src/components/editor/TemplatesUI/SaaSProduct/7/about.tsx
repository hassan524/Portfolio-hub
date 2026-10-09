// @ts-nocheck
import { Target, Scale, Sprout } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const ICONS: any = { target: Target, scale: Scale, sprout: Sprout };

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const timeline = props?.timeline || [
    { year: "2018", title: "Founded in Austin", text: "Two former product leads start Halden Labs from a shared office with three clients." },
    { year: "2020", title: "First fully remote team", text: "The studio grows to twelve people across four time zones." },
    { year: "2023", title: "50th product shipped", text: "We pass fifty launches and open a dedicated design practice." },
    { year: "2026", title: "Twenty-one specialists", text: "Strategy, design and engineering under one roof, still taking only six projects at a time." },
  ];
  const values = props?.values || [
    { icon: "target", title: "Outcomes over output", text: "We measure success by what your customers do, not by how many screens we deliver." },
    { icon: "scale", title: "Straight answers", text: "If an idea will not work, we say so early and suggest something better." },
    { icon: "sprout", title: "Built to grow", text: "Clean architecture and documentation so your next engineers can move quickly." },
  ];
  const team = props?.team || [
    { name: "Nadia Hassan", role: "Co-founder, Strategy", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80" },
    { name: "Owen Mitchell", role: "Co-founder, Engineering", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80" },
    { name: "Mei Tanaka", role: "Design Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80" },
    { name: "Rafael Costa", role: "Engineering Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80" },
  ];
  const tools = props?.tools || ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS", "Figma", "Stripe", "OpenAI"];
  const set = (key: string, arr: any[], i: number, patch: any) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, ...patch } : x)) });

  return (
    <section id="about" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <Editable as="h2" value={props?.title || "A senior team that stays small on purpose"} onChange={(v: string) => onChange?.({ title: v })} className="font-['Newsreader'] text-4xl font-medium leading-tight tracking-tight sm:text-5xl" style={{ color: ink }} />
            <Editable as="p" value={props?.story || "Halden Labs began as a response to a common problem: strategy in one agency, design in another, and engineering somewhere else. We put all three in one room so nothing gets lost between handoffs."} onChange={(v: string) => onChange?.({ story: v })} className="mt-6 text-lg leading-relaxed" style={{ color: inkSecond }} />
            <div className="mt-8 flex flex-wrap gap-2">
              {tools.map((t: string, i: number) => (
                <Editable key={i} as="span" value={t} onChange={(v: string) => onChange?.({ tools: tools.map((x: string, j: number) => (j === i ? v : x)) })} className="rounded-lg border px-3 py-1.5 text-sm" style={{ backgroundColor: surface, borderColor: surface, color: inkSecond }} />
              ))}
            </div>

            <div className="mt-12 border-l pl-8" style={{ borderColor: surface }}>
              {timeline.map((t: any, i: number) => (
                <div key={i} className="relative pb-9 last:pb-0">
                  <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full" style={{ backgroundColor: accent }} />
                  <Editable as="p" value={t.year} onChange={(v: string) => set("timeline", timeline, i, { year: v })} className="text-sm font-semibold" style={{ color: accent }} />
                  <Editable as="p" value={t.title} onChange={(v: string) => set("timeline", timeline, i, { title: v })} className="mt-1 font-['Newsreader'] text-xl font-medium" style={{ color: ink }} />
                  <Editable as="p" value={t.text} onChange={(v: string) => set("timeline", timeline, i, { text: v })} className="mt-1 leading-relaxed" style={{ color: inkSecond }} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-4">
            <div className="overflow-hidden rounded-3xl border p-2" style={{ backgroundColor: surface, borderColor: surface }}>
              <img src={props?.imageA || "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80"} alt="Team workshop" className="aspect-[16/10] w-full rounded-2xl object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={props?.imageB || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"} alt="Designers collaborating" className="aspect-square w-full rounded-3xl border object-cover" style={{ borderColor: surface }} />
              <div className="flex flex-col justify-between rounded-3xl p-6" style={{ backgroundColor: accent, color: bg }}>
                <Editable as="p" value={props?.statValue || "96%"} onChange={(v: string) => onChange?.({ statValue: v })} className="font-['Newsreader'] text-5xl font-medium" />
                <Editable as="p" value={props?.statLabel || "of launches shipped on the agreed date"} onChange={(v: string) => onChange?.({ statLabel: v })} className="font-medium" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {values.map((v: any, i: number) => {
            const Icon = ICONS[v.icon] || Target;
            return (
              <div key={i} className="min-w-0 rounded-3xl border p-7" style={{ backgroundColor: bgSecond, borderColor: surface }}>
                <Icon size={26} style={{ color: accent }} />
                <Editable as="h3" value={v.title} onChange={(t: string) => set("values", values, i, { title: t })} className="mt-5 font-['Newsreader'] text-2xl font-medium" style={{ color: ink }} />
                <Editable as="p" value={v.text} onChange={(t: string) => set("values", values, i, { text: t })} className="mt-2 leading-relaxed" style={{ color: inkSecond }} />
              </div>
            );
          })}
        </div>

        <div className="mt-20">
          <Editable as="h3" value={props?.teamTitle || "Leadership"} onChange={(v: string) => onChange?.({ teamTitle: v })} className="font-['Newsreader'] text-3xl font-medium" style={{ color: ink }} />
          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {team.map((m: any, i: number) => (
              <div key={i} className="min-w-0">
                <img src={m.image} alt={m.name} className="aspect-[4/5] w-full rounded-2xl object-cover" />
                <Editable as="p" value={m.name} onChange={(v: string) => set("team", team, i, { name: v })} className="mt-4 font-semibold" style={{ color: ink }} />
                <Editable as="p" value={m.role} onChange={(v: string) => set("team", team, i, { role: v })} className="text-sm" style={{ color: inkSecond }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
