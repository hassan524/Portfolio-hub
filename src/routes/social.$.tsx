import { createFileRoute } from "@tanstack/react-router";
import { SocialRedirectPage } from "@/components/individual/social/SocialRedirectPage";

export const Route = createFileRoute("/social/$")({
  head: () => ({
    meta: [
      { title: "Follow PortfolioHub" },
      { name: "description", content: "Follow PortfolioHub on social networks." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Social,
});

function Social() {
  const { _splat } = Route.useParams();
  return <SocialRedirectPage splat={_splat} />;
}
