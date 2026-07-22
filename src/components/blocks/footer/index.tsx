import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUp, ArrowRight, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaDribbble } from "react-icons/fa";
import type { BlockComponentProps } from "../types";
import type { FooterProps } from "@/types/builder.schema";

// See Hero.tsx for the full numbered design-system legend (1–20).
// Footer{N} always shares its visual DNA with Hero{N} / About{N} / Projects{N} / Testimonials{N}.
//
// Footer now supports a fuller "real website" footer shape while staying 100% backward
// compatible with the existing FooterProps (heading / message / socials). Three fields are
// read defensively with sensible fallbacks so nothing breaks if they don't exist in your
// schema yet — add them to FooterProps whenever you want editors to control them directly:
//
//   linkGroups?: { title: string; links: { label: string; href?: string }[] }[]
//   legalLinks?: { label: string; href?: string }[]
//   newsletter?: { heading?: string; placeholder?: string; cta?: string }
//
// Until those exist, DEFAULT_GROUPS / DEFAULT_LEGAL below fill in tasteful placeholders
// derived from props.heading, so every footer still reads as a complete, real site footer.

type Props = BlockComponentProps<FooterProps>;

const ICONS: Record<string, any> = {
  github: FaGithub, linkedin: FaLinkedin, email: Mail, twitter: FaTwitter, instagram: FaInstagram, dribbble: FaDribbble,
};

const year = new Date().getFullYear();

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  viewport: { once: true, margin: "-60px" },
};
const item = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function defaultGroups(heading: string): { title: string; links: { label: string }[] }[] {
  return [
    { title: "Site", links: [{ label: "Home" }, { label: "About" }, { label: "Work" }, { label: "Contact" }] },
    { title: "Work", links: [{ label: "Case studies" }, { label: "Playbook" }, { label: "Testimonials" }] },
    { title: heading || "Studio", links: [{ label: "Process" }, { label: "Availability" }, { label: "Resume" }] },
  ];
}
const defaultLegal = [{ label: "Privacy" }, { label: "Terms" }, { label: "Sitemap" }];

/* ---------- shared building blocks ---------- */

function SocialIcons({ socials, ink, gap = "gap-3", size = "h-4 w-4" }: { socials?: FooterProps["socials"]; ink: string; gap?: string; size?: string }) {
  if (!socials?.length) return null;
  return (
    <div className={`flex ${gap}`}>
      {socials.map((s, i) => {
        const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
        return (
          <motion.a
            key={i}
            href="#"
            aria-label={s.label}
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="grid place-items-center rounded-full h-8 w-8 transition-colors"
            style={{ border: `1px solid ${ink}18`, color: `${ink}70` }}
          >
            <Icon className={size} />
          </motion.a>
        );
      })}
    </div>
  );
}

function LinkColumn({ title, links, ink, accent, align = "left" }: { title: string; links: { label: string }[]; ink: string; accent: string; align?: "left" | "right" }) {
  return (
    <motion.div variants={item} className={align === "right" ? "text-right" : ""}>
      <div className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: `${ink}45` }}>{title}</div>
      <ul className={`mt-4 space-y-2.5 text-sm ${align === "right" ? "items-end" : ""} flex flex-col`}>
        {links.map((l, i) => (
          <li key={i}>
            <motion.a
              href="#"
              whileHover={{ x: align === "right" ? -4 : 4 }}
              className="inline-flex items-center gap-1.5 group"
              style={{ color: `${ink}85` }}
            >
              <span className="relative">
                {l.label}
                <span
                  className="absolute left-0 -bottom-0.5 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: accent }}
                />
              </span>
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Newsletter({ ink, accent, bg, dark = false }: { ink: string; accent: string; bg: string; dark?: boolean }) {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState(false);
  const fg = dark ? bg : ink;
  return (
    <motion.div variants={item}>
      <div className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: dark ? `${bg}55` : `${ink}45` }}>Stay in the loop</div>
      <p className="mt-3 text-sm max-w-[240px]" style={{ color: dark ? `${bg}75` : `${ink}70` }}>
        Occasional notes on new work — no spam, unsubscribe anytime.
      </p>
      <form
        onSubmit={(e) => { e.preventDefault(); if (value) setSent(true); }}
        className="mt-4 flex items-center gap-2 rounded-full pl-4 pr-1.5 py-1.5"
        style={{ border: `1px solid ${dark ? `${bg}30` : `${ink}20`}` }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="you@email.com"
          className="flex-1 bg-transparent text-sm outline-none min-w-0"
          style={{ color: fg }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="grid place-items-center h-8 w-8 rounded-full shrink-0"
          style={{ background: accent, color: bg }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span key="ok" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>✓</motion.span>
            ) : (
              <motion.span key="send" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <Send className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </motion.div>
  );
}

function BackToTop({ ink, accent, bg, dark = false }: { ink: string; accent: string; bg: string; dark?: boolean }) {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Back to top"
      className="grid place-items-center h-10 w-10 rounded-full shrink-0"
      style={{ border: `1px solid ${dark ? `${bg}30` : `${ink}20`}`, color: dark ? bg : ink }}
    >
      <ArrowUp className="h-4 w-4" />
    </motion.button>
  );
}

function LegalBar({ heading, ink, dark = false, links = defaultLegal }: { heading: string; ink: string; dark?: boolean; links?: { label: string }[] }) {
  const fg = dark ? `${ink}` : `${ink}50`;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs" style={{ color: fg }}>
      <span>© {year} {heading}. All rights reserved.</span>
      {links.map((l, i) => (
        <a key={i} href="#" className="hover:underline underline-offset-4">{l.label}</a>
      ))}
    </div>
  );
}

function Wordmark({ heading, ink, className }: { heading: string; ink: string; className: string }) {
  return <div className={className} style={{ color: ink }}>{heading}</div>;
}

/* ---------- Footer1: Classic Centered — full multi-column, centered ---------- */
export function Footer1({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-20 pb-8 text-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger} className="max-w-4xl mx-auto">
        <motion.div variants={item}>
          <Wordmark heading={props.heading} ink={ink} className="font-display text-3xl tracking-tight" />
          {props.message && <p className="mt-3 text-sm max-w-md mx-auto" style={{ color: `${ink}65` }}>{props.message}</p>}
        </motion.div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8 text-left max-w-2xl mx-auto">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>
        <motion.div variants={item} className="mt-10 flex justify-center"><SocialIcons socials={props.socials} ink={ink} /></motion.div>
        <motion.div variants={item} className="mt-10 h-px w-full" style={{ background: `${ink}10` }} />
        <motion.div variants={item} className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer2: Split Portrait — brand+newsletter left, columns right ---------- */
export function Footer2({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-20 pb-8" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger} className="grid md:grid-cols-[1.1fr_2fr] gap-12">
        <motion.div variants={item}>
          <Wordmark heading={props.heading} ink={ink} className="font-display text-2xl tracking-tight" />
          {props.message && <p className="mt-2 text-sm max-w-sm" style={{ color: `${ink}65` }}>{props.message}</p>}
          <div className="mt-6"><SocialIcons socials={props.socials} ink={ink} /></div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>
      </motion.div>
      <motion.div {...stagger} className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${ink}10` }}>
        <LegalBar heading={props.heading} ink={ink} />
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </footer>
  );
}

/* ---------- Footer3: Fullbleed Gradient (dark) — big mark, light columns ---------- */
export function Footer3({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-20 pb-8" style={{ background: `linear-gradient(160deg, ${ink}, ${accent}30)` }}>
      <motion.div {...stagger} className="grid md:grid-cols-[1.2fr_2fr] gap-12">
        <motion.div variants={item}>
          <div className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tight" style={{ color: bg }}>{props.heading}</div>
          {props.message && <p className="mt-4 text-sm max-w-sm" style={{ color: `${bg}80` }}>{props.message}</p>}
          <div className="mt-6"><SocialIcons socials={props.socials} ink={bg} /></div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={bg} accent={accent} />)}
        </div>
      </motion.div>
      <motion.div {...stagger} className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${bg}20` }}>
        <LegalBar heading={props.heading} ink={bg} dark />
        <BackToTop ink={bg} accent={accent} bg={ink} dark />
      </motion.div>
    </footer>
  );
}

/* ---------- Footer4: Terminal — expanded faux shell session ---------- */
export function Footer4({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 py-16" style={{ borderTop: `1px solid ${ink}15` }}>
      <motion.div {...stagger} className="max-w-3xl mx-auto rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}20`, background: `${ink}05` }}>
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${ink}15` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-2 text-[10px] font-mono" style={{ color: `${ink}40` }}>footer.sh</span>
        </div>
        <div className="p-6 font-mono text-xs md:text-sm space-y-4" style={{ color: ink }}>
          <div><span style={{ color: accent }}>{"$ "}</span>whoami</div>
          <div style={{ color: `${ink}70` }}>{props.heading}{props.message ? ` — ${props.message}` : ""}</div>
          <div><span style={{ color: accent }}>{"$ "}</span>ls ./links</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1" style={{ color: `${ink}75` }}>
            {groups.flatMap((g) => g.links).map((l, i) => <div key={i}>{l.label.toLowerCase().replace(/\s+/g, "-")}/</div>)}
          </div>
          <div><span style={{ color: accent }}>{"$ "}</span>echo $SOCIALS</div>
          <div className="flex gap-4" style={{ color: `${ink}75` }}>{props.socials?.map((s, i) => <span key={i}>{s.label}</span>)}</div>
          <div className="flex items-center gap-2 pt-2" style={{ borderTop: `1px solid ${ink}10`, color: `${ink}45` }}>
            <span style={{ color: accent }}>{"$ "}</span>© {year} {props.heading} — built with care.
            <motion.span animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }} className="inline-block w-[6px] h-[1em] ml-1 align-middle" style={{ background: accent }} />
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer5: Marquee — big scrolling wordmark + columns underneath ---------- */
export function Footer5({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="pt-16 pb-8 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div animate={{ x: ["0%", "-8%"] }} transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} className="font-display text-[11vw] leading-none opacity-[0.05] whitespace-nowrap px-8" style={{ color: ink }}>
        {Array(4).fill(props.heading).join("  ·  ")}
      </motion.div>
      <motion.div {...stagger} className="px-8 md:px-16 mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        <motion.div variants={item} className="flex flex-col justify-between">
          <SocialIcons socials={props.socials} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
      <div className="px-8 md:px-16 mt-10 pt-5 text-xs" style={{ borderTop: `1px solid ${ink}10`, color: `${ink}50` }}>
        <LegalBar heading={props.heading} ink={ink} />
      </div>
    </footer>
  );
}

/* ---------- Footer6: Tight Minimal — deliberately stays lean, just sharper ---------- */
export function Footer6({ props, theme }: Props) {
  const { ink, accent } = theme;
  return (
    <footer className="px-8 md:px-16 py-6 flex flex-wrap items-center justify-between gap-3 border-t text-[11px]" style={{ borderColor: `${ink}10`, color: `${ink}45` }}>
      <span>© {year} {props.heading}</span>
      <div className="flex items-center gap-5">
        {defaultLegal.map((l, i) => (
          <motion.a key={i} href="#" whileHover={{ color: accent }} className="hover:underline underline-offset-4">{l.label}</motion.a>
        ))}
        <SocialIcons socials={props.socials} ink={ink} gap="gap-2" size="h-3.5 w-3.5" />
      </div>
    </footer>
  );
}

/* ---------- Footer7: Big Serif Editorial — name in huge type, columns below ---------- */
export function Footer7({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-20 pb-8" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger}>
        <motion.div variants={item} className="font-display text-5xl md:text-7xl tracking-tight leading-[0.9]" style={{ color: ink }}>{props.heading}</motion.div>
        {props.message && <motion.p variants={item} className="mt-4 max-w-md text-sm" style={{ color: `${ink}65` }}>{props.message}</motion.p>}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          <motion.div variants={item}><SocialIcons socials={props.socials} ink={ink} /></motion.div>
        </div>
        <motion.div variants={item} className="mt-12 pt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${ink}10` }}>
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer8: Floating Card — elevated panel with full content ---------- */
export function Footer8({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 py-16" style={{ background: `${accent}18` }}>
      <motion.div {...stagger} className="rounded-3xl p-8 md:p-12 shadow-lift max-w-4xl mx-auto" style={{ background: bg }}>
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10">
          <motion.div variants={item}>
            <div className="h-12 w-12 rounded-2xl mb-5" style={{ background: accent }} />
            <div className="text-sm font-medium" style={{ color: ink }}>{props.heading}</div>
            {props.message && <p className="mt-2 text-sm" style={{ color: `${ink}65` }}>{props.message}</p>}
            <div className="mt-5"><SocialIcons socials={props.socials} ink={ink} /></div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          </div>
        </div>
        <motion.div variants={item} className="mt-10 pt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${ink}10` }}>
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer9: Diagonal Split — two-tone backdrop, columns on the tint ---------- */
export function Footer9({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="relative px-8 md:px-16 pt-20 pb-8 overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${bg} 55%, ${accent}20 55%, ${accent}20 100%)` }} />
      <motion.div {...stagger} className="relative grid md:grid-cols-[1fr_1.4fr] gap-10">
        <motion.div variants={item}>
          <Wordmark heading={props.heading} ink={ink} className="font-display text-3xl tracking-tight" />
          {props.message && <p className="mt-3 text-sm max-w-sm" style={{ color: `${ink}65` }}>{props.message}</p>}
          <div className="mt-6"><SocialIcons socials={props.socials} ink={ink} /></div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>
      </motion.div>
      <motion.div {...stagger} className="relative mt-12 pt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${ink}15` }}>
        <LegalBar heading={props.heading} ink={ink} />
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </footer>
  );
}

/* ---------- Footer10: Minimal Side-by-Side — a touch more, still calm ---------- */
export function Footer10({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <footer className="px-8 md:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ borderTop: `1px solid ${ink}10`, color: `${ink}55` }}>
      <LegalBar heading={props.heading} ink={ink} links={defaultLegal} />
      <div className="flex items-center gap-4">
        <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </div>
    </footer>
  );
}

/* ---------- Footer11: Polaroid Tilt — framed badge + full column set ---------- */
export function Footer11({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-16 pb-8" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger} className="flex flex-col md:flex-row justify-between gap-10">
        <motion.div variants={item} initial={{ rotate: -3, opacity: 0 }} whileInView={{ rotate: -3, opacity: 1 }} whileHover={{ rotate: 0 }} className="rounded-lg p-3 shadow-lift h-fit" style={{ background: bg, border: `1px solid ${ink}15` }}>
          <div className="text-xs px-2 py-1" style={{ color: ink }}>{props.heading}</div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} align="right" />)}
        </div>
      </motion.div>
      <motion.div {...stagger} className="mt-10 pt-5 flex items-center justify-between" style={{ borderTop: `1px solid ${ink}10` }}>
        <LegalBar heading={props.heading} ink={ink} />
        <div className="flex items-center gap-4"><SocialIcons socials={props.socials} ink={ink} /><BackToTop ink={ink} accent={accent} bg={bg} /></div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer12: Typewriter Mono — animated caret, expanded lines ---------- */
export function Footer12({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 py-16 font-mono" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger} className="flex flex-col md:flex-row items-start justify-between gap-8">
        <motion.div variants={item} className="text-sm" style={{ color: `${ink}60` }}>
          {"> "}{props.heading}
          <motion.span animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }} className="inline-block w-[6px] h-[1em] ml-1 align-middle" style={{ background: accent }} />
        </motion.div>
        <div className="grid grid-cols-3 gap-6 text-xs">
          {groups.map((g, i) => (
            <div key={i}>
              <div style={{ color: accent }}>{g.title}</div>
              {g.links.map((l, j) => <div key={j} style={{ color: `${ink}70` }} className="mt-1">./{l.label.toLowerCase().replace(/\s+/g, "-")}</div>)}
            </div>
          ))}
        </div>
      </motion.div>
      <div className="mt-8 pt-4 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${ink}10`, color: `${ink}45` }}>
        <span>© {year}</span>
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </div>
    </footer>
  );
}

/* ---------- Footer13: Brutalist — thick border, uppercase, ticker ---------- */
export function Footer13({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <footer style={{ borderTop: `3px solid ${ink}` }}>
      <div className="px-8 md:px-16 py-10 flex items-center justify-between">
        <span className="uppercase text-xs font-bold tracking-widest" style={{ color: ink }}>{props.heading}</span>
        <span className="text-xs font-bold" style={{ color: ink }}>© {year}</span>
      </div>
      <div className="overflow-hidden" style={{ borderTop: `2px solid ${ink}` }}>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap py-3 text-xs font-bold uppercase tracking-widest">
          {Array(2).fill([...defaultLegal, { label: "Available for work" }]).flat().map((l, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-6" style={{ color: ink }}>{l.label}<span style={{ color: accent }}>■</span></span>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}

/* ---------- Footer14: Blurred Orb — ambient, columns floating over glow ---------- */
export function Footer14({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="relative px-8 md:px-16 pt-20 pb-8 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-24 -right-24 h-[320px] w-[320px] rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: accent }} />
      <motion.div {...stagger} className="relative grid md:grid-cols-[1fr_1.6fr] gap-10">
        <motion.div variants={item}>
          <Wordmark heading={props.heading} ink={ink} className="font-display text-3xl tracking-tight" />
          {props.message && <p className="mt-3 text-sm max-w-sm" style={{ color: `${ink}65` }}>{props.message}</p>}
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>
      </motion.div>
      <motion.div {...stagger} className="relative mt-12 pt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${ink}10` }}>
        <div className="flex items-center gap-5"><LegalBar heading={props.heading} ink={ink} /><SocialIcons socials={props.socials} ink={ink} /></div>
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </footer>
  );
}

/* ---------- Footer15: Bordered Frame — rounded outline, full contents ---------- */
export function Footer15({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="p-6 md:p-10">
      <motion.div {...stagger} className="rounded-2xl px-8 md:px-16 py-12" style={{ border: `1px solid ${ink}15` }}>
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10">
          <motion.div variants={item}>
            <Wordmark heading={props.heading} ink={ink} className="text-sm font-medium" />
            {props.message && <p className="mt-2 text-xs max-w-xs" style={{ color: `${ink}55` }}>{props.message}</p>}
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          </div>
        </div>
        <motion.div variants={item} className="mt-10 pt-5 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: `1px solid ${ink}10` }}>
          <LegalBar heading={props.heading} ink={ink} />
          <div className="flex items-center gap-4"><SocialIcons socials={props.socials} ink={ink} /><BackToTop ink={ink} accent={accent} bg={bg} /></div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer16: Pull-quote Two-Col — editorial split, newsletter right ---------- */
export function Footer16({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <footer className="px-8 md:px-16 pt-16 pb-8" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger} className="grid md:grid-cols-2 gap-10">
        <motion.div variants={item}>
          <div className="font-display text-2xl tracking-tight" style={{ color: ink }}>{props.heading}</div>
          {props.message && <p className="mt-2 text-sm max-w-sm" style={{ color: `${ink}60` }}>{props.message}</p>}
          <div className="mt-5"><SocialIcons socials={props.socials} ink={ink} /></div>
        </motion.div>
        <Newsletter ink={ink} accent={accent} bg={bg} />
      </motion.div>
      <div className="md:w-px hidden md:block h-px my-8" style={{ background: `${ink}12` }} />
      <motion.div {...stagger} className="flex items-center justify-between text-xs" style={{ color: `${ink}55` }}>
        <LegalBar heading={props.heading} ink={ink} />
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </footer>
  );
}

/* ---------- Footer17: Sidebar Vertical — rotated label, stacked link groups ---------- */
export function Footer17({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="flex flex-col md:flex-row" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="md:w-1/4 flex items-center justify-center p-8" style={{ background: `${ink}06` }}>
        <div className="md:-rotate-90 whitespace-nowrap font-display text-xl tracking-tight" style={{ color: ink }}>{props.heading}</div>
      </div>
      <div className="flex-1 px-8 md:px-16 py-12">
        <motion.div {...stagger} className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </motion.div>
        <div className="mt-8 pt-5 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${ink}10`, color: `${ink}45` }}>
          <span>© {year}</span>
          <div className="flex items-center gap-4"><SocialIcons socials={props.socials} ink={ink} /><BackToTop ink={ink} accent={accent} bg={bg} /></div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Footer18: Dotted Grid — card floats over dot backdrop ---------- */
export function Footer18({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="relative px-8 md:px-16 py-12" style={{ backgroundImage: `radial-gradient(${ink}20 1px, transparent 1px)`, backgroundSize: "18px 18px" }}>
      <motion.div {...stagger} className="rounded-2xl px-8 py-10" style={{ background: bg, border: `1px solid ${ink}10` }}>
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10">
          <motion.div variants={item}>
            <Wordmark heading={props.heading} ink={ink} className="text-sm font-medium" />
            <div className="mt-4"><SocialIcons socials={props.socials} ink={ink} /></div>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          </div>
        </div>
        <motion.div variants={item} className="mt-8 pt-5 flex items-center justify-between" style={{ borderTop: `1px solid ${ink}10` }}>
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer19: Outline Stroke (dark) — stroked wordmark, columns ---------- */
export function Footer19({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-16 pb-8" style={{ background: ink }}>
      <motion.div {...stagger}>
        <motion.div variants={item} className="font-display text-4xl md:text-5xl tracking-tight" style={{ color: "transparent", WebkitTextStroke: `1.2px ${bg}90` }}>{props.heading}</motion.div>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={bg} accent={accent} />)}
          <motion.div variants={item}><SocialIcons socials={props.socials} ink={bg} /></motion.div>
        </div>
        <motion.div variants={item} className="mt-10 pt-5 flex items-center justify-between" style={{ borderTop: `1px solid ${bg}20` }}>
          <LegalBar heading={props.heading} ink={bg} dark />
          <BackToTop ink={bg} accent={accent} bg={ink} dark />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer20: Compact Banner — deliberately stays a short strip ---------- */
export function Footer20({ props, theme }: Props) {
  const { ink, accent } = theme;
  return (
    <footer className="px-8 md:px-16 py-6 flex items-center gap-3 text-xs flex-wrap" style={{ borderTop: `1px solid ${ink}10`, color: `${ink}55` }}>
      <span>{props.heading}</span>
      <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
      <span>© {year}</span>
      {props.socials?.map((s, i) => (
        <span key={i} className="flex items-center gap-3">
          <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
          {s.label}
        </span>
      ))}
      <span className="ml-auto flex items-center gap-4">
        {defaultLegal.map((l, i) => <a key={i} href="#" className="hover:underline underline-offset-4">{l.label}</a>)}
      </span>
    </footer>
  );
}