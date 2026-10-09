// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

function PhoneSvg({ className = "w-5 h-5", ...props }: any) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const phone = props?.phone || "+1 (415) 555-0142";
  const email = props?.email || "hello@forgeline.studio";
  const address = props?.address || "218 Harbor Street, Suite 4, San Francisco, CA 94105";

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <Editable
            as="p"
            value={props?.eyebrow || "GET IN TOUCH"}
            onChange={(v: string) => onChange?.({ eyebrow: v })}
            className="text-xs font-semibold tracking-[0.25em]"
            style={{ color: inkSecond }}
          />
          <Editable
            as="h2"
            value={props?.title || "Let's talk about your project"}
            onChange={(v: string) => onChange?.({ title: v })}
            className="mt-3 font-['Poppins'] text-3xl font-bold tracking-tight sm:text-5xl"
            style={{ color: ink }}
          />
          <Editable
            as="p"
            value={props?.text || "Drop us a line or give us a call. We reply within one business day."}
            onChange={(v: string) => onChange?.({ text: v })}
            className="mt-4 text-base sm:text-lg"
            style={{ color: inkSecond }}
          />
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.06, ease: "easeOut" }}
            className="flex flex-col gap-4 lg:col-span-5"
          >
            {/* Phone Card with Phone SVG */}
            <div
              className="relative overflow-hidden rounded-3xl border p-6 transition duration-300 hover:scale-[1.01]"
              style={{ backgroundColor: surface, borderColor: surface }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: accent, color: ink }}
                >
                  <PhoneSvg className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <Editable
                    as="p"
                    value={props?.phoneLabel || "Call Us Directly"}
                    onChange={(v: string) => onChange?.({ phoneLabel: v })}
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: inkSecond }}
                  />
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="mt-0.5 block break-words text-lg font-bold transition hover:opacity-80"
                    style={{ color: ink }}
                  >
                    <Editable
                      as="span"
                      value={phone}
                      onChange={(v: string) => onChange?.({ phone: v })}
                    />
                  </a>
                </div>
              </div>
              <Editable
                as="p"
                value={props?.phoneNote || "Mon to Fri, 9:00 AM to 6:00 PM PT • Speak directly with an engineer"}
                onChange={(v: string) => onChange?.({ phoneNote: v })}
                className="mt-4 text-xs leading-relaxed"
                style={{ color: inkSecond }}
              />
            </div>

            {/* Email Card */}
            <div
              className="flex min-w-0 items-start gap-4 rounded-3xl border p-6"
              style={{ backgroundColor: surface, borderColor: surface }}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
                style={{ backgroundColor: bg, borderColor: surface, color: ink }}
              >
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <Editable
                  as="p"
                  value={props?.emailLabel || "Email"}
                  onChange={(v: string) => onChange?.({ emailLabel: v })}
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: inkSecond }}
                />
                <a
                  href={`mailto:${email}`}
                  className="mt-0.5 block break-words font-semibold transition hover:opacity-80"
                  style={{ color: ink }}
                >
                  <Editable
                    as="span"
                    value={email}
                    onChange={(v: string) => onChange?.({ email: v })}
                  />
                </a>
              </div>
            </div>

            {/* Studio Card */}
            <div
              className="flex min-w-0 items-start gap-4 rounded-3xl border p-6"
              style={{ backgroundColor: surface, borderColor: surface }}
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border"
                style={{ backgroundColor: bg, borderColor: surface, color: ink }}
              >
                <MapPin className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <Editable
                  as="p"
                  value={props?.addressLabel || "Studio"}
                  onChange={(v: string) => onChange?.({ addressLabel: v })}
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: inkSecond }}
                />
                <Editable
                  as="p"
                  value={address}
                  onChange={(v: string) => onChange?.({ address: v })}
                  className="mt-0.5 break-words text-sm font-medium leading-relaxed"
                  style={{ color: ink }}
                />
              </div>
            </div>

            {/* Response Time Badge */}
            <div
              className="flex items-center gap-2.5 rounded-2xl border px-4 py-3"
              style={{ backgroundColor: bg, borderColor: surface }}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: accent }} />
              <Editable
                as="span"
                value={props?.badge || "Fast turnaround — guaranteed reply within 24 hours"}
                onChange={(v: string) => onChange?.({ badge: v })}
                className="text-xs font-medium"
                style={{ color: inkSecond }}
              />
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.12, ease: "easeOut" }}
            className="rounded-3xl border p-7 sm:p-9 lg:col-span-7"
            style={{ backgroundColor: surface, borderColor: surface }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{ backgroundColor: bg, borderColor: surface, color: ink }}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                    style={{ backgroundColor: bg, borderColor: surface, color: ink }}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                  Project Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your project, timeline, and goals..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2"
                  style={{ backgroundColor: bg, borderColor: surface, color: ink }}
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition hover:scale-[1.01] active:scale-95"
                style={{ backgroundColor: accent, color: ink }}
              >
                <Send className="h-4 w-4" />
                <Editable
                  as="span"
                  value={props?.buttonText || "Send Message"}
                  onChange={(v: string) => onChange?.({ buttonText: v })}
                />
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border p-3 text-center text-xs font-semibold"
                  style={{ backgroundColor: bg, borderColor: accent, color: accent }}
                >
                  ✓ Thanks! Your message has been sent. We'll be in touch soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const SaaSProduct5Contact = Contact;
export const ContactForm = Contact;
export default Contact;
