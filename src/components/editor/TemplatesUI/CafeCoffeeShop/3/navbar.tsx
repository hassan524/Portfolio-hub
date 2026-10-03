// @ts-nocheck
import { ArrowUpRight, Coffee, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#f1eadf';
    const bgSecond = theme?.['bg-second'] || '#382116';
    const ink = theme?.ink || '#382116';
    const inkSecond = theme?.['ink-second'] || '#f1eadf';
    const surface = theme?.surface || 'rgba(56, 33, 22, 0.14)';
    const accent = theme?.accent || '#c98a50';
  const fontBody = theme?.fontBody || "Inter";
    const [open, setOpen] = useState(false);
    const links = [['Home', '#home'], ['Story', '#about'], ['Menu', '#projects'], ['Notes', '#testimonials'], ['Visit', '#contact']];
    return <header className="absolute inset-x-0 top-0 z-50 px-5 py-5 sm:px-8"><nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 sm:px-5" style={{ backgroundColor: `${bg}e8`, borderColor: surface, color: ink }}><a href="#home" className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-full" style={{ backgroundColor: bgSecond, color: accent }}><Coffee size={15} /></span><span className="text-[10px] font-semibold uppercase tracking-[0.18em]"><Editable value={props?.brand || 'Morrow'} onChange={(v) => onChange?.({ brand: v })} /></span></a><div className="hidden items-center gap-5 md:flex">{links.map(([label, href]) => <a key={href} href={href} className="text-[10px] uppercase tracking-[0.14em] transition hover:opacity-50"><Editable value={label} /></a>)}</div><a href="#contact" className="hidden items-center gap-2 rounded-full px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] sm:flex" style={{ backgroundColor: bgSecond, color: inkSecond }}><Editable value={props?.cta || 'Visit us'} /><ArrowUpRight size={12} style={{ color: accent }} /></a><button type="button" onClick={() => setOpen(!open)} className="grid h-8 w-8 place-items-center rounded-full md:hidden" style={{ backgroundColor: bgSecond, color: inkSecond }}>{open ? <X size={15} /> : <Menu size={15} />}</button></nav>{open && <div className="mx-auto mt-2 max-w-6xl rounded-2xl border p-4 md:hidden" style={{ backgroundColor: bgSecond, borderColor: surface, color: inkSecond }}>{links.map(([label, href]) => <a key={href} onClick={() => setOpen(false)} href={href} className="block border-b py-3 text-[10px] uppercase tracking-[0.16em] last:border-0" style={{ borderColor: `${inkSecond}22` }}><Editable value={label} /></a>)}</div>}</header>;
}
