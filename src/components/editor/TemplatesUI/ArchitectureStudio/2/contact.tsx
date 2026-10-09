// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Send, Check } from "lucide-react";

const mix = (c: string = "#1A1816", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio2Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || theme?.bg || "#EBE5DC";
  const ink = theme?.ink || "#1A1816";
  const accent = theme?.accent || "#C85A32";
  const fontBody = theme?.fontBody || "DM Sans";
  const email = props?.email || "commissions@cubiq.studio";

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="w-full px-6 md:px-12 py-24 md:py-32 transition-colors"
      style={{
        backgroundColor: bg,
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Full-Width Top Header */}
        <div className="mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold block mb-3" style={{ color: accent }}>
            <Editable value="Contact & Commissions" />
          </span>
          <Editable
            as="h2"
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase leading-none mb-4"
            style={{ color: ink }}
            value={props?.title || "Start a conversation."}
            onChange={(v) => onChange?.({ title: v })}
          />
          <p className="text-base md:text-lg opacity-75 max-w-2xl">
            We partner with institutions, developers, and private patrons worldwide. Reach out to discuss a new commission or collaboration.
          </p>
        </div>

        {/* 3-Column Horizontal Modernist Spread (No border cages) */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Direct Channels */}
          <div className="md:col-span-3 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold opacity-40 block mb-2">
                Direct Email
              </span>
              <a
                href={`mailto:${email}`}
                className="text-lg font-bold block hover:opacity-75 transition-opacity"
                style={{ color: accent }}
              >
                <Editable value={email} onChange={(v) => onChange?.({ email: v })} />
              </a>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold opacity-40 block mb-2">
                Main Switchboard
              </span>
              <p className="text-base font-semibold leading-relaxed">
                +41 44 214 8830
              </p>
              <span className="text-xs opacity-60">Mon – Fri / 09:00 – 18:00 CET</span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold opacity-40 block mb-2">
                Press & Media Inquiries
              </span>
              <p className="text-sm font-medium">press@cubiq.studio</p>
            </div>
          </div>

          {/* Column 2: Studio Locations */}
          <div className="md:col-span-4 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold opacity-40 block mb-2">
                Zürich Headquarters
              </span>
              <p className="text-base font-medium leading-relaxed opacity-90">
                Löwenstrasse 14, 8001 Zürich
                <br />
                Switzerland
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold opacity-40 block mb-2">
                Milan Studio
              </span>
              <p className="text-base font-medium leading-relaxed opacity-90">
                Via Tortona 31, 20144 Milano
                <br />
                Italy
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-bold opacity-40 block mb-2">
                Visiting Hours
              </span>
              <p className="text-sm opacity-75">
                Our studios and material archives are open by appointment for client consultations.
              </p>
            </div>
          </div>

          {/* Column 3: Normal Clean Inquiry Form */}
          <div className="md:col-span-5">
            <div
              className="p-8 sm:p-10 rounded-2xl shadow-xs"
              style={{ backgroundColor: mix(ink, 4) }}
            >
              <h3 className="text-lg font-bold uppercase tracking-wider mb-6" style={{ color: ink }}>
                Send an Inquiry
              </h3>

              {submitted ? (
                <div className="py-8 text-center">
                  <div
                    className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3 text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <Check size={18} />
                  </div>
                  <h4 className="text-base font-bold mb-1">Message Sent</h4>
                  <p className="text-xs opacity-75 mb-4">
                    Thank you. A member of our team will respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold uppercase tracking-wider underline cursor-pointer"
                    style={{ color: accent }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold opacity-70 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/80 text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10"
                      style={{ color: ink }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold opacity-70 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/80 text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10"
                      style={{ color: ink }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold opacity-70 mb-1.5">
                      Project Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cultural Center / Private Residence"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/80 text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10"
                      style={{ color: ink }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold opacity-70 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us about the project scope, location, and timeline..."
                      className="w-full px-4 py-2.5 rounded-lg bg-white/80 text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10 resize-none"
                      style={{ color: ink }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 rounded-lg text-xs uppercase tracking-widest font-bold text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    style={{ backgroundColor: accent }}
                  >
                    <span>Send Inquiry</span>
                    <ArrowUpRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Contact = ArchitectureStudio2Contact;
export default ArchitectureStudio2Contact;
