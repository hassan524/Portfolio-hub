// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

function Star({ size = 18, style = {}, delay = 0, className = '' }: any) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`absolute pointer-events-none text-neutral-400 ${className}`}
            style={style}
            animate={{ opacity: [0.3, 0.85, 0.3], rotate: [0, 25, 0], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 3.4, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
            <path d="M12 0 C12.8 7.2 16.8 11.2 24 12 C16.8 12.8 12.8 16.8 12 24 C11.2 16.8 7.2 12.8 0 12 C7.2 11.2 11.2 7.2 12 0 Z" fill="currentColor" />
        </motion.svg>
    );
}

const STARS = [
    { top: '9%', left: '5%', size: 22, delay: 0 },
    { top: '30%', left: '9%', size: 16, delay: 0.7 },
    { top: '62%', left: '4%', size: 28, delay: 1.2 },
    { top: '82%', left: '14%', size: 18, delay: 0.3 },
    { top: '12%', left: '90%', size: 26, delay: 0.9 },
    { top: '38%', left: '94%', size: 14, delay: 1.6 },
    { top: '66%', left: '88%', size: 24, delay: 0.5 },
    { top: '84%', left: '78%', size: 16, delay: 1.9 },
    { top: '18%', left: '30%', size: 12, delay: 2.2 },
    { top: '24%', left: '68%', size: 14, delay: 1.1 },
];

function Photo({ src, alt }: any) {
    const [failed, setFailed] = useState(false);
    if (failed) return <div className="w-full h-full bg-gradient-to-b from-[#f1d8c6] to-[#d9a487]" />;
    return (
        <img
            src={src}
            alt={alt}
            draggable={false}
            onError={() => setFailed(true)}
            className="w-full h-full object-cover object-center brightness-105 contrast-95"
        />
    );
}

export function SkincareBrand1About({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#fbf4ec';
    const ink = theme?.['ink-second'] || '#1a1a1a';

    return (
        <section
            id="mission"
            className="w-full relative min-h-screen flex flex-col justify-between px-6 sm:px-14 py-20 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Soft paper grain so it matches the collage page */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.35]"
                style={{
                    backgroundImage: 'radial-gradient(rgba(120,70,40,0.12) 1px, transparent 1px)',
                    backgroundSize: '14px 14px',
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(200,150,110,0.18) 100%)' }}
            />

            {/* Twinkling stars */}
            {STARS.map((s, i) => (
                <Star key={i} size={s.size} delay={s.delay} style={{ top: s.top, left: s.left }} />
            ))}

            {/* Top bar */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mx-auto max-w-7xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-widest uppercase text-neutral-500 z-10"
            >
                <div className="flex items-center gap-2">
                    <span className="text-neutral-400">┌</span>
                    <span>find the best for your skin</span>
                </div>

                <div className="text-center max-w-lg space-y-1">
                    <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs">
                        <span>◇</span><span>◇</span><span>◇</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] tracking-wider text-neutral-600 uppercase font-sans font-normal leading-relaxed">
                        WE HAVE BEEN FIGHTING AGAINST ANIMAL TESTING SINCE BEFORE WE OPENED OUR FIRST SHOP, AND{' '}
                        <span className="italic font-serif font-semibold">THE FIGHT CONTINUES TODAY.</span>
                    </p>
                </div>

                <div className="text-neutral-400"># first from the latest</div>
            </motion.div>

            {/* Arch window */}
            <div className="my-auto py-8 relative flex items-center justify-center z-10">
                <div className="absolute left-4 sm:left-16 lg:left-28 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <span>01</span>
                    <span className="w-6 h-px bg-neutral-300" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.15, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-64 h-72 sm:w-80 sm:h-96 md:w-96 md:h-[430px] overflow-hidden shadow-2xl rounded-t-full rounded-b-xl border-4 border-white/80"
                >
                    <Photo
                        src="https://images.unsplash.com/photo-1512290900672-1f02e71dfb3f?auto=format&fit=crop&w=1000&q=80"
                        alt="Calming water skincare immersion"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fbf4ec]/35 via-transparent to-transparent pointer-events-none" />
                </motion.div>

                {/* Rotating badge on the arch */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="absolute right-6 sm:right-[22%] bottom-4 z-20 pointer-events-none"
                >
                    <div className="w-24 h-24 animate-[spin_14s_linear_infinite]">
                        <svg className="w-full h-full text-neutral-700" viewBox="0 0 100 100">
                            <path id="aboutCircle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                            <text className="text-[8.5px] font-mono uppercase tracking-[0.25em] fill-current">
                                <textPath href="#aboutCircle">100% NATURAL · CRUELTY FREE ·</textPath>
                            </text>
                        </svg>
                    </div>
                </motion.div>

                <div className="absolute right-4 sm:right-16 lg:right-28 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
                    <span className="w-6 h-px bg-neutral-300" />
                    <span>01</span>
                </div>
            </div>

            {/* Statement */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="mx-auto max-w-4xl text-center space-y-6 z-10"
            >
                <div className="space-y-3">
                    <span className="text-2xl text-neutral-400 inline-block mb-1">✳</span>

                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-neutral-900 tracking-tight leading-[1.25]">
                        All of our products are made by{' '}
                        <span className="relative inline-block px-3 py-1 text-neutral-900 font-normal">
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                                style={{ originX: 0 }}
                                className="absolute inset-0 bg-[#e3ab92]/55 -rotate-1 rounded-sm -z-10"
                            />
                            fresh nature
                        </span>{' '}
                        and{' '}
                        <span className="relative inline-block px-3 py-1 italic font-serif text-neutral-900">
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 1.1, ease: 'easeOut' }}
                                style={{ originX: 0 }}
                                className="absolute inset-0 bg-[#e3ab92]/55 rotate-1 rounded-sm -z-10"
                            />
                            vegetarian
                        </span>{' '}
                        components ⚬
                    </h2>
                </div>

                <div className="pt-2">
                    <a
                        href="#vision"
                        className="inline-block px-8 py-3.5 bg-neutral-900 text-white hover:bg-neutral-800 hover:-translate-y-0.5 text-xs font-sans font-medium uppercase tracking-widest rounded-none shadow-xl transition-all"
                    >
                        <Editable value={props?.btnMission || 'Our Mission'} onChange={v => onChange?.({ btnMission: v })} />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}

export const AboutSimple = SkincareBrand1About;
export default SkincareBrand1About;