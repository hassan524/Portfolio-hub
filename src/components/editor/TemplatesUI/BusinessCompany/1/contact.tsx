// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const info = props?.info || [
    { label: "Phone", value: "+1 (415) 555-0142" },
    { label: "Email", value: "hello@verdantco.com" },
    { label: "Address", value: "214 Market Street, Suite 8, San Francisco, CA 94105" },
    { label: "Hours", value: "Monday to Friday, 9:00 AM to 6:00 PM" },
  ];
  const icons = [Phone, Mail, MapPin, Clock];
  const assurances = props?.assurances || ["Free 30-minute scoping call", "Reply within one business day", "Fixed-fee proposals"];

  const upd = (i: number, field: string, v: string) =>
    onChange?.({ info: info.map((x: any, j: number) => (j === i ? { ...x, [field]: v } : x)) });

  return (
    <section id="contact" className="py-24 sm:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between rounded-[2rem] p-9 sm:p-12 lg:col-span-3"
            style={{ backgroundColor: accent, color: bg }}
          >
            <div>
              <div className="text-sm font-bold uppercase tracking-widest" style={{ opacity: 0.8 }}>
                <Editable value={props?.eyebrow || "Get in touch"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
              </div>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                <Editable value={props?.title || "Let us look at your numbers together"} onChange={(v: string) => onChange?.({ title: v })} />
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed" style={{ opacity: 0.85 }}>
                <Editable
                  value={props?.text || "Call or write to us and we will arrange a free scoping call. No pressure, just an honest view of where you can save."}
                  onChange={(v: string) => onChange?.({ text: v })}
                />
              </p>
            </div>
            <ul className="mt-10 space-y-3">
              {assurances.map((a: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                  <ShieldCheck className="h-5 w-5 shrink-0" />
                  <Editable value={a} onChange={(v: string) => onChange?.({ assurances: assurances.map((x: string, j: number) => (j === i ? v : x)) })} />
                </li>
              ))}
            </ul>
            <a
              href="#home"
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: bg, color: ink }}
            >
              <Editable value={props?.cta || "Back to the top"} onChange={(v: string) => onChange?.({ cta: v })} />
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            {info.map((it: any, i: number) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-5 rounded-[2rem] p-6 transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: bg, border: `1px solid ${surface}` }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: surface, color: accent }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: inkSecond }}>
                      <Editable value={it.label} onChange={(v: string) => upd(i, "label", v)} />
                    </div>
                    <div className="mt-1 text-base font-bold leading-snug" style={{ color: ink }}>
                      <Editable value={it.value} onChange={(v: string) => upd(i, "value", v)} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
