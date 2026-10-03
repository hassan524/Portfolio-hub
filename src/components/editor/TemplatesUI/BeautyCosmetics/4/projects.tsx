// @ts-nocheck
import { ArrowUpRight } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Projects({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0E1F1C';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#E8F0E5';
    const inkSecond = theme?.['ink-second'] || '#9FB5A8';
    const surface = theme?.surface || 'rgba(255,255,255,.06)';
    const accent = theme?.accent || '#E4B860';
    const items = (props?.items && props.items.length > 0) ? props.items : [{ title: 'The Glow Facial', copy: 'A signature resurfacing facial for immediate radiance.', price: 'from $120', image: 'https://images.unsplash.com/photo-1570172619644-d6a3f6c4c6c1?auto=format&fit=crop&w=900&q=85' }, { title: 'LED Light Therapy', copy: 'Calming light treatment for redness and repair.', price: 'from $85', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85' }, { title: 'Brow Architecture', copy: 'Precision shaping and tinting for a natural lift.', price: 'from $65', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85' }];
    return <section id="projects" className="px-6 py-24" style={{ backgroundColor: bg, color: ink }}><div className="mx-auto max-w-6xl"><div className="text-center"><Editable value="THE TREATMENTS" className="text-xs font-semibold tracking-[.3em]" style={{ color: accent }} /><Editable as="h2" value="Signature services" className="mt-4 text-4xl font-light tracking-[-.03em] md:text-5xl" /></div><div className="mt-14 grid gap-6 md:grid-cols-3">{items.map((item: any, index: number) => <article key={index} className="group overflow-hidden rounded-[1.5rem] transition hover:-translate-y-1" style={{ backgroundColor: surface, border: `1px solid ${accent}22` }}><div className="overflow-hidden"><img src={item.image} alt={item.title} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-6"><div className="flex items-start justify-between gap-4"><Editable as="h3" value={item.title} onChange={(v) => { const next = [...items]; next[index] = { ...item, title: v }; onChange?.({ items: next }) }} className="text-lg font-semibold" /><ArrowUpRight size={18} style={{ color: accent }} /></div><Editable as="p" value={item.copy} className="mt-2 text-sm leading-6" style={{ color: inkSecond }} /><Editable value={item.price} className="mt-5 block text-sm font-semibold" style={{ color: accent }} /></div></article>)}</div></div></section>;
}
