import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { ProjectsProps } from "@/types/builder.schema";

// See Hero.tsx for the full numbered design-system legend (1–20).
// Projects{N} always shares its visual DNA with Hero{N} / About{N} / Testimonials{N} / Footer{N}.

type Props = BlockComponentProps<ProjectsProps>;
type Item = ProjectsProps["items"][number];

function updateItem(items: Item[], onChange: Props["onChange"], i: number, patch: Partial<Item>) {
  const next = [...items];
  next[i] = { ...next[i], ...patch };
  onChange({ items: next });
}

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function SectionHeading({ props, ink, accent, eyebrow = "Selected Work" }: { props: ProjectsProps; ink: string; accent: string; eyebrow?: string }) {
  return (
    <div className="mb-8">
      <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: accent }}>{props.eyebrow || eyebrow}</div>
      {props.heading && <div className="mt-1 font-display text-3xl tracking-tight" style={{ color: ink }}>{props.heading}</div>}
    </div>
  );
}

/* ---------- Projects1: Classic Centered grid, hover lift ---------- */
export function Projects1({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24 text-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-2 gap-5 text-left">
          {items.map((it, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}12` }}>
              <div className="aspect-video" style={{ background: it.featured ? accent : `${ink}10` }} />
              <div className="p-5">
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-display text-xl" style={{ color: ink }} />
                {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="mt-1 text-sm" style={{ color: `${ink}70` }} />}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects2: Split Portrait list rows ---------- */
export function Projects2({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20 grid md:grid-cols-2 gap-10 items-start" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <SectionHeading props={props} ink={ink} accent={accent} />
      </motion.div>
      <div>
        {items.map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="flex items-center justify-between gap-6 py-5" style={{ borderTop: i > 0 ? `1px solid ${ink}10` : undefined }}>
            <div>
              <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="text-lg font-medium" style={{ color: ink }} />
              {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-sm mt-0.5" style={{ color: `${ink}65` }} />}
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: accent }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects3: Fullbleed Gradient (dark showcase) ---------- */
export function Projects3({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: `linear-gradient(160deg, ${ink}, ${accent}30)` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}70` }}>{props.eyebrow || "Selected Work"}</div>
        {props.heading && <div className="mt-1 mb-8 font-display text-4xl tracking-tight" style={{ color: bg }}>{props.heading}</div>}
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="rounded-2xl overflow-hidden" style={{ background: `${bg}10`, border: `1px solid ${bg}20` }}>
              <div className="aspect-video" style={{ background: it.featured ? accent : `${bg}10` }} />
              <div className="p-4"><div className="text-sm font-medium" style={{ color: bg }}>{it.title}</div></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects4: Terminal listing ---------- */
export function Projects4({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}20`, background: `${ink}05` }}>
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${ink}15` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-2 text-[10px] font-mono" style={{ color: `${ink}40` }}>ls ./projects</span>
        </div>
        <div className="p-6 font-mono text-sm space-y-2">
          {items.map((it, i) => (
            <div key={i} className="flex gap-3">
              <span style={{ color: accent }}>$</span>
              <span style={{ color: ink }}>{it.title}</span>
              {it.desc && <span style={{ color: `${ink}50` }}>— {it.desc}</span>}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects5: Marquee of titles ---------- */
export function Projects5({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const track = [...items, ...items];
  return (
    <section className="py-20 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16"><SectionHeading props={props} ink={ink} accent={accent} /></div>
      <div className="overflow-hidden whitespace-nowrap">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="inline-flex items-center">
          {track.map((it, i) => (
            <span key={i} className="inline-flex items-center mx-8 font-display text-3xl" style={{ color: i % 2 === 0 ? ink : accent }}>
              {it.title}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Projects6: Tight Minimal numbered list ---------- */
export function Projects6({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-16 border-b" style={{ borderColor: `${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-xl">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="space-y-4">
          {items.map((it, i) => (
            <div key={i} className="flex items-baseline gap-4">
              <span className="font-display text-xl shrink-0" style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <Editable as="span" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="text-lg" style={{ color: ink }} />
                {it.desc && <span className="text-sm ml-2" style={{ color: `${ink}55` }}>— {it.desc}</span>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects7: Big Serif Editorial, alternating zigzag ---------- */
export function Projects7({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16">
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${ink}55` }}>{props.eyebrow || "Selected Work"}</div>
        {props.heading && <div className="mt-1 font-display text-[8vw] md:text-[4.5vw] leading-[0.9] tracking-tight" style={{ color: ink }}>{props.heading}</div>}
      </div>
      {items.map((it, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }} className={`px-8 md:px-16 py-10 grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
          <div className="aspect-video rounded-2xl" style={{ background: it.featured ? accent : `${ink}10` }} />
          <div>
            <div className="font-display text-2xl" style={{ color: ink }}>{it.title}</div>
            {it.desc && <p className="mt-1 text-sm" style={{ color: `${ink}70` }}>{it.desc}</p>}
          </div>
        </motion.div>
      ))}
    </section>
  );
}

/* ---------- Projects8: Floating Card carousel ---------- */
export function Projects8({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="px-8 md:px-16 py-20" style={{ background: `${accent}18` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 shadow-lift" style={{ background: bg }}>
        <div className="flex items-end justify-between">
          <SectionHeading props={props} ink={ink} accent={accent} />
          <div className="flex gap-2 mb-8">
            <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev} className="h-9 w-9 rounded-full grid place-items-center border disabled:opacity-30" style={{ borderColor: `${ink}20` }}>
              <ChevronLeft className="h-4 w-4" style={{ color: ink }} />
            </button>
            <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext} className="h-9 w-9 rounded-full grid place-items-center border disabled:opacity-30" style={{ borderColor: `${ink}20` }}>
              <ChevronRight className="h-4 w-4" style={{ color: ink }} />
            </button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {items.map((it, i) => (
              <div key={i} className="shrink-0 basis-[75%] md:basis-[45%] rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}12` }}>
                <div className="aspect-video" style={{ background: it.featured ? accent : `${ink}10` }} />
                <div className="p-4">
                  <div className="font-medium" style={{ color: ink }}>{it.title}</div>
                  {it.desc && <p className="text-xs mt-1" style={{ color: `${ink}65` }}>{it.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects9: Diagonal Split bento ---------- */
export function Projects9({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${bg} 45%, ${accent}25 45%, ${accent}25 100%)` }} />
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="relative">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-3 gap-4 md:auto-rows-[160px]">
          {items.map((it, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className={`rounded-2xl overflow-hidden relative ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} style={{ background: it.featured ? accent : `${ink}10` }}>
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}>
                <div className="text-sm font-medium text-white">{it.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects10: Minimal Side-by-Side table ---------- */
export function Projects10({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20 grid md:grid-cols-[220px_1fr] gap-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <SectionHeading props={props} ink={ink} accent={accent} />
      </motion.div>
      <table className="w-full text-sm">
        <tbody>
          {items.map((it, i) => (
            <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} style={{ borderTop: `1px solid ${ink}10` }}>
              <td className="py-3 pr-4 font-medium" style={{ color: ink }}>{it.title}</td>
              <td className="py-3 pr-4" style={{ color: `${ink}65` }}>{it.desc}</td>
              <td className="py-3 text-right"><ArrowUpRight className="h-4 w-4 inline" style={{ color: accent }} /></td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ---------- Projects11: Polaroid Tilt cards ---------- */
export function Projects11({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const rotations = [-3, 2, -2, 3, -1];
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="flex flex-wrap gap-6">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, rotate: rotations[i % rotations.length] }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-lg p-3 shadow-lift w-[220px]"
            style={{ background: bg, border: `1px solid ${ink}15` }}
          >
            <div className="aspect-square rounded-sm" style={{ background: it.featured ? `${accent}30` : `${ink}10` }} />
            <div className="mt-3 text-center text-xs" style={{ color: `${ink}70` }}>{it.title}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects12: Typewriter Mono listing ---------- */
export function Projects12({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="font-mono text-xs" style={{ color: `${ink}50` }}>{"> " + (props.eyebrow || "projects")}</div>
      {props.heading && <div className="mt-3 font-mono text-2xl md:text-3xl" style={{ color: ink }}>{props.heading}</div>}
      <div className="mt-6 rounded-xl p-6 font-mono text-sm space-y-2" style={{ border: `1px solid ${ink}15`, background: `${ink}04` }}>
        {items.map((it, i) => (
          <div key={i} className="flex gap-3">
            <span style={{ color: accent }}>$</span>
            <span style={{ color: ink }}>{it.title}</span>
            {it.desc && <span style={{ color: `${ink}50` }}>— {it.desc}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects13: Brutalist cards ---------- */
export function Projects13({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-16" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="inline-block px-2 py-0.5 mb-4 text-[10px] uppercase tracking-widest font-bold" style={{ background: ink, color: bg }}>{props.eyebrow || "Work"}</div>
      {props.heading && <div className="mb-6 font-display text-4xl uppercase tracking-tight" style={{ color: ink }}>{props.heading}</div>}
      <div className="grid md:grid-cols-2 gap-0">
        {items.map((it, i) => (
          <div key={i} className="p-6" style={{ border: `2px solid ${ink}`, marginLeft: i % 2 === 1 ? "-2px" : 0, marginTop: i >= 2 ? "-2px" : 0 }}>
            <div className="font-display text-xl uppercase" style={{ color: ink }}>{it.title}</div>
            {it.desc && <p className="mt-1 text-sm font-bold" style={{ color: accent }}>{it.desc}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects14: Blurred Orb featured + grid ---------- */
export function Projects14({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [first, ...rest] = items;
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 -right-20 h-[380px] w-[380px] rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: accent }} />
      <div className="relative">
        <SectionHeading props={props} ink={ink} accent={accent} />
        {first && (
          <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${ink}12` }}>
            <div className="aspect-[21/9]" style={{ background: accent }} />
            <div className="p-6">
              <div className="font-display text-2xl" style={{ color: ink }}>{first.title}</div>
              {first.desc && <p className="mt-1 text-sm" style={{ color: `${ink}70` }}>{first.desc}</p>}
            </div>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-4">
          {rest.map((it, i) => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${ink}12` }}>
              <div className="aspect-video" style={{ background: `${ink}10` }} />
              <div className="p-3 text-sm font-medium" style={{ color: ink }}>{it.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects15: Bordered Frame carousel ---------- */
export function Projects15({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="p-6 md:p-10">
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative rounded-2xl px-8 md:px-16 py-16" style={{ border: `1px solid ${ink}18` }}>
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: `${accent}20`, color: accent }}>{items.length} projects</span>
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
          {items.map((it, i) => (
            <div key={i} className="snap-start shrink-0 w-[260px] rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}12` }}>
              <div className="aspect-[4/3]" style={{ background: i === 0 ? accent : `${ink}10` }} />
              <div className="p-4">
                <div className="font-medium" style={{ color: ink }}>{it.title}</div>
                {it.desc && <p className="text-xs mt-1" style={{ color: `${ink}65` }}>{it.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects16: Pull-quote Two-Col, hover-expand ---------- */
export function Projects16({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <SectionHeading props={props} ink={ink} accent={accent} />
        <p className="font-display text-2xl italic leading-snug" style={{ color: accent }}>Work that speaks for itself.</p>
      </motion.div>
      <div className="flex gap-2 h-[280px]">
        {items.slice(0, 4).map((it, i) => (
          <motion.div key={i} className="rounded-2xl overflow-hidden relative flex-1 hover:flex-[2.5] transition-[flex] duration-500 cursor-pointer" style={{ background: it.featured ? accent : `${ink}10` }}>
            <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}>
              <div className="text-sm font-medium text-white whitespace-nowrap">{it.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects17: Sidebar Vertical, autoplay carousel ---------- */
export function Projects17({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3200, stopOnInteraction: false })]);
  return (
    <section className="flex flex-col md:flex-row" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="md:w-1/4 flex items-center justify-center p-10" style={{ background: `${ink}06` }}>
        <div className="md:-rotate-90 whitespace-nowrap font-display text-2xl tracking-tight" style={{ color: ink }}>{props.heading || "Work"}</div>
      </div>
      <div className="flex-1 py-16 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5 px-8">
          {items.map((it, i) => (
            <div key={i} className="shrink-0 basis-[80%] md:basis-[45%] rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}12` }}>
              <div className="aspect-[4/3]" style={{ background: i % 2 === 0 ? accent : `${ink}10` }} />
              <div className="p-4">
                <div className="font-medium" style={{ color: ink }}>{it.title}</div>
                {it.desc && <p className="text-xs mt-1" style={{ color: `${ink}65` }}>{it.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects18: Dotted Grid, vertical scroll-snap ---------- */
export function Projects18({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-24" style={{ backgroundImage: `radial-gradient(${ink}22 1px, transparent 1px)`, backgroundSize: "18px 18px" }}>
      <div className="rounded-2xl p-10" style={{ background: bg }}>
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="max-h-[420px] overflow-y-auto snap-y snap-mandatory space-y-4 pr-2">
          {items.map((it, i) => (
            <div key={i} className="snap-start rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}12` }}>
              <div className="aspect-[3/1]" style={{ background: i === 0 ? accent : `${ink}10` }} />
              <div className="p-4">
                <div className="font-medium" style={{ color: ink }}>{it.title}</div>
                {it.desc && <p className="text-xs mt-1" style={{ color: `${ink}65` }}>{it.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects19: Outline Stroke (dark) editorial grid ---------- */
export function Projects19({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const palette = [accent, `${bg}90`, `${bg}40`];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: ink }}>
      <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}60` }}>{props.eyebrow || "Selected Work"}</div>
      {props.heading && <div className="mt-2 mb-8 font-display text-5xl leading-[0.95] tracking-tight" style={{ color: "transparent", WebkitTextStroke: `1.2px ${bg}` }}>{props.heading}</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((it, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} className="rounded-xl aspect-square flex items-end p-3" style={{ background: palette[i % palette.length] }}>
            <span className="text-xs font-medium" style={{ color: i % 3 === 0 ? "#fff" : ink }}>{it.title}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects20: Compact Banner strip ---------- */
export function Projects20({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-8 flex flex-wrap items-center gap-x-8 gap-y-2" style={{ borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}>
      {props.heading && <span className="text-xs uppercase tracking-widest" style={{ color: accent }}>{props.heading}</span>}
      {items.map((it, i) => (
        <span key={i} className="text-sm" style={{ color: ink }}>{it.title}</span>
      ))}
    </section>
  );
}