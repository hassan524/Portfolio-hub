// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Flame, ArrowLeft, ArrowRight, Trophy } from "lucide-react";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym2Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#080808";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#121212";
  const text = theme.text || theme.ink || "#FFFFFF";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#A1A1AA";
  const accent = theme.accent || "#FF2E2E";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const defaultStories = [
    {
      quote:
        "BEFORE I WALKED INTO THE TEMPLE, I THOUGHT 200KG WAS MY ABSOLUTE GENETIC CEILING ON DEADLIFTS. THE COACHES HERE TORE DOWN MY HYPOCRISY AND RECONSTRUCTED MY SETUP. NINE MONTHS LATER, I SMASHED A 315KG COMPETITION PR AND TOOK GOLD AT THE STATE OPEN.",
      author: "Damian Thorne",
      title: "State Powerlifting Champion (105kg Class)",
      prRecord: "SQUAT 290KG • BENCH 210KG • DEADLIFT 315KG",
    },
    {
      quote:
        "COMMERCIAL GYMS ASKED ME NOT TO USE CHALK OR DROP DEADLIFTS. IRON TEMPLE DOESN'T JUST ALLOW IT—THEY REQUIRE YOU TO ATTACK THE BARBELL WITH MAXIMUM FOCUSED FURY. THE ATMOSPHERE IN THIS ROOM RAISES YOUR STRENGTH BY 20% BEFORE YOU EVEN TOUCH THE KNURLING.",
      author: "Kassandra Vance",
      title: "National Heavyweight Strongwoman Competitor",
      prRecord: "LOG PRESS 110KG • ATLAS STONE 150KG • SLED 380KG",
    },
    {
      quote:
        "I SPENT 5 YEARS WASTING TIME ON FAD FITNESS APPS AND CELL PHONE INTERVALS. AT THE TEMPLE, THERE ARE NO NOISE CANCELLING HEADPHONES—EVERYONE CALLS OUT THE REPS TOGETHER. IN 12 MONTHS I PUT ON 16 POUNDS OF DENSE LEAN TISSUE.",
      author: "Marcus Brody",
      title: "Classic Physique Regional Competitor",
      prRecord: "BODYWEIGHT 82KG → 94KG • 7.5% STAGE BODYFAT",
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
      id="testimonials"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-neutral-900"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Subtle Top Bar */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#FF2E2E]" />
            <span className="text-xs uppercase tracking-[0.25em] font-black text-[#FF3B30]">
              <Editable
                value={p.badge || "BROTHERHOOD DISPATCHES // CHAMPIONS"}
                onChange={(val: string) => handleUpdate("badge", val)}
              />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevStory}
              className="p-3 rounded border border-neutral-700 hover:border-white text-white transition-colors cursor-pointer"
              aria-label="Previous story"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextStory}
              className="p-3 rounded border border-neutral-700 hover:border-white text-white transition-colors cursor-pointer"
              aria-label="Next story"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Massive Typography Quote - NO CARDS! */}
        <div className="mb-16">
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.06] max-w-5xl">
            “<Editable
              value={cur.quote}
              onChange={(val: string) =>
                handleUpdate(`items.${activeIndex}.quote`, val)
              }
            />”
          </p>
        </div>

        {/* Athlete Bio & PR Specs */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide mb-1">
              <Editable
                value={cur.author}
                onChange={(val: string) =>
                  handleUpdate(`items.${activeIndex}.author`, val)
                }
              />
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono">
              <Editable
                value={cur.title}
                onChange={(val: string) =>
                  handleUpdate(`items.${activeIndex}.title`, val)
                }
              />
            </p>
          </div>

          <div className="px-4 py-2 rounded bg-black/60 border border-[#FF2E2E]/40 font-mono text-xs text-[#FFAA00] font-bold">
            <Editable
              value={cur.prRecord}
              onChange={(val: string) =>
                handleUpdate(`items.${activeIndex}.prRecord`, val)
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym2Testimonials;
