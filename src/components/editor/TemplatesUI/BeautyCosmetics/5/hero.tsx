// @ts-nocheck
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiDroplet, FiFeather, FiShield, FiPlay } from 'react-icons/fi';
import { Editable } from '@/components/editor/ui/Editable';

// Four-point sparkle as inline SVG (no icon package needed)
function Sparkle({ size = 24, fill = 'currentColor', style = {} }: any) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" style={style} aria-hidden="true">
            <path d="M12 0C12.9 7 17 11.1 24 12C17 12.9 12.9 17 12 24C11.1 17 7 12.9 0 12C7 11.1 11.1 7 12 0Z" fill={fill} />
        </svg>
    );
}

// Shared light palette (same in every section). Edit here to retune.
const C = {
    frame: '#E8ECE3',
    card: '#F7F8F3',
    white: '#FFFFFF',
    ink: '#16261B',
    inkSecond: '#5F7265',
    sage: '#5C7B5D',
    sageDark: '#4B684C',
    mint: '#CFE5CF',
    tint: '#E3EADF'
};

export function Hero({ props = {}, onChange }: any) {
    const chips = [FiDroplet, FiFeather, FiShield];
    const sideCards = [
        { label: props?.card1 || 'New Mac Foundation', bg: C.sage },
        { label: props?.card2 || 'New Mac Foundation', bg: C.sageDark }
    ];

    return (
        <section
            id="top"
            className="relative w-full px-4 pb-8 pt-2 sm:px-6"
            style={{ backgroundColor: C.frame, color: C.ink, fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
            <div
                className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 pt-10 sm:px-10"
                style={{ backgroundColor: C.card }}
            >
                {/* Decorative sparkles (behind everything, never over the text) */}
                {[
                    { cls: 'left-[58%] top-[9%]', size: 46, d: 0 },
                    { cls: 'left-[70%] top-[30%]', size: 18, d: 0.8 },
                    { cls: 'left-[3%] top-[46%]', size: 20, d: 1.4 }
                ].map((s, i) => (
                    <motion.div
                        key={i}
                        className={`pointer-events-none absolute z-0 hidden lg:block ${s.cls}`}
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 18, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
                    >
                        <Sparkle size={s.size} fill={C.ink} />
                    </motion.div>
                ))}

                <div className="relative z-10 grid items-stretch gap-8 lg:min-h-[640px] lg:grid-cols-[1.1fr_0.9fr_auto]">
                    {/* 1. Text column */}
                    <div className="flex flex-col justify-center pb-4 lg:pb-12">
                        <h1 className="font-medium leading-[1.04] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]" style={{ color: C.ink }}>
                            <Editable
                                as="span"
                                value={props?.headline || 'Get Your Natural'}
                                onChange={(v) => onChange?.({ headline: v })}
                                className="block max-w-[5.6em]"
                                style={{ color: C.ink }}
                            />
                            <span className="mt-1 flex items-center gap-4">
                                <Editable
                                    as="span"
                                    value={props?.headlineEnd || 'Skin'}
                                    onChange={(v) => onChange?.({ headlineEnd: v })}
                                    style={{ color: C.ink }}
                                />
                                <span className="inline-flex items-center gap-2 rounded-full p-1.5 pr-2" style={{ backgroundColor: C.tint }}>
                                    <span
                                        className="h-8 w-14 rounded-full sm:h-9 sm:w-16"
                                        style={{ background: `linear-gradient(120deg, ${C.mint}, ${C.sage})` }}
                                    />
                                    <span className="grid h-8 w-8 place-items-center rounded-full sm:h-9 sm:w-9" style={{ backgroundColor: C.ink }}>
                                        <FiPlay size={12} color={C.white} />
                                    </span>
                                </span>
                            </span>
                        </h1>

                        <Editable
                            as="p"
                            value={props?.subheadline || "The natural color of the skin is your identity and originality. Don't change it, we will help you in the best way to protect it."}
                            onChange={(v) => onChange?.({ subheadline: v })}
                            className="mt-7 max-w-sm text-sm leading-relaxed"
                            style={{ color: C.inkSecond }}
                        />

                        <div className="mt-6 flex flex-wrap items-center gap-2">
                            <span className="rounded-full px-3 py-1.5 text-[11px] font-bold" style={{ backgroundColor: C.sage, color: C.white }}>
                                <Editable value="A/16" style={{ color: 'inherit' }} />
                            </span>
                            <span className="rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ backgroundColor: C.ink, color: C.white }}>
                                <Editable value="Aloe Mac Foundation" style={{ color: 'inherit' }} />
                            </span>
                            {chips.map((Icon, i) => (
                                <span key={i} className="grid h-8 w-8 place-items-center rounded-full" style={{ backgroundColor: C.tint }}>
                                    <Icon size={14} style={{ color: C.sage }} />
                                </span>
                            ))}
                        </div>

                        <div className="mt-8">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition hover:scale-105"
                                style={{ backgroundColor: C.ink, color: C.white }}
                            >
                                <Editable value="Shop now" style={{ color: 'inherit' }} />
                                <FiArrowUpRight size={16} />
                            </a>
                        </div>
                    </div>

                    {/* 2. Portrait column (its own grid cell, so text can never sit on it) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex items-end justify-center"
                    >
                        <div
                            className="h-[420px] w-full max-w-sm overflow-hidden rounded-t-[3rem] sm:h-[520px] lg:h-[88%] lg:max-w-none"
                            style={{ backgroundColor: C.tint }}
                        >
                            <img
                                src={props?.heroImage || 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=85'}
                                alt="Natural skin care"
                                className="h-full w-full object-cover object-top"
                                style={{
                                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, #000 14%)',
                                    maskImage: 'linear-gradient(to top, transparent 0%, #000 14%)'
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* 3. Two vertical cards (different shades of green) */}
                    <div className="hidden gap-4 pb-10 lg:flex">
                        {sideCards.map((card, i) => (
                            <motion.a
                                key={i}
                                href="#projects"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.15 }}
                                className="flex w-[5.25rem] flex-col items-center justify-between rounded-[2.5rem] py-4 transition hover:-translate-y-1"
                                style={{ backgroundColor: card.bg, color: C.white }}
                            >
                                <span className="grid h-10 w-10 place-items-center rounded-full" style={{ backgroundColor: C.white, color: C.ink }}>
                                    <FiArrowUpRight size={18} />
                                </span>
                                <Editable
                                    as="span"
                                    value={card.label}
                                    className="text-[11px] font-semibold uppercase tracking-[0.25em]"
                                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', color: C.white }}
                                />
                                <span className="grid h-9 w-9 place-items-center rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.6)' }}>
                                    <Sparkle size={12} fill={C.white} />
                                </span>
                            </motion.a>
                        ))}
                    </div>

                    {/* Same cards as a compact row on tablet / mobile */}
                    <div className="flex flex-wrap gap-3 pb-8 lg:hidden">
                        {sideCards.map((card, i) => (
                            <a
                                key={i}
                                href="#projects"
                                className="flex items-center gap-3 rounded-full py-2 pl-2 pr-5 text-[11px] font-semibold uppercase tracking-widest"
                                style={{ backgroundColor: card.bg, color: C.white }}
                            >
                                <span className="grid h-8 w-8 place-items-center rounded-full" style={{ backgroundColor: C.white, color: C.ink }}>
                                    <FiArrowUpRight size={14} />
                                </span>
                                {card.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}