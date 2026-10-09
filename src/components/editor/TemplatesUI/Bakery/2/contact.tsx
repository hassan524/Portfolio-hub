// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Send, Check } from "lucide-react";
import { FaInstagram, FaPinterest, FaFacebook } from "react-icons/fa";

export function Bakery2Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#f7f4f6";
  const ink = theme?.ink || "#242023";
  const accent = theme?.accent || "#b23b68";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";
  const email = props?.email || "bonjour@levainatelier.com";

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="scroll-mt-20 py-24 md:py-36 transition-colors"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Studio Coordinates & Visiting Protocol */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] font-bold block mb-3" style={{ color: accent }}>
                06 // ATELIER VISIT & INQUIRIES
              </span>
              <Editable
                as="h2"
                className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08] mb-6"
                style={{ fontFamily: fontHeading }}
                value={props.contactTitle || "Come smell the freshly baked bread."}
                onChange={(contactTitle) => onChange?.({ contactTitle })}
              />
              <p className="text-base opacity-75 font-light leading-relaxed">
                Our counter opens at dawn every morning. Stop by for warm morning pastries, espresso, and sourdough boules straight from the oven.
              </p>
            </div>

            <div className="space-y-6 pt-4 text-sm font-light">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold block opacity-40 mb-1">
                  Atelier Address
                </span>
                <Editable
                  as="p"
                  className="text-lg font-medium"
                  style={{ fontFamily: fontHeading }}
                  value={props.address || "42 Redchurch Street, Shoreditch, London E2 7DP"}
                  onChange={(address) => onChange?.({ address })}
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold block opacity-40 mb-1">
                  Baking & Counter Hours
                </span>
                <p className="text-base">
                  Tuesday – Friday: 07:00 – 16:00
                  <br />
                  Saturday – Sunday: 08:00 – Sold Out
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold block opacity-40 mb-1">
                  Direct Inquiries & Wholesale
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-lg font-medium hover:opacity-75 transition-opacity"
                  style={{ color: accent }}
                >
                  <Editable value={email} onChange={(email) => onChange?.({ email })} />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex gap-3">
              {[
                { icon: FaInstagram, url: "#" },
                { icon: FaPinterest, url: "#" },
                { icon: FaFacebook, url: "#" },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs hover:opacity-70 transition-opacity"
                  style={{ color: ink }}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Floating Form (No border cages) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-white shadow-xs">
              <h3 className="text-2xl font-light tracking-tight mb-2" style={{ fontFamily: fontHeading }}>
                Send a Message
              </h3>
              <p className="text-xs opacity-60 font-light mb-8">
                For wholesale inquiries, private masterclasses, or table reservations.
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <Check size={20} />
                  </div>
                  <h4 className="text-2xl font-light" style={{ fontFamily: fontHeading }}>
                    Message Received
                  </h4>
                  <p className="text-xs opacity-75 max-w-sm mx-auto font-light">
                    Thank you. We will get back to you within 24 hours with our fresh catalog or confirmation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-semibold uppercase tracking-wider underline cursor-pointer"
                    style={{ color: accent }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium opacity-70 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Elena Moreau"
                        className="w-full px-4 py-3 rounded-xl bg-black/[0.03] text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10"
                        style={{ color: ink }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-medium opacity-70 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="elena@table.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/[0.03] text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10"
                        style={{ color: ink }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium opacity-70 mb-1.5">
                      Inquiry Focus
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Weekly Wholesale / Sourdough Workshop / Event"
                      className="w-full px-4 py-3 rounded-xl bg-black/[0.03] text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10"
                      style={{ color: ink }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium opacity-70 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your needs, dates, or questions..."
                      className="w-full px-4 py-3 rounded-xl bg-black/[0.03] text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10 resize-none"
                      style={{ color: ink }}
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold text-white transition-transform hover:-translate-y-0.5 cursor-pointer shadow-sm flex items-center gap-2"
                      style={{ backgroundColor: accent }}
                    >
                      <span>Send Message</span>
                      <Send size={13} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Contact = Bakery2Contact;
export default Bakery2Contact;
