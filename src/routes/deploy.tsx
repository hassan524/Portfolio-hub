import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Copy, Globe, Shield, Rocket, ExternalLink } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/deploy")({
  head: () => ({
    meta: [
      { title: "Deploy — PortfolioHub" },
      { name: "description", content: "Publish your portfolio to a live URL in one click." },
    ],
  }),
  component: Deploy,
});

function Deploy() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-hero-glow">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Deployment</span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl leading-[0.95]">
            Live at <span className="italic text-gradient-brand">ari.portfoliohub.app</span>
          </h1>
          <p className="mt-4 text-ink-soft">Last published 2 hours ago · SSL active · Edge cached in 300+ cities.</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-4 py-2.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.18_150)]" />
              https://ari.portfoliohub.app
              <button className="ml-1 p-1 hover:bg-secondary rounded" aria-label="Copy">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-4 py-2.5 text-sm hover:bg-secondary"
            >
              Open <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2.5 text-sm font-medium">
              <Rocket className="h-4 w-4" /> Redeploy
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border p-8">
          <Globe className="h-5 w-5" strokeWidth={1.5} />
          <h3 className="mt-5 font-display text-2xl">Custom domain</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Connect a domain you already own. SSL is handled for you.
          </p>
          <div className="mt-6 rounded-xl border border-dashed border-border p-4 bg-surface text-xs font-mono text-ink-soft">
            <div>Type: CNAME</div>
            <div>Name: @</div>
            <div>Value: sites.portfoliohub.app</div>
          </div>
          <Link
            to="/domains"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            Connect a domain →
          </Link>
        </div>

        <div className="rounded-2xl border border-border p-8">
          <Shield className="h-5 w-5" strokeWidth={1.5} />
          <h3 className="mt-5 font-display text-2xl">Privacy & access</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Keep drafts private until you're ready.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { l: "Password protection", on: false },
              { l: "Search engine indexing", on: true },
              { l: "Public analytics page", on: false },
            ].map((s) => (
              <label key={s.l} className="flex items-center justify-between rounded-lg border border-border p-3 cursor-pointer">
                <span className="text-sm">{s.l}</span>
                <span
                  className={`h-5 w-9 rounded-full relative transition-colors ${
                    s.on ? "bg-foreground" : "bg-border"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all ${
                      s.on ? "left-[calc(100%-1.125rem)]" : "left-0.5"
                    }`}
                  />
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="font-display text-3xl">Deploy history</h2>
          <div className="mt-6 rounded-2xl border border-border overflow-hidden">
            {[
              { v: "v14", t: "2 hours ago", note: "Updated projects section", live: true },
              { v: "v13", t: "yesterday", note: "Changed bio copy" },
              { v: "v12", t: "3 days ago", note: "Added Field Notes case study" },
              { v: "v11", t: "1 week ago", note: "Initial publish" },
            ].map((d) => (
              <div
                key={d.v}
                className="flex items-center justify-between border-b border-border last:border-b-0 px-6 py-4 hover:bg-surface"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-ink-soft w-10">{d.v}</span>
                  <div>
                    <div className="text-sm">{d.note}</div>
                    <div className="text-xs text-ink-soft">{d.t}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {d.live && (
                    <span className="inline-flex items-center gap-1 text-xs text-[oklch(0.35_0.1_150)]">
                      <Check className="h-3.5 w-3.5" /> Live
                    </span>
                  )}
                  <button className="text-xs rounded-full border border-border px-3 py-1.5 hover:bg-secondary">
                    Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
