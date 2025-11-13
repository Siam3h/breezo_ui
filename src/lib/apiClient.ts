import axios from "axios";

// Base URL of your FastAPI backend
const API_BASE_URL =
  "https://breezoapi-57cdp.sevalla.app" || "http://localhost:8000/";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // include cookies if backend uses them
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Token storage helpers ---
const getTokens = () => {
  const raw = localStorage.getItem("tokens");
  return raw ? JSON.parse(raw) : null;
};

const setTokens = (tokens: { access: string; refresh: string }) => {
  localStorage.setItem("tokens", JSON.stringify(tokens));
};

const clearTokens = () => {
  localStorage.removeItem("tokens");
};

// --- Request interceptor: attach access token ---
apiClient.interceptors.request.use((config) => {
  const tokens = getTokens();
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

// --- Response interceptor: handle expired access token ---
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired, try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const tokens = getTokens();
        if (!tokens?.refresh) throw new Error("No refresh token");

        const res = await axios.post(`${API_BASE_URL}auth/token/refresh`, {
          refresh_token: tokens.refresh,
        });

        setTokens(res.data); // store new tokens
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        return apiClient(originalRequest); // retry original request
      } catch (err) {
        clearTokens();
        window.location.href = "/auth/login"; // force re-login
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
