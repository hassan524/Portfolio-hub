// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { Quote, Sparkles } from 'lucide-react';

const testimonials = [
    {
        quote: "The most electrifying intersection of live audio-visual art, spatial stagecraft, and creative technology anywhere in the world.",
        author: "Sasha Grey",
        role: "Creative Technologist",
        location: "London",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        gradient: "from-rose-50 via-pink-50 to-orange-50",
        accent: "#EF3829"
    },
    {
        quote: "You don't just attend PixelStage — you live inside a 24-hour sensory storm. It completely reshaped how our team builds live concert experiences.",
        author: "Marcus Sterling",
        role: "Stage Producer & Director",
        location: "Berlin",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        gradient: "from-amber-50 via-yellow-50 to-orange-50",
        accent: "#F59E0B"
    },
    {
        quote: "Three continuous stages that broke every single rule of traditional creative conferences. Pure inspiration from dawn to midnight.",
        author: "Elena Rostova",
        role: "Lighting & Visual Artist",
        location: "Tokyo",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        gradient: "from-sky-50 via-indigo-50 to-purple-50",
        accent: "#6366F1"
    }
];

export function EventConference2Testimonials({ props = {}, theme, onChange }: any) {
    const surface = theme?.surface || '#FAF8F5';
    const ink = theme?.['ink-second'] || '#1E1E1E';
    const accent = theme?.accent || '#FFD600';

    return (
        <div className="w-full select-none transition-colors">
            
            {/* 1. Smooth, Elegant Voices Section */}
            <section
                id="testimonials"
                className="py-20 sm:py-28 px-4 sm:px-8 text-neutral-900 transition-colors"
                style={{
                    backgroundColor: surface
                }}
            >
                <div className="mx-auto max-w-7xl space-y-16">
                    
                    {/* Header */}
                    <div className="text-center space-y-3 max-w-3xl mx-auto">
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#EF3829]">
                            Memories & Voices
                        </span>
                        <h2 className="text-4xl sm:text-6xl font-black tracking-tight font-sans leading-tight text-neutral-900">
                            <Editable value={props?.title || 'What People Are Saying'} onChange={v => onChange?.({ title: v })} />
                        </h2>
                        <p className="text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
                            <Editable
                                value={props?.subtitle || 'Reflections and perspectives from artists, designers, and creative directors who lived the 24-hour experience.'}
                                onChange={v => onChange?.({ subtitle: v })}
                            />
                        </p>
                    </div>

                    {/* 3 Smooth Pastel Gradient Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((item, idx) => (
                            <div
                                key={idx}
                                className={`rounded-3xl p-8 bg-gradient-to-br ${item.gradient} border border-black/5 shadow-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
                            >
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div
                                            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-sm"
                                            style={{ backgroundColor: item.accent }}
                                        >
                                            <Quote size={18} />
                                        </div>
                                        <span className="text-xs font-semibold text-neutral-500">
                                            {item.location}
                                        </span>
                                    </div>

                                    <p className="text-base sm:text-lg font-semibold text-neutral-800 leading-relaxed font-sans">
                                        "{item.quote}"
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-black/5 flex items-center gap-3">
                                    <img
                                        src={item.avatar}
                                        alt={item.author}
                                        className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white"
                                    />
                                    <div>
                                        <h4 className="font-bold text-sm text-neutral-900">
                                            {item.author}
                                        </h4>
                                        <p className="text-xs text-neutral-500 font-medium">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* 2. Smooth Periwinkle PIXELSTAGE Marquee Banner */}
            <div
                className="w-full py-12 sm:py-20 px-6 overflow-hidden flex items-center justify-center text-white"
                style={{
                    background: 'linear-gradient(135deg, #7B61FF 0%, #6366F1 50%, #8B5CF6 100%)'
                }}
            >
                <div className="text-center w-full">
                    <h2 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter font-sans whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-sm">
                        <Editable value={props?.marqueeWord || 'PIXELSTAGE'} onChange={v => onChange?.({ marqueeWord: v })} />
                    </h2>
                </div>
            </div>

        </div>
    );
}

export const TestimonialsDefault = EventConference2Testimonials;
export default EventConference2Testimonials;
