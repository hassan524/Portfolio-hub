// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaWhatsapp, FaEnvelope, FaRadio, FaLocationDot, FaCompass } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency3Contact: React.FC<ContactProps> = ({
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
    <section id="contact" className="relative w-full py-28 bg-[#0E0C09] text-[#F5EFEB] border-t border-[#29241E]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F59E0B] font-bold block">
            <Editable value={p.contactSub || "BUSH HEADQUARTERS // EXPEDITION ALLOCATION"} onChange={(v) => handleUpdate("contactSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-sans">
            <Editable value={p.contactTitle || "Contact the Head Ranger Desk"} onChange={(v) => handleUpdate("contactTitle", v)} />
          </h2>
          <p className="text-base text-[#A89E90] font-light leading-relaxed">
            Due to our commitment to radical low-impact conservation (strictly 6 to 8 luxury tents per wilderness sector), all departures are assigned through direct consultation.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Direct WhatsApp Safari Desk */}
          <a
            href="https://wa.me/254711000000"
            target="_blank"
            rel="noreferrer"
            className="p-8 md:p-10 rounded-2xl bg-[#16120D] border border-[#2D251A] hover:border-[#D97706] transition-all group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center text-xl">
                <FaWhatsapp />
              </div>
              <h3 className="font-bold text-xl text-white group-hover:text-[#F59E0B] transition-colors">
                Bush Ranger WhatsApp Desk
              </h3>
              <p className="text-xs font-mono text-[#A89E90] leading-relaxed">
                Connect directly with our field logistics operations in Arusha & Maun for immediate tent availability and light aircraft connections.
              </p>
            </div>
            <div className="pt-4 border-t border-[#292218] flex items-center justify-between font-mono text-xs">
              <span className="text-white font-bold">+254 711 000 000</span>
              <span className="text-emerald-400 font-semibold">Active In Field</span>
            </div>
          </a>

          {/* Card 2: Official Expedition Manifest */}
          <a
            href="mailto:ranger@nomadicsafari.org"
            className="p-8 md:p-10 rounded-2xl bg-[#16120D] border border-[#2D251A] hover:border-[#D97706] transition-all group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-800/60 text-[#F59E0B] flex items-center justify-center text-xl">
                <FaEnvelope />
              </div>
              <h3 className="font-bold text-xl text-white group-hover:text-[#F59E0B] transition-colors">
                Expedition Manifest Office
              </h3>
              <p className="text-xs font-mono text-[#A89E90] leading-relaxed">
                Submit private camp buyout requests, private bush plane charter itineraries, and wildlife photography permit inquiries.
              </p>
            </div>
            <div className="pt-4 border-t border-[#292218] flex items-center justify-between font-mono text-xs">
              <span className="text-white font-bold">ranger@nomadicsafari.org</span>
              <span className="text-[#F59E0B] font-semibold">Direct Desk</span>
            </div>
          </a>

          {/* Card 3: Bush Radio & Airstrip Waypoint */}
          <div className="p-8 md:p-10 rounded-2xl bg-[#16120D] border border-[#2D251A] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#211B14] border border-[#3A3022] text-[#F59E0B] flex items-center justify-center text-xl">
                <FaRadio />
              </div>
              <h3 className="font-bold text-xl text-white">
                Bush Plane Radio & Airstrip
              </h3>
              <p className="text-xs font-mono text-[#A89E90] leading-relaxed">
                Seronera Airstrip (SEU) & Maun Private Concession Airstrip. VHF Aviation Frequency 118.5 MHz.
              </p>
            </div>
            <div className="pt-4 border-t border-[#292218] flex items-center justify-between font-mono text-xs">
              <span className="text-white font-bold">Airstrip GPS: 02°27'S 34°49'E</span>
              <span className="text-slate-400">ICAO: HTSN</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency3Contact;
