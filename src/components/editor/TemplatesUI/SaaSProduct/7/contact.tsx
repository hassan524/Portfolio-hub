// @ts-nocheck
import { Phone, Mail, MapPin } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const ICONS: any = { phone: Phone, mail: Mail, pin: MapPin };

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const rows = props?.rows || [
    { icon: "phone", label: "Call the studio", value: "+1 (512) 555-0187" },
    { icon: "mail", label: "Email", value: "projects@haldenlabs.co" },
    { icon: "pin", label: "Visit", value: "900 Congress Avenue, Floor 6, Austin, TX 78701" },
  ];
  const hours = props?.hours || [
    { day: "Monday to Thursday", time: "9:00 to 18:00 CT" },
    { day: "Friday", time: "9:00 to 15:00 CT" },
    { day: "Weekend", time: "Closed" },
  ];
  const badges = props?.badges || ["Reply within one business day", "NDA available", "Fixed-price proposals"];
  const setRow = (i: number, patch: any) => onChange?.({ rows: rows.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });
  const setHour = (i: number, patch: any) => onChange?.({ hours: hours.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });

  return (
    <section id="contact" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border p-3" style={{ backgroundColor: surface, borderColor: surface }}>
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.18] blur-3xl" style={{ backgroundColor: accent }} />
        <div className="relative grid gap-10 rounded-3xl p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr]" style={{ backgroundColor: bgSecond }}>
          <div className="min-w-0">
            <Editable as="h2" value={props?.title || "Let's scope your product"} onChange={(v: string) => onChange?.({ title: v })} className="font-['Newsreader'] text-4xl font-medium leading-tight tracking-tight sm:text-5xl" style={{ color: ink }} />
            <Editable as="p" value={props?.text || "Tell us what you are building. We will come back with a plan, a timeline and a fixed price."} onChange={(v: string) => onChange?.({ text: v })} className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: inkSecond }} />
            <div className="mt-8 flex flex-wrap gap-2">
              {badges.map((b: string, i: number) => (
                <Editable key={i} as="span" value={b} onChange={(v: string) => onChange?.({ badges: badges.map((x: string, j: number) => (j === i ? v : x)) })} className="rounded-full px-3.5 py-1.5 text-sm" style={{ backgroundColor: surface, color: ink }} />
              ))}
            </div>
            <div className="mt-10 rounded-2xl p-5" style={{ backgroundColor: bg }}>
              <Editable as="p" value={props?.hoursTitle || "Studio hours"} onChange={(v: string) => onChange?.({ hoursTitle: v })} className="font-['Newsreader'] text-xl font-medium" style={{ color: ink }} />
              <div className="mt-3">
                {hours.map((h: any, i: number) => (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-2 border-t py-3 first:border-t-0" style={{ borderColor: surface }}>
                    <Editable as="span" value={h.day} onChange={(v: string) => setHour(i, { day: v })} style={{ color: inkSecond }} />
                    <Editable as="span" value={h.time} onChange={(v: string) => setHour(i, { time: v })} className="font-medium" style={{ color: ink }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="min-w-0 space-y-4">
            {rows.map((r: any, i: number) => {
              const Icon = ICONS[r.icon] || Mail;
              return (
                <div key={i} className="flex items-start gap-4 rounded-2xl p-6 transition duration-300 hover:-translate-y-0.5" style={{ backgroundColor: bg }}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: accent, color: bg }}><Icon size={20} /></span>
                  <div className="min-w-0">
                    <Editable as="p" value={r.label} onChange={(v: string) => setRow(i, { label: v })} className="text-sm" style={{ color: inkSecond }} />
                    <Editable as="p" value={r.value} onChange={(v: string) => setRow(i, { value: v })} className="mt-1 break-words text-lg font-medium" style={{ color: ink }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
