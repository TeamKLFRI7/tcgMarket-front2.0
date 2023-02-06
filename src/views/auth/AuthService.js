import axios from "axios";

const apiUrl = process.env.REACT_APP_URL;

export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: `application/json`,
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.replace("http://127.0.0.1:3000/login");
      }
    }
  }
);
