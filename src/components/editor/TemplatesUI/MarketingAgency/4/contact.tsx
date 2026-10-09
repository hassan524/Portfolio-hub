// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Smile, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const tiles = [
    { Icon: Mail, key: "email", label: "Studio Mail", def: "hello@blobby.studio", href: "mailto:hello@blobby.studio" },
    { Icon: Phone, key: "phone", label: "Ring Us", def: "+1 (323) 555-0119", href: "tel:+13235550119" },
    { Icon: MapPin, key: "address", label: "LA Headquarters", def: "502 Arts District Blvd, Unit 3, Los Angeles, CA 90013", href: "https://maps.google.com" },
    { Icon: Clock, key: "hours", label: "Open Doors", def: "Tue to Sat, 10:00 AM to 7:00 PM PST", href: null },
  ];
  const badges = props?.badges || ["Always friendly vibes", "Free 30-min creative jam", "Super fast turnarounds"];

  return (
    <section id="contact" className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden px-6 py-32" style={{ background: `linear-gradient(180deg, ${bg}, ${bgSecond})`, color: ink }}>
      <div className="mx-auto w-full max-w-7xl">
        {/* Giant Headline Header */}
        <div className="border-b pb-14" style={{ borderColor: surface }}>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl" style={{ background: accent, color: bg }}>
              <Smile size={18} />
            </span>
            <Editable as="span" className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }} value={props?.eyebrow || "Say Hello / 04"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </div>
          <Editable
            as="h2"
            className="mt-6 text-[clamp(3.5rem,11vw,11.5rem)] font-black uppercase leading-[0.82] tracking-tighter"
            value={props?.title || "Got an idea? Tell us!"}
            onChange={(v) => onChange?.({ title: v })}
          />
        </div>

        {/* Giant Contact Email Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-12 overflow-hidden rounded-3xl p-8 md:p-16"
          style={{ background: accent, color: bg }}
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-widest opacity-80">Instant Direct Email</span>
              <Editable
                as="div"
                className="mt-2 break-all text-[clamp(2.5rem,7vw,6.5rem)] font-black uppercase leading-none"
                value={props?.email || "hello@blobby.studio"}
                onChange={(v) => onChange?.({ email: v })}
              />
            </div>
            <a
              href={`mailto:${props?.email || "hello@blobby.studio"}`}
              className="inline-flex items-center gap-3 rounded-full px-9 py-5 text-base font-black uppercase tracking-wider transition hover:scale-105 active:scale-95"
              style={{ background: bg, color: ink }}
            >
              Send Message <ArrowUpRight size={20} style={{ color: accent }} />
            </a>
          </div>
        </motion.div>

        {/* Architectural Direct Lines */}
        <div className="grid divide-y border-b md:grid-cols-2 lg:grid-cols-4 md:divide-x md:divide-y-0" style={{ borderColor: surface }}>
          {tiles.map(({ Icon, key, label, def, href }, i) => (
            <div key={key} className="py-8 md:px-8" style={{ borderColor: surface }}>
              <div className="flex items-center gap-2">
                <Icon size={18} style={{ color: accent }} />
                <Editable as="div" className="text-xs font-black uppercase tracking-widest" style={{ color: accent }} value={props?.[key + "Label"] || label} onChange={(v) => onChange?.({ [key + "Label"]: v })} />
              </div>
              {href ? (
                <a href={href} className="group mt-3 flex items-baseline gap-2">
                  <Editable as="div" className="text-xl font-black uppercase transition group-hover:underline md:text-2xl" value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
                  <ArrowUpRight size={16} className="opacity-0 transition group-hover:opacity-100" style={{ color: accent }} />
                </a>
              ) : (
                <Editable as="div" className="mt-3 text-xl font-black uppercase md:text-2xl" value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
              )}
            </div>
          ))}
        </div>

        {/* Badges Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {badges.map((b, i) => (
              <span key={i} className="rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wider" style={{ borderColor: surface, background: surface }}>
                <Editable as="span" value={b} onChange={(v) => onChange?.({ badges: badges.map((x, j) => (j === i ? v : x)) })} />
              </span>
            ))}
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>LA Studio Floor Open</span>
        </div>
      </div>
    </section>
  );
}
