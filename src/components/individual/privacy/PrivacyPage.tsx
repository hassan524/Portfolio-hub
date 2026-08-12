import { PageShell, Prose } from "@/components/individual/PageShell";

export function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy"
      subtitle="We collect the minimum data needed to run your portfolio. We never sell it and never use third-party trackers."
    >
      <Prose>
        <h2>What we collect</h2>
        <p>Email and hashed password at signup. Your portfolio content. Aggregated page views. Server logs kept 30 days.</p>
        <h2>Analytics & cookies</h2>
        <p>Privacy-friendly analytics — no cookies, no fingerprinting. One session cookie to keep you signed in. See our <a href="/cookies">cookie policy</a>.</p>
        <h2>Your rights</h2>
        <p>Export or delete all data from your dashboard anytime. GDPR/CCPA requests honored within 24 hours.</p>
        <h2>Contact</h2>
        <p><a href="mailto:privacy@portflu.app">privacy@portflu.app</a></p>
      </Prose>
    </PageShell>
  );
}
