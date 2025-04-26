import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5254/api/login", { email, password });
      const { accessToken, refreshToken } = response.data;
  
      setToken(accessToken);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post("http://localhost:5254/api/refresh", { refreshToken });
      const { accessToken } = response.data;

      setToken(accessToken);
      localStorage.setItem("token", accessToken);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        refreshAccessToken,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};