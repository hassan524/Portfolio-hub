import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/domains")({
  head: () => ({
    meta: [
      { title: "Custom domains — PortfolioHub" },
      { name: "description", content: "Connect a domain you own to your portfolio." },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Settings" title="Custom domains" subtitle="Point your domain at PortfolioHub. We handle SSL automatically.">
      <div className="rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.65_0.18_150)]" />
            <div>
              <div className="font-medium">ari.dev</div>
              <div className="text-xs text-ink-soft">Verified · SSL active · Primary</div>
            </div>
          </div>
          <button className="text-sm text-ink-soft hover:text-ink">Manage</button>
        </div>
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.15_85)]" />
            <div>
              <div className="font-medium">notes.ari.dev</div>
              <div className="text-xs text-ink-soft">SSL provisioning...</div>
            </div>
          </div>
          <button className="text-sm text-ink-soft hover:text-ink">Manage</button>
        </div>
      </div>

      <div className="mt-8 flex gap-2">
        <input
          placeholder="add-a-domain.com"
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button className="rounded-lg bg-foreground text-background px-5 py-2.5 text-sm font-medium">Add</button>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl">How to connect</h2>
        <ol className="mt-4 space-y-3 text-sm">
          {[
            "In your DNS provider, add a CNAME record pointing at sites.portfoliohub.app.",
            "Wait for propagation (usually 5-30 minutes).",
            "We'll auto-issue an SSL certificate. Your site goes live.",
          ].map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-foreground text-background text-[10px] shrink-0 mt-0.5">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
        <div className="mt-6 inline-flex items-center gap-2 text-xs text-[oklch(0.5_0.1_150)]">
          <Check className="h-3.5 w-3.5" /> SSL certificates auto-renew every 60 days.
        </div>
      </div>
    </PageShell>
  ),
});
