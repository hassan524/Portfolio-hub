// @ts-nocheck
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#181713";
    const ink = theme?.ink || "#F5F0E8";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(245, 240, 232, 0.1)";
    const accent = theme?.accent || "#FF6B35";
    return <section id="contact" className="px-5 py-24 sm:px-10 sm:py-32" style={{ backgroundColor: bg, color: ink }}><div className="mx-auto max-w-7xl"><Editable value="04 / CONTACT" className="text-xs font-bold uppercase tracking-[.2em]" style={{ color: accent }} /><Editable as="h2" value={props?.headline || "Got a brief? Make it interesting."} className="mt-6 max-w-4xl text-6xl font-black uppercase leading-[.86] tracking-[-.08em] sm:text-8xl" /><div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[Mail, "Email", props?.email || "hello@studio04.co"], [Phone, "Phone", props?.phone || "+1 323 555 0188"], [MapPin, "Studio", props?.address || "Los Angeles / London"], [Clock3, "Hours", props?.hours || "Mon–Fri, 9–6"]].map(([I, l, v]: any) => <div className="rounded-2xl p-5" style={{ backgroundColor: surface }} key={l}><I size={19} style={{ color: accent }} /><Editable value={l} className="mt-8 block text-xs uppercase tracking-[.15em]" style={{ color: inkSecond }} /><Editable value={v} className="mt-2 block text-sm" /></div>)}</div><a href="mailto:hello@studio04.co" className="mt-12 inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-bold" style={{ backgroundColor: accent, color: "#fff" }}><Editable value="Start a conversation" /><ArrowUpRight size={16} /></a></div></section>;
}
