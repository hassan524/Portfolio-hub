// @ts-nocheck
import React, { useState, useCallback, useEffect } from "react";
import Editable from "@/components/editor/ui/Editable";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Terminal, Maximize2, X, Eye, Film, Aperture } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    items?: Array<{
      title: string;
      frame: string;
      category: string;
      stock: string;
      location: string;
      shutter: string;
      imageUrl: string;
      details: string;
    }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio4Projects: React.FC<ProjectsProps> = ({
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
      title: "Shinjuku Rain Corridor",
      frame: "FRAME 04A",
      category: "Tokyo Neon",
      stock: "Cinestill 800T (Tungsten)",
      location: "Kabukicho, Tokyo",
      shutter: "1/60s • f/1.4 • 35mm Summilux",
      imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
      details: "Atmospheric halation around wet asphalt reflections following a midnight monsoon downpour.",
    },
    {
      title: "Kreuzberg Industrial Warehouse",
      frame: "FRAME 12B",
      category: "Berlin Subterranean",
      stock: "Ilford HP5+ @ 3200",
      location: "Kreuzberg, Berlin",
      shutter: "1/30s • f/2.0 • 50mm Planar",
      imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
      details: "Raw heavy silver grain capturing brutalist concrete architecture and modular synth underground performances.",
    },
    {
      title: "Night Drive on FDR Drive",
      frame: "FRAME 19A",
      category: "Cinematic Stills",
      stock: "Kodak Vision3 500T",
      location: "Manhattan, New York",
      shutter: "1/45s • f/1.8 • 28mm Elmarit",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
      details: "Motion-blurred amber streak sequence tracking a vintage 1978 Porsche along the East River waterfront.",
    },
    {
      title: "Stadium Backstage Tunnel",
      frame: "FRAME 27A",
      category: "Tour Documentary",
      stock: "Kodak Tri-X 400",
      location: "Wembley Arena, London",
      shutter: "1/125s • f/2.8 • 35mm Summicron",
      imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
      details: "Quiet solitary focus moments before walking onto an eighty-thousand spectator arena stage.",
    },
    {
      title: "Akihabara Electronic Alleyway",
      frame: "FRAME 33C",
      category: "Tokyo Neon",
      stock: "Fuji Provia 100F",
      location: "Chiyoda, Tokyo",
      shutter: "1/50s • f/2.0 • 50mm Noctilux",
      imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      details: "Crt monitor phosphor glows and retro cassette deck storefronts under magenta signage.",
    },
  ];

  const items = data.items && data.items.length > 0 ? data.items : defaultItems;

  const categories = [
    "All Sequences",
    "Tokyo Neon",
    "Berlin Subterranean",
    "Tour Documentary",
    "Cinematic Stills",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Sequences");
  const [activeItem, setActiveItem] = useState<(typeof items)[0] | null>(null);

  const filteredItems =
    selectedCategory === "All Sequences"
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
      id="archives"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative border-t border-b"
      style={{
        backgroundColor: bgSecond,
        borderColor: `${accent}25`,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3 font-mono text-xs uppercase tracking-widest" style={{ color: accent }}>
              <Film className="w-4 h-4" />
              <span>
                <Editable
                  value={data.badge || "ANALOG VAULT // ARCHIVES"}
                  onChange={(val: string) => onUpdate?.("badge", val)}
                />
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-mono font-bold tracking-tight uppercase" style={{ color: text }}>
              <Editable
                value={data.title || "Cinematic Sequences & Night Archives"}
                onChange={(val: string) => onUpdate?.("title", val)}
              />
            </h2>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="p-3 rounded border font-mono transition-all disabled:opacity-25 hover:border-white cursor-pointer"
              style={{
                backgroundColor: bg,
                borderColor: `${accent}40`,
                color: text,
              }}
              aria-label="Previous Sequence"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="p-3 rounded border font-mono transition-all disabled:opacity-25 hover:border-white cursor-pointer"
              style={{
                backgroundColor: bg,
                borderColor: `${accent}40`,
                color: text,
              }}
              aria-label="Next Sequence"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b" style={{ borderColor: `${accent}20` }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-4 py-2 rounded text-xs font-mono uppercase tracking-widest transition-all border cursor-pointer"
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

        {/* Embla Film Strip Viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6 min-w-0"
              >
                <div
                  className="rounded-lg overflow-hidden border p-3 flex flex-col justify-between h-full group transition-all duration-300 hover:border-opacity-100"
                  style={{
                    backgroundColor: bg,
                    borderColor: `${accent}35`,
                  }}
                >
                  {/* Negative Film Strip Container */}
                  <div className="relative rounded overflow-hidden aspect-[4/3] mb-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Frame indicator badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider backdrop-blur-md" style={{ backgroundColor: "rgba(10,11,14,0.8)", color: accent }}>
                      <Editable
                        value={item.frame}
                        onChange={(val: string) => onUpdate?.(`items.${index}.frame`, val)}
                      />
                    </div>

                    {/* Stock pill */}
                    <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded font-mono text-[9px] backdrop-blur-md flex items-center justify-between" style={{ backgroundColor: "rgba(10,11,14,0.85)", color: textSecond }}>
                      <span className="truncate">{item.stock}</span>
                      <span style={{ color: accent }}>● 35MM</span>
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 cursor-pointer"
                      style={{ backgroundColor: "rgba(10,11,14,0.6)" }}
                      onClick={() => setActiveItem(item)}
                    >
                      <button
                        type="button"
                        className="p-3 rounded border font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                        style={{ backgroundColor: accent, color: onAccent, borderColor: accent }}
                      >
                        <Maximize2 className="w-4 h-4" />
                        <span>Inspect Negative</span>
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="font-mono flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1" style={{ color: textSecond }}>
                        <span>
                          <Editable
                            value={item.location}
                            onChange={(val: string) => onUpdate?.(`items.${index}.location`, val)}
                          />
                        </span>
                        <span style={{ color: accent }}>
                          <Editable
                            value={item.category}
                            onChange={(val: string) => onUpdate?.(`items.${index}.category`, val)}
                          />
                        </span>
                      </div>

                      <h3 className="text-base font-bold uppercase tracking-wide mb-2" style={{ color: text }}>
                        <Editable
                          value={item.title}
                          onChange={(val: string) => onUpdate?.(`items.${index}.title`, val)}
                        />
                      </h3>

                      <p className="text-xs font-sans font-light leading-relaxed mb-4 line-clamp-2" style={{ color: textSecond }}>
                        <Editable
                          value={item.details}
                          onChange={(val: string) => onUpdate?.(`items.${index}.details`, val)}
                        />
                      </p>
                    </div>

                    <div className="pt-3 border-t text-[10px] flex items-center justify-between" style={{ borderColor: `${accent}20`, color: textSecond }}>
                      <span>{item.shutter}</span>
                      <button
                        type="button"
                        onClick={() => setActiveItem(item)}
                        className="hover:underline cursor-pointer"
                        style={{ color: accent }}
                      >
                        [ TELEMETRY ]
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Darkroom Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200"
          style={{ backgroundColor: "rgba(5, 6, 8, 0.92)", backdropFilter: "blur(10px)" }}
        >
          <div
            className="relative max-w-4xl w-full rounded-xl overflow-hidden border shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto font-mono"
            style={{ backgroundColor: bg, borderColor: accent }}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-6 right-6 p-2 rounded border hover:scale-105 cursor-pointer z-10"
              style={{ borderColor: `${accent}50`, backgroundColor: bgSecond, color: text }}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="rounded overflow-hidden border" style={{ borderColor: `${accent}30` }}>
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="inline-block px-2.5 py-1 rounded text-[10px] uppercase tracking-widest font-bold mb-3" style={{ backgroundColor: `${accent}25`, color: accent }}>
                  {activeItem.frame} // {activeItem.category}
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-2" style={{ color: text }}>
                  {activeItem.title}
                </h3>
                <span className="text-xs block mb-4" style={{ color: textSecond }}>
                  {activeItem.location}
                </span>

                <p className="text-xs font-sans font-light leading-relaxed mb-6" style={{ color: textSecond }}>
                  {activeItem.details}
                </p>

                {/* Exposure telemetry specs box */}
                <div className="p-4 rounded border text-xs space-y-2 mb-6" style={{ backgroundColor: bgSecond, borderColor: `${accent}30` }}>
                  <div className="flex justify-between">
                    <span style={{ color: textSecond }}>EMULSION:</span>
                    <span style={{ color: text }}>{activeItem.stock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: textSecond }}>EXPOSURE:</span>
                    <span style={{ color: text }}>{activeItem.shutter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: textSecond }}>PRINT GRADE:</span>
                    <span style={{ color: accent }}>MUSEUM SILVER GELATIN</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={() => setActiveItem(null)}
                  className="w-full py-3.5 rounded text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(229,62,62,0.4)]"
                  style={{ backgroundColor: accent, color: onAccent }}
                >
                  <Terminal className="w-4 h-4" />
                  <span>Request Archival Darkroom Print</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotographyPortfolio4Projects;
