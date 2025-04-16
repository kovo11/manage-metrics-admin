
import { apiClient } from "./apiClient";
import env from "@/config/env";

export const getFeaturedProducts = async () => {
  const response = await apiClient.get(env.PRODUCT_API.GET_FEATURED);
  return response.data;
};

export const postProductToHomepage = async (productData: any) => {
  const response = await apiClient.post(env.PRODUCT_API.POST_TO_HOMEPAGE, productData);
  return response.data;
};

export const updateProductOnHomepage = async (id: string, productData: any) => {
  const response = await apiClient.put(env.PRODUCT_API.UPDATE_ON_HOMEPAGE, { id, ...productData });
  return response.data;
};

export const removeProductFromHomepage = async (id: string) => {
  const response = await apiClient.delete(`${env.PRODUCT_API.REMOVE_FROM_HOMEPAGE}/${id}`);
  return response.data;
};
