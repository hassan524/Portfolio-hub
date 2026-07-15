import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/templates/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/templates" });
  },
  component: () => null,
});
