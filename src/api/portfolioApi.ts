import { api } from "./axios";
import { SaveMode } from "@/components/common/SaveDeployModal";

export const portfolioApi = {

  createPortfolio: (name: string, description: string, siteData: object, templateId: string, saveMode: SaveMode) => {
    return api.post("/portfolio/create", {
      name,
      saveMode,
      description,
      siteData,
      templateId,
    });
  },

  getPortfolios: () => {
    return api.get("/portfolio/list");
  },

  getPortfolio: (portfolioId: string) => {
    return api.get(`/portfolio/${portfolioId}`);
  },

  getPortfolioTraffic: (portfolioId: string, range: string) => {
    return api.get(`/portfolio/${portfolioId}/traffic`, { params: { range } });
  },

  getPortfolioViews30d: (portfolioId: string) => {
    return api.get(`/portfolio/${portfolioId}/views-30d`);
  },

  getPortfolioViewsTotal: (portfolioId: string) => {
    return api.get(`/portfolio/${portfolioId}/views-total`);
  },

};

export default portfolioApi;