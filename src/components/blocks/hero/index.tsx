import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, ChevronDown } from "lucide-react";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { HeroProps } from "@/types/builder.schema";

type Props = BlockComponentProps<HeroProps>;

const stagger = {
  initial: {},
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rise = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7 },
};

function MetaRow({ props, ink, onChange }: { props: HeroProps; ink: string; onChange: Props["onChange"] }) {
  return (
    <motion.div variants={rise} className="flex flex-wrap items-center gap-5 text-xs" style={{ color: `${ink}60` }}>
      {props.location && (
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <motion.span animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full" style={{ background: ink }} />
            <span className="relative rounded-full h-1.5 w-1.5" style={{ background: ink }} />
          </span>
          <MapPin className="h-3 w-3" />
          <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" />
        </span>
      )}
      {props.availability && (
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="h-3 w-3" />
          <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" />
        </span>
      )}
    </motion.div>
  );
}

function CtaButton({ label, ink, bg, accent, onChange }: { label: string; ink: string; bg: string; accent: string; onChange: (v: string) => void }) {
  return (
    <motion.div whileHover={{ x: 4 }} className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer" style={{ background: accent, color: bg }}>
      <Editable value={label} onChange={onChange} className="inline" />
      <ArrowRight className="h-3.5 w-3.5" />
    </motion.div>
  );
}

function ScrollCue({ ink }: { ink: string }) {
  return (
    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-1" style={{ color: `${ink}40` }}>
      <ChevronDown className="h-4 w-4" />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 1 — Classic Centered, refined and spacious
═══════════════════════════════════════════════════ */
export function Hero1({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-8 md:px-16 py-28 text-center" style={{ background: bg }}>
      <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl w-full">
        {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-[0.3em] uppercase font-medium mb-6" style={{ color: accent }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.9]" style={{ color: ink }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-5 text-xl md:text-2xl font-light italic" style={{ color: `${ink}70` }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-5 text-base leading-relaxed max-w-xl mx-auto" style={{ color: `${ink}65` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex flex-wrap justify-center gap-3">
          {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
        </motion.div>
        <motion.div variants={rise} className="mt-8">
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </motion.div>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2"><ScrollCue ink={ink} /></div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 2 — Split: text left, decorative right
═══════════════════════════════════════════════════ */
export function Hero2({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[85vh] flex flex-col md:flex-row" style={{ background: bg }}>
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-24">
        <motion.div initial="initial" animate="animate" variants={stagger}>
          {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-[0.3em] uppercase font-medium mb-6 inline-flex items-center gap-2" style={{ color: accent }}>
            <span className="h-px w-6" style={{ background: accent }} />
            <Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" />
          </motion.div>}
          <motion.div variants={rise}>
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-5xl md:text-7xl font-black tracking-tight leading-[0.9]" style={{ color: ink }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-4 text-xl font-medium" style={{ color: accent }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-base leading-relaxed max-w-sm" style={{ color: `${ink}65` }} />
          </motion.div>
          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3 items-center">
            {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
            <MetaRow props={props} ink={ink} onChange={onChange} />
          </motion.div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="w-full md:w-[45%] min-h-[300px] flex items-center justify-center" style={{ background: `${accent}12` }}>
        <div className="text-center p-12">
          <div className="text-8xl font-display font-black opacity-10" style={{ color: ink }}>{props.name?.split(" ")[0]?.[0]}{props.name?.split(" ")[1]?.[0]}</div>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="mt-4 h-20 w-20 mx-auto rounded-full border-2 border-dashed flex items-center justify-center" style={{ borderColor: `${accent}40` }}>
            <div className="h-3 w-3 rounded-full" style={{ background: accent }} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 3 — Full bleed dark gradient, bold and dramatic
═══════════════════════════════════════════════════ */
export function Hero3({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-8 md:px-16 py-28 text-center overflow-hidden" style={{ background: `linear-gradient(160deg, ${ink} 0%, ${accent}30 100%)` }}>
      {/* ambient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: accent }} />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative z-10 max-w-4xl w-full">
        {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-[0.3em] uppercase font-medium mb-6" style={{ color: `${bg}60` }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-6xl md:text-9xl font-black tracking-tight leading-[0.88]" style={{ color: bg }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-6 text-xl md:text-2xl" style={{ color: `${bg}80` }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-base leading-relaxed max-w-lg mx-auto" style={{ color: `${bg}60` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-10 flex flex-wrap justify-center gap-4">
          {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex justify-center">
          <MetaRow props={props} ink={bg} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 4 — Terminal / Developer style
═══════════════════════════════════════════════════ */
export function Hero4({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[80vh] flex items-center px-8 md:px-16 py-24" style={{ background: ink, fontFamily: "monospace" }}>
      <motion.div initial="initial" animate="animate" variants={stagger} className="w-full max-w-3xl">
        <motion.div variants={rise} className="rounded-t-xl px-4 py-3 flex items-center gap-2" style={{ background: `${bg}12` }}>
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          <span className="ml-4 text-xs" style={{ color: `${bg}50` }}>~/{props.name?.toLowerCase().replace(/ /g, "_")}</span>
        </motion.div>
        <div className="rounded-b-xl p-8 md:p-12" style={{ background: `${bg}08`, border: `1px solid ${bg}15` }}>
          <motion.div variants={rise} className="text-xs mb-1" style={{ color: `${bg}50` }}><span style={{ color: accent }}>❯</span> cat about.txt</motion.div>
          <motion.div variants={rise} className="mt-4">
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="text-4xl md:text-6xl font-black" style={{ color: bg }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-2 text-lg" style={{ color: accent }} />
          </motion.div>
          <motion.div variants={rise} className="mt-1 text-xs" style={{ color: `${bg}40` }}>—</motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-3 text-sm leading-relaxed" style={{ color: `${bg}70` }} />
          </motion.div>
          <motion.div variants={rise} className="mt-6 flex flex-wrap gap-3 items-center">
            {props.primaryCta && (
              <motion.div whileHover={{ scale: 1.04 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm cursor-pointer" style={{ background: accent, color: ink }}>
                <span style={{ color: ink }}>❯</span>
                <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
              </motion.div>
            )}
          </motion.div>
          {(props.location || props.availability) && (
            <motion.div variants={rise} className="mt-6 flex flex-wrap gap-4 text-xs" style={{ color: `${bg}50` }}>
              {props.location && <span><span style={{ color: accent }}>location</span>: <Editable value={props.location} onChange={(v) => onChange({ location: v })} className="inline" /></span>}
              {props.availability && <span><span style={{ color: accent }}>status</span>: <Editable value={props.availability} onChange={(v) => onChange({ availability: v })} className="inline" /></span>}
            </motion.div>
          )}
          <motion.div variants={rise} className="mt-6 text-xs" style={{ color: `${bg}30` }}>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>▌</motion.span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 5 — Massive marquee name, motion blur
═══════════════════════════════════════════════════ */
export function Hero5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden py-20" style={{ background: bg }}>
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
        <motion.div animate={{ x: [0, -300] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex gap-8 whitespace-nowrap text-[18vw] font-black font-display leading-none tracking-tight" style={{ color: `${ink}05` }}>
          {[1, 2, 3].map((k) => <span key={k}>{props.name}&nbsp;&nbsp;</span>)}
        </motion.div>
      </div>
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative z-10 px-8 md:px-16">
        {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-[0.3em] uppercase font-medium mb-4" style={{ color: accent }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-5xl md:text-8xl font-black tracking-tight leading-[0.9]" style={{ color: ink }} />
        </motion.div>
        <motion.div variants={rise} className="mt-4 max-w-xl">
          <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="text-2xl font-semibold" style={{ color: accent }} />
        </motion.div>
        <motion.div variants={rise} className="mt-3 max-w-md">
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="text-base leading-relaxed" style={{ color: `${ink}65` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex flex-wrap gap-4 items-center">
          {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 6 — Service professional (electrician, plumber, tradesperson)
═══════════════════════════════════════════════════ */
export function Hero6({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[85vh] flex flex-col" style={{ background: bg }}>
      <div className="flex-1 grid md:grid-cols-2 gap-0">
        <div className="flex flex-col justify-center px-8 md:px-16 py-20">
          <motion.div initial="initial" animate="animate" variants={stagger}>
            {props.eyebrow && <motion.div variants={rise} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ background: `${accent}18`, color: accent }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              <Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" />
            </motion.div>}
            <motion.div variants={rise}>
              <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-5xl md:text-6xl font-black tracking-tight leading-tight" style={{ color: ink }} />
            </motion.div>
            <motion.div variants={rise}>
              <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 text-xl font-semibold" style={{ color: accent }} />
            </motion.div>
            <motion.div variants={rise}>
              <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-base leading-relaxed" style={{ color: `${ink}65` }} />
            </motion.div>
            <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3">
              {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
            </motion.div>
            <motion.div variants={rise} className="mt-6"><MetaRow props={props} ink={ink} onChange={onChange} /></motion.div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative flex items-center justify-center min-h-[280px]" style={{ background: `linear-gradient(135deg, ${accent}18, ${accent}08)` }}>
          <div className="text-center">
            <div className="text-9xl font-black opacity-10 font-display" style={{ color: ink }}>#1</div>
            <div className="mt-2 text-xs uppercase tracking-widest" style={{ color: accent }}>Trusted Professional</div>
          </div>
          <div className="absolute bottom-8 right-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="h-14 w-14 rounded-full border-2 flex items-center justify-center" style={{ borderColor: `${accent}40` }}>
              <div className="h-2 w-2 rounded-full" style={{ background: accent }} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 7 — Big serif editorial, magazine-style
═══════════════════════════════════════════════════ */
export function Hero7({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[88vh] flex flex-col justify-end px-8 md:px-16 py-16 relative overflow-hidden" style={{ background: bg }}>
      <div className="absolute top-0 right-0 w-px h-full" style={{ background: `${ink}08` }} />
      <div className="absolute top-1/3 right-8 md:right-16 text-right max-w-xs hidden md:block">
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${ink}40` }}>The work</div>
        {props.availability && <Editable as="p" value={props.availability} onChange={(v) => onChange({ availability: v })} className="mt-1 text-xs" style={{ color: `${ink}60` }} />}
        {props.location && <Editable as="p" value={props.location} onChange={(v) => onChange({ location: v })} className="mt-1 text-xs" style={{ color: `${ink}60` }} />}
      </div>
      <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-5xl">
        {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-[0.3em] uppercase" style={{ color: `${ink}40` }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-[13vw] md:text-[10vw] font-black tracking-tight leading-[0.88] mt-2" style={{ color: ink }} />
        </motion.div>
        <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div variants={rise} className="max-w-md">
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="text-lg font-medium italic" style={{ color: accent }} />
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-2 text-sm leading-relaxed" style={{ color: `${ink}60` }} />
          </motion.div>
          <motion.div variants={rise}>
            {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 8 — Floating card on gradient background
═══════════════════════════════════════════════════ */
export function Hero8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[88vh] flex items-center justify-center px-6 md:px-16 py-24" style={{ background: `${ink}05`, backgroundImage: `radial-gradient(${accent}20 1px, transparent 1px)`, backgroundSize: "24px 24px" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -4 }} className="w-full max-w-2xl rounded-3xl p-10 md:p-14" style={{ background: bg, boxShadow: `0 30px 80px -20px ${ink}20` }}>
        <motion.div initial="initial" animate="animate" variants={stagger}>
          {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-[0.25em] uppercase font-medium" style={{ color: accent }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
          <motion.div variants={rise} className="mt-4">
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-5xl md:text-6xl font-black tracking-tight leading-tight" style={{ color: ink }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 text-lg font-medium" style={{ color: accent }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed" style={{ color: `${ink}65` }} />
          </motion.div>
          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3 items-center">
            {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
            <MetaRow props={props} ink={ink} onChange={onChange} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 9 — Diagonal split, two tone
═══════════════════════════════════════════════════ */
export function Hero9({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(125deg, ${accent}18 0%, transparent 60%)` }} />
      <div className="absolute top-0 right-0 bottom-0 w-1/3 hidden md:block" style={{ background: `${ink}04` }} />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative z-10 px-8 md:px-16 py-20 max-w-4xl">
        {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-[0.3em] uppercase font-bold mb-6 inline-flex items-center gap-2" style={{ color: accent }}>
          <span className="h-px w-8" style={{ background: accent }} />
          <Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" />
        </motion.div>}
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.88]" style={{ color: ink }} />
        </motion.div>
        <motion.div variants={rise} className="mt-2">
          <Editable as="h2" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="text-2xl font-light italic" style={{ color: accent }} />
        </motion.div>
        <motion.div variants={rise} className="mt-5 max-w-lg">
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="text-base leading-relaxed" style={{ color: `${ink}65` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex flex-wrap gap-4 items-center">
          {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 10 — Minimal side-by-side, content left / stats right
═══════════════════════════════════════════════════ */
export function Hero10({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[75vh] flex flex-col md:flex-row gap-0" style={{ background: bg, borderBottom: `1px solid ${ink}10` }}>
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-20" style={{ borderRight: `1px solid ${ink}08` }}>
        <motion.div initial="initial" animate="animate" variants={stagger}>
          {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-widest uppercase font-medium mb-8" style={{ color: `${ink}50` }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
          <motion.div variants={rise}>
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-5xl md:text-6xl font-black tracking-tight leading-tight" style={{ color: ink }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 text-xl font-medium" style={{ color: accent }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed max-w-sm" style={{ color: `${ink}60` }} />
          </motion.div>
          <motion.div variants={rise} className="mt-8">
            {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
          </motion.div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex flex-col justify-center gap-6 px-8 md:px-12 py-16 md:w-80">
        <MetaRow props={props} ink={ink} onChange={onChange} />
        <div className="flex flex-col gap-3">
          {["Experience", "Projects", "Happy Clients"].map((label, i) => (
            <div key={i} className="flex items-center justify-between py-3" style={{ borderBottom: `1px solid ${ink}08` }}>
              <span className="text-xs" style={{ color: `${ink}50` }}>{label}</span>
              <span className="font-display text-2xl font-black" style={{ color: ink }}>{[5, 30, 100][i]}+</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 11 — Creative / Designer portfolio, polaroid tilt
═══════════════════════════════════════════════════ */
export function Hero11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[88vh] flex flex-col md:flex-row items-center gap-12 px-8 md:px-16 py-24" style={{ background: bg }}>
      <motion.div initial={{ opacity: 0, rotate: -6 }} animate={{ opacity: 1, rotate: -3 }} transition={{ duration: 0.8 }} whileHover={{ rotate: 0, scale: 1.02 }} className="shrink-0 w-56 h-72 rounded-2xl flex items-center justify-center" style={{ background: `${accent}15`, border: `3px solid ${bg}`, boxShadow: `8px 8px 0 ${ink}12` }}>
        <div className="text-center px-6">
          <div className="text-6xl font-display font-black" style={{ color: accent }}>{props.name?.[0]}</div>
          <div className="mt-2 text-xs" style={{ color: `${ink}50` }}>✦ portfolio</div>
        </div>
      </motion.div>
      <motion.div initial="initial" animate="animate" variants={stagger} className="flex-1">
        {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-widest uppercase font-medium mb-4" style={{ color: accent }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-5xl md:text-7xl font-black tracking-tight leading-tight" style={{ color: ink }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 text-lg font-medium" style={{ color: accent }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-base leading-relaxed max-w-lg" style={{ color: `${ink}65` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3 items-center">
          {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 12 — Typewriter / animated caret, mono
═══════════════════════════════════════════════════ */
export function Hero12({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[85vh] flex items-center px-8 md:px-16 py-24" style={{ background: bg }}>
      <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl w-full">
        <motion.div variants={rise} className="text-sm font-mono mb-2" style={{ color: `${ink}40` }}><span style={{ color: accent }}>$</span> whoami</motion.div>
        <motion.div variants={rise} className="flex items-end gap-1">
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.9]" style={{ color: ink }} />
          <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="mb-2 text-6xl md:text-8xl font-black leading-[0.9]" style={{ color: accent }}>_</motion.span>
        </motion.div>
        <motion.div variants={rise} className="mt-4 flex items-center gap-2 font-mono text-sm">
          <span style={{ color: accent }}>→</span>
          <Editable as="span" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="inline" style={{ color: `${ink}75` }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-5 text-base leading-relaxed max-w-xl" style={{ color: `${ink}60` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex flex-wrap gap-4 items-center">
          {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 13 — Brutalist, thick borders, bold
═══════════════════════════════════════════════════ */
export function Hero13({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[88vh] flex items-center px-8 md:px-16 py-20" style={{ background: bg }}>
      <div className="w-full max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="p-8 md:p-14 border-4" style={{ borderColor: ink, borderRadius: 0 }}>
            {props.eyebrow && <div className="text-xs font-black uppercase tracking-widest mb-6 px-2 py-1 inline-block" style={{ background: accent, color: bg }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></div>}
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-6xl md:text-9xl font-black tracking-tight leading-[0.85] uppercase" style={{ color: ink }} />
            <div className="mt-4 h-1 w-full" style={{ background: ink }} />
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-4 text-2xl font-black uppercase" style={{ color: accent }} />
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-base leading-relaxed" style={{ color: `${ink}70` }} />
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              {props.primaryCta && (
                <motion.div whileHover={{ backgroundColor: ink, color: bg }} className="px-8 py-3 border-2 font-black uppercase text-sm cursor-pointer transition-colors" style={{ borderColor: ink, color: ink, borderRadius: 0 }}>
                  <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
                </motion.div>
              )}
              <MetaRow props={props} ink={ink} onChange={onChange} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 14 — Blurred orb ambient light background
═══════════════════════════════════════════════════ */
export function Hero14({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 md:px-16 py-28 overflow-hidden text-center" style={{ background: bg }}>
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[100px] pointer-events-none" style={{ background: accent }} />
      <motion.div animate={{ x: [0, 80, 0], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full blur-3xl pointer-events-none" style={{ background: ink }} />
      <motion.div initial="initial" animate="animate" variants={stagger} className="relative z-10 max-w-3xl w-full">
        {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-widest uppercase font-medium mb-6" style={{ color: `${ink}50` }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
        <motion.div variants={rise}>
          <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.9]" style={{ color: ink }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-5 text-xl md:text-2xl" style={{ color: `${ink}70` }} />
        </motion.div>
        <motion.div variants={rise}>
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-base leading-relaxed max-w-xl mx-auto" style={{ color: `${ink}55` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-10 flex flex-wrap justify-center gap-4">
          {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex justify-center">
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 15 — Bordered frame with corner decoration
═══════════════════════════════════════════════════ */
export function Hero15({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[88vh] flex items-center justify-center px-6 md:px-16 py-24" style={{ background: bg }}>
      <div className="relative w-full max-w-4xl">
        {/* corner brackets */}
        {[["top-0 left-0", "border-t-2 border-l-2"], ["top-0 right-0", "border-t-2 border-r-2"], ["bottom-0 left-0", "border-b-2 border-l-2"], ["bottom-0 right-0", "border-b-2 border-r-2"]].map(([pos, border], i) => (
          <div key={i} className={`absolute ${pos} h-12 w-12 ${border}`} style={{ borderColor: accent }} />
        ))}
        <div className="p-12 md:p-20">
          <motion.div initial="initial" animate="animate" variants={stagger} className="text-center">
            {props.eyebrow && <motion.div variants={rise} className="text-[10px] tracking-[0.4em] uppercase" style={{ color: `${ink}50` }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
            <motion.div variants={rise} className="mt-6">
              <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.9]" style={{ color: ink }} />
            </motion.div>
            <motion.div variants={rise} className="mt-4">
              <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="text-xl italic font-medium" style={{ color: accent }} />
            </motion.div>
            <motion.div variants={rise} className="mt-4">
              <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="text-base leading-relaxed max-w-lg mx-auto" style={{ color: `${ink}60` }} />
            </motion.div>
            <motion.div variants={rise} className="mt-10 flex flex-wrap justify-center gap-4">
              {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
            </motion.div>
            <motion.div variants={rise} className="mt-8 flex justify-center">
              <MetaRow props={props} ink={ink} onChange={onChange} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 16 — Pull-quote editorial split
═══════════════════════════════════════════════════ */
export function Hero16({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[85vh] grid md:grid-cols-[1fr_2fr] gap-0" style={{ background: bg }}>
      <div className="hidden md:flex flex-col justify-end px-8 py-16" style={{ borderRight: `1px solid ${ink}10` }}>
        <div className="text-[10px] tracking-widest uppercase rotate-180" style={{ writingMode: "vertical-lr", color: `${ink}40` }}>Portfolio</div>
        <div className="mt-auto">
          <MetaRow props={props} ink={ink} onChange={onChange} />
        </div>
      </div>
      <div className="flex flex-col justify-center px-8 md:px-16 py-20">
        <motion.div initial="initial" animate="animate" variants={stagger}>
          {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-widest uppercase font-medium mb-4" style={{ color: accent }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
          <motion.div variants={rise}>
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.88]" style={{ color: ink }} />
          </motion.div>
          <motion.div variants={rise} className="mt-6 pl-6" style={{ borderLeft: `3px solid ${accent}` }}>
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="text-2xl font-light italic" style={{ color: `${ink}80` }} />
          </motion.div>
          <motion.div variants={rise} className="mt-5 max-w-lg">
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="text-base leading-relaxed" style={{ color: `${ink}60` }} />
          </motion.div>
          <motion.div variants={rise} className="mt-8">
            {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 17 — Sidebar vertical label + main content
═══════════════════════════════════════════════════ */
export function Hero17({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[88vh] flex" style={{ background: bg }}>
      <div className="hidden md:flex flex-col items-center py-16 px-4 gap-6" style={{ background: `${ink}04`, borderRight: `1px solid ${ink}08`, width: 56 }}>
        <div className="text-[9px] font-mono tracking-[0.4em] uppercase rotate-180" style={{ writingMode: "vertical-lr", color: `${ink}40` }}>Portfolio 2025</div>
        <div className="flex-1 w-px" style={{ background: `${ink}10` }} />
        <div className="h-6 w-6 rounded-full" style={{ background: `${accent}30` }} />
      </div>
      <div className="flex-1 flex items-center px-8 md:px-16 py-20">
        <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-3xl w-full">
          {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-widest uppercase font-medium mb-6 inline-flex items-center gap-3" style={{ color: `${ink}50` }}>
            <span className="h-px w-8" style={{ background: `${ink}30` }} />
            <Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" />
          </motion.div>}
          <motion.div variants={rise}>
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.88]" style={{ color: ink }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-4 text-xl" style={{ color: accent }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-base leading-relaxed max-w-lg" style={{ color: `${ink}60` }} />
          </motion.div>
          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-4 items-center">
            {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
            <MetaRow props={props} ink={ink} onChange={onChange} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 18 — Dotted grid background card
═══════════════════════════════════════════════════ */
export function Hero18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center px-6 py-24 overflow-hidden" style={{ backgroundImage: `radial-gradient(${ink}18 1.5px, transparent 1.5px)`, backgroundSize: "22px 22px" }}>
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-2xl rounded-3xl p-10 md:p-14" style={{ background: bg, boxShadow: `0 40px 100px -30px ${ink}25` }}>
        <motion.div initial="initial" animate="animate" variants={stagger}>
          {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-widest uppercase font-medium" style={{ color: accent }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
          <motion.div variants={rise} className="mt-4">
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-5xl md:text-7xl font-black tracking-tight leading-tight" style={{ color: ink }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 text-lg font-semibold" style={{ color: accent }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="mt-4 text-sm leading-relaxed" style={{ color: `${ink}65` }} />
          </motion.div>
          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-3 items-center">
            {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
            <MetaRow props={props} ink={ink} onChange={onChange} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 19 — Outline stroke text, dark canvas
═══════════════════════════════════════════════════ */
export function Hero19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 md:px-16 py-28 text-center" style={{ background: ink }}>
      <motion.div initial="initial" animate="animate" variants={stagger} className="max-w-5xl w-full">
        {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-[0.3em] uppercase" style={{ color: `${bg}50` }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
        <motion.div variants={rise} className="mt-4">
          <motion.div initial={{ WebkitTextStroke: `2px ${bg}`, color: "transparent" } as any} whileHover={{ color: bg }} transition={{ duration: 0.4 }}>
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-[16vw] md:text-[12vw] font-black tracking-tight leading-[0.85]" style={{ color: "transparent", WebkitTextStroke: `2px ${bg}` }} />
          </motion.div>
        </motion.div>
        <motion.div variants={rise} className="mt-5">
          <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="text-xl md:text-2xl font-light" style={{ color: accent }} />
        </motion.div>
        <motion.div variants={rise} className="mt-4 max-w-lg mx-auto">
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="text-base leading-relaxed" style={{ color: `${bg}60` }} />
        </motion.div>
        <motion.div variants={rise} className="mt-10 flex flex-wrap justify-center gap-4">
          {props.primaryCta && (
            <motion.div whileHover={{ scale: 1.05 }} className="px-8 py-3 rounded-full font-semibold text-sm cursor-pointer border" style={{ borderColor: bg, color: bg }}>
              <Editable value={props.primaryCta} onChange={(v) => onChange({ primaryCta: v })} className="inline" />
            </motion.div>
          )}
        </motion.div>
        <motion.div variants={rise} className="mt-8 flex justify-center">
          <MetaRow props={props} ink={bg} onChange={onChange} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HERO 20 — Compact banner strip, horizontal
═══════════════════════════════════════════════════ */
export function Hero20({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-[60vh] flex flex-col justify-center px-8 md:px-16 py-20" style={{ background: bg, borderBottom: `1px solid ${ink}10` }}>
      <motion.div initial="initial" animate="animate" variants={stagger} className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 max-w-6xl w-full">
        <div className="flex-1">
          {props.eyebrow && <motion.div variants={rise} className="text-xs tracking-widest uppercase font-medium mb-3" style={{ color: accent }}><Editable value={props.eyebrow} onChange={(v) => onChange({ eyebrow: v })} className="inline" /></motion.div>}
          <motion.div variants={rise}>
            <Editable as="h1" value={props.name} onChange={(v) => onChange({ name: v })} className="font-display text-5xl md:text-7xl font-black tracking-tight leading-tight" style={{ color: ink }} />
          </motion.div>
          <motion.div variants={rise}>
            <Editable as="p" value={props.tagline} onChange={(v) => onChange({ tagline: v })} className="mt-3 text-xl italic" style={{ color: accent }} />
          </motion.div>
        </div>
        <motion.div variants={rise} className="flex flex-col gap-4 md:items-end">
          <Editable as="p" value={props.bio} onChange={(v) => onChange({ bio: v })} className="text-sm leading-relaxed md:text-right max-w-xs" style={{ color: `${ink}65` }} />
          <div className="flex flex-wrap gap-3 items-center">
            {props.primaryCta && <CtaButton label={props.primaryCta} ink={ink} bg={bg} accent={accent} onChange={(v) => onChange({ primaryCta: v })} />}
            <MetaRow props={props} ink={ink} onChange={onChange} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
