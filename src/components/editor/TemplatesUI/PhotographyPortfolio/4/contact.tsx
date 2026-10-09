// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Terminal, Send, CheckCircle2, Radio, MapPin, Mail, Clock } from "lucide-react";

interface ContactProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    email?: string;
    location?: string;
    turnaround?: string;
    ctaText?: string;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio4Contact: React.FC<ContactProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#0A0B0E";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#13151A";
  const text = theme.text || theme.ink || "#F3F4F6";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#9CA3AF";
  const accent = theme.accent || "#E53E3E";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const [selectedType, setSelectedType] = useState("Feature Film Stills");
  const [submitted, setSubmitted] = useState(false);

  const commissionTypes = [
    "Feature Film Stills",
    "Album & Vinyl Visuals",
    "Tour Documentary",
    "Darkroom Print Order",
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative font-mono border-t"
      style={{ backgroundColor: bgSecond, borderColor: `${accent}25`, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-widest" style={{ color: accent }}>
              <Radio className="w-4 h-4 animate-pulse" />
              <span>
                <Editable
                  value={data.badge || "TRANSMISSION DESK // UPLINK"}
                  onChange={(val: string) => onUpdate?.("badge", val)}
                />
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 leading-tight" style={{ color: text }}>
              <Editable
                value={data.title || "Initiate Production Commission"}
                onChange={(val: string) => onUpdate?.("title", val)}
              />
            </h2>

            <p className="text-xs md:text-sm font-sans font-light leading-relaxed mb-8" style={{ color: textSecond }}>
              <Editable
                value={
                  data.subtitle ||
                  "Accepting commercial assignments, music label artwork, and global feature film unit still coverage. Direct encrypted dispatch available below."
                }
                onChange={(val: string) => onUpdate?.("subtitle", val)}
              />
            </p>

            <div className="space-y-4 pt-6 border-t mb-8" style={{ borderColor: `${accent}25` }}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded border" style={{ borderColor: `${accent}35`, backgroundColor: bg }}>
                  <Mail className="w-4 h-4" style={{ color: accent }} />
                </div>
                <div>
                  <span className="text-[10px] uppercase block" style={{ color: textSecond }}>Direct Signal</span>
                  <span className="text-xs font-bold" style={{ color: text }}>
                    <Editable
                      value={data.email || "dispatch@nocturne-analog.com"}
                      onChange={(val: string) => onUpdate?.("email", val)}
                    />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded border" style={{ borderColor: `${accent}35`, backgroundColor: bg }}>
                  <MapPin className="w-4 h-4" style={{ color: accent }} />
                </div>
                <div>
                  <span className="text-[10px] uppercase block" style={{ color: textSecond }}>Darkroom Bases</span>
                  <span className="text-xs font-bold" style={{ color: text }}>
                    <Editable
                      value={data.location || "Berlin (Neukölln) • Tokyo (Shibuya) • NYC (Bushwick)"}
                      onChange={(val: string) => onUpdate?.("location", val)}
                    />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded border" style={{ borderColor: `${accent}35`, backgroundColor: bg }}>
                  <Clock className="w-4 h-4" style={{ color: accent }} />
                </div>
                <div>
                  <span className="text-[10px] uppercase block" style={{ color: textSecond }}>Dispatch Turnaround</span>
                  <span className="text-xs font-bold" style={{ color: text }}>
                    <Editable
                      value={data.turnaround || "Response within 12 Hours Worldwide"}
                      onChange={(val: string) => onUpdate?.("turnaround", val)}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 md:p-12 rounded-lg border shadow-2xl relative"
              style={{
                backgroundColor: bg,
                borderColor: `${accent}35`,
              }}
            >
              {/* Terminal Title Bar */}
              <div
                className="py-1 px-3 mb-6 rounded text-[10px] flex items-center justify-between border"
                style={{
                  backgroundColor: bgSecond,
                  borderColor: `${accent}25`,
                  color: textSecond,
                }}
              >
                <span>TERMINAL_STATION://NOCTURNE_DISPATCH</span>
                <span className="flex items-center gap-1.5" style={{ color: accent }}>
                  <span className="w-1.5 h-1.5 rounded-full inline-block animate-ping" style={{ backgroundColor: accent }} />
                  <span>SECURE_ENCRYPTION_ACTIVE</span>
                </span>
              </div>

              {/* Commission Nature Selection */}
              <div className="mb-6">
                <label className="text-[10px] uppercase tracking-widest block mb-2.5" style={{ color: textSecond }}>
                  SELECT COMMISSION PROTOCOL
                </label>
                <div className="flex flex-wrap gap-2">
                  {commissionTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className="px-3.5 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-all border cursor-pointer"
                      style={{
                        backgroundColor: selectedType === type ? accent : bgSecond,
                        color: selectedType === type ? onAccent : textSecond,
                        borderColor: selectedType === type ? accent : `${accent}30`,
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 mb-4" style={{ color: accent }} />
                  <h4 className="text-xl font-bold uppercase mb-2" style={{ color: text }}>
                    TRANSMISSION LOGGED & CONFIRMED
                  </h4>
                  <p className="text-xs font-sans max-w-sm" style={{ color: textSecond }}>
                    Your project telemetry has been beamed to Dorian Vance’s darkroom console. Expect a technical proposal and date confirmation within 12 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest block mb-2" style={{ color: textSecond }}>
                        DIRECTOR / PRODUCER / CLIENT
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lukas Lindemann"
                        className="w-full px-4 py-3 rounded border bg-transparent text-xs focus:outline-none"
                        style={{
                          borderColor: `${accent}30`,
                          color: text,
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest block mb-2" style={{ color: textSecond }}>
                        COMMUNICATION FREQUENCY (EMAIL)
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. lukas@production.com"
                        className="w-full px-4 py-3 rounded border bg-transparent text-xs focus:outline-none"
                        style={{
                          borderColor: `${accent}30`,
                          color: text,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest block mb-2" style={{ color: textSecond }}>
                        PRODUCTION DATES / TIMEFRAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. November 14 - 28, 2026"
                        className="w-full px-4 py-3 rounded border bg-transparent text-xs focus:outline-none"
                        style={{
                          borderColor: `${accent}30`,
                          color: text,
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest block mb-2" style={{ color: textSecond }}>
                        PRIMARY LOCATION / COUNTRY
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Berlin / Soundstages"
                        className="w-full px-4 py-3 rounded border bg-transparent text-xs focus:outline-none"
                        style={{
                          borderColor: `${accent}30`,
                          color: text,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest block mb-2" style={{ color: textSecond }}>
                      MISSION BRIEF & PRODUCTION SCOPE
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline your script synopsis, album moodboard, or tour requirements..."
                      className="w-full px-4 py-3 rounded border bg-transparent text-xs focus:outline-none resize-none font-sans"
                      style={{
                        borderColor: `${accent}30`,
                        color: text,
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(229,62,62,0.5)] active:scale-95 cursor-pointer"
                    style={{
                      backgroundColor: accent,
                      color: onAccent,
                    }}
                  >
                    <span>
                      <Editable
                        value={data.ctaText || "[ TRANSMIT PRODUCTION INQUIRY ]"}
                        onChange={(val: string) => onUpdate?.("ctaText", val)}
                      />
                    </span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyPortfolio4Contact;
