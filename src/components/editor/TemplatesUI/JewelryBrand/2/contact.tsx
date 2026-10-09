// @ts-nocheck
import { useState } from 'react';
import { Send, Sparkles, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

export function JewelryBrand2Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#FFF0F5';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFF0F5' : theme?.ink || '#FFF0F5')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#3D1A2E' : theme?.ink || '#3D1A2E');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#F5B8D8' : theme?.['ink-second'] || '#F5B8D8')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#9B4F7C');

    const accent = theme?.accent || '#E8317A';
    const surface = theme?.surface || (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(232, 49, 122, 0.12)');

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>(['Bespoke Ring']);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
        );
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setFormSubmitted(true);
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden py-24 md:py-36 px-6 md:px-16"
            style={{ backgroundColor: bg, color: ink }}
        >
            {/* Butterfly animated accent */}
            <motion.div
                className="pointer-events-none absolute bottom-12 left-10 hidden md:block"
                animate={{ y: [0, -18, 0], x: [0, 10, 0], rotate: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg viewBox="0 0 100 80" width="60" height="48">
                    <g transform="translate(50, 40)">
                        <motion.g animate={{ scaleX: [1, 0.2, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                            <path d="M50,50 C30,10 -10,30 10,60 C20,80 40,75 50,50 Z" fill={accent} opacity="0.75" />
                        </motion.g>
                        <motion.g animate={{ scaleX: [-1, -0.2, -1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.05 }}>
                            <path d="M50,50 C30,10 -10,30 10,60 C20,80 40,75 50,50 Z" fill={accent} opacity="0.75" />
                        </motion.g>
                        <ellipse cx="0" cy="0" rx="2" ry="10" fill={isDark ? '#F5B8D8' : '#3D1A2E'} opacity="0.8" />
                    </g>
                </svg>
            </motion.div>

            <div className="mx-auto max-w-6xl">
                {/* Header — NO CARDS */}
                <div className="mb-16 md:mb-20 max-w-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={14} style={{ color: accent }} />
                        <p className="text-xs uppercase tracking-[0.3em] font-medium" style={{ color: accent }}>
                            <Editable value={props?.eyebrow || 'Private Salon & Bespoke Commissions'} onChange={v => onChange?.({ eyebrow: v })} />
                        </p>
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight leading-[1.1]">
                        <Editable value={props?.headline || 'Let Us Craft Your Forever Piece'} onChange={v => onChange?.({ headline: v })} />
                    </h2>
                    <p className="mt-6 text-base leading-relaxed font-light" style={{ color: inkSecond }}>
                        <Editable
                            value={props?.subheadline || 'Each bespoke creation begins with a private conversation. Whether you desire a custom heirloom, an unheated rare gem sourcing, or a restyling of family jewels, our salon welcomes your story.'}
                            onChange={v => onChange?.({ subheadline: v })}
                        />
                    </p>
                </div>

                {/* Editorial Split Layout — NO CARDS */}
                <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
                    {/* Left: Private Concierge Details */}
                    <div className="md:col-span-5 space-y-10">
                        <div className="border-t pt-8" style={{ borderColor: surface }}>
                            <p className="text-xs uppercase tracking-[0.25em] font-medium mb-3" style={{ color: accent }}>
                                Atelier Locations
                            </p>
                            <p className="font-serif text-xl font-light">
                                <Editable value={props?.locations || 'Paris · Place Vendôme & Mayfair, London'} onChange={v => onChange?.({ locations: v })} />
                            </p>
                            <p className="text-xs leading-relaxed mt-2" style={{ color: inkSecond }}>
                                Private appointments held weekly in Paris, London, and by private salon invitation internationally.
                            </p>
                        </div>

                        <div className="border-t pt-8 space-y-4" style={{ borderColor: surface }}>
                            <div className="flex items-center gap-3">
                                <Mail size={16} style={{ color: accent }} />
                                <span className="text-sm font-medium">
                                    <Editable value={props?.email || 'concierge@maison-elodie.com'} onChange={v => onChange?.({ email: v })} />
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} style={{ color: accent }} />
                                <span className="text-sm font-medium">
                                    <Editable value={props?.phone || '+33 (0)1 42 68 89 20'} onChange={v => onChange?.({ phone: v })} />
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar size={16} style={{ color: accent }} />
                                <span className="text-sm font-medium" style={{ color: inkSecond }}>
                                    <Editable value={props?.hours || 'Consultations by Appointment Only'} onChange={v => onChange?.({ hours: v })} />
                                </span>
                            </div>
                        </div>

                        <div className="border-t pt-8" style={{ borderColor: surface }}>
                            <p className="text-xs uppercase tracking-widest font-mono" style={{ color: inkSecond }}>
                                BESPOKE PROCESS
                            </p>
                            <div className="mt-4 space-y-3 text-xs" style={{ color: inkSecond }}>
                                <p className="flex items-center gap-2">
                                    <span style={{ color: accent }}>01</span> Discovery call & mood curation
                                </p>
                                <p className="flex items-center gap-2">
                                    <span style={{ color: accent }}>02</span> Ethical gemstone sourcing & hand rendering
                                </p>
                                <p className="flex items-center gap-2">
                                    <span style={{ color: accent }}>03</span> Hand-forging in our atelier (4–6 weeks)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Bespoke Inquiry Form — NO CARDS, pure editorial underlines */}
                    <div className="md:col-span-7 border-t md:border-t-0 md:border-l md:pl-12 pt-8 md:pt-0" style={{ borderColor: surface }}>
                        {formSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="py-16 text-center"
                            >
                                <span className="font-serif text-5xl mb-4 block" style={{ color: accent }}>
                                    ✦
                                </span>
                                <h3 className="font-serif text-2xl font-light">
                                    Your Inquiry Has Been Received
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed max-w-md mx-auto" style={{ color: inkSecond }}>
                                    Our master jeweller will review your request and connect with you within 24 hours to schedule your private consultation.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Interest tags */}
                                <div>
                                    <label className="block text-xs uppercase tracking-[0.2em] font-medium mb-4" style={{ color: inkSecond }}>
                                        Commission Scope
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Bespoke Ring', 'High Jewellery Necklace', 'Earring Sculpture', 'Pink Diamond Sourcing', 'Heirloom Redesign'].map(tag => {
                                            const active = selectedInterests.includes(tag);
                                            return (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => toggleInterest(tag)}
                                                    className="px-4 py-2 rounded-full text-xs transition-all border"
                                                    style={{
                                                        backgroundColor: active ? accent : 'transparent',
                                                        color: active ? '#ffffff' : ink,
                                                        borderColor: active ? accent : surface,
                                                    }}
                                                >
                                                    {tag}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Underline Inputs (No card backgrounds) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: inkSecond }}>
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Genevieve Vance"
                                            className="w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-colors"
                                            style={{ borderColor: surface, color: ink }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: inkSecond }}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="g.vance@atelier.com"
                                            className="w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-colors"
                                            style={{ borderColor: surface, color: ink }}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: inkSecond }}>
                                            City / Country
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Paris, France"
                                            className="w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-colors"
                                            style={{ borderColor: surface, color: ink }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: inkSecond }}>
                                            Approximate Budget
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="€10,000 – €50,000+"
                                            className="w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-colors"
                                            style={{ borderColor: surface, color: ink }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: inkSecond }}>
                                        Tell Us About Your Vision
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Share your inspiration, desired gemstones, or the special occasion..."
                                        className="w-full bg-transparent border-b py-2 text-sm focus:outline-none transition-colors resize-none"
                                        style={{ borderColor: surface, color: ink }}
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full md:w-auto px-10 py-4 rounded-full font-medium text-sm text-white shadow-lg flex items-center justify-center gap-3 transition-shadow"
                                    style={{ backgroundColor: accent }}
                                >
                                    <Send size={15} />
                                    <span>Request Private Consultation</span>
                                </motion.button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export const Contact = JewelryBrand2Contact;
export default JewelryBrand2Contact;
