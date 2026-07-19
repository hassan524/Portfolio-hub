import { createFileRoute } from "@tanstack/react-router";
import { TemplatesPage } from "@/components/individual/templates/TemplatesPage";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — PortfolioHub" },
      {
        name: "description",
        content:
          "9 hand-designed portfolio templates for designers, developers, writers, photographers, and studios.",
      },
      { property: "og:title", content: "Templates — PortfolioHub" },
      {
        property: "og:description",
        content: "Beautiful, opinionated portfolio templates. Free to start.",
      },
    ],
  }),
  component: TemplatesPage,
});
