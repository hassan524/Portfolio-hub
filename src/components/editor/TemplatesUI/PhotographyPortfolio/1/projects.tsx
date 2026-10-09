// @ts-nocheck
import { useState, useMemo, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Maximize2, X, SlidersHorizontal } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

export function PhotographyPortfolio1Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FCFBF8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F5F3ED";
  const ink = theme?.text || theme?.ink || "#1A1918";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6E6B65";
  const accent = theme?.accent || "#8E2823";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const projects = props.projects || [
    {
      id: "p1",
      title: "L'Ombre Blanche",
      client: "Vogue Italia",
      category: "Editorial",
      year: "2026",
      image: U("photo-1515886657613-9f3515b0c78f"),
      gear: "Leica M11 · 35mm Summilux",
      description: "Monochrome architectural silhouette study captured in the Palais-Royal corridors, exploring modern minimalism in draped silk.",
    },
    {
      id: "p2",
      title: "Solstice Privé",
      client: "Harper's Bazaar UK",
      category: "Haute Couture",
      year: "2026",
      image: U("photo-1509631179647-0177331693ae"),
      gear: "Hasselblad H6D · 80mm",
      description: "Fine jewelry couture series focusing on light refraction across raw gemstones and haute joaillerie.",
    },
    {
      id: "p3",
      title: "Aura Nocturne",
      client: "Saint Laurent Studio",
      category: "Cover Stories",
      year: "2025",
      image: U("photo-1534528741775-53994a69daeb"),
      gear: "Contax 645 · Kodak Portra 400",
      description: "Twilight rooftop campaign along the Seine, balancing natural blue-hour illumination with analog strobe bounce.",
    },
    {
      id: "p4",
      title: "Defilé De Paris",
      client: "Chanel Haute Couture",
      category: "Runway",
      year: "2025",
      image: U("photo-1490481651871-ab68de25d43d"),
      gear: "Sony A1 · 70-200mm GM II",
      description: "Backstage kinetic impressions and runway motion chronicled during Paris Fashion Week Autumn/Winter.",
    },
    {
      id: "p5",
      title: "Velvet Horizons",
      client: "Elle France",
      category: "Editorial",
      year: "2025",
      image: U("photo-1469334031218-e382a71b716b"),
      gear: "Leica SL2 · 50mm APO",
      description: "Editorial fashion exploration amidst coastal cliffs, featuring sculptural tailoring against untamed nature.",
    },
  ];

  const categories = ["All", ...Array.from(new Set(projects.map((p: any) => p.category)))];

  const filtered = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p: any) => p.category === activeCategory);
  }, [activeCategory, projects]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

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

  return (
    <section id="projects" className="py-20 sm:py-32 overflow-hidden" style={{ background: bgSecond, color: ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b" style={{ borderColor: `${ink}15` }}>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>
              <span>✦</span>
              <Editable value={props.projectsEyebrow || "Selected Archive"} onChange={(v) => onChange?.({ projectsEyebrow: v })} />
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight mt-3">
              <Editable value={props.projectsTitle || "Curated Editorial Chronicles"} onChange={(v) => onChange?.({ projectsTitle: v })} />
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous photo"
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              style={{ borderColor: ink, background: bg, color: ink }}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next photo"
              className="w-12 h-12 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-sm"
              style={{ borderColor: accent, background: accent, color: onAccent }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 my-8">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActiveCategory(c)}
              className="px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
              style={{
                background: activeCategory === c ? ink : bg,
                color: activeCategory === c ? bg : inkSecond,
                border: `1px solid ${activeCategory === c ? ink : `${ink}15`}`,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Embla Carousel Container */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-6">
            {filtered.map((p: any, idx: number) => (
              <div key={p.id || idx} className="flex-[0_0_88%] sm:flex-[0_0_55%] lg:flex-[0_0_40%] pl-6 min-w-0">
                <div
                  onClick={() => setSelectedPhoto(p)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md transition-all duration-500 hover:shadow-2xl"
                  style={{ background: bg }}
                >
                  {/* Photo Frame */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between text-white text-xs">
                      <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md font-mono tracking-widest text-[10px] uppercase">
                        {p.category}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={13} />
                      </span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                      <div className="text-[11px] font-mono tracking-widest uppercase opacity-75">
                        {p.client} · {p.year}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-light leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs font-light opacity-80 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-white/70">
                        <span className="flex items-center gap-1.5">
                          <Camera size={12} style={{ color: accent }} />
                          {p.gear}
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-white font-medium">
                          Expand <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-zinc-950 rounded-2xl overflow-hidden flex flex-col md:flex-row text-white border border-white/10"
            >
              <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full max-h-[60vh] md:max-h-[80vh] object-cover"
                />
              </div>
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono uppercase tracking-widest">
                      {selectedPhoto.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedPhoto(null)}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif">{selectedPhoto.title}</h3>
                    <p className="text-xs font-mono text-zinc-400 mt-1">Client: {selectedPhoto.client} ({selectedPhoto.year})</p>
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs font-mono text-zinc-300">
                    <div className="text-white/50 text-[10px] uppercase tracking-wider">Technical Specifications</div>
                    <div>{selectedPhoto.gear}</div>
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPhoto(null);
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-center transition-transform hover:scale-105"
                  style={{ background: accent, color: onAccent }}
                >
                  Commission Similar Project
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default PhotographyPortfolio1Projects;
