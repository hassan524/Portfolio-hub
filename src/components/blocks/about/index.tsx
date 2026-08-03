import { motion } from "framer-motion";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { AboutProps } from "@/types/builder.schema";

type Props = BlockComponentProps<AboutProps>;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const stagger = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  viewport: { once: true, margin: "-80px" },
};

const child = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

function Paragraphs({ props, ink, onChange, className }: { props: AboutProps; ink: string; onChange: Props["onChange"]; className?: string }) {
  return (
    <>
      {props.paragraphs?.map((p, i) => (
        <Editable
          key={i}
          as="p"
          value={p}
          onChange={(v) => {
            const next = [...(props.paragraphs ?? [])];
            next[i] = v;
            onChange({ paragraphs: next });
          }}
          className={className ?? "mt-4 text-base leading-relaxed"}
          style={{ color: `${ink}75` }}
        />
      ))}
    </>
  );
}

function Skills({ skills, ink, accent, bg, variant = "outline" }: { skills?: string[]; ink: string; accent: string; bg: string; variant?: "outline" | "solid" | "tinted" | "ghost" }) {
  if (!skills?.length) return null;
  return (
    <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="mt-5 flex flex-wrap gap-2">
      {skills.map((s, i) => {
        if (variant === "solid") return <motion.span key={i} variants={child} whileHover={{ scale: 1.05, y: -2 }} className="text-sm px-4 py-1.5 rounded-full font-medium cursor-default" style={{ background: ink, color: bg }}>{s}</motion.span>;
        if (variant === "tinted") return <motion.span key={i} variants={child} whileHover={{ scale: 1.05, y: -2 }} className="text-sm px-4 py-1.5 rounded-full font-medium cursor-default" style={{ background: `${accent}18`, color: accent }}>{s}</motion.span>;
        if (variant === "ghost") return <motion.span key={i} variants={child} whileHover={{ backgroundColor: `${ink}08` }} className="text-sm px-4 py-1.5 rounded-lg cursor-default" style={{ color: `${ink}70` }}>{s}</motion.span>;
        return <motion.span key={i} variants={child} whileHover={{ borderColor: accent, color: accent, y: -2 }} className="text-sm px-4 py-1.5 rounded-full border cursor-default transition-colors" style={{ borderColor: `${ink}20`, color: `${ink}80` }}>{s}</motion.span>;
      })}
    </motion.div>
  );
}

function Experience({ experience, ink, accent, bg }: { experience?: AboutProps["experience"]; ink: string; accent: string; bg: string }) {
  if (!experience?.length) return null;
  return (
    <div className="mt-6 space-y-0">
      {experience.map((e, i) => (
        <motion.div key={i} variants={child} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex items-center gap-4 py-3" style={{ borderTop: `1px solid ${ink}08` }}>
          <div className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold" style={{ background: `${accent}18`, color: accent }}>{i + 1}</div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm" style={{ color: ink }}>{e.role}</div>
            <div className="text-xs" style={{ color: `${ink}55` }}>{e.co}</div>
          </div>
          <div className="text-xs shrink-0" style={{ color: `${ink}45` }}>{e.yr}</div>
        </motion.div>
      ))}
    </div>
  );
}

function SectionLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: accent }}>
      <span className="h-px w-5" style={{ background: accent }} />
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   ABOUT 1 — Classic Centered, spacious
══════════════════════════════════════════ */
export function About1({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28 text-center" style={{ background: bg }}>
      <motion.div {...fadeUp} className="max-w-3xl mx-auto">
        <SectionLabel accent={accent}>About</SectionLabel>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-5xl md:text-6xl font-black tracking-tight leading-tight" style={{ color: ink }} />
        <div className="mt-6 text-left">
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-3 text-lg leading-relaxed" />
        </div>
        <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="tinted" />
        <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 2 — Split: heading left, content right
══════════════════════════════════════════ */
export function About2({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16 items-start" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp}>
        <SectionLabel accent={accent}>About</SectionLabel>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-5xl md:text-6xl font-black tracking-tight leading-tight" style={{ color: ink }} />
        <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="outline" />
      </motion.div>
      <motion.div {...fadeUp} style={{ transitionDelay: "0.1s" }}>
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-0 text-base leading-relaxed" />
        <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 3 — Dark panel, light text
══════════════════════════════════════════ */
export function About3({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28 relative overflow-hidden" style={{ background: `linear-gradient(145deg, ${ink}, ${accent}25)` }}>
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: accent }} />
      <motion.div {...fadeUp} className="relative z-10 max-w-3xl">
        <SectionLabel accent={accent}>About Me</SectionLabel>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-5xl md:text-6xl font-black tracking-tight leading-tight" style={{ color: bg }} />
        <Paragraphs props={props} ink={bg} onChange={onChange} className="mt-5 text-lg leading-relaxed" />
        <Skills skills={props.skills} ink={bg} accent={accent} bg={ink} variant="outline" />
        <Experience experience={props.experience} ink={bg} accent={accent} bg={ink} />
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 4 — Grid skills showcase, big pills
══════════════════════════════════════════ */
export function About4({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <motion.div {...fadeUp} className="max-w-5xl mx-auto">
        <SectionLabel accent={accent}>Skills & Background</SectionLabel>
        <div className="mt-8 grid md:grid-cols-2 gap-12">
          <div>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ color: ink }} />
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-base leading-relaxed" />
          </div>
          <div>
            {props.skills && props.skills.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {props.skills.map((s, i) => (
                  <motion.div key={i} variants={child} initial="initial" whileInView="whileInView" viewport={{ once: true }} whileHover={{ scale: 1.03, y: -2 }} className="rounded-2xl p-4 flex items-center gap-3 cursor-default" style={{ background: i % 2 === 0 ? `${accent}12` : `${ink}05` }}>
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ background: accent }} />
                    <span className="text-sm font-medium" style={{ color: ink }}>{s}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 5 — Marquee skills ticker + bio
══════════════════════════════════════════ */
export function About5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const skillsList = props.skills ?? [];
  return (
    <section className="py-24 overflow-hidden" style={{ background: bg }}>
      <div className="px-8 md:px-16 mb-12">
        <motion.div {...fadeUp} className="max-w-3xl">
          <SectionLabel accent={accent}>About</SectionLabel>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-5xl md:text-6xl font-black tracking-tight leading-tight" style={{ color: ink }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-lg leading-relaxed" />
        </motion.div>
      </div>
      {skillsList.length > 0 && (
        <div className="relative flex overflow-hidden" style={{ borderTop: `1px solid ${ink}08`, borderBottom: `1px solid ${ink}08` }}>
          <motion.div animate={{ x: [0, "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="flex shrink-0 gap-8 py-5 pr-8">
            {[...skillsList, ...skillsList].map((s, i) => (
              <span key={i} className="flex items-center gap-4 whitespace-nowrap text-sm font-semibold" style={{ color: `${ink}60` }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      )}
      <div className="px-8 md:px-16 mt-10">
        <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 6 — Tight minimal, hairline rule
══════════════════════════════════════════ */
export function About6({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ background: bg }}>
      <div className="max-w-xl mx-auto">
        <motion.div {...fadeUp}>
          <div className="h-px w-full mb-10" style={{ background: `${ink}12` }} />
          <SectionLabel accent={accent}>About</SectionLabel>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl font-black tracking-tight" style={{ color: ink }} />
          <div className="mt-6 h-px" style={{ background: `${ink}08` }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-base leading-relaxed" />
          <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="ghost" />
          <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 7 — Big serif, oversized heading
══════════════════════════════════════════ */
export function About7({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: bg }}>
      <motion.div {...fadeUp} className="max-w-5xl">
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-[12vw] md:text-[9vw] font-black tracking-tight leading-[0.88] italic" style={{ color: ink }} />
        <div className="mt-8 flex flex-col md:flex-row gap-12 md:gap-24 items-start" style={{ borderTop: `1px solid ${ink}10` }}>
          <div className="md:w-1/2 pt-8">
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-0 text-base leading-relaxed" />
          </div>
          <div className="md:w-1/2 pt-8">
            <SectionLabel accent={accent}>Expertise</SectionLabel>
            <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="solid" />
            <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 8 — Two-column with stat cards
══════════════════════════════════════════ */
export function About8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const stats = [{ label: "Years Experience", val: "5+" }, { label: "Projects Done", val: "50+" }, { label: "Happy Clients", val: "40+" }, { label: "Awards", val: "3" }];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: `${ink}04` }}>
      <div className="max-w-5xl mx-auto">
        <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={child}>
            <SectionLabel accent={accent}>About</SectionLabel>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ color: ink }} />
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-base leading-relaxed" />
            <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="tinted" />
          </motion.div>
          <motion.div variants={child} className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: bg, border: `1px solid ${ink}10` }}>
                <div className="font-display text-4xl font-black" style={{ color: accent }}>{s.val}</div>
                <div className="mt-1 text-xs" style={{ color: `${ink}55` }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 9 — Diagonal accent backdrop
══════════════════════════════════════════ */
export function About9({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: bg }}>
      <div className="absolute -right-20 top-0 bottom-0 w-1/2 pointer-events-none" style={{ background: `${accent}08`, transform: "skewX(-8deg)" }} />
      <motion.div {...fadeUp} className="relative z-10 max-w-4xl grid md:grid-cols-2 gap-16 items-start">
        <div>
          <SectionLabel accent={accent}>About Me</SectionLabel>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-5xl font-black tracking-tight leading-tight" style={{ color: ink }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-base leading-relaxed" />
        </div>
        <div>
          <SectionLabel accent={accent}>Skills</SectionLabel>
          <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="outline" />
          <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 10 — Horizontal timeline experience
══════════════════════════════════════════ */
export function About10({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
          <div className="md:col-span-2">
            <SectionLabel accent={accent}>About</SectionLabel>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl md:text-5xl font-black tracking-tight leading-tight" style={{ color: ink }} />
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-base leading-relaxed" />
          </div>
          <div>
            <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="tinted" />
          </div>
        </div>
        {props.experience && props.experience.length > 0 && (
          <div>
            <div className="text-xs tracking-widest uppercase font-semibold mb-6" style={{ color: accent }}>Experience Timeline</div>
            <div className="relative">
              <div className="absolute top-3 left-0 right-0 h-px" style={{ background: `${ink}12` }} />
              <div className="flex gap-6 overflow-x-auto pb-4">
                {props.experience.map((e, i) => (
                  <div key={i} className="shrink-0 relative pt-8">
                    <div className="absolute top-1.5 left-0 h-3 w-3 rounded-full" style={{ background: i === 0 ? accent : `${ink}25` }} />
                    <div className="text-xs font-bold mt-2" style={{ color: ink }}>{e.role}</div>
                    <div className="text-xs mt-0.5" style={{ color: `${ink}55` }}>{e.co}</div>
                    <div className="text-xs mt-0.5 font-mono" style={{ color: accent }}>{e.yr}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 11 — Card with avatar placeholder
══════════════════════════════════════════ */
export function About11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 flex items-center justify-center" style={{ background: `${ink}04` }}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-4xl w-full rounded-3xl p-10 md:p-14 grid md:grid-cols-[auto_1fr] gap-10 items-start" style={{ background: bg, boxShadow: `0 30px 80px -20px ${ink}15` }}>
        <div className="shrink-0">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl flex items-center justify-center" style={{ background: `${accent}20` }}>
            <span className="font-display text-4xl font-black" style={{ color: accent }}>{props.heading?.[0] ?? "A"}</span>
          </div>
          <Skills skills={props.skills?.slice(0, 4)} ink={ink} accent={accent} bg={bg} variant="solid" />
        </div>
        <div>
          <SectionLabel accent={accent}>About</SectionLabel>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-4xl font-black tracking-tight" style={{ color: ink }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-base leading-relaxed" />
          <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 12 — Bento-style grid layout
══════════════════════════════════════════ */
export function About12({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <motion.div {...fadeUp} className="max-w-5xl mx-auto">
        <SectionLabel accent={accent}>About</SectionLabel>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-2 md:col-span-2 rounded-2xl p-8" style={{ background: `${ink}05`, border: `1px solid ${ink}08` }}>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-3xl md:text-4xl font-black tracking-tight" style={{ color: ink }} />
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-3 text-sm leading-relaxed" />
          </div>
          <div className="rounded-2xl p-8 flex flex-col justify-between" style={{ background: accent }}>
            <div className="font-display text-4xl font-black" style={{ color: bg }}>5+</div>
            <div className="text-xs font-semibold" style={{ color: `${bg}80` }}>Years of Excellence</div>
          </div>
          {(props.skills ?? []).slice(0, 6).map((s, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }} className="rounded-2xl p-5 flex items-center gap-3 cursor-default" style={{ background: i % 3 === 0 ? `${accent}12` : `${ink}04`, border: `1px solid ${ink}06` }}>
              <div className="h-2 w-2 rounded-full shrink-0" style={{ background: accent }} />
              <span className="text-sm font-medium" style={{ color: ink }}>{s}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 13 — Brutalist bold lines
══════════════════════════════════════════ */
export function About13({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <motion.div {...fadeUp} className="max-w-4xl">
        <div className="h-2 w-full" style={{ background: ink }} />
        <div className="py-8">
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.88] uppercase" style={{ color: ink }} />
        </div>
        <div className="h-2 w-full mb-10" style={{ background: ink }} />
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-0 text-base leading-relaxed" />
          </div>
          <div>
            <div className="font-black uppercase text-xs tracking-widest mb-4" style={{ color: accent }}>Skills</div>
            <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="solid" />
            <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 14 — Ambient glow bg
══════════════════════════════════════════ */
export function About14({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: bg }}>
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.14, 0.08] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-1/2 left-1/4 h-96 w-96 rounded-full blur-[80px] pointer-events-none" style={{ background: accent }} />
      <motion.div {...fadeUp} className="relative z-10 max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel accent={accent}>About</SectionLabel>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-5xl font-black tracking-tight leading-tight" style={{ color: ink }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-base leading-relaxed" />
        </div>
        <div>
          <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="tinted" />
          <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 15 — Bordered frame
══════════════════════════════════════════ */
export function About15({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <motion.div {...fadeUp} className="max-w-4xl mx-auto relative">
        {[["top-0 left-0", "border-t-2 border-l-2"], ["top-0 right-0", "border-t-2 border-r-2"], ["bottom-0 left-0", "border-b-2 border-l-2"], ["bottom-0 right-0", "border-b-2 border-r-2"]].map(([pos, border], i) => (
          <div key={i} className={`absolute ${pos} h-10 w-10 ${border}`} style={{ borderColor: accent }} />
        ))}
        <div className="p-10 md:p-16">
          <SectionLabel accent={accent}>About</SectionLabel>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-5xl font-black tracking-tight leading-tight" style={{ color: ink }} />
          <div className="mt-8 grid md:grid-cols-2 gap-10">
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-0 text-base leading-relaxed" />
            <div>
              <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="outline" />
              <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 16 — Pull quote layout
══════════════════════════════════════════ */
export function About16({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-[1fr_2fr] gap-0" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <div className="hidden md:flex flex-col justify-start px-0 py-0 pr-16 pt-2">
        <SectionLabel accent={accent}>About</SectionLabel>
        <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="tinted" />
      </div>
      <motion.div {...fadeUp}>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl md:text-6xl font-black tracking-tight leading-tight" style={{ color: ink }} />
        <div className="mt-6 pl-6" style={{ borderLeft: `3px solid ${accent}` }}>
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-0 text-lg leading-relaxed italic font-light" />
        </div>
        <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 17 — Sidebar vertical label
══════════════════════════════════════════ */
export function About17({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="flex" style={{ background: bg }}>
      <div className="hidden md:flex flex-col items-center py-16 px-4" style={{ background: `${ink}04`, borderRight: `1px solid ${ink}08`, minWidth: 56 }}>
        <div className="text-[9px] font-mono tracking-[0.4em] uppercase rotate-180 whitespace-nowrap" style={{ writingMode: "vertical-lr", color: `${ink}40` }}>About Me</div>
      </div>
      <div className="flex-1 px-8 md:px-16 py-24">
        <motion.div {...fadeUp} className="max-w-3xl">
          <SectionLabel accent={accent}>About</SectionLabel>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-5xl font-black tracking-tight leading-tight" style={{ color: ink }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-base leading-relaxed" />
          <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="tinted" />
          <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 18 — Dotted grid
══════════════════════════════════════════ */
export function About18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-24" style={{ backgroundImage: `radial-gradient(${ink}18 1.5px, transparent 1.5px)`, backgroundSize: "20px 20px" }}>
      <motion.div {...fadeUp} whileHover={{ y: -3 }} transition={{ duration: 0.5 }} className="max-w-3xl rounded-3xl p-10 md:p-14" style={{ background: bg, boxShadow: `0 20px 60px -15px ${ink}15` }}>
        <SectionLabel accent={accent}>About</SectionLabel>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-5xl font-black tracking-tight leading-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-4 text-base leading-relaxed" />
        <Skills skills={props.skills} ink={ink} accent={accent} bg={bg} variant="tinted" />
        <Experience experience={props.experience} ink={ink} accent={accent} bg={bg} />
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 19 — Outline stroke dark
══════════════════════════════════════════ */
export function About19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: ink }}>
      <motion.div {...fadeUp} className="max-w-4xl">
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}50` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-6xl md:text-8xl font-black tracking-tight leading-[0.88]" style={{ color: "transparent", WebkitTextStroke: `1.5px ${bg}` }} />
        <div className="mt-8 grid md:grid-cols-2 gap-10">
          <div>
            <Paragraphs props={props} ink={bg} onChange={onChange} className="mt-0 text-base leading-relaxed" />
          </div>
          <div>
            <Skills skills={props.skills} ink={bg} accent={accent} bg={ink} variant="outline" />
            <Experience experience={props.experience} ink={bg} accent={accent} bg={ink} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT 20 — Compact banner strip
══════════════════════════════════════════ */
export function About20({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-14 flex flex-wrap items-center justify-between gap-8" style={{ background: bg, borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}>
      <div className="max-w-lg">
        <SectionLabel accent={accent}>About</SectionLabel>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-2 font-display text-3xl font-black tracking-tight" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-2 text-sm leading-relaxed" />
      </div>
      <div className="flex flex-wrap gap-2">
        {(props.skills ?? []).slice(0, 6).map((s, i) => <span key={i} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: `${accent}18`, color: accent }}>{s}</span>)}
      </div>
    </section>
  );
}
