import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Prose } from "@/components/site/PageShell";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — PortfolioHub" },
      { name: "description", content: "Editor, templates, analytics, custom domains — everything PortfolioHub does." },
    ],
  }),
  component: () => (
    <PageShell
      eyebrow="Features"
      title="Small tool. Sharp defaults."
      subtitle="PortfolioHub does one thing: help you publish a portfolio you're proud of. Here's how."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {[
          { t: "Hand-designed templates", d: "9 templates, each tuned for a specific craft. No generic Bootstrap starter kits." },
          { t: "Structured editor", d: "Form fields for the boring stuff. Markdown for the writing. Drag-and-drop for the pictures." },
          { t: "Live preview", d: "See your changes on every keystroke. No publish-and-pray." },
          { t: "One-click publish", d: "Ship to a live URL in under 200ms. Redeploy anytime." },
          { t: "Custom domains + SSL", d: "Bring your own domain. Certificates auto-renew." },
          { t: "Privacy-friendly analytics", d: "Page views, referrers, click-throughs. No cookies, no third parties." },
          { t: "Password-protected drafts", d: "Ship a version to hiring managers before making it public." },
          { t: "Version history", d: "Every save is a restore point. Roll back anytime." },
          { t: "Auto-generated OG images", d: "Every share looks intentional. Never a broken preview." },
          { t: "Static export (Pro)", d: "Download an HTML/CSS bundle. Your content stays yours." },
        ].map((f) => (
          <div key={f.t} className="rounded-2xl border border-border p-6">
            <h3 className="font-medium">{f.t}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.d}</p>
          </div>
        ))}
      </div>
    </PageShell>
  ),
});
