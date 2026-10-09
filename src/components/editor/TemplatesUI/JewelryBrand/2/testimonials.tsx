// @ts-nocheck
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

function FloatingWing({ flip = false, accent }: any) {
    const scaleX = flip ? -1 : 1;
    return (
        <motion.g
            style={{ scaleX, transformOrigin: '50% 50%' }}
            animate={{ scaleX: [scaleX, scaleX * 0.3, scaleX] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
        >
            <path d="M50,50 C30,10 -10,30 10,60 C20,80 40,75 50,50 Z" fill={accent} opacity="0.75" />
            <path d="M50,50 C30,30 5,50 15,70 C25,88 45,80 50,50 Z" fill={accent} opacity="0.4" />
        </motion.g>
    );
}

export function JewelryBrand2Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF0F5';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFF0F5' : theme?.ink || '#FFF0F5')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#3D1A2E' : theme?.ink || '#3D1A2E');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#F5B8D8' : theme?.['ink-second'] || '#F5B8D8')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#9B4F7C');

    const accent = theme?.accent || '#E8317A';
    const surface = theme?.surface || (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(232, 49, 122, 0.08)');

    const testimonials = props?.testimonials || [
        {
            quote: 'Working directly with the designer to create my bespoke morganite ring was the most personal luxury experience I have ever had. She captured a sentiment I could not put into words.',
            author: 'Lady Genevieve Vance',
            role: 'Private Collector · London & Monaco',
            commission: 'Bespoke 4.2ct Morganite & Rose Gold Solitaire',
            year: '2025 Commission'
        },
        {
            quote: 'These are not factory ornaments — they are heirlooms with a soul. Every time I wear the butterfly pendant, people stop me across the room. It feels alive.',
            author: 'Aria Montclaire',
            role: 'Creative Director · Paris',
            commission: 'En Tremblant Pink Diamond Butterfly Brooch',
            year: '2024 Commission'
        },
        {
            quote: 'Her eye for balance and weight is extraordinary. The earrings rest with total featherlight grace, yet make an unforgettable architectural statement.',
            author: 'Dr. Seraphina Chen',
            role: 'Art Historian & Collector · Kyoto & New York',
            commission: 'Tourmaline Cascade Ear Sculptures',
            year: '2024 Commission'
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const active = testimonials[activeIndex] || testimonials[0];

    const updateTestimonial = (idx: number, key: string, value: string) => {
        const next = testimonials.map((item: any, i: number) =>
            i === idx ? { ...item, [key]: value } : item
        );
        onChange?.({ testimonials: next });
    };

    return (
        <section
            id="testimonials"
            className="relative overflow-hidden py-24 md:py-36 px-6 md:px-16"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Ambient subtle glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full blur-[140px] opacity-20"
                style={{ backgroundColor: accent }}
            />

            {/* Flying mini-butterfly accent */}
            <motion.div
                className="pointer-events-none absolute top-12 right-16 hidden md:block"
                animate={{ y: [0, -12, 0], x: [0, 8, 0], rotate: [-2, 4, -2] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg viewBox="0 0 100 80" width="55" height="44">
                    <g transform="translate(50, 40)">
                        <FloatingWing accent={accent} />
                        <FloatingWing flip accent={accent} />
                        <ellipse cx="0" cy="0" rx="2" ry="10" fill={isDark ? '#F5B8D8' : '#3D1A2E'} opacity="0.8" />
                    </g>
                </svg>
            </motion.div>

            <div className="mx-auto max-w-6xl">
                {/* Section Eyebrow (No cards, pure typography) */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b pb-8" style={{ borderColor: surface }}>
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Sparkles size={14} style={{ color: accent }} />
                            <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: accent }}>
                                <Editable value={props?.eyebrow || 'Letters & Collector Notes'} onChange={v => onChange?.({ eyebrow: v })} />
                            </p>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight">
                            <Editable value={props?.headline || 'Cherished in Private Hands'} onChange={v => onChange?.({ headline: v })} />
                        </h2>
                    </div>

                    {/* Stepper controls */}
                    <div className="mt-6 md:mt-0 flex items-center gap-6">
                        <span className="font-mono text-xs tracking-widest" style={{ color: inkSecond }}>
                            0{activeIndex + 1} — 0{testimonials.length}
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                                aria-label="Previous note"
                                className="p-3 transition-colors rounded-full hover:opacity-75"
                                style={{ color: ink, border: `1px solid ${surface}` }}
                            >
                                <ArrowLeft size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                                aria-label="Next note"
                                className="p-3 transition-colors rounded-full hover:opacity-75"
                                style={{ color: ink, border: `1px solid ${surface}` }}
                            >
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Editorial Quote Display — NO CARDS, open generous spacing */}
                <div className="py-16 md:py-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.5, ease }}
                            className="grid md:grid-cols-12 gap-10 items-start"
                        >
                            <div className="md:col-span-8">
                                <span className="font-serif text-6xl md:text-8xl block leading-none select-none opacity-40 mb-2" style={{ color: accent }}>
                                    “
                                </span>
                                <blockquote className="font-serif text-2xl md:text-4xl lg:text-5xl font-light leading-[1.3] tracking-tight">
                                    <Editable
                                        value={active.quote}
                                        onChange={v => updateTestimonial(activeIndex, 'quote', v)}
                                    />
                                </blockquote>
                            </div>

                            <div className="md:col-span-4 md:border-l md:pl-10 space-y-6 pt-4" style={{ borderColor: surface }}>
                                <div>
                                    <p className="font-serif text-xl font-medium tracking-wide">
                                        <Editable
                                            value={active.author}
                                            onChange={v => updateTestimonial(activeIndex, 'author', v)}
                                        />
                                    </p>
                                    <p className="text-xs uppercase tracking-widest mt-1" style={{ color: inkSecond }}>
                                        <Editable
                                            value={active.role}
                                            onChange={v => updateTestimonial(activeIndex, 'role', v)}
                                        />
                                    </p>
                                </div>

                                <div className="pt-4 border-t" style={{ borderColor: surface }}>
                                    <p className="text-[11px] uppercase tracking-widest" style={{ color: accent }}>
                                        Commissioned Piece
                                    </p>
                                    <p className="text-sm font-light mt-1" style={{ color: inkSecond }}>
                                        <Editable
                                            value={active.commission}
                                            onChange={v => updateTestimonial(activeIndex, 'commission', v)}
                                        />
                                    </p>
                                </div>

                                <div>
                                    <span className="inline-block px-3 py-1 text-[11px] font-mono tracking-wider rounded-full border" style={{ borderColor: surface, color: inkSecond }}>
                                        <Editable
                                            value={active.year}
                                            onChange={v => updateTestimonial(activeIndex, 'year', v)}
                                        />
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Direct quote index row (NO CARDS) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t" style={{ borderColor: surface }}>
                    {testimonials.map((item: any, i: number) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActiveIndex(i)}
                            className="text-left group transition-opacity"
                            style={{ opacity: activeIndex === i ? 1 : 0.45 }}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-mono text-xs tracking-widest" style={{ color: activeIndex === i ? accent : inkSecond }}>
                                    0{i + 1}
                                </span>
                                <div
                                    className="h-px flex-1 transition-colors"
                                    style={{ backgroundColor: activeIndex === i ? accent : surface }}
                                />
                            </div>
                            <p className="text-sm font-medium truncate" style={{ color: ink }}>
                                {item.author}
                            </p>
                            <p className="text-xs truncate" style={{ color: inkSecond }}>
                                {item.commission}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const Testimonials = JewelryBrand2Testimonials;
export default JewelryBrand2Testimonials;
