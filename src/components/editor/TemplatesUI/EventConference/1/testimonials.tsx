// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion, AnimatePresence } from 'framer-motion';

const initialSpeakers = [
    {
        id: 'spk-1',
        num: '[01]',
        tag: '[Special Guest]',
        name: 'Ariana Blake',
        role: 'Founder & CEO, EventWave Solutions',
        bio: "Ariana is a visionary leader known for transforming ordinary events into extraordinary experiences. With over a decade of experience in event strategy and creative design, she's passionate about building moments that connect, inspire, and leave a lasting impact. Ariana's work has set new benchmarks in the event industry, and she's here to share the secrets behind her success.",
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'spk-2',
        num: '[02]',
        tag: '[Keynote Speaker]',
        name: 'Michael Torres',
        role: 'Global Brand Strategist, Elevate Agency',
        bio: 'Michael has architected global launch campaigns for iconic consumer brands across 30 countries. He specializes in behavioral brand loyalty, spatial narrative design, and high-conversion experiential marketing.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'spk-3',
        num: '[03]',
        tag: '[Creative Director]',
        name: 'Sophia Khan',
        role: 'Creative Director, Pulse Media Group',
        bio: 'Leading a multidisciplinary studio of 60 motion designers and creative technologists, Sophia crafts the audiovisual identity and live broadcast experiences for high-profile global summits.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80'
    }
];

export function EventConference1Testimonials({ props = {}, theme, onChange }: any) {
    const [speakers, setSpeakers] = useState(initialSpeakers);
    const [activeIndex, setActiveIndex] = useState(0);

    const activeSpeaker = speakers[activeIndex];
    const prevSpeaker = speakers[(activeIndex - 1 + speakers.length) % speakers.length];
    const nextSpeaker = speakers[(activeIndex + 1) % speakers.length];

    return (
        <section
            id="testimonials"
            className="py-20 md:py-28 px-6 md:px-12 font-sans transition-colors"
            style={{
                backgroundColor: '#16A085' // Rich Solid Teal Container from Screenshot
            }}
        >
            <div className="mx-auto max-w-6xl space-y-10">
                
                {/* Header (Exact Screenshot) */}
                <div className="space-y-1">
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
                        <Editable value={props?.speakersTitle || 'Meet Our Speakers'} onChange={v => onChange?.({ speakersTitle: v })} />
                    </h2>
                    <p className="text-xs sm:text-sm text-teal-100 font-medium tracking-wide">
                        <Editable value={props?.speakersSubtitle || 'Inspiring Voices, Expert Insight'} onChange={v => onChange?.({ speakersSubtitle: v })} />
                    </p>
                </div>

                {/* 3 Speaker Cards Container (Exact Screenshot Layout) */}
                <div className="flex flex-col lg:flex-row items-stretch gap-6 pt-2">
                    
                    {/* Left Card: Small Preview */}
                    <div
                        onClick={() => setActiveIndex((activeIndex - 1 + speakers.length) % speakers.length)}
                        className="cursor-pointer bg-white rounded-3xl p-6 shadow-md lg:w-56 shrink-0 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200"
                    >
                        <div>
                            <img
                                src={prevSpeaker.image}
                                alt={prevSpeaker.name}
                                className="w-14 h-14 rounded-2xl object-cover shadow-sm mb-4"
                            />
                            <h4 className="font-bold text-neutral-900 text-base leading-tight">
                                {prevSpeaker.name}
                            </h4>
                            <p className="text-xs text-neutral-500 mt-1 leading-snug">
                                {prevSpeaker.role}
                            </p>
                        </div>
                        <span className="text-[11px] font-semibold text-teal-700 mt-6 block">
                            Click to view →
                        </span>
                    </div>

                    {/* Center Card: Expanded Featured Card with Photo & Full Bio (Ariana Blake) */}
                    <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-xl flex-1 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                        <img
                            src={activeSpeaker.image}
                            alt={activeSpeaker.name}
                            className="w-44 h-56 sm:w-52 sm:h-64 rounded-2xl object-cover shrink-0 shadow-md"
                        />
                        <div className="flex flex-col justify-between h-full space-y-4">
                            <div>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                                    {activeSpeaker.name}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold text-[#0D9488] mt-1 mb-3">
                                    {activeSpeaker.role}
                                </p>
                                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                                    {activeSpeaker.bio}
                                </p>
                            </div>

                            {/* Card Footer: [Special Guest] and [01] */}
                            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono font-medium text-neutral-400">
                                <span>{activeSpeaker.tag}</span>
                                <span>{activeSpeaker.num}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Card: Small Preview */}
                    <div
                        onClick={() => setActiveIndex((activeIndex + 1) % speakers.length)}
                        className="cursor-pointer bg-white rounded-3xl p-6 shadow-md lg:w-56 shrink-0 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200"
                    >
                        <div>
                            <img
                                src={nextSpeaker.image}
                                alt={nextSpeaker.name}
                                className="w-14 h-14 rounded-2xl object-cover shadow-sm mb-4"
                            />
                            <h4 className="font-bold text-neutral-900 text-base leading-tight">
                                {nextSpeaker.name}
                            </h4>
                            <p className="text-xs text-neutral-500 mt-1 leading-snug">
                                {nextSpeaker.role}
                            </p>
                        </div>

                        {/* Slider indicator matching screenshot */}
                        <div className="mt-6 pt-4 border-t border-neutral-100">
                            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
                                <span>{nextSpeaker.num}</span>
                                <span className="text-teal-700 font-semibold">Next →</span>
                            </div>
                            <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                                <div
                                    className="bg-teal-600 h-full transition-all duration-300"
                                    style={{ width: `${((activeIndex + 1) / speakers.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export const TestimonialsDefault = EventConference1Testimonials;
export default EventConference1Testimonials;
