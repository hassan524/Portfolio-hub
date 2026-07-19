import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "@/components/individual/auth/AuthLayout";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});
