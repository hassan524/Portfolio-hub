import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { SiteData, Theme } from "@/types/builder.schema";
import { getBlockComponent } from "@/lib/blockRegistry";

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

type PortfolioCardProps = {
  id: string;
  t: SiteData;
  isCreated?: boolean;
  views30d?: number;
  lastEdited?: string;
  sparkline?: React.ReactNode;
  fmt?: Intl.NumberFormat;
  onPreview?: (t: SiteData) => void;
};

export function PortfolioCard({
  id,
  t,
  isCreated = true,
  views30d = 0,
  lastEdited,
  sparkline,
  fmt = new Intl.NumberFormat(),
  onPreview,
}: PortfolioCardProps) {
  const content = (
    <>
      <div className="relative aspect-video overflow-hidden bg-background">
        <CardView t={t} />

        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none" />

        <span className="absolute left-3 top-3">
          {/* <StatusChip state={t.status} /> */}
        </span>
      </div>

      <div className="border-t border-border p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-foreground truncate">
              {t.name}
            </h3>

            {t.tagline && (
              <p className="mt-1 font-mono text-[11px] text-subtle truncate">
                {t.tagline}
              </p>
            )}
          </div>

          {isCreated && views30d > 0 && sparkline && (
            <div className="h-6 w-16 shrink-0">{sparkline}</div>
          )}
        </div>

        {isCreated ? (
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="eyebrow mb-1">Views 30d</p>
              <p className="numeric text-sm text-foreground">
                {views30d ? fmt.format(views30d) : "—"}
              </p>
            </div>

            <div className="text-right">
              <p className="eyebrow mb-1">Edited</p>
              <p className="text-sm text-muted-foreground">
                {lastEdited ?? "—"}
              </p>
            </div>

            <span className="translate-x-1 text-xs font-semibold text-subtle opacity-0 transition-all group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100">
              Open →
            </span>
          </div>
        ) : null}
      </div>
    </>
  );

  if (isCreated) {
    return (
      <Link
        to={`/dashboard?portfolioId=${encodeURIComponent(id)}`}
        className="group panel overflow-hidden transition-colors hover:border-border-strong"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onPreview?.(t)}
      className="group panel block w-full overflow-hidden text-left transition-colors hover:border-border-strong cursor-pointer"
    >
      {content}
    </button>
  );
}

function CardView({ t }: { t: SiteData }) {
  const theme = t.theme ?? FALLBACK_THEME;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      setScale(el.clientWidth / CANVAS_WIDTH);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const sorted = [...(t.blocks ?? [])].sort((a, b) => a.order - b.order);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-70 transition-opacity duration-300 group-hover:opacity-100"
    >
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
          const Cmp = getBlockComponent(b.props.kind, variant, t.category, t.id);

          if (!Cmp) return null;

          return (
            <Cmp
              key={b.id}
              id={b.id}
              props={b.props}
              theme={theme}
              onChange={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}