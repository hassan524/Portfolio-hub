// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaQuoteLeft } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio1Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme?.bg || "#FFFFFF";
  const text = theme?.text || theme?.ink || "#0F172A";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#2563EB";
  const serif = props.serifFont || '"Inter", -apple-system, sans-serif';

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const quotes = [
    {
      author: "Maya Lindqvist",
      role: "Co-Founder, Halcyon Labs",
      text: "Alex took a fragmented, vague intuition and gave it a face we are universally proud of. Calm, disciplined, and ruthlessly exacting about every typographic fraction.",
    },
    {
      author: "Henri de Montmirail",
      role: "Publisher, Maison Noir",
      text: "In an era of disposable templates, working with someone who still understands lead, margin, and the emotional resonance of whitespace is a rare privilege.",
    },
  ];

  return (
    <section
      id="testimonials-archive"
      className="relative w-full py-28 md:py-36 border-t"
      style={{ background: bg, color: text, borderColor: `${textSecond}25` }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <div className="space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium block" style={{ color: textSecond }}>
            (<Editable value={p.testLabel || "Kind Words"} onChange={(v) => handleUpdate("testLabel", v)} />)
          </span>
          <h2 className="text-3xl sm:text-5xl font-light italic tracking-tight" style={{ fontFamily: serif }}>
            <Editable value={p.testTitle || "Patron Observations"} onChange={(v) => handleUpdate("testTitle", v)} />
          </h2>
        </div>

        {/* 2-Column Quote Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {quotes.map((q, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-12 rounded-sm space-y-6 flex flex-col justify-between"
              style={{ border: `1px solid ${textSecond}25`, background: `${textSecond}06` }}
            >
              <div className="space-y-4">
                <FaQuoteLeft className="text-2xl opacity-20" style={{ color: accent }} />
                <p
                  className="text-xl sm:text-2xl font-light italic leading-relaxed"
                  style={{ fontFamily: serif, color: text }}
                >
                  "{q.text}"
                </p>
              </div>

              <div className="pt-6 border-t" style={{ borderColor: `${textSecond}20` }}>
                <h4 className="font-semibold text-sm" style={{ color: text }}>{q.author}</h4>
                <p className="text-xs mt-0.5" style={{ color: textSecond }}>{q.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio1Testimonials;
