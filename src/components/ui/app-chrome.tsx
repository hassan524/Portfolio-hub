import { Link, NavLink } from "react-router-dom";
import type { ReactNode } from "react";

export function TopBar({ crumbs }: { crumbs?: ReactNode }) {
  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Portfliu
        </Link>

        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground">
          {crumbs ?? "Personal"}
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          <NavLink
            to="/templates"
            className={({ isActive }) =>
              `rounded-full px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            Templates
          </NavLink>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-full px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            My Portfolios
          </NavLink>
        </nav>
      </div>

      {/* User */}
      <div className="text-sm font-medium text-foreground">HR</div>
    </header>
  );
}

export function AppFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-5 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-primary" />
        <span>All systems operational</span>
      </div>

      <div>Region · fra1</div>

      <div>Portfliu Systems · v2.4.0</div>
    </footer>
  );
}

export function StatusChip({
  state,
}: {
  state: "live" | "building" | "draft" | "ready" | "error";
}) {
  const map = {
    live: {
      label: "Live",
      tone: "text-primary bg-primary/10",
      dot: "bg-primary",
    },
    ready: {
      label: "Ready",
      tone: "text-primary bg-primary/10",
      dot: "bg-primary",
    },
    building: {
      label: "Building",
      tone: "text-warning bg-warning/10",
      dot: "bg-warning",
    },
    draft: {
      label: "Draft",
      tone: "text-subtle bg-muted",
      dot: "bg-subtle",
    },
    error: {
      label: "Failed",
      tone: "text-destructive bg-destructive/10",
      dot: "bg-destructive",
    },
  } as const;

  const s = map[state];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${s.tone}`}
    >
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export function Sparkline({
  data,
  className = "",
}: {
  data: number[];
  className?: string;
}) {
  if (!data.length) {
    return null;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);

  const pts = data
    .map((v, i) => {
      const x = data.length === 1 ? 0 : (i / (data.length - 1)) * 100;
      const y = 28 - ((v - min) / (max - min || 1)) * 26;

      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <polyline
        points={pts}
        vectorEffect="non-scaling-stroke"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}