// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaPaw, FaMoon, FaCompass, FaLocationDot } from "react-icons/fa6";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency3Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const camps = [
    {
      id: "serengeti",
      code: "SAFARI-01",
      title: "Serengeti Great Migration Mobile Camp",
      region: "Tanzania — Mara River Crossing Corridor",
      duration: "8 Days / 7 Nights",
      wildlife: "Wildebeest river plunge, apex lion prides, cheetah stalking",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      description:
        "Positioned directly along the Mara River crossings. Fall asleep to the rumbling calls of two million wildebeest and wake before dawn for open-sided 4x4 tracker expeditions.",
      season: "July – October 2026",
      berths: "Max 12 Guests (6 Canvas Suites)",
    },
    {
      id: "okavango",
      code: "SAFARI-02",
      title: "Okavango Delta Private Island & Mokoro Safari",
      region: "Botswana — Deep Water Wilderness Concession",
      duration: "7 Days / 6 Nights",
      wildlife: "African wild dog packs, swimming elephants, leopard territory",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
      description:
        "Glide silently through lily-choked channels on handcrafted dugout mokoros. A deep-water sanctuary accessible exclusively by private charter Cessna airstrip.",
      season: "May – November 2026",
      berths: "Max 10 Guests (5 Water Pavilions)",
    },
    {
      id: "namib",
      code: "SAFARI-03",
      title: "Sossusvlei Desert Dunes & Dark Sky Astronomy",
      region: "Namibia — Sossusvlei Red Dunes & Deadvlei",
      duration: "6 Days / 5 Nights",
      wildlife: "Desert-adapted gemsbok, brown hyenas, Milky Way astrophotography",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
      description:
        "Climb the monumental red dunes of Big Daddy at first light. By night, our resident astronomer leads deep-space viewing through research-grade computerized telescopes.",
      season: "Year-Round Departures",
      berths: "Max 12 Guests (6 Star Beds)",
    },
  ];

  const [activeCamp, setActiveCamp] = useState(camps[0]);

  return (
    <section id="projects" className="relative w-full py-28 bg-[#0D0B09] text-[#F5EFEB] border-t border-[#29241E]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#29241E] pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F59E0B] font-bold block mb-3">
              <Editable value={p.projSub || "WILDERNESS EXPEDITIONS // 2026-2027"} onChange={(v) => handleUpdate("projSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-sans">
              <Editable value={p.projTitle || "Untamed Safari Camps"} onChange={(v) => handleUpdate("projTitle", v)} />
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#A89E90]">
            <FaMoon className="text-[#F59E0B]" />
            <span>International Dark-Sky Reserve Accredited Camps</span>
          </div>
        </div>

        {/* Camp Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {camps.map((camp) => {
            const isSelected = activeCamp.id === camp.id;
            return (
              <button
                key={camp.id}
                onClick={() => setActiveCamp(camp)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-[#211B14] border-[#D97706] shadow-[0_0_25px_rgba(217,119,6,0.25)]"
                    : "bg-[#14110D] border-[#2B241C] hover:border-[#42382D]"
                }`}
              >
                <div className="flex items-center justify-between mb-3 font-mono text-xs">
                  <span className="text-[#F59E0B] font-bold tracking-widest">{camp.code}</span>
                  <span className="text-[#8C8070]">{camp.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{camp.title}</h3>
                <p className="text-xs text-[#A89E90] flex items-center gap-2 font-mono mb-4">
                  <FaLocationDot className="text-[#F59E0B] text-[10px]" />
                  <span>{camp.region}</span>
                </p>
                <div className="pt-3 border-t border-[#29221A] text-xs font-mono flex items-center justify-between">
                  <span className="text-amber-500/90">{camp.season}</span>
                  <span className="text-white/60">{camp.berths}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Camp Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCamp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-[#332A20] bg-gradient-to-b from-[#18140F] to-[#100D0A] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
          >
            {/* Image */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px]">
              <img
                src={activeCamp.image}
                alt={activeCamp.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100D0A] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#18140F]" />
              <div className="absolute bottom-6 left-6 font-mono text-xs bg-black/75 backdrop-blur-md px-4 py-2 rounded-lg border border-[#D97706]/40 text-[#F5EFEB] flex items-center gap-2">
                <FaCompass className="text-[#F59E0B]" />
                <span>SECTOR: {activeCamp.region}</span>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#F59E0B] uppercase tracking-widest font-bold block">
                    CAMP DOSSIER // {activeCamp.code}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                    {activeCamp.title}
                  </h3>
                </div>

                <p className="text-sm text-[#C4B7A7] leading-relaxed font-light">
                  {activeCamp.description}
                </p>

                <div className="p-4 rounded-xl bg-[#211B14] border border-[#332B22] space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#F59E0B] font-bold">
                    <FaPaw />
                    <span>WILDLIFE PROFILE:</span>
                  </div>
                  <p className="text-[#E2D8CC] text-[11px] leading-relaxed">
                    {activeCamp.wildlife}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-[#29221A] flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-black bg-[#D97706] hover:bg-[#F59E0B] transition-all shadow-md"
                >
                  <span>Request Safari Dossier</span>
                  <FaArrowRight className="text-xs" />
                </a>
                <span className="text-xs font-mono text-[#8C8070]">
                  {activeCamp.berths}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TravelBrandAgency3Projects;
