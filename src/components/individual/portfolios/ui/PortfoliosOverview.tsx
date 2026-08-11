import { Globe, ChevronRight } from "lucide-react";
import type { Portfolio } from "@/components/individual/dashboard/ui/types";
import { TEMPLATES } from "@/lib/templates";
import { TemplateCard } from "@/components/common/TemplateCard";
import { DataListView } from "@/components/common/Datalistview";

interface PortfoliosOverviewProps {
  portfolios: Portfolio[];
  onSelect: (id: string) => void;
  onCreateClick: () => void;
}

export function PortfoliosOverview({
  portfolios,
  onSelect,
  onCreateClick,
}: PortfoliosOverviewProps) {
  return (
    <DataListView
      items={portfolios}
      getId={(p) => p.id}
      getSearchText={(p) => `${p.name} ${p.url}`}
      onItemClick={(p) => onSelect(p.id)}
      title="SaaS"
      subtitle="Manage, configure, and monitor the performance of your live portfolios."
      searchPlaceholder="Search portfolios..."
      createLabel="Create Portfolio"
      onCreateClick={onCreateClick}
      emptyIcon={Globe}
      emptyTitle="No portfolios found"
      emptyDescription="Try refining your search query or create a new portfolio."
      renderGridItem={(portfolio, index) => {
        const baseTemplate =
          TEMPLATES.find((t) => t.slug.toLowerCase() === portfolio.template.toLowerCase()) ||
          TEMPLATES[0];
        const fauxTemplate = {
          ...baseTemplate,
          name: portfolio.name,
          tagline: portfolio.url,
          isPro: false,
        };
        return <TemplateCard t={fauxTemplate} index={index} onPreview={() => onSelect(portfolio.id)} />;
      }}
      renderListItem={(portfolio) => {
        const isDraft = portfolio.status === "Draft";
        const stats =
          portfolio.id === "portfolio-3"
            ? { views: "0", clicks: "0" }
            : portfolio.id === "portfolio-2"
            ? { views: "891", clicks: "189" }
            : { views: "1,247", clicks: "342" };

        return (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border/60">
                <Globe className="h-5 w-5 text-ink-soft" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-base truncate">{portfolio.name}</h3>
                <p className="text-xs text-ink-soft font-mono truncate">{portfolio.url}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-ink-soft shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary/80 px-2 py-0.5 rounded-md border border-border">
                {portfolio.template} Layout
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  isDraft ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"
                }`}
              >
                {portfolio.status}
              </span>
              <div className="flex gap-4">
                <span>
                  <strong>Views:</strong> {stats.views}
                </span>
                <span>
                  <strong>Clicks:</strong> {stats.clicks}
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-ink-soft" />
            </div>
          </div>
        );
      }}
    />
  );
}
