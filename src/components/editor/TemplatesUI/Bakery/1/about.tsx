// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import products from "./public/pantry-products.jpg";

export function Bakery1About({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.["bg-second"] || "#ffffff";
  const ink = theme?.ink || "#1a1a1a";
  const surface = theme?.surface || "#dcdbd8";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  return (
    <section id="about" className="scroll-mt-20 py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: bgSecond, color: ink, fontFamily: fontBody }}>
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none w-48 h-48">
        <svg viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 0C100 50 130 80 160 100C130 120 100 150 100 200C100 150 70 120 40 100C70 80 100 50 100 0Z" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <img src={products} alt="Our products" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill={accent}><circle cx="12" cy="12" r="6" /></svg>
              <Editable
                as="p"
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: accent }}
                value="02 — Our Story & Heritage"
              />
            </div>
            <Editable
              as="h2"
              className="mt-2 text-4xl leading-tight md:text-5xl font-light"
              style={{ fontFamily: fontHeading }}
              value={props.aboutTitle || "Baking since 1987, one artisanal loaf at a time."}
              onChange={(aboutTitle) => onChange?.({ aboutTitle })}
            />
            <Editable
              as="p"
              className="mt-6 text-base leading-8 opacity-80"
              value={props.aboutText || "We started in a small village kitchen with a single sourdough starter and a wood-fired brick oven. Over three decades, nothing has changed except our dedication to honest fermentation, stone-milled local grains, and timeless craft."}
              onChange={(aboutText) => onChange?.({ aboutText })}
            />
            <div className="mt-10 grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: surface }}>
              {[["40+", "Recipes Daily"], ["100%", "Organic Grain"], ["7 Days", "Freshly Baked"]].map(([stat, label], idx) => (
                <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + idx * 0.1 }}>
                  <p className="text-3xl font-bold tracking-tight" style={{ color: accent, fontFamily: fontHeading }}>{stat}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider opacity-60 font-semibold">{label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}