import { geo, referrers, topPages } from "@/lib/portfolio-data";
import { BarRow, fmt, RangeToggle } from "./DashboardShared";

export function TrafficTab({
  range,
  setRange,
}: {
  range: string;
  setRange: (r: string) => void;
}) {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium tracking-tight text-foreground">
          Where your <span className="font-serif italic text-primary">traffic</span> comes from
        </h2>
        <RangeToggle range={range} setRange={setRange} />
      </div>

      <div className="grid grid-cols-12 gap-px overflow-hidden rounded-xl border border-border bg-border">
        <section className="col-span-12 bg-surface p-8 lg:col-span-6">
          <h3 className="eyebrow mb-6">Referring domains</h3>
          <div className="border-b border-border">
            {referrers.map((r) => (
              <BarRow key={r.host} label={r.host} value={fmt.format(r.visitors)} share={r.share} />
            ))}
          </div>
        </section>
        <section className="col-span-12 bg-surface p-8 lg:col-span-6">
          <h3 className="eyebrow mb-6">Top pages</h3>
          <div className="border-b border-border">
            {topPages.map((p) => (
              <div
                key={p.path}
                className="grid grid-cols-12 items-center gap-4 border-t border-border py-3"
              >
                <span className="col-span-6 font-mono text-[12px] text-foreground">{p.path}</span>
                <span className="numeric col-span-3 text-right text-sm text-muted-foreground">
                  {fmt.format(p.views)}
                </span>
                <span className="numeric col-span-3 text-right text-[12px] text-subtle">{p.avg}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-12 bg-surface p-8 lg:col-span-6">
          <h3 className="eyebrow mb-6">Countries</h3>
          <div className="border-b border-border">
            {geo.map((g) => (
              <BarRow key={g.country} label={g.country} value="" share={g.share} />
            ))}
          </div>
        </section>
        <section className="col-span-12 bg-surface p-8 lg:col-span-6">
          <h3 className="eyebrow mb-6">Devices</h3>
          <div className="border-b border-border">
            <BarRow label="Desktop" value="74,935" share={60} />
            <BarRow label="Mobile" value="43,712" share={35} />
            <BarRow label="Tablet" value="6,245" share={5} />
          </div>
        </section>
      </div>
    </div>
  );
}
