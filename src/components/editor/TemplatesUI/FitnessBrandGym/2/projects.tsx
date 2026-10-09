// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Flame, ChevronDown, ChevronUp, Zap, ArrowRight } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym2Projects: React.FC<ProjectsProps> = ({
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

  const defaultDivisions = [
    {
      code: "DIV-01",
      title: "Calibrated Competitive Powerlifting",
      focus: "SQUAT • BENCH PRESS • DEADLIFT",
      description:
        "12-week peaking and volume blocks utilizing RPE autoregulation, band accommodating resistance, and calibrated competition steel plates on monolift platforms.",
      coach: "Head Coach: Sergei Vanev (IPF World Gold Medalist)",
      schedule: "Mon / Wed / Fri / Sat • 90 Min Sessions",
    },
    {
      code: "DIV-02",
      title: "Golden Era Bodybuilding & Extreme Mass",
      focus: "TIME UNDER TENSION • PEAK CONTRACTION • PUMP",
      description:
        "High-volume hypertrophy routines formulated to maximize sarcoplasmic expansion and mechanical damage. Giant sets, drop sets, and brutal plate-loaded isolations.",
      coach: "Head Coach: Jaxson Reed (IFBB Pro Division)",
      schedule: "5-Day Push / Pull / Legs Split • 75 Min Sessions",
    },
    {
      code: "DIV-03",
      title: "Heavyweight Strongman & Odd-Object Lifting",
      focus: "ATLAS STONES • LOG PRESS • YOKE WALK • FARMERS",
      description:
        "True functional raw power. Moving 160kg concrete spheres, 140kg log clean-and-presses, and heavy car deadlifts on our reinforced outdoor tarmac yard.",
      coach: "Head Coach: Thorvald Lind (World Strongest Man Finalist)",
      schedule: "Tue / Thu / Saturday Mornings • 120 Min Sessions",
    },
    {
      code: "DIV-04",
      title: "Olympic Snatch & Clean-and-Jerk Velocity",
      focus: "TRIPLE EXTENSION • DROP CATCH • OVERHEAD STABILITY",
      description:
        "Technical precision meets explosive speed on dedicated wooden oak lifting platforms. Barbell trajectory analysis and high-frequency pulling blocks.",
      coach: "Head Coach: Chen Wei (National Weightlifting Specialist)",
      schedule: "Mon / Tue / Thu / Fri • 80 Min Sessions",
    },
  ];

  const divisions = p.items && p.items.length > 0 ? p.items : defaultDivisions;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="programs"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-neutral-900"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-[#FF2E2E]" />
            <span className="text-xs uppercase tracking-[0.3em] font-black text-[#FF3B30]">
              <Editable
                value={p.badge || "TEMPLE TRAINING DIVISIONS"}
                onChange={(val: string) => handleUpdate("badge", val)}
              />
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.96]">
            <Editable
              value={p.title || "Pick Your Discipline. Leave Your Excuses."}
              onChange={(val: string) => handleUpdate("title", val)}
            />
          </h2>
        </div>

        {/* Division List - NO CARDS! Bold industrial horizontal rows */}
        <div className="space-y-4">
          {divisions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-neutral-800 pb-6 transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full py-4 flex flex-col md:flex-row md:items-center justify-between text-left gap-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <span
                      className="font-mono text-xs font-black tracking-widest px-3 py-1 rounded"
                      style={{
                        backgroundColor: isOpen ? accent : "#1F1F1F",
                        color: "#FFFFFF",
                      }}
                    >
                      <Editable
                        value={item.code}
                        onChange={(val: string) =>
                          handleUpdate(`items.${index}.code`, val)
                        }
                      />
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#FF3B30] transition-colors">
                      <Editable
                        value={item.title}
                        onChange={(val: string) =>
                          handleUpdate(`items.${index}.title`, val)
                        }
                      />
                    </h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase hidden sm:inline">
                      <Editable
                        value={item.focus}
                        onChange={(val: string) =>
                          handleUpdate(`items.${index}.focus`, val)
                        }
                      />
                    </span>
                    <div className="p-2 rounded-full border border-neutral-700 text-neutral-400 group-hover:border-white group-hover:text-white transition-colors">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pb-4 grid grid-cols-1 md:grid-cols-12 gap-8 text-neutral-300 text-sm md:text-base font-light animate-in fade-in duration-200">
                    <div className="md:col-span-8 space-y-4">
                      <p className="leading-relaxed">
                        <Editable
                          value={item.description}
                          onChange={(val: string) =>
                            handleUpdate(`items.${index}.description`, val)
                          }
                        />
                      </p>
                      <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                        <span className="font-bold text-white">
                          <Editable
                            value={item.coach}
                            onChange={(val: string) =>
                              handleUpdate(`items.${index}.coach`, val)
                            }
                          />
                        </span>
                        <span>•</span>
                        <span>
                          <Editable
                            value={item.schedule}
                            onChange={(val: string) =>
                              handleUpdate(`items.${index}.schedule`, val)
                            }
                          />
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-4 flex items-center justify-start md:justify-end">
                      <a
                        href="#contact"
                        className="px-6 py-3 rounded font-black text-xs uppercase tracking-widest text-white transition-all hover:shadow-[0_0_20px_rgba(255,46,46,0.5)] active:scale-95 cursor-pointer flex items-center gap-2"
                        style={{ backgroundColor: accent }}
                      >
                        <span>REGISTER FOR SQUAD</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
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

export default FitnessBrandGym2Projects;
