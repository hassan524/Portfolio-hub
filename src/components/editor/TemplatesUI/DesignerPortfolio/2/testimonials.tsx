// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaQuoteLeft, FaStar, FaBuilding } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio2Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#07070D";
  const text = theme.text || theme.ink || "#EEF0FF";
  const muted = theme["text-second"] || "#8B8FA8";
  const surface = theme.surface || "#151524";
  const accent = theme.accent || "#7C9DFF";
  const accent2 = theme["accent-second"] || "#C084FC";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const reviews = [
    {
      id: "rev-1",
      author: "Julian Kester",
      role: "Co-founder & CEO, Hyperion AI",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote:
        "Nova took our highly complex AI node logic and transformed it into the cleanest interface in our industry. Investors commented on the design quality during our Series B round.",
      tag: "Series B Redesign",
    },
    {
      id: "rev-2",
      author: "Amara Vance",
      role: "VP of Product, Prism Financial",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote:
        "Extremely rare to find a designer who blends deeply intuitive UX systems with world-class visual polish and micro-interactions. A genuine pleasure to collaborate with.",
      tag: "iOS Mobile OS",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative w-full py-28 md:py-36 overflow-hidden font-['Poppins',sans-serif]"
      style={{ background: bg, color: text }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] block" style={{ color: accent }}>
            <Editable value={p.testSub || "ENDORSEMENTS & COLLABORATIONS"} onChange={(v) => handleUpdate("testSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            <Editable value={p.testTitle || "What Founders Say"} onChange={(v) => handleUpdate("testTitle", v)} />
          </h2>
        </div>

        {/* 2-Column Testimonials Spread */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 sm:p-10 rounded-3xl border backdrop-blur-xl flex flex-col justify-between space-y-8 hover:border-slate-500/40 transition-all duration-300"
              style={{
                background: `${surface}80`,
                borderColor: `${text}15`,
              }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-semibold"
                    style={{ background: `${accent}15`, color: accent }}
                  >
                    {rev.tag}
                  </span>
                </div>

                <div className="relative">
                  <FaQuoteLeft className="text-3xl mb-3 opacity-20" style={{ color: accent }} />
                  <p className="text-base sm:text-lg leading-relaxed font-light italic" style={{ color: text }}>
                    "{rev.quote}"
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t flex items-center gap-4" style={{ borderColor: `${text}15` }}>
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-12 h-12 rounded-full object-cover border"
                  style={{ borderColor: `${text}20` }}
                />
                <div>
                  <h4 className="font-semibold text-sm" style={{ color: text }}>{rev.author}</h4>
                  <p className="text-xs" style={{ color: muted }}>{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio2Testimonials;
