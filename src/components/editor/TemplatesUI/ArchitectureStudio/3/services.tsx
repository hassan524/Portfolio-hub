// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Check, Cpu, Layers, Maximize, ShieldCheck } from "lucide-react";

export function ArchitectureStudio3Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#121215";
  const ink = theme?.ink || "#FFFFFF";
  const fontBody = theme?.fontBody || "DM Sans";
  const [activeTab, setActiveTab] = useState(0);

  const disciplines = [
    {
      num: "01",
      title: "Monumental Architecture",
      subtitle: "Civic Arenas, Cultural Centers & High-Density Towers",
      desc: "We originate audacious sculptural forms designed to anchor urban masterplans. From seismic engineering to parametric glass diagrids, our buildings celebrate the sheer power of volume.",
      deliverables: ["Full architectural design", "Computational solar envelope", "Municipal permit filing", "On-site construction direction"],
      icon: Maximize,
    },
    {
      num: "02",
      title: "Ecological Engineering",
      subtitle: "Carbon-Neutral Envelope Design & Geothermal Integration",
      desc: "Architecture that produces more energy than it consumes. We weave subterranean heat exchangers, low-temperature hydronics, and hygroscopic timber structures into every commission.",
      deliverables: ["Net-zero energy modeling", "Embodied carbon audit", "Passivhaus envelope testing", "Life-cycle cost optimization"],
      icon: Cpu,
    },
    {
      num: "03",
      title: "Adaptive Regeneration",
      subtitle: "Transforming Industrial Monoliths into Cultural Venues",
      desc: "Respectful intervention within heritage fabrics. We juxtapose raw historical brickwork and cast-iron frames with razor-sharp contemporary glass insertions.",
      deliverables: ["Historic fabric analysis", "Structural underpinning", "Heritage authority liaison", "Contemporary interior fitout"],
      icon: Layers,
    },
    {
      num: "04",
      title: "BIM Level 3 Coordination",
      subtitle: "Computational Precision & Digital Twin Handover",
      desc: "Zero discrepancy between virtual design and physical construction. Every bolt, conduit, and facade panel is coordinated within a millimeter-precise digital twin.",
      deliverables: ["Clash detection modeling", "4D schedule sequencing", "CNC fabrication data dispatch", "Full digital asset twin"],
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="services"
      className="w-full px-6 md:px-12 lg:px-16 py-24 md:py-36 transition-colors border-b"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/12">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/70 block mb-3">
              <Editable value="03 // CAPABILITIES & DISCIPLINES" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight leading-none text-white"
              value={props?.title || "Radical technical depth."}
            />
          </div>

          <div className="font-mono text-xs text-white/60">
            <span>METHOD: EXPERIMENTAL COMPUTATION</span>
          </div>
        </div>

        {/* 4 Interactive Disciplines Grid with Rich Animations */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tab Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {disciplines.map((d, i) => {
              const Icon = d.icon;
              const isSelected = activeTab === i;
              return (
                <motion.div
                  key={d.num}
                  onClick={() => setActiveTab(i)}
                  whileHover={{ x: 4 }}
                  className="p-6 border cursor-pointer transition-all flex items-center justify-between"
                  style={{
                    backgroundColor: isSelected ? "rgba(255,255,255,0.08)" : "#09090B",
                    borderColor: isSelected ? "#FFFFFF" : "rgba(255,255,255,0.12)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-bold text-white/60">{d.num}</span>
                    <div>
                      <h3 className="text-base font-bold uppercase tracking-wider text-white">
                        {d.title}
                      </h3>
                      <p className="text-[11px] font-mono text-white/50">{d.subtitle}</p>
                    </div>
                  </div>
                  <Icon size={18} className={isSelected ? "text-white" : "text-white/30"} />
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Active Discipline Deep Dive */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 md:p-12 border border-white/20 bg-[#09090B] shadow-2xl flex flex-col justify-between min-h-[420px]"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/12 font-mono text-xs">
                    <span className="text-white/60">DISCIPLINE FILE // {disciplines[activeTab].num}</span>
                    <span className="text-white font-bold uppercase">METHODOLOGY SPECIFICATION</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4">
                    {disciplines[activeTab].title}
                  </h3>

                  <p className="text-sm md:text-base leading-relaxed text-white/80 font-light mb-8">
                    {disciplines[activeTab].desc}
                  </p>

                  <div className="mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest block mb-4 text-white font-bold">
                      CORE DELIVERABLES & TECHNICAL SCOPE:
                    </span>
                    <div className="grid sm:grid-cols-2 gap-3 text-xs font-mono">
                      {disciplines[activeTab].deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-white/80">
                          <Check size={14} className="text-white shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/12 flex items-center justify-between font-mono text-xs">
                  <span className="text-white/50">REQUEST DETAILED SCOPE PDF</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 font-bold text-white uppercase hover:underline"
                  >
                    <span>INITIATE COMMISSION</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Services = ArchitectureStudio3Services;
export default ArchitectureStudio3Services;
