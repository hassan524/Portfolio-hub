// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Pizza, Heart, Award, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function FoodBrand1About({ props = {}, theme, onChange }: any) {
    const [activeDot, setActiveDot] = useState(0);
    const bg = theme?.['bg-second'] || '#fbf7ee';
    const ink = theme?.['ink-second'] || '#1e523c';

    return (
        <div id="story" className="w-full select-none">
            {/* Story & Trust Section */}
            <section
                className="w-full relative px-6 sm:px-12 pt-16 pb-20 text-center"
                style={{ backgroundColor: bg, color: ink }}
            >
                <div className="mx-auto max-w-7xl">
                    {/* Section Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12 max-w-3xl mx-auto"
                    >
                        <h2
                            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4"
                            style={{ color: '#1e523c', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                        >
                            <Editable
                                value={props?.storyTitle || 'Build trust and\ntell brand story'}
                                onChange={v => onChange?.({ storyTitle: v })}
                            />
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 font-medium">
                            <Editable
                                value={props?.storySubtitle || 'Rooted in heritage, cooked with honest ingredients, and shared with genuine warmth.'}
                                onChange={v => onChange?.({ storySubtitle: v })}
                            />
                        </p>
                    </motion.div>

                    {/* 3-Card Food & Chef Photo Layout */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center max-w-5xl mx-auto"
                    >
                        {/* Left Card: Golden Handcut Fries */}
                        <div className="md:col-span-3 order-2 md:order-1">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white transition-transform hover:scale-105 duration-300">
                                <img
                                    src="https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80"
                                    alt="Crispy Golden Hand-Cut Fries"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#1e523c]">
                                Crispy Golden Fries
                            </p>
                        </div>

                        {/* Center Card: The Passionate Chef in the Kitchen */}
                        <div className="md:col-span-6 order-1 md:order-2">
                            <div className="aspect-3/4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group transition-transform hover:scale-102 duration-300">
                                <img
                                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80"
                                    alt="Master Chef creating fresh artisan food"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                                    <div className="text-left text-white">
                                        <div className="text-[11px] font-bold uppercase tracking-widest text-[#cbe675]">
                                            Head Chef & Founder
                                        </div>
                                        <div className="text-xl font-extrabold">Marco Vance</div>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#1e523c]">
                                Fresh Bread & Artisan Dough Daily
                            </p>
                        </div>

                        {/* Right Card: Crispy Fried Chicken / Wings */}
                        <div className="md:col-span-3 order-3">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white transition-transform hover:scale-105 duration-300">
                                <img
                                    src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
                                    alt="Crispy Herb Fried Chicken"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#1e523c]">
                                Herb-Crusted Fried Chicken
                            </p>
                        </div>
                    </motion.div>

                    {/* Carousel Dots */}
                    <div className="flex justify-center items-center gap-2.5 mt-8">
                        {[0, 1, 2].map(idx => (
                            <button
                                key={idx}
                                onClick={() => setActiveDot(idx)}
                                className={`transition-all duration-300 rounded-full ${
                                    activeDot === idx ? 'w-6 h-2.5 bg-[#1e523c]' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                                }`}
                                aria-label={`Slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Vibrant Orange Banner ("Crafted with Passion, Served with Love") */}
            <div
                id="craft"
                className="w-full px-6 sm:px-12 py-12 select-none relative overflow-hidden"
                style={{ backgroundColor: '#e35833', color: '#ffffff' }}
            >
                <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                            <Pizza size={26} className="text-white" />
                        </div>
                        <div>
                            <h3
                                className="text-2xl sm:text-4xl font-black tracking-tight"
                                style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                            >
                                <Editable
                                    value={props?.bannerTitle || 'Crafted with Passion, Served with Love'}
                                    onChange={v => onChange?.({ bannerTitle: v })}
                                />
                            </h3>
                            <p className="text-white/80 text-sm mt-1">
                                <Editable
                                    value={props?.bannerSub || 'From local soil straight to your table, prepared fresh every morning.'}
                                    onChange={v => onChange?.({ bannerSub: v })}
                                />
                            </p>
                        </div>
                    </div>

                    <a
                        href="#menu"
                        className="px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider bg-white text-[#e35833] shadow-lg hover:scale-105 transition-all duration-200 shrink-0"
                    >
                        Explore Today's Menu
                    </a>
                </div>
            </div>
        </div>
    );
}

export const AboutSimple = FoodBrand1About;
export default FoodBrand1About;
