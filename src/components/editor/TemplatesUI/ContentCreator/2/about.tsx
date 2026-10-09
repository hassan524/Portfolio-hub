// @ts-nocheck
import { ArrowUpRight, Eye, Flame, Lightbulb, Radio, Target, Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F5F0E8";
  const ink = theme?.ink || "#181713";
  const accent = theme?.accent || "#FF6B35";

  const pillars = [
    {
      code: "PHASE 01",
      name: "DIAGNOSE ATTENTION TENSION",
      rule: "The 3-Second Rule",
      desc: "Before shooting a single frame, we locate the unresolvable curiosity or friction in the topic. If the viewer cannot articulate why they are watching within 3 seconds, they swipe away.",
    },
    {
      code: "PHASE 02",
      name: "TACTILE & KINETIC PRODUCTION",
      rule: "The Texture Law",
      desc: "Clean perfection looks like an AI generator. We use macro lenses on physical switches, high-impact foley audio, and percussive editing rhythms to establish visceral physical reality.",
    },
    {
      code: "PHASE 03",
      name: "ALGORITHMIC RETENTION TUNING",
      rule: "The 70% Floor",
      desc: "We analyze viewer drop-off frame by frame. Every pause longer than 0.8 seconds is cut or re-energized with sound design until graph lines remain above 70% to the end screen.",
    },
  ];

  return (
    <section id="about" className="relative px-4 py-28 sm:px-8 border-t-2 border-black" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 text-xs font-black uppercase tracking-[0.2em]">
          <span style={{ color: accent }}>01 // THE RETENTION METHODOLOGY</span>
          <span className="text-black/50">STOPPING THE INFINITE SCROLL</span>
        </div>

        {/* Massive Manifesto Statement */}
        <div className="mt-12 max-w-5xl">
          <Editable
            as="h2"
            value={props?.headline || "MOST CONTENT IS WHITE NOISE. WE MAKE WORK THAT DEMANDS A DOUBLE TAKE."}
            className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl"
          />
          <Editable
            as="p"
            value={props?.story || "Attention is the rarest currency on earth. You cannot buy true affection with boosted impressions. We partner with brands to craft films that viewers actively send to group chats, argue about in comment sections, and remember months later."}
            className="mt-8 max-w-3xl text-xl font-medium leading-relaxed sm:text-2xl"
          />
        </div>

        {/* BOLD STATS ROW — ZERO BOX CARDS! Clean architectural dividers */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t-2 border-b-2 border-black py-10 sm:grid-cols-4">
          <div>
            <span className="block text-5xl font-black tracking-tight sm:text-6xl" style={{ color: accent }}>
              2.8M+
            </span>
            <span className="mt-2 block text-xs font-black uppercase tracking-wider">Organic Subscribers</span>
            <span className="text-xs text-black/60">YouTube & Shorts</span>
          </div>
          <div>
            <span className="block text-5xl font-black tracking-tight sm:text-6xl">
              84M+
            </span>
            <span className="mt-2 block text-xs font-black uppercase tracking-wider">Annual Video Views</span>
            <span className="text-xs text-black/60">100% organic reach</span>
          </div>
          <div>
            <span className="block text-5xl font-black tracking-tight sm:text-6xl" style={{ color: accent }}>
              94%
            </span>
            <span className="mt-2 block text-xs font-black uppercase tracking-wider">0-10s Hook Hold</span>
            <span className="text-xs text-black/60">3.1x benchmark</span>
          </div>
          <div>
            <span className="block text-5xl font-black tracking-tight sm:text-6xl">
              4.8x
            </span>
            <span className="mt-2 block text-xs font-black uppercase tracking-wider">Sponsor Brand Lift</span>
            <span className="text-xs text-black/60">Measured ROI</span>
          </div>
        </div>

        {/* 3-PHASE WATERFALL TIMELINE — ZERO BOX CARDS! Linear typographic flow */}
        <div className="mt-16 space-y-12">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-black/50">
            THE 3-PHASE PRODUCTION SYSTEM:
          </div>

          <div className="divide-y-2 divide-black border-t-2 border-b-2 border-black">
            {pillars.map((p, idx) => (
              <div key={idx} className="py-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35] block">
                    {p.code} // {p.rule}
                  </span>
                  <h3 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                    {p.name}
                  </h3>
                </div>
                <div>
                  <p className="text-base font-medium leading-relaxed text-black/80 sm:text-lg">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-black uppercase tracking-wider text-black/50">
            CURRENT PRODUCTION QUEUE: OPEN FOR SELECT COLLABORATIONS
          </span>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-wider text-black hover:text-[#FF6B35]"
          >
            <span>Inspect Selected Productions</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
