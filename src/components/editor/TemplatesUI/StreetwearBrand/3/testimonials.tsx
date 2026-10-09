// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaQuoteLeft, FaLocationDot } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand3Testimonials: React.FC<TestimonialsProps> = ({
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

  const dispatches = [
    {
      id: "disp-1",
      rider: "Malik Ortiz",
      spot: "LES Coleman Skatepark / Manhattan",
      quote:
        "These 8.25 decks have the crispiest pop in the five boroughs. Skated the BQE underpass ledge for four straight weekends and the tail barely chipped. Real NYC quality.",
    },
    {
      id: "disp-2",
      rider: "Tasha 'Blaze' Miller",
      spot: "Tompkins Square Park / East Village",
      quote:
        "The 14oz reverse-weave hoodie is like armor for winter night sessions. You take a hard slam on cold pavement and don't even feel the scrape through the fleece.",
    },
  ];

  return (
    <section id="testimonials" className="relative w-full py-28 bg-[#F4F3EE] text-black border-b-4 border-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-black pb-8">
          <div>
            <span className="inline-block bg-[#FACC15] text-black font-black text-xs px-3 py-1 uppercase tracking-widest border-2 border-black rotate-[-1deg] mb-3">
              <Editable value={p.testSub || "TEAM RIDERS // STREET DISPATCHES"} onChange={(v) => handleUpdate("testSub", v)} />
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-sans">
              <Editable value={p.testTitle || "Word On The Streets"} onChange={(v) => handleUpdate("testTitle", v)} />
            </h2>
          </div>
          <div className="bg-black text-white px-4 py-2 border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#2563EB]">
            100% UNFILTERED RIDER FEEDBACK
          </div>
        </div>

        {/* Dispatches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dispatches.map((d) => (
            <div
              key={d.id}
              className="bg-white p-8 md:p-10 border-4 border-black shadow-[6px_6px_0px_#000] space-y-6 hover:shadow-[10px_10px_0px_#FACC15] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center justify-between border-b-2 border-black pb-4 text-xs font-black uppercase">
                <span className="text-[#2563EB] flex items-center gap-1.5">
                  <FaLocationDot />
                  {d.spot}
                </span>
                <span className="bg-[#FACC15] px-2 py-0.5 border border-black">VERIFIED RIDER</span>
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-3xl text-black/20 mb-3" />
                <p className="text-base sm:text-lg font-bold text-[#1A1A1A] leading-relaxed italic">
                  "{d.quote}"
                </p>
              </div>

              <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-black uppercase">
                <span className="text-lg font-black">{d.rider}</span>
                <span className="text-[#2563EB]">CONCRETE NYC TEAM</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand3Testimonials;
