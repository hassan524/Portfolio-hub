import { PageShell, Prose } from "@/components/individual/PageShell";

export function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of service"
      subtitle="Your content stays yours. We store it, serve it, and let you export it."
    >
      <Prose>
        <h2>Your content</h2>
        <p>Everything you upload belongs to you. We store and serve it — that's the whole deal.</p>
        <h2>Acceptable use</h2>
        <p>No illegal content, impersonation, phishing, or malware. We may suspend violating accounts.</p>
        <h2>Uptime & billing</h2>
        <p>99.9% uptime target — see <a href="/status">/status</a>. Pro billed monthly, cancel anytime. Refunds within 14 days.</p>
        <h2>Termination</h2>
        <p>Delete your account anytime. We terminate with 30 days notice unless the violation is severe.</p>
      </Prose>
    </PageShell>
  );
}
