// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaWhatsapp, FaEnvelope, FaLocationDot, FaClock, FaDiamond } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand2Contact: React.FC<ContactProps> = ({
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
    <section id="contact" className="relative w-full py-28 bg-[#090D14] text-white border-b border-[#1E293B]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#CCFF00] font-bold block">
            <Editable value={p.contactSub || "PRIVATE SHOWROOMS // CLIENT CONCIERGE"} onChange={(v) => handleUpdate("contactSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight text-white font-sans">
            <Editable value={p.contactTitle || "Commission Private Fitting"} onChange={(v) => handleUpdate("contactTitle", v)} />
          </h2>
          <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
            Our showrooms in Milan and Copenhagen accommodate one client at a time for comprehensive anatomical measurements and fabric customization.
          </p>
        </div>

        {/* Contact Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: VIP Concierge WhatsApp */}
          <a
            href="https://wa.me/390288880000"
            target="_blank"
            rel="noreferrer"
            className="p-8 md:p-10 bg-[#0F1422] border border-[#1E293B] hover:border-[#CCFF00] transition-all group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center text-xl">
                <FaWhatsapp />
              </div>
              <h3 className="text-xl font-medium text-white group-hover:text-[#CCFF00] transition-colors font-sans">
                VIP Private Desk WhatsApp
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Direct client advisor communication for immediate showroom slots, courier deliveries, and bespoke measurement adjustments.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between font-mono text-xs">
              <span className="text-white font-bold">+39 (Milan) 02 8888 0000</span>
              <span className="text-emerald-400 font-semibold">Active Desk</span>
            </div>
          </a>

          {/* Card 2: Showroom Direct Email */}
          <a
            href="mailto:concierge@monolith-couture.com"
            className="p-8 md:p-10 bg-[#0F1422] border border-[#1E293B] hover:border-[#CCFF00] transition-all group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#1A2234] border border-[#334155] text-[#CCFF00] flex items-center justify-center text-xl">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-medium text-white group-hover:text-[#CCFF00] transition-colors font-sans">
                Atelier Commission Inquiries
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Request private appointment times, runway look reservations, and bespoke fabric swatches sent via courier.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between font-mono text-xs">
              <span className="text-white font-bold">concierge@monolith-couture.com</span>
              <span className="text-[#CCFF00] font-semibold">Bespoke Lead</span>
            </div>
          </a>

          {/* Card 3: Physical Showrooms */}
          <div className="p-8 md:p-10 bg-[#0F1422] border border-[#1E293B] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#1A2234] border border-[#334155] text-white flex items-center justify-center text-xl">
                <FaLocationDot />
              </div>
              <h3 className="text-xl font-medium text-white font-sans">
                Showroom Coordinates
              </h3>
              <div className="space-y-2 text-xs text-[#94A3B8]">
                <p><strong className="text-white">Milan:</strong> Via Montenapoleone 18, 20121 Milano</p>
                <p><strong className="text-white">Copenhagen:</strong> Bredgade 34, 1260 København</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between font-mono text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5 text-white">
                <FaClock className="text-[#CCFF00]" />
                By Appointment Only
              </span>
              <span>Mon — Sat</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand2Contact;
