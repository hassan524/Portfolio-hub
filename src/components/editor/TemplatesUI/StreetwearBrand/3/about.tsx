// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaFire, FaHammer, FaBookOpen } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand3About: React.FC<AboutProps> = ({
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
      badge: "CHAPTER 01",
      title: "Hand-Pulled Williamsburg Screenprints",
      desc: "Every graphic is manually pulled with high-density plastisol and water-based discharge inks in our South 4th Street basement shop. No automated heat transfers, ever.",
      icon: <FaFire className="text-black text-xl" />,
    },
    {
      badge: "CHAPTER 02",
      title: "7-Ply Canadian Hard Rock Maple",
      desc: "Cold-pressed with waterproof epoxy resin under 200 PSI. Unmatched pop, steep concave kicks, and razor edge slide resilience on rough Brooklyn curbs.",
      icon: <FaHammer className="text-black text-xl" />,
    },
    {
      badge: "CHAPTER 03",
      title: "DIY Concrete & Quarterly Zine",
      desc: "Every purchase directly funds bags of Quickrete for rogue skate spot creation under the BQE, accompanied by our newsprint skate photo zine.",
      icon: <FaBookOpen className="text-black text-xl" />,
    },
  ];

  return (
    <section id="about" className="relative w-full py-28 bg-[#F4F3EE] text-black border-b-4 border-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="inline-block bg-black text-[#FACC15] font-black text-xs px-3 py-1 uppercase tracking-widest border-2 border-black rotate-[-1deg]">
            <Editable value={p.aboutSub || "THE CONCRETE NYC ZINE // VOL. 09"} onChange={(v) => handleUpdate("aboutSub", v)} />
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-sans">
            <Editable
              value={p.aboutTitle || "Built by Skaters for Rough Pavement and Broken Curbs"}
              onChange={(v) => handleUpdate("aboutTitle", v)}
            />
          </h2>
          <p className="text-base text-[#262626] font-bold leading-relaxed">
            We started in 2018 pressing decks out of a van parked near Tompkins Square Park. Today, our heavyweight hoodies and hardgoods remain 100% rider owned and operated.
          </p>
        </div>

        {/* 3 Pillars Matrix with Thick Black Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {pillars.map((item) => (
            <div
              key={item.badge}
              className="bg-white p-8 border-4 border-black shadow-[6px_6px_0px_#000] space-y-6 hover:shadow-[10px_10px_0px_#2563EB] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                <span className="bg-[#FACC15] text-black font-black text-xs px-2.5 py-1 border-2 border-black">
                  {item.badge}
                </span>
                <div className="w-10 h-10 bg-[#E5E5E0] border-2 border-black flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-black uppercase font-sans">
                {item.title}
              </h3>
              <p className="text-sm text-[#404040] leading-relaxed font-bold">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand3About;
