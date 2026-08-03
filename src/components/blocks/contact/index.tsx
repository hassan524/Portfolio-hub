import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, ArrowUpRight, MapPin, Check } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDribbble } from "react-icons/fa";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { ContactProps } from "@/types/builder.schema";

type Props = BlockComponentProps<ContactProps>;

const ICONS: Record<string, any> = {
  github: FaGithub, linkedin: FaLinkedin, email: Mail, twitter: FaTwitter, instagram: FaInstagram, dribbble: FaDribbble,
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function Heading({ props, onChange, ink, className }: { props: ContactProps; onChange: Props["onChange"]; ink: string; className?: string }) {
  return (
    <Editable
      as="h2"
      value={props.heading}
      onChange={(v) => onChange({ heading: v })}
      className={className ?? "font-display text-3xl"}
      style={{ color: ink }}
    />
  );
}

function Message({ props, onChange, ink, className }: { props: ContactProps; onChange: Props["onChange"]; ink: string; className?: string }) {
  if (props.message === undefined) return null;
  return (
    <Editable
      as="p"
      value={props.message ?? ""}
      onChange={(v) => onChange({ message: v })}
      className={className ?? "mt-4 text-sm leading-relaxed max-w-md"}
      style={{ color: `${ink}75` }}
    />
  );
}

function SocialLinks({ socials, ink, accent }: { socials?: ContactProps["socials"]; ink: string; accent: string }) {
  if (!socials?.length) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {socials.map((s, i) => {
        const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
        return (
          <motion.span key={i} whileHover={{ y: -2, borderColor: accent }} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border cursor-default" style={{ borderColor: `${ink}20`, color: ink }}>
            <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
            {s.label}
          </motion.span>
        );
      })}
    </div>
  );
}

/** A genuinely interactive (client-only, no backend wired up) contact form — focus rings,
 *  validation-flavored required state, and a satisfying submit → success transition. Swap the
 *  onSubmit handler for a real endpoint/server action whenever the backend is ready. */
function LiveForm({ ink, accent, bg, dark = false }: { ink: string; accent: string; bg: string; dark?: boolean }) {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const fg = dark ? bg : ink;
  const fieldBg = dark ? `${bg}0d` : `${ink}05`;
  const border = (name: string) => ({ border: `1px solid ${focused === name ? accent : dark ? `${bg}25` : `${ink}15`}` });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  };

  if (status === "sent") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl px-6 py-10 text-center" style={{ background: fieldBg, color: fg }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="mx-auto h-10 w-10 rounded-full grid place-items-center" style={{ background: accent, color: bg }}>
          <Check className="h-5 w-5" />
        </motion.div>
        <div className="mt-3 text-sm font-medium">Message sent</div>
        <div className="mt-1 text-xs" style={{ color: dark ? `${bg}70` : `${ink}60` }}>Thanks for reaching out — expect a reply soon.</div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        value={values.name}
        onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        onFocus={() => setFocused("name")}
        onBlur={() => setFocused(null)}
        placeholder="Your name"
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
        style={{ background: fieldBg, color: fg, ...border("name") }}
      />
      <input
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        onFocus={() => setFocused("email")}
        onBlur={() => setFocused(null)}
        placeholder="Email address"
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
        style={{ background: fieldBg, color: fg, ...border("email") }}
      />
      <textarea
        value={values.message}
        onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
        onFocus={() => setFocused("message")}
        onBlur={() => setFocused(null)}
        placeholder="Your message"
        rows={4}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-colors"
        style={{ background: fieldBg, color: fg, ...border("message") }}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-xl px-5 py-3 text-sm font-medium text-center inline-flex items-center justify-center gap-2"
        style={{ background: accent, color: bg }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "sending" ? (
            <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2">
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent" />
              Sending
            </motion.span>
          ) : (
            <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2">
              Send message <Send className="h-3.5 w-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </form>
  );
}

/* ---------- Contact1: simple socials list, no form ---------- */
export function Contact1({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} onChange={onChange} ink={ink} />
        <Message props={props} onChange={onChange} ink={ink} />
        <SocialLinks socials={props.socials} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- Contact2: two-column, live form right ---------- */
export function Contact2({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-20 grid md:grid-cols-2 gap-12" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} onChange={onChange} ink={ink} />
        <Message props={props} onChange={onChange} ink={ink} />
        <SocialLinks socials={props.socials} ink={ink} accent={accent} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        <LiveForm ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </section>
  );
}

/* ---------- Contact3: centered, huge heading ---------- */
export function Contact3({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 text-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <Heading props={props} onChange={onChange} ink={ink} className="font-display text-5xl" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-5 text-base max-w-xl mx-auto" />
        <div className="mt-6 flex justify-center"><SocialLinks socials={props.socials} ink={ink} accent={accent} /></div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact4: big email link, minimal ---------- */
export function Contact4({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const email = props.socials?.find((s) => s.platform === "email");
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} onChange={onChange} ink={ink} />
        <Message props={props} onChange={onChange} ink={ink} />
        <motion.div whileHover={{ x: 6 }} className="mt-8 inline-flex items-center gap-2 font-display text-3xl md:text-5xl cursor-pointer" style={{ color: accent }}>
          {email?.label ?? "hello@example.com"} <ArrowUpRight className="h-8 w-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact5: dark inverted panel ---------- */
export function Contact5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ background: ink }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-3xl" style={{ color: bg }} />
        {props.message !== undefined && (
          <Editable as="p" value={props.message ?? ""} onChange={(v) => onChange({ message: v })} className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: `${bg}80` }} />
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {props.socials?.map((s, i) => {
            const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
            return (
              <motion.span key={i} whileHover={{ y: -2 }} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border" style={{ borderColor: `${bg}30`, color: bg }}>
                <Icon className="h-3.5 w-3.5" style={{ color: accent }} />{s.label}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact6: boxed card, accent tint ---------- */
export function Contact6({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} whileHover={{ y: -3 }} transition={{ duration: 0.5 }} className="rounded-2xl p-8 md:p-12" style={{ background: `${accent}12` }}>
        <Heading props={props} onChange={onChange} ink={ink} />
        <Message props={props} onChange={onChange} ink={ink} />
        <SocialLinks socials={props.socials} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- Contact7: split with vertical divider, live form left ---------- */
export function Contact7({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-20 flex flex-col md:flex-row gap-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex-1"><LiveForm ink={ink} accent={accent} bg={bg} /></motion.div>
      <div className="md:w-px self-stretch hidden md:block" style={{ background: `${ink}12` }} />
      <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex-1">
        <Heading props={props} onChange={onChange} ink={ink} />
        <Message props={props} onChange={onChange} ink={ink} />
        <SocialLinks socials={props.socials} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- Contact8: monospace/terminal style ---------- */
export function Contact8({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20 font-mono" style={{ borderTop: `1px solid ${ink}15` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="text-xs" style={{ color: accent }}>{"> contact --init"}</div>
        <Heading props={props} onChange={onChange} ink={ink} className="mt-3 font-display text-2xl" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-3 text-sm max-w-lg" />
        <div className="mt-5 space-y-1 text-xs" style={{ color: `${ink}70` }}>
          {props.socials?.map((s, i) => (<div key={i}><span style={{ color: accent }}>$</span> {s.label}</div>))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact9: right-aligned everything ---------- */
export function Contact9({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20 text-right" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} onChange={onChange} ink={ink} />
        <Message props={props} onChange={onChange} ink={ink} className="mt-4 text-sm leading-relaxed max-w-xl ml-auto" />
        <div className="mt-5 flex flex-wrap gap-2 justify-end">
          {props.socials?.map((s, i) => (<motion.span key={i} whileHover={{ y: -2 }} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: `${ink}20`, color: ink }}>{s.label}</motion.span>))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact10: card grid of social tiles ---------- */
export function Contact10({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-xl">
        <Heading props={props} onChange={onChange} ink={ink} />
        <Message props={props} onChange={onChange} ink={ink} />
      </motion.div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {props.socials?.map((s, i) => {
          const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -3, backgroundColor: `${accent}10` }} transition={{ delay: i * 0.04 }} className="rounded-xl px-4 py-4 flex flex-col items-center gap-2 text-xs" style={{ background: `${ink}06`, color: ink }}>
              <Icon className="h-4 w-4" style={{ color: accent }} />{s.label}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Contact11: giant name watermark + live form ---------- */
export function Contact11({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="relative px-8 md:px-16 py-20 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="absolute -top-4 left-0 font-display text-[9vw] leading-none opacity-[0.04] whitespace-nowrap" style={{ color: ink }}>Say hello</div>
      <div className="relative grid md:grid-cols-2 gap-10 pt-10">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <Heading props={props} onChange={onChange} ink={ink} />
          <Message props={props} onChange={onChange} ink={ink} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <LiveForm ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact12: pill-style social buttons row ---------- */
export function Contact12({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-6" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} onChange={onChange} ink={ink} className="font-display text-2xl" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-2 text-sm max-w-sm" />
      </motion.div>
      <div className="flex flex-wrap gap-2">
        {props.socials?.map((s, i) => (
          <motion.span key={i} whileHover={{ y: -2, scale: 1.04 }} className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${accent}18`, color: accent }}>{s.label}</motion.span>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact13: numbered steps (name/email/message) ---------- */
export function Contact13({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  const steps = ["Your name", "Your email", "Your message"];
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} onChange={onChange} ink={ink} />
        <Message props={props} onChange={onChange} ink={ink} />
      </motion.div>
      <div className="mt-8 max-w-md">
        <LiveForm ink={ink} accent={accent} bg={bg} />
        <div className="mt-4 flex items-center gap-4 text-xs" style={{ color: `${ink}45` }}>
          {steps.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1.5"><span className="font-display" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact14: accent-colored full band ---------- */
export function Contact14({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ background: accent }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-3xl" style={{ color: bg }} />
        {props.message !== undefined && (
          <Editable as="p" value={props.message ?? ""} onChange={(v) => onChange({ message: v })} className="mt-4 text-sm max-w-md" style={{ color: `${bg}90` }} />
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          {props.socials?.map((s, i) => (
            <motion.span key={i} whileHover={{ y: -2 }} className="text-sm px-3 py-1.5 rounded-full border" style={{ borderColor: `${bg}40`, color: bg }}>{s.label}</motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact15: brutalist thick border, uppercase ---------- */
export function Contact15({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `3px solid ${ink}` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-3xl uppercase tracking-wide" style={{ color: ink }} />
        <Message props={props} onChange={onChange} ink={ink} />
        <div className="mt-6 flex flex-wrap gap-4">
          {props.socials?.map((s, i) => (<motion.span key={i} whileHover={{ color: accent }} className="text-xs font-bold uppercase tracking-widest cursor-default" style={{ color: ink }}>{s.label}</motion.span>))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact16: gradient fade background ---------- */
export function Contact16({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ background: `linear-gradient(180deg, transparent, ${accent}10)` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} onChange={onChange} ink={ink} />
        <Message props={props} onChange={onChange} ink={ink} />
        <SocialLinks socials={props.socials} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- Contact17: location + availability style strip ---------- */
export function Contact17({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-2 text-xs" style={{ color: `${ink}55` }}>
          <MapPin className="h-3.5 w-3.5" style={{ color: accent }} /> Open to new work
        </div>
        <Heading props={props} onChange={onChange} ink={ink} className="mt-3 font-display text-3xl" />
        <Message props={props} onChange={onChange} ink={ink} />
        <SocialLinks socials={props.socials} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- Contact18: card-style elevated live form ---------- */
export function Contact18({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} whileHover={{ y: -3 }} transition={{ duration: 0.5 }} className="max-w-xl mx-auto rounded-2xl p-8 shadow-soft" style={{ background: bg, border: `1px solid ${ink}10` }}>
        <Heading props={props} onChange={onChange} ink={ink} className="font-display text-2xl text-center" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-2 text-sm text-center mx-auto max-w-sm" />
        <div className="mt-6"><LiveForm ink={ink} accent={accent} bg={bg} /></div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact19: send icon CTA, tight and minimal ---------- */
export function Contact19({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-16 flex items-center justify-between flex-wrap gap-6" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} onChange={onChange} ink={ink} className="font-display text-xl" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-1 text-sm" />
      </motion.div>
      <motion.div whileHover={{ scale: 1.08, rotate: 8 }} whileTap={{ scale: 0.94 }} className="h-11 w-11 rounded-full grid place-items-center cursor-pointer" style={{ background: accent }}>
        <Send className="h-4 w-4" style={{ color: bg }} />
      </motion.div>
    </section>
  );
}

/* ---------- Contact20: compact single-row summary strip ---------- */
export function Contact20({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-10 flex flex-wrap items-center justify-between gap-6" style={{ borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}>
      <Heading props={props} onChange={onChange} ink={ink} className="font-display text-xl" />
      <div className="flex flex-wrap gap-2">
        {props.socials?.slice(0, 4).map((s, i) => (<span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: `${accent}18`, color: accent }}>{s.label}</span>))}
      </div>
    </section>
  );
}