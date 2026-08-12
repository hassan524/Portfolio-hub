import { motion } from "framer-motion";
import { useState } from "react";
import { Check } from "lucide-react";
import { PageShell } from "@/components/individual/PageShell";
import { toast } from "sonner";
import PricingApi from "@/api/pricingApi";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

type Billing = "monthly" | "yearly";

interface Plan {
  id: "creator" | "professional";
  name: string;
  badge?: string;
  monthlyPrice: string;
  yearlyPrice: string;
  yearlyOriginal?: string;
  yearlySavings?: string;
  featuresIntro?: string;
  features: string[];
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    id: "creator",
    name: "Creator",
    monthlyPrice: "$5",
    yearlyPrice: "$50",
    yearlyOriginal: "$60",
    yearlySavings: "Save $10",
    features: [
      "1 live portfolio",
      "All premium templates",
      "Custom domain + subdomain",
      "Basic analytics & SEO",
      "SSL hosting, no branding",
      "Unlimited edits",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    badge: "Most popular",
    monthlyPrice: "$10",
    yearlyPrice: "$100",
    yearlyOriginal: "$120",
    yearlySavings: "Save $20",
    featuresIntro: "Everything in Creator, plus:",
    highlighted: true,
    features: [
      "Up to 10 portfolios",
      "Multi-page layouts",
      "Advanced analytics",
      "Search engine insights",
      "Priority support",
    ],
  },
];

const FAQ = [
  { q: "Can I cancel anytime?", a: "Yes. Cancel from your dashboard — no questions asked." },
  { q: "Do I need a card to start?", a: "No. Sign up free and upgrade when you're ready." },
  { q: "What happens when I downgrade?", a: "Your sites stay live. Pro-only features pause until you upgrade again." },
];

function PricingCard({
  plan,
  billing,
  loading,
  onCta,
}: {
  plan: Plan;
  billing: Billing;
  loading: boolean;
  onCta: (planId: Plan["id"]) => void;
}) {
  const isYearly = billing === "yearly";
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? "/yr" : "/mo";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`relative flex h-full w-full max-w-[320px] flex-col rounded-2xl border p-5 sm:p-6 ${
        plan.highlighted
          ? "border-primary/40 bg-surface-elevated shadow-[0_0_0_1px_oklch(0.77_0.20_131/0.15),var(--shadow-soft)]"
          : "border-border bg-surface"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-px left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}

      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">{plan.name}</span>
        {plan.badge && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
            {plan.badge}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-3xl font-bold tracking-tight">{price}</span>
        <span className="text-xs text-ink-soft">{period}</span>
      </div>

      {isYearly && plan.yearlyOriginal && (
        <p className="mt-1 text-xs text-ink-soft">
          <span className="line-through">{plan.yearlyOriginal}/yr</span>{" "}
          <span className="font-medium text-primary">{plan.yearlySavings}</span>
        </p>
      )}

      <p className="mt-2 text-xs text-ink-soft">
        {isYearly ? "Billed annually" : "Billed monthly"} · cancel anytime
      </p>

      {plan.featuresIntro && (
        <p className="mt-5 text-xs font-medium text-ink-soft">{plan.featuresIntro}</p>
      )}

      <ul className={`space-y-2.5 ${plan.featuresIntro ? "mt-2" : "mt-5"} flex-1`}>
        {plan.features.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13px] text-foreground/90">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={2.5} />
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onCta(plan.id)}
        disabled={loading}
        className={`mt-6 w-full rounded-xl py-2.5 text-sm font-semibold transition-all disabled:opacity-60 ${
          plan.highlighted
            ? "bg-secondary text-secondary-foreground hover:brightness-105"
            : "bg-foreground text-background hover:opacity-90"
        }`}
      >
        {loading ? "Starting…" : "Get started"}
      </button>
    </motion.div>
  );
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
      {(["monthly", "yearly"] as Billing[]).map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`relative rounded-full px-4 py-1.5 text-xs font-semibold transition-colors sm:px-5 sm:py-2 sm:text-sm ${
            billing === option ? "text-background" : "text-ink-soft hover:text-ink"
          }`}
        >
          {billing === option && (
            <motion.span
              layoutId="billing-pill"
              className="absolute inset-0 rounded-full bg-foreground"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {option === "monthly" ? "Monthly" : "Yearly"}
            {option === "yearly" && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold sm:text-[10px] ${
                  billing === "yearly"
                    ? "bg-background/20 text-background"
                    : "bg-primary/10 text-primary"
                }`}
              >
                −20%
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

export function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [billing, setBilling] = useState<Billing>("monthly");

  async function handleCta(planId: Plan["id"]) {
    try {
      setLoading(true);
      const response = await PricingApi.createCheckout({ planId, billing });
      const transactionId = response.data.transactionId;
      const paddleInstance: Paddle | undefined = await initializePaddle({
        environment: "sandbox",
        token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN,
      });
      if (!paddleInstance) throw new Error("Paddle failed to initialize");
      paddleInstance.Checkout.open({ transactionId });
    } catch (err) {
      console.error("Payment initialization failed:", err);
      toast.error("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      align="center"
      eyebrow="Pricing"
      title="Plans that grow with you"
      subtitle="Premium templates, custom domains, analytics, and SEO — included on every plan. Start free, upgrade when you need more."
      containerClassName="mx-auto max-w-5xl px-6 py-10 md:py-14"
    >
      <div className="flex flex-col items-center">
        <BillingToggle billing={billing} onChange={setBilling} />

        <div className="mt-8 grid w-full max-w-2xl grid-cols-1 place-items-center gap-5 sm:grid-cols-2 sm:items-stretch sm:gap-4">
          {PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billing={billing}
              loading={loading}
              onCta={handleCta}
            />
          ))}
        </div>

        <div className="mt-14 w-full max-w-xl">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-ink-soft">
            Common questions
          </p>
          <div className="mt-4 space-y-3">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border bg-surface px-4 py-3 text-left sm:px-5 sm:py-4"
              >
                <p className="text-sm font-medium">{item.q}</p>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
