// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";
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
    { label: "Phone", value: "+1 (646) 555-0117" },
    { label: "Email", value: "hello@northstack.studio" },
    { label: "Studio", value: "41 Bond Street, Floor 3, New York, NY 10012" },
    { label: "Hours", value: "Mon to Fri, 9:00 AM to 6:00 PM EST" },
  ];
  const icons = [Phone, Mail, MapPin, Clock];
  const up = (i: number, f: string) => (v: string) =>
    onChange?.({ info: info.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });

  return (
    <section id="contact" className="py-24 sm:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "Contact")}</div>
            <h2 className="mt-4 text-5xl font-black leading-[0.98] tracking-tighter sm:text-7xl" style={{ color: ink }}>
              {T("title", "Have a product in mind?")}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed" style={{ color: inkSecond }}>
              {T("text", "Tell us what you are building by phone or email. We reply within one working day and the first call is always free.")}
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-xl px-6 py-4 text-sm font-bold" style={{ backgroundColor: accent, color: bg }}>
              {T("availability", "Next availability: January")}
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.div>

          <div>
            {info.map((it: any, i: number) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className="flex items-start gap-5 py-6 transition-all hover:scale-[1.02]" style={{ borderTop: `1px solid ${surface}` }}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: surface, color: accent }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: inkSecond }}><Editable value={it.label} onChange={up(i, "label")} /></div>
                    <div className="mt-1 text-xl font-bold tracking-tight sm:text-2xl" style={{ color: ink }}><Editable value={it.value} onChange={up(i, "value")} /></div>
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: `1px solid ${surface}` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
