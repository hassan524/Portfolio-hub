// @ts-nocheck
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';
import { MapPin, Navigation, ExternalLink, Check, Calendar, Clock } from 'lucide-react';

export function EventConference1Contact({ props = {}, theme, onChange }: any) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tier, setTier] = useState('in-person');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setName('');
        setEmail('');
    };

    return (
        <section id="contact" className="py-20 md:py-28 px-6 md:px-12 bg-white text-neutral-900 font-sans border-t border-neutral-100">
            <div className="mx-auto max-w-5xl space-y-12">
                
                {/* Header (Screenshot Exact Copy) */}
                <div className="text-center space-y-3">
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-sans">
                        <Editable value={props?.venueTitle || 'Find Us Here'} onChange={v => onChange?.({ venueTitle: v })} />
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto font-normal font-sans">
                        <Editable
                            value={props?.venueDesc || 'Navigate easily to the Pulse venue with our detailed map and directions.'}
                            onChange={v => onChange?.({ venueDesc: v })}
                        />
                    </p>
                </div>

                {/* Two Cards Side by Side (From Screenshot) */}
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Card 1: Building Exterior with Sunset Warm Glow */}
                    <div className="relative rounded-3xl overflow-hidden shadow-md group h-80 sm:h-96 border border-neutral-200">
                        <img
                            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                            alt="Skyline Convention Center"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-teal-300 font-semibold block">
                                Official Venue
                            </span>
                            <h4 className="text-xl font-bold">Skyline Convention Center</h4>
                            <p className="text-xs text-white/80">Plot 18, Block C, Gulshan Avenue, Dhaka 1212</p>
                        </div>
                    </div>

                    {/* Card 2: Clean Google Map Preview Card */}
                    <div className="relative rounded-3xl overflow-hidden shadow-md border border-neutral-200 h-80 sm:h-96 bg-[#F4F2EB] flex flex-col justify-between p-6">
                        {/* Map Visual Background Styling */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-40 pointer-events-none"
                            style={{
                                backgroundImage: `
                                    radial-gradient(#CBD5E1 1.5px, transparent 1.5px),
                                    linear-gradient(to right, #E2E8F0 1px, transparent 1px),
                                    linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)
                                `,
                                backgroundSize: '24px 24px, 48px 48px, 48px 48px'
                            }}
                        />

                        {/* Top Google Maps Pill */}
                        <div className="relative z-10 flex items-center justify-between">
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-neutral-800 shadow-sm border border-neutral-200 hover:bg-white transition-colors"
                            >
                                <Navigation size={12} className="text-teal-600" />
                                <span>View larger map</span>
                            </a>
                            <span className="text-[11px] font-mono text-neutral-400">Dhaka, BD</span>
                        </div>

                        {/* Map Center Location Pin */}
                        <div className="relative z-10 my-auto text-center flex flex-col items-center">
                            <div className="relative mb-2">
                                <div className="w-10 h-10 rounded-full bg-red-500/20 animate-ping absolute inset-0" />
                                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg relative z-10">
                                    <MapPin size={20} />
                                </div>
                            </div>
                            <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-neutral-200 text-center max-w-xs">
                                <h5 className="font-bold text-neutral-900 text-xs">Skyline Convention Center</h5>
                                <p className="text-[11px] text-neutral-500">Dhaka City Hub · Main Entrance Gate 2</p>
                            </div>
                        </div>

                        {/* Map Bottom Actions */}
                        <div className="relative z-10 pt-4 border-t border-neutral-300/60 flex items-center justify-between">
                            <div className="text-xs text-neutral-600">
                                <span className="font-medium text-neutral-900">Metro:</span> 4 min from Gulshan-2 Stn
                            </div>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 rounded-full bg-[#10376D] hover:bg-[#0D2D59] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                                <span>Get Directions</span>
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Quick Pass Registration Box */}
                <div className="bg-neutral-50 rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-sm">
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-5 space-y-3">
                            <span className="text-xs font-mono uppercase tracking-wider text-teal-600 font-semibold">
                                Passes & Reservations
                            </span>
                            <h3 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
                                Claim Your Seat for Pulse 2026
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                                Join over 2,500 innovators, creators, and leaders. Both In-Person passes and global Virtual livestreams are available.
                            </p>
                        </div>

                        <div className="md:col-span-7">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 rounded-2xl bg-white border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="Work Email"
                                        className="w-full px-4 py-3 rounded-2xl bg-white border border-neutral-200 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-teal-500 transition-colors"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 text-xs font-medium text-neutral-700 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="tier"
                                            value="in-person"
                                            checked={tier === 'in-person'}
                                            onChange={() => setTier('in-person')}
                                            className="text-teal-600 focus:ring-teal-500"
                                        />
                                        <span>In-Person Delegate ($499)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-xs font-medium text-neutral-700 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="tier"
                                            value="virtual"
                                            checked={tier === 'virtual'}
                                            onChange={() => setTier('virtual')}
                                            className="text-teal-600 focus:ring-teal-500"
                                        />
                                        <span>Virtual Pass (Free)</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3.5 rounded-full bg-[#10376D] hover:bg-[#0D2D59] text-white text-sm font-semibold tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                                >
                                    {submitted ? (
                                        <>
                                            <Check size={16} />
                                            <span>Registration Confirmed!</span>
                                        </>
                                    ) : (
                                        <span>Complete Registration</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export const ContactForm = EventConference1Contact;
export default EventConference1Contact;
