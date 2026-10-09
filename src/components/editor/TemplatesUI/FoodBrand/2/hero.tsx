// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Award } from 'lucide-react';

export function FoodBrand2Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#faf6f0';
    const ink = theme?.['ink-second'] || '#1c1917';

    return (
        <section
            id="hero"
            className="w-full relative min-h-screen flex flex-col justify-between overflow-hidden select-none pt-24"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Top decorative seal */}
            <div className="mx-auto max-w-7xl w-full px-6 sm:px-12 pt-10 pb-16 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Column: Bold Editorial Typography */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 space-y-6 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#df4d26] bg-[#df4d26]/10">
                            <Sparkles size={14} />
                            <span>Heirloom Harvest Provisions</span>
                        </div>

                        <h1
                            className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.05] text-[#1c1917]"
                            style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                        >
                            <Editable
                                value={props?.headline || 'Uncompromising Flavor,\nCrafted by Hand'}
                                onChange={v => onChange?.({ headline: v })}
                            />
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-xl leading-relaxed">
                            <Editable
                                value={props?.subtext || 'Small-batch culinary provisions made with sun-dried heirloom chilies, wild botanical herbs, and cold-pressed estate olive oil.'}
                                onChange={v => onChange?.({ subtext: v })}
                            />
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                            <a
                                href="#collection"
                                className="px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider text-white shadow-lg hover:scale-105 transition-all duration-200"
                                style={{ backgroundColor: '#df4d26' }}
                            >
                                <Editable value={props?.cta1 || 'Explore Collection'} onChange={v => onChange?.({ cta1: v })} />
                            </a>
                            <a
                                href="#story"
                                className="px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider border-2 border-[#1c1917]/20 hover:border-[#1c1917] transition-all duration-200 text-[#1c1917]"
                            >
                                Our Heritage
                            </a>
                        </div>

                        {/* Press recognition ticker */}
                        <div className="pt-8 border-t border-[#1c1917]/10 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                            <span>Featured In</span>
                            <span className="text-gray-900 font-black">The New York Times</span>
                            <span className="text-gray-900 font-black">Bon Appétit</span>
                            <span className="text-gray-900 font-black">Food & Wine</span>
                        </div>
                    </motion.div>

                    {/* Right Column: Hero Food Photography with Floating Seal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="lg:col-span-5 relative flex justify-center"
                    >
                        <div className="relative w-80 sm:w-96 aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=900&q=80"
                                alt="Artisanal food provisions and ingredients"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                                <div className="text-white text-left">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#f2a93b]">
                                        Small-Batch No. 41
                                    </span>
                                    <h3 className="text-lg font-bold">Chili Crisp & Smoked Sea Salt</h3>
                                </div>
                            </div>
                        </div>

                        {/* Floating heritage circular badge */}
                        <div
                            className="absolute -bottom-6 -left-6 sm:bottom-4 sm:-left-6 w-24 h-24 rounded-full bg-[#1c1917] text-white p-3 flex flex-col items-center justify-center text-center shadow-2xl border-2 border-white"
                        >
                            <span className="text-xs font-black text-[#f2a93b]">EST.</span>
                            <span className="text-sm font-black">2018</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Pure Craft</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Inverted curve divider */}
            <div className="w-full overflow-hidden leading-none relative z-10 -mb-[1px]">
                <svg
                    viewBox="0 0 1440 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-14 sm:h-20 block"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z"
                        fill="#1c1917"
                    />
                </svg>
            </div>
        </section>
    );
}

export const HeroCentered = FoodBrand2Hero;
export default FoodBrand2Hero;
