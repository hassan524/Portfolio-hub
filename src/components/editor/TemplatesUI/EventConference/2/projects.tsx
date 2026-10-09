// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { ArrowUpRight, Radio } from 'lucide-react';

const stages = [
    {
        number: 'STAGE 01',
        name: 'The Main Arena',
        capacity: '12,000 Attendees',
        vibe: 'Keynotes & Visual Headliners',
        accentColor: '#EF3829',
        sessions: [
            { time: '10:00 AM', title: 'Opening Spectacle: The Next 25 Years of Spatial Sound', speaker: 'DJ KRONOS & Orchestral Swarm' },
            { time: '01:30 PM', title: 'Generative Worlds & Hyper-Realistic Production', speaker: 'Maya Lin (Creative Director)' },
            { time: '07:00 PM', title: 'Nightfall Audio-Visual Live Experience', speaker: 'Pixel Collective' }
        ]
    },
    {
        number: 'STAGE 02',
        name: 'The Pixel Studio',
        capacity: '5,000 Attendees',
        vibe: 'Interactive Design & Live Code',
        accentColor: '#38BDF8',
        sessions: [
            { time: '11:15 AM', title: 'Live Creative Coding & Shader Manipulation', speaker: 'Elena Vance' },
            { time: '03:00 PM', title: 'Building Multi-Screen Stage Hardware', speaker: 'Toronto Media Lab' },
            { time: '05:45 PM', title: 'Real-Time Motion Graphics Masterclass', speaker: 'Studio Hyper' }
        ]
    },
    {
        number: 'STAGE 03',
        name: 'The Sonic Swarm',
        capacity: '3,000 Attendees',
        vibe: 'Experimental Audio & Lighting',
        accentColor: '#FFD600',
        sessions: [
            { time: '12:00 PM', title: 'Modular Synthesis & Analog Visualizers', speaker: 'Synth Lab Collective' },
            { time: '04:15 PM', title: 'Immersion Through Sub-Bass Frequency Design', speaker: 'Dr. Aaron Cole' },
            { time: '08:30 PM', title: 'Midnight Interactive Jam Session', speaker: 'Open Stage Swarm' }
        ]
    }
];

export function EventConference2Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#000000';
    const ink = theme?.ink || '#FFFFFF';
    const accent = theme?.accent || '#FFD600';

    return (
        <section
            id="projects"
            className="w-full py-20 sm:py-28 px-4 sm:px-8 border-t border-neutral-900 select-none transition-colors"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-7xl space-y-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
                    <div className="space-y-2">
                        <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: accent }}>
                            3 STAGES · 24 HOURS NON-STOP
                        </p>
                        <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
                            <Editable value={props?.stagesTitle || 'Explore The 3 Stages'} onChange={v => onChange?.({ stagesTitle: v })} />
                        </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-mono">
                        Experience world-class keynotes, interactive audiovisual installations, and late-night performances under one roof.
                    </p>
                </div>

                {/* 3 Stage Columns */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {stages.map((stage, idx) => (
                        <div
                            key={idx}
                            className="rounded-3xl border-2 bg-neutral-950 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
                            style={{ borderColor: stage.accentColor }}
                        >
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono font-black uppercase px-3 py-1 rounded-full bg-white/10 text-white">
                                        {stage.number}
                                    </span>
                                    <span className="text-xs font-mono text-neutral-400">
                                        {stage.capacity}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-yellow-400 transition-colors">
                                        {stage.name}
                                    </h4>
                                    <p className="text-xs text-neutral-400 font-mono mt-1">
                                        {stage.vibe}
                                    </p>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-neutral-800">
                                    {stage.sessions.map((sess, sIdx) => (
                                        <div key={sIdx} className="p-3.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-1">
                                            <div className="flex items-center justify-between text-[11px] font-mono" style={{ color: accent }}>
                                                <span>{sess.time}</span>
                                                <Radio size={10} className="text-emerald-400 animate-pulse" />
                                            </div>
                                            <p className="text-xs font-bold text-white leading-snug">
                                                {sess.title}
                                            </p>
                                            <p className="text-[11px] text-neutral-400">
                                                {sess.speaker}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                                <span>Free Access with RSVP</span>
                                <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" style={{ color: accent }} />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export const ProjectsGrid = EventConference2Projects;
export default EventConference2Projects;
