// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { Quote, Award } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

function Count({ value, className, style }: any) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const m = String(value).match(/^(\D*)(\d+)(\D*)$/);
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!inView || !m) return;
        const c = animate(0, Number(m[2]), { duration: 2, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
        return () => c.stop();
    }, [inView]);
    return <strong ref={ref} className={className} style={style}>{m ? `${m[1]}${v}${m[3]}` : value}</strong>;
}

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.ink || '#20191A';
    const ink = theme?.bg || '#FFF8F7';
    const inkSecond = theme?.['ink-second'] || '#E7D8D7';
    const accent = theme?.accent || '#D97382';
    const reviews = (props?.reviews && props.reviews.length > 0) ? props.reviews : (props?.items && props.items.length > 0) ? props.items : [
        ['"My skin feels like it can breathe again. Pearl makes the everyday feel special."', 'Mina R.'],
        ['"The kind of formulas you keep reaching for. Beautiful, uncomplicated, effective."', 'Ari L.'],
    ];
    const [i, setI] = useState(0);
    const [paused, setPaused] = useState(false);
    const n = reviews.length;
    useEffect(() => {
        if (paused || n < 2) return;
        const t = setTimeout(() => setI((x) => (x + 1) % n), 6000);
        return () => clearTimeout(t);
    }, [i, paused, n]);
    const r = reviews[i % n];

    return (
        <section id="journal" className="relative min-h-[90vh] overflow-hidden px-5 py-32" style={{ backgroundColor: bg, color: ink }}>
            <motion.div aria-hidden="true" className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full blur-3xl" style={{ backgroundColor: `${accent}22` }} animate={{ x: [0, 120, 0], y: [0, 60, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full blur-3xl" style={{ backgroundColor: `${accent}18` }} animate={{ x: [0, -100, 0], y: [0, -80, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />

            <div className="relative mx-auto max-w-6xl">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} className="flex items-center gap-3">
                    <Award style={{ color: accent }} />
                    <Editable value="NOTES FROM THE COMMUNITY" className="text-xs font-semibold tracking-[0.3em]" style={{ color: accent }} />
                </motion.div>

                <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative mt-14 min-h-[360px] md:min-h-[320px]">
                    <Quote size={90} className="absolute -left-2 -top-10 opacity-20" style={{ color: accent }} />
                    <AnimatePresence mode="wait">
                        <motion.div key={i} initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }} transition={{ duration: 0.7, ease }} className="relative">
                            <Editable as="p" value={r[0]} className="max-w-5xl text-4xl font-semibold leading-[1.1] tracking-[-0.045em] md:text-6xl" />
                            <Editable value={r[1]} className="mt-10 block text-lg" style={{ color: accent }} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-6 flex gap-3">
                    {reviews.map((_: any, k: number) => (
                        <button key={k} type="button" onClick={() => setI(k)} aria-label={`Review ${k + 1}`} className="relative h-1.5 w-20 overflow-hidden rounded-full" style={{ backgroundColor: `${ink}25` }}>
                            {k === i && (
                                <motion.span key={`${i}-${paused}`} className="absolute inset-0 origin-left rounded-full" style={{ backgroundColor: accent }} initial={{ scaleX: 0 }} animate={{ scaleX: paused ? 1 : 1 }} transition={{ duration: paused ? 0 : 6, ease: 'linear' }} />
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-24 grid grid-cols-2 gap-10 border-t pt-12 sm:grid-cols-4" style={{ borderColor: `${accent}55` }}>
                    {[['12', 'awards'], ['96%', 'returning'], ['3', 'hero rituals'], ['2018', 'founded']].map(([num, l], k) => (
                        <motion.div key={l} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: k * 0.1, ease }}>
                            <Count value={num} className="block text-6xl font-semibold tracking-[-0.05em] md:text-7xl" style={{ color: accent }} />
                            <Editable as="span" value={l} className="mt-2 block text-sm" style={{ color: inkSecond }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}