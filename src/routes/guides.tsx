import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Guides — PortfolioHub" },
      { name: "description", content: "Step-by-step guides for every part of PortfolioHub." },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Learn" title="Guides" subtitle="Short, focused walkthroughs. No 40-minute video tutorials.">
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { t: "Getting started in 10 minutes", d: "Sign up, pick a template, publish. The whole loop." },
          { t: "Writing a case study that reads", d: "The four-part structure we recommend for every project." },
          { t: "Connecting a custom domain", d: "DNS records, SSL, common gotchas." },
          { t: "Working with markdown", d: "Every keyboard shortcut and syntax quirk." },
          { t: "Optimizing images", d: "Compression, sizing, and when to use each format." },
          { t: "Analytics without cookies", d: "How to read your traffic and act on it." },
        ].map((g) => (
          <div key={g.t} className="rounded-2xl border border-border p-6 hover:bg-surface transition-colors cursor-pointer">
            <h3 className="font-medium">{g.t}</h3>
            <p className="mt-2 text-sm text-ink-soft">{g.d}</p>
          </div>
        ))}
      </div>
    </PageShell>
  ),
});
