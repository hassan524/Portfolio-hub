// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function FoodBrand3Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#0e0c09';
    const ink = theme?.['ink-second'] || '#f5edd6';

    return (
        <section
            id="press"
            className="w-full relative px-6 sm:px-12 py-32 select-none overflow-hidden border-t border-[#d4af5f]/20"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-5xl text-center space-y-12 relative z-10">
                {/* Michelin 3 Stars Badge */}
                <div className="flex items-center justify-center gap-3">
                    <span className="w-8 h-px bg-[#d4af5f]" />
                    <div className="flex gap-1.5 text-[#d4af5f]">
                        <Star size={16} fill="#d4af5f" />
                        <Star size={16} fill="#d4af5f" />
                        <Star size={16} fill="#d4af5f" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af5f]">
                        Guide Michelin France
                    </span>
                    <span className="w-8 h-px bg-[#d4af5f]" />
                </div>

                {/* Giant Typographic Quote */}
                <motion.blockquote
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-5xl lg:text-6xl font-light italic text-[#f5edd6] leading-tight max-w-4xl mx-auto"
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    <Editable
                        value={props?.quote || '“Obsidian does not serve meals; it constructs sensory architecture. An evening here redefines French haute cuisine.”'}
                        onChange={v => onChange?.({ quote: v })}
                    />
                </motion.blockquote>

                {/* Critic Attribution */}
                <div>
                    <div className="text-sm font-light uppercase tracking-[0.3em] text-[#d4af5f]">
                        The New York Times Gastronomic Review
                    </div>
                    <div className="text-xs text-white/40 mt-1 font-mono uppercase tracking-widest">
                        Chief International Restaurant Critic
                    </div>
                </div>

                {/* Archival Recognition Badges */}
                <div className="pt-12 border-t border-[#d4af5f]/15 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { title: 'Three Stars', sub: 'Michelin Guide 2024' },
                        { title: 'No. 4 Worldwide', sub: 'World’s 50 Best' },
                        { title: 'Grand Sommelier', sub: 'Gault & Millau' },
                        { title: 'Five Diamonds', sub: 'Relais & Châteaux' },
                    ].map(award => (
                        <div key={award.title} className="space-y-1">
                            <div className="text-sm font-light text-[#f5edd6]" style={{ fontFamily: 'Georgia, serif' }}>
                                {award.title}
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-[#d4af5f]/70 font-mono">
                                {award.sub}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const TestimonialsDefault = FoodBrand3Testimonials;
export default FoodBrand3Testimonials;
