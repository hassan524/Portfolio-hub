// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaWhatsapp, FaEnvelope, FaLocationDot, FaBarcode, FaClock } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const StreetwearBrand1Contact: React.FC<ContactProps> = ({
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
    <section id="contact" className="relative w-full py-28 bg-[#09090C] text-white border-b border-rose-950/60 font-mono">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] text-rose-500 font-bold block">
            <Editable value={p.contactSub || "SHIBUYA ATELIER // ACCESS PROTOCOL"} onChange={(v) => handleUpdate("contactSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
            <Editable value={p.contactTitle || "Direct Studio Connection"} onChange={(v) => handleUpdate("contactTitle", v)} />
          </h2>
          <p className="text-sm text-slate-400 font-light leading-relaxed">
            Our physical atelier in Shibuya operates by appointment only for bespoke sizing and pre-release capsule viewings.
          </p>
        </div>

        {/* Contact Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: VIP WhatsApp Drop Desk */}
          <a
            href="https://wa.me/81354560000"
            target="_blank"
            rel="noreferrer"
            className="p-8 md:p-10 bg-[#121218] border border-rose-950/80 hover:border-rose-500 transition-all group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 flex items-center justify-center text-xl">
                <FaWhatsapp />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors font-sans">
                VIP Drop Alert WhatsApp
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive secret access passcodes 1 hour prior to general public capsule releases. Direct chat with our production studio.
              </p>
            </div>
            <div className="pt-4 border-t border-rose-950/60 flex items-center justify-between text-xs">
              <span className="text-white font-bold">+81 (Tokyo) 3 5456 0000</span>
              <span className="text-emerald-400 font-semibold">Priority Desk</span>
            </div>
          </a>

          {/* Card 2: Studio Inquiries */}
          <a
            href="mailto:atelier@kuro-zero.jp"
            className="p-8 md:p-10 bg-[#121218] border border-rose-950/80 hover:border-rose-500 transition-all group flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center text-xl">
                <FaEnvelope />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors font-sans">
                Atelier Orders & Wholesale
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                For stockist inquiries, editorial shoot loans, and custom hardware fabrication projects.
              </p>
            </div>
            <div className="pt-4 border-t border-rose-950/60 flex items-center justify-between text-xs">
              <span className="text-white font-bold">atelier@kuro-zero.jp</span>
              <span className="text-rose-400 font-semibold">Fast Turnaround</span>
            </div>
          </a>

          {/* Card 3: Flagship Physical Studio */}
          <div className="p-8 md:p-10 bg-[#121218] border border-rose-950/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-[#1B1B26] border border-rose-900/40 text-rose-400 flex items-center justify-center text-xl">
                <FaLocationDot />
              </div>
              <h3 className="text-xl font-bold text-white font-sans">
                Tokyo Flagship Space
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Jinnan 1-chome 18-2, Shibuya-ku, Tokyo 150-0041, Japan.
              </p>
            </div>
            <div className="pt-4 border-t border-rose-950/60 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-white">
                <FaClock className="text-rose-500" />
                13:00 — 20:00 Daily
              </span>
              <span>By Appointment</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default StreetwearBrand1Contact;
