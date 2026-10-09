// @ts-nocheck
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDownRight, MousePointer2 } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

// Colours always come from the theme; mix() only adjusts their opacity.
const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || 'Canvas';
  const bgSecond = theme?.['bg-second'] || bg;
  const ink = theme?.ink || 'CanvasText';
  const inkSecond = theme?.['ink-second'] || ink;
  const accent = theme?.accent || ink;
  const surface = theme?.surface || mix(ink, 14);
  const fontBody = theme?.fontBody;
  const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;

  const ref = useRef<HTMLElement>(null);
  const gxRaw = useMotionValue(0);
  const gyRaw = useMotionValue(0);
  const gx = useSpring(gxRaw, { stiffness: 50, damping: 20 });
  const gy = useSpring(gyRaw, { stiffness: 50, damping: 20 });
  const nxRaw = useMotionValue(0);
  const nyRaw = useMotionValue(0);
  const nx = useSpring(nxRaw, { stiffness: 70, damping: 18 });
  const ny = useSpring(nyRaw, { stiffness: 70, damping: 18 });
  const rotY = useTransform(nx, [-0.5, 0.5], [-9, 9]);
  const rotX = useTransform(ny, [-0.5, 0.5], [7, -7]);
  const imgX = useTransform(nx, [-0.5, 0.5], [-16, 16]);
  const imgY = useTransform(ny, [-0.5, 0.5], [-16, 16]);

  const onMove = (e: any) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    gxRaw.set(e.clientX - r.left - 320);
    gyRaw.set(e.clientY - r.top - 320);
    nxRaw.set((e.clientX - r.left) / r.width - 0.5);
    nyRaw.set((e.clientY - r.top) / r.height - 0.5);
  };

  const stats = props?.stats || [['8+', 'Years designing'], ['120+', 'Projects shipped'], ['32', 'Brands partnered']];
  const words = props?.disciplines || ['Brand identity', 'Interface design', 'Motion', 'Art direction', 'Design systems', 'Packaging', 'Web design'];
  const swatches = [accent, ink, bgSecond, surface];

  const stickers = [
    { label: props?.sticker1 || 'Brand', cls: '-left-6 top-10 sm:-left-14', rot: -10, bgc: bgSecond, fg: inkSecond },
    { label: props?.sticker2 || 'UI / UX', cls: '-right-4 top-1/3 sm:-right-12', rot: 8, bgc: accent, fg: bg },
    { label: props?.sticker3 || 'Motion', cls: 'left-8 -bottom-5', rot: -4, bgc: surface, fg: ink },
  ];

  const rulerTop = {
    backgroundImage: `repeating-linear-gradient(to right, ${mix(ink, 35)} 0 1px, transparent 1px 10px), repeating-linear-gradient(to right, ${mix(ink, 70)} 0 1px, transparent 1px 100px)`,
    backgroundSize: '100% 6px, 100% 12px',
    backgroundRepeat: 'no-repeat',
  };
  const rulerLeft = {
    backgroundImage: `repeating-linear-gradient(to bottom, ${mix(ink, 35)} 0 1px, transparent 1px 10px), repeating-linear-gradient(to bottom, ${mix(ink, 70)} 0 1px, transparent 1px 100px)`,
    backgroundSize: '6px 100%, 12px 100%',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-0 pt-32 lg:px-10"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <style>{`
                @keyframes hero-marquee { to { transform: translateX(-50%); } }
                @keyframes hero-ping { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(2.6); opacity: 0; } }
                @keyframes hero-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @media (prefers-reduced-motion: reduce) { .hero-anim { animation: none !important; } }
            `}</style>

      {/* Canvas dots */}
      <div className="pointer-events-none absolute inset-0 -z-20" style={{ backgroundImage: `radial-gradient(${mix(ink, 16)} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
      {/* Cursor glow */}
      <motion.div className="pointer-events-none absolute left-0 top-0 -z-10 h-[40rem] w-[40rem] rounded-full blur-3xl" style={{ x: gx, y: gy, backgroundColor: mix(accent, 22) }} />
      {/* Grain */}
      <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.07] mix-blend-overlay" aria-hidden>
        <filter id="hero-noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      {/* Rulers */}
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-4 sm:block" style={rulerTop} />
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-4 sm:block" style={rulerLeft} />

      {/* Guides */}
      <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.6, delay: 0.8, ease: [0.6, 0, 0.2, 1] }} className="pointer-events-none absolute left-0 top-[46%] hidden h-px w-full origin-left lg:block" style={{ backgroundImage: `linear-gradient(to right, ${accent} 50%, transparent 50%)`, backgroundSize: '10px 1px', opacity: 0.55 }} />
      <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.6, delay: 1, ease: [0.6, 0, 0.2, 1] }} className="pointer-events-none absolute left-[62%] top-0 hidden h-full w-px origin-top lg:block" style={{ backgroundImage: `linear-gradient(to bottom, ${accent} 50%, transparent 50%)`, backgroundSize: '1px 10px', opacity: 0.55 }} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-16 pb-16 lg:grid-cols-12">
        {/* Copy */}
        <div className="lg:col-span-7">


          <h1 className="mt-8 font-bold leading-[0.88] tracking-[-0.06em]" style={{ fontFamily: fontHead, fontSize: 'clamp(3.4rem, 9.4vw, 9rem)' }}>
            <span className="block overflow-hidden pb-2">
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }} className="block">
                <Editable value={props?.headlineA || 'Designing things'} onChange={(v) => onChange?.({ headlineA: v })} />
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] }} className="relative inline-block italic" style={{ color: accent }}>
                <Editable value={props?.headlineB || 'people feel.'} onChange={(v) => onChange?.({ headlineB: v })} />
                <svg viewBox="0 0 300 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full" fill="none">
                  <motion.path d="M2 8 Q 40 -2 75 6 T 150 6 T 225 6 T 298 6" strokeWidth="3" strokeLinecap="round" style={{ stroke: accent }} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.4 }} />
                </svg>
              </motion.span>
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mt-8 max-w-lg text-base leading-7" style={{ color: mix(ink, 70) }}>
            <Editable value={props?.subheadline || "I'm Alex Morgan, a multidisciplinary designer crafting brands, interfaces and motion for ambitious teams who want to be remembered."} onChange={(v) => onChange?.({ subheadline: v })} />
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05 }} className="mt-9 flex flex-wrap items-center gap-5">
            <a href="#projects" className="group inline-flex items-center gap-3 rounded-full py-2 pl-7 pr-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:scale-[1.03]" style={{ backgroundColor: accent, color: bg }}>
              <Editable value={props?.primaryCta || 'See my work'} />
              <span className="grid h-10 w-10 place-items-center rounded-full transition group-hover:rotate-[-45deg]" style={{ backgroundColor: bg, color: accent }}><ArrowDownRight size={17} /></span>
            </a>
            <a href="#contact" className="group relative text-xs font-semibold uppercase tracking-[0.18em]">
              <Editable value={props?.secondaryCta || "Let's talk"} />
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-[0.25] transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t pt-6" style={{ borderColor: surface }}>
            {stats.map(([n, l], i) => (
              <div key={i}>
                <p className="text-3xl font-bold tracking-[-0.05em]" style={{ fontFamily: fontHead }}><Editable value={n} /></p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: mix(ink, 55) }}><Editable value={l} /></p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Canvas frame */}
        <div className="relative flex justify-center lg:col-span-5 lg:justify-end" style={{ perspective: 1000 }}>
          {/* Bezier curve */}
          <svg viewBox="0 0 600 700" className="pointer-events-none absolute -inset-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)] sm:-inset-20 sm:h-[calc(100%+10rem)] sm:w-[calc(100%+10rem)]" fill="none" preserveAspectRatio="none">
            <line x1="20" y1="620" x2="120" y2="80" strokeDasharray="4 6" style={{ stroke: mix(ink, 40) }} />
            <line x1="580" y1="60" x2="480" y2="700" strokeDasharray="4 6" style={{ stroke: mix(ink, 40) }} />
            <motion.path d="M20,620 C 120,80 480,700 580,60" strokeWidth="1.6" style={{ stroke: accent }} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, delay: 1, ease: 'easeInOut' }} />
            {[[20, 620], [580, 60]].map(([cx, cy]) => <rect key={cx} x={cx - 5} y={cy - 5} width="10" height="10" strokeWidth="1.6" style={{ fill: bg, stroke: accent }} />)}
            {[[120, 80], [480, 700]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="5" style={{ fill: accent }} />)}
          </svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
            className="relative aspect-[4/5] w-[min(76vw,25rem)]"
          >
            {/* Selection frame */}
            <div className="absolute -inset-3 border" style={{ borderColor: accent }}>
              {['-left-1.5 -top-1.5', '-right-1.5 -top-1.5', '-left-1.5 -bottom-1.5', '-right-1.5 -bottom-1.5', 'left-1/2 -top-1.5 -translate-x-1/2', 'left-1/2 -bottom-1.5 -translate-x-1/2', '-left-1.5 top-1/2 -translate-y-1/2', '-right-1.5 top-1/2 -translate-y-1/2'].map((p) => (
                <span key={p} className={`absolute h-3 w-3 border ${p}`} style={{ backgroundColor: bgSecond, borderColor: accent }} />
              ))}
            </div>
            <span className="absolute -top-9 left-0 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.frameLabel || 'Frame 01 — Portrait'} /></span>
            <span className="absolute -bottom-10 right-0 px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em]" style={{ backgroundColor: accent, color: bg }}>
              <Editable value={props?.frameSize || '400 × 500'} />
            </span>

            <div className="relative h-full w-full overflow-hidden" style={{ backgroundColor: surface }}>
              <motion.img
                style={{ x: imgX, y: imgY, scale: 1.12 }}
                src={props?.heroImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=85'}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            {/* Collaborator cursor */}
            <motion.div
              animate={{ x: [0, 110, 40, -40, 0], y: [0, 50, -70, 30, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute left-[18%] top-[58%] z-30"
              style={{ transform: 'translateZ(60px)' }}
            >
              <MousePointer2 size={26} style={{ color: accent, fill: accent }} />
              <span className="ml-5 -mt-1 inline-block rounded-full rounded-tl-none px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ backgroundColor: accent, color: bg }}>
                <Editable value={props?.cursorLabel || 'Client — love it ✦'} />
              </span>
            </motion.div>

            {/* Palette */}
            <div className="absolute -left-4 top-1/2 hidden -translate-x-full -translate-y-1/2 flex-col gap-2 sm:flex">
              {swatches.map((c, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 + i * 0.1, type: 'spring' }} whileHover={{ scale: 1.25 }} className="h-7 w-7 rounded-full border" style={{ backgroundColor: c, borderColor: mix(ink, 40) }} />
              ))}
            </div>

            {/* Draggable stickers */}
            {stickers.map((s, i) => (
              <motion.div
                key={i}
                drag
                dragConstraints={ref}
                dragElastic={0.25}
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: s.rot }}
                transition={{ delay: 1.6 + i * 0.15, type: 'spring', stiffness: 160, damping: 12 }}
                whileDrag={{ scale: 1.12, rotate: 0, zIndex: 50 }}
                className={`absolute z-40 cursor-grab select-none rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] shadow-2xl active:cursor-grabbing ${s.cls}`}
                style={{ backgroundColor: s.bgc, color: s.fg, transform: 'translateZ(80px)' }}
              >
                <Editable value={s.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Discipline marquee */}
      <div className="relative z-10 -mx-5 overflow-hidden border-y py-5 lg:-mx-10" style={{ borderColor: surface, backgroundColor: mix(bg, 70) }}>
        <div className="hero-anim flex w-max gap-10 whitespace-nowrap" style={{ animation: 'hero-marquee 36s linear infinite' }}>
          {[...words, ...words, ...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-10 text-3xl font-bold italic tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: fontHead, color: i % 2 ? ink : 'transparent', WebkitTextStroke: i % 2 ? '0' : `1px ${ink}` }}>
              {w}
              <span style={{ color: accent, WebkitTextStroke: '0', fontStyle: 'normal' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}