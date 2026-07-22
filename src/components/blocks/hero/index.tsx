import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, ChevronDown } from "lucide-react";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { HeroProps } from "@/types/builder.schema";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * DESIGN SYSTEM — 20 numbered "skins"
 * Every block family (Hero / About / Projects / Testimonials / Footer)
 * shares the same numbering, so Hero7 + About7 + Projects7 + Testimonials7
 * + Footer7 always belong to the same visual language on a page.
 *
 *  1  Classic Centered      — refined, quiet, generous whitespace
 *  2  Split Portrait        — two column, visual right
 *  3  Fullbleed Gradient    — ink→accent gradient, dark canvas
 *  4  Terminal              — mono, faux code-editor chrome
 *  5  Marquee                — infinite horizontal motion
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
 *
 * Every hero below now carries: a staggered entrance sequence (eyebrow →
 * name → tagline → bio → actions → meta, in that order), a per-skin
 * decorative motif (orb, grid, marquee, ticks…) so the section feels
 * alive at rest and not just on load, and a shared scroll-cue so long
 * pages hint that there's more below the fold.
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
    <section className="relative px-8 md:px-16 pt-24 pb-28 text-center overflow-hidden">
      <DotGrid ink={ink} />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative max-w-2xl mx-auto">
        <motion.div variants={rise} className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-6 font-display text-5xl md:text-7xl leading-[0.92] tracking-tight" style={{ color: ink }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 font-display text-3xl md:text-4xl italic" style={{ color: accent }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-7 text-[15px] leading-relaxed mx-auto max-w-lg" style={{ color: `${ink}80` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-9 flex items-center justify-center gap-3">
          <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          <motion.div whileHover={{ backgroundColor: `${ink}08` }} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border transition-colors" style={{ borderColor: `${ink}25` }}>
            <Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" />
          </motion.div>
        </motion.div>
        <div className="flex justify-center"><MetaRow props={props} ink={ink} onChange={onChange} /></div>
      </motion.div>
      <ScrollCue ink={ink} />
    </section>
  );
}

/* ---------- Hero2: Split Portrait ---------- */
export function Hero2({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={rise} className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: accent }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-5 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight" style={{ color: ink }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 font-display text-2xl italic" style={{ color: accent }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-5 text-sm leading-relaxed max-w-md" style={{ color: `${ink}80` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-7"><PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} /></motion.div>
        <MetaRow props={props} ink={ink} onChange={onChange} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, clipPath: "inset(8% 8% 8% 8% round 24px)" }}
        whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] rounded-3xl overflow-hidden"
        style={props.imageUrl ? { backgroundImage: `url(${props.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : { background: `${accent}20` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 flex items-center gap-2 text-xs backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.7)", color: ink }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          {props.availability}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero3: Fullbleed Gradient ---------- */
export function Hero3({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-28 flex flex-col justify-end min-h-[70vh] overflow-hidden" style={{ background: `linear-gradient(160deg, ${ink}, ${accent}30)` }}>
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-32 -right-32 h-[440px] w-[440px] rounded-full blur-3xl pointer-events-none" style={{ background: accent }} />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative">
        <motion.div variants={rise} className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}70` }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-4 font-display text-6xl md:text-8xl leading-[0.9] tracking-tight" style={{ color: bg }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 font-display text-2xl md:text-3xl italic" style={{ color: accent }} />
        </motion.div>
        <motion.div variants={rise} className="mt-8"><PrimaryCta label={props.primaryCta} ink={bg} bg={ink} onChange={(v) => onChange({ primaryCta: v })} /></motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero4: Terminal ---------- */
export function Hero4({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-sm" style={{ border: `1px solid ${ink}20`, background: `${ink}05` }}>
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${ink}15` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-2 text-[10px] font-mono" style={{ color: `${ink}40` }}>portfolio.tsx</span>
          <span className="ml-auto text-[10px] font-mono" style={{ color: `${ink}30` }}>● running</span>
        </div>
        <div className="p-6 font-mono text-sm leading-relaxed" style={{ color: ink }}>
          <div style={{ color: `${ink}50` }}>{"// " + props.eyebrow}</div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-2">
            <span style={{ color: accent }}>const</span> name = "<Editable value={props.name} onChange={(v) => onChange({ name: v })} className="inline" />";
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
            <span style={{ color: accent }}>const</span> role = "<Editable value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="inline" />";
          </motion.div>
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4" style={{ color: `${ink}70` }} />
          <motion.div whileHover={{ x: 3 }} className="mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2" style={{ background: ink, color: bg }}>
            &gt; <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            <motion.span animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }} className="inline-block w-[2px] h-[1em] ml-1" style={{ background: bg }} />
          </motion.div>
          <div className="mt-4 flex items-center gap-4 text-xs" style={{ color: `${ink}45` }}>
            <span>{props.location}</span><span>·</span><span>{props.availability}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero5: Marquee ---------- */
export function Hero5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const track = Array(6).fill(props.name);
  return (
    <section className="pt-20 pb-16 overflow-hidden" style={{ background: bg }}>
      <div className="px-8 md:px-16"><div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</div></div>
      <div className="mt-4 overflow-hidden whitespace-nowrap">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="inline-flex font-display text-6xl md:text-8xl">
          {track.map((t, i) => (<span key={i} className="mx-6" style={{ color: i % 2 === 0 ? ink : accent }}>{t}</span>))}
        </motion.div>
      </div>
      <div className="mt-1 overflow-hidden whitespace-nowrap opacity-40">
        <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="inline-flex font-display text-2xl md:text-3xl italic">
          {Array(6).fill(props.tagline).map((t, i) => (<span key={i} className="mx-6" style={{ color: `${ink}60` }}>{t}</span>))}
        </motion.div>
      </div>
      <div className="px-8 md:px-16 mt-8">
        <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="text-sm leading-relaxed max-w-lg" style={{ color: `${ink}80` }} />
        <div className="mt-6"><PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} /></div>
        <MetaRow props={props} ink={ink} onChange={onChange} />
      </div>
    </section>
  );
}

/* ---------- Hero6: Tight Minimal Stack ---------- */
export function Hero6({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 pt-16 pb-16 border-b" style={{ borderColor: `${ink}10` }}>
      <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-xl">
        <motion.div variants={rise} className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}><Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-3 font-display text-4xl leading-tight tracking-tight" style={{ color: ink }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-1 text-lg italic" style={{ color: accent }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed" style={{ color: `${ink}80` }} /></motion.div>
        <motion.div variants={rise} className="mt-6 flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium" style={{ background: ink, color: bg }}><Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" /></motion.div>
          <motion.div whileHover={{ backgroundColor: `${ink}08` }} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs border" style={{ borderColor: `${ink}25` }}><Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" /></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero7: Big Serif Editorial ---------- */
export function Hero7({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 pt-24 pb-20 overflow-hidden" style={{ background: bg }}>
      <div className="absolute right-10 top-10 font-display text-[18vw] leading-none opacity-[0.04] pointer-events-none select-none" style={{ color: ink }}>&</div>
      <motion.div variants={rise} initial="initial" animate="animate" className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${ink}55` }}>{props.eyebrow}</motion.div>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-2 font-display leading-[0.82] text-[14vw] md:text-[8vw] tracking-tight" style={{ color: ink }} />
      </motion.div>
      <div className="mt-2 flex items-end justify-between gap-8 flex-wrap">
        <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="font-display text-2xl md:text-3xl italic" style={{ color: accent }} />
        <motion.div whileHover={{ x: 3 }} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shrink-0" style={{ background: ink, color: bg }}><Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" /><ArrowRight className="h-3.5 w-3.5" /></motion.div>
      </div>
      <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-6 text-sm leading-relaxed max-w-md" style={{ color: `${ink}80` }} />
      <div className="mt-3 h-px w-16" style={{ background: accent }} />
    </section>
  );
}

/* ---------- Hero8: Floating Card ---------- */
export function Hero8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ background: `${accent}18` }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, boxShadow: "0 30px 60px -20px rgba(0,0,0,0.25)" }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto rounded-3xl p-10 md:p-14 shadow-lift"
        style={{ background: bg }}
      >
        <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, type: "spring" }} className="h-14 w-14 rounded-2xl mb-6" style={{ background: accent }} />
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</div>
        <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-3 font-display text-4xl md:text-5xl leading-tight" style={{ color: ink }} />
        <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 text-lg italic" style={{ color: accent }} />
        <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed" style={{ color: `${ink}80` }} />
        <div className="mt-7"><PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} /></div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero9: Diagonal Split ---------- */
export function Hero9({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: bg }}>
      <motion.div
        initial={{ clipPath: "polygon(45% 0, 45% 0, 45% 100%, 45% 100%)" }}
        whileInView={{ clipPath: "polygon(45% 0, 100% 0, 100% 100%, 45% 100%)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ background: `${accent}25` }}
      />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative max-w-xl">
        <motion.div variants={rise} className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}><Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight" style={{ color: ink }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 text-xl italic" style={{ color: accent }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-5 text-sm leading-relaxed" style={{ color: `${ink}80` }} /></motion.div>
        <motion.div variants={rise} className="mt-7 flex gap-3">
          <PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} />
          <motion.div whileHover={{ backgroundColor: `${ink}08` }} className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm border" style={{ borderColor: `${ink}25` }}><Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" /></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero10: Minimal Side-by-Side ---------- */
export function Hero10({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 flex items-start justify-between gap-10 flex-wrap" style={{ background: bg }}>
      <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-lg">
        <motion.div variants={rise}><Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-4xl md:text-5xl leading-tight tracking-tight" style={{ color: ink }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 text-base italic" style={{ color: accent }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed" style={{ color: `${ink}80` }} /></motion.div>
        <motion.div variants={rise} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium" style={{ background: ink, color: bg }}><Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" /></motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-end gap-2 text-xs shrink-0" style={{ color: `${ink}60` }}>
        <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} /><Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" /></span>
        <span>{props.location}</span>
      </motion.div>
    </section>
  );
}

/* ---------- Hero11: Polaroid Tilt ---------- */
export function Hero11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-[1fr_240px] gap-12 items-center" style={{ background: bg }}>
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={rise} className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}><Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-4 font-display text-5xl leading-[0.95] tracking-tight" style={{ color: ink }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 text-xl italic" style={{ color: accent }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-5 text-sm leading-relaxed max-w-md" style={{ color: `${ink}80` }} /></motion.div>
        <motion.div variants={rise} className="mt-7"><PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} /></motion.div>
      </motion.div>
      <div className="relative h-[280px]">
        <motion.div initial={{ rotate: 8, opacity: 0, y: 10 }} whileInView={{ rotate: 8, opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="absolute inset-0 rounded-lg p-3 shadow-sm" style={{ background: bg, border: `1px solid ${ink}12` }}>
          <div className="aspect-square rounded-sm" style={{ background: `${accent}12` }} />
        </motion.div>
        <motion.div initial={{ rotate: -6, opacity: 0, y: 10 }} whileInView={{ rotate: -6, opacity: 1, y: 0 }} whileHover={{ rotate: 0, scale: 1.04 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="absolute inset-0 rounded-lg p-3 shadow-lift" style={{ background: bg, border: `1px solid ${ink}15` }}>
          <div className="aspect-square rounded-sm" style={{ background: `${accent}25` }} />
          <div className="mt-3 text-center text-xs" style={{ color: `${ink}60` }}>{props.name}</div>
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
        <div className="font-mono text-xs" style={{ color: `${ink}50` }}>{"> " + props.eyebrow}</div>
        <div className="mt-4 font-mono text-4xl md:text-5xl" style={{ color: ink }}>
          <Editable value={props.name} onChange={(v) => onChange({ name: v })} className="inline" />
          <motion.span animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }} className="inline-block w-[2px] h-[0.9em] ml-1 align-middle" style={{ background: accent }} />
        </div>
        <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 font-mono text-lg" style={{ color: accent }} />
        <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-5 text-sm leading-relaxed font-mono" style={{ color: `${ink}75` }} />
        <motion.div whileHover={{ x: 3 }} className="mt-7 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-mono" style={{ background: ink, color: bg }}><Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" /></motion.div>
        <div className="mt-5 font-mono text-xs" style={{ color: `${ink}40` }}>[status] {props.location} · {props.availability}</div>
      </div>
    </section>
  );
}

/* ---------- Hero13: Brutalist ---------- */
export function Hero13({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-16" style={{ background: bg }}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative max-w-3xl p-10" style={{ border: `3px solid ${ink}` }}>
        <span className="absolute -top-3 -left-3 h-6 w-6" style={{ borderTop: `3px solid ${accent}`, borderLeft: `3px solid ${accent}` }} />
        <span className="absolute -bottom-3 -right-3 h-6 w-6" style={{ borderBottom: `3px solid ${accent}`, borderRight: `3px solid ${accent}` }} />
        <div className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold" style={{ background: ink, color: bg }}>{props.eyebrow}</div>
        <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-5 font-display text-5xl md:text-6xl leading-[0.9] uppercase tracking-tight" style={{ color: ink }} />
        <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 text-lg font-bold" style={{ color: accent }} />
        <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed max-w-lg" style={{ color: `${ink}90` }} />
        <div className="mt-6 flex gap-0">
          <motion.div whileHover={{ backgroundColor: accent }} className="px-5 py-2.5 text-sm font-bold uppercase" style={{ background: ink, color: bg }}><Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" /></motion.div>
          <div className="px-5 py-2.5 text-sm font-bold uppercase" style={{ border: `2px solid ${ink}`, borderLeft: "none" }}><Editable value={props.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} className="inline" /></div>
        </div>
      </motion.div>
      <div className="max-w-3xl mt-4 flex justify-between text-xs font-bold uppercase tracking-widest" style={{ color: `${ink}55` }}>
        <span>{props.location}</span><span>{props.availability}</span>
      </div>
    </section>
  );
}

/* ---------- Hero14: Blurred Orb ---------- */
export function Hero14({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: bg }}>
      <motion.div animate={{ scale: [1, 1.08, 1], x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 -right-20 h-[420px] w-[420px] rounded-full blur-3xl opacity-40 pointer-events-none" style={{ background: accent }} />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-0 left-0 h-[220px] w-[220px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: ink }} />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative max-w-2xl">
        <motion.div variants={rise} className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}><Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-5 font-display text-5xl md:text-7xl leading-[0.92] tracking-tight" style={{ color: ink }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 text-xl italic" style={{ color: accent }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-5 text-sm leading-relaxed" style={{ color: `${ink}80` }} /></motion.div>
        <motion.div variants={rise} className="mt-7"><PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} /></motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero15: Bordered Frame ---------- */
export function Hero15({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="p-6 md:p-10" style={{ background: bg }}>
      <motion.div
        initial={{ opacity: 0, pathLength: 0 }}
        whileInView={{ opacity: 1, pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl px-8 md:px-16 py-20"
        style={{ border: `1px solid ${ink}18` }}
      >
        <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }} className="absolute top-4 right-4 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: `${accent}20`, color: accent }}>{props.availability}</motion.span>
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</div>
        <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-4 font-display text-5xl leading-[0.95] tracking-tight" style={{ color: ink }} />
        <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 text-xl italic" style={{ color: accent }} />
        <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-5 text-sm leading-relaxed max-w-lg" style={{ color: `${ink}80` }} />
        <div className="mt-6"><PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} /></div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero16: Pull-quote Two-Col ---------- */
export function Hero16({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-10" style={{ background: bg }}>
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={rise} className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}><Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-4 font-display text-4xl leading-tight tracking-tight" style={{ color: ink }} /></motion.div>
        <motion.div variants={rise} className="mt-6"><MetaRow props={props} ink={ink} onChange={onChange} /></motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="relative">
        <span className="absolute -top-6 -left-2 font-display text-6xl opacity-15" style={{ color: accent }}>"</span>
        <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="relative font-display text-3xl italic leading-snug" style={{ color: accent }} />
        <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed" style={{ color: `${ink}80` }} />
        <div className="mt-6"><PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} /></div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero17: Sidebar Vertical ---------- */
export function Hero17({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="flex flex-col md:flex-row min-h-[60vh]" style={{ background: bg }}>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="md:w-1/3 relative flex items-center justify-center p-10 overflow-hidden" style={{ background: `${ink}06` }}>
        <div className="absolute inset-y-0 left-6 flex flex-col justify-center gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => <span key={i} className="h-1 w-1 rounded-full" style={{ background: `${ink}20` }} />)}
        </div>
        <div className="md:-rotate-90 whitespace-nowrap font-display text-3xl tracking-tight" style={{ color: ink }}>{props.name}</div>
      </motion.div>
      <motion.div initial="initial" animate="animate" variants={stagger} className="flex-1 flex flex-col justify-center px-8 md:px-16 py-16">
        <motion.div variants={rise} className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 font-display text-3xl italic" style={{ color: accent }} /></motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed max-w-md" style={{ color: `${ink}80` }} /></motion.div>
        <motion.div variants={rise} className="mt-6 w-fit"><PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} /></motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero18: Dotted Grid ---------- */
export function Hero18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-24" style={{ background: bg, backgroundImage: `radial-gradient(${ink}22 1px, transparent 1px)`, backgroundSize: "18px 18px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3, boxShadow: "0 24px 48px -18px rgba(0,0,0,0.18)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl rounded-2xl p-10"
        style={{ background: bg }}
      >
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>{props.eyebrow}</div>
        <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-4 font-display text-5xl leading-[0.95] tracking-tight" style={{ color: ink }} />
        <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 text-xl italic" style={{ color: accent }} />
        <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-5 text-sm leading-relaxed" style={{ color: `${ink}80` }} />
        <div className="mt-6"><PrimaryCta label={props.primaryCta} ink={ink} bg={bg} onChange={(v) => onChange({ primaryCta: v })} /></div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero19: Outline Stroke ---------- */
export function Hero19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28 text-center" style={{ background: ink }}>
      <motion.div initial="initial" animate="animate" variants={stagger}>
        <motion.div variants={rise} className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}60` }}>{props.eyebrow}</motion.div>
        <motion.div variants={rise}>
          <motion.div
            initial={{ WebkitTextStroke: `1.5px ${bg}`, color: "transparent" } as any}
            whileHover={{ color: bg }}
            transition={{ duration: 0.4 }}
          >
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="mt-5 font-display text-6xl md:text-8xl leading-[0.9] tracking-tight" style={{ color: "transparent", WebkitTextStroke: `1.5px ${bg}` }} />
          </motion.div>
        </motion.div>
        <motion.div variants={rise}><Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-4 font-display text-2xl italic" style={{ color: accent }} /></motion.div>
        <motion.div variants={rise} className="mt-8 flex justify-center"><PrimaryCta label={props.primaryCta} ink={bg} bg={ink} onChange={(v) => onChange({ primaryCta: v })} /></motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Hero20: Compact Banner ---------- */
export function Hero20({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-10 flex items-center justify-between gap-6 flex-wrap" style={{ background: bg, borderBottom: `1px solid ${ink}12` }}>
      <motion.div initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-baseline gap-3 flex-wrap">
        <Editable as="span" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-3xl tracking-tight" style={{ color: ink }} />
        <Editable as="span" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="text-base italic" style={{ color: accent }} />
      </motion.div>
      <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium shrink-0" style={{ background: ink, color: bg }}><Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" /></motion.div>
    </section>
  );
}