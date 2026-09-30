// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import hero from "./public/pantry-hero.jpg";

export function Bakery1Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#faf9f6";
  const ink = theme?.ink || "#1a1a1a";
  const accent = theme?.accent || "#e85d3d";

  return (
    <section id="home" className="relative isolate min-h-[680px] overflow-hidden" style={{ backgroundColor: bg, color: ink }}>
      <img
        src={hero}
        alt="Pantry bakery hero"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      />
      {/* warm dark overlay on the left */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(90deg, oklch(0.35 0.09 22 / 85%) 0%, oklch(0.35 0.09 22 / 55%) 35%, transparent 74%)",
        }}
      />
      <div className="mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-24 md:px-12">
        <div className="max-w-xl text-white">
          <Editable
            as="p"
            className="mb-4 text-xs font-bold uppercase tracking-widest opacity-80"
            value="01 — Artisan Baked Daily"
          />
          <Editable
            as="h1"
            className="text-5xl leading-tight md:text-7xl"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
            value={props.headline || "Bread made with love & tradition."}
            onChange={(headline) => onChange?.({ headline })}
          />
          <Editable
            as="p"
            className="mt-6 max-w-sm text-lg leading-8 opacity-80"
            value={props.intro || "Small-batch pastries, sourdoughs, and seasonal specials baked fresh every morning in our open kitchen."}
            onChange={(intro) => onChange?.({ intro })}
          />
          <a
            href="#about"
            className="mt-9 inline-flex items-center gap-3 text-sm font-bold text-white"
          >
            <span
              className="inline-flex h-11 w-11 items-center justify-center rounded-full"
              style={{ backgroundColor: accent }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </span>
            <Editable value="Discover our story" />
          </a>
        </div>
      </div>
    </section>
  );
}
