import type { SiteData } from "@/types/builder.schema";
import api from "./axiosInstance";

// ── Types ─────────────────────────────────────────────────────────────────

export interface ApiPortfolio {
  id: string;
  name: string;
  url: string;
  subdomain: string;
  status: "Draft" | "Published";
  template: string;
  lastUpdated: string;
  templateData: SiteData;
}

export interface SavePortfolioPayload {
  site: SiteData;
}

export interface SavePortfolioResponse {
  portfolio: ApiPortfolio;
  message: string;
}

// ── API Functions ─────────────────────────────────────────────────────────

/**
 * Save (create or update) a portfolio from SiteData.
 */
export async function savePortfolio(
  site: SiteData,
): Promise<SavePortfolioResponse> {
  const { data } = await api.post<SavePortfolioResponse>("/portfolios", {
    site,
  });
  return data;
}

/**
 * Fetch all portfolios for the authenticated user.
 */
export async function getPortfolios(): Promise<ApiPortfolio[]> {
  const { data } = await api.get<{ portfolios: ApiPortfolio[] }>("/portfolios");
  return data.portfolios;
}

/**
 * Delete a portfolio by ID.
 */
export async function deletePortfolio(id: string): Promise<void> {
  await api.delete(`/portfolios/${id}`);
}

/**
 * Update an existing portfolio by ID with a partial SiteData patch.
 */
export async function updatePortfolio(
  id: string,
  patch: Partial<SiteData>,
): Promise<ApiPortfolio> {
  const { data } = await api.patch<{ portfolio: ApiPortfolio }>(
    `/portfolios/${id}`,
    { patch },
  );
  return data.portfolio;
}
