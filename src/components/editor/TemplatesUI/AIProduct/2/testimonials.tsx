// @ts-nocheck
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const ITEMS = [
  { quote: "The cleanest crypto platform I've used. Real-time data, honest fees, and I finally understand what my portfolio is doing.", name: "Daniel Foster", role: "Retail investor" },
  { quote: "Security was my biggest worry. Self-custody plus multi-sig protection let me move my savings with confidence.", name: "Aisha Rahman", role: "Product designer" },
  { quote: "Execution is genuinely fast. During last month's volatility my orders still filled instantly at the price I expected.", name: "Marco Bellini", role: "Part-time trader" },
  { quote: "Staking vaults made it easy to earn on assets I was just holding. Transparent, simple, and no surprises.", name: "Lena Kowalski", role: "Software engineer" },
];

export function AIProduct2Testimonials({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#050505";
  const ink = theme?.ink || "#ffffff";
  const accent = theme?.accent || "#F7931A";
  const line = mix(ink, 12);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })]);
  const [sel, setSel] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const on = () => setSel(emblaApi.selectedScrollSnap());
    on();
    emblaApi.on("select", on);
    return () => { emblaApi.off("select", on); };
  }, [emblaApi]);

  const btn = "h-11 w-11 rounded-full grid place-items-center border cursor-pointer transition-all hover:bg-white/10 active:scale-95";

  return (
    <section id="testimonials" className="relative w-full px-6 py-28 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink, borderTop: `1px solid ${line}` }}>
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full blur-[140px] pointer-events-none" style={{ background: accent, opacity: 0.07 }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <Editable as="span" className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-5" style={{ borderColor: line, color: mix(ink, 75), backgroundColor: mix(ink, 5) }}>Reviews</Editable>
            <Editable as="h2" className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]" style={{ color: ink }}>Loved by investors worldwide</Editable>
          </div>
          <div className="flex gap-2">
            <button aria-label="Previous" onClick={() => emblaApi?.scrollPrev()} className={btn} style={{ borderColor: line, color: ink }}><ChevronLeft className="h-4 w-4" /></button>
            <button aria-label="Next" onClick={() => emblaApi?.scrollNext()} className={btn} style={{ borderColor: line, color: ink }}><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing -mx-2.5">
          <div className="flex">
            {ITEMS.map((t) => (
              <div key={t.name} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%] min-w-0 px-2.5">
                <div className="h-full p-8 rounded-3xl border flex flex-col justify-between gap-8" style={{ borderColor: line, backgroundColor: mix(ink, 4) }}>
                  <div>
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: 5 }).map((_, s) => (<Star key={s} className="h-4 w-4 fill-current" style={{ color: accent }} />))}
                    </div>
                    <Editable as="p" className="text-base leading-relaxed" style={{ color: mix(ink, 88) }}>{t.quote}</Editable>
                  </div>
                  <div className="flex items-center gap-3.5 pt-6 border-t" style={{ borderColor: line }}>
                    <div className="h-11 w-11 rounded-full grid place-items-center text-xs font-bold shrink-0" style={{ backgroundColor: ink, color: bg }}>
                      {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <Editable as="div" className="font-semibold text-sm" style={{ color: ink }}>{t.name}</Editable>
                      <Editable as="div" className="text-xs" style={{ color: mix(ink, 55) }}>{t.role}</Editable>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-1.5">
          {ITEMS.map((_, i) => (
            <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => emblaApi?.scrollTo(i)} className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
              style={{ width: sel === i ? 22 : 6, background: sel === i ? ink : mix(ink, 25) }} />
          ))}
        </div>
      </div>
    </section>
  );
}