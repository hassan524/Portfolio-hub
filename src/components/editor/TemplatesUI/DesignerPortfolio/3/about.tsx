// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { Award } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

function CountUp({ to, suffix = '' }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (l) => setV(Math.round(l)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Pill({ src }: any) {
  return (
    <motion.span
      initial={{ width: 0 }}
      whileInView={{ width: '1.7em' }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      className="mx-2 inline-block overflow-hidden rounded-full align-middle"
      style={{ height: '0.72em' }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
    </motion.span>
  );
}

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || 'Canvas';
  const ink = theme?.ink || 'CanvasText';
  const accent = theme?.accent || ink;
  const surface = theme?.surface || mix(ink, 14);
  const fontBody = theme?.fontBody;
  const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;
  const head = { fontFamily: fontHead };

  const experience = props?.experience || [
    ['2023 — Now', 'Design Lead', 'Northwind Studio'],
    ['2020 — 2023', 'Senior Product Designer', 'Lumen Labs'],
    ['2017 — 2020', 'Brand Designer', 'Field & Form'],
    ['2015 — 2017', 'Junior Designer', 'Paper Plane Co.'],
  ];
  const tools = props?.tools || ['Figma', 'Framer', 'After Effects', 'Blender', 'Illustrator', 'Webflow', 'Procreate', 'Notion'];
  const awards = props?.awards || ['Awwwards — Site of the Day', 'Red Dot — Brand & Communication', 'Behance — Featured ×6'];
  const stats = props?.stats || [[8, '+', 'Years of craft'], [120, '+', 'Projects shipped'], [32, '', 'Brands partnered'], [14, '', 'Awards & features']];

  return (
    <>
      {/* 1 — Statement + bio + experience */}
      <section id="about" className="px-5 py-28 lg:px-10 lg:py-40" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: accent }}>
            <span className="h-px w-12" style={{ backgroundColor: accent }} />
            <Editable value={props?.label || 'About me'} />
          </div>

          <h2 className="mt-8 max-w-6xl font-bold leading-[1.04] tracking-[-0.055em]" style={{ ...head, fontSize: 'clamp(2.4rem, 6.2vw, 5.8rem)' }}>
            <Editable value={props?.line1 || 'I shape brands'} onChange={(v) => onChange?.({ line1: v })} />
            <Pill src={props?.pill1 || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80'} />
            <Editable value={props?.line2 || 'and interfaces'} onChange={(v) => onChange?.({ line2: v })} />
            <Pill src={props?.pill2 || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=500&q=80'} />
            <span className="italic" style={{ color: accent }}>
              <Editable value={props?.line3 || 'people remember'} onChange={(v) => onChange?.({ line3: v })} />
            </span>{' '}
            <Editable value={props?.line4 || 'long after they scroll.'} onChange={(v) => onChange?.({ line4: v })} />
          </h2>

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <div className="space-y-6 text-base leading-8 lg:col-span-6" style={{ color: mix(ink, 72) }}>
              <p><Editable value={props?.bio1 || 'I started out sketching logos for friends’ bands and never stopped. Over the last eight years I have worked with start-ups, studios and global brands, always chasing the same thing: clarity with a little bit of attitude.'} onChange={(v) => onChange?.({ bio1: v })} /></p>
              <p><Editable value={props?.bio2 || 'My process is collaborative and refreshingly honest. I listen first, research properly, sketch wildly, then refine until every detail earns its place. You will always know where the project stands and why each decision was made.'} onChange={(v) => onChange?.({ bio2: v })} /></p>
              <p><Editable value={props?.bio3 || 'Away from the screen you will find me at flea markets hunting for old typography, cycling the coast, or over-brewing coffee.'} onChange={(v) => onChange?.({ bio3: v })} /></p>

              <div className="flex items-center gap-4 pt-4">
                <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-full border" style={{ borderColor: accent }}>
                  <img src={props?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'} alt="" className="h-full w-full object-cover" />
                </span>
                <div>
                  <p className="text-lg font-bold tracking-[-0.03em]" style={{ ...head, color: ink }}><Editable value={props?.name || 'Alex Morgan'} /></p>
                  <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: mix(ink, 55) }}><Editable value={props?.role || 'Designer & Art Director'} /></p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: mix(ink, 55) }}><Editable value={props?.expLabel || 'Experience'} /></p>
              <div className="mt-4">
                {experience.map(([years, role, place], i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group grid items-baseline gap-2 border-t py-6 transition-all duration-500 hover:pl-4 sm:grid-cols-[9rem_1fr]"
                    style={{ borderColor: surface }}
                  >
                    <span className="text-xs tracking-[0.2em]" style={{ color: accent }}><Editable value={years} /></span>
                    <div>
                      <p className="text-2xl font-bold tracking-[-0.04em] transition group-hover:italic" style={head}><Editable value={role} /></p>
                      <p className="mt-1 text-sm" style={{ color: mix(ink, 55) }}><Editable value={place} /></p>
                    </div>
                  </motion.div>
                ))}
                <div className="border-t" style={{ borderColor: surface }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Numbers, toolkit, recognition */}
      <section className="px-5 pb-28 lg:px-10 lg:pb-40" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border lg:grid-cols-4" style={{ borderColor: surface, backgroundColor: surface }}>
            {stats.map(([n, suffix, label], i) => (
              <div key={i} className="p-8 sm:p-10" style={{ backgroundColor: bg }}>
                <p className="text-6xl font-bold tracking-[-0.06em] sm:text-7xl" style={{ ...head, color: i === 0 ? accent : ink }}><CountUp to={n} suffix={suffix} /></p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.22em]" style={{ color: mix(ink, 55) }}><Editable value={label} /></p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: mix(ink, 55) }}><Editable value={props?.toolsLabel || 'Toolkit'} /></p>
              <div className="mt-5 flex flex-wrap gap-3">
                {tools.map((t, i) => (
                  <motion.span key={i} whileHover={{ y: -4, rotate: i % 2 ? 3 : -3 }} className="rounded-full border px-5 py-2.5 text-sm font-medium" style={{ borderColor: surface, backgroundColor: mix(ink, 4) }}>
                    <Editable value={t} />
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em]" style={{ color: mix(ink, 55) }}><Editable value={props?.awardsLabel || 'Recognition'} /></p>
              <ul className="mt-5">
                {awards.map((a, i) => (
                  <li key={i} className="flex items-center gap-4 border-t py-4 text-lg" style={{ borderColor: surface }}>
                    <Award size={18} style={{ color: accent }} />
                    <Editable value={a} />
                  </li>
                ))}
                <li className="border-t" style={{ borderColor: surface }} />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}