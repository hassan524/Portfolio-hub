// @ts-nocheck
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const mix = (c: string = "#111417", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const VOICES = [
  {
    q: "Sagent possesses an extraordinary sensitivity to the life of a building. Their structures do not merely occupy space—they dignify everyday human existence.",
    n: "Maya Chen",
    r: "Partner, Calder Development Group",
    pub: "Architectural Commission Jury",
  },
  {
    q: "Calm, organised, and uncompromising in technical execution. Every stone joint, window reveal, and door threshold was considered with masterly precision.",
    n: "Sir Thomas Reid",
    r: "Private Patron, The Garden Residence",
    pub: "Private Commission",
  },
  {
    q: "A rare atelier that treats raw concrete, patinated oak, and daylight as sacred instruments. One of the most promising voices in British & European architecture.",
    n: "Elena Rostova",
    r: "Senior Architecture Critic",
    pub: "The Architectural Review",
  },
  {
    q: "They brought an exquisite discipline to our brief that transformed a complex coastal slope into an effortless, naturally ventilated sanctuary.",
    n: "Marcus & Vivienne Vance",
    r: "Homeowners, Highland Coast House",
    pub: "Residential Monograph",
  },
];

export function ArchitectureStudio1Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#E8EEEB";
  const ink = theme?.ink || "#111417";
  const inkSecond = theme?.["ink-second"] || "#566166";
  const accent = theme?.accent || "#D92335";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";

  const [ref, api] = useEmblaCarousel({ loop: true, duration: 32 }, [
    Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [sel, setSel] = useState(0);

  useEffect(() => {
    if (!api) return;
    const on = () => setSel(api.selectedScrollSnap());
    on();
    api.on("select", on);
    return () => {
      api.off("select", on);
    };
  }, [api]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id="testimonials"
      className="w-full px-6 md:px-12 lg:px-16 py-24 md:py-32 transition-colors border-b"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody, borderColor: mix(ink, 12) }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid md:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b" style={{ borderColor: mix(ink, 14) }}>
          <div className="md:col-span-8">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold block mb-3" style={{ color: accent }}>
              <Editable value="04 / CRITICAL MONOGRAPHS & VOICES" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05]"
              style={{ fontFamily: fontHeading, color: ink }}
              value={props?.title || "Words from our patrons & critics."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          <div className="md:col-span-4 flex md:justify-end items-center gap-4">
            <span className="text-3xl font-medium font-mono" style={{ color: ink }}>
              {pad(sel + 1)}
              <span className="text-sm font-sans ml-1 opacity-50">/ {pad(VOICES.length)}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous monograph"
                onClick={() => api?.scrollPrev()}
                className="w-11 h-11 border flex items-center justify-center transition-colors hover:bg-black/5 cursor-pointer"
                style={{ borderColor: mix(ink, 20), color: ink }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                aria-label="Next monograph"
                onClick={() => api?.scrollNext()}
                className="w-11 h-11 border flex items-center justify-center transition-colors hover:bg-black/5 cursor-pointer"
                style={{ borderColor: mix(ink, 20), color: ink }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Block */}
        <div ref={ref} className="overflow-hidden cursor-grab active:cursor-grabbing mb-16">
          <div className="flex">
            {VOICES.map((v, i) => (
              <figure key={i} className="flex-[0_0_100%] min-w-0 pr-6 m-0">
                <div
                  className="p-8 md:p-14 border flex flex-col justify-between min-h-[300px]"
                  style={{ borderColor: mix(ink, 15), backgroundColor: mix(bg, 55) }}
                >
                  <Quote size={32} style={{ color: accent, opacity: 0.6 }} className="mb-6" />
                  <Editable
                    as="blockquote"
                    className="text-2xl sm:text-3xl md:text-4xl leading-[1.3] font-medium tracking-tight mb-8"
                    style={{ fontFamily: fontHeading, color: ink }}
                    value={`“${v.q}”`}
                  />
                  <figcaption className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t" style={{ borderColor: mix(ink, 14) }}>
                    <div>
                      <span className="font-semibold text-base block" style={{ color: ink }}>
                        {v.n}
                      </span>
                      <span className="text-xs uppercase tracking-wider opacity-70" style={{ color: inkSecond }}>
                        {v.r}
                      </span>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 border" style={{ borderColor: mix(ink, 20), color: accent }}>
                      {v.pub}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* Press Publications Banner */}
        <div className="pt-10 border-t" style={{ borderColor: mix(ink, 14) }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold opacity-60" style={{ color: inkSecond }}>
              Featured & Profiled In
            </span>
            <div className="flex flex-wrap items-center gap-8 md:gap-14 text-sm font-medium tracking-wider opacity-75">
              <span>ARCHITECTURAL REVIEW</span>
              <span>DOMUS</span>
              <span>WALLPAPER*</span>
              <span>DEZEEN</span>
              <span>EL CROQUIS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Testimonials = ArchitectureStudio1Testimonials;
export default ArchitectureStudio1Testimonials;