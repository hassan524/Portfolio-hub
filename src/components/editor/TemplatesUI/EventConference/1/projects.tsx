// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { ChevronDown, ChevronUp, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const scheduleData = [
    {
        id: 'session-1',
        time: '9:00 AM — 9:45 AM',
        title: 'Opening Keynote',
        type: 'Conference/Events',
        isTeal: true,
        desc: 'An inspiring and dynamic opening that not only sets the stage for Pulse but also reveals the exciting possibilities that lie ahead in the evolving landscape of events.',
        speakers: [
            {
                name: 'Liam Carter',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
            },
            {
                name: 'Sophia Turner',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
            },
            {
                name: 'Noah Mitchell',
                avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
            }
        ]
    },
    {
        id: 'session-2',
        time: '10:00 AM — 10:45 AM',
        title: 'Innovative Strategies for 2026',
        type: 'Conference/Events',
        isTeal: true,
        desc: 'Explore forward-thinking go-to-market strategies and breakthrough tech stacks powering hyper-growth enterprise organizations.',
        speakers: [
            {
                name: 'Marcus Sterling',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
            }
        ]
    },
    {
        id: 'session-3',
        time: '11:00 AM — 11:45 AM',
        title: 'Networking Break',
        type: 'Coffee Break',
        isTeal: false,
        desc: 'Enjoy artisanal coffee and curated networking lounges designed to connect founders, creators, and enterprise leaders.',
        speakers: []
    },
    {
        id: 'session-4',
        time: '12:00 PM — 1:00 PM',
        title: 'Panel Discussion: The Future of Hybrid Events',
        type: 'Conference/Events',
        isTeal: true,
        desc: 'Industry veterans discuss bridging virtual engagement with high-impact physical presence in a post-pandemic corporate ecosystem.',
        speakers: [
            {
                name: 'Ariana Blake',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
            },
            {
                name: 'Michael Torres',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            }
        ]
    },
    {
        id: 'session-5',
        time: '1:15 PM — 2:00 PM',
        title: 'Workshops: Crafting Memorable Experiences',
        type: 'Workshop',
        isTeal: true,
        desc: 'Hands-on interactive lab focused on attendee psychology, micro-moments, immersive stage design, and real-time interaction metrics.',
        speakers: [
            {
                name: 'Sophia Khan',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
            }
        ]
    },
    {
        id: 'session-6',
        time: '2:15 PM — 3:00 PM',
        title: 'Closing Remarks & Future Outlook',
        type: 'Conference/Events',
        isTeal: false,
        desc: 'Executive summary of key insights, announcement of Pulse 2027 location, and final closing celebrations.',
        speakers: [
            {
                name: 'Liam Carter',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
            }
        ]
    }
];

export function EventConference1Projects({ props = {}, theme, onChange }: any) {
    const [expandedId, setExpandedId] = useState<string>('session-1');

    const toggleSession = (id: string) => {
        setExpandedId(prev => (prev === id ? '' : id));
    };

    return (
        <section id="projects" className="py-20 md:py-28 px-6 md:px-12 bg-white text-neutral-900 font-sans border-t border-neutral-100">
            <div className="mx-auto max-w-4xl space-y-10">
                
                {/* Header (Screenshot Exact Copy) */}
                <div className="text-center space-y-3">
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-sans">
                        <Editable value={props?.scheduleTitle || 'Our Schedule'} onChange={v => onChange?.({ scheduleTitle: v })} />
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-500 max-w-2xl mx-auto font-normal font-sans">
                        <Editable
                            value={props?.scheduleDesc || 'A curated lineup of expert-led sessions, breakthrough insights, and forward-thinking discussions to shape the future of commerce.'}
                            onChange={v => onChange?.({ scheduleDesc: v })}
                        />
                    </p>

                    {/* Schedule Legend (From Screenshot) */}
                    <div className="flex items-center justify-center gap-6 pt-2 text-xs font-medium text-neutral-500">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-sky-500" />
                            Workshop
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-teal-500" />
                            Conference/Events
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-neutral-400" />
                            Coffee Break
                        </span>
                    </div>
                </div>

                {/* Schedule Accordion / Outline List */}
                <div className="space-y-3.5 pt-4">
                    {scheduleData.map((session) => {
                        const isExpanded = expandedId === session.id;

                        if (isExpanded) {
                            return (
                                <motion.div
                                    key={session.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => toggleSession(session.id)}
                                    className="cursor-pointer rounded-3xl p-6 sm:p-8 bg-[#E8FAF6] border border-[#A7F3D0] shadow-sm transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-teal-800 text-xs font-semibold shadow-xs">
                                                <Radio size={12} className="text-teal-600 animate-pulse" />
                                                {session.time}
                                            </span>
                                        </div>
                                        <ChevronUp size={18} className="text-teal-700" />
                                    </div>

                                    <h3 className="text-xl sm:text-2xl font-bold text-[#0D9488] mb-3">
                                        {session.title}
                                    </h3>

                                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 font-normal">
                                        {session.desc}
                                    </p>

                                    {session.speakers.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-teal-200/60">
                                            {session.speakers.map((spk, idx) => (
                                                <div key={idx} className="flex items-center gap-2.5">
                                                    <img
                                                        src={spk.avatar}
                                                        alt={spk.name}
                                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
                                                    />
                                                    <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                                                        {spk.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            );
                        }

                        return (
                            <motion.div
                                key={session.id}
                                layout
                                onClick={() => toggleSession(session.id)}
                                className="cursor-pointer rounded-full border border-neutral-200 bg-white px-6 sm:px-8 py-4 sm:py-4.5 flex items-center justify-between hover:border-neutral-300 hover:shadow-xs transition-all duration-200"
                            >
                                <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 shrink-0 font-mono">
                                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                        {session.time}
                                    </span>
                                    <h4 className={`text-sm sm:text-base font-semibold truncate ${
                                        session.isTeal ? 'text-[#0D9488]' : 'text-neutral-800'
                                    }`}>
                                        {session.title}
                                    </h4>
                                </div>
                                <ChevronDown size={18} className="text-neutral-400 shrink-0 ml-4" />
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export const ProjectsGrid = EventConference1Projects;
export default EventConference1Projects;
