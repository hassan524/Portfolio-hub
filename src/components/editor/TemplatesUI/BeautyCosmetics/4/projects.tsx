// @ts-nocheck
import { ArrowUpRight, Droplets } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#06131A';
    const ink = theme?.ink || '#E2F4F6';
    const inkSecond = theme?.['ink-second'] || '#81A8B8';
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.04)';
    const accent = theme?.accent || '#38BDF8';

    const items = (props?.items && props.items.length > 0)
        ? props.items
        : [
            { title: 'The Hydro-Infusion Facial', copy: 'Multi-layer hyaluronic acid micro-channeling for deep dermis saturation.', price: 'from $150', image: 'https://images.unsplash.com/photo-1570172619644-d6a3f6c4c6c1?auto=format&fit=crop&w=900&q=85' },
            { title: 'Aqua LED Light Therapy', copy: 'Non-invasive targeted light wave frequencies to soothe inflammation.', price: 'from $95', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85' },
            { title: 'Sculpting & Lymphatic Drain', copy: 'Cooling facial sculpting using chilled botanical quartz wands.', price: 'from $110', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85' }
        ];

    return (
        <section id="projects" className="px-6 py-28 relative" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Droplets size={16} style={{ color: accent }} />
                            <Editable value="SIGNATURE CARE" className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: accent }} />
                        </div>
                        <Editable as="h2" value="Targeted Treatments" className="text-4xl font-extralight tracking-tight md:text-5xl" />
                    </div>
                    <p className="max-w-md text-sm font-light" style={{ color: inkSecond }}>
                        Every session is custom-formulated according to real-time skin hydration metrics.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {items.map((item: any, index: number) => (
                        <article
                            key={index}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border backdrop-blur-xl transition duration-500 hover:-translate-y-2"
                            style={{ backgroundColor: surface, borderColor: `${accent}22` }}
                        >
                            <div className="overflow-hidden relative aspect-[4/5]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />
                                <span
                                    className="absolute top-4 right-4 rounded-full px-4 py-1.5 text-xs font-semibold backdrop-blur-md border"
                                    style={{ backgroundColor: 'rgba(6, 19, 26, 0.7)', borderColor: `${accent}44`, color: accent }}
                                >
                                    <Editable value={item.price} />
                                </span>
                            </div>

                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div>
                                    <div className="flex items-start justify-between gap-2">
                                        <Editable
                                            as="h3"
                                            value={item.title}
                                            onChange={(v) => {
                                                const next = [...items];
                                                next[index] = { ...item, title: v };
                                                onChange?.({ items: next });
                                            }}
                                            className="text-xl font-light tracking-tight"
                                        />
                                        <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: accent }} />
                                    </div>
                                    <Editable
                                        as="p"
                                        value={item.copy}
                                        className="mt-3 text-sm leading-relaxed font-light"
                                        style={{ color: inkSecond }}
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}