// @ts-nocheck
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const ICONS: any = { phone: Phone, mail: Mail, pin: MapPin, clock: Clock };

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const rows = props?.rows || [
    { icon: "mail", label: "Email", value: "hello@marenokafor.com" },
    { icon: "phone", label: "Phone", value: "+44 20 7946 0318" },
    { icon: "pin", label: "Studio", value: "14 Calder Row, Shoreditch, London E2 7DJ" },
    { icon: "clock", label: "Hours", value: "Tuesday to Friday, 10:00 to 17:00 GMT" },
  ];
  const badges = props?.badges || ["Replies within 24 hours", "Free 30 minute intro call", "Remote friendly"];
  const setRow = (i: number, patch: any) => onChange?.({ rows: rows.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });

  return (
    <section id="contact" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl">
        <Editable as="h2" value={props?.title || "Have a product in mind? Let's talk."} onChange={(v: string) => onChange?.({ title: v })} className="max-w-4xl font-['Bricolage_Grotesque'] text-4xl font-bold leading-[1.05] tracking-tight sm:text-7xl" style={{ color: ink }} />
        <Editable as="p" value={props?.text || "Write or call with a few lines about what you are building and when you would like to start."} onChange={(v: string) => onChange?.({ text: v })} className="mt-6 max-w-xl text-lg" style={{ color: inkSecond }} />

        <div className="mt-14 rounded-[2rem] p-3" style={{ backgroundColor: surface }}>
          <div className="grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-4" style={{ backgroundColor: surface }}>
            {rows.map((r: any, i: number) => {
              const Icon = ICONS[r.icon] || Mail;
              return (
                <div key={i} className="min-w-0 p-7" style={{ backgroundColor: bg }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: accent, color: bg }}><Icon size={19} /></span>
                  <Editable as="p" value={r.label} onChange={(v: string) => setRow(i, { label: v })} className="mt-6 text-sm" style={{ color: inkSecond }} />
                  <Editable as="p" value={r.value} onChange={(v: string) => setRow(i, { value: v })} className="mt-1 break-words text-lg font-medium" style={{ color: ink }} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {badges.map((b: string, i: number) => (
            <Editable key={i} as="span" value={b} onChange={(v: string) => onChange?.({ badges: badges.map((x: string, j: number) => (j === i ? v : x)) })} className="rounded-full px-4 py-2 text-sm" style={{ backgroundColor: surface, color: ink }} />
          ))}
        </div>
      </div>
    </section>
  );
}
