import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "@/components/individual/terms/TermsPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — PortfolioHub" },
      { name: "description", content: "The terms of using PortfolioHub." },
    ],
  }),
  component: TermsPage,
});
