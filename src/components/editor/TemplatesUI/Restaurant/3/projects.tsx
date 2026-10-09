// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sun, Waves } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FAF5EE";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#14213D";
  const inkSecond = theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#E07A5F";
  const surface = theme?.surface || "#F1E9DE";

  const [activeTab, setActiveTab] = useState("all");
  const [selectedDish, setSelectedDish] = useState<any | null>(null);

  const DEFAULT_ITEMS = [
    {
      title: "Chilled Wild Oysters & Mignonette",
      cat: "raw",
      price: "$24",
      badge: "Raw Bar",
      image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=1200&q=80",
      description: "Half-dozen Pacific Hog Island oysters on crushed ice, shallot & Champagne vinegar mignonette, fresh lemon.",
    },
    {
      title: "Wood-Grilled Octopus & Salsa Verde",
      cat: "mains",
      price: "$32",
      badge: "Wood Hearth",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
      description: "Tender Spanish octopus charred over olive wood embers, fingerling potato confit, caper berries, and parsley oil.",
    },
    {
      title: "Yellowfin Tuna Crudo & Blood Orange",
      cat: "raw",
      price: "$22",
      badge: "Fresh Catch",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
      description: "Sashimi-grade line-caught tuna, blood orange suprêmes, Calabrian chili oil, and Maldon sea salt crystals.",
    },
    {
      title: "Whole Mediterranean Sea Bream",
      cat: "mains",
      price: "$39",
      badge: "Chef's Special",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
      description: "Roasted whole with fresh fennel fronds, blistered cherry tomatoes, preserved lemon, and herb salmoriglio.",
    },
    {
      title: "Wood-Oven Sourdough & Whipped Ricotta",
      cat: "raw",
      price: "$14",
      badge: "Baked Daily",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
      description: "Warm seeded sourdough baked in our morning oven, served with whipped sheep ricotta, wild thyme honey, and sea salt.",
    },
    {
      title: "Lemon Verbena Tart & Olive Oil Gelato",
      cat: "dolci",
      price: "$13",
      badge: "Terrace Dolce",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1200&q=80",
      description: "Crisp almond pastry shell filled with tart Amalfi lemon curd, served with estate cold-pressed olive oil gelato.",
    },
  ];

  const items = Array.isArray(props?.items) && props.items.length > 0 ? props.items : DEFAULT_ITEMS;
  const setDish = (i: number, k: string, v: any) =>
    onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

  const tabs = [
    { id: "all", label: "Full Blackboard" },
    { id: "raw", label: "Raw Bar & Starters" },
    { id: "mains", label: "Wood-Fired Hearth" },
    { id: "dolci", label: "Terrace Dolci" },
  ];

  const filtered = activeTab === "all" ? items : items.filter((x: any) => x.cat === activeTab);

  return (
    <section id="menu" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              <Editable
                as="span"
                value={props?.eyebrow || "WRITTEN FRESH EACH MORNING"}
                onChange={(v: string) => onChange?.({ eyebrow: v })}
              />
            </p>
            <Editable
              as="h2"
              value={props?.title || "Today's Seasonal Blackboard Menu"}
              onChange={(v: string) => onChange?.({ title: v })}
              className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-5xl"
              style={{ color: ink }}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="rounded-full px-4 py-2 text-xs font-bold transition duration-200"
                style={{
                  backgroundColor: activeTab === t.id ? accent : bgSecond,
                  color: activeTab === t.id ? "#FFFFFF" : inkSecond,
                  border: `1px solid ${activeTab === t.id ? accent : surface}`,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 2-Column Menu Layout */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {filtered.map((d: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
              onClick={() => setSelectedDish(d)}
              className="group cursor-pointer flex flex-col sm:flex-row gap-5 overflow-hidden rounded-3xl border p-5 transition duration-300 hover:shadow-lg"
              style={{ backgroundColor: bgSecond, borderColor: surface }}
            >
              <img
                src={d.image}
                alt={d.title}
                className="h-32 sm:h-auto sm:w-36 shrink-0 rounded-2xl object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>
                      {d.badge}
                    </span>
                    <span className="font-serif text-base font-bold" style={{ color: ink }}>
                      {d.price}
                    </span>
                  </div>
                  <Editable
                    as="h3"
                    value={d.title}
                    onChange={(v: string) => setDish(i, "title", v)}
                    className="mt-1 font-serif text-lg font-bold group-hover:underline"
                    style={{ color: ink }}
                  />
                  <Editable
                    as="p"
                    value={d.description}
                    onChange={(v: string) => setDish(i, "description", v)}
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: inkSecond }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold" style={{ color: accent }}>
                  <span>View Details</span>
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dish Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDish(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-md overflow-hidden rounded-3xl border p-6 shadow-2xl"
              style={{ backgroundColor: bgSecond, borderColor: surface }}
            >
              <button
                onClick={() => setSelectedDish(null)}
                aria-label="Close modal"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-md"
                style={{ backgroundColor: bg, color: ink }}
              >
                <X size={18} />
              </button>

              <img
                src={selectedDish.image}
                alt={selectedDish.title}
                className="aspect-[16/10] w-full rounded-2xl object-cover"
              />

              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl font-bold" style={{ color: ink }}>
                    {selectedDish.title}
                  </h3>
                  <span className="font-serif text-lg font-bold" style={{ color: accent }}>
                    {selectedDish.price}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed" style={{ color: inkSecond }}>
                  {selectedDish.description}
                </p>
                <div className="mt-4 rounded-xl border p-3 text-[11px]" style={{ backgroundColor: bg, borderColor: surface }}>
                  <p className="font-bold uppercase" style={{ color: accent }}>Kitchen Sourcing</p>
                  <p className="mt-0.5" style={{ color: ink }}>Hand-selected daily from Pacific day-boats and organic coastal farms.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export const Restaurant3Projects = Projects;
export const ProjectsGrid = Projects;
export default Projects;
