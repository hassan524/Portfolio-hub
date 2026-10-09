// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Heart, Sparkles, Star } from "lucide-react";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const DEFAULT_TESTIMONIALS = [
  {
    quote: "Hassan has that rare ability to see both the 30,000-foot product vision and the individual 8px grid alignment. Our user retention jumped by 42% after the redesign, and our dev team loved working with his clean Figma tokens.",
    author: "Sarah Lindqvist",
    role: "Co-Founder & CEO",
    company: "Bloom Health",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    quote: "Working with Hassan felt like an effortless breath of fresh air. He didn't just deliver mockups; he challenged our assumptions, interviewed our customers, and crafted an experience that our users rave about daily on Twitter.",
    author: "David Zhao",
    role: "Head of Product",
    company: "Claypad Studio",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

export const DesignerPortfolio5Testimonials: React.FC<TestimonialsProps> = ({
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
    <section id="testimonials" className="py-24 bg-[#1C1210] text-[#FFF1E6] border-b border-[#FF7A45]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#FF7A45] font-semibold">
            Kind Words
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#FFF1E6] tracking-tight">
            <Editable
              value={p.title || "Loved by founders, engineers, and product teams."}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h2>
        </div>

        {/* 2-Column Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-[#2A1E1C]/60 border border-[#FF7A45]/25 space-y-6 flex flex-col justify-between hover:border-[#FF7A45] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#FF7A45]">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-base text-[#FFF1E6]/90 leading-relaxed font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#FF7A45]/20 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full border-2 border-[#FF7A45]/40 object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-[#FFF1E6]">{item.author}</div>
                  <div className="text-xs text-[#FFA07A]">{item.role} · {item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio5Testimonials;
