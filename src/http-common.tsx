import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5254/api",
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post("http://localhost:5254/api/refresh", { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return http(originalRequest);
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default http;