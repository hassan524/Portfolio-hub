// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency5Contact({ props = {}, theme, onChange }: any) {
  const [copied, setCopied] = useState(false);

  // Dynamic theme tokens - strictly avoiding manual tailwind color classes
  const bg = theme?.bg || theme?.bgPrimary || "#0B26E8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#061385";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "rgba(255, 255, 255, 0.75)";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.12)";
  const accent = theme?.accent || "#FFFFFF";

  const email = "hello@auryx.agency";

  const handleCopy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const capabilities = [
    {
      title: "14-Day Design Sprints",
      desc: "From creative briefing to working production code in two calendar weeks.",
      detail: "Fixed-scope agile cadence",
    },
    {
      title: "Interactive WebGL & 3D",
      desc: "Fluid physics, shaders, and micro-interactions tuned for high retention.",
      detail: "Awwwards-caliber craft",
    },
    {
      title: "AI Workflows & Speed",
      desc: "Custom generative pipelines paired with rigorous human art direction.",
      detail: "10× asset velocity",
    },
    {
      title: "Conversion Systems",
      desc: "Architecture tested against real user funnel analytics and heatmaps.",
      detail: "Measurable commercial lift",
    },
  ];

  const studios = [
    {
      city: "San Francisco // HQ",
      address: "525 Market Street, Suite 2800, San Francisco, CA 94105",
      phone: "+1 (415) 890-2210",
      hours: "Mon – Fri: 08:00 – 18:00 PST",
    },
    {
      city: "London // Studio",
      address: "1 Mark Square, Shoreditch, London EC2A 4EG",
      phone: "+44 (0)20 7946 0912",
      hours: "Mon – Fri: 09:00 – 18:00 GMT",
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden border-t"
      style={{
        backgroundColor: bg,
        borderColor: surface,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-[0.2em] border" style={{ borderColor: surface, backgroundColor: surface, color: text }}>
            <Sparkles size={12} />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight leading-none">
            <Editable
              value={props?.contactTitle || "Initiate Your Campaign"}
              onChange={(v) => onChange?.({ contactTitle: v })}
            />
          </h2>
          <p className="text-sm font-light leading-relaxed max-w-xl mx-auto" style={{ color: textSecond }}>
            Connect directly with our partners. We review every brief within 24 hours without gatekeepers or bots.
          </p>
        </div>

        {/* Unified Direct Communication Dock - NO BOX CARDS */}
        <div
          className="p-8 sm:p-14 rounded-3xl border backdrop-blur-xl space-y-12"
          style={{
            backgroundColor: surface,
            borderColor: surface,
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-10 border-b" style={{ borderColor: surface }}>
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest block opacity-75" style={{ color: textSecond }}>
                Direct Partnership Desk //
              </span>
              <div className="text-2xl sm:text-4xl font-mono font-bold tracking-tight select-all break-all" style={{ color: text }}>
                {email}
              </div>
              <p className="text-xs sm:text-sm font-light" style={{ color: textSecond }}>
                Direct executive access for category leaders, venture founders, and high-growth brands.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
                style={{
                  backgroundColor: copied ? "#22C55E" : text,
                  color: bg,
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? "Direct Email Copied!" : "Copy Direct Email"}</span>
              </button>

              <a
                href={`mailto:${email}`}
                className="w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-wider font-semibold border flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                style={{ borderColor: surface, color: text }}
              >
                <span>Launch Mail Client</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Studios & Capabilities Minimalist Strips - NO BOX CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Studios */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: text }}>
                Global Atelier Desks //
              </span>
              <div className="space-y-4">
                {studios.map((st) => (
                  <div key={st.city} className="border-l-2 pl-4 space-y-1" style={{ borderColor: text }}>
                    <div className="text-sm font-bold uppercase tracking-tight" style={{ color: text }}>{st.city}</div>
                    <div className="text-xs font-light" style={{ color: textSecond }}>{st.address}</div>
                    <div className="text-xs font-mono" style={{ color: textSecond }}>{st.phone} • {st.hours}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Offerings */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: text }}>
                Capabilities & SLA //
              </span>
              <div className="space-y-4">
                {capabilities.map((cap) => (
                  <div key={cap.title} className="border-l-2 pl-4 space-y-0.5" style={{ borderColor: surface }}>
                    <div className="text-sm font-bold" style={{ color: text }}>{cap.title}</div>
                    <div className="text-xs font-light" style={{ color: textSecond }}>{cap.desc}</div>
                    <div className="text-[11px] font-mono opacity-75" style={{ color: textSecond }}>{cap.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DigitalAgency5Contact;
