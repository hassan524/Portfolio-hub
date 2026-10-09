// @ts-nocheck
import { Star, Quote } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#0A1A24';
    const ink = theme?.ink || '#E2F4F6';
    const inkSecond = theme?.['ink-second'] || '#81A8B8';
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.04)';
    const accent = theme?.accent || '#38BDF8';

    const reviews = (props?.reviews && props.reviews.length > 0)
        ? props.reviews
        : (props?.items && props.items.length > 0)
            ? props.items
            : [
                ['“The Hydro-Infusion restored my skin barrier after months of harsh active ingredient damage. The glow lasted for weeks.”', 'Cameron D. — Architect'],
                ['“Serene atmosphere, clinical precision, and zero guesswork. My skin feels genuinely plumped and deeply nourished.”', 'Sofia R. — Creative Lead']
            ];

    return (
        <section id="testimonials" className="px-6 py-28 relative" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-6xl">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <Editable value="VERIFIED VOICES" className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: accent }} />
                    <Editable as="h2" value="Words from our guests" className="mt-3 text-4xl font-extralight tracking-tight md:text-5xl" />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {reviews.map((review: any, index: number) => (
                        <article
                            key={index}
                            className="rounded-3xl p-8 md:p-10 border backdrop-blur-xl relative flex flex-col justify-between"
                            style={{ backgroundColor: surface, borderColor: `${accent}22` }}
                        >
                            <Quote size={32} className="opacity-30 mb-6" style={{ color: accent }} />
                            <Editable
                                as="p"
                                value={review[0]}
                                className="text-xl font-light leading-relaxed tracking-tight"
                            />
                            <div className="mt-8 pt-6 border-t flex items-center justify-between" style={{ borderColor: `${accent}15` }}>
                                <Editable value={review[1]} className="text-sm font-medium" style={{ color: inkSecond }} />
                                <div className="flex gap-1" style={{ color: accent }}>
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} size={14} fill="currentColor" />
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}