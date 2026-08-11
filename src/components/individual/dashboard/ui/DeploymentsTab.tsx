import { deployments } from "@/lib/portfolio-data";
import { DeployRow } from "./DashboardShared";

export function DeploymentsTab() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
        {[
          { l: "Production", v: "prod-a.vercel.app" },
          { l: "Build time", v: "38s" },
          { l: "Deploys · 7d", v: "18" },
          { l: "Success rate", v: "94%" },
        ].map((s) => (
          <div key={s.l} className="bg-surface p-6">
            <p className="eyebrow mb-2">{s.l}</p>
            <p className="numeric truncate text-base font-medium text-foreground">{s.v}</p>
          </div>
        ))}
      </div>
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="eyebrow">Deployment history</h2>
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            Vercel connected
          </span>
        </div>
        <div className="space-y-3">
          {deployments.map((d) => (
            <DeployRow key={d.sha} d={d} />
          ))}
        </div>
      </section>
    </div>
  );
}
