// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Flame, ArrowUp } from "lucide-react";
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

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [ref, seen] = useReveal(0.05);
  const r = (i = 0, k = "animate__fadeInUp") => (seen ? `animate__animated ${k} ${D[i % 8]}` : "opacity-0");

  const columns = props?.columns || [
    {
      title: "Explore",
      links: [
        { label: "Home", href: "#home" },
        { label: "Our Story", href: "#about" },
        { label: "Menu", href: "#projects" },
      ],
    },
    {
      title: "Guests",
      links: [
        { label: "Reviews", href: "#testimonials" },
        { label: "Visit Us", href: "#contact" },
        { label: "Opening Hours", href: "#contact" },
      ],
    },
  ];
  const setLink = (ci: number, li: number, v: string) =>
    onChange?.({
      columns: columns.map((c: any, a: number) =>
        a === ci ? { ...c, links: c.links.map((l: any, b: number) => (b === li ? { ...l, label: v } : l)) } : c
      ),
    });

  return (
    <footer ref={ref} className="relative overflow-hidden px-5 pb-8 pt-20 md:px-10" style={{ backgroundColor: bgSecond, color: ink }}>
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className={r(0, "animate__fadeInLeft")}>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: accent, color: bg }}>
                <Flame size={22} />
              </span>
              <span className="text-xl font-black uppercase tracking-tight">
                <Editable value={props?.brand || "Rosso & Fig"} onChange={(v) => onChange?.({ brand: v })} />
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props?.summary || "A neighbourhood Mediterranean kitchen cooking over open fire since 2012. Seasonal plates, natural wine and long tables."}
                onChange={(v) => onChange?.({ summary: v })}
              />
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase" style={{ backgroundColor: surface, color: inkSecond }}>
              <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: accent }} />
              <Editable value={props?.status || "Kitchen open now"} onChange={(v) => onChange?.({ status: v })} />
            </span>
          </div>

          {columns.map((c: any, ci: number) => (
            <div key={ci} className={r(ci + 1)}>
              <div className="text-sm font-black uppercase tracking-widest" style={{ color: accent }}>
                <Editable value={c.title} onChange={(v) => onChange?.({ columns: columns.map((x: any, j: number) => (j === ci ? { ...x, title: v } : x)) })} />
              </div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l: any, li: number) => (
                  <li key={li}>
                    <a href={l.href} className="inline-block text-sm font-semibold transition hover:translate-x-1" style={{ color: inkSecond }}>
                      <Editable value={l.label} onChange={(v) => setLink(ci, li, v)} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={r(3, "animate__fadeInRight")}>
            <div className="text-sm font-black uppercase tracking-widest" style={{ color: accent }}>
              <Editable value={props?.visitTitle || "Find us"} onChange={(v) => onChange?.({ visitTitle: v })} />
            </div>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: inkSecond }}>
              <Editable value={props?.address || "218 Olive Street, San Francisco, CA 94110"} onChange={(v) => onChange?.({ address: v })} />
            </p>
            <p className="mt-2 text-sm font-semibold" style={{ color: ink }}>
              <Editable value={props?.phone || "+1 (415) 555-0182"} onChange={(v) => onChange?.({ phone: v })} />
            </p>
          </div>
        </div>

        <div className={`mt-14 flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row ${r(4, "animate__fadeIn")}`} style={{ borderTop: `1px solid ${surface}` }}>
          <p className="text-xs" style={{ color: inkSecond }}>
            <Editable value={props?.copyright || "© 2026 Rosso & Fig Kitchen. All rights reserved."} onChange={(v) => onChange?.({ copyright: v })} />
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-black uppercase transition hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: accent, color: bg, boxShadow: `0 10px 30px ${accent}55` }}
          >
            <Editable value={props?.topLabel || "Back to top"} onChange={(v) => onChange?.({ topLabel: v })} />
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}