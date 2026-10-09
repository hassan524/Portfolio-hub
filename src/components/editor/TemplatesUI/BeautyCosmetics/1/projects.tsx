// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];
const sizes = [400, 320, 360];
const offsets = [0, 120, 40];

function Bubble({ item, index, size, accent, bg, items, onChange, onOpen }: any) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const dir = index % 2 === 0 ? 1 : -1;
    const y = useTransform(scrollYProgress, [0, 1], [80 * dir, -80 * dir]);
    return (
        <motion.div ref={ref} style={{ y, marginTop: offsets[index % 3] }} className="flex flex-col items-center">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ type: 'spring', stiffness: 140, damping: 14, delay: index * 0.15 }}
                className="flex flex-col items-center"
            >
                <motion.div
                    animate={{ y: [0, -16, 0] }}
                    transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
                    className="group relative"
                    style={{ width: size, height: size, maxWidth: '80vw', maxHeight: '80vw' }}
                >
                    <motion.div aria-hidden="true" className="absolute -inset-5 rounded-full border border-dashed opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: accent }} animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
                    <div aria-hidden="true" className="absolute inset-0 -z-10 translate-y-8 scale-90 rounded-full blur-3xl" style={{ backgroundColor: `${accent}40` }} />
                    <button type="button" onClick={() => onOpen(index)} aria-label={`Open ${item.title}`} className="relative block h-full w-full rounded-full">
                        <motion.img layoutId={`img-${index}`} src={item.image} alt={item.title} className="h-full w-full rounded-full object-cover shadow-2xl transition duration-700 group-hover:scale-[1.06]" />
                        <span className="absolute inset-0 grid place-items-center rounded-full text-base font-semibold opacity-0 transition duration-300 group-hover:opacity-100" style={{ backgroundColor: `${accent}d0`, color: bg }}>
                            <span className="inline-flex items-center gap-1">Open <ArrowUpRight size={18} /></span>
                        </span>
                    </button>
                </motion.div>
                <Editable as="h3" value={item.title} onChange={(v) => { const next = [...items]; next[index] = { ...item, title: v }; onChange?.({ items: next }); }} className="mt-10 text-2xl font-semibold tracking-[-0.03em]" />
                <Editable value={item.price} className="mt-1 text-sm font-semibold" style={{ color: accent }} />
            </motion.div>
        </motion.div>
    );
}

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF8F7';
    const ink = theme?.ink || '#20191A';
    const inkSecond = theme?.['ink-second'] || '#6D5B5E';
    const surface = theme?.surface || 'rgba(255,255,255,.75)';
    const accent = theme?.accent || '#D97382';
    const items = (props?.items && props.items.length > 0) ? props.items : [
        { title: 'Cloud Veil Cream', copy: 'A plush daily moisturizer for a soft, dewy finish.', price: '$42 · 50 ml', image: 'https://images.pexels.com/photos/7670680/pexels-photo-7670680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
        { title: 'Rosewater Reset', copy: 'A quiet mist with rose, aloe, and a fresh start.', price: '$28 · 100 ml', image: 'https://images.pexels.com/photos/8101534/pexels-photo-8101534.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
        { title: 'Night Bloom Oil', copy: 'A silky botanical blend to seal in your evening ritual.', price: '$54 · 30 ml', image: 'https://images.pexels.com/photos/8903264/pexels-photo-8903264.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' },
    ];
    const [selected, setSelected] = useState<number | null>(null);
    const n = items.length;
    const current = selected !== null ? items[selected] : null;
    const marquee = items.map((i: any) => i.title).join('  ✦  ') + '  ✦  ';

    useEffect(() => {
        if (selected === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelected(null);
            if (e.key === 'ArrowRight') setSelected((s: number) => (s + 1) % n);
            if (e.key === 'ArrowLeft') setSelected((s: number) => (s - 1 + n) % n);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [selected, n]);

    return (
        <section id="projects" className="relative min-h-screen overflow-hidden px-5 py-32" style={{ backgroundColor: bg, color: ink }}>
            {/* Giant scrolling outline text */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap">
                <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="flex w-max text-[18vw] font-semibold leading-none tracking-[-0.05em]" style={{ color: 'transparent', WebkitTextStroke: `1.5px ${accent}33` }}>
                    <span>{marquee}</span><span>{marquee}</span>
                </motion.div>
            </div>

            <div className="relative mx-auto max-w-7xl">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }} className="text-center">
                    <Editable value="THE EDIT" className="text-xs font-semibold tracking-[0.35em]" style={{ color: accent }} />
                    <Editable as="h2" value="The daily lineup" className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-8xl" />
                    <Editable value="Tap a bloom to open it." className="mt-4 block text-base" style={{ color: inkSecond }} />
                </motion.div>

                <div className="mt-24 flex flex-wrap items-start justify-center gap-x-20 gap-y-24">
                    {items.map((item: any, index: number) => (
                        <Bubble key={index} item={item} index={index} size={sizes[index % 3]} accent={accent} bg={bg} items={items} onChange={onChange} onOpen={setSelected} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {current && (
                    <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-5 backdrop-blur-md" style={{ backgroundColor: `${ink}b3` }} role="dialog" aria-modal="true">
                        <div onClick={(e) => e.stopPropagation()} className="grid w-full max-w-5xl items-center gap-10 md:grid-cols-2" style={{ color: bg }}>
                            <motion.img layoutId={`img-${selected}`} src={current.image} alt={current.title} className="mx-auto aspect-square w-full max-w-lg rounded-full object-cover shadow-2xl" />
                            <AnimatePresence mode="wait">
                                <motion.div key={selected} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35, ease }}>
                                    <h3 className="text-5xl font-semibold tracking-[-0.045em] md:text-6xl">{current.title}</h3>
                                    <p className="mt-5 max-w-sm text-lg leading-8 opacity-80">{current.copy}</p>
                                    <p className="mt-6 text-2xl font-semibold" style={{ color: accent }}>{current.price}</p>
                                    <div className="mt-10 flex items-center gap-3">
                                        <a href="#contact" onClick={() => setSelected(null)} className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition hover:scale-[1.03] active:scale-95" style={{ backgroundColor: accent, color: bg }}>Get in touch <ArrowUpRight size={16} /></a>
                                        <button type="button" aria-label="Previous" onClick={() => setSelected((selected - 1 + n) % n)} className="grid h-12 w-12 place-items-center rounded-full transition hover:scale-110" style={{ backgroundColor: surface, color: ink }}><ArrowLeft size={16} /></button>
                                        <button type="button" aria-label="Next" onClick={() => setSelected((selected + 1) % n)} className="grid h-12 w-12 place-items-center rounded-full transition hover:scale-110" style={{ backgroundColor: surface, color: ink }}><ArrowRight size={16} /></button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <button type="button" onClick={() => setSelected(null)} aria-label="Close" className="fixed right-5 top-5 grid h-11 w-11 place-items-center rounded-full transition hover:rotate-90" style={{ backgroundColor: surface, color: ink }}><X size={18} /></button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}