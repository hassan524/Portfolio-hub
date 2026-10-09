// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export function FoodBrand1Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#1e523c';
    const ink = theme?.ink || '#ffffff';

    return (
        <section
            id="hero"
            className="w-full relative min-h-screen flex flex-col justify-between overflow-hidden select-none pt-24"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Background decorative doodles / glow */}
            <div className="absolute top-28 left-8 sm:left-20 pointer-events-none opacity-80">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path
                        d="M24 4C24 4 28 16 38 18C28 20 24 32 24 32C24 32 20 20 10 18C20 16 24 4 24 4Z"
                        fill="#cbe675"
                        opacity="0.75"
                    />
                </svg>
            </div>
            <div className="absolute top-40 right-12 sm:right-28 pointer-events-none opacity-40">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" stroke="#cbe675" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
            </div>

            {/* Main Hero Container */}
            <div className="relative z-10 mx-auto max-w-7xl w-full px-6 sm:px-12 pt-8 pb-12 flex-1 flex flex-col justify-center">
                {/* Huge Title (Top / Overlapping) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center sm:text-left mb-6"
                >
                    <h1
                        className="text-5xl sm:text-7xl lg:text-8.5xl font-black tracking-tight leading-[1.02] text-white"
                        style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                        <Editable
                            value={props?.headline || 'Crafted for\nFood Lovers'}
                            onChange={v => onChange?.({ headline: v })}
                        />
                    </h1>
                </motion.div>

                {/* Grid with Left Copy + Center Model + Right Floating Dish Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-2">
                    {/* Left Copy & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-4 space-y-6 text-center sm:text-left z-20"
                    >
                        <p className="text-base sm:text-lg leading-relaxed text-white/85 max-w-md font-medium">
                            <Editable
                                value={props?.subtext || 'Taste the love and craftsmanship that goes into each dish. Made with fresh, organic ingredients for an unforgettable culinary experience.'}
                                onChange={v => onChange?.({ subtext: v })}
                            />
                        </p>
                        <div>
                            <a
                                href="#menu"
                                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-lg hover:scale-105"
                                style={{
                                    backgroundColor: '#cbe675',
                                    color: '#16432f',
                                }}
                            >
                                <Editable value={props?.ctaText || 'Explore Menu'} onChange={v => onChange?.({ ctaText: v })} />
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Center Person / Food Lover cutout photo */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        className="lg:col-span-5 flex justify-center relative z-10"
                    >
                        <div className="relative w-72 sm:w-88 lg:w-96 aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                                alt="Food lover enjoying fresh cuisine"
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Subtle vibrant warm tint overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* Right Floating Food Highlight Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-3 flex justify-center lg:justify-end z-20"
                    >
                        <div
                            className="bg-white rounded-3xl p-5 text-gray-900 shadow-2xl max-w-xs w-full border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1.5 duration-300"
                        >
                            <div className="w-32 h-32 rounded-2xl overflow-hidden mb-4 shadow-md">
                                <img
                                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
                                    alt="Organic Salad Bowl"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1e523c] mb-1">
                                Chef Special
                            </span>
                            <h3 className="text-lg font-black text-gray-900 leading-tight">
                                <Editable value={props?.dishName || 'Organic Harvest Bowl'} onChange={v => onChange?.({ dishName: v })} />
                            </h3>
                            <div className="mt-2 text-xl font-extrabold text-[#1e523c]">
                                <Editable value={props?.dishPrice || '$14.99'} onChange={v => onChange?.({ dishPrice: v })} />
                            </div>
                            <a
                                href="#menu"
                                className="mt-4 w-full py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-95"
                                style={{ backgroundColor: '#1e523c' }}
                            >
                                Order Now
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Smooth Arch Curve bottom transition into cream section */}
            <div className="w-full overflow-hidden leading-none relative z-10 -mb-[1px]">
                <svg
                    viewBox="0 0 1440 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-16 sm:h-24 md:h-28 block"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,100 C360,0 1080,0 1440,100 L1440,100 L0,100 Z"
                        fill="#fbf7ee"
                    />
                </svg>
            </div>
        </section>
    );
}

export const HeroCentered = FoodBrand1Hero;
export default FoodBrand1Hero;
