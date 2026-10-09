// @ts-nocheck
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

// Every colour below comes from the theme. mix() only changes opacity of a theme colour.
const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

function Layer({ sx, sy, depth, className, children }: any) {
    const x = useTransform(sx, [-0.5, 0.5], [-depth, depth]);
    const y = useTransform(sy, [-0.5, 0.5], [-depth, depth]);
    return <motion.div style={{ x, y }} className={className}>{children}</motion.div>;
}

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || 'Canvas';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || 'CanvasText';
    const inkSecond = theme?.['ink-second'] || ink;
    const accent = theme?.accent || ink;
    const surface = theme?.surface || mix(ink, 12);
    const fontBody = theme?.fontBody;
    const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;

    const ref = useRef<HTMLElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 60, damping: 18 });
    const sy = useSpring(my, { stiffness: 60, damping: 18 });
    const px = useSpring(useMotionValue(-100), { stiffness: 220, damping: 28 });
    const py = useSpring(useMotionValue(-100), { stiffness: 220, damping: 28 });
    const [fan, setFan] = useState(false);

    const onMove = (e: any) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        px.set(x);
        py.set(y);
        mx.set(x / r.width - 0.5);
        my.set(y / r.height - 0.5);
    };

    const cards = [
        { img: props?.heroImage0 || 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85', r: -9, fr: -17, x: -34, fx: -120, depth: 10 },
        { img: props?.heroImage1 || 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85', r: 7, fr: 15, x: 30, fx: 120, depth: 22 },
        { img: props?.heroImage || props?.heroImage2 || 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=900&q=85', r: 0, fr: 0, x: 0, fx: 0, depth: 36 },
    ];
    const words = ['New season', 'Made in London', 'Cut slowly', 'Worn loudly', 'Limited forms'];

    return (
        <section
            id="top"
            ref={ref}
            onMouseMove={onMove}
            className="relative isolate flex min-h-[calc(100vh-4.5rem)] flex-col justify-between overflow-hidden px-5 pb-0 pt-10 lg:px-8"
            style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
        >
            <style>{`
                @keyframes hero-marquee { to { transform: translateX(-50%); } }
                @keyframes hero-spin { to { transform: rotate(360deg); } }
                @keyframes hero-scroll { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }
                @media (prefers-reduced-motion: reduce) { .hero-anim { animation: none !important; } }
            `}</style>

            {/* Curtain reveal */}
            <motion.div initial={{ x: 0 }} animate={{ x: '-101%' }} transition={{ duration: 1.1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }} className="pointer-events-none absolute inset-y-0 left-0 z-[60] w-1/2" style={{ backgroundColor: ink }} />
            <motion.div initial={{ x: 0 }} animate={{ x: '101%' }} transition={{ duration: 1.1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }} className="pointer-events-none absolute inset-y-0 right-0 z-[60] w-1/2" style={{ backgroundColor: ink }} />
            <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="pointer-events-none absolute inset-0 z-[70] grid place-items-center text-xs font-bold uppercase tracking-[0.5em]" style={{ color: bg }}>
                <Editable value={props?.brand || 'Aroxform'} />
            </motion.div>

            {/* Cursor crosshair lines */}
            <motion.span className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-px md:block" style={{ x: px, backgroundColor: mix(ink, 22) }} />
            <motion.span className="pointer-events-none absolute left-0 top-0 z-0 hidden h-px w-full md:block" style={{ y: py, backgroundColor: mix(ink, 22) }} />

            {/* Fixed hairline grid */}
            <div className="pointer-events-none absolute inset-0 -z-10 mx-auto hidden max-w-7xl grid-cols-4 lg:grid">
                {[0, 1, 2, 3].map((i) => (
                    <motion.span key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, delay: 1.2 + i * 0.12, ease: [0.6, 0, 0.2, 1] }} className="h-full origin-top border-l last:border-r" style={{ borderColor: surface }} />
                ))}
            </div>

            {/* Vertical label */}
            <div className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 text-[10px] uppercase tracking-[0.4em] xl:block" style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)', color: inkSecond }}>
                <Editable value={props?.vertical || 'Collection 01 — Spring / Summer'} />
            </div>

            {/* Meta row */}
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-6 border-b pb-4 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: surface, color: inkSecond }}>
                <Editable value={props?.metaLeft || 'SS—26'} />
                <span className="hidden items-center gap-3 sm:flex">
                    <span className="h-px w-10" style={{ backgroundColor: accent }} />
                    <Editable value={props?.metaCenter || 'The archive is open'} />
                    <span className="h-px w-10" style={{ backgroundColor: accent }} />
                </span>
                <Editable value={props?.metaRight || 'London / 51.52° N'} />
            </motion.div>

            {/* Main composition */}
            <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-6 py-10 lg:grid-cols-12">
                <div className="relative z-20 lg:col-span-8">
                    <div className="overflow-hidden pb-2">
                        <motion.h1
                            initial={{ y: '110%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 1.3, ease: [0.2, 0.7, 0.2, 1] }}
                            className="font-bold uppercase leading-[0.8] tracking-[-0.07em]"
                            style={{ fontSize: 'clamp(3.6rem, 11vw, 10.5rem)', fontFamily: fontHead, textWrap: 'balance' }}
                        >
                            <Editable value={props?.headline || 'Wear the unexpected.'} onChange={(v) => onChange?.({ headline: v })} />
                        </motion.h1>
                    </div>
                    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }} className="mt-8 max-w-sm text-sm leading-6" style={{ color: inkSecond }}>
                        <Editable value={props?.subheadline || 'Considered silhouettes, honest fabrics and a little rebellion. Cut in small runs, made to outlast the season.'} onChange={(v) => onChange?.({ subheadline: v })} />
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.05 }} className="mt-8 flex flex-wrap items-center gap-6">
                        <a href="#projects" className="group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:scale-[1.03]" style={{ backgroundColor: ink, color: bg }}>
                            <Editable value={props?.primaryCta || 'Enter the archive'} />
                            <span className="grid h-9 w-9 place-items-center rounded-full transition group-hover:rotate-45" style={{ backgroundColor: accent, color: bg }}><ArrowUpRight size={16} /></span>
                        </a>
                        <a href="#about" className="group relative text-[11px] uppercase tracking-[0.2em]">
                            <Editable value={props?.secondaryCta || 'Our philosophy'} />
                            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-[0.3] transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
                        </a>
                    </motion.div>
                </div>

                {/* Fanning image stack */}
                <div className="relative flex justify-center pb-10 lg:col-span-4 lg:-ml-24 lg:justify-start lg:pb-0">
                    <div
                        className="relative aspect-[3/4] w-[min(68vw,21rem)] cursor-pointer"
                        onMouseEnter={() => setFan(true)}
                        onMouseLeave={() => setFan(false)}
                        onClick={() => setFan((f) => !f)}
                    >
                        {cards.map((c, i) => (
                            <Layer key={i} sx={sx} sy={sy} depth={c.depth} className="absolute inset-0">
                                <motion.figure
                                    initial={{ opacity: 0, y: 80, rotate: 0 }}
                                    animate={{ opacity: 1, y: 0, rotate: fan ? c.fr : c.r, x: fan ? c.fx : c.x }}
                                    transition={{ type: 'spring', stiffness: 90, damping: 16, delay: fan ? 0 : 1.5 + i * 0.12 }}
                                    className="absolute inset-0 m-0 overflow-hidden rounded-[1.75rem] border shadow-2xl"
                                    style={{ borderColor: mix(ink, 25), backgroundColor: bgSecond }}
                                >
                                    <img src={c.img} alt="" className="h-full w-full object-cover" />
                                    {i === 2 && (
                                        <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.2em] backdrop-blur-md" style={{ backgroundColor: mix(bg, 78), color: ink }}>
                                            <Editable value={props?.imageCaption || 'No. 01 — The Coat'} />
                                            <span style={{ color: accent }}>●</span>
                                        </figcaption>
                                    )}
                                </motion.figure>
                            </Layer>
                        ))}

                        {/* Rotating stamp */}
                        <motion.a href="#projects" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 2.2, type: 'spring' }} className="absolute -bottom-8 -right-6 z-30 grid h-28 w-28 place-items-center sm:-right-12">
                            <svg viewBox="0 0 120 120" className="hero-anim absolute inset-0 h-full w-full" style={{ animation: 'hero-spin 16s linear infinite' }}>
                                <defs><path id="hero-stamp" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs>
                                <circle cx="60" cy="60" r="58" style={{ fill: bg, stroke: surface }} />
                                <text fontSize="9.5" letterSpacing="3.6" style={{ fill: ink, textTransform: 'uppercase' }}>
                                    <textPath href="#hero-stamp">Scroll · The archive · Scroll · The archive ·</textPath>
                                </text>
                            </svg>
                            <span className="relative grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: accent, color: bg }}><ArrowUpRight size={16} /></span>
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* Scroll line */}
            <div className="pointer-events-none absolute bottom-24 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden lg:block" style={{ backgroundColor: surface }}>
                <span className="hero-anim block h-full w-full" style={{ backgroundColor: accent, animation: 'hero-scroll 2.4s ease-in-out infinite' }} />
            </div>

            {/* Outlined marquee */}
            <div className="relative z-10 -mx-5 overflow-hidden border-y py-4 lg:-mx-8" style={{ borderColor: surface, backgroundColor: bgSecond }}>
                <div className="hero-anim flex w-max gap-12 whitespace-nowrap" style={{ animation: 'hero-marquee 32s linear infinite' }}>
                    {[...words, ...words, ...words, ...words].map((w, i) => (
                        <span key={i} className="flex items-center gap-12 text-3xl font-bold uppercase tracking-[-0.04em] sm:text-5xl" style={{ fontFamily: fontHead, color: i % 2 ? ink : 'transparent', WebkitTextStroke: i % 2 ? '0' : `1px ${ink}` }}>
                            {w}
                            <span style={{ color: accent, WebkitTextStroke: '0' }}>✦</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}