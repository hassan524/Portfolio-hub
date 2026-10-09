// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Car, Accessibility, Dog, Wifi } from "lucide-react";
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

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [ref, seen] = useReveal(0.05);
  const r = (i = 0, k = "animate__fadeInUp") => (seen ? `animate__animated ${k} ${D[i % 8]}` : "opacity-0");

  const hours = props?.hours || [
    { day: "Monday – Thursday", time: "12:00 PM – 10:30 PM" },
    { day: "Friday – Saturday", time: "12:00 PM – 12:00 AM" },
    { day: "Sunday", time: "11:00 AM – 9:30 PM" },
  ];
  const badges = props?.badges || ["Free parking", "Wheelchair accessible", "Dog friendly patio", "Free Wi-Fi"];
  const badgeIcons = [Car, Accessibility, Dog, Wifi];
  const setHour = (i: number, k: string, v: string) =>
    onChange?.({ hours: hours.map((h: any, j: number) => (j === i ? { ...h, [k]: v } : h)) });

  const rows = [
    { icon: Phone, key: "phone", label: "Phone", def: "+1 (415) 555-0182" },
    { icon: Mail, key: "email", label: "Email", def: "hello@rossoandfig.com" },
    { icon: MapPin, key: "address", label: "Address", def: "218 Olive Street, San Francisco, CA 94110" },
  ];

  return (
    <section id="contact" ref={ref} className="relative px-5 py-28 md:px-10" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className={r(0)}>
          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
            <Editable value={props?.eyebrow || "Visit us"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </span>
          <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-7xl">
            <Editable value={props?.title || "Come hungry, leave happy"} onChange={(v) => onChange?.({ title: v })} />
          </h2>
          <p className="mt-5 max-w-xl text-lg" style={{ color: inkSecond }}>
            <Editable value={props?.subtitle || "Walk-ins are always welcome. Find us at the corner of Olive Street, right beside the flower market."} onChange={(v) => onChange?.({ subtitle: v })} />
          </p>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <div className={`relative ${r(1, "animate__fadeInLeft")}`}>
            <img
              src={props?.image || "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80"}
              alt="Restaurant interior"
              className="h-full min-h-[460px] w-full rounded-3xl object-cover"
              style={{ boxShadow: `0 30px 80px ${accent}33` }}
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 rounded-b-3xl p-5" style={{ background: `linear-gradient(to top, ${bg} 0%, transparent 100%)` }}>
              {badges.map((b: string, i: number) => {
                const Icon = badgeIcons[i % badgeIcons.length];
                return (
                  <span key={i} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase backdrop-blur-md" style={{ backgroundColor: surface, color: ink }}>
                    <Icon size={14} style={{ color: accent }} />
                    <Editable value={b} onChange={(v) => onChange?.({ badges: badges.map((x: string, j: number) => (j === i ? v : x)) })} />
                  </span>
                );
              })}
            </div>
          </div>

          <div className={r(2, "animate__fadeInRight")}>
            {rows.map((row, i) => {
              const Icon = row.icon;
              return (
                <div key={i} className={`group flex items-center gap-5 py-6 transition-all duration-300 hover:pl-3 ${r(i + 2)}`} style={{ borderTop: `1px solid ${surface}` }}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition group-hover:scale-110" style={{ backgroundColor: accent, color: bg }}>
                    <Icon size={22} />
                  </span>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>
                      <Editable value={props?.[`${row.key}Label`] || row.label} onChange={(v) => onChange?.({ [`${row.key}Label`]: v })} />
                    </div>
                    <div className="text-lg font-bold">
                      <Editable value={props?.[row.key] || row.def} onChange={(v) => onChange?.({ [row.key]: v })} />
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ borderTop: `1px solid ${surface}` }} />

            <div className={`mt-10 ${r(5)}`}>
              <div className="flex items-center gap-3">
                <Clock size={22} style={{ color: accent }} />
                <h3 className="text-2xl font-black uppercase">
                  <Editable value={props?.hoursTitle || "Opening hours"} onChange={(v) => onChange?.({ hoursTitle: v })} />
                </h3>
              </div>
              <div className="mt-4">
                {hours.map((h: any, i: number) => (
                  <div key={i} className="flex flex-col justify-between gap-1 py-4 sm:flex-row" style={{ borderTop: `1px solid ${surface}` }}>
                    <span className="font-bold uppercase"><Editable value={h.day} onChange={(v) => setHour(i, "day", v)} /></span>
                    <span className="font-semibold" style={{ color: accent }}><Editable value={h.time} onChange={(v) => setHour(i, "time", v)} /></span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${surface}` }} />
              </div>
              <p className="mt-4 text-sm" style={{ color: inkSecond }}>
                <Editable value={props?.note || "Kitchen closes 30 minutes before closing time."} onChange={(v) => onChange?.({ note: v })} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}