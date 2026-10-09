// @ts-nocheck
import { Star, Award } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const quotes = props?.quotes || [
    { text: "Halden launched our clinic platform in eight weeks. The first week after go-live, we had zero support tickets about usability.", name: "Dr. Amara Singh", role: "Founder, Meridian Health", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
    { text: "They challenged our roadmap, cut a third of it, and we shipped sooner with better results.", name: "Tobias Engel", role: "CTO, Stackwell", rating: 5, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    { text: "Design and engineering actually talk to each other here. It shows in every pixel and every pull request.", name: "Ruth Okonkwo", role: "Head of Product, Paperlane", rating: 5, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
    { text: "Our investors asked who built the product. That was the best review we could have asked for.", name: "Jamie Calder", role: "CEO, Loomstack", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
    { text: "Fixed prices, honest timelines and a team that picks up the phone. Exactly what we needed.", name: "Elise Moreau", role: "Operations lead, Kestrel CRM", rating: 4, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
  ];
  const stats = props?.stats || [
    { value: "4.9", label: "on Clutch, 41 reviews" },
    { value: "88", label: "net promoter score" },
    { value: "71%", label: "of work is repeat clients" },
  ];
  const awards = props?.awards || ["Awwwards Honorable Mention 2025", "Clutch Top B2B Developer 2025", "Webby Nominee 2024"];
  const setQ = (i: number, patch: any) => onChange?.({ quotes: quotes.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });
  const setS = (i: number, patch: any) => onChange?.({ stats: stats.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });

  return (
    <section id="testimonials" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Editable as="h2" value={props?.title || "Teams we have launched with"} onChange={(v: string) => onChange?.({ title: v })} className="max-w-xl font-['Newsreader'] text-4xl font-medium leading-tight tracking-tight sm:text-5xl" style={{ color: ink }} />
          <div className="flex flex-wrap gap-8">
            {stats.map((s: any, i: number) => (
              <div key={i} className="min-w-0">
                <Editable as="p" value={s.value} onChange={(v: string) => setS(i, { value: v })} className="font-['Newsreader'] text-4xl font-medium" style={{ color: ink }} />
                <Editable as="p" value={s.label} onChange={(v: string) => setS(i, { label: v })} className="text-sm" style={{ color: inkSecond }} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 gap-5 space-y-5 md:columns-2 lg:columns-3">
          {quotes.map((q: any, i: number) => (
            <figure key={i} className="break-inside-avoid rounded-3xl border p-7 transition duration-300 hover:-translate-y-1" style={{ backgroundColor: bg, borderColor: surface }}>
              <div className="flex gap-1" style={{ color: accent }}>
                {Array.from({ length: 5 }).map((_, k) => (<Star key={k} size={15} fill={k < q.rating ? "currentColor" : "none"} />))}
              </div>
              <Editable as="blockquote" value={q.text} onChange={(v: string) => setQ(i, { text: v })} className="mt-4 text-lg leading-relaxed" style={{ color: ink }} />
              <figcaption className="mt-6 flex items-center gap-3">
                <img src={q.avatar} alt={q.name} className="h-11 w-11 rounded-full object-cover" />
                <div className="min-w-0">
                  <Editable as="p" value={q.name} onChange={(v: string) => setQ(i, { name: v })} className="font-semibold" style={{ color: ink }} />
                  <Editable as="p" value={q.role} onChange={(v: string) => setQ(i, { role: v })} className="text-sm" style={{ color: inkSecond }} />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {awards.map((a: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm" style={{ backgroundColor: surface, color: ink }}>
              <Award size={16} style={{ color: accent }} />
              <Editable as="span" value={a} onChange={(v: string) => onChange?.({ awards: awards.map((x: string, j: number) => (j === i ? v : x)) })} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
