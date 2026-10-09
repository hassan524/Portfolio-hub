// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym3Hero: React.FC<HeroProps> = ({
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

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Stacked Vertical Typography on White Strips directly matching Image 3 */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="flex flex-col gap-2.5 max-w-xl">
            {/* Strip 1: TRANSFORM */}
            <div className="bg-white px-5 py-2 rounded-lg shadow-sm border border-black/5 w-fit">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#FF4D24] leading-none block">
                <Editable
                  value={p.line1 || "TRANSFORM"}
                  onChange={(val: string) => handleUpdate("line1", val)}
                />
              </span>
            </div>

            {/* Strip 2: YOUR BODY */}
            <div className="bg-white px-5 py-2 rounded-lg shadow-sm border border-black/5 w-fit">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#FF4D24] leading-none block">
                <Editable
                  value={p.line2 || "YOUR BODY"}
                  onChange={(val: string) => handleUpdate("line2", val)}
                />
              </span>
            </div>

            {/* Strip 3: UPGRADE YOUR */}
            <div className="bg-white px-5 py-2 rounded-lg shadow-sm border border-black/5 w-fit">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#FF4D24] leading-none block">
                <Editable
                  value={p.line3 || "UPGRADE YOUR"}
                  onChange={(val: string) => handleUpdate("line3", val)}
                />
              </span>
            </div>

            {/* Strip 4: LIFESTYLE. */}
            <div className="bg-white px-5 py-2 rounded-lg shadow-sm border border-black/5 w-fit">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#FF4D24] leading-none block">
                <Editable
                  value={p.line4 || "LIFESTYLE."}
                  onChange={(val: string) => handleUpdate("line4", val)}
                />
              </span>
            </div>
          </div>

          {/* Subtitle / Action */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={p.ctaLink || "#join"}
              className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-white transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md flex items-center justify-center gap-2"
              style={{ backgroundColor: accent }}
            >
              <Editable
                value={p.ctaText || "Explore Studio Pass"}
                onChange={(val: string) => handleUpdate("ctaText", val)}
              />
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#about"
              className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest border border-neutral-300 hover:border-neutral-900 transition-colors text-center"
              style={{ color: text }}
            >
              Our Philosophy
            </a>
          </div>
        </div>

        {/* Right Column: Dynamic Movement Image with Intersecting Circular Badge matching Image 3 */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/5 bg-[#EFECE6] p-3">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
              <img
                src={
                  p.imageUrl ||
                  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
                }
                alt="Runner athlete at VYRA"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />

              {/* Floating Circular Graphic Badge matching Image 3 */}
              <div
                className="absolute top-6 right-6 w-20 h-20 rounded-full border border-white/40 flex flex-col items-center justify-center text-white backdrop-blur-md shadow-lg p-2 text-center"
                style={{ backgroundColor: "rgba(26, 26, 26, 0.45)" }}
              >
                <span className="text-[9px] uppercase tracking-widest font-bold">EST. 2024</span>
                <span className="w-5 h-5 rounded-full border-2 border-white my-0.5 inline-block" />
                <span className="text-[7px] uppercase tracking-wider">PROTOCOL</span>
              </div>

              {/* Floating Description Box matching Image 3 */}
              <div
                className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl backdrop-blur-md border border-white/20 text-white shadow-xl"
                style={{ backgroundColor: "rgba(255, 77, 36, 0.88)" }}
              >
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  <Editable
                    value={
                      p.floatingText ||
                      "Holistic movement sessions, expert guidance, and community-driven energy designed to help you build lasting, real strength, and reclaim your everyday vitality."
                    }
                    onChange={(val: string) => handleUpdate("floatingText", val)}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym3Hero;
