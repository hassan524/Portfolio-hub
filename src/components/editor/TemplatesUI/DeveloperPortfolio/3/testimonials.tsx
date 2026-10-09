// @ts-nocheck
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const GAP = 24;

export function Testimonials({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#07060B";
    const bgSecond = theme?.["bg-second"] || "#0F0C14";
    const ink = theme?.ink || "#FFFFFF";
    const inkSecond = theme?.["ink-second"] || "#D6D0E0";
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#F5B335";

    const rawReviews = props?.reviews?.length
        ? props.reviews
        : (props?.items?.length ? props.items : null);

    const reviews = rawReviews || [
        {
            quote: "Zayan architected and shipped our AI retrieval copilot in half our scheduled sprint cycle. The sub-second streaming latency and UI polish were beyond anything our executives anticipated.",
            name: "Laura Bennett",
            role: "Chief Technology Officer",
            company: "Orbit Labs",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
        },
        {
            quote: "A remarkably rare combination of deep database engineering and immaculate visual taste. Our real-time operations dashboard went from clunky to an absolute showpiece.",
            name: "Hamza Raza",
            role: "Founder & CEO",
            company: "Pulse Ops",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
        },
        {
            quote: "Communicates transparently, establishes honest delivery schedules, and delivers clean, self-documenting code. Truly one of the finest engineers we have partnered with.",
            name: "Priya Nair",
            role: "VP of Product",
            company: "Nimbus Financial",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        },
        {
            quote: "He took a vague product idea and turned it into a polished, production-ready platform. Every release was on time and every handoff was clear.",
            name: "Daniel Foster",
            role: "Head of Engineering",
            company: "Forge Systems",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
        },
        {
            quote: "Our checkout performance improved noticeably after his refactor, and the codebase is now something new hires actually enjoy working in.",
            name: "Sara Malik",
            role: "Product Manager",
            company: "Cadence",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        },
        {
            quote: "Reliable, fast and genuinely thoughtful about design. We have already booked him for our next two quarters of work.",
            name: "Omar Siddiqui",
            role: "Co-founder",
            company: "Nimbus Labs",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
        },
    ];

    const updateReview = (index: number, field: string, val: string) => {
        const updated = reviews.map((r: any, i: number) => (i === index ? { ...r, [field]: val } : r));
        onChange?.({ reviews: updated, items: updated });
    };

    // Slides per view follows the width of this section, so it also works in a narrow editor canvas.
    const wrapRef = useRef<HTMLDivElement>(null);
    const [w, setW] = useState(0);
    useLayoutEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const measure = () => setW(Math.round(el.getBoundingClientRect().width));
        measure();
        if (typeof ResizeObserver === "undefined") return;
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);
    const perView = w >= 860 ? 3 : w >= 560 ? 2 : 1;
    const compact = w > 0 && w < 560; // phones: arrows move below the card

    const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }));
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 }, [autoplay.current]);

    useEffect(() => {
        emblaApi?.reInit();
    }, [emblaApi, perView, reviews.length]);

    const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const ease = [0.16, 1, 0.3, 1];

    // Both arrows share exactly the same look
    const arrowStyle = { backgroundColor: bgSecond, color: ink, "--ar": accent, "--arc": bg };
    const arrowClass =
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:bg-[color:var(--ar)] hover:text-[color:var(--arc)] active:scale-95";
    const prevBtn = (
        <button type="button" onClick={prev} aria-label="Previous testimonials" className={arrowClass} style={arrowStyle}>
            <ChevronLeft className="h-5 w-5" />
        </button>
    );
    const nextBtn = (
        <button type="button" onClick={next} aria-label="Next testimonials" className={arrowClass} style={arrowStyle}>
            <ChevronRight className="h-5 w-5" />
        </button>
    );

    return (
        <section id="testimonials" className="relative w-full overflow-hidden py-24 md:py-32" style={{ backgroundColor: bg, color: ink }}>
            <div className="relative mx-auto max-w-6xl px-5 md:px-8">
                {/* Header */}
                <div className="mb-14 md:mb-16">
                    <motion.p
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease }}
                        className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em]"
                        style={{ color: accent }}
                    >
                        <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease, delay: 0.1 }}
                            className="block h-px w-12 origin-left"
                            style={{ backgroundColor: accent }}
                        />
                        <Editable value={props?.eyebrow || "Client Endorsements"} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </motion.p>
                    <div className="mt-5 overflow-hidden pb-2">
                        <motion.h2
                            initial={{ y: "105%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.9, ease }}
                            className="font-serif text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl"
                            style={{ color: ink }}
                        >
                            <Editable value={props?.title || "Trusted by Technical Leaders"} onChange={(v) => onChange?.({ title: v })} />
                        </motion.h2>
                    </div>
                </div>

                {/* Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease }}
                    ref={wrapRef}
                    className={compact ? "flex flex-col gap-6" : "flex items-center gap-3 md:gap-5"}
                >
                    {!compact && prevBtn}

                    <div className="w-full min-w-0 flex-1">
                        <div ref={emblaRef} className="overflow-hidden">
                            <div className="flex items-stretch" style={{ marginLeft: -GAP }}>
                                {reviews.map((r: any, i: number) => (
                                    <div
                                        key={i}
                                        className="min-w-0 shrink-0 grow-0"
                                        style={{ flexBasis: `${100 / perView}%`, paddingLeft: GAP }}
                                    >
                                        <div
                                            className="flex h-full flex-col justify-between rounded-2xl p-7 md:p-8"
                                            style={{ backgroundColor: bgSecond }}
                                        >
                                            <div>
                                                <span className="block font-serif text-5xl leading-none" style={{ color: accent }}>
                                                    “
                                                </span>
                                                <p className="mt-3 text-base leading-relaxed md:text-[17px]" style={{ color: ink }}>
                                                    <Editable value={r.quote} onChange={(v) => updateReview(i, "quote", v)} />
                                                </p>
                                            </div>

                                            <div className="mt-8 flex items-center gap-3.5">
                                                <img src={r.avatar} alt={r.name} className="h-11 w-11 rounded-full object-cover" />
                                                <div className="min-w-0">
                                                    <h4 className="font-serif text-sm font-bold md:text-base" style={{ color: ink }}>
                                                        <Editable value={r.name} onChange={(v) => updateReview(i, "name", v)} />
                                                    </h4>
                                                    <p className="text-xs" style={{ color: inkSecond }}>
                                                        <Editable value={r.role} onChange={(v) => updateReview(i, "role", v)} />
                                                    </p>
                                                    <p className="text-xs font-semibold" style={{ color: accent }}>
                                                        <Editable value={r.company} onChange={(v) => updateReview(i, "company", v)} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {!compact && nextBtn}

                    {compact && (
                        <div className="flex items-center justify-center gap-4">
                            {prevBtn}
                            {nextBtn}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}