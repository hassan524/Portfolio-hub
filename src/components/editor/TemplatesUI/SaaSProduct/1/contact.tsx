// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, BadgeCheck, Leaf } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const rows = props?.rows || [
    { icon: "phone", label: "Phone", value: "+44 20 7946 0321" },
    { icon: "mail", label: "Email", value: "hello@veluna.studio" },
    { icon: "pin", label: "Studio", value: "18 Calder Mews, Shoreditch, London E2 7DJ" },
    { icon: "clock", label: "Hours", value: "Mon to Fri, 9:00 to 18:00 GMT" },
  ];
  const badges = props?.badges || ["Reply within one working day", "Clinic partners welcome", "Press enquiries open"];
  const icons: any = { phone: Phone, mail: Mail, pin: MapPin, clock: Clock };
  const upd = (i: number, patch: any) =>
    onChange?.({ rows: rows.map((r: any, idx: number) => (idx === i ? { ...r, ...patch } : r)) });

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-6xl">
        <div className="relative rounded-[40px] overflow-hidden" style={{ background: accent, color: bg }}>
          <div className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-40" style={{ background: ink }} />
          <div className="relative grid lg:grid-cols-2 gap-10 p-8 sm:p-14 lg:p-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Leaf size={28} />
              <h2 className="mt-6 font-[Georgia,'Times_New_Roman',serif] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                <Editable value={props?.title || "Let us talk about your skin, or your studio."} onChange={(v) => onChange?.({ title: v })} />
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed opacity-85 max-w-md">
                <Editable
                  value={props?.text || "Whether you want to partner, stock our range or simply ask a question, a real person will answer."}
                  onChange={(v) => onChange?.({ text: v })}
                />
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {badges.map((b: string, i: number) => (
                  <span key={i} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs" style={{ background: `${bg}26`, border: `1px solid ${bg}40` }}>
                    <BadgeCheck size={14} />
                    <Editable value={b} onChange={(v) => onChange?.({ badges: badges.map((x: string, idx: number) => (idx === i ? v : x)) })} />
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-3xl p-6 sm:p-10"
              style={{ background: bg, color: ink }}
            >
              {rows.map((r: any, i: number) => {
                const Icon = icons[r.icon] || Mail;
                return (
                  <div key={i} className="flex items-start gap-5 py-5 transition-transform duration-300 hover:translate-x-1" style={{ borderTop: i ? `1px solid ${surface}` : undefined }}>
                    <span className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: surface, color: accent }}>
                      <Icon size={20} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs tracking-[0.2em] uppercase" style={{ color: inkSecond }}>
                        <Editable value={r.label} onChange={(v) => upd(i, { label: v })} />
                      </div>
                      <div className="mt-1 font-[Georgia,'Times_New_Roman',serif] text-xl sm:text-2xl break-words">
                        <Editable value={r.value} onChange={(v) => upd(i, { value: v })} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
