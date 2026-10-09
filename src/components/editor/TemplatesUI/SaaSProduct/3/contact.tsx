// @ts-nocheck
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const rise = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } };
const icons = [Phone, Mail, MapPin, Clock];

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F6F5EF";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#111111";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(17, 17, 17, 0.06)";
  const accent = theme?.accent || "#4ADE5A";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const info = props?.info || [{ label: "Phone", value: "+1 (415) 555-0142" }, { label: "Email", value: "hello@loopcraft.studio" }, { label: "Studio", value: "218 Mission Street, Suite 400, San Francisco, CA 94105" }, { label: "Hours", value: "Mon to Fri, 9:00 AM to 6:00 PM PST" }];
  const badges = props?.badges || ["Reply within 24 hours", "Free 30-minute intro call", "NDA on request"];
  return (
    <section id="contact" className="px-6 py-24 md:py-32" style={{ background: bg, color: ink }}>
      <motion.div {...rise} className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] p-8 md:p-16" style={{ background: bgSecond, border: `1px solid ${surface}` }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl" style={{ background: `color-mix(in srgb, ${accent} 40%, transparent)` }} />
        <div className="relative grid gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <span className="rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: surface }}>{T("eyebrow", "Get in touch")}</span>
            <h2 className="mt-5 break-words text-4xl font-black leading-tight tracking-tight md:text-6xl">{T("title", "Ready to take your product to the next level?")}</h2>
            <p className="mt-5 max-w-md break-words" style={{ color: inkSecond }}>{T("text", "Tell us where your product is today and where you want it to be. We will reply with a clear plan and timeline.")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {badges.map((b: string, i: number) => (<span key={i} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ background: surface }}><CheckCircle2 size={16} style={{ color: accent }} />{I("badges", badges, i)}</span>))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {info.map((c: any, i: number) => { const Icon = icons[i % icons.length]; return (
              <div key={i} className="min-w-0 rounded-3xl p-6 transition hover:scale-[1.02] active:scale-95" style={{ background: surface }}>
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: accent, color: ink }}><Icon size={20} /></span>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider" style={{ color: inkSecond }}>{I("info", info, i, "label")}</div>
                <div className="mt-1 break-words font-semibold">{I("info", info, i, "value")}</div>
              </div>); })}
            <div className="rounded-3xl p-6 sm:col-span-2" style={{ background: accent, color: ink }}>
              <div className="text-lg font-bold">{T("noteTitle", "Prefer a quick call?")}</div>
              <p className="mt-1 break-words text-sm">{T("noteText", "Call us during studio hours and speak directly with a founder.")}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
