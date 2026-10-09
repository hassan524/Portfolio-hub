// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const rows = [
    { Icon: Mail, key: "email", label: "Studio Inquiries", def: "hello@lumora.lab", href: "mailto:hello@lumora.lab" },
    { Icon: Phone, key: "phone", label: "Direct Phone", def: "+44 20 7946 0321", href: "tel:+442079460321" },
    { Icon: MapPin, key: "address", label: "London Lab", def: "14 Shoreditch High Street, London E1 6JE", href: "https://maps.google.com" },
    { Icon: Clock, key: "hours", label: "Studio Hours", def: "Monday to Friday, 9:00 to 18:00 GMT", href: null },
  ];
  const badges = props?.badges || ["Reply within a business day", "Free 30-min discovery call", "Senior leadership led"];

  return (
    <section id="contact" className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden px-6 py-32" style={{ background: `radial-gradient(100% 80% at 50% 100%, ${bgSecond}, ${bg})`, color: ink }}>
      <div className="mx-auto w-full max-w-7xl">
        {/* Giant Headline */}
        <div className="border-b pb-14" style={{ borderColor: surface }}>
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
            <span className="text-xs uppercase tracking-[0.35em]" style={{ color: accent }}>
              <Editable as="span" value={props?.eyebrow || "Initiate / 04"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
          </div>
          <Editable
            as="h2"
            className="mt-6 text-[clamp(3.5rem,10vw,11rem)] font-extralight italic leading-[0.85] tracking-tight"
            value={props?.title || "Have an idea? Let's make it real."}
            onChange={(v) => onChange?.({ title: v })}
          />
          <Editable
            as="p"
            className="mt-6 max-w-2xl text-lg font-light leading-relaxed md:text-xl"
            style={{ color: inkSecond }}
            value={props?.subtitle || "Tell us what you are dreaming up. We reply to every serious inquiry personally within 24 hours."}
            onChange={(v) => onChange?.({ subtitle: v })}
          />
        </div>

        {/* Architectural Contact Channels (NO rounded box!) */}
        <div className="grid divide-y border-b md:grid-cols-2 lg:grid-cols-4 md:divide-x md:divide-y-0" style={{ borderColor: surface }}>
          {rows.map(({ Icon, key, label, def, href }, i) => (
            <div key={key} className="py-10 md:px-8" style={{ borderColor: surface }}>
              <div className="flex items-center gap-3">
                <Icon size={18} style={{ color: accent }} />
                <Editable as="div" className="text-xs uppercase tracking-widest font-mono" style={{ color: inkSecond }} value={props?.[key + "Label"] || label} onChange={(v) => onChange?.({ [key + "Label"]: v })} />
              </div>
              {href ? (
                <a href={href} className="group mt-3 flex items-baseline gap-2">
                  <Editable as="div" className="text-xl font-light italic transition group-hover:underline md:text-2xl" value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
                  <ArrowUpRight size={16} className="opacity-0 transition group-hover:opacity-100" style={{ color: accent }} />
                </a>
              ) : (
                <Editable as="div" className="mt-3 text-xl font-light italic md:text-2xl" value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
              )}
            </div>
          ))}
        </div>

        {/* Studio Status & Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-light" style={{ borderColor: surface, color: inkSecond }}>
                <ShieldCheck size={14} style={{ color: accent }} />
                <Editable as="span" value={b} onChange={(v) => onChange?.({ badges: badges.map((x, j) => (j === i ? v : x)) })} />
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 font-mono text-xs font-light" style={{ color: inkSecond }}>
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: accent }} />
            <span>London GMT Studio Active</span>
          </div>
        </div>
      </div>
    </section>
  );
}
