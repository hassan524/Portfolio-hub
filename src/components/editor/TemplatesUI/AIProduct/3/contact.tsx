// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
const EMAIL = "hello@alexrivera.dev";

export function AIProduct3Contact({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#140C12";
  const ink = theme?.ink || "#FFFFFF";
  const accent = theme?.accent || "#FF3B76";
  const line = mix(ink, 18);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [f, setF] = useState({ name: "", email: "", msg: "" });

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  const field = "w-full bg-transparent py-4 text-base outline-none border-b transition-colors placeholder:opacity-40 focus:border-[var(--a)]";

  return (
    <section id="contact" className="relative w-full overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink, ["--a" as any]: accent }}>
      <div className="absolute bottom-0 left-1/3 w-[700px] h-[420px] rounded-full blur-[170px] pointer-events-none" style={{ background: accent, opacity: 0.16 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-28 sm:py-36">
        <div className="flex items-center gap-3 mb-10">
          <span className="h-px w-10" style={{ background: accent }} />
          <Editable as="span" className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: accent }}>(04) Contact</Editable>
        </div>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-6">
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-tighter leading-[0.95]" style={{ color: ink }}>
              <Editable className="block">Let's make</Editable>
              <Editable className="block">something</Editable>
              <Editable className="block" style={{ color: accent }}>remarkable.</Editable>
            </motion.h2>

            <div className="mt-12 flex items-center gap-3 text-sm" style={{ color: mix(ink, 65) }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-70" style={{ background: "#34D399" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#34D399" }} />
              </span>
              <Editable className="inline">Booking projects for next quarter</Editable>
            </div>

            <button onClick={copy} className="group mt-6 inline-flex items-center gap-3 text-xl sm:text-2xl font-bold tracking-tight cursor-pointer" style={{ color: ink }}>
              <Editable className="inline">{EMAIL}</Editable>
              <span className="h-9 w-9 rounded-full grid place-items-center border transition-colors" style={{ borderColor: line }}>
                {copied ? <Check className="h-4 w-4" style={{ color: accent }} /> : <Copy className="h-4 w-4" style={{ color: mix(ink, 70) }} />}
              </span>
            </button>
            <div className="mt-2 text-xs" style={{ color: mix(ink, 45) }}>{copied ? "Copied to clipboard" : "Click to copy"}</div>
          </div>

          {/* open form: underlines only, no container */}
          <div className="lg:col-span-6">
            {sent ? (
              <div className="py-10">
                <div className="h-16 w-16 rounded-full grid place-items-center mb-8" style={{ background: `linear-gradient(135deg, ${accent}, #E0265F)`, color: "#fff" }}><Check className="h-7 w-7" /></div>
                <Editable as="h3" className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: ink }}>Message received.</Editable>
                <Editable as="p" className="mt-4 text-base max-w-sm leading-relaxed" style={{ color: mix(ink, 65) }}>Thank you for reaching out. Expect a personal reply within a day or two.</Editable>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <Editable as="label" className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>01 — Your name</Editable>
                  <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Jane Cooper" className={field} style={{ borderColor: line, color: ink }} />
                </div>
                <div>
                  <Editable as="label" className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>02 — Your email</Editable>
                  <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="jane@company.com" className={field} style={{ borderColor: line, color: ink }} />
                </div>
                <div>
                  <Editable as="label" className="text-[11px] font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>03 — What are you building?</Editable>
                  <textarea required rows={3} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} placeholder="Tell me about the problem, the timeline, and the team." className={`${field} resize-none`} style={{ borderColor: line, color: ink }} />
                </div>
                <button type="submit" className="group mt-6 inline-flex items-center gap-3 pl-8 pr-3 py-3 rounded-full text-sm font-bold cursor-pointer transition-transform hover:scale-[1.03] active:scale-95"
                  style={{ background: `linear-gradient(135deg, ${accent}, #E0265F)`, color: "#fff", boxShadow: `0 10px 36px ${mix(accent, 45)}` }}>
                  <Editable className="inline">Send message</Editable>
                  <span className="h-10 w-10 rounded-full grid place-items-center bg-white/20 transition-transform group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}