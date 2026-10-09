// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Headphones } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const rows = props?.rows || [
    { icon: "phone", label: "Sales", value: "+1 (212) 555 0148" },
    { icon: "mail", label: "Email", value: "partners@vaultline.io" },
    { icon: "pin", label: "Head office", value: "245 Park Avenue, Floor 21, New York, NY 10167" },
    { icon: "clock", label: "Hours", value: "Mon to Fri, 8:30 to 18:30 EST" },
  ];
  const badges = props?.badges || ["Response within 4 hours", "Dedicated onboarding lead", "SOC 2 Type II"];
  const icons: any = { phone: Phone, mail: Mail, pin: MapPin, clock: Clock };
  const upd = (i: number, patch: any) =>
    onChange?.({ rows: rows.map((r: any, idx: number) => (idx === i ? { ...r, ...patch } : r)) });

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden" style={{ background: bgSecond, color: ink }}>
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: accent }} />
      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-12 gap-14 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              <Headphones size={14} />
              <Editable value={props?.eyebrow || "Get in touch"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <h2 className="mt-5 text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.02]">
              <Editable value={props?.title || "Let us build your edge."} onChange={(v) => onChange?.({ title: v })} />
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-lg" style={{ color: inkSecond }}>
              <Editable
                value={props?.text || "Tell us about your firm and we will show you what Vaultline can do with your own data in a thirty minute walkthrough."}
                onChange={(v) => onChange?.({ text: v })}
              />
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {badges.map((b: string, i: number) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold" style={{ background: surface }}>
                <ShieldCheck size={15} style={{ color: accent }} />
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
          className="lg:col-span-6"
        >
          <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden group">
            <img
              src={props?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"}
              alt="Office"
              className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg}CC, transparent 60%)` }} />
            <span className="absolute left-5 bottom-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold backdrop-blur-md" style={{ background: `${bg}CC`, color: ink }}>
              <MapPin size={14} style={{ color: accent }} />
              <Editable value={props?.imageCaption || "Visit our New York studio"} onChange={(v) => onChange?.({ imageCaption: v })} />
            </span>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-x-8">
            {rows.map((r: any, i: number) => {
              const Icon = icons[r.icon] || Mail;
              return (
                <div key={i} className="flex items-start gap-4 py-5 transition-transform duration-300 hover:translate-x-1" style={{ borderTop: `1px solid ${surface}` }}>
                  <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: accent, color: bg }}>
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: inkSecond }}>
                      <Editable value={r.label} onChange={(v) => upd(i, { label: v })} />
                    </div>
                    <div className="mt-1 font-bold text-base sm:text-lg break-words">
                      <Editable value={r.value} onChange={(v) => upd(i, { value: v })} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
