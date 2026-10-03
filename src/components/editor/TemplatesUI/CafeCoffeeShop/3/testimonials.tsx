// @ts-nocheck
import { ArrowUpRight, Quote, Star } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#d9a477';
    const bgSecond = theme?.['bg-second'] || '#f1eadf';
    const ink = theme?.ink || '#382116';
    const inkSecond = theme?.['ink-second'] || '#382116';
    const surface = theme?.surface || 'rgba(56, 33, 22, 0.14)';
    const accent = theme?.accent || '#382116';
  const fontBody = theme?.fontBody || "Inter";
    return <section id="testimonials" className="px-5 py-24 sm:px-8" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><div><p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: `${ink}88` }}><Editable value={props?.label || 'Kind words'} /></p><h2 className="mt-5 max-w-sm font-fraunces text-6xl leading-[0.9] tracking-[-0.05em] sm:text-8xl"><Editable value={props?.headline || 'The nicest part is you.'} /></h2><a href="#contact" className="mt-8 inline-flex items-center gap-2 border-b pb-2 text-[10px] uppercase tracking-[0.16em]" style={{ borderColor: accent }}><Editable value={props?.cta || 'Come say hello'} /><ArrowUpRight size={13} /></a></div><div className="rounded-[2rem] p-7 sm:p-10" style={{ backgroundColor: bgSecond }}><Quote size={26} style={{ color: bg }} /><blockquote className="mt-10 max-w-xl font-fraunces text-4xl leading-[0.98] sm:text-5xl"><Editable value={props?.quote || 'Morrow makes an ordinary Tuesday feel like the best part of the week. The coffee, the light, the people — all of it.'} onChange={(v) => onChange?.({ quote: v })} /></blockquote><div className="mt-10 flex items-end justify-between border-t pt-5 text-[9px] uppercase tracking-[0.16em]" style={{ borderColor: surface, color: `${inkSecond}88` }}><span><b className="mr-3 font-medium" style={{ color: inkSecond }}><Editable value={props?.reviewer || 'Nora Chen'} /></b><Editable value={props?.reviewerRole || 'Neighbour'} /></span><span className="flex gap-1" style={{ color: bg }}>{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={12} fill="currentColor" />)}</span></div></div></div></section>;
}
