// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Moon, Sparkles, Compass, ShieldCheck, Droplet, Eye } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand2About({ props = {}, theme, onChange }: any) {
  const [selectedAccord, setSelectedAccord] = useState(0);

  const bg = theme?.bg || "#0A090D";
  const bgSecond = theme?.["bg-second"] || "#14121B";
  const ink = theme?.ink || "#F5F2EB";
  const inkSecond = theme?.["ink-second"] || "#9E96A6";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#D4AF37";

  const accords = [
    {
      name: "Wild Cambodian Oud",
      category: "Smoky Balsamic",
      desc: "Wild harvested agarwood infected by ancient fungal resins, distilling an earthy, deep, animalic warmth unmatched by any modern compound.",
      origin: "Koh Kong Rainforest, Cambodia",
      intensity: "10/10",
      harvest: "Aged 18 Years",
    },
    {
      name: "Night-Blooming Jasmine",
      category: "Indolic Floral",
      desc: "Flowers plucked between midnight and 3:00 AM at peak indolic fragrance, releasing an intoxicating, narcotic sweetness.",
      origin: "Grasse Foothills, France",
      intensity: "9/10",
      harvest: "Midnight Harvest",
    },
    {
      name: "Charred Bourbon Vanilla",
      category: "Gourmand Resin",
      desc: "Black organic vanilla pods roasted over smoldering birchwood before immersion in neutral cane spirit for sixteen months.",
      origin: "Sava Region, Madagascar",
      intensity: "8.5/10",
      harvest: "Double-Charred",
    },
    {
      name: "Tuscan Black Leather",
      category: "Warm Animalic",
      desc: "Birch tar and cade oil distilled alongside dried saffron stigmas to evoke the sensual scent of bespoke saddlery.",
      origin: "Florence, Italy",
      intensity: "9.5/10",
      harvest: "Ancient Kettle Distilled",
    },
  ];

  return (
    <section
      id="alchemy"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden border-t"
      style={{
        backgroundColor: bgSecond,
        borderColor: "rgba(212, 175, 55, 0.15)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b pb-12" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-[0.25em] border"
              style={{
                backgroundColor: "rgba(212, 175, 55, 0.08)",
                borderColor: "rgba(212, 175, 55, 0.25)",
                color: accent,
              }}
            >
              <Moon size={12} />
              <span>The Nocturnal Manifesto</span>
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase leading-[0.95]"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              <Editable
                value={props?.aboutHeadline || "Distilled in Complete Shadow"}
                onChange={(v) => onChange?.({ aboutHeadline: v })}
              />
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={
                  props?.aboutIntro ||
                  "Light destroys volatile aromatic molecules. Atelier Obsidian operates exclusively in darkroom ateliers, preserving every raw nuance of wild oud, smoke, and black amber."
                }
                onChange={(v) => onChange?.({ aboutIntro: v })}
              />
            </p>
          </div>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-normal leading-snug" style={{ color: ink }}>
              “A fragrance should not announce your presence politely; it should linger as an indelible premonition.”
            </h3>
            <p className="text-sm sm:text-base leading-relaxed font-light" style={{ color: inkSecond }}>
              Our master alchemist works without commercial constraints. By refusing synthetic fixatives, we rely instead on aged tree resins and natural animalic tinctures that fuse intimately with human pheromones.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif font-bold" style={{ color: accent }}>
                  38%
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase opacity-60" style={{ color: inkSecond }}>
                  Extrait Concentration
                </span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif font-bold" style={{ color: accent }}>
                  240
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase opacity-60" style={{ color: inkSecond }}>
                  Nights in Oak
                </span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-serif font-bold" style={{ color: accent }}>
                  500
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase opacity-60" style={{ color: inkSecond }}>
                  Bottles Per Solstice
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
            style={{ borderColor: "rgba(212, 175, 55, 0.3)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1200&q=85"
              alt="Smoldering Oud and Resin Distillation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white space-y-1">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: accent }}>
                  ATELIER CASK NO. 04 // CHARRED OAK
                </span>
                <p className="font-serif text-lg font-light text-stone-200">
                  Resin maceration in seasoned charred barrels under candlelight.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Raw Accord Inspector */}
        <div
          className="p-8 sm:p-12 rounded-3xl border backdrop-blur-xl space-y-8"
          style={{
            backgroundColor: surface,
            borderColor: "rgba(212, 175, 55, 0.25)",
            boxShadow: "0 25px 50px -15px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
                The Raw Materia Prima
              </p>
              <h4 className="text-2xl sm:text-3xl font-serif uppercase tracking-tight mt-1" style={{ color: ink }}>
                Four Pillars of the Dark Sillage
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {accords.map((acc, i) => (
                <button
                  key={acc.name}
                  onClick={() => setSelectedAccord(i)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer border ${
                    selectedAccord === i ? "shadow-md" : ""
                  }`}
                  style={{
                    backgroundColor: selectedAccord === i ? accent : "transparent",
                    borderColor: selectedAccord === i ? accent : "rgba(212, 175, 55, 0.2)",
                    color: selectedAccord === i ? "#0A090D" : inkSecond,
                  }}
                >
                  {acc.name}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={selectedAccord}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4"
          >
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-md"
                style={{ backgroundColor: "rgba(212, 175, 55, 0.12)", color: accent }}
              >
                {accords[selectedAccord].category}
              </span>
              <h5 className="text-2xl font-serif font-semibold" style={{ color: ink }}>
                {accords[selectedAccord].name}
              </h5>
              <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
                {accords[selectedAccord].desc}
              </p>
            </div>

            <div className="lg:col-span-4 p-5 rounded-2xl border space-y-2 font-mono text-xs"
              style={{
                backgroundColor: "rgba(10, 9, 13, 0.6)",
                borderColor: "rgba(212, 175, 55, 0.2)",
              }}
            >
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
                <span className="opacity-60" style={{ color: inkSecond }}>ORIGIN</span>
                <span style={{ color: ink }}>{accords[selectedAccord].origin}</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
                <span className="opacity-60" style={{ color: inkSecond }}>INTENSITY</span>
                <span style={{ color: accent }}>{accords[selectedAccord].intensity}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60" style={{ color: inkSecond }}>MACERATION</span>
                <span style={{ color: ink }}>{accords[selectedAccord].harvest}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand2About;
