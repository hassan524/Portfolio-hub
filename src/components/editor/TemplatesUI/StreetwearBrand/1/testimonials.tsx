// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaQuoteLeft, FaBarcode, FaCheck } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand1Testimonials: React.FC<TestimonialsProps> = ({
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

  const reviews = [
    {
      id: "rev-1",
      buyer: "Kenji Takahashi",
      city: "Shibuya, Tokyo",
      garment: "Tactical Oversized Box Hood (Serial #014/120)",
      quote:
        "The 480GSM loopback has the exact stiff architectural structure I've hunted for in vintage Japanese workwear. The hood actually stands up without collapsing. Best construction in contemporary streetwear.",
    },
    {
      id: "rev-2",
      buyer: "Astrid Lindau",
      city: "Mitte, Berlin",
      garment: "Articulated Cyber Cargo Pant (Serial #009/100)",
      quote:
        "Worn on 12-hour DJ sets and international flights. The magnetic Fidlock system and knee articulation are impeccably balanced. Functional technical wear elevated to high fashion.",
    },
  ];

  return (
    <section id="testimonials" className="relative w-full py-28 bg-[#0B0B0E] text-white border-b border-rose-950/60 font-mono">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-rose-950 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-rose-500 font-bold block mb-3">
              <Editable value={p.testSub || "ARCHIVE COLLECTORS // VERIFIED DISPATCH"} onChange={(v) => handleUpdate("testSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              <Editable value={p.testTitle || "Field Reports from the Underground"} onChange={(v) => handleUpdate("testTitle", v)} />
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 px-4 py-2 border border-rose-900/60">
            <FaCheck />
            <span>SERIAL STAMPED PURCHASES ONLY</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-8 md:p-10 bg-[#121218] border border-rose-950/80 space-y-6 hover:border-rose-500 transition-all duration-300"
            >
              <div className="flex items-center justify-between border-b border-rose-950/60 pb-4 text-xs">
                <span className="text-rose-400 font-bold">{r.garment}</span>
                <span className="text-slate-500">{r.city}</span>
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-2xl text-rose-500/30 mb-3" />
                <p className="text-base sm:text-lg text-slate-200 font-light leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-rose-950/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white text-sm font-sans">{r.buyer}</h4>
                  <span className="text-slate-500">Verified Collector</span>
                </div>
                <FaBarcode className="text-rose-500 text-lg" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand1Testimonials;
