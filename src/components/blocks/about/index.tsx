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
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
        <SectionLabel accent={accent}>About</SectionLabel>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-3 font-display text-5xl md:text-6xl tracking-tight leading-[0.95]" style={{ color: ink }} />
        <div className="mt-2 mx-auto h-px w-16" style={{ background: `${accent}60` }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-6 text-base leading-relaxed mx-auto max-w-xl" />
        <div className="flex justify-center">
          <SkillPills skills={props.skills} ink={ink} accent={accent} />
        </div>
        <div className="mt-10 max-w-xl mx-auto">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-3 text-left" style={{ color: `${ink}50` }}>Experience</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About2: Split Portrait ---------- */
export function About2({ props, theme, onChange }: Props) {
  const { ink, accent, bg } = theme;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16 items-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <SectionLabel accent={accent} className="text-[10px] tracking-[0.25em]">About</SectionLabel>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="mt-4 font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-[15px] leading-relaxed max-w-md" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
        <div className="mt-8">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Career History</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="rounded-3xl aspect-[4/5] relative overflow-hidden"
        style={{ background: `${accent}18` }}
      >
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: `${ink}50` }}>Skills</div>
          <div className="flex flex-wrap gap-2">
            {props.skills?.map((s, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${bg}90`, color: ink }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="absolute top-8 left-8 right-8">
          <div className="h-2 w-2 rounded-full mb-2" style={{ background: accent }} />
          <div className="text-xs font-medium" style={{ color: `${ink}70` }}>Visual Identity</div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About3: Dark Gradient ---------- */
export function About3({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: `linear-gradient(160deg, ${ink} 0%, ${ink}ee 60%, ${accent}40 100%)` }}>
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-24 -left-24 h-[380px] w-[380px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: accent }} />
      <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute -top-16 right-0 h-[280px] w-[280px] rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: accent }} />
      <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative max-w-3xl">
        <div className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `${bg}60` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl md:text-7xl tracking-tight leading-[0.9]" style={{ color: bg }} />
        <div className="mt-8 max-w-xl">
          {props.paragraphs?.map((p, i) => (
            <Editable key={i} as="p" value={p} onChange={(v) => { const next = [...props.paragraphs]; next[i] = v; onChange({ paragraphs: next }); }} className="mt-4 text-[15px] leading-relaxed" style={{ color: `${bg}80` }} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {props.skills?.map((s, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -2, borderColor: bg }} className="text-xs px-4 py-1.5 rounded-full border" style={{ borderColor: `${bg}35`, color: `${bg}90` }}>{s}</motion.span>
          ))}
        </div>
        <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${bg}15` }}>
          <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${bg}50` }}>Experience</div>
          {props.experience?.map((e, i) => (
            <div key={i} className="flex items-baseline gap-3 py-2.5 text-sm" style={{ borderTop: i > 0 ? `1px solid ${bg}10` : undefined }}>
              <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
              <span className="flex-1" style={{ color: `${bg}90` }}>{e.role} · {e.co}</span>
              <span className="text-xs shrink-0" style={{ color: `${bg}50` }}>{e.yr}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About4: Terminal ---------- */
export function About4({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24">
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}20`, background: `${ink}04` }}>
        {/* Chrome bar */}
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${ink}15`, background: `${ink}06` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-3 text-[10px] font-mono flex-1 text-center" style={{ color: `${ink}40` }}>about.tsx — portfolio</span>
          <span className="text-[10px] font-mono" style={{ color: `${ink}30` }}>⌘S</span>
        </div>
        {/* Line numbers + code */}
        <div className="flex">
          <div className="px-4 py-6 text-right select-none" style={{ borderRight: `1px solid ${ink}10`, color: `${ink}25` }}>
            {Array.from({ length: 18 }, (_, i) => <div key={i} className="font-mono text-xs leading-6">{i + 1}</div>)}
          </div>
          <div className="p-6 font-mono text-sm leading-6 flex-1 overflow-x-auto" style={{ color: ink }}>
            <div style={{ color: `${ink}45` }}>{"/**"}</div>
            <div style={{ color: `${ink}45` }}>{" * @name " + props.heading}</div>
            <div style={{ color: `${ink}45` }}>{" */"}</div>
            <div className="mt-2"><span style={{ color: accent }}>const</span> <span style={{ color: ink }}>about</span> <span style={{ color: `${ink}70` }}>=</span> <span style={{ color: accent }}>{"{"}</span></div>
            <div className="ml-4">
              {props.paragraphs?.map((p, i) => (
                <div key={i} className="mt-1" style={{ color: `${ink}65` }}>{`  // ${p}`}</div>
              ))}
            </div>
            <div className="ml-4 mt-3"><span style={{ color: `${ink}60` }}>skills</span><span style={{ color: `${ink}50` }}>: [</span></div>
            {props.skills?.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="ml-8 text-xs" style={{ color: `${ink}75` }}>
                <span style={{ color: `${accent}cc` }}>"{s}"</span>{i < (props.skills?.length ?? 0) - 1 ? "," : ""}
              </motion.div>
            ))}
            <div className="ml-4"><span style={{ color: `${ink}50` }}>],</span></div>
            <div className="ml-4 mt-3"><span style={{ color: `${ink}60` }}>experience</span><span style={{ color: `${ink}50` }}>: [</span></div>
            {props.experience?.map((e, i) => (
              <div key={i} className="ml-8 text-xs" style={{ color: `${ink}55` }}>
                {"{ "}<span style={{ color: `${ink}80` }}>role: </span><span style={{ color: `${accent}cc` }}>"{e.role}"</span>, <span style={{ color: `${ink}80` }}>co: </span><span style={{ color: `${accent}cc` }}>"{e.co}"</span>, <span style={{ color: `${ink}80` }}>yr: </span><span style={{ color: `${accent}cc` }}>"{e.yr}"</span>{" }"}
              </div>
            ))}
            <div className="ml-4"><span style={{ color: `${ink}50` }}>]</span></div>
            <div><span style={{ color: accent }}>{"}"}</span></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About5: Marquee Skills ---------- */
export function About5({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const track = [...(props.skills ?? []), ...(props.skills ?? [])];
  return (
    <section className="py-24 overflow-hidden" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16 mb-6">
        <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: `${ink}55` }}>About</div>
      </div>
      {track.length > 0 && (
        <div className="overflow-hidden whitespace-nowrap py-4" style={{ borderTop: `1px solid ${ink}08`, borderBottom: `1px solid ${ink}08` }}>
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="inline-flex font-display text-5xl md:text-7xl">
            {track.map((s, i) => (
              <span key={i} className="mx-8 select-none" style={{ color: i % 2 === 0 ? `${ink}15` : `${ink}08` }}>
                {s}
                <span className="mx-8 text-lg align-middle" style={{ color: accent }}>✦</span>
              </span>
            ))}
          </motion.div>
        </div>
      )}
      <div className="px-8 md:px-16 mt-12 grid md:grid-cols-[1fr_1fr] gap-12">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-[15px] leading-relaxed" />
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
          <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Experience</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
          <div className="mt-6">
            <SkillPills skills={props.skills} ink={ink} accent={accent} tone="tinted" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- About6: Tight Minimal ---------- */
export function About6({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}12`, borderBottom: `1px solid ${ink}12` }}>
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${ink}50` }}>About</div>
          <div className="flex-1 h-px" style={{ background: `${ink}10` }} />
        </div>
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="grid md:grid-cols-[2fr_1fr] gap-12">
          <div>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl tracking-tight" style={{ color: ink }} />
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-sm leading-relaxed" />
            <div className="mt-8">
              <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Skills</div>
            <div className="space-y-2">
              {props.skills?.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-center gap-2 text-sm py-1.5" style={{ borderBottom: `1px solid ${ink}08`, color: `${ink}75` }}>
                  <span className="h-1 w-1 rounded-full shrink-0" style={{ background: accent }} />
                  {s}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- About7: Editorial Serif ---------- */
export function About7({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const first = props.paragraphs?.[0] ?? "";
  const rest = props.paragraphs?.slice(1) ?? [];
  return (
    <section className="px-8 md:px-16 py-24 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: `${ink}50` }}>About</div>
      <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display leading-[0.88] text-[11vw] md:text-[7vw] tracking-tight" style={{ color: ink }} />
      </motion.div>
      <div className="mt-10 max-w-3xl grid md:grid-cols-[auto_1fr] gap-6 items-start">
        <span className="font-display text-[7rem] leading-none select-none" style={{ color: accent, lineHeight: "0.8" }}>{first.charAt(0)}</span>
        <div>
          <p className="text-base leading-relaxed mt-2" style={{ color: `${ink}80` }}>{first.slice(1)}</p>
          {rest.map((p, i) => (
            <p key={i} className="mt-4 text-base leading-relaxed" style={{ color: `${ink}70` }}>{p}</p>
          ))}
        </div>
      </div>
      <div className="mt-10 grid md:grid-cols-[1fr_1fr] gap-10">
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Experience</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </div>
    </section>
  );
}

/* ---------- About8: Floating Card ---------- */
export function About8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: `${accent}12` }}>
      <motion.div
        {...fadeUp}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto rounded-3xl p-10 md:p-16"
        style={{ background: bg, boxShadow: `0 24px 80px ${accent}20` }}
      >
        <div className="flex items-start gap-6 mb-8">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15, type: "spring" }} className="h-16 w-16 rounded-2xl shrink-0" style={{ background: `${accent}30` }}>
            <div className="h-full w-full rounded-2xl flex items-center justify-center">
              <div className="h-6 w-6 rounded-full" style={{ background: accent }} />
            </div>
          </motion.div>
          <div className="flex-1">
            <div className="text-[10px] tracking-[0.25em] uppercase mb-1" style={{ color: `${ink}50` }}>About</div>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-3xl md:text-4xl leading-tight" style={{ color: ink }} />
          </div>
        </div>
        <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-relaxed" />
        <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${ink}10` }}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Skills</div>
              <SkillPills skills={props.skills} ink={ink} accent={accent} tone="tinted" />
            </div>
            <div>
              <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Experience</div>
              <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About9: Diagonal Split ---------- */
export function About9({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: bg }}>
      <motion.div
        initial={{ clipPath: "polygon(48% 0, 48% 0, 48% 100%, 48% 100%)" }}
        whileInView={{ clipPath: "polygon(48% 0, 100% 0, 100% 100%, 40% 100%)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{ background: `${accent}18` }}
      />
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="relative px-8 md:px-16 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>About</div>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-[15px] leading-relaxed" />
          <div className="mt-8">
            <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
          </div>
        </div>
        <div className="md:pt-12">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Skills</div>
          <SkillPills skills={props.skills} ink={ink} accent={accent} tone="tinted" />
          <div className="mt-8 p-6 rounded-2xl" style={{ background: `${accent}12` }}>
            <div className="grid grid-cols-2 gap-4">
              {props.skills?.slice(0, 4).map((s, i) => (
                <div key={i} className="text-center p-4 rounded-xl" style={{ background: `${ink}06` }}>
                  <div className="text-xs font-medium" style={{ color: ink }}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About10: Side-by-Side ---------- */
export function About10({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="grid md:grid-cols-[1fr_300px] gap-12 items-start mb-12">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>About</div>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
        </div>
        <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex flex-col gap-2 text-sm text-right">
          {props.skills?.map((s, i) => (
            <motion.span key={i} variants={child} className="cursor-default" style={{ color: `${ink}65` }}>{s}</motion.span>
          ))}
        </motion.div>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-12" style={{ borderTop: `1px solid ${ink}08`, paddingTop: "3rem" }}>
        <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-relaxed" />
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Experience</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </div>
    </section>
  );
}

/* ---------- About11: Polaroid ---------- */
export function About11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28 grid md:grid-cols-[1fr_260px] gap-16 items-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-[15px] leading-relaxed max-w-lg" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
        <div className="mt-8">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Timeline</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
      <motion.div
        initial={{ rotate: 5, opacity: 0, y: 16 }}
        whileInView={{ rotate: 3, opacity: 1, y: 0 }}
        whileHover={{ rotate: 0, scale: 1.04 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-lg p-4 shadow-xl"
        style={{ background: bg, border: `1px solid ${ink}12` }}
      >
        <div className="aspect-[3/4] rounded-sm" style={{ background: `${accent}22` }}>
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full mx-auto mb-3" style={{ background: `${accent}40` }} />
              <div className="text-xs" style={{ color: `${ink}60` }}>Portrait</div>
            </div>
          </div>
        </div>
        <div className="mt-3 text-center text-xs font-medium" style={{ color: `${ink}70` }}>{props.experience?.[0]?.co ?? props.heading}</div>
        <div className="mt-1 text-center text-[10px]" style={{ color: `${ink}40` }}>{props.experience?.[0]?.yr ?? ""}</div>
      </motion.div>
    </section>
  );
}

/* ---------- About12: Typewriter Mono ---------- */
export function About12({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="font-mono text-xs mb-2" style={{ color: `${ink}45` }}>{"$ whoami"}</div>
      <div className="font-mono text-xs mb-6" style={{ color: `${ink}30` }}>{"# loading profile..."}</div>
      <div className="font-mono text-3xl md:text-4xl flex items-center gap-2" style={{ color: ink }}>
        <Editable value={props.heading} onChange={(v) => onChange({ heading: v })} className="inline" />
        <motion.span animate={{ opacity: [1, 1, 0, 0] }} transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }} className="inline-block w-[3px] h-[0.85em] align-middle" style={{ background: accent }} />
      </div>
      <div className="mt-8 max-w-2xl grid md:grid-cols-[1fr_220px] gap-10">
        <div>
          <Paragraphs props={props} ink={ink} onChange={onChange} className="text-sm leading-relaxed font-mono" style={{ color: `${ink}72` }} />
          <div className="mt-8 font-mono text-xs space-y-1.5">
            <div style={{ color: `${ink}45` }}>{"// experience"}</div>
            {props.experience?.map((e, i) => (
              <div key={i} className="flex gap-2" style={{ color: `${ink}65` }}>
                <span style={{ color: accent }}>»</span>
                <span>{e.yr} — {e.role} @ {e.co}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-xs mb-3" style={{ color: `${ink}45` }}>{"// skills[]"}</div>
          <div className="space-y-2">
            {props.skills?.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="font-mono text-xs flex gap-2" style={{ color: `${ink}75` }}>
                <span style={{ color: accent }}>-</span> {s}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About13: Brutalist ---------- */
export function About13({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `4px solid ${ink}` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative max-w-4xl">
        <div className="flex items-start gap-8 mb-8">
          <div className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-bold shrink-0" style={{ background: ink, color: bg }}>About</div>
          <div className="flex-1 h-[3px] mt-3" style={{ background: `${ink}15` }} />
        </div>
        <div className="relative p-10 md:p-14" style={{ border: `3px solid ${ink}` }}>
          <span className="absolute -top-3 -left-3 h-6 w-6" style={{ borderTop: `3px solid ${accent}`, borderLeft: `3px solid ${accent}` }} />
          <span className="absolute -bottom-3 -right-3 h-6 w-6" style={{ borderBottom: `3px solid ${accent}`, borderRight: `3px solid ${accent}` }} />
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl md:text-6xl leading-[0.9] uppercase tracking-tight" style={{ color: ink }} />
          <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-6 text-base leading-relaxed max-w-xl" style={{ color: `${ink}88` }} />
          <div className="mt-8 flex flex-wrap gap-0">
            {props.skills?.map((s, i) => (
              <motion.span key={i} whileHover={{ background: ink, color: bg }} className="px-4 py-2.5 text-xs font-bold uppercase transition-colors duration-150" style={{ border: `2px solid ${ink}`, borderLeft: i > 0 ? "none" : undefined, color: ink }}>{s}</motion.span>
            ))}
          </div>
          <div className="mt-10 pt-8" style={{ borderTop: `2px solid ${ink}` }}>
            <div className="text-[10px] uppercase tracking-widest font-bold mb-4" style={{ color: ink }}>Experience</div>
            <div className="space-y-3">
              {props.experience?.map((e, i) => (
                <div key={i} className="flex items-baseline gap-4 text-sm font-medium" style={{ color: ink }}>
                  <span className="text-xs shrink-0 font-bold" style={{ color: accent }}>{e.yr}</span>
                  <span>{e.role}</span>
                  <span style={{ color: `${ink}60` }}>@ {e.co}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About14: Blurred Orb ---------- */
export function About14({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-32 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: accent }} />
      <motion.div animate={{ scale: [1, 1.08, 1], x: [0, -15, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute -bottom-20 right-0 h-[350px] w-[350px] rounded-full blur-3xl opacity-15 pointer-events-none" style={{ background: accent }} />
      <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative max-w-3xl">
        <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}55` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl md:text-6xl tracking-tight leading-[0.9]" style={{ color: ink }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-6 text-[15px] leading-relaxed max-w-xl" />
        <SkillPills skills={props.skills} ink={ink} accent={accent} />
        <div className="mt-10">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Experience</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About15: Bordered Frame ---------- */
export function About15({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="p-6 md:p-10">
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative rounded-3xl px-10 md:px-16 py-20" style={{ border: `1px solid ${ink}16` }}>
        <motion.span initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.25, type: "spring" }} className="absolute top-6 right-6 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: `${accent}18`, color: accent }}>{props.experience?.[0]?.yr ?? "Now"}</motion.span>
        {/* Corner accents */}
        <div className="absolute top-4 left-4 h-8 w-8" style={{ borderTop: `2px solid ${accent}50`, borderLeft: `2px solid ${accent}50` }} />
        <div className="absolute bottom-4 right-4 h-8 w-8" style={{ borderBottom: `2px solid ${accent}50`, borderRight: `2px solid ${accent}50` }} />
        <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
        <div className="mt-8 grid md:grid-cols-2 gap-10">
          <div>
            <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-relaxed" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Skills</div>
            <SkillPills skills={props.skills} ink={ink} accent={accent} />
          </div>
        </div>
        <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${ink}10` }}>
          <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Experience</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About16: Pull-Quote ---------- */
export function About16({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28 grid md:grid-cols-2 gap-16" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
        <div className="mt-8">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Skills</div>
          <SkillPills skills={props.skills} ink={ink} accent={accent} />
        </div>
        <div className="mt-8">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Experience</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.12 }} className="relative flex flex-col justify-center">
        <span className="absolute -top-8 -left-4 font-display text-[8rem] leading-none opacity-10 select-none" style={{ color: accent }}>"</span>
        <div className="relative">
          {props.paragraphs?.map((p, i) => (
            <p key={i} className={`font-display italic leading-snug mb-4 ${i === 0 ? "text-2xl md:text-3xl" : "text-lg"}`} style={{ color: i === 0 ? accent : `${ink}70` }}>{p}</p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About17: Sidebar Vertical ---------- */
export function About17({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="flex flex-col md:flex-row min-h-[500px]" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="md:w-[100px] flex items-center justify-center py-10 md:py-0" style={{ background: `${ink}05`, borderRight: `1px solid ${ink}10` }}>
        <div className="md:-rotate-90 whitespace-nowrap font-display text-2xl tracking-[0.08em]" style={{ color: ink }}>About</div>
      </div>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="flex-1 px-10 md:px-16 py-20">
        <div className="max-w-3xl grid md:grid-cols-2 gap-12">
          <div>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-5 text-[15px] leading-relaxed" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Skills</div>
            <SkillPills skills={props.skills} ink={ink} accent={accent} />
            <div className="mt-8">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Experience</div>
              <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About18: Dotted Grid ---------- */
export function About18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-28" style={{ backgroundImage: `radial-gradient(${ink}20 1.5px, transparent 1.5px)`, backgroundSize: "20px 20px" }}>
      <motion.div {...fadeUp} whileHover={{ y: -4 }} transition={{ duration: 0.5 }} className="max-w-3xl rounded-2xl p-10 md:p-14" style={{ background: bg, boxShadow: `0 8px 40px ${ink}08` }}>
        <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
        <div className="mt-8 grid md:grid-cols-2 gap-10">
          <div>
            <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-relaxed" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Skills</div>
            <SkillPills skills={props.skills} ink={ink} accent={accent} />
          </div>
        </div>
        <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${ink}10` }}>
          <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Experience</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About19: Dark Outline ---------- */
export function About19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: ink }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
        <div className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `${bg}50` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-6xl md:text-8xl leading-[0.88] tracking-tight" style={{ color: "transparent", WebkitTextStroke: `1.5px ${bg}` }} />
        <div className="mt-10 grid md:grid-cols-2 gap-12">
          <div>
            {props.paragraphs?.map((p, i) => (
              <Editable key={i} as="p" value={p} onChange={(v) => { const next = [...props.paragraphs]; next[i] = v; onChange({ paragraphs: next }); }} className="mt-4 text-[15px] leading-relaxed first:mt-0" style={{ color: `${bg}80` }} />
            ))}
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${bg}45` }}>Skills</div>
            <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex flex-wrap gap-2">
              {props.skills?.map((s, i) => (
                <motion.span key={i} variants={child} whileHover={{ y: -2 }} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: `${bg}25`, color: `${bg}85`, background: `${bg}08` }}>{s}</motion.span>
              ))}
            </motion.div>
            <div className="mt-8">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${bg}45` }}>Experience</div>
              {props.experience?.map((e, i) => (
                <div key={i} className="flex items-baseline gap-3 text-sm py-2.5" style={{ borderTop: i > 0 ? `1px solid ${bg}10` : undefined }}>
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                  <span className="flex-1" style={{ color: `${bg}85` }}>{e.role} · {e.co}</span>
                  <span className="text-xs shrink-0" style={{ color: `${bg}45` }}>{e.yr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About20: Compact Banner ---------- */
export function About20({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-14" style={{ borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}>
      <div className="flex flex-wrap items-start justify-between gap-8 mb-8">
        <div className="max-w-lg">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: `${ink}50` }}>About</div>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-2xl md:text-3xl tracking-tight" style={{ color: ink }} />
        </div>
        <div className="flex flex-wrap gap-2">
          {props.skills?.map((s, i) => (
            <span key={i} className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${accent}15`, color: accent }}>{s}</span>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8" style={{ borderTop: `1px solid ${ink}08`, paddingTop: "2rem" }}>
        <Paragraphs props={props} ink={ink} onChange={onChange} className="text-sm leading-relaxed" />
        <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
      </div>
    </section>
  );
}

/* ---------- About21: Luxury Gold ---------- */
export function About21({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const gold = accent;
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: bg }}>
      <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
        {/* Top gold rule */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${gold}80)` }} />
          <span className="text-[10px] tracking-[0.4em] uppercase font-medium" style={{ color: gold }}>About</span>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${gold}80)` }} />
        </div>
        <div className="text-center mb-10">
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl md:text-6xl tracking-tight leading-[0.9]" style={{ color: ink }} />
          <div className="mt-4 flex justify-center items-center gap-3">
            <div className="h-px w-12" style={{ background: `${gold}60` }} />
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: gold }} />
            <div className="h-px w-12" style={{ background: `${gold}60` }} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-[1.85]" style={{ color: `${ink}78` }} />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: gold }}>Expertise</div>
            <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex flex-wrap gap-2">
              {props.skills?.map((s, i) => (
                <motion.span key={i} variants={child} whileHover={{ y: -2 }} className="text-xs px-4 py-1.5 rounded-full border font-medium" style={{ borderColor: `${gold}50`, color: gold }}>{s}</motion.span>
              ))}
            </motion.div>
          </div>
        </div>
        {/* Gold divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: `${gold}25` }} />
          <div className="h-1 w-1 rounded-full" style={{ background: `${gold}50` }} />
          <div className="flex-1 h-px" style={{ background: `${gold}25` }} />
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: gold }}>Career</div>
          <div className="space-y-0">
            {props.experience?.map((e, i) => (
              <motion.div key={i} variants={child} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex items-start gap-4 py-4" style={{ borderBottom: `1px solid ${gold}15` }}>
                <div className="mt-1.5 h-2 w-2 rounded-full shrink-0" style={{ background: gold }} />
                <div className="flex-1">
                  <div className="text-sm font-medium" style={{ color: ink }}>{e.role}</div>
                  <div className="text-xs mt-0.5" style={{ color: `${ink}60` }}>{e.co}</div>
                </div>
                <span className="text-xs shrink-0 px-2 py-0.5 rounded" style={{ background: `${gold}12`, color: gold }}>{e.yr}</span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Bottom gold rule */}
        <div className="flex items-center gap-4 mt-10">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${gold}80)` }} />
          <div className="h-1 w-1 rounded-full" style={{ background: `${gold}50` }} />
          <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${gold}80)` }} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About22: Neon Cyber ---------- */
export function About22({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const neon = accent;
  return (
    <section className="px-8 md:px-16 py-28 relative overflow-hidden" style={{ background: "#080c14" }}>
      {/* Scanning line */}
      <motion.div animate={{ y: ["-100%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[2px] opacity-20 pointer-events-none" style={{ background: `linear-gradient(to right, transparent, ${neon}, transparent)` }} />
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(${neon}40 1px, transparent 1px), linear-gradient(90deg, ${neon}40 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative max-w-4xl">
        <div className="font-mono text-xs mb-6" style={{ color: `${neon}60` }}>
          <span style={{ color: `${neon}40` }}>{"[SYS]: "}</span>
          <span>INITIALIZING PROFILE...</span>
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>_</motion.span>
        </div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-mono text-4xl md:text-6xl tracking-wider uppercase" style={{ color: neon, textShadow: `0 0 30px ${neon}60, 0 0 60px ${neon}30` }} />
        <Paragraphs props={props} ink="#e0e8f0" onChange={onChange} className="mt-6 font-mono text-sm leading-relaxed max-w-2xl" style={{ color: "#9ab0c4" }} />
        <div className="mt-10">
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `${neon}60` }}>{"// skills"}</div>
          <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex flex-wrap gap-2">
            {props.skills?.map((s, i) => (
              <motion.span key={i} variants={child} whileHover={{ y: -2 }} className="font-mono text-xs px-4 py-1.5 rounded border" style={{ borderColor: `${neon}50`, color: neon, boxShadow: `0 0 12px ${neon}25, inset 0 0 8px ${neon}08` }}>{s}</motion.span>
            ))}
          </motion.div>
        </div>
        <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${neon}15` }}>
          <div className="font-mono text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: `${neon}60` }}>{"// experience_log[]"}</div>
          <div className="space-y-4">
            {props.experience?.map((e, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex items-baseline gap-4 font-mono text-sm">
                <span className="shrink-0 text-xs" style={{ color: `${neon}70` }}>{e.yr}</span>
                <span className="h-px flex-none w-6" style={{ background: `${neon}30` }} />
                <span style={{ color: "#c8dae8" }}>{e.role}</span>
                <span style={{ color: `#c8dae855` }}>@ {e.co}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About23: Magazine Bio ---------- */
export function About23({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="min-h-screen flex flex-col md:flex-row" style={{ borderTop: `1px solid ${ink}10` }}>
      {/* Photo col */}
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="md:w-[40%] shrink-0 min-h-[360px] md:min-h-full relative" style={{ background: `${accent}18` }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="h-32 w-32 rounded-full mb-4" style={{ background: `${accent}30` }}>
            <div className="h-full w-full rounded-full flex items-center justify-center">
              <div className="h-12 w-12 rounded-full" style={{ background: accent }} />
            </div>
          </div>
          <div className="text-sm font-medium" style={{ color: ink }}>{props.heading?.split(" ")[0] ?? ""}</div>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: `${ink}50` }}>Skills</div>
          <div className="flex flex-wrap gap-1.5">
            {props.skills?.slice(0, 5).map((s, i) => (
              <span key={i} className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: `${bg}90`, color: ink }}>{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Content col */}
      <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }} className="flex-1 px-10 md:px-14 py-16 flex flex-col justify-center">
        <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: `${ink}50` }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.92]" style={{ color: ink }} />
        <div className="mt-2 h-px w-20" style={{ background: accent }} />
        <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-6 text-[15px] leading-relaxed" />
        <div className="mt-8">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>More Skills</div>
          <div className="flex flex-wrap gap-2">
            {props.skills?.map((s, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: `${accent}12`, color: accent }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Experience</div>
          <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About24: Glassmorphism ---------- */
export function About24({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="relative px-8 md:px-16 py-32 overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}30 0%, ${accent}10 50%, ${ink}15 100%)` }}>
      {/* Blobs */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: accent }} />
      <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: `${ink}80` }} />
      <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `${ink}70` }}>About</div>
          <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
        </div>
        {/* Main glass card */}
        <div className="rounded-3xl p-10 mb-6" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
          <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-relaxed" style={{ color: `${ink}88` }} />
        </div>
        {/* Two sub-cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.20)" }}>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}60` }}>Skills</div>
            <div className="flex flex-wrap gap-2">
              {props.skills?.map((s, i) => (
                <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} whileHover={{ y: -2 }} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", color: ink }}>{s}</motion.span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.20)" }}>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}60` }}>Experience</div>
            <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About25: Handcraft ---------- */
export function About25({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: "#fdf6ed", borderTop: `2px solid ${ink}15` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
        {/* Stamp label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8" style={{ border: `2px solid ${ink}40`, color: `${ink}70`, transform: "rotate(-1.5deg)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          About Me
        </div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl md:text-6xl tracking-tight leading-[0.92]" style={{ color: ink }} />
        <div className="mt-3 h-0.5 w-24" style={{ background: `${ink}25`, borderRadius: "99px" }} />
        <div className="mt-8 grid md:grid-cols-[1fr_280px] gap-10">
          <div>
            <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-[1.8]" style={{ color: `${ink}78`, fontFamily: "Georgia, serif" }} />
            <div className="mt-8">
              <div className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: `${ink}55`, fontFamily: "Georgia, serif" }}>Career Path</div>
              <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
            </div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase mb-4" style={{ color: `${ink}55`, fontFamily: "Georgia, serif" }}>Skills</div>
            <div className="flex flex-wrap gap-2">
              {props.skills?.map((s, i) => (
                <motion.span key={i} initial={{ opacity: 0, rotate: -2 }} whileInView={{ opacity: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="text-xs px-3 py-1.5" style={{ border: `1.5px solid ${ink}35`, color: `${ink}80`, fontFamily: "Georgia, serif", borderRadius: "4px" }}>{s}</motion.span>
              ))}
            </div>
            <div className="mt-8 p-5 rounded" style={{ background: `${accent}10`, border: `1.5px dashed ${accent}40` }}>
              <div className="text-[11px] tracking-[0.15em] uppercase mb-2" style={{ color: accent, fontFamily: "Georgia, serif" }}>Current Role</div>
              <div className="text-sm" style={{ color: `${ink}80`, fontFamily: "Georgia, serif" }}>{props.experience?.[0]?.role ?? "Available"}</div>
              <div className="text-xs mt-1" style={{ color: `${ink}55`, fontFamily: "Georgia, serif" }}>{props.experience?.[0]?.co ?? ""}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About26: Corporate Timeline ---------- */
export function About26({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto">
        {/* Header row */}
        <div className="flex items-end justify-between mb-12 pb-6" style={{ borderBottom: `2px solid ${ink}10` }}>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: `${ink}50` }}>Professional Profile</div>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight" style={{ color: ink }} />
          </div>
          <div className="hidden md:block text-right">
            <div className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: `${ink}40` }}>Since</div>
            <div className="font-display text-3xl" style={{ color: accent }}>{props.experience?.[props.experience.length - 1]?.yr ?? "—"}</div>
          </div>
        </div>
        <div className="grid md:grid-cols-[1fr_320px] gap-12">
          {/* Left: bio + skills */}
          <div>
            <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-relaxed" />
            <div className="mt-8">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Core Competencies</div>
              <div className="grid grid-cols-2 gap-2">
                {props.skills?.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="flex items-center gap-2 text-sm px-3 py-2 rounded" style={{ background: `${ink}04`, color: `${ink}75` }}>
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Right: vertical timeline */}
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: `${ink}50` }}>Career Timeline</div>
            <div className="relative pl-6" style={{ borderLeft: `2px solid ${ink}12` }}>
              {props.experience?.map((e, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[25px] top-1 h-4 w-4 rounded-full border-2 flex items-center justify-center" style={{ background: bg, borderColor: accent }}>
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                  </div>
                  <div className="text-xs font-semibold mb-1" style={{ color: accent }}>{e.yr}</div>
                  <div className="text-sm font-medium" style={{ color: ink }}>{e.role}</div>
                  <div className="text-xs mt-0.5" style={{ color: `${ink}55` }}>{e.co}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About27: Sports Card ---------- */
export function About27({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
        <div className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: `${ink}50` }}>Profile</div>
        <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start mb-10">
          {/* Card front */}
          <motion.div whileHover={{ rotateY: 5, scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className="w-48 rounded-2xl overflow-hidden shrink-0" style={{ background: `linear-gradient(145deg, ${accent} 0%, ${ink} 100%)`, aspectRatio: "3/4" }}>
            <div className="p-4 flex flex-col h-full">
              <div className="text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>Portfolio</div>
              <div className="flex-1 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
              </div>
              <div className="text-white font-display text-lg leading-tight">{props.heading}</div>
              <div className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>{props.experience?.[0]?.role ?? "Professional"}</div>
            </div>
          </motion.div>
          <div>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95] mb-4" style={{ color: ink }} />
            <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-relaxed" />
          </div>
        </div>
        {/* Stat boxes */}
        <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Skill Stats</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {props.skills?.slice(0, 8).map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -3 }} className="text-center p-4 rounded-xl" style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
              <div className="text-2xl font-display font-bold mb-1" style={{ color: accent }}>{90 - i * 5}+</div>
              <div className="text-[10px] uppercase tracking-wide" style={{ color: `${ink}65` }}>{s}</div>
            </motion.div>
          ))}
        </div>
        <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Career</div>
        <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
      </motion.div>
    </section>
  );
}

/* ---------- About28: Botanical ---------- */
export function About28({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-28 relative overflow-hidden" style={{ background: bg }}>
      {/* Decorative circles */}
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-8 pointer-events-none" style={{ background: `${accent}20` }} />
      <div className="absolute -left-10 bottom-0 h-60 w-60 rounded-full opacity-8 pointer-events-none" style={{ background: `${accent}15` }} />
      <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative max-w-4xl mx-auto">
        <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50`, fontFamily: "Georgia, serif" }}>About</div>
        <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl md:text-6xl tracking-tight leading-[0.92]" style={{ color: ink }} />
        <div className="mt-3 flex items-center gap-3">
          <div className="h-px w-8" style={{ background: `${accent}60` }} />
          <div className="text-xs" style={{ color: `${accent}80` }}>✿</div>
          <div className="h-px w-8" style={{ background: `${accent}60` }} />
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-12">
          <div>
            <Paragraphs props={props} ink={ink} onChange={onChange} className="text-[15px] leading-[1.85]" style={{ color: `${ink}78`, fontFamily: "Georgia, serif" }} />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50`, fontFamily: "Georgia, serif" }}>Specialties</div>
            {/* Leaf-shaped chips */}
            <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="flex flex-wrap gap-2">
              {props.skills?.map((s, i) => (
                <motion.span key={i} variants={child} whileHover={{ scale: 1.05, y: -2 }} className="text-xs px-4 py-1.5 font-medium" style={{ background: `${accent}15`, color: accent, borderRadius: "0 16px 0 16px", border: `1px solid ${accent}30` }}>{s}</motion.span>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${ink}08` }}>
          <div className="text-[10px] tracking-[0.25em] uppercase mb-6" style={{ color: `${ink}50`, fontFamily: "Georgia, serif" }}>Journey</div>
          <div className="space-y-5">
            {props.experience?.map((e, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-4">
                <div className="mt-1.5 h-3 w-3 rounded-full shrink-0 border-2" style={{ background: `${accent}20`, borderColor: accent }} />
                <div>
                  <div className="text-sm font-medium" style={{ color: ink, fontFamily: "Georgia, serif" }}>{e.role}</div>
                  <div className="text-xs mt-0.5" style={{ color: `${ink}55`, fontFamily: "Georgia, serif" }}>{e.co} · {e.yr}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About29: Real Estate Agent Bio ---------- */
export function About29({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Headshot */}
          <div>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className="rounded-2xl overflow-hidden" style={{ border: `4px solid ${accent}25` }}>
              <div className="aspect-[3/4]" style={{ background: `${accent}15` }}>
                <div className="h-full flex flex-col items-center justify-center gap-3">
                  <div className="h-20 w-20 rounded-full" style={{ background: `${accent}35` }}>
                    <div className="h-full w-full rounded-full flex items-center justify-center">
                      <div className="h-8 w-8 rounded-full" style={{ background: accent }} />
                    </div>
                  </div>
                  <div className="text-xs" style={{ color: `${ink}50` }}>Photo</div>
                </div>
              </div>
            </motion.div>
            {/* Credentials */}
            <div className="mt-4 p-4 rounded-xl" style={{ background: `${accent}08`, border: `1px solid ${accent}20` }}>
              <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Credentials</div>
              {props.skills?.slice(0, 3).map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs py-1.5" style={{ color: `${ink}75`, borderBottom: i < 2 ? `1px solid ${ink}08` : undefined }}>
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                  {s}
                </div>
              ))}
            </div>
          </div>
          {/* Bio content */}
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: `${ink}50` }}>Agent Profile</div>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-4xl md:text-5xl tracking-tight leading-[0.95]" style={{ color: ink }} />
            <div className="mt-2 h-1 w-16 rounded" style={{ background: accent }} />
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-6 text-[15px] leading-relaxed" />
            {/* Service area badges */}
            <div className="mt-6">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: `${ink}50` }}>Areas of Expertise</div>
              <div className="flex flex-wrap gap-2">
                {props.skills?.map((s, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded font-medium" style={{ background: i % 2 === 0 ? accent : `${accent}15`, color: i % 2 === 0 ? "#fff" : accent }}>{s}</span>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Track Record</div>
              <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- About30: Event Planner ---------- */
export function About30({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="max-w-5xl mx-auto">
        {/* Top: elegant card */}
        <div className="grid md:grid-cols-[1fr_300px] gap-10 mb-12">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: `${ink}50` }}>About</div>
            <Editable as="h2" value={props.heading} onChange={(v) => onChange({ heading: v })} className="font-display text-5xl md:text-6xl tracking-tight leading-[0.9]" style={{ color: ink }} />
            <div className="mt-3 flex items-center gap-3">
              <div className="h-px w-10" style={{ background: `${accent}80` }} />
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: `${accent}80` }}>Est. {props.experience?.[props.experience.length - 1]?.yr ?? "Now"}</span>
            </div>
            <Paragraphs props={props} ink={ink} onChange={onChange} className="mt-6 text-[15px] leading-[1.8]" />
          </div>
          {/* Photo card */}
          <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 200 }} className="rounded-3xl overflow-hidden" style={{ background: `${accent}12`, border: `1px solid ${accent}20` }}>
            <div className="aspect-[4/5] flex flex-col items-center justify-center relative">
              <div className="h-24 w-24 rounded-full mb-4" style={{ background: `${accent}30` }}>
                <div className="h-full w-full rounded-full flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full" style={{ background: accent }} />
                </div>
              </div>
              <div className="text-sm font-medium" style={{ color: ink }}>{props.heading?.split(" ").slice(0, 2).join(" ") ?? ""}</div>
              <div className="text-xs mt-1" style={{ color: `${ink}55` }}>{props.experience?.[0]?.role ?? "Event Planner"}</div>
              {/* Testimonial snippet */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center" style={{ background: `${accent}20` }}>
                <div className="text-[10px] italic" style={{ color: `${ink}70` }}>"{props.paragraphs?.[0]?.slice(0, 60) ?? "Creating unforgettable moments"}..."</div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Services + experience */}
        <div className="grid md:grid-cols-2 gap-10 pt-10" style={{ borderTop: `1px solid ${ink}08` }}>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Services Offered</div>
            <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid grid-cols-2 gap-2">
              {props.skills?.map((s, i) => (
                <motion.div key={i} variants={child} whileHover={{ y: -2 }} className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-xl" style={{ background: `${accent}08`, border: `1px solid ${accent}15`, color: `${ink}80` }}>
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: accent }} />
                  {s}
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] uppercase mb-4" style={{ color: `${ink}50` }}>Experience</div>
            <ExperienceRows experience={props.experience} ink={ink} accent={accent} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
