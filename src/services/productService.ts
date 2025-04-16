
import { apiClient } from "./apiClient";
import { apiWrapper } from "./utils/apiUtils";
import env from "@/config/env";

// Get all products
export const getAllProducts = async () => {
  return apiWrapper(async () => {
    const response = await apiClient.get(env.ENDPOINTS.PRODUCTS.GET_ALL);
    return response.data;
  });
};

// Get product by ID
export const getProductById = async (id: string) => {
  return apiWrapper(async () => {
    const response = await apiClient.get(`${env.ENDPOINTS.PRODUCTS.GET_ONE}/${id}`);
    return response.data;
  });
};

// Add product to homepage
export const postProductToHomepage = async (productData: any) => {
  return apiWrapper(async () => {
    const response = await apiClient.post(env.ENDPOINTS.PRODUCTS.CREATE, productData);
    return response.data;
  });
};

// Update product on homepage
export const updateProductOnHomepage = async (id: string, productData: any) => {
  return apiWrapper(async () => {
    const response = await apiClient.put(`${env.ENDPOINTS.PRODUCTS.UPDATE}/${id}`, productData);
    return response.data;
  });
};

// Remove product from homepage
export const removeProductFromHomepage = async (id: string) => {
  return apiWrapper(async () => {
    const response = await apiClient.delete(`${env.ENDPOINTS.PRODUCTS.DELETE}/${id}`);
    return response.data;
  });
};
