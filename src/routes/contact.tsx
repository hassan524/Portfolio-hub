import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/individual/contact/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PortfolioHub" },
      { name: "description", content: "Reach the PortfolioHub team." },
    ],
  }),
  component: ContactPage,
});
