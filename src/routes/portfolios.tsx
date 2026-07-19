import { createFileRoute } from "@tanstack/react-router";
import { PortfoliosPage } from "@/components/individual/dashboard/PortfoliosPage";

type PortfoliosSearch = {
  userId?: string;
};

export const Route = createFileRoute("/portfolios")({
  head: () => ({
    meta: [
      { title: "My Portfolios — PortfolioHub" },
      { name: "description", content: "Manage and configure your professional portfolios." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): PortfoliosSearch => {
    return {
      userId: search.userId as string | undefined,
    };
  },
  component: PortfoliosPage,
});
