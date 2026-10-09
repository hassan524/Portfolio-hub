// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import products from "./public/bread-products.jpg";

export function Bakery2About({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#f7f4f6";
  const ink = theme?.ink || "#242023";
  const surface = theme?.surface || "#ded7dc";
  const accent = theme?.accent || "#b23b68";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const pillars = [
    { num: "01", title: "Living Starter", desc: "Our sourdough mother levain has been nurtured daily for 14 years, producing complex lactic sweetness." },
    { num: "02", title: "Stone-Ground Flour", desc: "Milled weekly from regional heritage grains, preserving natural bran oils, minerals, and rustic character." },
    { num: "03", title: "36-Hour Cold Rest", desc: "Long slow cold fermentation allows digestible gluten breakdown and creates an open, custard-like crumb." },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-20 py-24 md:py-36 transition-colors relative"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <span id="story" className="absolute -top-20" />
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Top Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.24em] font-bold block mb-3" style={{ color: accent }}>
            02 // THE FERMENTATION LAB
          </span>
          <Editable
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08]"
            style={{ fontFamily: fontHeading, color: ink }}
            value={props.aboutTitle || "Bread reduced to its most sublime elements."}
            onChange={(aboutTitle) => onChange?.({ aboutTitle })}
          />
        </div>

        {/* 2-Column Split */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Floating Specimen Card */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl relative group">
              <img
                src={products}
                alt="Artisanal sourdough bakes"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Metric Card */}
            <div
              className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-black/5"
            >
              <span className="text-2xl font-light block mb-1" style={{ fontFamily: fontHeading, color: accent }}>
                36h Slow Rise
              </span>
              <p className="text-xs opacity-70 leading-relaxed font-light">
                Every single loaf undergoes extended cold proofing to develop an intensely caramelized, blistered crust.
              </p>
            </div>
          </div>

          {/* Right Column: Pillars & Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <Editable
              as="p"
              className="text-lg md:text-xl font-light leading-relaxed opacity-85"
              value={
                props.aboutText ||
                "We believe bread is not merely food, but a living craft. We reject commercial yeasts, dough conditioners, and preservatives in favor of time, touch, and temperature."
              }
              onChange={(aboutText) => onChange?.({ aboutText })}
            />

            {/* 3 Pillars */}
            <div className="space-y-6 pt-4">
              {pillars.map((p) => (
                <div key={p.num} className="p-6 rounded-2xl bg-white shadow-xs transition-transform hover:-translate-y-0.5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono font-bold" style={{ color: accent }}>
                      {p.num}
                    </span>
                    <h3 className="text-lg font-medium tracking-tight" style={{ fontFamily: fontHeading }}>
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-sm font-light opacity-70 leading-relaxed pl-7">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="pt-6 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white/60">
                <span className="text-2xl font-light block" style={{ fontFamily: fontHeading, color: accent }}>
                  100%
                </span>
                <span className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">
                  Wild Levain
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/60">
                <span className="text-2xl font-light block" style={{ fontFamily: fontHeading, color: accent }}>
                  4 Local
                </span>
                <span className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">
                  Grain Mills
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white/60">
                <span className="text-2xl font-light block" style={{ fontFamily: fontHeading, color: accent }}>
                  0% Yeast
                </span>
                <span className="text-[10px] uppercase tracking-wider opacity-60 font-semibold">
                  No Commercials
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const About = Bakery2About;
export default Bakery2About;
