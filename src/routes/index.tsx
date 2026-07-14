import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Palette,
  Globe,
  Layout,
  BarChart3,
  Shield,
  Wand,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { TemplateCard } from "@/components/site/TemplateCard";
import { TEMPLATES } from "@/lib/templates";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PortfolioHub — Free portfolio maker with premium templates" },
      {
        name: "description",
        content:
          "Build a portfolio you're proud of in minutes. Pick a template, add your info, publish a live link — 100% free.",
      },
      { property: "og:title", content: "PortfolioHub — Portfolios that get you hired" },
      {
        property: "og:description",
        content:
          "Premium templates, thoughtful editor, one-click publishing. Free forever.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <SiteLayout>
      <Hero />
      <LogoStrip />
      <TemplateShowcase />
      <HowItWorks />
      <FeatureGrid />
      <LiveEditorPreview />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <FinalCTA />
    </SiteLayout>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >

          <h1 className=" font-display text-[52px] leading-[0.95] md:text-[104px] md:leading-[0.92] tracking-[-0.03em]">
            The portfolio you'll{" "}
            <span className="italic text-gradient-brand">actually finish.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed">
            PortfolioHub is a free portfolio maker with premium, hand-designed templates.
            Pick one, drop in your info, publish a live link. No design skills, no code,
            no monthly fees.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/templates"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-lift hover:shadow-soft transition-all"
            >
              Browse templates
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/showcase"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-6 py-3.5 text-sm font-medium text-ink hover:bg-secondary transition-all"
            >
              See live examples
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-ink-soft">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> Free forever</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> No credit card</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> Publish in 5 min</span>
          </div>
        </motion.div>

        {/* Hero device / mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          className="relative mt-16 md:mt-24 mx-auto max-w-5xl"
        >
          <div className="relative rounded-3xl border border-border bg-surface-elevated shadow-lift overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3 bg-surface">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.1_25)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.9_0.12_85)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.1_150)]" />
              <span className="ml-3 text-[11px] text-ink-soft">portfoliohub.app/you</span>
            </div>
            <div className="grid grid-cols-12 min-h-[420px]">
              <div className="col-span-3 border-r border-border bg-surface p-4 hidden md:block">
                <div className="text-[10px] uppercase tracking-widest text-ink-soft">Editor</div>
                {[
                  { l: "Hero", a: true },
                  { l: "About" },
                  { l: "Projects" },
                  { l: "Experience" },
                  { l: "Contact" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`mt-2 flex items-center justify-between rounded-md px-2.5 py-2 text-sm ${
                      s.a ? "bg-foreground text-background" : "text-ink hover:bg-secondary"
                    }`}
                  >
                    <span>{s.l}</span>
                    <span className="text-[10px] opacity-60">•••</span>
                  </div>
                ))}
                <div className="mt-6 rounded-lg border border-dashed border-border p-3 text-[11px] text-ink-soft">
                  Auto-saved just now
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 p-8 md:p-12 relative">
                <div className="text-[10px] tracking-[0.25em] uppercase text-ink-soft">
                  Portfolio · 2026
                </div>
                <h3 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95]">
                  Ari Kohen
                </h3>
                <p className="mt-1 font-display italic text-xl md:text-2xl text-ink-soft">
                  Independent product designer, currently in Lisbon.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { c: "oklch(0.72 0.18 40)", t: "Field Notes app" },
                    { c: "oklch(0.85 0.14 85)", t: "Nomad Bank rebrand" },
                    { c: "oklch(0.55 0.12 260)", t: "Tessera editor" },
                  ].map((p, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      className="aspect-[4/5] rounded-xl p-3 flex flex-col justify-between text-white text-xs shadow-soft"
                      style={{ background: p.c }}
                    >
                      <span>0{i + 1}</span>
                      <span className="font-medium">{p.t}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="absolute -right-3 top-24 hidden md:flex items-center gap-2 rounded-full bg-foreground text-background px-3 py-2 text-xs shadow-lift"
                >
                  <Wand className="h-3.5 w-3.5" />
                  Live preview
                </motion.div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- LOGO STRIP ---------------- */
function LogoStrip() {
  const items = ["Stripe", "Vercel", "Linear", "Figma", "Notion", "Framer", "Loom"];
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-ink-soft">
          Portfolios published by folks working at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {items.map((n) => (
            <span key={n} className="font-display text-xl md:text-2xl text-ink/70 italic">
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TEMPLATE SHOWCASE ---------------- */
function TemplateShowcase() {
  const featured = TEMPLATES.slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Templates</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
            Start with a<span className="italic text-gradient-brand"> beautiful</span> base.
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed max-w-xl">
            Each template is designed by a real human, tuned for the field it serves —
            from quiet writer sites to loud, kinetic design studios.
          </p>
        </div>
        <Link
          to="/templates"
          className="inline-flex items-center gap-1.5 text-sm font-medium hover:gap-3 transition-all"
        >
          Browse all templates <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((t, i) => (
          <TemplateCard key={t.slug} t={t} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Pick a template",
      d: "Browse 9 hand-designed templates. Every one is production-ready.",
      icon: Layout,
    },
    {
      n: "02",
      t: "Drop in your info",
      d: "Fill out simple fields — projects, experience, links. We handle the layout.",
      icon: Wand,
    },
    {
      n: "03",
      t: "Publish, share, iterate",
      d: "One click gets you a live link. Update anytime, connect a custom domain.",
      icon: Globe,
    },
  ];

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">How it works</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
            From blank page to live link in{" "}
            <span className="italic text-gradient-brand">under 10 minutes.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl border border-border bg-surface-elevated p-8 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-foreground text-background">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl italic text-ink-soft">{s.n}</span>
              </div>
              <h3 className="mt-6 text-xl font-medium">{s.t}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEATURE GRID ---------------- */
function FeatureGrid() {
  const feats = [
    { icon: Palette, t: "Editable design tokens", d: "Change one color and the whole site updates. Fonts, spacing, radii — all yours." },
    { icon: Zap, t: "Blistering fast pages", d: "Static-first output with edge caching. Your portfolio loads in under 200ms." },
    { icon: Globe, t: "Custom domains, free", d: "Bring your own domain or use portfolio.hub — SSL included, always." },
    { icon: BarChart3, t: "Built-in analytics", d: "Privacy-friendly page views, click-throughs, and referrer data." },
    { icon: Shield, t: "Password protection", d: "Ship a version to hiring managers before making it public." },
    { icon: Sparkles, t: "Auto-generated OG images", d: "Every link you share looks intentional — no more broken previews." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Features</span>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
          Everything you need.<br />
          <span className="italic text-ink-soft">Nothing you don't.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
        {feats.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group bg-background p-8 hover:bg-surface transition-colors"
          >
            <f.icon className="h-6 w-6" strokeWidth={1.5} />
            <h3 className="mt-6 text-lg font-medium">{f.t}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- EDITOR PREVIEW ---------------- */
function LiveEditorPreview() {
  return (
    <section className="border-y border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase opacity-60">The editor</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
            Type on the left.<br />
            <span className="italic text-gradient-brand">See it live on the right.</span>
          </h2>
          <p className="mt-6 opacity-70 leading-relaxed max-w-lg">
            A calm, opinionated editor. Structured fields for the boring stuff,
            markdown for the writing, drag-and-drop for the pictures. Auto-saved,
            versioned, undo-able.
          </p>
          <div className="mt-8 space-y-3">
            {[
              "Rich text with keyboard shortcuts",
              "Instant preview on every keystroke",
              "Version history — restore anything",
              "Image compression + smart cropping",
            ].map((l) => (
              <div key={l} className="flex items-center gap-3 text-sm opacity-90">
                <Check className="h-4 w-4" style={{ color: "oklch(0.82 0.16 75)" }} />
                {l}
              </div>
            ))}
          </div>
          <Link
            to="/editor"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-5 py-3 text-sm font-medium"
          >
            Try the editor <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-2xl bg-[oklch(0.22_0.02_260)] p-4 shadow-lift">
          <div className="rounded-lg bg-background text-foreground p-5 font-mono text-[13px] leading-relaxed">
            <div className="text-ink-soft text-xs">{`// hero.md`}</div>
            <div className="mt-3">
              <span className="text-ink-soft"># </span>Ari Kohen
            </div>
            <div>
              <span className="text-ink-soft">## </span>
              <span style={{ color: "oklch(0.6 0.18 40)" }}>Independent product designer</span>
            </div>
            <div className="mt-3 text-ink-soft">
              Currently helping small teams ship
              <br />
              <span className="underline decoration-dotted">thoughtful software</span> — mostly from Lisbon.
            </div>
            <div className="mt-4">
              <span className="text-ink-soft">--- projects</span>
            </div>
            <div className="mt-1">
              [<span style={{ color: "oklch(0.55 0.18 260)" }}>Field Notes</span>](/p/field-notes)
            </div>
            <div>
              [<span style={{ color: "oklch(0.55 0.18 260)" }}>Nomad Bank</span>](/p/nomad-bank)
            </div>
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="mt-1 inline-block w-2 h-4 bg-foreground"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const quotes = [
    {
      q: "Went from blank page to live portfolio in an afternoon. Got two interviews the same week.",
      n: "Maya S.",
      r: "Product designer, Berlin",
    },
    {
      q: "The templates are the best I've seen — actually opinionated, not just Tailwind starter kits.",
      n: "Jules T.",
      r: "Freelance developer, London",
    },
    {
      q: "I've been putting this off for two years. PortfolioHub made it feel embarrassingly easy.",
      n: "Rin O.",
      r: "Illustrator, Osaka",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Loved by makers</span>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
          Portfolios,<span className="italic text-gradient-brand"> finally shipped.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-surface p-8 flex flex-col"
          >
            <blockquote className="font-display text-2xl leading-[1.15] flex-1">
              "{q.q}"
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <div className="font-medium">{q.n}</div>
              <div className="text-ink-soft">{q.r}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PRICING PREVIEW ---------------- */
function PricingPreview() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Pricing</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
            Free is <span className="italic text-gradient-brand">actually free.</span>
          </h2>
          <p className="mt-5 text-ink-soft">
            Everything you need to publish a portfolio is on the free plan. Pro exists for
            people who want extras — not because we're holding your site hostage.
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border bg-background p-10">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-3xl">Free</h3>
              <div className="text-3xl font-medium">$0<span className="text-sm text-ink-soft">/mo</span></div>
            </div>
            <p className="mt-3 text-sm text-ink-soft">Everything to ship a portfolio you're proud of.</p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "All 6 free templates",
                "portfoliohub.app subdomain",
                "Unlimited projects & pages",
                "Password-protected drafts",
                "Basic analytics",
              ].map((l) => (
                <li key={l} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4" /> {l}
                </li>
              ))}
            </ul>
            <Link to="/templates" className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-secondary">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative rounded-3xl bg-foreground text-background p-10 shadow-lift overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-brand opacity-40 blur-3xl" />
            <div className="relative flex items-baseline justify-between">
              <h3 className="font-display text-3xl">Pro</h3>
              <div className="text-3xl font-medium">$6<span className="text-sm opacity-60">/mo</span></div>
            </div>
            <p className="relative mt-3 text-sm opacity-70">For folks who want a custom domain and the fancy templates.</p>
            <ul className="relative mt-8 space-y-3 text-sm">
              {[
                "Everything in Free",
                "All 9 templates (including Pro)",
                "Custom domain + SSL",
                "Remove PortfolioHub badge",
                "Advanced analytics + goals",
                "Priority support",
              ].map((l) => (
                <li key={l} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4" style={{ color: "oklch(0.82 0.16 75)" }} /> {l}
                </li>
              ))}
            </ul>
            <Link to="/pricing" className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-5 py-3 text-sm font-medium">
              Go Pro <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const faqs = [
    { q: "Is PortfolioHub really free?", a: "Yes. The free plan is not a trial — you can publish a full portfolio on a portfoliohub.app subdomain forever without paying." },
    { q: "Do I need to know how to code?", a: "Not at all. The editor is form-based for the structured stuff, markdown for writing. No HTML or CSS required." },
    { q: "Can I use my own domain?", a: "Custom domains are a Pro feature. Point your DNS to PortfolioHub and SSL is handled automatically." },
    { q: "Can I export my site?", a: "Pro users can export a static HTML/CSS bundle at any time — your content stays yours." },
    { q: "Can I switch templates later?", a: "Yes. Your content lives independently from the template, so you can swap the design anytime." },
  ];
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <div className="text-center">
        <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">FAQ</span>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
          Questions, <span className="italic text-gradient-brand">answered.</span>
        </h2>
      </div>
      <dl className="mt-14 divide-y divide-border border-y border-border">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-medium">
              {f.q}
              <span className="grid h-8 w-8 place-items-center rounded-full border border-border transition-transform group-open:rotate-45 shrink-0">
                <span className="text-lg leading-none">+</span>
              </span>
            </summary>
            <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
          </details>
        ))}
      </dl>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl leading-[0.95]"
        >
          Your portfolio is<br />
          <span className="italic text-gradient-brand">one hour away.</span>
        </motion.h2>
        <p className="mt-6 text-lg text-ink-soft">
          No credit card. No lock-in. Just pick a template and start.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium shadow-lift"
          >
            Browse templates <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-6 py-3.5 text-sm font-medium hover:bg-secondary"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}
