// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaFire, FaQuoteLeft } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency3Testimonials: React.FC<TestimonialsProps> = ({
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

  const journals = [
    {
      id: "j-1",
      entry: "CAMPFIRE JOURNAL // ENTRY 418",
      location: "Northern Serengeti • Mara River Bluff",
      author: "David & Sarah Thorne",
      role: "Wilderness Fellows, London",
      quote:
        "Waking up to the deep rumble of male lions calling across the savannah while canvas flaps stirred in the morning breeze is an experience that changes how you see our planet. The guides knew every individual cheetah in the valley.",
    },
    {
      id: "j-2",
      entry: "CAMPFIRE JOURNAL // ENTRY 502",
      location: "Namib-Naukluft Dark Sky Outpost",
      author: "Dr. K. Henderson",
      role: "Astrophysicist, Caltech",
      quote:
        "The sky above the red dunes is so completely free of artificial photon pollution that the Magellanic Clouds cast visible shadows on the sand. An unmatched synthesis of deep luxury and raw cosmology.",
    },
  ];

  return (
    <section id="testimonials" className="relative w-full py-28 bg-[#110F0B] text-[#F5EFEB] border-t border-[#29241E]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#29241E] pb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F59E0B] font-bold block mb-3">
              <Editable value={p.testSub || "DISPATCHES FROM THE BUSH // CAMPFIRE ARCHIVE"} onChange={(v) => handleUpdate("testSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-sans">
              <Editable value={p.testTitle || "Voices of the Untamed"} onChange={(v) => handleUpdate("testTitle", v)} />
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#F59E0B] bg-[#1E1912] px-4 py-2 rounded-lg border border-[#3D3224]">
            <FaFire className="text-amber-500 animate-pulse" />
            <span>AUTHENTIC BUSH DISPATCHES</span>
          </div>
        </div>

        {/* Journals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {journals.map((j) => (
            <div
              key={j.id}
              className="p-8 md:p-10 rounded-2xl bg-[#18140F] border border-[#2D251A] space-y-6 hover:border-[#D97706]/60 transition-all duration-300"
            >
              <div className="flex items-center justify-between border-b border-[#292218] pb-4 font-mono text-xs">
                <span className="text-[#F59E0B] font-bold">{j.entry}</span>
                <span className="text-[#8C8070]">{j.location}</span>
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-2xl text-[#D97706]/30 mb-3" />
                <p className="text-base sm:text-lg text-[#E6DC CF] font-light leading-relaxed italic">
                  "{j.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#292218] flex items-center justify-between font-mono text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm font-sans">{j.author}</h4>
                  <span className="text-[#8C8070]">{j.role}</span>
                </div>
                <span className="text-[#F59E0B] font-semibold">VERIFIED DISPATCH</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency3Testimonials;
