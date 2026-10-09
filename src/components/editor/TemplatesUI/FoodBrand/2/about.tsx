// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Flame, Clock, HeartHandshake, ShieldCheck } from 'lucide-react';

const CRAFT_PILLARS = [
    {
        num: '01',
        icon: Flame,
        title: 'Single-Origin Crops',
        desc: 'We partner directly with 4 independent family farms in California and New Mexico to source heirloom peppers picked at peak ripeness.',
    },
    {
        num: '02',
        icon: Clock,
        title: 'Slow Copper Simmer',
        desc: 'No flash heating. Our oils and crisp bases are infused over open fire in hammered copper kettles for 14 hours to extract maximum depth.',
    },
    {
        num: '03',
        icon: HeartHandshake,
        title: 'Live Fermentation',
        desc: 'Deep umami without chemical additives. We rely on time, natural sea salts, and ambient wild yeasts to develop complex savory notes.',
    },
    {
        num: '04',
        icon: ShieldCheck,
        title: 'Zero Preservatives',
        desc: 'Just real vegetables, cold-pressed olive oils, garlic, and sea salt. Ingredients you can pronounce and verify on every jar.',
    },
];

export function FoodBrand2About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#1c1917';
    const ink = theme?.ink || '#ffffff';

    return (
        <section
            id="craft"
            className="w-full relative px-6 sm:px-12 py-24 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl w-full relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 max-w-2xl mx-auto"
                >
                    <span className="text-xs font-black uppercase tracking-widest text-[#df4d26] mb-3 block">
                        Our Process
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white mb-4"
                        style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                        <Editable
                            value={props?.craftTitle || 'The Philosophy of\nReal, Honest Food'}
                            onChange={v => onChange?.({ craftTitle: v })}
                        />
                    </h2>
                    <p className="text-white/70 text-base font-medium">
                        We started in 2018 with a simple conviction: pantry food should taste like it came from a dedicated chef’s kitchen, not an industrial factory.
                    </p>
                </motion.div>

                {/* 4 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {CRAFT_PILLARS.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={pillar.num}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-300"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-[#df4d26]/20 text-[#df4d26] flex items-center justify-center">
                                            <Icon size={24} />
                                        </div>
                                        <span className="text-xs font-mono font-bold text-white/30">
                                            {pillar.num}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-white mb-3">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-sm text-white/60 leading-relaxed">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Founder statement box */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-16 bg-[#faf6f0] text-[#1c1917] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl"
                >
                    <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border-4 border-white shadow-md">
                        <img
                            src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=300&q=80"
                            alt="Chef Founder"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-lg sm:text-xl font-bold leading-relaxed italic text-gray-800">
                            “When you taste food made with patient hands and uncompromised ingredients, your body immediately recognizes the difference. That is what we put in every jar.”
                        </p>
                        <div className="mt-3 text-xs font-black uppercase tracking-widest text-[#df4d26]">
                            Julian & Maya Sterling — Co-Founders & Culinary Directors
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export const AboutSimple = FoodBrand2About;
export default FoodBrand2About;
