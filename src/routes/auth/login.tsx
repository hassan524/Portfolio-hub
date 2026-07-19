import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/individual/auth/LoginPage";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign In — PortfolioHub" },
      { name: "description", content: "Sign in to your PortfolioHub account. Continue building your portfolio where you left off." },
    ],
  }),
  component: LoginPage,
});