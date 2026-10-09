// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaPinterest } from "react-icons/fa";

const ICONS: Record<string, any> = { instagram: FaInstagram, facebook: FaFacebook, pinterest: FaPinterest };

export function Bakery1Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#ffffff";
  const ink = theme?.ink || "#1a1a1a";
  const surface = theme?.surface || "#dcdbd8";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  return (
    <section id="contact" className="scroll-mt-20 py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-16 border-b pb-10"
          style={{ borderColor: surface }}
        >
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill={accent}><circle cx="12" cy="12" r="6" /></svg>
            <Editable as="p" className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }} value="05 — Visit Our Bakery" />
          </div>
          <Editable
            as="h2"
            className="text-4xl md:text-6xl font-light tracking-tight"
            style={{ fontFamily: fontHeading }}
            value={props.contactTitle || "Come taste the tradition in person."}
            onChange={(contactTitle) => onChange?.({ contactTitle })}
          />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x" style={{ borderColor: surface }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:px-8 first:pl-0 pt-8 lg:pt-0"
          >
            <p className="font-semibold uppercase tracking-wider text-xs mb-3" style={{ color: accent }}>Location</p>
            <Editable as="p" className="text-xl font-medium leading-relaxed" style={{ fontFamily: fontHeading }} value={props.address || "14 Mill Lane, Cotswolds GL54 1AB"} onChange={(address) => onChange?.({ address })} />
            <p className="mt-6 text-sm opacity-60">Free parking available in the rear courtyard for all patrons.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:px-8 pt-8 lg:pt-0"
          >
            <p className="font-semibold uppercase tracking-wider text-xs mb-3" style={{ color: accent }}>Opening Hours</p>
            <Editable as="p" className="text-xl font-medium leading-relaxed" style={{ fontFamily: fontHeading }} value={props.hours || "Mon – Sat: 7am – 4pm · Sun: 8am – 2pm"} onChange={(hours) => onChange?.({ hours })} />
            <p className="mt-6 text-sm opacity-60">Fresh bakes emerge hourly from dawn every single morning.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:px-8 pt-8 lg:pt-0"
          >
            <p className="font-semibold uppercase tracking-wider text-xs mb-3" style={{ color: accent }}>Direct Inquiries</p>
            <Editable as="p" className="text-xl font-medium leading-relaxed" style={{ fontFamily: fontHeading }} value={props.email || "hello@thepantry.co"} onChange={(email) => onChange?.({ email })} />

            {props.socials && props.socials.length > 0 && (
              <div className="mt-8 flex gap-3">
                {props.socials.map((s: any, i: number) => {
                  const Icon = ICONS[s.platform?.toLowerCase()] ?? FaInstagram;
                  return (
                    <a key={i} href={s.url || "#"} className="h-10 w-10 rounded-full grid place-items-center transition-opacity hover:opacity-70" style={{ backgroundColor: surface, color: ink }}>
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}