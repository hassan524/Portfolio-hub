// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Mail, Phone, Clock, MapPin, Copy, Check, Sparkles, ArrowUpRight, Shield } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand2Contact({ props = {}, theme, onChange }: any) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const bg = theme?.bg || "#0A090D";
  const bgSecond = theme?.["bg-second"] || "#14121B";
  const ink = theme?.ink || "#F5F2EB";
  const inkSecond = theme?.["ink-second"] || "#9E96A6";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#D4AF37";

  const email = "vault@atelierobsidian.com";

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const sanctuaries = [
    {
      city: "Paris Subterranean Vault",
      address: "6 Place des Vosges, 75004 Paris, France",
      phone: "+33 (0)1 48 87 90 22",
      hours: "By Private Referral & Inscription Only",
      access: "Candlelight sensory vault sessions",
    },
    {
      city: "Kyoto Gion Sanctuary",
      address: "Shirakawa Minami-dori, Higashiyama-ku, Kyoto, Japan",
      phone: "+81 75 561 0088",
      hours: "Thursday – Sunday: By Appointment",
      access: "Ancient incense and raw agarwood immersion",
    },
    {
      city: "Geneva Private Reserve Suite",
      address: "Rue du Rhône 42, 1204 Geneva, Switzerland",
      phone: "+41 22 819 0400",
      hours: "Private Patron Inquiries Only",
      access: "Full single-cask commission curation",
    },
  ];

  const bespokeServices = [
    {
      title: "Single-Cask Private Formulations",
      desc: "Commission an exclusive 50-flacon barrel aged over 240 nights in charred oak for your family or estate.",
      highlight: "Personal Formula Archivist",
    },
    {
      title: "Private Nocturne Profiling",
      desc: "An intimate nighttime sensory session under candlelight to determine your body's interaction with raw animalic resins.",
      highlight: "Subterranean Paris & Kyoto",
    },
    {
      title: "Ancient Attar Extractions",
      desc: "Direct access to our 18-year wild Cambodian agarwood and double-charred Bourbon vanilla extracts.",
      highlight: "Pure Undiluted Resin",
    },
    {
      title: "Hand-Blown Obsidian Crystal",
      desc: "Each bottle is forged from darkened crystal and sealed with 24k gold leaf and molten black wax.",
      highlight: "Numbered Solstice Editions",
    },
  ];

  return (
    <section
      id="bespoke"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden border-t"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(212, 175, 55, 0.15)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
            Atelier Contact & Inscription
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight uppercase leading-[0.95]"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            <Editable
              value={props?.contactHeadline || "The Black Chamber"}
              onChange={(v) => onChange?.({ contactHeadline: v })}
            />
          </h2>
          <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
            Connect directly with our master perfumers. We operate without intermediaries or commercial barriers.
          </p>
        </div>

        {/* Direct Contact Action Cards (No Forms) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Direct Email Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-4 shadow-xl flex flex-col justify-between"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(212, 175, 55, 0.25)",
            }}
          >
            <div className="space-y-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.12)",
                  borderColor: accent,
                  color: accent,
                }}
              >
                <Mail size={20} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest block opacity-70" style={{ color: accent }}>
                Direct Vault Correspondence
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
                backgroundColor: copiedEmail ? "rgba(45, 106, 79, 0.15)" : "rgba(212, 175, 55, 0.1)",
              }}
            >
              {copiedEmail ? (
                <>
                  <Check size={14} />
                  <span>Dossier Address Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Vault Email</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Direct Private Line Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-4 shadow-xl flex flex-col justify-between"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(212, 175, 55, 0.25)",
            }}
          >
            <div className="space-y-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.12)",
                  borderColor: accent,
                  color: accent,
                }}
              >
                <Phone size={20} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest block opacity-70" style={{ color: accent }}>
                Direct Private Line
              </span>
              <p className="text-base sm:text-lg font-serif font-bold" style={{ color: ink }}>
                +33 (0)1 48 87 90 22
              </p>
              <p className="text-xs font-light" style={{ color: inkSecond }}>
                Subterranean switchboard connecting Paris, Kyoto & Geneva sanctuaries.
              </p>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wide" style={{ color: accent }}>
                <Moon size={12} />
                <span>Strict Discretion Guaranteed</span>
              </span>
            </div>
          </motion.div>

          {/* Direct Email Compose Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl space-y-4 shadow-xl flex flex-col justify-between"
            style={{
              backgroundColor: "rgba(212, 175, 55, 0.08)",
              borderColor: "rgba(212, 175, 55, 0.35)",
            }}
          >
            <div className="space-y-2">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-black"
                style={{ backgroundColor: accent }}
              >
                <Sparkles size={20} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest block font-bold" style={{ color: accent }}>
                What We Offer
              </span>
              <h3 className="text-base font-serif font-bold" style={{ color: ink }}>
                Bespoke Single-Casks
              </h3>
              <p className="text-xs font-light leading-relaxed" style={{ color: inkSecond }}>
                Hand-formulated extraits aged in 240-night charred casks, formulated exclusively for your private collection.
              </p>
            </div>

            <a
              href={`mailto:${email}?subject=Private%20Inscription%20//%20Atelier%20Obsidian`}
              className="w-full py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-semibold text-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              style={{ backgroundColor: accent }}
            >
              <span>Transmit Direct Inquiry</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* What We Offer Showcase Cards */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: accent }} />
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-semibold" style={{ color: accent }}>
              Private Commission Offerings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bespokeServices.map((service, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl border backdrop-blur-md space-y-3 shadow-sm flex flex-col justify-between"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(212, 175, 55, 0.2)",
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
                <div className="pt-3 border-t text-[11px] font-mono tracking-tight" style={{ borderColor: "rgba(212, 175, 55, 0.15)", color: accent }}>
                  {service.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subterranean Sanctuaries & Hours */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: accent }} />
            <h3 className="text-xs font-mono uppercase tracking-[0.25em] font-semibold" style={{ color: accent }}>
              Sanctuary Footprint
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sanctuaries.map((s, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-3xl border backdrop-blur-md space-y-4 shadow-sm"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(212, 175, 55, 0.2)",
                }}
              >
                <div className="flex items-center gap-2">
                  <MapPin size={16} style={{ color: accent }} />
                  <h4 className="text-base font-serif font-bold" style={{ color: ink }}>
                    {s.city}
                  </h4>
                </div>

                <div className="space-y-1.5 text-xs font-light" style={{ color: inkSecond }}>
                  <p>{s.address}</p>
                  <p className="font-mono text-[11px]" style={{ color: accent }}>{s.phone}</p>
                  <p className="text-[11px] flex items-center gap-1.5 pt-1 opacity-80" style={{ color: ink }}>
                    <Clock size={12} />
                    <span>{s.hours}</span>
                  </p>
                </div>

                <div className="pt-3 border-t text-[11px] font-serif italic" style={{ borderColor: "rgba(212, 175, 55, 0.15)", color: accent }}>
                  {s.access}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand2Contact;
