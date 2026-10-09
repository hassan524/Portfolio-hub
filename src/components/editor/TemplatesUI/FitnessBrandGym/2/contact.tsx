// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Flame, MapPin, Phone, Clock, ArrowRight, ShieldCheck } from "lucide-react";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const FitnessBrandGym2Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#080808";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#121212";
  const text = theme.text || theme.ink || "#FFFFFF";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#A1A1AA";
  const accent = theme.accent || "#FF2E2E";

  const [passClaimed, setPassClaimed] = useState(false);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16 lg:px-24 transition-colors duration-300 relative border-t border-neutral-900"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Massive Section Title - Big Big Text */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-[#FF2E2E]" />
            <span className="text-xs uppercase tracking-[0.3em] font-black text-[#FF3B30]">
              <Editable
                value={p.badge || "FIRST LIFT IS ON US // ZERO BULLSHIT"}
                onChange={(val: string) => handleUpdate("badge", val)}
              />
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-[0.96] max-w-4xl">
            <Editable
              value={
                p.title ||
                "Claim Your Free Drop-In Pass At The Temple Front Gate."
              }
              onChange={(val: string) => handleUpdate("title", val)}
            />
          </h2>
        </div>

        {/* 2-Column Split: Direct Coordinates & Pass Claim (NO CARDS!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Direct Coordinates in Industrial Plain Typography */}
          <div className="lg:col-span-6 space-y-8 font-mono">
            <p className="text-base sm:text-lg text-neutral-300 font-sans font-light leading-relaxed max-w-lg">
              <Editable
                value={
                  p.subtitle ||
                  "Bring your lifting belt, chalk, and flat shoes. No signup fees, no sales reps tracking you down. Show up, load the bar, and see if you belong in this brotherhood."
                }
                onChange={(val: string) => handleUpdate("subtitle", val)}
              />
            </p>

            <div className="space-y-6 pt-6 border-t border-neutral-800 text-xs">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#FF2E2E] shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mb-1">
                    TEMPLE COMPOUND LOCATION
                  </span>
                  <p className="text-sm font-bold text-white uppercase">
                    <Editable
                      value={p.address || "1804 Industrial Way, South Docklands, Chicago, IL 60616"}
                      onChange={(val: string) => handleUpdate("address", val)}
                    />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#FF2E2E] shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mb-1">
                    DIRECT DESK SIGNAL & WHATSAPP
                  </span>
                  <p className="text-sm font-bold text-white uppercase">
                    <Editable
                      value={p.phone || "+1 (312) 555-IRON • gates@irontemple.com"}
                      onChange={(val: string) => handleUpdate("phone", val)}
                    />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#FF2E2E] shrink-0 mt-1" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mb-1">
                    GATE ACCESS SCHEDULE
                  </span>
                  <p className="text-sm font-bold text-white uppercase">
                    <Editable
                      value={p.hours || "24 HOURS / 7 DAYS A WEEK WITH BIOMETRIC KEYFOB • FRONT DESK: 06:00 - 22:00"}
                      onChange={(val: string) => handleUpdate("hours", val)}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Temple Floor Rules */}
            <div className="p-4 rounded border border-neutral-800 bg-neutral-900/50 text-[11px] leading-relaxed text-neutral-400">
              <strong className="block text-white uppercase tracking-wider mb-1">
                TEMPLE HOUSE RULES:
              </strong>
              1. Liquid or block chalk is fully allowed. 2. Heavy deadlifts may be dropped from lockout on platforms. 3. Re-rack every single plate before you leave. Zero exceptions.
            </div>
          </div>

          {/* Right Column: Instant Pass Generator (Plain brutalist styling, NO card container) */}
          <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-neutral-800 lg:pl-16 pt-8 lg:pt-0">
            {passClaimed ? (
              <div className="py-8 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-[#FF3B30] font-black text-sm tracking-widest uppercase">
                  <Flame className="w-5 h-5 fill-current" />
                  <span>DAY PASS GRANTED // CODE ENGAGED</span>
                </div>
                <h3 className="text-3xl font-black uppercase text-white tracking-tight">
                  YOUR BARBELL AWAITS.
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light">
                  Present pass code <span className="font-mono text-white font-bold bg-[#FF2E2E]/20 border border-[#FF2E2E] px-2 py-1 rounded">IRON-PASS-CHAMP</span> at the gate for immediate unescorted floor access today.
                </p>
                <div className="pt-4 flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#FF2E2E]" />
                  <span>Valid for 48 hours from moment of claim.</span>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPassClaimed(true);
                }}
                className="space-y-6"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-black text-[#FF3B30] block mb-2 font-mono">
                    CLAIM COMPLIMENTARY 1-DAY PASS
                  </span>
                  <p className="text-xs text-neutral-400 font-sans font-light mb-6">
                    Enter your credentials to generate an instant gate clearance code.
                  </p>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-mono text-neutral-300 block mb-2 font-bold">
                    FULL ATHLETE NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaxson Vance"
                    className="w-full px-4 py-3.5 rounded bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FF2E2E] transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-mono text-neutral-300 block mb-2 font-bold">
                    CELL PHONE / FREQUENCY
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 (312) 555-0199"
                    className="w-full px-4 py-3.5 rounded bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FF2E2E] transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest font-mono text-neutral-300 block mb-2 font-bold">
                    PRIMARY DISCIPLINE
                  </label>
                  <select className="w-full px-4 py-3.5 rounded bg-neutral-900 border border-neutral-800 text-sm text-white focus:outline-none focus:border-[#FF2E2E] transition-colors font-mono">
                    <option>Competitive Powerlifting (IPF / USAPL)</option>
                    <option>Old-School Bodybuilding & Hypertrophy</option>
                    <option>Heavyweight Strongman & Odd Objects</option>
                    <option>Olympic Weightlifting & Snatch/C&J</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,46,46,0.65)] hover:scale-[1.01] active:scale-95 cursor-pointer shadow-xl flex items-center justify-center gap-2 text-white"
                  style={{
                    backgroundColor: accent,
                    boxShadow: "0 0 25px rgba(255, 46, 46, 0.4)",
                  }}
                >
                  <span>
                    <Editable
                      value={p.ctaText || "GENERATE TEMPLE PASS"}
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

export default FitnessBrandGym2Contact;
