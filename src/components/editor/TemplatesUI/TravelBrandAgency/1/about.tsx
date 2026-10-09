// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaCompass, FaShieldHeart, FaHeadset, FaHotel } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency1About: React.FC<AboutProps> = ({
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

  const features = [
    {
      title: "Bespoke Itineraries",
      desc: "Every journey is customized around your rhythm, interests, and culinary desires.",
      icon: <FaCompass className="text-emerald-600 text-2xl" />,
    },
    {
      title: "Handpicked Luxury Stays",
      desc: "From private cliffside villas to boutique beach bungalows, we vet every property in person.",
      icon: <FaHotel className="text-emerald-600 text-2xl" />,
    },
    {
      title: "24/7 Global Concierge",
      desc: "Dedicated personal travel directors ready via direct call or WhatsApp throughout your trip.",
      icon: <FaHeadset className="text-emerald-600 text-2xl" />,
    },
    {
      title: "Seamless Travel Protection",
      desc: "Comprehensive flexible booking policies, flight monitoring, and round-the-clock safety coverage.",
      icon: <FaShieldHeart className="text-emerald-600 text-2xl" />,
    },
  ];

  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-white text-slate-900 font-['Poppins',sans-serif]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-20">
        
        {/* Section Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 block">
              <Editable value={p.aboutSub || "Why Travel With Voyare"} onChange={(v) => handleUpdate("aboutSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              <Editable
                value={p.aboutTitle || "Crafting extraordinary adventures that linger in memory forever."}
                onChange={(v) => handleUpdate("aboutTitle", v)}
              />
            </h2>
          </div>
          <div className="lg:col-span-5 text-slate-600 text-base font-normal leading-relaxed">
            <p>
              We believe travel is more than ticking off landmarks. It is the joy of arriving at sunrise in a quiet lagoon, dining in family-owned olive groves, and returning home truly rejuvenated.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid (Clean White Aesthetic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/60 shadow-sm flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Impressive Modern Stats Row */}
        <div className="p-10 rounded-3xl bg-emerald-950 text-white grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-xl">
          <div>
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-400 block mb-1">150+</span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium uppercase tracking-wider">Curated Destinations</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-400 block mb-1">45k+</span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium uppercase tracking-wider">Happy Travelers</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-400 block mb-1">99.4%</span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium uppercase tracking-wider">Satisfaction Rate</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-400 block mb-1">24/7</span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium uppercase tracking-wider">Personal Concierge</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency1About;
