// @ts-nocheck
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ClothingBrand5Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || 'Canvas';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || 'CanvasText';
    const inkSecond = theme?.['ink-second'] || ink;
    const accent = theme?.accent || ink;
    const surface = theme?.surface || mix(ink, 12);
    const fontBody = theme?.fontBody;
    const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;
    const [hover, setHover] = useState(-1);

    const rows = [
        [Phone, 'Telephone', '+44 20 7946 0812', 'phone'],
        [MapPin, 'Showroom', '14 Redchurch Street, London', 'address'],
        [Clock3, 'Opening hours', 'Wed—Sat / 11:00—18:00', 'hours'],
    ];
    const email = props?.email || 'studio@aroxform.com';

    return (
        <section id="contact" className="px-5 py-24 lg:px-8 lg:py-36" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
                    <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl font-bold uppercase leading-[0.8] tracking-[-0.08em]" style={{ fontFamily: fontHead, fontSize: 'clamp(3.2rem, 9vw, 8.5rem)' }}>
                        <Editable value={props?.headline || 'See it in person.'} onChange={(v) => onChange?.({ headline: v })} />
                    </motion.h2>
                    <p className="max-w-xs text-sm leading-6" style={{ color: inkSecond }}>
                        <Editable value={props?.intro || 'Our showroom is a quiet place to meet the collection, ask questions, and find your next forever piece.'} onChange={(v) => onChange?.({ intro: v })} />
                    </p>
                </div>

                {/* Big email row */}
                <div className="group mt-16 flex items-center justify-between gap-6 border-y py-8 transition-colors duration-500 md:px-6" style={{ borderColor: surface }}>
                    <div className="flex min-w-0 items-center gap-4">
                        <Mail style={{ color: accent }} className="shrink-0" />
                        <div className="min-w-0 break-all text-2xl font-bold tracking-[-0.04em] sm:text-5xl lg:text-6xl" style={{ fontFamily: fontHead }}>
                            <Editable value={email} onChange={(v) => onChange?.({ email: v })} />
                        </div>
                    </div>
                    <a href={`mailto:${email}`} aria-label="Send email" className="grid h-14 w-14 shrink-0 place-items-center rounded-full transition duration-500 group-hover:rotate-45 group-hover:scale-110 sm:h-20 sm:w-20" style={{ backgroundColor: accent, color: bg }}>
                        <ArrowUpRight size={26} />
                    </a>
                </div>

                {/* Detail rows */}
                <div className="mt-2">
                    {rows.map(([Icon, label, value, key], i) => (
                        <div key={key} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} className="grid items-center gap-3 border-b px-2 py-6 transition-all duration-500 md:grid-cols-[3rem_1fr_2fr] md:px-6" style={{ borderColor: surface, paddingLeft: hover === i ? '2.25rem' : undefined, backgroundColor: hover === i ? surface : 'transparent' }}>
                            <Icon size={18} style={{ color: accent }} />
                            <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: inkSecond }}><Editable value={label} /></div>
                            <div className="text-lg sm:text-2xl"><Editable value={value} onChange={(v) => onChange?.({ [key]: v })} /></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}