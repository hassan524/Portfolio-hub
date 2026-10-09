// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowRight, CheckCircle2, MapPin, Mail, Calendar, Compass } from "lucide-react";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym3Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#FAF8F5";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#F1ECE4";
  const text = theme.text || theme.ink || "#1A1A1A";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#666057";
  const accent = theme.accent || "#FF4D24";

  const [tourBooked, setTourBooked] = useState(false);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section
      id="join"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-black/5"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Banner directly matching Image 3: "READY TO BECOME YOUR BEST VERSION?" */}
        <div className="rounded-3xl p-10 md:p-16 mb-20 text-center relative overflow-hidden shadow-sm" style={{ backgroundColor: "#1F302B", color: "#FFFFFF" }}>
          {/* Subtle background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{ backgroundColor: accent }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#FF4D24] block mb-3">
              <Editable
                value={p.calloutBadge || "START YOUR JOURNEY"}
                onChange={(val: string) => handleUpdate("calloutBadge", val)}
              />
            </span>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-[1.06]">
              <Editable
                value={p.calloutTitle || "Ready To Become Your Best Version?"}
                onChange={(val: string) => handleUpdate("calloutTitle", val)}
              />
            </h2>

            <p className="text-sm md:text-base text-neutral-300 font-light mb-8 leading-relaxed">
              <Editable
                value={
                  p.calloutSubtitle ||
                  "Book a private studio walkthrough, meet our lead movement directors, and receive your complimentary 3-session trial membership."
                }
                onChange={(val: string) => handleUpdate("calloutSubtitle", val)}
              />
            </p>

            <div className="inline-block">
              <a
                href="#booking-form"
                className="px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest text-white shadow-lg transition-all duration-200 hover:opacity-90 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                style={{ backgroundColor: accent }}
              >
                <span>
                  <Editable
                    value={p.calloutBtn || "GET STARTED TODAY"}
                    onChange={(val: string) => handleUpdate("calloutBtn", val)}
                  />
                </span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Studio Coordinates & Private Tour Booking */}
        <div id="booking-form" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Direct Coordinates in Clean Editorial Typography */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#FF4D24] block mb-2">
                STUDIO HEADQUARTERS
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                <Editable
                  value={p.locationTitle || "Visit our Covent Garden Flagship Studio."}
                  onChange={(val: string) => handleUpdate("locationTitle", val)}
                />
              </h3>
            </div>

            <div className="space-y-6 pt-6 border-t border-black/10 text-sm">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#FF4D24] shrink-0 mt-1" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-0.5">
                    Physical Address
                  </span>
                  <p className="text-base text-neutral-900 font-medium">
                    <Editable
                      value={p.address || "28 Floral Street, Covent Garden, London WC2E 9DS, United Kingdom"}
                      onChange={(val: string) => handleUpdate("address", val)}
                    />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#FF4D24] shrink-0 mt-1" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-0.5">
                    Concierge & Private Inquiries
                  </span>
                  <p className="text-base text-neutral-900 font-medium">
                    <Editable
                      value={p.email || "hello@vyra-club.com • +44 20 7946 0912"}
                      onChange={(val: string) => handleUpdate("email", val)}
                    />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-[#FF4D24] shrink-0 mt-1" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold block mb-0.5">
                    Class & Studio Hours
                  </span>
                  <p className="text-base text-neutral-900 font-medium">
                    <Editable
                      value={p.hours || "Mon — Fri: 06:00 - 21:30 • Sat & Sun: 07:30 - 19:00"}
                      onChange={(val: string) => handleUpdate("hours", val)}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Private Tour Booking Form */}
          <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-black/10 lg:pl-16 pt-8 lg:pt-0">
            {tourBooked ? (
              <div className="py-8 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-[#FF4D24] font-bold text-sm tracking-wider uppercase">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>STUDIO PASS RESERVED</span>
                </div>
                <h3 className="text-3xl font-bold text-neutral-900 tracking-tight">
                  We look forward to welcoming you.
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  A studio concierge will confirm your private orientation slot and send your complimentary digital access key within 2 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setTourBooked(true);
                }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#FF4D24] block mb-2">
                    BOOK PRIVATE STUDIO WALKTHROUGH
                  </span>
                  <p className="text-xs text-neutral-500 font-light mb-6">
                    Tour the reformers, infrared recovery suites, and strength studios.
                  </p>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-neutral-700 block mb-2 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Camille Laurent"
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-black/10 text-sm text-neutral-900 focus:outline-none focus:border-[#FF4D24] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-neutral-700 block mb-2 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. camille@example.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-black/10 text-sm text-neutral-900 focus:outline-none focus:border-[#FF4D24] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-neutral-700 block mb-2 font-bold">
                    Preferred Time of Day
                  </label>
                  <select className="w-full px-4 py-3.5 rounded-xl bg-white border border-black/10 text-sm text-neutral-900 focus:outline-none focus:border-[#FF4D24] transition-colors">
                    <option>Morning (07:00 — 11:00)</option>
                    <option>Midday (12:00 — 15:00)</option>
                    <option>Evening (17:00 — 20:00)</option>
                    <option>Weekend Brunch Time (10:00 — 13:00)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest text-white shadow-md transition-all duration-200 hover:opacity-90 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: accent }}
                >
                  <span>
                    <Editable
                      value={p.ctaText || "Request Studio Orientation"}
                      onChange={(val: string) => handleUpdate("ctaText", val)}
                    />
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessBrandGym3Contact;
