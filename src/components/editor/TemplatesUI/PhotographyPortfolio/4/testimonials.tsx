// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Terminal, Disc, Star, CheckCircle } from "lucide-react";

interface TestimonialsProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    items?: Array<{
      quote: string;
      collaborator: string;
      title: string;
      project: string;
      year: string;
    }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio4Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#0A0B0E";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#13151A";
  const text = theme.text || theme.ink || "#F3F4F6";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#9CA3AF";
  const accent = theme.accent || "#E53E3E";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const defaultItems = [
    {
      quote:
        "Dorian moved around our film set like a phantom. His unit stills didn’t just document our scenes—they captured an electrifying subterranean tension that convinced the studio to buy the international distribution rights immediately.",
      collaborator: "Lukas Lindemann",
      title: "Film Director",
      project: "Neon Phantom (A24 Release)",
      year: "2025",
    },
    {
      quote:
        "The vinyl gatefold and press photos Dorian shot on Cinestill 800T became the defining aesthetic of our world tour. In an industry overwhelmed with sterile digital renders, his prints have authentic cultural weight.",
      collaborator: "Kavinsky Sound Labs",
      title: "Creative Director",
      project: "Midnight Transmissions Tour",
      year: "2024",
    },
    {
      quote:
        "He embedded with our underground techno documentary crew in Berlin for three grueling weeks. The photographs are pure silver poetry—unflinching, gritty, and historically invaluable.",
      collaborator: "Marlene Bauer",
      title: "Executive Producer",
      project: "Sub-Bass Berlin (BBC Culture)",
      year: "2024",
    },
  ];

  const items = data.items && data.items.length > 0 ? data.items : defaultItems;

  return (
    <section
      id="testimonials"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative font-mono"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-widest" style={{ color: accent }}>
            <Disc className="w-4 h-4 animate-spin" />
            <span>
              <Editable
                value={data.badge || "DIRECTOR & LABEL TESTIMONIALS"}
                onChange={(val: string) => onUpdate?.("badge", val)}
              />
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4" style={{ color: text }}>
            <Editable
              value={data.title || "Dispatches from Creative Collaborators"}
              onChange={(val: string) => onUpdate?.("title", val)}
            />
          </h2>
          <p className="text-xs md:text-sm font-sans font-light leading-relaxed max-w-xl" style={{ color: textSecond }}>
            <Editable
              value={
                data.subtitle ||
                "Endorsements from film directors, music label executives, and independent cinema producers."
              }
              onChange={(val: string) => onUpdate?.("subtitle", val)}
            />
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-lg border flex flex-col justify-between transition-all duration-300 hover:border-white relative group"
              style={{
                backgroundColor: bgSecond,
                borderColor: `${accent}30`,
              }}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-6" style={{ color: textSecond }}>
                  <span>LOG // 0{index + 1}</span>
                  <span className="flex items-center gap-1 font-bold" style={{ color: accent }}>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>VERIFIED PRODUCTION</span>
                  </span>
                </div>

                <p className="text-xs md:text-sm font-sans font-light leading-relaxed mb-8" style={{ color: text }}>
                  “<Editable
                    value={item.quote}
                    onChange={(val: string) => onUpdate?.(`items.${index}.quote`, val)}
                  />”
                </p>
              </div>

              <div className="pt-6 border-t" style={{ borderColor: `${accent}20` }}>
                <h4 className="font-bold uppercase text-sm mb-1" style={{ color: text }}>
                  <Editable
                    value={item.collaborator}
                    onChange={(val: string) => onUpdate?.(`items.${index}.collaborator`, val)}
                  />
                </h4>
                <div className="text-[11px]" style={{ color: textSecond }}>
                  <Editable
                    value={item.title}
                    onChange={(val: string) => onUpdate?.(`items.${index}.title`, val)}
                  />
                  {" • "}
                  <span style={{ color: accent }}>
                    <Editable
                      value={item.project}
                      onChange={(val: string) => onUpdate?.(`items.${index}.project`, val)}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotographyPortfolio4Testimonials;
