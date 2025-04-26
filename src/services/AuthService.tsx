import http from "../http-common.tsx";

const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await http.post("/login", credentials);
    return response.data;
  },

  refresh: async (refreshToken: string) => {
    const response = await http.post("/refresh", { refreshToken });
    return response.data;
  },
  
  register: async (credentials: { email: string; password: string }) => {
    const response = await http.post("/register", credentials);
    return response.data;
  },
};

export default AuthService;