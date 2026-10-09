// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Star, Quote, Award, ShieldCheck, Trophy, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const D = ["", "[animation-delay:100ms]", "[animation-delay:200ms]", "[animation-delay:300ms]", "[animation-delay:400ms]", "[animation-delay:500ms]", "[animation-delay:600ms]", "[animation-delay:700ms]"];

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [ref, seen] = useReveal(0.05);
  const [idx, setIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const r = (i = 0, k = "animate__fadeInUp") => (seen ? `animate__animated ${k} ${D[i % 8]}` : "opacity-0");

  const reviews = props?.reviews || [
    { name: "Sofia Martinez", role: "Food blogger", quote: "The tagliatelle alone is worth the trip. Warm, unfussy and unforgettable.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80" },
    { name: "James Whitfield", role: "Regular since 2016", quote: "Every visit feels like dinner at a friend's house, if your friend cooked over fire.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" },
    { name: "Amira Hadid", role: "Celebrated her birthday here", quote: "The short rib fell apart with a spoon. Staff treated our whole table like family.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80" },
  ];
  const stats = props?.stats || [
    { value: "4.9/5", label: "Average rating" },
    { value: "2,400+", label: "Verified reviews" },
    { value: "96%", label: "Would return" },
  ];
  const badges = props?.badges || ["Best Neighbourhood Kitchen 2025", "Top 50 Trattorias", "Sustainable Sourcing Certified"];
  const faqs = props?.faqs || [
    { q: "Do you cater to dietary needs?", a: "Yes. Vegetarian, vegan and gluten-free dishes are marked on every menu." },
    { q: "Is the restaurant family friendly?", a: "Absolutely. We have high chairs and a kids' pasta plate." },
    { q: "Do you host private events?", a: "Our back room seats up to 24 guests. Ask our team in person." },
  ];
  const upd = (key: string, arr: any[], i: number, f: string, v: string) =>
    onChange?.({ [key]: arr.map((it: any, j: number) => (j === i ? { ...it, [f]: v } : it)) });
  const badgeIcons = [Trophy, Award, ShieldCheck];
  const cur = reviews[idx % reviews.length];
  const go = (d: number) => setIdx((idx + d + reviews.length) % reviews.length);

  return (
    <section id="testimonials" ref={ref} className="relative overflow-hidden px-5 py-28 md:px-10" style={{ backgroundColor: bgSecond, color: ink }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} />
      <div className="relative mx-auto max-w-7xl">
        <div className={r(0)}>
          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
            <Editable value={props?.eyebrow || "Kind words"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
            <Editable value={props?.title || "Guests talk, we listen"} onChange={(v) => onChange?.({ title: v })} />
          </h2>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div key={idx} className="animate__animated animate__fadeIn">
              <Quote size={44} style={{ color: accent }} />
              <div className="mt-4 flex gap-1">
                {[0, 1, 2, 3, 4].map((n) => (
                  <Star key={n} size={18} fill={accent} style={{ color: accent }} />
                ))}
              </div>
              <p className="mt-6 text-2xl font-semibold leading-snug sm:text-4xl">
                <Editable value={cur.quote} onChange={(v) => upd("reviews", reviews, idx % reviews.length, "quote", v)} />
              </p>
              <div className="mt-8">
                <div className="text-lg font-black uppercase"><Editable value={cur.name} onChange={(v) => upd("reviews", reviews, idx % reviews.length, "name", v)} /></div>
                <div className="text-sm" style={{ color: inkSecond }}><Editable value={cur.role} onChange={(v) => upd("reviews", reviews, idx % reviews.length, "role", v)} /></div>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <button onClick={() => go(-1)} className="flex h-12 w-12 items-center justify-center rounded-full transition hover:scale-[1.02] active:scale-95" style={{ border: `1px solid ${surface}`, color: ink }} aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => go(1)} className="flex h-12 w-12 items-center justify-center rounded-full transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }} aria-label="Next">
                <ChevronRight size={20} />
              </button>
              <div className="ml-2 flex gap-2">
                {reviews.map((_: any, i: number) => (
                  <span key={i} className="h-1.5 rounded-full transition-all duration-500" style={{ width: i === idx % reviews.length ? 32 : 10, backgroundColor: i === idx % reviews.length ? accent : surface }} />
                ))}
              </div>
            </div>
          </div>

          <div className={`lg:col-span-5 ${r(2, "animate__fadeInRight")}`}>
            <img key={idx} src={cur.image} alt={cur.name} className="animate__animated animate__fadeIn h-[420px] w-full rounded-3xl object-cover lg:h-[460px]" style={{ boxShadow: `0 30px 80px ${accent}33` }} />
          </div>
        </div>

        <div className={`mt-20 grid sm:grid-cols-3 ${r(0)}`} style={{ borderTop: `1px solid ${surface}`, borderBottom: `1px solid ${surface}` }}>
          {stats.map((s: any, i: number) => (
            <div key={i} className={`py-8 text-center ${i ? "border-t sm:border-l sm:border-t-0" : ""}`} style={{ borderColor: surface }}>
              <div className="text-4xl font-black" style={{ color: accent }}><Editable value={s.value} onChange={(v) => upd("stats", stats, i, "value", v)} /></div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: inkSecond }}><Editable value={s.label} onChange={(v) => upd("stats", stats, i, "label", v)} /></div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {badges.map((b: string, i: number) => {
            const Icon = badgeIcons[i % badgeIcons.length];
            return (
              <span key={i} className={`inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest ${r(i, "animate__zoomIn")}`} style={{ color: ink }}>
                <Icon size={18} style={{ color: accent }} />
                <Editable value={b} onChange={(v) => onChange?.({ badges: badges.map((x: string, j: number) => (j === i ? v : x)) })} />
              </span>
            );
          })}
        </div>

        <div className="mt-24">
          <h3 className={`max-w-2xl text-3xl font-black uppercase leading-tight sm:text-5xl ${r(0, "animate__fadeInUp")}`}>
            <Editable value={props?.faqTitle || "Good to know"} onChange={(v) => onChange?.({ faqTitle: v })} />
          </h3>
          <div className="mt-10">
            {faqs.map((f: any, i: number) => (
              <div key={i} className={r(i)} style={{ borderTop: `1px solid ${surface}` }}>
                <div className="flex items-center justify-between gap-6 py-6">
                  <div className="text-lg font-black uppercase sm:text-xl"><Editable value={f.q} onChange={(v) => upd("faqs", faqs, i, "q", v)} /></div>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition active:scale-95"
                    style={{ backgroundColor: openFaq === i ? accent : surface, color: openFaq === i ? bg : ink }}
                    aria-label="Toggle answer"
                  >
                    {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                </div>
                {openFaq === i && (
                  <p className="animate__animated animate__fadeIn animate__faster max-w-3xl pb-7 text-base leading-relaxed" style={{ color: inkSecond }}>
                    <Editable value={f.a} onChange={(v) => upd("faqs", faqs, i, "a", v)} />
                  </p>
                )}
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${surface}` }} />
          </div>
        </div>
      </div>
    </section>
  );
}