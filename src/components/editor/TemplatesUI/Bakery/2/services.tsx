// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Bakery2Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#f7f4f6";
  const ink = theme?.ink || "#242023";
  const accent = theme?.accent || "#b23b68";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const services = [
    {
      idx: "01",
      title: "Wholesale & Chef Partnerships",
      desc: "Supplying premier restaurants, independent cafes, and boutique hotels with custom-fermented loaves and viennoiserie delivered warm at 6:00 AM daily.",
      tag: "Daily Supply",
    },
    {
      idx: "02",
      title: "Sourdough Masterclasses",
      desc: "Small-group, hands-on masterclasses covering wild starter maintenance, hydration control, shaping mechanics, and wood-fired oven management.",
      tag: "Weekend Sessions",
    },
    {
      idx: "03",
      title: "Bespoke Celebrations & Bread Bars",
      desc: "Curated bread displays, house-churned cultured butter flights, and tiered celebration patisserie for private estates and weddings.",
      tag: "Event Catering",
    },
  ];

  return (
    <section
      id="services"
      className="scroll-mt-20 py-24 md:py-36 transition-colors"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.24em] font-bold block mb-3" style={{ color: accent }}>
            04 // CRAFT SERVICES
          </span>
          <Editable
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08]"
            style={{ fontFamily: fontHeading }}
            value={props.servicesTitle || "Beyond the bakery counter."}
            onChange={(servicesTitle) => onChange?.({ servicesTitle })}
          />
          <p className="mt-4 text-base opacity-75 font-light leading-relaxed">
            From daily wholesale programs to private masterclasses, we bring the hearth directly to your tables.
          </p>
        </div>

        {/* 3-Column Floating Clean Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((srv, i) => (
            <motion.div
              key={srv.idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-8 sm:p-10 rounded-3xl bg-white flex flex-col justify-between shadow-xs transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl font-light" style={{ fontFamily: fontHeading, color: accent }}>
                    {srv.idx}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${accent}12`, color: accent }}
                  >
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-medium tracking-tight mb-3" style={{ fontFamily: fontHeading }}>
                  {srv.title}
                </h3>
                <p className="text-sm font-light opacity-75 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-black/5 flex items-center justify-between">
                <a
                  href="#contact"
                  className="text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-75"
                  style={{ color: accent }}
                >
                  <span>Inquire Program</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Services = Bakery2Services;
export default Bakery2Services;
