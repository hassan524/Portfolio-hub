import { useState } from "react";
import { geo, referrers, topPages } from "@/lib/portfolio-data";
import { BarRow, fmt } from "./DashboardShared";
import { ViewsAreaChart } from "./ApexAnalyticsCharts";
import { usePortfolioTrafficData } from "@/hooks/usePortfolios";

const RANGES = [
  { key: "24h", label: "24H", fullLabel: "24 hours" },
  { key: "7d", label: "7D", fullLabel: "7 days" },
  { key: "30d", label: "30D", fullLabel: "30 days" },
  { key: "90d", label: "90D", fullLabel: "3 months" },
] as const;

type RangeKey = (typeof RANGES)[number]["key"];

function RangeToggle({ range, setRange }: { range: RangeKey; setRange: (r: RangeKey) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-card p-1 self-start sm:self-auto">
      {RANGES.map((r) => (
        <button
          key={r.key}
          onClick={() => setRange(r.key)}
          className={`rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            range === r.key
              ? "bg-foreground text-background shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="sm:hidden">{r.label}</span>
          <span className="hidden sm:inline">{r.fullLabel}</span>
        </button>
      ))}
    </div>
  );
}

export function TrafficTab({ portfolioId }: { portfolioId: string }) {
  const [range, setRange] = useState<RangeKey>("7d");
  const { data, loading } = usePortfolioTrafficData(portfolioId, range);

  const totalInRange = data?.seriesData?.reduce((a, b) => a + b, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
            Traffic Analytics
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor page visits, top referrers, and visitor regions
          </p>
        </div>
        <RangeToggle range={range} setRange={setRange} />
      </div>

      <section className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-foreground">Views Trend</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {loading ? "Loading data..." : `${fmt.format(totalInRange)} total views · ${RANGES.find((r) => r.key === range)?.fullLabel}`}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground shrink-0">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-indigo-500"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground">Live Telemetry</span>
          </div>
        </div>
        <ViewsAreaChart dates={data?.dates} seriesData={data?.seriesData} loading={loading} />
      </section>

      <div className="grid grid-cols-12 gap-5 sm:gap-6">
        <section className="col-span-12 lg:col-span-6 rounded-2xl border border-border/80 bg-surface/90 p-4 sm:p-6 shadow-soft space-y-4">
          <div className="border-b border-border/60 pb-3">
            <h3 className="text-sm font-bold text-foreground">
              Top Traffic Sources
            </h3>
            <p className="text-xs text-muted-foreground">Inbound visitor websites</p>
          </div>
          <div>
            {referrers.map((r) => (
              <BarRow key={r.host} label={r.host} value={fmt.format(r.visitors)} share={r.share} />
            ))}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-6 rounded-2xl border border-border/80 bg-surface/90 p-4 sm:p-6 shadow-soft space-y-4">
          <div className="border-b border-border/60 pb-3">
            <h3 className="text-sm font-bold text-foreground">
              Top Visited Pages
            </h3>
            <p className="text-xs text-muted-foreground">Most popular pages across portfolio</p>
          </div>
          <div className="divide-y divide-border/50">
            {topPages.map((p) => (
              <div
                key={p.path}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <span className="font-mono text-xs font-semibold text-foreground truncate min-w-0 flex-1">{p.path}</span>
                <div className="flex items-center gap-3 shrink-0 text-right">
                  <span className="numeric text-xs font-semibold text-foreground">
                    {fmt.format(p.views)} views
                  </span>
                  <span className="numeric text-xs text-muted-foreground font-mono hidden xs:inline">
                    {p.avg} avg
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="col-span-12 rounded-2xl border border-border/80 bg-surface/90 p-4 sm:p-6 shadow-soft space-y-4">
          <div className="border-b border-border/60 pb-3">
            <h3 className="text-sm font-bold text-foreground">
              Visitor Countries
            </h3>
            <p className="text-xs text-muted-foreground">Visitor distribution by region</p>
          </div>
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {geo.map((g) => (
              <BarRow key={g.country} label={g.country} value="" share={g.share} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}