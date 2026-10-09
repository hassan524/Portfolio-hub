// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, Check, Heart, Film, BookOpen, Clock, Camera } from "lucide-react";

interface ServicesProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    items?: Array<{
      title: string;
      subtitle: string;
      price: string;
      popular?: boolean;
      features: string[];
      description: string;
    }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio3Services: React.FC<ServicesProps> = ({
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
      title: "The Intimate Elopement",
      subtitle: "For cliffside vows & private estate ceremonies",
      price: "€6,500",
      popular: false,
      description: "Dedicated to couples seeking private devotion with pure editorial refinement and romantic intimacy.",
      features: [
        "Up to 6 Hours of Seamless Coverage",
        "Primary Master Photographer (Aurelia)",
        "Curated Medium Format Film & Digital",
        "400+ Artfully Graded High-Res Files",
        "Private Online Viewing & Download Gallery",
        "10 Fine Art Archival Cotton Prints",
      ],
    },
    {
      title: "The Destination Weekend",
      subtitle: "Our signature multi-day European celebration experience",
      price: "€11,800",
      popular: true,
      description: "Comprehensive visual documentation covering your welcome boat cruise, rehearsal banquet, and full wedding day.",
      features: [
        "Full Multi-Day Coverage (Up to 16 Hours)",
        "Two Senior Master Photographers",
        "35mm Film + Medium Format Analog Rolls",
        "Welcome Cocktail & Sunset Rehearsal Dinner",
        "900+ Masterfully Curated & Retouched Files",
        "Handmade Italian Leather Heirloom Album (40 Pages)",
        "Complimentary Drone Aerial Perspectives",
      ],
    },
    {
      title: "The Grand Heirloom Experience",
      subtitle: "The pinnacle of bespoke wedding documentation worldwide",
      price: "€18,500",
      popular: false,
      description: "Total artistic stewardship for three-day galas with vintage Super 8mm motion film and heirloom museum volumes.",
      features: [
        "Unlimited Multi-Day Weekend Coverage",
        "Two Lead Photographers + Film Cinematographer",
        "Vintage Super 8mm Nostalgic Highlight Reel",
        "Welcome Party, Gala Day & Farewell Brunch",
        "1,500+ Hand-Curated Fine Art Photographs",
        "Master Large-Format Bespoke Silk Album Set (3 Volumes)",
        "All Global Travel & Accommodation Included",
      ],
    },
  ];

  const items = data.items && data.items.length > 0 ? data.items : defaultItems;

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" style={{ color: accent }} />
            <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: accent }}>
              <Editable
                value={data.badge || "INVESTMENT & COMMISSIONS"}
                onChange={(val) => onUpdate?.("badge", val)}
              />
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight mb-4" style={{ color: text }}>
            <Editable
              value={data.title || "Curated Bridal Collections"}
              onChange={(val) => onUpdate?.("title", val)}
            />
          </h2>
          <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: textSecond }}>
            <Editable
              value={
                data.subtitle ||
                "Every celebration is singular. We provide transparent foundation collections designed to be tailored to the geography and rhythm of your weekend."
              }
              onChange={(val) => onUpdate?.("subtitle", val)}
            />
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {items.map((item, index) => {
            const isPop = item.popular;
            return (
              <div
                key={index}
                className="relative rounded-3xl p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: isPop ? bgSecond : bg,
                  border: isPop ? `2px solid ${accent}` : `1px solid ${accent}25`,
                  boxShadow: isPop ? `0 20px 40px -15px ${accent}25` : "none",
                }}
              >
                {isPop && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold shadow-sm"
                    style={{ backgroundColor: accent, color: onAccent }}
                  >
                    Most Revered Experience
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-serif font-light mb-1" style={{ color: text }}>
                    <Editable
                      value={item.title}
                      onChange={(val) => onUpdate?.(`items.${index}.title`, val)}
                    />
                  </h3>
                  <span className="text-xs font-light block mb-4" style={{ color: textSecond }}>
                    <Editable
                      value={item.subtitle}
                      onChange={(val) => onUpdate?.(`items.${index}.subtitle`, val)}
                    />
                  </span>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b" style={{ borderColor: `${accent}20` }}>
                    <span className="text-4xl font-serif font-light tracking-tight" style={{ color: accent }}>
                      <Editable
                        value={item.price}
                        onChange={(val) => onUpdate?.(`items.${index}.price`, val)}
                      />
                    </span>
                    <span className="text-xs font-light ml-2" style={{ color: textSecond }}>
                      / Celebration
                    </span>
                  </div>

                  <p className="text-xs font-light leading-relaxed mb-6" style={{ color: textSecond }}>
                    <Editable
                      value={item.description}
                      onChange={(val) => onUpdate?.(`items.${index}.description`, val)}
                    />
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {item.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs font-light">
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent }} />
                        <span style={{ color: text }}>
                          <Editable
                            value={feature}
                            onChange={(val) =>
                              onUpdate?.(`items.${index}.features.${fIdx}`, val)
                            }
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium text-center transition-all duration-300 shadow-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] cursor-pointer"
                  style={{
                    backgroundColor: isPop ? accent : "transparent",
                    color: isPop ? onAccent : text,
                    border: `1px solid ${accent}`,
                  }}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Inquire Availability</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Bespoke A La Carte Add-ons Strip */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            backgroundColor: bgSecond,
            borderColor: `${accent}25`,
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-serif font-light mb-1" style={{ color: text }}>
                A La Carte Additions & Custom Curation
              </h4>
              <p className="text-xs font-light max-w-xl" style={{ color: textSecond }}>
                Enhance your collection with vintage Super 8mm highlight reels, heirloom duplicate parent albums, or an intimate sunrise portrait session in Paris or Venice.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2 text-xs font-light" style={{ color: textSecond }}>
                <Film className="w-4 h-4" style={{ color: accent }} />
                <span>Super 8mm Motion Film</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-light" style={{ color: textSecond }}>
                <BookOpen className="w-4 h-4" style={{ color: accent }} />
                <span>Bespoke Handbound Albums</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyPortfolio3Services;
