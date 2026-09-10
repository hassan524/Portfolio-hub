import { MetricBand } from "./DashboardShared";
import { Download, Code2, CheckCircle2, ShieldCheck, Cpu, Terminal } from "lucide-react";

interface OverviewTabProps {
  portfolio?: {
    id: string;
    title: string;
    domain?: string;
    description?: string;
  };
  range: string;
  setRange: (r: string) => void;
}

export function OverviewTab({
  portfolio,
  range: _range,
  setRange: _setRange,
}: OverviewTabProps) {
  const recentActivities = [
    { title: "Portfolio deployed", time: "12 min ago" },
    { title: "Domain connected", time: "2 days ago" },
    { title: "Hero section updated", time: "3 days ago" },
    { title: "Portfolio published", time: "5 days ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Fetchable Metrics */}
      <MetricBand />

      {/* Main Cockpit Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Project Details & Status Card */}
        <section className="col-span-12 rounded-xl border border-border bg-surface p-6 lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-foreground">Project Cockpit</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Configuration state and source code build environment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-background p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <Cpu className="size-4 text-primary" />
                <span>Build Engine</span>
              </div>
              <p className="text-xs text-muted-foreground">Vite + React 19 (TypeScript)</p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <ShieldCheck className="size-4 text-emerald-500" />
                <span>SSL & Domain</span>
              </div>
              <p className="text-xs text-muted-foreground">{portfolio?.domain || "Custom Domain Active"}</p>
            </div>
          </div>

          {/* Project Code Export Box */}
          <div className="rounded-lg border border-border bg-background p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Project Code Export</h3>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">v1.4.0</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Export your portfolio source code as a standalone React project or synced repository.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => alert("Downloading source code ZIP...")}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer"
              >
                <Download className="size-3.5" />
                Download Source ZIP
              </button>
              <button
                onClick={() => alert("GitHub repository link synced.")}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent cursor-pointer"
              >
                <Terminal className="size-3.5" />
                Sync GitHub Repo
              </button>
            </div>
          </div>
        </section>

        {/* Recent Activity Card */}
        <section className="col-span-12 rounded-xl border border-border bg-surface p-6 lg:col-span-5 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-foreground">Recent Activity</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Timeline of changes and deployments</p>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act) => (
              <div
                key={act.title + act.time}
                className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3 text-xs"
              >
                <div className="flex items-center gap-2.5 font-medium text-foreground">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>{act.title}</span>
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">{act.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
