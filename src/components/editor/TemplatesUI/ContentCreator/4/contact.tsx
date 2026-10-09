// @ts-nocheck
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#D7472E";
    const ink = theme?.ink || "#fff7ed";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255,247,237,.13)";
    const accent = theme?.accent || "#171717";
    return <section id="contact" className="px-5 py-24 sm:px-8 sm:py-32" style={{ backgroundColor: bg, color: ink }}><div className="mx-auto max-w-7xl"><Editable value="LET'S TALK" className="text-xs uppercase tracking-[.2em]" /><Editable as="h2" value={props?.headline || "The next good thing starts here."} className="mt-6 max-w-4xl text-6xl leading-[.85] tracking-[-.08em] sm:text-8xl" /><div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[Mail, "Mail", props?.email || "hello@northsouth.studio"], [Phone, "Phone", props?.phone || "+1 646 555 0191"], [MapPin, "Place", props?.address || "New York / Everywhere"], [Clock3, "Hours", props?.hours || "Weekdays, 10—6"]].map(([I, l, v]: any) => <div className="rounded-2xl p-5" style={{ backgroundColor: surface }} key={l}><I size={18} /><Editable value={l} className="mt-8 block text-xs uppercase tracking-[.15em]" style={{ color: inkSecond }} /><Editable value={v} className="mt-2 block text-sm" /></div>)}</div><a href="mailto:hello@northsouth.studio" className="mt-12 inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-bold" style={{ backgroundColor: accent, color: ink }}><Editable value="Send a note" /><ArrowUpRight size={16} /></a></div></section>;
}
