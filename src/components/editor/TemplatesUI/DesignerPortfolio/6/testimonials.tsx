// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { CheckSquare } from "lucide-react";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const DEFAULT_TESTIMONIALS = [
  {
    auditor: "Dr. Johann Weber",
    organization: "Zurich Freight Robotics",
    role: "Chief Technology Officer",
    verdict: "SYSTEM AUDIT: 100% SPEC COMPLIANCE",
    quote: "Hassan designed our entire mission control interface with surgical rigor. The elimination of visual bloat directly reduced operator reaction time during high-stress dispatch cycles. His delivery set the gold standard for software engineering in our division."
  },
  {
    auditor: "Ingrid Hoffman",
    organization: "Alpine Clean Energy",
    role: "Director of System Infrastructure",
    verdict: "BENCHMARK: SUB-FRAME INTERACTION",
    quote: "Working with Hassan is a masterclass in systematic reduction. Where other designers proposed gratuitous animations, Hassan engineered a 12-column modular token system that enabled 30 separate engineers to build unified features without regression."
  }
];

export const DesignerPortfolio6Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const items = p.items && p.items.length > 0 ? p.items : DEFAULT_TESTIMONIALS;

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section id="testimonials" className="py-24 bg-[#0A0A0A] text-[#F5F5F0] border-b border-[#262626] font-mono">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#262626]">
          <div>
            <div className="text-xs text-[#E63946] mb-1">// TECHNICAL PERFORMANCE AUDITS</div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              <Editable
                value={p.title || "EXECUTIVE VERIFICATIONS"}
                onChange={(val) => handleUpdate("title", val)}
              />
            </h2>
          </div>
          <div className="text-xs text-[#888]">
            VERIFIED INDUSTRY ENDORSEMENTS
          </div>
        </div>

        {/* 2-Column Audits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 border border-[#262626] bg-[#0F0F0F] space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#262626] text-xs">
                  <span className="text-[#E63946] font-bold">{item.verdict}</span>
                  <span className="text-[#666]">REF: CH-REV-0{idx + 1}</span>
                </div>
                <p className="text-xs font-sans text-[#CCC] leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#262626] space-y-1 text-xs">
                <div className="font-bold text-white">{item.auditor}</div>
                <div className="text-[#888] font-sans">{item.role} · {item.organization}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio6Testimonials;
