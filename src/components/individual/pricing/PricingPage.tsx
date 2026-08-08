import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { SiteLayout } from "@/components/common/Layout";
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
      "Single-page layout",
      "All premium templates",
      "Free subdomain",
      "Custom domain support",
      "Basic visitor analytics",
      "SEO title & description",
      "Works on any device",
      "Secure (SSL) hosting",
      "No PortfolioHub branding",
      "Unlimited edits",
      "Standard support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    badge: "⭐ Most Popular",
    monthlyPrice: "$10",
    yearlyPrice: "$100",
    yearlyOriginal: "$120",
    yearlySavings: "Save $20",
    featuresIntro: "Everything in Creator, plus:",
    highlighted: true,
    features: [
      "Up to 10 portfolios",
      "Multi-page layouts",
      "Advanced analytics (traffic, devices & location)",
      "Search engine insights",
      "Priority support",
    ],
  },
];

/**
 * The pricing card: tilts gently toward the cursor and shows a soft
 * spotlight where the mouse is. Both effects are driven by the same
 * pointer position, spring-smoothed so they never feel jittery, and
 * both reset to neutral on mouse leave.
 */
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, oklch(0.7 0.15 145 / 0.12), transparent 75%)`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    mouseX.set(x);
    mouseY.set(y);

    const percentX = x / bounds.width - 0.5;
    const percentY = y / bounds.height - 0.5;
    rotateY.set(percentX * 10);
    rotateX.set(percentY * -10);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const isYearly = billing === "yearly";
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? "/yr" : "/mo";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      // Fixed width, natural height — this card sizes itself, it never
      // stretches to fill its parent's height or width.
      className="w-full max-w-sm shrink-0"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative overflow-hidden rounded-3xl border bg-surface-elevated shadow-lift ${
          plan.highlighted ? "border-accent" : "border-border"
        }`}
      >
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0"
        />

        <div className="relative">
          <div className="flex items-center justify-between px-7 pt-7">
            <span className="font-display text-lg font-semibold tracking-tight">
              {plan.name}
            </span>
            {plan.badge && (
              <span className="shrink-0 whitespace-nowrap rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                {plan.badge}
              </span>
            )}
          </div>

          <div className="px-7 pt-3">
            <span className="flex items-end gap-1">
              <span className="text-gradient-brand font-display text-3xl font-bold leading-none">
                {price}
              </span>
              <span className="pb-0.5 text-sm text-ink-soft">{period}</span>
            </span>
            {isYearly && plan.yearlyOriginal && (
              <p className="mt-1 flex items-center gap-2 text-xs text-ink-soft">
                <span className="line-through">{plan.yearlyOriginal}/yr</span>
                <span className="font-semibold text-accent">{plan.yearlySavings}</span>
              </p>
            )}
          </div>

          <p className="px-7 pt-1 text-xs text-ink-soft">
            {isYearly ? "Billed annually. Cancel anytime." : "Billed monthly. Cancel anytime, no questions asked."}
          </p>

          <div className="mx-7 mt-6 border-t border-dashed border-border" />

          {plan.featuresIntro && (
            <p className="px-7 pt-4 text-xs font-semibold text-ink-soft">
              {plan.featuresIntro}
            </p>
          )}

          <ul className="px-7 py-3 text-[14px]">
            {plan.features.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                className="flex items-start gap-2.5 py-1.5 text-ink"
              >
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                  ✓
                </span>
                <span className="leading-snug">{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mx-7 border-t border-border" />
          <div className="flex items-center justify-between px-7 py-4 font-mono text-sm">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">
              {price}.00 {period}
            </span>
          </div>

          <div className="px-7 pb-7">
            <motion.button
              onClick={() => onCta(plan.id)}
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`w-full cursor-pointer rounded-2xl py-4 text-base font-bold shadow-md transition-shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 ${
                plan.highlighted
                  ? "bg-accent text-background hover:shadow-accent/40"
                  : "bg-foreground text-background hover:shadow-foreground/30"
              }`}
            >
              {loading ? "Starting checkout…" : `Get started — ${price}${period}`}
            </motion.button>
            <p className="mt-2.5 text-center text-xs text-ink-soft">
              No credit card required to sign up
            </p>
          </div>
        </div>
      </motion.div>
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
    <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-surface-elevated p-1">
      {(["monthly", "yearly"] as Billing[]).map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`relative cursor-pointer rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
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
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  billing === "yearly"
                    ? "bg-background/20 text-background"
                    : "bg-accent/10 text-accent"
                }`}
              >
                Save 20%
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

      if (!paddleInstance) {
        throw new Error("Paddle failed to initialize");
      }

      paddleInstance.Checkout.open({ transactionId });
    } catch (err) {
      console.error("Payment initialization failed:", err);
      toast.error("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-20 md:pt-20 md:pb-24">
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-accent"
            >
              Pricing
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-3 font-display text-3xl leading-tight tracking-tight md:text-4xl"
            >
              Simple plans. Everything you need.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-5"
            >
              <BillingToggle billing={billing} onChange={setBilling} />
            </motion.div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-8 md:flex-row md:items-start">
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
        </div>
      </section>
    </SiteLayout>
  );
}