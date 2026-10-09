// @ts-nocheck
import { Star } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const DEFAULT_ITEMS = [
  { quote: 'Alex did not just design our brand, he gave us a point of view. Every single person on the team felt it the day it launched.', name: 'Sara Whitfield', role: 'Founder, Aster Coffee' },
  { quote: 'The calmest, sharpest designer we have ever worked with. Deadlines were met early and the work was better than we briefed.', name: 'Marcus Bell', role: 'Head of Product, Lumen' },
  { quote: 'Our design system finally feels like one product. Engineering adopted it in a week, which has honestly never happened before.', name: 'Priya Nair', role: 'CTO, Orbit Labs' },
  { quote: 'The launch film was the single best thing we shipped this year. People still message us about it months later.', name: 'Jonas Keller', role: 'Marketing Director, Nova' },
  { quote: 'Thoughtful, quick and a joy to collaborate with. He asks the questions that make the whole project better.', name: 'Aiko Tanaka', role: 'Creative Lead, Fieldnotes' },
  { quote: 'Our sign-ups more than doubled after the redesign. I would hire him again tomorrow, no hesitation.', name: 'Dan Ortiz', role: 'Owner, Pulse Studio' },
];

function Card({ item, ink, bg, accent, surface, head }: any) {
  const initials = (item.name || '').split(' ').map((w: string) => w[0]).slice(0, 2).join('');
  return (
    <figure className="m-0 w-[min(82vw,26rem)] shrink-0 rounded-3xl border p-7" style={{ borderColor: surface, backgroundColor: mix(ink, 4), color: ink }}>
      <div className="flex gap-1" style={{ color: accent }}>{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={13} fill="currentColor" />)}</div>
      <blockquote className="mt-5 text-lg leading-7 tracking-[-0.01em]" style={{ margin: 0 }}>
        <Editable value={item.quote} />
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full text-sm font-bold" style={{ backgroundColor: accent, color: bg, ...head }}>{initials}</span>
        <span>
          <span className="block text-sm font-semibold"><Editable value={item.name} /></span>
          <span className="block text-xs" style={{ color: mix(ink, 55) }}><Editable value={item.role} /></span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || 'Canvas';
  const ink = theme?.ink || 'CanvasText';
  const accent = theme?.accent || ink;
  const surface = theme?.surface || mix(ink, 14);
  const fontBody = theme?.fontBody;
  const fontHead = theme?.fontHeading || theme?.fontDisplay || fontBody;
  const head = { fontFamily: fontHead };

  const items = props?.items?.length ? props.items : DEFAULT_ITEMS;
  const half = Math.ceil(items.length / 2);
  const rowA = items.slice(0, half);
  const rowB = items.slice(half).length ? items.slice(half) : items;
  const fade = { maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' };

  return (
    <section id="testimonials" className="overflow-hidden py-28 lg:py-40" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
      <style>{`
                @keyframes tm-left { to { transform: translateX(-50%); } }
                @keyframes tm-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
                .tm-row:hover .tm-track { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) { .tm-track { animation: none !important; } }
            `}</style>

      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em]" style={{ color: accent }}>
              <span className="h-px w-12" style={{ backgroundColor: accent }} />
              <Editable value={props?.label || 'Kind words'} />
            </div>
            <h2 className="mt-6 max-w-3xl font-bold leading-[0.9] tracking-[-0.06em]" style={{ ...head, fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}>
              <Editable value={props?.headline || 'Loved by'} onChange={(v) => onChange?.({ headline: v })} />{' '}
              <span className="italic" style={{ color: accent }}><Editable value={props?.headlineAccent || 'brave clients.'} onChange={(v) => onChange?.({ headlineAccent: v })} /></span>
            </h2>
          </div>
          <div className="flex items-center gap-5 rounded-3xl border px-7 py-5" style={{ borderColor: surface }}>
            <p className="text-6xl font-bold tracking-[-0.06em]" style={head}><Editable value={props?.score || '5.0'} /></p>
            <div>
              <div className="flex gap-1" style={{ color: accent }}>{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={14} fill="currentColor" />)}</div>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em]" style={{ color: mix(ink, 60) }}><Editable value={props?.scoreLabel || 'Average from 40+ reviews'} /></p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-6">
        <div className="tm-row" style={fade}>
          <div className="tm-track flex w-max gap-6" style={{ animation: 'tm-left 60s linear infinite' }}>
            {[...rowA, ...rowA, ...rowA, ...rowA].map((it, i) => <Card key={i} item={it} ink={ink} bg={bg} accent={accent} surface={surface} head={head} />)}
          </div>
        </div>
        <div className="tm-row" style={fade}>
          <div className="tm-track flex w-max gap-6" style={{ animation: 'tm-right 70s linear infinite' }}>
            {[...rowB, ...rowB, ...rowB, ...rowB].map((it, i) => <Card key={i} item={it} ink={ink} bg={bg} accent={accent} surface={surface} head={head} />)}
          </div>
        </div>
      </div>
    </section>
  );
}