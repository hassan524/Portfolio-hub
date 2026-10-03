// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Compass } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Contact({ props = {}, theme, onChange }: any) {
  const [copied, setCopied] = useState(false);

  const bg = theme?.bg || "#F9F7F2";
  const bgSecond = theme?.["bg-second"] || "#F3EFE6";
  const ink = theme?.ink || "#1C1917";
  const inkSecond = theme?.["ink-second"] || "#78716C";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#C2410C";

  const email = "director@studioeditorial.com";

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const offerings = [
    {
      title: "Full Campaign Production",
      desc: "End-to-end art direction, high-definition cinematography, casting, location scouting, and multi-channel launch rollouts.",
      timeline: "6-8 weeks",
    },
    {
      title: "Brand Identity & Editorial Design",
      desc: "Typography creation, editorial publication books, packaging engineering, and interactive web standards.",
      timeline: "4-6 weeks",
    },
    {
      title: "Growth & Retention Architecture",
      desc: "High-LTV customer retention flows, bespoke e-commerce storytelling, and quantitative attribution modeling.",
      timeline: "Ongoing Sprint",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 transition-colors"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
            <span>✦</span>
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-serif">
            <Editable
              value={props?.contactTitle || "Commission Your Next Editorial Campaign"}
              onChange={(v) => onChange?.({ contactTitle: v })}
            />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: inkSecond }}>
            <Editable
              value={props?.contactSubtitle || "Connect directly with our creative directors. We welcome bespoke commissions and private retainers."}
              onChange={(v) => onChange?.({ contactSubtitle: v })}
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Email Card with 1-Click Copy */}
            <div
              className="p-8 rounded-3xl border transition-all"
              style={{
                backgroundColor: surface,
                borderColor: "rgba(0,0,0,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest font-mono" style={{ color: accent }}>
                  Director Desk
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-medium">
                  Direct Response &lt; 24h
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-serif font-black tracking-tight mb-6" style={{ color: ink }}>
                {email}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer"
                  style={{
                    backgroundColor: ink,
                    color: "#FFFFFF",
                  }}
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? "Director Email Copied!" : "Copy Direct Email"}</span>
                </button>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold border transition-colors cursor-pointer"
                  style={{ borderColor: "rgba(0,0,0,0.12)", color: ink }}
                >
                  <span>Compose Mail</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Direct Studio Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="p-6 rounded-3xl border"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Phone size={15} style={{ color: accent }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Studio Line
                  </span>
                </div>
                <div className="text-base font-serif font-bold" style={{ color: ink }}>
                  +33 (0)1 53 29 40 10
                </div>
                <div className="text-xs mt-1" style={{ color: inkSecond }}>
                  Paris & London Consultations
                </div>
              </div>

              <div
                className="p-6 rounded-3xl border"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <MapPin size={15} style={{ color: accent }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Atelier Location
                  </span>
                </div>
                <div className="text-base font-serif font-bold" style={{ color: ink }}>
                  Le Marais, Paris
                </div>
                <div className="text-xs mt-1" style={{ color: inkSecond }}>
                  18 Rue de Turenne, 75004
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Offerings */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold font-serif tracking-tight mb-2" style={{ color: ink }}>
              Commission Formats
            </h3>

            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border flex flex-col justify-between"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(0,0,0,0.08)",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-base font-bold font-serif" style={{ color: ink }}>
                    {item.title}
                  </h4>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase"
                    style={{ backgroundColor: `${accent}20`, color: accent }}
                  >
                    {item.timeline}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: inkSecond }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default DigitalAgency3Contact;
