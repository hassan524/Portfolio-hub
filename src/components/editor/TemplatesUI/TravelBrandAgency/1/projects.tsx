// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaLocationDot, FaStar, FaClock, FaArrowRight } from "react-icons/fa6";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency1Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const categories = ["All Escapes", "Tropical Beaches", "Alpine Escapes", "Cultural Odyssey"];

  const packages = [
    {
      id: "bali",
      category: "Tropical Beaches",
      title: "Bali & Nusa Penida Lagoon Escape",
      location: "Indonesia",
      duration: "7 Days / 6 Nights",
      rating: "4.95",
      reviews: "148 reviews",
      price: "$1,280",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80",
      tag: "Best Seller",
    },
    {
      id: "amalfi",
      category: "Tropical Beaches",
      title: "Amalfi Coast & Positano Yacht Voyage",
      location: "Italy",
      duration: "8 Days / 7 Nights",
      rating: "4.98",
      reviews: "210 reviews",
      price: "$2,450",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      tag: "Popular",
    },
    {
      id: "swiss",
      category: "Alpine Escapes",
      title: "Swiss Alps & Zermatt Luxury Chalet",
      location: "Switzerland",
      duration: "6 Days / 5 Nights",
      rating: "4.92",
      reviews: "96 reviews",
      price: "$2,100",
      image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
      tag: "Featured",
    },
    {
      id: "kyoto",
      category: "Cultural Odyssey",
      title: "Kyoto Heritage Temples & Bamboo Forest",
      location: "Japan",
      duration: "9 Days / 8 Nights",
      rating: "4.97",
      reviews: "184 reviews",
      price: "$1,890",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80",
      tag: "Top Rated",
    },
    {
      id: "santorini",
      category: "Tropical Beaches",
      title: "Santorini Cliffside Sunsets & Oia",
      location: "Greece",
      duration: "7 Days / 6 Nights",
      rating: "4.96",
      reviews: "320 reviews",
      price: "$1,750",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80",
      tag: "Trending",
    },
    {
      id: "patagonia",
      category: "Alpine Escapes",
      title: "Patagonia Glaciers & Torres del Paine",
      location: "Chile & Argentina",
      duration: "10 Days / 9 Nights",
      rating: "4.94",
      reviews: "82 reviews",
      price: "$2,890",
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1000&q=80",
      tag: "Adventure",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All Escapes");

  const filtered = activeCategory === "All Escapes"
    ? packages
    : packages.filter((pkg) => pkg.category === activeCategory);

  return (
    <section id="packages" className="relative w-full py-24 md:py-32 bg-slate-50 text-slate-900 font-['Poppins',sans-serif]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Heading & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 block mb-2">
              <Editable value={p.projSub || "Handpicked Escapes"} onChange={(v) => handleUpdate("projSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              <Editable value={p.projTitle || "Featured Travel Packages"} onChange={(v) => handleUpdate("projTitle", v)} />
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((pkg) => (
              <motion.div
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo & Badges */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-slate-900 shadow-sm">
                    {pkg.tag}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                    <FaStar className="text-amber-400 text-[10px]" />
                    <span>{pkg.rating}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                      <FaLocationDot className="text-emerald-600" />
                      <span>{pkg.location}</span>
                      <span className="text-slate-300">•</span>
                      <FaClock className="text-slate-400" />
                      <span className="text-slate-500">{pkg.duration}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Starting from</span>
                      <span className="text-xl font-bold text-slate-900">{pkg.price}</span>
                      <span className="text-xs text-slate-400"> / person</span>
                    </div>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-slate-900 hover:bg-emerald-600 transition-colors shadow-sm"
                    >
                      <span>Explore</span>
                      <FaArrowRight className="text-[10px]" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency1Projects;
