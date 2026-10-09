// @ts-nocheck
import { ArrowUp } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || 'Canvas';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || 'CanvasText';
    const inkSecond = theme?.['ink-second'] || ink;
    const accent = theme?.accent || ink;
    const surface = theme?.surface || mix(ink, 12);
    const fontBody = theme?.fontBody;
    const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;

    const cols = [
        ['Explore', [['Collection', '#projects'], ['Philosophy', '#about'], ['Notes', '#testimonials']]],
        ['Visit', [['Showroom', '#contact'], ['Book a fitting', '#contact'], ['Repairs', '#contact']]],
        ['Follow', [['Instagram', '#top'], ['Journal', '#top'], ['Newsletter', '#top']]],
    ];

    return (
        <footer className="relative overflow-hidden px-5 pt-20 lg:px-8" style={{ backgroundColor: bgSecond, color: ink, fontFamily: fontBody }}>
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-12 border-b pb-14 md:grid-cols-[1.4fr_repeat(3,1fr)]" style={{ borderColor: surface }}>
                    <div>
                        <p className="max-w-xs text-lg leading-7">
                            <Editable value={props?.tagline || 'Clothes for people who notice. Cut slowly in London.'} onChange={(v) => onChange?.({ tagline: v })} />
                        </p>
                        <a href="#top" className="group mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]">
                            <span className="grid h-11 w-11 place-items-center rounded-full transition group-hover:-translate-y-1" style={{ backgroundColor: accent, color: bg }}><ArrowUp size={16} /></span>
                            Back to top
                        </a>
                    </div>
                    {cols.map(([title, links]) => (
                        <div key={title}>
                            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: inkSecond }}>{title}</p>
                            <ul className="mt-5 space-y-3">
                                {links.map(([label, href]) => (
                                    <li key={label}>
                                        <a href={href} className="group relative inline-block text-sm">
                                            <Editable value={label} />
                                            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col justify-between gap-3 py-6 text-[10px] uppercase tracking-[0.25em] sm:flex-row" style={{ color: inkSecond }}>
                    <Editable value={props?.copyright || '© 2026 Aroxform Studio'} onChange={(v) => onChange?.({ copyright: v })} />
                    <Editable value={props?.legal || 'Made in London — Repairable for life'} />
                </div>
            </div>

            {/* Giant outlined wordmark */}
            <div className="group pointer-events-none select-none text-center font-bold uppercase leading-[0.75] tracking-[-0.08em]" style={{ fontFamily: fontHead, fontSize: 'clamp(4rem, 19vw, 20rem)', color: 'transparent', WebkitTextStroke: `1px ${mix(ink, 45)}`, transform: 'translateY(0.12em)' }}>
                <Editable value={props?.wordmark || 'Aroxform'} />
            </div>
        </footer>
    );
}