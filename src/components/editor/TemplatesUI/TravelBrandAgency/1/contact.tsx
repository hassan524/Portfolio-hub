// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaWhatsapp, FaEnvelope, FaPhone, FaCompass, FaCheck, FaCalendarDay, FaUserGroup } from "react-icons/fa6";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency1Contact: React.FC<ContactProps> = ({
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

  const [destination, setDestination] = useState("Bali, Indonesia");
  const [travelers, setTravelers] = useState("2 Travelers");
  const [duration, setDuration] = useState("7-10 Days");

  return (
    <section id="contact" className="relative w-full py-24 md:py-32 bg-slate-900 text-white font-['Poppins',sans-serif] overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 block">
            <Editable value={p.contactSub || "Plan Your Escape"} onChange={(v) => handleUpdate("contactSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            <Editable value={p.contactTitle || "Ready For Your Next Journey?"} onChange={(v) => handleUpdate("contactTitle", v)} />
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-normal">
            Choose your dream destination or speak directly with our private travel directors to tailor your itinerary.
          </p>
        </div>

        {/* Interactive Travel Booking Box */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Destination Picker */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <FaCompass className="text-emerald-400" />
                <span>Destination</span>
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/15 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-400"
              >
                <option value="Bali, Indonesia" className="bg-slate-900 text-white">Bali, Indonesia</option>
                <option value="Amalfi Coast, Italy" className="bg-slate-900 text-white">Amalfi Coast, Italy</option>
                <option value="Swiss Alps, Switzerland" className="bg-slate-900 text-white">Swiss Alps, Switzerland</option>
                <option value="Kyoto, Japan" className="bg-slate-900 text-white">Kyoto, Japan</option>
                <option value="Santorini, Greece" className="bg-slate-900 text-white">Santorini, Greece</option>
                <option value="Patagonia, Chile" className="bg-slate-900 text-white">Patagonia, Chile</option>
              </select>
            </div>

            {/* Travelers Count */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <FaUserGroup className="text-emerald-400" />
                <span>Travelers</span>
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/15 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-400"
              >
                <option value="Solo Traveler" className="bg-slate-900 text-white">Solo Traveler</option>
                <option value="2 Travelers" className="bg-slate-900 text-white">2 Travelers (Couple)</option>
                <option value="Family (3-5)" className="bg-slate-900 text-white">Family (3–5)</option>
                <option value="Group (6+)" className="bg-slate-900 text-white">Group (6+ Guests)</option>
              </select>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <FaCalendarDay className="text-emerald-400" />
                <span>Trip Duration</span>
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/15 border border-white/20 text-white text-sm focus:outline-none focus:border-emerald-400"
              >
                <option value="Weekend (3-4 Days)" className="bg-slate-900 text-white">Weekend (3–4 Days)</option>
                <option value="7-10 Days" className="bg-slate-900 text-white">7–10 Days</option>
                <option value="2 Weeks" className="bg-slate-900 text-white">2 Weeks</option>
                <option value="Custom Duration" className="bg-slate-900 text-white">Custom Duration</option>
              </select>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <FaCheck />
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <FaCheck />
                <span>No Booking Fees</span>
              </div>
            </div>

            <a
              href={`https://wa.me/18005550199?text=Hello%20Voyare%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20trip%20to%20${encodeURIComponent(destination)}%20for%20${encodeURIComponent(travelers)}.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-sm text-slate-900 bg-white hover:bg-emerald-300 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              <FaWhatsapp className="text-emerald-600 text-lg" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Quick Contact Info Strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400 pt-4">
          <a href="tel:+18005550199" className="flex items-center gap-2 hover:text-white transition-colors">
            <FaPhone className="text-emerald-400" />
            <span>Direct Line: +1 (800) 555-0199</span>
          </a>
          <span className="text-slate-600">•</span>
          <a href="mailto:concierge@voyare-travel.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <FaEnvelope className="text-emerald-400" />
            <span>concierge@voyare-travel.com</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency1Contact;
