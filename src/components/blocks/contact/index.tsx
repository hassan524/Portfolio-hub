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

/* ---------- Contact1: Centered Fullscreen — full-height centered, large heading, LiveForm below, social links at bottom ---------- */
export function Contact1({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 py-24 text-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="w-full max-w-2xl flex flex-col items-center">
        <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-6" style={{ background: `${accent}15`, color: accent }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          Available for new projects
        </div>
        <Heading props={props} onChange={onChange} ink={ink} className="font-display text-5xl md:text-7xl leading-none tracking-tight" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-6 text-base leading-relaxed max-w-lg mx-auto" />
        <div className="mt-10 w-full max-w-md">
          <LiveForm ink={ink} accent={accent} bg={bg} />
        </div>
        <div className="mt-10 flex justify-center">
          <SocialLinks socials={props.socials} ink={ink} accent={accent} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact2: Two-Col Split — heading+socials left, LiveForm right, divider ---------- */
export function Contact2({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-block text-xs font-medium uppercase tracking-widest mb-4 px-3 py-1 rounded" style={{ background: `${accent}15`, color: accent }}>Contact</div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl leading-tight" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-5 text-base leading-relaxed max-w-sm" />
          <SocialLinks socials={props.socials} ink={ink} accent={accent} />
          <div className="mt-10 hidden md:block w-px h-32" style={{ background: `${ink}12` }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="pt-2">
          <div className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: `${ink}50` }}>Send a message</div>
          <LiveForm ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact3: Huge Heading Centered — oversized heading, message, socials row ---------- */
export function Contact3({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28 text-center overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
        <div className="text-xs font-medium uppercase tracking-[0.25em] mb-6" style={{ color: accent }}>Get in Touch</div>
        <Heading props={props} onChange={onChange} ink={ink} className="font-display text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-8 text-lg leading-relaxed max-w-2xl mx-auto" />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {props.socials?.map((s, i) => {
            const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
            return (
              <motion.span key={i} whileHover={{ y: -3, scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full border cursor-default" style={{ borderColor: `${ink}20`, color: ink }}>
                <Icon className="h-4 w-4" style={{ color: accent }} />
                {s.label}
              </motion.span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact4: Animated Email Link — big email with ArrowUpRight, animated hover slide ---------- */
export function Contact4({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const email = props.socials?.find((s) => s.platform === "email");
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-4xl">
        <div className="text-xs uppercase tracking-widest mb-4" style={{ color: `${ink}50` }}>Drop a line</div>
        <Heading props={props} onChange={onChange} ink={ink} className="font-display text-2xl md:text-3xl" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-4 text-base leading-relaxed max-w-xl" />
        <div className="mt-10 overflow-hidden border-b pb-6" style={{ borderColor: `${ink}15` }}>
          <motion.div
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 cursor-pointer group"
          >
            <span className="font-display text-3xl md:text-5xl lg:text-6xl" style={{ color: accent }}>
              {email?.label ?? "hello@example.com"}
            </span>
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-10 w-10 md:h-14 md:w-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: accent }}
            >
              <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" style={{ color: "white" }} />
            </motion.div>
          </motion.div>
        </div>
        <div className="mt-8">
          <SocialLinks socials={props.socials?.filter(s => s.platform !== "email")} ink={ink} accent={accent} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact5: Dark Inverted — dark bg, light text, socials + available badge + form ---------- */
export function Contact5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: ink }}>
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-6" style={{ background: `${accent}25`, color: accent }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accent }} />
            Currently Available
          </div>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl leading-tight" style={{ color: bg }} />
          {props.message !== undefined && (
            <Editable as="p" value={props.message ?? ""} onChange={(v) => onChange({ message: v })} className="mt-5 text-base leading-relaxed max-w-sm" style={{ color: `${bg}75` }} />
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {props.socials?.map((s, i) => {
              const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
              return (
                <motion.span key={i} whileHover={{ y: -2, borderColor: accent }} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-colors" style={{ borderColor: `${bg}25`, color: bg }}>
                  <Icon className="h-3.5 w-3.5" style={{ color: accent }} />{s.label}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <LiveForm ink={bg} accent={accent} bg={ink} dark={true} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact6: Accent Card — entire section in accent-tinted rounded card ---------- */
export function Contact6({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center"
        style={{ background: `${accent}12`, border: `1px solid ${accent}20` }}
      >
        <div>
          <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: accent }}>Let's work together</div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl leading-tight" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-5 text-base leading-relaxed max-w-md" />
          <SocialLinks socials={props.socials} ink={ink} accent={accent} />
        </div>
        <div>
          <LiveForm ink={ink} accent={accent} bg={bg} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact7: Form Left / Info Right — LiveForm left, heading+message+socials right ---------- */
export function Contact7({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="flex flex-col md:flex-row gap-16 items-start">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex-1">
          <div className="text-xs uppercase tracking-widest mb-5" style={{ color: `${ink}50` }}>Your message</div>
          <LiveForm ink={ink} accent={accent} bg={bg} />
        </motion.div>
        <div className="hidden md:block w-px self-stretch" style={{ background: `${ink}12` }} />
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="flex-1">
          <div className="text-xs uppercase tracking-widest mb-5" style={{ color: `${ink}50` }}>About</div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl leading-tight" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-5 text-base leading-relaxed max-w-sm" />
          <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${ink}10` }}>
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: `${ink}50` }}>Find me on</div>
            <SocialLinks socials={props.socials} ink={ink} accent={accent} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact8: Monospace Terminal — terminal style with > contact --init, form fields styled as terminal inputs ---------- */
export function Contact8({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24 font-mono" style={{ borderTop: `1px solid ${ink}15` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="rounded-2xl overflow-hidden" style={{ background: `${ink}08`, border: `1px solid ${ink}12` }}>
          {/* Terminal header bar */}
          <div className="flex items-center gap-2 px-5 py-3" style={{ background: `${ink}10`, borderBottom: `1px solid ${ink}10` }}>
            <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
            <span className="ml-4 text-xs" style={{ color: `${ink}40` }}>contact.sh</span>
          </div>
          <div className="p-6 md:p-10">
            <div className="text-xs mb-1" style={{ color: `${ink}50` }}>Last login: today</div>
            <div className="text-sm mb-4">
              <span style={{ color: accent }}>~ $</span>
              <span style={{ color: ink }}> contact --init</span>
            </div>
            <Heading props={props} onChange={onChange} ink={ink} className="font-mono text-xl md:text-2xl mb-2" />
            <Message props={props} onChange={onChange} ink={ink} className="text-sm max-w-lg mb-6" />
            <div className="space-y-2 mb-6 text-xs" style={{ color: `${ink}65` }}>
              {props.socials?.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ color: accent }}>$</span>
                  <span>open </span>
                  <span style={{ color: accent }}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="text-xs mb-4" style={{ color: `${ink}50` }}>
              <span style={{ color: accent }}>$</span> compose --new-message
            </div>
            <div className="max-w-lg">
              <LiveForm ink={ink} accent={accent} bg={bg} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact9: Right-Aligned — everything right-aligned with right-to-left reveal ---------- */
export function Contact9({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24 text-right" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="ml-auto max-w-2xl"
      >
        <div className="text-xs uppercase tracking-widest mb-4 flex justify-end gap-2 items-center" style={{ color: accent }}>
          <span>Contact</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
        <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl leading-tight" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-5 text-base leading-relaxed max-w-xl ml-auto" />
        <div className="mt-6 flex flex-wrap gap-2 justify-end">
          {props.socials?.map((s, i) => {
            const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
            return (
              <motion.span key={i} whileHover={{ y: -2 }} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border" style={{ borderColor: `${ink}20`, color: ink }}>
                <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                {s.label}
              </motion.span>
            );
          })}
        </div>
        <div className="mt-10">
          <LiveForm ink={ink} accent={accent} bg={bg} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact10: Social Icon Grid — 2x4 grid of social platform cards with icons ---------- */
export function Contact10({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl leading-tight" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-5 text-base leading-relaxed max-w-sm" />
          <div className="mt-10">
            <LiveForm ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="text-xs uppercase tracking-widest mb-5" style={{ color: `${ink}50` }}>Find me on</div>
          <div className="grid grid-cols-2 gap-3">
            {props.socials?.map((s, i) => {
              const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, boxShadow: `0 8px 30px ${accent}20` }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-2xl p-5 flex flex-col gap-3 cursor-default"
                  style={{ background: `${ink}06`, border: `1px solid ${ink}10` }}
                >
                  <div className="h-9 w-9 rounded-xl grid place-items-center" style={{ background: `${accent}18` }}>
                    <Icon className="h-4.5 w-4.5" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: ink }}>{s.label}</div>
                    <div className="text-xs capitalize mt-0.5" style={{ color: `${ink}50` }}>{s.platform}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact11: Watermark + Form — giant "Hello" watermark bg, two-col form+info on top ---------- */
export function Contact11({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <span className="font-display leading-none" style={{ fontSize: "clamp(5rem, 25vw, 20rem)", color: `${ink}04`, whiteSpace: "nowrap" }}>
          Hello
        </span>
      </div>
      <div className="relative grid md:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <div className="text-xs uppercase tracking-widest mb-4" style={{ color: accent }}>Let's connect</div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-6xl leading-none tracking-tight" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-6 text-base leading-relaxed max-w-sm" />
          <div className="mt-8">
            <SocialLinks socials={props.socials} ink={ink} accent={accent} />
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm" style={{ color: `${ink}55` }}>
            <MapPin className="h-4 w-4" style={{ color: accent }} />
            <span>Open to global remote opportunities</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <div className="rounded-2xl p-6 md:p-8" style={{ background: bg, boxShadow: `0 20px 60px ${ink}12`, border: `1px solid ${ink}08` }}>
            <div className="text-sm font-medium mb-5" style={{ color: ink }}>Send a message</div>
            <LiveForm ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact12: Horizontal Pill Socials — compact heading + horizontal pill-style social buttons ---------- */
export function Contact12({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <Heading props={props} onChange={onChange} ink={ink} className="font-display text-3xl md:text-4xl" />
            <Message props={props} onChange={onChange} ink={ink} className="mt-3 text-sm max-w-sm" />
          </div>
          <div className="flex flex-wrap gap-2">
            {props.socials?.map((s, i) => {
              const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
              return (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full font-medium cursor-default"
                  style={{ background: `${accent}15`, color: accent }}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {s.label}
                </motion.span>
              );
            })}
          </div>
        </div>
        <div className="max-w-lg">
          <LiveForm ink={ink} accent={accent} bg={bg} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact13: Step-by-Step Form — numbered steps approach ---------- */
export function Contact13({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const steps = [
    { label: "Your name", key: "name", placeholder: "Enter your full name", type: "text" },
    { label: "Email address", key: "email", placeholder: "Enter your email", type: "email" },
    { label: "Your message", key: "message", placeholder: "What's on your mind?", type: "textarea" },
  ];

  const handleSubmit = () => {
    if (values.name && values.email && values.message) setStatus("sent");
  };

  if (status === "sent") {
    return (
      <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md">
          <div className="h-12 w-12 rounded-full grid place-items-center mb-4" style={{ background: accent }}>
            <Check className="h-6 w-6" style={{ color: "white" }} />
          </div>
          <div className="font-display text-2xl mb-2" style={{ color: ink }}>Message sent!</div>
          <div className="text-sm" style={{ color: `${ink}60` }}>Thanks for reaching out. I'll be in touch soon.</div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl leading-tight" />
        <Message props={props} onChange={onChange} ink={ink} className="mt-4 text-base leading-relaxed max-w-lg" />
        <div className="mt-12 max-w-lg">
          {/* Step indicators */}
          <div className="flex items-center gap-3 mb-10">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full grid place-items-center text-xs font-bold transition-all cursor-pointer"
                  style={{ background: i <= step ? accent : `${ink}10`, color: i <= step ? "white" : `${ink}40` }}
                  onClick={() => setStep(i)}
                >
                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="h-px w-8 transition-all" style={{ background: i < step ? accent : `${ink}15` }} />
                )}
              </div>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: accent }}>Step {step + 1} of {steps.length}</div>
              <div className="text-lg font-medium mb-4" style={{ color: ink }}>{steps[step].label}</div>
              {steps[step].type === "textarea" ? (
                <textarea
                  value={values[steps[step].key as keyof typeof values]}
                  onChange={(e) => setValues(v => ({ ...v, [steps[step].key]: e.target.value }))}
                  placeholder={steps[step].placeholder}
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{ background: `${ink}06`, color: ink, border: `1px solid ${ink}15` }}
                />
              ) : (
                <input
                  type={steps[step].type}
                  value={values[steps[step].key as keyof typeof values]}
                  onChange={(e) => setValues(v => ({ ...v, [steps[step].key]: e.target.value }))}
                  placeholder={steps[step].placeholder}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                  style={{ background: `${ink}06`, color: ink, border: `1px solid ${ink}15` }}
                />
              )}
              <div className="mt-4 flex gap-3">
                {step > 0 && (
                  <button onClick={() => setStep(s => s - 1)} className="px-4 py-2.5 rounded-xl text-sm" style={{ background: `${ink}08`, color: ink }}>
                    Back
                  </button>
                )}
                {step < steps.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(s => s + 1)}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: accent, color: "white" }}
                  >
                    Next →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center justify-center gap-2"
                    style={{ background: accent, color: "white" }}
                  >
                    Send message <Send className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 pt-6" style={{ borderTop: `1px solid ${ink}10` }}>
            <SocialLinks socials={props.socials} ink={ink} accent={accent} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact14: Accent Color Band — full-width band in accent color with form ---------- */
export function Contact14({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section style={{ background: accent }}>
      <div className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="text-xs font-medium uppercase tracking-widest mb-4 opacity-70" style={{ color: bg }}>
            Work with me
          </div>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl leading-tight" style={{ color: bg }} />
          {props.message !== undefined && (
            <Editable as="p" value={props.message ?? ""} onChange={(v) => onChange({ message: v })} className="mt-5 text-base leading-relaxed max-w-sm" style={{ color: `${bg}90` }} />
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {props.socials?.map((s, i) => {
              const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
              return (
                <motion.span key={i} whileHover={{ y: -2 }} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border cursor-default" style={{ borderColor: `${bg}35`, color: bg }}>
                  <Icon className="h-3.5 w-3.5" style={{ color: bg }} />{s.label}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <div className="rounded-2xl p-6 md:p-8" style={{ background: bg }}>
            <LiveForm ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact15: Brutalist — thick top border, uppercase, no radius form fields ---------- */
export function Contact15({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  };

  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `4px solid ${ink}` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-6xl uppercase tracking-tight leading-none" style={{ color: ink }} />
            {props.message !== undefined && (
              <Editable as="p" value={props.message ?? ""} onChange={(v) => onChange({ message: v })} className="mt-6 text-sm leading-relaxed max-w-sm uppercase tracking-wide" style={{ color: `${ink}65` }} />
            )}
            <div className="mt-8 flex flex-wrap gap-5">
              {props.socials?.map((s, i) => (
                <motion.span key={i} whileHover={{ color: accent }} className="text-xs font-bold uppercase tracking-widest cursor-default transition-colors" style={{ color: ink }}>{s.label}</motion.span>
              ))}
            </div>
          </div>
          <div>
            {status === "sent" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center" style={{ border: `2px solid ${ink}` }}>
                <Check className="h-8 w-8 mx-auto mb-3" style={{ color: accent }} />
                <div className="text-sm font-bold uppercase tracking-widest" style={{ color: ink }}>Message Sent</div>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                {[
                  { key: "name", placeholder: "YOUR NAME" },
                  { key: "email", placeholder: "YOUR EMAIL" },
                ].map((f) => (
                  <input
                    key={f.key}
                    value={values[f.key as keyof typeof values]}
                    onChange={(e) => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full px-4 py-3 text-sm font-bold uppercase tracking-widest outline-none bg-transparent"
                    style={{ border: `2px solid ${ink}`, color: ink }}
                  />
                ))}
                <textarea
                  value={values.message}
                  onChange={(e) => setValues(v => ({ ...v, message: e.target.value }))}
                  placeholder="YOUR MESSAGE"
                  rows={4}
                  className="w-full px-4 py-3 text-sm font-bold uppercase tracking-widest outline-none bg-transparent resize-none"
                  style={{ border: `2px solid ${ink}`, color: ink }}
                />
                <motion.button
                  type="submit"
                  whileHover={{ background: ink, color: bg }}
                  className="w-full px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors"
                  style={{ border: `2px solid ${ink}`, color: ink, background: "transparent" }}
                >
                  {status === "sending" ? "Sending..." : "Send →"}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Contact16: Gradient Fade — gradient fade background, subtle and elegant ---------- */
export function Contact16({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}08, transparent, ${accent}05)` }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <div className="text-xs uppercase tracking-widest mb-4" style={{ color: accent }}>Contact</div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl leading-tight" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-5 text-base leading-relaxed max-w-sm" />
          <SocialLinks socials={props.socials} ink={ink} accent={accent} />
          <div className="mt-8 pt-8 flex items-center gap-3" style={{ borderTop: `1px solid ${ink}10` }}>
            <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: accent }} />
            <span className="text-sm" style={{ color: `${ink}60` }}>Ready to collaborate</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <div className="rounded-2xl p-7 backdrop-blur-sm" style={{ background: `${bg}90`, border: `1px solid ${ink}10`, boxShadow: `0 25px 50px ${ink}10` }}>
            <LiveForm ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact17: Location + Status — location pin + availability status prominent, form below ---------- */
export function Contact17({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="grid md:grid-cols-3 gap-12 items-start">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="md:col-span-1">
          <div className="space-y-4 mb-8">
            <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: `${accent}10` }}>
              <div className="h-2 w-2 rounded-full animate-pulse" style={{ background: accent }} />
              <span className="text-sm font-medium" style={{ color: accent }}>Available for work</span>
            </div>
            <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: `${ink}06` }}>
              <MapPin className="h-4 w-4" style={{ color: accent }} />
              <span className="text-sm" style={{ color: ink }}>Open to remote worldwide</span>
            </div>
          </div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-3xl md:text-4xl leading-tight" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-4 text-sm leading-relaxed" />
          <div className="mt-6">
            <SocialLinks socials={props.socials} ink={ink} accent={accent} />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className="md:col-span-2">
          <LiveForm ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact18: Elevated Card Form — centered elevated card with form inside ---------- */
export function Contact18({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-2xl mx-auto">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center mb-10">
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-4 text-base leading-relaxed max-w-lg mx-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="rounded-3xl p-8 md:p-10"
          style={{ background: bg, boxShadow: `0 30px 70px ${ink}14`, border: `1px solid ${ink}08` }}
        >
          <LiveForm ink={ink} accent={accent} bg={bg} />
          <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${ink}08` }}>
            <div className="flex flex-wrap justify-center gap-3">
              <SocialLinks socials={props.socials} ink={ink} accent={accent} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact19: Minimal CTA — elegant minimal layout with send button ---------- */
export function Contact19({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-3xl">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="flex items-start justify-between gap-8 flex-wrap">
            <div className="flex-1">
              <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl leading-tight" />
              <Message props={props} onChange={onChange} ink={ink} className="mt-4 text-base leading-relaxed max-w-lg" />
            </div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 h-16 w-16 rounded-full grid place-items-center cursor-pointer shadow-lg"
              style={{ background: accent }}
            >
              <Send className="h-6 w-6" style={{ color: "white" }} />
            </motion.div>
          </div>
          <div className="mt-12 pt-6" style={{ borderTop: `1px solid ${ink}10` }}>
            <div className="flex flex-wrap items-center justify-between gap-6">
              <SocialLinks socials={props.socials} ink={ink} accent={accent} />
              <div className="flex items-center gap-2 text-sm" style={{ color: `${ink}55` }}>
                <div className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                Response within 24h
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact20: Compact Summary Strip — horizontal strip with essential info + form ---------- */
export function Contact20({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section style={{ borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16 py-10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-2xl" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-1 text-sm max-w-sm" />
        </div>
        <div className="flex flex-wrap gap-2">
          {props.socials?.slice(0, 4).map((s, i) => {
            const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
            return (
              <motion.span key={i} whileHover={{ y: -2, scale: 1.05 }} className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>
                <Icon className="h-3 w-3" />
                {s.label}
              </motion.span>
            );
          })}
        </div>
      </div>
      <div className="px-8 md:px-16 pb-12 max-w-2xl">
        <LiveForm ink={ink} accent={accent} bg={bg} />
      </div>
    </section>
  );
}

/* ---------- Contact21: Luxury Invitation — warm gold accents, formal CTA, serif heading ---------- */
export function Contact21({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  const gold = "#C9A96E";
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: `linear-gradient(160deg, ${bg}, ${gold}08)` }}>
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-16" style={{ background: `${gold}60` }} />
            <span className="text-xs uppercase tracking-[0.35em]" style={{ color: gold }}>Invitation</span>
            <div className="h-px flex-1 max-w-16" style={{ background: `${gold}60` }} />
          </div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-5xl md:text-6xl tracking-tight leading-tight" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-6 text-lg leading-relaxed max-w-xl mx-auto italic" />
          <div className="mt-6 flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full" style={{ background: gold }} />
            ))}
          </div>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="rounded-2xl p-8" style={{ border: `1px solid ${gold}30`, background: `${gold}05` }}>
              <div className="text-xs uppercase tracking-widest mb-6" style={{ color: gold }}>Send a note</div>
              <LiveForm ink={ink} accent={gold} bg={bg} />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="text-xs uppercase tracking-widest mb-6" style={{ color: gold }}>Connect</div>
            <div className="space-y-4">
              {props.socials?.map((s, i) => {
                const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
                return (
                  <motion.div key={i} whileHover={{ x: 4 }} className="flex items-center gap-4 py-3" style={{ borderBottom: `1px solid ${gold}20` }}>
                    <div className="h-9 w-9 rounded-full grid place-items-center" style={{ border: `1px solid ${gold}40` }}>
                      <Icon className="h-4 w-4" style={{ color: gold }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: ink }}>{s.label}</div>
                      <div className="text-xs capitalize" style={{ color: `${ink}50` }}>{s.platform}</div>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 ml-auto" style={{ color: gold }} />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact22: Neon Contact — dark bg, neon form field borders, glowing send button ---------- */
export function Contact22({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  const neon = accent;
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  };
  const neonBorder = (name: string) => ({
    border: `1px solid ${focused === name ? neon : `${neon}30`}`,
    boxShadow: focused === name ? `0 0 10px ${neon}40, inset 0 0 10px ${neon}05` : "none",
  });

  return (
    <section className="px-8 md:px-16 py-24" style={{ background: ink }}>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <div className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: neon, textShadow: `0 0 10px ${neon}` }}>// contact.sys</div>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl leading-tight" style={{ color: bg }} />
          {props.message !== undefined && (
            <Editable as="p" value={props.message ?? ""} onChange={(v) => onChange({ message: v })} className="mt-5 text-base leading-relaxed max-w-sm font-mono" style={{ color: `${bg}70` }} />
          )}
          <div className="mt-10 space-y-3">
            {props.socials?.map((s, i) => {
              const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
              return (
                <motion.div key={i} whileHover={{ x: 6 }} className="flex items-center gap-3 text-sm" style={{ color: `${bg}80` }}>
                  <Icon className="h-4 w-4" style={{ color: neon }} />
                  <span className="font-mono">{s.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          {status === "sent" ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl p-10 text-center" style={{ border: `1px solid ${neon}40` }}>
              <div className="h-10 w-10 rounded-full mx-auto grid place-items-center mb-3" style={{ background: neon, boxShadow: `0 0 20px ${neon}` }}>
                <Check className="h-5 w-5" style={{ color: ink }} />
              </div>
              <div className="text-sm font-mono" style={{ color: bg }}>message_sent.ok</div>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              {[
                { key: "name", placeholder: "name_" },
                { key: "email", placeholder: "email_" },
              ].map((f) => (
                <input
                  key={f.key}
                  value={values[f.key as keyof typeof values]}
                  onChange={(e) => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                  onFocus={() => setFocused(f.key)}
                  onBlur={() => setFocused(null)}
                  placeholder={f.placeholder}
                  className="w-full rounded-lg px-4 py-3 text-sm font-mono outline-none bg-transparent transition-all"
                  style={{ color: bg, ...neonBorder(f.key) }}
                />
              ))}
              <textarea
                value={values.message}
                onChange={(e) => setValues(v => ({ ...v, message: e.target.value }))}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="message_"
                rows={4}
                className="w-full rounded-lg px-4 py-3 text-sm font-mono outline-none bg-transparent resize-none transition-all"
                style={{ color: bg, ...neonBorder("message") }}
              />
              <motion.button
                type="submit"
                whileHover={{ boxShadow: `0 0 25px ${neon}60` }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-lg px-5 py-3 text-sm font-mono font-medium inline-flex items-center justify-center gap-2 transition-all"
                style={{ background: neon, color: ink, boxShadow: `0 0 15px ${neon}40` }}
              >
                {status === "sending" ? "transmitting..." : <>transmit_message <Send className="h-3.5 w-3.5" /></>}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact23: Magazine Contact Page — editorial-style layout ---------- */
export function Contact23({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-10">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="md:col-span-7">
            <div className="text-xs font-medium uppercase tracking-widest mb-6 flex items-center gap-3" style={{ color: accent }}>
              <span>Vol. 01</span>
              <div className="h-px flex-1" style={{ background: `${accent}30` }} />
              <span>Contact</span>
            </div>
            <Heading props={props} onChange={onChange} ink={ink} className="font-display text-6xl md:text-8xl leading-none tracking-tighter" />
            <div className="mt-8 grid grid-cols-2 gap-8">
              <Message props={props} onChange={onChange} ink={ink} className="text-base leading-relaxed col-span-2 md:col-span-1" />
              <div className="col-span-2 md:col-span-1 pl-4" style={{ borderLeft: `2px solid ${accent}` }}>
                <div className="text-2xl md:text-3xl italic font-display leading-tight" style={{ color: `${ink}60` }}>
                  "The best collaborations start with a simple hello."
                </div>
              </div>
            </div>
            <div className="mt-10">
              <SocialLinks socials={props.socials} ink={ink} accent={accent} />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-5">
            <div className="rounded-2xl p-7" style={{ background: `${ink}05`, border: `1px solid ${ink}10` }}>
              <div className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: `${ink}50` }}>Write to me</div>
              <LiveForm ink={ink} accent={accent} bg={bg} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact24: Glass Contact Card — frosted glass centered on gradient, form inside ---------- */
export function Contact24({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24 relative" style={{ background: `linear-gradient(135deg, ${accent}15, ${bg}, ${accent}08)` }}>
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 20% 80%, ${accent}20 0%, transparent 60%), radial-gradient(circle at 80% 20%, ${accent}15 0%, transparent 60%)` }} />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl p-8 md:p-12 backdrop-blur-md"
          style={{ background: `${bg}75`, border: `1px solid ${ink}12`, boxShadow: `0 30px 80px ${ink}15` }}
        >
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: accent }}>Contact</div>
            <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl" />
            <Message props={props} onChange={onChange} ink={ink} className="mt-4 text-base leading-relaxed max-w-md mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <LiveForm ink={ink} accent={accent} bg={bg} />
            <div>
              <div className="text-xs uppercase tracking-widest mb-4" style={{ color: `${ink}50` }}>Or reach out via</div>
              <div className="space-y-3">
                {props.socials?.map((s, i) => {
                  const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
                  return (
                    <motion.div key={i} whileHover={{ x: 4 }} className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-default" style={{ background: `${ink}06`, border: `1px solid ${ink}08` }}>
                      <Icon className="h-4 w-4" style={{ color: accent }} />
                      <span className="text-sm" style={{ color: ink }}>{s.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 ml-auto" style={{ color: `${ink}30` }} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact25: Handcraft — warm parchment feel, stamp-style label, rough-border form ---------- */
export function Contact25({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  const warm = "#F5EDD8";
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  };

  return (
    <section className="px-8 md:px-16 py-24" style={{ background: `${accent}08`, borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <div className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 mb-8 rotate-[-1deg]" style={{ background: accent, color: "white" }}>
            ✉ Drop a Line
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl leading-tight" />
              <Message props={props} onChange={onChange} ink={ink} className="mt-5 text-base leading-relaxed" />
              <div className="mt-8 space-y-3">
                {props.socials?.map((s, i) => {
                  const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm" style={{ color: `${ink}70` }}>
                      <Icon className="h-4 w-4" style={{ color: accent }} />
                      {s.label}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              {status === "sent" ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl p-8 text-center" style={{ border: `2px dashed ${accent}50` }}>
                  <div className="text-3xl mb-3">📬</div>
                  <div className="font-medium" style={{ color: ink }}>Letter sent!</div>
                  <div className="text-sm mt-1" style={{ color: `${ink}60` }}>I'll write back soon.</div>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-4" style={{ padding: "24px", border: `2px dashed ${accent}35`, borderRadius: "16px" }}>
                  {[
                    { key: "name", placeholder: "Your name" },
                    { key: "email", placeholder: "Your email" },
                  ].map((f) => (
                    <div key={f.key}>
                      <input
                        value={values[f.key as keyof typeof values]}
                        onChange={(e) => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                        onFocus={() => setFocused(f.key)}
                        onBlur={() => setFocused(null)}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 text-sm outline-none bg-transparent"
                        style={{ borderBottom: `2px solid ${focused === f.key ? accent : `${ink}20`}`, color: ink }}
                      />
                    </div>
                  ))}
                  <textarea
                    value={values.message}
                    onChange={(e) => setValues(v => ({ ...v, message: e.target.value }))}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your message..."
                    rows={4}
                    className="w-full px-4 py-3 text-sm outline-none bg-transparent resize-none"
                    style={{ borderBottom: `2px solid ${focused === "message" ? accent : `${ink}20`}`, color: ink }}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-3 text-sm font-medium rounded-xl inline-flex items-center justify-center gap-2"
                    style={{ background: accent, color: "white" }}
                  >
                    {status === "sending" ? "Sending..." : <>Send letter <Send className="h-3.5 w-3.5" /></>}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact26: Corporate Business Card — structured business card layout ---------- */
export function Contact26({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Business card left */}
            <div className="rounded-2xl p-8 md:p-10 flex flex-col justify-between" style={{ background: ink, minHeight: "320px" }}>
              <div>
                <div className="text-xs uppercase tracking-widest mb-6" style={{ color: `${accent}` }}>Business Inquiry</div>
                <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-3xl md:text-4xl leading-tight" style={{ color: bg }} />
                {props.message !== undefined && (
                  <Editable as="p" value={props.message ?? ""} onChange={(v) => onChange({ message: v })} className="mt-4 text-sm leading-relaxed max-w-sm" style={{ color: `${bg}70` }} />
                )}
              </div>
              <div className="mt-8 space-y-3">
                {props.socials?.map((s, i) => {
                  const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm" style={{ color: `${bg}80` }}>
                      <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                      {s.label}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-6 flex items-center gap-2" style={{ borderTop: `1px solid ${bg}15` }}>
                <div className="h-2 w-2 rounded-full" style={{ background: accent }} />
                <span className="text-xs" style={{ color: `${bg}60` }}>Available for projects</span>
              </div>
            </div>
            {/* Form right */}
            <div className="rounded-2xl p-8 md:p-10" style={{ border: `1px solid ${ink}12` }}>
              <div className="text-xs uppercase tracking-widest mb-6" style={{ color: `${ink}50` }}>Start a conversation</div>
              <LiveForm ink={ink} accent={accent} bg={bg} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact27: Sports CTA — bold diagonal, energetic, "Ready to Win?" style ---------- */
export function Contact27({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24 relative overflow-hidden" style={{ background: ink }}>
      {/* Diagonal accent band */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-96 h-96 rotate-12 opacity-10" style={{ background: accent }} />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rotate-12 opacity-5" style={{ background: accent }} />
      </div>
      <div className="relative grid md:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded mb-6" style={{ background: accent, color: ink === "#000000" ? bg : "white" }}>
            ⚡ Let's Go
          </div>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl md:text-7xl leading-none tracking-tighter uppercase" style={{ color: bg }} />
          {props.message !== undefined && (
            <Editable as="p" value={props.message ?? ""} onChange={(v) => onChange({ message: v })} className="mt-5 text-base leading-relaxed max-w-sm" style={{ color: `${bg}75` }} />
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {props.socials?.map((s, i) => {
              const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
              return (
                <motion.span key={i} whileHover={{ y: -2, scale: 1.05 }} className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-bold" style={{ background: `${accent}20`, color: accent }}>
                  <Icon className="h-3.5 w-3.5" /> {s.label}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <div className="rounded-2xl p-6 md:p-8" style={{ background: `${bg}10`, border: `1px solid ${bg}15` }}>
            <div className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: accent }}>Make your move</div>
            <LiveForm ink={bg} accent={accent} bg={ink} dark={true} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Contact28: Nature/Service Contact — soft organic card, gentle form ---------- */
export function Contact28({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: `linear-gradient(160deg, ${accent}06 0%, ${bg} 50%, ${accent}04 100%)` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="text-3xl mb-4">🌿</div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-4xl md:text-5xl" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-4 text-lg leading-relaxed max-w-lg mx-auto" />
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-2">
            <div className="rounded-3xl p-8 h-full" style={{ background: bg, border: `1px solid ${accent}20`, boxShadow: `0 20px 60px ${accent}10` }}>
              <LiveForm ink={ink} accent={accent} bg={bg} />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="rounded-3xl p-8 h-full flex flex-col gap-4" style={{ background: `${accent}10`, border: `1px solid ${accent}15` }}>
              <div className="flex items-center gap-2 text-sm font-medium" style={{ color: ink }}>
                <MapPin className="h-4 w-4" style={{ color: accent }} />
                Location & Status
              </div>
              <div className="flex-1 space-y-4 mt-2">
                <div className="rounded-xl px-4 py-3" style={{ background: bg }}>
                  <div className="text-xs" style={{ color: `${ink}50` }}>Location</div>
                  <div className="text-sm font-medium mt-1" style={{ color: ink }}>Remote worldwide</div>
                </div>
                <div className="rounded-xl px-4 py-3" style={{ background: bg }}>
                  <div className="text-xs" style={{ color: `${ink}50` }}>Availability</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                    <div className="text-sm font-medium" style={{ color: accent }}>Open to work</div>
                  </div>
                </div>
                <div className="rounded-xl px-4 py-3" style={{ background: bg }}>
                  <div className="text-xs mb-2" style={{ color: `${ink}50` }}>Social</div>
                  <div className="flex flex-wrap gap-2">
                    {props.socials?.map((s, i) => {
                      const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
                      return (
                        <span key={i} className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full" style={{ background: `${accent}15`, color: accent }}>
                          <Icon className="h-3 w-3" />{s.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact29: Property Inquiry Form — real-estate style inquiry form ---------- */
export function Contact29({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  const [values, setValues] = useState({ name: "", email: "", phone: "", budget: "", property: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  };
  const fieldStyle = (name: string) => ({
    background: `${ink}05`,
    color: ink,
    border: `1px solid ${focused === name ? accent : `${ink}12`}`,
  });

  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="md:col-span-2">
            <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: accent }}>Property Inquiry</div>
            <Heading props={props} onChange={onChange} ink={ink} className="font-display text-3xl md:text-4xl leading-tight" />
            <Message props={props} onChange={onChange} ink={ink} className="mt-4 text-sm leading-relaxed" />
            <div className="mt-8 space-y-4">
              <div className="rounded-xl p-4" style={{ background: `${ink}05` }}>
                <div className="text-xs" style={{ color: `${ink}50` }}>Response time</div>
                <div className="text-sm font-medium mt-1" style={{ color: ink }}>Within 24 hours</div>
              </div>
              <div className="rounded-xl p-4" style={{ background: `${ink}05` }}>
                <div className="text-xs" style={{ color: `${ink}50` }}>Direct contact</div>
                <div className="mt-2 space-y-2">
                  {props.socials?.map((s, i) => {
                    const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
                    return (
                      <div key={i} className="flex items-center gap-2 text-sm" style={{ color: ink }}>
                        <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
                        {s.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="md:col-span-3">
            {status === "sent" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl p-10 text-center" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
                <Check className="h-10 w-10 mx-auto mb-4" style={{ color: accent }} />
                <div className="font-display text-xl mb-2" style={{ color: ink }}>Inquiry Submitted</div>
                <div className="text-sm" style={{ color: `${ink}60` }}>We'll be in touch within 24 hours.</div>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input value={values.name} onChange={e => setValues(v => ({...v, name: e.target.value}))} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Full name" className="rounded-xl px-4 py-3 text-sm outline-none" style={fieldStyle("name")} />
                  <input value={values.email} onChange={e => setValues(v => ({...v, email: e.target.value}))} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="Email address" className="rounded-xl px-4 py-3 text-sm outline-none" style={fieldStyle("email")} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input value={values.phone} onChange={e => setValues(v => ({...v, phone: e.target.value}))} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} placeholder="Phone number" className="rounded-xl px-4 py-3 text-sm outline-none" style={fieldStyle("phone")} />
                  <input value={values.budget} onChange={e => setValues(v => ({...v, budget: e.target.value}))} onFocus={() => setFocused("budget")} onBlur={() => setFocused(null)} placeholder="Budget range" className="rounded-xl px-4 py-3 text-sm outline-none" style={fieldStyle("budget")} />
                </div>
                <input value={values.property} onChange={e => setValues(v => ({...v, property: e.target.value}))} onFocus={() => setFocused("property")} onBlur={() => setFocused(null)} placeholder="Property type / location of interest" className="w-full rounded-xl px-4 py-3 text-sm outline-none" style={fieldStyle("property")} />
                <textarea value={values.message} onChange={e => setValues(v => ({...v, message: e.target.value}))} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Additional details or questions" rows={4} className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none" style={fieldStyle("message")} />
                <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full rounded-xl px-5 py-3 text-sm font-medium inline-flex items-center justify-center gap-2" style={{ background: accent, color: "white" }}>
                  {status === "sending" ? "Submitting..." : <>Submit Inquiry <ArrowUpRight className="h-3.5 w-3.5" /></>}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact30: Event Booking Form — "Book Me" form with date/occasion fields ---------- */
export function Contact30({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  const [values, setValues] = useState({ name: "", email: "", date: "", occasion: "", guests: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 700);
  };
  const fieldStyle = (name: string) => ({
    background: `${ink}05`,
    color: ink,
    border: `1px solid ${focused === name ? accent : `${ink}12`}`,
  });
  const occasions = ["Wedding", "Corporate Event", "Birthday Party", "Concert", "Conference", "Private Gathering", "Other"];

  return (
    <section className="px-8 md:px-16 py-24" style={{ background: `linear-gradient(180deg, ${accent}08, ${bg})` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest px-4 py-1.5 rounded-full mb-6" style={{ background: `${accent}15`, color: accent }}>
            ✨ Book Now
          </div>
          <Heading props={props} onChange={onChange} ink={ink} className="font-display text-5xl md:text-6xl leading-none tracking-tight" />
          <Message props={props} onChange={onChange} ink={ink} className="mt-5 text-lg leading-relaxed max-w-xl mx-auto" />
        </motion.div>
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-1">
            <div className="rounded-2xl p-6 space-y-4" style={{ background: bg, border: `1px solid ${ink}10`, boxShadow: `0 20px 50px ${ink}08` }}>
              <div className="text-xs uppercase tracking-widest" style={{ color: `${ink}50` }}>Why choose me</div>
              {[
                { icon: "🎯", label: "Professional experience", sub: "10+ years in the industry" },
                { icon: "⚡", label: "Fast response", sub: "Reply within 2 hours" },
                { icon: "🌟", label: "5-star rated", sub: "Trusted by 200+ clients" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-3" style={{ borderTop: i > 0 ? `1px solid ${ink}08` : "none" }}>
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-sm font-medium" style={{ color: ink }}>{item.label}</div>
                    <div className="text-xs mt-0.5" style={{ color: `${ink}50` }}>{item.sub}</div>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <div className="text-xs uppercase tracking-widest mb-3" style={{ color: `${ink}50` }}>Contact</div>
                <SocialLinks socials={props.socials} ink={ink} accent={accent} />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="md:col-span-2">
            {status === "sent" ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl p-10 text-center" style={{ background: bg, border: `1px solid ${accent}25`, boxShadow: `0 20px 50px ${accent}15` }}>
                <div className="text-4xl mb-4">🎉</div>
                <div className="font-display text-2xl mb-2" style={{ color: ink }}>Booking Request Received!</div>
                <div className="text-sm" style={{ color: `${ink}60` }}>I'll confirm your booking within 24 hours. Looking forward to working with you!</div>
              </motion.div>
            ) : (
              <div className="rounded-2xl p-8" style={{ background: bg, border: `1px solid ${ink}10`, boxShadow: `0 20px 50px ${ink}08` }}>
                <div className="text-xs uppercase tracking-widest mb-6" style={{ color: `${ink}50` }}>Booking details</div>
                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input value={values.name} onChange={e => setValues(v => ({...v, name: e.target.value}))} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Your name" className="rounded-xl px-4 py-3 text-sm outline-none" style={fieldStyle("name")} />
                    <input value={values.email} onChange={e => setValues(v => ({...v, email: e.target.value}))} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="Email address" className="rounded-xl px-4 py-3 text-sm outline-none" style={fieldStyle("email")} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" value={values.date} onChange={e => setValues(v => ({...v, date: e.target.value}))} onFocus={() => setFocused("date")} onBlur={() => setFocused(null)} placeholder="Event date" className="rounded-xl px-4 py-3 text-sm outline-none" style={fieldStyle("date")} />
                    <input value={values.guests} onChange={e => setValues(v => ({...v, guests: e.target.value}))} onFocus={() => setFocused("guests")} onBlur={() => setFocused(null)} placeholder="Expected guests" className="rounded-xl px-4 py-3 text-sm outline-none" style={fieldStyle("guests")} />
                  </div>
                  <div>
                    <div className="text-xs mb-2" style={{ color: `${ink}50` }}>Occasion type</div>
                    <div className="flex flex-wrap gap-2">
                      {occasions.map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setValues(v => ({ ...v, occasion: occ }))}
                          className="text-xs px-3 py-1.5 rounded-full transition-all"
                          style={{
                            background: values.occasion === occ ? accent : `${ink}08`,
                            color: values.occasion === occ ? "white" : `${ink}70`,
                            border: `1px solid ${values.occasion === occ ? accent : `${ink}12`}`,
                          }}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea value={values.message} onChange={e => setValues(v => ({...v, message: e.target.value}))} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Tell me more about your event..." rows={3} className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none" style={fieldStyle("message")} />
                  <motion.button type="submit" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full rounded-xl px-5 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2" style={{ background: accent, color: "white" }}>
                    {status === "sending" ? (
                      <span className="inline-flex items-center gap-2">
                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      <>Book Me ✨</>
                    )}
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
