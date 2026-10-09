// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote, Star } from 'lucide-react';
import { Editable } from '@/components/editor/ui/Editable';

const DEFAULT_ITEMS = [
  { quote: 'Morrow makes an ordinary Tuesday feel like the best part of the week. The coffee, the light, the people — all of it.', reviewer: 'Nora Chen', role: 'Neighbour' },
  { quote: 'The sourdough toast alone is worth the detour. I came for one coffee and stayed through the whole afternoon.', reviewer: 'Liam Ortega', role: 'Regular' },
  { quote: 'Easily the calmest room in the city. The team remembers your order and somehow makes you feel like a local on day one.', reviewer: 'Priya Nair', role: 'Visitor' },
  { quote: 'I bring every friend who visits Sydney here. The espresso is soft, sweet, and exactly what I want before work.', reviewer: 'Jack Thompson', role: 'Commuter' },
];

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || '#d9a477';
  const bgSecond = theme?.['bg-second'] || '#f1eadf';
  const ink = theme?.ink || '#382116';
  const inkSecond = theme?.['ink-second'] || '#382116';
  const surface = theme?.surface || 'rgba(56, 33, 22, 0.14)';
  const accent = theme?.accent || '#382116';
  const fontBody = theme?.fontBody || "Inter";

  const items = props?.items?.length ? props.items : DEFAULT_ITEMS;

  const autoplay = useRef(Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [autoplay.current]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="px-5 py-24 sm:px-8" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: `${ink}88` }}><Editable value={props?.label || 'Kind words'} /></p>
          <h2 className="mt-5 max-w-sm font-fraunces text-6xl leading-[0.9] tracking-[-0.05em] sm:text-8xl"><Editable value={props?.headline || 'The nicest part is you.'} /></h2>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 border-b pb-2 text-[10px] uppercase tracking-[0.16em]" style={{ borderColor: accent }}>
            <Editable value={props?.cta || 'Come say hello'} />
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="min-w-0">
          <div className="overflow-hidden rounded-[2rem]" ref={emblaRef}>
            <div className="flex">
              {items.map((item, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%]">
                  <div className="h-full rounded-[2rem] p-7 sm:p-10" style={{ backgroundColor: bgSecond }}>
                    <Quote size={26} style={{ color: bg }} />
                    <blockquote className="mt-10 max-w-xl font-fraunces text-3xl leading-[1] sm:text-5xl">
                      <Editable value={item.quote} />
                    </blockquote>
                    <div className="mt-10 flex items-end justify-between border-t pt-5 text-[9px] uppercase tracking-[0.16em]" style={{ borderColor: surface, color: `${inkSecond}88` }}>
                      <span>
                        <b className="mr-3 font-medium" style={{ color: inkSecond }}><Editable value={item.reviewer} /></b>
                        <Editable value={item.role || item.reviewerRole || ''} />
                      </span>
                      <span className="flex gap-1" style={{ color: bg }}>
                        {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={12} fill="currentColor" />)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: selected === i ? 28 : 8, backgroundColor: selected === i ? accent : `${ink}44` }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous" onClick={() => emblaApi?.scrollPrev()} className="grid h-10 w-10 place-items-center rounded-full border transition hover:scale-105 active:scale-95" style={{ borderColor: accent, color: ink }}>
                <ArrowLeft size={16} />
              </button>
              <button type="button" aria-label="Next" onClick={() => emblaApi?.scrollNext()} className="grid h-10 w-10 place-items-center rounded-full transition hover:scale-105 active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}