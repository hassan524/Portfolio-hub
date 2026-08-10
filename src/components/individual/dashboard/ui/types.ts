export interface Project {
  id: string;
  name: string;
  desc: string;
}

export interface Portfolio {
  id: string;
  name: string;
  url: string;
  subdomain: string;
  status: "Published" | "Draft";
  template: string;
  lastUpdated: string;
  headline?: string;
  bio?: string;
  projects?: Project[];
  showProjects?: boolean;
  showContact?: boolean;
  domain?: string;
  templateData?: import("@/types/builder.schema").SiteData;
}

export const DEFAULT_PORTFOLIOS: Portfolio[] = [
  {
    id: "portfolio-1",
    name: "Design Portfolio 2026",
    url: "hassanmughal.dev",
    subdomain: "hassan",
    status: "Published",
    template: "Atlas",
    lastUpdated: "2 hours ago",
    headline: "Senior Product Designer",
    bio: "Designing clean interfaces for high-growth startups. Formerly at Google & Stripe.",
    projects: [
      {
        id: "p1",
        name: "Supabase Dashboard Redesign",
        desc: "Improved developer conversion by 24% through unified navigation.",
      },
      {
        id: "p2",
        name: "Framer Motion Templates",
        desc: "A library of 40+ physics-based animations for React developer UI.",
      },
    ],
    showProjects: true,
    showContact: true,
  },
  {
    id: "portfolio-2",
    name: "Frontend Engineer CV",
    url: "hassan.dev",
    subdomain: "hassan-dev",
    status: "Published",
    template: "Terminal",
    lastUpdated: "Yesterday",
    headline: "Creative Technologist",
    bio: "Specializing in WebGL, React, and interactive layouts. I make websites feel alive.",
    projects: [
      {
        id: "p1",
        name: "Antigravity IDE",
        desc: "A browser-based IDE using WebWorkers and custom compilers.",
      },
    ],
    showProjects: true,
    showContact: true,
  },
  {
    id: "portfolio-3",
    name: "Side Projects & Labs",
    url: "labs.hassan.dev",
    subdomain: "hassan-labs",
    status: "Draft",
    template: "North",
    lastUpdated: "5 days ago",
    headline: "Experiments & Hacks",
    bio: "A sandbox for rough ideas, prototype builds, and random web experiments.",
    projects: [],
    showProjects: false,
    showContact: true,
  },
];

export const ANALYTICS_DATA = [
  { name: "Mon", views: 140, clicks: 35 },
  { name: "Tue", views: 220, clicks: 58 },
  { name: "Wed", views: 190, clicks: 42 },
  { name: "Thu", views: 290, clicks: 80 },
  { name: "Fri", views: 250, clicks: 71 },
  { name: "Sat", views: 180, clicks: 45 },
  { name: "Sun", views: 210, clicks: 52 },
];

export const REFERRERS = [
  { source: "Twitter / X", visits: 312, pct: 38 },
  { source: "LinkedIn", visits: 256, pct: 31 },
  { source: "Google Search", visits: 142, pct: 17 },
  { source: "Direct", visits: 89, pct: 11 },
];
