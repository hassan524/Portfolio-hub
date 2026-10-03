// @ts-nocheck
import { ArrowDown, ArrowUpRight, Coffee, Sparkles } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#f1eadf';
    const bgSecond = theme?.['bg-second'] || '#382116';
    const ink = theme?.ink || '#382116';
    const inkSecond = theme?.['ink-second'] || '#f1eadf';
    const surface = theme?.surface || 'rgba(56, 33, 22, 0.14)';
    const accent = theme?.accent || '#c98a50';
  const fontBody = theme?.fontBody || "Inter";

    return (
        <section id="home" className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
            {/* Decorative falling dots */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {Array.from({ length: 14 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: `${(i * 7.3) % 100}%`,
                            top: `${(i * 13.7) % 100}%`,
                            width: `${4 + (i % 3) * 3}px`,
                            height: `${4 + (i % 3) * 3}px`,
                            backgroundColor: accent,
                            opacity: 0.08 + (i % 4) * 0.03,
                            animation: `card-drift ${6 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="py-8 lg:py-20">
                        <div className="mb-6 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em]" style={{ color: accent }}>
                            <Sparkles size={13} />
                            <Editable value={props?.eyebrow || 'A small coffee studio in Sydney'} onChange={(v) => onChange?.({ eyebrow: v })} />
                        </div>
                        <h1 className="max-w-xl font-fraunces text-6xl leading-[0.88] tracking-[-0.06em] sm:text-8xl">
                            <Editable value={props?.headline || 'Coffee for your everyday rituals.'} onChange={(v) => onChange?.({ headline: v })} />
                        </h1>
                        <p className="mt-7 max-w-sm text-sm leading-6" style={{ color: `${ink}99` }}>
                            <Editable value={props?.subheadline || 'A gentle place for strong coffee, fresh bread, and the kind of morning you want to remember.'} onChange={(v) => onChange?.({ subheadline: v })} />
                        </p>
                        <a href="#projects" className="mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: bgSecond, color: inkSecond }}>
                            <Editable value={props?.primaryCta || 'See what is brewing'} />
                            <ArrowUpRight size={14} style={{ color: accent }} />
                        </a>
                    </div>

                    <div className="relative min-h-[450px] sm:min-h-[560px]">
                        <div className="motion-drift absolute right-0 top-0 h-[390px] w-[80%] rotate-3 overflow-hidden rounded-[2rem] border-8 shadow-2xl sm:h-[500px]" style={{ backgroundColor: bgSecond, borderColor: bgSecond }}>
                            <img className="h-full w-full object-cover opacity-90" src={props?.heroImage || 'https://images.pexels.com/photos/15774297/pexels-photo-15774297.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600'} />
                        </div>
                        <div className="motion-drift-reverse absolute bottom-2 left-0 z-10 w-[62%] -rotate-6 rounded-[1.5rem] border p-5 shadow-xl sm:bottom-8" style={{ backgroundColor: bgSecond, borderColor: bg, color: inkSecond }}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.18em]" style={{ color: `${inkSecond}77` }}><Editable value={props?.cardLabel || 'Today at Morrow'} onChange={(v) => onChange?.({ cardLabel: v })} /></p>
                                    <p className="mt-2 font-fraunces text-3xl"><Editable value={props?.cardTitle || 'The morning set'} onChange={(v) => onChange?.({ cardTitle: v })} /></p>
                                </div>
                                <span className="grid h-8 w-8 place-items-center rounded-full" style={{ backgroundColor: accent, color: bgSecond }}><Coffee size={14} /></span>
                            </div>
                            <div className="mt-6 flex justify-between border-t pt-4 text-[9px] uppercase tracking-[0.16em]" style={{ borderColor: `${inkSecond}22`, color: `${inkSecond}88` }}>
                                <Editable value={props?.cardMeta || 'Espresso · Toast · Something sweet'} onChange={(v) => onChange?.({ cardMeta: v })} />
                                <span style={{ color: accent }}><Editable value="$18" /></span>
                            </div>
                        </div>
                        <div className="absolute right-0 top-1/2 hidden translate-y-8 rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.16em] sm:block" style={{ backgroundColor: bg, borderColor: surface }}>
                            <Editable value={props?.badge || 'Open 7 days'} />
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-between border-t pt-5 text-[9px] uppercase tracking-[0.18em]" style={{ borderColor: surface, color: `${ink}77` }}>
                    <Editable value={props?.location || '71 Wentworth Avenue · Sydney CBD'} onChange={(v) => onChange?.({ location: v })} />
                    <a href="#about" className="flex items-center gap-2 transition hover:opacity-60">
                        <Editable value={props?.scrollCta || 'Scroll to explore'} />
                        <ArrowDown size={13} />
                    </a>
                </div>
            </div>
        </section>
    );
}
