import { useState } from "react";
import { StatusChip } from "@/components/ui/app-chrome";
import { Toggle } from "./DashboardShared";
import { Globe, Shield, AlertTriangle } from "lucide-react";

export function SettingsTab({ domain }: { domain: string }) {
  const [indexable, setIndexable] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [password, setPassword] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Domain & Hosting Card */}
      <section className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <div className="border-b border-border bg-surface-raised/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="size-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Domain & Hosting
            </h2>
          </div>
          <span className="text-[11px] font-mono text-subtle">Configuration</span>
        </div>

        <div className="divide-y divide-border">
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Custom domain</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Point your portfolio to a domain you own.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                defaultValue={domain}
                className="w-full sm:w-64 rounded-xl border border-input bg-background px-3.5 py-2 font-mono text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                Save
              </button>
            </div>
          </div>

          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Deploy target</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Where each publish is shipped.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-surface-raised px-3 py-1.5 font-mono text-xs text-foreground ring-1 ring-inset ring-border-strong">
                Vercel · fra1
              </span>
              <button className="text-xs font-semibold text-primary hover:underline">
                Change
              </button>
            </div>
          </div>

          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">SSL certificate</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Auto-renewed every 90 days.
              </p>
            </div>
            <StatusChip state="ready" />
          </div>
        </div>
      </section>

      {/* Visibility & Privacy Card */}
      <section className="rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
        <div className="border-b border-border bg-surface-raised/40 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="size-4 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Visibility & Privacy
            </h2>
          </div>
          <span className="text-[11px] font-mono text-subtle">Access & SEO</span>
        </div>

        <div className="divide-y divide-border">
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Search engine indexing</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Let Google and search engines index your portfolio.
              </p>
            </div>
            <Toggle on={indexable} onChange={setIndexable} />
          </div>

          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Password protection</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Require a passphrase before the site loads.
              </p>
            </div>
            <Toggle on={password} onChange={setPassword} />
          </div>

          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Anonymous analytics</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Collect cookieless visit data for this project.
              </p>
            </div>
            <Toggle on={analytics} onChange={setAnalytics} />
          </div>
        </div>
      </section>

      {/* Danger Zone Card */}
      <section className="rounded-2xl border border-destructive/30 bg-destructive/5 overflow-hidden shadow-sm">
        <div className="border-b border-destructive/20 bg-destructive/10 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-4 text-destructive" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-destructive">
              Danger Zone
            </h2>
          </div>
          <span className="text-[11px] font-mono text-destructive/80">Irreversible</span>
        </div>

        <div className="divide-y divide-destructive/20">
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Transfer portfolio</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Move this project to another workspace.
              </p>
            </div>
            <button className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent">
              Transfer
            </button>
          </div>

          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">Delete portfolio</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Permanently remove the site, analytics and settings.
              </p>
            </div>
            <button className="rounded-xl bg-destructive px-4 py-2 text-xs font-semibold text-destructive-foreground transition-opacity hover:opacity-90">
              Delete project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
