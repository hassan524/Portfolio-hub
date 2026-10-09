// @ts-nocheck
import { useState } from 'react';
import { ArrowRight, Sparkles, Search, ShoppingBag, User, Percent } from 'lucide-react';
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

// 4-point sparkle star SVG
function SparkleStar({ className, style, size = 20 }: any) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            style={style}
        >
            <path
                d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
                fill="currentColor"
            />
        </svg>
    );
}

export function JewelryBrand3Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0B2B20';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFFFFF' : theme?.ink || '#FFFFFF')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#0A2016' : theme?.ink || '#0A2016');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#A3C8B7' : theme?.['ink-second'] || '#A3C8B7')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#406352');

    const accent = theme?.accent || '#E0C773'; // Warm luminous gold accent
    const emeraldAccent = '#10B981';

    // Model image from high luxury editorial
    const modelImage = props?.modelImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85';
    const pendantImage = props?.pendantImage || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80';

    const thumbnails = [
        'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1611591475817-5e60d4b971c2?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=300&q=80'
    ];

    return (
        <section
            id="top"
            className="relative min-h-[92vh] overflow-hidden flex items-center"
            style={{
                backgroundColor: bg,
                color: ink,
                backgroundImage: 'radial-gradient(circle at 70% 30%, #174D3A 0%, #0B2B20 55%, #051A13 100%)'
            }}
        >
            {/* Hero Main Body with Big Model & Floating Elements */}
            <div className="relative z-10 w-full grid lg:grid-cols-12 items-center px-6 md:px-14 py-8 lg:py-0">
                
                {/* Left Side: Headline & Moving Animations */}
                <div className="lg:col-span-6 z-20 space-y-8 max-w-xl py-8">
                    {/* Animated Headline with motion */}
                    <div className="overflow-hidden">
                        <motion.h1
                            initial={{ y: 60, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-light leading-[1.05] tracking-tight"
                        >
                            <span className="block">
                                <Editable value={props?.headlineRow1 || 'Timeless'} onChange={v => onChange?.({ headlineRow1: v })} />
                            </span>
                            <span className="block italic">
                                <Editable value={props?.headlineRow2 || 'elegance for'} onChange={v => onChange?.({ headlineRow2: v })} />
                            </span>
                            <span className="block">
                                <Editable value={props?.headlineRow3 || 'your every'} onChange={v => onChange?.({ headlineRow3: v })} />
                            </span>
                            <span className="block font-serif">
                                <Editable value={props?.headlineRow4 || 'moment.'} onChange={v => onChange?.({ headlineRow4: v })} />
                            </span>
                        </motion.h1>
                    </div>

                    {/* Animated Sparkles */}
                    <div className="relative h-6">
                        <motion.div
                            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute left-8 top-0"
                            style={{ color: '#6EE7B7' }}
                        >
                            <SparkleStar size={24} />
                        </motion.div>
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                            className="absolute left-36 -top-4"
                            style={{ color: '#A7F3D0' }}
                        >
                            <SparkleStar size={16} />
                        </motion.div>
                    </div>

                    {/* Floating Product Highlight Box (Emerald clover pendant) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        whileHover={{ y: -4 }}
                        className="inline-flex items-center gap-4 p-2.5 rounded-2xl border backdrop-blur-md transition-shadow"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/30 border border-white/10 shrink-0">
                            <img
                                src={pendantImage}
                                alt="Featured Jewelry"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="pr-4">
                            <p className="text-[10px] uppercase font-mono tracking-widest text-emerald-300">
                                ICONIC PIECE
                            </p>
                            <p className="font-serif text-sm font-medium text-white">
                                <Editable value={props?.featuredName || 'Emerald Clover Choker'} onChange={v => onChange?.({ featuredName: v })} />
                            </p>
                            <p className="text-xs text-white/70 font-mono mt-0.5">
                                <Editable value={props?.featuredPrice || '18k Gold · $2,450'} onChange={v => onChange?.({ featuredPrice: v })} />
                            </p>
                        </div>
                    </motion.div>

                    {/* Description Paragraph & CTA Pill Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="space-y-6 pt-2"
                    >
                        <p className="text-xs md:text-sm font-light leading-relaxed max-w-sm" style={{ color: inkSecond }}>
                            <Editable
                                value={props?.subheadline || 'Crafting exquisite designs that celebrate your unique story with Miller Jewelry for every special moment.'}
                                onChange={v => onChange?.({ subheadline: v })}
                            />
                        </p>

                        <div>
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-xl bg-white text-emerald-950 hover:bg-emerald-50"
                            >
                                <Editable value={props?.ctaLabel || 'VIEW COLLECTION'} onChange={v => onChange?.({ ctaLabel: v })} />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Center / Right: Big Model Woman Image & Floating Right Pill Cards */}
                <div className="lg:col-span-6 relative h-[520px] sm:h-[640px] lg:h-[780px] flex items-end justify-center">
                    
                    {/* Big Model Image with subtle zoom & depth */}
                    <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
                        <motion.img
                            initial={{ scale: 1.08, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            src={modelImage}
                            alt="Luxury Jewelry Model"
                            className="h-full w-auto max-w-none object-cover object-top select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                            }}
                        />
                    </div>

                    {/* Top Right: "12% OFF" Floating Offer Callout */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="absolute top-8 right-0 sm:right-6 max-w-[200px] text-right z-30"
                    >
                        <div className="flex items-baseline justify-end gap-1.5">
                            <span className="font-serif text-3xl sm:text-4xl font-normal text-amber-200">
                                12%
                            </span>
                            <span className="font-mono text-sm uppercase tracking-wider font-bold text-white">
                                OFF
                            </span>
                        </div>
                        <p className="text-[11px] leading-tight text-white/80 font-light mt-1">
                            <Editable value={props?.offerText || 'Enjoy exclusive offers on refine jewelry, designed for lasting elegance.'} onChange={v => onChange?.({ offerText: v })} />
                        </p>
                    </motion.div>

                    {/* Right Vertical Stack: 3 Thumbnail Preview Pills (From Image 1) */}
                    <div className="absolute right-0 sm:right-6 top-36 sm:top-40 z-30 flex flex-col gap-3">
                        {thumbnails.map((src, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                                whileHover={{ scale: 1.08, x: -4 }}
                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-white/20 shadow-lg cursor-pointer bg-black/40 backdrop-blur-sm"
                            >
                                <img
                                    src={src}
                                    alt="Jewelry piece"
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Right: Value Proposition Statement (From Image 1) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="absolute bottom-6 right-0 sm:right-6 max-w-[220px] text-right z-30"
                    >
                        <p className="text-xs font-light text-white/85 leading-relaxed">
                            <Editable
                                value={props?.ethicalCopy || 'Ethically sourced gems, beautifully crafted to reflect your unique soul.'}
                                onChange={v => onChange?.({ ethicalCopy: v })}
                            />
                        </p>
                        <a
                            href="#about"
                            className="inline-block mt-2 font-mono text-[11px] uppercase tracking-wider underline text-emerald-300 hover:text-white transition-colors"
                        >
                            See More
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export const Hero = JewelryBrand3Hero;
export default JewelryBrand3Hero;
