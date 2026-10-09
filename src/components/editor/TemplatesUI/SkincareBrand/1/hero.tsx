// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import 'animate.css';

/* 4-point sparkle star */
function Star({ size = 20, className = '', delay = 0, style = {} }: any) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`absolute pointer-events-none text-white ${className}`}
            style={style}
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: [0.25, 0.9, 0.25], scale: [0.8, 1.15, 0.8], rotate: [0, 20, 0] }}
            transition={{ duration: 3.2, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
            <path
                d="M12 0 C12.8 7.2 16.8 11.2 24 12 C16.8 12.8 12.8 16.8 12 24 C11.2 16.8 7.2 12.8 0 12 C7.2 11.2 11.2 7.2 12 0 Z"
                fill="currentColor"
            />
        </motion.svg>
    );
}

const STARS = [
    { top: '9%', left: '6%', size: 34, delay: 0 },
    { top: '14%', left: '34%', size: 18, delay: 0.6 },
    { top: '8%', left: '58%', size: 24, delay: 1.1 },
    { top: '20%', left: '82%', size: 30, delay: 0.3 },
    { top: '36%', left: '3%', size: 16, delay: 1.5 },
    { top: '44%', left: '47%', size: 14, delay: 0.9 },
    { top: '52%', left: '92%', size: 20, delay: 1.8 },
    { top: '66%', left: '12%', size: 26, delay: 0.4 },
    { top: '74%', left: '60%', size: 16, delay: 1.3 },
    { top: '82%', left: '38%', size: 22, delay: 2.0 },
    { top: '88%', left: '84%', size: 28, delay: 0.7 },
    { top: '28%', left: '70%', size: 12, delay: 2.3 },
];

export function SkincareBrand1Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#5c778e';
    const ink = theme?.ink || '#FFFFFF';

    return (
        <section
            id="hero"
            className="w-full relative min-h-screen flex flex-col justify-between px-6 sm:px-14 pt-28 pb-10 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Ambient stars */}
            {STARS.map((s, i) => (
                <Star key={i} size={s.size} delay={s.delay} style={{ top: s.top, left: s.left }} />
            ))}

            <div className="mx-auto max-w-7xl w-full my-auto grid lg:grid-cols-12 gap-6 lg:gap-0 items-center relative z-10">
                {/* LEFT: headline sits ON TOP of the image */}
                <div className="lg:col-span-7 space-y-8 relative z-30 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.4, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-2 lg:w-[150%] origin-left"
                    >
                        <h1
                            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-serif font-normal uppercase tracking-tight text-white leading-[0.98]"
                            style={{ textShadow: '0 6px 40px rgba(0,0,0,0.25)' }}
                        >
                            <span className="block italic font-light">
                                <Editable value={props?.title1 || 'SELECT THE BEST'} onChange={v => onChange?.({ title1: v })} />
                            </span>
                            <span className="block font-serif text-white lg:pl-24">
                                <Editable value={props?.title2 || 'FOR YOUR SKIN'} onChange={v => onChange?.({ title2: v })} />
                            </span>
                        </h1>

                        <div className="pt-2 lg:pl-40">
                            <span className="font-serif italic text-3xl sm:text-4xl text-white/95 font-light tracking-wide block -rotate-3">
                                100% Natural
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="space-y-4 max-w-sm pt-4"
                    >
                        <a
                            href="#vision"
                            className="inline-flex items-center gap-3 text-xs font-serif uppercase tracking-widest text-white hover:text-white/80 transition-colors group"
                        >
                            <span>VIEW ALL</span>
                            <span className="w-12 h-px bg-white/70 group-hover:w-16 transition-all" />
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </a>

                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans font-light">
                            <Editable
                                value={props?.desc || "Nature is our muse and our mission. We're cruelty-free, paraben-free & 100% vegan."}
                                onChange={v => onChange?.({ desc: v })}
                            />
                        </p>
                    </motion.div>
                </div>

                {/* RIGHT: oval image, grows from a tiny dot to full size */}
                <div className="lg:col-span-5 relative flex justify-center items-center lg:-ml-40 z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-[320px] h-[380px] sm:w-[460px] sm:h-[540px] overflow-hidden shadow-2xl"
                        style={{ borderRadius: '46% 54% 68% 32% / 44% 56% 44% 56%' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80"
                            alt="Woman applying luxury skincare"
                            className="w-full h-full object-cover object-center contrast-105"
                        />
                    </motion.div>

                    {/* Lotion tube */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotate: -8, scale: 0.4 }}
                        animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-[-20px] sm:bottom-[-30px] right-6 sm:right-16 z-30 w-32 sm:w-44 drop-shadow-[0_25px_35px_rgba(0,0,0,0.45)]"
                    >
                        <div className="relative rounded-2xl bg-gradient-to-b from-white via-neutral-100 to-neutral-200 border border-black/10 p-3 sm:p-4 text-center shadow-2xl">
                            <div className="w-4 h-6 mx-auto bg-neutral-900 rounded-t-sm mb-2" />
                            <div className="py-6 sm:py-8 space-y-1">
                                <span className="text-[9px] font-mono tracking-widest text-neutral-400 block uppercase">
                                    BERRIES FOR BLUEBERRIES
                                </span>
                                <h4 className="text-xs sm:text-sm font-serif italic text-neutral-800 font-semibold">
                                    Natural Perfect
                                </h4>
                                <p className="text-[10px] font-sans font-light tracking-wider text-neutral-900 pt-3">
                                    naat '99
                                </p>
                            </div>
                            <div className="w-full h-3 bg-neutral-900 rounded-b-md" />
                        </div>
                    </motion.div>

                    {/* Rotating badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="absolute bottom-2 right-0 sm:right-2 z-40 pointer-events-none"
                    >
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center animate-[spin_12s_linear_infinite]">
                            <svg className="w-full h-full text-white/80" viewBox="0 0 100 100">
                                <path id="textCircle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                                <text className="text-[8.5px] font-mono uppercase tracking-[0.25em] fill-current">
                                    <textPath href="#textCircle">BLUEBERRY FLAVOUR · NAAT '99 ·</textPath>
                                </text>
                            </svg>
                        </div>
                        <Star size={16} className="!relative !inset-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ position: 'absolute', top: '42%', left: '42%' }} />
                    </motion.div>
                </div>
            </div>

            <div className="mx-auto text-center pt-6 pb-2">
                <a
                    href="#vision"
                    className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors animate-bounce inline-block"
                >
                    SCROLL
                </a>
            </div>
        </section>
    );
}

export const HeroCentered = SkincareBrand1Hero;
export default SkincareBrand1Hero;