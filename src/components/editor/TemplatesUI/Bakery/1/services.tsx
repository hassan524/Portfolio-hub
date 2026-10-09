// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";

export function Bakery1Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#ffffff";
  const ink = theme?.ink || "#1a1a1a";
  const surface = theme?.surface || "#dcdbd8";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const servicesList = [
    { title: "Artisan Wholesale", desc: "Supplying local cafes, restaurants, and grocers with daily fresh sourdough and pastries." },
    { title: "Baking Masterclasses", desc: "Hands-on workshops teaching sourdough fermentation, lamination, and pastry craft." },
    { title: "Custom Celebrations", desc: "Bespoke tiered cakes, patisserie boxes, and dessert tables for private gatherings." }
  ];

  return (
    <section id="services" className="scroll-mt-20 py-24 md:py-32" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill={accent}><circle cx="12" cy="12" r="6" /></svg>
            <Editable as="p" className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }} value="04 — What We Offer" />
          </div>
          <Editable
            as="h2"
            className="text-4xl md:text-6xl font-light tracking-tight"
            style={{ fontFamily: fontHeading }}
            value={props.servicesTitle || "Craft services tailored for true food lovers."}
            onChange={(servicesTitle) => onChange?.({ servicesTitle })}
          />
        </div>

        <div className="grid gap-12 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: surface }}>
          {servicesList.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="md:px-8 first:pl-0 pt-8 md:pt-0 flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl font-light opacity-30 block mb-6" style={{ fontFamily: fontHeading, color: accent }}>0{idx + 1}</span>
                <h3 className="text-2xl font-medium mb-4" style={{ fontFamily: fontHeading }}>{srv.title}</h3>
                <p className="text-sm leading-relaxed opacity-75 font-normal">{srv.desc}</p>
              </div>
              <div className="mt-12 pt-6 border-t flex items-center justify-between" style={{ borderColor: surface }}>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent }}>Inquire within</span>
                <span className="text-lg">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
