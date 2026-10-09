// @ts-nocheck
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || 'Canvas';
  const ink = theme?.ink || 'CanvasText';
  const accent = theme?.accent || ink;
  const surface = theme?.surface || mix(ink, 14);
  const fontBody = theme?.fontBody;
  const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;
  const head = { fontFamily: fontHead };

  const email = props?.email || 'hello@alexmorgan.design';
  const types = props?.types || ['Brand', 'Website', 'App / UI', 'Motion', 'Other'];
  const budgets = props?.budgets || ['< $5k', '$5–15k', '$15–40k', '$40k+'];
  const socials = props?.socials || [['Instagram', '#'], ['Dribbble', '#'], ['Behance', '#'], ['LinkedIn', '#']];

  const [form, setForm] = useState({ name: '', email: '', type: types[0], budget: budgets[1] || budgets[0], message: '' });
  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });

  // Opens the visitor's own mail app. No server or other page needed.
  const submit = (e: any) => {
    e.preventDefault();
    const body = `Hi, I'm ${form.name} (${form.email}).\n\nProject type: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`New ${form.type} project — ${form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  const field = 'w-full border-b bg-transparent py-3 text-base outline-none transition placeholder:text-current placeholder:opacity-40 focus:border-[color:var(--ac)]';

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 lg:px-10 lg:py-40" style={{ backgroundColor: accent, color: bg, fontFamily: fontBody }}>
      {/* Decorative rings */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border" style={{ borderColor: mix(bg, 25), borderStyle: 'dashed' }} />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full border" style={{ borderColor: mix(bg, 20) }} />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-3 rounded-full border py-2 pl-3 pr-5 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ borderColor: mix(bg, 40) }}>
            <span className="relative grid h-2.5 w-2.5 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full" style={{ backgroundColor: bg }} />
              <span className="relative h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bg }} />
            </span>
            <Editable value={props?.status || 'Booking projects for next month'} />
          </div>

          <h2 className="mt-8 font-bold leading-[0.84] tracking-[-0.07em]" style={{ ...head, fontSize: 'clamp(3.4rem, 9vw, 8.5rem)' }}>
            <Editable value={props?.headline || "Let's make"} onChange={(v) => onChange?.({ headline: v })} />{' '}
            <span className="italic"><Editable value={props?.headlineAccent || 'something loud.'} onChange={(v) => onChange?.({ headlineAccent: v })} /></span>
          </h2>

          <p className="mt-8 max-w-md text-base leading-7" style={{ color: mix(bg, 80) }}>
            <Editable value={props?.intro || 'Tell me about your idea, your timeline and your budget. I reply to every message within one working day.'} onChange={(v) => onChange?.({ intro: v })} />
          </p>

          <div className="group mt-10 flex items-center justify-between gap-4 border-y py-6" style={{ borderColor: mix(bg, 35) }}>
            <div className="min-w-0 break-all text-2xl font-bold tracking-[-0.04em] sm:text-4xl" style={head}>
              <Editable value={email} onChange={(v) => onChange?.({ email: v })} />
            </div>
            <a href={`mailto:${email}`} aria-label="Send email" className="grid h-14 w-14 shrink-0 place-items-center rounded-full transition duration-500 group-hover:rotate-45 group-hover:scale-110" style={{ backgroundColor: bg, color: accent }}>
              <ArrowUpRight size={24} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {socials.map(([label, href], i) => (
              <a key={i} href={href} className="group relative text-xs font-semibold uppercase tracking-[0.2em]">
                <Editable value={label} />
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: bg }} />
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 50, rotate: 1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="rounded-[2rem] p-7 shadow-2xl sm:p-10 lg:col-span-6"
          style={{ backgroundColor: bg, color: ink, '--ac': accent }}
        >
          <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: accent }}><Editable value={props?.formTitle || 'Project brief'} /></p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <input required value={form.name} onChange={set('name')} placeholder="Your name" className={field} style={{ borderColor: surface }} />
            <input required type="email" value={form.email} onChange={set('email')} placeholder="Email address" className={field} style={{ borderColor: surface }} />
          </div>

          <p className="mt-8 text-[11px] uppercase tracking-[0.25em]" style={{ color: mix(ink, 55) }}>I need help with</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {types.map((t: string) => (
              <button key={t} type="button" onClick={() => setForm({ ...form, type: t })} className="rounded-full border px-4 py-2 text-xs font-semibold transition" style={{ borderColor: form.type === t ? accent : surface, backgroundColor: form.type === t ? accent : 'transparent', color: form.type === t ? bg : ink }}>{t}</button>
            ))}
          </div>

          <p className="mt-6 text-[11px] uppercase tracking-[0.25em]" style={{ color: mix(ink, 55) }}>Budget</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {budgets.map((b: string) => (
              <button key={b} type="button" onClick={() => setForm({ ...form, budget: b })} className="rounded-full border px-4 py-2 text-xs font-semibold transition" style={{ borderColor: form.budget === b ? accent : surface, backgroundColor: form.budget === b ? accent : 'transparent', color: form.budget === b ? bg : ink }}>{b}</button>
            ))}
          </div>

          <textarea required rows={4} value={form.message} onChange={set('message')} placeholder="Tell me about your project…" className={`${field} mt-8 resize-none`} style={{ borderColor: surface }} />

          <button type="submit" className="group mt-8 inline-flex w-full items-center justify-between rounded-full py-2 pl-8 pr-2 text-xs font-bold uppercase tracking-[0.2em] transition hover:scale-[1.02]" style={{ backgroundColor: accent, color: bg }}>
            <Editable value={props?.submit || 'Send message'} />
            <span className="grid h-11 w-11 place-items-center rounded-full transition group-hover:rotate-45" style={{ backgroundColor: bg, color: accent }}><ArrowUpRight size={18} /></span>
          </button>
        </motion.form>
      </div>
    </section>
  );
}