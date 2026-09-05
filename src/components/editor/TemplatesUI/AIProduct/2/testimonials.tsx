// @ts-nocheck
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
type Props = BlockComponentProps<any>;

export function AIProduct2Testimonials({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const items = props.items ?? [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4500, stopOnInteraction: false })
  ]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const updateItem = (index: number, patch: Partial<(typeof items)[0]>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange({ items: next });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
        <div>
          <Editable
            as="span"
            value="Testimonials"
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: accent }}
          />
          {props.heading && (
            <Editable
              as="h2"
              value={props.heading}
              onChange={(v) => onChange({ heading: v })}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: ink }}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            className="h-10 w-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{ background: `${ink}04`, color: ink }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollNext}
            className="h-10 w-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            style={{ background: `${ink}04`, color: ink }}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-6 -ml-4">
          {items.map((item, i) => (
            <div key={i} className="flex-[0_0_100%] md:flex-[0_0_50%] pl-4 min-w-0">
              <div 
                className="h-full p-8 sm:p-10 rounded-3xl flex flex-col justify-between"
                style={{ background: `${ink}02` }}
              >
                <div>
                  <Quote className="h-6 w-6 mb-4 opacity-30" style={{ color: accent }} />
                  <Editable
                    as="p"
                    value={item.quote}
                    onChange={(v) => updateItem(i, { quote: v })}
                    className="text-base sm:text-lg font-medium leading-relaxed mb-8 opacity-90"
                    style={{ color: ink }}
                  />
                </div>
                
                <div className="flex items-center gap-4 pt-6" style={{ borderTop: `1px solid ${ink}06` }}>
                  <div
                    className="h-10 w-10 rounded-full font-bold flex items-center justify-center text-xs shrink-0"
                    style={{ background: accent, color: bg }}
                  >
                    {item.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <Editable
                      as="div"
                      value={item.name}
                      onChange={(v) => updateItem(i, { name: v })}
                      className="font-bold text-sm"
                      style={{ color: ink }}
                    />
                    {item.role && (
                      <Editable
                        as="div"
                        value={item.role}
                        onChange={(v) => updateItem(i, { role: v })}
                        className="text-xs opacity-60 font-medium"
                        style={{ color: ink }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}