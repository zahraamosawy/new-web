// api/auth.js
import axiosInstance from "./axiosInstance";

export const login = async (data) => {
  const response = await axiosInstance.post("/login", data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const register = async (data) => {
  const response = await axiosInstance.post("/register", data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
