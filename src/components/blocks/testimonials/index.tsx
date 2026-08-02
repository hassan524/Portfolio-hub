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

function Stars({ count = 5, accent }: { count?: number; accent: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" style={{ color: accent, fill: accent }} />
      ))}
    </div>
  );
}

function Avatar({ name, accent, size = "md" }: { name: string; accent: string; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? "h-8 w-8 text-xs" : size === "lg" ? "h-16 w-16 text-lg" : "h-11 w-11 text-sm";
  return (
    <div className={`${sizeClass} rounded-full flex items-center justify-center font-semibold shrink-0`} style={{ background: `${accent}25`, color: accent }}>
      {initials(name)}
    </div>
  );
}

/* ---------- Testimonials1: Centered Hero Quote ---------- */
export function Testimonials1({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  if (!items.length) return null;
  return (
    <section className="px-8 md:px-16 py-28 text-center" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-10" style={{ color: accent }}>Testimonials</div>
      </motion.div>
      {/* Featured first */}
      {items[0] && (
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="max-w-2xl mx-auto mb-16">
          <div className="relative inline-block">
            <span className="absolute -top-6 -left-4 font-display text-9xl leading-none opacity-10 select-none" style={{ color: accent }}>"</span>
          </div>
          <Avatar name={items[0].name} accent={accent} size="lg" />
          <div className="mt-3 mb-1"><Stars accent={accent} /></div>
          <p className="mt-6 font-display text-3xl md:text-4xl italic leading-snug" style={{ color: ink }}>"{items[0].quote}"</p>
          <div className="mt-5 text-base font-semibold" style={{ color: ink }}>{items[0].name}</div>
          {items[0].role && <div className="text-sm mt-0.5" style={{ color: `${ink}55` }}>{items[0].role}</div>}
        </motion.div>
      )}
      {/* Remaining items in row */}
      {items.length > 1 && (
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.slice(1).map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-2xl p-6 text-left" style={{ background: `${accent}08`, border: `1px solid ${ink}08` }}>
              <Stars accent={accent} />
              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-2">
                <Avatar name={t.name} accent={accent} size="sm" />
                <div>
                  <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-[10px]" style={{ color: `${ink}50` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- Testimonials2: Split Quote + Grid ---------- */
export function Testimonials2({ props, theme }: Props) {
  const { ink, accent, bg } = theme;
  const items = props.items ?? [];
  const featured = items[0];
  const rest = items.slice(1);
  if (!featured) return null;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <Heading props={props} ink={ink} accent={accent} />
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: featured */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="rounded-3xl p-8 md:p-10" style={{ background: `linear-gradient(135deg, ${accent}15, ${accent}05)`, border: `1px solid ${accent}20` }}>
          <Quote className="h-8 w-8 mb-4" style={{ color: accent }} />
          <Stars accent={accent} />
          <p className="mt-4 font-display text-2xl italic leading-snug" style={{ color: ink }}>"{featured.quote}"</p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar name={featured.name} accent={accent} size="md" />
            <div>
              <div className="font-semibold text-sm" style={{ color: ink }}>{featured.name}</div>
              {featured.role && <div className="text-xs" style={{ color: `${ink}55` }}>{featured.role}</div>}
            </div>
          </div>
        </motion.div>
        {/* Right: grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rest.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${ink}10` }}>
              <Stars accent={accent} />
              <p className="mt-2 text-xs leading-relaxed" style={{ color: `${ink}75` }}>"{t.quote}"</p>
              <div className="mt-3 flex items-center gap-2">
                <Avatar name={t.name} accent={accent} size="sm" />
                <div>
                  <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-[10px]" style={{ color: `${ink}45` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials3: Dark Panel Grid ---------- */
export function Testimonials3({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: `linear-gradient(160deg, ${ink} 0%, ${ink}e0 100%)` }}>
      {/* Decorative orb */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: accent }} />
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative">
        <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: `${bg}60` }}>Testimonials</div>
        {props.heading && <div className="mb-10 font-display text-4xl tracking-tight" style={{ color: bg }}>{props.heading}</div>}
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} whileHover={{ y: -4 }} className="rounded-2xl p-6" style={{ background: `${bg}08`, border: `1px solid ${bg}15` }}>
              <Stars accent={accent} />
              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${bg}85` }}>"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar name={t.name} accent={accent} size="sm" />
                <div>
                  <div className="text-sm font-semibold" style={{ color: bg }}>{t.name}</div>
                  {t.role && <div className="text-xs" style={{ color: `${bg}50` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials4: Terminal Reviews ---------- */
export function Testimonials4({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20">
      <Heading props={props} ink={ink} accent={accent} />
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto rounded-2xl overflow-hidden" style={{ border: `1px solid ${ink}20`, background: `${ink}05` }}>
        {/* Terminal bar */}
        <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${ink}15`, background: `${ink}08` }}>
          <span className="h-3 w-3 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-3 text-[11px] font-mono" style={{ color: `${ink}40` }}>reviews.log — bash</span>
        </div>
        <div className="p-6 font-mono text-sm space-y-5 max-h-[500px] overflow-y-auto">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <div className="flex items-center gap-2 mb-1">
                <span style={{ color: "#27ca40" }}>$</span>
                <span style={{ color: accent }}>review</span>
                <span className="flex gap-0.5">{Array.from({ length: 5 }).map((_, s) => <span key={s} style={{ color: accent }}>★</span>)}</span>
              </div>
              <div className="ml-4" style={{ color: `${ink}85` }}>{t.quote}</div>
              <div className="ml-4 mt-1 text-xs" style={{ color: `${ink}45` }}>— {t.name}{t.role ? ` (${t.role})` : ""} </div>
            </motion.div>
          ))}
          <div className="flex items-center gap-2">
            <span style={{ color: "#27ca40" }}>$</span>
            <span className="inline-block h-4 w-0.5 animate-pulse" style={{ background: accent }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials5: Autoplay Carousel with Dots ---------- */
export function Testimonials5({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3600, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="py-24 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16"><Heading props={props} ink={ink} accent={accent} /></div>
      <div className="overflow-hidden px-8 md:px-16" ref={emblaRef}>
        <div className="flex gap-5">
          {items.map((t, i) => (
            <div key={i} className="shrink-0 basis-[90%] md:basis-[45%] rounded-3xl p-8" style={{ border: `1px solid ${ink}12`, background: `${accent}06` }}>
              <Stars accent={accent} />
              <p className="mt-4 font-display text-xl italic leading-snug" style={{ color: ink }}>"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <Avatar name={t.name} accent={accent} size="md" />
                <div>
                  <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-xs" style={{ color: `${ink}50` }}>{t.role}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6 px-8">
        {items.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)} className="h-2 rounded-full transition-all duration-300" style={{ width: i === selectedIndex ? 24 : 8, background: i === selectedIndex ? accent : `${ink}20` }} />
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials6: Quiet Column Stack ---------- */
export function Testimonials6({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderBottom: `1px solid ${ink}10` }}>
      <div className="max-w-2xl mx-auto">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <Heading props={props} ink={ink} accent={accent} />
        </motion.div>
        <div className="space-y-8">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="pb-8" style={{ borderBottom: i < items.length - 1 ? `1px solid ${ink}10` : "none" }}>
              <Stars accent={accent} />
              <p className="mt-3 text-base leading-relaxed" style={{ color: ink }}>"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar name={t.name} accent={accent} size="sm" />
                <div>
                  <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-xs" style={{ color: accent }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials7: Editorial Serif ---------- */
export function Testimonials7({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const featured = items[0];
  const rest = items.slice(1);
  if (!featured) return null;
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      {/* Giant background quote */}
      <div className="absolute top-0 left-0 font-display text-[20rem] leading-none opacity-[0.04] select-none pointer-events-none" style={{ color: ink }}>"</div>
      <div className="relative max-w-4xl">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-6" style={{ color: accent }}>Testimonials</div>
          <Stars accent={accent} />
          <p className="mt-6 font-display text-4xl md:text-5xl leading-[1.1] tracking-tight italic" style={{ color: ink }}>"{featured.quote}"</p>
          <div className="mt-8 flex items-center gap-4">
            <Avatar name={featured.name} accent={accent} size="lg" />
            <div>
              <div className="font-semibold text-base" style={{ color: ink }}>{featured.name}</div>
              {featured.role && <div className="text-sm" style={{ color: `${ink}55` }}>{featured.role}</div>}
            </div>
          </div>
        </motion.div>
        {rest.length > 0 && (
          <div className="mt-16 grid md:grid-cols-3 gap-6 pt-10" style={{ borderTop: `1px solid ${ink}10` }}>
            {rest.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <Stars accent={accent} />
                <p className="mt-2 text-sm italic leading-relaxed" style={{ color: `${ink}75` }}>"{t.quote}"</p>
                <div className="mt-3 text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                {t.role && <div className="text-[10px]" style={{ color: `${ink}45` }}>{t.role}</div>}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- Testimonials8: Floating Card Grid ---------- */
export function Testimonials8({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: `${accent}12` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto rounded-3xl p-8 md:p-14 shadow-xl" style={{ background: bg }}>
        <Heading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} whileHover={{ y: -6, boxShadow: `0 20px 40px ${accent}20` }} className="rounded-2xl p-5 transition-shadow" style={{ border: `1px solid ${ink}10`, background: `${ink}02` }}>
              <div className="flex items-start justify-between mb-3">
                <Quote className="h-5 w-5 opacity-40" style={{ color: accent }} />
                <Stars accent={accent} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-2">
                <Avatar name={t.name} accent={accent} size="sm" />
                <div>
                  <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-[10px]" style={{ color: `${ink}45` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Testimonials9: Rotating Card Fan ---------- */
export function Testimonials9({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const rotations = [-3, 2, -1.5, 2.5, -2, 1];
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${bg} 50%, ${accent}20 50%)` }} />
      <div className="relative">
        <Heading props={props} ink={ink} accent={accent} />
        <div className="flex flex-wrap gap-6">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 18, rotate: rotations[i % rotations.length] }} whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }} whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl p-6 w-[260px] shadow-lg cursor-pointer" style={{ background: bg, border: `1px solid ${ink}12` }}>
              <Stars accent={accent} />
              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-2">
                <Avatar name={t.name} accent={accent} size="sm" />
                <div>
                  <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-[10px]" style={{ color: `${ink}45` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials10: Dot Nav Testimonial ---------- */
export function Testimonials10({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [active, setActive] = useState(0);
  const t = items[active];
  if (!t) return null;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <Heading props={props} ink={ink} accent={accent} />
      <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
        <motion.div key={active} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }} className="max-w-xl">
          <Stars accent={accent} />
          <p className="mt-4 font-display text-2xl italic leading-snug" style={{ color: ink }}>"{t.quote}"</p>
          <div className="mt-6 flex items-center gap-3">
            <Avatar name={t.name} accent={accent} size="md" />
            <div>
              <div className="font-semibold text-sm" style={{ color: ink }}>{t.name}</div>
              {t.role && <div className="text-xs" style={{ color: `${ink}50` }}>{t.role}</div>}
            </div>
          </div>
        </motion.div>
        <div className="flex flex-row md:flex-col items-center gap-2 pt-2">
          {items.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className="rounded-full transition-all duration-300" style={{ height: i === active ? 32 : 10, width: 10, background: i === active ? accent : `${ink}20` }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials11: Polaroid Stack ---------- */
export function Testimonials11({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const rotations = [-4, 3, -2, 4, -3, 2];
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <Heading props={props} ink={ink} accent={accent} />
      <div className="flex flex-wrap gap-8">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16, rotate: rotations[i % rotations.length] }} whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }} whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="rounded-lg p-5 w-[240px] shadow-lg cursor-pointer" style={{ background: bg, border: `1px solid ${ink}12` }}>
            {/* Polaroid photo area */}
            <div className="rounded-md h-24 flex items-center justify-center mb-4" style={{ background: `${accent}15` }}>
              <Avatar name={t.name} accent={accent} size="lg" />
            </div>
            <Stars accent={accent} />
            <p className="mt-2 text-xs leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
            <div className="mt-3">
              <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
              {t.role && <div className="text-[10px]" style={{ color: `${ink}45` }}>{t.role}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials12: Mono Terminal Reviews ---------- */
export function Testimonials12({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="font-mono text-xs mb-1" style={{ color: `${ink}50` }}>{"> testimonials --format=verbose"}</div>
      {props.heading && <div className="mb-6 font-mono text-3xl font-bold" style={{ color: ink }}>{props.heading}</div>}
      <div className="space-y-6 font-mono text-sm max-w-3xl">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }} className="rounded-xl p-5" style={{ background: `${ink}04`, border: `1px solid ${ink}10` }}>
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: accent }}>{"// "}</span>
              <span style={{ color: accent }}>@{t.name.toLowerCase().replace(/\s+/g, "_")}</span>
              <span className="flex gap-0.5 ml-auto">{Array.from({ length: 5 }).map((_, s) => <span key={s} style={{ color: accent }}>★</span>)}</span>
            </div>
            <div style={{ color: `${ink}85` }}>{t.quote}</div>
            {t.role && <div className="mt-1 text-xs" style={{ color: `${ink}45` }}>{/* {t.role} */}{t.role}</div>}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials13: Brutalist Review Wall ---------- */
export function Testimonials13({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-16" style={{ borderTop: `3px solid ${ink}` }}>
      <div className="inline-block px-3 py-1 mb-4 text-[10px] uppercase tracking-widest font-extrabold" style={{ background: ink, color: bg }}>Testimonials</div>
      {props.heading && <div className="mb-6 font-display text-5xl uppercase tracking-tight leading-none" style={{ color: ink }}>{props.heading}</div>}
      <div className="grid md:grid-cols-3 gap-0">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }} whileHover={{ background: `${accent}15` }} className="p-6 transition-colors" style={{ border: `2px solid ${ink}`, marginLeft: i % 3 !== 0 ? "-2px" : 0, marginTop: i >= 3 ? "-2px" : 0 }}>
            <div className="flex gap-0.5 mb-3">{Array.from({ length: 5 }).map((_, s) => <span key={s} className="text-sm" style={{ color: accent }}>★</span>)}</div>
            <p className="text-sm font-bold leading-relaxed mb-4" style={{ color: ink }}>"{t.quote}"</p>
            <div className="flex items-center gap-2">
              <Avatar name={t.name} accent={accent} size="sm" />
              <div>
                <div className="text-xs font-extrabold uppercase" style={{ color: accent }}>{t.name}</div>
                {t.role && <div className="text-[10px]" style={{ color: `${ink}60` }}>{t.role}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials14: Ambient Glow Quote ---------- */
export function Testimonials14({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const featured = items[0];
  const rest = items.slice(1);
  if (!featured) return null;
  return (
    <section className="relative px-8 md:px-16 py-32 overflow-hidden text-center" style={{ background: ink }}>
      {/* Orb */}
      <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: accent }} />
      <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative max-w-2xl mx-auto">
        <Avatar name={featured.name} accent={accent} size="lg" />
        <div className="mt-4 flex justify-center"><Stars accent={accent} /></div>
        <p className="mt-6 font-display text-3xl md:text-4xl italic leading-snug" style={{ color: `${accent}ee` }}>"{featured.quote}"</p>
        <div className="mt-6 text-sm font-semibold" style={{ color: accent }}>{featured.name}</div>
        {featured.role && <div className="text-xs mt-1" style={{ color: `${accent}70` }}>{featured.role}</div>}
      </motion.div>
      {rest.length > 0 && (
        <div className="relative mt-14 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {rest.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="rounded-2xl p-5 text-left" style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
              <Stars accent={accent} />
              <p className="mt-2 text-xs leading-relaxed" style={{ color: `${accent}80` }}>"{t.quote}"</p>
              <div className="mt-3 text-xs font-semibold" style={{ color: accent }}>{t.name}</div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------- Testimonials15: Arrow Carousel ---------- */
export function Testimonials15({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="p-6 md:p-10">
      <div className="relative rounded-3xl px-8 md:px-16 py-16 overflow-hidden" style={{ border: `1.5px solid ${ink}18` }}>
        <div className="flex items-end justify-between mb-8">
          <Heading props={props} ink={ink} accent={accent} />
          <div className="flex gap-3 mb-8">
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev} className="h-11 w-11 rounded-full grid place-items-center disabled:opacity-30" style={{ background: `${accent}15`, border: `1.5px solid ${accent}30` }}>
              <ChevronLeft className="h-5 w-5" style={{ color: accent }} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} onClick={() => emblaApi?.scrollNext()} disabled={!canNext} className="h-11 w-11 rounded-full grid place-items-center disabled:opacity-30" style={{ background: accent, border: `1.5px solid ${accent}` }}>
              <ChevronRight className="h-5 w-5 text-white" />
            </motion.button>
          </div>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((t, i) => (
              <div key={i} className="shrink-0 basis-full md:basis-[60%] rounded-2xl p-8" style={{ background: `${accent}10` }}>
                <Stars accent={accent} />
                <p className="mt-4 font-display text-xl italic leading-relaxed" style={{ color: ink }}>"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar name={t.name} accent={accent} size="md" />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: ink }}>{t.name}</div>
                    {t.role && <div className="text-xs" style={{ color: `${ink}50` }}>{t.role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          {items.map((_, i) => (
            <button key={i} onClick={() => emblaApi?.scrollTo(i)} className="h-1.5 rounded-full transition-all duration-300" style={{ width: i === selectedIndex ? 32 : 8, background: i === selectedIndex ? accent : `${ink}20` }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials16: Pull-Quote Editorial ---------- */
export function Testimonials16({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const featured = items[0];
  const rest = items.slice(1);
  if (!featured) return null;
  return (
    <section className="px-8 md:px-16 py-24 grid md:grid-cols-2 gap-12" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <Heading props={props} ink={ink} accent={accent} />
        <Stars accent={accent} />
        <p className="mt-4 font-display text-3xl italic leading-snug" style={{ color: accent }}>"{featured.quote}"</p>
        <div className="mt-6 flex items-center gap-3">
          <Avatar name={featured.name} accent={accent} size="md" />
          <div>
            <div className="font-semibold text-sm" style={{ color: ink }}>{featured.name}</div>
            {featured.role && <div className="text-xs" style={{ color: `${ink}50` }}>{featured.role}</div>}
          </div>
        </div>
      </motion.div>
      <div className="space-y-5">
        {rest.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }} className="pl-5 py-1" style={{ borderLeft: `3px solid ${accent}` }}>
            <Stars accent={accent} />
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
            <div className="mt-2 flex items-center gap-2">
              <Avatar name={t.name} accent={accent} size="sm" />
              <div>
                <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                {t.role && <div className="text-[10px]" style={{ color: `${ink}45` }}>{t.role}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials17: Sidebar + Scroll Stack ---------- */
export function Testimonials17({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="flex flex-col md:flex-row min-h-[480px]" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="md:w-1/5 flex items-center justify-center p-10" style={{ background: `${ink}06` }}>
        <div className="md:-rotate-90 whitespace-nowrap font-display text-2xl tracking-tight" style={{ color: ink }}>{props.heading || "Testimonials"}</div>
      </div>
      <div className="flex-1 px-8 md:px-12 py-12 overflow-y-auto space-y-6" style={{ maxHeight: 520 }}>
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="pb-6" style={{ borderBottom: i < items.length - 1 ? `1px solid ${ink}10` : "none" }}>
            <Stars accent={accent} />
            <p className="mt-3 text-base leading-relaxed" style={{ color: ink }}>"{t.quote}"</p>
            <div className="mt-3 flex items-center gap-2">
              <Avatar name={t.name} accent={accent} size="sm" />
              <div>
                <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                {t.role && <div className="text-[10px]" style={{ color: accent }}>{t.role}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials18: Masonry Cards ---------- */
export function Testimonials18({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-24" style={{ backgroundImage: `radial-gradient(${ink}20 1px, transparent 1px)`, backgroundSize: "20px 20px" }}>
      <div className="rounded-3xl p-10" style={{ background: bg }}>
        <Heading props={props} ink={ink} accent={accent} />
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} whileHover={{ y: -4 }} className="break-inside-avoid rounded-2xl p-5 mb-5" style={{ background: i % 3 === 0 ? `${accent}12` : i % 3 === 1 ? `${ink}04` : `${accent}06`, border: `1px solid ${ink}08` }}>
              <Stars accent={accent} />
              <p className="mt-3 text-sm leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-2">
                <Avatar name={t.name} accent={accent} size="sm" />
                <div>
                  <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-[10px]" style={{ color: `${ink}45` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials19: Dark Outline Cards ---------- */
export function Testimonials19({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: ink }}>
      <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: `${bg}50` }}>Testimonials</div>
      {props.heading && (
        <div className="mb-10 font-display text-5xl leading-[0.95] tracking-tight" style={{ color: "transparent", WebkitTextStroke: `1.5px ${bg}` }}>
          {props.heading}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} whileHover={{ borderColor: accent }} className="rounded-2xl p-6 transition-colors" style={{ border: `1.5px solid ${bg}20` }}>
            <div className="flex items-start justify-between mb-3">
              <Stars accent={accent} />
              <Avatar name={t.name} accent={accent} size="sm" />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: `${bg}80` }}>"{t.quote}"</p>
            <div className="mt-4">
              <div className="text-sm font-semibold" style={{ color: accent }}>{t.name}</div>
              {t.role && <div className="text-xs" style={{ color: `${bg}40` }}>{t.role}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials20: Compact Ticker ---------- */
export function Testimonials20({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section style={{ borderTop: `1px solid ${ink}10`, borderBottom: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16 py-4 flex items-center gap-3" style={{ borderBottom: `1px solid ${ink}06` }}>
        <div className="text-[10px] tracking-[0.25em] uppercase font-medium shrink-0" style={{ color: accent }}>Reviews</div>
        <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3" style={{ color: accent, fill: accent }} />)}</div>
        {props.heading && <div className="text-sm font-medium ml-2" style={{ color: ink }}>{props.heading}</div>}
      </div>
      <div className="px-8 md:px-16 py-5 flex flex-wrap gap-x-10 gap-y-4">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="flex items-center gap-3">
            <Avatar name={t.name} accent={accent} size="sm" />
            <div>
              <span className="text-sm" style={{ color: `${ink}75` }}>"{t.quote}"</span>
              <span className="ml-2 text-xs font-medium" style={{ color: accent }}>— {t.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials21: Luxury Client Reviews ---------- */
export function Testimonials21({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const gold = "#C9A84C";
  return (
    <section className="px-8 md:px-16 py-28" style={{ background: "#FDFAF4", borderTop: `1px solid ${gold}30` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
        <div className="text-[10px] tracking-[0.4em] uppercase font-medium mb-2" style={{ color: gold }}>Client Testimonials</div>
        {props.heading && <div className="font-display text-4xl tracking-tight" style={{ color: ink }}>{props.heading}</div>}
        <div className="mx-auto mt-4 w-16 h-px" style={{ background: gold }} />
      </motion.div>
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center px-6 py-8 rounded-3xl" style={{ background: "#FFF9EE", border: `1px solid ${gold}25` }}>
            <div className="flex justify-center gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4" style={{ color: gold, fill: gold }} />)}
            </div>
            <div className="text-4xl font-serif mb-4 opacity-20" style={{ color: gold }}>"</div>
            <p className="text-sm leading-relaxed italic font-serif" style={{ color: `${ink}80` }}>{t.quote}</p>
            <div className="mt-6 w-10 h-px mx-auto" style={{ background: `${gold}50` }} />
            <div className="mt-4 mx-auto h-12 w-12 rounded-full flex items-center justify-center font-semibold text-sm" style={{ background: `${gold}20`, color: gold }}>{initials(t.name)}</div>
            <div className="mt-2 text-xs font-semibold tracking-widest uppercase" style={{ color: ink }}>{t.name}</div>
            {t.role && <div className="text-[10px] mt-0.5" style={{ color: `${ink}50` }}>{t.role}</div>}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials22: Neon Testimonials ---------- */
export function Testimonials22({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const neon = accent;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: "#0A0A0F" }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-10">
        <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: neon }}>Testimonials</div>
        {props.heading && <div className="font-display text-4xl" style={{ color: "#fff" }}>{props.heading}</div>}
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} whileHover={{ boxShadow: `0 0 30px ${neon}35` }} className="rounded-2xl p-6 transition-shadow" style={{ border: `1px solid ${neon}40`, background: "#12121A" }}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" style={{ color: neon, fill: neon }} />)}
              </div>
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: `${neon}20`, color: neon }}>{initials(t.name)}</div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>"{t.quote}"</p>
            <div className="mt-4">
              <div className="text-sm font-semibold" style={{ color: neon, textShadow: `0 0 10px ${neon}60` }}>{t.name}</div>
              {t.role && <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{t.role}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials23: Magazine Style ---------- */
export function Testimonials23({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const featured = items[0];
  const rest = items.slice(1);
  if (!featured) return null;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `4px solid ${ink}` }}>
      <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
          <div className="text-[10px] tracking-[0.35em] uppercase font-medium mb-6" style={{ color: accent }}>Featured Review</div>
          <div className="font-display text-7xl leading-none opacity-10 select-none mb-2" style={{ color: ink }}>"</div>
          <Stars accent={accent} />
          <p className="mt-4 font-display text-4xl italic leading-snug" style={{ color: ink }}>{featured.quote}</p>
          <div className="mt-8 flex items-center gap-4 pt-6" style={{ borderTop: `1px solid ${ink}15` }}>
            <Avatar name={featured.name} accent={accent} size="lg" />
            <div>
              <div className="text-lg font-semibold" style={{ color: ink }}>{featured.name}</div>
              {featured.role && <div className="text-sm" style={{ color: `${ink}55` }}>{featured.role}</div>}
            </div>
          </div>
        </motion.div>
        <div className="space-y-5">
          <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4" style={{ color: accent }}>More Reviews</div>
          {rest.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="pb-5" style={{ borderBottom: `1px solid ${ink}10` }}>
              <Stars accent={accent} />
              <p className="mt-2 text-sm italic leading-relaxed" style={{ color: `${ink}75` }}>"{t.quote}"</p>
              <div className="mt-2 flex items-center gap-2">
                <Avatar name={t.name} accent={accent} size="sm" />
                <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials24: Glass Cards ---------- */
export function Testimonials24({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}30 0%, ${ink}15 50%, ${accent}20 100%)` }}>
      {/* Background orbs */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: accent }} />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: ink }} />
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative mb-10">
        <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: `${ink}70` }}>Testimonials</div>
        {props.heading && <div className="font-display text-4xl" style={{ color: ink }}>{props.heading}</div>}
      </motion.div>
      <div className="relative grid md:grid-cols-3 gap-5">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} whileHover={{ y: -6 }} className="rounded-3xl p-6 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
            <Stars accent={accent} />
            <p className="mt-3 text-sm leading-relaxed" style={{ color: `${ink}85` }}>"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-xs font-semibold backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.3)", color: ink, border: "1px solid rgba(255,255,255,0.5)" }}>{initials(t.name)}</div>
              <div>
                <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
                {t.role && <div className="text-xs" style={{ color: `${ink}60` }}>{t.role}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials25: Handwritten Style ---------- */
export function Testimonials25({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: "#FEFCF8", borderTop: `1px solid ${ink}08` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-10">
        <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: accent }}>What people say</div>
        {props.heading && <div className="font-display text-3xl" style={{ color: ink }}>{props.heading}</div>}
      </motion.div>
      <div className="space-y-10 max-w-3xl">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -18 : 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className={`flex gap-5 items-start ${i % 2 !== 0 ? "flex-row-reverse" : ""}`}>
            <div className="h-14 w-14 rounded-full flex items-center justify-center text-base font-semibold shrink-0" style={{ background: `${accent}20`, color: accent }}>{initials(t.name)}</div>
            <div className="rounded-3xl px-6 py-5 flex-1" style={{ background: i % 2 === 0 ? `${accent}10` : `${ink}05`, border: `1px solid ${i % 2 === 0 ? `${accent}20` : `${ink}08`}` }}>
              <div className="flex gap-0.5 mb-2">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3 w-3" style={{ color: accent, fill: accent }} />)}</div>
              <p className="text-sm italic leading-relaxed font-serif" style={{ color: `${ink}80` }}>"{t.quote}"</p>
              <div className="mt-3 text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
              {t.role && <div className="text-[10px]" style={{ color: `${ink}45` }}>{t.role}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials26: Corporate Social Proof ---------- */
export function Testimonials26({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const stats = [
    { value: "98%", label: "Satisfaction Rate" },
    { value: "500+", label: "Happy Clients" },
    { value: "4.9/5", label: "Average Rating" },
  ];
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
        {/* Left: stats */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <Heading props={props} ink={ink} accent={accent} />
          <div className="space-y-6">
            {stats.map((s, i) => (
              <div key={i} className="pb-5" style={{ borderBottom: `1px solid ${ink}10` }}>
                <div className="font-display text-4xl font-bold" style={{ color: accent }}>{s.value}</div>
                <div className="text-xs tracking-wider uppercase mt-1" style={{ color: `${ink}55` }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Right: reviews */}
        <div className="space-y-4">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="rounded-2xl p-6" style={{ background: bg, border: `1px solid ${ink}10` }}>
              <div className="flex items-start justify-between mb-3">
                <Stars accent={accent} />
                <div className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: `${accent}15`, color: accent }}>Verified</div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: `${ink}80` }}>"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar name={t.name} accent={accent} size="sm" />
                <div>
                  <div className="text-xs font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-[10px]" style={{ color: `${ink}50` }}>{t.role}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials27: Athletic Endorsements ---------- */
export function Testimonials27({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="px-8 md:px-16 py-20" style={{ background: ink }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-10">
        <div className="text-[10px] tracking-[0.4em] uppercase font-bold mb-2" style={{ color: accent }}>Endorsements</div>
        {props.heading && <div className="font-display text-5xl font-black uppercase tracking-tight leading-none" style={{ color: bg }}>{props.heading}</div>}
      </motion.div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} whileHover={{ scale: 1.02 }} className="rounded-2xl p-6 flex gap-5 items-start" style={{ background: `${bg}08`, border: `1px solid ${bg}15` }}>
            <div className="h-14 w-14 rounded-xl flex items-center justify-center text-base font-black shrink-0" style={{ background: accent, color: bg }}>{initials(t.name)}</div>
            <div className="flex-1">
              <div className="flex gap-0.5 mb-2">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3.5 w-3.5" style={{ color: accent, fill: accent }} />)}</div>
              <p className="text-sm font-semibold leading-relaxed uppercase" style={{ color: bg }}>"{t.quote}"</p>
              <div className="mt-3 text-xs font-bold" style={{ color: accent }}>{t.name}</div>
              {t.role && <div className="text-[10px]" style={{ color: `${bg}50` }}>{t.role}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials28: Community Reviews ---------- */
export function Testimonials28({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const colors = [`${accent}20`, `${ink}06`, `${accent}12`, `${ink}08`];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: `${accent}06` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-10 text-center">
        <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: accent }}>Community Love</div>
        {props.heading && <div className="font-display text-3xl" style={{ color: ink }}>{props.heading}</div>}
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} whileHover={{ scale: 1.02 }} className="rounded-3xl p-6" style={{ background: i % 2 === 0 ? bg : colors[i % colors.length], border: `1px solid ${ink}08` }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: `${accent}25`, color: accent }}>{initials(t.name)}</div>
              <div>
                <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
                {t.role && <div className="text-xs" style={{ color: `${ink}50` }}>{t.role}</div>}
              </div>
            </div>
            <div className="flex gap-0.5 mb-3">{Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-3 w-3" style={{ color: accent, fill: accent }} />)}</div>
            <p className="text-sm leading-relaxed" style={{ color: `${ink}75` }}>"{t.quote}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Testimonials29: Rating Dashboard ---------- */
export function Testimonials29({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const avgRating = "4.9";
  const totalReviews = items.length;
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <Heading props={props} ink={ink} accent={accent} />
      <div className="grid md:grid-cols-[280px_1fr] gap-10 items-start">
        {/* Dashboard panel */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="rounded-3xl p-8 text-center" style={{ background: `linear-gradient(135deg, ${accent}15, ${accent}05)`, border: `1.5px solid ${accent}25` }}>
          <div className="font-display text-6xl font-bold" style={{ color: ink }}>{avgRating}</div>
          <div className="flex justify-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-5 w-5" style={{ color: accent, fill: accent }} />)}
          </div>
          <div className="mt-2 text-sm" style={{ color: `${ink}55` }}>out of 5.0</div>
          <div className="mt-4 text-xs" style={{ color: `${ink}45` }}>{totalReviews} verified reviews</div>
          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span style={{ color: `${ink}60`, width: 10 }}>{star}</span>
                <Star className="h-3 w-3 shrink-0" style={{ color: accent, fill: accent }} />
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: `${ink}12` }}>
                  <div className="h-full rounded-full" style={{ width: star === 5 ? "80%" : star === 4 ? "15%" : "5%", background: accent }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Reviews list */}
        <div className="space-y-4">
          {items.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${ink}08` }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Avatar name={t.name} accent={accent} size="sm" />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
                    {t.role && <div className="text-[10px]" style={{ color: `${ink}45` }}>{t.role}</div>}
                  </div>
                </div>
                <Stars accent={accent} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: `${ink}75` }}>"{t.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials30: Event Testimonials ---------- */
export function Testimonials30({ props, theme }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const occasions = ["Annual Summit", "Product Launch", "Workshop", "Conference", "Gala", "Retreat", "Symposium"];
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-12">
        <div className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2" style={{ color: accent }}>Event Testimonials</div>
        {props.heading && <div className="font-display text-4xl" style={{ color: ink }}>{props.heading}</div>}
      </motion.div>
      <div className="space-y-5 max-w-4xl">
        {items.map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className="grid md:grid-cols-[180px_1fr] gap-6 rounded-3xl overflow-hidden" style={{ border: `1px solid ${ink}10` }}>
            {/* Event badge */}
            <div className="flex flex-col items-center justify-center p-6 text-center" style={{ background: `${accent}12` }}>
              <div className="text-xs font-semibold tracking-wider uppercase mb-1" style={{ color: accent }}>{occasions[i % occasions.length]}</div>
              <div className="text-[10px]" style={{ color: `${ink}45` }}>2024</div>
              <div className="mt-3"><Avatar name={t.name} accent={accent} size="md" /></div>
            </div>
            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Stars accent={accent} />
                <Quote className="h-4 w-4 opacity-30" style={{ color: accent }} />
              </div>
              <p className="text-sm leading-relaxed italic" style={{ color: `${ink}80` }}>"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-2 pt-4" style={{ borderTop: `1px solid ${ink}08` }}>
                <div>
                  <div className="text-sm font-semibold" style={{ color: ink }}>{t.name}</div>
                  {t.role && <div className="text-xs" style={{ color: `${ink}50` }}>{t.role}</div>}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
