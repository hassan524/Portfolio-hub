import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/components/individual/privacy/PrivacyPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — PortfolioHub" },
      { name: "description", content: "How PortfolioHub handles your data. Short version: we don't sell it, we barely collect it." },
    ],
  }),
  component: PrivacyPage,
});
