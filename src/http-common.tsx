import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5254",
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (token && config.url && !config.url.startsWith('/login') && !config.url.startsWith('/register')) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.url && !config.url.startsWith('/login') && !config.url.startsWith('/register')) {
      config.url = `/api${config.url}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;