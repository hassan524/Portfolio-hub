import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { templates } from "@/data/templates";
import type { SiteData } from "@/types/builder.schema";
import { PortfolioCard } from "@/components/common/PortfolioCard";

export function TemplateShowcase({
  onPreview,
}: {
  onPreview: (t: SiteData) => void;
}) {
  const row1Source = templates.slice(0, 6);
  const row2Source = templates.slice(6, 12);

  const row1 = [...row1Source, ...row1Source];
  const row2 = [...row2Source.slice().reverse(), ...row2Source];

  return (
    <section className="relative pt-24 md:pt-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center gap-6">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-ink-soft bg-gradient-to-b from-white/5 to-transparent">
            Templates
          </span>

          <h2 className="poppins text-[32px] sm:text-[40px] md:text-[69px] font-normal text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            Start with a{" "}
            <span className="bg-gradient-to-r from-lime-700 to-green-800 bg-clip-text text-transparent">
              beautiful
            </span>{" "}
            base.
          </h2>

          <p className="text-ink-soft leading-relaxed max-w-xl">
            Each template is designed by a real human, tuned for the field it
            serves — from quiet writer sites to loud, kinetic design studios.
          </p>

          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2 text-sm text-ink-soft">
              <span className="grid h-8 w-8 place-items-center rounded-full text-ink-soft border text-[11px] font-semibold">
                {templates.length}
              </span>
              templates
            </span>

            <Link
              to="/templates"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-white transition-all"
            >
              See all templates
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-14 space-y-8">
        {/* Row 1 */}
        <div className="marquee-row relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 animate-marquee-left w-max">
            {row1.map((t, i) => (
              <div
                key={`r1-${t.id}-${i}`}
                className="w-[320px] shrink-0"
              >
                <PortfolioCard
                  id={t.id}
                  t={t}
                  isCreated={false}
                  onPreview={onPreview}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="marquee-row relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 animate-marquee-right w-max">
            {row2.map((t, i) => (
              <div
                key={`r2-${t.id}-${i}`}
                className="w-[320px] shrink-0"
              >
                <PortfolioCard
                  id={t.id}
                  t={t}
                  isCreated={false}
                  onPreview={onPreview}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-12">
        <div className="flex items-center justify-center">
          <Link
            to="/templates"
            className="group relative inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white overflow-hidden isolate transition-transform duration-300 hover:-translate-y-1 before:absolute before:inset-[-3px] before:-z-10 before:rounded-full before:animate-spin-slow before:[background:conic-gradient(from_0deg,transparent_0%,var(--primary)_25%,transparent_50%)] before:transition-opacity before:duration-300 group-hover:before:opacity-100 before:opacity-80 after:absolute after:inset-[2px] after:-z-10 after:rounded-full after:bg-black"
          >
            <span>Show all {templates.length} templates</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}