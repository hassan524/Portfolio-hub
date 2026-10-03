// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, Calendar } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Contact({ props = {}, theme, onChange }: any) {
  const [copied, setCopied] = useState(false);

  // Dynamic theme colors
  const bg = theme?.bg || theme?.bgPrimary || "#0C0C0E";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#16161A";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#9CA3AF";
  const surface = theme?.surface || "#1F1F24";
  const accent = theme?.accent || "#CCFF00";

  const email = "david@growthcatalysts.com";

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 transition-colors relative"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - NO BOX CARDS */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${accent}20`, color: accent }}>
            <Calendar size={13} />
            <span>Direct Principal Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Schedule a Confidential Consultation
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}>
            Connect directly with David Harrison. All initial strategic diagnostics are conducted under strict mutual non-disclosure agreements.
          </p>
        </div>

        {/* Unified Direct Communication Dock - NO BOX CARDS */}
        <div
          className="p-8 sm:p-12 rounded-3xl"
          style={{
            backgroundColor: surface,
            border: `1px solid ${textSecond}25`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: accent }}>
                Direct Desk Email
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight" style={{ color: text }}>
                {email}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: textSecond }}>
                Direct line for board members, venture partners, and prospective founders. Response guaranteed within 12 business hours.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="w-full py-3.5 px-6 rounded-full text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                style={{
                  backgroundColor: accent,
                  color: "#000000",
                }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? "Direct Email Copied!" : "Copy Principal Email"}</span>
              </button>

              <a
                href={`mailto:${email}`}
                className="w-full py-3.5 px-6 rounded-full text-xs font-bold text-center border transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                style={{ borderColor: `${textSecond}30`, color: text }}
              >
                <span>Launch Mail App</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

          </div>

          {/* Secondary Coordinates Strip */}
          <div className="mt-10 pt-8 border-t grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs" style={{ borderColor: `${textSecond}20` }}>
            <div>
              <span className="font-bold block mb-1" style={{ color: text }}>Private Hotline</span>
              <span style={{ color: textSecond }}>+1 (415) 890-5542</span>
            </div>
            <div>
              <span className="font-bold block mb-1" style={{ color: text }}>Executive Offices</span>
              <span style={{ color: textSecond }}>San Francisco • Zurich • Singapore</span>
            </div>
            <div>
              <span className="font-bold block mb-1" style={{ color: text }}>Capacity Status</span>
              <span style={{ color: accent }}>Accepting 2 Private Retainers</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DigitalAgency2Contact;
