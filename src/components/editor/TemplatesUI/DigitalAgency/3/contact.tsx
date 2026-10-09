// @ts-nocheck
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || theme?.surface || "#F5F4F2";
  const ink = theme?.text || theme?.ink || "#0F0F10";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6B6B70";
  const accent = theme?.accent || "#2F5BFF";
  const onAccent = theme?.["on-accent"] || bg; // text colour on accent buttons
  const email = props.email || "hello@yourcompany.com";
  const types = props.projectTypes || ["Startup MVP", "Web or mobile app", "AI automation", "Extend my team", "Modernize software"];
  const [copied, setCopied] = useState(false);
  const [f, setF] = useState({ name: "", email: "", type: types[0], message: "" });
  const copy = () => { navigator.clipboard?.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const send = (e: any) => {
    e.preventDefault();
    const body = `${f.message}\n\nProject type: ${f.type}\nReply to: ${f.email}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Project enquiry from " + f.name)}&body=${encodeURIComponent(body)}`;
  };
  const inp = "w-full px-5 py-3.5 rounded-xl text-sm sm:text-base outline-none";
  const st = { background: bgSecond, color: ink };

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24" style={{ background: bgSecond, color: ink }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(50% 50% at 50% 100%, ${accent}1a, transparent 70%)` }} />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-medium tracking-tight leading-[1.1] text-[clamp(2rem,5vw,3.5rem)]"><Editable value={props.contactTitle || "Start your project"} onChange={(v) => onChange?.({ contactTitle: v })} /></h2>
        <p className="mt-3 text-sm sm:text-base" style={{ color: inkSecond }}><Editable value={props.contactSubtitle || "Tell us what you are building and we will help you find the fastest path from idea to launch."} onChange={(v) => onChange?.({ contactSubtitle: v })} /></p>

        <form onSubmit={send} className="mt-10 rounded-3xl p-5 sm:p-8 text-left space-y-4" style={{ background: bg }}>
          <div className="grid sm:grid-cols-2 gap-4">
            <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" aria-label="Your name" className={inp} style={st} />
            <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Work email" aria-label="Work email" className={inp} style={st} />
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map((t: string) => <button key={t} type="button" onClick={() => setF({ ...f, type: t })} className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer" style={{ background: f.type === t ? ink : bgSecond, color: f.type === t ? bg : inkSecond }}>{t}</button>)}
          </div>
          <textarea required rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="What are you building, and by when?" aria-label="Project details" className={inp} style={st} />
          <button type="submit" className="w-full py-3.5 rounded-full text-sm sm:text-base font-semibold cursor-pointer transition-transform hover:-translate-y-0.5" style={{ background: accent, color: onAccent }}>{props.submitLabel || "Send message"}</button>
        </form>

        <button type="button" onClick={copy} className="mt-6 inline-flex items-center gap-2 text-sm font-medium cursor-pointer" style={{ color: inkSecond }}>
          {copied ? <Check size={14} style={{ color: accent }} /> : <Copy size={14} />}{copied ? "Email copied" : `Or email us: ${email}`}
        </button>
      </div>
    </section>
  );
}
export default DigitalAgency3Contact;