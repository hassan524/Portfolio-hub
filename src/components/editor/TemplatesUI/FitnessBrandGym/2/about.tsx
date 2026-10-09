// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Flame, ShieldAlert, Award, Zap } from "lucide-react";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym2About: React.FC<AboutProps> = ({
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

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-neutral-900"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Massive Section Title - Big Big Text */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-[#FF2E2E]" />
            <span className="text-xs uppercase tracking-[0.3em] font-black text-[#FF3B30]">
              <Editable
                value={p.badge || "THE IRON CODE & MANIFESTO"}
                onChange={(val: string) => handleUpdate("badge", val)}
              />
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.96] max-w-5xl">
            <Editable
              value={
                p.title ||
                "Where weakness comes to die and unbreakable legends are forged in raw steel."
              }
              onChange={(val: string) => handleUpdate("title", val)}
            />
          </h2>
        </div>

        {/* Long Narrative Manifesto - 2 Plain Columns, NO CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-20">
          <div className="space-y-6">
            <p>
              <Editable
                value={
                  p.manifesto1 ||
                  "Iron Temple is not designed for casual socializers or smoothie bar tourists. We are a sanctuary for those who understand that physical transformation is hard, gritty, and non-negotiable. When you walk onto our rubber platform, the only currency that matters is the weight on your barbell."
                }
                onChange={(val: string) => handleUpdate("manifesto1", val)}
              />
            </p>
            <p>
              <Editable
                value={
                  p.manifesto2 ||
                  "We furnish our floor with authentic IPF-calibrated Eleiko steel competition discs, Texas power bars, monolifts, and specialized cambered bars. We believe in heavy compound lifting, relentless progressive overload, and an atmosphere thick with chalk, sweat, and focused intensity."
                }
                onChange={(val: string) => handleUpdate("manifesto2", val)}
              />
            </p>
          </div>

          <div className="space-y-6">
            <p>
              <Editable
                value={
                  p.manifesto3 ||
                  "There are no vanity mirrors here to flatter your ego. There is only cold knurled steel and the unforgiving laws of gravity. When you fail a lift, your training partner doesn't offer hollow comfort—they help you strip the plates, reset your stance, and command you to attack the rep again."
                }
                onChange={(val: string) => handleUpdate("manifesto3", val)}
              />
            </p>
            <p>
              <Editable
                value={
                  p.manifesto4 ||
                  "Over 500 state and national powerlifting, strongman, and bodybuilding trophies have been earned by athletes who started on these very deadlift platforms. Your genetics don't dictate your future—your work ethic does."
                }
                onChange={(val: string) => handleUpdate("manifesto4", val)}
              />
            </p>
          </div>
        </div>

        {/* Temple Hall of Fame PR Ticker (Plain Text Leaderboard) */}
        <div className="pt-12 border-t border-neutral-800">
          <span className="text-xs uppercase tracking-[0.25em] font-black text-neutral-400 block mb-8">
            OFFICIAL TEMPLE CLUB RECORDS (RAW / NO STRAPS)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="border-l-2 border-[#FF2E2E] pl-6 py-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-1">
                ALL-TIME SQUAT PR
              </span>
              <span className="text-4xl sm:text-5xl font-black text-white block">
                <Editable
                  value={p.squatPR || "345.0 KG"}
                  onChange={(val: string) => handleUpdate("squatPR", val)}
                />
              </span>
              <span className="text-xs text-neutral-400 font-mono mt-1 block">
                Athlete: Viktor Kozlov (105kg Class)
              </span>
            </div>

            <div className="border-l-2 border-[#FF6A00] pl-6 py-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-1">
                ALL-TIME BENCH PRESS PR
              </span>
              <span className="text-4xl sm:text-5xl font-black text-white block">
                <Editable
                  value={p.benchPR || "240.0 KG"}
                  onChange={(val: string) => handleUpdate("benchPR", val)}
                />
              </span>
              <span className="text-xs text-neutral-400 font-mono mt-1 block">
                Athlete: Marcus Holloway (Open Division)
              </span>
            </div>

            <div className="border-l-2 border-[#FFAA00] pl-6 py-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-1">
                ALL-TIME DEADLIFT PR
              </span>
              <span className="text-4xl sm:text-5xl font-black text-white block">
                <Editable
                  value={p.deadliftPR || "402.5 KG"}
                  onChange={(val: string) => handleUpdate("deadliftPR", val)}
                />
              </span>
              <span className="text-xs text-neutral-400 font-mono mt-1 block">
                Athlete: Dante Mercer (Heavyweight)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym2About;
