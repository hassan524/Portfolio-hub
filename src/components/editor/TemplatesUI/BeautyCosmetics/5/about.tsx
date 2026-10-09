// @ts-nocheck
import { FiArrowUpRight, FiDroplet, FiFeather, FiShield, FiCheckCircle } from 'react-icons/fi';
import { Editable } from '@/components/editor/ui/Editable';

const C = {
    frame: '#E8ECE3',
    card: '#F7F8F3',
    white: '#FFFFFF',
    ink: '#16261B',
    inkSecond: '#5F7265',
    sage: '#5C7B5D',
    mint: '#CFE5CF',
    tint: '#E3EADF'
};

export function About({ props = {}, onChange }: any) {
    const features = [
        { icon: FiFeather, title: '100% natural ingredients', copy: 'Aloe, avocado, green tea and botanical oils. Nothing you cannot pronounce.' },
        { icon: FiShield, title: 'Dermatologist tested', copy: 'Every formula is tested on sensitive skin before it reaches you.' },
        { icon: FiDroplet, title: 'Cruelty-free and vegan', copy: 'Never tested on animals, always packaged in recyclable materials.' }
    ];

    const stats = [
        ['12k+', 'Happy customers'],
        ['40+', 'Skin care products'],
        ['98%', 'Would reorder']
    ];

    return (
        <section
            id="about"
            className="w-full px-4 py-8 sm:px-6"
            style={{ backgroundColor: C.frame, color: C.ink, fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
            <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] p-6 sm:p-12 lg:grid-cols-2 lg:items-center" style={{ backgroundColor: C.card }}>
                {/* Image */}
                <div className="relative">
                    <div className="overflow-hidden rounded-[2.5rem]" style={{ backgroundColor: C.tint }}>
                        <img
                            src={props?.aboutImage || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85'}
                            alt="Natural skin care ritual"
                            className="aspect-[4/5] w-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-5 right-4 flex items-center gap-3 rounded-full py-2 pl-2 pr-6 shadow-lg sm:right-8" style={{ backgroundColor: C.white }}>
                        <span className="grid h-11 w-11 place-items-center rounded-full" style={{ backgroundColor: C.sage, color: C.white }}>
                            <FiCheckCircle size={20} />
                        </span>
                        <div>
                            <Editable value="Since 2019" className="block text-sm font-semibold" style={{ color: C.ink }} />
                            <Editable value="Naturally made" className="block text-[11px]" style={{ color: C.inkSecond }} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <span className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold" style={{ backgroundColor: C.mint, color: C.ink }}>
                        <Editable value="About us" style={{ color: 'inherit' }} />
                    </span>

                    <Editable
                        as="h2"
                        value={props?.title || 'Skin care that keeps you looking like you.'}
                        onChange={(v) => onChange?.({ title: v })}
                        className="mt-5 text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl"
                        style={{ color: C.ink }}
                    />

                    <Editable
                        as="p"
                        value={props?.story || 'BeautyPlus started with a simple idea: your natural skin tone and texture are worth protecting, not covering up. We make gentle, plant-based products that support your skin barrier and let your own glow come through.'}
                        onChange={(v) => onChange?.({ story: v })}
                        className="mt-5 max-w-xl text-sm leading-relaxed"
                        style={{ color: C.inkSecond }}
                    />

                    <ul className="mt-8 space-y-4">
                        {features.map(({ icon: Icon, title, copy }) => (
                            <li key={title} className="flex items-start gap-4">
                                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ backgroundColor: C.tint }}>
                                    <Icon size={16} style={{ color: C.sage }} />
                                </span>
                                <div>
                                    <Editable value={title} className="block text-sm font-semibold" style={{ color: C.ink }} />
                                    <Editable value={copy} className="block text-xs leading-relaxed" style={{ color: C.inkSecond }} />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 grid grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: C.tint }}>
                        {stats.map(([n, label]) => (
                            <div key={label}>
                                <Editable value={n} className="block text-3xl font-semibold" style={{ color: C.sage }} />
                                <Editable value={label} className="block text-[11px]" style={{ color: C.inkSecond }} />
                            </div>
                        ))}
                    </div>

                    <a
                        href="#projects"
                        className="mt-8 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition hover:scale-105"
                        style={{ backgroundColor: C.ink, color: C.white }}
                    >
                        <Editable value="Shop the range" style={{ color: 'inherit' }} />
                        <FiArrowUpRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}