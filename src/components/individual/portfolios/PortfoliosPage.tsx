import { Link } from "react-router-dom";
import { PageShell } from "@/components/individual/PageShell";
import { Sparkline } from "@/components/ui/app-chrome";
import { portfolios, viewSeries } from "@/lib/portfolio-data";

const fmt = new Intl.NumberFormat("en-US");

export function PortfoliosPage() {
  const totalViews = portfolios.reduce((a, p) => a + p.views30d, 0);
  const live = portfolios.filter((p) => p.status === "live").length;

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">Workspace</p>
            <h1 className="text-3xl font-medium leading-tight tracking-tight text-foreground">
              Your portfolios, instrumented
            </h1>
            <p className="mt-2 max-w-[56ch] text-sm text-muted-foreground">
              {portfolios.length} projects · {live} live · {fmt.format(totalViews)} views in the last
              30 days.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/templates"
              className="rounded-full bg-surface px-4 py-2 text-sm text-foreground ring-1 ring-inset ring-border-strong transition-colors hover:bg-accent"
            >
              Browse templates
            </Link>
            <Link
              to="/templates"
              className="flex items-center gap-2 rounded-full bg-secondary py-2 pl-3 pr-4 text-sm font-semibold text-secondary-foreground transition-[filter] hover:brightness-110"
            >
              <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              New portfolio
            </Link>
          </div>
        </header>

        {/* Metric band */}
        <section className="mb-10 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          <Metric label="Views · 30d" value={fmt.format(totalViews)} delta="+12.4%" />
          <Metric label="Unique visitors" value="61,204" delta="+8.1%" />
          <Metric label="Avg. session" value="02:45" delta="-2.0%" negative />
          <Metric label="Deploys this week" value="18" delta="+5" />
        </section>

        <div className="mb-5 flex items-end justify-between">
          <h2 className="eyebrow">All projects</h2>
          <div className="flex gap-1 rounded-lg bg-surface p-1 ring-1 ring-inset ring-border">
            <button className="rounded-md bg-surface-raised px-3 py-1 text-[11px] font-semibold text-foreground">
              Grid
            </button>
            <button className="rounded-md px-3 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:text-foreground">
              Table
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portfolios.map((p) => (
            <Link
              key={p.id}
              to={`/dashboard?portfolioId=${encodeURIComponent(p.id)}`}
              className="group panel overflow-hidden transition-colors hover:border-border-strong"
            >
              <div className="relative aspect-video overflow-hidden bg-background">
                <img
                  src={p.thumb}
                  alt={`${p.template} template preview for ${p.name}`}
                  loading="lazy"
                  width={910}
                  height={512}
                  className="size-full object-cover object-top opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
                <span className="absolute left-3 top-3">
                  {/* <StatusChip state={p.status} />  */}
                </span>
              </div>
              <div className="border-t border-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{p.name}</h3>
                    <p className="mt-1 font-mono text-[11px] text-subtle">{p.domain}</p>
                  </div>
                  <div className="h-6 w-16 shrink-0">
                    {p.views30d > 0 && <Sparkline data={viewSeries.slice(-12)} className="size-full" />}
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="eyebrow mb-1">Views 30d</p>
                    <p className="numeric text-sm text-foreground">
                      {p.views30d ? fmt.format(p.views30d) : "—"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="eyebrow mb-1">Edited</p>
                    <p className="text-sm text-muted-foreground">{p.lastEdited}</p>
                  </div>
                  <span className="translate-x-1 text-xs font-semibold text-subtle opacity-0 transition-all group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100">
                    Open →
                  </span>
                </div>
              </div>
            </Link>
          ))}

          <Link
            to="/templates"
            className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border-strong text-center transition-colors hover:border-primary/50"
          >
            <span className="grid size-9 place-items-center rounded-full bg-surface-raised">
              <svg className="size-4 text-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span className="text-sm font-medium text-muted-foreground">Start from a template</span>
          </Link>
        </section>
      </div>
    </PageShell>
  );
}

function Metric({
  label,
  value,
  delta,
  negative,
}: {
  label: string;
  value: string;
  delta: string;
  negative?: boolean;
}) {
  return (
    <div className="bg-surface p-6">
      <p className="eyebrow mb-3">{label}</p>
      <div className="flex items-end justify-between">
        <span className="numeric text-2xl font-medium text-foreground">{value}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${negative ? "bg-muted text-subtle" : "bg-primary/10 text-primary"
            }`}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}
