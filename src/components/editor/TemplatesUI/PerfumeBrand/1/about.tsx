// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, Feather, Wind, Compass, Leaf, Flower2, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand1About({ props = {}, theme, onChange }: any) {
  const [activeTab, setActiveTab] = useState<"top" | "heart" | "base">("heart");

  const bg = theme?.bg || "#EED8C9";
  const bgSecond = theme?.["bg-second"] || "#E5C8B4";
  const ink = theme?.ink || "#2D1D18";
  const inkSecond = theme?.["ink-second"] || "#7A5E54";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.55)";
  const accent = theme?.accent || "#9E4A28";

  const notesData = {
    top: {
      time: "First 15 Minutes",
      title: "Opening Top Notes",
      subtitle: "The Luminous Sensation",
      desc: "An initial burst of sparkling sunlight. Captured through gentle cold-expression at sunrise in Calabria.",
      ingredients: [
        { name: "Calabrian Bergamot", origin: "Reggio Calabria, Italy", icon: "🍋" },
        { name: "Neroli Solar Blossom", origin: "Cap d'Antibes, France", icon: "🌸" },
        { name: "Crisp Morning Dew", origin: "Alpine Glacial Mist", icon: "💧" },
      ],
    },
    heart: {
      time: "2 to 6 Hours",
      title: "Harmonic Heart Notes",
      subtitle: "The Soul of Maison Lumière",
      desc: "Rich, multi-layered botanical florals that unfurl with your body heat, creating an intimate aura.",
      ingredients: [
        { name: "Centifolia May Rose", origin: "Grasse, France", icon: "🌹" },
        { name: "Florentine White Iris", origin: "Tuscany, Italy", icon: "🪻" },
        { name: "Wild Orange Blossom", origin: "Seville, Spain", icon: "🌼" },
      ],
    },
    base: {
      time: "8 to 24 Hours",
      title: "Resonant Base Notes",
      subtitle: "The Timeless Memory",
      desc: "Slow-macerated noble resins and velvety woods that linger on skin, cashmere, and silk.",
      ingredients: [
        { name: "Golden Ambroxan", origin: "Ethical Marine Synthetics", icon: "✨" },
        { name: "Creamy Mysore Sandalwood", origin: "Sustainably Harvested", icon: "🪵" },
        { name: "Bourbon Vanilla Pod", origin: "Madagascar Reserve", icon: "🌿" },
      ],
    },
  };

  const steps = [
    {
      num: "01",
      title: "Dawn Harvesting",
      desc: "Our petals are hand-picked only during the first two hours of daylight before the morning mist evaporates.",
    },
    {
      num: "02",
      title: "Hydro-Distillation",
      desc: "Slow, low-pressure steam extraction preserves delicate floral molecules without thermal scorching.",
    },
    {
      num: "03",
      title: "6-Month Barrel Ageing",
      desc: "Every batch rests in seasoned French oak casks to harmonize volatile top chords with grounding basenotes.",
    },
    {
      num: "04",
      title: "Hand-Numbered Bottling",
      desc: "Each crystal flacon is individually polished, filled, and sealed with gold leaf thread in our Grasse atelier.",
    },
  ];

  return (
    <section
      id="story"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden"
      style={{
        backgroundColor: bgSecond,
        backgroundImage: `radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.6) 0%, transparent 60%), radial-gradient(circle at 85% 85%, rgba(238, 216, 201, 0.7) 0%, transparent 70%)`,
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b pb-12" style={{ borderColor: "rgba(158, 74, 40, 0.15)" }}>
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-[0.2em]"
              style={{ backgroundColor: surface, color: accent }}
            >
              <Sparkles size={12} />
              <span>Olfactive Architecture</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase leading-[0.95]"
              style={{ fontFamily: "Cinzel, Cormorant Garamond, serif" }}
            >
              <Editable
                value={props?.aboutHeadline || "Born from the Alchemists of Grasse"}
                onChange={(v) => onChange?.({ aboutHeadline: v })}
              />
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm leading-relaxed font-light" style={{ color: inkSecond }}>
              <Editable
                value={
                  props?.aboutIntro ||
                  "We refuse industrial haste. Maison Lumière creates perfumes that act as intimate second skins—organic, slow-macerated, and profoundly lingering."
                }
                onChange={(v) => onChange?.({ aboutIntro: v })}
              />
            </p>
          </div>
        </div>

        {/* Sensory Story Split Block with Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-normal leading-snug" style={{ color: ink }}>
              <Editable
                value={
                  props?.aboutSubheadline ||
                  "A sacred marriage of living botanicals, crystal flacons, and the golden hour sun."
                }
                onChange={(v) => onChange?.({ aboutSubheadline: v })}
              />
            </h3>
            <p className="text-sm sm:text-base leading-relaxed font-light" style={{ color: inkSecond }}>
              Every formulation begins in our centuries-old botanical sanctuary in the foothills of Grasse.
              Unlike conventional synthetic fragrances, our bio-fermented extracts adapt organically to your personal skin chemistry,
              unfurling distinct, inimitable scent memories throughout the day.
            </p>

            {/* Metric counters */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t" style={{ borderColor: "rgba(158, 74, 40, 0.15)" }}>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif font-bold" style={{ color: accent }}>
                  180
                </span>
                <span className="text-[11px] font-mono tracking-wider uppercase opacity-75" style={{ color: inkSecond }}>
                  Days Barrel Aging
                </span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif font-bold" style={{ color: accent }}>
                  98%
                </span>
                <span className="text-[11px] font-mono tracking-wider uppercase opacity-75" style={{ color: inkSecond }}>
                  Natural Absolutes
                </span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif font-bold" style={{ color: accent }}>
                  24h+
                </span>
                <span className="text-[11px] font-mono tracking-wider uppercase opacity-75" style={{ color: inkSecond }}>
                  Sensory Trail
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border"
            style={{ borderColor: "rgba(255, 255, 255, 0.6)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85"
              alt="Grasse French Perfumery Botanicals"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-6 sm:p-8"
            >
              <div className="text-white space-y-1">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-90">
                  DOMAINE LUMIÈRE // PROVENCE
                </span>
                <p className="font-serif text-lg font-light">
                  Hand-tended Centifolia Rose harvest at 6:00 AM.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Fragrance Pyramid */}
        <div
          className="p-8 sm:p-12 rounded-3xl border backdrop-blur-md space-y-8"
          style={{
            backgroundColor: surface,
            borderColor: "rgba(255, 255, 255, 0.7)",
            boxShadow: "0 25px 50px -12px rgba(158, 74, 40, 0.1)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
                Interactive Sensory Decomposition
              </p>
              <h4 className="text-2xl sm:text-3xl font-serif uppercase tracking-tight mt-1" style={{ color: ink }}>
                The Scent Pyramid
              </h4>
            </div>

            {/* Pyramid Level Tabs */}
            <div className="inline-flex p-1 rounded-full border backdrop-blur-md"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", borderColor: "rgba(158, 74, 40, 0.15)" }}
            >
              {(["top", "heart", "base"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    activeTab === tab ? "shadow-sm text-white" : ""
                  }`}
                  style={{
                    backgroundColor: activeTab === tab ? accent : "transparent",
                    color: activeTab === tab ? "#ffffff" : inkSecond,
                  }}
                >
                  {tab === "top" ? "Top Chords" : tab === "heart" ? "Heart Note" : "Base Trail"}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4"
            >
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-md"
                  style={{ backgroundColor: "rgba(158, 74, 40, 0.12)", color: accent }}
                >
                  {notesData[activeTab].time}
                </span>
                <h5 className="text-2xl font-serif font-semibold" style={{ color: ink }}>
                  {notesData[activeTab].title}
                </h5>
                <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
                  {notesData[activeTab].desc}
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {notesData[activeTab].ingredients.map((ing) => (
                  <motion.div
                    key={ing.name}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-4 rounded-2xl border backdrop-blur-sm space-y-2 transition-all shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    <span className="text-2xl block">{ing.icon}</span>
                    <h6 className="text-xs font-serif font-bold" style={{ color: ink }}>
                      {ing.name}
                    </h6>
                    <p className="text-[10px] font-mono tracking-tight" style={{ color: inkSecond }}>
                      {ing.origin}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4-Step Distillation Process Timeline */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
              The Maison Standard
            </span>
            <h4 className="text-3xl sm:text-4xl font-serif uppercase tracking-tight" style={{ color: ink }}>
              From Field to Crystal
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl border backdrop-blur-md space-y-4 transition-all shadow-sm"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(255, 255, 255, 0.65)",
                }}
              >
                <span className="text-3xl font-serif font-extralight block opacity-50" style={{ color: accent }}>
                  {st.num}
                </span>
                <h5 className="text-base font-serif font-bold" style={{ color: ink }}>
                  {st.title}
                </h5>
                <p className="text-xs leading-relaxed font-light" style={{ color: inkSecond }}>
                  {st.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand1About;
