// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowRight, MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym1Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#0B0C10";
  const text = theme.text || theme.ink || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section
      id="contact"
      className="py-28 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-white/10"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Massive Section Headline - Big Bold Text, NO FORM */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-semibold block mb-4">
            <Editable
              value={p.badge || "ZERO RISK TRIAL // NO PAPERWORK REQUIRED"}
              onChange={(val: string) => handleUpdate("badge", val)}
            />
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.02] max-w-5xl mb-8">
            <Editable
              value={
                p.title ||
                "Start Your 7-Day Zero-Risk Trial On Our Floor."
              }
              onChange={(val: string) => handleUpdate("title", val)}
            />
          </h2>

          <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl mb-12">
            <Editable
              value={
                p.subtitle ||
                "No complicated signup forms. No credit card required. Simply walk into our Meatpacking District facility or call our floor concierge to activate your pass today."
              }
              onChange={(val: string) => handleUpdate("subtitle", val)}
            />
          </p>

          {/* Action CTA Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-10 py-5 rounded font-bold text-xs uppercase tracking-[0.2em] text-black bg-white hover:bg-neutral-200 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>
                <Editable
                  value={p.btnText || "GET DIRECTIONS & VISIT FLOOR"}
                  onChange={(val: string) => handleUpdate("btnText", val)}
                />
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="tel:18004893260"
              className="px-10 py-5 rounded font-bold text-xs uppercase tracking-[0.2em] text-white border border-white/20 hover:border-white transition-all text-center cursor-pointer"
            >
              CALL: +1 (800) 489-3260
            </a>
          </div>
        </div>

        {/* Big Plain Text Coordinates Strip - Plain Text, NO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16 border-t border-white/10">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium block mb-2">
              FACILITY ADDRESS
            </span>
            <p className="text-base text-white font-medium leading-relaxed">
              <Editable
                value={p.address || "420 West 14th Street, Meatpacking District, New York, NY 10014"}
                onChange={(val: string) => handleUpdate("address", val)}
              />
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium block mb-2">
              FLOOR CONCIERGE DIRECT
            </span>
            <p className="text-base text-white font-medium leading-relaxed">
              <Editable
                value={p.phone || "+1 (800) 489-3260 • concierge@empowergym.com"}
                onChange={(val: string) => handleUpdate("phone", val)}
              />
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium block mb-2">
              OPERATING HOURS
            </span>
            <p className="text-base text-white font-medium leading-relaxed">
              <Editable
                value={p.hours || "Monday — Friday: 05:00 - 23:00 • Weekends: 07:00 - 21:00"}
                onChange={(val: string) => handleUpdate("hours", val)}
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym1Contact;
