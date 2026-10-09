// @ts-nocheck
import { useState } from 'react';
import { Send, Sparkles, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function JewelryBrand3Contact({ props = {}, theme, onChange }: any) {
    const bg = '#0B2B20';
    const ink = '#FFFFFF';
    const inkSecond = '#A3C8B7';
    const accent = theme?.accent || '#E0C773';

    const [booked, setBooked] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setBooked(true);
    };

    return (
        <section
            id="contact"
            className="relative py-24 md:py-36 px-6 md:px-14 border-b border-white/10"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Salons & VIP Appointments */}
                    <div className="lg:col-span-5 space-y-6">
                        <p className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
                            <Editable value={props?.eyebrow || 'PRIVATE VIEWINGS & BESPOKE INQUIRIES'} onChange={v => onChange?.({ eyebrow: v })} />
                        </p>
                        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight leading-[1.1]">
                            <Editable value={props?.headline || 'Experience the Green Fire in Person.'} onChange={v => onChange?.({ headline: v })} />
                        </h2>
                        <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
                            <Editable
                                value={props?.body || 'We invite you to our private salons for an intimate gemstone viewing and champagne consultation with our Master Gemologist.'}
                                onChange={v => onChange?.({ body: v })}
                            />
                        </p>

                        <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono">
                            <p className="flex items-center gap-3">
                                <MapPin size={15} className="text-emerald-400" />
                                <span>14 New Bond Street, Mayfair, London</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <MapPin size={15} className="text-emerald-400" />
                                <span>Place Vendôme 22, 75001 Paris</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <Mail size={15} className="text-emerald-400" />
                                <span>concierge@miller-jewelry.com</span>
                            </p>
                        </div>
                    </div>

                    {/* Right: Booking Form */}
                    <div className="lg:col-span-7 bg-emerald-950/60 p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl">
                        {booked ? (
                            <div className="text-center py-12 space-y-3">
                                <Sparkles size={36} className="mx-auto text-amber-200" />
                                <h3 className="font-serif text-2xl font-light">Your Private Salon Viewing is Requested</h3>
                                <p className="text-xs font-light" style={{ color: inkSecond }}>Our salon directrice will contact you within 6 hours to confirm timing.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        required
                                        placeholder="Full Name"
                                        className="w-full p-3.5 rounded-2xl text-xs border border-white/15 bg-black/20 text-white focus:outline-none focus:border-emerald-400"
                                    />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Email Address"
                                        className="w-full p-3.5 rounded-2xl text-xs border border-white/15 bg-black/20 text-white focus:outline-none focus:border-emerald-400"
                                    />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Preferred Salon (London / Paris / Zurich)"
                                        className="w-full p-3.5 rounded-2xl text-xs border border-white/15 bg-black/20 text-white focus:outline-none focus:border-emerald-400"
                                    />
                                    <input
                                        type="date"
                                        className="w-full p-3.5 rounded-2xl text-xs border border-white/15 bg-black/20 text-white focus:outline-none focus:border-emerald-400"
                                    />
                                </div>
                                <textarea
                                    rows={3}
                                    placeholder="Which piece from the collection would you like to view?"
                                    className="w-full p-3.5 rounded-2xl text-xs border border-white/15 bg-black/20 text-white focus:outline-none focus:border-emerald-400 resize-none"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-4 rounded-full text-xs uppercase tracking-widest font-bold bg-white text-emerald-950 transition-transform hover:scale-[1.02]"
                                >
                                    Request Champagne Appointment
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export const Contact = JewelryBrand3Contact;
export default JewelryBrand3Contact;
