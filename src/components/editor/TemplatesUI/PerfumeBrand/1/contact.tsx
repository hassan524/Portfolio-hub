// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Sparkles, Copy, Check, MessageSquare, Compass, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand1Contact({ props = {}, theme, onChange }: any) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const bg = theme?.bg || "#EED8C9";
  const bgSecond = theme?.["bg-second"] || "#E5C8B4";
  const ink = theme?.ink || "#2D1D18";
  const inkSecond = theme?.["ink-second"] || "#7A5E54";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.55)";
  const accent = theme?.accent || "#9E4A28";

  const email = "concierge@maisonlumiere.com";

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const salons = [
    {
      city: "Paris Flagship Atelier",
      address: "14 Place Vendôme, 75001 Paris, France",
      phone: "+33 (0)1 42 68 55 00",
      hours: "Tuesday – Saturday: 10:00 – 19:00",
      note: "By appointment or walk-in consultation",
    },
    {
      city: "London Mayfair Salon",
      address: "22 Mount Street, Mayfair, London W1K 2RQ",
      phone: "+44 (0)20 7499 1200",
      hours: "Monday – Saturday: 10:00 – 18:30",
      note: "Private olfactive suites available",
    },
    {
      city: "New York Madison Studio",
      address: "840 Madison Avenue, New York, NY 10021",
      phone: "+1 212 555 0192",
      hours: "Daily: 11:00 – 19:00",
      note: "Full custom flacon engraving on-site",
    },
  ];

  const consultationServices = [
    {
      title: "One-on-One Scent Profiling",
      desc: "60-minute sensory evaluation with our Master Nose to decode your skin chemistry and olfactory preferences.",
      highlight: "Complimentary with Flacon Inscription",
    },
    {
      title: "Private Discovery Flights",
      desc: "Receive our five-part botanical extrait flight delivered to your residence before committing to a signature flacon.",
      highlight: "5 × 10ml Miniatures Included",
    },
    {
      title: "Bespoke Flacon Engraving",
      desc: "Every glass crystal flacon can be personalized with gold leaf calligraphy, dates, or personal heraldry.",
      highlight: "Handcrafted in Grasse",
    },
    {
      title: "Single-Cask Allocation",
      desc: "Direct access to our seasonal 100-bottle wood barrel reserve distillations before public notice.",
      highlight: "Private Collector Register",
    },
  ];

  return (
    <section
      id="consultation"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden border-t"
      style={{
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.6) 0%, transparent 60%)`,
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
            Atelier Contact & Inquiries
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase leading-[0.95]"
            style={{ fontFamily: "Cinzel, Cormorant Garamond, serif" }}
          >
            <Editable
              value={props?.contactHeadline || "Connect with the Atelier"}
              onChange={(v) => onChange?.({ contactHeadline: v })}
            />
          </h2>
          <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
            Speak directly with our perfumers, visit our salons, or inquire about personalized fragrance curation.
          </p>
        </div>

        {/* Quick Contact Action Bar (No Forms) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Direct Email Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-4 shadow-sm flex flex-col justify-between"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <div className="space-y-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: accent }}
              >
                <Mail size={20} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest block opacity-70" style={{ color: inkSecond }}>
                Direct Scent Concierge
              </span>
              <p className="text-base sm:text-lg font-serif font-bold select-all break-all" style={{ color: ink }}>
                {email}
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              className="w-full py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-semibold border flex items-center justify-center gap-2 transition-all cursor-pointer"
              style={{
                borderColor: accent,
                color: copiedEmail ? "#2D6A4F" : accent,
                backgroundColor: copiedEmail ? "rgba(45, 106, 79, 0.1)" : "rgba(255, 255, 255, 0.6)",
              }}
            >
              {copiedEmail ? (
                <>
                  <Check size={14} />
                  <span>Email Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Direct Address</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Direct Phone / WhatsApp Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-4 shadow-sm flex flex-col justify-between"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            <div className="space-y-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: ink }}
              >
                <Phone size={20} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest block opacity-70" style={{ color: inkSecond }}>
                Atelier Direct Line
              </span>
              <p className="text-base sm:text-lg font-serif font-bold" style={{ color: ink }}>
                +33 (0)1 42 68 55 00
              </p>
              <p className="text-xs font-light" style={{ color: inkSecond }}>
                Central Paris switchboard connecting to Grasse, London & NY salons.
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wide" style={{ color: accent }}>
                <Clock size={13} />
                <span>Mon – Sat: 09:00 – 19:00 CET</span>
              </span>
            </div>
          </motion.div>

          {/* Private Inscription Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-4 shadow-sm flex flex-col justify-between"
            style={{
              backgroundColor: "rgba(158, 74, 40, 0.08)",
              borderColor: "rgba(158, 74, 40, 0.25)",
            }}
          >
            <div className="space-y-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.85)", color: accent }}
              >
                <Sparkles size={20} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest block font-bold" style={{ color: accent }}>
                What We Offer
              </span>
              <h3 className="text-base font-serif font-bold" style={{ color: ink }}>
                Bespoke Olfactive Curation
              </h3>
              <p className="text-xs font-light leading-relaxed" style={{ color: inkSecond }}>
                We formulate customized wedding scents, private flacon inscriptions, and intimate salon profiling sessions.
              </p>
            </div>

            <a
              href={`mailto:${email}?subject=Inquiry%20regarding%20Maison%20Lumiere%20Creations`}
              className="w-full py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              style={{ backgroundColor: accent }}
            >
              <span>Compose Direct Inquiry</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* What We Offer Details Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: accent }} />
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-semibold" style={{ color: accent }}>
              Consultation & Curation Offerings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationServices.map((service, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl border backdrop-blur-md space-y-3 shadow-sm flex flex-col justify-between"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(255, 255, 255, 0.75)",
                }}
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold tracking-wider" style={{ color: accent }}>
                    0{i + 1} //
                  </span>
                  <h4 className="text-base font-serif font-bold" style={{ color: ink }}>
                    {service.title}
                  </h4>
                  <p className="text-xs leading-relaxed font-light" style={{ color: inkSecond }}>
                    {service.desc}
                  </p>
                </div>
                <div className="pt-3 border-t text-[11px] font-mono tracking-tight opacity-75" style={{ borderColor: "rgba(158, 74, 40, 0.15)", color: ink }}>
                  {service.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Salons & Visiting Locations */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: accent }} />
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-semibold" style={{ color: accent }}>
              Atelier Locations & Visiting Hours
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {salons.map((salon, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-3xl border backdrop-blur-md space-y-4 shadow-sm"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(255, 255, 255, 0.8)",
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={16} style={{ color: accent }} />
                  <h4 className="text-base font-serif font-bold" style={{ color: ink }}>
                    {salon.city}
                  </h4>
                </div>

                <div className="space-y-1.5 text-xs font-light" style={{ color: inkSecond }}>
                  <p>{salon.address}</p>
                  <p className="font-mono text-[11px] opacity-80" style={{ color: ink }}>{salon.phone}</p>
                  <p className="text-[11px] flex items-center gap-1.5 pt-1" style={{ color: accent }}>
                    <Clock size={12} />
                    <span>{salon.hours}</span>
                  </p>
                </div>

                <div className="pt-3 border-t text-[11px] font-serif italic" style={{ borderColor: "rgba(158, 74, 40, 0.12)", color: inkSecond }}>
                  {salon.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand1Contact;
