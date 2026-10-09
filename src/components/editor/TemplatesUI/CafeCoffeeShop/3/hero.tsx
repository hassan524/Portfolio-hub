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

    const ticker = ['Single origin', 'Fresh bread', 'Slow mornings', 'Roasted weekly', 'Open 7 days', 'Sydney CBD'];

    return (
        <section id="home" className="relative overflow-hidden px-5 pb-0 pt-32 sm:px-8" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
            <style>{`
                @keyframes hero-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes hero-pop { from { opacity: 0; transform: scale(.85) rotate(-6deg); } to { opacity: 1; transform: scale(1) rotate(0); } }
                @keyframes hero-line-x { from { transform: scaleX(0); } to { transform: scaleX(1); } }
                @keyframes hero-line-y { from { transform: scaleY(0); } to { transform: scaleY(1); } }
                @keyframes hero-steam { 0% { stroke-dashoffset: 40; opacity: 0; transform: translateY(8px); } 30% { opacity: .9; } 100% { stroke-dashoffset: 0; opacity: 0; transform: translateY(-16px); } }
                @keyframes hero-spin { to { transform: rotate(360deg); } }
                @keyframes hero-marquee { to { transform: translateX(-50%); } }
                @keyframes hero-pulse { 0%, 100% { transform: scale(1); opacity: .5; } 50% { transform: scale(1.12); opacity: 1; } }
                @keyframes hero-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
                .hero-rise { opacity: 0; animation: hero-rise .9s cubic-bezier(.2,.7,.2,1) forwards; }
                .hero-line-x { transform-origin: left; transform: scaleX(0); animation: hero-line-x 1.2s cubic-bezier(.6,0,.2,1) forwards; }
                .hero-line-y { transform-origin: top; transform: scaleY(0); animation: hero-line-y 1.6s cubic-bezier(.6,0,.2,1) forwards; }
                @media (prefers-reduced-motion: reduce) {
                    .hero-rise, .hero-line-x, .hero-line-y { animation: none; opacity: 1; transform: none; }
                    .hero-anim { animation: none !important; }
                }
            `}</style>

            {/* Decorative falling dots */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                {Array.from({ length: 14 }, (_, i) => (
                    <div
                        key={i}
                        className="hero-anim absolute rounded-full"
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

            {/* Architectural hairlines */}
            <div className="pointer-events-none absolute inset-0 z-0 mx-auto hidden max-w-6xl sm:block">
                {[0, 33.33, 66.66, 100].map((left, i) => (
                    <span
                        key={left}
                        className="hero-line-y absolute top-0 h-full w-px"
                        style={{ left: `${left}%`, backgroundColor: surface, animationDelay: `${0.2 + i * 0.18}s` }}
                    />
                ))}
                <span className="hero-line-x absolute left-0 top-[26%] h-px w-full" style={{ backgroundColor: surface, animationDelay: '0.9s' }} />
                <span className="hero-line-x absolute left-0 top-[78%] h-px w-full" style={{ backgroundColor: surface, animationDelay: '1.1s' }} />
            </div>

            {/* Soft glow */}
            <div
                className="hero-anim pointer-events-none absolute -right-24 top-24 z-0 h-80 w-80 rounded-full blur-3xl"
                style={{ backgroundColor: accent, opacity: 0.18, animation: 'hero-pulse 7s ease-in-out infinite' }}
            />

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="py-8 lg:py-20">
                        <div className="hero-rise mb-6 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em]" style={{ color: accent, animationDelay: '0.1s' }}>
                            <span className="hero-line-x h-px w-10" style={{ backgroundColor: accent, animationDelay: '0.3s' }} />
                            <Sparkles size={13} />
                            <Editable value={props?.eyebrow || 'A small coffee studio in Sydney'} onChange={(v) => onChange?.({ eyebrow: v })} />
                        </div>
                        <h1 className="hero-rise max-w-xl font-fraunces text-6xl leading-[0.88] tracking-[-0.06em] sm:text-8xl" style={{ animationDelay: '0.25s' }}>
                            <Editable value={props?.headline || 'Coffee for your everyday rituals.'} onChange={(v) => onChange?.({ headline: v })} />
                        </h1>
                        <span className="hero-line-x mt-7 block h-px w-24" style={{ backgroundColor: accent, animationDelay: '0.9s' }} />
                        <p className="hero-rise mt-6 max-w-sm text-sm leading-6" style={{ color: `${ink}99`, animationDelay: '0.5s' }}>
                            <Editable value={props?.subheadline || 'A gentle place for strong coffee, fresh bread, and the kind of morning you want to remember.'} onChange={(v) => onChange?.({ subheadline: v })} />
                        </p>
                        <div className="hero-rise mt-8 flex flex-wrap items-center gap-5" style={{ animationDelay: '0.7s' }}>
                            <a href="#projects" className="inline-flex items-center gap-3 rounded-full px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] transition hover:scale-[1.04] active:scale-95" style={{ backgroundColor: bgSecond, color: inkSecond }}>
                                <Editable value={props?.primaryCta || 'See what is brewing'} />
                                <ArrowUpRight size={14} style={{ color: accent }} />
                            </a>
                            <a href="#about" className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em]">
                                <span className="relative">
                                    <Editable value={props?.secondaryCta || 'Our story'} />
                                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-50 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="relative min-h-[450px] sm:min-h-[560px]">
                        <div className="motion-drift absolute right-0 top-0 h-[390px] w-[80%] rotate-3 overflow-hidden rounded-[2rem] border-8 shadow-2xl sm:h-[500px]" style={{ backgroundColor: bgSecond, borderColor: bgSecond }}>
                            <img className="hero-anim h-full w-full object-cover opacity-90" style={{ animation: 'hero-bob 9s ease-in-out infinite', transform: 'scale(1.08)' }} src={props?.heroImage || 'https://images.pexels.com/photos/15774297/pexels-photo-15774297.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1600'} />
                        </div>

                        {/* Rotating ring badge */}
                        <div className="absolute left-2 top-2 z-20 hidden h-28 w-28 place-items-center sm:grid" style={{ animation: 'hero-pop .9s .9s cubic-bezier(.2,.7,.2,1) both' }}>
                            <svg viewBox="0 0 120 120" className="hero-anim absolute inset-0 h-full w-full" style={{ animation: 'hero-spin 18s linear infinite' }}>
                                <defs><path id="hero-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
                                <circle cx="60" cy="60" r="58" fill={bg} stroke={surface} />
                                <text fontSize="9" letterSpacing="3.2" fill={ink} style={{ textTransform: 'uppercase' }}>
                                    <textPath href="#hero-ring">Fresh · Roasted · Daily · Fresh · Roasted · Daily ·</textPath>
                                </text>
                            </svg>
                            <span className="relative grid h-11 w-11 place-items-center rounded-full" style={{ backgroundColor: accent, color: bgSecond }}><Coffee size={18} /></span>
                        </div>

                        <div className="motion-drift-reverse absolute bottom-2 left-0 z-10 w-[62%] -rotate-6 rounded-[1.5rem] border p-5 shadow-xl sm:bottom-8" style={{ backgroundColor: bgSecond, borderColor: bg, color: inkSecond }}>
                            {/* Steam */}
                            <svg viewBox="0 0 60 40" className="pointer-events-none absolute -top-9 right-6 h-10 w-14" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
                                {[10, 28, 46].map((x, i) => (
                                    <path
                                        key={x}
                                        className="hero-anim"
                                        d={`M${x} 38 C ${x - 8} 28, ${x + 8} 20, ${x} 10 S ${x + 6} 2, ${x} 0`}
                                        strokeDasharray="40"
                                        style={{ animation: `hero-steam 3.2s ease-in-out ${i * 0.6}s infinite` }}
                                    />
                                ))}
                            </svg>
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
                        <div className="absolute right-0 top-1/2 hidden translate-y-8 rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.16em] sm:block" style={{ backgroundColor: bg, borderColor: surface, animation: 'hero-pop .8s 1.2s cubic-bezier(.2,.7,.2,1) both' }}>
                            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
                            <Editable value={props?.badge || 'Open 7 days'} />
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex items-center justify-between border-t pt-5 text-[9px] uppercase tracking-[0.18em]" style={{ borderColor: surface, color: `${ink}77` }}>
                    <Editable value={props?.location || '71 Wentworth Avenue · Sydney CBD'} onChange={(v) => onChange?.({ location: v })} />
                    <a href="#about" className="flex items-center gap-2 transition hover:opacity-60">
                        <Editable value={props?.scrollCta || 'Scroll to explore'} />
                        <ArrowDown size={13} className="hero-anim" style={{ animation: 'hero-bob 1.8s ease-in-out infinite' }} />
                    </a>
                </div>
            </div>

            {/* Marquee strip */}
            <div className="relative z-10 -mx-5 mt-10 overflow-hidden border-y py-4 sm:-mx-8" style={{ borderColor: surface, backgroundColor: bgSecond, color: inkSecond }}>
                <div className="hero-anim flex w-max gap-10 whitespace-nowrap" style={{ animation: 'hero-marquee 28s linear infinite' }}>
                    {[...ticker, ...ticker, ...ticker, ...ticker].map((item, i) => (
                        <span key={i} className="flex items-center gap-10 text-[10px] uppercase tracking-[0.22em]">
                            {item}
                            <Coffee size={12} style={{ color: accent }} />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}