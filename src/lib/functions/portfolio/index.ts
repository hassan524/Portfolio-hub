import { PortfolioRow, Portfolio, PortfolioOverview, PortfolioOverviewRow } from "@/types/portfolio";


function extractDomain(liveurl: string | null): string | null {
  if (!liveurl) return null;
  try {
    return new URL(liveurl).hostname;
  } catch {
    return liveurl;
  }
}

export function mapPortfolio(row: PortfolioRow): Portfolio {
  return {
    id: row.id,
    templateId: row.templateid,
    siteData: row.sitedata,
    userId: row.userid,
    isDeployed: row.isdeployed,
    isDraft: row.isdraft,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    liveUrl: row.liveurl,
    domain: extractDomain(row.liveurl),
    title: row.name,
    description: row.description,
  };
}

export function mapPortfolioOverview(row: PortfolioOverviewRow): PortfolioOverview {
  return {
    id: row.id,
    title: row.name,
    description: row.description,
    domain: row.customdomain || extractDomain(row.liveurl),
    liveUrl: row.liveurl,
    isDeployed: row.isdeployed,
    platform: row.platform,
    avgResponseMs: row.avgResponseMs,
    category: row.sitedata?.category ?? null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deployments: row.deployments ?? [],
    totalViews: row.totalviews,
  };
}