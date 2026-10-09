// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Flame, Trophy, Users, CheckCircle2, Clock, TrendingUp, ArrowRight } from "lucide-react";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym2Hero: React.FC<HeroProps> = ({
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
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between px-6 md:px-16 lg:px-24 py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: bg, color: text }}
    >
      {/* Background Ambience - Fiery dark glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: accent }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
        {/* Left Column: Bold Fiery Headline matching Image 2 */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Pill Badge matching Image 2 */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 w-fit"
            style={{
              backgroundColor: "rgba(255, 46, 46, 0.1)",
              borderColor: "rgba(255, 46, 46, 0.35)",
            }}
          >
            <Flame className="w-4 h-4 fill-current text-[#FF2E2E]" />
            <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#FF3B30]">
              <Editable
                value={p.badge || "TRANSFORM YOUR LIFE"}
                onChange={(val: string) => handleUpdate("badge", val)}
              />
            </span>
          </div>

          {/* Headline matching Image 2: NO PAIN NO GAIN with gradient */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] mb-6">
            <span className="block text-white">
              <Editable
                value={p.titleLine1 || "NO PAIN"}
                onChange={(val: string) => handleUpdate("titleLine1", val)}
              />
            </span>
            <span
              className="block bg-gradient-to-r from-[#FF2E2E] via-[#FF6A00] to-[#FFAA00] bg-clip-text text-transparent drop-shadow-sm"
            >
              <Editable
                value={p.titleLine2 || "NO GAIN"}
                onChange={(val: string) => handleUpdate("titleLine2", val)}
              />
            </span>
          </h1>

          {/* Subtitle matching Image 2 */}
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mb-10">
            <Editable
              value={
                p.description ||
                "Push your limits. Break your records. Become unstoppable. Join the elite community where champions are forged."
              }
              onChange={(val: string) => handleUpdate("description", val)}
            />
          </p>

          {/* Dual Action Buttons matching Image 2 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <a
              href={p.primaryCtaLink || "#contact"}
              className="px-8 py-4 rounded font-black text-xs uppercase tracking-widest text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,46,46,0.65)] hover:scale-[1.02] active:scale-95 cursor-pointer text-center"
              style={{
                backgroundColor: accent,
                boxShadow: "0 0 20px rgba(255, 46, 46, 0.45)",
              }}
            >
              <Editable
                value={p.primaryCtaText || "START FREE TRIAL"}
                onChange={(val: string) => handleUpdate("primaryCtaText", val)}
              />
            </a>

            <a
              href={p.secondaryCtaLink || "#programs"}
              className="px-8 py-4 rounded font-bold text-xs uppercase tracking-widest text-neutral-200 border border-neutral-700 hover:border-white hover:text-white transition-all duration-200 text-center cursor-pointer"
            >
              <Editable
                value={p.secondaryCtaText || "VIEW PROGRAMS"}
                onChange={(val: string) => handleUpdate("secondaryCtaText", val)}
              />
            </a>
          </div>
        </div>

        {/* Right Column: Heavy Dumbbell Rack Photo with Floating Stat Box matching Image 2 */}
        <div className="lg:col-span-5 relative">
          <div
            className="relative rounded-2xl overflow-hidden border shadow-2xl p-2"
            style={{
              backgroundColor: bgSecond,
              borderColor: "rgba(255, 46, 46, 0.25)",
            }}
          >
            <div className="rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[1/1] relative">
              <img
                src={
                  p.imageUrl ||
                  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80"
                }
                alt="Heavy dumbbell rack in Iron Temple"
                className="w-full h-full object-cover filter contrast-[1.25] brightness-[0.8]"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%)",
                }}
              />
            </div>
          </div>

          {/* Floating Glowing Stat Box: +250% STRENGTH GAINS directly matching Image 2 */}
          <div
            className="absolute -bottom-6 -left-6 md:-left-10 px-5 py-4 rounded-xl border shadow-2xl flex items-center gap-3 backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255, 46, 46, 0.95)",
              borderColor: "#FF6A00",
              boxShadow: "0 10px 30px rgba(255, 46, 46, 0.4)",
            }}
          >
            <div className="p-2 rounded bg-black/20 text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-2xl font-black text-white leading-none">
                <Editable
                  value={p.floatingStatNum || "+250%"}
                  onChange={(val: string) => handleUpdate("floatingStatNum", val)}
                />
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-white/90 mt-1">
                <Editable
                  value={p.floatingStatLabel || "STRENGTH GAINS"}
                  onChange={(val: string) => handleUpdate("floatingStatLabel", val)}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stat Counters Row directly matching Image 2 with red square icons */}
      <div className="max-w-7xl mx-auto w-full pt-12 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg" style={{ backgroundColor: accent }}>
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-white leading-tight">
              <Editable
                value={p.stat1Num || "10K+"}
                onChange={(val: string) => handleUpdate("stat1Num", val)}
              />
            </span>
            <span className="block text-xs uppercase tracking-wider text-neutral-400 font-bold">
              <Editable
                value={p.stat1Label || "MEMBERS"}
                onChange={(val: string) => handleUpdate("stat1Label", val)}
              />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg" style={{ backgroundColor: accent }}>
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-white leading-tight">
              <Editable
                value={p.stat2Num || "500+"}
                onChange={(val: string) => handleUpdate("stat2Num", val)}
              />
            </span>
            <span className="block text-xs uppercase tracking-wider text-neutral-400 font-bold">
              <Editable
                value={p.stat2Label || "CHAMPIONS"}
                onChange={(val: string) => handleUpdate("stat2Label", val)}
              />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg" style={{ backgroundColor: accent }}>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-white leading-tight">
              <Editable
                value={p.stat3Num || "98%"}
                onChange={(val: string) => handleUpdate("stat3Num", val)}
              />
            </span>
            <span className="block text-xs uppercase tracking-wider text-neutral-400 font-bold">
              <Editable
                value={p.stat3Label || "SUCCESS RATE"}
                onChange={(val: string) => handleUpdate("stat3Label", val)}
              />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg" style={{ backgroundColor: accent }}>
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-black text-white leading-tight">
              <Editable
                value={p.stat4Num || "24/7"}
                onChange={(val: string) => handleUpdate("stat4Num", val)}
              />
            </span>
            <span className="block text-xs uppercase tracking-wider text-neutral-400 font-bold">
              <Editable
                value={p.stat4Label || "ACCESS"}
                onChange={(val: string) => handleUpdate("stat4Label", val)}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym2Hero;
