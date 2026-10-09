// @ts-nocheck
import { ArrowUpRight, CheckCircle2, MessageSquare, Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A0A5B5";
  const accent = theme?.accent || "#7DD3FC";

  const testimonials = props?.quotes || [
    {
      brand: "NOTION WORKSPACE",
      campaign: "Dedicated 90-Second Storytelling Integration",
      quote: "This was the single highest-converting creator partnership we ran all year. Instead of a scripted talking head ad, they built a cinematic story around their real creative workflow that our entire product marketing team celebrated.",
      author: "Sofia Kim",
      title: "VP of Global Brand Marketing",
      metric: "3.4M Views • 14,200 New Signups",
    },
    {
      brand: "SONY ALPHA CAMERAS",
      campaign: "Feature-Length Cinematic Documentary Sponsorship",
      quote: "Working with a director who understands real storytelling elevated our gear beyond technical specs. The viewer comments were overwhelmingly positive, thanking us for sponsoring genuine filmmaking instead of an intrusive pitch.",
      author: "Marcus Vance",
      title: "Head of Creator Partnerships",
      metric: "1.8M Views • 74% Watch Retention",
    },
  ];

  return (
    <section id="testimonials" className="relative px-5 py-24 sm:px-8 sm:py-32 border-t border-white/10" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Straight Header Label & Big Simple Headline */}
        <div className="border-b border-white/15 pb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7DD3FC]">
            <MessageSquare size={14} />
            <Editable value={props?.label || "BRAND PARTNERS & SPONSOR REVIEWS"} />
          </div>
          <Editable
            as="h2"
            value={props?.headline || "WHAT BRANDS SAY ABOUT OUR SPONSORED FILMS."}
            onChange={(v) => onChange?.({ headline: v })}
            className="mt-4 text-3xl font-semibold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl"
          />
          <p className="mt-4 max-w-2xl text-base text-white/70">
            We partner with select brands to create seamless story integrations that respect viewer intelligence and drive real measurable results.
          </p>
        </div>

        {/* STRAIGHT-ALIGNED EDITORIAL ROWS — ZERO CARDS */}
        <div className="mt-12 divide-y divide-white/15 border-b border-white/15">
          {testimonials.map((t: any, idx: number) => (
            <div key={idx} className="py-12 grid gap-8 lg:grid-cols-[0.35fr_1fr] lg:items-start">
              {/* Brand & Campaign Info */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7DD3FC] block">
                  BRAND SPONSOR
                </span>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white">
                  {t.brand}
                </h3>
                <p className="text-xs text-white/60">
                  {t.campaign}
                </p>
                <div className="pt-2">
                  <span className="inline-block rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-semibold text-[#7DD3FC]">
                    {t.metric}
                  </span>
                </div>
              </div>

              {/* Big, Clear, Straight Quote */}
              <div className="space-y-6">
                <blockquote className="text-xl font-normal leading-relaxed text-white/90 sm:text-2xl lg:text-3xl">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="block text-base font-semibold text-white">{t.author}</span>
                    <span className="block text-xs text-white/50">{t.title}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#7DD3FC]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
