import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getBlockComponent } from "@/lib/blockRegistry";
import type { SiteData, Theme } from "@/types/builder.schema";

const FALLBACK_THEME: Theme = {
  bg: "#ffffff",
  ink: "#111111",
  accent: "#6366f1",
  fontHeading: "inherit",
  fontBody: "inherit",
  corners: "soft",
  spacing: "cozy",
};

const CANVAS_WIDTH = 1200;

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
        <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: theme.bg }}>
          <TemplatePreview t={t} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / CANVAS_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sorted = [...(t.blocks ?? [])].sort((a, b) => a.order - b.order);

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div
        style={{
          width: CANVAS_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          background: theme.bg,
          color: theme.ink,
        }}
      >

        {sorted.map((b) => {
          const variant = (b.props as any).variant as string | undefined;
          const Cmp = getBlockComponent(b.props.kind, variant);
          if (!Cmp) return null;
          return <Cmp key={b.id} id={b.id} props={b.props} theme={theme} onChange={() => {}} />;
        })}
      </div>
    </div>
  );
}

function DefaultNavStrip({ theme, name }: { theme: Theme; name: string }) {
  const { ink } = theme;
  return (
    <div
      className="flex items-center justify-between px-16 py-5 text-base"
      style={{ borderBottom: `1px solid ${ink}12` }}
    >
      <span className="font-display text-xl">{name}</span>
      <div className="flex gap-8 opacity-70 text-sm">
        <span>Work</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </div>
  );
}