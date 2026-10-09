// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sun, CheckCircle2 } from "lucide-react";
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
  const bg = theme?.bg || "#FAF5EE";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#14213D";
  const inkSecond = theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#E07A5F";
  const surface = theme?.surface || "#F1E9DE";

  const [booking, setBooking] = useState({
    name: "",
    email: "",
    guests: "2 Guests",
    area: "Garden Terrace (Outdoor)",
    date: "",
    time: "6:30 PM",
  });
  const [confirmed, setConfirmed] = useState(false);

  const phone = props?.phone || "(415) 555-0182";
  const address = props?.address || "312 Marina Blvd, Fort Mason, San Francisco, CA 94123";

  const handleBooking = (e: any) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 5000);
  };

  return (
    <section id="contact" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 font-serif text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            <span>☀️</span>
            <Editable
              as="span"
              value={props?.eyebrow || "JOIN US ON THE TERRACE"}
              onChange={(v: string) => onChange?.({ eyebrow: v })}
            />
          </div>

          <Editable
            as="h2"
            value={props?.title || "Terrace Bookings & Brasserie Hours"}
            onChange={(v: string) => onChange?.({ title: v })}
            className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-5xl"
            style={{ color: ink }}
          />

          <Editable
            as="p"
            value={
              props?.subtitle ||
              "Enjoy breezy afternoon lunches, raw bar aperitifs, and candlelit seafood dinners. Heated terrace seating available year-round."
            }
            onChange={(v: string) => onChange?.({ subtitle: v })}
            className="mt-4 text-sm sm:text-base leading-relaxed"
            style={{ color: inkSecond }}
          />
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Reservation Widget */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.06, ease: "easeOut" }}
            className="rounded-[2.5rem] border p-8 shadow-sm lg:col-span-7"
            style={{ backgroundColor: bgSecond, borderColor: surface }}
          >
            <h3 className="font-serif text-2xl font-bold" style={{ color: ink }}>
              Reserve Your Table
            </h3>
            <p className="mt-1 text-xs" style={{ color: inkSecond }}>
              Terrace & Main Dining Room • Walk-ins always welcome at the Raw Bar
            </p>

            <form onSubmit={handleBooking} className="mt-6 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Party Size
                  </label>
                  <select
                    value={booking.guests}
                    onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
                    className="w-full rounded-2xl border px-3.5 py-3 text-xs outline-none"
                    style={{ backgroundColor: bg, borderColor: surface, color: ink }}
                  >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>4 Guests</option>
                    <option>6 Guests</option>
                    <option>8+ Group</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Area Preference
                  </label>
                  <select
                    value={booking.area}
                    onChange={(e) => setBooking({ ...booking, area: e.target.value })}
                    className="w-full rounded-2xl border px-3.5 py-3 text-xs outline-none"
                    style={{ backgroundColor: bg, borderColor: surface, color: ink }}
                  >
                    <option>Garden Terrace (Outdoor)</option>
                    <option>Main Dining Hall</option>
                    <option>Raw Bar Counter</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full rounded-2xl border px-3.5 py-2.5 text-xs outline-none"
                    style={{ backgroundColor: bg, borderColor: surface, color: ink }}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Camille Laurent"
                    value={booking.name}
                    onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                    className="w-full rounded-2xl border px-4 py-3 text-xs outline-none"
                    style={{ backgroundColor: bg, borderColor: surface, color: ink }}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="camille@domain.com"
                    value={booking.email}
                    onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                    className="w-full rounded-2xl border px-4 py-3 text-xs outline-none"
                    style={{ backgroundColor: bg, borderColor: surface, color: ink }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white shadow-md transition duration-200 hover:scale-[1.01]"
                style={{ backgroundColor: accent }}
              >
                <Calendar size={17} />
                <Editable
                  as="span"
                  value={props?.buttonText || "Confirm Terrace Reservation"}
                  onChange={(v: string) => onChange?.({ buttonText: v })}
                />
              </button>

              {confirmed && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border p-3.5 text-center text-xs font-semibold"
                  style={{ backgroundColor: `${accent}15`, borderColor: accent, color: accent }}
                >
                  ✓ Reservation confirmed for {booking.area}! We look forward to welcoming you.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Direct Host Stand & Phone SVG */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-4 lg:col-span-5"
          >
            {/* Phone Card */}
            <div
              className="rounded-3xl border p-6 shadow-sm"
              style={{ backgroundColor: bgSecond, borderColor: surface }}
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm"
                  style={{ backgroundColor: accent }}
                >
                  <PhoneSvg className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                    Host Stand & Day-Of Changes
                  </p>
                  <a
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="mt-0.5 block font-serif text-xl font-bold transition hover:opacity-80"
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
              <p className="mt-3 text-xs leading-relaxed" style={{ color: inkSecond }}>
                Give us a ring for same-day terrace availability or large party questions.
              </p>
            </div>

            {/* Brasserie Hours */}
            <div
              className="rounded-3xl border p-6 shadow-sm"
              style={{ backgroundColor: bgSecond, borderColor: surface }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: bg, color: accent }}
                >
                  <Clock size={20} />
                </span>
                <div>
                  <h4 className="font-serif text-base font-bold" style={{ color: ink }}>
                    Brasserie & Terrace Hours
                  </h4>
                  <div className="mt-2 space-y-1 text-xs" style={{ color: inkSecond }}>
                    <p><strong style={{ color: ink }}>Lunch & Raw Bar:</strong> Daily 11:30 AM – 3:30 PM</p>
                    <p><strong style={{ color: ink }}>Aperitivo Hour:</strong> Daily 3:30 PM – 5:30 PM</p>
                    <p><strong style={{ color: ink }}>Dinner:</strong> Daily 5:30 PM – 10:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div
              className="rounded-3xl border p-6 shadow-sm"
              style={{ backgroundColor: bgSecond, borderColor: surface }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: bg, color: accent }}
                >
                  <MapPin size={20} />
                </span>
                <div className="min-w-0">
                  <h4 className="font-serif text-base font-bold" style={{ color: ink }}>
                    Location
                  </h4>
                  <Editable
                    as="p"
                    value={address}
                    onChange={(v: string) => onChange?.({ address: v })}
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: inkSecond }}
                  />
                  <p className="mt-1 text-[11px]" style={{ color: inkSecond }}>
                    Overlooking the Marina harbor with easy street and pier parking.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export const Restaurant3Contact = Contact;
export const ContactForm = Contact;
export default Contact;
