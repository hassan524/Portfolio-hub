// @ts-nocheck
import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const DEFAULT_ITEMS = [
  { title: 'Lumen Banking', category: 'UI / UX', year: '2025', image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1000&q=85', client: 'Lumen Bank', role: 'Lead product designer', tools: ['Figma', 'Principle'], description: 'A calm, confident mobile banking experience that turned a dense product into something people open for fun. Redesigned onboarding, payments and insights from the ground up.', result: '+38% activation in the first month' },
  { title: 'Aster Coffee', category: 'Brand', year: '2024', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1000&q=85', client: 'Aster Roasters', role: 'Brand identity & packaging', tools: ['Illustrator', 'Procreate'], description: 'A warm, playful identity for a small-batch roaster. Custom lettering, a colour system inspired by the roast curve, and packaging that stands out on a crowded shelf.', result: 'Sold out first run in 9 days' },
  { title: 'Orbit System', category: 'Systems', year: '2024', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=85', client: 'Orbit Labs', role: 'Design system lead', tools: ['Figma', 'Storybook'], description: 'A scalable design system with 140 components, tokens and documentation, shipped alongside engineering so the two teams finally speak the same language.', result: '60% faster design-to-dev handoff' },
  { title: 'Nova Launch', category: 'Motion', year: '2024', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85', client: 'Nova Audio', role: 'Art direction & motion', tools: ['After Effects', 'Blender'], description: 'A 45-second launch film built from bold typography, 3D objects and sound-reactive motion. Delivered with a full social cut-down kit.', result: '1.2M organic views in a week' },
  { title: 'Fieldnotes', category: 'Brand', year: '2023', image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1000&q=85', client: 'Fieldnotes Press', role: 'Identity & editorial design', tools: ['InDesign', 'Illustrator'], description: 'An editorial identity for an independent journal: flexible grids, a bespoke masthead and a typographic voice that feels handmade but modern.', result: 'Featured by two design publications' },
  { title: 'Pulse Fitness', category: 'Web', year: '2023', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85', client: 'Pulse Studio', role: 'Web design & prototyping', tools: ['Figma', 'Framer'], description: 'A high-energy marketing site with scroll-driven storytelling, class booking and a membership flow designed for thumbs first.', result: '2.4× membership sign-ups' },
];

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || 'Canvas';
  const bgSecond = theme?.['bg-second'] || bg;
  const ink = theme?.ink || 'CanvasText';
  const accent = theme?.accent || ink;
  const surface = theme?.surface || mix(ink, 14);
  const fontBody = theme?.fontBody;
  const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;
  const head = { fontFamily: fontHead };

  const items = props?.items?.length ? props.items : DEFAULT_ITEMS;
  const categories = ['All', ...Array.from(new Set(items.map((i: any) => i.category)))];
  const [filter, setFilter] = useState('All');
  const [hover, setHover] = useState<number | null>(null);
  const [selected, setSelected] = useState<any>(null);
  const list = items.filter((i: any) => filter === 'All' || i.category === filter);

  const listRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 20 });
  const sy = useSpring(my, { stiffness: 140, damping: 20 });
  const onMove = (e: any) => {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section id="projects" className="px-5 py-28 lg:px-10 lg:py-40" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: accent }}>
              <span className="h-px w-12" style={{ backgroundColor: accent }} />
              <Editable value={props?.label || 'Selected work'} />
            </div>
            <h2 className="mt-6 font-bold leading-[0.88] tracking-[-0.06em]" style={{ ...head, fontSize: 'clamp(3rem, 8.5vw, 8rem)' }}>
              <Editable value={props?.headline || 'Things I'} onChange={(v) => onChange?.({ headline: v })} />{' '}
              <span className="italic" style={{ color: accent }}><Editable value={props?.headlineAccent || 'made.'} onChange={(v) => onChange?.({ headlineAccent: v })} /></span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} type="button" onClick={() => setFilter(c)} className="rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition" style={{ borderColor: filter === c ? accent : surface, backgroundColor: filter === c ? accent : 'transparent', color: filter === c ? bg : ink }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div ref={listRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)} className="relative mt-16">
          {/* Cursor-follow preview */}
          <AnimatePresence>
            {hover !== null && list[hover] && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                style={{ x: sx, y: sy }}
                className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
              >
                <div className="-ml-36 -mt-48 h-[22rem] w-72 overflow-hidden rounded-2xl border shadow-2xl" style={{ borderColor: accent, backgroundColor: surface }}>
                  <img src={list[hover].image} alt="" className="h-full w-full object-cover" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {list.map((p: any, i: number) => {
            const on = hover === i;
            return (
              <motion.button
                layout
                key={p.title}
                type="button"
                onMouseEnter={() => setHover(i)}
                onClick={() => setSelected(p)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-t py-7 text-left sm:grid-cols-[4rem_1fr_10rem_5rem_3rem] sm:py-9"
                style={{ borderColor: surface, opacity: hover !== null && !on ? 0.35 : 1, transition: 'opacity .3s' }}
              >
                <span className="text-xs tracking-[0.2em]" style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="flex items-center gap-4">
                  <img src={p.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover md:hidden" />
                  <span className="text-3xl font-bold tracking-[-0.05em] transition-all duration-500 sm:text-5xl lg:text-7xl" style={{ ...head, transform: on ? 'translateX(1.25rem)' : 'none', fontStyle: on ? 'italic' : 'normal', color: on ? accent : ink }}>
                    <Editable value={p.title} />
                  </span>
                </span>
                <span className="hidden text-[11px] uppercase tracking-[0.2em] sm:block" style={{ color: mix(ink, 60) }}>{p.category}</span>
                <span className="hidden text-sm sm:block" style={{ color: mix(ink, 60) }}>{p.year}</span>
                <span className="grid h-11 w-11 place-items-center justify-self-end rounded-full border transition duration-500" style={{ borderColor: on ? accent : surface, backgroundColor: on ? accent : 'transparent', color: on ? bg : ink, transform: on ? 'rotate(45deg)' : 'none' }}>
                  <ArrowUpRight size={17} />
                </span>
              </motion.button>
            );
          })}
          <div className="border-t" style={{ borderColor: surface }} />
        </div>
      </div>

      {/* Project details (in-page modal) */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center p-4 backdrop-blur-xl sm:p-8" style={{ backgroundColor: mix(bg, 82) }} onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.94, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 30 }} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} className="relative grid max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[2rem] border md:grid-cols-2" style={{ backgroundColor: bg, borderColor: surface, color: ink }}>
              <button type="button" aria-label="Close" onClick={() => setSelected(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: accent, color: bg }}><X size={17} /></button>
              <img src={selected.image} alt="" className="h-72 w-full object-cover md:h-full md:min-h-[32rem]" />
              <div className="p-7 sm:p-10">
                <p className="text-[11px] uppercase tracking-[0.25em]" style={{ color: accent }}>{selected.category} — {selected.year}</p>
                <h3 className="mt-3 text-5xl font-bold tracking-[-0.05em]" style={head}>{selected.title}</h3>
                <p className="mt-5 text-base leading-7" style={{ color: mix(ink, 72) }}>{selected.description}</p>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t pt-6 text-sm" style={{ borderColor: surface }}>
                  <div><dt className="text-[10px] uppercase tracking-[0.25em]" style={{ color: mix(ink, 50) }}>Client</dt><dd className="mt-1">{selected.client}</dd></div>
                  <div><dt className="text-[10px] uppercase tracking-[0.25em]" style={{ color: mix(ink, 50) }}>Role</dt><dd className="mt-1">{selected.role}</dd></div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.tools?.map((t: string) => <span key={t} className="rounded-full border px-4 py-1.5 text-xs" style={{ borderColor: surface }}>{t}</span>)}
                </div>
                <div className="mt-8 rounded-2xl p-5" style={{ backgroundColor: accent, color: bg }}>
                  <p className="text-[10px] uppercase tracking-[0.25em] opacity-70">Result</p>
                  <p className="mt-1 text-2xl font-bold tracking-[-0.03em]" style={head}>{selected.result}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}