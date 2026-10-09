// @ts-nocheck
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const VOICES = [
  { q: "Alex turned a pile of research prototypes into a product our operators use every single day. Rare mix of rigour and taste.", n: "Sarah Jenkins", r: "VP of AI Engineering, Sceneland" },
  { q: "The interface work alone saved us months. Every state of the model, including the failures, felt considered and honest.", n: "Marcus Vance", r: "Chief Technology Officer, Nornole" },
  { q: "Shipped our agent platform ahead of schedule, with guardrails we could actually explain to our legal team.", n: "Elena Rostova", r: "Head of Product, Walker Tech" },
  { q: "Calm in a crisis, sharp in a review, and someone I'd hire again tomorrow without a second thought.", n: "Daniel Okafor", r: "Founder, Lumen Studio" },
];

export function AIProduct3Testimonials({ theme }: BlockComponentProps<any>) {
  const bg2 = theme?.["bg-second"] || "#FFF5F8";
  const ink2 = theme?.["ink-second"] || "#1E0C17";
  const accent = theme?.accent || "#FF3B76";
  const line = mix(ink2, 14);

  const [ref, api] = useEmblaCarousel({ loop: true, duration: 30 }, [Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: true })]);
  const [sel, setSel] = useState(0);
  useEffect(() => {
    if (!api) return;
    const on = () => setSel(api.selectedScrollSnap());
    on();
    api.on("select", on);
    return () => { api.off("select", on); };
  }, [api]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const arrow = "h-12 w-12 rounded-full grid place-items-center border cursor-pointer transition-all hover:scale-105 active:scale-95";

  return (
    <section id="testimonials" className="relative w-full overflow-hidden transition-colors" style={{ backgroundColor: bg2, color: ink2 }}>
      {/* giant quote glyph */}
      <svg viewBox="0 0 24 24" className="absolute -left-6 top-10 w-72 sm:w-[28rem] h-auto pointer-events-none" fill={accent} opacity="0.09" aria-hidden>
        <path d="M9.4 5C6 6.6 3.5 9.6 3.5 14c0 2.8 1.7 4.7 4 4.7 2 0 3.5-1.5 3.5-3.4 0-1.9-1.4-3.2-3.2-3.2-.3 0-.6 0-.8.1.3-2 1.7-3.8 3.7-4.8L9.4 5Zm9 0c-3.4 1.6-5.9 4.6-5.9 9 0 2.8 1.7 4.7 4 4.7 2 0 3.5-1.5 3.5-3.4 0-1.9-1.4-3.2-3.2-3.2-.3 0-.6 0-.8.1.3-2 1.7-3.8 3.7-4.8L18.4 5Z" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-28 sm:py-36">
        <div className="flex items-center gap-3 mb-14">
          <span className="h-px w-10" style={{ background: accent }} />
          <Editable as="span" className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: accent }}>(03) Kind words</Editable>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* index column with names as a vertical list */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="text-7xl sm:text-8xl font-black tracking-tighter leading-none" style={{ color: accent }}>{pad(sel + 1)}</div>
            <div className="mt-2 text-sm font-mono" style={{ color: mix(ink2, 50) }}>/ {pad(VOICES.length)}</div>
            <div className="mt-10 flex flex-col">
              {VOICES.map((v, i) => (
                <button key={v.n} onClick={() => api?.scrollTo(i)} className="text-left py-3 text-sm font-semibold cursor-pointer transition-all flex items-center gap-3" style={{ borderTop: `1px solid ${line}`, color: i === sel ? ink2 : mix(ink2, 40) }}>
                  <span className="h-px transition-all duration-300" style={{ width: i === sel ? 28 : 10, background: i === sel ? accent : "currentColor" }} />
                  {v.n}
                </button>
              ))}
              <div style={{ borderTop: `1px solid ${line}` }} />
            </div>
          </div>

          {/* big quote slides */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div ref={ref} className="overflow-hidden cursor-grab active:cursor-grabbing">
              <div className="flex">
                {VOICES.map((v) => (
                  <div key={v.n} className="flex-[0_0_100%] min-w-0 pr-6">
                    <Editable as="blockquote" className="text-2xl sm:text-4xl lg:text-[2.6rem] font-semibold tracking-tight leading-[1.25]" style={{ color: ink2 }}>{`“${v.q}”`}</Editable>
                    <div className="mt-12 flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full grid place-items-center text-sm font-bold text-white shrink-0" style={{ background: `linear-gradient(135deg, ${accent}, #E0265F)` }}>
                        {v.n.split(" ").map((x) => x[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <Editable as="div" className="font-bold text-base" style={{ color: ink2 }}>{v.n}</Editable>
                        <Editable as="div" className="text-sm" style={{ color: mix(ink2, 60) }}>{v.r}</Editable>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14 flex items-center gap-6">
              <div className="flex gap-3">
                <button aria-label="Previous" onClick={() => api?.scrollPrev()} className={arrow} style={{ borderColor: line, color: ink2 }}><ArrowLeft className="h-4 w-4" /></button>
                <button aria-label="Next" onClick={() => api?.scrollNext()} className={arrow} style={{ borderColor: accent, backgroundColor: accent, color: "#fff" }}><ArrowRight className="h-4 w-4" /></button>
              </div>
              <div className="flex-1 h-px relative" style={{ background: line }}>
                <div className="absolute left-0 top-0 h-px transition-all duration-500" style={{ width: `${((sel + 1) / VOICES.length) * 100}%`, background: accent }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}