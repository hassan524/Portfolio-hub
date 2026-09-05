// src/api/deploy.ts

import { api } from "./axios";

const deployApi = {
  checkStatus: () => api.get("/deploy/status"),

  authorizeVercel: () => api.get("/deploy/vercel/authorize"),

  authorizeNetlify: () => api.get("/deploy/netlify/authorize"),

  deployVercel: (files: Record<string, string>, projectName?: string) =>
    api.post("/deploy/vercel/deploy", { files, projectName }),

  deployNetlify: (files: Record<string, string>, projectName?: string) =>
    api.post("/deploy/netlify/deploy", { files, projectName }),

  checkNameAvailability: (platform: "vercel" | "netlify", name: string) =>
    api.get(`/deploy/${platform}/check-name`, { params: { name } }),
};

export default deployApi;