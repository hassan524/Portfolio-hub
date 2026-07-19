import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/individual/home/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PortfolioHub — Free portfolio maker with premium templates" },
      {
        name: "description",
        content:
          "Build a portfolio you're proud of in minutes. Pick a template, add your info, publish a live link — 100% free.",
      },
      { property: "og:title", content: "PortfolioHub — Portfolios that get you hired" },
      {
        property: "og:description",
        content:
          "Premium templates, thoughtful editor, one-click publishing. Free forever.",
      },
    ],
  }),
  component: LandingPage,
});
