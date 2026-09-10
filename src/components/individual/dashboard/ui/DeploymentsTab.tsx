import { deployments } from "@/lib/portfolio-data";
import { DeployRow } from "./DashboardShared";

export function DeploymentsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { l: "Production", v: "prod-a.vercel.app" },
          { l: "Build time", v: "38s" },
          { l: "Deploys (7d)", v: "18" },
          { l: "Success rate", v: "94%" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs font-medium text-muted-foreground mb-1">{s.l}</p>
            <p className="numeric truncate text-base font-semibold text-foreground">{s.v}</p>
          </div>
        ))}
      </div>
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deployment history</h2>
          <span className="text-xs text-muted-foreground">
            Vercel connected
          </span>
        </div>
        <div className="space-y-2.5">
          {deployments.map((d) => (
            <DeployRow key={d.sha} d={d} />
          ))}
        </div>
      </section>
    </div>
  );
}

