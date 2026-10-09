// @ts-nocheck
import { Phone, Mail, MapPin, Clock } from "lucide-react";
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
    { label: "Telephone", value: "+1 (312) 555-0164" },
    { label: "Email", value: "enquiries@marlowefinch.law" },
    { label: "Office", value: "120 South LaSalle Street, Suite 2200, Chicago, IL 60603" },
    { label: "Hours", value: "Monday to Friday, 8:30 AM to 6:00 PM" },
  ];
  const icons = [Phone, Mail, MapPin, Clock];
  const up = (i: number, f: string) => (v: string) =>
    onChange?.({ info: info.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const assurances = props?.assurances || ["Initial consultation without charge", "Strict client confidentiality", "Response within one business day"];

  return (
    <section id="contact" className="py-24 sm:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>{T("eyebrow", "Contact")}</div>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-6xl" style={{ color: ink }}>{T("title", "Speak with a partner")}</h2>
            <p className="mt-6 max-w-md text-base leading-relaxed" style={{ color: inkSecond }}>{T("text", "Call or write to arrange a first conversation. We will listen, outline your options and give you an honest view of cost.")}</p>
            <ul className="mt-8 space-y-3">
              {assurances.map((a: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
                  <span className="h-px w-8" style={{ backgroundColor: accent }} />
                  <Editable value={a} onChange={(v: string) => onChange?.({ assurances: assurances.map((x: string, j: number) => (j === i ? v : x)) })} />
                </li>
              ))}
            </ul>
            <img src={props?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"} alt="Our building" className="mt-10 h-56 w-full object-cover grayscale" />
          </div>

          <div className="lg:col-span-7">
            {info.map((it: any, i: number) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className="grid items-start gap-3 py-8 transition-all hover:scale-[1.02] sm:grid-cols-12" style={{ borderTop: `1px solid ${ink}` }}>
                  <div className="flex items-center gap-3 sm:col-span-4">
                    <Icon className="h-5 w-5" style={{ color: accent }} />
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: inkSecond }}><Editable value={it.label} onChange={up(i, "label")} /></span>
                  </div>
                  <div className="font-serif text-2xl leading-snug sm:col-span-8 sm:text-3xl" style={{ color: ink }}><Editable value={it.value} onChange={up(i, "value")} /></div>
                </div>
              );
            })}
            <div style={{ borderTop: `1px solid ${ink}` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
