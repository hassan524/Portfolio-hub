// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowLeft, ArrowRight, Sparkles, Heart } from "lucide-react";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym3Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#FAF8F5";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#F1ECE4";
  const text = theme.text || theme.ink || "#1A1A1A";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#666057";
  const accent = theme.accent || "#FF4D24";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const defaultStories = [
    {
      quote:
        "VYRA completely changed my relationship with fitness. For years, exercise was a chore I dreaded before work. Here, the thoughtful blend of strength intervals, breathwork, and clean recovery leaves me energized all week.",
      author: "Camille Laurent",
      role: "Architectural Designer • Member for 18 Months",
      tag: "STRENGTH & MOBILITY",
    },
    {
      quote:
        "The small group dynamic is electric. You are training with people who cheer for your final sprint without any toxic competition. The coaching staff pays meticulous attention to joint alignment and form.",
      author: "Julian Moreau",
      role: "Creative Director & Marathon Runner",
      tag: "ENDURANCE TRACK",
    },
    {
      quote:
        "The cold plunge, infrared recovery sessions, and reformer classes eliminated the chronic lower back stiffness I had suffered from for a decade. Truly world-class wellness curation.",
      author: "Serena Althaus",
      role: "Biotech Founder • Member for 2 Years",
      tag: "RESTORATION & REFORMER",
    },
  ];

  const stories = p.items && p.items.length > 0 ? p.items : defaultStories;
  const [activeIndex, setActiveIndex] = useState(0);

  const prevStory = () => {
    setActiveIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setActiveIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const cur = stories[activeIndex];

  return (
    <section
      id="community"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-black/5"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Subtle Top Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#FF4D24] bg-white border border-[#FF4D24]/20">
            <Editable
              value={p.badge || "MEMBER PERSPECTIVES"}
              onChange={(val: string) => handleUpdate("badge", val)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevStory}
              className="w-10 h-10 rounded-full border border-black/10 bg-white hover:border-black flex items-center justify-center transition-all cursor-pointer shadow-sm"
              aria-label="Previous quote"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextStory}
              className="w-10 h-10 rounded-full border border-black/10 bg-white hover:border-black flex items-center justify-center transition-all cursor-pointer shadow-sm"
              aria-label="Next quote"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Massive Typography Quote (NO CARDS!) */}
        <div className="mb-16">
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-900 leading-[1.18] max-w-5xl">
            “<Editable
              value={cur.quote}
              onChange={(val: string) =>
                handleUpdate(`items.${activeIndex}.quote`, val)
              }
            />”
          </p>
        </div>

        {/* Member Profile */}
        <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold text-neutral-900 tracking-tight">
              <Editable
                value={cur.author}
                onChange={(val: string) =>
                  handleUpdate(`items.${activeIndex}.author`, val)
                }
              />
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 font-light mt-0.5">
              <Editable
                value={cur.role}
                onChange={(val: string) =>
                  handleUpdate(`items.${activeIndex}.role`, val)
                }
              />
            </p>
          </div>

          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-black/5 text-[#FF4D24] shadow-sm w-fit">
            <Editable
              value={cur.tag}
              onChange={(val: string) =>
                handleUpdate(`items.${activeIndex}.tag`, val)
              }
            />
          </span>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym3Testimonials;
