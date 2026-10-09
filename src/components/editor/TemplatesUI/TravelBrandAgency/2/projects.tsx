// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaLocationDot, FaArrowRight, FaStar } from "react-icons/fa6";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency2Projects: React.FC<ProjectsProps> = ({
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
    <section id="projects" className="relative w-full py-24 md:py-32 bg-[#FAF9F6] text-stone-900 font-['Poppins',sans-serif] border-b border-stone-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 block mb-2">
              <Editable value={p.projSub || "Private Sanctuary Collection"} onChange={(v) => handleUpdate("projSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900">
              <Editable value={p.projTitle || "Curated Seasonal Estates"} onChange={(v) => handleUpdate("projTitle", v)} />
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Strictly limited to 12 private residences per season
          </span>
        </div>

        {/* Luxury Magazine Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Bento Item 1: Large Featured Card (Spans 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md group flex flex-col justify-between">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80"
                alt="Santorini Private Caldera Villa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-stone-900 text-white text-[11px] font-semibold">
                Private Buyout
              </div>
              <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-stone-900 shadow-md">
                $4,200 / night
              </div>
            </div>

            <div className="p-8 space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-700 font-semibold uppercase tracking-wider">
                <FaLocationDot />
                <span>Oia Caldera, Santorini</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-stone-900 group-hover:text-amber-700 transition-colors">
                The Obsidian Cliffside Pavilion
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed font-light">
                Perched 300 meters above the Aegean with private heli-pad access, two heated infinity seawater pools, and 24h sommelier service.
              </p>
            </div>
          </div>

          {/* Bento Item 2 & 3: Stacked Cards (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            
            {/* Top Stacked Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md group flex-1 flex flex-col sm:flex-row">
              <div className="sm:w-1/2 relative aspect-[4/3] sm:aspect-auto overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
                  alt="Tuscany Olive Estate"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-700">Val d'Orcia, Tuscany</span>
                  <h4 className="text-lg font-bold font-serif text-stone-900">Castello delle Rose</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    14th-century stone farmhouse surrounded by private Brunello vineyards.
                  </p>
                </div>
                <span className="text-xs font-bold text-stone-900 block">$2,800 / night</span>
              </div>
            </div>

            {/* Bottom Stacked Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md group flex-1 flex flex-col sm:flex-row">
              <div className="sm:w-1/2 relative aspect-[4/3] sm:aspect-auto overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                  alt="Mallorca Deià Sanctuary"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-700">Deià, Mallorca</span>
                  <h4 className="text-lg font-bold font-serif text-stone-900">Finca Tramuntana</h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Ancient olive groves, secluded rocky cove swimming, and private chef.
                  </p>
                </div>
                <span className="text-xs font-bold text-stone-900 block">$3,100 / night</span>
              </div>
            </div>

          </div>

          {/* Bento Item 4: Full Panoramic Banner Card below (Spans 12 cols) */}
          <div className="lg:col-span-12 bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-6 relative aspect-[16/9] md:aspect-auto md:h-full">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                alt="Superyacht Charter Mediterranean"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-6 p-8 md:p-12 space-y-4">
              <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">CHARTER FLEET</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                Private Riva & Sanlorenzo Yacht Charters
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                Sail between Monaco, Portofino, and Capri with our bespoke fleet. Includes dedicated master captain, private Michelin-trained chef, and customized wine cellars.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-sm font-bold text-stone-900">From $18,000 / week</span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-stone-900 hover:bg-amber-700 transition-colors"
                >
                  <span>Request Berth Dossier</span>
                  <FaArrowRight className="text-[10px]" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency2Projects;
