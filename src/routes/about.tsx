import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PortfolioHub" },
      { name: "description", content: "Why we built PortfolioHub and who we build it for." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="About"
      title="Portfolios shouldn't take a weekend."
      subtitle="PortfolioHub is a small tool built by a small team who kept meeting talented people with no portfolio online. We got tired of hearing 'I'll set one up soon.' So we made it a five-minute job."
    >
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
        <div>
          <h2 className="font-display text-2xl">Our belief</h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            The best portfolio is a shipped one. Perfection stops more careers than
            typos ever will. Our job is to remove the friction between your work and
            the internet.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl">How we make money</h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            $6/month Pro subscriptions from people who want a custom domain or the
            fancier templates. No ads, no data selling, no VC pressure to
            enshittify. We're profitable on 3,000 Pro users — currently we have 4,281.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl">Where we live</h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            A team of six, distributed across Lisbon, Tokyo, and Toronto. We meet in
            person twice a year and don't take calls after 5pm local time.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl">What's next</h2>
          <p className="mt-3 text-ink-soft leading-relaxed">
            More templates, better analytics, an API for headless portfolios, and
            eventually a marketplace for third-party template creators.
          </p>
        </div>
      </div>
    </PageShell>
  ),
});
