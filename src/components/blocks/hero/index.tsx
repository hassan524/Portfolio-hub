import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, ChevronDown } from "lucide-react";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { HeroProps } from "@/types/builder.schema";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * DESIGN SYSTEM — 30 numbered "skins"
 * Every block family (Hero / About / Projects / Testimonials / Footer)
 * shares the same numbering, so Hero7 + About7 + Projects7 + Testimonials7
 * + Footer7 always belong to the same visual language on a page.
 *
 *  1  Classic Centered      — refined, quiet, generous whitespace
 *  2  Split Portrait        — two column, visual right
 *  3  Fullbleed Gradient    — ink→accent gradient, dark canvas
 *  4  Terminal              — mono, faux code-editor chrome
 *  5  Marquee               — infinite horizontal motion
 *  6  Tight Minimal Stack   — narrow single column, hairline rule
 *  7  Big Serif Editorial   — oversized display type, viewport scale
 *  8  Floating Card         — tinted backdrop, card floats with shadow
 *  9  Diagonal Split        — angled two-tone backdrop
 *  10 Minimal Side-by-Side  — content left / meta right
 *  11 Polaroid Tilt         — rotated framed visual
 *  12 Typewriter Mono       — animated caret, mono rhythm
 *  13 Brutalist             — thick solid border, uppercase weight
 *  14 Blurred Orb           — ambient blurred gradient light
 *  15 Bordered Frame        — rounded outline frame + corner tag
 *  16 Pull-quote Two-Col    — editorial split, oversized italic
 *  17 Sidebar Vertical      — rotated sidebar label + content
 *  18 Dotted Grid           — radial dot backdrop, card on top
 *  19 Outline Stroke        — text-stroke type on dark canvas
 *  20 Compact Banner        — short single-row strip
 *  21 Luxury Gold           — warm cream, gold accents, serif wordmark
 *  22 Neon Cyber            — black bg, neon-green, scanlines, glitch
 *  23 Magazine Cover        — editorial cover, image right, ruled lines
 *  24 Glassmorphism         — frosted glass card on deep gradient
 *  25 Handcraft Artisan     — parchment, hand-drawn border, stamp badge
 *  26 Corporate Executive   — white, structured, accent bar, small caps
 *  27 Sports Dynamic        — angled bold layout, condensed type, energy
 *  28 Botanical Organic     — sage palette, circular frame, organic curves
 *  29 Real Estate Showcase  — property listing aesthetic, stat boxes
 *  30 Event Wedding         — full-screen elegant, serif italic, floral
 * ─────────────────────────────────────────────────────────────────────────
 */

type Props = BlockComponentProps<HeroProps>;

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rise = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

function MetaRow({ props, ink, onChange, align = "start" }: { props: HeroProps; ink: string; onChange: Props["onChange"]; align?: "start" | "end" }) {
  return (
    <motion.div variants={rise} className={`mt-6 flex items-center gap-4 text-xs ${align === "end" ? "justify-end" : ""}`} style={{ color: `${ink}55` }}>
      <span className="inline-flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <motion.span animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full" style={{ background: ink }} />
          <span className="relative rounded-full h-1.5 w-1.5" style={{ background: ink }} />
        </span>
        <MapPin className="h-3 w-3" />
        <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" />
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Briefcase className="h-3 w-3" />
        <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
      </span>
    </motion.div>
  );
}

function PrimaryCta({ label, ink, bg, onChange }: { label: string; ink: string; bg: string; onChange: (v: string) => void }) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium cursor-pointer overflow-hidden relative"
      style={{ background: ink, color: bg }}
    >
      <Editable value={label} onChange={onChange} className="inline relative z-10" />
      <motion.span className="relative z-10 inline-flex" whileHover={{ x: 3 }}>
        <ArrowRight className="h-3.5 w-3.5" />
      </motion.span>
    </motion.div>
  );
}

function ScrollCue({ ink }: { ink: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="mt-14 flex justify-center"
      aria-hidden
    >
      <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronDown className="h-4 w-4" style={{ color: `${ink}45` }} />
      </motion.div>
    </motion.div>
  );
}

function DotGrid({ ink }: { ink: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-60"
      style={{ backgroundImage: `radial-gradient(${ink}18 1px, transparent 1px)`, backgroundSize: "22px 22px", maskImage: "radial-gradient(ellipse at center, black, transparent 75%)" }}
    />
  );
}

/* ---------- Hero1: Classic Centered ---------- */
export function Hero1({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 pt-28 pb-32 text-center overflow-hidden" style={{ background: bg }}>
      <DotGrid ink={ink} />
      {/* Subtle radial glow center */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${accent}12, transparent)` }} />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative max-w-3xl mx-auto">
        {/* Eyebrow */}
        <motion.div variants={rise} className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase font-semibold" style={{ color: accent }}>
          <span className="inline-block h-px w-8" style={{ background: accent }} />
          {props.eyebrow}
          <span className="inline-block h-px w-8" style={{ background: accent }} />
        </motion.div>
        {/* Name */}
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-tight"
            style={{ color: ink }}
          />
        </motion.div>
        {/* Tagline */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-4 font-display text-2xl md:text-3xl italic"
            style={{ color: accent }}
          />
        </motion.div>
        {/* Divider */}
        <motion.div variants={rise} className="mt-6 flex justify-center">
          <span className="h-px w-16" style={{ background: `${ink}20` }} />
        </motion.div>
        {/* Bio */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-6 text-[15px] leading-relaxed mx-auto max-w-xl"
            style={{ color: `${ink}75` }}
          />
        </motion.div>
        {/* CTAs */}
        <motion.div variants={rise} className="mt-10 flex items-center justify-center gap-4">
          <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          <motion.div
            whileHover={{ backgroundColor: `${ink}08` }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border transition-colors"
            style={{ borderColor: `${ink}25`, color: ink }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        {/* Meta */}
        <div className="flex justify-center">
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </div>
      </motion.div>
      <ScrollCue ink={ink} />
    </section>
  );
}

/* ---------- Hero2: Split Portrait ---------- */
export function Hero2({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center" style={{ background: bg }}>
      <motion.div initial="initial" animate="animate" variants={stagger}>
        {/* Eyebrow */}
        <motion.div variants={rise} className="text-[10px] tracking-[0.28em] uppercase font-semibold" style={{ color: accent }}>
          {props.eyebrow}
        </motion.div>
        {/* Accent divider */}
        <motion.div variants={rise} className="mt-3 h-0.5 w-12" style={{ background: accent }} />
        {/* Name */}
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="mt-5 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight"
            style={{ color: ink }}
          />
        </motion.div>
        {/* Tagline */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-3 font-display text-xl md:text-2xl italic"
            style={{ color: accent }}
          />
        </motion.div>
        {/* Bio */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-5 text-sm leading-relaxed max-w-md"
            style={{ color: `${ink}78` }}
          />
        </motion.div>
        {/* CTAs */}
        <motion.div variants={rise} className="mt-8 flex items-center gap-3">
          <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          <motion.div
            whileHover={{ backgroundColor: `${ink}08` }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border transition-colors"
            style={{ borderColor: `${ink}25`, color: ink }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        <MetaRow props={props} ink={ink} onChange={onChange} />
      </motion.div>
      {/* Image panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, clipPath: "inset(8% 8% 8% 8% round 24px)" }}
        whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] rounded-3xl overflow-hidden"
        style={props.imageUrl ? { backgroundImage: `url(${props.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: `${accent}18` }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ink}60 0%, transparent 50%)` }} />
        {/* Name watermark on image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="text-[10px] tracking-widest uppercase mb-1" style={{ color: `${bg}80` }}>{props.eyebrow}</div>
          <div className="font-display text-2xl" style={{ color: bg }}>{props.name}</div>
        </div>
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute top-4 right-4 rounded-full px-3 py-1 flex items-center gap-1.5 text-[10px] backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.18)", color: bg, border: "1px solid rgba(255,255,255,0.3)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#4ade80" }} />
          <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero3: Fullbleed Gradient ---------- */
export function Hero3({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-32 flex flex-col justify-end min-h-[80vh] overflow-hidden" style={{ background: `linear-gradient(155deg, ${ink} 0%, ${ink}ee 40%, ${accent}50 100%)` }}>
      {/* Animated orb 1 */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ background: accent }}
      />
      {/* Animated orb 2 */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: `${bg}40` }}
      />
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: `radial-gradient(${bg} 1px, transparent 1px)`, backgroundSize: "28px 28px" }} />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative max-w-4xl">
        <motion.div variants={rise} className="text-[10px] tracking-[0.35em] uppercase font-medium" style={{ color: `${bg}65` }}>
          {props.eyebrow}
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="mt-5 font-display text-7xl md:text-9xl leading-[0.88] tracking-tight"
            style={{ color: bg }}
          />
        </motion.div>
        <motion.div variants={rise} className="mt-1 h-0.5 w-20" style={{ background: accent }} />
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-4 font-display text-2xl md:text-3xl italic"
            style={{ color: accent }}
          />
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-6 text-sm leading-relaxed max-w-lg"
            style={{ color: `${bg}70` }}
          />
        </motion.div>
        <motion.div variants={rise} className="mt-9 flex items-center gap-4">
          <PrimaryCta label={props.primaryCta} ink={bg} bg={ink} onChange={(v) => onChange({ primaryCta: v })} />
          <motion.div
            whileHover={{ backgroundColor: `${bg}15` }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border transition-colors"
            style={{ borderColor: `${bg}35`, color: bg }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex items-center gap-5 text-xs" style={{ color: `${bg}55` }}>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" />
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#4ade80" }} />
            <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero4: Terminal ---------- */
export function Hero4({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const lines = [
    { num: "01", content: <span style={{ color: `${ink}45` }}>{"// " + props.eyebrow}</span> },
    { num: "02", content: null },
    { num: "03", content: <><span style={{ color: accent }}>const</span> <span style={{ color: ink }}>developer</span> = {"{"}</> },
    { num: "04", content: <span className="pl-6"><span style={{ color: `${ink}70` }}>name:</span> <span style={{ color: accent }}>"</span><Editable value={props.name} onChange={(v) => onChange({ name: v })} className="inline" style={{ color: accent }} /><span style={{ color: accent }}>"</span>,</span> },
    { num: "05", content: <span className="pl-6"><span style={{ color: `${ink}70` }}>role:</span> <span style={{ color: `${accent}cc` }}>"</span><Editable value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="inline" style={{ color: `${accent}cc` }} /><span style={{ color: `${accent}cc` }}>"</span>,</span> },
    { num: "06", content: <span className="pl-6"><span style={{ color: `${ink}70` }}>location:</span> <span style={{ color: `${ink}80` }}>"</span>{props.location}<span style={{ color: `${ink}80` }}>"</span>,</span> },
    { num: "07", content: <span className="pl-6"><span style={{ color: `${ink}70` }}>status:</span> <span style={{ color: `${ink}80` }}>"</span>{props.availability}<span style={{ color: `${ink}80` }}>"</span>,</span> },
    { num: "08", content: <>{"}"};</> },
  ];
  return (
    <section className="px-8 md:px-16 py-20" style={{ background: bg }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl"
        style={{ border: `1px solid ${ink}18`, background: `${ink}06` }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${ink}12`, background: `${ink}04` }}>
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-3 flex-1 text-center text-[10px] font-mono rounded px-3 py-0.5" style={{ background: `${ink}08`, color: `${ink}40` }}>~/portfolio/index.tsx</span>
          <span className="ml-auto text-[10px] font-mono" style={{ color: `${ink}30` }}>● node</span>
        </div>
        {/* Code area */}
        <div className="p-5 font-mono text-sm leading-7" style={{ color: ink }}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="flex gap-4"
            >
              <span className="select-none w-5 shrink-0 text-right" style={{ color: `${ink}25` }}>{line.num}</span>
              <span className="flex-1">{line.content}</span>
            </motion.div>
          ))}
          {/* Bio comment block */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.55 }} className="mt-3 flex gap-4">
            <span className="select-none w-5 shrink-0 text-right" style={{ color: `${ink}25` }}>10</span>
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="flex-1 text-xs leading-relaxed" style={{ color: `${ink}60` }} />
          </motion.div>
          {/* CTA */}
          <motion.div whileHover={{ x: 3 }} className="mt-6 ml-9 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm" style={{ background: ink, color: bg }}>
            <span style={{ color: accent }}>$</span>
            <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              className="inline-block w-[2px] h-[1em]"
              style={{ background: bg }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero5: Marquee ---------- */
export function Hero5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const nameTrack = Array(8).fill(props.name);
  const tagTrack = Array(8).fill(props.tagline);
  return (
    <section className="pt-20 pb-16 overflow-hidden" style={{ background: bg }}>
      <div className="px-8 md:px-16">
        <div className="text-[10px] tracking-[0.28em] uppercase font-medium" style={{ color: `${ink}55` }}>{props.eyebrow}</div>
      </div>
      {/* Primary marquee strip */}
      <div className="mt-5 overflow-hidden whitespace-nowrap" style={{ borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center py-2 font-display text-7xl md:text-9xl leading-none"
        >
          {nameTrack.map((t, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="mx-8" style={{ color: i % 2 === 0 ? ink : "transparent", WebkitTextStroke: i % 2 === 1 ? `1.5px ${ink}` : undefined }}>{t}</span>
              <span className="mx-3 text-2xl" style={{ color: accent }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>
      {/* Secondary reverse marquee */}
      <div className="mt-0 overflow-hidden whitespace-nowrap" style={{ borderBottom: `1px solid ${ink}08` }}>
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center py-1.5 font-display text-2xl md:text-3xl italic"
        >
          {tagTrack.map((t, i) => (
            <span key={i} className="mx-8" style={{ color: `${ink}45` }}>{t}</span>
          ))}
        </motion.div>
      </div>
      {/* Content below */}
      <div className="px-8 md:px-16 mt-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="text-sm leading-relaxed max-w-lg" style={{ color: `${ink}75` }} />
            <div className="mt-6 flex items-center gap-4">
              <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
              <motion.div
                whileHover={{ backgroundColor: `${ink}08` }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border"
                style={{ borderColor: `${ink}22`, color: ink }}
              >
                <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs" style={{ color: `${ink}55` }}>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Hero6: Tight Minimal Stack ---------- */
export function Hero6({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 pt-20 pb-20" style={{ background: bg }}>
      <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-xl">
        {/* Hairline top rule */}
        <motion.div variants={rise} className="mb-6 h-px" style={{ background: `${ink}15` }} />
        <motion.div variants={rise} className="text-[9px] tracking-[0.32em] uppercase font-medium" style={{ color: `${ink}50` }}>
          {props.eyebrow}
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="mt-4 font-display text-5xl md:text-6xl leading-[0.92] tracking-tight"
            style={{ color: ink }}
          />
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-2 text-lg italic"
            style={{ color: accent }}
          />
        </motion.div>
        {/* Hairline mid rule */}
        <motion.div variants={rise} className="mt-5 mb-5 h-px" style={{ background: `${ink}10` }} />
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="text-sm leading-relaxed"
            style={{ color: `${ink}72` }}
          />
        </motion.div>
        <motion.div variants={rise} className="mt-7 flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
            style={{ background: ink, color: bg }}
          >
            <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.div>
          <motion.div
            whileHover={{ backgroundColor: `${ink}08` }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border"
            style={{ borderColor: `${ink}22`, color: ink }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        <MetaRow props={props} ink={ink} onChange={onChange} />
        {/* Hairline bottom rule */}
        <motion.div variants={rise} className="mt-8 h-px" style={{ background: `${ink}10` }} />
      </motion.div>
    </section>
  );
}

/* ---------- Hero7: Big Serif Editorial ---------- */
export function Hero7({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 pt-24 pb-24 overflow-hidden" style={{ background: bg }}>
      {/* Watermark ampersand */}
      <div
        className="absolute right-0 top-0 font-display leading-none opacity-[0.03] pointer-events-none select-none"
        style={{ color: ink, fontSize: "22vw" }}
      >
        &amp;
      </div>
      {/* Issue number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[9px] tracking-[0.35em] uppercase font-medium"
        style={{ color: `${ink}45` }}
      >
        {props.eyebrow}
      </motion.div>
      {/* Big name */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Editable
          as="h1"
          value={props.name}
          onChange={(v) => onChange({ name: v })}
          className="mt-3 font-display leading-[0.82] tracking-tight"
          style={{ color: ink, fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
        />
      </motion.div>
      {/* Rule line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-4 h-0.5 origin-left"
        style={{ background: `${ink}18` }}
      />
      {/* Two-col bottom area */}
      <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-8 items-end">
        <div>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="font-display text-2xl md:text-3xl italic"
            style={{ color: accent }}
          />
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-4 text-sm leading-relaxed max-w-lg"
            style={{ color: `${ink}72` }}
          />
          <div className="mt-5 h-px w-12" style={{ background: accent }} />
        </div>
        <div className="flex flex-col items-end gap-4">
          <motion.div
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium shrink-0"
            style={{ background: ink, color: bg }}
          >
            <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.div>
          <div className="text-xs text-right" style={{ color: `${ink}50` }}>
            <div><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></div>
            <div><Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Hero8: Floating Card ---------- */
export function Hero8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: `${accent}14` }}>
      {/* Background texture dots */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: `radial-gradient(${accent}30 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
      {/* Floating card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden"
        style={{ background: bg, boxShadow: `0 32px 80px -20px ${ink}30, 0 8px 24px -8px ${ink}18` }}
      >
        {/* Accent block top */}
        <div className="h-2" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}80)` }} />
        <div className="px-10 md:px-14 pt-10 pb-12">
          {/* Icon block */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, type: "spring", stiffness: 300 }}
            className="h-12 w-12 rounded-2xl mb-7 flex items-center justify-center text-lg font-display font-bold"
            style={{ background: `${accent}20`, color: accent }}
          >
            {props.name?.charAt(0) ?? "P"}
          </motion.div>
          <motion.div initial="initial" animate="animate" variants={stagger}>
            <motion.div variants={rise} className="text-[10px] tracking-[0.28em] uppercase font-medium" style={{ color: `${ink}50` }}>
              {props.eyebrow}
            </motion.div>
            <motion.div variants={rise}>
              <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight" style={{ color: ink }} />
            </motion.div>
            <motion.div variants={rise}>
              <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 text-xl italic" style={{ color: accent }} />
            </motion.div>
            <motion.div variants={rise} className="mt-4 h-px" style={{ background: `${ink}10` }} />
            <motion.div variants={rise}>
              <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed" style={{ color: `${ink}72` }} />
            </motion.div>
            <motion.div variants={rise} className="mt-8 flex items-center gap-3">
              <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
              <div className="text-xs" style={{ color: `${ink}50` }}>
                <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: "#4ade80" }} /><Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" /></span>
              </div>
            </motion.div>
            <motion.div variants={rise} className="mt-4 text-xs" style={{ color: `${ink}40` }}>
              <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero9: Diagonal Split ---------- */
export function Hero9({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative min-h-[72vh] overflow-hidden flex items-center" style={{ background: bg }}>
      {/* Diagonal right panel */}
      <motion.div
        initial={{ clipPath: "polygon(55% 0, 55% 0, 55% 100%, 55% 100%)" }}
        whileInView={{ clipPath: "polygon(42% 0, 100% 0, 100% 100%, 50% 100%)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ background: `${accent}18` }}
      />
      {/* Content */}
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative z-10 px-8 md:px-16 py-24 max-w-xl w-full">
        <motion.div variants={rise} className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>
          {props.eyebrow}
        </motion.div>
        <motion.div variants={rise} className="mt-2 h-0.5 w-10" style={{ background: accent }} />
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="mt-5 font-display text-6xl md:text-7xl leading-[0.92] tracking-tight"
            style={{ color: ink }}
          />
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-3 text-xl italic"
            style={{ color: accent }}
          />
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-5 text-sm leading-relaxed max-w-md"
            style={{ color: `${ink}75` }}
          />
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex items-center gap-3">
          <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          <motion.div
            whileHover={{ backgroundColor: `${ink}08` }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border"
            style={{ borderColor: `${ink}22`, color: ink }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        <MetaRow props={props} ink={ink} onChange={onChange} />
      </motion.div>
    </section>
  );
}

/* ---------- Hero10: Minimal Side-by-Side ---------- */
export function Hero10({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <div className="flex items-start justify-between gap-12 flex-wrap">
        <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-lg">
          <motion.div variants={rise} className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: `${ink}50` }}>
            {props.eyebrow}
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="h1"
              value={props.name}
              onChange={(v) => onChange({ name: v })}
              className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight"
              style={{ color: ink }}
            />
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.tagline}
              onChange={(v) => onChange({ tagline: v })}
              className="mt-2 text-lg italic"
              style={{ color: accent }}
            />
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.bio}
              onChange={(v) => onChange({ bio: v })}
              className="mt-5 text-sm leading-relaxed"
              style={{ color: `${ink}72` }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-7 flex items-center gap-3">
            <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
            <motion.div
              whileHover={{ x: 2 }}
              className="inline-flex items-center gap-1.5 text-sm"
              style={{ color: `${ink}60` }}
            >
              <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.div>
          </motion.div>
        </motion.div>
        {/* Right column meta */}
        <motion.div
          initial={{ opacity: 0, x: 14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="flex flex-col gap-5 shrink-0 pt-4"
        >
          <div className="h-px w-10 self-end" style={{ background: accent }} />
          <div className="text-xs text-right space-y-2" style={{ color: `${ink}55` }}>
            <div className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></div>
            <div className="flex items-center gap-1.5 justify-end">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
            </div>
          </div>
          <div className="h-px w-10" style={{ background: `${ink}15` }} />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Hero11: Polaroid Tilt ---------- */
export function Hero11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-[1fr_260px] gap-14 items-center" style={{ background: bg }}>
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={rise} className="text-[10px] tracking-[0.28em] uppercase font-medium" style={{ color: accent }}>
          {props.eyebrow}
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="mt-5 font-display text-5xl md:text-6xl leading-[0.93] tracking-tight"
            style={{ color: ink }}
          />
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-2 text-xl italic"
            style={{ color: accent }}
          />
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-5 text-sm leading-relaxed max-w-md"
            style={{ color: `${ink}72` }}
          />
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex items-center gap-3">
          <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
        </motion.div>
        <MetaRow props={props} ink={ink} onChange={onChange} />
      </motion.div>
      {/* Stacked polaroid frames */}
      <div className="relative h-[300px]">
        {/* Back frame */}
        <motion.div
          initial={{ rotate: 10, opacity: 0, y: 15 }}
          whileInView={{ rotate: 10, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="absolute inset-x-4 inset-y-0 rounded-xl p-3.5 shadow-md"
          style={{ background: bg, border: `1px solid ${ink}10` }}
        >
          <div className="w-full aspect-square rounded" style={{ background: `${accent}10` }} />
        </motion.div>
        {/* Middle frame */}
        <motion.div
          initial={{ rotate: -5, opacity: 0, y: 15 }}
          whileInView={{ rotate: -5, opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="absolute inset-0 rounded-xl p-3.5 shadow-lg"
          style={{ background: bg, border: `1px solid ${ink}14` }}
        >
          <div className="w-full aspect-square rounded" style={{ background: `${accent}18` }} />
        </motion.div>
        {/* Front frame */}
        <motion.div
          initial={{ rotate: 3, opacity: 0, y: 15 }}
          whileInView={{ rotate: 3, opacity: 1, y: 0 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-x-2 inset-y-0 rounded-xl p-3.5 shadow-xl cursor-pointer"
          style={{ background: bg, border: `1px solid ${ink}18` }}
        >
          <div className="w-full aspect-square rounded" style={{ background: `${accent}28` }} />
          <div className="mt-3 text-center text-[11px] font-medium" style={{ color: `${ink}60` }}>
            {props.name}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Hero12: Typewriter Mono ---------- */
export function Hero12({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <div className="max-w-2xl">
        {/* Prompt line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-xs"
          style={{ color: `${ink}45` }}
        >
          {"> "}{props.eyebrow}
        </motion.div>
        {/* Name with cursor */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-5 font-mono text-5xl md:text-6xl leading-none"
          style={{ color: ink }}
        >
          <Editable value={props.name} onChange={(v) => onChange({ name: v })} className="inline" />
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            className="inline-block w-[3px] h-[0.85em] ml-2 align-middle"
            style={{ background: accent }}
          />
        </motion.div>
        {/* Role output */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-4 font-mono text-xl"
            style={{ color: accent }}
          />
        </motion.div>
        {/* Separator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-5 font-mono text-xs"
          style={{ color: `${ink}35` }}
        >
          ────────────────────────────
        </motion.div>
        {/* Bio */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-4 text-sm leading-relaxed font-mono"
            style={{ color: `${ink}70` }}
          />
        </motion.div>
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8"
        >
          <motion.div
            whileHover={{ x: 4 }}
            className="inline-flex items-center gap-3 rounded-lg px-5 py-3 text-sm font-mono font-medium"
            style={{ background: ink, color: bg }}
          >
            <span style={{ color: accent }}>$</span>
            <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.div>
        </motion.div>
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="mt-6 font-mono text-xs flex items-center gap-4"
          style={{ color: `${ink}38` }}
        >
          <span>[loc]</span>
          <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" />
          <span>·</span>
          <span>[status]</span>
          <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Hero13: Brutalist ---------- */
export function Hero13({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-16" style={{ background: bg }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-3xl p-10 md:p-14"
        style={{ border: `3px solid ${ink}` }}
      >
        {/* Corner brackets */}
        <span className="absolute -top-[3px] -left-[3px] h-8 w-8" style={{ borderTop: `3px solid ${accent}`, borderLeft: `3px solid ${accent}` }} />
        <span className="absolute -top-[3px] -right-[3px] h-8 w-8" style={{ borderTop: `3px solid ${accent}`, borderRight: `3px solid ${accent}` }} />
        <span className="absolute -bottom-[3px] -left-[3px] h-8 w-8" style={{ borderBottom: `3px solid ${accent}`, borderLeft: `3px solid ${accent}` }} />
        <span className="absolute -bottom-[3px] -right-[3px] h-8 w-8" style={{ borderBottom: `3px solid ${accent}`, borderRight: `3px solid ${accent}` }} />
        {/* Eyebrow badge */}
        <div className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-black" style={{ background: ink, color: bg }}>
          {props.eyebrow}
        </div>
        {/* Name */}
        <Editable
          as="h1"
          value={props.name}
          onChange={(v) => onChange({ name: v })}
          className="mt-6 font-display text-6xl md:text-7xl leading-[0.88] uppercase tracking-tighter"
          style={{ color: ink }}
        />
        {/* Thick rule */}
        <div className="mt-4 h-1" style={{ background: ink }} />
        {/* Tagline */}
        <Editable
          as="p"
          value={props.tagline}
          onChange={(v) => onChange({ tagline: v })}
          className="mt-4 text-xl font-black uppercase"
          style={{ color: accent }}
        />
        {/* Bio */}
        <Editable
          as="p"
          value={props.bio}
          onChange={(v) => onChange({ bio: v })}
          className="mt-4 text-sm leading-relaxed max-w-lg"
          style={{ color: `${ink}88` }}
        />
        {/* CTAs */}
        <div className="mt-8 flex gap-0 items-stretch flex-wrap">
          <motion.div
            whileHover={{ background: accent }}
            className="px-6 py-3 text-sm font-black uppercase tracking-wider cursor-pointer"
            style={{ background: ink, color: bg }}
          >
            <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
          </motion.div>
          <div className="px-6 py-3 text-sm font-black uppercase tracking-wider" style={{ border: `3px solid ${ink}`, borderLeft: "none", color: ink }}>
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </div>
        </div>
      </motion.div>
      {/* Footer meta bar */}
      <div className="max-w-3xl mt-0 flex justify-between text-[10px] font-black uppercase tracking-[0.2em] px-1" style={{ color: `${ink}45`, borderTop: `1px solid ${ink}20` }}>
        <span className="pt-3"><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>
        <span className="pt-3"><Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" /></span>
      </div>
    </section>
  );
}

/* ---------- Hero14: Blurred Orb ---------- */
export function Hero14({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-32 overflow-hidden" style={{ background: bg }}>
      {/* Orb 1 - large accent */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 28, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-28 -right-28 h-[500px] w-[500px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: accent }}
      />
      {/* Orb 2 - ink bottom left */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full blur-[70px] pointer-events-none"
        style={{ background: ink }}
      />
      {/* Orb 3 - center subtle */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full blur-[60px] pointer-events-none"
        style={{ background: accent }}
      />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative max-w-2xl">
        <motion.div variants={rise} className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: `${ink}55` }}>
          {props.eyebrow}
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="mt-6 font-display text-6xl md:text-8xl leading-[0.9] tracking-tight"
            style={{ color: ink }}
          />
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-3 font-display text-2xl italic"
            style={{ color: accent }}
          />
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-6 text-sm leading-relaxed max-w-lg"
            style={{ color: `${ink}72` }}
          />
        </motion.div>
        <motion.div variants={rise} className="mt-9 flex items-center gap-4">
          <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          <motion.div
            whileHover={{ backgroundColor: `${ink}08` }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border"
            style={{ borderColor: `${ink}22`, color: ink }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        <MetaRow props={props} ink={ink} onChange={onChange} />
      </motion.div>
    </section>
  );
}

/* ---------- Hero15: Bordered Frame ---------- */
export function Hero15({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="p-6 md:p-12" style={{ background: bg }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl px-10 md:px-16 py-20"
        style={{ border: `1px solid ${ink}16` }}
      >
        {/* Availability badge top right */}
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, type: "spring", stiffness: 280 }}
          className="absolute top-5 right-5 flex items-center gap-1.5 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
          style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
        </motion.span>
        {/* Corner ornament dots */}
        <span className="absolute top-5 left-5 text-[10px] font-mono" style={{ color: `${ink}20` }}>✦</span>
        <span className="absolute bottom-5 right-5 text-[10px] font-mono" style={{ color: `${ink}20` }}>✦</span>
        {/* Main content */}
        <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-2xl">
          <motion.div variants={rise} className="text-[9px] tracking-[0.32em] uppercase font-semibold" style={{ color: `${ink}48` }}>
            {props.eyebrow}
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="h1"
              value={props.name}
              onChange={(v) => onChange({ name: v })}
              className="mt-5 font-display text-6xl leading-[0.92] tracking-tight"
              style={{ color: ink }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-2">
            <Editable
              as="p"
              value={props.tagline}
              onChange={(v) => onChange({ tagline: v })}
              className="font-display text-2xl italic"
              style={{ color: accent }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-5 h-px max-w-xs" style={{ background: `${ink}12` }} />
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.bio}
              onChange={(v) => onChange({ bio: v })}
              className="mt-5 text-sm leading-relaxed max-w-lg"
              style={{ color: `${ink}72` }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-8 flex items-center gap-4">
            <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
            <motion.div
              whileHover={{ backgroundColor: `${ink}06` }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border"
              style={{ borderColor: `${ink}20`, color: ink }}
            >
              <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
            </motion.div>
          </motion.div>
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero16: Pull-quote Two-Col ---------- */
export function Hero16({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left col */}
        <motion.div initial="initial" animate="animate" variants={stagger}>
          <motion.div variants={rise} className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: `${ink}48` }}>
            {props.eyebrow}
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="h1"
              value={props.name}
              onChange={(v) => onChange({ name: v })}
              className="mt-5 font-display text-5xl md:text-6xl leading-[0.93] tracking-tight"
              style={{ color: ink }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-5 h-px" style={{ background: `${ink}12` }} />
          <MetaRow props={props} ink={ink} onChange={onChange} />
          <motion.div variants={rise} className="mt-8">
            <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          </motion.div>
          <motion.div variants={rise} className="mt-4">
            <motion.div
              whileHover={{ backgroundColor: `${ink}06` }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border"
              style={{ borderColor: `${ink}20`, color: ink }}
            >
              <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
            </motion.div>
          </motion.div>
        </motion.div>
        {/* Right col — pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative pt-8"
        >
          {/* Opening quote mark */}
          <span
            className="absolute -top-2 -left-3 font-display text-8xl leading-none opacity-15 select-none pointer-events-none"
            style={{ color: accent }}
          >
            "
          </span>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="relative font-display text-3xl md:text-4xl italic leading-snug"
            style={{ color: accent }}
          />
          <div className="mt-5 h-0.5 w-10" style={{ background: accent }} />
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-5 text-sm leading-relaxed"
            style={{ color: `${ink}72` }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Hero17: Sidebar Vertical ---------- */
export function Hero17({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="flex flex-col md:flex-row min-h-[68vh] overflow-hidden" style={{ background: bg }}>
      {/* Left sidebar panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:w-[200px] shrink-0 relative flex flex-col items-center justify-center py-16 px-6 overflow-hidden"
        style={{ background: `${ink}06`, borderRight: `1px solid ${ink}10` }}
      >
        {/* Dot column */}
        <div className="absolute left-4 inset-y-0 flex flex-col justify-center gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="h-1 w-1 rounded-full" style={{ background: `${ink}18` }} />
          ))}
        </div>
        {/* Rotated name */}
        <div
          className="md:-rotate-90 whitespace-nowrap font-display text-3xl tracking-tight select-none"
          style={{ color: ink }}
        >
          {props.name}
        </div>
        {/* Accent dot */}
        <div className="mt-6 md:mt-0 md:absolute md:bottom-8 h-2 w-2 rounded-full" style={{ background: accent }} />
      </motion.div>
      {/* Main content */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="flex-1 flex flex-col justify-center px-10 md:px-16 py-16"
      >
        <motion.div variants={rise} className="text-[9px] tracking-[0.32em] uppercase font-medium" style={{ color: `${ink}50` }}>
          {props.eyebrow}
        </motion.div>
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-4 font-display text-3xl md:text-4xl italic leading-snug"
            style={{ color: accent }}
          />
        </motion.div>
        <motion.div variants={rise} className="mt-4 h-px max-w-sm" style={{ background: `${ink}10` }} />
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-5 text-sm leading-relaxed max-w-md"
            style={{ color: `${ink}72` }}
          />
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex items-center gap-4">
          <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          <motion.div
            whileHover={{ backgroundColor: `${ink}06` }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border"
            style={{ borderColor: `${ink}20`, color: ink }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        <MetaRow props={props} ink={ink} onChange={onChange} />
      </motion.div>
    </section>
  );
}

/* ---------- Hero18: Dotted Grid ---------- */
export function Hero18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section
      className="relative px-8 md:px-16 py-28 overflow-hidden"
      style={{
        background: bg,
        backgroundImage: `radial-gradient(${ink}20 1px, transparent 1px)`,
        backgroundSize: "18px 18px",
      }}
    >
      {/* Fade-out mask */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, ${bg} 100%)` }} />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto rounded-2xl p-10 md:p-14"
        style={{ background: bg, boxShadow: `0 20px 60px -15px ${ink}22, 0 4px 16px -4px ${ink}12, 0 0 0 1px ${ink}0c` }}
      >
        <motion.div initial="initial" animate="animate" variants={stagger}>
          <motion.div variants={rise} className="text-[10px] tracking-[0.28em] uppercase font-medium" style={{ color: `${ink}48` }}>
            {props.eyebrow}
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="h1"
              value={props.name}
              onChange={(v) => onChange({ name: v })}
              className="mt-5 font-display text-5xl md:text-6xl leading-[0.93] tracking-tight"
              style={{ color: ink }}
            />
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.tagline}
              onChange={(v) => onChange({ tagline: v })}
              className="mt-2 font-display text-2xl italic"
              style={{ color: accent }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-5 h-px" style={{ background: `${ink}10` }} />
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.bio}
              onChange={(v) => onChange({ bio: v })}
              className="mt-5 text-sm leading-relaxed"
              style={{ color: `${ink}72` }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-8 flex items-center gap-4">
            <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          </motion.div>
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero19: Outline Stroke ---------- */
export function Hero19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-32 text-center overflow-hidden" style={{ background: ink }}>
      {/* Subtle noise/grain overlay pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, ${bg} 0px, ${bg} 1px, transparent 1px, transparent 4px)` }}
      />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative">
        {/* Eyebrow */}
        <motion.div variants={rise} className="text-[9px] tracking-[0.38em] uppercase font-medium" style={{ color: `${bg}55` }}>
          {props.eyebrow}
        </motion.div>
        {/* Outline name — fills on hover */}
        <motion.div variants={rise}>
          <motion.h1
            initial={{ WebkitTextStroke: `1.5px ${bg}` } as any}
            whileHover={{ color: bg }}
            transition={{ duration: 0.35 }}
            className="mt-6 font-display text-6xl md:text-9xl leading-[0.88] tracking-tight select-none"
            style={{ color: "transparent", WebkitTextStroke: `1.5px ${bg}` } as any}
          >
            <Editable value={props.name} onChange={(v) => onChange({ name: v })} className="inline" />
          </motion.h1>
        </motion.div>
        {/* Tagline in accent */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-5 font-display text-2xl md:text-3xl italic"
            style={{ color: accent }}
          />
        </motion.div>
        {/* Divider */}
        <motion.div variants={rise} className="mt-6 flex justify-center">
          <span className="h-px w-16" style={{ background: `${bg}25` }} />
        </motion.div>
        {/* Bio */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-6 text-sm leading-relaxed mx-auto max-w-lg"
            style={{ color: `${bg}60` }}
          />
        </motion.div>
        {/* CTAs */}
        <motion.div variants={rise} className="mt-10 flex items-center justify-center gap-4">
          <PrimaryCta label={props.primaryCta} ink={bg} bg={ink} onChange={(v) => onChange({ primaryCta: v })} />
          <motion.div
            whileHover={{ backgroundColor: `${bg}12` }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border"
            style={{ borderColor: `${bg}28`, color: bg }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        {/* Meta */}
        <motion.div variants={rise} className="mt-8 flex items-center justify-center gap-5 text-xs" style={{ color: `${bg}40` }}>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>
          <span>·</span>
          <span><Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" /></span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero20: Compact Banner ---------- */
export function Hero20({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section
      className="px-8 md:px-16 py-8 flex items-center justify-between gap-6 flex-wrap"
      style={{ background: bg, borderTop: `3px solid ${accent}`, borderBottom: `1px solid ${ink}10` }}
    >
      {/* Left block: eyebrow + name + tagline */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 flex-wrap"
      >
        <span className="text-[9px] tracking-[0.28em] uppercase font-medium hidden md:inline" style={{ color: `${ink}40` }}>
          {props.eyebrow}
        </span>
        <span className="h-4 w-px hidden md:inline" style={{ background: `${ink}18` }} />
        <Editable
          as="span"
          value={props.name}
          onChange={(v) => onChange({ name: v })}
          className="font-display text-3xl md:text-4xl tracking-tight"
          style={{ color: ink }}
        />
        <span className="h-4 w-px" style={{ background: `${ink}18` }} />
        <Editable
          as="span"
          value={props.tagline}
          onChange={(v) => onChange({ tagline: v })}
          className="text-base italic"
          style={{ color: accent }}
        />
      </motion.div>
      {/* Right block: meta + CTA */}
      <motion.div
        initial={{ opacity: 0, x: 14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex items-center gap-4 shrink-0"
      >
        <span className="text-xs hidden md:inline" style={{ color: `${ink}45` }}>
          <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" />
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs hidden md:inline-flex" style={{ color: accent }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
        </span>
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium shrink-0"
          style={{ background: ink, color: bg }}
        >
          <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VARIANTS 21–30  —  New premium themes
   ═══════════════════════════════════════════════════════════════════════════ */

/* ---------- Hero21: Luxury Gold ---------- */
export function Hero21({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const gold = "#C9A84C";
  const cream = "#FAF6F0";
  const charcoal = "#1C1A17";
  return (
    <section
      className="relative px-8 md:px-16 pt-24 pb-28 overflow-hidden"
      style={{ background: cream }}
    >
      {/* Double outer frame */}
      <div className="absolute inset-4 pointer-events-none" style={{ border: `1px solid ${gold}40` }} />
      <div className="absolute inset-6 pointer-events-none" style={{ border: `1px solid ${gold}20` }} />
      {/* Corner ornaments */}
      {[["top-4 left-4", "rotate-0"], ["top-4 right-4", "rotate-90"], ["bottom-4 left-4", "-rotate-90"], ["bottom-4 right-4", "rotate-180"]].map(([pos, rot], i) => (
        <div key={i} className={`absolute ${pos} ${rot} w-8 h-8 pointer-events-none`}>
          <div className="absolute top-0 left-0 h-4 w-px" style={{ background: gold }} />
          <div className="absolute top-0 left-0 h-px w-4" style={{ background: gold }} />
        </div>
      ))}
      {/* Subtle texture bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(45deg, ${charcoal} 0px, ${charcoal} 1px, transparent 1px, transparent 8px)` }} />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative max-w-2xl mx-auto text-center">
        {/* Gold eyebrow */}
        <motion.div variants={rise} className="inline-flex items-center gap-3 text-[9px] tracking-[0.4em] uppercase" style={{ color: gold }}>
          <span className="inline-block h-px w-10" style={{ background: gold }} />
          {props.eyebrow}
          <span className="inline-block h-px w-10" style={{ background: gold }} />
        </motion.div>
        {/* Serif wordmark name */}
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="mt-7 font-display text-6xl md:text-8xl leading-[0.9] tracking-wide"
            style={{ color: charcoal, fontStyle: "italic" }}
          />
        </motion.div>
        {/* Gold divider with diamond */}
        <motion.div variants={rise} className="mt-5 flex items-center justify-center gap-3">
          <span className="flex-1 max-w-[80px] h-px" style={{ background: `linear-gradient(to right, transparent, ${gold})` }} />
          <span className="text-sm" style={{ color: gold }}>◆</span>
          <span className="flex-1 max-w-[80px] h-px" style={{ background: `linear-gradient(to left, transparent, ${gold})` }} />
        </motion.div>
        {/* Tagline */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-4 text-lg italic font-display tracking-wide"
            style={{ color: gold }}
          />
        </motion.div>
        {/* Bio */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-6 text-sm leading-relaxed mx-auto max-w-lg"
            style={{ color: `${charcoal}80` }}
          />
        </motion.div>
        {/* Gold CTA */}
        <motion.div variants={rise} className="mt-10 flex items-center justify-center gap-4">
          <motion.div
            whileHover={{ backgroundColor: charcoal, color: cream }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2 px-8 py-3 text-sm tracking-widest uppercase cursor-pointer"
            style={{ background: gold, color: cream, border: `1px solid ${gold}` }}
          >
            <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.div>
          <motion.div
            whileHover={{ backgroundColor: `${gold}12` }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-widest uppercase"
            style={{ border: `1px solid ${gold}55`, color: charcoal }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        {/* Meta */}
        <motion.div variants={rise} className="mt-8 flex items-center justify-center gap-5 text-[10px] tracking-widest uppercase" style={{ color: `${charcoal}50` }}>
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>
          <span style={{ color: gold }}>·</span>
          <span><Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" /></span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero22: Neon Cyber ---------- */
export function Hero22({ props, theme, onChange }: Props) {
  const neon = "#00FF88";
  const neonDim = "#00FF8855";
  return (
    <section
      className="relative px-8 md:px-16 py-28 overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.35) 3px, rgba(0,0,0,0.35) 4px)`,
          mixBlendMode: "multiply",
        }}
      />
      {/* Pulsing neon border */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-4 pointer-events-none"
        style={{ border: `1px solid ${neonDim}` }}
      />
      {/* Corner brackets */}
      {[["top-4 left-4", "0 0"], ["top-4 right-4", "0 0"], ["bottom-4 left-4", "0 0"], ["bottom-4 right-4", "0 0"]].map((_, i) => (
        <div key={i} className={`absolute ${i === 0 ? "top-4 left-4" : i === 1 ? "top-4 right-4" : i === 2 ? "bottom-4 left-4" : "bottom-4 right-4"} w-6 h-6 pointer-events-none`}
          style={{
            borderTop: i < 2 ? `2px solid ${neon}` : undefined,
            borderBottom: i >= 2 ? `2px solid ${neon}` : undefined,
            borderLeft: i === 0 || i === 2 ? `2px solid ${neon}` : undefined,
            borderRight: i === 1 || i === 3 ? `2px solid ${neon}` : undefined,
          }}
        />
      ))}
      {/* Glowing orb behind text */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: neon }}
      />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative z-20 max-w-3xl">
        {/* Eyebrow */}
        <motion.div variants={rise} className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: `${neon}80` }}>
          <span style={{ color: neon }}>&gt;</span> {props.eyebrow}
        </motion.div>
        {/* Glitch-style name */}
        <motion.div variants={rise} className="mt-6 relative">
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="font-display text-6xl md:text-8xl leading-[0.88] tracking-tight"
            style={{ color: "#fff" }}
          />
          {/* Glitch shadow layers */}
          <div
            className="absolute inset-0 font-display text-6xl md:text-8xl leading-[0.88] tracking-tight pointer-events-none select-none opacity-60"
            style={{ color: neon, transform: "translate(2px, -1px)", mixBlendMode: "screen", top: 0, left: 0 }}
            aria-hidden
          >
            {props.name}
          </div>
          <motion.div
            animate={{ opacity: [0, 0.5, 0], x: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 1] }}
            className="absolute inset-0 font-display text-6xl md:text-8xl leading-[0.88] tracking-tight pointer-events-none select-none"
            style={{ color: "#ff00aa", mixBlendMode: "screen", top: 0, left: 0 }}
            aria-hidden
          >
            {props.name}
          </motion.div>
        </motion.div>
        {/* Neon tagline */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-4 font-mono text-xl"
            style={{ color: neon }}
          />
        </motion.div>
        {/* Separator */}
        <motion.div variants={rise} className="mt-5 h-px" style={{ background: `linear-gradient(to right, ${neon}60, transparent)` }} />
        {/* Bio */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-5 text-sm leading-relaxed font-mono max-w-xl"
            style={{ color: "rgba(255,255,255,0.5)" }}
          />
        </motion.div>
        {/* CTAs */}
        <motion.div variants={rise} className="mt-9 flex items-center gap-4">
          <motion.div
            whileHover={{ boxShadow: `0 0 24px ${neon}80, 0 0 48px ${neon}40` }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-mono font-medium cursor-pointer"
            style={{ background: neon, color: "#050505", border: `1px solid ${neon}` }}
          >
            <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.div>
          <motion.div
            whileHover={{ borderColor: neon, color: neon }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-mono border"
            style={{ borderColor: `${neon}40`, color: "rgba(255,255,255,0.6)" }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        {/* Meta */}
        <motion.div variants={rise} className="mt-7 flex items-center gap-5 font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
          <span>[loc: <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" style={{ color: `${neon}80` }} />]</span>
          <span>[status: <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" style={{ color: `${neon}80` }} />]</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero23: Magazine Cover ---------- */
export function Hero23({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative grid md:grid-cols-[1fr_1.5fr] min-h-[80vh] overflow-hidden" style={{ background: bg }}>
      {/* LEFT editorial column */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="flex flex-col justify-between px-8 md:px-12 py-10 z-10"
        style={{ borderRight: `1px solid ${ink}10` }}
      >
        {/* Header row */}
        <div>
          <motion.div variants={rise} className="flex items-center justify-between">
            <span className="text-[9px] tracking-[0.3em] uppercase font-black" style={{ color: ink }}>{props.eyebrow}</span>
            <span className="text-[9px] font-mono" style={{ color: `${ink}40` }}>VOL.01</span>
          </motion.div>
          <motion.div variants={rise} className="mt-2 h-px" style={{ background: ink }} />
        </div>
        {/* Main content */}
        <div className="py-8">
          {/* Issue badge */}
          <motion.div
            variants={rise}
            className="inline-flex items-center gap-2 px-3 py-1 text-[9px] uppercase tracking-widest font-bold mb-6"
            style={{ background: accent, color: bg }}
          >
            <span>★</span> FEATURED PORTFOLIO
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="h1"
              value={props.name}
              onChange={(v) => onChange({ name: v })}
              className="font-display text-5xl md:text-6xl leading-[0.92] tracking-tight"
              style={{ color: ink }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-3 h-0.5 w-14" style={{ background: accent }} />
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.tagline}
              onChange={(v) => onChange({ tagline: v })}
              className="mt-3 text-lg italic font-display"
              style={{ color: accent }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-3 h-px" style={{ background: `${ink}12` }} />
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.bio}
              onChange={(v) => onChange({ bio: v })}
              className="mt-4 text-sm leading-relaxed"
              style={{ color: `${ink}70` }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-7 flex items-center gap-3">
            <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          </motion.div>
        </div>
        {/* Footer meta */}
        <div>
          <div className="h-px mb-4" style={{ background: `${ink}12` }} />
          <div className="flex items-center justify-between text-[10px]" style={{ color: `${ink}45` }}>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
            </span>
          </div>
        </div>
      </motion.div>
      {/* RIGHT image panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
        style={props.imageUrl ? { backgroundImage: `url(${props.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: `${accent}20` }}
      >
        {/* Gradient overlay left edge */}
        <div className="absolute inset-y-0 left-0 w-20 pointer-events-none" style={{ background: `linear-gradient(to right, ${bg}, transparent)` }} />
        {/* Title watermark on image bottom */}
        <div className="absolute bottom-8 right-8">
          <div className="font-display text-4xl opacity-20 text-right" style={{ color: bg }}>{props.name}</div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero24: Glassmorphism ---------- */
export function Hero24({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section
      className="relative px-6 md:px-12 py-28 flex items-center justify-center min-h-[80vh] overflow-hidden"
      style={{ background: `linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)` }}
    >
      {/* Background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[80px] pointer-events-none"
        style={{ background: `${accent}60` }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full blur-[70px] pointer-events-none"
        style={{ background: "#7c3aed60" }}
      />
      {/* Small background glass panels */}
      <div className="absolute top-10 right-10 w-32 h-32 rounded-2xl pointer-events-none" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.08)" }} />
      <div className="absolute bottom-10 left-10 w-20 h-20 rounded-xl pointer-events-none" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.06)" }} />
      {/* Main frosted glass card */}
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-2xl w-full rounded-3xl p-10 md:p-14 z-10"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <motion.div initial="initial" animate="animate" variants={stagger}>
          <motion.div variants={rise} className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
            {props.eyebrow}
          </motion.div>
          {/* Gradient name */}
          <motion.div variants={rise}>
            <Editable
              as="h1"
              value={props.name}
              onChange={(v) => onChange({ name: v })}
              className="mt-5 font-display text-6xl md:text-7xl leading-[0.9] tracking-tight"
              style={{
                background: `linear-gradient(135deg, #fff 0%, ${accent} 60%, #a78bfa 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            />
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.tagline}
              onChange={(v) => onChange({ tagline: v })}
              className="mt-3 text-xl italic"
              style={{ color: `${accent}cc` }}
            />
          </motion.div>
          {/* Glass divider */}
          <motion.div variants={rise} className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.12)" }} />
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.bio}
              onChange={(v) => onChange({ bio: v })}
              className="mt-5 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.55)" }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-9 flex items-center gap-4">
            <motion.div
              whileHover={{ background: accent, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium cursor-pointer"
              style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)" }}
            >
              <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.div>
            <motion.div
              whileHover={{ background: "rgba(255,255,255,0.08)" }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm border cursor-pointer"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
            >
              <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
            </motion.div>
          </motion.div>
          <motion.div variants={rise} className="mt-6 flex items-center gap-5 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#4ade80" }} />
              <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero25: Handcraft Artisan ---------- */
export function Hero25({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const parchment = "#F5EDDA";
  const brown = "#5C3D1E";
  const warm = "#C47B2B";
  return (
    <section
      className="relative px-8 md:px-16 py-24 overflow-hidden"
      style={{ background: parchment }}
    >
      {/* Rough texture background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: `radial-gradient(${brown} 1px, transparent 1px)`, backgroundSize: "3px 3px" }}
      />
      {/* Hand-drawn style dashed border */}
      <div
        className="absolute inset-5 pointer-events-none rounded-sm"
        style={{ border: `2px dashed ${brown}35` }}
      />
      <div
        className="absolute inset-7 pointer-events-none rounded-sm"
        style={{ border: `1px dashed ${brown}20` }}
      />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative max-w-2xl">
        {/* Stamped badge */}
        <motion.div
          variants={rise}
          initial={{ rotate: -3, opacity: 0 }}
          animate={{ rotate: -3, opacity: 1 }}
          className="inline-block px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-black rounded-sm mb-8"
          style={{ border: `2px solid ${warm}70`, color: warm, transform: "rotate(-2deg)" }}
        >
          ✦ {props.eyebrow} ✦
        </motion.div>
        {/* Big rough serif name */}
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="font-display text-6xl md:text-8xl leading-[0.9] tracking-tight"
            style={{ color: brown }}
          />
        </motion.div>
        {/* Wavy underline */}
        <motion.div variants={rise} className="mt-3">
          <svg width="200" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6 C20 2, 40 10, 60 6 C80 2, 100 10, 120 6 C140 2, 160 10, 180 6 C195 3, 198 7, 200 6" stroke={warm} strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        </motion.div>
        {/* Tagline */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-4 text-xl italic font-display"
            style={{ color: warm }}
          />
        </motion.div>
        {/* Bio */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-5 text-sm leading-relaxed max-w-lg"
            style={{ color: `${brown}88` }}
          />
        </motion.div>
        {/* CTA */}
        <motion.div variants={rise} className="mt-8 flex items-center gap-4 flex-wrap">
          <motion.div
            whileHover={{ background: brown }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm cursor-pointer rounded-sm"
            style={{ background: warm, color: parchment }}
          >
            <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.div>
          <motion.div
            whileHover={{ background: `${warm}15` }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm rounded-sm"
            style={{ border: `1.5px dashed ${brown}55`, color: brown }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        {/* Meta */}
        <motion.div variants={rise} className="mt-7 flex items-center gap-4 text-[11px]" style={{ color: `${brown}60` }}>
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>
          <span>·</span>
          <span><Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" /></span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero26: Corporate Executive ---------- */
export function Hero26({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative overflow-hidden" style={{ background: "#FFFFFF" }}>
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: accent }} />
      <div className="px-12 md:px-20 py-20">
        <div className="grid md:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Left main content */}
          <motion.div initial="initial" animate="animate" variants={stagger}>
            {/* Company/eyebrow in small caps */}
            <motion.div variants={rise} className="text-[10px] tracking-[0.4em] font-semibold" style={{ color: accent, fontVariant: "small-caps", textTransform: "uppercase" }}>
              {props.eyebrow}
            </motion.div>
            {/* Name bold sans */}
            <motion.div variants={rise}>
              <Editable
                as="h1"
                value={props.name}
                onChange={(v) => onChange({ name: v })}
                className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight font-black"
                style={{ color: "#111111" }}
              />
            </motion.div>
            {/* Role/title in small caps */}
            <motion.div variants={rise}>
              <Editable
                as="p"
                value={props.tagline}
                onChange={(v) => onChange({ tagline: v })}
                className="mt-2 text-base tracking-[0.15em] uppercase font-medium"
                style={{ color: accent }}
              />
            </motion.div>
            {/* Horizontal rule */}
            <motion.div variants={rise} className="mt-6 h-px" style={{ background: "#E5E5E5" }} />
            {/* Bio */}
            <motion.div variants={rise}>
              <Editable
                as="p"
                value={props.bio}
                onChange={(v) => onChange({ bio: v })}
                className="mt-6 text-sm leading-relaxed max-w-xl"
                style={{ color: "#555555" }}
              />
            </motion.div>
            {/* CTAs */}
            <motion.div variants={rise} className="mt-8 flex items-center gap-4">
              <motion.div
                whileHover={{ background: "#000", scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold tracking-wide cursor-pointer rounded-none"
                style={{ background: accent, color: "#fff" }}
              >
                <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.div>
              <motion.div
                whileHover={{ background: "#f5f5f5" }}
                className="inline-flex items-center gap-2 px-7 py-3 text-sm font-medium tracking-wide rounded-none border"
                style={{ borderColor: "#DDDDDD", color: "#333333" }}
              >
                <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Right sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-5 pt-2"
          >
            {/* Availability */}
            <div className="p-5 rounded-none" style={{ border: "1px solid #E8E8E8", borderLeft: `3px solid ${accent}` }}>
              <div className="text-[9px] uppercase tracking-widest font-semibold mb-2" style={{ color: "#999" }}>Status</div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: "#4ade80" }} />
                <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline text-sm font-medium" style={{ color: "#222" }} />
              </div>
            </div>
            {/* Location */}
            <div className="p-5 rounded-none" style={{ border: "1px solid #E8E8E8" }}>
              <div className="text-[9px] uppercase tracking-widest font-semibold mb-2" style={{ color: "#999" }}>Location</div>
              <div className="flex items-center gap-2 text-sm" style={{ color: "#333" }}>
                <MapPin className="h-3.5 w-3.5" style={{ color: accent }} />
                <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Hero27: Sports Dynamic ---------- */
export function Hero27({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: ink, minHeight: "70vh" }}
    >
      {/* Diagonal stripe accent background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(-55deg, transparent, transparent 40px, ${accent}08 40px, ${accent}08 41px)`,
        }}
      />
      {/* Strong diagonal accent slash */}
      <motion.div
        initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
        whileInView={{ clipPath: "polygon(55% 0, 100% 0, 100% 100%, 62% 100%)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: accent }}
      />
      {/* Number watermark */}
      <div
        className="absolute right-8 top-0 bottom-0 flex items-center pointer-events-none select-none"
        style={{ color: `${accent}15`, fontSize: "20vw", fontWeight: 900, lineHeight: 1 }}
      >
        01
      </div>
      <div className="relative z-10 px-8 md:px-16 py-20">
        <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div variants={rise} className="text-[9px] tracking-[0.4em] uppercase font-black" style={{ color: `${accent}` }}>
            {props.eyebrow}
          </motion.div>
          {/* Condensed bold name */}
          <motion.div variants={rise}>
            <Editable
              as="h1"
              value={props.name}
              onChange={(v) => onChange({ name: v })}
              className="mt-3 font-display leading-[0.85] tracking-tighter uppercase font-black"
              style={{ color: bg, fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
            />
          </motion.div>
          {/* Diagonal rule */}
          <motion.div
            variants={rise}
            className="mt-4 h-1 w-24 origin-left"
            style={{ background: accent, transform: "skewX(-15deg)" }}
          />
          {/* Tagline */}
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.tagline}
              onChange={(v) => onChange({ tagline: v })}
              className="mt-4 text-xl uppercase font-bold tracking-wide"
              style={{ color: accent }}
            />
          </motion.div>
          {/* Bio */}
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.bio}
              onChange={(v) => onChange({ bio: v })}
              className="mt-5 text-sm leading-relaxed max-w-lg"
              style={{ color: `${bg}65` }}
            />
          </motion.div>
          {/* CTAs */}
          <motion.div variants={rise} className="mt-9 flex items-center gap-0">
            <motion.div
              whileHover={{ background: accent }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-black uppercase tracking-wider cursor-pointer"
              style={{ background: bg, color: ink }}
            >
              <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.div>
            <motion.div
              whileHover={{ background: `${bg}15` }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider border-2"
              style={{ borderColor: `${bg}40`, color: bg }}
            >
              <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
            </motion.div>
          </motion.div>
          {/* Meta */}
          <motion.div variants={rise} className="mt-6 flex items-center gap-5 text-xs font-bold uppercase tracking-wider" style={{ color: `${bg}40` }}>
            <span><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>
            <span style={{ color: accent }}>///</span>
            <span><Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" /></span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Hero28: Botanical Organic ---------- */
export function Hero28({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const sage = "#7C9A7E";
  const cream2 = "#F8F4EE";
  const darkGreen = "#2D4A30";
  return (
    <section
      className="relative px-8 md:px-16 py-24 overflow-hidden"
      style={{ background: cream2 }}
    >
      {/* Organic dot pattern bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: `radial-gradient(${sage} 1.5px, transparent 1.5px)`, backgroundSize: "24px 24px" }}
      />
      {/* Large decorative circle bg shape */}
      <div
        className="absolute -right-32 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: sage, border: `2px solid ${sage}` }}
      />
      <div
        className="absolute -right-20 top-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full pointer-events-none"
        style={{ border: `1px dashed ${sage}40` }}
      />
      <div className="grid md:grid-cols-[1fr_280px] gap-12 items-center relative z-10">
        {/* Left content */}
        <motion.div initial="initial" animate="animate" variants={stagger}>
          <motion.div variants={rise} className="flex items-center gap-2">
            <span className="text-sm" style={{ color: sage }}>✿</span>
            <span className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: sage }}>
              {props.eyebrow}
            </span>
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="h1"
              value={props.name}
              onChange={(v) => onChange({ name: v })}
              className="mt-5 font-display text-5xl md:text-7xl leading-[0.92] tracking-tight"
              style={{ color: darkGreen }}
            />
          </motion.div>
          {/* Leaf-like divider */}
          <motion.div variants={rise} className="mt-4 flex items-center gap-2">
            <span className="h-px flex-1 max-w-[40px]" style={{ background: `${sage}60` }} />
            <span style={{ color: sage }}>❧</span>
            <span className="h-px flex-1 max-w-[40px]" style={{ background: `${sage}60` }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.tagline}
              onChange={(v) => onChange({ tagline: v })}
              className="mt-3 text-lg italic font-display"
              style={{ color: sage }}
            />
          </motion.div>
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.bio}
              onChange={(v) => onChange({ bio: v })}
              className="mt-5 text-sm leading-relaxed max-w-md"
              style={{ color: `${darkGreen}80` }}
            />
          </motion.div>
          <motion.div variants={rise} className="mt-8 flex items-center gap-3 flex-wrap">
            <motion.div
              whileHover={{ background: darkGreen }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm cursor-pointer"
              style={{ background: sage, color: cream2 }}
            >
              <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.div>
            <motion.div
              whileHover={{ background: `${sage}15` }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm border"
              style={{ borderColor: `${sage}50`, color: darkGreen }}
            >
              <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
            </motion.div>
          </motion.div>
          <motion.div variants={rise} className="mt-6 flex items-center gap-4 text-[11px]" style={{ color: `${darkGreen}55` }}>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /><Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: sage }} />
              <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
            </span>
          </motion.div>
        </motion.div>
        {/* Right circular photo frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full" style={{ border: `1px dashed ${sage}50`, margin: "-8px" }} />
          {/* Middle ring */}
          <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${sage}30`, margin: "-4px" }} />
          {/* Photo circle */}
          <div
            className="w-56 h-56 rounded-full overflow-hidden"
            style={props.imageUrl ? { backgroundImage: `url(${props.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: `${sage}25` }}
          >
            {!props.imageUrl && (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl" style={{ color: `${sage}60` }}>✿</span>
              </div>
            )}
          </div>
          {/* Small leaf ornaments */}
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 right-6 text-xl"
            style={{ color: sage }}
          >
            ❧
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -8, 0, 8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 left-8 text-lg"
            style={{ color: `${sage}80` }}
          >
            ❧
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Hero29: Real Estate Showcase ---------- */
export function Hero29({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative overflow-hidden" style={{ background: bg, minHeight: "75vh" }}>
      {/* Full-bleed image background */}
      <div
        className="absolute inset-0"
        style={props.imageUrl ? { backgroundImage: `url(${props.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: `linear-gradient(135deg, ${ink}ee 0%, ${accent}30 100%)` }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${ink}f0 0%, ${ink}90 45%, transparent 75%)` }} />
      {/* Subtle dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `radial-gradient(${bg} 1px, transparent 1px)`, backgroundSize: "16px 16px" }} />
      {/* Content */}
      <div className="relative z-10 px-8 md:px-14 py-16 flex flex-col justify-end min-h-[75vh]">
        <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-xl">
          {/* Address-style eyebrow */}
          <motion.div variants={rise} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm mb-5 text-[10px] tracking-widest uppercase font-semibold" style={{ background: accent, color: bg }}>
            <MapPin className="h-3 w-3" />
            <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" />
          </motion.div>
          {/* Name */}
          <motion.div variants={rise}>
            <Editable
              as="h1"
              value={props.name}
              onChange={(v) => onChange({ name: v })}
              className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight"
              style={{ color: bg }}
            />
          </motion.div>
          {/* Tagline */}
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.tagline}
              onChange={(v) => onChange({ tagline: v })}
              className="mt-3 text-lg italic"
              style={{ color: `${bg}80` }}
            />
          </motion.div>
          {/* Stats boxes row */}
          <motion.div variants={rise} className="mt-6 flex items-stretch gap-0 flex-wrap">
            {[
              { label: "Status", value: props.availability ?? "Available" },
              { label: "Role", value: props.eyebrow ?? "Portfolio" },
            ].map((stat, i) => (
              <div
                key={i}
                className="px-5 py-3 text-center min-w-[100px]"
                style={{
                  border: `1px solid ${bg}25`,
                  borderLeft: i > 0 ? "none" : `1px solid ${bg}25`,
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="text-[9px] uppercase tracking-widest font-medium mb-0.5" style={{ color: `${bg}55` }}>{stat.label}</div>
                <div className="text-sm font-semibold" style={{ color: bg }}>{stat.value}</div>
              </div>
            ))}
          </motion.div>
          {/* Bio */}
          <motion.div variants={rise}>
            <Editable
              as="p"
              value={props.bio}
              onChange={(v) => onChange({ bio: v })}
              className="mt-5 text-sm leading-relaxed"
              style={{ color: `${bg}65` }}
            />
          </motion.div>
          {/* CTAs */}
          <motion.div variants={rise} className="mt-8 flex items-center gap-3">
            <motion.div
              whileHover={{ background: accent, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold cursor-pointer"
              style={{ background: bg, color: ink }}
            >
              <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.div>
            <motion.div
              whileHover={{ background: `${bg}15` }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm border"
              style={{ borderColor: `${bg}40`, color: bg }}
            >
              <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Hero30: Event Wedding ---------- */
export function Hero30({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const rose = "#C8707A";
  const blush = "#FDF0F0";
  const gold2 = "#B8965A";
  const deepRose = "#7A2535";
  return (
    <section
      className="relative px-8 md:px-16 pt-20 pb-24 text-center overflow-hidden"
      style={{ background: blush }}
    >
      {/* Soft radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${rose}10, transparent)` }} />
      {/* Delicate repeating border pattern */}
      <div className="absolute inset-5 pointer-events-none" style={{ border: `1px solid ${rose}25` }} />
      <div className="absolute inset-8 pointer-events-none" style={{ border: `1px solid ${gold2}20` }} />
      {/* Top floral ornament */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 flex justify-center mt-2 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" style={{ color: `${gold2}80` }}>❀</span>
          <span className="text-2xl" style={{ color: `${rose}70` }}>❦</span>
          <span className="text-xl" style={{ color: `${gold2}80` }}>❀</span>
        </div>
      </motion.div>
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative z-10 max-w-2xl mx-auto">
        {/* Eyebrow */}
        <motion.div variants={rise} className="text-[9px] tracking-[0.4em] uppercase" style={{ color: `${deepRose}60` }}>
          {props.eyebrow}
        </motion.div>
        {/* Elegant serif italic name */}
        <motion.div variants={rise}>
          <Editable
            as="h1"
            value={props.name}
            onChange={(v) => onChange({ name: v })}
            className="mt-5 font-display text-6xl md:text-8xl leading-[0.88] tracking-wide"
            style={{ color: deepRose, fontStyle: "italic" }}
          />
        </motion.div>
        {/* Decorative divider */}
        <motion.div variants={rise} className="mt-5 flex items-center justify-center gap-3">
          <span className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(to right, transparent, ${gold2}80)` }} />
          <span style={{ color: gold2 }}>✦</span>
          <span className="h-px flex-1 max-w-[60px]" style={{ background: `linear-gradient(to left, transparent, ${gold2}80)` }} />
        </motion.div>
        {/* Tagline italic */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.tagline}
            onChange={(v) => onChange({ tagline: v })}
            className="mt-4 font-display text-2xl italic leading-snug"
            style={{ color: rose }}
          />
        </motion.div>
        {/* Date display */}
        <motion.div variants={rise} className="mt-4 text-[11px] tracking-[0.25em] uppercase" style={{ color: `${deepRose}50` }}>
          <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" />
        </motion.div>
        {/* Second divider */}
        <motion.div variants={rise} className="mt-5 flex items-center justify-center gap-2">
          <span className="h-px w-20" style={{ background: `${rose}25` }} />
          <span className="text-xs" style={{ color: `${rose}50` }}>❧</span>
          <span className="h-px w-20" style={{ background: `${rose}25` }} />
        </motion.div>
        {/* Bio */}
        <motion.div variants={rise}>
          <Editable
            as="p"
            value={props.bio}
            onChange={(v) => onChange({ bio: v })}
            className="mt-5 text-sm leading-relaxed mx-auto max-w-lg"
            style={{ color: `${deepRose}65` }}
          />
        </motion.div>
        {/* CTAs */}
        <motion.div variants={rise} className="mt-9 flex items-center justify-center gap-4 flex-wrap">
          <motion.div
            whileHover={{ background: deepRose }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2 px-8 py-3 text-sm tracking-widest uppercase cursor-pointer"
            style={{ background: rose, color: blush }}
          >
            <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.div>
          <motion.div
            whileHover={{ background: `${rose}12` }}
            className="inline-flex items-center gap-2 px-7 py-3 text-sm tracking-widest uppercase"
            style={{ border: `1px solid ${rose}50`, color: deepRose }}
          >
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        {/* Availability */}
        <motion.div variants={rise} className="mt-7 flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase" style={{ color: `${deepRose}45` }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: rose }} />
          <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
        </motion.div>
      </motion.div>
      {/* Bottom floral ornament */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 flex justify-center mt-10"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" style={{ color: `${gold2}60` }}>❀</span>
          <span className="text-lg" style={{ color: `${rose}50` }}>❦</span>
          <span className="text-xl" style={{ color: `${gold2}60` }}>❀</span>
        </div>
      </motion.div>
    </section>
  );
}
