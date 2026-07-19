import { createFileRoute } from "@tanstack/react-router";
import { SignupPage } from "@/components/individual/auth/SignupPage";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up — PortfolioHub" },
      { name: "description", content: "Create your free PortfolioHub account. Build a portfolio you're proud of in minutes." },
    ],
  }),
  component: SignupPage,
});