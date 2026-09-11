import {PortfolioRow, Portfolio} from "@/types/portfolio";


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