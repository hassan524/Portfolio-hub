// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Star, ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand1Projects({ props = {}, theme, onChange }: any) {
  const [filter, setFilter] = useState("all");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const bg = theme?.bg || "#EED8C9";
  const bgSecond = theme?.["bg-second"] || "#E5C8B4";
  const ink = theme?.ink || "#2D1D18";
  const inkSecond = theme?.["ink-second"] || "#7A5E54";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.55)";
  const accent = theme?.accent || "#9E4A28";

  const products = [
    {
      id: "l-ombre-solaire",
      category: "solar",
      title: "L'Ombre Solaire",
      edition: "Extrait de Parfum // 50ml",
      volume: "50ml Crystal Flacon",
      rating: 4.9,
      reviews: 142,
      notes: "Golden Neroli · Warm Amber · Calabrian Citrus",
      mood: "Warm skin kissed by the late Mediterranean afternoon.",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=85",
      badge: "Signature Blend",
    },
    {
      id: "rose-blanche-sel",
      category: "floral",
      title: "Rose Blanche & Sel",
      edition: "Eau de Parfum // 100ml",
      volume: "100ml Crystal Flacon",
      rating: 5.0,
      reviews: 98,
      notes: "May Rose · Coastal Salt · White Cedarwood",
      mood: "Wild morning roses blooming along limestone cliffs.",
      image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1000&q=85",
      badge: "Masterpiece",
    },
    {
      id: "ambre-botanique",
      category: "amber",
      title: "Ambre Botanique",
      edition: "Pure Perfume Oil // 30ml",
      volume: "30ml Dropper Pipette",
      rating: 4.8,
      reviews: 86,
      notes: "Golden Resin · Cardamom Pods · Bourbon Vanilla",
      mood: "An enveloping, slow-burning glow of raw ambered warmth.",
      image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=85",
      badge: "Private Reserve",
    },
    {
      id: "santal-crepuscule",
      category: "solar",
      title: "Santal Crépuscule",
      edition: "Extrait de Parfum // 50ml",
      volume: "50ml Crystal Flacon",
      rating: 4.9,
      reviews: 119,
      notes: "Mysore Sandalwood · Green Fig Leaf · Tuscan Iris",
      mood: "Velvety, milky woods and powdery dawn iris.",
      image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=85",
      badge: "Limited Batch",
    },
    {
      id: "iris-de-nacre",
      category: "floral",
      title: "Iris de Nacre",
      edition: "Eau de Parfum // 100ml",
      volume: "100ml Crystal Flacon",
      rating: 5.0,
      reviews: 74,
      notes: "Florentine Iris Pallida · Pear Nectar · White Musks",
      mood: "Luminescent, silky, and whisper-soft like mother of pearl.",
      image: "https://images.unsplash.com/photo-1608528577891-9855f4c864e0?auto=format&fit=crop&w=1000&q=85",
      badge: "Haute Edition",
    },
    {
      id: "fleur-d-oranger-07",
      category: "amber",
      title: "Fleur d'Oranger No. 7",
      edition: "Eau de Parfum // 100ml",
      volume: "100ml Crystal Flacon",
      rating: 4.8,
      reviews: 62,
      notes: "Orange Blossom Absolute · Bitter Almond · Tonka",
      mood: "Intoxicating, honeyed blossoms drifting on warm winds.",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85",
      badge: "Rare Harvest",
    },
  ];

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    setCarouselIdx((prev) => (prev >= filtered.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCarouselIdx((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
  };

  return (
    <section
      id="collection"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden"
      style={{
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.7) 0%, transparent 60%)`,
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header & Category Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b pb-10" style={{ borderColor: "rgba(158, 74, 40, 0.15)" }}>
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
              The Curated Editions
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase leading-[0.95]"
              style={{ fontFamily: "Cinzel, Cormorant Garamond, serif" }}
            >
              <Editable
                value={props?.projectsHeadline || "Haute Parfumerie Flacons"}
                onChange={(v) => onChange?.({ projectsHeadline: v })}
              />
            </h2>
          </div>

          {/* Category Filter Pills & Carousel Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 p-1.5 rounded-full border backdrop-blur-md"
              style={{ backgroundColor: surface, borderColor: "rgba(158, 74, 40, 0.15)" }}
            >
              {[
                { id: "all", label: "All Works" },
                { id: "floral", label: "Floral" },
                { id: "solar", label: "Solar" },
                { id: "amber", label: "Amber" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFilter(f.id);
                    setCarouselIdx(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    filter === f.id ? "shadow-sm text-white" : ""
                  }`}
                  style={{
                    backgroundColor: filter === f.id ? accent : "transparent",
                    color: filter === f.id ? "#ffffff" : inkSecond,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                style={{ backgroundColor: surface, borderColor: "rgba(158, 74, 40, 0.2)", color: ink }}
                aria-label="Previous flacon"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                style={{ backgroundColor: surface, borderColor: "rgba(158, 74, 40, 0.2)", color: ink }}
                aria-label="Next flacon"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Grid / Carousel View of What We Offer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border overflow-hidden backdrop-blur-md flex flex-col justify-between transition-all shadow-md hover:shadow-2xl"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold text-white backdrop-blur-md shadow-sm"
                      style={{ backgroundColor: accent }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      color: favorites[item.id] ? accent : ink,
                    }}
                    aria-label="Bookmark flacon"
                  >
                    <Heart size={16} fill={favorites[item.id] ? accent : "none"} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl backdrop-blur-md bg-white/85 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <p className="text-[11px] font-serif italic text-stone-800 line-clamp-1">
                      "{item.mood}"
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: accent }}>
                        {item.edition}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: ink }}>
                        <Star size={12} fill="#E8A838" stroke="#E8A838" />
                        <span>{item.rating}</span>
                        <span className="opacity-50">({item.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-normal" style={{ color: ink }}>
                      {item.title}
                    </h3>

                    <div className="p-2.5 rounded-xl border text-[11px] font-mono leading-tight tracking-tight"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.4)", borderColor: "rgba(158, 74, 40, 0.12)", color: inkSecond }}
                    >
                      <span className="font-semibold" style={{ color: ink }}>Notes: </span>
                      {item.notes}
                    </div>
                  </div>

                  <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "rgba(158, 74, 40, 0.12)" }}>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 block" style={{ color: inkSecond }}>
                        Craft Format
                      </span>
                      <span className="text-sm font-serif font-bold tracking-tight" style={{ color: ink }}>
                        {item.volume}
                      </span>
                    </div>

                    <motion.a
                      href="#consultation"
                      onClick={(e) => handleSmoothScroll(e, "#consultation")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer shadow-sm"
                      style={{
                        backgroundColor: ink,
                        color: "#FFF5EE",
                      }}
                    >
                      <span>Inquire Scent</span>
                      <ArrowUpRight size={13} />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Discovery Flight Callout */}
        <div
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border backdrop-blur-xl"
          style={{
            backgroundColor: bgSecond,
            borderColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 20px 40px -15px rgba(158, 74, 40, 0.15)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
                Complete Discovery Flight // 5 × 10ml
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-normal" style={{ color: ink }}>
                Experience the Entire Living Collection
              </h3>
              <p className="text-sm font-light max-w-xl leading-relaxed" style={{ color: inkSecond }}>
                Hand-blown glass miniatures delivered directly to your home with our master olfactory compass guide.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <motion.a
                href="#consultation"
                onClick={(e) => handleSmoothScroll(e, "#consultation")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-semibold text-white shadow-xl cursor-pointer"
                style={{ backgroundColor: accent }}
              >
                <span>Inquire Discovery Box</span>
                <ArrowUpRight size={15} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand1Projects;
