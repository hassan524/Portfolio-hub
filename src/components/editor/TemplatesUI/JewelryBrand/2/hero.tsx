// @ts-nocheck
import { useMemo } from 'react';
import { ArrowDown } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

// Butterfly SVG path helper
function ButterflyWing({ flip = false, accent, delay = 0 }: any) {
    const scaleX = flip ? -1 : 1;
    return (
        <motion.g
            style={{ scaleX, transformOrigin: '50% 50%' }}
            animate={{ scaleX: [scaleX, scaleX * 0.2, scaleX] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay }}
        >
            <path
                d="M50,50 C30,10 -10,30 10,60 C20,80 40,75 50,50 Z"
                fill={accent}
                opacity="0.85"
            />
            <path
                d="M50,50 C30,30 5,50 15,70 C25,88 45,80 50,50 Z"
                fill={accent}
                opacity="0.5"
            />
            {/* Wing detail lines */}
            <path d="M50,50 C40,30 20,35 15,55" stroke="white" strokeWidth="0.8" fill="none" opacity="0.5" />
            <path d="M50,50 C35,55 20,65 25,75" stroke="white" strokeWidth="0.6" fill="none" opacity="0.4" />
        </motion.g>
    );
}

function Butterfly({ x, y, scale = 1, accent, delay = 0, floatX = 0, floatY = 0, bodyColor = '#3D1A2E' }: any) {
    return (
        <motion.div
            className="pointer-events-none absolute"
            style={{ left: x, top: y, width: 80 * scale, height: 60 * scale }}
            animate={{
                x: [0, floatX, 0],
                y: [0, floatY, 0],
                rotate: [-5, 5, -5],
            }}
            transition={{
                duration: 5 + delay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            }}
        >
            <svg viewBox="0 0 100 80" width="100%" height="100%">
                <g transform="translate(50, 40)">
                    <ButterflyWing accent={accent} delay={0} />
                    <ButterflyWing flip accent={accent} delay={0.05} />
                    {/* Body */}
                    <ellipse cx="0" cy="0" rx="2.5" ry="14" fill={bodyColor} opacity="0.8" />
                    {/* Antennae */}
                    <line x1="0" y1="-13" x2="-8" y2="-22" stroke={bodyColor} strokeWidth="1" opacity="0.7" />
                    <line x1="0" y1="-13" x2="8" y2="-22" stroke={bodyColor} strokeWidth="1" opacity="0.7" />
                    <circle cx="-9" cy="-22" r="1.5" fill={accent} opacity="0.8" />
                    <circle cx="9" cy="-22" r="1.5" fill={accent} opacity="0.8" />
                </g>
            </svg>
        </motion.div>
    );
}

const butterflies = [
    { x: '8%', y: '15%', scale: 0.9, delay: 0, floatX: 30, floatY: -20 },
    { x: '75%', y: '8%', scale: 1.2, delay: 1.2, floatX: -25, floatY: 30 },
    { x: '85%', y: '55%', scale: 0.7, delay: 0.5, floatX: -20, floatY: -25 },
    { x: '5%', y: '65%', scale: 1.0, delay: 1.8, floatX: 20, floatY: -15 },
    { x: '55%', y: '5%', scale: 0.6, delay: 0.8, floatX: 15, floatY: 20 },
    { x: '40%', y: '78%', scale: 0.8, delay: 2.2, floatX: -30, floatY: -10 },
    { x: '20%', y: '35%', scale: 0.5, delay: 1.5, floatX: 25, floatY: 20 },
    { x: '65%', y: '72%', scale: 1.1, delay: 0.3, floatX: -15, floatY: -30 },
];

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

export function JewelryBrand2Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF0F5';
    const isDark = isDarkColor(bg);

    // Safeguard contrast so black text NEVER disappears on dark backgrounds
    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFF0F5' : theme?.ink || '#FFF0F5')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#3D1A2E' : theme?.ink || '#3D1A2E');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#F5B8D8' : theme?.['ink-second'] || '#F5B8D8')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#9B4F7C');

    const accent = theme?.accent || '#E8317A';
    const butterflyBodyColor = isDark ? '#F5B8D8' : '#3D1A2E';

    return (
        <section
            id="top"
            className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Radial gradient backdrop */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${accent}18 0%, ${accent}08 40%, transparent 70%)`
                }}
            />

            {/* Petal scatter */}
            {[...Array(12)].map((_, i) => {
                const seed = i * 1234;
                const left = (seed * 7 % 100);
                const top = (seed * 13 % 100);
                const size = 6 + (seed % 12);
                const delay = (seed % 40) / 10;
                return (
                    <motion.div
                        key={i}
                        aria-hidden="true"
                        className="pointer-events-none absolute rounded-full opacity-30"
                        style={{
                            left: `${left}%`,
                            top: `${top}%`,
                            width: size,
                            height: size,
                            backgroundColor: accent,
                        }}
                        animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3], scale: [1, 1.4, 1] }}
                        transition={{ duration: 4 + (seed % 30) / 10, delay, repeat: Infinity, ease: 'easeInOut' }}
                    />
                );
            })}

            {/* Flying butterflies */}
            {butterflies.map((b, i) => (
                <Butterfly key={i} {...b} accent={accent} bodyColor={butterflyBodyColor} />
            ))}

            {/* Content */}
            <div className="relative z-10 flex max-w-3xl flex-col items-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease }}
                    className="mb-6 text-xs tracking-[0.35em] uppercase"
                    style={{ color: accent }}
                >
                    <Editable value={props?.eyebrow || 'Personal Fine Jewellery Brand'} onChange={v => onChange?.({ eyebrow: v })} />
                </motion.p>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: '120%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 1, delay: 0.5, ease }}
                        className="font-serif text-6xl font-light leading-[1.05] tracking-[-0.02em] md:text-8xl lg:text-9xl"
                        style={{ color: ink }}
                    >
                        <Editable value={props?.headline || 'Wear Your Story'} onChange={v => onChange?.({ headline: v })} />
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1, ease }}
                    className="mt-8 max-w-md text-base leading-8 font-light"
                    style={{ color: inkSecond }}
                >
                    <Editable value={props?.subheadline || 'I design jewels that whisper your most intimate chapters — pieces as unique as the woman who wears them.'} onChange={v => onChange?.({ subheadline: v })} />
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.5, ease }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-full px-8 py-3.5 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl"
                        style={{ backgroundColor: accent }}
                    >
                        Explore Pieces
                    </motion.a>
                    <motion.a
                        href="#about"
                        whileHover={{ scale: 1.03 }}
                        className="rounded-full border px-8 py-3.5 text-sm font-medium transition-colors"
                        style={{ borderColor: accent, color: accent }}
                    >
                        My Story
                    </motion.a>
                </motion.div>

                {/* Signature line */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 1, delay: 2, ease }}
                    className="mt-16 flex items-center gap-4"
                >
                    <div className="h-px w-12" style={{ backgroundColor: `${accent}50` }} />
                    <span className="font-serif text-sm italic" style={{ color: inkSecond }}>
                        <Editable value={props?.signature || 'Handcrafted in Paris & London'} onChange={v => onChange?.({ signature: v })} />
                    </span>
                    <div className="h-px w-12" style={{ backgroundColor: `${accent}50` }} />
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.a
                href="#about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3 }}
                className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
                style={{ color: inkSecond }}
            >
                <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowDown size={16} style={{ color: accent }} />
                </motion.span>
            </motion.a>
        </section>
    );
}

export const Hero = JewelryBrand2Hero;
export default JewelryBrand2Hero;
