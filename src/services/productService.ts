
import { ProductData } from "../types/admin";
import { apiClient } from "./apiClient";
import env from "@/config/env";

// Get all products
export const getAllProducts = async () => {
  const response = await apiClient.get(env.PRODUCT_API.GET_ALL);
  return response.data;
};

// Get featured products
export const getFeaturedProducts = async () => {
  const response = await apiClient.get(env.PRODUCT_API.GET_FEATURED);
  return response.data;
};
