// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Copy, Check, Sparkles, MessageCircle, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Contact({ props = {}, theme, onChange }: any) {
  const [copied, setCopied] = useState(false);

  const bg = theme?.bg || "#F7F8F9";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#111827";
  const inkSecond = theme?.["ink-second"] || "#6B7280";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#87D53C";

  const email = "hello@designsource.studio";

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const offerings = [
    {
      title: "Tactile 3D Assets & Packs",
      desc: "Custom high-fidelity 3D clay illustrations, UI badges, and character rigs delivered in FBX, OBJ, and Blender.",
      timeline: "2-3 weeks",
    },
    {
      title: "Interactive Web Experiences",
      desc: "Three.js and WebGL interactive frontends crafted for viral product launches and high-conversion landing pages.",
      timeline: "3-4 weeks",
    },
    {
      title: "Full Brand Identity World",
      desc: "Complete visual identity encompassing typography, color physics, 3D guidelines, and social media component kits.",
      timeline: "4-6 weeks",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 transition-colors"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "#F0FDF4", color: "#16A34A" }}>
            <Sparkles size={14} />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <Editable
              value={props?.contactTitle || "Ready to sculpt your brand's next chapter?"}
              onChange={(v) => onChange?.({ contactTitle: v })}
            />
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: inkSecond }}>
            <Editable
              value={props?.contactSubtitle || "Reach out directly. No gatekeepers, automated bots, or tedious questionnaires."}
              onChange={(v) => onChange?.({ contactSubtitle: v })}
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Contact Information Cards */}
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
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: inkSecond }}>
                  Primary Inquiries
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                  Reply in &lt; 24h
                </span>
              </div>

              <div className="text-xl sm:text-2xl font-black tracking-tight mb-6" style={{ color: ink }}>
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
                  <span>{copied ? "Email Copied to Clipboard!" : "Copy Direct Email"}</span>
                </button>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold border transition-colors cursor-pointer"
                  style={{ borderColor: "rgba(0,0,0,0.12)", color: ink }}
                >
                  <span>Open Email Client</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Direct Studio Details: Phone & Studio Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="p-6 rounded-3xl border"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(0,0,0,0.07)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-lime-100 flex items-center justify-center text-lime-800">
                    <Phone size={15} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Studio Line
                  </span>
                </div>
                <div className="text-base font-bold" style={{ color: ink }}>
                  +1 (415) 890-4421
                </div>
                <div className="text-xs mt-1" style={{ color: inkSecond }}>
                  Mon – Fri: 9am – 6pm PST
                </div>
              </div>

              <div
                className="p-6 rounded-3xl border"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(0,0,0,0.07)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-800">
                    <MapPin size={15} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Headquarters
                  </span>
                </div>
                <div className="text-base font-bold" style={{ color: ink }}>
                  San Francisco & Remote
                </div>
                <div className="text-xs mt-1" style={{ color: inkSecond }}>
                  554 Mission St, SoMa
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: "What We Offer" Overview Cards */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold tracking-tight mb-2" style={{ color: ink }}>
              Engagement Formats
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
                  borderColor: "rgba(0,0,0,0.07)",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-base font-bold" style={{ color: ink }}>
                    {item.title}
                  </h4>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase"
                    style={{ backgroundColor: `${accent}25`, color: ink }}
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

export default DigitalAgency1Contact;
