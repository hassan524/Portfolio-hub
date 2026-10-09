// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { Mail, MapPin, Send, Compass, CheckCircle2 } from "lucide-react";

interface ContactProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    email?: string;
    location?: string;
    phone?: string;
    galleryRep?: string;
    formTitle?: string;
    ctaText?: string;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio2Contact: React.FC<ContactProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#F4F6F0";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#E8ECE2";
  const text = theme.text || theme.ink || "#222D22";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#556455";
  const accent = theme.accent || "#3E5338";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const [selectedType, setSelectedType] = useState("Print Acquisition");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const inquiryTypes = [
    "Print Acquisition",
    "Architectural Commission",
    "Monograph Publication",
    "Exhibition Loan",
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Context & Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Compass className="w-4 h-4" style={{ color: accent }} />
                <span
                  className="text-xs uppercase tracking-[0.25em] font-medium"
                  style={{ color: accent }}
                >
                  <Editable
                    value={data.badge || "FINE ART INQUIRIES"}
                    onChange={(val) => onUpdate?.("badge", val)}
                  />
                </span>
              </div>
              <h2
                className="text-3xl md:text-5xl font-light tracking-tight font-serif mb-6 leading-tight"
                style={{ color: text }}
              >
                <Editable
                  value={data.title || "Acquire Prints or Commission Work"}
                  onChange={(val) => onUpdate?.("title", val)}
                />
              </h2>
              <p
                className="text-base md:text-lg font-light leading-relaxed mb-10"
                style={{ color: textSecond }}
              >
                <Editable
                  value={
                    data.subtitle ||
                    "Whether you are curating a private residence, commissioning architectural documentation, or acquiring limited silver-gelatin editions, our studio responds within two business days."
                  }
                  onChange={(val) => onUpdate?.("subtitle", val)}
                />
              </p>

              {/* Coordinates info list */}
              <div className="space-y-6 pt-6 border-t" style={{ borderColor: `${accent}20` }}>
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: bgSecond }}
                  >
                    <Mail className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider block font-medium" style={{ color: textSecond }}>
                      Studio Direct
                    </span>
                    <span className="text-base font-medium" style={{ color: text }}>
                      <Editable
                        value={data.email || "atelier@solis-studios.is"}
                        onChange={(val) => onUpdate?.("email", val)}
                      />
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: bgSecond }}
                  >
                    <MapPin className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider block font-medium" style={{ color: textSecond }}>
                      Primary Atelier & Print Lab
                    </span>
                    <span className="text-base font-medium" style={{ color: text }}>
                      <Editable
                        value={data.location || "Laugavegur 84, 101 Reykjavík, Iceland / Oslo Satellite"}
                        onChange={(val) => onUpdate?.("location", val)}
                      />
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full mt-1 shrink-0"
                    style={{ backgroundColor: bgSecond }}
                  >
                    <Compass className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider block font-medium" style={{ color: textSecond }}>
                      Gallery Representation
                    </span>
                    <span className="text-base font-medium" style={{ color: text }}>
                      <Editable
                        value={data.galleryRep || "Galleri K, Oslo & Esther Schipper, Berlin"}
                        onChange={(val) => onUpdate?.("galleryRep", val)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Archival guarantee note */}
            <div
              className="mt-12 p-6 rounded-2xl border text-xs leading-relaxed"
              style={{
                backgroundColor: bgSecond,
                borderColor: `${accent}25`,
                color: textSecond,
              }}
            >
              <strong className="block text-sm font-serif mb-1" style={{ color: text }}>
                Archival Certification Note:
              </strong>
              All editioned prints are stamped, signed in pencil recto, accompanied by an embossed Hahnemühle Certificate of Authenticity with serialized dual-holograms.
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 md:p-12 rounded-3xl border shadow-sm transition-all"
              style={{
                backgroundColor: bgSecond,
                borderColor: `${accent}20`,
              }}
            >
              <h3 className="text-2xl font-serif font-light mb-2" style={{ color: text }}>
                <Editable
                  value={data.formTitle || "Initiate Studio Dialogue"}
                  onChange={(val) => onUpdate?.("formTitle", val)}
                />
              </h3>
              <p className="text-sm font-light mb-8" style={{ color: textSecond }}>
                Select your area of inquiry and provide your project or acquisition details.
              </p>

              {/* Inquiry Type Pills */}
              <div className="mb-8">
                <label className="text-xs uppercase tracking-wider font-medium block mb-3" style={{ color: textSecond }}>
                  Inquiry Nature
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border"
                      style={{
                        backgroundColor: selectedType === type ? accent : "transparent",
                        color: selectedType === type ? onAccent : text,
                        borderColor: selectedType === type ? accent : `${accent}35`,
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 mb-4" style={{ color: accent }} />
                  <h4 className="text-xl font-serif font-light mb-2" style={{ color: text }}>
                    Inquiry Received with Gratitude
                  </h4>
                  <p className="text-sm max-w-sm" style={{ color: textSecond }}>
                    Our studio team will review your specifications and contact you with provenance details and schedule options shortly.
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
                      <label className="text-xs uppercase tracking-wider font-medium block mb-2" style={{ color: textSecond }}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Lin"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none transition-colors"
                        style={{
                          borderColor: `${accent}30`,
                          color: text,
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-medium block mb-2" style={{ color: textSecond }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. maya@lin-atelier.com"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none transition-colors"
                        style={{
                          borderColor: `${accent}30`,
                          color: text,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-medium block mb-2" style={{ color: textSecond }}>
                        Organization / Firm / Collector
                      </label>
                      <input
                        type="text"
                        placeholder="Private Collector or Firm"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none transition-colors"
                        style={{
                          borderColor: `${accent}30`,
                          color: text,
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-medium block mb-2" style={{ color: textSecond }}>
                        Approximate Timeline / Deadline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Q3 / Next 60 Days"
                        className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none transition-colors"
                        style={{
                          borderColor: `${accent}30`,
                          color: text,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-medium block mb-2" style={{ color: textSecond }}>
                      Project Scope or Artwork Desired
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please describe the architectural site, required print dimensions, or editorial publication timeline..."
                      className="w-full px-4 py-3 rounded-xl border bg-transparent text-sm focus:outline-none transition-colors resize-none"
                      style={{
                        borderColor: `${accent}30`,
                        color: text,
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-medium text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.99] cursor-pointer"
                    style={{
                      backgroundColor: accent,
                      color: onAccent,
                    }}
                  >
                    <span>
                      <Editable
                        value={data.ctaText || "Submit Studio Inquiry"}
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

export default PhotographyPortfolio2Contact;
