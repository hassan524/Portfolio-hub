/**
 * src/api/index.ts
 *
 * Clean re-export of all API modules.
 * Import from "@/api" instead of individual files.
 */

// Axios base instance (for custom calls)
export { default as api } from "./axiosInstance";

// Portfolio CRUD
export {
  savePortfolio,
  getPortfolios,
  deletePortfolio,
  updatePortfolio,
} from "./portfolioApi";
export type {
  ApiPortfolio,
  SavePortfolioPayload,
  SavePortfolioResponse,
} from "./portfolioApi";

// Deploy
export {
  deployToVercel,
  deployToNetlify,
  getDeployStatus,
  isPlatformAuthorized,
  setPlatformAuthorized,
  openPlatformAuth,
  PLATFORM_OAUTH_URLS,
} from "./deployApi";
export type { DeployPlatform, DeployRequest, DeployResponse, DeployStatusResponse } from "./deployApi";
