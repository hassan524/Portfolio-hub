import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/individual/dashboard/DashboardPage";

type DashboardSearch = {
  portfolioId?: string;
  tab?: string;
  create?: string;
  template?: string;
};

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Portfolios — PortfolioHub" },
      { name: "description", content: "Manage and configure your professional portfolios." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): DashboardSearch => {
    return {
      portfolioId: search.portfolioId as string | undefined,
      tab: search.tab as string | undefined,
      create: search.create as string | undefined,
      template: search.template as string | undefined,
    };
  },
  component: DashboardPage,
});
