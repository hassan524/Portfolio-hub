// @ts-nocheck
import { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
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

export function JewelryBrand1Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FBF8F5';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFFFFF' : theme?.ink || '#FFFFFF')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#1C1917' : theme?.ink || '#1C1917');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#D6D3D1' : theme?.['ink-second'] || '#D6D3D1')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#78716C');

    const accent = theme?.accent || '#B48C56';
    const surface = isDark ? 'rgba(255, 255, 255, 0.06)' : (theme?.surface || '#EFE6DB');

    // Sculptural hand jewelry center image
    const sculptureImage = props?.sculptureImage || 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80';
    const insetModel = props?.insetModel || 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=400&q=80';

    return (
        <section
            id="top"
            className="relative overflow-hidden pt-8 pb-16 px-6 md:px-14 border-b"
            style={{
                backgroundColor: bg,
                color: ink,
                backgroundImage: isDark
                    ? 'radial-gradient(ellipse at 50% 20%, rgba(180,140,86,0.12) 0%, transparent 70%)'
                    : 'linear-gradient(180deg, #FBF8F5 0%, #F5ECE1 100%)',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
            }}
        >
            <div className="mx-auto max-w-7xl">
                {/* Hero Top Grid */}
                <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[580px] py-8">
                    
                    {/* Left Column: Headlines & Story */}
                    <div className="lg:col-span-5 space-y-8 z-10">
                        <div className="space-y-4">
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="font-mono text-xs uppercase tracking-[0.25em]"
                                style={{ color: accent }}
                            >
                                <Editable value={props?.eyebrow || 'FINE JEWELRY COLLECTION · 2026'} onChange={v => onChange?.({ eyebrow: v })} />
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="font-serif text-4xl sm:text-6xl font-light tracking-tight leading-[1.08]"
                            >
                                <span className="block uppercase tracking-wide text-3xl sm:text-5xl font-normal">
                                    <Editable value={props?.headlinePrimary || 'Crafted For'} onChange={v => onChange?.({ headlinePrimary: v })} />
                                </span>
                                <span className="block font-serif italic font-light">
                                    <Editable value={props?.headlineSecondary || 'Your Every'} onChange={v => onChange?.({ headlineSecondary: v })} />
                                </span>
                                <span className="block font-serif uppercase tracking-wide text-3xl sm:text-5xl font-normal">
                                    <Editable value={props?.headlineTertiary || 'Moment'} onChange={v => onChange?.({ headlineTertiary: v })} />
                                </span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="text-sm md:text-base font-light leading-relaxed max-w-md"
                            style={{ color: inkSecond }}
                        >
                            <Editable
                                value={props?.subheadline || 'At ADORNIX we blend timeless elegance with modern sculptural design to craft jewelry that tells your unique story. Each creation is an ode to understated beauty.'}
                                onChange={v => onChange?.({ subheadline: v })}
                            />
                        </motion.p>

                        {/* CTA and Model Preview pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="flex flex-wrap items-center gap-6 pt-2"
                        >
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-white shadow-lg transition-transform"
                                style={{ backgroundColor: '#1C1917' }}
                            >
                                <Editable value={props?.ctaLabel || 'EXPLORE COLLECTION'} onChange={v => onChange?.({ ctaLabel: v })} />
                            </motion.a>

                            {/* Inset Model circular preview */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 shadow-md shrink-0" style={{ borderColor: accent }}>
                                    <img src={insetModel} alt="Model wearing jewelry" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-xs">
                                    <p className="font-serif font-medium leading-none">Spring Lookbook</p>
                                    <p className="font-mono text-[10px] mt-1" style={{ color: inkSecond }}>Handcrafted in Paris</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Sculptural Display with Floating Badges & Pills */}
                    <div className="lg:col-span-7 relative flex items-center justify-center">
                        
                        {/* Top Right: Customer Rating badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="absolute top-0 right-4 sm:right-12 z-20 flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md shadow-md"
                            style={{
                                backgroundColor: isDark ? 'rgba(28,25,23,0.85)' : 'rgba(255,255,255,0.9)',
                                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
                            }}
                        >
                            <div className="flex -space-x-2">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" className="w-6 h-6 rounded-full border border-white object-cover" />
                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" className="w-6 h-6 rounded-full border border-white object-cover" />
                                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80" className="w-6 h-6 rounded-full border border-white object-cover" />
                            </div>
                            <div className="text-[11px] font-sans font-medium">
                                <span className="font-bold">125k+</span> Happy Clients
                            </div>
                        </motion.div>

                        {/* Sculptural Center Hand Image */}
                        <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
                            <motion.img
                                initial={{ scale: 1.05 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.2 }}
                                src={sculptureImage}
                                alt="Sculptural jewelry hand"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        {/* Floating Category Pills (Right side) */}
                        <div className="absolute -bottom-6 right-2 sm:right-6 z-20 space-y-2.5">
                            {[
                                { name: 'RINGS & BANDS', count: '48 items' },
                                { name: 'CLASSIC NECKLACES', count: '32 items' },
                                { name: 'BOLD BRACELETS', count: '24 items' }
                            ].map((pill, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 + idx * 0.15 }}
                                    whileHover={{ scale: 1.05, x: -6 }}
                                    className="px-5 py-2.5 rounded-2xl border backdrop-blur-md shadow-lg flex items-center justify-between gap-4 cursor-pointer"
                                    style={{
                                        backgroundColor: isDark ? 'rgba(28,25,23,0.92)' : 'rgba(255,255,255,0.95)',
                                        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
                                    }}
                                >
                                    <span className="font-sans text-xs font-semibold tracking-wider">{pill.name}</span>
                                    <span className="font-mono text-[10px]" style={{ color: accent }}>{pill.count}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom 3-Pillar Feature Bar (From Image 2) */}
                <div
                    className="mt-16 pt-8 border-t grid md:grid-cols-3 gap-8"
                    style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}
                >
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border" style={{ borderColor: accent, color: accent }}>
                            <ShieldCheck size={18} />
                        </div>
                        <div>
                            <p className="font-sans text-xs uppercase tracking-widest font-semibold">
                                <Editable value={props?.feature1Title || 'QUALITY ASSURED'} onChange={v => onChange?.({ feature1Title: v })} />
                            </p>
                            <p className="text-xs font-light mt-1" style={{ color: inkSecond }}>
                                <Editable value={props?.feature1Desc || 'Crafted with 18k solid gold & hand-selected conflict-free gemstones.'} onChange={v => onChange?.({ feature1Desc: v })} />
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border" style={{ borderColor: accent, color: accent }}>
                            <Truck size={18} />
                        </div>
                        <div>
                            <p className="font-sans text-xs uppercase tracking-widest font-semibold">
                                <Editable value={props?.feature2Title || 'FREE WORLDWIDE SHIPPING'} onChange={v => onChange?.({ feature2Title: v })} />
                            </p>
                            <p className="text-xs font-light mt-1" style={{ color: inkSecond }}>
                                <Editable value={props?.feature2Desc || 'Complimentary express delivery with full insurance protection on all orders.'} onChange={v => onChange?.({ feature2Desc: v })} />
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border" style={{ borderColor: accent, color: accent }}>
                            <RotateCcw size={18} />
                        </div>
                        <div>
                            <p className="font-sans text-xs uppercase tracking-widest font-semibold">
                                <Editable value={props?.feature3Title || '30-DAY EASY RETURNS'} onChange={v => onChange?.({ feature3Title: v })} />
                            </p>
                            <p className="text-xs font-light mt-1" style={{ color: inkSecond }}>
                                <Editable value={props?.feature3Desc || 'Try our pieces at home with 30 days of seamless exchange or full return.'} onChange={v => onChange?.({ feature3Desc: v })} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const Hero = JewelryBrand1Hero;
export default JewelryBrand1Hero;
