// @ts-nocheck
import { Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const DEFAULT_QUOTES = [
    { text: "They shipped our first version in under four months and it has barely needed a patch since.", name: "Hannah Brooks", role: "CEO, Ledgerly", rating: 5, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" },
    { text: "The design work changed how our investors saw us, and the engineering matched it line for line.", name: "Marcus Lindqvist", role: "Founder, Chorusline", rating: 5, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" },
    { text: "Clear weekly updates, honest estimates, and a mobile app our drivers actually like.", name: "Sofia Alvarez", role: "COO, Parcelwise", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
  ];
  const quotes = Array.isArray(props?.quotes) && props.quotes.length > 0 ? props.quotes : (Array.isArray(props?.items) && props.items.length > 0 ? props.items : DEFAULT_QUOTES);
  const setQ = (i: number, patch: any) => onChange?.({ quotes: quotes.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });

  return (
    <section id="testimonials" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Editable as="h2" value={props?.title || "What our clients say"} onChange={(v: string) => onChange?.({ title: v })} className="font-['Poppins'] text-3xl font-bold tracking-tight sm:text-5xl" style={{ color: ink }} />
          <Editable as="p" value={props?.subtitle || "Rated 4.9 across 38 verified client reviews."} onChange={(v: string) => onChange?.({ subtitle: v })} className="mt-5 text-lg" style={{ color: inkSecond }} />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((q: any, i: number) => (
            <figure key={i} className="flex min-w-0 flex-col justify-between rounded-3xl border p-8" style={{ backgroundColor: surface, borderColor: surface }}>
              <div>
                <div className="flex gap-1" style={{ color: accent }}>
                  {Array.from({ length: q.rating }).map((_, k) => (<Star key={k} size={16} fill="currentColor" />))}
                </div>
                <Editable as="blockquote" value={q.text} onChange={(v: string) => setQ(i, { text: v })} className="mt-5 leading-relaxed" style={{ color: ink }} />
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                <img src={q.avatar} alt={q.name} className="h-11 w-11 rounded-full object-cover" />
                <div className="min-w-0">
                  <Editable as="p" value={q.name} onChange={(v: string) => setQ(i, { name: v })} className="font-semibold" style={{ color: ink }} />
                  <Editable as="p" value={q.role} onChange={(v: string) => setQ(i, { role: v })} className="text-sm" style={{ color: inkSecond }} />
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export const SaaSProduct5Testimonials = Testimonials;
export const TestimonialsDefault = Testimonials;
export default Testimonials;
