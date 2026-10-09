// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

const speakers = [
    {
        id: 'spk-1',
        num: '01',
        name: 'Dr. Marcus Vance',
        role: 'Former VP of Design',
        company: 'Apple / Spatial Lab',
        track: 'Spatial & 3D',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        floatDuration: 4.2
    },
    {
        id: 'spk-2',
        num: '02',
        name: 'Maya Lin',
        role: 'Chief Creative Officer',
        company: 'Studio Kinetix London',
        track: 'Creative Code',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        floatDuration: 3.6
    },
    {
        id: 'spk-3',
        num: '03',
        name: 'Elena Rostova',
        role: 'Head of Brand Architecture',
        company: 'Figma Europe',
        track: 'Leadership',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        floatDuration: 4.8
    },
    {
        id: 'spk-4',
        num: '04',
        name: 'KRONOS Collective',
        role: 'Spatial Audio Director',
        company: 'Tokyo Soundworks',
        track: 'Sound & Light',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        floatDuration: 3.9
    }
];

export function EventConference3Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#121218';
    const ink = theme?.ink || '#FFFFFF';

    return (
        <section
            id="projects"
            className="w-full py-28 sm:py-40 px-6 md:px-14 text-white select-none transition-colors border-t border-white/10 overflow-hidden"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-7xl space-y-16">
                
                {/* Clean Header (No Filters) */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto space-y-4"
                >
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/50 block">
                        KEYNOTE FACULTY
                    </span>
                    <h3 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight font-sans">
                        <Editable value={props?.speakersTitle || 'World-Class Leaders'} onChange={v => onChange?.({ speakersTitle: v })} />
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed font-normal">
                        Visionary directors, spatial architects, and creative founders headlining HATCH 2026.
                    </p>
                </motion.div>

                {/* Horizontal Animated Floating Balloon Circles with Name Inside */}
                <div className="flex flex-wrap lg:flex-nowrap items-center justify-center gap-6 sm:gap-8 lg:gap-10 py-8">
                    {speakers.map((spk, idx) => (
                        <motion.div
                            key={spk.id}
                            initial={{ opacity: 0, scale: 0.5, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{
                                type: 'spring',
                                damping: 14,
                                stiffness: 90,
                                delay: idx * 0.12
                            }}
                            className="flex-shrink-0"
                        >
                            {/* Floating Balloon Animation Container */}
                            <motion.div
                                animate={{
                                    y: [0, -14, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: spk.floatDuration,
                                    ease: 'easeInOut'
                                }}
                                whileHover={{ scale: 1.08, y: -20 }}
                                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden cursor-pointer border-2 border-white/20 hover:border-white shadow-2xl group transition-all duration-300"
                            >
                                {/* Background Portrait Image inside the Circle */}
                                <img
                                    src={spk.image}
                                    alt={spk.name}
                                    className="w-full h-full object-cover grayscale contrast-115 brightness-90 group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-100 transition-all duration-700"
                                />

                                {/* Dark Gradient Overlay so text inside is crisp */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent group-hover:from-black/85 group-hover:via-black/30 transition-colors duration-300" />

                                {/* Content Inside the Circle */}
                                <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-4 sm:p-6 pb-6 sm:pb-8">
                                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block mb-1">
                                        {spk.track}
                                    </span>

                                    {/* Speaker Name Inside Circle */}
                                    <h4 className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-tight text-white leading-tight">
                                        {spk.name}
                                    </h4>

                                    {/* Role & Company */}
                                    <p className="text-[11px] sm:text-xs text-white/70 font-sans font-medium mt-1 leading-snug">
                                        {spk.role}
                                    </p>
                                    <p className="text-[10px] text-white/50 font-mono">
                                        {spk.company}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export const ProjectsGrid = EventConference3Projects;
export default EventConference3Projects;
