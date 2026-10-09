// @ts-nocheck
import { Sparkles, Award, Shield, ArrowRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

export function JewelryBrand3About({ props = {}, theme, onChange }: any) {
    const bg = '#08251B'; // Deep forest emerald
    const ink = '#FFFFFF';
    const inkSecond = '#A3C8B7';
    const accent = theme?.accent || '#E0C773'; // Gold accent

    const womanPhoto = props?.womanPhoto || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80';

    return (
        <section
            id="about"
            className="relative py-24 md:py-36 px-6 md:px-14 border-b border-white/10"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Model Photography */}
                    <div className="lg:col-span-5 relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                            <img
                                src={womanPhoto}
                                alt="Miller High Jewelry Artisan Craft"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="font-mono text-xs uppercase tracking-widest text-emerald-300">
                                    THE GREEN FIRE ARCHIVE
                                </p>
                                <p className="font-serif text-xl font-light text-white">
                                    Muzo Natural Emeralds & 18k Fairmined Gold
                                </p>
                            </div>
                        </div>

                        {/* Floating Gold Medal */}
                        <div className="absolute -bottom-4 -right-4 bg-emerald-950/90 border border-white/20 p-4 rounded-2xl backdrop-blur-md shadow-xl text-center">
                            <p className="font-serif text-2xl font-light text-amber-200">100%</p>
                            <p className="font-mono text-[9px] uppercase tracking-wider text-emerald-200">Conflict-Free Gems</p>
                        </div>
                    </div>

                    {/* Right: The Miller Legacy & Craftsmanship */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-3">
                            <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
                                <Editable value={props?.eyebrow || 'THE MILLER HERITAGE · CRAFT & PURITY'} onChange={v => onChange?.({ eyebrow: v })} />
                            </p>
                            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08]">
                                <Editable value={props?.headline || 'Born from Earth. Sculpted for Eternity.'} onChange={v => onChange?.({ headline: v })} />
                            </h2>
                        </div>

                        <p className="text-sm sm:text-base font-light leading-relaxed max-w-xl" style={{ color: inkSecond }}>
                            <Editable
                                value={props?.body || 'For three generations, Miller Jewelry has celebrated the raw magnificence of untreated Colombian emeralds. Every piece is hand-assembled by master lapidaries, merging old-world bench artistry with fluid, contemporary silhouettes.'}
                                onChange={v => onChange?.({ body: v })}
                            />
                        </p>

                        {/* Brand Pillars */}
                        <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 font-serif text-lg text-amber-200">
                                    <Sparkles size={16} />
                                    <span>Unrivaled Color Saturation</span>
                                </div>
                                <p className="text-xs font-light leading-relaxed" style={{ color: inkSecond }}>
                                    Each emerald is hand-selected at the source for deep verdant fire and crystalline clarity.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 font-serif text-lg text-amber-200">
                                    <Award size={16} />
                                    <span>Master Bench Savoir-Faire</span>
                                </div>
                                <p className="text-xs font-light leading-relaxed" style={{ color: inkSecond }}>
                                    Over 140 hours of meticulous hand-setting in 18k solid yellow, white, and rose gold.
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-300 hover:text-white transition-colors"
                            >
                                <span>Discover Our High Jewelry Line</span>
                                <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const About = JewelryBrand3About;
export default JewelryBrand3About;
