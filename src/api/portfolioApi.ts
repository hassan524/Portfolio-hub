// src/api/pricingApi.ts

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

};

export default portfolioApi;