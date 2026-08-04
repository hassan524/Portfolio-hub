import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client (read session token for Authorization header) ──────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_ANON_KEY as string,
);

// ── Base Axios instance ───────────────────────────────────────────────────
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL as string) ?? "/api",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor — attach Supabase JWT if available ────────────────
api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
});

// ── Response interceptor — normalised error messages ─────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message: string =
      error?.response?.data?.message ??
      error?.response?.data?.error ??
      error?.message ??
      "An unexpected error occurred.";

    return Promise.reject(new Error(message));
  },
);

export default api;
