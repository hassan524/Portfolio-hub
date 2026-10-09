// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowRight, CheckCircle2, Shield, Activity } from "lucide-react";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym1About: React.FC<AboutProps> = ({
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

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      {/* Running Marquee Ribbon */}
      <div className="border-y border-white/10 py-4 mb-20 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee gap-8 text-xs md:text-sm font-bold tracking-[0.25em] text-neutral-400 uppercase">
          <span>BUILD YOUR BODY</span>
          <span>•</span>
          <span>BOOST YOUR CONFIDENCE</span>
          <span>•</span>
          <span>HIGH-ENERGY COMMUNITY</span>
          <span>•</span>
          <span>MODERN EQUIPMENT</span>
          <span>•</span>
          <span>EXPERT COACHING</span>
          <span>•</span>
          <span>FLEXIBLE PLANS</span>
          <span>•</span>
          <span>14-DAY MONEY BACK GUARANTEE</span>
          <span>•</span>
          <span>BUILD YOUR BODY</span>
          <span>•</span>
          <span>BOOST YOUR CONFIDENCE</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Massive Section Title - Big Big Text */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-4">
            <Editable
              value={p.badge || "THE EMPOWER PHILOSOPHY"}
              onChange={(val: string) => handleUpdate("badge", val)}
            />
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-5xl">
            <Editable
              value={
                p.title ||
                "We don't run a corporate fitness factory. We engineer physical and mental resilience."
              }
              onChange={(val: string) => handleUpdate("title", val)}
            />
          </h2>
        </div>

        {/* Long Form Editorial Narrative - 2 Rich Text Columns, NO CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-20">
          <div className="space-y-6">
            <p>
              <Editable
                value={
                  p.bioParagraph1 ||
                  "Most commercial gyms sell memberships hoping you will never show up. At EmpowerGYM, our entire business model is built around your relentless attendance and undeniable physical evolution. From the moment you step through our biometric gates, the music, lighting, and air filtration are calibrated to ignite high-intensity focus."
                }
                onChange={(val: string) => handleUpdate("bioParagraph1", val)}
              />
            </p>
            <p>
              <Editable
                value={
                  p.bioParagraph2 ||
                  "Whether you are loading your first 20kg barbell or preparing for a national powerlifting meet, our floor coaches are actively present—correcting hip hinge angles, adjusting bench rack heights, and ensuring you extract every single ounce of potential from each set."
                }
                onChange={(val: string) => handleUpdate("bioParagraph2", val)}
              />
            </p>
          </div>

          <div className="space-y-6">
            <p>
              <Editable
                value={
                  p.bioParagraph3 ||
                  "We invest continuously in top-of-the-line biomechanical machinery from Hammer Strength, Eleiko, and Prime Fitness. Every single machine on our floor was selected specifically because it respects human joint kinematics, allowing you to train harder, heavier, and completely free of chronic overuse pain."
                }
                onChange={(val: string) => handleUpdate("bioParagraph3", val)}
              />
            </p>
            <p>
              <Editable
                value={
                  p.bioParagraph4 ||
                  "Training here is not an isolated chore—it is the best hour of your day. Surrounded by people who push their personal limits with zero judgment, your baseline for what is possible will shift permanently."
                }
                onChange={(val: string) => handleUpdate("bioParagraph4", val)}
              />
            </p>
          </div>
        </div>

        {/* Big Plain Text Stats - Embedded Directly Without Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
          <div>
            <span className="block text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
              <Editable
                value={p.stat1Num || "3,800 M²"}
                onChange={(val: string) => handleUpdate("stat1Num", val)}
              />
            </span>
            <span className="block text-xs uppercase tracking-widest text-neutral-400 font-medium">
              <Editable
                value={p.stat1Label || "Athletic Training Floor"}
                onChange={(val: string) => handleUpdate("stat1Label", val)}
              />
            </span>
          </div>

          <div>
            <span className="block text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
              <Editable
                value={p.stat2Num || "120+"}
                onChange={(val: string) => handleUpdate("stat2Num", val)}
              />
            </span>
            <span className="block text-xs uppercase tracking-widest text-neutral-400 font-medium">
              <Editable
                value={p.stat2Label || "Olympic & Heavy Plate Stations"}
                onChange={(val: string) => handleUpdate("stat2Label", val)}
              />
            </span>
          </div>

          <div>
            <span className="block text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
              <Editable
                value={p.stat3Num || "100%"}
                onChange={(val: string) => handleUpdate("stat3Num", val)}
              />
            </span>
            <span className="block text-xs uppercase tracking-widest text-neutral-400 font-medium">
              <Editable
                value={p.stat3Label || "Certified Strength Coaches"}
                onChange={(val: string) => handleUpdate("stat3Label", val)}
              />
            </span>
          </div>

          <div>
            <span className="block text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-2">
              <Editable
                value={p.stat4Num || "24/7"}
                onChange={(val: string) => handleUpdate("stat4Num", val)}
              />
            </span>
            <span className="block text-xs uppercase tracking-widest text-neutral-400 font-medium">
              <Editable
                value={p.stat4Label || "Biometric Keyfob Floor Access"}
                onChange={(val: string) => handleUpdate("stat4Label", val)}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym1About;
