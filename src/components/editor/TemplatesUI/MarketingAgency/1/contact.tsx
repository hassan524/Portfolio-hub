// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Zap, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const badges = props?.badges || ["Free 30 min audit", "No lock-in contracts", "Reply within 24h"];
  const details = [
    { Icon: Phone, key: "phone", label: "Direct Phone", def: "+1 (415) 555-0182", href: "tel:+14155550182" },
    { Icon: MapPin, key: "address", label: "Studio Address", def: "218 Mission Street, Floor 4, San Francisco, CA 94105", href: "https://maps.google.com" },
    { Icon: Clock, key: "hours", label: "Operating Hours", def: "Mon to Fri, 9:00 AM to 6:30 PM PST", href: null },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32" style={{ background: `linear-gradient(180deg, ${bg}, ${bgSecond})`, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Giant Typographic Eyebrow & Headline */}
        <div className="border-b pb-12" style={{ borderColor: surface }}>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
            <Editable as="span" className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }} value={props?.eyebrow || "04 / Start Project"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </div>
          <Editable
            as="h2"
            className="mt-6 text-[clamp(3.5rem,11vw,12rem)] font-black uppercase leading-[0.82] tracking-tighter"
            value={props?.title || "Let's talk."}
            onChange={(v) => onChange?.({ title: v })}
          />
        </div>

        {/* Grand Full-Width Main Email Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-12 overflow-hidden rounded-3xl p-8 md:p-16"
          style={{ background: accent, color: bg }}
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em]">
                <Mail size={16} />
                <Editable as="span" value={props?.emailLabel || "Direct Executive Inquiries"} onChange={(v) => onChange?.({ emailLabel: v })} />
              </div>
              <Editable
                as="div"
                className="mt-3 break-all text-[clamp(2rem,6vw,5.5rem)] font-black uppercase leading-none tracking-tight"
                value={props?.email || "hello@voltage.studio"}
                onChange={(v) => onChange?.({ email: v })}
              />
            </div>
            <a
              href={`mailto:${props?.email || "hello@voltage.studio"}`}
              className="inline-flex items-center gap-3 rounded-full px-8 py-5 text-base font-black uppercase tracking-wider transition hover:scale-105 active:scale-95"
              style={{ background: bg, color: ink }}
            >
              Compose Mail <ArrowUpRight size={20} style={{ color: accent }} />
            </a>
          </div>
        </motion.div>

        {/* Full-Bleed Architectural Contact Columns (Divided by lines, not boxes) */}
        <div className="grid divide-y border-b md:grid-cols-3 md:divide-x md:divide-y-0" style={{ borderColor: surface }}>
          {details.map(({ Icon, key, label, def, href }, i) => (
            <div key={key} className="py-8 md:px-8 md:py-10" style={{ borderColor: surface }}>
              <div className="flex items-center gap-3">
                <Icon size={18} style={{ color: accent }} />
                <Editable
                  as="div"
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: inkSecond }}
                  value={props?.[key + "Label"] || label}
                  onChange={(v) => onChange?.({ [key + "Label"]: v })}
                />
              </div>
              {href ? (
                <a href={href} className="group mt-3 flex items-baseline gap-2">
                  <Editable
                    as="div"
                    className="text-xl font-black uppercase tracking-tight transition group-hover:underline md:text-2xl"
                    value={props?.[key] || def}
                    onChange={(v) => onChange?.({ [key]: v })}
                  />
                  <ArrowUpRight size={16} className="opacity-0 transition group-hover:opacity-100" style={{ color: accent }} />
                </a>
              ) : (
                <Editable
                  as="div"
                  className="mt-3 text-xl font-black uppercase tracking-tight md:text-2xl"
                  value={props?.[key] || def}
                  onChange={(v) => onChange?.({ [key]: v })}
                />
              )}
            </div>
          ))}
        </div>

        {/* Badges Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider" style={{ background: surface, borderColor: surface }}>
                <ShieldCheck size={14} style={{ color: accent }} />
                <Editable as="span" value={b} onChange={(v) => onChange?.({ badges: badges.map((x, j) => (j === i ? v : x)) })} />
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: inkSecond }}>
            <span className="h-2 w-2 animate-ping rounded-full" style={{ background: accent }} />
            <span>HQ / San Francisco, CA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
