import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { TemplateCard } from "@/components/site/TemplateCard";
import { TEMPLATES } from "@/lib/templates";

export const Route = createFileRoute("/templates/$slug")({
  loader: ({ params }) => {
    const t = TEMPLATES.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return { template: t };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Template not found" }, { name: "robots", content: "noindex" }] };
    const t = loaderData.template;
    return {
      meta: [
        { title: `${t.name} — PortfolioHub template` },
        { name: "description", content: t.tagline },
        { property: "og:title", content: `${t.name} — PortfolioHub` },
        { property: "og:description", content: t.tagline },
      ],
    };
  },
  component: TemplateDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-5xl">Template not found</h1>
        <p className="mt-4 text-ink-soft">This template doesn't exist or has been retired.</p>
        <Link to="/templates" className="mt-8 inline-flex items-center gap-2 text-sm underline">
          <ArrowLeft className="h-4 w-4" /> Back to templates
        </Link>
      </div>
    </SiteLayout>
  ),
});

function TemplateDetail() {
  const { template: t } = Route.useLoaderData();
  const others = TEMPLATES.filter((x) => x.slug !== t.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link to="/templates" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
            <ArrowLeft className="h-3.5 w-3.5" /> All templates
          </Link>

          <div className="mt-8 grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">
                {t.category} · Template
              </span>
              <h1 className="mt-3 font-display text-5xl md:text-6xl leading-[0.95]">{t.name}</h1>
              <p className="mt-4 text-lg text-ink-soft leading-relaxed">{t.tagline}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/editor"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium shadow-soft"
                >
                  Use this template <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/showcase"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-3 text-sm font-medium hover:bg-secondary"
                >
                  See live example
                </Link>
              </div>

              <dl className="mt-10 space-y-4 border-t border-border pt-6 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Best for</dt>
                  <dd>{t.category}s</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Sections</dt>
                  <dd>Hero, About, Projects, Experience, Contact</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Responsive</dt>
                  <dd className="inline-flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Yes</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Plan</dt>
                  <dd>{t.isPro ? "Pro" : "Free"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Palette</dt>
                  <dd className="flex gap-1.5">
                    {t.palette.map((c: string) => (
                      <span key={c} className="h-4 w-4 rounded-full border border-border" style={{ background: c }} />
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-3">
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-lift"
                style={{ background: t.palette[0] }}
              >
                <div className="absolute inset-0 p-10" style={{ color: t.palette[1] }}>
                  <div className="text-xs tracking-[0.25em] uppercase opacity-60">
                    {t.name} · Preview
                  </div>
                  <div className="mt-10 font-display text-6xl leading-[0.95]">
                    Your name
                  </div>
                  <div className="font-display text-5xl italic mt-1" style={{ color: t.accent }}>
                    goes here.
                  </div>
                  <div className="mt-10 grid grid-cols-3 gap-3">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg"
                        style={{ background: i === 1 ? t.accent : `${t.palette[1]}15` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] rounded-xl border border-border"
                    style={{ background: t.palette[0] }}
                  >
                    <div
                      className="h-full w-full rounded-xl p-3 text-[10px]"
                      style={{ color: t.palette[1] }}
                    >
                      Section {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-3xl md:text-4xl">More templates like this</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {others.map((o, i) => (
            <TemplateCard key={o.slug} t={o} index={i} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
