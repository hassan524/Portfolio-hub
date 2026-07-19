import { createFileRoute } from "@tanstack/react-router";
import { CookiesPage } from "@/components/individual/cookies/CookiesPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie policy — PortfolioHub" },
      { name: "description", content: "The one cookie we use, and why." },
    ],
  }),
  component: CookiesPage,
});
