// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaEnvelope, FaWhatsapp, FaCalendarCheck, FaCopy, FaCheck } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio2Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#07070D";
  const text = theme.text || theme.ink || "#EEF0FF";
  const muted = theme["text-second"] || "#8B8FA8";
  const surface = theme.surface || "#151524";
  const accent = theme.accent || "#7C9DFF";
  const accent2 = theme["accent-second"] || "#C084FC";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const [copied, setCopied] = useState(false);
  const email = p.email || "hello@novareyes.design";

  const copyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-28 md:py-36 overflow-hidden font-['Poppins',sans-serif]"
      style={{ background: bg, color: text }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-12">
        
        {/* Availability Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-lg"
          style={{ background: `${surface}90`, borderColor: `${text}15`, color: text }}
        >
          <span className="w-2 h-2 rounded-full animate-ping" style={{ background: "#4ADE80" }} />
          <span>Currently booking projects for Q3 / Q4</span>
        </div>

        {/* Big Impact Headline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.04]">
            <Editable value={p.contactLead || "Have an ambitious idea?"} onChange={(v) => handleUpdate("contactLead", v)} />{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${accent}, ${accent2})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <Editable value={p.contactEm || "Let's build it together."} onChange={(v) => handleUpdate("contactEm", v)} />
            </span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed font-light max-w-xl mx-auto" style={{ color: muted }}>
            Direct collaboration with founders and product teams. No bloated agency layers, no account managers—just fast, high-impact design execution.
          </p>
        </div>

        {/* Email Copy Card */}
        <div className="pt-2">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-medium border transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            style={{
              background: `${surface}cc`,
              borderColor: `${text}25`,
              color: text,
            }}
          >
            <span>{email}</span>
            {copied ? (
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <FaCheck /> Copied!
              </span>
            ) : (
              <FaCopy className="text-xs" style={{ color: accent }} />
            )}
          </button>
        </div>

        {/* Direct Action Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto pt-6">
          <a
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl border backdrop-blur-md flex items-center justify-between group hover:-translate-y-0.5 transition-all"
            style={{ background: `${surface}80`, borderColor: `${text}15` }}
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${accent}20`, color: accent }}>
                <FaCalendarCheck />
              </div>
              <div>
                <span className="text-xs font-semibold block text-white">Schedule 20-min Call</span>
                <span className="text-[11px]" style={{ color: muted }}>Direct project intro</span>
              </div>
            </div>
            <ArrowUpRight className="text-xs transition-transform group-hover:rotate-45" style={{ color: accent }} />
          </a>

          <a
            href="https://wa.me/15550199000?text=Hello%20Nova%2C%20I%20would%20like%20to%20discuss%20a%20new%20design%20project."
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl border backdrop-blur-md flex items-center justify-between group hover:-translate-y-0.5 transition-all"
            style={{ background: `${surface}80`, borderColor: `${text}15` }}
          >
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/20 text-emerald-400">
                <FaWhatsapp className="text-lg" />
              </div>
              <div>
                <span className="text-xs font-semibold block text-white">Direct WhatsApp</span>
                <span className="text-[11px]" style={{ color: muted }}>Fast response within hours</span>
              </div>
            </div>
            <ArrowUpRight className="text-xs transition-transform group-hover:rotate-45 text-emerald-400" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio2Contact;
