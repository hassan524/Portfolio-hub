// @ts-nocheck
import { useState } from "react";
import { Mail, MapPin, Send, Check, Copy, ArrowUpRight, Camera } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PhotographyPortfolio1Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FCFBF8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F5F3ED";
  const ink = theme?.text || theme?.ink || "#1A1918";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6E6B65";
  const accent = theme?.accent || "#8E2823";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const email = props.email || "commissions@atelierdelacroix.com";
  const shootTypes = props.shootTypes || [
    "Campaign & Lookbook", "Editorial Cover", "Private VIP Portraiture", "Runway & Backstage", "Commercial Licensing"
  ];

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    email: "",
    shootType: shootTypes[0],
    location: "Paris, France",
    timeline: "Autumn 2026",
    brief: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    const body = `Brand/Name: ${formData.name} (${formData.brand})\nType: ${formData.shootType}\nLocation: ${formData.location}\nTimeline: ${formData.timeline}\n\nBrief:\n${formData.brief}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Commission Inquiry: " + formData.name)}&body=${encodeURIComponent(body)}`;
  };

  const inputStyle = {
    background: bg,
    borderColor: `${ink}20`,
    color: ink,
  };

  return (
    <section id="contact" className="py-20 sm:py-32" style={{ background: bgSecond, color: ink }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
                <Camera size={13} />
                <Editable value={props.contactEyebrow || "Direct Inquiry"} onChange={(v) => onChange?.({ contactEyebrow: v })} />
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal leading-tight">
                <Editable value={props.contactTitle || "Commission an Editorial Vision"} onChange={(v) => onChange?.({ contactTitle: v })} />
              </h2>
              <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
                <Editable
                  value={props.contactSubtitle || "Now booking editorial assignments, brand lookbooks, and private commissions across Europe, the Americas, and Asia for 2026/2027."}
                  onChange={(v) => onChange?.({ contactSubtitle: v })}
                />
              </p>
            </div>

            {/* Studio Coordinates */}
            <div className="space-y-4 pt-4 border-t" style={{ borderColor: `${ink}15` }}>
              <div className="flex items-center gap-3 text-xs font-mono">
                <MapPin size={16} style={{ color: accent }} />
                <span>Atelier No. 14, Rue du Faubourg Saint-Honoré, 75008 Paris</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <Mail size={16} style={{ color: accent }} />
                <span>Representation: Studio Delacroix Agency</span>
              </div>
            </div>

            {/* Copy Email Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider border transition-all hover:bg-black/5"
                style={{ borderColor: `${ink}20`, background: bg }}
              >
                {copied ? <Check size={14} style={{ color: accent }} /> : <Copy size={14} />}
                <span>{copied ? "Address Copied to Clipboard" : email}</span>
              </button>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-6 sm:p-10 border shadow-xl space-y-5"
              style={{ background: bg, borderColor: `${ink}15` }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 opacity-70">
                    Your Name *
                  </label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jean-Luc Godard"
                    className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 opacity-70">
                    Publication / Brand
                  </label>
                  <input
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Maison de Couture"
                    className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 opacity-70">
                  Commission Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {shootTypes.map((type: string) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, shootType: type })}
                      className="px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer"
                      style={{
                        background: formData.shootType === type ? ink : bgSecond,
                        color: formData.shootType === type ? bg : inkSecond,
                        border: `1px solid ${formData.shootType === type ? ink : "transparent"}`,
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 opacity-70">
                    Work Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="director@publication.com"
                    className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 opacity-70">
                    Shoot City / Location
                  </label>
                  <input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Paris, France"
                    className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-2 opacity-70">
                  Project Brief & Production Scope
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  placeholder="Outline the creative concept, estimated deliverables, moodboard references, and dates..."
                  className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-colors"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-md"
                style={{ background: accent, color: onAccent }}
              >
                <span>{props.submitCta || "Transmit Inquiry"}</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotographyPortfolio1Contact;
