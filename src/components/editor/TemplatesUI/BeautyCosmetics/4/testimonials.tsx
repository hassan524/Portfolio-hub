// @ts-nocheck
import { Quote, Star, Award } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#14302B';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#E8F0E5';
    const inkSecond = theme?.['ink-second'] || '#9FB5A8';
    const surface = theme?.surface || 'rgba(255,255,255,.06)';
    const accent = theme?.accent || '#E4B860';
    const reviews = (props?.reviews && props.reviews.length > 0) ? props.reviews : (props?.items && props.items.length > 0) ? props.items : [['“I have never had someone actually listen to my skin the way Lumen does. The Glow Facial changed my whole routine.”', 'Cameron D.'], ['“Calm, clinical, and genuinely kind. My skin has never looked more like itself.”', 'Sofia R.']];
    return <section id="testimonials" className="px-6 py-24" style={{ backgroundColor: bg, color: ink }}><div className="mx-auto max-w-6xl"><div className="flex items-center gap-3"><Award size={18} style={{ color: accent }} /><Editable value="VOICES" className="text-xs font-semibold tracking-[.3em]" style={{ color: accent }} /></div><div className="mt-10 grid gap-6 md:grid-cols-2">{reviews.map((review: any, index: number) => <article key={index} className="rounded-3xl p-8 md:p-12" style={{ backgroundColor: surface, border: `1px solid ${accent}22` }}><Quote size={28} style={{ color: accent }} /><Editable as="p" value={review[0]} className="mt-8 text-2xl font-light leading-tight tracking-[-.02em]" /><div className="mt-8 flex items-center gap-3"><div className="flex gap-1" style={{ color: accent }}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} fill="currentColor" />)}</div><Editable value={review[1]} className="text-sm" style={{ color: inkSecond }} /></div></article>)}</div><div className="mt-14 grid grid-cols-2 gap-6 border-t pt-8 sm:grid-cols-4" style={{ borderColor: `${accent}44` }}>{[['15', 'awards'], ['4.9', 'rating'], ['12k+', 'clients'], ['2016', 'founded']].map(([n, l]) => <div key={l}><Editable as="strong" value={n} className="text-3xl" style={{ color: accent }} /><Editable as="span" value={l} className="mt-1 block text-xs" style={{ color: inkSecond }} /></div>)}</div></div></section>;
}
