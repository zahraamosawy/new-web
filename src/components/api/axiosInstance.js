// api/axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Vite proxy → https://fg.com.iq
});

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // إضافة التوكن تلقائياً
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // مهم: لا تجبر Content-Type إذا كان FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;