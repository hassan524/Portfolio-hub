// @ts-nocheck
import { ArrowUpRight, Flame, Sparkles, Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F5F0E8";
  const ink = theme?.ink || "#181713";
  const accent = theme?.accent || "#FF6B35";

  const quotes = props?.quotes || [
    {
      brand: "DAYLIGHT AUDIO",
      quote: "Most agencies give you safe, boring garbage that gets 2,000 views. These guys produced a video that generated 3.4M organic views and literally cleared our warehouse stock in 48 hours.",
      author: "Sofia Kim",
      title: "VP of Brand Strategy",
      stat: "3.4M VIEWS • SOLD OUT",
    },
    {
      brand: "APEX MOTION",
      quote: "The 3-second hook they designed for our footwear campaign stopped scrollers so hard our Instagram save-rate jumped 300%. Unquestionably the highest ROI video partnership we've ever done.",
      author: "Trevor Cole",
      title: "Global Creative Director",
      stat: "+320% SOCIAL MENTIONS",
    },
  ];

  return (
    <section id="testimonials" className="relative px-4 py-28 sm:px-8 border-t-2 border-black" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 text-xs font-black uppercase tracking-[0.2em]">
          <span style={{ color: accent }}>03 // VERIFIED BRAND WAR STORIES</span>
          <span className="text-black/50">MEASURED REVENUE IMPACT</span>
        </div>

        <div className="mt-8">
          <Editable
            as="h2"
            value={props?.headline || "WHAT HAPPENS WHEN CONTENT ACTUALLY CUTS THROUGH."}
            className="text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-6xl"
          />
        </div>

        {/* FULL-WIDTH EDITORIAL TESTIMONIAL QUOTES — ZERO BOX CARDS! */}
        <div className="mt-14 divide-y-2 divide-black border-t-2 border-b-2 border-black">
          {quotes.map((q: any, i: number) => (
            <div key={i} className="py-12 grid gap-6 lg:grid-cols-[0.3fr_1fr_0.4fr] lg:items-start">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35] block">
                  BRAND PARTNER
                </span>
                <span className="mt-1 block text-2xl font-black uppercase tracking-tight text-black">
                  {q.brand}
                </span>
                <span className="mt-2 inline-block rounded-full bg-black px-3 py-1 text-[11px] font-black uppercase text-white">
                  {q.stat}
                </span>
              </div>

              <div>
                <blockquote className="text-2xl font-black leading-snug tracking-tight text-black sm:text-3xl">
                  "{q.quote}"
                </blockquote>
              </div>

              <div className="lg:text-right">
                <span className="block font-black text-lg">{q.author}</span>
                <span className="block text-xs font-bold uppercase text-black/60">{q.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
