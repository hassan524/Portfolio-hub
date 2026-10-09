// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaGem, FaKey, FaHandHoldingHeart } from "react-icons/fa6";

interface AboutProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency2About: React.FC<AboutProps> = ({
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

  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-white text-stone-900 font-['Poppins',sans-serif] border-b border-stone-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Big Vertical Photography with Floating Note */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4] relative">
            <img
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80"
              alt="Mediterranean Coastal Estate"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Curator Quote Box */}
          <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-6 rounded-2xl shadow-2xl border border-stone-200 max-w-xs space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 block">FOUNDER'S NOTE</span>
            <p className="text-xs text-stone-700 italic font-serif">
              "We never book a villa or yacht we haven't personally walked through and approved with our own eyes."
            </p>
            <span className="text-[11px] font-bold text-stone-900 block">— Elena Vance, Principal Curator</span>
          </div>
        </div>

        {/* Right Column: Narrative Stories */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 block">
              <Editable value={p.aboutSub || "Our Curatorial Ethos"} onChange={(v) => handleUpdate("aboutSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
              <Editable
                value={p.aboutTitle || "Bespoke travel crafted as fine art, not assembly-line tourism."}
                onChange={(v) => handleUpdate("aboutTitle", v)}
              />
            </h2>
            <p className="text-base text-stone-600 font-light leading-relaxed">
              Founded over two decades ago in Monaco, Aura Travel serves a discerning global community of founders, artists, and families seeking deep relaxation and authentic cultural connection.
            </p>
          </div>

          {/* 3 Editorial Pillars */}
          <div className="space-y-6 pt-2">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-amber-700 text-lg flex-shrink-0">
                <FaKey />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-stone-900 font-serif">Off-Market Villa Portfolios</h4>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                  Direct relationships with aristocratic estate owners across Tuscany, Mallorca, and the Cyclades.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-amber-700 text-lg flex-shrink-0">
                <FaGem />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-stone-900 font-serif">Private Aviation & Marine Transfers</h4>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                  Seamless helicopter shuttles and private mahogany tenders straight from the tarmac to your terrace.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-amber-700 text-lg flex-shrink-0">
                <FaHandHoldingHeart />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-stone-900 font-serif">Dedicated Personal Butler Service</h4>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                  Private in-villa chefs, sommeliers, and personal drivers on call for the entirety of your residency.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency2About;
