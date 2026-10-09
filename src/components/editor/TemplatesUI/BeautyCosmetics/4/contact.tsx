// @ts-nocheck
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Contact({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#06131A';
    const ink = theme?.ink || '#E2F4F6';
    const inkSecond = theme?.['ink-second'] || '#81A8B8';
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.04)';
    const accent = theme?.accent || '#38BDF8';

    const details = [
        [Mail, 'studio@lumen.co'],
        [Phone, '+1 (718) 555-0144'],
        [MapPin, '208 Smith Street, Brooklyn'],
        [Clock, 'Tue–Sat · 10:00–19:00']
    ];

    return (
        <section id="contact" className="px-6 py-28 relative overflow-hidden" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <div>
                        <Editable value="BEGIN YOUR JOURNEY" className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: accent }} />
                        <Editable
                            as="h2"
                            value="Let’s restore your skin’s vitality."
                            className="mt-4 text-4xl font-extralight leading-tight md:text-6xl tracking-tight"
                        />
                        <Editable
                            as="p"
                            value="Ready to experience custom hydration therapy? Send us a quick note or visit our Brooklyn studio for a consultation."
                            className="mt-6 max-w-lg leading-relaxed text-base font-light"
                            style={{ color: inkSecond }}
                        />

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {details.map(([Icon, text]) => (
                                <div key={text} className="flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-md" style={{ backgroundColor: surface, borderColor: `${accent}22` }}>
                                    <Icon size={18} style={{ color: accent }} />
                                    <Editable value={text} className="text-xs font-medium" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fluid Glass Contact Card Form */}
                    <div className="rounded-3xl p-8 md:p-10 border backdrop-blur-2xl shadow-2xl relative" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: `${accent}33` }}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: inkSecond }}>Name</label>
                                <input type="text" placeholder="Your full name" className="w-full rounded-xl px-4 py-3.5 text-sm bg-black/30 border text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400" style={{ borderColor: `${accent}33` }} />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: inkSecond }}>Email</label>
                                <input type="email" placeholder="hello@domain.com" className="w-full rounded-xl px-4 py-3.5 text-sm bg-black/30 border text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400" style={{ borderColor: `${accent}33` }} />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider mb-2 font-medium" style={{ color: inkSecond }}>Message</label>
                                <textarea rows={4} placeholder="Tell us about your skin goals..." className="w-full rounded-xl px-4 py-3.5 text-sm bg-black/30 border text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400" style={{ borderColor: `${accent}33` }} />
                            </div>
                            <button className="w-full rounded-xl py-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition hover:opacity-90 shadow-lg" style={{ backgroundColor: accent, color: bg }}>
                                <Send size={14} />
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}