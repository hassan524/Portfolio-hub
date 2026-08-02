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

/* =====================================================================
   FOOTER 1–20 (redesigned) + FOOTER 21–30 (new)
   ===================================================================== */

/* ---------- Footer1: Classic Centered — full multi-column, centered, newsletter ---------- */
export function Footer1({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-24 pb-10" style={{ borderTop: `1px solid ${ink}12` }}>
      <motion.div {...stagger} className="max-w-5xl mx-auto">
        <motion.div variants={item} className="text-center">
          <Wordmark heading={props.heading} ink={ink} className="font-display text-4xl md:text-5xl tracking-tight" />
          {props.message && (
            <p className="mt-4 text-sm max-w-md mx-auto leading-relaxed" style={{ color: `${ink}60` }}>{props.message}</p>
          )}
        </motion.div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          <motion.div variants={item}>
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] mb-4" style={{ color: `${ink}45` }}>Follow</div>
            <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-12 rounded-2xl p-6 md:p-8" style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <div className="font-medium text-sm" style={{ color: ink }}>Stay in the loop</div>
              <p className="text-xs mt-1" style={{ color: `${ink}60` }}>New work, occasional thoughts — no noise.</p>
            </div>
            <div className="w-full md:w-auto">
              <Newsletter ink={ink} accent={accent} bg={bg} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mt-10 h-px w-full" style={{ background: `${ink}10` }} />
        <motion.div variants={item} className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer2: Split Brand+Columns — brand+newsletter left, link cols right ---------- */
export function Footer2({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-20 pb-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger} className="grid md:grid-cols-[1.3fr_2fr] gap-16 max-w-6xl mx-auto">
        <motion.div variants={item} className="flex flex-col gap-6">
          <Wordmark heading={props.heading} ink={ink} className="font-display text-3xl tracking-tight" />
          {props.message && (
            <p className="text-sm leading-relaxed" style={{ color: `${ink}60` }}>{props.message}</p>
          )}
          <SocialIcons socials={props.socials} ink={ink} />
          <div className="mt-2">
            <Newsletter ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>
      </motion.div>

      <motion.div {...stagger} className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto" style={{ borderTop: `1px solid ${ink}10` }}>
        <LegalBar heading={props.heading} ink={ink} />
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </footer>
  );
}

/* ---------- Footer3: Dark Gradient — deep gradient bg, light text, large wordmark ---------- */
export function Footer3({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-24 pb-10" style={{ background: `linear-gradient(150deg, ${ink} 0%, ${ink}e0 60%, ${accent}40 100%)` }}>
      <motion.div {...stagger} className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.4fr_2fr] gap-16">
          <motion.div variants={item} className="flex flex-col gap-5">
            <div className="font-display text-5xl md:text-6xl leading-[0.92] tracking-tight" style={{ color: bg }}>{props.heading}</div>
            {props.message && (
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: `${bg}70` }}>{props.message}</p>
            )}
            <SocialIcons socials={props.socials} ink={bg} />
            <div className="mt-2">
              <Newsletter ink={bg} accent={accent} bg={ink} dark />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={bg} accent={accent} />)}
          </div>
        </div>

        <motion.div variants={item} className="mt-16 h-px w-full" style={{ background: `${bg}15` }} />
        <motion.div variants={item} className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <LegalBar heading={props.heading} ink={bg} dark />
          <BackToTop ink={bg} accent={accent} bg={ink} dark />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer4: Terminal — monospace shell session, full navigation ---------- */
export function Footer4({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 py-16" style={{ borderTop: `1px solid ${ink}15` }}>
      <motion.div {...stagger} className="max-w-4xl mx-auto rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}20`, background: `${ink}05` }}>
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${ink}15`, background: `${ink}07` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-2 text-[10px] font-mono" style={{ color: `${ink}40` }}>~ footer.sh</span>
        </div>

        <div className="p-6 md:p-8 font-mono text-xs md:text-sm space-y-5" style={{ color: ink }}>
          {/* whoami */}
          <div>
            <div><span style={{ color: accent }}>❯ </span>whoami</div>
            <div className="mt-1 pl-4" style={{ color: `${ink}65` }}>{props.heading}{props.message ? ` — ${props.message}` : ""}</div>
          </div>

          {/* ls ./links */}
          <div>
            <div><span style={{ color: accent }}>❯ </span>ls -la ./links</div>
            <div className="mt-2 pl-4 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-1" style={{ color: `${ink}70` }}>
              {groups.flatMap((g) => g.links).map((l, i) => (
                <motion.a key={i} href="#" whileHover={{ color: accent }} className="block transition-colors">
                  drwxr-xr-x <span style={{ color: accent }}>./</span>{l.label.toLowerCase().replace(/\s+/g, "-")}
                </motion.a>
              ))}
            </div>
          </div>

          {/* echo $SOCIALS */}
          <div>
            <div><span style={{ color: accent }}>❯ </span>echo $SOCIALS</div>
            <div className="mt-1 pl-4 flex flex-wrap gap-4" style={{ color: `${ink}70` }}>
              {props.socials?.length
                ? props.socials.map((s, i) => <span key={i} style={{ color: accent }}>{s.label}</span>)
                : <span style={{ color: `${ink}40` }}>(none configured)</span>
              }
            </div>
          </div>

          {/* footer */}
          <div className="flex items-center gap-2 pt-3" style={{ borderTop: `1px solid ${ink}10`, color: `${ink}45` }}>
            <span style={{ color: accent }}>❯ </span>
            <span>© {year} {props.heading} — built with care.</span>
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="inline-block w-[6px] h-[1em] ml-1 align-middle"
              style={{ background: accent }}
            />
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer5: Marquee Wordmark — giant scrolling name, columns below ---------- */
export function Footer5({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="pt-20 pb-10 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      {/* Scrolling marquee */}
      <div className="overflow-hidden relative mb-2">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap font-display leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(4rem, 12vw, 9rem)", color: `${ink}07` }}
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="mx-8">{props.heading}</span>
          ))}
          {Array(6).fill(null).map((_, i) => (
            <span key={`b${i}`} className="mx-8">{props.heading}</span>
          ))}
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div {...stagger} className="px-8 md:px-16 mt-6 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        <motion.div variants={item} className="flex flex-col gap-5">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.16em] mb-3" style={{ color: `${ink}45` }}>Connect</div>
            <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
          </div>
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>

      <div className="px-8 md:px-16 mt-10 pt-5 max-w-6xl mx-auto" style={{ borderTop: `1px solid ${ink}10` }}>
        <LegalBar heading={props.heading} ink={ink} />
      </div>
    </footer>
  );
}

/* ---------- Footer6: Minimal Strip — refined single row, legal + social + back-to-top ---------- */
export function Footer6({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <footer className="px-8 md:px-16 py-8" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Wordmark heading={props.heading} ink={ink} className="text-sm font-semibold tracking-tight" />
          <div className="hidden md:flex items-center gap-5 text-xs" style={{ color: `${ink}50` }}>
            {defaultLegal.map((l, i) => (
              <motion.a key={i} href="#" whileHover={{ color: ink }} className="transition-colors hover:underline underline-offset-4">{l.label}</motion.a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs" style={{ color: `${ink}40` }}>© {year}</span>
          <SocialIcons socials={props.socials} ink={ink} gap="gap-2" size="h-3.5 w-3.5" />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </div>
      </div>
    </footer>
  );
}

/* ---------- Footer7: Editorial Big — huge display wordmark, columns below ---------- */
export function Footer7({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-24 pb-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger}>
        {/* Giant editorial wordmark */}
        <motion.div
          variants={item}
          className="font-display leading-[0.88] tracking-tighter"
          style={{ color: ink, fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
        >
          {props.heading}
        </motion.div>

        {props.message && (
          <motion.p variants={item} className="mt-5 max-w-lg text-base leading-relaxed" style={{ color: `${ink}55` }}>
            {props.message}
          </motion.p>
        )}

        {/* Divider */}
        <motion.div variants={item} className="mt-12 h-px w-full" style={{ background: `${ink}12` }} />

        {/* Columns + newsletter */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          <motion.div variants={item} className="col-span-2">
            <Newsletter ink={ink} accent={accent} bg={bg} />
          </motion.div>
        </div>

        {/* Social + legal */}
        <motion.div variants={item} className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <SocialIcons socials={props.socials} ink={ink} />
          </div>
          <div className="flex items-center gap-4">
            <LegalBar heading={props.heading} ink={ink} />
            <BackToTop ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer8: Floating Card — all content inside elevated card on tinted bg ---------- */
export function Footer8({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-6 md:px-12 py-16" style={{ background: `${accent}12` }}>
      <motion.div
        {...stagger}
        className="rounded-3xl p-8 md:p-12 max-w-5xl mx-auto"
        style={{ background: bg, boxShadow: `0 8px 48px ${ink}12` }}
      >
        {/* Top: brand + columns */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-10">
          <motion.div variants={item} className="flex flex-col gap-5">
            <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-xl font-bold" style={{ background: accent, color: bg }}>
              {props.heading.charAt(0)}
            </div>
            <Wordmark heading={props.heading} ink={ink} className="font-display text-2xl tracking-tight" />
            {props.message && (
              <p className="text-sm leading-relaxed" style={{ color: `${ink}60` }}>{props.message}</p>
            )}
            <SocialIcons socials={props.socials} ink={ink} />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          </div>
        </div>

        {/* Newsletter band */}
        <motion.div
          variants={item}
          className="mt-8 rounded-xl p-5"
          style={{ background: `${accent}12`, border: `1px solid ${accent}20` }}
        >
          <Newsletter ink={ink} accent={accent} bg={bg} />
        </motion.div>

        {/* Legal bar */}
        <motion.div variants={item} className="mt-8 pt-5 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: `1px solid ${ink}10` }}>
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer9: Diagonal Split — two-tone backdrop, brand left, columns right ---------- */
export function Footer9({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="relative px-8 md:px-16 pt-24 pb-10 overflow-hidden" style={{ background: bg }}>
      {/* Diagonal tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(118deg, ${bg} 52%, ${accent}22 52%)` }}
      />

      <motion.div {...stagger} className="relative max-w-6xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-16">
        <motion.div variants={item} className="flex flex-col gap-5">
          <Wordmark heading={props.heading} ink={ink} className="font-display text-4xl tracking-tight" />
          {props.message && (
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: `${ink}60` }}>{props.message}</p>
          )}
          <SocialIcons socials={props.socials} ink={ink} />
          <div className="mt-2">
            <Newsletter ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>
      </motion.div>

      <motion.div
        {...stagger}
        className="relative mt-14 pt-6 max-w-6xl mx-auto flex items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${ink}12` }}
      >
        <LegalBar heading={props.heading} ink={ink} />
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </footer>
  );
}

/* ---------- Footer10: Simple Copyright Strip — clean copyright, social, back-to-top ---------- */
export function Footer10({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <footer className="px-8 md:px-16 py-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg grid place-items-center text-xs font-bold" style={{ background: accent, color: bg }}>
            {props.heading.charAt(0)}
          </div>
          <LegalBar heading={props.heading} ink={ink} links={defaultLegal} />
        </div>
        <div className="flex items-center gap-4">
          <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </div>
      </div>
    </footer>
  );
}

/* ---------- Footer11: Polaroid — tilted badge, right-aligned link columns ---------- */
export function Footer11({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-20 pb-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger} className="flex flex-col md:flex-row items-start justify-between gap-12 max-w-6xl mx-auto">
        {/* Polaroid badge */}
        <motion.div
          variants={item}
          initial={{ rotate: -4, opacity: 0 }}
          whileInView={{ rotate: -4, opacity: 1 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl p-4 pb-10 shadow-lift shrink-0 w-44"
          style={{ background: bg, border: `1px solid ${ink}12` }}
        >
          <div className="h-28 w-full rounded-md mb-3" style={{ background: `${accent}25` }} />
          <div className="text-xs font-medium text-center px-2" style={{ color: ink }}>{props.heading}</div>
          {props.message && (
            <div className="mt-1 text-[10px] text-center" style={{ color: `${ink}55` }}>{props.message}</div>
          )}
        </motion.div>

        {/* Columns right-aligned */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} align="right" />)}
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        {...stagger}
        className="mt-12 pt-5 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${ink}10` }}
      >
        <LegalBar heading={props.heading} ink={ink} />
        <div className="flex items-center gap-4">
          <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer12: Typewriter Mono — cursor animation, mono links, full nav ---------- */
export function Footer12({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 py-20 font-mono" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger} className="max-w-5xl mx-auto">
        {/* Header line */}
        <motion.div variants={item} className="text-lg md:text-2xl font-bold" style={{ color: ink }}>
          <span style={{ color: `${accent}` }}>{"// "}</span>
          {props.heading}
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            className="inline-block w-[10px] h-[1.1em] ml-2 align-middle rounded-sm"
            style={{ background: accent }}
          />
        </motion.div>

        {props.message && (
          <motion.div variants={item} className="mt-2 text-sm" style={{ color: `${ink}55` }}>
            <span style={{ color: `${ink}35` }}>{"/* "}</span>
            {props.message}
            <span style={{ color: `${ink}35` }}>{" */"}</span>
          </motion.div>
        )}

        {/* Link columns in mono style */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => (
            <motion.div key={i} variants={item}>
              <div className="text-xs mb-3" style={{ color: accent }}>{`export const ${g.title.toLowerCase()} = [`}</div>
              {g.links.map((l, j) => (
                <motion.a
                  key={j}
                  href="#"
                  whileHover={{ x: 4 }}
                  className="block text-xs py-0.5 transition-colors"
                  style={{ color: `${ink}65` }}
                >
                  &nbsp;&nbsp;"{l.label.toLowerCase().replace(/\s+/g, "_")}",
                </motion.a>
              ))}
              <div className="text-xs mt-1" style={{ color: accent }}>{"]"}</div>
            </motion.div>
          ))}
        </div>

        {/* Social + legal */}
        <motion.div variants={item} className="mt-10 pt-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5" style={{ borderTop: `1px solid ${ink}10` }}>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: `${ink}40` }}>© {year}</span>
            <SocialIcons socials={props.socials} ink={ink} gap="gap-2" size="h-3.5 w-3.5" />
          </div>
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer13: Brutalist — thick border, scrolling ticker, full nav above ---------- */
export function Footer13({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer style={{ borderTop: `4px solid ${ink}` }}>
      {/* Upper section with nav */}
      <div className="px-8 md:px-16 pt-14 pb-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          <div>
            <div className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none" style={{ color: ink }}>{props.heading}</div>
            {props.message && (
              <p className="mt-3 text-xs uppercase tracking-widest max-w-xs" style={{ color: `${ink}50` }}>{props.message}</p>
            )}
            <div className="mt-5 flex items-center gap-3">
              <SocialIcons socials={props.socials} ink={ink} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {groups.map((g, i) => (
              <div key={i}>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: `${ink}40` }}>{g.title}</div>
                <ul className="space-y-2">
                  {g.links.map((l, j) => (
                    <li key={j}>
                      <motion.a href="#" whileHover={{ x: 4 }} className="text-sm font-bold uppercase tracking-wide transition-colors block" style={{ color: ink }}>
                        {l.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle border */}
      <div style={{ borderTop: `2px solid ${ink}`, borderBottom: `2px solid ${ink}` }} className="overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap py-3 text-xs font-black uppercase tracking-widest"
        >
          {Array(2).fill([...defaultLegal, { label: "Available for work" }, { label: "Let's collaborate" }]).flat().map((l, i) => (
            <span key={i} className="mx-6 inline-flex items-center gap-5" style={{ color: ink }}>
              {l.label}
              <span style={{ color: accent }}>◆</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Legal strip */}
      <div className="px-8 md:px-16 py-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest" style={{ color: `${ink}45` }}>
        <span>© {year} {props.heading}</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="uppercase tracking-widest" style={{ color: ink }}>↑ Top</button>
      </div>
    </footer>
  );
}

/* ---------- Footer14: Ambient Orb — blurred glow, columns float above ---------- */
export function Footer14({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="relative px-8 md:px-16 pt-24 pb-10 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      {/* Orb */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: accent }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, -15, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: accent }}
      />

      <motion.div {...stagger} className="relative max-w-6xl mx-auto grid md:grid-cols-[1.2fr_2fr] gap-14">
        <motion.div variants={item} className="flex flex-col gap-5">
          <Wordmark heading={props.heading} ink={ink} className="font-display text-4xl tracking-tight" />
          {props.message && (
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: `${ink}60` }}>{props.message}</p>
          )}
          <SocialIcons socials={props.socials} ink={ink} />
          <Newsletter ink={ink} accent={accent} bg={bg} />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>
      </motion.div>

      <motion.div
        {...stagger}
        className="relative mt-14 pt-6 max-w-6xl mx-auto flex items-center justify-between"
        style={{ borderTop: `1px solid ${ink}10` }}
      >
        <LegalBar heading={props.heading} ink={ink} />
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </footer>
  );
}

/* ---------- Footer15: Bordered Frame — rounded border contains entire footer ---------- */
export function Footer15({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="p-6 md:p-10">
      <motion.div
        {...stagger}
        className="rounded-3xl px-8 md:px-14 py-14 max-w-6xl mx-auto"
        style={{ border: `1.5px solid ${ink}18` }}
      >
        {/* Header row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10" style={{ borderBottom: `1px solid ${ink}10` }}>
          <motion.div variants={item}>
            <Wordmark heading={props.heading} ink={ink} className="font-display text-3xl tracking-tight" />
            {props.message && (
              <p className="mt-2 text-sm max-w-xs" style={{ color: `${ink}50` }}>{props.message}</p>
            )}
          </motion.div>
          <motion.div variants={item}>
            <Newsletter ink={ink} accent={accent} bg={bg} />
          </motion.div>
        </div>

        {/* Columns */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>

        {/* Bottom */}
        <motion.div
          variants={item}
          className="mt-10 pt-6 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: `1px solid ${ink}10` }}
        >
          <LegalBar heading={props.heading} ink={ink} />
          <div className="flex items-center gap-4">
            <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
            <BackToTop ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer16: Two-Col Newsletter — brand+socials left, newsletter right, links middle ---------- */
export function Footer16({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-20 pb-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...stagger} className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Left: brand + socials */}
        <motion.div variants={item} className="flex flex-col gap-5">
          <Wordmark heading={props.heading} ink={ink} className="font-display text-2xl tracking-tight" />
          {props.message && (
            <p className="text-sm leading-relaxed" style={{ color: `${ink}60` }}>{props.message}</p>
          )}
          <SocialIcons socials={props.socials} ink={ink} />
        </motion.div>

        {/* Middle: link columns */}
        <div className="grid grid-cols-2 gap-6">
          {groups.slice(0, 2).map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>

        {/* Right: newsletter */}
        <Newsletter ink={ink} accent={accent} bg={bg} />
      </motion.div>

      <motion.div
        {...stagger}
        className="mt-12 pt-6 max-w-6xl mx-auto flex items-center justify-between gap-4"
        style={{ borderTop: `1px solid ${ink}10` }}
      >
        <LegalBar heading={props.heading} ink={ink} />
        <BackToTop ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </footer>
  );
}

/* ---------- Footer17: Sidebar + Columns — vertical rotated label, columns right ---------- */
export function Footer17({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="flex flex-col md:flex-row" style={{ borderTop: `1px solid ${ink}10` }}>
      {/* Rotated sidebar */}
      <div
        className="md:w-[72px] flex items-center justify-center p-8 shrink-0"
        style={{ background: `${ink}06`, borderRight: `1px solid ${ink}10` }}
      >
        <div className="md:-rotate-90 whitespace-nowrap font-display text-xl tracking-tight select-none" style={{ color: ink }}>
          {props.heading}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-8 md:px-14 py-14">
        <motion.div {...stagger}>
          {props.message && (
            <motion.p variants={item} className="text-sm max-w-md mb-10" style={{ color: `${ink}55` }}>{props.message}</motion.p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          </div>
          <div className="mt-8 pt-5 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: `1px solid ${ink}10` }}>
            <div className="flex items-center gap-4">
              <LegalBar heading={props.heading} ink={ink} />
            </div>
            <div className="flex items-center gap-4">
              <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
              <BackToTop ink={ink} accent={accent} bg={bg} />
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

/* ---------- Footer18: Dotted Grid — dot backdrop, card floats with all footer content ---------- */
export function Footer18({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer
      className="relative px-8 md:px-16 py-14"
      style={{
        backgroundImage: `radial-gradient(${ink}18 1.5px, transparent 1.5px)`,
        backgroundSize: "20px 20px",
      }}
    >
      <motion.div
        {...stagger}
        className="rounded-3xl px-8 md:px-12 py-12 max-w-5xl mx-auto"
        style={{ background: bg, border: `1px solid ${ink}12`, boxShadow: `0 4px 32px ${ink}08` }}
      >
        {/* Brand + columns */}
        <div className="grid md:grid-cols-[1fr_1.8fr] gap-10">
          <motion.div variants={item} className="flex flex-col gap-5">
            <Wordmark heading={props.heading} ink={ink} className="font-display text-3xl tracking-tight" />
            {props.message && (
              <p className="text-sm leading-relaxed" style={{ color: `${ink}55` }}>{props.message}</p>
            )}
            <SocialIcons socials={props.socials} ink={ink} />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          </div>
        </div>

        {/* Newsletter */}
        <motion.div
          variants={item}
          className="mt-8 pt-8 border-t"
          style={{ borderColor: `${ink}10` }}
        >
          <Newsletter ink={ink} accent={accent} bg={bg} />
        </motion.div>

        {/* Legal */}
        <motion.div
          variants={item}
          className="mt-8 pt-5 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: `1px solid ${ink}10` }}
        >
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer19: Dark Outline — dark bg, stroked wordmark, light columns ---------- */
export function Footer19({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-20 pb-10" style={{ background: ink }}>
      <motion.div {...stagger} className="max-w-6xl mx-auto">
        {/* Outlined wordmark */}
        <motion.div
          variants={item}
          className="font-display leading-[0.9] tracking-tighter"
          style={{
            color: "transparent",
            WebkitTextStroke: `1.5px ${bg}70`,
            fontSize: "clamp(3rem, 9vw, 7rem)",
          }}
        >
          {props.heading}
        </motion.div>

        {props.message && (
          <motion.p variants={item} className="mt-5 text-sm max-w-md" style={{ color: `${bg}55` }}>
            {props.message}
          </motion.p>
        )}

        {/* Columns */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={bg} accent={accent} />)}
          <motion.div variants={item} className="flex flex-col gap-5">
            <div className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: `${bg}40` }}>Connect</div>
            <SocialIcons socials={props.socials} ink={bg} />
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          variants={item}
          className="mt-10 pt-8"
          style={{ borderTop: `1px solid ${bg}15` }}
        >
          <Newsletter ink={bg} accent={accent} bg={ink} dark />
        </motion.div>

        {/* Legal */}
        <motion.div
          variants={item}
          className="mt-8 pt-5 flex items-center justify-between"
          style={{ borderTop: `1px solid ${bg}15` }}
        >
          <LegalBar heading={props.heading} ink={bg} dark />
          <BackToTop ink={bg} accent={accent} bg={ink} dark />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer20: Compact Banner Strip — minimal horizontal strip, refined ---------- */
export function Footer20({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <footer className="px-8 md:px-16 py-5" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: `${ink}50` }}>
        <span className="font-semibold tracking-tight" style={{ color: ink }}>{props.heading}</span>
        <span className="h-1 w-1 rounded-full" style={{ background: `${ink}30` }} />
        <span>© {year}</span>
        <span className="h-1 w-1 rounded-full" style={{ background: `${ink}30` }} />
        {defaultLegal.map((l, i) => (
          <span key={i} className="inline-flex items-center gap-3">
            {i > 0 && <span className="h-1 w-1 rounded-full" style={{ background: `${ink}20` }} />}
            <a href="#" className="hover:underline underline-offset-4 transition-colors hover:text-current">{l.label}</a>
          </span>
        ))}
        <span className="ml-auto flex items-center gap-3">
          <SocialIcons socials={props.socials} ink={ink} gap="gap-1.5" size="h-3.5 w-3.5" />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </span>
      </div>
    </footer>
  );
}

/* =====================================================================
   FOOTER 21–30: New variants
   ===================================================================== */

/* ---------- Footer21: Luxury Premium — gold dividers, serif wordmark, premium feel ---------- */
export function Footer21({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-24 pb-10" style={{ background: bg, borderTop: `1px solid ${accent}40` }}>
      <motion.div {...stagger} className="max-w-5xl mx-auto">
        {/* Ornamental top rule */}
        <motion.div variants={item} className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${accent}60)` }} />
          <div className="h-2 w-2 rotate-45" style={{ background: accent }} />
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${accent}60)` }} />
        </motion.div>

        {/* Wordmark */}
        <motion.div variants={item} className="text-center mb-14">
          <div
            className="font-serif tracking-widest uppercase text-sm"
            style={{ color: `${accent}80`, letterSpacing: "0.3em" }}
          >
            Est. {year}
          </div>
          <div
            className="font-serif text-5xl md:text-6xl tracking-tight mt-2"
            style={{ color: ink }}
          >
            {props.heading}
          </div>
          {props.message && (
            <p className="mt-4 text-sm italic max-w-sm mx-auto" style={{ color: `${ink}55` }}>{props.message}</p>
          )}
        </motion.div>

        {/* Columns */}
        <div className="grid grid-cols-3 gap-10">
          {groups.map((g, i) => (
            <motion.div key={i} variants={item} className="text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: `${accent}80` }}>{g.title}</div>
              <ul className="space-y-2.5">
                {g.links.map((l, j) => (
                  <li key={j}>
                    <motion.a
                      href="#"
                      whileHover={{ color: accent }}
                      className="text-sm transition-colors"
                      style={{ color: `${ink}70` }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          variants={item}
          className="mt-14 py-10 text-center"
          style={{ borderTop: `1px solid ${accent}25`, borderBottom: `1px solid ${accent}25` }}
        >
          <div className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: `${accent}70` }}>Join Our Inner Circle</div>
          <p className="text-sm mb-6" style={{ color: `${ink}55` }}>Exclusive updates, curated content, and early access.</p>
          <div className="flex justify-center">
            <Newsletter ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div variants={item} className="mt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <LegalBar heading={props.heading} ink={ink} />
          <div className="flex items-center gap-4">
            <SocialIcons socials={props.socials} ink={ink} />
            <BackToTop ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer22: Cyber Dark — dark neon, glowing icons, pulsing back-to-top ---------- */
export function Footer22({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  const dark = "#0a0a0f";
  return (
    <footer className="px-8 md:px-16 pt-20 pb-10 relative overflow-hidden" style={{ background: dark }}>
      {/* Neon grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glowing accent bar */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `${accent}80`, boxShadow: `0 0 20px ${accent}60` }} />

      <motion.div {...stagger} className="relative max-w-6xl mx-auto">
        {/* Wordmark */}
        <motion.div variants={item}>
          <div
            className="font-display text-4xl md:text-5xl tracking-tighter leading-none"
            style={{ color: accent, textShadow: `0 0 30px ${accent}50` }}
          >
            {props.heading}
          </div>
          {props.message && (
            <p className="mt-3 text-sm font-mono" style={{ color: `${accent}50` }}>{props.message}</p>
          )}
        </motion.div>

        {/* Columns */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {groups.map((g, i) => (
            <motion.div key={i} variants={item}>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-4" style={{ color: `${accent}60` }}>{g.title}</div>
              <ul className="space-y-2">
                {g.links.map((l, j) => (
                  <li key={j}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 4, color: accent }}
                      className="text-sm font-mono block transition-colors"
                      style={{ color: `${accent}45` }}
                    >
                      <span style={{ color: `${accent}40` }}>{">"}</span> {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div variants={item} className="flex flex-col gap-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] mb-1" style={{ color: `${accent}60` }}>Social</div>
            <div className="flex flex-col gap-2">
              {props.socials?.map((s, i) => {
                const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
                return (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-sm font-mono"
                    style={{ color: `${accent}50` }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ filter: `drop-shadow(0 0 4px ${accent}80)` }} />
                    {s.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          variants={item}
          className="mt-12 pt-5 flex items-center justify-between"
          style={{ borderTop: `1px solid ${accent}20` }}
        >
          <div className="text-xs font-mono" style={{ color: `${accent}35` }}>
            © {year} {props.heading} — ALL RIGHTS RESERVED
          </div>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            animate={{ boxShadow: [`0 0 8px ${accent}40`, `0 0 20px ${accent}70`, `0 0 8px ${accent}40`] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="grid place-items-center h-10 w-10 rounded-full"
            style={{ border: `1px solid ${accent}50`, color: accent }}
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer23: Magazine Full — editorial sections, large typographic hierarchy ---------- */
export function Footer23({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-20 pb-8" style={{ borderTop: `3px solid ${ink}` }}>
      <motion.div {...stagger} className="max-w-6xl mx-auto">
        {/* Issue header */}
        <motion.div variants={item} className="flex items-baseline justify-between mb-10">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: `${ink}40` }}>Footer — Vol. {year}</div>
            <div className="font-serif text-6xl md:text-8xl leading-none tracking-tighter mt-1" style={{ color: ink }}>{props.heading}</div>
          </div>
          {props.message && (
            <p className="hidden md:block text-right max-w-xs text-sm italic" style={{ color: `${ink}55` }}>{props.message}</p>
          )}
        </motion.div>

        {/* Horizontal rule */}
        <div className="h-px mb-10" style={{ background: `${ink}20` }} />

        {/* Columns grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          <motion.div variants={item}>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: `${ink}40` }}>Follow</div>
            <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
          </motion.div>
        </div>

        {/* Newsletter band */}
        <motion.div
          variants={item}
          className="py-8 mb-8"
          style={{ borderTop: `1px solid ${ink}15`, borderBottom: `1px solid ${ink}15` }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="font-serif text-2xl" style={{ color: ink }}>Subscribe to the dispatch</div>
              <p className="mt-1 text-sm" style={{ color: `${ink}55` }}>Weekly digest of new work and studio notes.</p>
            </div>
            <Newsletter ink={ink} accent={accent} bg={bg} />
          </div>
        </motion.div>

        {/* Legal */}
        <motion.div variants={item} className="flex items-center justify-between flex-wrap gap-4">
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer24: Glass Footer — glassmorphism panels on dark gradient ---------- */
export function Footer24({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer
      className="px-6 md:px-12 py-16 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${ink}f5 0%, ${ink}cc 100%)` }}
    >
      {/* Background orbs */}
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ background: accent }} />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full blur-3xl opacity-15" style={{ background: accent }} />

      <motion.div {...stagger} className="relative max-w-6xl mx-auto">
        {/* Glass panels grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {/* Brand panel */}
          <motion.div
            variants={item}
            className="rounded-2xl p-6 col-span-1"
            style={{ background: `${bg}12`, backdropFilter: "blur(12px)", border: `1px solid ${bg}20` }}
          >
            <Wordmark heading={props.heading} ink={bg} className="font-display text-2xl tracking-tight" />
            {props.message && (
              <p className="mt-3 text-sm" style={{ color: `${bg}65` }}>{props.message}</p>
            )}
            <div className="mt-5">
              <SocialIcons socials={props.socials} ink={bg} />
            </div>
          </motion.div>

          {/* Links panel */}
          <motion.div
            variants={item}
            className="rounded-2xl p-6 col-span-1"
            style={{ background: `${bg}08`, backdropFilter: "blur(12px)", border: `1px solid ${bg}15` }}
          >
            <div className="grid grid-cols-2 gap-6">
              {groups.slice(0, 2).map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={bg} accent={accent} />)}
            </div>
          </motion.div>

          {/* Newsletter panel */}
          <motion.div
            variants={item}
            className="rounded-2xl p-6 col-span-1"
            style={{ background: `${bg}10`, backdropFilter: "blur(12px)", border: `1px solid ${bg}18` }}
          >
            <Newsletter ink={bg} accent={accent} bg={ink} dark />
          </motion.div>
        </div>

        {/* Third column links row */}
        <motion.div
          variants={item}
          className="mt-5 rounded-2xl p-6"
          style={{ background: `${bg}06`, backdropFilter: "blur(12px)", border: `1px solid ${bg}12` }}
        >
          <div className="flex flex-wrap items-center gap-8">
            {groups[2].links.map((l, i) => (
              <motion.a key={i} href="#" whileHover={{ y: -2 }} className="text-sm" style={{ color: `${bg}70` }}>{l.label}</motion.a>
            ))}
          </div>
        </motion.div>

        {/* Legal */}
        <motion.div variants={item} className="mt-5 flex items-center justify-between gap-4">
          <LegalBar heading={props.heading} ink={bg} dark />
          <BackToTop ink={bg} accent={accent} bg={ink} dark />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer25: Artisan Warm — warm parchment, hand-drawn border, artisan feel ---------- */
export function Footer25({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  const warm = "#f8f3ec";
  return (
    <footer className="px-8 md:px-16 py-16 relative" style={{ background: warm }}>
      {/* Hand-drawn style top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `repeating-linear-gradient(90deg, ${ink}60 0px, ${ink}60 4px, transparent 4px, transparent 8px)`,
        }}
      />

      <motion.div {...stagger} className="max-w-5xl mx-auto">
        {/* Wordmark */}
        <motion.div variants={item} className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: `${ink}50` }}>Handcrafted with care</div>
          <div className="font-serif text-5xl md:text-6xl tracking-tight" style={{ color: ink }}>{props.heading}</div>
          {props.message && (
            <p className="mt-4 text-sm italic max-w-sm mx-auto" style={{ color: `${ink}55` }}>{props.message}</p>
          )}
        </motion.div>

        {/* Ornamental divider */}
        <motion.div variants={item} className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px" style={{ background: `${ink}20` }} />
          <div className="text-lg" style={{ color: `${ink}30` }}>✦</div>
          <div className="flex-1 h-px" style={{ background: `${ink}20` }} />
        </motion.div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {groups.map((g, i) => (
            <motion.div key={i} variants={item}>
              <div className="text-[10px] uppercase tracking-[0.2em] mb-4 font-semibold" style={{ color: `${ink}45` }}>{g.title}</div>
              <ul className="space-y-2.5">
                {g.links.map((l, j) => (
                  <li key={j}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className="text-sm transition-all inline-block"
                      style={{ color: `${ink}70`, fontFamily: "serif" }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div variants={item}>
            <div className="text-[10px] uppercase tracking-[0.2em] mb-4 font-semibold" style={{ color: `${ink}45` }}>Find us</div>
            <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          variants={item}
          className="rounded-xl p-6 mb-10"
          style={{ background: `${ink}06`, border: `1px dashed ${ink}25` }}
        >
          <Newsletter ink={ink} accent={accent} bg={warm} />
        </motion.div>

        {/* Ornamental divider bottom */}
        <motion.div variants={item} className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px" style={{ background: `${ink}15` }} />
          <div className="text-sm" style={{ color: `${ink}25` }}>✦</div>
          <div className="flex-1 h-px" style={{ background: `${ink}15` }} />
        </motion.div>

        <motion.div variants={item} className="flex items-center justify-between gap-4 flex-wrap">
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={warm} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer26: Corporate Professional — structured, formal, B2B ---------- */
export function Footer26({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-16 pb-8" style={{ background: bg, borderTop: `3px solid ${accent}` }}>
      <motion.div {...stagger} className="max-w-6xl mx-auto">
        {/* Top strip */}
        <motion.div
          variants={item}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10"
          style={{ borderBottom: `1px solid ${ink}12` }}
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-md flex items-center justify-center font-bold text-sm" style={{ background: accent, color: bg }}>
              {props.heading.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-base tracking-tight" style={{ color: ink }}>{props.heading}</div>
              {props.message && (
                <div className="text-xs mt-0.5" style={{ color: `${ink}50` }}>{props.message}</div>
              )}
            </div>
          </div>
          <Newsletter ink={ink} accent={accent} bg={bg} />
        </motion.div>

        {/* Columns */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
          <motion.div variants={item}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-4" style={{ color: `${ink}45` }}>Connect</div>
            <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
            <div className="mt-6 text-xs" style={{ color: `${ink}40` }}>
              <div className="font-semibold mb-1" style={{ color: `${ink}60` }}>Headquarters</div>
              <div>123 Business Ave</div>
              <div>Suite 400, New York</div>
              <div>NY 10001, USA</div>
            </div>
          </motion.div>
        </div>

        {/* Certifications / badges row */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {["ISO 9001", "SOC 2", "GDPR"].map((badge) => (
            <span
              key={badge}
              className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded"
              style={{ border: `1px solid ${ink}20`, color: `${ink}45` }}
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Legal */}
        <motion.div
          variants={item}
          className="mt-8 pt-5 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: `1px solid ${ink}10` }}
        >
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer27: Sports / Dynamic — bold diagonal accent, condensed, energetic ---------- */
export function Footer27({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="relative overflow-hidden" style={{ background: ink }}>
      {/* Diagonal accent slash */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full pointer-events-none"
        style={{ background: `${accent}18`, clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />

      <div className="relative px-8 md:px-16 pt-20 pb-10">
        <motion.div {...stagger} className="max-w-6xl mx-auto">
          {/* Big condensed wordmark */}
          <motion.div variants={item}>
            <div
              className="font-black uppercase leading-none tracking-tighter"
              style={{ color: bg, fontSize: "clamp(3rem, 11vw, 8rem)" }}
            >
              {props.heading}
            </div>
            <div className="h-1.5 w-24 mt-3 rounded-full" style={{ background: accent }} />
          </motion.div>

          {props.message && (
            <motion.p variants={item} className="mt-4 text-sm font-medium uppercase tracking-widest max-w-sm" style={{ color: `${bg}55` }}>
              {props.message}
            </motion.p>
          )}

          {/* Columns */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {groups.map((g, i) => (
              <motion.div key={i} variants={item}>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: `${accent}70` }}>{g.title}</div>
                <ul className="space-y-2">
                  {g.links.map((l, j) => (
                    <li key={j}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 5, color: accent }}
                        className="text-sm font-bold uppercase tracking-wide block transition-colors"
                        style={{ color: `${bg}65` }}
                      >
                        {l.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            <motion.div variants={item} className="flex flex-col gap-4">
              <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: `${accent}70` }}>Follow</div>
              <SocialIcons socials={props.socials} ink={bg} />
            </motion.div>
          </div>

          {/* Legal */}
          <motion.div
            variants={item}
            className="mt-14 pt-5 flex items-center justify-between flex-wrap gap-4"
            style={{ borderTop: `1px solid ${bg}15` }}
          >
            <LegalBar heading={props.heading} ink={bg} dark />
            <BackToTop ink={bg} accent={accent} bg={ink} dark />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

/* ---------- Footer28: Botanical Organic — soft, natural colors, organic brand ---------- */
export function Footer28({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 py-20 relative overflow-hidden" style={{ background: bg, borderTop: `1px solid ${ink}12` }}>
      {/* Subtle leaf texture via radial pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 80% at 80% 20%, ${accent} 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 80%, ${accent} 0%, transparent 70%)`,
        }}
      />

      <motion.div {...stagger} className="relative max-w-5xl mx-auto">
        {/* Wordmark block */}
        <motion.div variants={item} className="mb-14">
          <div className="font-serif text-4xl md:text-5xl tracking-tight" style={{ color: ink }}>{props.heading}</div>
          {props.message && (
            <p className="mt-3 text-sm italic max-w-sm" style={{ color: `${ink}55` }}>{props.message}</p>
          )}
        </motion.div>

        {/* Organic divider */}
        <motion.div variants={item} className="mb-10 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: `${ink}12` }} />
          <div className="text-base" style={{ color: `${ink}25` }}>🌿</div>
          <div className="h-px flex-1" style={{ background: `${ink}12` }} />
        </motion.div>

        {/* Columns + newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {groups.map((g, i) => (
            <motion.div key={i} variants={item}>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] mb-4" style={{ color: `${accent}80` }}>{g.title}</div>
              <ul className="space-y-2.5">
                {g.links.map((l, j) => (
                  <li key={j}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3 }}
                      className="text-sm font-serif transition-all inline-block"
                      style={{ color: `${ink}70` }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div variants={item}>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] mb-4" style={{ color: `${accent}80` }}>Connect</div>
            <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          variants={item}
          className="rounded-2xl p-6 mb-10"
          style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}
        >
          <Newsletter ink={ink} accent={accent} bg={bg} />
        </motion.div>

        {/* Legal */}
        <motion.div variants={item} className="pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: `1px solid ${ink}10` }}>
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer29: Real Estate — structured, office location, license info ---------- */
export function Footer29({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  return (
    <footer className="px-8 md:px-16 pt-16 pb-8" style={{ background: bg, borderTop: `4px solid ${accent}` }}>
      <motion.div {...stagger} className="max-w-6xl mx-auto">
        {/* Top: logo + tagline + offices */}
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 pb-10" style={{ borderBottom: `1px solid ${ink}12` }}>
          <motion.div variants={item}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded grid place-items-center font-bold text-sm" style={{ background: accent, color: bg }}>RE</div>
              <Wordmark heading={props.heading} ink={ink} className="font-semibold text-xl tracking-tight" />
            </div>
            {props.message && (
              <p className="text-sm max-w-xs" style={{ color: `${ink}55` }}>{props.message}</p>
            )}
            <div className="mt-4 text-xs" style={{ color: `${ink}45` }}>
              License #: RE-{year}-{Math.floor(Math.random() * 9000 + 1000).toString().replace(/\d+/, "XXXXX")}
            </div>
            <div className="mt-3">
              <SocialIcons socials={props.socials} ink={ink} gap="gap-2" />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: `${ink}45` }}>Main Office</div>
            <div className="text-sm space-y-1" style={{ color: `${ink}70` }}>
              <div>123 Property Lane</div>
              <div>Suite 200</div>
              <div>New York, NY 10001</div>
              <div className="mt-2" style={{ color: accent }}>(212) 555-0100</div>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: `${ink}45` }}>Branch Office</div>
            <div className="text-sm space-y-1" style={{ color: `${ink}70` }}>
              <div>456 Realty Blvd</div>
              <div>Floor 3</div>
              <div>Los Angeles, CA 90001</div>
              <div className="mt-2" style={{ color: accent }}>(310) 555-0200</div>
            </div>
          </motion.div>
        </div>

        {/* Columns */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {groups.map((g, i) => <LinkColumn key={i} title={g.title} links={g.links} ink={ink} accent={accent} />)}
        </div>

        {/* Disclaimer */}
        <motion.div
          variants={item}
          className="mt-10 rounded-lg p-4 text-[10px] leading-relaxed"
          style={{ background: `${ink}05`, color: `${ink}40`, border: `1px solid ${ink}10` }}
        >
          Equal Housing Opportunity. All information deemed reliable but not guaranteed. Properties subject to prior sale, change, withdrawal or prior rental. Neither listing broker(s) nor {props.heading} shall be responsible for any typographical errors, misinformation, misprints and shall be held totally harmless.
        </motion.div>

        {/* Legal */}
        <motion.div
          variants={item}
          className="mt-6 pt-5 flex items-center justify-between flex-wrap gap-4"
          style={{ borderTop: `1px solid ${ink}10` }}
        >
          <LegalBar heading={props.heading} ink={ink} links={[...defaultLegal, { label: "Fair Housing" }, { label: "Accessibility" }]} />
          <BackToTop ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}

/* ---------- Footer30: Event / Wedding — elegant serif, ornamental dividers, rose-gold palette ---------- */
export function Footer30({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const groups = defaultGroups(props.heading);
  const rose = "#c8956c";
  return (
    <footer className="px-8 md:px-16 py-20 relative overflow-hidden" style={{ background: bg }}>
      {/* Ornamental corner accents */}
      <div className="absolute top-6 left-6 h-8 w-8 pointer-events-none" style={{ borderTop: `2px solid ${rose}40`, borderLeft: `2px solid ${rose}40` }} />
      <div className="absolute top-6 right-6 h-8 w-8 pointer-events-none" style={{ borderTop: `2px solid ${rose}40`, borderRight: `2px solid ${rose}40` }} />
      <div className="absolute bottom-6 left-6 h-8 w-8 pointer-events-none" style={{ borderBottom: `2px solid ${rose}40`, borderLeft: `2px solid ${rose}40` }} />
      <div className="absolute bottom-6 right-6 h-8 w-8 pointer-events-none" style={{ borderBottom: `2px solid ${rose}40`, borderRight: `2px solid ${rose}40` }} />

      <motion.div {...stagger} className="max-w-4xl mx-auto text-center">
        {/* Ornamental heading */}
        <motion.div variants={item}>
          <div className="text-[10px] uppercase tracking-[0.35em] mb-4" style={{ color: `${rose}80` }}>— With love from —</div>
          <div className="font-serif text-5xl md:text-6xl tracking-tight" style={{ color: ink }}>{props.heading}</div>
          {props.message && (
            <p className="mt-4 text-sm italic max-w-sm mx-auto" style={{ color: `${ink}55` }}>{props.message}</p>
          )}
        </motion.div>

        {/* Ornamental divider */}
        <motion.div variants={item} className="flex items-center justify-center gap-4 mt-10 mb-10">
          <div className="h-px w-16" style={{ background: `${rose}40` }} />
          <div className="text-xl" style={{ color: rose }}>❦</div>
          <div className="h-px w-16" style={{ background: `${rose}40` }} />
        </motion.div>

        {/* Social icons centered */}
        <motion.div variants={item} className="flex justify-center mb-10">
          <SocialIcons socials={props.socials} ink={ink} gap="gap-4" />
        </motion.div>

        {/* Columns, centered */}
        <div className="grid grid-cols-3 gap-8 text-center mb-12">
          {groups.map((g, i) => (
            <motion.div key={i} variants={item}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: `${rose}70` }}>{g.title}</div>
              <ul className="space-y-2.5">
                {g.links.map((l, j) => (
                  <li key={j}>
                    <motion.a
                      href="#"
                      whileHover={{ color: rose }}
                      className="text-sm font-serif transition-colors"
                      style={{ color: `${ink}65` }}
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          variants={item}
          className="mx-auto max-w-sm mb-10 py-8"
          style={{ borderTop: `1px solid ${rose}20`, borderBottom: `1px solid ${rose}20` }}
        >
          <div className="text-[10px] uppercase tracking-[0.25em] mb-3" style={{ color: `${rose}70` }}>Stay in touch</div>
          <Newsletter ink={ink} accent={rose} bg={bg} />
        </motion.div>

        {/* Ornamental bottom divider */}
        <motion.div variants={item} className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12" style={{ background: `${rose}30` }} />
          <div className="text-sm" style={{ color: `${rose}50` }}>✦</div>
          <div className="h-px w-12" style={{ background: `${rose}30` }} />
        </motion.div>

        {/* Legal */}
        <motion.div variants={item} className="flex flex-col md:flex-row items-center justify-center gap-4">
          <LegalBar heading={props.heading} ink={ink} />
          <BackToTop ink={ink} accent={rose} bg={bg} />
        </motion.div>
      </motion.div>
    </footer>
  );
}
