import { PageShell, Prose } from "@/components/individual/PageShell";

export function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal & Security"
      title="Privacy Policy"
      subtitle="Last updated: September 10, 2026. We collect the minimum data necessary to host and optimize your developer portfolio. We never sell your personal information."
    >
      <Prose>
        <h2>1. Information We Collect</h2>
        <p>
          We collect basic account credentials (your email address and an encrypted hash of your passphrase) during account registration. When you create or update a portfolio, we store your site configuration, showcase projects, and custom domain routing preferences.
        </p>

        <h2>2. Cookieless Visitor Analytics</h2>
        <p>
          PortfolioHub uses privacy-focused, cookieless analytics to record aggregate page views and referrer hostnames for your portfolio dashboard. We do not use persistent tracking cookies, cross-site trackers, or digital fingerprinting on visitor traffic.
        </p>

        <h2>3. Data Hosting & Security</h2>
        <p>
          Your site data is encrypted in transit using 256-bit TLS and stored on secure cloud databases. Infrastructure server logs are retained for 30 days solely for security monitoring, DDoS prevention, and rate-limiting purposes.
        </p>

        <h2>4. Your Data Rights & Portability</h2>
        <p>
          You retain full ownership of all portfolio content, images, and custom code you upload to PortfolioHub. You can export a complete source code ZIP bundle or delete your account and associated assets at any time directly from your dashboard settings.
        </p>

        <h2>5. GDPR & CCPA Compliance</h2>
        <p>
          We honor all data deletion, access, and rectification requests within 24 hours. For formal privacy inquiries or Data Processing Agreements (DPA), please contact our security team at{" "}
          <a href="mailto:privacy@portfoliohub.dev">privacy@portfoliohub.dev</a>.
        </p>
      </Prose>
    </PageShell>
  );
}

