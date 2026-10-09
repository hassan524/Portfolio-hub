// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, Mail, Phone, MapPin, Send } from "lucide-react";

const mix = (c: string = "#111417", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio1Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || theme?.bg || "#DFE6E2";
  const ink = theme?.ink || "#111417";
  const accent = theme?.accent || "#D92335";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";
  const email = props?.email || "commissions@sagent.studio";

  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
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
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtle Tag */}
        <span
          className="text-xs uppercase tracking-[0.24em] font-medium block mb-4"
          style={{ color: accent }}
        >
          <Editable value="Get in Touch" />
        </span>

        {/* Centered Poetic Title */}
        <Editable
          as="h2"
          className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.05] mb-6"
          style={{ fontFamily: fontHeading, color: ink }}
          value={props?.title || "Let's discuss your next architectural commission."}
          onChange={(v) => onChange?.({ title: v })}
        />

        <p className="text-base sm:text-lg leading-relaxed opacity-75 max-w-2xl mx-auto mb-12">
          We welcome inquiries for private residences, cultural spaces, and heritage restorations. Please send us a message or reach out to our studio directly.
        </p>

        {/* Big Direct Email Button */}
        <div className="mb-16">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-3 text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight hover:opacity-75 transition-opacity"
            style={{ fontFamily: fontHeading, color: ink }}
          >
            <span>{email}</span>
            <ArrowUpRight size={24} style={{ color: accent }} />
          </a>
        </div>

        {/* Floating Normal Form Card (No harsh borders, soft rounded container) */}
        <div
          className="rounded-3xl p-8 sm:p-12 text-left mb-20 shadow-sm"
          style={{ backgroundColor: mix(ink, 4) }}
        >
          {formSent ? (
            <div className="py-12 text-center">
              <h3 className="text-2xl sm:text-3xl font-medium mb-3" style={{ fontFamily: fontHeading }}>
                Thank you for your message.
              </h3>
              <p className="text-sm opacity-75 max-w-md mx-auto">
                We have received your note and will be in touch shortly.
              </p>
              <button
                type="button"
                onClick={() => setFormSent(false)}
                className="mt-6 text-xs uppercase tracking-widest font-semibold underline cursor-pointer"
                style={{ color: accent }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium opacity-70 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Vance"
                    className="w-full px-4 py-3 rounded-xl bg-white/70 text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10"
                    style={{ color: ink }}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium opacity-70 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/70 text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10"
                    style={{ color: ink }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium opacity-70 mb-2">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your site, timing, and vision..."
                  className="w-full px-4 py-3 rounded-xl bg-white/70 text-sm outline-none transition-shadow focus:ring-2 focus:ring-black/10 resize-none"
                  style={{ color: ink }}
                />
              </div>

              <div className="flex justify-end pt-2">
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

        {/* 3 Clean Studio Columns (No borders, pure clean typography) */}
        <div className="grid sm:grid-cols-3 gap-8 text-left pt-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold block mb-2 opacity-50">
              London Studio
            </span>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              34 Portland Place, Marylebone
              <br />
              London W1B 1JH
              <br />
              +44 (0)20 7946 0821
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-semibold block mb-2 opacity-50">
              Milan Atelier
            </span>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              Via dei Fiori Chiari 18, Brera
              <br />
              20121 Milano, Italy
              <br />
              +39 02 8493 2100
            </p>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest font-semibold block mb-2 opacity-50">
              Kyoto Pavilion
            </span>
            <p className="text-sm font-medium leading-relaxed opacity-90">
              Shinbashi-dori, Higashiyama
              <br />
              Kyoto 605-0087, Japan
              <br />
              +81 75 561 4092
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Contact = ArchitectureStudio1Contact;
export default ArchitectureStudio1Contact;