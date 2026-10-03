// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Terminal, Shield } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency4Contact({ props = {}, theme, onChange }: any) {
  const [copied, setCopied] = useState(false);

  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || "#F8FAFC";
  const ink = theme?.ink || "#0A1128";
  const inkSecond = theme?.["ink-second"] || "#475569";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#2563EB";

  const email = "solutions@codereyes.tech";

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const engagementModels = [
    {
      title: "Dedicated Engineering Pod",
      desc: "Full-stack squad (Lead Architect, Frontend/Mobile engineers, DevOps) embedded into your workflow.",
      period: "Monthly Retainer",
    },
    {
      title: "Fixed-Scope Product Sprint",
      desc: "Architectural blueprint, UI/UX prototyping, and core MVP development delivered within a set timeline.",
      period: "4-8 weeks",
    },
    {
      title: "Cloud & Security Architecture Audit",
      desc: "Deep security penetration review, AWS cost optimization, and infrastructure automated scaling setup.",
      period: "2 weeks",
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700">
            <Terminal size={14} />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: ink }}>
            <Editable
              value={props?.contactTitle || "Let's Engineer Your Next Digital Milestone"}
              onChange={(v) => onChange?.({ contactTitle: v })}
            />
          </h2>
          <p className="text-base sm:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: inkSecond }}>
            <Editable
              value={props?.contactSubtitle || "Connect directly with our engineering leads. No gatekeepers, immediate technical evaluation."}
              onChange={(v) => onChange?.({ contactSubtitle: v })}
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Email Card with 1-Click Copy */}
            <div
              className="p-8 rounded-3xl border transition-all"
              style={{
                backgroundColor: surface,
                borderColor: "rgba(10, 17, 40, 0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
                  Solutions Engineering Desk
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                  Guaranteed Reply &lt; 12h
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
                    backgroundColor: accent,
                    color: "#FFFFFF",
                  }}
                >
                  {copied ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                  <span>{copied ? "Email Copied to Clipboard!" : "Copy Engineering Email"}</span>
                </button>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold border transition-colors cursor-pointer"
                  style={{ borderColor: "rgba(10,17,40,0.12)", color: ink }}
                >
                  <span>Open Email</span>
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
                  borderColor: "rgba(10, 17, 40, 0.08)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Phone size={15} style={{ color: accent }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Tech Hotline
                  </span>
                </div>
                <div className="text-base font-bold" style={{ color: ink }}>
                  +1 (800) 932-4019
                </div>
                <div className="text-xs mt-1" style={{ color: inkSecond }}>
                  Monday – Friday: 24/5 On-Call
                </div>
              </div>

              <div
                className="p-6 rounded-3xl border"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(10, 17, 40, 0.08)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <MapPin size={15} style={{ color: accent }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Tech Hub
                  </span>
                </div>
                <div className="text-base font-bold" style={{ color: ink }}>
                  Austin, Texas
                </div>
                <div className="text-xs mt-1" style={{ color: inkSecond }}>
                  401 Congress Ave, Suite 1500
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Engagement Models */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-lg font-bold tracking-tight mb-2" style={{ color: ink }}>
              Engagement Models
            </h3>

            {engagementModels.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border flex flex-col justify-between"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(10, 17, 40, 0.08)",
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="text-base font-bold" style={{ color: ink }}>
                    {item.title}
                  </h4>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase"
                    style={{ backgroundColor: `${accent}15`, color: accent }}
                  >
                    {item.period}
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

export default DigitalAgency4Contact;
