// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaWhatsapp, FaPhone, FaEnvelope, FaLocationDot, FaLock } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency2Contact: React.FC<ContactProps> = ({
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
    <section id="contact" className="relative w-full py-24 md:py-32 bg-[#FAF9F6] text-stone-900 font-['Poppins',sans-serif] border-b border-stone-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Editorial Text */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 block">
            <Editable value={p.contactSub || "Private Inquiries"} onChange={(v) => handleUpdate("contactSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
            <Editable value={p.contactTitle || "Commission a Bespoke Voyage"} onChange={(v) => handleUpdate("contactTitle", v)} />
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            Our voyage architects operate discreetly across Monaco, Zurich, and London. To preserve privacy and perfection, we accept a strictly limited number of private itineraries each calendar season.
          </p>

          <div className="pt-4 space-y-4 text-xs font-medium text-stone-600">
            <div className="flex items-center gap-3">
              <FaLocationDot className="text-amber-700" />
              <span>Monaco Harbor Office: Quai Antoine 1er, MC 98000 Monaco</span>
            </div>
            <div className="flex items-center gap-3">
              <FaLock className="text-amber-700" />
              <span>Full confidentiality and non-disclosure agreements honored upon request</span>
            </div>
          </div>
        </div>

        {/* Right VIP Desk Card */}
        <div className="lg:col-span-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-xl space-y-6">
            <div className="space-y-2 border-b border-stone-100 pb-4">
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-widest block">VIP CLIENT DESK</span>
              <h3 className="text-2xl font-bold font-serif text-stone-900">Direct Advisor Hotline</h3>
              <p className="text-xs text-stone-500">
                Direct mobile line to senior partner Elena Vance. Available 7 days a week.
              </p>
            </div>

            <div className="space-y-4">
              {/* WhatsApp direct */}
              <a
                href="https://wa.me/37793250000?text=Hello%20Aura%20Travel%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20luxury%20charter."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-800 font-bold block">WhatsApp VIP Concierge</span>
                    <span className="text-[11px] text-emerald-600">+377 93 25 00 00</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-full shadow-sm">
                  Active Now
                </span>
              </a>

              {/* Direct Telephone */}
              <a
                href="tel:+37793250000"
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm">
                    <FaPhone />
                  </div>
                  <div>
                    <span className="text-xs text-stone-900 font-bold block">Direct Office Switchboard</span>
                    <span className="text-[11px] text-stone-500">+377 93 25 00 01</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-stone-600">08:00 – 20:00 CET</span>
              </a>

              {/* Email */}
              <a
                href="mailto:curator@auratravel.mc"
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-700 text-white flex items-center justify-center text-sm">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="text-xs text-stone-900 font-bold block">Dossier Requests</span>
                    <span className="text-[11px] text-stone-500">curator@auratravel.mc</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-stone-600">2h Response</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency2Contact;
