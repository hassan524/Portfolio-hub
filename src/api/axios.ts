import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.DEV
     ? "http://localhost:5000/api"
    : import.meta.env.VITE_BACKEND_URL,
  timeout: 30000, 
  withCredentials: true, 
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true", 
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