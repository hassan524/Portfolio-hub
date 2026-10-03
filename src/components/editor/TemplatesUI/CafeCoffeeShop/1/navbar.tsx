// @ts-nocheck
import { Coffee, Menu, X, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Editable } from '@/components/editor/ui/Editable';

export function Navbar({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || '#24140d';
    const bgSecond = theme?.['bg-second'] || bg;
    const ink = theme?.ink || '#fff9f0';
    const inkSecond = theme?.['ink-second'] || ink;
    const surface = theme?.surface || 'rgba(255, 255, 255, 0.08)';
    const accent = theme?.accent || '#e1a66b';
  const fontBody = theme?.fontBody || "Inter";
    const [open, setOpen] = useState(false);
    const links = [['Home', '#home'], ['Story', '#about'], ['Menu', '#projects'], ['Journal', '#testimonials'], ['Visit', '#contact']];
    return <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8" style={{ color: ink , fontFamily: fontBody }}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 backdrop-blur-xl" style={{ backgroundColor: `${bg}cc`, borderColor: surface }}>
            <a href="#home" className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-full" style={{ backgroundColor: accent, color: bg }}><Coffee size={17} /></span><span className="font-fraunces text-lg tracking-tight"><Editable value={props?.brand || 'STC Coffee'} onChange={(v) => onChange?.({ brand: v })} /></span></a>
            <div className="hidden items-center gap-7 md:flex">{links.map(([label, href]) => <a key={href} href={href} className="text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-60"><Editable value={props?.nav?.[label] || label} /></a>)}</div>
            <a href="#contact" className="hidden items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition hover:scale-[1.02] active:scale-95 sm:flex" style={{ backgroundColor: accent, color: bg }}><Editable value={props?.navCta || 'Find a table'} /><ArrowUpRight size={14} /></a>
            <button type="button" onClick={() => setOpen(!open)} className="grid h-9 w-9 place-items-center rounded-full md:hidden" style={{ backgroundColor: surface }}>{open ? <X size={17} /> : <Menu size={17} />}</button>
        </nav>
        {open && <div className="mx-auto mt-2 max-w-7xl rounded-3xl border p-4 backdrop-blur-xl md:hidden" style={{ backgroundColor: bgSecond, borderColor: surface }}>{links.map(([label, href]) => <a onClick={() => setOpen(false)} key={href} href={href} className="block border-b py-3 text-xs uppercase tracking-[0.18em] last:border-0" style={{ borderColor: surface }}><Editable value={label} /></a>)}</div>}
    </header>;
}
