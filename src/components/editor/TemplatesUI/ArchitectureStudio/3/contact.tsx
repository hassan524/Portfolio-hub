// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Send, Check } from "lucide-react";

export function ArchitectureStudio3Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#0D0D10";
  const ink = theme?.ink || "#FFFFFF";
  const fontBody = theme?.fontBody || "DM Sans";
  const email = props?.email || "commissions@ambitious.studio";

  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="w-full px-6 md:px-12 lg:px-16 py-24 md:py-36 transition-colors"
      style={{
        backgroundColor: bg,
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Asymmetrical 2-Column Monumental Split (No border boxes) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Monumental Typographic Statement */}
          <div className="lg:col-span-6 space-y-8">
            <span className="text-xs font-mono uppercase tracking-[0.24em] text-white/60 block">
              <Editable value="Direct Inquiries" />
            </span>

            <Editable
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight leading-[0.95] text-white"
              value={props?.title || "Let's build something monumental."}
              onChange={(v) => onChange?.({ title: v })}
            />

            <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed max-w-lg">
              We take on select architectural, civic, and cultural commissions worldwide. Contact our studios in Oslo and New York to begin the conversation.
            </p>

            <div className="pt-4 space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 block mb-1">
                  Direct Partner Email
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-2xl sm:text-3xl font-bold text-white hover:text-white/80 transition-colors inline-flex items-center gap-2"
                >
                  <Editable value={email} onChange={(v) => onChange?.({ email: v })} />
                  <ArrowUpRight size={22} className="text-white/60" />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4 text-xs font-mono text-white/60">
                <div>
                  <span className="text-white font-bold block mb-1">OSLO ATELIER</span>
                  <p className="font-sans text-white/70 leading-relaxed">
                    Akershusstranda 15, Oslo
                    <br />
                    +47 22 94 00 00
                  </p>
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">NEW YORK STUDIO</span>
                  <p className="font-sans text-white/70 leading-relaxed">
                    547 W 26th Street, NY
                    <br />
                    +1 212 555 0198
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Dark Floating Form (No borders, soft dark card) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl p-8 sm:p-12 bg-white/[0.04] shadow-2xl">
              <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-6">
                Send a Message
              </h3>

              {sent ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white text-black mx-auto flex items-center justify-center">
                    <Check size={20} />
                  </div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-wider">
                    Message Sent
                  </h4>
                  <p className="text-sm text-white/70 max-w-sm mx-auto font-light">
                    Thank you for reaching out. A partner will review your inquiry and follow up promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-4 text-xs font-mono uppercase tracking-widest text-white underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] text-white text-sm outline-none transition-all focus:bg-white/[0.1] focus:ring-1 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@studio.org"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] text-white text-sm outline-none transition-all focus:bg-white/[0.1] focus:ring-1 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Project Location / City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Stockholm, Sweden"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] text-white text-sm outline-none transition-all focus:bg-white/[0.1] focus:ring-1 focus:ring-white/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                      Project Details
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe the site, scale, and timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] text-white text-sm outline-none transition-all focus:bg-white/[0.1] focus:ring-1 focus:ring-white/30 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-xs uppercase tracking-[0.18em] font-bold bg-white text-black hover:bg-white/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4"
                  >
                    <span>Send Inquiry</span>
                    <Send size={13} />
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

export const Contact = ArchitectureStudio3Contact;
export default ArchitectureStudio3Contact;
