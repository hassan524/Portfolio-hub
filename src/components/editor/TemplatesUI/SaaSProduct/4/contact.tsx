// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const icons = [Phone, Mail, MapPin, Clock];

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#F2542D";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const info = props?.info || [{ label: "Call us", value: "+1 (212) 555-0187" }, { label: "Email", value: "hello@halolabs.dev" }, { label: "Studio", value: "47 Greene Street, Floor 6, New York, NY 10013" }, { label: "Hours", value: "Mon to Sat, 10:00 AM to 7:00 PM EST" }];
  const badges = props?.badges || ["Response within one business day", "Free technical discovery call", "Fixed-price quotes"];
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 md:py-36" style={{ background: bg, color: ink }}>
      <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.65, 0.35] }} transition={{ duration: 8, repeat: Infinity }} className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[700px] -translate-x-1/2 rounded-full blur-[130px]" style={{ background: `color-mix(in srgb, ${accent} 60%, transparent)` }} />
      <div className="relative mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
          <span className="text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>{T("eyebrow", "Contact")}</span>
          <h2 className="mt-4 break-words text-4xl font-light tracking-tight md:text-6xl">{T("title", "Let's build something")} <span className="font-serif italic">{T("titleAccent", "remarkable")}</span></h2>
          <p className="mx-auto mt-5 max-w-lg break-words opacity-70" style={{ color: inkSecond }}>{T("text", "Share a few details about your product and goals. We will come back with next steps within one business day.")}</p>
        </motion.div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {info.map((c: any, i: number) => { const Icon = icons[i % icons.length]; return (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex min-w-0 items-center gap-5 rounded-3xl p-6 backdrop-blur-md transition hover:scale-[1.02] active:scale-95" style={{ background: surface, border: `1px solid ${surface}` }}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ background: accent, color: ink }}><Icon size={20} /></span>
              <div className="min-w-0"><div className="text-xs uppercase tracking-widest opacity-60">{I("info", info, i, "label")}</div><div className="mt-1 break-words font-medium">{I("info", info, i, "value")}</div></div>
            </motion.div>); })}
        </div>
        <div className="mt-4 rounded-3xl p-8 text-center backdrop-blur-md" style={{ background: surface }}>
          <div className="font-serif text-2xl italic">{T("noteTitle", "Not sure where to start?")}</div>
          <p className="mx-auto mt-2 max-w-md break-words text-sm opacity-70">{T("noteText", "Call during studio hours and talk straight to an engineer, no sales script.")}</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {badges.map((b: string, i: number) => (<span key={i} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs" style={{ background: surface }}><CheckCircle2 size={14} style={{ color: accent }} />{I("badges", badges, i)}</span>))}
        </div>
      </div>
    </section>
  );
}
