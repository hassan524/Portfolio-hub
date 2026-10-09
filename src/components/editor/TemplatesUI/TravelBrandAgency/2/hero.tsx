// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaMagnifyingGlass, FaLocationDot, FaCalendarDay, FaUserGroup, FaStar } from "react-icons/fa6";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency2Hero: React.FC<HeroProps> = ({
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

  const [dest, setDest] = useState("Amalfi Coast, Italy");
  const [dates, setDates] = useState("Jun 14 – Jun 21");
  const [guests, setGuests] = useState("2 Guests");

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#FAF9F6] text-stone-900 font-['Poppins',sans-serif] overflow-hidden border-b border-stone-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Search Engine & Editorial Narrative */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-stone-900 leading-[1.08]">
              <Editable value={p.hero1 || "Curated Escapes for"} onChange={(v) => handleUpdate("hero1", v)} />
              <span className="block italic text-amber-700 font-normal">
                <Editable value={p.hero2 || "Discerning Travelers."} onChange={(v) => handleUpdate("hero2", v)} />
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl font-normal leading-relaxed">
              <Editable
                value={
                  p.heroDesc ||
                  "Private villas, secluded island charters, and handpicked boutique sanctuaries. We match your rhythm to the world's most serene coastlines."
                }
                onChange={(v) => handleUpdate("heroDesc", v)}
              />
            </p>
          </div>

          {/* Integrated Live Trip Search Bar Widget */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-stone-200 shadow-xl space-y-4 max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Destination */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider mb-1 flex items-center gap-1">
                  <FaLocationDot className="text-amber-700" />
                  <span>Destination</span>
                </span>
                <input
                  type="text"
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none"
                />
              </div>

              {/* Dates */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider mb-1 flex items-center gap-1">
                  <FaCalendarDay className="text-amber-700" />
                  <span>Travel Window</span>
                </span>
                <input
                  type="text"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none"
                />
              </div>

              {/* Guests */}
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-100">
                <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider mb-1 flex items-center gap-1">
                  <FaUserGroup className="text-amber-700" />
                  <span>Guests</span>
                </span>
                <input
                  type="text"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-stone-900 focus:outline-none"
                />
              </div>

            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-stone-400 font-medium">Over 200+ exclusive off-market villas</span>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-stone-900 hover:bg-amber-700 transition-colors shadow-md"
              >
                <FaMagnifyingGlass />
                <span>Search Escapes</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Featured Destination Card Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
                alt="Amalfi Coast Luxury Retreat"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Price & Details Pill */}
            <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-stone-200 text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <span className="text-amber-700 font-extrabold">From $3,400</span>
              <span className="text-stone-400 font-normal">/ week</span>
            </div>

            {/* Bottom Card Footer */}
            <div className="p-6 bg-white space-y-2 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">FEATURED VOYAGE</span>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <FaStar />
                  <span className="font-bold text-stone-800">4.99 (92 Reviews)</span>
                </div>
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900">
                Villa Treville & Private Riva Charter, Positano
              </h3>
              <p className="text-xs text-stone-500 font-light">
                Private cliffside estate with infinity sea pool, direct beach lift, and daily skippered boat service.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency2Hero;
