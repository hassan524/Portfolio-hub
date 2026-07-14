import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — PortfolioHub" },
      {
        name: "description",
        content: "Free forever plan and a $6/mo Pro plan for custom domains and premium templates.",
      },
      { property: "og:title", content: "Pricing — PortfolioHub" },
      { property: "og:description", content: "Free forever. Pro is $6/mo." },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Free",
    price: "$0",
    tag: "Everything to ship a portfolio.",
    features: [
      "6 core templates",
      "portfoliohub.app subdomain",
      "Unlimited projects & pages",
      "Password-protected drafts",
      "Basic analytics",
      "Community support",
    ],
    cta: "Start free",
    to: "/templates",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$6",
    tag: "Custom domain and premium templates.",
    features: [
      "Everything in Free",
      "All 9 templates (incl. Pro)",
      "Custom domain + SSL",
      "Remove PortfolioHub badge",
      "Advanced analytics + goals",
      "Priority support",
    ],
    cta: "Go Pro",
    to: "/dashboard",
    highlight: true,
  },
  {
    name: "Studio",
    price: "$18",
    tag: "For agencies managing many portfolios.",
    features: [
      "Everything in Pro",
      "Up to 25 portfolios",
      "Team roles & permissions",
      "White-label branding",
      "Client billing tools",
      "Dedicated support",
    ],
    cta: "Contact sales",
    to: "/contact",
    highlight: false,
  },
];

function Pricing() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-hero-glow">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Pricing</span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl leading-[0.95]">
            Priced like a<span className="italic text-gradient-brand"> coffee.</span>
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-xl mx-auto">
            The free plan is fully-featured. Pro exists for people who want extras — not
            because we're gating the basics.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-6">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-3xl p-10 flex flex-col ${
              p.highlight
                ? "bg-foreground text-background shadow-lift"
                : "border border-border bg-background"
            }`}
          >
            {p.highlight && (
              <div className="absolute -top-3 left-10 rounded-full bg-gradient-brand text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                Most popular
              </div>
            )}
            <h3 className="font-display text-3xl">{p.name}</h3>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-5xl">{p.price}</span>
              <span className={p.highlight ? "opacity-60 text-sm" : "text-ink-soft text-sm"}>
                /month
              </span>
            </div>
            <p className={`mt-3 text-sm ${p.highlight ? "opacity-70" : "text-ink-soft"}`}>{p.tag}</p>
            <ul className="mt-8 space-y-3 text-sm flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" style={p.highlight ? { color: "oklch(0.82 0.16 75)" } : undefined} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to={p.to}
              className={`mt-10 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium ${
                p.highlight
                  ? "bg-background text-foreground"
                  : "border border-border hover:bg-secondary"
              }`}
            >
              {p.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="font-display text-3xl md:text-4xl">Pricing questions</h2>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {[
              { q: "Can I switch plans anytime?", a: "Yes — upgrade, downgrade, or cancel any time. Pro is billed monthly." },
              { q: "Do you offer student discounts?", a: "50% off Pro for verified students. Email hello@portfoliohub.app with proof." },
              { q: "What payment methods do you accept?", a: "All major credit cards via Stripe. SEPA and iDEAL for EU customers." },
              { q: "Can I get a refund?", a: "Full refunds within 14 days, no questions asked." },
            ].map((f) => (
              <details key={f.q} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="cursor-pointer flex items-center justify-between font-medium">
                  {f.q}
                  <span className="text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-2 text-sm text-ink-soft">{f.a}</p>
              </details>
            ))}
          </dl>
        </div>
      </section>
    </SiteLayout>
  );
}
