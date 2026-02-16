import axios from "axios";

const API = "https://fg.com.iq/api";

const axiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export const createItem = async (itemData) => {
  const res = await axiosInstance.post("/items", itemData);
  return res.data;
};


export const getItems = async ({ page = 1, limit = 10, itemtype }) => {
  const res = await axiosInstance.get("/items", {
    params: {
      page,
      limit,
      itemtype: itemtype === "project" ? "project" : "news",
    },
  });

  return res.data;
};
