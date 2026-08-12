import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, GripVertical, Lock, RefreshCw, Search, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/individual/PageShell";
import { useAppContext } from "@/context/AppContext";

/* ---------------------------------- Visuals ---------------------------------- */
/* Small, hand-built mockups grounded in what each feature actually does — */
/* no stock imagery, just the product's own UI language rendered in miniature. */

function TemplatesVisual() {
  return (
    <div className="relative h-40 w-52">
      {["-rotate-6 -translate-x-6", "rotate-0", "rotate-6 translate-x-6"].map((t, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 m-auto h-32 w-24 rounded-lg border bg-background shadow-sm transition-transform ${t} ${
            idx === 1 ? "border-primary/50 z-10 shadow-md" : "border-border/70 z-0"
          }`}
        >
          <div className="h-8 rounded-t-lg bg-primary/10" />
          <div className="space-y-1.5 p-2.5">
            <div className="h-1.5 w-3/4 rounded-full bg-ink-soft/20" />
            <div className="h-1.5 w-1/2 rounded-full bg-ink-soft/20" />
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionsVisual() {
  const rows = [
    { label: "Hero", active: true },
    { label: "Work", active: true },
    { label: "About", active: false },
    { label: "Contact", active: true },
  ];
  return (
    <div className="w-56 space-y-2">
      {rows.map((r) => (
        <div
          key={r.label}
          className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 ${
            r.active ? "border-border bg-background" : "border-border/50 bg-background/40 opacity-50"
          }`}
        >
          <GripVertical className="h-3.5 w-3.5 shrink-0 text-ink-soft/50" />
          <span className="text-xs font-medium text-foreground">{r.label}</span>
          <span
            className={`ml-auto h-3.5 w-6 rounded-full ${r.active ? "bg-primary/60" : "bg-ink-soft/20"} relative`}
          >
            <span
              className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-background transition-all ${
                r.active ? "left-3" : "left-0.5"
              }`}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

function LivePreviewVisual() {
  return (
    <div className="flex h-36 w-56 items-center gap-2">
      <div className="h-full flex-1 space-y-2 rounded-lg border border-border bg-background p-3">
        <div className="h-1.5 w-full rounded-full bg-ink-soft/25" />
        <div className="h-1.5 w-4/5 rounded-full bg-ink-soft/20" />
        <div className="h-1.5 w-full rounded-full bg-ink-soft/25" />
        <div className="h-1.5 w-2/3 rounded-full bg-ink-soft/20" />
      </div>
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border bg-surface text-ink-soft">
        <RefreshCw className="h-3 w-3" />
      </span>
      <div className="h-full flex-1 space-y-2 rounded-lg border border-primary/40 bg-background p-3">
        <div className="h-3 w-3/4 rounded-full bg-primary/50" />
        <div className="h-1.5 w-full rounded-full bg-ink-soft/20" />
        <div className="mt-2 h-8 w-full rounded-md bg-primary/10" />
      </div>
    </div>
  );
}

function DomainVisual() {
  return (
    <div className="w-56 overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/30" />
        <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1">
          <Lock className="h-2.5 w-2.5 text-accent" />
          <span className="text-[10px] text-ink-soft">yourname.com</span>
        </div>
      </div>
      <div className="space-y-2 p-3">
        <div className="h-2 w-1/2 rounded-full bg-ink-soft/25" />
        <div className="h-10 w-full rounded-md bg-primary/10" />
        <div className="h-1.5 w-3/4 rounded-full bg-ink-soft/20" />
      </div>
    </div>
  );
}

function AnalyticsVisual() {
  const bars = [40, 65, 30, 85, 55, 70];
  return (
    <div className="flex h-36 w-56 items-end gap-2.5 rounded-lg border border-border bg-background p-4">
      {bars.map((h, idx) => (
        <div
          key={idx}
          className={`flex-1 rounded-t-sm ${idx === 3 ? "bg-primary/70" : "bg-primary/20"}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function SEOVisual() {
  return (
    <div className="w-56 space-y-3 rounded-lg border border-border bg-background p-4">
      <div className="flex items-center gap-2 rounded-full border border-border px-2.5 py-1.5">
        <Search className="h-3 w-3 text-ink-soft/60" />
        <span className="text-[10px] text-ink-soft/60">your name portfolio</span>
      </div>
      <div className="space-y-1">
        <div className="h-2 w-2/3 rounded-full bg-primary/60" />
        <div className="h-1.5 w-1/3 rounded-full bg-accent/50" />
        <div className="h-1.5 w-full rounded-full bg-ink-soft/20" />
        <div className="h-1.5 w-4/5 rounded-full bg-ink-soft/20" />
      </div>
    </div>
  );
}

function PublishingVisual() {
  const rows = [
    { label: "Live", live: true },
    { label: "2 hours ago", live: false },
    { label: "Yesterday", live: false },
  ];
  return (
    <div className="w-56 space-y-2">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2"
        >
          {r.live ? (
            <motion.span
              className="h-2 w-2 shrink-0 rounded-full bg-accent"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-ink-soft/40" />
          )}
          <span className={`text-xs ${r.live ? "font-medium text-foreground" : "text-ink-soft"}`}>
            {r.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- Content ---------------------------------- */

const FEATURES = [
  {
    eyebrow: "01",
    title: "Professional Templates",
    description:
      "Hand-designed, production-ready layouts. Pick one, drop in your work, switch anytime.",
    points: ["Twelve production-ready layouts", "Swap templates, keep your content", "Responsive by default"],
    visual: <TemplatesVisual />,
  },
  {
    eyebrow: "02",
    title: "Customizable Sections",
    description:
      "Add, reorder, and hide sections. Colors, fonts, and content — no code required.",
    points: ["Reorder and hide sections freely", "Token-based color and font control", "Zero code required"],
    visual: <SectionsVisual />,
  },
  {
    eyebrow: "03",
    title: "Live Preview",
    description:
      "Edit on the left, see changes instantly on the right. Auto-saved with version history.",
    points: ["Edit and preview side-by-side", "Every change auto-saved", "Full version history"],
    visual: <LivePreviewVisual />,
  },
  {
    eyebrow: "04",
    title: "Custom Domain",
    description:
      "Free subdomain or bring your own domain. SSL included and auto-renewed.",
    points: ["Free portflu.app subdomain", "Bring your own domain", "SSL issued and renewed automatically"],
    visual: <DomainVisual />,
  },
  {
    eyebrow: "05",
    title: "Portfolio Analytics",
    description:
      "Page views, referrers, devices, and locations — privacy-friendly, built into your dashboard.",
    points: ["Views, referrers, and devices", "Location breakdown, privacy-friendly", "Built into your dashboard"],
    visual: <AnalyticsVisual />,
  },
  {
    eyebrow: "06",
    title: "SEO Tools",
    description:
      "Custom title, meta description, indexing controls, and auto-generated social previews.",
    points: ["Custom title and meta description", "Search indexing controls", "Auto-generated social previews"],
    visual: <SEOVisual />,
  },
  {
    eyebrow: "07",
    title: "Portfolio Publishing",
    description:
      "One-click publish, deployment history, and fast edge hosting worldwide.",
    points: ["One-click publish to production", "Full deployment history", "Edge hosting worldwide"],
    visual: <PublishingVisual />,
  },
] as const;

const rowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function sideVariants(fromLeft: boolean): Variants {
  return {
    hidden: { opacity: 0, x: fromLeft ? -28 : 28 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };
}

export function FeaturesPage() {
  const { session, authUser, profile } = useAppContext();
  const isLoggedIn = !!session;
  const userId = authUser?.id || profile?.id || "";
  const portfoliosUrl = userId
    ? `/portfolios?userId=${encodeURIComponent(userId)}`
    : "/portfolios";

  return (
    <PageShell
      eyebrow="Features"
      title="Everything you need to ship a portfolio."
      subtitle="Templates, editing, analytics, domains, SEO, and publishing — all in one workspace. No plugins, no duct tape."
    >
      <div className="flex flex-col gap-20 md:gap-28">
        {FEATURES.map((feature, i) => {
          const reversed = i % 2 === 1;
          return (
            <motion.div
              key={feature.title}
              variants={rowVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              <motion.div
                variants={sideVariants(!reversed)}
                className={`relative flex justify-center rounded-2xl border border-border bg-surface/60 py-12 ${
                  reversed ? "md:order-2" : "md:order-1"
                }`}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                {feature.visual}
              </motion.div>

              <motion.div
                variants={sideVariants(reversed)}
                className={reversed ? "md:order-1" : "md:order-2"}
              >
                <span className="font-mono text-xs tracking-widest text-ink-soft/60">
                  {feature.eyebrow}
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-foreground/90">
                      <span className="h-px w-5 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 flex flex-col items-start justify-between gap-5 border-t border-border pt-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {isLoggedIn ? "Your dashboard is ready." : "Ready to try it?"}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {isLoggedIn
              ? "Publish, track traffic, and manage your domain from one place."
              : "Pick a template and go live in under ten minutes."}
          </p>
        </div>
        <Link
          to={isLoggedIn ? portfoliosUrl : "/auth/signup"}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-all hover:opacity-90"
        >
          {isLoggedIn ? "Open dashboard" : "Get started free"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </PageShell>
  );
}