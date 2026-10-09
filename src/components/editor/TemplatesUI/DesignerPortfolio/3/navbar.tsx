// @ts-nocheck
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || 'Canvas';
  const bgSecond = theme?.['bg-second'] || bg;
  const ink = theme?.ink || 'CanvasText';
  const accent = theme?.accent || ink;
  const surface = theme?.surface || mix(ink, 14);
  const fontBody = theme?.fontBody;
  const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;

  const links = [
    ['Work', 'projects'],
    ['Services', 'services'],
    ['About', 'about'],
    ['Kind words', 'testimonials'],
  ];
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = [...links.map((l) => l[1]), 'contact'];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const glass = { backgroundColor: mix(bg, 70), borderColor: surface, color: ink };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6" style={{ fontFamily: fontBody }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {/* Brand */}
        <a href="#top" className="pointer-events-auto flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-5 backdrop-blur-xl transition hover:scale-[1.03]" style={glass}>
          <span className="grid h-9 w-9 place-items-center rounded-full text-xs font-bold tracking-tight" style={{ backgroundColor: accent, color: bg, fontFamily: fontHead }}>
            <Editable value={props?.initials || 'AM'} onChange={(v) => onChange?.({ initials: v })} />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block" style={{ fontFamily: fontHead }}>
            <Editable value={props?.brand || 'Alex Morgan'} onChange={(v) => onChange?.({ brand: v })} />
          </span>
        </a>

        {/* Pill nav */}
        <nav className="pointer-events-auto hidden items-center gap-1 rounded-full border p-1.5 backdrop-blur-xl md:flex" style={glass}>
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="relative rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: active === id ? bg : ink }}>
              {active === id && <motion.span layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} className="absolute inset-0 rounded-full" style={{ backgroundColor: accent }} />}
              <span className="relative"><Editable value={label} /></span>
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="pointer-events-auto flex items-center gap-2">
          <a href="#contact" className="group hidden items-center gap-2 rounded-full py-1.5 pl-5 pr-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition hover:scale-[1.04] sm:inline-flex" style={{ backgroundColor: bgSecond, color: theme?.['ink-second'] || bg }}>
            <Editable value={props?.cta || 'Hire me'} />
            <span className="grid h-8 w-8 place-items-center rounded-full transition group-hover:rotate-45" style={{ backgroundColor: accent, color: bg }}><ArrowUpRight size={14} /></span>
          </a>
          <button type="button" aria-label="Menu" onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border backdrop-blur-xl md:hidden" style={glass}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            className="pointer-events-auto mx-auto mt-3 max-w-7xl rounded-3xl border p-3 backdrop-blur-2xl md:hidden"
            style={{ backgroundColor: mix(bg, 92), borderColor: surface, color: ink }}
          >
            {[...links, ['Contact', 'contact']].map(([label, id], i) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-4 text-2xl font-bold tracking-[-0.04em]" style={{ fontFamily: fontHead, backgroundColor: active === id ? surface : 'transparent' }}>
                {label}
                <span className="text-xs tracking-widest" style={{ color: accent }}>0{i + 1}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}