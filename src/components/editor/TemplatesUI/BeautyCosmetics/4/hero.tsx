// @ts-nocheck
import { ArrowDown, Star } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0E1F1C';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#E8F0E5';
    const inkSecond = theme?.['ink-second'] || '#9FB5A8';
    const surface = theme?.surface || 'rgba(255,255,255,.06)';
    const accent = theme?.accent || '#E4B860';
    return <section id="top" className="relative overflow-hidden px-6 py-24 md:py-32" style={{ backgroundColor: bg, color: ink }}><div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full blur-[120px]" style={{ backgroundColor: `${accent}25` }} /><div className="relative mx-auto max-w-4xl text-center"><div className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs" style={{ backgroundColor: surface, color: inkSecond }}><Star size={13} fill={accent} style={{ color: accent }} /><Editable value="Award-winning aesthetic studio" /></div><Editable as="h1" value={props?.headline || 'Where beauty meets intention.'} onChange={(v) => onChange?.({ headline: v })} className="text-5xl font-light leading-[1.02] tracking-[-.04em] md:text-8xl" /><Editable as="p" value={props?.subheadline || 'Lumen is a beauty and skincare studio crafting treatments that reveal, never mask. Considered care for skin that speaks for itself.'} onChange={(v) => onChange?.({ subheadline: v })} className="mx-auto mt-8 max-w-xl text-base leading-7" style={{ color: inkSecond }} /><div className="mt-10 flex flex-wrap justify-center gap-4"><a href="#projects" className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}><Editable value="Explore treatments" /><ArrowDown size={16} /></a><a href="#about" className="text-sm underline underline-offset-4"><Editable value="Our philosophy" /></a></div></div><div className="relative mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">{[['12k+', 'treatments'], ['98%', 'satisfaction'], ['15', 'awards'], ['4.9', 'rating']].map(([n, l]) => <div key={l} className="rounded-2xl p-5 text-center" style={{ backgroundColor: surface }}><Editable as="strong" value={n} className="text-2xl" style={{ color: accent }} /><Editable as="span" value={l} className="mt-1 block text-xs" style={{ color: inkSecond }} /></div>)}</div></section>;
}
