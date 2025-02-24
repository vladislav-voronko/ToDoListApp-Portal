import http from "../http-common.tsx";

const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await http.post("/login", credentials);
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }
      return response.data.accessToken;
    } catch (error) {
      throw new Error("Login Error");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  }
};

export default AuthService;