// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1About({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#111827";
  const ink2 = theme?.["ink-second"] || "#5B6472";
  const accent = theme?.accent || "#87D53C";
  const surface = theme?.surface || "#FFFFFF";
  const pillars = props.pillars || [
    { title: "Tactile, not flat", desc: "3D and illustrated systems that feel like objects, not stock graphics.", tint: accent },
    { title: "Made for you", desc: "Every character, icon and layout is custom. No recycled templates.", tint: "#7DD3FC" },
    { title: "Quick and smooth", desc: "Interactive work that stays fast on phones and older devices.", tint: "#FDA4AF" },
  ];
  const facts = props.facts || [{ n: "120+", l: "Projects delivered" }, { n: "40", l: "Brands launched" }, { n: "98%", l: "Clients return" }, { n: "12", l: "Awards" }];
  const set = (k: string) => (v: string) => onChange?.({ [k]: v });
  return (
    <section id="about" className="py-20 sm:py-28" style={{ background: bg, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 mb-14">
          <h2 className="lg:col-span-7 font-black tracking-tighter leading-[1] text-[clamp(2rem,5.5vw,4rem)]">
            <Editable value={props.aboutTitle || "A small studio making digital work feel physical."} onChange={set("aboutTitle")} />
          </h2>
          <p className="lg:col-span-5 leading-relaxed text-base sm:text-lg self-end" style={{ color: ink2 }}>
            <Editable value={props.aboutDescription || "We are modelers, designers and developers who work directly with founders and brand teams, from first sketch to launch day."} onChange={set("aboutDescription")} />
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {facts.map((f: any) => (
            <div key={f.l} className="p-5 rounded-2xl border-2" style={{ borderColor: ink }}>
              <div className="text-3xl sm:text-4xl font-black">{f.n}</div>
              <div className="text-xs sm:text-sm font-semibold" style={{ color: ink2 }}>{f.l}</div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p: any, i: number) => (
            <motion.div key={p.title} whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }} className="p-7 rounded-3xl border-2 flex flex-col gap-4" style={{ background: surface, borderColor: ink, boxShadow: `5px 5px 0 ${ink}` }}>
              <span className="w-12 h-12 rounded-2xl border-2" style={{ background: p.tint, borderColor: ink }} />
              <h3 className="text-xl font-black">{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: ink2 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DigitalAgency1About;