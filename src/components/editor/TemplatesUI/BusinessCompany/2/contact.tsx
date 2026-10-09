// @ts-nocheck
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Phone } from "lucide-react";
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
    { label: "Email", value: "advisors@calderwealth.com" },
    { label: "Office", value: "88 Wall Street, 14th Floor, New York, NY 10005" },
    { label: "Hours", value: "Mon to Fri, 8:30 AM to 6:00 PM" },
  ];
  const icons = [Mail, MapPin, Clock];
  const up = (i: number, f: string) => (v: string) =>
    onChange?.({ info: info.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });

  return (
    <section id="contact" className="py-24 sm:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "Contact")}</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: ink }}>{T("title", "Speak with an advisor this week")}</h2>
            <div className="mt-10 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: accent, color: bg }}>
                <Phone className="h-6 w-6" />
              </span>
              <span className="text-3xl font-semibold tracking-tight sm:text-5xl" style={{ color: ink }}>{T("phone", "+1 (212) 555-0188")}</span>
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed" style={{ color: inkSecond }}>{T("text", "Your first consultation is free and carries no obligation. We will tell you honestly whether we are the right fit.")}</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="overflow-hidden rounded-t-full">
            <img src={props?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"} alt="Our office" className="h-72 w-full object-cover" />
          </motion.div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {info.map((it: any, i: number) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={i} className="rounded-[2rem] p-7 transition-all hover:scale-[1.02]" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
                <Icon className="h-6 w-6" style={{ color: accent }} />
                <div className="mt-5 text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>
                  <Editable value={it.label} onChange={up(i, "label")} />
                </div>
                <div className="mt-2 text-base font-medium leading-snug" style={{ color: ink }}>
                  <Editable value={it.value} onChange={up(i, "value")} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
