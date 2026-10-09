// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaCopy, FaCheck } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio1Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme?.bg || "#FFFFFF";
  const text = theme?.text || theme?.ink || "#0F172A";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#2563EB";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";
  const serif = props.serifFont || '"Inter", -apple-system, sans-serif';

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const [copied, setCopied] = useState(false);
  const email = p.email || "hello@alexmorgan.design";

  const copyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact-section"
      className="relative w-full py-28 md:py-36 border-t"
      style={{ background: bg, color: text, borderColor: `${textSecond}25` }}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-10">
        
        <span
          className="text-[11px] tracking-[0.25em] uppercase font-medium block"
          style={{ color: textSecond }}
        >
          (<Editable value={p.contactLabel || "Inquiries & Commissions"} onChange={(v) => handleUpdate("contactLabel", v)} />)
        </span>

        <h2
          className="text-4xl sm:text-6xl md:text-7xl font-light leading-[1.02] tracking-tight max-w-4xl mx-auto"
          style={{ fontFamily: serif }}
        >
          <Editable value={p.contactLead || "Let's make something"} onChange={(v) => handleUpdate("contactLead", v)} />{" "}
          <em className="italic" style={{ color: accent }}>
            <Editable value={p.contactEm || "worth remembering."} onChange={(v) => handleUpdate("contactEm", v)} />
          </em>
        </h2>

        <p className="text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed" style={{ color: textSecond }}>
          <Editable
            value={
              p.contactText ||
              "Currently scheduling identity systems, digital platforms, and private publications for upcoming quarters."
            }
            onChange={(v) => handleUpdate("contactText", v)}
          />
        </p>

        {/* Email Direct Trigger */}
        <div className="pt-4">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-3 text-2xl sm:text-4xl font-light italic pb-2 transition-opacity hover:opacity-80 cursor-pointer"
            style={{ fontFamily: serif, borderBottom: `1px solid ${textSecond}40`, color: text }}
          >
            <span>{email}</span>
            {copied ? (
              <FaCheck className="text-base" style={{ color: accent }} />
            ) : (
              <FaCopy className="text-base" style={{ color: accent }} />
            )}
          </button>
        </div>

        {/* Action Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-transform hover:-translate-y-0.5"
            style={{ background: accent, color: onAccent }}
          >
            <span>Start a conversation</span>
            <ArrowUpRight className="text-xs" />
          </a>
          <span className="text-xs uppercase tracking-widest" style={{ color: textSecond }}>
            Based in Lisbon • Working worldwide
          </span>
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio1Contact;
