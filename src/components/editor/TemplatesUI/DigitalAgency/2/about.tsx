// @ts-nocheck
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, ShieldCheck, Award, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2About({ props = {}, theme, onChange }: any) {
  // Dynamic theme tokens - strictly avoiding manual tailwind colors
  const bg = theme?.bg || theme?.bgPrimary || "#0C0C0E";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#16161A";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#9CA3AF";
  const surface = theme?.surface || "#1F1F24";
  const accent = theme?.accent || "#CCFF00";

  const milestones = [
    { year: "2011", title: "Inception & Early Advisory", desc: "Formed private advisory practice for first cohort of Silicon Valley mobile startups." },
    { year: "2016", title: "Enterprise Scaling System", desc: "Codified the 3-pillar growth doctrine now deployed across 200+ ventures." },
    { year: "2021", title: "AI & Modern Infrastructure", desc: "Integrated automated intelligence and high-velocity product execution frameworks." },
    { year: "Present", title: "Global Portfolio Impact", desc: "Over $140M in client follow-on rounds and 97% average compound revenue acceleration." },
  ];

  return (
    <section
      id="about"
      className="py-24 transition-colors relative"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Narrative Top Split - NO BOX CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b" style={{ borderColor: `${textSecond}25` }}>
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${accent}20`, color: accent }}>
              <Sparkles size={13} />
              <span>Advisory Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              <Editable
                value={props?.aboutTitle || "High-stakes growth requires precision, not guesswork."}
                onChange={(v) => onChange?.({ aboutTitle: v })}
              />
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}>
            <p>
              <Editable
                value={
                  props?.aboutDescription ||
                  "Most agencies sell bloated retainers and junior account managers. At GrowthCatalysts, we work as an embedded senior partner. We audit unit economics, re-engineer your digital product touchpoints, and eliminate organizational bottlenecks."
                }
                onChange={(v) => onChange?.({ aboutDescription: v })}
              />
            </p>
            <p>
              Whether preparing for a series-B funding sprint or breaking into new global markets, we give founders the unfair competitive advantage of 16 years of battle-tested operational frameworks.
            </p>
          </div>
        </div>

        {/* Milestone Timeline Strip - NO BOX CARDS */}
        <div className="pt-16">
          <div className="text-xs font-mono font-bold uppercase tracking-widest mb-8" style={{ color: accent }}>
            Chronological Track Record
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {milestones.map((m) => (
              <div key={m.year} className="space-y-2 border-l pl-4" style={{ borderColor: `${accent}60` }}>
                <span className="text-2xl font-black font-mono tracking-tight" style={{ color: text }}>
                  {m.year}
                </span>
                <h3 className="text-sm font-bold tracking-tight" style={{ color: text }}>
                  {m.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: textSecond }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default DigitalAgency2About;
