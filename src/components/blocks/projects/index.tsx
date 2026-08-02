import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Editable } from "@/components/editor/Editable";
import type { BlockComponentProps } from "../types";
import type { ProjectsProps } from "@/types/builder.schema";

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

/* ---------- Projects1: Classic Grid — 2-col, hover lift, click opens drawer ---------- */
export function Projects1({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{ border: `1px solid ${activeIdx === i ? accent : `${ink}12`}`, boxShadow: activeIdx === i ? `0 0 0 2px ${accent}40` : undefined }}
            >
              <div className="aspect-video" style={{ background: it.featured ? accent : `${ink}10` }} />
              <div className="p-5 flex items-start justify-between">
                <div>
                  <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-display text-xl" style={{ color: ink }} />
                  {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="mt-1 text-sm" style={{ color: `${ink}70` }} />}
                </div>
                <motion.div animate={{ rotate: activeIdx === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <ArrowUpRight className="h-4 w-4 mt-1 shrink-0" style={{ color: accent }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {activeIdx !== null && items[activeIdx] && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-5 rounded-2xl p-6"
              style={{ border: `1px solid ${accent}30`, background: `${accent}08` }}
            >
              <div className="font-display text-2xl mb-2" style={{ color: ink }}>{items[activeIdx].title}</div>
              {items[activeIdx].desc && <p className="text-sm mb-4" style={{ color: `${ink}75` }}>{items[activeIdx].desc}</p>}
              <button className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
                View Project <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ---------- Projects2: List Rows — rows with title + desc + arrow, click expands ---------- */
export function Projects2({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="px-8 md:px-16 py-20 grid md:grid-cols-2 gap-10 items-start" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <SectionHeading props={props} ink={ink} accent={accent} />
        <p className="text-sm" style={{ color: `${ink}60` }}>Click any project to learn more.</p>
      </motion.div>
      <div>
        {items.map((it, i) => (
          <div key={i}>
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className="flex items-center justify-between gap-6 py-5 cursor-pointer group"
              style={{ borderTop: i > 0 ? `1px solid ${ink}10` : undefined }}
            >
              <div>
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="text-lg font-medium" style={{ color: ink }} />
                <AnimatePresence>
                  {activeIdx !== i && it.desc && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm mt-0.5" style={{ color: `${ink}65` }}>{it.desc}</motion.p>
                  )}
                </AnimatePresence>
              </div>
              <motion.div animate={{ rotate: activeIdx === i ? 90 : 0 }} transition={{ duration: 0.2 }}>
                <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: accent }} />
              </motion.div>
            </motion.div>
            <AnimatePresence>
              {activeIdx === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pl-0 pr-4">
                    {it.desc && <p className="text-sm mb-3" style={{ color: `${ink}70` }}>{it.desc}</p>}
                    <a href={it.url || "#"} className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: accent }}>
                      View Project <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects3: Dark Showcase — dark gradient bg, 3-col grid, click opens detail overlay ---------- */
export function Projects3({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: `linear-gradient(160deg, ${ink}, ${accent}30)` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}70` }}>{props.eyebrow || "Selected Work"}</div>
        {props.heading && <div className="mt-1 mb-8 font-display text-4xl tracking-tight" style={{ color: bg }}>{props.heading}</div>}
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className="rounded-2xl overflow-hidden cursor-pointer relative"
              style={{ background: `${bg}10`, border: `1px solid ${activeIdx === i ? accent : `${bg}20`}` }}
            >
              <div className="aspect-video" style={{ background: it.featured ? accent : `${bg}10` }} />
              <div className="p-4">
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="text-sm font-medium" style={{ color: bg }} />
                {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs mt-1" style={{ color: `${bg}65` }} />}
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {activeIdx !== null && items[activeIdx] && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 rounded-2xl p-6"
              style={{ background: `${bg}12`, border: `1px solid ${accent}50` }}
            >
              <div className="font-display text-xl mb-2" style={{ color: bg }}>{items[activeIdx].title}</div>
              {items[activeIdx].desc && <p className="text-sm mb-4" style={{ color: `${bg}80` }}>{items[activeIdx].desc}</p>}
              <button className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
                View Project <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ---------- Projects4: Terminal Listing — click opens project in terminal ---------- */
export function Projects4({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
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
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className="cursor-pointer"
            >
              <div className="flex gap-3 hover:opacity-80 transition-opacity">
                <span style={{ color: accent }}>$</span>
                <span style={{ color: activeIdx === i ? accent : ink }}>{it.title}</span>
                {it.desc && activeIdx !== i && <span style={{ color: `${ink}50` }}>— {it.desc}</span>}
              </div>
              <AnimatePresence>
                {activeIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden ml-5 mt-1 border-l-2 pl-3"
                    style={{ borderColor: `${accent}50` }}
                  >
                    <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-bold" style={{ color: accent }} />
                    {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="mt-1 text-xs" style={{ color: `${ink}70` }} />}
                    <div className="mt-2 text-xs" style={{ color: `${ink}50` }}>cat README.md → <a href={it.url || "#"} style={{ color: accent }}>Open Project ↗</a></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects5: Animated Marquee — click pauses and shows detail ---------- */
export function Projects5({ props, theme }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const track = [...items, ...items];
  return (
    <section className="py-20 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16"><SectionHeading props={props} ink={ink} accent={accent} /></div>
      <div className="overflow-hidden whitespace-nowrap mb-6">
        <motion.div
          animate={paused ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center"
        >
          {track.map((it, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              onClick={() => { setActiveIdx(i % items.length); setPaused(true); }}
              className="inline-flex items-center mx-8 font-display text-3xl cursor-pointer"
              style={{ color: activeIdx === i % items.length ? accent : (i % 2 === 0 ? ink : `${ink}60`) }}
            >
              {it.title}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {activeIdx !== null && items[activeIdx] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mx-8 md:mx-16 rounded-2xl p-6 flex items-start justify-between"
            style={{ border: `1px solid ${accent}30`, background: `${accent}08` }}
          >
            <div>
              <div className="font-display text-2xl mb-1" style={{ color: ink }}>{items[activeIdx].title}</div>
              {items[activeIdx].desc && <p className="text-sm mb-3" style={{ color: `${ink}70` }}>{items[activeIdx].desc}</p>}
              <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
                View Project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <button onClick={() => { setActiveIdx(null); setPaused(false); }} className="text-xs px-3 py-1.5 rounded-full" style={{ background: `${ink}10`, color: ink }}>
              Resume ▶
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Projects6: Numbered List — large numbered items, click expands ---------- */
export function Projects6({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="px-8 md:px-16 py-16" style={{ borderBottom: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="max-w-2xl">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="space-y-0">
          {items.map((it, i) => (
            <div key={i} style={{ borderTop: `1px solid ${ink}10` }}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                className="flex items-baseline gap-5 py-5 cursor-pointer group"
              >
                <span className="font-display text-4xl w-12 shrink-0 leading-none" style={{ color: `${accent}50` }}>{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="text-xl font-medium" style={{ color: ink }} />
                </div>
                <motion.div animate={{ rotate: activeIdx === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <ArrowUpRight className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: accent }} />
                </motion.div>
              </motion.div>
              <AnimatePresence>
                {activeIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-17" style={{ paddingLeft: "68px" }}>
                      {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-sm mb-3" style={{ color: `${ink}70` }} />}
                      <a href={it.url || "#"} className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: accent }}>
                        View Project <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects7: Editorial Zigzag — alternating left/right full-width items ---------- */
export function Projects7({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16 mb-12">
        <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${ink}55` }}>{props.eyebrow || "Selected Work"}</div>
        {props.heading && <div className="mt-1 font-display text-[8vw] md:text-[4.5vw] leading-[0.9] tracking-tight" style={{ color: ink }}>{props.heading}</div>}
      </div>
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.05 }}
          className={`px-8 md:px-16 py-10 grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
          style={{ borderTop: `1px solid ${ink}08` }}
        >
          <div className="aspect-video rounded-2xl overflow-hidden" style={{ background: it.featured ? `${accent}20` : `${ink}08` }}>
            <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${it.featured ? accent : ink}20, transparent)` }} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: accent }}>Project {String(i + 1).padStart(2, "0")}</div>
            <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-display text-2xl mb-2" style={{ color: ink }} />
            {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-sm" style={{ color: `${ink}70` }} />}
            <a href={it.url || "#"} className="mt-4 inline-flex items-center gap-1 text-sm font-medium" style={{ color: accent }}>
              View Project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

/* ---------- Projects8: Card Carousel — embla carousel, click to expand detail below ---------- */
export function Projects8({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
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
    <section className="px-8 md:px-16 py-20" style={{ background: `${accent}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12" style={{ background: bg, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}>
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
              <motion.div
                key={i}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                className="shrink-0 basis-[75%] md:basis-[45%] rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: `1px solid ${activeIdx === i ? accent : `${ink}12`}` }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-video" style={{ background: it.featured ? accent : `${ink}10` }} />
                <div className="p-4 flex items-start justify-between">
                  <div>
                    <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-medium" style={{ color: ink }} />
                    {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs mt-1" style={{ color: `${ink}65` }} />}
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 mt-0.5" style={{ color: accent }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {activeIdx !== null && items[activeIdx] && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 rounded-2xl p-5"
              style={{ border: `1px solid ${accent}30`, background: `${accent}08` }}
            >
              <div className="font-display text-xl mb-1" style={{ color: ink }}>{items[activeIdx].title}</div>
              {items[activeIdx].desc && <p className="text-sm mb-3" style={{ color: `${ink}70` }}>{items[activeIdx].desc}</p>}
              <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
                View Project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ---------- Projects9: Bento Grid — asymmetric, first item spans 2 cols, click expands ---------- */
export function Projects9({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: bg }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(115deg, ${bg} 45%, ${accent}15 45%)` }} />
      <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="relative">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-3 gap-4 md:auto-rows-[180px]">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className={`rounded-2xl overflow-hidden relative cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{
                background: it.featured ? `${accent}20` : `${ink}08`,
                border: `1px solid ${activeIdx === i ? accent : `${ink}10`}`,
              }}
            >
              <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${it.featured ? accent : ink}15, transparent)` }} />
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }}>
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="text-sm font-medium text-white" />
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {activeIdx !== null && items[activeIdx] && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mt-5 rounded-2xl p-6"
              style={{ border: `1px solid ${accent}30`, background: `${accent}08` }}
            >
              <div className="font-display text-xl mb-2" style={{ color: ink }}>{items[activeIdx].title}</div>
              {items[activeIdx].desc && <Editable as="p" value={items[activeIdx].desc!} onChange={(v) => updateItem(items, onChange, activeIdx, { desc: v })} className="text-sm mb-4" style={{ color: `${ink}70` }} />}
              <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
                View Project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ---------- Projects10: Table View — elegant table, row hover, click expands inline ---------- */
export function Projects10({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="px-8 md:px-16 py-20 grid md:grid-cols-[220px_1fr] gap-10" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
        <SectionHeading props={props} ink={ink} accent={accent} />
      </motion.div>
      <div className="w-full">
        <table className="w-full text-sm">
          <tbody>
            {items.map((it, i) => (
              <>
                <motion.tr
                  key={`row-${i}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  className="cursor-pointer group"
                  style={{ borderTop: `1px solid ${ink}10`, background: activeIdx === i ? `${accent}08` : undefined }}
                >
                  <td className="py-4 pr-4 font-medium" style={{ color: activeIdx === i ? accent : ink }}>
                    <Editable as="span" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} />
                  </td>
                  <td className="py-4 pr-4" style={{ color: `${ink}65` }}>
                    {it.desc && <Editable as="span" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} />}
                  </td>
                  <td className="py-4 text-right">
                    <motion.span animate={{ rotate: activeIdx === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="inline-block">
                      <ArrowUpRight className="h-4 w-4 inline" style={{ color: accent }} />
                    </motion.span>
                  </td>
                </motion.tr>
                <AnimatePresence>
                  {activeIdx === i && (
                    <motion.tr
                      key={`detail-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <td colSpan={3} className="pb-4 pt-0">
                        <div className="rounded-xl px-5 py-4" style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}>
                          <p className="text-sm mb-3" style={{ color: `${ink}75` }}>{it.desc || it.title}</p>
                          <a href={it.url || "#"} className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: accent }}>
                            View Project <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---------- Projects11: Polaroid Wall — tilted cards, hover straightens, click opens detail ---------- */
export function Projects11({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const rotations = [-3, 2, -2, 3, -1, 2.5, -1.5];
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="flex flex-wrap gap-6 mb-6">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, rotate: rotations[i % rotations.length] }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
            whileHover={{ rotate: 0, scale: 1.05 }}
            animate={activeIdx === i ? { rotate: 0, scale: 1.05, y: -4 } : {}}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className="rounded-lg p-3 w-[200px] cursor-pointer"
            style={{
              background: bg,
              border: `1px solid ${activeIdx === i ? accent : `${ink}15`}`,
              boxShadow: activeIdx === i ? `0 8px 30px ${accent}30` : "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div className="aspect-square rounded-sm" style={{ background: it.featured ? `${accent}30` : `${ink}10` }} />
            <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="mt-3 text-center text-xs font-medium" style={{ color: ink }} />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {activeIdx !== null && items[activeIdx] && (
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-6"
            style={{ border: `1px solid ${accent}30`, background: `${accent}08` }}
          >
            <div className="font-display text-xl mb-2" style={{ color: ink }}>{items[activeIdx].title}</div>
            {items[activeIdx].desc && <p className="text-sm mb-4" style={{ color: `${ink}70` }}>{items[activeIdx].desc}</p>}
            <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
              View Project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Projects12: Terminal Output — mono listing, click to "cat" project details ---------- */
export function Projects12({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="font-mono text-xs" style={{ color: `${ink}50` }}>{"> " + (props.eyebrow || "projects")}</div>
      {props.heading && <div className="mt-3 font-mono text-2xl md:text-3xl" style={{ color: ink }}>{props.heading}</div>}
      <div className="mt-6 rounded-xl overflow-hidden" style={{ border: `1px solid ${ink}15`, background: `${ink}04` }}>
        <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ borderBottom: `1px solid ${ink}10`, background: `${ink}06` }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff6058" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#27ca40" }} />
          <span className="ml-2 font-mono text-[10px]" style={{ color: `${ink}40` }}>projects/</span>
        </div>
        <div className="p-6 font-mono text-sm space-y-1">
          {items.map((it, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                className="flex gap-3 cursor-pointer hover:opacity-75 transition-opacity py-1"
              >
                <span style={{ color: accent }}>❯</span>
                <span style={{ color: activeIdx === i ? accent : ink }}>cat {it.title.toLowerCase().replace(/\s+/g, "-")}.md</span>
              </motion.div>
              <AnimatePresence>
                {activeIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-5 my-2 p-4 rounded-lg" style={{ background: `${accent}10`, border: `1px solid ${accent}20` }}>
                      <div className="font-bold mb-1" style={{ color: accent }}>
                        <Editable as="span" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} />
                      </div>
                      {it.desc && (
                        <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs mb-2" style={{ color: `${ink}70` }} />
                      )}
                      <a href={it.url || "#"} style={{ color: accent }} className="text-xs">→ View Project</a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects13: Brutalist Grid — thick borders, hover inverts, click opens ---------- */
export function Projects13({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="px-8 md:px-16 py-16" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="inline-block px-2 py-0.5 mb-4 text-[10px] uppercase tracking-widest font-bold" style={{ background: ink, color: bg }}>{props.eyebrow || "Work"}</div>
      {props.heading && <div className="mb-6 font-display text-4xl uppercase tracking-tight" style={{ color: ink }}>{props.heading}</div>}
      <div className="grid md:grid-cols-2 gap-0">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ background: ink }}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className="p-6 cursor-pointer group transition-colors"
            style={{
              border: `2px solid ${ink}`,
              marginLeft: i % 2 === 1 ? "-2px" : 0,
              marginTop: i >= 2 ? "-2px" : 0,
              background: activeIdx === i ? ink : bg,
            }}
          >
            <Editable
              as="div"
              value={it.title}
              onChange={(v) => updateItem(items, onChange, i, { title: v })}
              className="font-display text-xl uppercase"
              style={{ color: activeIdx === i ? bg : ink }}
            />
            {it.desc && (
              <Editable
                as="p"
                value={it.desc}
                onChange={(v) => updateItem(items, onChange, i, { desc: v })}
                className="mt-1 text-sm font-bold"
                style={{ color: activeIdx === i ? `${bg}80` : accent }}
              />
            )}
            <AnimatePresence>
              {activeIdx === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden mt-3"
                >
                  <a href={it.url || "#"} className="inline-flex items-center gap-1 text-sm font-bold uppercase" style={{ color: bg }}>
                    Open Project <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects14: Spotlight Hero + Grid — featured project + smaller grid, click on any ---------- */
export function Projects14({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [first, ...rest] = items;
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ borderTop: `1px solid ${ink}10` }}>
      <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 -right-20 h-[380px] w-[380px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: accent }} />
      <div className="relative">
        <SectionHeading props={props} ink={ink} accent={accent} />
        {first && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveIdx(activeIdx === 0 ? null : 0)}
            className="rounded-2xl overflow-hidden mb-4 cursor-pointer"
            style={{ border: `1px solid ${activeIdx === 0 ? accent : `${ink}12`}` }}
          >
            <div className="aspect-[21/9]" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}50)` }} />
            <div className="p-6 flex justify-between items-start">
              <div>
                <Editable as="div" value={first.title} onChange={(v) => updateItem(items, onChange, 0, { title: v })} className="font-display text-2xl" style={{ color: ink }} />
                {first.desc && <Editable as="p" value={first.desc} onChange={(v) => updateItem(items, onChange, 0, { desc: v })} className="mt-1 text-sm" style={{ color: `${ink}70` }} />}
              </div>
              <ArrowUpRight className="h-5 w-5 mt-1 shrink-0" style={{ color: accent }} />
            </div>
          </motion.div>
        )}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          {rest.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.07 }}
              onClick={() => setActiveIdx(activeIdx === i + 1 ? null : i + 1)}
              className="rounded-xl overflow-hidden cursor-pointer"
              style={{ border: `1px solid ${activeIdx === i + 1 ? accent : `${ink}12`}` }}
            >
              <div className="aspect-video" style={{ background: `${ink}10` }} />
              <div className="p-3 text-sm font-medium flex justify-between" style={{ color: ink }}>
                <Editable as="span" value={it.title} onChange={(v) => updateItem(items, onChange, i + 1, { title: v })} />
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {activeIdx !== null && items[activeIdx] && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl p-6"
              style={{ border: `1px solid ${accent}30`, background: `${accent}08` }}
            >
              <div className="font-display text-xl mb-2" style={{ color: ink }}>{items[activeIdx].title}</div>
              {items[activeIdx].desc && <p className="text-sm mb-4" style={{ color: `${ink}70` }}>{items[activeIdx].desc}</p>}
              <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
                View Project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Projects15: Scroll Snap Gallery — vertical scroll-snap strips ---------- */
export function Projects15({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="p-6 md:p-10">
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="relative rounded-2xl px-8 md:px-16 py-16" style={{ border: `1px solid ${ink}18` }}>
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: `${accent}20`, color: accent }}>{items.length} projects</span>
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3" style={{ scrollbarWidth: "thin" }}>
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="snap-start shrink-0 w-[260px] rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${ink}12` }}
            >
              <div className="aspect-[4/3]" style={{ background: i === 0 ? `${accent}30` : `${ink}10` }} />
              <div className="p-4">
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-medium" style={{ color: ink }} />
                {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs mt-1" style={{ color: `${ink}65` }} />}
                <a href={it.url || "#"} className="mt-2 inline-flex items-center gap-1 text-xs" style={{ color: accent }}>
                  View <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Projects16: Hover Expand Strips — horizontal strips that expand on hover ---------- */
export function Projects16({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="grid md:grid-cols-2 gap-10 mb-10">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
          <SectionHeading props={props} ink={ink} accent={accent} />
          <p className="font-display text-2xl italic leading-snug" style={{ color: accent }}>Work that speaks for itself.</p>
        </motion.div>
      </div>
      <div className="flex gap-2 h-[320px]">
        {items.slice(0, 5).map((it, i) => (
          <motion.div
            key={i}
            layout
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className="rounded-2xl overflow-hidden relative cursor-pointer"
            animate={{ flex: activeIdx === i ? 3 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ background: it.featured ? `${accent}30` : `${ink}10`, minWidth: 0 }}
          >
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${ink}60, transparent 50%)` }} />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-sm font-medium text-white whitespace-nowrap overflow-hidden text-ellipsis">
                <Editable as="span" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} />
              </div>
              <AnimatePresence>
                {activeIdx === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    {it.desc && <p className="text-xs text-white/70 mt-1 line-clamp-2">{it.desc}</p>}
                    <a href={it.url || "#"} className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white">
                      View Project <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects17: Autoplay Carousel Sidebar — vertical label, autoplay carousel, click detail ---------- */
export function Projects17({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3200, stopOnInteraction: false })]);
  return (
    <section style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 flex items-center justify-center p-10" style={{ background: `${ink}06` }}>
          <div className="md:-rotate-90 whitespace-nowrap font-display text-2xl tracking-tight" style={{ color: ink }}>{props.heading || "Work"}</div>
        </div>
        <div className="flex-1 py-16 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5 px-8">
            {items.map((it, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                className="shrink-0 basis-[80%] md:basis-[45%] rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: `1px solid ${activeIdx === i ? accent : `${ink}12`}` }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-[4/3]" style={{ background: i % 2 === 0 ? `${accent}30` : `${ink}10` }} />
                <div className="p-4">
                  <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-medium" style={{ color: ink }} />
                  {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs mt-1" style={{ color: `${ink}65` }} />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {activeIdx !== null && items[activeIdx] && (
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="mx-8 md:mx-16 mb-8 rounded-2xl p-6"
            style={{ border: `1px solid ${accent}30`, background: `${accent}08` }}
          >
            <div className="font-display text-xl mb-2" style={{ color: ink }}>{items[activeIdx].title}</div>
            {items[activeIdx].desc && <p className="text-sm mb-4" style={{ color: `${ink}70` }}>{items[activeIdx].desc}</p>}
            <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
              View Project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Projects18: Dot Grid Cards — dot backdrop, cards animate from bottom on scroll ---------- */
export function Projects18({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="relative px-8 md:px-16 py-24" style={{ backgroundImage: `radial-gradient(${ink}22 1px, transparent 1px)`, backgroundSize: "18px 18px" }}>
      <div className="rounded-2xl p-10" style={{ background: bg }}>
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${ink}12` }}
            >
              <div className="aspect-[3/2]" style={{ background: i === 0 ? `${accent}25` : `${ink}08` }} />
              <div className="p-4">
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-medium" style={{ color: ink }} />
                {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs mt-1" style={{ color: `${ink}65` }} />}
                <a href={it.url || "#"} className="mt-2 inline-flex items-center gap-1 text-xs" style={{ color: accent }}>
                  View <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects19: Dark Editorial Grid — dark bg, stroke heading, neon accent on click ---------- */
export function Projects19({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const palette = [accent, `${bg}90`, `${bg}40`];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: ink }}>
      <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: `${bg}60` }}>{props.eyebrow || "Selected Work"}</div>
      {props.heading && <div className="mt-2 mb-8 font-display text-5xl leading-[0.95] tracking-tight" style={{ color: "transparent", WebkitTextStroke: `1.2px ${bg}` }}>{props.heading}</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className="rounded-xl aspect-square flex items-end p-3 cursor-pointer"
            style={{
              background: activeIdx === i ? accent : palette[i % palette.length],
              boxShadow: activeIdx === i ? `0 0 20px ${accent}60` : undefined,
            }}
          >
            <Editable
              as="span"
              value={it.title}
              onChange={(v) => updateItem(items, onChange, i, { title: v })}
              className="text-xs font-medium"
              style={{ color: activeIdx === i || i % 3 === 0 ? "#fff" : ink }}
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {activeIdx !== null && items[activeIdx] && (
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-6"
            style={{ border: `1px solid ${accent}50`, background: `${accent}12` }}
          >
            <div className="font-display text-xl mb-2" style={{ color: bg }}>{items[activeIdx].title}</div>
            {items[activeIdx].desc && <Editable as="p" value={items[activeIdx].desc!} onChange={(v) => updateItem(items, onChange, activeIdx, { desc: v })} className="text-sm mb-4" style={{ color: `${bg}75` }} />}
            <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
              View Project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Projects20: Timeline Strip — projects as timeline events, click to expand ---------- */
export function Projects20({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="px-8 md:px-16 py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="relative">
        <div className="absolute left-[22px] top-0 bottom-0 w-px" style={{ background: `${ink}15` }} />
        <div className="space-y-0">
          {items.map((it, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                className="flex items-start gap-5 py-5 cursor-pointer group pl-12 relative"
              >
                <div
                  className="absolute left-4 top-6 h-4 w-4 rounded-full border-2 -translate-x-1/2 transition-colors"
                  style={{
                    borderColor: activeIdx === i ? accent : `${ink}30`,
                    background: activeIdx === i ? accent : "transparent",
                  }}
                />
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: `${accent}80` }}>
                    Project {String(i + 1).padStart(2, "0")}
                  </div>
                  <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="text-lg font-medium" style={{ color: ink }} />
                </div>
                <motion.div animate={{ rotate: activeIdx === i ? 90 : 0 }} transition={{ duration: 0.2 }} className="mt-1">
                  <ChevronRight className="h-4 w-4" style={{ color: `${ink}40` }} />
                </motion.div>
              </motion.div>
              <AnimatePresence>
                {activeIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-12 pb-5 pr-4">
                      <div className="rounded-xl p-4" style={{ background: `${accent}10`, border: `1px solid ${accent}25` }}>
                        {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-sm mb-3" style={{ color: `${ink}75` }} />}
                        <a href={it.url || "#"} className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: accent }}>
                          View Project <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects21: Luxury Portfolio — gold-accented, dark/cream, click elegant detail drawer ---------- */
export function Projects21({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [first, ...rest] = items;
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: bg, borderTop: `1px solid ${accent}20` }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: accent }}>{props.eyebrow || "Portfolio"}</div>
          {props.heading && <div className="font-display text-4xl tracking-tight" style={{ color: ink }}>{props.heading}</div>}
          <div className="mt-3 mx-auto w-12 h-px" style={{ background: accent }} />
        </div>
        {first && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => setActiveIdx(activeIdx === 0 ? null : 0)}
            className="rounded-2xl overflow-hidden mb-8 cursor-pointer"
            style={{ border: `1px solid ${activeIdx === 0 ? accent : `${accent}25`}` }}
          >
            <div className="aspect-[16/7]" style={{ background: `linear-gradient(135deg, ${accent}20, ${ink}10)` }}>
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl opacity-10" style={{ color: accent }}>◈</span>
              </div>
            </div>
            <div className="p-6 flex justify-between items-center">
              <div>
                <div className="text-[10px] tracking-widest uppercase mb-1" style={{ color: accent }}>Featured</div>
                <Editable as="div" value={first.title} onChange={(v) => updateItem(items, onChange, 0, { title: v })} className="font-display text-2xl" style={{ color: ink }} />
              </div>
              <div className="h-10 w-10 rounded-full border flex items-center justify-center" style={{ borderColor: accent }}>
                <ArrowUpRight className="h-4 w-4" style={{ color: accent }} />
              </div>
            </div>
          </motion.div>
        )}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {rest.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i + 1) * 0.08 }}
              onClick={() => setActiveIdx(activeIdx === i + 1 ? null : i + 1)}
              className="rounded-xl overflow-hidden cursor-pointer group"
              style={{ border: `1px solid ${activeIdx === i + 1 ? accent : `${accent}15`}` }}
            >
              <div className="aspect-[4/3]" style={{ background: `${accent}10` }} />
              <div className="p-4">
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i + 1, { title: v })} className="font-medium" style={{ color: ink }} />
                {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i + 1, { desc: v })} className="text-xs mt-1" style={{ color: `${ink}60` }} />}
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {activeIdx !== null && items[activeIdx] && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl p-7"
              style={{ border: `1px solid ${accent}40`, background: `linear-gradient(135deg, ${accent}08, ${bg})` }}
            >
              <div className="text-[10px] tracking-widest uppercase mb-2" style={{ color: accent }}>Project Details</div>
              <div className="font-display text-2xl mb-2" style={{ color: ink }}>{items[activeIdx].title}</div>
              {items[activeIdx].desc && <p className="text-sm mb-5" style={{ color: `${ink}70` }}>{items[activeIdx].desc}</p>}
              <div className="flex items-center gap-3">
                <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium" style={{ background: accent, color: "#fff" }}>
                  View Project <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <button onClick={() => setActiveIdx(null)} className="text-sm px-4 py-2.5 rounded-full" style={{ border: `1px solid ${accent}40`, color: ink }}>
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Projects22: Cyber Project Board — dark bg, glowing cards, status badges, click tech stack ---------- */
export function Projects22({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const statuses = ["Live", "In Progress", "Archived", "Beta"];
  const statusColors = ["#00ff88", "#ffbd2e", "#ff6058", "#8b8ff8"];
  return (
    <section className="px-8 md:px-16 py-24" style={{ background: ink }}>
      <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: `${bg}50` }}>{props.eyebrow || "Projects"}</div>
      {props.heading && <div className="mb-10 font-display text-4xl tracking-tight" style={{ color: bg }}>{props.heading}</div>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            whileHover={{ boxShadow: `0 0 20px ${accent}40` }}
            className="rounded-xl p-5 cursor-pointer relative overflow-hidden"
            style={{
              border: `1px solid ${activeIdx === i ? accent : `${bg}15`}`,
              background: `${bg}06`,
              boxShadow: activeIdx === i ? `0 0 20px ${accent}30` : undefined,
            }}
          >
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: `${statusColors[i % statusColors.length]}20` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: statusColors[i % statusColors.length] }} />
              <span className="text-[9px] font-mono uppercase" style={{ color: statusColors[i % statusColors.length] }}>{statuses[i % statuses.length]}</span>
            </div>
            <div className="mb-3 h-1 w-8 rounded-full" style={{ background: accent }} />
            <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-mono text-base mb-1" style={{ color: bg }} />
            {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs" style={{ color: `${bg}55` }} />}
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {activeIdx !== null && items[activeIdx] && (
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl p-6 font-mono"
            style={{ border: `1px solid ${accent}50`, background: `${accent}10`, boxShadow: `0 0 30px ${accent}20` }}
          >
            <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: accent }}>// project details</div>
            <div className="text-lg mb-2" style={{ color: bg }}>{items[activeIdx].title}</div>
            {items[activeIdx].desc && <p className="text-sm mb-4" style={{ color: `${bg}70` }}>{items[activeIdx].desc}</p>}
            <div className="flex flex-wrap gap-2 mb-4">
              {["TypeScript", "React", "Node.js"].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-[10px] uppercase" style={{ background: `${accent}20`, color: accent }}>{tag}</span>
              ))}
            </div>
            <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded" style={{ background: accent, color: ink }}>
              Open Project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Projects23: Magazine Spread — full-bleed image placeholders, editorial captions ---------- */
export function Projects23({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  return (
    <section className="py-20" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="px-8 md:px-16 mb-12">
        <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: accent }}>{props.eyebrow || "Work"}</div>
        {props.heading && <div className="font-display text-5xl leading-none tracking-tight" style={{ color: ink }}>{props.heading}</div>}
      </div>
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: i * 0.05 }}
          className="relative mb-2"
        >
          <div
            className="w-full"
            style={{
              height: i === 0 ? "60vh" : "40vh",
              background: `linear-gradient(135deg, ${it.featured ? accent : ink}${i % 2 === 0 ? "20" : "10"}, ${ink}05)`,
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
            className="px-8 md:px-16 py-4 flex items-start justify-between"
          >
            <div>
              <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: accent }}>
                {String(i + 1).padStart(2, "0")} / {items.length}
              </div>
              <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-display text-xl" style={{ color: ink }} />
              {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-sm mt-1" style={{ color: `${ink}65` }} />}
            </div>
            <a href={it.url || "#"} className="mt-1 flex items-center gap-1 text-sm" style={{ color: accent }}>
              View <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
}

/* ---------- Projects24: Glass Gallery — frosted glass cards, click opens glass detail panel ---------- */
export function Projects24({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="relative px-8 md:px-16 py-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}20, ${ink}08, ${accent}10)` }}>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-30" style={{ background: accent }} />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-20" style={{ background: ink }} />
      <div className="relative">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${activeIdx === i ? accent : "rgba(255,255,255,0.15)"}`,
                boxShadow: activeIdx === i ? `0 8px 32px ${accent}30` : "0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              <div className="aspect-video" style={{ background: `linear-gradient(135deg, ${accent}20, ${ink}08)` }} />
              <div className="p-5">
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-medium mb-1" style={{ color: ink }} />
                {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs" style={{ color: `${ink}65` }} />}
              </div>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {activeIdx !== null && items[activeIdx] && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${accent}40`,
                boxShadow: `0 16px 48px ${accent}20`,
              }}
            >
              <div className="font-display text-2xl mb-2" style={{ color: ink }}>{items[activeIdx].title}</div>
              {items[activeIdx].desc && <p className="text-sm mb-4" style={{ color: `${ink}75` }}>{items[activeIdx].desc}</p>}
              <div className="flex items-center gap-3">
                <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2.5 rounded-full" style={{ background: accent, color: "#fff" }}>
                  View Project <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <button onClick={() => setActiveIdx(null)} className="text-sm px-4 py-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)", color: ink }}>
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Projects25: Case Study Cards — problem/solution labels, click to expand ---------- */
export function Projects25({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading props={props} ink={ink} accent={accent} />
        <div className="space-y-4">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              className="rounded-2xl p-6 cursor-pointer"
              style={{
                border: `1px solid ${activeIdx === i ? accent : `${ink}10`}`,
                background: activeIdx === i ? `${accent}06` : bg,
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: `${ink}10`, color: `${ink}70` }}>
                      Case Study
                    </span>
                    <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: `${accent}15`, color: accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-display text-xl mb-1" style={{ color: ink }} />
                  {it.desc && !activeIdx && (
                    <p className="text-sm line-clamp-2" style={{ color: `${ink}65` }}>{it.desc}</p>
                  )}
                </div>
                <motion.div animate={{ rotate: activeIdx === i ? 45 : 0 }} transition={{ duration: 0.2 }} className="ml-4 mt-1">
                  <ArrowUpRight className="h-5 w-5" style={{ color: accent }} />
                </motion.div>
              </div>
              <AnimatePresence>
                {activeIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 grid md:grid-cols-2 gap-4">
                      <div className="rounded-xl p-4" style={{ background: `${ink}06` }}>
                        <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: `${ink}50` }}>Challenge</div>
                        {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-sm" style={{ color: `${ink}75` }} />}
                      </div>
                      <div className="rounded-xl p-4" style={{ background: `${accent}10` }}>
                        <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: accent }}>Outcome</div>
                        <p className="text-sm" style={{ color: `${ink}75` }}>Delivered a high-impact solution.</p>
                      </div>
                    </div>
                    <a href={it.url || "#"} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
                      Read Case Study <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects26: Masonry Wall — varying heights, click to view ---------- */
export function Projects26({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const heights = [220, 160, 280, 200, 180, 240, 170, 210];
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="columns-2 md:columns-3 gap-4 space-y-4 mb-5">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer"
            style={{ border: `1px solid ${activeIdx === i ? accent : `${ink}10`}` }}
          >
            <div style={{ height: `${heights[i % heights.length]}px`, background: it.featured ? `${accent}20` : `${ink}08` }} />
            <div className="p-4 bg-white/0" style={{ background: bg }}>
              <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-medium text-sm" style={{ color: ink }} />
              {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs mt-1 line-clamp-2" style={{ color: `${ink}60` }} />}
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {activeIdx !== null && items[activeIdx] && (
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-6"
            style={{ border: `1px solid ${accent}30`, background: `${accent}08` }}
          >
            <div className="font-display text-xl mb-2" style={{ color: ink }}>{items[activeIdx].title}</div>
            {items[activeIdx].desc && <p className="text-sm mb-4" style={{ color: `${ink}70` }}>{items[activeIdx].desc}</p>}
            <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
              View Project <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Projects27: Sports/Stats — projects as achievement cards with metrics ---------- */
export function Projects27({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const metrics = [
    { label: "Users", value: "10K+" },
    { label: "Uptime", value: "99.9%" },
    { label: "Perf", value: "A+" },
    { label: "Stars", value: "2.1K" },
  ];
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl p-6"
            style={{ border: `1px solid ${ink}10`, background: bg }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-display text-xl" style={{ color: ink }} />
                {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-sm mt-1" style={{ color: `${ink}65` }} />}
              </div>
              <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ background: `${accent}20` }}>
                <ArrowUpRight className="h-4 w-4" style={{ color: accent }} />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 pt-4" style={{ borderTop: `1px solid ${ink}08` }}>
              {metrics.map((m, mi) => (
                <div key={mi} className="text-center">
                  <div className="font-display text-lg" style={{ color: mi === 0 ? accent : ink }}>{m.value}</div>
                  <div className="text-[9px] uppercase tracking-widest" style={{ color: `${ink}50` }}>{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects28: Nature Gallery — soft organic cards, gentle hover, portfolio ---------- */
export function Projects28({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const organicBgs = [
    `radial-gradient(ellipse at 30% 40%, ${accent}25, transparent 70%)`,
    `radial-gradient(ellipse at 70% 60%, ${ink}10, transparent 70%)`,
    `radial-gradient(ellipse at 50% 30%, ${accent}15, ${ink}05 80%)`,
  ];
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="text-center mb-12">
        <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: accent }}>{props.eyebrow || "Portfolio"}</div>
        {props.heading && <div className="font-display text-4xl" style={{ color: ink }}>{props.heading}</div>}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="rounded-[28px] overflow-hidden"
            style={{ border: `1px solid ${ink}08`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <div
              className="aspect-[4/3] relative"
              style={{ background: organicBgs[i % organicBgs.length] }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <span className="text-7xl">❁</span>
              </div>
            </div>
            <div className="p-5" style={{ background: bg }}>
              <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-display text-lg mb-1" style={{ color: ink }} />
              {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs leading-relaxed" style={{ color: `${ink}60` }} />}
              <a href={it.url || "#"} className="mt-3 inline-flex items-center gap-1 text-xs font-medium" style={{ color: accent }}>
                Explore <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects29: Property Listings — each project styled as real estate card ---------- */
export function Projects29({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const tags = [["React", "TypeScript"], ["Node.js", "API"], ["Design", "UI/UX"], ["Mobile", "Swift"]];
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <SectionHeading props={props} ink={ink} accent={accent} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className="rounded-2xl overflow-hidden cursor-pointer"
            style={{
              border: `1px solid ${activeIdx === i ? accent : `${ink}10`}`,
              boxShadow: activeIdx === i ? `0 8px 32px ${accent}20` : "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div className="relative aspect-video" style={{ background: `${ink}08` }}>
              <div className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-medium uppercase tracking-wider" style={{ background: accent, color: "#fff" }}>
                {it.featured ? "Featured" : "Project"}
              </div>
            </div>
            <div className="p-5" style={{ background: bg }}>
              <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-display text-lg mb-1" style={{ color: ink }} />
              {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs mb-3 line-clamp-2" style={{ color: `${ink}65` }} />}
              <div className="flex gap-1.5 flex-wrap">
                {(tags[i % tags.length] || []).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] rounded" style={{ background: `${ink}08`, color: `${ink}70` }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {activeIdx !== null && items[activeIdx] && (
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-6 flex flex-col md:flex-row gap-6"
            style={{ border: `1px solid ${accent}30`, background: `${accent}06` }}
          >
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: accent }}>Property Details</div>
              <div className="font-display text-2xl mb-2" style={{ color: ink }}>{items[activeIdx].title}</div>
              {items[activeIdx].desc && <p className="text-sm mb-4" style={{ color: `${ink}70` }}>{items[activeIdx].desc}</p>}
              <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full" style={{ background: accent, color: "#fff" }}>
                View Project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <button onClick={() => setActiveIdx(null)} className="self-start text-sm px-4 py-2 rounded-full" style={{ border: `1px solid ${ink}15`, color: ink }}>
              ✕ Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Projects30: Event Portfolio — project cards as event invitations, elegant overlay on click ---------- */
export function Projects30({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return (
    <section className="px-8 md:px-16 py-24" style={{ borderTop: `1px solid ${ink}10` }}>
      <div className="text-center mb-12">
        <div className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: accent }}>{props.eyebrow || "Portfolio"}</div>
        {props.heading && <div className="font-display text-4xl tracking-tight" style={{ color: ink }}>{props.heading}</div>}
        <div className="mt-3 mx-auto w-16 h-px" style={{ background: `${accent}40` }} />
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-5">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            className="rounded-2xl overflow-hidden cursor-pointer relative"
            style={{
              border: `1px solid ${activeIdx === i ? accent : `${ink}12`}`,
              background: `linear-gradient(135deg, ${bg}, ${it.featured ? accent : ink}06)`,
            }}
          >
            <div className="flex items-stretch">
              <div className="w-16 flex flex-col items-center justify-center py-6 shrink-0" style={{ background: activeIdx === i ? accent : `${ink}08`, borderRight: `1px solid ${ink}08` }}>
                <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: activeIdx === i ? "#fff" : accent }}>{months[i % 12]}</span>
                <span className="font-display text-2xl leading-none mt-1" style={{ color: activeIdx === i ? "#fff" : ink }}>{String(i + 1 + 8).padStart(2, "0")}</span>
              </div>
              <div className="p-5 flex-1">
                <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `${accent}80` }}>
                  {it.featured ? "Premiere" : "Project"}
                </div>
                <Editable as="div" value={it.title} onChange={(v) => updateItem(items, onChange, i, { title: v })} className="font-display text-lg" style={{ color: ink }} />
                {it.desc && <Editable as="p" value={it.desc} onChange={(v) => updateItem(items, onChange, i, { desc: v })} className="text-xs mt-1 line-clamp-2" style={{ color: `${ink}60` }} />}
              </div>
              <div className="flex items-center pr-4">
                <motion.div animate={{ rotate: activeIdx === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <ArrowUpRight className="h-4 w-4" style={{ color: accent }} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {activeIdx !== null && items[activeIdx] && (
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl p-7"
            style={{
              border: `1px solid ${accent}40`,
              background: `linear-gradient(135deg, ${accent}10, ${bg})`,
              boxShadow: `0 12px 40px ${accent}15`,
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: accent }}>Event Portfolio</div>
                <div className="font-display text-2xl" style={{ color: ink }}>{items[activeIdx].title}</div>
              </div>
              <div className="text-center px-3 py-2 rounded-xl" style={{ background: `${accent}15` }}>
                <div className="text-[9px] uppercase tracking-widest" style={{ color: accent }}>{months[activeIdx % 12]}</div>
                <div className="font-display text-xl leading-none" style={{ color: ink }}>{String(activeIdx + 9).padStart(2, "0")}</div>
              </div>
            </div>
            {items[activeIdx].desc && <p className="text-sm mb-5" style={{ color: `${ink}70` }}>{items[activeIdx].desc}</p>}
            <div className="flex items-center gap-3">
              <a href={items[activeIdx].url || "#"} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium" style={{ background: accent, color: "#fff" }}>
                View Project <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <button onClick={() => setActiveIdx(null)} className="text-sm px-4 py-2.5 rounded-full" style={{ border: `1px solid ${ink}15`, color: ink }}>
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
