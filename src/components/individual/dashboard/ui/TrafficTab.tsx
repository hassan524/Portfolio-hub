import { useState } from "react";
import { geo, referrers, topPages } from "@/lib/portfolio-data";
import { BarRow, fmt } from "./DashboardShared";
import { ViewsAreaChart } from "./ApexAnalyticsCharts";
import { usePortfolioTrafficData } from "@/hooks/usePortfolios";

const RANGES = [
  { key: "24h", label: "24h" },
  { key: "7d", label: "7d" },
  { key: "30d", label: "30d" },
  { key: "90d", label: "3mo" },
] as const;

type RangeKey = (typeof RANGES)[number]["key"];

function RangeToggle({ range, setRange }: { range: RangeKey; setRange: (r: RangeKey) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface p-1">
      {RANGES.map((r) => (
        <button
          key={r.key}
          onClick={() => setRange(r.key)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            range === r.key
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {r.label}
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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Analytics & Traffic
        </h2>
        <RangeToggle range={range} setRange={setRange} />
      </div>

      <section className="rounded-xl border border-border bg-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Traffic Trends</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {loading ? "Loading…" : `${fmt.format(totalInRange)} views · ${RANGES.find((r) => r.key === range)?.label}`}
            </p>
          </div>
          <span className="font-mono text-xs font-medium text-emerald-500">Live</span>
        </div>
        <ViewsAreaChart dates={data?.dates} seriesData={data?.seriesData} loading={loading} />
      </section>

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 rounded-xl border border-border bg-surface p-5 lg:col-span-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Referring domains
          </h3>
          <div>
            {referrers.map((r) => (
              <BarRow key={r.host} label={r.host} value={fmt.format(r.visitors)} share={r.share} />
            ))}
          </div>
        </section>

        <section className="col-span-12 rounded-xl border border-border bg-surface p-5 lg:col-span-6">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Top pages
          </h3>
          <div>
            {topPages.map((p) => (
              <div
                key={p.path}
                className="grid grid-cols-12 items-center gap-4 border-t border-border py-2.5"
              >
                <span className="col-span-6 font-mono text-xs text-foreground">{p.path}</span>
                <span className="numeric col-span-3 text-right text-xs text-muted-foreground">
                  {fmt.format(p.views)}
                </span>
                <span className="numeric col-span-3 text-right text-xs text-muted-foreground">
                  {p.avg}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="col-span-12 rounded-xl border border-border bg-surface p-5">
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Geographic distribution
          </h3>
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