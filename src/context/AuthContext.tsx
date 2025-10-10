import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "@/lib/apiClient"; // axios instance

interface User {
  id: string;
  email: string;
  role: string;
}

interface Tokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User, tokens: Tokens) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // --- Load user from storage on init ---
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // --- Login ---
  const login = (user: User, tokens: Tokens) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("tokens", JSON.stringify(tokens));
  };

  // --- Logout ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
    window.location.href = "/auth/login";
  };

  // --- Axios interceptor to handle expired access tokens ---
  useEffect(() => {
    const interceptor = apiClient.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const tokensRaw = localStorage.getItem("tokens");
          if (!tokensRaw) {
            logout();
            return Promise.reject(error);
          }

          try {
            const { refresh_token } = JSON.parse(tokensRaw) as Tokens;
            const res = await apiClient.post("/auth/token/refresh", { refresh_token });

            const newTokens = res.data as Tokens;
            localStorage.setItem("tokens", JSON.stringify(newTokens));

            originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;
            return apiClient(originalRequest);
          } catch {
            logout();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
