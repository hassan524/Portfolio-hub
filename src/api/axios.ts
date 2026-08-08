import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "https://9f50-2401-ba80-a387-4a62-d22-457b-9c67-3bf1.ngrok-free.app/api"
    : import.meta.env.VITE_BACKEND_URL,
  timeout: 30000, 
  withCredentials: true, 
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true", // Bypasses ngrok warning page
  },
});

api.interceptors.request.use(
  (config) => {
    let token = null;

    // Loop through localStorage to find the dynamic Supabase token key
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.endsWith("-auth-token")) {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            if (parsed.access_token) {
              token = parsed.access_token;
              break;
            }
          } catch (e) {
            // Ignore JSON parsing errors
          }
        }
      }
    }

    // Fallback if generic access_token is used elsewhere
    if (!token) {
      token = localStorage.getItem("access_token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor remains the same...