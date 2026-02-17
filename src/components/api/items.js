// api/items.js
import axiosInstance from "./axiosInstance";

export const getItems = async ({ type = "news", page = 1, limit = 10 }) => {
  try {
    const params = {
      page,
      limit,
      type: type.toLowerCase(), // تأكيد lowercase
    };
    
    console.log("Sending request with params:", params);
    
    const res = await axiosInstance.get("/items", { params });
    
    console.log("Fetching items with type:", type);
    console.log("API Response:", res.data);

    return res.data.items || [];
  } catch (error) {
    console.error("getItems error:", error);
    return [];
  }
};
