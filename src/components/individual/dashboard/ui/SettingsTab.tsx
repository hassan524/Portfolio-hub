import { useState } from "react";
import { StatusChip } from "@/components/ui/app-chrome";
import { Toggle } from "./DashboardShared";

export function SettingsTab({ domain }: { domain: string }) {
  const [indexable, setIndexable] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [password, setPassword] = useState(false);

  return (
    <div className="w-full space-y-12 bg-background py-2">
      {/* Domain & Hosting Section */}
      <section className="space-y-4">
        <div className="pb-3 border-b border-border">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Domain & Hosting
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure custom domains, Vercel edge deployment targets, and SSL certificates
          </p>
        </div>

        <div className="divide-y divide-border">
          <div className="py-4 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground">Custom domain</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Point your portfolio to a custom domain or subdomain you own.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <input
                type="text"
                defaultValue={domain}
                className="w-56 sm:w-72 rounded-md border border-input bg-background px-3 py-1.5 font-mono text-xs text-foreground outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="rounded-md bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity cursor-pointer">
                Save
              </button>
            </div>
          </div>

          <div className="py-4 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground">Deploy target</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Target server environment where builds are automatically shipped.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-muted-foreground bg-surface px-2.5 py-1 rounded border border-border">
                Vercel (fra1)
              </span>
              <button className="text-xs font-medium text-primary hover:underline cursor-pointer">
                Change
              </button>
            </div>
          </div>

          <div className="py-4 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground">SSL certificate</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Automatic HTTPS Encryption renewed every 90 days.
              </p>
            </div>
            <div className="shrink-0">
              <StatusChip state="ready" />
            </div>
          </div>
        </div>
      </section>

      {/* Visibility & Privacy Section */}
      <section className="space-y-4">
        <div className="pb-3 border-b border-border">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Visibility & Privacy
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Control search engine indexing, password locks, and visitor analytics
          </p>
        </div>

        <div className="divide-y divide-border">
          <div className="py-4 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground">Search engine indexing</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Allow Google, Bing, and web crawlers to index your site pages.
              </p>
            </div>
            <div className="shrink-0">
              <Toggle on={indexable} onChange={setIndexable} />
            </div>
          </div>

          <div className="py-4 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground">Password protection</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Require visitors to enter a security passphrase before loading.
              </p>
            </div>
            <div className="shrink-0">
              <Toggle on={password} onChange={setPassword} />
            </div>
          </div>

          <div className="py-4 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground">Anonymous analytics</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Collect cookieless visit data for performance insights.
              </p>
            </div>
            <div className="shrink-0">
              <Toggle on={analytics} onChange={setAnalytics} />
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone Section */}
      <section className="space-y-4">
        <div className="pb-3 border-b border-border">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Danger Zone
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Irreversible management actions for transferring or removing your portfolio
          </p>
        </div>

        <div className="divide-y divide-border">
          <div className="py-4 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground">Transfer portfolio</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Move ownership of this portfolio project to another workspace or team.
              </p>
            </div>
            <button className="shrink-0 rounded-md border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer">
              Transfer
            </button>
          </div>

          <div className="py-4 flex items-center justify-between gap-6">
            <div>
              <h3 className="text-sm font-medium text-foreground">Delete portfolio</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Permanently delete this project, custom domain routes, analytics, and data.
              </p>
            </div>
            <button className="shrink-0 rounded-md border border-destructive/30 px-3.5 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer">
              Delete project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
