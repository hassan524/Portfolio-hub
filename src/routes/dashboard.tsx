import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ExternalLink, Settings, BarChart3, MoreHorizontal, Globe } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PortfolioHub" },
      { name: "description", content: "Manage your portfolios, edit content, and view analytics." },
    ],
  }),
  component: Dashboard,
});

const SITES = [
  {
    name: "ari.portfolio",
    template: "Atlas",
    status: "Published",
    url: "ari.portfoliohub.app",
    updated: "2 hours ago",
    views: 1284,
    accent: "oklch(0.72 0.18 40)",
  },
  {
    name: "kohen-studio",
    template: "Orbit",
    status: "Draft",
    url: "kohen.portfoliohub.app",
    updated: "yesterday",
    views: 0,
    accent: "oklch(0.55 0.18 260)",
  },
  {
    name: "field-notes",
    template: "Monoline",
    status: "Published",
    url: "notes.ari.dev",
    updated: "3 days ago",
    views: 542,
    accent: "oklch(0.65 0.15 150)",
  },
];

function Dashboard() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">
                Welcome back
              </span>
              <h1 className="mt-2 font-display text-4xl md:text-5xl leading-[0.95]">
                Your portfolios
              </h1>
            </div>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium shadow-soft"
            >
              <Plus className="h-4 w-4" /> New portfolio
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { l: "Portfolios", v: "3" },
              { l: "Total views (30d)", v: "1,826" },
              { l: "Custom domains", v: "1" },
              { l: "Plan", v: "Free" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-background p-5">
                <div className="text-xs text-ink-soft">{s.l}</div>
                <div className="mt-2 font-display text-3xl">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-2xl border border-border overflow-hidden bg-background">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-surface text-[11px] uppercase tracking-widest text-ink-soft border-b border-border">
            <div className="col-span-5">Site</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Views (30d)</div>
            <div className="col-span-2">Updated</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          {SITES.map((s) => (
            <div
              key={s.name}
              className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-border last:border-b-0 items-center hover:bg-surface transition-colors"
            >
              <div className="col-span-5 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-lg shrink-0"
                  style={{ background: s.accent }}
                />
                <div className="min-w-0">
                  <div className="font-medium truncate">{s.name}</div>
                  <div className="text-xs text-ink-soft truncate">
                    {s.template} · {s.url}
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                    s.status === "Published"
                      ? "bg-[oklch(0.94_0.06_150)] text-[oklch(0.35_0.1_150)]"
                      : "bg-secondary text-ink-soft"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {s.status}
                </span>
              </div>
              <div className="col-span-2 text-sm">{s.views.toLocaleString()}</div>
              <div className="col-span-2 text-sm text-ink-soft">{s.updated}</div>
              <div className="col-span-1 flex justify-end gap-1">
                <Link to="/editor" className="p-2 hover:bg-secondary rounded-md" aria-label="Edit">
                  <Settings className="h-4 w-4" />
                </Link>
                <Link to="/analytics" className="p-2 hover:bg-secondary rounded-md" aria-label="Analytics">
                  <BarChart3 className="h-4 w-4" />
                </Link>
                <Link to="/deploy" className="p-2 hover:bg-secondary rounded-md" aria-label="Deploy">
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <button className="p-2 hover:bg-secondary rounded-md" aria-label="More">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { t: "Custom domains", d: "Connect a domain you already own.", to: "/domains", i: Globe },
            { t: "Analytics", d: "See where your visitors come from.", to: "/analytics", i: BarChart3 },
            { t: "Deploy settings", d: "SSL, caching, redirects.", to: "/deploy", i: Settings },
          ].map((c) => (
            <Link
              key={c.t}
              to={c.to}
              className="rounded-2xl border border-border p-6 hover:bg-surface transition-colors"
            >
              <c.i className="h-5 w-5" strokeWidth={1.5} />
              <h3 className="mt-4 font-medium">{c.t}</h3>
              <p className="mt-1 text-sm text-ink-soft">{c.d}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
