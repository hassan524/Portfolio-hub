// @ts-nocheck
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Boxes, Clapperboard, Layers, Palette, PenTool, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
const ICONS = [Palette, PenTool, Clapperboard, Layers, Boxes, Sparkles];

const DEFAULT_SERVICES = [
  { title: 'Brand Identity', description: 'Logos, colour, type and voice that make a business instantly recognisable. From strategy workshops to a complete brand guidelines book.', deliverables: ['Logo suite', 'Visual language', 'Brand guidelines', 'Stationery'], price: 'From $4,500', time: '3–5 weeks' },
  { title: 'Product & UI Design', description: 'Intuitive, beautiful interfaces for web and mobile. Research, flows, wireframes and pixel-perfect screens ready for developers.', deliverables: ['User flows', 'Wireframes', 'High-fidelity UI', 'Prototype'], price: 'From $6,000', time: '4–8 weeks' },
  { title: 'Motion & Interaction', description: 'Launch films, animated logos and micro-interactions that bring your brand to life and keep people watching.', deliverables: ['Logo animation', 'Launch film', 'Social cut-downs', 'UI motion'], price: 'From $2,800', time: '2–4 weeks' },
  { title: 'Design Systems', description: 'A single source of truth for your product: tokens, components and documentation that scale with your team.', deliverables: ['Component library', 'Design tokens', 'Documentation', 'Team workshop'], price: 'From $8,000', time: '6–10 weeks' },
];

const DEFAULT_STEPS = [
  ['Discover', 'We talk goals, audience and what success looks like.'],
  ['Define', 'Strategy, moodboards and a clear creative direction.'],
  ['Design', 'Concepts, iterations and honest feedback loops.'],
  ['Deliver', 'Polished files, handoff and support after launch.'],
];

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || 'Canvas';
  const bgSecond = theme?.['bg-second'] || bg;
  const ink = theme?.ink || 'CanvasText';
  const inkSecond = theme?.['ink-second'] || ink;
  const accent = theme?.accent || ink;
  const surface = theme?.surface || mix(ink, 14);
  const fontBody = theme?.fontBody;
  const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;
  const head = { fontFamily: fontHead };

  const items = props?.items?.length ? props.items : DEFAULT_SERVICES;
  const steps = props?.steps?.length ? props.steps : DEFAULT_STEPS;

  // Card palettes cycle through theme colours only
  const palettes = [
    { bg: inkSecond, fg: bgSecond, sub: mix(bgSecond, 70), chip: mix(bgSecond, 30), border: 'transparent' },
    { bg: accent, fg: bg, sub: mix(bg, 75), chip: mix(bg, 35), border: 'transparent' },
    { bg: bg, fg: ink, sub: mix(ink, 70), chip: mix(ink, 25), border: 'transparent' },
    { bg: bgSecond, fg: inkSecond, sub: mix(inkSecond, 65), chip: mix(inkSecond, 25), border: mix(inkSecond, 22) },
  ];

  const stepsRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 85%', 'end 55%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="services" className="px-5 py-28 lg:px-10 lg:py-40" style={{ backgroundColor: bgSecond, color: inkSecond, fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: inkSecond }}>
                <span className="h-px w-12" style={{ backgroundColor: accent }} />
                <Editable value={props?.label || 'What I offer'} />
              </div>
              <h2 className="mt-6 font-bold leading-[0.88] tracking-[-0.06em]" style={{ ...head, fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}>
                <Editable value={props?.headline || 'Services built around'} onChange={(v) => onChange?.({ headline: v })} />{' '}
                <span className="italic" style={{ color: accent }}><Editable value={props?.headlineAccent || 'your goals.'} onChange={(v) => onChange?.({ headlineAccent: v })} /></span>
              </h2>
              <p className="mt-8 max-w-md text-base leading-7" style={{ color: mix(inkSecond, 68) }}>
                <Editable value={props?.intro || 'Every project is different, so every engagement is shaped to fit. Pick a single service or combine them into a full end-to-end partnership.'} onChange={(v) => onChange?.({ intro: v })} />
              </p>
              <a href="#contact" className="group mt-10 inline-flex items-center gap-3 rounded-full py-2 pl-7 pr-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:scale-[1.03]" style={{ backgroundColor: inkSecond, color: bgSecond }}>
                <Editable value={props?.cta || 'Start a project'} />
                <span className="grid h-10 w-10 place-items-center rounded-full transition group-hover:rotate-45" style={{ backgroundColor: accent, color: bg }}>↗</span>
              </a>
            </div>
          </div>

          {/* Stacking cards */}
          <div className="space-y-6 lg:col-span-7">
            {items.map((s: any, i: number) => {
              const pal = palettes[i % palettes.length];
              const Icon = ICONS[i % ICONS.length];
              return (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7 }}
                  className="sticky overflow-hidden rounded-[2rem] border p-7 shadow-2xl sm:p-10"
                  style={{ top: `${7 + i * 1.25}rem`, backgroundColor: pal.bg, color: pal.fg, borderColor: pal.border }}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs tracking-[0.3em]" style={{ color: pal.sub }}>{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
                    <span className="grid h-14 w-14 place-items-center rounded-full" style={{ backgroundColor: pal.chip }}><Icon size={22} /></span>
                  </div>
                  <h3 className="mt-10 text-4xl font-bold leading-none tracking-[-0.05em] sm:text-6xl" style={head}><Editable value={s.title} /></h3>
                  <p className="mt-5 max-w-lg text-sm leading-7" style={{ color: pal.sub }}><Editable value={s.description} /></p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {s.deliverables?.map((d: string, k: number) => (
                      <span key={k} className="rounded-full px-4 py-1.5 text-xs font-medium" style={{ backgroundColor: pal.chip }}><Editable value={d} /></span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t pt-6" style={{ borderColor: pal.chip }}>
                    <p className="text-2xl font-bold tracking-[-0.04em]" style={head}><Editable value={s.price} /></p>
                    <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: pal.sub }}><Editable value={s.time} /></p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Process */}
        <div ref={stepsRef} className="mt-28">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]">
            <span className="h-px w-12" style={{ backgroundColor: accent }} />
            <Editable value={props?.processLabel || 'How we work'} />
          </div>
          <div className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-[1.15rem] hidden h-px lg:block" style={{ backgroundColor: mix(inkSecond, 20) }} />
            <motion.div className="absolute left-0 right-0 top-[1.15rem] hidden h-px origin-left lg:block" style={{ backgroundColor: accent, scaleX: lineScale, height: 2 }} />
            {steps.map(([t, d], i) => (
              <div key={i} className="relative">
                <span className="relative grid h-10 w-10 place-items-center rounded-full text-xs font-bold" style={{ backgroundColor: i === 0 ? accent : inkSecond, color: i === 0 ? bg : bgSecond }}>{i + 1}</span>
                <h4 className="mt-6 text-2xl font-bold tracking-[-0.04em]" style={head}><Editable value={t} /></h4>
                <p className="mt-2 max-w-[16rem] text-sm leading-6" style={{ color: mix(inkSecond, 68) }}><Editable value={d} /></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;