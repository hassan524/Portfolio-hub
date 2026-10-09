// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Star, Quote, Award } from "lucide-react";

interface TestimonialsProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    items?: Array<{
      quote: string;
      author: string;
      title: string;
      org: string;
      rating?: number;
    }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio2Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#F4F6F0";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#E8ECE2";
  const text = theme.text || theme.ink || "#222D22";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#556455";
  const accent = theme.accent || "#3E5338";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const defaultItems = [
    {
      quote:
        "Solis has an unparalleled eye for monolithic structures. His capture of our Oslo Cultural Pavilion brought out nuances in the timber facades that even our 3D renders had missed.",
      author: "Henrik Lindqvist",
      title: "Principal Architect",
      org: "Nordic Atelier Arkitekter",
      rating: 5,
    },
    {
      quote:
        "Curating the 'Silent Geologies' series at the National Gallery was an honor. Each large-format silver gelatin print is imbued with meditative stillness and museum-grade master printmaking.",
      author: "Dr. Elena Rostova",
      title: "Senior Curator",
      org: "Zurich Museum of Modern Art",
      rating: 5,
    },
    {
      quote:
        "The photobook Solis produced for our alpine ecological reserve became our most influential publication. It communicates climate fragility with breathtaking, quiet dignity.",
      author: "Marcus Vance",
      title: "Conservation Director",
      org: "Alpine Heritage Trust",
      rating: 5,
    },
  ];

  const items = data.items && data.items.length > 0 ? data.items : defaultItems;

  return (
    <section
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b" style={{ borderColor: `${accent}25` }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4" style={{ color: accent }} />
              <span
                className="text-xs uppercase tracking-[0.25em] font-medium"
                style={{ color: accent }}
              >
                <Editable
                  value={data.badge || "CRITICAL ACCLAIM & REVIEWS"}
                  onChange={(val) => onUpdate?.("badge", val)}
                />
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-light tracking-tight font-serif"
              style={{ color: text }}
            >
              <Editable
                value={data.title || "Words from Curators & Architects"}
                onChange={(val) => onUpdate?.("title", val)}
              />
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base font-light leading-relaxed" style={{ color: textSecond }}>
            <Editable
              value={
                data.description ||
                "Distinguished perspectives from leading structural engineers, global art curators, and private fine-art collectors."
              }
              onChange={(val) => onUpdate?.("description", val)}
            />
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-8 md:p-10 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative group"
              style={{
                backgroundColor: bg,
                border: `1px solid ${accent}18`,
              }}
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: accent }} />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 opacity-30" style={{ color: accent }} />
                </div>

                {/* Quote text */}
                <p className="text-base md:text-lg font-serif italic leading-relaxed mb-8" style={{ color: text }}>
                  “<Editable
                    value={item.quote}
                    onChange={(val) => onUpdate?.(`items.${index}.quote`, val)}
                  />”
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t" style={{ borderColor: `${accent}15` }}>
                <h4 className="font-medium text-base tracking-wide" style={{ color: text }}>
                  <Editable
                    value={item.author}
                    onChange={(val) => onUpdate?.(`items.${index}.author`, val)}
                  />
                </h4>
                <div className="flex flex-col text-xs mt-1" style={{ color: textSecond }}>
                  <Editable
                    value={item.title}
                    onChange={(val) => onUpdate?.(`items.${index}.title`, val)}
                  />
                  <span className="font-semibold mt-0.5" style={{ color: accent }}>
                    <Editable
                      value={item.org}
                      onChange={(val) => onUpdate?.(`items.${index}.org`, val)}
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

export default PhotographyPortfolio2Testimonials;
