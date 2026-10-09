// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { Plus } from 'lucide-react';
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

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || 'Canvas';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || 'CanvasText';
    const inkSecond = theme?.['ink-second'] || ink;
    const accent = theme?.accent || ink;
    const surface = theme?.surface || mix(ink, 12);
    const fontBody = theme?.fontBody;
    const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;
    const [active, setActive] = useState(0);

    const principles = [
        ['Fewer, better', 'We release small runs and retire them when they are gone. Nothing is reordered to chase a trend, and nothing sits in a warehouse waiting for a sale.'],
        ['Honest fabric', 'Wool from mills we have visited, cotton that softens with age, linings that are as considered as the outside. If it is not worth touching, it is not worth making.'],
        ['Cut with intent', 'Every shoulder, hem and seam is drawn by hand before it is ever digitised. Proportion first, decoration never.'],
        ['Made to keep', 'Free repairs for life, and a resale programme for the pieces you are ready to pass on. A garment should have more than one owner.'],
    ];

    const stats = [[2019, '', 'Founded in London'], [14, '', 'Makers in our studio'], [320, '', 'Pieces per season, never more'], [100, '%', 'Repairable for life']];

    const head = { fontFamily: fontHead };

    return (
        <>
            {/* 1 — Manifesto */}
            <section id="about" className="relative px-5 py-24 lg:px-8 lg:py-36" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
                <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
                            <span className="h-px w-10" style={{ backgroundColor: accent }} />
                            <Editable value={props?.label || 'Philosophy'} />
                        </div>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="mt-6 font-bold uppercase leading-[0.84] tracking-[-0.07em]"
                            style={{ ...head, fontSize: 'clamp(2.8rem, 7.5vw, 7rem)' }}
                        >
                            <Editable value={props?.title || 'Clothes for people who notice.'} onChange={(v) => onChange?.({ title: v })} />
                        </motion.h2>
                        <div className="mt-12 grid gap-8 text-sm leading-7 sm:grid-cols-2" style={{ color: inkSecond }}>
                            <p><Editable value={props?.story || 'Aroxform began as a single coat, drawn on the back of a fabric invoice in a Redchurch Street studio. We wanted something that looked quiet from across the room and surprising up close.'} onChange={(v) => onChange?.({ story: v })} /></p>
                            <p><Editable value={props?.story2 || 'Today we are fourteen people cutting, sewing and fitting under one roof. We still draw everything by hand first, and we still believe the best thing a garment can do is disappear into your life and make it a little better.'} onChange={(v) => onChange?.({ story2: v })} /></p>
                        </div>
                        <p className="mt-8 max-w-xl border-l-2 pl-5 text-lg leading-8" style={{ borderColor: accent }}>
                            <Editable value={props?.pull || 'We do not make more clothes. We make clothes you will want more of.'} onChange={(v) => onChange?.({ pull: v })} />
                        </p>
                    </div>

                    <div className="relative lg:col-span-5">
                        <motion.div
                            initial={{ clipPath: 'inset(100% 0 0 0)' }}
                            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                            className="overflow-hidden rounded-t-[999px] rounded-b-3xl"
                        >
                            <motion.img
                                initial={{ scale: 1.25 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.6 }}
                                src={props?.aboutImage || 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85'}
                                alt=""
                                className="aspect-[4/5] w-full object-cover"
                            />
                        </motion.div>
                        <div className="absolute -bottom-6 -left-4 rounded-2xl border px-5 py-4 backdrop-blur-md sm:-left-10" style={{ backgroundColor: mix(bgSecond, 88), borderColor: surface }}>
                            <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: inkSecond }}><Editable value={props?.badgeLabel || 'Studio'} /></p>
                            <p className="mt-1 text-xl font-bold uppercase tracking-[-0.04em]" style={head}><Editable value={props?.badgeValue || 'Redchurch St.'} /></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2 — Principles */}
            <section className="px-5 py-24 lg:px-8" style={{ backgroundColor: bgSecond, color: ink, fontFamily: fontBody }}>
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end" style={{ borderColor: surface }}>
                        <h2 className="font-bold uppercase leading-[0.85] tracking-[-0.07em]" style={{ ...head, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
                            <Editable value={props?.principlesHeadline || 'Four rules we keep.'} />
                        </h2>
                        <p className="max-w-xs text-sm leading-6" style={{ color: inkSecond }}>
                            <Editable value={props?.principlesIntro || 'Hover a line. These are the decisions behind every piece in the archive.'} />
                        </p>
                    </div>
                    {principles.map(([title, text], i) => {
                        const on = active === i;
                        return (
                            <div
                                key={title}
                                onMouseEnter={() => setActive(i)}
                                onClick={() => setActive(i)}
                                className="grid cursor-pointer items-center gap-4 border-b px-3 py-7 transition-colors duration-500 md:grid-cols-[4rem_1fr_1.2fr_2rem] md:px-6"
                                style={{ borderColor: surface, backgroundColor: on ? ink : 'transparent', color: on ? bg : ink }}
                            >
                                <span className="text-xs tracking-[0.3em]" style={{ color: on ? bg : accent }}>0{i + 1}</span>
                                <h3 className="text-3xl font-bold uppercase tracking-[-0.05em] sm:text-5xl" style={head}><Editable value={title} /></h3>
                                <p className="text-sm leading-6" style={{ color: on ? mix(bg, 80) : inkSecond }}><Editable value={text} /></p>
                                <Plus size={22} className="hidden transition-transform duration-500 md:block" style={{ transform: on ? 'rotate(135deg)' : 'rotate(0)' }} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 3 — Numbers */}
            <section className="px-5 py-20 lg:px-8" style={{ backgroundColor: accent, color: bg, fontFamily: fontBody }}>
                <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 lg:grid-cols-4">
                    {stats.map(([n, suffix, label]) => (
                        <div key={label} className="border-l pl-5" style={{ borderColor: mix(bg, 35) }}>
                            <p className="text-6xl font-bold tracking-[-0.06em] sm:text-7xl" style={head}><CountUp to={n} suffix={suffix} /></p>
                            <p className="mt-3 text-[10px] uppercase tracking-[0.25em]" style={{ color: mix(bg, 80) }}><Editable value={label} /></p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}