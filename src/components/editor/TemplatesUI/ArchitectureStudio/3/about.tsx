// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Box, Compass, Layers, ShieldCheck } from "lucide-react";

export function ArchitectureStudio3About({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#121215";
  const ink = theme?.ink || "#FFFFFF";
  const fontBody = theme?.fontBody || "DM Sans";

  const pillars = [
    {
      num: "01",
      tag: "RADICAL PURITY",
      title: "Volumetric Clarity",
      text: "We strip away decorative excess so that monumental geometries, lightwells, and shadows sculpt the spatial experience.",
      icon: Box,
    },
    {
      num: "02",
      tag: "TECTONIC SHADOW",
      title: "Deep Daylight Carving",
      text: "Designing apertures and brise-soleil blades that turn raw sunlight into shifting patterns across dark basalt and concrete.",
      icon: Compass,
    },
    {
      num: "03",
      tag: "CARBON ZERO",
      title: "Biophilic Precision",
      text: "Employing cross-laminated Nordic timber, recycled glass aggregates, and geothermal thermodynamics for net-negative carbon footprints.",
      icon: Layers,
    },
    {
      num: "04",
      tag: "PERMANENCE",
      title: "Generational Life",
      text: "Architecture calculated to endure centuries of weather, developing natural mineral patinas without requiring synthetic maintenance.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="about"
      className="w-full px-6 md:px-12 lg:px-16 py-24 md:py-36 transition-colors border-b"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end pb-16 border-b border-white/12">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/70 block mb-3">
              <Editable value="01 // PRACTICE MANIFESTO" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight leading-[0.95] text-white"
              value={props?.title || "Built on radical curiosity."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <Editable
              as="p"
              className="text-base md:text-lg leading-relaxed text-white/80 font-light"
              value={
                props?.description ||
                "AMB·TIOUS is an experimental architecture and spatial laboratory based in Northern Europe. We craft monumental civic halls, residential monoliths, and cultural institutions defined by raw material honesty."
              }
              onChange={(v) => onChange?.({ description: v })}
            />

            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-white underline underline-offset-8 hover:text-white/80 transition-colors"
            >
              <Editable value="EXPLORE BUILT WORKS ARCHIVE" />
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* 4-Box Monolithic Grid with Animations */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 py-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.4)" }}
                className="p-8 border border-white/12 flex flex-col justify-between transition-colors bg-[#0D0D10]"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs">
                    <span className="font-bold text-white text-base">{item.num}</span>
                    <Icon size={16} className="text-white/60" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest block mb-2 text-white/60">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/75 font-sans">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quantitative Counter Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/12 font-mono text-xs">
          {[
            { val: "24+", label: "DESIGN AWARDS", note: "MIES SHORTLIST & CIVIC" },
            { val: "58", label: "BUILT COMMISSIONS", note: "PUBLIC & PRIVATE" },
            { val: "100%", label: "SUSTAINABLE TIMBER", note: "FSC CERTIFIED FABRIC" },
            { val: "06", label: "EUROPEAN HUBS", note: "HELSINKI TO BERLIN" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-white">{stat.val}</span>
              <span className="font-semibold text-white/90 text-[11px]">{stat.label}</span>
              <span className="text-[10px] text-white/50">{stat.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const About = ArchitectureStudio3About;
export default ArchitectureStudio3About;
