// @ts-nocheck
import { useState } from 'react';
import { Menu, X, Hexagon } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#0E1F1C';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#E8F0E5';
    const inkSecond = theme?.['ink-second'] || '#9FB5A8';
    const surface = theme?.surface || 'rgba(255,255,255,.06)';
    const accent = theme?.accent || '#E4B860';
    const [open, setOpen] = useState(false); const links = [['Studio', '#about'], ['Treatments', '#projects'], ['Voices', '#testimonials'], ['Connect', '#contact']];
    return <header className="sticky top-0 z-40 backdrop-blur-xl" style={{ backgroundColor: `${bg}cc`, color: ink, borderBottom: `1px solid ${accent}22` }}><div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"><a href="#top" className="flex items-center gap-2"><Hexagon size={18} style={{ color: accent }} /><Editable value={props?.brand || 'LUMEN'} onChange={(v) => onChange?.({ brand: v })} className="text-sm font-semibold tracking-[.35em]" /></a><nav className="hidden items-center gap-9 md:flex">{links.map(([label, href]) => <a href={href} key={href} className="text-[11px] uppercase tracking-[.2em] transition hover:opacity-60"><Editable value={label} /></a>)}</nav><a href="#contact" className="hidden rounded-full px-5 py-2 text-xs font-semibold transition hover:scale-[1.02] active:scale-95 md:block" style={{ border: `1px solid ${accent}`, color: accent }}><Editable value="Enquire" /></a><button className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>{open && <nav className="flex flex-col gap-4 px-6 pb-5 md:hidden">{links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)} className="text-sm"><Editable value={label} /></a>)}</nav>}</header>;
}
