// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

const DISPATCHES = [
    {
        user: 'Dr. Alexis Vance, Ph.D.',
        role: 'Neuro-Biology Researcher',
        text: 'The bioavailability of the Lion’s Mane and L-Theanine in Nebula Blue is legitimately measurable. It produces clean cognitive endurance without cortisol spikes.',
        time: '14 MINS AGO',
        color: '#00d4ff',
    },
    {
        user: 'Marcus Thorne',
        role: 'Ultra-Endurance Athlete',
        text: 'I drank Solar Flare during mile 35 of the Western States training block. Zero gastric distress, instant cellular hydration, and clean kinetic energy for hours.',
        time: '42 MINS AGO',
        color: '#ff9900',
    },
    {
        user: 'Elena Rostova',
        role: 'Clinical Dietitian',
        text: 'Finally a functional food brand that does not hide behind "proprietary blends". Every milligram of organic botanical extract is third-party lab verified.',
        time: '1 HOUR AGO',
        color: '#00ff9f',
    },
    {
        user: 'Julian Chen',
        role: 'Creative Director',
        text: 'Replaced my afternoon double espresso with Dark Matter. The mental calm paired with razor-sharp creative flow is unlike anything else on the market.',
        time: '3 HOURS AGO',
        color: '#7b2fff',
    },
];

export function FoodBrand4Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#010611';
    const ink = theme?.['ink-second'] || '#e8f4ff';

    return (
        <section
            id="reviews"
            className="w-full relative px-6 sm:px-12 py-28 select-none overflow-hidden border-t border-[#00d4ff]/15"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl relative z-10 space-y-16">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-2 text-[#00d4ff] text-[10px] font-mono tracking-widest uppercase mb-2">
                            <Radio size={14} className="animate-pulse" />
                            <span>Live Community Dispatches</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
                            <Editable
                                value={props?.dispatchHeading || 'The Human Data Feed'}
                                onChange={v => onChange?.({ dispatchHeading: v })}
                            />
                        </h2>
                    </div>
                    <div className="text-right font-mono text-xs text-[#00d4ff]">
                        ALL VERIFIED CONSUMERS
                    </div>
                </div>

                {/* Staggered Dual Column Live Feed */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {DISPATCHES.map((d, i) => (
                        <motion.div
                            key={d.user}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="p-8 rounded-3xl border bg-[#020b1a]/90 backdrop-blur-xl space-y-4 hover:border-white/40 transition-colors"
                            style={{ borderColor: `${d.color}33` }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-base font-black text-white">{d.user}</h4>
                                    <span className="text-xs text-white/50">{d.role}</span>
                                </div>
                                <span
                                    className="text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-full border"
                                    style={{ borderColor: `${d.color}44`, color: d.color }}
                                >
                                    {d.time}
                                </span>
                            </div>
                            <p className="text-sm text-white/80 leading-relaxed font-mono">
                                “{d.text}”
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const TestimonialsDefault = FoodBrand4Testimonials;
export default FoodBrand4Testimonials;
