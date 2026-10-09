// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, Calendar, MapPin, Users, Send, CheckCircle2, MessageCircle } from "lucide-react";

interface ContactProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    email?: string;
    phone?: string;
    conciergeNote?: string;
    ctaText?: string;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio3Contact: React.FC<ContactProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#FAF7F2";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#F4EFE6";
  const text = theme.text || theme.ink || "#251E19";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#6F665E";
  const accent = theme.accent || "#C5A059";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Romance Context & Concierge Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: accent }} />
              <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: accent }}>
                <Editable
                  value={data.badge || "INQUIRE DATE AVAILABILITY"}
                  onChange={(val) => onUpdate?.("badge", val)}
                />
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight" style={{ color: text }}>
              <Editable
                value={data.title || "Begin Planning Your Visual Legacy"}
                onChange={(val) => onUpdate?.("title", val)}
              />
            </h2>

            <p className="text-base font-light leading-relaxed mb-8" style={{ color: textSecond }}>
              <Editable
                value={
                  data.subtitle ||
                  "To maintain the highest level of bespoke devotion to our couples, we limit our commissions to just 15 destination weddings each calendar year. Please provide your celebration details below."
                }
                onChange={(val) => onUpdate?.("subtitle", val)}
              />
            </p>

            <div className="space-y-4 pt-6 border-t mb-8" style={{ borderColor: `${accent}25` }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ borderColor: `${accent}40` }}>
                  <Calendar className="w-4 h-4" style={{ color: accent }} />
                </div>
                <span className="text-xs font-light" style={{ color: textSecond }}>
                  Now Reserving 2026 & Autumn 2027 Dates
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center border" style={{ borderColor: `${accent}40` }}>
                  <MapPin className="w-4 h-4" style={{ color: accent }} />
                </div>
                <span className="text-xs font-light" style={{ color: textSecond }}>
                  Based between Florence, Paris & New York
                </span>
              </div>
            </div>

            {/* WhatsApp VIP Concierge Box */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: bg,
                borderColor: `${accent}35`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <h4 className="font-serif text-sm font-medium" style={{ color: text }}>
                  Wedding Planner Priority Line
                </h4>
              </div>
              <p className="text-xs font-light mb-4" style={{ color: textSecond }}>
                If you are a luxury wedding planner seeking immediate weekend availability, contact our concierge desk directly via WhatsApp.
              </p>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium transition-opacity hover:opacity-75"
                style={{ color: accent }}
              >
                <span>Connect via Concierge WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Wedding Inquiry Form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 md:p-12 rounded-3xl border shadow-lg"
              style={{
                backgroundColor: bg,
                borderColor: `${accent}35`,
              }}
            >
              {formSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 mb-4" style={{ color: accent }} />
                  <h4 className="text-2xl font-serif font-light mb-2" style={{ color: text }}>
                    Warmest Congratulations
                  </h4>
                  <p className="text-sm max-w-sm font-light leading-relaxed" style={{ color: textSecond }}>
                    Your celebration details have been delivered directly to Aurelia’s private calendar desk. We will review our availability and respond with our bespoke brochure within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-light block mb-2" style={{ color: textSecond }}>
                        Both Couple Names
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Genevieve & Alexandre"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none"
                        style={{
                          borderColor: `${accent}35`,
                          color: text,
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-light block mb-2" style={{ color: textSecond }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. genevieve@example.com"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none"
                        style={{
                          borderColor: `${accent}35`,
                          color: text,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-light block mb-2" style={{ color: textSecond }}>
                        Wedding Date / Season
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. September 18, 2026"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none"
                        style={{
                          borderColor: `${accent}35`,
                          color: text,
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-light block mb-2" style={{ color: textSecond }}>
                        Celebration Venue & Country
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Villa Balbiano, Lake Como"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none"
                        style={{
                          borderColor: `${accent}35`,
                          color: text,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-light block mb-2" style={{ color: textSecond }}>
                        Estimated Guest Count
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 120 Guests"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none"
                        style={{
                          borderColor: `${accent}35`,
                          color: text,
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-light block mb-2" style={{ color: textSecond }}>
                        Wedding Planner (If appointed)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lake Como Weddings"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none"
                        style={{
                          borderColor: `${accent}35`,
                          color: text,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-light block mb-2" style={{ color: textSecond }}>
                      Tell Us About Your Vision & Weekend Rhythm
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share your plans, music inspirations, multi-day parties, and what draws you to our imagery..."
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none resize-none"
                      style={{
                        borderColor: `${accent}35`,
                        color: text,
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full font-medium text-xs tracking-widest uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] cursor-pointer"
                    style={{
                      backgroundColor: accent,
                      color: onAccent,
                    }}
                  >
                    <span>
                      <Editable
                        value={data.ctaText || "Submit Wedding Date Inquiry"}
                        onChange={(val) => onUpdate?.("ctaText", val)}
                      />
                    </span>
                    <Send className="w-4 h-4" />
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

export default PhotographyPortfolio3Contact;
