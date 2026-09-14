// types/portfolio.ts
import type { SiteData } from "@/types/builder.schema";

export interface PortfolioRow {
  id: string;
  templateid: string | null;
  sitedata: SiteData;
  userid: string;
  isdeployed: boolean;
  isdraft: boolean;
  created_at: string;
  updated_at: string;
  liveurl: string | null;
  name: string;
  description: string | null;
}


export interface Portfolio {
  id: string;
  templateId: string | null;
  siteData: SiteData | null;
  userId: string;
  isDeployed: boolean;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
  liveUrl: string | null;
  domain: string | null;
  title: string;
  description: string | null;
}

// types/portfolio.ts

export interface DeploymentRow {
  id: string;
  status: "success" | "failed" | "canceled" | "building" | "unknown";
  message: string | null;
  url: string | null;
  createdAt: string;
}

export interface PortfolioOverviewRow {
  id: string;
  templateid: string | null;
  sitedata: { category?: string;[key: string]: unknown } | null;
  userid: string;
  isdeployed: boolean;
  isdraft: boolean;
  created_at: string;
  updated_at: string;
  liveurl: string | null;
  name: string;
  description: string | null;
  hosting: string | null;
  iscustomdomain: boolean | null;
  customdomain: string | null;
  domain_verified: boolean;
  platform: "vercel" | "netlify" | null;
  avgResponseMs: number | null;
  deployments: DeploymentRow[];
  totalviews: string;
}

export interface PortfolioOverview {
  id: string;
  title: string;
  description: string | null;
  domain: string | null;
  liveUrl: string | null;
  isDeployed: boolean;
  platform: "vercel" | "netlify" | null;
  avgResponseMs: number | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  deployments: DeploymentRow[];
  totalViews: string;
}