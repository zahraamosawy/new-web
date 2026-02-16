import axios from "axios";

const API = "https://fg.com.iq/api";

const axiosInstance = axios.create({
  baseURL: API,
});

export const getItems = async (page = 1, limit = 10) => {
  try {
    const res = await axiosInstance.get("/items", {
      params: { page, limit },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    return { items: [] };
  }
};
