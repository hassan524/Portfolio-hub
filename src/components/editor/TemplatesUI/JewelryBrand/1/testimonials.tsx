// @ts-nocheck
import { useState } from 'react';
import { Star, Sparkles, ArrowRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

const defaultReviews = [
    {
        name: 'OLA MAREK',
        location: 'Warsaw · Verified Collector',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        quote: 'The weight and balance of this piece are sublime. I wear it daily and it still looks as radiant as day one.',
        rating: 5,
        piece: 'Golden Loop & Halo Shine'
    },
    {
        name: 'LEONA ARBIT',
        location: 'Berlin · Verified Collector',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
        quote: 'Understated, elegant, and timeless. Received countless compliments at my sister’s wedding in Lake Como.',
        rating: 5,
        piece: 'Pearl Mist Choker'
    },
    {
        name: 'SISHA KAUR',
        location: 'London · Verified Collector',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
        quote: 'The bespoke packaging and fair-mined solid gold made this the most cherished anniversary gift I have ever received.',
        rating: 5,
        piece: 'Luna Drop & Dusk Bracelet'
    }
];

export function JewelryBrand1Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FBF8F5';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFFFFF' : theme?.ink || '#FFFFFF')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#1C1917' : theme?.ink || '#1C1917');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#D6D3D1' : theme?.['ink-second'] || '#D6D3D1')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#78716C');

    const accent = theme?.accent || '#B48C56';
    const surface = isDark ? 'rgba(255, 255, 255, 0.05)' : (theme?.surface || '#F5ECE1');

    const reviews = (props?.testimonials && props.testimonials.length > 0) ? props.testimonials : defaultReviews;
    const bannerImage = props?.bannerImage || 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1600&q=80';

    const updateReview = (idx: number, key: string, val: string) => {
        const next = reviews.map((item: any, i: number) => i === idx ? { ...item, [key]: val } : item);
        onChange?.({ testimonials: next });
    };

    return (
        <section
            id="testimonials"
            className="relative py-24 md:py-36 px-6 md:px-14 border-b overflow-hidden"
            style={{
                backgroundColor: bg,
                color: ink,
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
            }}
        >
            <div className="mx-auto max-w-7xl space-y-24">
                {/* Part 1: "JEWELRY THAT TRULY CONNECTS" (From Image 3) */}
                <div>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
                            <Editable value={props?.eyebrow || 'CLIENT DIALOGUES · TESTIMONIALS'} onChange={v => onChange?.({ eyebrow: v })} />
                        </p>
                        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight mt-2">
                            <Editable value={props?.headline || 'Jewelry That Truly Connects'} onChange={v => onChange?.({ headline: v })} />
                        </h2>
                        <p className="text-sm font-light mt-3" style={{ color: inkSecond }}>
                            Real reflections from women who wear ADORNIX as part of their daily life chapters.
                        </p>
                    </div>

                    {/* 3 Review Cards with Model Avatars */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {reviews.map((rev: any, idx: number) => (
                            <div
                                key={rev.name || idx}
                                className="rounded-3xl p-8 border flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-lg"
                                style={{
                                    backgroundColor: isDark ? 'rgba(28,25,23,0.6)' : '#FFFFFF',
                                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
                                }}
                            >
                                <div>
                                    {/* Client photo & star rating */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 shrink-0 shadow-sm" style={{ borderColor: accent }}>
                                            <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1 text-amber-500 mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={13} fill="currentColor" />
                                                ))}
                                            </div>
                                            <p className="font-sans text-xs font-bold tracking-wider">
                                                <Editable value={rev.name} onChange={v => updateReview(idx, 'name', v)} />
                                            </p>
                                            <p className="font-mono text-[10px]" style={{ color: inkSecond }}>
                                                <Editable value={rev.location} onChange={v => updateReview(idx, 'location', v)} />
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <blockquote className="font-serif text-base sm:text-lg font-light leading-relaxed mb-6">
                                        “<Editable value={rev.quote} onChange={v => updateReview(idx, 'quote', v)} />”
                                    </blockquote>
                                </div>

                                <div className="pt-4 border-t flex items-center justify-between text-[11px] font-mono" style={{ borderColor: surface }}>
                                    <span style={{ color: inkSecond }}>COLLECTED PIECE</span>
                                    <span style={{ color: accent }}>{rev.piece}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Part 2: Wide Photographic Banner from Image 3: "WEAR BEAUTY WITH MEANING EVERYDAY" */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[380px] flex items-center justify-center p-8 text-center text-white">
                    <img
                        src={bannerImage}
                        alt="Jewelry on hand banner"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

                    <div className="relative z-10 max-w-2xl space-y-6">
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-200">
                            EVERYDAY LUXURY
                        </p>
                        <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.08]">
                            Wear Beauty With Meaning Everyday
                        </h3>
                        <p className="text-xs sm:text-sm font-light text-white/80 max-w-md mx-auto">
                            Join over 125,000 discerning collectors and enjoy bespoke complimentary concierge packaging.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                            <a
                                href="#projects"
                                className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-transform hover:scale-105 shadow-lg bg-white text-stone-900"
                            >
                                Shop Now
                            </a>
                            <a
                                href="#contact"
                                className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-transform hover:scale-105 border border-white text-white hover:bg-white/10"
                            >
                                Join Newsletter
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const Testimonials = JewelryBrand1Testimonials;
export default JewelryBrand1Testimonials;
