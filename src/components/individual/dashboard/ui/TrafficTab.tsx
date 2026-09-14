import { useState } from "react";
import { viewSeries } from "@/lib/portfolio-data";
import { BarRow, fmt } from "./DashboardShared";
import { ViewsAreaChart } from "./ApexAnalyticsCharts";

const RANGES = [
  { key: "24h", label: "24H", fullLabel: "24 hours" },
  { key: "7d", label: "7D", fullLabel: "7 days" },
  { key: "30d", label: "30D", fullLabel: "30 days" },
  { key: "90d", label: "90D", fullLabel: "3 months" },
] as const;

type RangeKey = (typeof RANGES)[number]["key"];

type RankedItem = { label: string; count: number; share: number };
type PageItem = { path: string; views: number };

interface TrafficTabProps {
  portfolioId: string;
  totalViews: number;
  topSources: RankedItem[];
  topPages: PageItem[];
  topCountries: RankedItem[];
  loading: boolean;
}

function RangeToggle({ range, setRange }: { range: RangeKey; setRange: (r: RangeKey) => void }) {
  return (
    <div className="flex items-center gap-1 rounded-md border border-white/[0.07] bg-white/[0.03] p-1 self-start sm:self-auto">
      {RANGES.map((r) => (
        <button
          key={r.key}
          onClick={() => setRange(r.key)}
          className={`rounded-md px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${range === r.key
            ? "bg-white text-black"
            : "text-white/30 hover:text-white/60"
            }`}
        >
          <span className="sm:hidden">{r.label}</span>
          <span className="hidden sm:inline">{r.fullLabel}</span>
        </button>
      ))}
    </div>
  );
}

// dummy stand-in for the trend chart only — this endpoint doesn't produce
// time-series data yet, see note below
const dummyDates = ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5", "Jan 6", "Jan 7"];
const dummySeriesData = viewSeries?.slice(-7) ?? [12, 19, 8, 24, 16, 30, 22];

export function TrafficTab({
  portfolioId,
  totalViews,
  topSources,
  topPages,
  topCountries,
  loading,
}: TrafficTabProps) {
  const [range, setRange] = useState<RangeKey>("7d");

  const dates = dummyDates;
  const seriesData = dummySeriesData;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Traffic Analytics
          </h2>
          <p className="text-sm text-white/30 mt-1">
            Page visits, referrers, and visitor regions
          </p>
        </div>
        <RangeToggle range={range} setRange={setRange} />
      </div>

      <section className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-semibold text-white">Views Trend</h3>
            <p className="mt-1 text-xs text-white/30">
              {loading ? "Loading..." : `${fmt.format(totalViews)} total views · all time`}
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/20">Live</span>
        </div>
        <ViewsAreaChart dates={dates} seriesData={seriesData} loading={loading} />
      </section>

      <div className="grid grid-cols-12 gap-5 sm:gap-6">
        <section className="col-span-12 lg:col-span-6 rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 space-y-4">
          <div className="pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Top Sources</h3>
            <p className="text-xs text-white/25 mt-1">Inbound visitor websites</p>
          </div>
          <div>
            {loading ? (
              <p className="text-xs text-white/25">Loading...</p>
            ) : topSources.length === 0 ? (
              <p className="text-xs text-white/25">No data yet</p>
            ) : (
              topSources.map((r) => (
                <BarRow key={r.label} label={r.label} value={fmt.format(r.count)} share={r.share} />
              ))
            )}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-6 rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 space-y-4">
          <div className="pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Top Pages</h3>
            <p className="text-xs text-white/25 mt-1">Most visited pages</p>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {loading ? (
              <p className="text-xs text-white/25 py-3">Loading...</p>
            ) : topPages.length === 0 ? (
              <p className="text-xs text-white/25 py-3">No data yet</p>
            ) : (
              topPages.map((p) => (
                <div
                  key={p.path}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <span className="font-mono text-xs text-white/50 truncate min-w-0 flex-1">{p.path}</span>
                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <span className="numeric text-xs text-white/60">
                      {fmt.format(p.views)} views
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="col-span-12 rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 space-y-4">
          <div className="pb-3 border-b border-white/[0.06]">
            <h3 className="text-sm font-semibold text-white">Visitor Countries</h3>
            <p className="text-xs text-white/25 mt-1">Distribution by region</p>
          </div>
          <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {loading ? (
              <p className="text-xs text-white/25">Loading...</p>
            ) : topCountries.length === 0 ? (
              <p className="text-xs text-white/25">No data yet</p>
            ) : (
              topCountries.map((g) => (
                <BarRow key={g.label} label={g.label} value="" share={g.share} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}