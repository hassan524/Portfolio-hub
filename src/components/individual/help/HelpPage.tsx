import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { PageShell } from "@/components/individual/PageShell";

type FAQItem = { q: string; a: string };
type FAQCategory = { slug: string; label: string; items: FAQItem[] };

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    slug: "getting-started",
    label: "Getting started",
    items: [
      {
        q: "How do I create my first portfolio?",
        a: "Sign up, pick a template, and start filling in your work. There's no separate setup step — your draft saves automatically as you go.",
      },
      {
        q: "Do I need any design or coding skills?",
        a: "No. Every template is pre-styled and ready to publish. Custom code is available if you want it, but never required.",
      },
      {
        q: "Can I import an existing portfolio or resume?",
        a: "You can paste in text and drop in images directly. A dedicated resume/PDF importer isn't available yet, but it's on the roadmap.",
      },
      {
        q: "Is there a free plan?",
        a: "Yes. The free plan covers one live portfolio on a Portflu subdomain. Upgrade to Pro for a custom domain, more templates, and analytics.",
      },
    ],
  },
  {
    slug: "templates-editor",
    label: "Templates & editor",
    items: [
      {
        q: "Can I change templates after publishing?",
        a: "Yes. Switch templates anytime — your content carries over to the new layout automatically.",
      },
      {
        q: "Can I customize colors, fonts, and layout?",
        a: "Each template has a theme panel for colors, fonts, and section order. Deeper layout changes depend on the template's structure.",
      },
      {
        q: "Does Portflu support custom code?",
        a: "Pro plans can inject custom CSS, and an HTML embed block is available for adding your own widgets or scripts.",
      },
      {
        q: "Can I add my own images and videos?",
        a: "Yes. Upload directly or link an external video (YouTube, Vimeo). Images are optimized automatically on publish.",
      },
      {
        q: "Is there a mobile preview while editing?",
        a: "Yes. Toggle the preview panel between desktop, tablet, and mobile widths at any point while editing.",
      },
    ],
  },
  {
    slug: "domains-hosting",
    label: "Domains & hosting",
    items: [
      {
        q: "How do I connect a custom domain?",
        a: "Go to Dashboard → Settings, enter your domain, and follow the DNS instructions. SSL activates automatically once DNS propagates.",
      },
      {
        q: "Why isn't my domain resolving?",
        a: "DNS changes can take up to 48 hours. Double-check your CNAME or A record matches what's shown in Settings.",
      },
      {
        q: "Do I need my own domain to publish?",
        a: "No. Every site gets a free yourname.portflu.app subdomain by default — a custom domain is optional.",
      },
      {
        q: "Is SSL included?",
        a: "Yes, on every plan, for both subdomains and connected custom domains. Certificates renew automatically.",
      },
      {
        q: "How fast are my published pages?",
        a: "Sites are served from an edge network worldwide, and deploys typically finish in under a minute.",
      },
    ],
  },
  {
    slug: "billing-plans",
    label: "Billing & plans",
    items: [
      {
        q: "How do I cancel my Pro subscription?",
        a: "Dashboard → Billing → Cancel. You keep Pro features until the current billing period ends.",
      },
      {
        q: "What happens to my site if I downgrade?",
        a: "Your site stays live on the free plan. Pro-only features like the custom domain and analytics are paused, not deleted.",
      },
      {
        q: "Do you offer refunds?",
        a: "Yes, within 14 days of a charge if you haven't made heavy use of Pro features. Email hello@portflu.app to request one.",
      },
      {
        q: "Can I switch between monthly and yearly billing?",
        a: "Yes, anytime from Dashboard → Billing. Switching to yearly applies a prorated credit for time already paid.",
      },
    ],
  },
  {
    slug: "account-data",
    label: "Account & data",
    items: [
      {
        q: "How do I export my portfolio?",
        a: "Open Settings in your dashboard and use Export. You get a full backup of your content and assets.",
      },
      {
        q: "Can I delete my account and data?",
        a: "Yes. Dashboard → Settings → Delete account permanently removes your sites and data. This can't be undone.",
      },
      {
        q: "Is my data backed up?",
        a: "Yes, automatically and continuously. You don't need to trigger anything manually.",
      },
      {
        q: "How do I change my account email?",
        a: "Dashboard → Settings → Account. You'll get a confirmation link at the new address before the change takes effect.",
      },
    ],
  },
];

export function HelpPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Help center"
      subtitle="Quick answers to common questions. Can't find yours? Email hello@portflu.app and we'll get back to you."
    >
      <div className="mx-auto max-w-6xl">
        <p className="max-w-2xl font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl md:text-4xl">
          Everything you need to know, in one place.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
          {/* Desktop sticky category nav */}
          <nav className="hidden lg:block">
            <div className="sticky top-24 space-y-1">
              {FAQ_CATEGORIES.map((cat) => (
                <a
                  key={cat.slug}
                  href={`#${cat.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-card/60 hover:text-foreground"
                >
                  {cat.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Mobile category pills */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:hidden">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="shrink-0 rounded-full border border-border px-4 py-1.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-foreground"
              >
                {cat.label}
              </a>
            ))}
          </div>

          {/* FAQ content */}
          <div className="space-y-16">
            {FAQ_CATEGORIES.map((cat) => (
              <section key={cat.slug} id={cat.slug} className="scroll-mt-24">
                <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                  {cat.label}
                </h2>
                <div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border">
                  {cat.items.map((item) => (
                    <details
                      key={item.q}
                      className="group px-5 py-4 open:bg-card/30 md:px-6 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium text-foreground sm:text-base">
                        {item.q}
                        <ChevronDown className="h-4 w-4 shrink-0 text-ink-soft transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 pr-8 text-sm leading-relaxed text-ink-soft sm:text-base">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Still need help CTA */}
        <div className="mt-20 flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-card/40 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-sm font-semibold text-foreground">Still stuck?</p>
            <p className="mt-1 text-sm text-ink-soft">
              Email hello@portflu.app — a real person replies, usually same day.
            </p>
          </div>
          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:opacity-90"
          >
            Contact us
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}