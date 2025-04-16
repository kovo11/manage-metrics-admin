
import { apiClient } from "./apiClient";
import { apiWrapper } from "./utils/apiUtils";
import env from "@/config/env";

// Get all users
export const getUsers = async () => {
  return apiWrapper(async () => {
    const response = await apiClient.get(env.ENDPOINTS.USERS.GET_ALL);
    return response.data;
  });
};

// Get user by ID
export const getUserById = async (id: string) => {
  return apiWrapper(async () => {
    const response = await apiClient.get(`${env.ENDPOINTS.USERS.GET_ONE}/${id}`);
    return response.data;
  });
};

// Update user
export const updateUser = async (id: string, userData: any) => {
  return apiWrapper(async () => {
    const response = await apiClient.put(`${env.ENDPOINTS.USERS.UPDATE}/${id}`, userData);
    return response.data;
  });
};

// Delete user
export const deleteUser = async (id: string) => {
  return apiWrapper(async () => {
    const response = await apiClient.delete(`${env.ENDPOINTS.USERS.DELETE}/${id}`);
    return response.data;
  });
};
