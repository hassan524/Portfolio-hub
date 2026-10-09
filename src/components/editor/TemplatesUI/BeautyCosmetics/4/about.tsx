// @ts-nocheck
import { Sparkles, Waves, ShieldCheck } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function About({ props = {}, theme, onChange }: any) {
    const bgSecond = theme?.['bg-second'] || '#0A1A24';
    const ink = theme?.ink || '#E2F4F6';
    const inkSecond = theme?.['ink-second'] || '#81A8B8';
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.04)';
    const accent = theme?.accent || '#38BDF8';

    const values = [
        ['Cellular Hydration', 'Deep cellular infusion tailored to your skin structure.', Waves],
        ['Clean Formulations', 'Zero synthetic fillers, pure active bio-ingredients.', ShieldCheck],
        ['Holistic Restraint', 'Sustained long-term barrier vitality over quick fixes.', Sparkles]
    ];

    return (
        <section id="about" className="px-6 py-28 relative overflow-hidden" style={{ backgroundColor: bgSecond, color: ink }}>
            <div className="mx-auto max-w-6xl relative z-10">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    <div className="relative group">
                        <div className="overflow-hidden rounded-[2.5rem] border" style={{ borderColor: `${accent}33` }}>
                            <img
                                src={props?.aboutImage || 'https://images.unsplash.com/photo-1560066984-c2393c2e3024?auto=format&fit=crop&w=1000&q=85'}
                                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                alt="Studio Interior"
                            />
                        </div>
                        <div
                            className="absolute -bottom-6 -right-6 rounded-3xl p-6 backdrop-blur-2xl border shadow-2xl"
                            style={{ backgroundColor: 'rgba(6, 19, 26, 0.85)', borderColor: `${accent}44` }}
                        >
                            <Editable as="strong" value="Est. 2016" className="block text-xl font-light" style={{ color: accent }} />
                            <Editable as="span" value="Brooklyn, NY" className="mt-1 block text-xs tracking-wider uppercase" style={{ color: inkSecond }} />
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="h-1.5 w-6 rounded-full" style={{ backgroundColor: accent }} />
                            <Editable value="OUR SANCTUARY" className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: accent }} />
                        </div>

                        <Editable
                            as="h2"
                            value={props?.title || 'Care designed around your skin’s natural rhythm.'}
                            onChange={(v) => onChange?.({ title: v })}
                            className="text-4xl font-extralight leading-tight md:text-5xl tracking-tight"
                        />

                        <Editable
                            as="p"
                            value={props?.story || 'Lumen was established on a radical principle: true skin health stems from hydration equilibrium, not aggressive peeling. We unite clinical research with a calm, tactile sanctuary.'}
                            onChange={(v) => onChange?.({ story: v })}
                            className="mt-6 leading-relaxed font-light text-base"
                            style={{ color: inkSecond }}
                        />

                        <div className="mt-10 space-y-6">
                            {values.map(([title, copy, Icon]) => (
                                <div key={title} className="flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-md" style={{ backgroundColor: surface, borderColor: `${accent}15` }}>
                                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: `${accent}15` }}>
                                        <Icon size={22} style={{ color: accent }} />
                                    </div>
                                    <div>
                                        <Editable as="h3" value={title} className="text-base font-semibold" />
                                        <Editable as="p" value={copy} className="mt-1 text-sm font-light leading-relaxed" style={{ color: inkSecond }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}