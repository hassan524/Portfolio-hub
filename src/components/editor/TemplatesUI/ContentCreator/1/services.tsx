// @ts-nocheck
import { useState } from "react";
import { ArrowUpRight, Check, Clapperboard, FileText, Film, Layers, ShieldCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A8AFBF";
  const accent = theme?.accent || "#7DD3FC";

  const tiers = [
    {
      num: "01",
      dept: "YOUTUBE SPONSORSHIP",
      title: "Dedicated Video Integration & Story Segment",
      specs: "60-90s seamless narrative integration inside our primary long-form YouTube episodes",
      turnaround: "14-21 Business Days",
      included: [
        "Custom narrative integration scripted to feel organic to the film",
        "3x vertical cutdowns for YouTube Shorts, Instagram Reels & TikTok",
        "Permanent link in description + 60-day pinned comment guarantee",
        "Full viewer analytics & retention report at 7, 14, and 30 days",
      ],
    },
    {
      num: "02",
      dept: "COMMERCIAL DIRECTING",
      title: "Commercial Film & Product Launch Directing",
      specs: "Turnkey 4K cinematic commercial productions for tech hardware & lifestyle brands",
      turnaround: "21-30 Business Days",
      included: [
        "End-to-end creative direction, treatment writing, and location scouting",
        "Cinema package: Sony FX6 cinema cameras, high-speed prime lenses & lighting",
        "Dolby Atmos sound design, custom score sync, and bespoke color grade",
        "Master delivery in 4K UHD 16:9, vertical 9:16, and square social crops",
      ],
    },
    {
      num: "03",
      dept: "CHANNEL STRATEGY",
      title: "Pacing & Viewer Retention Channel Audit",
      specs: "Comprehensive deep-dive teardown for creators and media brands looking to boost retention",
      turnaround: "5-7 Business Days",
      included: [
        "Second-by-second viewer retention curve audit of your top 3 videos",
        "Title & Thumbnail packaging framework to increase organic click-through rate",
        "30-second opening hook restructuring system to push hold past 70%",
        "90-minute live consulting session with recording and implementation action guide",
      ],
    },
  ];

  return (
    <section id="services" className="relative px-5 py-24 sm:px-8 sm:py-32 border-t border-white/10" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl font-mono">
        {/* Straight Header */}
        <div className="border-b border-white/15 pb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7DD3FC]">
            <Clapperboard size={14} />
            <Editable value={props?.label || "PRODUCTION PACKAGES & SPONSOR RATE CARD"} />
          </div>
          <Editable
            as="h2"
            value={props?.headline || "COMMISSION SERVICES & SPONSORSHIP TIERS."}
            onChange={(v) => onChange?.({ headline: v })}
            className="mt-4 text-3xl font-semibold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl"
          />
          <p className="mt-4 max-w-2xl text-base text-white/70 font-sans">
            Every project is produced with uncompromising cinematic standards. Choose a sponsorship tier or commission a standalone commercial film.
          </p>
        </div>

        {/* Straight Rows — Zero Box Cards */}
        <div className="mt-12 divide-y divide-white/15 border-b border-white/15">
          {tiers.map((tier, idx) => (
            <div key={idx} className="py-10 grid gap-8 lg:grid-cols-[0.3fr_1fr_0.4fr] lg:items-start">
              {/* Package Code & Dept */}
              <div>
                <span className="text-sm font-bold text-[#7DD3FC]">
                  {tier.num} //
                </span>
                <span className="mt-1 block text-xs font-bold uppercase text-white/60">
                  {tier.dept}
                </span>
                <span className="mt-3 inline-block rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/80">
                  Turnaround: {tier.turnaround}
                </span>
              </div>

              {/* Title & Included Deliverables */}
              <div>
                <h3 className="text-xl font-semibold uppercase text-white sm:text-2xl">{tier.title}</h3>
                <p className="mt-2 text-sm text-white/70 font-sans">{tier.specs}</p>

                <div className="mt-6 space-y-2.5 font-sans text-sm text-white/85">
                  {tier.included.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check size={16} className="text-[#7DD3FC] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="lg:text-right">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#7DD3FC] bg-[#7DD3FC]/10 px-5 py-2.5 text-xs font-bold uppercase text-[#7DD3FC] hover:bg-[#7DD3FC] hover:text-[#0A0A0C] transition"
                >
                  <span>Book This Tier</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
