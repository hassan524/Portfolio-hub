import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import {
  RootShell,
  RootComponent,
  NotFoundComponent,
  ErrorComponent,
} from "@/components/root/RootLayout";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PortfolioHub — Build a portfolio you're proud of in minutes" },
      {
        name: "description",
        content:
          "PortfolioHub is the free portfolio maker with beautiful, ready-made templates. Pick a template, add your info, publish a live link — no design skills needed.",
      },
      { name: "author", content: "PortfolioHub" },
      { property: "og:title", content: "PortfolioHub — Free portfolio maker with premium templates" },
      {
        property: "og:description",
        content:
          "Choose from professional templates, drop in your info, and publish your portfolio in minutes. Free forever.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@PortfolioHub" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: () => {
    const { queryClient } = Route.useRouteContext();
    return <RootComponent queryClient={queryClient} />;
  },
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
