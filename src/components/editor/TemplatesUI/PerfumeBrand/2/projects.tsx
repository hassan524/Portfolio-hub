// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Star, ChevronLeft, ChevronRight, Moon, Heart, Flame } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand2Projects({ props = {}, theme, onChange }: any) {
  const [filter, setFilter] = useState("all");
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const bg = theme?.bg || "#0A090D";
  const bgSecond = theme?.["bg-second"] || "#14121B";
  const ink = theme?.ink || "#F5F2EB";
  const inkSecond = theme?.["ink-second"] || "#9E96A6";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#D4AF37";

  const products = [
    {
      id: "elixir-noir-tonka",
      category: "oud",
      title: "Élixir Noir & Tonka",
      edition: "Extrait Pur 38% // 100ml",
      volume: "100ml Heavy Crystal",
      rating: 5.0,
      reviews: 188,
      notes: "Smoked Tonka · 12-Year Oud · Roasted Cocoa Pods",
      mood: "A dark gourmand narcotic that clings to velvet and warm skin.",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85",
      badge: "Nocturne Solstice",
    },
    {
      id: "cuir-de-minuit",
      category: "leather",
      title: "Cuir de Minuit",
      edition: "Extrait de Parfum // 50ml",
      volume: "50ml Heavy Crystal",
      rating: 4.9,
      reviews: 134,
      notes: "Tuscan Black Leather · Smoked Birch · Saffron Stigmas",
      mood: "The raw intimacy of hand-worked saddlery and incense ash.",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=85",
      badge: "Private Vault",
    },
    {
      id: "ambre-cendre",
      category: "amber",
      title: "Ambre Cendré",
      edition: "Extrait Pur 40% // 100ml",
      volume: "100ml Heavy Crystal",
      rating: 5.0,
      reviews: 95,
      notes: "Molten Amber Resin · Benzoin Tears · Indonesian Clove",
      mood: "Golden resin dripping through smoldering aromatic embers.",
      image: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=1000&q=85",
      badge: "Masterpiece",
    },
    {
      id: "santal-crepusculaire",
      category: "oud",
      title: "Santal Crépusculaire",
      edition: "Extrait de Parfum // 50ml",
      volume: "50ml Heavy Crystal",
      rating: 4.8,
      reviews: 82,
      notes: "Black Sandalwood · Green Fig Sap · Violet Smoke",
      mood: "Cool twilight air drifting over charred sacred wood.",
      image: "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&w=1000&q=85",
      badge: "Limited Cask",
    },
    {
      id: "oud-immortel-09",
      category: "oud",
      title: "Oud Immortel No. IX",
      edition: "Pure Perfume Attar // 30ml",
      volume: "30ml Crystal Pipette",
      rating: 5.0,
      reviews: 64,
      notes: "18-Year Wild Agarwood · Damascena Rose · Civet",
      mood: "The ultimate animalic crown jewel for seasoned connoisseurs.",
      image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1000&q=85",
      badge: "Single Barrel",
    },
    {
      id: "fumee-d-iris",
      category: "leather",
      title: "Fumée d'Iris",
      edition: "Extrait de Parfum // 100ml",
      volume: "100ml Heavy Crystal",
      rating: 4.9,
      reviews: 110,
      notes: "Night-Harvested Black Iris · Cade Tar · Ambergris",
      mood: "Powdery darkness wrapped in cold incense smoke.",
      image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=85",
      badge: "Lunar Edition",
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
      id="vault"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden border-t"
      style={{
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 75% 25%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)`,
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b pb-10" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
              The Nocturnal Flacons
            </span>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase leading-[0.95]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              <Editable
                value={props?.projectsHeadline || "The Olfactory Vault"}
                onChange={(v) => onChange?.({ projectsHeadline: v })}
              />
            </h2>
          </div>

          {/* Filter Pills & Slider Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 p-1.5 rounded-full border backdrop-blur-md"
              style={{ backgroundColor: surface, borderColor: "rgba(212, 175, 55, 0.2)" }}
            >
              {[
                { id: "all", label: "Complete Vault" },
                { id: "oud", label: "Oud" },
                { id: "leather", label: "Leather" },
                { id: "amber", label: "Ambers" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFilter(f.id);
                    setCarouselIdx(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    filter === f.id ? "shadow-md" : ""
                  }`}
                  style={{
                    backgroundColor: filter === f.id ? accent : "transparent",
                    color: filter === f.id ? "#0A090D" : inkSecond,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                style={{ backgroundColor: surface, borderColor: "rgba(212, 175, 55, 0.25)", color: accent }}
                aria-label="Previous flacon"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-full border backdrop-blur-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                style={{ backgroundColor: surface, borderColor: "rgba(212, 175, 55, 0.25)", color: accent }}
                aria-label="Next flacon"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Grid / Carousel View */}
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
                className="group relative rounded-3xl border overflow-hidden backdrop-blur-md flex flex-col justify-between transition-all shadow-xl hover:shadow-2xl"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(212, 175, 55, 0.25)",
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold text-black backdrop-blur-md shadow-sm"
                      style={{ backgroundColor: accent }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 cursor-pointer shadow-sm border"
                    style={{
                      backgroundColor: "rgba(10, 9, 13, 0.7)",
                      borderColor: "rgba(212, 175, 55, 0.3)",
                      color: favorites[item.id] ? accent : ink,
                    }}
                    aria-label="Bookmark flacon"
                  >
                    <Heart size={16} fill={favorites[item.id] ? accent : "none"} />
                  </button>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: accent }}>
                        {item.edition}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: ink }}>
                        <Star size={12} fill="#D4AF37" stroke="#D4AF37" />
                        <span>{item.rating}</span>
                        <span className="opacity-50">({item.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-serif font-normal" style={{ color: ink }}>
                      {item.title}
                    </h3>

                    <div className="p-2.5 rounded-xl border text-[11px] font-mono leading-tight tracking-tight"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", borderColor: "rgba(212, 175, 55, 0.15)", color: inkSecond }}
                    >
                      <span className="font-semibold" style={{ color: accent }}>Notes: </span>
                      {item.notes}
                    </div>
                  </div>

                  <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 block" style={{ color: inkSecond }}>
                        Craft Format
                      </span>
                      <span className="text-sm font-serif font-bold tracking-tight" style={{ color: accent }}>
                        {item.volume}
                      </span>
                    </div>

                    <motion.a
                      href="#bespoke"
                      onClick={(e) => handleSmoothScroll(e, "#bespoke")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer shadow-md"
                      style={{
                        backgroundColor: accent,
                        color: "#0A090D",
                      }}
                    >
                      <span>Inquire Flacon</span>
                      <ArrowUpRight size={13} />
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand2Projects;
