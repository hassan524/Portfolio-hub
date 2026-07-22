import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { BlockComponentProps } from "../types";
import type { TestimonialsProps } from "@/types/builder.schema";

// See Hero.tsx for the full numbered design-system legend (1–20).
// Testimonials{N} always shares its visual DNA with Hero{N} / About{N} / Projects{N} / Footer{N}.

type Props = BlockComponentProps<TestimonialsProps>;

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function Heading({ props, ink, accent, eyebrow = "Testimonials" }: { props: TestimonialsProps; ink: string; accent: string; eyebrow?: string }) {
  return (
    <div className="mb-8">
      <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: accent }}>{eyebrow}</div>
      {props.heading && <div className="mt-1 font-display text-3xl tracking-tight" style={{ color: ink }}>{props.heading}</div>}
    </div>
  );
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

/* ---------- Testimonials1: Classic Centered, single quote ---------- */
export function Testimonials1({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const t = items[0];
  if (!t) return null;
  return (
    <section className="px-8 md:px-16 py-24 text-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto">
        <div className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: accent }}>Testimonials</div>
        <div className="mx-auto mt-6 h-16 w-16 rounded-full flex items-center justify-center text-sm font-medium" style={{ background: `${accent}20`, color: accent }}>{initials(t.name)}</div>
        <p className="mt-6 font-display text-2xl md:text-3xl italic leading-snug">"{t.quote}"</p>
        <div className="mt-5 text-sm font-medium" style={{ color: ink }}>{t.name}</div>
        {t.role && <div className="text-xs" style={{ color: `${ink}55` }}>{t.role}</div>}
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials2: Split Portrait, quote left / avatar-strip right ---------- */
export function Testimonials2({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const t = items[0];
  if (!t) return null;
  return (
    <section className="px-8 md:px-16 py-20 grid md:grid-cols-2 gap-10 items-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <Heading props={props} ink={ink} accent={accent} />
        <p className="font-display text-2xl italic leading-snug" style={{ color: ink }}>"{t.quote}"</p>
        <div className="mt-5 text-sm font-medium" style={{ color: ink }}>{t.name} {t.role && <span style={{ color: `${ink}55`, fontWeight: 400 }}>· {t.role}</span>}</div>
      </motion.div>
      <div className="rounded-3xl aspect-[4/5] flex flex-col justify-end p-6 gap-2" style={{ background: `${accent}18` }}>
        {items.slice(1, 4).map((o, i) => (
          <div key={i} className="rounded-xl p-3 text-xs" style={{ background: "rgba(255,255,255,0.6)", color: ink }}>{o.name}</div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials3: Fullbleed Gradient (dark panel) ---------- */
export function Testimonials3({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: `linear-gradient(160deg, ${ink}, ${accent}30)` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}70` }}>Testimonials</div>
        {props.heading && <div className="mt-1 mb-8 font-display text-4xl tracking-tight" style={{ color: bg }}>{props.heading}</div>}
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <div key={i}>
              <p className="text-sm leading-relaxed" style={{ color: `${bg}90` }}>"{t.quote}"</p>
              <div className="mt-3 text-xs font-medium" style={{ color: accent }}>{t.name}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials4: Terminal review dump ---------- */
export function Testimonials4({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20">
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}20`, background: `${ink}05` }}>
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${ink}15` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-2 text-[10px] font-mono" style={{ color: `${ink}40` }}>reviews.log</span>
        </div>
        <div className="p-6 font-mono text-sm space-y-3">
          {items.map((t, i) => (
            <div key={i}>
              <span style={{ color: accent }}>{"> "}</span>
              <span style={{ color: ink }}>{t.quote}</span>
              <div className="ml-3 text-xs" style={{ color: `${ink}50` }}>— {t.name}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials5: Marquee autoplay carousel ---------- */
export function Testimonials5({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3600, stopOnInteraction: false })]);
  return (
    <section className="py-20 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16"><Heading props={props} ink={ink} accent={accent} /></div>
      <div className="overflow-hidden px-8 md:px-16" ref={emblaRef}>
        <div className="flex gap-5">
          {items.map((t, i) => (
            <div key={i} className="shrink-0 basis-[85%] md:basis-[40%] rounded-2xl p-6" style={{ border: `1px solid ${ink}12` }}>
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" style={{ color: accent, fill: accent }} />)}</div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${ink}85` }}>{t.quote}</p>
              <div className="mt-4 text-sm font-medium" style={{ color: ink }}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials6: Tight Minimal, quiet single column ---------- */
export function Testimonials6({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-16 border-b" style={{ borderColor: `${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-xl">
        <Heading props={props} ink={ink} accent={accent} />
        <div className="space-y-6">
          {items.map((t, i) => (
            <div key={i}>
              <p className="text-base leading-relaxed" style={{ color: ink }}>"{t.quote}"</p>
              <div className="mt-2 text-xs" style={{ color: accent }}>{t.name}{t.role ? ` · ${t.role}` : ""}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials7: Big Serif Editorial, giant quote mark ---------- */
export function Testimonials7({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const t = items[0];
  if (!t) return null;
  return (
    <section className="relative px-8 md:px-16 py-28" style={{ borderTop: `1px solid ${ink}10` }}>
      <Quote className="absolute top-8 left-6 h-28 w-28 opacity-[0.06]" style={{ color: ink }} />
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative max-w-2xl">
        <p className="font-display text-[6vw] md:text-5xl leading-[0.95] tracking-tight" style={{ color: ink }}>{t.quote}</p>
        <div className="mt-6 text-sm font-medium" style={{ color: accent }}>{t.name}</div>
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials8: Floating Card grid ---------- */
export function Testimonials8({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20" style={{ background: `${accent}18` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto rounded-3xl p-8 md:p-12 shadow-lift" style={{ background: bg }}>
        <Heading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((t, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ border: `1px solid ${ink}10` }}>
              <Quote className="h-4 w-4" style={{ color: accent }} />
              <p className="mt-2 text-sm leading-relaxed" style={{ color: `${ink}85` }}>{t.quote}</p>
              <div className="mt-3 text-sm font-medium" style={{ color: ink }}>{t.name}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials9: Diagonal Split, pastel rotating cards ---------- */
export function Testimonials9({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const rotations = [-2, 1, -1, 2];
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${bg} 45%, ${accent}25 45%, ${accent}25 100%)` }} />
      <div className="relative">
        <Heading props={props} ink={ink} accent={accent} />
        <div className="flex flex-wrap gap-5">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ rotate: 0, scale: 1.03 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} style={{ rotate: rotations[i % rotations.length], background: bg }} className="rounded-2xl p-5 w-[260px] shadow-sm">
              <p className="text-sm leading-relaxed" style={{ color: `${ink}85` }}>{t.quote}</p>
              <div className="mt-3 text-xs font-medium" style={{ color: ink }}>{t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials10: Minimal Side-by-Side dots ---------- */
export function Testimonials10({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [active, setActive] = useState(0);
  const t = items[active];
  if (!t) return null;
  return (
    <section className="px-8 md:px-16 py-20 flex items-center justify-between gap-10 flex-wrap" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="max-w-lg">
        <p className="text-lg leading-relaxed" style={{ color: ink }}>"{t.quote}"</p>
        <div className="mt-2 text-xs" style={{ color: accent }}>{t.name}</div>
      </motion.div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        {items.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className="h-2.5 w-2.5 rounded-full" style={{ background: i === active ? accent : `${ink}20` }} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials11: Polaroid Tilt cards ---------- */
export function Testimonials11({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const rotations = [-4, 3, -2];
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <Heading props={props} ink={ink} accent={accent} />
      <div className="flex flex-wrap gap-8">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12, rotate: rotations[i % rotations.length] }} whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }} whileHover={{ rotate: 0, scale: 1.03 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="rounded-lg p-4 shadow-lift w-[240px]" style={{ background: bg, border: `1px solid ${ink}15` }}>
            <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium mb-3" style={{ background: `${accent}20`, color: accent }}>{initials(t.name)}</div>
            <p className="text-sm leading-relaxed" style={{ color: `${ink}85` }}>"{t.quote}"</p>
            <div className="mt-3 text-xs font-medium" style={{ color: ink }}>{t.name}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials12: Typewriter Mono ---------- */
export function Testimonials12({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="font-mono text-xs" style={{ color: `${ink}50` }}>{"> testimonials"}</div>
      {props.heading && <div className="mt-3 font-mono text-2xl md:text-3xl" style={{ color: ink }}>{props.heading}</div>}
      <div className="mt-6 space-y-4 font-mono text-sm">
        {items.map((t, i) => (
          <div key={i}>
            <span style={{ color: accent }}>{"// "}</span>
            <span style={{ color: `${ink}85` }}>{t.quote}</span>
            <div className="ml-4 text-xs" style={{ color: `${ink}50` }}>@{t.name.toLowerCase().replace(/\s+/g, "")}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials13: Brutalist boxed reviews ---------- */
export function Testimonials13({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-16" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="inline-block px-2 py-0.5 mb-4 text-[10px] uppercase tracking-widest font-bold" style={{ background: ink, color: bg }}>Testimonials</div>
      {props.heading && <div className="mb-6 font-display text-4xl uppercase tracking-tight" style={{ color: ink }}>{props.heading}</div>}
      <div className="grid md:grid-cols-3 gap-0">
        {items.map((t, i) => (
          <div key={i} className="p-5" style={{ border: `2px solid ${ink}`, marginLeft: i % 3 !== 0 ? "-2px" : 0 }}>
            <p className="text-sm font-bold leading-relaxed" style={{ color: ink }}>"{t.quote}"</p>
            <div className="mt-3 text-xs font-bold uppercase" style={{ color: accent }}>{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials14: Blurred Orb, single big quote ---------- */
export function Testimonials14({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const t = items[0];
  if (!t) return null;
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden text-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: accent }} />
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="relative max-w-2xl mx-auto">
        <p className="font-display text-2xl md:text-3xl italic leading-snug" style={{ color: ink }}>"{t.quote}"</p>
        <div className="mt-5 text-sm font-medium" style={{ color: accent }}>{t.name}</div>
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials15: Bordered Frame, arrow carousel ---------- */
export function Testimonials15({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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
  }, [emblaApi, onSelect]);

  return (
    <section className="p-6 md:p-10">
      <div className="relative rounded-2xl px-8 md:px-16 py-16" style={{ border: `1px solid ${ink}18` }}>
        <div className="flex items-end justify-between">
          <Heading props={props} ink={ink} accent={accent} />
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
          <div className="flex gap-6">
            {items.map((t, i) => (
              <div key={i} className="shrink-0 basis-full md:basis-[60%] rounded-2xl p-8" style={{ background: `${accent}12` }}>
                <p className="font-display text-xl leading-relaxed" style={{ color: ink }}>"{t.quote}"</p>
                <div className="mt-5 text-sm font-medium" style={{ color: ink }}>{t.name} {t.role && <span style={{ color: `${ink}55`, fontWeight: 400 }}>· {t.role}</span>}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials16: Pull-quote Two-Col ---------- */
export function Testimonials16({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const t = items[0];
  const rest = items.slice(1);
  if (!t) return null;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} ink={ink} accent={accent} />
        <p className="font-display text-3xl italic leading-snug" style={{ color: accent }}>"{t.quote}"</p>
        <div className="mt-4 text-sm font-medium" style={{ color: ink }}>{t.name}</div>
      </motion.div>
      <div className="space-y-4">
        {rest.map((o, i) => (
          <div key={i} className="pl-4 py-1" style={{ borderLeft: `3px solid ${accent}` }}>
            <p className="text-sm leading-relaxed" style={{ color: `${ink}85` }}>{o.quote}</p>
            <div className="mt-1.5 text-xs font-medium" style={{ color: ink }}>{o.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials17: Sidebar Vertical, scrollable stack ---------- */
export function Testimonials17({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="flex flex-col md:flex-row" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="md:w-1/4 flex items-center justify-center p-10" style={{ background: `${ink}06` }}>
        <div className="md:-rotate-90 whitespace-nowrap font-display text-2xl tracking-tight" style={{ color: ink }}>{props.heading || "Kind words"}</div>
      </div>
      <div className="flex-1 px-8 md:px-16 py-16 max-h-[440px] overflow-y-auto snap-y snap-mandatory space-y-6 pr-2">
        {items.map((t, i) => (
          <div key={i} className="snap-start">
            <p className="text-base leading-relaxed" style={{ color: ink }}>"{t.quote}"</p>
            <div className="mt-2 text-xs" style={{ color: accent }}>{t.name}{t.role ? ` · ${t.role}` : ""}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials18: Dotted Grid card wall ---------- */
export function Testimonials18({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-24" style={{ backgroundImage: `radial-gradient(${ink}22 1px, transparent 1px)`, backgroundSize: "18px 18px" }}>
      <div className="rounded-2xl p-10" style={{ background: bg }}>
        <Heading props={props} ink={ink} accent={accent} />
        <div className="columns-1 md:columns-2 gap-5 space-y-5">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="break-inside-avoid rounded-2xl p-5" style={{ background: i % 2 === 0 ? `${ink}05` : `${accent}10` }}>
              <p className="text-sm leading-relaxed" style={{ color: `${ink}85` }}>{t.quote}</p>
              <div className="mt-3 text-xs font-medium" style={{ color: ink }}>— {t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials19: Outline Stroke (dark inverted) ---------- */
export function Testimonials19({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: ink }}>
      <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}60` }}>Testimonials</div>
      {props.heading && <div className="mt-2 mb-8 font-display text-5xl leading-[0.95] tracking-tight" style={{ color: "transparent", WebkitTextStroke: `1.2px ${bg}` }}>{props.heading}</div>}
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((t, i) => (
          <div key={i}>
            <p className="text-sm leading-relaxed" style={{ color: `${bg}90` }}>"{t.quote}"</p>
            <div className="mt-3 text-xs font-medium" style={{ color: accent }}>{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials20: Compact Banner ticker ---------- */
export function Testimonials20({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-8 flex flex-wrap items-center gap-x-10 gap-y-2" style={{ borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}>
      {items.map((t, i) => (
        <span key={i} className="text-sm" style={{ color: `${ink}75` }}>"{t.quote}" <span style={{ color: accent }}>— {t.name}</span></span>
      ))}
    </section>
  );
}