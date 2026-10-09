// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const pillars = [
    {
        num: '01',
        title: 'Masterclasses with Global Design VPs',
        desc: 'Unfiltered, behind-the-scenes teardowns of the creative frameworks powering the worlds most iconic consumer products and spatial experiences.'
    },
    {
        num: '02',
        title: 'Hands-on Spatial & Generative Labs',
        desc: 'Intimate technical workshops where you prototype spatial interfaces, custom shaders, and next-generation design systems in real time.'
    },
    {
        num: '03',
        title: 'Private Executive Leadership Retreat',
        desc: 'Curated roundtables for founders, creative directors, and VP-level leaders discussing team scale, vision craft, and creative longevity.'
    },
    {
        num: '04',
        title: 'Night Visionary Gala & Soundstage',
        desc: 'An evening of audiovisual installations, live experimental music, and relaxed conversations with keynote speakers under the stars.'
    }
];

export function EventConference3About({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#121218';
    const ink = theme?.ink || '#FFFFFF';

    return (
        <section
            id="about"
            className="w-full py-24 sm:py-36 px-6 md:px-14 text-white select-none transition-colors border-t border-white/10"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-7xl space-y-20">
                
                {/* Main Headline with Framer Motion scroll reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl space-y-6"
                >
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 block">
                        THE HATCH EXPERIENCE · EUROPE 2026
                    </span>
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[1.05] font-sans">
                        <Editable
                            value={props?.headline || 'DAYS TO UP LEVEL & FALL BACK IN LOVE WITH DESIGN'}
                            onChange={v => onChange?.({ headline: v })}
                        />
                    </h2>
                    <p className="text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed font-normal">
                        <Editable
                            value={props?.desc || 'A rare gathering where creative excellence, visionary technology, and genuine human connection converge.'}
                            onChange={v => onChange?.({ desc: v })}
                        />
                    </p>
                </motion.div>

                {/* 4 Pillars Grid with Staggered Framer Motion Reveal */}
                <div className="grid md:grid-cols-2 gap-8">
                    {pillars.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: idx * 0.12 }}
                            className="rounded-3xl p-8 sm:p-10 bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between group shadow-xl"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-sm text-white/40 group-hover:text-white transition-colors">
                                        {item.num}
                                    </span>
                                    <ArrowUpRight size={18} className="text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-white/60 leading-relaxed font-normal">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export const AboutSimple = EventConference3About;
export default EventConference3About;
