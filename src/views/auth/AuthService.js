import axios from "axios";

const basicUrl = process.env.REACT_APP_URL;
const loginUrl = process.env.REACT_APP_URL_LOGIN;

export const api = axios.create({
    baseURL : basicUrl,
    headers: {
        'Accept': `application/json`,
        'Content-Type': "application/json"
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
        window.location.replace(loginUrl);
      }
    }
  }
);
