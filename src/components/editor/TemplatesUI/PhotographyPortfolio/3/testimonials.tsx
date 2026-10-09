// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Star, Heart, Quote, Sparkles } from "lucide-react";

interface TestimonialsProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    items?: Array<{
      quote: string;
      couple: string;
      venue: string;
      location: string;
      rating?: number;
    }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio3Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#FAF7F2";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#F4EFE6";
  const text = theme.text || theme.ink || "#251E19";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#6F665E";
  const accent = theme.accent || "#C5A059";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const defaultItems = [
    {
      quote:
        "Looking through our wedding gallery brought us to tears all over again. Aurelia captured not just how gorgeous Lake Como was, but the subtle touches of Alexandre’s hand and the genuine tears in my father’s eyes.",
      couple: "Genevieve & Alexandre",
      venue: "Villa Balbiano",
      location: "Lake Como, Italy",
      rating: 5,
    },
    {
      quote:
        "Every single guest asked who our photographers were. They moved with absolute discretion yet somehow documented every intimate laugh during the Provence lavender banquet. The heirloom album is our most prized possession.",
      couple: "Camilla & Julian",
      venue: "Château de Tourreau",
      location: "Provence, France",
      rating: 5,
    },
    {
      quote:
        "From our sunrise engagement session in Paris to our cliffside ceremony in Ravello, the entire experience felt effortless and royal. The medium-format film scans have a luminous warmth that digital alone can never replicate.",
      couple: "Serena & Matteo",
      venue: "Villa Cimbrone",
      location: "Amalfi Coast, Italy",
      rating: 5,
    },
  ];

  const items = data.items && data.items.length > 0 ? data.items : defaultItems;

  return (
    <section
      id="testimonials"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 fill-current" style={{ color: accent }} />
            <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: accent }}>
              <Editable
                value={data.badge || "LOVE LETTERS & PRAISE"}
                onChange={(val) => onUpdate?.("badge", val)}
              />
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight mb-4" style={{ color: text }}>
            <Editable
              value={data.title || "Kind Words from Our Cherished Couples"}
              onChange={(val) => onUpdate?.("title", val)}
            />
          </h2>
          <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: textSecond }}>
            <Editable
              value={
                data.description ||
                "Reflections from couples whose multi-day international celebrations we have had the sacred privilege of documenting."
              }
              onChange={(val) => onUpdate?.("description", val)}
            />
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-8 md:p-10 rounded-3xl flex flex-col justify-between transition-all duration-300 hover:shadow-xl relative border"
              style={{
                backgroundColor: bgSecond,
                borderColor: `${accent}30`,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(item.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: accent }} />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 opacity-25" style={{ color: accent }} />
                </div>

                <p className="text-base font-serif italic leading-relaxed mb-8" style={{ color: text }}>
                  “<Editable
                    value={item.quote}
                    onChange={(val) => onUpdate?.(`items.${index}.quote`, val)}
                  />”
                </p>
              </div>

              <div className="pt-6 border-t" style={{ borderColor: `${accent}20` }}>
                <h4 className="font-serif text-lg font-light mb-1" style={{ color: text }}>
                  <Editable
                    value={item.couple}
                    onChange={(val) => onUpdate?.(`items.${index}.couple`, val)}
                  />
                </h4>
                <div className="text-xs font-light" style={{ color: textSecond }}>
                  <Editable
                    value={item.venue}
                    onChange={(val) => onUpdate?.(`items.${index}.venue`, val)}
                  />
                  {" — "}
                  <span className="font-medium" style={{ color: accent }}>
                    <Editable
                      value={item.location}
                      onChange={(val) => onUpdate?.(`items.${index}.location`, val)}
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

export default PhotographyPortfolio3Testimonials;
