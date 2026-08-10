import { PageShell, Prose } from "@/components/individual/PageShell";

export function PrivacyPage() {
  return (
    <PageShell eyebrow="Legal" title="Privacy policy" subtitle="Last updated: July 2026">
      <Prose>
        <h2>The short version</h2>
        <p>We collect the minimum data needed to run your portfolio, we never sell it, and we never use third-party trackers on portflu.app or on the portfolios you publish.</p>
        <h2>What we collect</h2>
        <p>Your email and password (hashed) when you sign up. The content of your portfolio. Aggregated page-view counts for your published sites. Standard server logs for 30 days.</p>
        <h2>Analytics</h2>
        <p>We use our own privacy-friendly analytics — no cookies, no fingerprinting, no third-party pixels. Visitor IPs are hashed and discarded within 24 hours.</p>
        <h2>Cookies</h2>
        <p>We use a single first-party session cookie to keep you signed in. That's it. See our <a href="/cookies">cookie policy</a> for details.</p>
        <h2>Your rights (GDPR / CCPA)</h2>
        <p>You can export or delete all your data at any time from your dashboard, no support ticket required. Requests are honored within 24 hours.</p>
        <h2>Contact</h2>
        <p>Data privacy questions: <a href="mailto:privacy@portflu.app">privacy@portflu.app</a></p>
      </Prose>
    </PageShell>
  );
}
