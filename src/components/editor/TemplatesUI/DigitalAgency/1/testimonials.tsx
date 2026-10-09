// @ts-nocheck
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F4F5EF";
  const ink = theme?.ink || "#111827";
  const ink2 = theme?.["ink-second"] || "#5B6472";
  const accent = theme?.accent || "#87D53C";
  const surface = theme?.surface || "#FFFFFF";
  const A = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=150&q=80`;
  const reviews = props.reviews || [
    { author: "Elena Rostova", role: "VP Product, NeoSphere", quote: "Their 3D elements made a complex product easy to grasp. Demo requests doubled in three weeks.", avatar: A("photo-1534528741775-53994a69daeb") },
    { author: "Marcus Chen", role: "Founder, Kinfolk", quote: "The renders gave our packaging a real physical presence on screen. Worth every dollar.", avatar: A("photo-1507003211169-0a1dd7228f2d") },
    { author: "Sarah Lindqvist", role: "Head of Brand, Kinetix", quote: "No endless meetings or templates. We got a full brand system in Figma and WebGL, fast.", avatar: A("photo-1494790108377-be9c29b29330") },
    { author: "Dev Patel", role: "CEO, Pulse", quote: "They understood our users better than we did. The app finally feels friendly.", avatar: A("photo-1500648767791-00dcc994a43e") },
  ];
  const brands = props.brands || ["NeoSphere", "Kinfolk", "Zenith", "Kinetix", "Pulse"];
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4500, stopOnInteraction: true })]);
  const [sel, setSel] = useState(0);
  useEffect(() => { const f = () => setSel(api.selectedScrollSnap()); api?.on("select", f); return () => api?.off("select", f); }, [api]);

  return (
    <section id="testimonials" className="py-20 sm:py-28 overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <h2 className="font-black tracking-tighter leading-none text-[clamp(2rem,6vw,4.5rem)]">
            <Editable value={props.testimonialsTitle || "Kind words from clients"} onChange={(v) => onChange?.({ testimonialsTitle: v })} />
          </h2>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border-2 self-start" style={{ borderColor: ink, background: surface }}>
            <div className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} fill={accent} color={ink} />)}</div>
            <span className="text-sm font-black">4.9 average</span>
          </div>
        </div>
        <div ref={ref} className="overflow-hidden -mx-1 px-1 pb-3">
          <div className="flex gap-4 sm:gap-6">
            {reviews.map((r: any, i: number) => (
              <figure key={r.author} className="flex-[0_0_92%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0 p-6 sm:p-7 rounded-3xl border-2 flex flex-col justify-between gap-8" style={{ background: i % 3 === 0 ? accent : surface, borderColor: ink, boxShadow: `5px 5px 0 ${ink}` }}>
                <blockquote className="text-lg sm:text-xl font-bold leading-snug tracking-tight">“{r.quote}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  <img src={r.avatar} alt={r.author} loading="lazy" className="w-12 h-12 rounded-full object-cover border-2" style={{ borderColor: ink }} />
                  <div><div className="text-sm font-black">{r.author}</div><div className="text-xs font-medium" style={{ color: i % 3 === 0 ? ink : ink2 }}>{r.role}</div></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          {reviews.map((r: any, i: number) => <button key={r.author} type="button" aria-label={`Review ${i + 1}`} onClick={() => api?.scrollTo(i)} className="h-3 rounded-full border-2 transition-all cursor-pointer" style={{ width: sel === i ? 36 : 12, background: sel === i ? ink : "transparent", borderColor: ink }} />)}
        </div>
        <div className="mt-14 pt-8 border-t-2 flex flex-wrap items-center gap-x-10 gap-y-3" style={{ borderColor: ink }}>
          <span className="text-xs font-bold" style={{ color: ink2 }}>Trusted by</span>
          {brands.map((b: string) => <span key={b} className="text-xl sm:text-2xl font-black tracking-tight opacity-70">{b}</span>)}
        </div>
      </div>
    </section>
  );
}
export default DigitalAgency1Testimonials;