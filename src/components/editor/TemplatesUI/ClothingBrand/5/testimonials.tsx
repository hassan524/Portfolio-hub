// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight, Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ClothingBrand5Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || 'Canvas';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || 'CanvasText';
    const inkSecond = theme?.['ink-second'] || ink;
    const accent = theme?.accent || ink;
    const surface = theme?.surface || mix(ink, 12);
    const fontBody = theme?.fontBody;
    const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;

    const items = props?.items?.length
        ? props.items
        : [
            { quote: props?.quote || 'These are the pieces you build a life around. They make everything else look intentional.', source: props?.source || '— Lucia Hart, stylist and collector' },
            { quote: 'I wore the coat for a week straight and was stopped on the street four times. Nothing else in my wardrobe has ever done that.', source: '— Marcus Bell, architect' },
            { quote: 'The fit is quietly perfect. You can tell every seam was argued over, and the repair service is a revelation.', source: '— Aiko Tanaka, creative director' },
        ];

    const autoplay = useRef(Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }));
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
    const [selected, setSelected] = useState(0);
    const onSelect = useCallback(() => emblaApi && setSelected(emblaApi.selectedScrollSnap()), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    const pad = (n: number) => String(n).padStart(2, '0');

    return (
        <motion.section id="testimonials" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="px-5 py-24 lg:px-8 lg:py-32" style={{ backgroundColor: bgSecond, color: ink, fontFamily: fontBody }}>
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[0.35fr_1.65fr]">
                    <div className="flex flex-col justify-between gap-10">
                        <div>
                            <div className="flex gap-1" style={{ color: accent }}>{[1, 2, 3, 4, 5].map((x) => <Star key={x} size={14} fill="currentColor" />)}</div>
                            <div className="mt-5 text-xs uppercase leading-6 tracking-[0.25em]" style={{ color: inkSecond }}>
                                <Editable value={props?.rating || '5.0 / Studio rating'} onChange={(v) => onChange?.({ rating: v })} />
                            </div>
                        </div>
                        <div>
                            <p className="text-7xl font-bold tracking-[-0.06em]" style={{ fontFamily: fontHead }}>
                                {pad(selected + 1)}<span className="text-2xl" style={{ color: inkSecond }}> / {pad(items.length)}</span>
                            </p>
                            <div className="mt-5 h-px w-full" style={{ backgroundColor: surface }}>
                                <div className="h-px transition-all duration-700" style={{ width: `${((selected + 1) / items.length) * 100}%`, backgroundColor: accent }} />
                            </div>
                            <div className="mt-6 flex gap-2">
                                <button type="button" aria-label="Previous" onClick={() => emblaApi?.scrollPrev()} className="grid h-11 w-11 place-items-center rounded-full border transition hover:scale-105 active:scale-95" style={{ borderColor: ink }}><ArrowLeft size={16} /></button>
                                <button type="button" aria-label="Next" onClick={() => emblaApi?.scrollNext()} className="grid h-11 w-11 place-items-center rounded-full transition hover:scale-105 active:scale-95" style={{ backgroundColor: ink, color: bg }}><ArrowRight size={16} /></button>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-0 overflow-hidden rounded-3xl" ref={emblaRef}>
                        <div className="flex">
                            {items.map((item: any, i: number) => (
                                <div key={i} className="min-w-0 flex-[0_0_100%]">
                                    <div className="relative h-full rounded-3xl p-8 lg:p-14" style={{ backgroundColor: surface }}>
                                        <Quote style={{ color: accent }} size={38} />
                                        <p className="mt-8 max-w-4xl text-3xl font-bold leading-[1] tracking-[-0.05em] sm:text-5xl lg:text-6xl" style={{ fontFamily: fontHead }}>
                                            <Editable value={item.quote} onChange={i === 0 ? (v) => onChange?.({ quote: v }) : undefined} />
                                        </p>
                                        <div className="mt-10 flex items-center gap-4 text-sm" style={{ color: inkSecond }}>
                                            <span className="h-px w-10" style={{ backgroundColor: accent }} />
                                            <Editable value={item.source} onChange={i === 0 ? (v) => onChange?.({ source: v }) : undefined} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}