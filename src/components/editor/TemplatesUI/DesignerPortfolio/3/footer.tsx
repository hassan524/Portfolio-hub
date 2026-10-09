// @ts-nocheck
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || 'Canvas';
  const ink = theme?.ink || 'CanvasText';
  const accent = theme?.accent || ink;
  const surface = theme?.surface || mix(ink, 14);
  const fontBody = theme?.fontBody;
  const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;

  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      let opts: any = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      try {
        setTime(new Date().toLocaleTimeString([], props?.timezone ? { ...opts, timeZone: props.timezone } : opts));
      } catch {
        setTime(new Date().toLocaleTimeString([], opts));
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [props?.timezone]);

  const nav = [['Work', '#projects'], ['Services', '#services'], ['About', '#about'], ['Contact', '#contact']];
  const socials = props?.socials || [['Instagram', '#'], ['Dribbble', '#'], ['Behance', '#'], ['LinkedIn', '#']];

  return (
    <footer className="relative overflow-hidden px-5 pt-24 lg:px-10" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl">
        <h2 className="font-bold leading-[0.85] tracking-[-0.07em]" style={{ fontFamily: fontHead, fontSize: 'clamp(3.2rem, 10vw, 9.5rem)' }}>
          <Editable value={props?.sign || 'Thanks for'} onChange={(v) => onChange?.({ sign: v })} />{' '}
          <span className="italic" style={{ color: accent }}><Editable value={props?.signAccent || 'stopping by.'} onChange={(v) => onChange?.({ signAccent: v })} /></span>
        </h2>

        <div className="mt-20 grid gap-12 border-t pt-12 sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: surface }}>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: mix(ink, 50) }}>Based in</p>
            <p className="mt-4 text-lg"><Editable value={props?.location || 'Lisbon, Portugal'} /></p>
            <p className="mt-1 font-mono text-sm tabular-nums" style={{ color: accent }}>{time}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: mix(ink, 50) }}>Navigate</p>
            <ul className="mt-4 space-y-3">
              {nav.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="group relative inline-block text-sm"><Editable value={label} />
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: mix(ink, 50) }}>Elsewhere</p>
            <ul className="mt-4 space-y-3">
              {socials.map(([label, href], i) => (
                <li key={i}>
                  <a href={href} className="group relative inline-block text-sm"><Editable value={label} />
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex lg:justify-end">
            <a href="#top" className="group inline-flex h-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <Editable value={props?.topLabel || 'Back to top'} />
              <span className="grid h-12 w-12 place-items-center rounded-full transition group-hover:-translate-y-1" style={{ backgroundColor: accent, color: bg }}><ArrowUp size={18} /></span>
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t py-6 text-[10px] uppercase tracking-[0.25em] sm:flex-row" style={{ borderColor: surface, color: mix(ink, 50) }}>
          <Editable value={props?.copyright || '© 2026 Alex Morgan'} onChange={(v) => onChange?.({ copyright: v })} />
          <Editable value={props?.credit || 'Designed with love & too much coffee'} />
        </div>
      </div>
    </footer>
  );
}