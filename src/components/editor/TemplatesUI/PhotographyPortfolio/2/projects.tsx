// @ts-nocheck
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, X, Eye } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

export function PhotographyPortfolio2Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F7F6F2";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#EDEDE6";
  const ink = theme?.text || theme?.ink || "#242922";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#636A60";
  const accent = theme?.accent || "#2D5A3E";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const [activeSeries, setActiveSeries] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const series = props.projects || [
    {
      id: "s1",
      title: "Monolith & Fog",
      location: "Faroe Islands",
      series: "Earth & Stone",
      year: "2026",
      image: U("photo-1506744038136-46273834b3fb"),
      specs: "Phase One IQ4 150MP · 45mm Rodenstock",
      edition: "Edition of 15 Signed Prints",
      story: "Recorded during a three-day storm in the northern fjords. The interplay between raw basalt sea stacks and low-altitude mist created an absolute stillness.",
    },
    {
      id: "s2",
      title: "Brutalist Pavilion",
      location: "Stockholm Archipelago",
      series: "Concrete Silence",
      year: "2025",
      image: U("photo-1486406146926-c627a92ad1ab"),
      specs: "Leica SL2 · 24-90mm Vario-Elmarit",
      edition: "Edition of 20 Signed Prints",
      story: "Minimalist concrete forms meeting Baltic pine forest reflections in early morning dawn light.",
    },
    {
      id: "s3",
      title: "Alpine Sanctuary",
      location: "Dolomites, Italy",
      series: "Earth & Stone",
      year: "2025",
      image: U("photo-1464822759023-fed622ff2c3b"),
      specs: "Linhof 4x5 Large Format · Kodak Ektar 100",
      edition: "Edition of 10 Signed Prints",
      story: "Large format sheet film study capturing limestone ridges illuminated by first autumn snow.",
    },
    {
      id: "s4",
      title: "Glasshouse Geometry",
      location: "Copenhagen",
      series: "Concrete Silence",
      year: "2024",
      image: U("photo-1497366216548-37526070297c"),
      specs: "Hasselblad 907X · 38mm Biogon",
      edition: "Edition of 25 Signed Prints",
      story: "Botanical sanctuary framing natural vegetation through industrial steel lattices and curved glass panels.",
    },
  ];

  const seriesList = ["All", ...Array.from(new Set(series.map((p: any) => p.series)))];
  const filtered = activeSeries === "All" ? series : series.filter((p: any) => p.series === activeSeries);

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
    <section id="projects" className="py-20 sm:py-32" style={{ background: bgSecond, color: ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b" style={{ borderColor: `${ink}15` }}>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>
              <Compass size={13} />
              <Editable value={props.projectsEyebrow || "The Physical Archive"} onChange={(v) => onChange?.({ projectsEyebrow: v })} />
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight mt-3">
              <Editable value={props.projectsTitle || "Fine Art Series & Archival Works"} onChange={(v) => onChange?.({ projectsTitle: v })} />
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous"
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5"
              style={{ borderColor: `${ink}25`, background: bg }}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next"
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed text-white shadow-sm hover:scale-105"
              style={{ borderColor: accent, background: accent }}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 my-8">
          {seriesList.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveSeries(s)}
              className="px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
              style={{
                background: activeSeries === s ? ink : bg,
                color: activeSeries === s ? bg : inkSecond,
                border: `1px solid ${activeSeries === s ? ink : `${ink}15`}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Embla Gallery Carousel */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-6">
            {filtered.map((item: any, idx: number) => (
              <div key={item.id || idx} className="flex-[0_0_90%] sm:flex-[0_0_60%] lg:flex-[0_0_45%] pl-6 min-w-0">
                <div
                  onClick={() => setSelectedPhoto(item)}
                  className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md transition-all duration-500 hover:shadow-2xl border"
                  style={{ background: bg, borderColor: `${ink}15` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider">
                      {item.edition}
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono" style={{ color: inkSecond }}>
                      <span>{item.location}</span>
                      <span>{item.year}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-light tracking-tight">{item.title}</h3>
                    <p className="text-xs font-light leading-relaxed line-clamp-2" style={{ color: inkSecond }}>
                      {item.story}
                    </p>
                    <div className="pt-3 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: `${ink}10` }}>
                      <span className="opacity-70 text-[11px]">{item.specs}</span>
                      <span className="inline-flex items-center gap-1 font-medium" style={{ color: accent }}>
                        Inquire Print <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-hidden border shadow-2xl flex flex-col md:flex-row"
              style={{ background: bg, borderColor: `${ink}20`, color: ink }}
            >
              <div className="md:w-3/5 bg-black/5 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full max-h-[60vh] md:max-h-[80vh] object-cover"
                />
              </div>
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: bgSecond, color: inkSecond }}>
                      {selectedPhoto.edition}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedPhoto(null)}
                      className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-black/5"
                      style={{ borderColor: `${ink}20` }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light">{selectedPhoto.title}</h3>
                    <p className="text-xs font-mono mt-1" style={{ color: inkSecond }}>
                      {selectedPhoto.location} · {selectedPhoto.year}
                    </p>
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
                    {selectedPhoto.story}
                  </p>
                  <div className="p-4 rounded-2xl space-y-1 text-xs font-mono" style={{ background: bgSecond }}>
                    <div className="opacity-60 text-[10px] uppercase">Optical Capture</div>
                    <div>{selectedPhoto.specs}</div>
                    <div className="opacity-60 text-[10px] uppercase pt-2">Paper Quality</div>
                    <div>Hahnemühle Photo Rag 308gsm Cotton</div>
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPhoto(null);
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3.5 rounded-full text-xs font-mono uppercase tracking-wider text-center text-white transition-transform hover:scale-105"
                  style={{ background: accent }}
                >
                  Acquire Limited Print
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default PhotographyPortfolio2Projects;
