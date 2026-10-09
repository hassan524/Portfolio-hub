// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Quote, ArrowLeft, ArrowRight, TrendingUp } from "lucide-react";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym1Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#0B0C10";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#14161D";
  const text = theme.text || theme.ink || "#FFFFFF";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#94A3B8";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const defaultStories = [
    {
      quote:
        "EmpowerGYM stripped away all the commercial gimmicks. The coaches here don't let you coast on momentum. In my first six months, I dropped 14 kilograms of visceral fat and pulled my first 220kg deadlift. My mental clarity at work has never been higher.",
      author: "Marcus Sterling",
      title: "Venture Partner & Member for 2 Years",
      stats: "Deadlift +65kg • Body Fat 24% → 11%",
      timeframe: "6 Months",
    },
    {
      quote:
        "After a severe ACL surgery, I had lost all confidence under a heavy barbell. The strength staff rebuilt my kinetic chain from the ankles up. Today I am squatting pain-free and competing in Spartan Beast endurance races.",
      author: "Elena Rostova",
      title: "Orthopedic Physical Therapist",
      stats: "Squat 140kg PR • Full Knee Restoration",
      timeframe: "9 Months",
    },
    {
      quote:
        "The community standards here are unlike any gym I've visited in London or New York. Nobody is staring at their phone between sets. The atmosphere pushes you to break past your perceived mental ceiling every single day.",
      author: "David Vance",
      title: "Tech Founder & Powerlifter",
      stats: "Bench 165kg • 400 M² Strength Track",
      timeframe: "14 Months",
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
      id="plans"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-white/10"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Subtle Top Marker */}
        <div className="flex items-center justify-between mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-semibold">
            <Editable
              value={p.badge || "PROVEN ATHLETIC EVOLUTION"}
              onChange={(val: string) => handleUpdate("badge", val)}
            />
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={prevStory}
              className="p-2.5 rounded-full border border-white/20 hover:border-white text-white transition-colors cursor-pointer"
              aria-label="Previous story"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextStory}
              className="p-2.5 rounded-full border border-white/20 hover:border-white text-white transition-colors cursor-pointer"
              aria-label="Next story"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Massive Typography Quote - Plain Text, NO CARDS */}
        <div className="mb-16">
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.18] max-w-5xl">
            “<Editable
              value={cur.quote}
              onChange={(val: string) =>
                handleUpdate(`items.${activeIndex}.quote`, val)
              }
            />”
          </p>
        </div>

        {/* Member Profile & Real Telemetry Stats Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold text-white tracking-wide mb-1">
              <Editable
                value={cur.author}
                onChange={(val: string) =>
                  handleUpdate(`items.${activeIndex}.author`, val)
                }
              />
            </h4>
            <p className="text-xs md:text-sm text-neutral-400 font-light">
              <Editable
                value={cur.title}
                onChange={(val: string) =>
                  handleUpdate(`items.${activeIndex}.title`, val)
                }
              />
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono tracking-wider">
            <span className="px-3.5 py-1.5 rounded border border-white/20 text-neutral-200">
              <Editable
                value={cur.stats}
                onChange={(val: string) =>
                  handleUpdate(`items.${activeIndex}.stats`, val)
                }
              />
            </span>
            <span className="px-3.5 py-1.5 rounded bg-white text-black font-bold uppercase">
              <Editable
                value={cur.timeframe}
                onChange={(val: string) =>
                  handleUpdate(`items.${activeIndex}.timeframe`, val)
                }
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym1Testimonials;
