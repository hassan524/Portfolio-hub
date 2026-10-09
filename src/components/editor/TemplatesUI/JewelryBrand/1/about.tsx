// @ts-nocheck
import { Award, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
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

export function JewelryBrand1About({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#F5ECE1';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFFFFF' : theme?.ink || '#FFFFFF')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#1C1917' : theme?.ink || '#1C1917');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#D6D3D1' : theme?.['ink-second'] || '#D6D3D1')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#78716C');

    const accent = theme?.accent || '#B48C56';
    const surface = isDark ? 'rgba(255, 255, 255, 0.06)' : (theme?.surface || '#EFE6DB');

    const modelImage = props?.modelImage || 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80';

    return (
        <section
            id="about"
            className="relative py-24 md:py-36 px-6 md:px-14 border-b overflow-hidden"
            style={{
                backgroundColor: bg,
                color: ink,
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
            }}
        >
            <div className="mx-auto max-w-7xl">
                {/* Part 1: Editorial Spotlight with Portrait & Stats */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left: Warm Studio Portrait (From Image 2 bottom) */}
                    <div className="lg:col-span-5 relative">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)' }}>
                            <img
                                src={modelImage}
                                alt="Model wearing Adornix necklace"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <p className="font-mono text-xs uppercase tracking-widest text-amber-200">
                                    THE SIGNATURE LOCKET
                                </p>
                                <p className="font-serif text-xl font-light">
                                    18k Recycled Yellow Gold
                                </p>
                            </div>
                        </div>

                        {/* Floating decorative badge */}
                        <div
                            className="absolute -top-4 -right-4 px-4 py-2 rounded-2xl border shadow-lg backdrop-blur-md flex items-center gap-2"
                            style={{
                                backgroundColor: isDark ? 'rgba(28,25,23,0.9)' : 'rgba(255,255,255,0.95)',
                                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'
                            }}
                        >
                            <Sparkles size={14} style={{ color: accent }} />
                            <span className="font-sans text-xs font-semibold">100% Ethical Gold</span>
                        </div>
                    </div>

                    {/* Right: Brand Story & Quantitative Milestones */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-4">
                            <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
                                <Editable value={props?.eyebrow || 'OUR COMMITMENT · CRAFT & PURITY'} onChange={v => onChange?.({ eyebrow: v })} />
                            </p>
                            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-[1.12]">
                                <Editable value={props?.headline || 'Timeless Jewelry For Modern Living.'} onChange={v => onChange?.({ headline: v })} />
                            </h2>
                        </div>

                        <p className="text-sm md:text-base font-light leading-relaxed max-w-xl" style={{ color: inkSecond }}>
                            <Editable
                                value={props?.body || 'At ADORNIX, each creation is more than just jewelry — it is a personal statement. Hand-forged by master artisans with respect for sustainable metallurgy and exquisite simplicity. Designed to transition effortlessly from morning daylight to evening galas.'}
                                onChange={v => onChange?.({ body: v })}
                            />
                        </p>

                        {/* Stats Row (From Image 2) */}
                        <div className="grid grid-cols-2 gap-8 py-6 border-y" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
                            <div>
                                <p className="font-serif text-3xl sm:text-4xl font-normal">
                                    <Editable value={props?.stat1Value || '300+'} onChange={v => onChange?.({ stat1Value: v })} />
                                </p>
                                <p className="font-mono text-xs uppercase tracking-wider mt-1" style={{ color: inkSecond }}>
                                    <Editable value={props?.stat1Label || 'Curated Signature Pieces'} onChange={v => onChange?.({ stat1Label: v })} />
                                </p>
                            </div>
                            <div>
                                <p className="font-serif text-3xl sm:text-4xl font-normal">
                                    <Editable value={props?.stat2Value || '5000+'} onChange={v => onChange?.({ stat2Value: v })} />
                                </p>
                                <p className="font-mono text-xs uppercase tracking-wider mt-1" style={{ color: inkSecond }}>
                                    <Editable value={props?.stat2Label || 'Global Boutique Deliveries'} onChange={v => onChange?.({ stat2Label: v })} />
                                </p>
                            </div>
                        </div>

                        {/* Feature Badges from Image 3: "DESIGNED TO IMPRESS, MADE TO LAST" */}
                        <div className="space-y-4 pt-2">
                            <p className="font-sans text-xs uppercase tracking-widest font-semibold" style={{ color: accent }}>
                                THREE PILLARS OF EXCELLENCE
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl border" style={{ backgroundColor: surface, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
                                    <div className="flex items-center gap-2 font-sans text-xs font-semibold">
                                        <Award size={16} style={{ color: accent }} />
                                        <span>PREMIUM QUALITY</span>
                                    </div>
                                    <p className="text-[11px] font-light mt-1" style={{ color: inkSecond }}>
                                        Solid 18k yellow, rose, and white gold engineered for daily wear without tarnishing.
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl border" style={{ backgroundColor: surface, borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }}>
                                    <div className="flex items-center gap-2 font-sans text-xs font-semibold">
                                        <Globe size={16} style={{ color: accent }} />
                                        <span>LOVED WORLDWIDE</span>
                                    </div>
                                    <p className="text-[11px] font-light mt-1" style={{ color: inkSecond }}>
                                        Celebrated by modern tastemakers across Paris, London, New York, and Tokyo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const About = JewelryBrand1About;
export default JewelryBrand1About;
