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

