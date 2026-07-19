import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { SiteData, HeroProps } from "@/types/builder.schema";

const FALLBACK_THEME = {
  bg: "#ffffff",
  ink: "#111111",
  accent: "#6366f1",
  fontHeading: "inherit",
  fontBody: "inherit",
  corners: "soft" as const,
  spacing: "cozy" as const,
};

export function TemplateCard({
  t,
  index = 0,
  onPreview,
}: {
  t: SiteData;
  index?: number;
  onPreview?: (template: SiteData) => void;
}) {
  const theme = t.theme ?? FALLBACK_THEME;
  const { bg, ink, accent } = theme;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="group relative"
    >
      <button
        type="button"
        onClick={() => onPreview?.(t)}
        className="block w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft hover:shadow-lift transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: bg }}>
          <TemplatePreview t={t} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
          {t.isPro && (
            <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/80 text-white px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase backdrop-blur">
              <Lock className="h-3 w-3" /> Pro
            </span>
          )}
        </div>
        <div className="flex items-start justify-between gap-3 p-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl">{t.name}</h3>
              <span className="text-[10px] uppercase tracking-wider text-ink-soft border border-border rounded-full px-2 py-0.5">
                {t.category}
              </span>
            </div>
            <p className="mt-1 text-sm text-ink-soft leading-relaxed">{t.tagline}</p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export function TemplatePreview({ t }: { t: SiteData }) {
  const theme = t.theme ?? FALLBACK_THEME;
  const { bg, ink, accent } = theme;
  const style = { color: ink } as const;

  const blocks = t.blocks ?? [];
  const heroBlock = blocks.find((b) => b.props.kind === "hero");
  const hero = heroBlock?.props as HeroProps | undefined;

  const isRounded = theme.corners === "rounded" || theme.corners === "pill";
  const radius = theme.corners === "pill" ? "9999px" : isRounded ? "12px" : theme.corners === "soft" ? "6px" : "2px";

  return (
    <div className="absolute inset-0 p-6" style={style}>
      <div className="flex items-center justify-between text-[9px] tracking-[0.2em] uppercase opacity-60">
        <span>{hero?.eyebrow ?? t.name}</span>
        <span>{hero?.availability ?? t.category}</span>
      </div>

      <div
        className="mt-6 leading-[0.95]"
        style={{ fontFamily: theme.fontHeading || "inherit" }}
      >
        <div className="text-[32px]">{hero?.name ?? t.name}</div>
        <div className="text-[20px] italic" style={{ color: accent }}>
          {hero?.tagline ?? t.tagline}
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <div
          className="px-3 py-1.5 text-[9px] font-medium"
          style={{ background: ink, color: bg, borderRadius: radius }}
        >
          {hero?.primaryCta ?? "View work"}
        </div>
        <div
          className="px-3 py-1.5 text-[9px] border"
          style={{ borderColor: `${ink}30`, borderRadius: radius }}
        >
          {hero?.secondaryCta ?? "Contact"}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="aspect-square"
            style={{
              background: i === 1 ? accent : `${ink}12`,
              borderRadius: radius,
            }}
          />
        ))}
      </div>
    </div>
  );
}