// @ts-nocheck
import { Sparkles, ShieldCheck, HandHeart } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function About({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0E1F1C';
    const bgSecond = theme?.['bg-second'] || '#14302B';
    const ink = theme?.ink || '#E8F0E5';
    const inkSecond = theme?.['ink-second'] || '#9FB5A8';
    const surface = theme?.surface || 'rgba(255,255,255,.06)';
    const accent = theme?.accent || '#E4B860';
    const values = [['Considered craft', 'Every treatment is tailored, never templated.', Sparkles], ['Clean promise', 'No shortcuts, no harsh actives, ever.', ShieldCheck], ['Gentle by design', 'Skin-first techniques that build lasting health.', HandHeart]];
    return <section id="about" className="px-6 py-24" style={{ backgroundColor: bgSecond, color: ink }}><div className="mx-auto max-w-6xl"><div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center"><div className="relative"><img src={props?.aboutImage || 'https://images.unsplash.com/photo-1560066984-c2393c2e3024?auto=format&fit=crop&w=1000&q=85'} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl" alt="Studio interior" /><div className="absolute -bottom-5 -right-5 rounded-2xl p-5" style={{ backgroundColor: bg, border: `1px solid ${accent}44` }}><Editable as="strong" value="Est. 2016" className="text-lg" style={{ color: accent }} /><Editable as="span" value="in Brooklyn" className="mt-1 block text-xs" style={{ color: inkSecond }} /></div></div><div><Editable value="THE STUDIO" className="text-xs font-semibold tracking-[.3em]" style={{ color: accent }} /><Editable as="h2" value={props?.title || 'Beauty, distilled to its essence.'} onChange={(v) => onChange?.({ title: v })} className="mt-5 text-4xl font-light leading-tight tracking-[-.03em] md:text-5xl" /><Editable as="p" value={props?.story || 'Lumen was founded on a simple idea: great skin is built, not bought. Our studio blends clinical precision with a calm, unhurried atmosphere so every visit feels like a reset.'} onChange={(v) => onChange?.({ story: v })} className="mt-6 max-w-lg leading-7" style={{ color: inkSecond }} /><div className="mt-10 space-y-5">{values.map(([title, copy, Icon]) => <div key={title} className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: surface }}><Icon size={20} style={{ color: accent }} /></div><div><Editable as="h3" value={title} className="text-base font-semibold" /><Editable as="p" value={copy} className="mt-1 text-sm leading-6" style={{ color: inkSecond }} /></div></div>)}</div></div></div></div></section>;
}
