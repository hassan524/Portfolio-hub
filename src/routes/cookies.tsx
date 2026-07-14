import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie policy — PortfolioHub" },
      { name: "description", content: "The one cookie we use, and why." },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Legal" title="Cookie policy" subtitle="Last updated: July 2026">
      <Prose>
        <h2>One cookie</h2>
        <p>We use exactly one cookie: a first-party session token so you don't have to log in on every page. No third-party trackers, no analytics cookies, no ad networks.</p>
        <h2>Portfolios you publish</h2>
        <p>By default, portfolios published on portfoliohub.app or custom domains have zero cookies. If you add third-party embeds (YouTube, Vimeo), those services set their own cookies — that's on them.</p>
      </Prose>
    </PageShell>
  ),
});
