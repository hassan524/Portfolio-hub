// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUpRight, Dumbbell, Zap, HeartPulse, Sparkles } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym1Projects: React.FC<ProjectsProps> = ({
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

  const defaultPrograms = [
    {
      num: "01",
      title: "Hypertrophy & Heavy Compound Strength",
      subtitle: "PROGRESSIVE OVERLOAD & MECHANICAL TENSION",
      description:
        "Engineered for lean muscle mass accretion and structural density. Centered around barbell squatting, deadlifts, overhead presses, and weighted pull-ups augmented with convergent plate-loaded isolations.",
      schedule: "4 Days / Week • 60 Mins",
      focus: "Squat, Bench, Deadlift, Romanian DL, Dumbbell Incline",
    },
    {
      num: "02",
      title: "High-Octane Metabolic Conditioning",
      subtitle: "VO2 MAX IGNITION & FAT BURNING ACCELERATION",
      description:
        "High-density intervals alternating between assault bikes, curved motorless treadmills, heavy battle ropes, and prowler sled pushes. Formulated to spike post-exercise oxygen consumption for 36 hours.",
      schedule: "3 Days / Week • 45 Mins",
      focus: "Prowler Sleds, SkiErg, Kettlebell Swings, Box Jumps",
    },
    {
      num: "03",
      title: "Athletic Speed & Explosive Power",
      subtitle: "FAST-TWITCH RECRUITMENT & ROTATIONAL FORCE",
      description:
        "Olympic clean progressions, hex-bar jumps, medicine ball rotational slams, and sprint biomechanics. Built for competitive field athletes and weekend warriors seeking undeniable explosiveness.",
      schedule: "3 Days / Week • 55 Mins",
      focus: "Power Cleans, Depth Jumps, Trap Bar Pulls, Band Sprints",
    },
    {
      num: "04",
      title: "Joint Longevity & Postural Mobility",
      subtitle: "FASCIAL DECOMPRESSION & RECOVERY ARCHITECTURE",
      description:
        "Restoring hip internal rotation, thoracic extension, and scapular stability. Utilizing controlled articular rotations (CARs), loaded stretching, and infrared sauna contrast protocols.",
      schedule: "Flexible Daily • 30 Mins",
      focus: "Jefferson Curls, 90/90 Hip Flow, Banded Distractions",
    },
  ];

  const programs = p.items && p.items.length > 0 ? p.items : defaultPrograms;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="exercise"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-white/10"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-3">
              <Editable
                value={p.badge || "SCIENTIFIC TRAINING PATHWAYS"}
                onChange={(val: string) => handleUpdate("badge", val)}
              />
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-2xl leading-[1.08]">
              <Editable
                value={
                  p.title ||
                  "Structured Exercise Programs Built Around Your Goals."
                }
                onChange={(val: string) => handleUpdate("title", val)}
              />
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            <Editable
              value={
                p.description ||
                "Select a discipline to inspect our exact programming methodology, rep ranges, and movement progressions."
              }
              onChange={(val: string) => handleUpdate("description", val)}
            />
          </p>
        </div>

        {/* Large Typography Interactive List - NO CARDS! */}
        <div className="space-y-4">
          {programs.map((item, index) => {
            const isActive = activeTab === index;
            return (
              <div
                key={index}
                className="border-b border-white/15 pb-8 transition-all duration-300 cursor-pointer"
                onClick={() => setActiveTab(index)}
              >
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 group">
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-mono tracking-widest text-neutral-500 font-bold">
                      <Editable
                        value={item.num}
                        onChange={(val: string) =>
                          handleUpdate(`items.${index}.num`, val)
                        }
                      />
                    </span>
                    <h3
                      className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-200 ${
                        isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
                      }`}
                    >
                      <Editable
                        value={item.title}
                        onChange={(val: string) =>
                          handleUpdate(`items.${index}.title`, val)
                        }
                      />
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                      <Editable
                        value={item.schedule}
                        onChange={(val: string) =>
                          handleUpdate(`items.${index}.schedule`, val)
                        }
                      />
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${
                        isActive ? "rotate-45 bg-white text-black" : "group-hover:border-white"
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Expanded Details Pane (Plain clean typography, no card boxing) */}
                {isActive && (
                  <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-neutral-300 text-sm md:text-base font-light animate-in fade-in duration-300">
                    <div className="md:col-span-8 space-y-4">
                      <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-semibold block">
                        <Editable
                          value={item.subtitle}
                          onChange={(val: string) =>
                            handleUpdate(`items.${index}.subtitle`, val)
                          }
                        />
                      </span>
                      <p className="leading-relaxed">
                        <Editable
                          value={item.description}
                          onChange={(val: string) =>
                            handleUpdate(`items.${index}.description`, val)
                          }
                        />
                      </p>
                    </div>

                    <div className="md:col-span-4 pl-0 md:pl-6 border-l border-white/10 space-y-2">
                      <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                        Core Exercise Movements:
                      </span>
                      <p className="text-xs text-neutral-200 font-mono leading-relaxed">
                        <Editable
                          value={item.focus}
                          onChange={(val: string) =>
                            handleUpdate(`items.${index}.focus`, val)
                          }
                        />
                      </p>
                      <div className="pt-4">
                        <a
                          href="#contact"
                          className="text-xs uppercase font-bold tracking-widest text-white underline underline-offset-4 hover:text-neutral-300 transition-colors"
                        >
                          Book Trial Session in This Track →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym1Projects;
