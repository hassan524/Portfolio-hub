// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import hero from "./public/pantry-hero.jpg";
import products from "./public/pantry-products.jpg";

const DEFAULT_ITEMS = [
  { title: "Classic Sourdough", category: "Breads", image: "hero" },
  { title: "Almond Croissant", category: "Viennoiserie", image: "products" },
  { title: "Rye & Walnut Loaf", category: "Breads", image: "hero" },
  { title: "Seasonal Berry Tart", category: "Patisserie", image: "products" },
  { title: "Cinnamon Brioche", category: "Viennoiserie", image: "hero" },
  { title: "Olive & Rosemary Ciabatta", category: "Breads", image: "products" },
];

export function Bakery1Projects({ props = {}, theme, onChange }: any) {
  const [showAll, setShowAll] = useState(false);
  const bg = theme?.bg || "#faf9f6";
  const ink = theme?.ink || "#1a1a1a";
  const surface = theme?.surface || "#dcdbd8";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const customItems = (props.items && props.items.length > 0) ? props.items : DEFAULT_ITEMS;
  const items = showAll ? customItems : customItems.slice(0, 4);

  return (
    <section id="work" className="scroll-mt-20 py-24 md:py-32" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-8 gap-6" style={{ borderColor: surface }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill={accent}><circle cx="12" cy="12" r="6" /></svg>
              <Editable as="p" className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }} value="03 — Our Daily Bakes" />
            </div>
            <Editable
              as="h2"
              className="text-4xl md:text-6xl font-light tracking-tight"
              style={{ fontFamily: fontHeading }}
              value={props.projectsTitle || "Made fresh, straight from the hearth."}
              onChange={(projectsTitle) => onChange?.({ projectsTitle })}
            />
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-semibold underline-offset-8 hover:underline text-left md:text-right cursor-pointer"
            style={{ color: accent }}
          >
            {showAll ? "Show fewer items ↑" : `View all menu items (${customItems.length}) →`}
          </button>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item: any, i: number) => {
            const src = typeof item.image === "string" && item.image.startsWith("http") ? item.image : (i % 2 === 0 ? hero : products);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-md relative" style={{ background: surface }}>
                  <img src={src} alt={item.title || `Item ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-xs uppercase tracking-widest font-semibold">Fresh Daily</span>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">{item.category || "Bakery"}</p>
                  <Editable as="h3" className="text-xl font-medium" style={{ fontFamily: fontHeading }} value={item.title || `Item ${i + 1}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}