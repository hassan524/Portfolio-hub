// @ts-nocheck
import React, { useState, useCallback, useEffect } from "react";
import Editable from "@/components/editor/ui/Editable";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Sparkles, MapPin, Maximize2, X, Heart, ExternalLink } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    items?: Array<{
      title: string;
      couple: string;
      category: string;
      location: string;
      press: string;
      year: string;
      imageUrl: string;
      gallery?: string[];
      summary: string;
    }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio3Projects: React.FC<ProjectsProps> = ({
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
      title: "Devotion at Villa Balbiano",
      couple: "Genevieve & Alexandre",
      category: "Lake Como & Italy",
      location: "Lake Como, Italy",
      press: "Featured in Vogue Weddings",
      year: "2025",
      imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      summary: "A three-day lakeside celebration culminating in an evening fireworks regatta on vintage Riva wooden speedboats.",
    },
    {
      title: "Lavender Twilight at Château de Tourreau",
      couple: "Camilla & Julian",
      category: "French Riviera & Provence",
      location: "Provence, France",
      press: "Featured in Over The Moon",
      year: "2025",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      summary: "Sun-drenched provencal courtyard banquet lit by thousands of hand-poured beeswax taper candles under centenary cypress trees.",
    },
    {
      title: "Clifftop Vows over Ravello Terraces",
      couple: "Serena & Matteo",
      category: "Lake Como & Italy",
      location: "Amalfi Coast, Italy",
      press: "Harper’s Bazaar Bride",
      year: "2024",
      imageUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
      summary: "Dramatic cliffside ceremony at Villa Cimbrone overlooking the turquoise Tyrrhenian Sea with antique lace couture.",
    },
    {
      title: "Whitewashed Caldera Elopement",
      couple: "Chloe & Tristan",
      category: "Santorini & Aegean",
      location: "Oia, Santorini, Greece",
      press: "The Lane Editorial",
      year: "2024",
      imageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=80",
      summary: "An intimate dawn exchange of vows against infinite Aegean horizons and volcanic stone architecture.",
    },
    {
      title: "Private Highland Castle Gala",
      couple: "Isabella & Henry",
      category: "Intimate Elopements",
      location: "Inverness, Scotland",
      press: "Brides Magazine",
      year: "2024",
      imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80",
      summary: "Moody romanticism amidst emerald lochs, bagpipe sunset echoes, and black-tie ballroom waltzes.",
    },
  ];

  const items = data.items && data.items.length > 0 ? data.items : defaultItems;

  const categories = [
    "All Celebrations",
    "Lake Como & Italy",
    "French Riviera & Provence",
    "Santorini & Aegean",
    "Intimate Elopements",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Celebrations");
  const [activeStory, setActiveStory] = useState<(typeof items)[0] | null>(null);

  const filteredItems =
    selectedCategory === "All Celebrations"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section
      id="stories"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: accent }} />
              <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: accent }}>
                <Editable
                  value={data.badge || "FEATURED CELEBRATIONS"}
                  onChange={(val) => onUpdate?.("badge", val)}
                />
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight" style={{ color: text }}>
              <Editable
                value={data.title || "Curated Love Stories & Destination Galas"}
                onChange={(val) => onUpdate?.("title", val)}
              />
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="p-3.5 rounded-full border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              style={{
                borderColor: `${accent}40`,
                backgroundColor: bg,
                color: text,
              }}
              aria-label="Previous Stories"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="p-3.5 rounded-full border transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
              style={{
                borderColor: `${accent}40`,
                backgroundColor: bg,
                color: text,
              }}
              aria-label="Next Stories"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12 border-b pb-6" style={{ borderColor: `${accent}20` }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all duration-300 border cursor-pointer"
              style={{
                backgroundColor: selectedCategory === cat ? accent : "transparent",
                color: selectedCategory === cat ? onAccent : textSecond,
                borderColor: selectedCategory === cat ? accent : `${accent}30`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6 min-w-0"
              >
                <div
                  className="rounded-2xl overflow-hidden border p-3 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl group"
                  style={{
                    backgroundColor: bg,
                    borderColor: `${accent}25`,
                  }}
                >
                  {/* Photo Container */}
                  <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-5">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 cursor-pointer"
                      style={{ backgroundColor: "rgba(37,30,25,0.4)" }}
                      onClick={() => setActiveStory(item)}
                    >
                      <button
                        type="button"
                        className="p-3.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                        style={{ backgroundColor: accent, color: onAccent }}
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Press feature tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium shadow-sm backdrop-blur-md" style={{ backgroundColor: `${bg}DD`, color: accent }}>
                      <Editable
                        value={item.press}
                        onChange={(val) => onUpdate?.(`items.${index}.press`, val)}
                      />
                    </div>
                  </div>

                  {/* Narrative details */}
                  <div className="flex flex-col flex-1 justify-between px-1">
                    <div>
                      <div className="flex items-center justify-between text-xs font-serif italic mb-1" style={{ color: accent }}>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <Editable
                            value={item.location}
                            onChange={(val) => onUpdate?.(`items.${index}.location`, val)}
                          />
                        </span>
                        <span>
                          <Editable
                            value={item.year}
                            onChange={(val) => onUpdate?.(`items.${index}.year`, val)}
                          />
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-light mb-1" style={{ color: text }}>
                        <Editable
                          value={item.couple}
                          onChange={(val) => onUpdate?.(`items.${index}.couple`, val)}
                        />
                      </h3>
                      <h4 className="text-xs uppercase tracking-wider font-light mb-3" style={{ color: textSecond }}>
                        <Editable
                          value={item.title}
                          onChange={(val) => onUpdate?.(`items.${index}.title`, val)}
                        />
                      </h4>

                      <p className="text-xs font-light leading-relaxed mb-4 line-clamp-2" style={{ color: textSecond }}>
                        <Editable
                          value={item.summary}
                          onChange={(val) => onUpdate?.(`items.${index}.summary`, val)}
                        />
                      </p>
                    </div>

                    {/* Action link */}
                    <button
                      type="button"
                      onClick={() => setActiveStory(item)}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium pt-3 border-t hover:opacity-70 transition-opacity cursor-pointer text-left"
                      style={{ borderColor: `${accent}15`, color: accent }}
                    >
                      <span>Explore Gallery</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox / Full Story Modal */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          style={{ backgroundColor: "rgba(20, 16, 13, 0.85)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 border max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: bg, borderColor: accent }}
          >
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-6 right-6 p-2 rounded-full border transition-all hover:rotate-90 cursor-pointer z-10"
              style={{ borderColor: `${accent}40`, backgroundColor: bgSecond, color: text }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-md">
                <img
                  src={activeStory.imageUrl}
                  alt={activeStory.couple}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium mb-3" style={{ backgroundColor: bgSecond, color: accent }}>
                  {activeStory.press}
                </div>
                <h3 className="text-3xl font-serif font-light mb-1" style={{ color: text }}>
                  {activeStory.couple}
                </h3>
                <span className="text-xs uppercase tracking-widest font-light block mb-4" style={{ color: textSecond }}>
                  {activeStory.location} — {activeStory.year}
                </span>

                <p className="text-sm font-light leading-relaxed mb-6" style={{ color: textSecond }}>
                  {activeStory.summary}
                </p>

                <div className="p-4 rounded-xl mb-6 text-xs leading-relaxed border" style={{ backgroundColor: bgSecond, borderColor: `${accent}25`, color: textSecond }}>
                  <strong className="block text-xs font-serif font-medium mb-1" style={{ color: text }}>
                    Curation Note:
                  </strong>
                  Captured across 3 days using Contax 645 medium format film and Leica M11 digital bodies. Over 1,200 curated scans delivered in custom silk slipcase.
                </div>

                <a
                  href="#contact"
                  onClick={() => setActiveStory(null)}
                  className="w-full py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 shadow-md cursor-pointer hover:opacity-90"
                  style={{ backgroundColor: accent, color: onAccent }}
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>Reserve Date For Similar Celebration</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotographyPortfolio3Projects;
