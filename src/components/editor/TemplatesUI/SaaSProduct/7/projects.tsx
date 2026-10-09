// @ts-nocheck
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const items = props?.items || [
    { title: "Meridian Health", tags: ["Healthcare", "Web app"], text: "A scheduling and records platform for independent clinics, now used in 140 practices.", price: "Project value $86,000", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80" },
    { title: "Stackwell", tags: ["Developer tools"], text: "A cost dashboard that shows engineering teams where their cloud budget goes.", price: "Project value $58,000", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80" },
    { title: "Loomstack", tags: ["Mobile", "Retail ops"], text: "Inventory scanning app for small shops, built with React Native.", price: "Project value $41,000", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80" },
    { title: "Paperlane", tags: ["Legal tech", "AI"], text: "Contract review assistant that flags risky clauses in seconds.", price: "Project value $73,000", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80" },
    { title: "Kestrel CRM", tags: ["Sales", "Web app"], text: "A lightweight CRM for agencies, with pipeline views and automatic follow-up reminders.", price: "Project value $64,000", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80" },
  ];
  const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
  const setItem = (i: number, k: string, v: any) => onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="projects" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <Editable as="h2" value={props?.title || "Recent product launches"} onChange={(v: string) => onChange?.({ title: v })} className="font-['Newsreader'] text-4xl font-medium leading-tight tracking-tight sm:text-5xl" style={{ color: ink }} />
          <Editable as="p" value={props?.subtitle || "Five products we took from idea to live release."} onChange={(v: string) => onChange?.({ subtitle: v })} className="max-w-xs text-lg" style={{ color: inkSecond }} />
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {items.map((it: any, i: number) => (
            <article key={i} className={"group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border transition duration-300 hover:-translate-y-1 " + span[i % span.length]} style={{ backgroundColor: bgSecond, borderColor: surface }}>
              <div className="relative overflow-hidden">
                <img src={it.image} alt={it.title} className={"w-full object-cover transition duration-700 group-hover:scale-105 " + (i < 2 ? "aspect-[16/10]" : "aspect-[4/3]")} />
                <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full transition duration-300 group-hover:rotate-45" style={{ backgroundColor: accent, color: bg }}><ArrowUpRight size={18} /></span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  {it.tags.map((t: string, k: number) => (
                    <Editable key={k} as="span" value={t} onChange={(v: string) => setItem(i, "tags", it.tags.map((x: string, m: number) => (m === k ? v : x)))} className="rounded-full px-3 py-1 text-xs" style={{ backgroundColor: surface, color: inkSecond }} />
                  ))}
                </div>
                <Editable as="h3" value={it.title} onChange={(v: string) => setItem(i, "title", v)} className="mt-4 font-['Newsreader'] text-2xl font-medium" style={{ color: ink }} />
                <Editable as="p" value={it.text} onChange={(v: string) => setItem(i, "text", v)} className="mt-2 flex-1 leading-relaxed" style={{ color: inkSecond }} />
                <Editable as="p" value={it.price} onChange={(v: string) => setItem(i, "price", v)} className="mt-5 border-t pt-4 text-sm font-medium" style={{ color: ink, borderColor: surface }} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
