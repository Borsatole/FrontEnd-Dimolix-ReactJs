import { AuthContext } from "@src/context/AuthContext";
import axios from "axios";
import { useContext } from "react";

const rotaApi = import.meta.env.VITE_API;

export const api = axios.create({
  baseURL: rotaApi,
  headers: {
    "Content-Type": "application/json",
  },
});

// adicionar o token se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// interceptor de response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      alert("Sua sessão expirou, faça login novamente.");
    //   window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
