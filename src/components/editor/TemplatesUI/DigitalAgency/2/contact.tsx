// @ts-nocheck
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0B0B0D";
  const bgSecond = theme?.["bg-second"] || "#131316";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#A1A1AA";
  const accent = theme?.accent || "#F5559E";
  const email = props.email || "hello@yourstudio.com";
  const types = props.projectTypes || ["New product", "Replace workflows", "Modernize", "Ongoing support"];
  const offices = props.offices || [{ n: "United States", a: "123 Main Street, Portland, OR", p: "+1 (555) 010-1234" }, { n: "Pakistan", a: "Blue Area, Islamabad", p: "+92 300 0000000" }];
  const [copied, setCopied] = useState(false);
  const [f, setF] = useState({ name: "", email: "", type: types[0], message: "" });
  const copy = () => { navigator.clipboard?.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const send = (e: any) => {
    e.preventDefault();
    const body = `${f.message}\n\nProject type: ${f.type}\nReply to: ${f.email}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Project enquiry from " + f.name)}&body=${encodeURIComponent(body)}`;
  };
  const line = `${textSecond}30`;
  const inp = "w-full bg-transparent py-3.5 text-sm sm:text-base outline-none";
  const ist = { borderBottom: `1px solid ${textSecond}60`, color: text };

  return (
    <section id="contact" className="py-20 sm:py-28" style={{ background: bgSecond, color: text }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{props.contactEyebrow || "Contact"}</span>
            <h2 className="font-extrabold tracking-tighter leading-[1.05] text-[clamp(2rem,4.5vw,3.25rem)] mt-3"><Editable value={props.contactTitle || "Tell us what you want to build."} onChange={(v) => onChange?.({ contactTitle: v })} /></h2>
          </div>
          <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}><Editable value={props.contactSubtitle || "Share a few details and a senior member of the team will reply within one working day."} onChange={(v) => onChange?.({ contactSubtitle: v })} /></p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div style={{ borderTop: `1px solid ${line}` }} className="py-5">
              <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: textSecond }}>Email</div>
              <button type="button" onClick={copy} className="flex items-center gap-2 text-lg sm:text-xl font-bold cursor-pointer text-left break-all">
                {email}{copied ? <Check size={16} style={{ color: accent }} /> : <Copy size={16} style={{ color: accent }} />}
              </button>
              <div className="text-xs mt-1" style={{ color: textSecond }}>{copied ? "Copied to clipboard" : "Click to copy"}</div>
            </div>
            {offices.map((o: any) => (
              <div key={o.n} className="py-5" style={{ borderTop: `1px solid ${line}` }}>
                <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: textSecond }}>{o.n}</div>
                <div className="text-sm font-semibold">{o.a}</div><div className="text-sm" style={{ color: textSecond }}>{o.p}</div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${line}` }} />
          </div>

          <form onSubmit={send} className="lg:col-span-7 space-y-6">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
              <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" aria-label="Your name" className={inp} style={ist} />
              <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Work email" aria-label="Work email" className={inp} style={ist} />
            </div>
            <div>
              <p className="text-xs font-bold mb-3" style={{ color: textSecond }}>What do you need?</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {types.map((t: string) => <button key={t} type="button" onClick={() => setF({ ...f, type: t })} className="pb-1 text-sm font-bold cursor-pointer" style={{ color: f.type === t ? text : textSecond, borderBottom: `2px solid ${f.type === t ? accent : "transparent"}` }}>{t}</button>)}
              </div>
            </div>
            <textarea required rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="Describe your product, users and timeline" aria-label="Project details" className={inp} style={ist} />
            <button type="submit" className="px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold cursor-pointer transition-transform hover:-translate-y-0.5" style={{ background: accent, color: bg }}>{props.submitLabel || "Discuss Your Product"}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default DigitalAgency2Contact;