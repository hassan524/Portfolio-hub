// @ts-nocheck
import { Coffee, Heart, Leaf, Sun, Users, Clock, Sprout, Flame, CupSoda } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || '#382116';
  const bgSecond = theme?.['bg-second'] || '#f1eadf';
  const ink = theme?.ink || '#f1eadf';
  const inkSecond = theme?.['ink-second'] || '#382116';
  const surface = theme?.surface || 'rgba(241, 234, 223, 0.14)';
  const accent = theme?.accent || '#c98a50';
  const fontBody = theme?.fontBody || "Inter";

  const points = [
    { icon: Leaf, title: 'Good ingredients', text: 'Seasonal, local, and always worth talking about. We buy from growers and bakers we know by name, and we change the menu when the weather does.' },
    { icon: Heart, title: 'Good energy', text: 'A warm room for regulars, visitors, and first dates. Sit at the bar, take the window seat, or stay long enough that we learn your order.' },
    { icon: Sun, title: 'Good timing', text: 'Morning light, afternoon cake, and no reason to hurry. Nothing here is rushed, and nothing is made before it is needed.' },
  ];

  const journey = [
    { icon: Sprout, time: 'Sourcing', title: 'Beans with a story', text: 'Every crop is tasted at the farm level before we say yes. We keep our list short so we can keep our promises.' },
    { icon: Flame, time: 'Roasting', title: 'Roasted weekly, in small batches', text: 'Small batches mean fresher cups. We roast light enough to taste the origin and dark enough to feel like comfort.' },
    { icon: CupSoda, time: 'Brewing', title: 'Poured with patience', text: 'Dialled in every morning, adjusted through the day. If it is not right, we make it again.' },
    { icon: Coffee, time: 'Sharing', title: 'Handed over with a smile', text: 'The last step is the one that matters most: a good cup, put in good hands, at the right moment.' },
  ];

  const stats = [
    ['07', 'days open'],
    ['03', 'daily rituals'],
    ['18', 'house beans'],
    ['∞', 'reasons to return'],
  ];

  const sectionCls = 'px-5 py-24 sm:px-8';

  return (
    <>
      {/* 1 — Story */}
      <section id="about" className={sectionCls} style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.22em]" style={{ color: `${ink}77` }}>
            <span className="h-px w-12" style={{ backgroundColor: surface }} />
            <Coffee size={14} style={{ color: accent }} />
            <Editable value={props?.divider || 'Take the long way'} />
            <span className="h-px w-12" style={{ backgroundColor: surface }} />
          </div>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.label || 'Our point of view'} /></p>
              <h2 className="mt-5 max-w-md font-fraunces text-6xl leading-[0.9] tracking-[-0.05em] sm:text-8xl">
                <Editable value={props?.headline || 'Little details. Big feeling.'} onChange={(v) => onChange?.({ headline: v })} />
              </h2>
            </div>
            <div>
              <p className="max-w-lg text-base leading-7" style={{ color: `${ink}99` }}>
                <Editable value={props?.story || 'Morrow is a tiny coffee studio with a generous point of view. We care about the crop, the crumb, the playlist, and the pause between one thing and the next.'} onChange={(v) => onChange?.({ story: v })} />
              </p>
              <p className="mt-5 max-w-lg text-sm leading-7" style={{ color: `${ink}88` }}>
                <Editable value={props?.story2 || 'We opened in the middle of the city because we wanted a place that slowed it down a little. A room with good light, a short menu done properly, and a counter where nobody minds if you stay for a second cup.'} onChange={(v) => onChange?.({ story2: v })} />
              </p>
              <p className="mt-5 max-w-lg text-sm leading-7" style={{ color: `${ink}88` }}>
                <Editable value={props?.story3 || 'Everything here is made in small amounts and meant to be shared: the bread, the beans, the playlist, and the best table by the window.'} onChange={(v) => onChange?.({ story3: v })} />
              </p>
              <div className="mt-8 flex items-center gap-3 text-xs" style={{ color: `${ink}bb` }}>
                <span className="grid h-9 w-9 place-items-center rounded-full" style={{ backgroundColor: accent, color: bg }}><Users size={15} /></span>
                <Editable value={props?.teamLine || 'Made by a small team with big care.'} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Values */}
      <section className={sectionCls} style={{ backgroundColor: bgSecond, color: inkSecond, fontFamily: fontBody }}>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 border-b pb-8 sm:flex-row sm:items-end" style={{ borderColor: `${inkSecond}22` }}>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.valuesLabel || 'What we believe'} /></p>
              <h2 className="mt-4 font-fraunces text-5xl tracking-[-0.05em] sm:text-7xl"><Editable value={props?.valuesHeadline || 'Three small promises.'} /></h2>
            </div>
            <p className="max-w-xs text-sm leading-6" style={{ color: `${inkSecond}99` }}>
              <Editable value={props?.valuesIntro || 'They are simple, a little stubborn, and the reason the door is open every morning.'} />
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {points.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[1.5rem] border p-7 transition hover:-translate-y-1" style={{ borderColor: `${inkSecond}22` }}>
                <span className="grid h-11 w-11 place-items-center rounded-full" style={{ backgroundColor: inkSecond, color: accent }}><Icon size={18} /></span>
                <h3 className="mt-14 font-fraunces text-3xl"><Editable value={title} /></h3>
                <p className="mt-3 text-sm leading-6" style={{ color: `${inkSecond}99` }}><Editable value={text} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Journey */}
      <section className={sectionCls} style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl">
            <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.journeyLabel || 'From farm to cup'} /></p>
            <h2 className="mt-4 font-fraunces text-5xl leading-[0.95] tracking-[-0.05em] sm:text-7xl"><Editable value={props?.journeyHeadline || 'Every cup has a journey.'} /></h2>
            <p className="mt-5 text-sm leading-7" style={{ color: `${ink}88` }}>
              <Editable value={props?.journeyIntro || 'Four steps, each done with the same care. This is how a bean becomes your morning.'} />
            </p>
          </div>
          <div className="relative mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ backgroundColor: surface }}>
            {journey.map(({ icon: Icon, time, title, text }, i) => (
              <div key={title} className="p-7" style={{ backgroundColor: bg }}>
                <div className="flex items-center justify-between">
                  <Icon size={20} style={{ color: accent }} />
                  <span className="font-fraunces text-4xl" style={{ color: `${ink}22` }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-10 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em]" style={{ color: accent }}><Clock size={11} /><Editable value={time} /></p>
                <h3 className="mt-3 font-fraunces text-2xl leading-tight"><Editable value={title} /></h3>
                <p className="mt-3 text-sm leading-6" style={{ color: `${ink}88` }}><Editable value={text} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Numbers */}
      <section className="px-5 py-16 sm:px-8" style={{ backgroundColor: accent, color: bg, fontFamily: fontBody }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map(([n, label]) => (
            <div key={label} className="border-l pl-5" style={{ borderColor: `${bg}33` }}>
              <p className="font-fraunces text-6xl tracking-[-0.04em]">{n}</p>
              <p className="mt-2 text-[9px] uppercase tracking-[0.17em]" style={{ color: `${bg}bb` }}><Editable value={label} /></p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}