import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/individual/about/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PortfolioHub" },
      { name: "description", content: "Why we built PortfolioHub and who we build it for." },
    ],
  }),
  component: AboutPage,
});
