import architecture from "@/assets/tpl-architecture.jpg";
import creative from "@/assets/tpl-creative.jpg";
import developer from "@/assets/tpl-developer.jpg";
import photo from "@/assets/tpl-photo.jpg";

export type Portfolio = {
  id: string;
  name: string;
  template: string;
  thumb: string;
  domain: string;
  status: "live" | "building" | "draft";
  views30d: number;
  delta: number;
  lastEdited: string;
};

export const portfolios: Portfolio[] = [
  {
    id: "studio-2026",
    name: "Studio_Portfolio_2026",
    template: "Monolith",
    thumb: architecture,
    domain: "quinnreyes.design",
    status: "live",
    views30d: 124892,
    delta: 12.4,
    lastEdited: "14m ago",
  },
  {
    id: "creative-v2",
    name: "Creative_Director_v2",
    template: "Kinetic",
    thumb: creative,
    domain: "creative-v2.portfliu.app",
    status: "building",
    views30d: 18420,
    delta: 4.1,
    lastEdited: "2h ago",
  },
  {
    id: "dev-endtoend",
    name: "Hassan_Rehan_Dev",
    template: "Terminal",
    thumb: developer,
    domain: "hassanrehan.dev",
    status: "live",
    views30d: 42117,
    delta: -2.6,
    lastEdited: "yesterday",
  },
  {
    id: "lens-archive",
    name: "Lens_Archive",
    template: "Gallery",
    thumb: photo,
    domain: "lens-archive.portfliu.app",
    status: "draft",
    views30d: 0,
    delta: 0,
    lastEdited: "6d ago",
  },
];

export const templates = [
  {
    id: "monolith",
    name: "Monolith",
    field: "Architecture",
    thumb: architecture,
    blurb: "Quiet grid, serif masthead, built for studios that let the work speak.",
    installs: 4820,
  },
  {
    id: "kinetic",
    name: "Kinetic",
    field: "Creative Direction",
    thumb: creative,
    blurb: "Oversized display type on warm paper. Loud, opinionated, fast to scan.",
    installs: 3117,
  },
  {
    id: "terminal",
    name: "Terminal",
    field: "Engineering",
    thumb: developer,
    blurb: "Mono headings, dark surface, project cards that read like commits.",
    installs: 6402,
  },
  {
    id: "gallery",
    name: "Gallery",
    field: "Photography",
    thumb: photo,
    blurb: "Edge-to-edge image grid with hairline captions and zero chrome.",
    installs: 2288,
  },
];

export function getPortfolio(id: string): Portfolio {
  return portfolios.find((p) => p.id === id) ?? portfolios[0]!;
}

export const referrers = [
  { host: "twitter.com", visitors: 52454, share: 42 },
  { host: "linkedin.com", visitors: 34969, share: 28 },
  { host: "bento.me", visitors: 18733, share: 15 },
  { host: "google.com", visitors: 11240, share: 9 },
  { host: "direct", visitors: 7496, share: 6 },
];

export const topPages = [
  { path: "/", views: 61204, avg: "01:52" },
  { path: "/work/atlas-tower", views: 24118, avg: "03:41" },
  { path: "/about", views: 18902, avg: "01:14" },
  { path: "/contact", views: 9440, avg: "00:48" },
];

export const geo = [
  { country: "Pakistan", share: 34 },
  { country: "United States", share: 26 },
  { country: "Germany", share: 14 },
  { country: "United Kingdom", share: 11 },
  { country: "Japan", share: 8 },
];

export const deployments = [
  {
    branch: "main",
    sha: "72a1b9f",
    message: "feat: add selected work section",
    when: "14m ago",
    by: "you",
    url: "prod-a.vercel.app",
    state: "ready" as const,
  },
  {
    branch: "feature/dark-mode",
    sha: "c3d4e5f",
    message: "chore: tune contrast on cards",
    when: "2h ago",
    by: "you",
    url: "preview-42.vercel.app",
    state: "building" as const,
  },
  {
    branch: "main",
    sha: "9f0a1b2",
    message: "fix: mobile nav overflow",
    when: "yesterday",
    by: "you",
    url: "prod-a.vercel.app",
    state: "ready" as const,
  },
  {
    branch: "feature/case-study",
    sha: "44de901",
    message: "wip: case study template",
    when: "3d ago",
    by: "you",
    url: "preview-39.vercel.app",
    state: "error" as const,
  },
];

export const edits = [
  { when: "14m ago", what: "Updated Hero headline", target: "hero.section", who: "you" },
  { when: "1h ago", what: "Replaced 4 project images", target: "work.gallery", who: "you" },
  { when: "3h ago", what: "Changed accent color to lime", target: "theme.tokens", who: "you" },
  { when: "yesterday", what: "Connected custom domain", target: "settings.domain", who: "system" },
  { when: "2d ago", what: "Switched template to Monolith", target: "template", who: "you" },
];

export const viewSeries = [
  1820, 2140, 1960, 2480, 3010, 2760, 3320, 3980, 3610, 4220, 4680, 4310, 5120, 5640, 5210,
  6080, 6540, 6110, 7020, 7580, 7210, 8140, 8760, 8320, 9240, 9880, 9410, 10420, 11080, 11640,
];
