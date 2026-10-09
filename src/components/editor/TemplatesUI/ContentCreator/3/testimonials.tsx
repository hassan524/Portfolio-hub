// @ts-nocheck
import { ArrowUpRight, CheckCircle2, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#123C35";
  const ink = theme?.ink || "#F1F7E8";
  const accent = theme?.accent || "#D6FF4B";

  const reviews = props?.quotes || [
    {
      brand: "KEYCHRON KEYBOARDS",
      format: "Custom Hardware Build & Desk Tour",
      quote: "The depth of technical analysis and workflow testing Leo showed was unmatched. His dedicated video single-handedly sold out our entire production batch in less than 48 hours.",
      contact: "David Park",
      role: "VP of Global Marketing",
      highlight: "Sold Out Batch in 48h",
    },
    {
      brand: "ELGATO STREAMING",
      format: "Studio Setup Integration",
      quote: "Creators trust Leo because he tests products thoroughly before recommending them. When he demonstrated our capture workflow, viewer retention remained at 82% straight through the segment.",
      contact: "Sarah Lindqvist",
      role: "Head of Creator Partnerships",
      highlight: "82% Viewer Retention",
    },
    {
      brand: "SHURE AUDIO",
      format: "Microphone Audio Shootout",
      quote: "Hands down the most professional creator integration of the quarter. Pristine audio, meticulous A/B comparisons, and an engaged audience of creators that immediately purchased.",
      contact: "Marcus Vance",
      role: "Lead Audio Product Specialist",
      highlight: "+240% Referral Lift",
    },
  ];

  return (
    <section id="testimonials" className="relative px-5 py-24 sm:px-8 sm:py-32 border-t border-[#D6FF4B]/20" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Header Block: Big, Clean, Straight Alignment */}
        <div className="border-b border-[#D6FF4B]/20 pb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D6FF4B]">
            <ShieldCheck size={14} />
            <Editable value={props?.label || "VERIFIED BRAND PARTNERSHIPS"} />
          </div>
          <Editable
            as="h2"
            value={props?.headline || "WHAT SPONSORS SAY ABOUT WORKING WITH US."}
            onChange={(v) => onChange?.({ headline: v })}
            className="mt-4 text-3xl font-light uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl"
          />
          <p className="mt-4 max-w-2xl text-base text-[#F1F7E8]/75">
            Real campaign reviews from tech and creative hardware companies that have sponsored our YouTube videos and podcasts.
          </p>
        </div>

        {/* 3-COLUMN STRAIGHT-ALIGNED GRID — CLEAN BORDERS, ZERO CARDS */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#D6FF4B]/20 border-b border-[#D6FF4B]/20 pb-12">
          {reviews.map((r: any, idx: number) => (
            <div key={idx} className={`${idx > 0 ? "pt-8 lg:pt-0 lg:pl-8" : ""} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D6FF4B]">
                    {r.brand}
                  </span>
                  <span className="rounded bg-[#D6FF4B]/10 px-2 py-0.5 text-[10px] font-mono font-bold text-[#D6FF4B]">
                    {r.highlight}
                  </span>
                </div>
                <span className="mt-1 block text-xs text-[#F1F7E8]/50 font-mono">
                  {r.format}
                </span>

                <blockquote className="mt-6 text-base font-light leading-relaxed text-white sm:text-lg">
                  "{r.quote}"
                </blockquote>
              </div>

              <div className="mt-8 border-t border-[#D6FF4B]/15 pt-4">
                <span className="block text-sm font-medium text-white">{r.contact}</span>
                <span className="block text-xs text-[#F1F7E8]/50">{r.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM STRAIGHT SPONSOR BAR */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-[#D6FF4B]/20 pb-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-[#D6FF4B] block">
              BOOKING AVAILABILITY
            </span>
            <span className="text-lg font-light text-white block mt-1">
              Currently accepting video sponsorships for upcoming quarter releases.
            </span>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 self-start rounded-full bg-[#D6FF4B] px-6 py-3 text-xs font-bold uppercase text-[#123C35] hover:scale-105 transition shrink-0"
          >
            <span>Inquire for Sponsorship</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
