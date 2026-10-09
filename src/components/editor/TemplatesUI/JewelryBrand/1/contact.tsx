// @ts-nocheck
import { useState } from 'react';
import { Send, Sparkles, ArrowRight, BookOpen, Clock, Mail } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

function isDarkColor(c?: string): boolean {
    if (!c) return false;
    const clean = c.replace('#', '').trim();
    if (clean.length < 6) return false;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}

const defaultArticles = [
    {
        title: 'HOW TO CARE FOR GOLD JEWELRY',
        desc: 'Essential bench methods to keep your 18k and 14k pieces lustrous and scratch-free over decades of continuous wear.',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'MINIMALIST JEWELRY LOOKS FOR WORK',
        desc: 'How to stack understated bands, whisper-thin chains, and huggie hoops for effortless professional polish.',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80'
    },
    {
        title: 'OUR COMMITMENT TO ETHICAL SOURCING',
        desc: 'Tracing our fair-mined solid gold alloys and Kimberly-certified natural gemstones from origin to workshop.',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
    }
];

export function JewelryBrand1Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#F5ECE1';
    const isDark = isDarkColor(bg);

    const ink = isDark
        ? (theme?.ink && isDarkColor(theme.ink) ? '#FFFFFF' : theme?.ink || '#FFFFFF')
        : (theme?.ink && !isDarkColor(theme.ink) ? '#1C1917' : theme?.ink || '#1C1917');

    const inkSecond = isDark
        ? (theme?.['ink-second'] && isDarkColor(theme['ink-second']) ? '#D6D3D1' : theme?.['ink-second'] || '#D6D3D1')
        : (theme?.['ink-second'] && theme['ink-second'] !== '#000000' ? theme['ink-second'] : '#78716C');

    const accent = theme?.accent || '#B48C56';
    const surface = isDark ? 'rgba(255, 255, 255, 0.05)' : (theme?.surface || '#EFE6DB');

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section
            id="contact"
            className="relative py-24 md:py-36 px-6 md:px-14 border-b"
            style={{
                backgroundColor: bg,
                color: ink,
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
            }}
        >
            <div className="mx-auto max-w-7xl space-y-24">
                {/* Part 1: "WHERE JEWELRY MEETS LIFESTYLE" (From Image 3) */}
                <div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }}>
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
                                <Editable value={props?.eyebrow || 'LIFESTYLE & CARE JOURNAL'} onChange={v => onChange?.({ eyebrow: v })} />
                            </p>
                            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight mt-2">
                                <Editable value={props?.journalHeadline || 'Where Jewelry Meets Lifestyle'} onChange={v => onChange?.({ journalHeadline: v })} />
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm font-light max-w-xs" style={{ color: inkSecond }}>
                            Curated advice on metal maintenance, timeless curation, and artisanal craft.
                        </p>
                    </div>

                    {/* 3 Lifestyle Journal Cards from Image 3 */}
                    <div className="grid md:grid-cols-3 gap-8 pt-12">
                        {defaultArticles.map((art, idx) => (
                            <div
                                key={idx}
                                className="group rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-xl"
                                style={{
                                    backgroundColor: isDark ? 'rgba(28,25,23,0.6)' : '#FFFFFF',
                                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
                                }}
                            >
                                <div className="aspect-[16/10] overflow-hidden bg-black/10">
                                    <img
                                        src={art.image}
                                        alt={art.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 space-y-3">
                                    <div className="flex items-center gap-2 font-mono text-[10px]" style={{ color: accent }}>
                                        <Clock size={12} />
                                        <span>{art.readTime}</span>
                                    </div>
                                    <h3 className="font-serif text-lg font-medium tracking-tight group-hover:text-amber-600 transition-colors">
                                        {art.title}
                                    </h3>
                                    <p className="text-xs font-light leading-relaxed" style={{ color: inkSecond }}>
                                        {art.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Part 2: VIP Boutique & Bespoke Consultation Form */}
                <div
                    className="rounded-3xl p-8 sm:p-14 border shadow-xl"
                    style={{
                        backgroundColor: isDark ? 'rgba(28,25,23,0.8)' : '#FFFFFF',
                        borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
                    }}
                >
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-4">
                            <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
                                <Editable value={props?.contactEyebrow || 'PRIVATE CONCIERGE'} onChange={v => onChange?.({ contactEyebrow: v })} />
                            </p>
                            <h3 className="font-serif text-3xl sm:text-4xl font-light leading-tight">
                                Book an Appointment or Inquire on a Piece
                            </h3>
                            <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
                                Our senior gemologist and styling team are available for one-on-one virtual consultations or private studio appointments in Paris and New York.
                            </p>
                        </div>

                        <div className="lg:col-span-7">
                            {submitted ? (
                                <div className="text-center py-10 space-y-2">
                                    <Sparkles size={32} className="mx-auto" style={{ color: accent }} />
                                    <h4 className="font-serif text-2xl font-light">Thank You for Connecting</h4>
                                    <p className="text-sm font-light" style={{ color: inkSecond }}>Our boutique concierge will reach out within 12 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Your Full Name"
                                            className="w-full p-3.5 rounded-2xl text-xs border bg-transparent focus:outline-none"
                                            style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', color: ink }}
                                        />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Your Email Address"
                                            className="w-full p-3.5 rounded-2xl text-xs border bg-transparent focus:outline-none"
                                            style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', color: ink }}
                                        />
                                    </div>
                                    <textarea
                                        rows={3}
                                        placeholder="Tell us which jewelry piece or custom styling you are interested in..."
                                        className="w-full p-3.5 rounded-2xl text-xs border bg-transparent focus:outline-none resize-none"
                                        style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', color: ink }}
                                    />
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto px-8 py-3.5 rounded-full font-sans text-xs uppercase tracking-widest font-semibold text-white shadow-md transition-transform hover:scale-105"
                                        style={{ backgroundColor: accent }}
                                    >
                                        Send Inquiry
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export const Contact = JewelryBrand1Contact;
export default JewelryBrand1Contact;
