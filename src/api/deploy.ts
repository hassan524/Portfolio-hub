// src/api/deploy.ts

import { api } from "./axios";

const deployApi = {
  checkStatus: () => api.get("/deploy/status"),

  authorizeVercel: () => api.get("/deploy/vercel/authorize"),

  authorizeNetlify: () => api.get("/deploy/netlify/authorize"),

  deployVercel: (files: Record<string, string>, projectName?: string, PortfolioID?: string) =>
    api.post("/deploy/vercel/deploy", { files, projectName, PortfolioID }),

  deployNetlify: (files: Record<string, string>, projectName?: string, PortfolioID?: string) =>
    api.post("/deploy/netlify/deploy", { files, projectName, PortfolioID }),

  checkNameAvailability: (platform: "vercel" | "netlify", name: string) =>
    api.get(`/deploy/${platform}/check-name`, { params: { name } }),
};

export default deployApi;