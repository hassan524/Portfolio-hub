import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { templates } from "@/data/templates";
import type { SiteData } from "@/types/builder.schema";
import { TemplateCard } from "@/components/common/TemplateCard";

export function TemplateShowcase({ onPreview }: { onPreview: (t: SiteData) => void }) {
  // Exactly 6 in each row
  const row1Source = templates.slice(0, 6);
  const row2Source = templates.slice(6, 12);

  // Duplicate for seamless loop
  const row1 = [...row1Source, ...row1Source];
  const row2 = [...row2Source.slice().reverse(), ...row2Source];

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">
              Templates
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
              Start with a<span className="italic text-gradient-brand"> beautiful</span>{" "}
              base.
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed max-w-xl">
              Each template is designed by a real human, tuned for the field it serves —
              from quiet writer sites to loud, kinetic design studios.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-background text-xs font-semibold">
                {templates.length}
              </span>
              templates
            </span>
            <Link
              to="/templates"
              className="group inline-flex items-center gap-1.5 text-sm font-medium hover:gap-3 transition-all"
            >
              See all templates{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scrolling rows */}
      <div className="mt-14 space-y-8">
        {/* Row 1 — scrolls left */}
        <div className="marquee-row relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 animate-marquee-left w-max">
            {row1.map((t, i) => (
              <div key={`r1-${t.id}-${i}`} className="w-[320px] shrink-0">
                <TemplateCard t={t} onPreview={onPreview} />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="marquee-row relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-6 animate-marquee-right w-max">
            {row2.map((t, i) => (
              <div key={`r2-${t.id}-${i}`} className="w-[320px] shrink-0">
                <TemplateCard t={t} onPreview={onPreview} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show more CTA */}
      <div className="mx-auto max-w-7xl px-6 mt-12">
        <div className="flex items-center justify-center">
          <Link
            to="/templates"
            className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface-elevated px-6 py-3.5 text-sm font-medium hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 shadow-soft hover:shadow-lift"
          >
            <span>Show all {templates.length} templates</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}