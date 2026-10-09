// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaPaw, FaCampground, FaShieldCat } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency3About: React.FC<AboutProps> = ({
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

  const pillars = [
    {
      code: "PROTOCOL-01",
      title: "Generational Indigenous Trackers",
      desc: "Our field guides are elder Maasai and San trackers who read the wind, soil depressions, and bird distress calls with intuition no GPS can replicate.",
      icon: <FaPaw className="text-[#F59E0B] text-xl" />,
    },
    {
      code: "PROTOCOL-02",
      title: "Nomadic Canvas Footprint",
      desc: "Our luxury tented camps move with the animal migrations. When we dismantle camp, not a single footprint remains on the savannah grasslands.",
      icon: <FaCampground className="text-[#F59E0B] text-xl" />,
    },
    {
      code: "PROTOCOL-03",
      title: "Community Wildlife Corridors",
      desc: "70% of every berth booking fee funds direct anti-poaching aerial patrols and community conservancy lease payments to indigenous landowners.",
      icon: <FaShieldCat className="text-[#F59E0B] text-xl" />,
    },
  ];

  return (
    <section id="about" className="relative w-full py-28 bg-[#110F0B] text-[#F5EFEB] border-t border-[#29241E]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F59E0B] font-bold block">
            <Editable value={p.aboutSub || "THE NOMADIC WILDERNESS MANIFESTO"} onChange={(v) => handleUpdate("aboutSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-sans">
            <Editable
              value={p.aboutTitle || "Preserving the Great Animal Kingdoms Through Radical Low-Impact Immersion"}
              onChange={(v) => handleUpdate("aboutTitle", v)}
            />
          </h2>
          <p className="text-base text-[#BDB2A4] font-light leading-relaxed">
            We don't build concrete lodges that disrupt migration pathways. We live with the wilderness as guests, beneath canvas under unpolluted southern star constellations.
          </p>
        </div>

        {/* 3 Pillars Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {pillars.map((item) => (
            <div
              key={item.code}
              className="p-8 rounded-2xl bg-[#181510] border border-[#2B251D] space-y-6 hover:border-[#D97706]/60 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between border-b border-[#2B251D] pb-4">
                <span className="font-mono text-xs text-[#F59E0B] font-bold tracking-widest">{item.code}</span>
                <div className="w-10 h-10 rounded-lg bg-[#241F16] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#F59E0B] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#A89E90] leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency3About;
