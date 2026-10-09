// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Radio } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio4Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#050505";
  const bgSecond = theme?.["bg-second"] || "#111111";
  const ink = theme?.ink || "#F5F1EA";
  const inkSecond = theme?.["ink-second"] || "#9C978F";
  const surface = theme?.surface || "rgba(245, 241, 234, 0.16)";
  const accent = theme?.accent || "#FF5C35";

  return (
    <section
      id="contact"
      className="relative px-5 py-28 sm:px-8 lg:px-14 border-t font-mono"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.2em] font-semibold"
          style={{ color: accent }}
        >
          <Editable
            value={props?.eyebrow || "04 / Turn the lights on."}
            onChange={(v) => onChange?.({ eyebrow: v })}
          />
        </motion.div>

        {/* Massive Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 text-[clamp(3.8rem,11vw,10.5rem)] font-bold tracking-[-0.09em] leading-[0.8] select-none uppercase"
        >
          <span className="block">
            <Editable
              value={props?.title1 || "Bring us the"}
              onChange={(v) => onChange?.({ title1: v })}
            />
          </span>
          <span
            className="block font-serif italic font-semibold tracking-[-0.07em] lowercase mt-2"
            style={{ color: accent }}
          >
            <Editable
              value={props?.titleAccent || "good strange."}
              onChange={(v) => onChange?.({ titleAccent: v })}
            />
          </span>
        </motion.h2>

        {/* Email & Contact Metadata Bar */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end border-t pt-10" style={{ borderColor: surface }}>
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-widest" style={{ color: inkSecond }}>
              Inquiries & Commissions
            </p>
            <a
              href={`mailto:${props?.email || "hello@nox.studio"}`}
              className="mt-4 inline-flex items-center gap-3 text-xl sm:text-3xl font-bold uppercase tracking-tight border-b-2 pb-2 transition-all hover:gap-5"
              style={{ color: accent, borderColor: accent }}
            >
              <Editable
                value={props?.email || "hello@nox.studio"}
                onChange={(v) => onChange?.({ email: v })}
              />
              <ArrowUpRight size={28} />
            </a>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[11px] uppercase tracking-wider">
            <div className="p-4 rounded border" style={{ borderColor: surface, backgroundColor: bgSecond }}>
              <div className="flex items-center gap-2 mb-2" style={{ color: accent }}>
                <MapPin size={14} />
                <span className="font-bold">Studio Hub</span>
              </div>
              <p style={{ color: inkSecond }}>London / Tokyo / Lagos</p>
            </div>

            <div className="p-4 rounded border" style={{ borderColor: surface, backgroundColor: bgSecond }}>
              <div className="flex items-center gap-2 mb-2" style={{ color: accent }}>
                <Radio size={14} />
                <span className="font-bold">Availability</span>
              </div>
              <p style={{ color: inkSecond }}>Q2 2026 Productions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
