// @ts-nocheck
import { useState } from "react";
import { Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Contact({ props = {}, theme, onChange }: any) {
  const ink = theme?.ink || "#111827";
  const accent = theme?.accent || "#87D53C";
  const surface = theme?.surface || "#FFFFFF";
  const email = props.email || "hello@designsource.studio";
  const budgets = props.budgets || ["Under $5k", "$5–15k", "$15k+"];
  const [copied, setCopied] = useState(false);
  const [f, setF] = useState({ name: "", email: "", budget: budgets[1] || budgets[0], message: "" });
  const copy = () => { navigator.clipboard?.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const send = (e: any) => {
    e.preventDefault();
    const body = `${f.message}\n\nBudget: ${f.budget}\nReply to: ${f.email}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Project enquiry from " + f.name)}&body=${encodeURIComponent(body)}`;
  };
  const inp = "w-full px-4 py-3.5 rounded-2xl border-2 text-sm font-medium outline-none focus:-translate-y-0.5 transition-transform";
  const st = { background: surface, borderColor: ink, color: ink };
  const info = (Icon: any, t: string) => <div className="flex items-center gap-3 font-semibold text-sm sm:text-base"><span className="w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: ink, background: surface }}><Icon size={15} /></span>{t}</div>;

  return (
    <section id="contact" className="py-20 sm:py-28" style={{ background: accent, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-6 space-y-7">
          <h2 className="font-black tracking-tighter leading-[0.95] text-[clamp(2.4rem,7vw,5.5rem)]">
            <Editable value={props.contactTitle || "Got an idea? Let's build it."} onChange={(v) => onChange?.({ contactTitle: v })} />
          </h2>
          <p className="max-w-md text-base sm:text-lg font-medium leading-relaxed">
            <Editable value={props.contactSubtitle || "Tell us what you are working on. You will hear back from a real person within one working day."} onChange={(v) => onChange?.({ contactSubtitle: v })} />
          </p>
          <button type="button" onClick={copy} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 font-bold cursor-pointer transition-transform hover:-translate-y-0.5 max-w-full" style={{ background: ink, color: "#fff", borderColor: ink, boxShadow: "4px 4px 0 rgba(0,0,0,.25)" }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}<span className="truncate">{copied ? "Email copied" : email}</span>
          </button>
          <div className="space-y-3 pt-2">
            {info(Phone, props.phone || "+1 (415) 890-4421")}
            {info(MapPin, props.address || "San Francisco and remote")}
            {info(Mail, props.hours || "Mon–Fri, 9am–6pm PST")}
          </div>
        </div>

        <form onSubmit={send} className="lg:col-span-6 p-5 sm:p-8 rounded-3xl border-2 space-y-4" style={{ background: surface, borderColor: ink, boxShadow: `8px 8px 0 ${ink}` }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" aria-label="Your name" className={inp} style={st} />
            <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Email address" aria-label="Email address" className={inp} style={st} />
          </div>
          <div>
            <p className="text-xs font-bold mb-2">Budget</p>
            <div className="flex flex-wrap gap-2">
              {budgets.map((b: string) => <button key={b} type="button" onClick={() => setF({ ...f, budget: b })} className="px-4 py-2 rounded-full border-2 text-xs sm:text-sm font-bold cursor-pointer" style={{ background: f.budget === b ? ink : "transparent", color: f.budget === b ? "#fff" : ink, borderColor: ink }}>{b}</button>)}
            </div>
          </div>
          <textarea required rows={5} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="What do you need, and by when?" aria-label="Project details" className={inp} style={st} />
          <button type="submit" className="w-full py-4 rounded-full border-2 font-black cursor-pointer transition-transform hover:-translate-y-0.5" style={{ background: accent, borderColor: ink }}>Send enquiry</button>
        </form>
      </div>
    </section>
  );
}
export default DigitalAgency1Contact;