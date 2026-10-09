// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Star, Sparkles, MessageCircle } from "lucide-react";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const REVIEWS = [
  {
    author: "Elena Rostova",
    role: "VP of Product",
    company: "FlowState Financial",
    quote: "Hassan designed our flagship mobile experience from ground zero. His Figma token system was so clean that our engineering team built every screen in half the scheduled time with zero layout bugs.",
    rating: 5,
    tag: "Mobile Product Launch",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    author: "Marcus Chen",
    role: "Founding Engineer",
    company: "Aura Intelligence",
    quote: "Few designers understand the technical implementation like Hassan. He doesn't just hand off static drawings; he writes fluid Framer Motion micro-interactions and helps fine-tune CSS variables directly in PRs.",
    rating: 5,
    tag: "Design System Architecture",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    author: "Sophia Alvarez",
    role: "Chief Design Officer",
    company: "Prism Tech",
    quote: "Hassan elevated our entire company's visual standard. The multi-brand token system he engineered allowed our 40-person product org to scale seamlessly across web, iOS, and Android.",
    rating: 5,
    tag: "Enterprise Design System",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  }
];

export const DesignerPortfolio4Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const items = p.items && p.items.length > 0 ? p.items : REVIEWS;

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-white text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            <Editable
              value={p.title || "Loved by engineering leaders and product founders."}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Real feedback from high-growth startups and enterprise teams I've partnered with.
          </p>
        </div>

        {/* 3-Column Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                    {item.tag}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-normal italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/80 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-11 h-11 rounded-full border-2 border-white shadow-sm object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-slate-900">{item.author}</div>
                  <div className="text-xs text-indigo-600 font-medium">
                    {item.role} · {item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio4Testimonials;
