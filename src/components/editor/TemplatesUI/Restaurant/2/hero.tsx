// @ts-nocheck
import { Star, ArrowRight, MapPin, ChefHat, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const stats = props?.stats || [
    { value: "12+", label: "Years of open fire" },
    { value: "4.9", label: "Average guest rating" },
    { value: "38k", label: "Plates served yearly" },
  ];
  const setStat = (i: number, k: string, v: string) =>
    onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [k]: v } : s)) });
  const sd = ["[animation-delay:700ms]", "[animation-delay:850ms]", "[animation-delay:1000ms]"];

  return (
    <section
      id="home"
      className="relative overflow-hidden px-5 pb-24 pt-14 md:px-10 md:pt-24"
      style={{ background: `linear-gradient(180deg, ${bg} 0%, ${bgSecond} 100%)`, color: ink }}
    >
      <div className="animate__animated animate__fadeIn animate__slower pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl" style={{ backgroundColor: accent }} />
      <div className="animate__animated animate__fadeIn animate__slower pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <span
            className="animate__animated animate__fadeInDown inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest"
            style={{ backgroundColor: surface, color: inkSecond, border: `1px solid ${surface}` }}
          >
            <Sparkles size={14} style={{ color: accent }} />
            <Editable value={props?.pill || "Now serving dinner · Tue – Sun"} onChange={(v) => onChange?.({ pill: v })} />
          </span>

          <h1 className="mt-6 text-5xl font-black uppercase leading-[0.92] tracking-tight sm:text-7xl xl:text-8xl">
            <span className="animate__animated animate__fadeInUp [animation-delay:150ms] block" style={{ color: ink }}>
              <Editable value={props?.headline || "Slow Fire,"} onChange={(v) => onChange?.({ headline: v })} />
            </span>
            <span className="animate__animated animate__fadeInUp [animation-delay:300ms] block" style={{ color: accent }}>
              <Editable value={props?.headlineAccent || "Honest Food"} onChange={(v) => onChange?.({ headlineAccent: v })} />
            </span>
          </h1>

          <p className="animate__animated animate__fadeInUp [animation-delay:450ms] mt-6 max-w-xl text-lg leading-relaxed" style={{ color: inkSecond }}>
            <Editable
              value={props?.subheadline || "A neighbourhood Mediterranean kitchen cooking over oak and olive wood. Hand-rolled pasta, seasonal produce and long tables made for sharing."}
              onChange={(v) => onChange?.({ subheadline: v })}
            />
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="animate__animated animate__fadeInUp [animation-delay:550ms] inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-black uppercase tracking-wide transition hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: accent, color: bg, boxShadow: `0 14px 40px ${accent}66` }}
            >
              <Editable value={props?.cta || "Explore the Menu"} onChange={(v) => onChange?.({ cta: v })} />
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="animate__animated animate__fadeInUp [animation-delay:650ms] inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-black uppercase tracking-wide transition hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: surface, color: ink, border: `1px solid ${surface}` }}
            >
              <MapPin size={18} style={{ color: accent }} />
              <Editable value={props?.secondaryCta || "Find Us"} onChange={(v) => onChange?.({ secondaryCta: v })} />
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            {stats.map((s: any, i: number) => (
              <div key={i} className={`animate__animated animate__zoomIn ${sd[i % 3]} rounded-3xl p-4`} style={{ backgroundColor: surface }}>
                <div className="text-3xl font-black" style={{ color: accent }}>
                  <Editable value={s.value} onChange={(v) => setStat(i, "value", v)} />
                </div>
                <div className="mt-1 text-xs font-semibold uppercase leading-snug" style={{ color: inkSecond }}>
                  <Editable value={s.label} onChange={(v) => setStat(i, "label", v)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate__animated animate__fadeInRight [animation-delay:400ms] relative mx-auto w-full max-w-lg">
          <div className="absolute inset-0 rotate-3 rounded-[2.5rem]" style={{ backgroundColor: accent, opacity: 0.9 }} />
          <div className="absolute inset-0 -rotate-3 rounded-[2.5rem]" style={{ backgroundColor: surface }} />
          <img
            src={props?.heroImage || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80"}
            alt="Signature dish"
            className="relative h-[520px] w-full rounded-t-[999px] rounded-b-[2.5rem] object-cover"
            style={{ boxShadow: `0 30px 80px ${accent}55` }}
          />
          <div
            className="animate__animated animate__fadeInUp [animation-delay:1100ms] absolute -left-4 bottom-10 flex items-center gap-3 rounded-3xl px-5 py-4 backdrop-blur-xl sm:-left-10"
            style={{ backgroundColor: bg, border: `1px solid ${surface}`, color: ink, boxShadow: `0 20px 50px ${accent}33` }}
          >
            <div className="flex">
              {[0, 1, 2, 3, 4].map((n) => (
                <Star key={n} size={16} fill={accent} style={{ color: accent }} />
              ))}
            </div>
            <div className="text-sm font-bold">
              <Editable value={props?.badge || "Loved by 2,400+ guests"} onChange={(v) => onChange?.({ badge: v })} />
            </div>
          </div>
          <div
            className="animate__animated animate__bounceIn [animation-delay:1300ms] absolute -right-3 top-10 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase sm:-right-8"
            style={{ backgroundColor: bg, color: accent, border: `1px solid ${surface}` }}
          >
            <ChefHat size={16} />
            <Editable value={props?.chip || "Chef's pick"} onChange={(v) => onChange?.({ chip: v })} />
          </div>
        </div>
      </div>
    </section>
  );
}