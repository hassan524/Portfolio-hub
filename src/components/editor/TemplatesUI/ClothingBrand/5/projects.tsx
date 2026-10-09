// @ts-nocheck
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ClothingBrand5Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || 'Canvas';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || 'CanvasText';
    const inkSecond = theme?.['ink-second'] || ink;
    const accent = theme?.accent || ink;
    const surface = theme?.surface || mix(ink, 12);
    const fontBody = theme?.fontBody;
    const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;
    const [selected, setSelected] = useState<any>(null);

    const items = [
        ['No. 01 / The Coat', 'A full-bodied wool coat with an architectural shoulder.', 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=1000&q=85', 'The first form in the archive: a long line, a strong shoulder, and room for interpretation.', 'md:col-span-7', 'aspect-[4/5]', ''],
        ['No. 02 / The Shirt', 'A cotton poplin shirt, softened at the edges.', 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1000&q=85', 'A familiar object made deliberate through proportion, touch, and a little restraint.', 'md:col-span-5', 'aspect-[3/4]', 'md:mt-40'],
        ['No. 03 / The Dress', 'A long line and a low conversation.', 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85', 'A study in presence: simple from a distance, full of detail when you stay with it.', 'md:col-span-6 md:col-start-4', 'aspect-[16/11]', 'md:-mt-10'],
    ];

    return (
        <motion.section id="projects" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7 }} className="px-5 py-24 lg:px-8 lg:py-36" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-end" style={{ borderColor: surface }}>
                    <div>
                        <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
                            <span className="h-px w-10" style={{ backgroundColor: accent }} />
                            <Editable value={props?.label || 'The archive'} onChange={(v) => onChange?.({ label: v })} />
                        </span>
                        <h2 className="mt-5 font-bold uppercase leading-[0.82] tracking-[-0.08em]" style={{ fontFamily: fontHead, fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
                            <Editable value={props?.headline || 'Essential forms.'} onChange={(v) => onChange?.({ headline: v })} />
                        </h2>
                    </div>
                    <div className="text-xs uppercase tracking-[0.3em]" style={{ color: inkSecond }}>
                        <Editable value={props?.count || '03 objects'} onChange={(v) => onChange?.({ count: v })} />
                    </div>
                </div>

                <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
                    {items.map(([title, desc, img, detail, span, ratio, offset], i) => (
                        <motion.button
                            type="button"
                            key={title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            onClick={() => setSelected({ title, desc, img: props?.[`image${i}`] || img, detail })}
                            className={`group text-left ${span} ${offset}`}
                        >
                            <div className={`relative overflow-hidden rounded-[1.75rem] ${ratio}`} style={{ backgroundColor: surface }}>
                                <motion.img
                                    initial={{ scale: 1.2 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.4 }}
                                    className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-[1.06]"
                                    src={props?.[`image${i}`] || img}
                                    alt=""
                                />
                                <span className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] backdrop-blur-md" style={{ backgroundColor: mix(bg, 80), color: ink }}>0{i + 1}</span>
                                <span className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 scale-0 place-items-center rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] transition-transform duration-500 group-hover:scale-100" style={{ backgroundColor: accent, color: bg }}>View</span>
                            </div>
                            <div className="mt-5 flex items-start justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold uppercase tracking-[-0.04em] sm:text-3xl" style={{ fontFamily: fontHead }}><Editable value={title} /></h3>
                                    <p className="mt-2 max-w-sm text-sm leading-6" style={{ color: inkSecond }}><Editable value={desc} /></p>
                                </div>
                                <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border transition duration-500 group-hover:rotate-45" style={{ borderColor: ink }}><ArrowUpRight size={16} /></span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {selected && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 grid place-items-center p-5 backdrop-blur-md" style={{ backgroundColor: mix(bg, 85) }} onClick={() => setSelected(null)}>
                    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} role="dialog" aria-modal="true" className="relative max-h-[90vh] max-w-3xl overflow-auto rounded-3xl border p-6 md:p-8" style={{ backgroundColor: bgSecond, color: ink, borderColor: surface }} onClick={(e) => e.stopPropagation()}>
                        <button type="button" aria-label="Close" onClick={() => setSelected(null)} className="absolute right-4 top-4 z-10 rounded-full p-2" style={{ backgroundColor: surface }}><X size={17} /></button>
                        <div className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:items-end">
                            <img className="h-80 w-full rounded-2xl object-cover" src={selected.img} alt="" />
                            <div>
                                <h3 className="text-4xl font-bold uppercase tracking-[-0.05em]" style={{ fontFamily: fontHead }}><Editable value={selected.title} /></h3>
                                <p className="mt-4 text-base leading-7" style={{ color: inkSecond }}><Editable value={selected.detail} /></p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </motion.section>
    );
}