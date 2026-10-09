// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUpRight, Sparkles, Heart } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym3Projects: React.FC<ProjectsProps> = ({
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

  const defaultDisciplines = [
    {
      index: "01",
      name: "Functional Strength & Resistance",
      description: "Progressive compound lifting designed for joint durability, posture correction, and lean athletic tone.",
      tag: "STRENGTH PROTOCOL",
      duration: "50 Mins",
      intensity: "Moderate / High",
    },
    {
      index: "02",
      name: "HIIT & Cardio Interval Ignition",
      description: "Heart-rate guided metabolic intervals combining curved woodway treadmills, SkiErgs, and kettlebells.",
      tag: "METABOLIC BURN",
      duration: "45 Mins",
      intensity: "High Intensity",
    },
    {
      index: "03",
      name: "Fascial Mobility & Sound Recovery",
      description: "Deep somatic fascial stretching, infrared sauna contrast therapy, and guided nervous system downregulation.",
      tag: "RESTORATION",
      duration: "60 Mins",
      intensity: "Gentle / Restorative",
    },
    {
      index: "04",
      name: "Dynamic Reformer & Core Alignment",
      description: "Custom spring resistance reformers targeting stabilizer musculature, hip pelvic alignment, and spine health.",
      tag: "PILATES & CORE",
      duration: "50 Mins",
      intensity: "Precision Focus",
    },
  ];

  const disciplines = p.items && p.items.length > 0 ? p.items : defaultDisciplines;
  const [hoveredIdx, setHoveredIdx] = useState(0);

  return (
    <section
      id="disciplines"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-black/5"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title matching Image 3 headline: "TRAIN TOGETHER. GROW TOGETHER." */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#FF4D24] block mb-3">
            <Editable
              value={p.badge || "COMMUNITY DISCIPLINES"}
              onChange={(val: string) => handleUpdate("badge", val)}
            />
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-[1.04]">
            <Editable
              value={p.title || "Train Together. Grow Together."}
              onChange={(val: string) => handleUpdate("title", val)}
            />
          </h2>
        </div>

        {/* Large Editorial Rows (NO CARDS!) */}
        <div className="space-y-6">
          {disciplines.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIdx(index)}
              className="p-8 md:p-10 rounded-3xl bg-white border border-black/5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#FF4D24]/40 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="flex items-start md:items-center gap-6">
                <span className="text-sm font-mono font-bold text-neutral-400 group-hover:text-[#FF4D24] transition-colors">
                  <Editable
                    value={item.index}
                    onChange={(val: string) =>
                      handleUpdate(`items.${index}.index`, val)
                    }
                  />
                </span>

                <div>
                  <div className="inline-block px-3 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-bold bg-[#FAF8F5] text-[#FF4D24] border border-[#FF4D24]/20 mb-2">
                    <Editable
                      value={item.tag}
                      onChange={(val: string) =>
                        handleUpdate(`items.${index}.tag`, val)
                      }
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 group-hover:text-[#FF4D24] transition-colors tracking-tight">
                    <Editable
                      value={item.name}
                      onChange={(val: string) =>
                        handleUpdate(`items.${index}.name`, val)
                      }
                    />
                  </h3>
                  <p className="text-sm text-neutral-500 font-light mt-1 max-w-xl">
                    <Editable
                      value={item.description}
                      onChange={(val: string) =>
                        handleUpdate(`items.${index}.description`, val)
                      }
                    />
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-neutral-100">
                <div className="text-right text-xs text-neutral-400 font-medium">
                  <span className="block text-neutral-900 font-bold">
                    <Editable
                      value={item.duration}
                      onChange={(val: string) =>
                        handleUpdate(`items.${index}.duration`, val)
                      }
                    />
                  </span>
                  <span>
                    <Editable
                      value={item.intensity}
                      onChange={(val: string) =>
                        handleUpdate(`items.${index}.intensity`, val)
                      }
                    />
                  </span>
                </div>

                <a
                  href="#join"
                  className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-neutral-800 group-hover:bg-[#FF4D24] group-hover:text-white group-hover:border-[#FF4D24] transition-all"
                  aria-label="Book discipline"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym3Projects;
