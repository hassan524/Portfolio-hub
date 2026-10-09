// @ts-nocheck
import { Coffee, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#11100d';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#f6f0e6';
    const inkSecond = theme?.['ink-second'] || ink;
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.12)';
    const accent = theme?.accent || '#c89c5a';
  const fontBody = theme?.fontBody || "Inter";
    const [open, setOpen] = useState(false);
    const links = [['About', '#about'], ['Our coffee', '#projects'], ['Inside the room', '#testimonials'], ['Visit', '#contact']];
    return <header className="absolute inset-x-0 top-0 z-50 px-6 py-6 lg:px-12"><nav className="mx-auto flex max-w-[1400px] items-center justify-between"><a href="#home" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: surface, color: accent }}><Coffee size={18} /></span><span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: ink }}><Editable value={props?.brand || 'Bean & Bloom'} onChange={(v) => onChange?.({ brand: v })} /><small className="mt-1 block text-[7px] tracking-[0.35em]" style={{ color: `${ink}77` }}><Editable value={props?.brandSub || 'Coffee House'} /></small></span></a><div className="hidden items-center gap-8 lg:flex">{links.map(([label, href]) => <a key={href} href={href} className="text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-[#c89c5a]" style={{ color: `${ink}cc` }}><Editable value={label} /></a>)}<a href="#contact" className="rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition hover:scale-[1.02] active:scale-95" style={{ borderColor: accent, color: accent }}><Editable value={props?.cta || 'Come in'} /></a></div><button type="button" className="grid h-10 w-10 place-items-center rounded-full border lg:hidden" style={{ borderColor: surface, color: ink }} onClick={() => setOpen(!open)}>{open ? <X size={17} /> : <Menu size={17} />}</button></nav>{open && <div className="mx-auto mt-5 max-w-[1400px] rounded-2xl border p-5 lg:hidden" style={{ backgroundColor: bgSecond, borderColor: surface }}>{links.map(([label, href]) => <a onClick={() => setOpen(false)} key={href} href={href} className="block border-b py-4 text-[10px] uppercase tracking-[0.2em] last:border-0" style={{ borderColor: surface, color: ink }}><Editable value={label} /></a>)}</div>}</header>;
}
