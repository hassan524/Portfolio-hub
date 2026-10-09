// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { Clock, MapPin, Sparkles, ArrowRight, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const scheduleDays = [
    {
        day: 'DAY 01',
        theme: 'Craft & Philosophy',
        date: 'Thursday, Nov 12',
        sessions: [
            {
                time: '09:00 AM — 10:15 AM',
                stage: 'MAIN ARENA',
                type: 'OPENING KEYNOTE',
                title: 'The Architecture of Spatial Emotion',
                speaker: 'Dr. Marcus Vance (Former VP of Design · Apple)',
                desc: 'Tactile physics, spatial depth, and micro-timings that evoke subconscious emotional resonance in hardware.'
            },
            {
                time: '11:00 AM — 12:30 PM',
                stage: 'LAB STAGE',
                type: 'INTERACTIVE DEMO',
                title: 'Live Creative Coding with Custom Shaders',
                speaker: 'Maya Lin (Studio Kinetix London)',
                desc: 'Real-time GPU mathematical geometry and dynamic visual engines for high-performance web experiences.'
            },
            {
                time: '03:00 PM — 04:30 PM',
                stage: 'FOUNDER SUITE',
                type: 'EXECUTIVE ROUNDTABLE',
                title: 'Preserving Radical Craft at 100M+ Scale',
                speaker: 'Elena Rostova & Guest VPs',
                desc: 'An off-the-record leadership debate on maintaining aesthetic standards during hyper-growth.'
            },
            {
                time: '07:30 PM — LATE',
                stage: 'SOUNDSTAGE',
                type: 'OPENING GALA',
                title: 'Nightfall Audiovisual Performance',
                speaker: 'KRONOS Collective & Orchestral Swarm',
                desc: 'Multi-channel spatial audio synthesis and projection mapping accompanied by drinks and curated dinner.'
            }
        ]
    },
    {
        day: 'DAY 02',
        theme: 'Spatial & Systems',
        date: 'Friday, Nov 13',
        sessions: [
            {
                time: '09:30 AM — 11:00 AM',
                stage: 'MAIN ARENA',
                type: 'KEYNOTE',
                title: 'Next-Generation Design Systems in 3D Space',
                speaker: 'Henrik Lindqvist (Nordic Sound Lab)',
                desc: 'Tokens, spatial hierarchy, and unified interaction grammars across visionOS, web, and physical interfaces.'
            },
            {
                time: '01:30 PM — 03:00 PM',
                stage: 'LAB STAGE',
                type: 'HANDS-ON LAB',
                title: 'Prototyping Real-Time Generative Motion',
                speaker: 'Elena Vance (Creative Director)',
                desc: 'Hands-on laptop session building tactile interactive prototypes with Framer and WebGL.'
            },
            {
                time: '04:00 PM — 05:30 PM',
                stage: 'MAIN ARENA',
                type: 'FIRESIDE DEBATE',
                title: 'The Human Edge in an Automated World',
                speaker: 'Global Design Leaders Panel',
                desc: 'Why taste, intuition, and idiosyncratic artistic vision matter more than ever.'
            }
        ]
    },
    {
        day: 'DAY 03',
        theme: 'Future & Leadership',
        date: 'Saturday, Nov 14',
        sessions: [
            {
                time: '10:00 AM — 11:30 AM',
                stage: 'MAIN ARENA',
                type: 'KEYNOTE',
                title: 'Designing for the Next Decade of Human Experience',
                speaker: 'Keynote Faculty All-Stars',
                desc: 'Synthesizing the core breakthroughs of HATCH 2026 into actionable creative strategies.'
            },
            {
                time: '01:00 PM — 03:30 PM',
                stage: 'TERRACE',
                type: 'NETWORKING',
                title: 'Executive Syndicate & Portfolio Salons',
                speaker: 'Design Directors & Founders',
                desc: 'Direct 1-on-1 conversations, investment reviews, and studio talent matchmaking.'
            },
            {
                time: '06:00 PM — 11:00 PM',
                stage: 'SOUNDSTAGE',
                type: 'CLOSING GALA',
                title: 'Grand Finale & HATCH 2027 Unveil',
                speaker: 'Closing Celebration Party',
                desc: 'Final celebratory toast, live DJ sets, and announcements for the next European host city.'
            }
        ]
    }
];

export function EventConference3Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.surface || '#181822';
    const ink = theme?.ink || '#FFFFFF';
    const [activeDayIdx, setActiveDayIdx] = useState(0);

    const activeDay = scheduleDays[activeDayIdx];

    return (
        <section
            id="testimonials"
            className="w-full py-24 sm:py-36 px-6 md:px-14 text-white select-none transition-colors border-t border-white/10"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-7xl space-y-16">
                
                {/* Header & Multi-Day Switcher with Framer Motion */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-10"
                >
                    <div className="space-y-3">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/50">
                            FULL 3-DAY PROGRAM
                        </span>
                        <h3 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight font-sans">
                            <Editable value={props?.scheduleTitle || 'The Summit Agenda'} onChange={v => onChange?.({ scheduleTitle: v })} />
                        </h3>
                    </div>

                    {/* Day Tabs */}
                    <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10">
                        {scheduleDays.map((d, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setActiveDayIdx(idx)}
                                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                                    activeDayIdx === idx
                                        ? 'bg-white text-black shadow-md'
                                        : 'text-white/60 hover:text-white'
                                }`}
                            >
                                <span>{d.day}</span>
                                <span className="hidden sm:inline-block ml-1.5 opacity-60">· {d.theme}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Day Header Info */}
                <div className="flex items-center justify-between text-xs font-mono text-white/60">
                    <span>{activeDay.date} · {activeDay.theme}</span>
                    <span>ALL SESSIONS INCLUDED IN DELEGATE PASS</span>
                </div>

                {/* Timeline Session Cards Animated with AnimatePresence */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDayIdx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                    >
                        {activeDay.sessions.map((sess, sIdx) => (
                            <motion.div
                                key={sIdx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: sIdx * 0.08 }}
                                className="rounded-3xl p-7 sm:p-9 bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group shadow-lg"
                            >
                                <div className="space-y-2 max-w-2xl">
                                    <div className="flex items-center gap-3 text-xs font-mono text-white/50">
                                        <span className="text-white font-bold">{sess.time}</span>
                                        <span>·</span>
                                        <span className="text-white/80">{sess.stage}</span>
                                        <span>·</span>
                                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/90">
                                            {sess.type}
                                        </span>
                                    </div>
                                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                        {sess.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
                                        {sess.desc}
                                    </p>
                                </div>

                                <div className="md:text-right shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                                    <p className="text-xs sm:text-sm font-semibold text-white/90">{sess.speaker}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    );
}

export const TestimonialsDefault = EventConference3Testimonials;
export default EventConference3Testimonials;
