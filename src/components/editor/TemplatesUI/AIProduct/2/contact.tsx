// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function AIProduct2Contact({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#050505";
  const ink = theme?.ink || "#ffffff";
  const accent = theme?.accent || "#F7931A";
  const line = mix(ink, 12);
  const [form, setForm] = useState({ name: "", email: "" });
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return;
    setDone(true);
  };

  const input = "w-full px-5 py-3.5 rounded-full text-sm outline-none border transition-colors focus:border-white/40 bg-transparent";

  return (
    <section id="contact" className="relative w-full px-6 py-28 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink, borderTop: `1px solid ${line}` }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[320px] rounded-full blur-[150px] pointer-events-none" style={{ background: accent, opacity: 0.1 }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="p-8 md:p-14 rounded-[2rem] border text-center backdrop-blur-xl"
          style={{ borderColor: mix(ink, 18), backgroundColor: mix(ink, 4) }}
        >
          <Editable as="span" className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-6" style={{ borderColor: line, color: mix(ink, 75) }}>Early Access</Editable>
          <Editable as="h2" className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-2xl mx-auto" style={{ color: ink }}>Be first into the decentralized future</Editable>
          <Editable as="p" className="mt-5 text-sm md:text-base leading-relaxed max-w-lg mx-auto" style={{ color: mix(ink, 62) }}>
            Join the waitlist for priority access, zero trading fees for 30 days and exclusive launchpad allocations.
          </Editable>

          {done ? (
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="h-14 w-14 rounded-full grid place-items-center" style={{ backgroundColor: ink, color: bg }}><Check className="h-6 w-6" /></div>
              <Editable as="h3" className="text-xl font-semibold" style={{ color: ink }}>You're on the list</Editable>
              <Editable as="p" className="text-sm" style={{ color: mix(ink, 60) }}>We'll email you the moment your spot opens up.</Editable>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`${input} sm:max-w-[10rem]`} style={{ borderColor: mix(ink, 18), color: ink }} />
              <input type="email" required placeholder="you@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={input} style={{ borderColor: mix(ink, 18), color: ink }} />
              <button type="submit" className="shrink-0 inline-flex items-center justify-center gap-1.5 px-7 py-3.5 rounded-full text-sm font-semibold cursor-pointer transition-transform hover:scale-[1.03] active:scale-95"
                style={{ backgroundColor: ink, color: bg }}>
                <Editable className="inline">Join Waitlist</Editable>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
          )}

          <div className="mt-10 pt-8 border-t flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs" style={{ borderColor: line, color: mix(ink, 58) }}>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" style={{ color: accent }} /><Editable className="inline">Your data is never sold</Editable></span>
            <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" style={{ color: accent }} /><Editable className="inline">support@coinova.io</Editable></span>
            <span className="inline-flex items-center gap-2"><MessageCircle className="h-4 w-4" style={{ color: accent }} /><Editable className="inline">24/7 community chat</Editable></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}