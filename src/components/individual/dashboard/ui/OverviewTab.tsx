import { deployments, referrers, viewSeries } from "@/lib/portfolio-data";
import {
  BarRow,
  DeployRow,
  fmt,
  MetricBand,
  RangeToggle,
} from "./DashboardShared";

export function OverviewTab({
  range,
  setRange,
}: {
  range: string;
  setRange: (r: string) => void;
}) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-12 gap-px overflow-hidden rounded-xl border border-border bg-border shadow-[var(--shadow-panel)]">
        <MetricBand />

        <section className="col-span-12 bg-surface p-8 lg:col-span-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="eyebrow">Top referrers</h2>
            <span className="eyebrow">Share</span>
          </div>
          <div className="border-b border-border">
            {referrers.slice(0, 4).map((r) => (
              <BarRow key={r.host} label={r.host} value={fmt.format(r.visitors)} share={r.share} />
            ))}
          </div>
        </section>

        <section className="col-span-12 bg-surface p-8 lg:col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="eyebrow">Views over time</h2>
            <RangeToggle range={range} setRange={setRange} />
          </div>
          <div className="flex h-52 items-end gap-1">
            {viewSeries.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[2px] bg-primary/25 transition-colors hover:bg-primary"
                style={{ height: `${(v / Math.max(...viewSeries)) * 100}%` }}
                title={`${fmt.format(v)} views`}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between eyebrow">
            <span>Jul 12</span>
            <span>Jul 20</span>
            <span>Jul 28</span>
            <span>Aug 04</span>
            <span>Aug 10</span>
          </div>
        </section>
      </div>

      <section>
        <h2 className="eyebrow mb-5">Latest deployments</h2>
        <div className="space-y-3">
          {deployments.slice(0, 4).map((d) => (
            <DeployRow key={d.sha} d={d} />
          ))}
        </div>
      </section>
    </div>
  );
}

