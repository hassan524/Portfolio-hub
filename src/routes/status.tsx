import { createFileRoute } from "@tanstack/react-router";
import { StatusPage } from "@/components/individual/status/StatusPage";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Status — PortfolioHub" },
      { name: "description", content: "Real-time status of PortfolioHub services." },
    ],
  }),
  component: StatusPage,
});
