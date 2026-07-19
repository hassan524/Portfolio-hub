import { Eye } from "lucide-react";
import { type Template } from "@/lib/templates";

export function MarqueeTemplateCard({
  t,
  onClick,
}: {
  t: Template;
  onClick: () => void;
}) {
  const [bg, ink, accent] = t.palette;
  return (
    <button
      onClick={onClick}
      className="group/tcard relative shrink-0 w-[440px] md:w-[520px] overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-lift transition-all duration-500 text-left cursor-pointer"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {/* Mini preview */}
        <div className="absolute inset-0 p-6 md:p-8" style={{ color: ink }}>
          <div className="text-[10px] tracking-[0.2em] uppercase opacity-60">
            {t.name}
          </div>
          <div className="mt-6 font-display text-[36px] md:text-[42px] leading-[0.95]">
            Your name
          </div>
          <div
            className="font-display text-[32px] md:text-[38px] leading-[0.95] italic mt-0.5"
            style={{ color: accent }}
          >
            goes here.
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-md"
                style={{
                  background: i === 1 ? accent : `${ink}15`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover/tcard:bg-black/40 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover/tcard:opacity-100 transform scale-90 group-hover/tcard:scale-100 transition-all duration-500 inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium shadow-lift">
            <Eye className="h-4 w-4" />
            Preview
          </div>
        </div>

        {t.isPro && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/80 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur">
            Pro
          </span>
        )}
      </div>

      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-xl">{t.name}</h3>
            <span className="text-[9px] uppercase tracking-wider text-ink-soft border border-border rounded-full px-2 py-0.5">
              {t.category}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-ink-soft leading-relaxed">
            {t.tagline}
          </p>
        </div>
      </div>
    </button>
  );
}
