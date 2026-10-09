// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, ArrowRight, HeartHandshake, CheckCircle } from "lucide-react";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym3About: React.FC<AboutProps> = ({
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
      id="about"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-black/5"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Header matching Image 3 with terracotta badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-black/10">
          <div>
            <div className="inline-block px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-4" style={{ backgroundColor: accent }}>
              <Editable
                value={p.badge || "ABOUT US"}
                onChange={(val: string) => handleUpdate("badge", val)}
              />
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.08]">
              <Editable
                value={p.title || "Fitness Designed Around You."}
                onChange={(val: string) => handleUpdate("title", val)}
              />
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-neutral-600 font-light leading-relaxed">
            <Editable
              value={
                p.subtitle ||
                "Your body is unique. Your training should be too. VYRA combines intelligent workouts, recovery insights, and lifestyle coaching to create a fitness experience built for your goals."
              }
              onChange={(val: string) => handleUpdate("subtitle", val)}
            />
          </p>
        </div>

        {/* Content Layout matching Image 3: Left Photo + Right Stat Counter Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: Athletic Battle Rope Image matching Image 3 */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-black/5 aspect-[4/3] relative">
              <img
                src={
                  p.aboutImageUrl ||
                  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80"
                }
                alt="Movement session at VYRA"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Stat Blocks directly matching Image 3 (87 Attendance, 38 Units, 12 Workshops) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-3 gap-6 p-6 rounded-2xl bg-white shadow-sm border border-black/5 text-center">
              <div>
                <span className="block text-4xl sm:text-5xl font-black text-neutral-900 leading-none mb-1">
                  <Editable
                    value={p.stat1Num || "87"}
                    onChange={(val: string) => handleUpdate("stat1Num", val)}
                  />
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#FF4D24]">
                  <Editable
                    value={p.stat1Label || "Attendance"}
                    onChange={(val: string) => handleUpdate("stat1Label", val)}
                  />
                </span>
              </div>

              <div className="border-x border-neutral-100">
                <span className="block text-4xl sm:text-5xl font-black text-neutral-900 leading-none mb-1">
                  <Editable
                    value={p.stat2Num || "38"}
                    onChange={(val: string) => handleUpdate("stat2Num", val)}
                  />
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#FF4D24]">
                  <Editable
                    value={p.stat2Label || "Units"}
                    onChange={(val: string) => handleUpdate("stat2Label", val)}
                  />
                </span>
              </div>

              <div>
                <span className="block text-4xl sm:text-5xl font-black text-neutral-900 leading-none mb-1">
                  <Editable
                    value={p.stat3Num || "12"}
                    onChange={(val: string) => handleUpdate("stat3Num", val)}
                  />
                </span>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#FF4D24]">
                  <Editable
                    value={p.stat3Label || "Workshops"}
                    onChange={(val: string) => handleUpdate("stat3Label", val)}
                  />
                </span>
              </div>
            </div>

            {/* Narrative Prose */}
            <div className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed space-y-4">
              <p>
                <Editable
                  value={
                    p.paragraph1 ||
                    "Every session aligns with where your body is today. From personalized mobility screenings and calibrated load sequences to restorative cold therapy plunge sessions and mindful breathwork."
                  }
                  onChange={(val: string) => handleUpdate("paragraph1", val)}
                />
              </p>
              <p>
                <Editable
                  value={
                    p.paragraph2 ||
                    "Our club creates space for high performance without burnout. We believe in building joint resilience and physical strength that carries you effortlessly outside the studio walls."
                  }
                  onChange={(val: string) => handleUpdate("paragraph2", val)}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym3About;
