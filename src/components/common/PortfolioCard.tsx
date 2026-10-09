import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { SiteData, Theme } from "@/types/builder.schema";
import { getBlockComponent } from "@/lib/blockRegistry";
import { usePortfolioViews30d } from "@/hooks/usePortfolios";
import { timeAgo } from "@/utils/TimeAgo";
import { resolveFont, ensureGoogleFontLoaded } from "@/lib/functions/fontUtils";

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

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max).trimEnd() + "…" : text;
}

class BlockErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

type PortfolioCardProps = {
  id: string;
  t: SiteData;
  isCreated?: boolean;
  lastEdited?: string; // now a raw date/ISO string, formatted internally
  sparkline?: React.ReactNode;
  fmt?: Intl.NumberFormat;
  onPreview?: (t: SiteData) => void;
  description?: string | null;
};

export function PortfolioCard({
  id,
  t,
  isCreated = true,
  lastEdited,
  sparkline,
  fmt = new Intl.NumberFormat(),
  onPreview,
  description,
}: PortfolioCardProps) {
  const { views30d, loading: viewsLoading } = usePortfolioViews30d(isCreated ? id : "");

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

            {description && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                {truncate(description, 59)}
              </p>
            )}
          </div>

          {isCreated && views30d !== null && views30d > 0 && sparkline && (
            <div className="h-6 w-16 shrink-0">{sparkline}</div>
          )}
        </div>

        {isCreated ? (
          <div className="mt-4 flex items-start justify-between border-t border-border pt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-muted-foreground">
                Edited
              </span>
              <span className="text-xs text-muted-foreground">
                {lastEdited ? timeAgo(lastEdited) : "—"}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );

  if (isCreated) {
    return (
      <Link
        to={`/dashboard?pid=${encodeURIComponent(id)}`}
        target="_blank"
        rel="noopener noreferrer"
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

  const fontRaw = theme.fontBody || t.theme?.fontBody;
  const fontInfo = resolveFont(fontRaw);

  useEffect(() => {
    ensureGoogleFontLoaded(fontInfo.googleFontFamily);
  }, [fontInfo.googleFontFamily]);

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

  let sorted = [...(t.blocks ?? [])].sort((a, b) => a.order - b.order);
  if (!sorted.some((b) => b.props.kind === "experience")) {
    const testIdx = sorted.findIndex((b) => b.props.kind === "testimonials");
    const testOrder =
      testIdx !== -1
        ? sorted[testIdx].order
        : sorted.length > 0
          ? sorted[sorted.length - 1].order
          : 4;
    const refVariant = sorted.find((b) => (b.props as any)?.variant)?.props as any;
    let expVariant = "";
    if (refVariant?.variant) {
      expVariant = refVariant.variant.replace(
        /(Hero|About|Projects|Testimonials|Contact|Footer|Services|Stats|Spacer)$/,
        "Experience",
      );
    }
    const expBlock: any = {
      id: "block-experience-auto",
      type: "ExperienceDefault",
      order: testOrder - 0.5,
      props: {
        kind: "experience",
        variant: expVariant,
      },
    };
    sorted.push(expBlock);
    sorted.sort((a, b) => a.order - b.order);
  }

  // Section preview filtering based on t.view:
  // "hero" | "about" | "projects" | "services" | "testimonials" | "contact" | etc.
  const targetView = (t.view || "hero").toLowerCase().trim();

  let blocksToRender = sorted;
  if (targetView && targetView !== "all") {
    const matching = sorted.filter(
      (b) => b.props.kind?.toLowerCase() === targetView
    );
    if (matching.length > 0) {
      if (targetView === "hero") {
        const navBlock = sorted.find((b) => b.props.kind?.toLowerCase() === "navbar");
        blocksToRender = navBlock ? [navBlock, ...matching] : matching;
      } else {
        blocksToRender = matching;
      }
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none opacity-70 transition-opacity duration-300 group-hover:opacity-100 ${fontInfo.className}`}
    >
      <div
        className={fontInfo.className}
        style={{
          width: CANVAS_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          background: theme.bg,
          color: theme.ink,
          fontFamily: fontInfo.fontFamily,
          ["--font-sans" as any]: fontInfo.fontFamily,
          ["--font-display" as any]: fontInfo.fontFamily,
        }}
      >
        {blocksToRender.map((b) => {
          const variant = (b.props as any).variant as string | undefined;
          const Cmp = getBlockComponent(b.props.kind, variant, t.category, t.id);

          if (!Cmp) return null;

          return (
            <BlockErrorBoundary key={b.id}>
              <Cmp
                id={b.id}
                props={b.props}
                theme={theme}
                onChange={() => { }}
              />
            </BlockErrorBoundary>
          );
        })}
      </div>
    </div>
  );
}
