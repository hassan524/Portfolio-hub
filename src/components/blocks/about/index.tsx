import { motion } from "framer-motion";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { AboutProps } from "@/types/builder.schema";

// See Hero.tsx for the full numbered design-system legend (1–20).
// About{N} always shares its visual DNA with Hero{N} / Projects{N} / Testimonials{N} / Footer{N}.

type Props = BlockComponentProps<AboutProps>;

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};
const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  viewport: { once: true, margin: "-80px" },
};
const child = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function Paragraphs({ props, ink, onChange, className, style }: { props: AboutProps; ink: string; onChange: Props["onChange"]; className?: string; style?: React.CSSProperties }) {
  return (
    <>
      {props.paragraphs?.map((p, i) => (
        <Editable
          key={i}
          as="p"
          value={p}
          onChange={(v) => {
            const next = [...props.paragraphs];
            next[i] = v;
            onChange({ paragraphs: next });
          }}
          className={className}
          style={{ color: `${ink}80`, ...style }}
        />
      ))}
    </>
  );
}

function SkillPills({ skills, ink, accent, tone = "outline" }: { skills?: string[]; ink: string; accent: string; tone?: "outline" | "solid" | "tinted" }) {
  if (!skills?.length) return null;
  return (
    <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="mt-5 flex flex-wrap gap-2">
      {skills.map((s, i) => {
        const base = "text-xs px-3 py-1 rounded-full cursor-default";
        if (tone === "solid") return <motion.span key={i} variants={child} whileHover={{ y: -2 }} className={base} style={{ background: ink, color: "#fff" }}>{s}</motion.span>;
        if (tone === "tinted") return <motion.span key={i} variants={child} whileHover={{ y: -2, scale: 1.04 }} className={base} style={{ background: `${accent}18`, color: accent }}>{s}</motion.span>;
        return <motion.span key={i} variants={child} whileHover={{ y: -2, borderColor: accent, color: accent }} className={`${base} border`} style={{ borderColor: `${ink}20`, color: `${ink}90` }}>{s}</motion.span>;
      })}
    </motion.div>
  );
}

function ExperienceRows({ experience, ink, accent }: { experience?: AboutProps["experience"]; ink: string; accent: string }) {
  if (!experience?.length) return null;
  return (
    <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="mt-6 space-y-0">
      {experience.map((e, i) => (
        <motion.div key={i} variants={child} className="flex items-baseline gap-3 text-sm py-2.5" style={{ borderTop: i > 0 ? `1px solid ${ink}10` : undefined }}>
          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
          <span className="flex-1" style={{ color: ink }}>{e.role} · {e.co}</span>
          <span className="text-xs shrink-0" style={{ color: `${ink}55` }}>{e.yr}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function SectionLabel({ children, ink, accent, className = "text-[10px] tracking-[0.25em]" }: { children: React.ReactNode; ink?: string; accent: string; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`${className} uppercase font-medium inline-flex items-center gap-2`} style={{ color: accent }}>
      <span className="h-1 w-1 rounded-full" style={{ background: accent }} />
      {children}
    </motion.div>
  );
}

/* ---------- About1: Classic Centered ---------- */
export function About1({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 text-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto">
        <SectionLabel accent={accent}>About</SectionLabel>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-[15px] leading-relaxed mx-auto max-w-lg" />
        <div className="flex justify-center"><SkillPills skills={props.skills} ink={ink} accent={accent} /></div>
        <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- About2: Split Portrait ---------- */
export function About2({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20 grid md:grid-cols-2 gap-10 items-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <SectionLabel accent={accent} className="text-[10px] tracking-[0.25em]">About</SectionLabel>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-3xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed max-w-md" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-3xl aspect-[4/5]"
        style={{ background: `${accent}18` }}
      >
        <div className="h-full p-8 flex flex-col justify-end">
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About3: Fullbleed Gradient (dark inverted) ---------- */
export function About3({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: `linear-gradient(160deg, ${ink}, ${accent}30)` }}>
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-24 -left-24 h-[320px] w-[320px] rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: accent }} />
      <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative max-w-2xl">
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}70` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl md:text-5xl tracking-tight" style={{ color: bg }} />
        {props.paragraphs?.map((p, i) => (
          <Editable key={i} as="p" value={p} onChange={(v) => { const next = [...props.paragraphs]; next[i] = v; onChange({ paragraphs: next }); }} className="mt-4 text-sm leading-relaxed max-w-xl" style={{ color: `${bg}85` }} />
        ))}
        <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="mt-5 flex flex-wrap gap-2">
          {props.skills?.map((s, i) => (
            <motion.span key={i} variants={child} whileHover={{ y: -2, borderColor: bg }} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: `${bg}30`, color: `${bg}90` }}>{s}</motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- About4: Terminal ---------- */
export function About4({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20">
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}20`, background: `${ink}05` }}>
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${ink}15` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-2 text-[10px] font-mono" style={{ color: `${ink}40` }}>about.tsx</span>
        </div>
        <div className="p-6 font-mono text-sm leading-relaxed" style={{ color: ink }}>
          <div style={{ color: `${ink}50` }}>{"// " + props.heading}</div>
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-3" />
          <div className="mt-4 space-y-1">
            {props.skills?.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <span style={{ color: accent }}>-</span> {s}
              </motion.div>
            ))}
          </div>
          <div className="mt-4 space-y-1" style={{ color: `${ink}60` }}>
            {props.experience?.map((e, i) => (<div key={i}>{e.yr} :: {e.role} @ {e.co}</div>))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About5: Marquee (skills scroll) ---------- */
export function About5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const track = [...(props.skills ?? []), ...(props.skills ?? [])];
  return (
    <section className="py-20 overflow-hidden" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16"><div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>About</div></div>
      {track.length > 0 && (
        <div className="mt-3 overflow-hidden whitespace-nowrap">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} className="inline-flex font-display text-4xl md:text-6xl">
            {track.map((s, i) => (<span key={i} className="mx-6" style={{ color: i % 2 === 0 ? ink : accent }}>{s}</span>))}
          </motion.div>
        </div>
      )}
      <div className="px-8 md:px-16 mt-6">
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-2xl" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-3 text-sm leading-relaxed max-w-lg" />
        <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
      </div>
    </section>
  );
}

/* ---------- About6: Tight Minimal Stack ---------- */
export function About6({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-16 border-b" style={{ borderColor: `${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-xl">
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-2 font-display text-3xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- About7: Big Serif Editorial (drop cap) ---------- */
export function About7({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const first = props.paragraphs?.[0] ?? "";
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${ink}55` }}>About</div>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-1 font-display leading-[0.9] text-[9vw] md:text-[5vw] tracking-tight" style={{ color: ink }} />
      </motion.div>
      <div className="mt-6 max-w-2xl flex gap-4">
        <span className="font-display text-7xl leading-none" style={{ color: accent }}>{first.charAt(0)}</span>
        <p className="text-sm leading-relaxed mt-2" style={{ color: `${ink}80` }}>{first.slice(1)}</p>
      </div>
      <SkillPills skills={props.skills} ink={ink} accent={accent} />
    </section>
  );
}

/* ---------- About8: Floating Card ---------- */
export function About8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ background: `${accent}18` }}>
      <motion.div
        {...fadeUp}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto rounded-3xl p-10 md:p-14 shadow-lift"
        style={{ background: bg }}
      >
        <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15, type: "spring" }} className="h-14 w-14 rounded-2xl mb-6" style={{ background: accent }} />
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-3xl md:text-4xl leading-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
        <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- About9: Diagonal Split ---------- */
export function About9({ props, theme, onChange }: Props) {
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
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="relative grid md:grid-cols-2 gap-10">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>About</div>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl tracking-tight" style={{ color: ink }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed" />
        </div>
        <div>
          <SkillPills skills={props.skills} ink={ink} accent={accent} tone="tinted" />
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About10: Minimal Side-by-Side ---------- */
export function About10({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20 flex items-start justify-between gap-10 flex-wrap" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-lg">
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-3xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed" />
      </motion.div>
      <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex flex-col items-end gap-1.5 text-xs shrink-0 max-w-xs text-right" style={{ color: `${ink}60` }}>
        {props.skills?.slice(0, 6).map((s, i) => <motion.span key={i} variants={child}>{s}</motion.span>)}
      </motion.div>
    </section>
  );
}

/* ---------- About11: Polaroid Tilt ---------- */
export function About11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-[1fr_240px] gap-12 items-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed max-w-md" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
      </motion.div>
      <motion.div initial={{ rotate: 5, opacity: 0, y: 10 }} whileInView={{ rotate: 3, opacity: 1, y: 0 }} whileHover={{ rotate: 0, scale: 1.03 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-lg p-3 shadow-lift" style={{ background: bg, border: `1px solid ${ink}15` }}>
        <div className="aspect-square rounded-sm" style={{ background: `${accent}25` }} />
        <div className="mt-3 text-center text-xs" style={{ color: `${ink}60` }}>{props.experience?.[0]?.co ?? props.heading}</div>
      </motion.div>
    </section>
  );
}

/* ---------- About12: Typewriter Mono ---------- */
export function About12({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="font-mono text-xs" style={{ color: `${ink}50` }}>{"> about"}</div>
      <div className="mt-3 font-mono text-2xl md:text-3xl" style={{ color: ink }}>
        <Editable value={props.heading} onChange={(v) => onChange({ heading: v })} className="inline" />
        <motion.span animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }} className="inline-block w-[2px] h-[0.9em] ml-1 align-middle" style={{ background: accent }} />
      </div>
      <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-sm leading-relaxed font-mono max-w-lg" style={{ color: `${ink}75` }} />
      <div className="mt-6 font-mono text-xs space-y-1" style={{ color: `${ink}70` }}>
        {props.skills?.map((s, i) => (<div key={i}><span style={{ color: accent }}>-</span> {s}</div>))}
      </div>
    </section>
  );
}

/* ---------- About13: Brutalist ---------- */
export function About13({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-16" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative max-w-3xl p-10" style={{ border: `3px solid ${ink}` }}>
        <span className="absolute -top-3 -left-3 h-6 w-6" style={{ borderTop: `3px solid ${accent}`, borderLeft: `3px solid ${accent}` }} />
        <div className="inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold" style={{ background: ink, color: bg }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-5 font-display text-4xl md:text-5xl leading-[0.95] uppercase tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed max-w-lg" style={{ color: `${ink}90` }} />
        <div className="mt-6 flex flex-wrap gap-0">
          {props.skills?.map((s, i) => (
            <motion.span key={i} whileHover={{ backgroundColor: ink, color: bg }} className="px-4 py-2 text-xs font-bold uppercase" style={{ border: `2px solid ${ink}`, borderLeft: i > 0 ? "none" : undefined }}>{s}</motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About14: Blurred Orb ---------- */
export function About14({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 -left-20 h-[380px] w-[380px] rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: accent }} />
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="relative max-w-2xl">
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl md:text-5xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- About15: Bordered Frame ---------- */
export function About15({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="p-6 md:p-10">
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative rounded-2xl px-8 md:px-16 py-16" style={{ border: `1px solid ${ink}18` }}>
        <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.25, type: "spring" }} className="absolute top-4 right-4 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: `${accent}20`, color: accent }}>{props.experience?.[0]?.yr ?? "Now"}</motion.span>
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed max-w-lg" />
        <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- About16: Pull-quote Two-Col ---------- */
export function About16({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-3xl tracking-tight" style={{ color: ink }} />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="relative">
        <span className="absolute -top-6 -left-2 font-display text-6xl opacity-15" style={{ color: accent }}>"</span>
        <Paragraphs props={props} ink={ink} onChange={onChange} className="relative font-display text-2xl italic leading-snug" style={{ color: accent }} />
        <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- About17: Sidebar Vertical ---------- */
export function About17({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="flex flex-col md:flex-row" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="md:w-1/4 flex items-center justify-center p-10" style={{ background: `${ink}06` }}>
        <div className="md:-rotate-90 whitespace-nowrap font-display text-2xl tracking-tight" style={{ color: ink }}>About</div>
      </div>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex-1 px-8 md:px-16 py-16">
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-3xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed max-w-md" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
        <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- About18: Dotted Grid ---------- */
export function About18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-24" style={{ backgroundImage: `radial-gradient(${ink}22 1px, transparent 1px)`, backgroundSize: "18px 18px" }}>
      <motion.div {...fadeUp} whileHover={{ y: -3 }} transition={{ duration: 0.5 }} className="max-w-2xl rounded-2xl p-10" style={{ background: bg }}>
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}60` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-sm leading-relaxed" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- About19: Outline Stroke (dark) ---------- */
export function About19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 text-center" style={{ background: ink }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}60` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-5xl md:text-6xl leading-[0.95] tracking-tight" style={{ color: "transparent", WebkitTextStroke: `1.2px ${bg}` }} />
        <p className="mt-5 text-sm leading-relaxed max-w-lg mx-auto" style={{ color: `${bg}85` }}>{props.paragraphs?.[0]}</p>
        <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="mt-5 flex flex-wrap justify-center gap-2">
          {props.skills?.map((s, i) => (
            <motion.span key={i} variants={child} whileHover={{ y: -2 }} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: `${bg}30`, color: `${bg}90` }}>{s}</motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- About20: Compact Banner ---------- */
export function About20({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-10 flex flex-wrap items-center justify-between gap-6" style={{ borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}>
      <div className="max-w-md">
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-xl tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-1 text-sm leading-relaxed" />
      </div>
      <div className="flex flex-wrap gap-2">
        {props.skills?.slice(0, 4).map((s, i) => (<span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: `${accent}18`, color: accent }}>{s}</span>))}
      </div>
    </section>
  );
}