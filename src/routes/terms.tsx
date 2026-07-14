import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — PortfolioHub" },
      { name: "description", content: "The terms of using PortfolioHub." },
    ],
  }),
  component: () => (
    <PageShell eyebrow="Legal" title="Terms of service" subtitle="Last updated: July 2026">
      <Prose>
        <h2>Your content stays yours</h2>
        <p>Everything you upload to PortfolioHub — text, images, layouts — belongs to you. We store it, serve it, and let you export it. That's the whole deal.</p>
        <h2>Acceptable use</h2>
        <p>Don't publish anything illegal, don't impersonate other people, don't host phishing or malware. We reserve the right to suspend accounts that do.</p>
        <h2>Uptime</h2>
        <p>We aim for 99.9% uptime and publish real numbers at <a href="/status">/status</a>. Pro customers get a service credit for extended outages.</p>
        <h2>Billing</h2>
        <p>Pro is billed monthly. You can cancel any time from your dashboard. Full refunds within 14 days.</p>
        <h2>Termination</h2>
        <p>You can delete your account at any time. We can terminate accounts that violate these terms — with 30 days notice unless the violation is severe.</p>
      </Prose>
    </PageShell>
  ),
});
