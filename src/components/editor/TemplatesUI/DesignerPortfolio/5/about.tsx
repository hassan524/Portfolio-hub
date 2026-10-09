// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Heart, Sparkles, BookOpen, Coffee, Lightbulb, Compass } from "lucide-react";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio5About: React.FC<AboutProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const principles = [
    {
      title: "Clarity over Cleverness",
      desc: "If a user has to pause and decipher an icon, we failed. Straightforward language and unambiguous cues win every time."
    },
    {
      title: "Sensory Tactility",
      desc: "Software shouldn't feel flat. Subtle spring physics, acoustic clicks, and organic feedback make tools a delight to operate."
    },
    {
      title: "Design in the Medium",
      desc: "Static mockups hide edge cases. I design in code alongside engineers, ensuring tokens and layout engines match 1:1."
    }
  ];

  const tools = [
    "Figma Variables",
    "React & Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "Raycast",
    "Linear"
  ];

  return (
    <section id="about" className="py-24 bg-[#1C1210] text-[#FFF1E6] border-b border-[#FF7A45]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#FF7A45] font-semibold">
            My Philosophy & Craft
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-[#FFF1E6] tracking-tight">
            <Editable
              value={p.title || "Human-centered from the first napkin sketch to production code."}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h2>
        </div>

        {/* 3 Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((pr, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#2A1E1C]/60 border border-[#FF7A45]/25 space-y-4 hover:border-[#FF7A45] transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#FF7A45]/15 flex items-center justify-center text-[#FF7A45] font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-bold text-[#FFF1E6]">{pr.title}</h3>
              <p className="text-sm text-[#FEE4D7]/70 leading-relaxed">{pr.desc}</p>
            </div>
          ))}
        </div>

        {/* Bento Strip: Sticky Notes & Toolkit */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
          
          {/* Left: Handwritten Sticky Note Vibe */}
          <div className="md:col-span-7 p-8 rounded-3xl bg-gradient-to-br from-[#2A1E1C] to-[#1C1210] border border-[#FF7A45]/25 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#FFA07A] font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#FF7A45]" />
              <span>A note on collaboration</span>
            </div>
            <p className="text-base text-[#FFF1E6]/90 leading-relaxed">
              "Great software isn't built in isolated silos. I embed directly with product managers and engineering leads to iterate quickly, test with real humans, and ship thoughtful features that move company metrics without burning out the team."
            </p>
            <div className="text-xs text-[#FFA07A] font-medium pt-2">
              — Hassan Rehan (From the San Francisco studio desk)
            </div>
          </div>

          {/* Right: Daily Tools */}
          <div className="md:col-span-5 p-8 rounded-3xl bg-[#2A1E1C]/60 border border-[#FF7A45]/25 space-y-4">
            <div className="text-xs text-[#FFA07A] font-semibold uppercase tracking-wider">
              Daily Operating Kit
            </div>
            <div className="flex flex-wrap gap-2">
              {tools.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-[#1C1210] border border-[#FF7A45]/20 text-xs text-[#FFF1E6]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio5About;
