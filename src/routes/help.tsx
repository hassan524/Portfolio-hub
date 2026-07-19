import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/components/individual/help/HelpPage";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help center — PortfolioHub" },
      { name: "description", content: "Answers to common questions about PortfolioHub." },
    ],
  }),
  component: HelpPage,
});
