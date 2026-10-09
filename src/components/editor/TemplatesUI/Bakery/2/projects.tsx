// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Flame, Clock } from "lucide-react";
import hero from "./public/bread-hero.jpg";
import products from "./public/bread-products.jpg";

const MENU_ITEMS = [
  {
    num: "01",
    title: "Country Levain Boule",
    category: "Wild Sourdough",
    price: "£6.00",
    specs: "82% Hydration • 36h Cold Proof • Organic Stone-Milled Flour",
    notes: "Our flagship bake. Blistered deep mahogany crust, open custardy crumb, delicate lactic sweetness.",
    image: hero,
    batch: "Daily Dawn Bake",
  },
  {
    num: "02",
    title: "Brittany Kouign-Amann",
    category: "Viennoiserie",
    price: "£4.50",
    specs: "27 Laminated Layers • Cultured Normandy Butter • Spun Sea Salt",
    notes: "Crisp caramelized sugar shell that shatters into tender, buttery layers perfumed with Maldon sea salt.",
    image: products,
    batch: "Morning Hearth",
  },
  {
    num: "03",
    title: "Dark Rye & Roasted Walnut",
    category: "Wild Sourdough",
    price: "£6.80",
    specs: "100% Heritage Rye • Toasted English Walnuts • Raw Honey",
    notes: "Dense, aromatic crumb with deep earthy undertones and rich walnut crunch. Best sliced thin with salted butter.",
    image: hero,
    batch: "Daily Dawn Bake",
  },
  {
    num: "04",
    title: "Cardamom Morning Knot",
    category: "Viennoiserie",
    price: "£4.20",
    specs: "Swedish Enriched Dough • Whole Green Cardamom • Pearl Sugar",
    notes: "Twisted by hand and baked to golden perfection. Filled with crushed cardamom butter and topped with crystalline pearl sugar.",
    image: products,
    batch: "Fresh Hourly",
  },
  {
    num: "05",
    title: "Cast-Iron Rosemary Focaccia",
    category: "Hearth Bakes",
    price: "£5.50",
    specs: "High-Hydration Dough • First-Press Tuscan Olive Oil • Flaky Salt",
    notes: "Fermented for 24 hours, dimpled deeply with cold-pressed olive oil, fresh rosemary needles, and Maldon sea salt.",
    image: hero,
    batch: "Midday Hearth",
  },
  {
    num: "06",
    title: "Valrhona Pain au Chocolat",
    category: "Viennoiserie",
    price: "£4.80",
    specs: "70% Single-Origin Valrhona • Laminated Sourdough Pastry",
    notes: "Twin bars of bittersweet dark chocolate encased in feathery, golden layers that melt seamlessly.",
    image: products,
    batch: "Morning Hearth",
  },
];

export function Bakery2Projects({ props = {}, theme, onChange }: any) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const bg = theme?.bg || "#ffffff";
  const ink = theme?.ink || "#242023";
  const accent = theme?.accent || "#b23b68";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const selected = MENU_ITEMS[selectedIndex] || MENU_ITEMS[0];

  return (
    <section
      id="work"
      className="scroll-mt-20 py-24 md:py-36 transition-colors"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-black/10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] font-bold block mb-3" style={{ color: accent }}>
              03 // BAKER’S LEDGER & DAILY ROSTER
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.05]"
              style={{ fontFamily: fontHeading }}
              value={props.projectsTitle || "Fresh from the hearth every morning."}
              onChange={(projectsTitle) => onChange?.({ projectsTitle })}
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-mono opacity-60">
            <Flame size={15} style={{ color: accent }} />
            <span>WOOD-FIRED HEARTH AT 260°C</span>
          </div>
        </div>

        {/* 2-Column Split: Typographic Ledger on Left, Live Specimen View on Right (NO generic 3-card grid!) */}
        <div className="mt-14 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Typographic Item Rows */}
          <div className="lg:col-span-7 divide-y divide-black/10">
            {MENU_ITEMS.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.num}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => setSelectedIndex(idx)}
                  className="py-6 flex items-start justify-between gap-6 cursor-pointer transition-all group"
                  style={{
                    backgroundColor: isSelected ? "rgba(0,0,0,0.015)" : "transparent",
                    paddingLeft: isSelected ? "1rem" : "0",
                  }}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-mono font-bold transition-colors"
                        style={{ color: isSelected ? accent : "rgba(0,0,0,0.3)" }}
                      >
                        {item.num}
                      </span>
                      <h3
                        className="text-2xl sm:text-3xl font-light tracking-tight transition-colors"
                        style={{
                          fontFamily: fontHeading,
                          color: isSelected ? accent : ink,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs font-light opacity-60 pl-8">
                      {item.specs}
                    </p>
                  </div>

                  <div className="text-right shrink-0 flex items-center gap-4">
                    <span className="text-base sm:text-lg font-mono font-semibold" style={{ color: ink }}>
                      {item.price}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: isSelected ? accent : "rgba(0,0,0,0.05)",
                        color: isSelected ? "#ffffff" : "rgba(0,0,0,0.4)",
                      }}
                    >
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Hearth Specimen Card with Photo & Tasting Notes */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="rounded-3xl p-8 bg-black/[0.02] shadow-sm space-y-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-md">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selected.title}
                    src={selected.image}
                    alt={selected.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
                  {selected.category}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-2xl font-light" style={{ fontFamily: fontHeading }}>
                    {selected.title}
                  </h4>
                  <span className="text-lg font-mono font-bold" style={{ color: accent }}>
                    {selected.price}
                  </span>
                </div>

                <p className="text-sm font-light opacity-75 leading-relaxed mb-6">
                  {selected.notes}
                </p>

                <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-mono opacity-60">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>{selected.batch}</span>
                  </span>
                  <span>LIMITED HEARTH BATCH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Projects = Bakery2Projects;
export default Bakery2Projects;
