// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Crown, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#1A0103";
  const bgSecond = theme?.["bg-second"] || "#420205";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#F8D4D4";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#E50914";
  const yellow = "#FFBF00";

  const rows = [
    { Icon: Mail, key: "email", label: "Executive Dispatch", def: "royal@marketagency.co", href: "mailto:royal@marketagency.co" },
    { Icon: Phone, key: "phone", label: "Direct Crown Line", def: "+1 (212) 555-0147", href: "tel:+12125550147" },
    { Icon: MapPin, key: "address", label: "Headquarters", def: "450 Lexington Avenue, Floor 32, New York, NY 10017", href: "https://maps.google.com" },
    { Icon: Clock, key: "hours", label: "Active Hours", def: "Mon to Fri 8:30 to 19:00 EST / 24h Global Hotline", href: null },
  ];
  const badges = (props?.badges && props.badges.length > 0) ? props.badges : ["Complimentary Executive Audit", "Executive Reply Under 24h", "Zero Lock-In Retainers"];

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-32 md:px-8" style={{ background: `linear-gradient(180deg, ${bg}, #0D0001)`, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Monumental Headline Header */}
        <div className="border-b-2 pb-12" style={{ borderColor: accent }}>
          <div className="flex items-center gap-2 font-serif text-xs font-black uppercase tracking-[0.3em]" style={{ color: yellow }}>
            <Crown size={16} />
            <Editable as="span" value={props?.eyebrow || "Direct Access / 04"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </div>
          <Editable
            as="h2"
            className="mt-6 font-serif text-[clamp(3.5rem,11vw,11.5rem)] font-black uppercase leading-[0.82] tracking-tight text-white"
            value={props?.title || "Commission the reign"}
            onChange={(v) => onChange?.({ title: v })}
          />
        </div>

        {/* Monumental Direct Commission Banner */}
        <div className="my-12 border-2 p-8 md:p-14" style={{ borderColor: yellow, background: accent, color: "#fff" }}>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="font-serif text-xs font-black uppercase tracking-widest text-white/80">Immediate Command Line</span>
              <Editable
                as="div"
                className="mt-2 break-all font-serif text-[clamp(2.5rem,7vw,6.5rem)] font-black uppercase leading-none text-white"
                value={props?.phone || "+1 (212) 555-0147"}
                onChange={(v) => onChange?.({ phone: v })}
              />
            </div>
            <a
              href={`tel:${props?.phone || "+12125550147"}`}
              className="inline-flex items-center gap-3 border-2 px-8 py-4 font-serif text-sm font-black uppercase tracking-wider text-black shadow-2xl transition hover:scale-105 active:scale-95"
              style={{ borderColor: yellow, background: yellow }}
            >
              Direct Dial <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        {/* Full-Bleed Architectural Channel Columns */}
        <div className="grid divide-y-2 border-b-2 md:grid-cols-2 lg:grid-cols-4 md:divide-x-2 md:divide-y-0" style={{ borderColor: accent }}>
          {rows.map(({ Icon, key, label, def, href }, i) => (
            <div key={key} className="py-8 md:px-8" style={{ borderColor: accent }}>
              <div className="flex items-center gap-2">
                <Icon size={18} style={{ color: yellow }} />
                <Editable as="div" className="font-serif text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: yellow }} value={props?.[key + "Label"] || label} onChange={(v) => onChange?.({ [key + "Label"]: v })} />
              </div>
              {href ? (
                <a href={href} className="group mt-3 flex items-baseline gap-2">
                  <Editable as="div" className="font-serif text-xl font-bold uppercase text-white transition group-hover:underline md:text-2xl" value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
                  <ArrowUpRight size={16} className="opacity-0 transition group-hover:opacity-100" style={{ color: yellow }} />
                </a>
              ) : (
                <Editable as="div" className="mt-3 font-serif text-xl font-bold uppercase text-white md:text-2xl" value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
              )}
            </div>
          ))}
        </div>

        {/* Badges Bar with Coordinates */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <span key={i} className="border-2 px-4 py-2 font-serif text-xs font-black uppercase tracking-widest text-white" style={{ borderColor: accent }}>
                <Editable as="span" value={b} onChange={(v) => onChange?.({ badges: badges.map((x, j) => (j === i ? v : x)) })} />
              </span>
            ))}
          </div>
          <span className="font-serif text-xs font-black uppercase tracking-widest" style={{ color: yellow }}>40.7128° N, 74.0060° W · NYC HEADQUARTERS</span>
        </div>
      </div>
    </section>
  );
}
