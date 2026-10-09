// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { Star, Sparkles, Radio } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const eventStageCards = [
    {
        id: 'stg-1',
        title: 'The Architecture of Spatial Emotion',
        track: 'MAIN SOUNDSTAGE · KEYNOTE',
        speaker: 'Dr. Marcus Vance',
        role: 'Former VP of Design · Apple',
        rating: '5.0',
        badge: 'STAGE 01 · NOV 12',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'stg-2',
        title: 'Generative Shaders & Kinetic Motion',
        track: 'INTERACTIVE LAB · LIVE CODING',
        speaker: 'Maya Lin',
        role: 'Creative Director · Studio Kinetix',
        rating: '4.9',
        badge: 'LAB ARENA · NOV 13',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'stg-3',
        title: 'Nightfall Audiovisual Soundstage Gala',
        track: 'SOUNDSTAGE · CLOSING FINALE',
        speaker: 'KRONOS Collective',
        role: 'Spatial Audio & Light Engine',
        rating: '5.0',
        badge: 'SOUNDSTAGE · NOV 14',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
    }
];

export function EventConference3Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0A0A0D';
    const ink = theme?.ink || '#FFFFFF';

    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        loop: true,
        skipSnaps: false
    });

    return (
        <section
            id="top"
            className="w-full relative overflow-hidden min-h-screen lg:min-h-[105vh] flex flex-col justify-end px-6 md:px-14 pb-12 sm:pb-16 pt-32 border-none text-white select-none transition-colors"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            {/* Cinematic Stage Speaker Background with High Visibility */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=2000&q=80"
                    alt="Keynote Speaker in Spotlight"
                    className="w-full h-full object-cover object-center grayscale contrast-105 brightness-100 opacity-90"
                />

                {/* Volumetric Spotlight Fog on Right */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[130px] opacity-45"
                    style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(200, 220, 255, 0.2) 45%, transparent 70%)'
                    }}
                />

                {/* Soft Vignette Overlay ensuring text readability while keeping image crisp and visible */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 68% 35%, rgba(255,255,255,0.05) 0%, rgba(10,10,13,0.5) 55%, #0A0A0D 95%)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0D] via-[#0A0A0D]/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0D]/80 via-[#0A0A0D]/25 to-transparent" />
            </div>

            {/* Bottom-Anchored Content Grid */}
            <div className="relative z-10 mx-auto max-w-7xl w-full">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                    
                    {/* Left Column: Headline, Subtitle & Buttons */}
                    <div className="lg:col-span-7 space-y-6 max-w-2xl">
                        
                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase leading-[1.04] font-sans"
                        >
                            <span className="block text-white">
                                <Editable value={props?.headline1 || 'HATCH IDEAS THAT'} onChange={v => onChange?.({ headline1: v })} />
                            </span>
                            <span className="block text-white">
                                <Editable value={props?.headline2 || 'CHANGE THE WORLD'} onChange={v => onChange?.({ headline2: v })} />
                            </span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="text-sm sm:text-base text-white/85 max-w-xl leading-relaxed font-normal"
                        >
                            <Editable
                                value={props?.subtitle || "The most influential experiential UX & design festival in Europe. Built to learn, get inspired and connect. Tickets on sale."}
                                onChange={v => onChange?.({ subtitle: v })}
                            />
                        </motion.p>

                        {/* Two CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.25 }}
                            className="flex flex-wrap items-center gap-3 pt-2"
                        >
                            <a
                                href="#contact"
                                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-100 transition-all shadow-xl"
                            >
                                <Editable value={props?.btnPrimary || 'Apply for an Invite'} onChange={v => onChange?.({ btnPrimary: v })} />
                            </a>
                            <a
                                href="#contact"
                                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
                            >
                                <Editable value={props?.btnSecondary || 'Get Tickets'} onChange={v => onChange?.({ btnSecondary: v })} />
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Magnificent Event Stage Showcase Cards in Natural Landscape Aspect */}
                    <div className="lg:col-span-5 w-full flex justify-end items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="w-full max-w-sm sm:max-w-[370px]"
                        >
                            {/* Embla Carousel Viewport */}
                            <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing" ref={emblaRef}>
                                <div className="flex -ml-3">
                                    {eventStageCards.map((card) => (
                                        <div
                                            key={card.id}
                                            className="min-w-0 flex-[0_0_85%] pl-3"
                                        >
                                            {/* Borderless Dark Glass Event Showcase Card */}
                                            <div className="relative rounded-2xl bg-[#16161a]/80 backdrop-blur-md border-none p-3.5 sm:p-4 shadow-2xl text-white group hover:bg-[#1c1c22]/90 transition-all">
                                                
                                                {/* Cinematic Landscape Stage Photo */}
                                                <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-black mb-3.5">
                                                    <img
                                                        src={card.image}
                                                        alt={card.title}
                                                        className="w-full h-full object-cover brightness-95 group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    
                                                    {/* Live Stage Glowing Badge */}
                                                    <div className="absolute top-2.5 left-2.5">
                                                        <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-white flex items-center gap-1.5 shadow-lg">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                            {card.badge}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Stage Details */}
                                                <div className="space-y-2">
                                                    {/* 5 Emerald Stars */}
                                                    <div className="flex items-center justify-between text-xs">
                                                        <div className="flex items-center gap-1 text-emerald-400">
                                                            {[1, 2, 3, 4, 5].map(s => (
                                                                <Star key={s} size={12} fill="currentColor" />
                                                            ))}
                                                        </div>
                                                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                                                            {card.track}
                                                        </span>
                                                    </div>

                                                    {/* Session Title */}
                                                    <h4 className="text-sm font-bold uppercase tracking-tight text-white line-clamp-1">
                                                        {card.title}
                                                    </h4>

                                                    {/* Speaker & Role */}
                                                    <p className="text-xs text-white/70 font-sans font-medium line-clamp-1">
                                                        {card.speaker} · <span className="text-white/50">{card.role}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export const HeroCentered = EventConference3Hero;
export default EventConference3Hero;
