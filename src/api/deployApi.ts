import api from "./axiosInstance";

// ── Types ─────────────────────────────────────────────────────────────────

export type DeployPlatform = "vercel" | "netlify";

export interface DeployRequest {
  portfolioId: string;
  /** OAuth access token obtained after platform authorization */
  token: string;
  /** Optional custom subdomain/project name */
  projectName?: string;
}

export interface DeployResponse {
  deploymentId: string;
  url: string;
  platform: DeployPlatform;
  status: "queued" | "building" | "ready" | "error";
  message: string;
}

export interface DeployStatusResponse {
  deploymentId: string;
  status: "queued" | "building" | "ready" | "error";
  url?: string;
  error?: string;
}

// ── OAuth URL helpers ─────────────────────────────────────────────────────

function getOrigin() {
  return typeof window !== "undefined" ? window.location.origin : "https://portfoliohub.app";
}

function getVercelOAuthUrl() {
  return (
    "https://vercel.com/integrations/portfoliohub/new?redirect_uri=" +
    encodeURIComponent(`${getOrigin()}/social/vercel-callback`)
  );
}

function getNetlifyOAuthUrl() {
  return (
    "https://app.netlify.com/authorize?client_id=portfoliohub&response_type=token&redirect_uri=" +
    encodeURIComponent(`${getOrigin()}/social/netlify-callback`)
  );
}

export const PLATFORM_OAUTH_URLS: Record<DeployPlatform, () => string> = {
  vercel: getVercelOAuthUrl,
  netlify: getNetlifyOAuthUrl,
};

// ── Authorization helpers ─────────────────────────────────────────────────

const AUTH_KEY = (platform: DeployPlatform) => `${platform}_authorized`;

export function isPlatformAuthorized(platform: DeployPlatform): boolean {
  return localStorage.getItem(AUTH_KEY(platform)) === "true";
}

export function setPlatformAuthorized(
  platform: DeployPlatform,
  authorized: boolean,
): void {
  if (authorized) {
    localStorage.setItem(AUTH_KEY(platform), "true");
  } else {
    localStorage.removeItem(AUTH_KEY(platform));
  }
}

export function openPlatformAuth(platform: DeployPlatform): Window | null {
  return window.open(
    PLATFORM_OAUTH_URLS[platform](),
    `${platform}-auth`,
    "width=600,height=700,toolbar=0,menubar=0,location=0",
  );
}

// ── API Functions ─────────────────────────────────────────────────────────

/**
 * Trigger a deployment to Vercel.
 */
export async function deployToVercel(
  portfolioId: string,
  token: string,
  projectName?: string,
): Promise<DeployResponse> {
  const { data } = await api.post<DeployResponse>("/deploy/vercel", {
    portfolioId,
    token,
    projectName,
  } satisfies DeployRequest);
  return data;
}

/**
 * Trigger a deployment to Netlify.
 */
export async function deployToNetlify(
  portfolioId: string,
  token: string,
  projectName?: string,
): Promise<DeployResponse> {
  const { data } = await api.post<DeployResponse>("/deploy/netlify", {
    portfolioId,
    token,
    projectName,
  } satisfies DeployRequest);
  return data;
}

/**
 * Poll deployment status.
 */
export async function getDeployStatus(
  deploymentId: string,
  platform: DeployPlatform,
): Promise<DeployStatusResponse> {
  const { data } = await api.get<DeployStatusResponse>(
    `/deploy/${platform}/${deploymentId}/status`,
  );
  return data;
}
