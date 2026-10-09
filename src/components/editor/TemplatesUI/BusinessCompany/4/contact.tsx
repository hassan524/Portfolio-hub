// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const T = (key: string, d: string) => (
    <Editable value={props?.[key] || d} onChange={(v: string) => onChange?.({ [key]: v })} />
  );
  const info = props?.info || [
    { label: "Call us", value: "+44 161 555 0129" },
    { label: "Email", value: "hire@hartwelltalent.co" },
    { label: "Head office", value: "17 Deansgate, Manchester M3 2BA" },
    { label: "Office hours", value: "Mon to Fri, 8:30 AM to 5:30 PM" },
  ];
  const icons = [Phone, Mail, MapPin, Clock];
  const up = (i: number, f: string) => (v: string) =>
    onChange?.({ info: info.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const muted = `color-mix(in srgb, ${bg} 72%, transparent)`;

  return (
    <section id="contact" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="rounded-3xl p-10 text-center sm:p-16" style={{ backgroundColor: accent, color: bgSecond }}>
          <h2 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">{T("bannerTitle", "Make a difference with your next hire")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base" style={{ opacity: 0.9 }}>{T("bannerText", "Call or write to a recruiter today and receive a market brief for your role within 48 hours.")}</p>
          <a href="#home" className="mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: ink, color: bg }}>
            {T("bannerCta", "Back to the top")}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {info.map((it: any, i: number) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="rounded-2xl p-7 transition-all hover:scale-[1.02]" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: surface, color: accent }}><Icon className="h-5 w-5" /></span>
                  <div className="mt-5 text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}><Editable value={it.label} onChange={up(i, "label")} /></div>
                  <div className="mt-1 text-base font-bold leading-snug" style={{ color: ink }}><Editable value={it.value} onChange={up(i, "value")} /></div>
                </motion.div>
              );
            })}
          </div>
          <div className="relative overflow-hidden rounded-2xl lg:col-span-2" style={{ backgroundColor: ink }}>
            <img src={props?.image || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80"} alt="Our office" className="h-56 w-full object-cover" />
            <div className="p-7">
              <h3 className="text-xl font-bold" style={{ color: bg }}>{T("officeTitle", "Visit our Manchester office")}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: muted }}>{T("officeText", "Drop in for a coffee and a conversation about your hiring plans. Appointments are welcome but not required.")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
