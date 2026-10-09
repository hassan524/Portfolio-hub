// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const ingredients = [
    {
        num: '01',
        name: 'Wild Blueberry Extract',
        benefit: 'Rich in anthocyanins and antioxidants to protect skin elasticity and brighten tone.',
        origin: 'Nordic Organic Wild Harvest',
        tilt: -2.5,
    },
    {
        num: '02',
        name: 'Cold-Pressed Camellia Oil',
        benefit: 'Mimics natural sebum lipids to deliver weightless deep hydration without clogging pores.',
        origin: 'Jeju Island Ethical Groves',
        tilt: 1.5,
    },
    {
        num: '03',
        name: 'Fermented Rice Filtrate',
        benefit: 'Naturally balances the skin biome, refining micro-texture and soothing irritation.',
        origin: 'Artisanal Botanical Fermentation',
        tilt: -1.5,
    },
];

const STARS = [
    { top: '8%', left: '6%', size: 24, delay: 0 },
    { top: '20%', left: '92%', size: 28, delay: 0.8 },
    { top: '48%', left: '3%', size: 14, delay: 1.4 },
    { top: '58%', left: '95%', size: 18, delay: 0.4 },
    { top: '78%', left: '10%', size: 20, delay: 1.1 },
    { top: '86%', left: '86%', size: 14, delay: 1.8 },
    { top: '12%', left: '48%', size: 12, delay: 2.1 },
];

function Star({ size = 18, style = {}, delay = 0, className = '' }: any) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            className={`absolute pointer-events-none text-[#d8a287] ${className}`}
            style={style}
            animate={{ opacity: [0.3, 0.95, 0.3], rotate: [0, 25, 0], scale: [0.85, 1.15, 0.85] }}
            transition={{ duration: 3.4, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
            <path d="M12 0 C12.8 7.2 16.8 11.2 24 12 C16.8 12.8 12.8 16.8 12 24 C11.2 16.8 7.2 12.8 0 12 C7.2 11.2 11.2 7.2 12 0 Z" fill="currentColor" />
        </motion.svg>
    );
}

const MARQUEE = ['CRUELTY FREE', 'PARABEN FREE', '100% VEGAN', 'SMALL BATCH', 'DERMATOLOGIST TESTED'];

export function SkincareBrand1Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#fbf4ec';
    const ink = theme?.['ink-second'] || '#1a1a1a';

    return (
        <section
            id="ingredients"
            className="w-full relative min-h-screen flex flex-col justify-between px-6 sm:px-14 pt-20 pb-0 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Paper grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.35]"
                style={{
                    backgroundImage: 'radial-gradient(rgba(120,70,40,0.12) 1px, transparent 1px)',
                    backgroundSize: '14px 14px',
                }}
            />

            {STARS.map((s, i) => (
                <Star key={i} size={s.size} delay={s.delay} style={{ top: s.top, left: s.left }} />
            ))}

            <div className="mx-auto max-w-7xl w-full my-auto space-y-16 relative z-10 pb-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-2xl mx-auto space-y-4"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-400 block">
                        ✦ ETHICAL BOTANICAL FORMULATION ✦
                    </span>
                    <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light uppercase tracking-tight text-neutral-900">
                        <Editable value={props?.title || 'Pure Ingredients, Honest Efficacy'} onChange={v => onChange?.({ title: v })} />
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans font-light">
                        Every formula is created in small artisanal batches to preserve active nutrient potency.
                    </p>
                </motion.div>

                {/* Taped paper cards */}
                <div className="grid md:grid-cols-3 gap-10">
                    {ingredients.map((item, idx) => (
                        <motion.div
                            key={item.num}
                            initial={{ opacity: 0, y: 40, rotate: 0 }}
                            whileInView={{ opacity: 1, y: 0, rotate: item.tilt }}
                            whileHover={{ rotate: 0, y: -8, scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="relative bg-white/90 border border-neutral-200/80 p-8 sm:p-10 shadow-xl hover:shadow-2xl flex flex-col justify-between space-y-6"
                        >
                            {/* Tape */}
                            <div
                                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 shadow-md"
                                style={{
                                    background: 'rgba(216,162,135,0.75)',
                                    transform: `translateX(-50%) rotate(${idx % 2 === 0 ? -4 : 5}deg)`,
                                }}
                            />

                            <div className="space-y-4">
                                <span className="font-serif italic text-5xl text-[#d8a287]/80 block leading-none">
                                    {item.num}
                                </span>
                                <h4 className="text-xl sm:text-2xl font-serif font-normal text-neutral-900">
                                    {item.name}
                                </h4>
                                <p className="text-xs text-neutral-600 leading-relaxed font-light font-sans">
                                    {item.benefit}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between gap-3 text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                                <span>{item.origin}</span>
                                <Star size={14} className="!relative" style={{ position: 'relative' }} delay={idx * 0.5} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Scrolling badge strip */}
            <div className="relative z-10 -mx-6 sm:-mx-14 bg-neutral-900 text-white py-3 overflow-hidden">
                <motion.div
                    className="flex gap-10 whitespace-nowrap w-max"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                >
                    {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (
                        <span key={i} className="text-[10px] font-mono uppercase tracking-[0.3em] flex items-center gap-10">
                            {t} <span className="text-[#d8a287]">✦</span>
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export const TestimonialsDefault = SkincareBrand1Testimonials;
export default SkincareBrand1Testimonials;