import axios from "axios";
import Cookies from "js-cookie";
import { removeFromLocalStorage } from "@/lib/utils";

export const BASE_URI = import.meta.env.VITE_API_URL;
/* export const BASE_URL = `${BASE_URI}/api`; */
export const BASE_URL = "http://localhost:8080/api";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const configureInterceptors = (setUser: any) => {
  api.interceptors.request.use(
    (config) => {
      const accessToken = Cookies.get("access_token");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        if (error.response.data.message === "Unauthenticated.") {
          setUser(null);
          Cookies.remove("access_token");
          removeFromLocalStorage("user");
        }
      }
      return Promise.reject(error);
    }
  );
};

