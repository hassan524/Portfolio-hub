// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaWhatsapp, FaEnvelope, FaLocationDot, FaClock } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand3Contact: React.FC<ContactProps> = ({
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
    <section id="contact" className="relative w-full py-28 bg-[#F4F3EE] text-black border-b-4 border-black">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="inline-block bg-black text-[#FACC15] font-black text-xs px-3 py-1 uppercase tracking-widest border-2 border-black rotate-[1deg]">
            <Editable value={p.contactSub || "WILLIAMSBURG STORE // DROP IN"} onChange={(v) => handleUpdate("contactSub", v)} />
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-sans">
            <Editable value={p.contactTitle || "Pull Up To The Clubhouse"} onChange={(v) => handleUpdate("contactTitle", v)} />
          </h2>
          <p className="text-base text-[#262626] font-bold leading-relaxed">
            Our physical storefront and screenprinting workshop in Brooklyn is open daily. Come grip a fresh board, flip through the latest photo zine, or grab cold drinks.
          </p>
        </div>

        {/* Contact Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Skate Shop WhatsApp Hotline */}
          <a
            href="https://wa.me/17185550199"
            target="_blank"
            rel="noreferrer"
            className="bg-white p-8 md:p-10 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#2563EB] hover:-translate-y-1 transition-all group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#FACC15] border-2 border-black flex items-center justify-center text-xl text-black">
                <FaWhatsapp />
              </div>
              <h3 className="text-xl font-black uppercase font-sans group-hover:text-[#2563EB] transition-colors">
                Skate Shop WhatsApp Desk
              </h3>
              <p className="text-xs text-[#404040] font-bold leading-relaxed">
                Check real-time deck size availability, grip tape setups, and community skate session locations.
              </p>
            </div>
            <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-black uppercase">
              <span>+1 (718) 555-0199</span>
              <span className="bg-[#FACC15] px-2 py-0.5 border border-black">LIVE IN SHOP</span>
            </div>
          </a>

          {/* Card 2: Wholesale & Screenprint Orders */}
          <a
            href="mailto:shop@concreteskate.nyc"
            className="bg-white p-8 md:p-10 border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#FACC15] hover:-translate-y-1 transition-all group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center text-xl">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-black uppercase font-sans group-hover:text-[#2563EB] transition-colors">
                Wholesale & Deck Orders
              </h3>
              <p className="text-xs text-[#404040] font-bold leading-relaxed">
                For independent skate shop stockist orders, zine submissions, and custom screenprinting inquiries.
              </p>
            </div>
            <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-black uppercase">
              <span>shop@concreteskate.nyc</span>
              <span className="text-[#2563EB]">12H REPLY</span>
            </div>
          </a>

          {/* Card 3: Physical Shop Location */}
          <div className="bg-white p-8 md:p-10 border-4 border-black shadow-[6px_6px_0px_#000] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#2563EB] text-white border-2 border-black flex items-center justify-center text-xl">
                <FaLocationDot />
              </div>
              <h3 className="text-xl font-black uppercase font-sans">
                Brooklyn Clubhouse
              </h3>
              <p className="text-xs text-[#404040] font-bold leading-relaxed">
                142 Grand Street, Williamsburg, Brooklyn, NY 11249.
              </p>
            </div>
            <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-black uppercase">
              <span className="flex items-center gap-1.5">
                <FaClock className="text-[#2563EB]" />
                11:00 — 19:00 Daily
              </span>
              <span>All Welcome</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand3Contact;
