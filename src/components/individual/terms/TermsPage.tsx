import { PageShell, Prose } from "@/components/individual/PageShell";

export function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal Terms"
      title="Terms of Service"
      subtitle="Effective Date: September 10, 2026. These terms govern your use of the PortfolioHub platform, portfolio publishing suite, and domain routing service."
    >
      <Prose>
        <h2>1. Ownership of Content</h2>
        <p>
          You retain 100% intellectual property ownership of all custom text, portfolio projects, code snippets, branding assets, and personal media uploaded to PortfolioHub. PortfolioHub grants you a non-exclusive license to build, edit, and publish websites using our infrastructure.
        </p>

        <h2>2. Acceptable Use Policy</h2>
        <p>
          You agree not to use PortfolioHub to publish illegal material, malware binaries, phishing sites, deceptive impersonation, or automated spam. We reserve the right to temporarily suspend or terminate websites that violate our safety policies.
        </p>

        <h2>3. Infrastructure Uptime & Service Levels</h2>
        <p>
          We strive for 99.9% network availability across our edge delivery infrastructure. Planned maintenance windows are announced in advance. Service uptime metrics and system status reports are publicly accessible at{" "}
          <a href="/status">/status</a>.
        </p>

        <h2>4. Subscriptions & Billing</h2>
        <p>
          Paid plans are billed on a monthly or annual subscription cycle. You may cancel your subscription at any time via your dashboard settings. Subscriptions remain active through the end of the current billing period. See our <a href="/refunds">Refund Policy</a> for details.
        </p>

        <h2>5. Account Termination</h2>
        <p>
          You may terminate your account at any time by selecting "Delete Portfolio" or requesting account removal. Upon account termination, all active domain routes and stored configuration data are permanently purged.
        </p>
      </Prose>
    </PageShell>
  );
}

