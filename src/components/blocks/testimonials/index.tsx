import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { BlockComponentProps } from "../types";
import type { TestimonialsProps } from "@/types/builder.schema";

type Props = BlockComponentProps<TestimonialsProps>;
type Item = TestimonialsProps["items"][number];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Stars({ accent, count = 5 }: { accent: string; count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" style={{ color: accent }} />)}
    </div>
  );
}

function Avatar({ name, accent, bg, size = "h-12 w-12" }: { name: string; accent: string; bg: string; size?: string }) {
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={`${size} rounded-full flex items-center justify-center text-sm font-bold shrink-0`} style={{ background: `${accent}20`, color: accent }}>
      {initials}
    </div>
  );
}

function SectionHeading({ props, ink, accent, dark }: { props: TestimonialsProps; ink: string; accent: string; dark?: boolean }) {
  return (
    <div className="mb-10">
      <div className="text-[10px] tracking-[0.3em] uppercase font-semibold inline-flex items-center gap-2" style={{ color: accent }}>
        <span className="h-px w-5" style={{ background: accent }} />
        Testimonials
      </div>
      {props.heading && <div className="mt-2 font-display text-4xl md:text-5xl font-black tracking-tight" style={{ color: dark ? "#ffffff" : ink }}>{props.heading}</div>}
    </div>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 1 — Centered hero quote, big
══════════════════════════════════════════ */
export function Testimonials1({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [active, setActive] = useState(0);
  const t = items[active];
  if (!t) return null;
  return (
    <section className="px-8 md:px-16 py-28 text-center" style={{ background: bg }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <motion.div key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto">
        <Quote className="h-8 w-8 mx-auto mb-6" style={{ color: `${accent}50` }} />
        <p className="font-display text-2xl md:text-3xl font-light leading-snug italic" style={{ color: ink }}>"{t.quote}"</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Avatar name={t.name} accent={accent} bg={bg} size="h-12 w-12" />
          <div className="text-left">
            <div className="font-semibold text-sm" style={{ color: ink }}>{t.name}</div>
            {t.role && <div className="text-xs mt-0.5" style={{ color: `${ink}55` }}>{t.role}</div>}
          </div>
        </div>
        <Stars accent={accent} />
      </motion.div>
      {items.length > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {items.map((_, i) => <button key={i} onClick={() => setActive(i)} className="h-2 rounded-full transition-all" style={{ width: i === active ? 24 : 8, background: i === active ? accent : `${ink}20` }} />)}
        </div>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 2 — Auto-carousel with arrows
══════════════════════════════════════════ */
export function Testimonials2({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  if (!items.length) return null;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: `${ink}04` }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <SectionHeading props={props} ink={ink} accent={accent} />
          <div className="flex gap-2 mb-10">
            <button onClick={prev} className="h-10 w-10 rounded-full grid place-items-center" style={{ border: `1px solid ${ink}20`, color: ink }}><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={next} className="h-10 w-10 rounded-full grid place-items-center" style={{ background: accent, color: bg }}><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-5">
            {items.map((t, i) => (
              <div key={i} className="shrink-0 w-full md:w-[48%] lg:w-[32%] rounded-2xl p-8" style={{ background: bg, border: `1px solid ${ink}10` }}>
                <Stars accent={accent} />
                <p className="mt-4 text-base leading-relaxed italic" style={{ color: `${ink}80` }}>"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={t.name} accent={accent} bg={bg} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
                    {t.role && <div className="text-xs" style={{ color: `${ink}50` }}>{t.role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 3 — Dark gradient, floating bubbles
══════════════════════════════════════════ */
export function Testimonials3({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  if (!items.length) return null;
  const floatVariants = (i: number) => ({
    animate: {
      y: [0, -(10 + (i % 3) * 8), 0],
      transition: { duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut" as const, delay: i * 0.4 },
    },
  });
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: `linear-gradient(160deg, ${ink}, ${accent}25)` }}>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -20 - i * 8, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} className="absolute rounded-full opacity-5" style={{ width: 60 + i * 40, height: 60 + i * 40, background: bg, left: `${(i * 17) % 90}%`, top: `${(i * 23) % 80}%` }} />
        ))}
      </div>
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading props={props} ink={bg} accent={accent} dark />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div key={i} variants={floatVariants(i)} animate="animate" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl p-6" style={{ background: `${bg}0f`, backdropFilter: "blur(8px)", border: `1px solid ${bg}15` }}>
              <Stars accent={accent} />
              <p className="mt-4 text-sm leading-relaxed" style={{ color: `${bg}85` }}>"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar name={t.name} accent={accent} bg={ink} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: bg }}>{t.name}</div>
                  {t.role && <div className="text-xs" style={{ color: `${bg}55` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 4 — Terminal / monospace style
══════════════════════════════════════════ */
export function Testimonials4({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  if (!items.length) return null;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg, fontFamily: "monospace" }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="max-w-4xl space-y-4">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="rounded-lg p-6" style={{ background: `${ink}05`, border: `1px solid ${ink}12` }}>
            <div className="text-xs mb-2" style={{ color: `${ink}40` }}><span style={{ color: accent }}>$</span> feedback --from="{t.name}"</div>
            <p className="text-sm leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
            <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: `${ink}50` }}>
              <span style={{ color: accent }}>→</span>
              <span>{t.name}</span>
              {t.role && <><span>·</span><span>{t.role}</span></>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 5 — Horizontal infinite marquee
══════════════════════════════════════════ */
export function Testimonials5({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  if (!items.length) return null;
  const doubled = [...items, ...items];
  return (
    <section className="py-24 overflow-hidden" style={{ background: bg }}>
      <div className="px-8 md:px-16 mb-10">
        <SectionHeading props={props} ink={ink} accent={accent} />
      </div>
      <div className="flex flex-col gap-4">
        {[0, 1].map((row) => (
          <div key={row} className="relative flex overflow-hidden" style={{ borderTop: `1px solid ${ink}08`, borderBottom: `1px solid ${ink}08` }}>
            <motion.div animate={{ x: row === 0 ? [0, "-50%"] : ["-50%", 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex shrink-0 gap-5 py-4 pr-5">
              {doubled.map((t, i) => (
                <div key={i} className="shrink-0 rounded-2xl px-6 py-5 flex items-center gap-5" style={{ background: `${ink}05`, minWidth: 300, border: `1px solid ${ink}08` }}>
                  <Avatar name={t.name} accent={accent} bg={bg} size="h-10 w-10" />
                  <div className="min-w-0">
                    <p className="text-sm truncate" style={{ color: `${ink}75` }}>"{t.quote}"</p>
                    <div className="mt-1 text-xs font-semibold" style={{ color: accent }}>{t.name}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 6 — Minimal stacked list
══════════════════════════════════════════ */
export function Testimonials6({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <div className="max-w-3xl mx-auto">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="space-y-0">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="flex gap-6 py-8" style={{ borderTop: `1px solid ${ink}08` }}>
              <Avatar name={t.name} accent={accent} bg={bg} />
              <div className="flex-1">
                <Stars accent={accent} />
                <p className="mt-3 text-base leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
                <div className="mt-3">
                  <span className="text-sm font-semibold" style={{ color: ink }}>{t.name}</span>
                  {t.role && <span className="text-xs ml-2" style={{ color: `${ink}50` }}>{t.role}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 7 — Animated bubble float grid
══════════════════════════════════════════ */
export function Testimonials7({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  if (!items.length) return null;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: `${accent}08` }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -(8 + (i % 4) * 5), 0] }}
            transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="rounded-3xl p-7 cursor-default"
            style={{ background: bg, boxShadow: `0 8px 40px -10px ${ink}15` }}
          >
            <div className="flex justify-between items-start">
              <Avatar name={t.name} accent={accent} bg={bg} size="h-11 w-11" />
              <Stars accent={accent} />
            </div>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
            <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${ink}08` }}>
              <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
              {t.role && <div className="text-xs mt-0.5" style={{ color: `${ink}50` }}>{t.role}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 8 — Single spotlight carousel
══════════════════════════════════════════ */
export function Testimonials8({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setCurrent(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  if (!items.length) return null;
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: bg }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {items.map((t, i) => (
            <div key={i} className="shrink-0 w-full px-4">
              <div className="max-w-2xl mx-auto text-center">
                <Quote className="h-10 w-10 mx-auto" style={{ color: `${accent}30` }} />
                <p className="mt-6 font-display text-2xl md:text-3xl leading-snug font-light italic" style={{ color: ink }}>"{t.quote}"</p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <Avatar name={t.name} accent={accent} bg={bg} size="h-14 w-14" />
                  <div className="text-left">
                    <div className="font-semibold" style={{ color: ink }}>{t.name}</div>
                    {t.role && <div className="text-sm mt-0.5" style={{ color: `${ink}55` }}>{t.role}</div>}
                  </div>
                </div>
                <div className="mt-4 flex justify-center"><Stars accent={accent} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-center items-center gap-4">
        <button onClick={prev} className="h-10 w-10 rounded-full grid place-items-center" style={{ border: `1px solid ${ink}20`, color: ink }}><ChevronLeft className="h-4 w-4" /></button>
        <div className="flex gap-2">
          {items.map((_, i) => <button key={i} onClick={() => emblaApi?.scrollTo(i)} className="h-2 rounded-full transition-all" style={{ width: i === current ? 20 : 8, background: i === current ? accent : `${ink}20` }} />)}
        </div>
        <button onClick={next} className="h-10 w-10 rounded-full grid place-items-center" style={{ background: accent, color: bg }}><ChevronRight className="h-4 w-4" /></button>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 9 — Diagonal / angled cards
══════════════════════════════════════════ */
export function Testimonials9({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: bg }}>
      <div className="absolute -left-16 top-0 bottom-0 w-1/3 pointer-events-none" style={{ background: `${accent}08`, transform: "skewX(6deg)" }} />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} whileHover={{ y: -4 }} className="rounded-2xl p-8" style={{ background: i % 2 === 0 ? `${ink}05` : `${accent}10` }}>
              <Stars accent={accent} />
              <p className="mt-4 text-base leading-relaxed italic" style={{ color: `${ink}80` }}>"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar name={t.name} accent={accent} bg={bg} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-xs" style={{ color: `${ink}50` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 10 — Side-by-side minimal
══════════════════════════════════════════ */
export function Testimonials10({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-16 items-start" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp}>
        <SectionHeading props={props} ink={ink} accent={accent} />
        {items[0] && (
          <div className="mt-0">
            <p className="font-display text-2xl leading-snug italic" style={{ color: ink }}>"{items[0].quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <Avatar name={items[0].name} accent={accent} bg={bg} />
              <div>
                <div className="text-sm font-semibold" style={{ color: ink }}>{items[0].name}</div>
                {items[0].role && <div className="text-xs" style={{ color: `${ink}50` }}>{items[0].role}</div>}
              </div>
            </div>
          </div>
        )}
      </motion.div>
      <motion.div {...fadeUp} style={{ transitionDelay: "0.1s" }} className="space-y-6 mt-0 md:mt-16">
        {items.slice(1).map((t, i) => (
          <div key={i} className="py-5" style={{ borderTop: `1px solid ${ink}08` }}>
            <p className="text-sm leading-relaxed italic" style={{ color: `${ink}75` }}>"{t.quote}"</p>
            <div className="mt-3 flex items-center gap-2">
              <Avatar name={t.name} accent={accent} bg={bg} size="h-8 w-8" />
              <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
              {t.role && <div className="text-xs" style={{ color: `${ink}45` }}>· {t.role}</div>}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 11 — Polaroid tilt cards
══════════════════════════════════════════ */
export function Testimonials11({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const angles = [-3, 2, -2, 3, -1, 2];
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: `${ink}05` }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="flex flex-wrap gap-6 justify-center">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, rotate: angles[i % angles.length] * 2 }} whileInView={{ opacity: 1, rotate: angles[i % angles.length] }} viewport={{ once: true }} whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }} transition={{ duration: 0.4 }} className="rounded-2xl p-6 w-64 cursor-default" style={{ background: bg, boxShadow: `4px 4px 0 ${ink}10` }}>
            <Stars accent={accent} />
            <p className="mt-4 text-sm leading-relaxed italic" style={{ color: `${ink}75` }}>"{t.quote}"</p>
            <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${ink}08` }}>
              <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
              {t.role && <div className="text-xs mt-0.5" style={{ color: `${ink}50` }}>{t.role}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 12 — Auto-rotating single + avatars
══════════════════════════════════════════ */
export function Testimonials12({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setActive(a => (a + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, [items.length]);
  const t = items[active];
  if (!t) return null;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center">
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <motion.button key={i} onClick={() => setActive(i)} whileHover={{ scale: 1.05 }} className={`h-14 w-14 rounded-full flex items-center justify-center text-sm font-bold transition-all`} style={{ background: i === active ? accent : `${accent}20`, color: i === active ? bg : accent, boxShadow: i === active ? `0 0 0 3px ${accent}40` : "none" }}>
                {item.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
              </motion.button>
            ))}
          </div>
          <motion.div key={active} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Stars accent={accent} />
            <p className="mt-4 font-display text-2xl leading-snug italic" style={{ color: ink }}>"{t.quote}"</p>
            <div className="mt-6">
              <div className="font-semibold" style={{ color: ink }}>{t.name}</div>
              {t.role && <div className="text-sm mt-0.5" style={{ color: `${ink}55` }}>{t.role}</div>}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 13 — Brutalist, thick accents
══════════════════════════════════════════ */
export function Testimonials13({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <div className="h-2 mb-8" style={{ background: ink }} />
      {props.heading && <div className="font-display text-5xl font-black uppercase mb-8" style={{ color: ink }}>{props.heading}</div>}
      <div className="grid md:grid-cols-2 gap-0">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="p-8" style={{ border: `2px solid ${ink}`, marginTop: -2, marginLeft: i % 2 === 0 ? 0 : -2 }}>
            <p className="text-lg font-bold leading-snug" style={{ color: ink }}>"{t.quote}"</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1 w-6" style={{ background: accent }} />
              <span className="text-xs font-black uppercase" style={{ color: ink }}>{t.name}</span>
              {t.role && <span className="text-xs" style={{ color: `${ink}60` }}>{t.role}</span>}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="h-2 mt-8" style={{ background: ink }} />
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 14 — Floating orbs background
══════════════════════════════════════════ */
export function Testimonials14({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: bg }}>
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} animate={{ x: [0, (i % 2 === 0 ? 30 : -30), 0], y: [0, -(15 + i * 8), 0] }} transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }} className="absolute rounded-full pointer-events-none" style={{ width: 100 + i * 60, height: 100 + i * 60, background: accent, opacity: 0.04, left: `${(i * 20) % 80}%`, top: `${(i * 17) % 70}%`, filter: "blur(40px)" }} />
      ))}
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="rounded-3xl p-7" style={{ background: `${ink}05`, border: `1px solid ${ink}10` }}>
              <Quote className="h-6 w-6" style={{ color: `${accent}50` }} />
              <p className="mt-3 text-sm leading-relaxed italic" style={{ color: `${ink}80` }}>{t.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar name={t.name} accent={accent} bg={bg} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-xs" style={{ color: `${ink}50` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 15 — Bordered frames
══════════════════════════════════════════ */
export function Testimonials15({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ scale: 1.02 }} className="break-inside-avoid rounded-2xl p-6 relative" style={{ border: `2px solid ${i % 3 === 0 ? accent : ink + "10"}` }}>
            {i % 3 === 0 && <div className="absolute top-3 right-3 h-2 w-2 rounded-full" style={{ background: accent }} />}
            <Stars accent={accent} />
            <p className="mt-3 text-sm leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar name={t.name} accent={accent} bg={bg} size="h-9 w-9" />
              <div>
                <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                {t.role && <div className="text-xs" style={{ color: `${ink}50` }}>{t.role}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 16 — Pull-quote editorial
══════════════════════════════════════════ */
export function Testimonials16({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  if (!items.length) return null;
  const [active, setActive] = useState(0);
  const t = items[active];
  return (
    <section className="px-8 md:px-16 py-28 grid md:grid-cols-[1fr_2fr] gap-16 items-start" style={{ background: bg, borderTop: `1px solid ${ink}10` }}>
      <div>
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <motion.button key={i} onClick={() => setActive(i)} whileHover={{ x: 4 }} className="flex items-center gap-3 text-sm font-medium text-left" style={{ color: i === active ? accent : `${ink}50` }}>
              <div className="h-2 w-2 rounded-full shrink-0" style={{ background: i === active ? accent : `${ink}20` }} />
              {item.name}
            </motion.button>
          ))}
        </div>
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="text-6xl leading-none font-display" style={{ color: `${accent}30` }}>"</div>
        <p className="font-display text-3xl leading-snug italic mt-2" style={{ color: ink }}>{t.quote}</p>
        <div className="mt-8 flex items-center gap-4">
          <Avatar name={t.name} accent={accent} bg={bg} size="h-14 w-14" />
          <div>
            <div className="font-semibold" style={{ color: ink }}>{t.name}</div>
            {t.role && <div className="text-sm" style={{ color: `${ink}55` }}>{t.role}</div>}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 17 — Vertical stack with accent
══════════════════════════════════════════ */
export function Testimonials17({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="flex" style={{ background: bg }}>
      <div className="hidden md:flex flex-col items-center py-16 px-4" style={{ background: `${ink}04`, borderRight: `1px solid ${ink}08`, minWidth: 56 }}>
        <div className="text-[9px] font-mono tracking-[0.4em] uppercase rotate-180 whitespace-nowrap" style={{ writingMode: "vertical-lr", color: `${ink}40` }}>What They Say</div>
      </div>
      <div className="flex-1 px-8 md:px-16 py-24">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="max-w-3xl space-y-8">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-5">
              <div className="w-1 rounded-full shrink-0 mt-1" style={{ background: i === 0 ? accent : `${ink}12`, minHeight: 60 }} />
              <div>
                <p className="text-base leading-relaxed italic" style={{ color: `${ink}80` }}>"{t.quote}"</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm font-semibold" style={{ color: ink }}>{t.name}</span>
                  {t.role && <span className="text-xs" style={{ color: `${ink}50` }}>· {t.role}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 18 — Masonry/dotted grid
══════════════════════════════════════════ */
export function Testimonials18({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-24" style={{ backgroundImage: `radial-gradient(${ink}15 1.5px, transparent 1.5px)`, backgroundSize: "20px 20px" }}>
      <div className="rounded-3xl p-10 md:p-14" style={{ background: bg }}>
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="break-inside-avoid rounded-2xl p-6" style={{ background: i % 2 === 0 ? `${ink}05` : `${accent}10` }}>
              <p className="text-sm leading-relaxed italic" style={{ color: `${ink}80` }}>"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-2">
                <Avatar name={t.name} accent={accent} bg={bg} size="h-8 w-8" />
                <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 19 — Outline dark
══════════════════════════════════════════ */
export function Testimonials19({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: ink }}>
      <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}50` }}>Testimonials</div>
      {props.heading && <div className="mt-2 mb-10 font-display text-5xl font-black leading-[0.95] tracking-tight" style={{ color: "transparent", WebkitTextStroke: `1.2px ${bg}` }}>{props.heading}</div>}
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="rounded-2xl p-7" style={{ border: `1px solid ${bg}15` }}>
            <Stars accent={accent} />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: `${bg}80` }}>"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <Avatar name={t.name} accent={accent} bg={ink} size="h-9 w-9" />
              <div>
                <div className="text-sm font-semibold" style={{ color: bg }}>{t.name}</div>
                {t.role && <div className="text-xs" style={{ color: `${bg}50` }}>{t.role}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS 20 — Compact scrolling ticker
══════════════════════════════════════════ */
export function Testimonials20({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  if (!items.length) return null;
  const doubled = [...items, ...items];
  return (
    <section className="py-16 overflow-hidden" style={{ background: `${accent}08`, borderTop: `1px solid ${ink}08`, borderBottom: `1px solid ${ink}08` }}>
      {props.heading && <div className="px-8 md:px-16 mb-6 font-display text-2xl font-black" style={{ color: ink }}>{props.heading}</div>}
      <div className="relative flex overflow-hidden">
        <motion.div animate={{ x: [0, "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex shrink-0 gap-8 pr-8">
          {doubled.map((t, i) => (
            <div key={i} className="shrink-0 flex items-center gap-6" style={{ minWidth: 280 }}>
              <Avatar name={t.name} accent={accent} bg={bg} size="h-9 w-9" />
              <div className="min-w-0">
                <p className="text-sm truncate" style={{ color: `${ink}70` }}>"{t.quote}"</p>
                <div className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{t.name}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
