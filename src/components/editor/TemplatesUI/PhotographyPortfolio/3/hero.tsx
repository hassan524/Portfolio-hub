// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, Calendar, MapPin, ArrowRight, Heart } from "lucide-react";

interface HeroProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    primaryCtaText?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    imageUrl?: string;
    secondaryImageUrl?: string;
    stats?: Array<{ label: string; value: string }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio3Hero: React.FC<HeroProps> = ({
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

  const defaultStats = [
    { value: "140+", label: "Destination Galas Documented" },
    { value: "18", label: "Countries Across Europe & Americas" },
    { value: "100%", label: "Curated 35mm & Medium Format" },
  ];

  const stats = data.stats && data.stats.length > 0 ? data.stats : defaultStats;

  return (
    <section
      className="relative overflow-hidden py-16 md:py-28 px-6 md:px-12 lg:px-20 transition-colors duration-300"
      style={{ backgroundColor: bg, color: text }}
    >
      {/* Background Decorative Gold Watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[18vw] font-light select-none pointer-events-none opacity-[0.03] tracking-widest whitespace-nowrap"
        style={{ color: accent }}
      >
        AURELIA
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Romantic Editorial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Subtle Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 w-fit" style={{ borderColor: `${accent}40`, backgroundColor: bgSecond }}>
              <Sparkles className="w-3.5 h-3.5" style={{ color: accent }} />
              <span className="text-[11px] uppercase tracking-[0.25em] font-medium" style={{ color: accent }}>
                <Editable
                  value={data.badge || "FINE ART DESTINATION WEDDING PHOTOGRAPHY"}
                  onChange={(val) => onUpdate?.("badge", val)}
                />
              </span>
            </div>

            {/* Hero Title with Romantic Serif Font */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-light font-serif tracking-tight leading-[1.1] mb-6"
              style={{ color: text }}
            >
              <Editable
                value={
                  data.title ||
                  "Capturing Timeless Devotion in the World’s Most Breathtaking Havens."
                }
                onChange={(val) => onUpdate?.("title", val)}
              />
            </h1>

            {/* Subtitle / Narrative */}
            <p
              className="text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl"
              style={{ color: textSecond }}
            >
              <Editable
                value={
                  data.description ||
                  "From historic villas on the shores of Lake Como to lavender estates in Provence and cliffside terraces of Ravello. We craft heirloom visual poetry with luminous natural light, medium-format film, and editorial intimacy."
                }
                onChange={(val) => onUpdate?.("description", val)}
              />
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <a
                href={data.primaryCtaLink || "#contact"}
                className="px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: accent,
                  color: onAccent,
                }}
              >
                <Heart className="w-4 h-4 fill-current" />
                <Editable
                  value={data.primaryCtaText || "Inquire For 2026/2027"}
                  onChange={(val) => onUpdate?.("primaryCtaText", val)}
                />
              </a>

              <a
                href={data.secondaryCtaLink || "#stories"}
                className="px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 border flex items-center justify-center gap-2 hover:opacity-80 cursor-pointer"
                style={{
                  borderColor: `${accent}60`,
                  color: text,
                  backgroundColor: "transparent",
                }}
              >
                <Editable
                  value={data.secondaryCtaText || "View Love Stories"}
                  onChange={(val) => onUpdate?.("secondaryCtaText", val)}
                />
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Stats / Accreditations */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: `${accent}25` }}>
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <span className="block text-2xl sm:text-3xl font-serif font-light mb-1" style={{ color: accent }}>
                    <Editable
                      value={stat.value}
                      onChange={(val) => onUpdate?.(`stats.${idx}.value`, val)}
                    />
                  </span>
                  <span className="block text-[11px] leading-tight font-light" style={{ color: textSecond }}>
                    <Editable
                      value={stat.label}
                      onChange={(val) => onUpdate?.(`stats.${idx}.label`, val)}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Opulent Photo Composition with Gold Bordered Frames */}
          <div className="lg:col-span-6 relative">
            {/* Primary Large Image */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl p-2.5 transition-transform duration-500 hover:scale-[1.01]"
              style={{
                backgroundColor: bgSecond,
                border: `1px solid ${accent}40`,
              }}
            >
              <div className="rounded-2xl overflow-hidden aspect-[4/5] relative">
                <img
                  src={
                    data.imageUrl ||
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
                  }
                  alt="Haute Couture Wedding in Lake Como"
                  className="w-full h-full object-cover object-center filter saturate-[0.95] contrast-[1.02]"
                />
                {/* Gold Gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(37,30,25,0.4) 0%, transparent 60%)",
                  }}
                />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white text-xs font-serif italic drop-shadow-md">
                  <span className="flex items-center gap-1.5 tracking-wide">
                    <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                    Villa Balbiano, Lake Como, Italy
                  </span>
                  <span className="text-[11px] uppercase tracking-widest font-sans not-italic">
                    Shot on Kodak Portra 400
                  </span>
                </div>
              </div>
            </div>

            {/* Overlapping Floating Small Image Card */}
            <div
              className="hidden sm:block absolute -bottom-8 -left-8 w-56 rounded-2xl p-2 shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: bg,
                border: `1px solid ${accent}50`,
              }}
            >
              <div className="rounded-xl overflow-hidden aspect-square mb-2.5">
                <img
                  src={
                    data.secondaryImageUrl ||
                    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80"
                  }
                  alt="Bridal Details"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-1 text-center">
                <span className="block text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: accent }}>
                  Haute Bridal Veil
                </span>
                <span className="block text-xs font-serif italic" style={{ color: text }}>
                  Château de Chantilly
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyPortfolio3Hero;
