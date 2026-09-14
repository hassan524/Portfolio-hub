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

  getPortfolioViewsRange: (portfolioId: string, range: string) => {
    return api.get(`/portfolio/${portfolioId}/viewsRange`, { params: { range } });
  },

  getPortfolioViews30d: (portfolioId: string) => {
    return api.get(`/portfolio/${portfolioId}/views-30d`);
  },

  getPortfolioViewsTotal: (portfolioId: string) => {
    return api.get(`/portfolio/${portfolioId}/views-total`);
  },

  getPortfolioOverview: (portfolioId: string) => {
    return api.get(`/portfolio/${portfolioId}/overview`);
  },

  getPortfolioTraffic: (portfolioId: string) => {
    return api.get(`/portfolio/${portfolioId}/traffic`);
  }

};

export default portfolioApi;